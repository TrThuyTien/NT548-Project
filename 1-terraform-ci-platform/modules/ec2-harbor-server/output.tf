output "harbor_server_public_ip" {
  value = aws_instance.harbor_server.public_ip
}