variable "origin_domain_name" {
  description = "The origin's domain name (Wasabi endpoint)"
  type        = string
  default     = ""
}

variable "origin_path" {
  description = "The origin path to append to the domain name"
  type        = string
  default     = ""
}

variable "abda_lab_public_key_group" {
  description = "CloudFront public key group (PEM formatted)"
  type        = string
  default = ""
}

variable "lambda_edge_secret" {
  description = "Secret used to sign the cookie generated by CloudFront"
  type        = string
  default = ""
}

variable "terraform_user" {
  description = "AWS profile name to use"
  type        = string
  default     = ""
}