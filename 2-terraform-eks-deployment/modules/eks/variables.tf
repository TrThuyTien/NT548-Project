variable "cluster_name" {}
variable "subnet_ids" {
  type = list(string)
}
variable "vpc_id" {}

variable "node_desired_size" {
  type    = number
  default = 6
}

variable "node_min_size" {
  type    = number
  default = 5
}

variable "node_max_size" {
  type    = number
  default = 7
}

variable "instance_types" {
  type    = list(string)
  default = ["t3.micro"]
}
