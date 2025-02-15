terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.87"
    }
  }
}


provider "aws" {
  region  = "us-east-1"
  profile = var.terraform_user
}