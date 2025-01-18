﻿// <auto-generated />
using System;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "uuid-ossp");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.Resource", b =>
                {
                    b.Property<Guid>("Resourceid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("resourceid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<string>("Bucketlink")
                        .HasColumnType("text")
                        .HasColumnName("bucketlink");

                    b.Property<string>("Cloudpassword")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("cloudpassword");

                    b.Property<string>("Cloudusername")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("cloudusername");

                    b.Property<DateTime>("Createddate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("createddate")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<bool>("Isdeleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("isdeleted");

                    b.Property<bool>("Isimportance")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("isimportance");

                    b.Property<bool>("Ispublic")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("ispublic");

                    b.Property<string>("Owner")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("owner");

                    b.Property<DateTime?>("Updateddate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("updateddate")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("Resourceid")
                        .HasName("resource_pkey");

                    b.ToTable("resource", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.ShareduserResource", b =>
                {
                    b.Property<Guid>("Resourceid")
                        .HasColumnType("uuid")
                        .HasColumnName("resourceid");

                    b.Property<Guid>("Shareduserid")
                        .HasColumnType("uuid")
                        .HasColumnName("shareduserid");

                    b.Property<string>("Accesslevel")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("accesslevel");

                    b.HasKey("Resourceid", "Shareduserid")
                        .HasName("shareduser_resource_pkey");

                    b.ToTable("shareduser_resource", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.ShareduserResource", b =>
                {
                    b.HasOne("Domain.Entities.Resource", "Resource")
                        .WithMany("ShareduserResources")
                        .HasForeignKey("Resourceid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_resource");

                    b.Navigation("Resource");
                });

            modelBuilder.Entity("Domain.Entities.Resource", b =>
                {
                    b.Navigation("ShareduserResources");
                });
#pragma warning restore 612, 618
        }
    }
}
