terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "nt548-terraform-state"
    key            = "eks/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "terraform-locks"
  }
}