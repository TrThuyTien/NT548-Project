output "jenkins_ip" {
  value = module.jenkins_server.jenkis_server_public_ip
}

output "sonarqube_ip" {
  value = module.sonarqube_server.sonarqube_server_public_ip
}

output "harbor_ip" {
  value = module.harbor_server.harbor_server_public_ip
}