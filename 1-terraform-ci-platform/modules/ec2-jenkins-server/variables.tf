variable "project_name" {
  type = string
}

variable "servers_subnet_id" {
  type = string
}

variable "default_sg_id" {
  type = string
}

variable "ami" {
  description = "Ubuntu Server 22.04 LTS"
  type        = string
  default     = "ami-0827b3068f1548bf6"
}

variable "ins_type" {
  description = "Instance type"
  type        = string
  default     = "c7i-flex.large"
}

variable "key_name" {
  description = "Name of key file .pem"
  type        = string
  default     = "nt548-keypair"
}