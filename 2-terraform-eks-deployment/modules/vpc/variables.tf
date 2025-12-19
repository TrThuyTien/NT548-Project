variable "project_name" {}
variable "cluster_name" {}
variable "azs" {
  type = list(string)
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "subnet_bits" {
  type    = number
  default = 8
}
