provider "aws" {
  region = "ap-southeast-1"
}

module "vpc" {
  source = "./modules/vpc"

  project_name = var.project_name
  cluster_name = var.cluster_name
  azs          = ["ap-southeast-1a", "ap-southeast-1b"]
}

module "eks" {
  source = "./modules/eks"

  cluster_name = var.cluster_name
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.private_subnet_ids
}
