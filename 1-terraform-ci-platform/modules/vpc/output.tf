output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "default_route_table_id" {
  value = aws_vpc.vpc.default_route_table_id
}

output "igw_id" {
  value = aws_internet_gateway.igw.id
}

output "servers_subnet_id" {
  value = aws_subnet.servers_subnet.id
}

