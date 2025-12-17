#!/bin/bash
set -e  # Exit on error

# Backup original sysctl.conf
sudo cp /etc/sysctl.conf /root/sysctl.conf_backup

# Modify Kernel System Limits for Sonarqube
sudo tee /etc/sysctl.conf > /dev/null <<EOF
vm.max_map_count=262144
fs.file-max=65536
EOF

# Apply sysctl changes immediately
sudo sysctl -p

# Set ulimit in limits.conf
sudo tee -a /etc/security/limits.conf > /dev/null <<EOF
sonarqube   -   nofile   65536
sonarqube   -   nproc    4096
EOF

# Update system and install Java
sudo apt update -y
sudo apt-get install openjdk-11-jdk -y

# Postgres Database installation and setup
sudo apt install wget gnupg2 -y
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt update -y
sudo apt install postgresql postgresql-contrib -y

# Enable and start PostgreSQL
sudo systemctl enable postgresql.service
sudo systemctl start postgresql.service

# Wait for PostgreSQL to be ready
sleep 5

# Setup PostgreSQL for SonarQube
sudo -i -u postgres psql <<EOF
CREATE USER sonar WITH ENCRYPTED PASSWORD 'admin123';
CREATE DATABASE sonarqube OWNER sonar;
GRANT ALL PRIVILEGES ON DATABASE sonarqube TO sonar;
\q
EOF

# SonarQube installation and setup
sudo mkdir -p /sonarqube/
cd /sonarqube/
sudo apt-get install unzip curl -y
sudo curl -O https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-8.3.0.34182.zip
sudo unzip -o sonarqube-8.3.0.34182.zip -d /opt/
sudo mv /opt/sonarqube-8.3.0.34182/ /opt/sonarqube

# Create sonar user and group
sudo groupadd sonar
sudo useradd -c "SonarQube - User" -d /opt/sonarqube/ -g sonar sonar
sudo chown sonar:sonar /opt/sonarqube/ -R

# Backup original sonar.properties
sudo cp /opt/sonarqube/conf/sonar.properties /root/sonar.properties_backup

# Configure SonarQube - Sửa file gốc thay vì ghi đè
sudo sed -i 's|^#sonar.jdbc.username=|sonar.jdbc.username=sonar|' /opt/sonarqube/conf/sonar.properties
sudo sed -i 's|^#sonar.jdbc.password=|sonar.jdbc.password=admin123|' /opt/sonarqube/conf/sonar.properties
sudo sed -i 's|^#\?sonar.jdbc.url=.*|sonar.jdbc.url = jdbc:postgresql://localhost/sonarqube|' /opt/sonarqube/conf/sonar.properties
sudo sed -i 's|^#sonar.web.host=0.0.0.0|sonar.web.host=0.0.0.0|' /opt/sonarqube/conf/sonar.properties
sudo sed -i 's|^#sonar.web.port=9000|sonar.web.port=9000|' /opt/sonarqube/conf/sonar.properties

# Thêm Java options
echo "" | sudo tee -a /opt/sonarqube/conf/sonar.properties
echo "sonar.web.javaAdditionalOpts=-server" | sudo tee -a /opt/sonarqube/conf/sonar.properties
echo "sonar.search.javaOpts=-Xmx512m -Xms512m -XX:MaxDirectMemorySize=256m -XX:+HeapDumpOnOutOfMemoryError" | sudo tee -a /opt/sonarqube/conf/sonar.properties

# Setup Systemd service for SonarQube
sudo tee /etc/systemd/system/sonarqube.service > /dev/null <<EOF
[Unit]
Description=SonarQube service
After=syslog.target network.target

[Service]
Type=forking

ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop

User=sonar
Group=sonar
Restart=always

LimitNOFILE=65536
LimitNPROC=4096

[Install]
WantedBy=multi-user.target
EOF

# Set proper permissions
sudo chown sonar:sonar /opt/sonarqube/conf/sonar.properties

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable sonarqube.service
sudo systemctl start sonarqube.service

# Wait and check
echo "Waiting for SonarQube to start..."
sleep 15

