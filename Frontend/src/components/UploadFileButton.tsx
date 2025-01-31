"use client";

import { useState, useCallback } from "react";
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import useAwsSetup from "@/hooks/resources/useAwsSetup";

interface UploadFileProps {
  filePath: string;
  maxChunkSize?: number; // in bytes, default 5MB
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export default function UploadFileButton({ 
  filePath, 
  maxChunkSize = 5 * 1024 * 1024 // 5MB default chunk size
}: UploadFileProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  
  const { s3Client, isLoading, error: awsError } = useAwsSetup();

  const uploadInChunks = useCallback(async (
    file: File,
    uploadId: string,
    bucket: string,
    key: string
  ) => {
    const chunks = Math.ceil(file.size / maxChunkSize);
    const uploadedParts: { ETag: string; PartNumber: number; ChecksumCRC32?: string; }[] = [];
    let uploadedBytes = 0;

    for (let i = 0; i < chunks; i++) {
      const start = i * maxChunkSize;
      const end = Math.min(start + maxChunkSize, file.size);
      const chunk = file.slice(start, end);
      const partNumber = i + 1;

      try {
        // Convert chunk to ArrayBuffer
        const chunkArrayBuffer = await chunk.arrayBuffer();

        const uploadPartCommand = new UploadPartCommand({
          Bucket: bucket,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: new Uint8Array(chunkArrayBuffer),
          ContentLength: chunk.size,
          ChecksumAlgorithm: "CRC32"  // Add CRC32 checksum algorithm
        });

        const response = await s3Client!.send(uploadPartCommand);
        uploadedBytes += chunk.size;
        
        setUploadProgress({
          loaded: uploadedBytes,
          total: file.size,
          percentage: Math.round((uploadedBytes / file.size) * 100)
        });

        if (response.ETag) {
          uploadedParts.push({
            ETag: response.ETag,
            PartNumber: partNumber,
            ChecksumCRC32: response.ChecksumCRC32
          });
        }
      } catch (err: any) {
        console.error("Part upload error:", err);
        // Abort the multipart upload if a part fails
        await s3Client!.send(new AbortMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          UploadId: uploadId,
        }));
        throw new Error(`Failed to upload part ${partNumber}: ${err.message}`);
      }
    }

    return uploadedParts.sort((a, b) => a.PartNumber - b.PartNumber);
  }, [s3Client, maxChunkSize]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!s3Client) {
      setError("AWS S3 client is not initialized");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    setUploadProgress(null);

    const bucket = "khangstorage"; // Replace with your actual bucket name
    const key = `${filePath}${file.name}`;

    try {
      // Initialize multipart upload with CRC32 checksum
      const multipartUpload = await s3Client.send(
        new CreateMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          ContentType: file.type,
          ChecksumAlgorithm: "CRC32"  // Add CRC32 checksum algorithm
        })
      );

      if (!multipartUpload.UploadId) {
        throw new Error("Failed to initialize multipart upload");
      }

      // Upload parts
      const uploadedParts = await uploadInChunks(
        file,
        multipartUpload.UploadId,
        bucket,
        key
      );

      // Complete multipart upload
      await s3Client.send(
        new CompleteMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          UploadId: multipartUpload.UploadId,
          MultipartUpload: { Parts: uploadedParts }
        })
      );

      setSuccessMessage("File uploaded successfully");
    } catch (err : any) {
      console.error("Upload error:", err);
      setError(typeof err === 'string' ? err : err.message || "Failed to upload file. Check your access.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleUpload}
        disabled={isUploading || isLoading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                 file:bg-blue-500 file:text-white disabled:opacity-50"
      />
      
      {uploadProgress && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress.percentage}%` }}
          />
          <p className="text-sm text-gray-600 mt-1">
            Uploaded {Math.round(uploadProgress.loaded / (1024 * 1024))}MB 
            of {Math.round(uploadProgress.total / (1024 * 1024))}MB 
            ({uploadProgress.percentage}%)
          </p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {awsError && <p className="text-red-500">AWS Error: {awsError}</p>}
    </div>
  );
}