resource "aws_instance" "sonarqube_server" {
  ami                         = var.ami
  instance_type               = var.ins_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [var.default_sg_id]
  subnet_id                   = var.servers_subnet_id
  associate_public_ip_address = true
  user_data_replace_on_change = true
  user_data                   = file("${path.module}/sonarqube_install.sh")
  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true
  }
  tags = {
    Name = "${var.project_name}-sonarqube-server"
  }
}