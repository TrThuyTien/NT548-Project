resource "aws_default_route_table" "default_rt" {
  default_route_table_id = var.default_route_table_id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.igw_id
  }
  tags = {
    Name = "${var.project_name}-default-route-table"
  }
}