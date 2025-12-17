variable "project_name" {
  type = string
}

variable "vpc_cidr" {
  description = "IP range for my vpc"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zone" {
  type    = string
  default = "ap-southeast-1a"
}

variable "private_subnet_cidr" {
  type    = string
  default = "10.0.1.0/24"
}