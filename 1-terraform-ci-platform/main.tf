terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
}

module "route_tables" {
  source                 = "./modules/route-tables"
  project_name           = var.project_name
  igw_id                 = module.vpc.igw_id
  default_route_table_id = module.vpc.default_route_table_id

  depends_on = [module.vpc]
}

module "security_groups" {
  source       = "./modules/security-group"
  project_name = var.project_name
  vpc_id       = module.vpc.vpc_id
  depends_on   = [module.vpc, module.route_tables]
}

module "jenkins_server" {
  source            = "./modules/ec2-jenkins-server"
  project_name      = var.project_name
  servers_subnet_id = module.vpc.servers_subnet_id
  default_sg_id     = module.security_groups.default_sg_id
  depends_on        = [module.vpc, module.route_tables, module.security_groups]
}

module "sonarqube_server" {
  source            = "./modules/ec2-sonaqube-server"
  project_name      = var.project_name
  servers_subnet_id = module.vpc.servers_subnet_id
  default_sg_id     = module.security_groups.default_sg_id
  depends_on        = [module.vpc, module.route_tables, module.security_groups]

}

module "harbor_server" {
  source            = "./modules/ec2-harbor-server"
  project_name      = var.project_name
  servers_subnet_id = module.vpc.servers_subnet_id
  default_sg_id     = module.security_groups.default_sg_id
  depends_on        = [module.vpc, module.route_tables, module.security_groups]
}