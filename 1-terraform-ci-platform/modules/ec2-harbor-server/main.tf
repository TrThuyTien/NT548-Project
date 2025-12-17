resource "aws_instance" "harbor_server" {
  ami                         = var.ami
  instance_type               = var.ins_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [var.default_sg_id]
  subnet_id                   = var.servers_subnet_id
  associate_public_ip_address = true
  user_data_replace_on_change = true
  user_data                   = file("${path.module}/docker_install.sh")
  tags = {
    Name = "${var.project_name}-harbor-server"
  }
}