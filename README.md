# NT548-Group09-Project

## 📋 Giới thiệu

Đây là dự án môn học **NT548 - Công nghệ DevOps và Ứng dụng**. Dự án xây dựng một ứng dụng **Cookmate/KitchenWhiz** theo kiến trúc microservices, triển khai trên AWS EKS với CI/CD pipeline hoàn chỉnh.

## 🏗️ Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                        AWS Cloud                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  CI Platform (Terraform)                   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │   Jenkins   │  │  SonarQube  │  │   Harbor    │        │  │
│  │  │   Server    │  │   Server    │  │   Server    │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    EKS Cluster                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │  Frontend   │  │    User     │  │   Recipe    │        │  │
│  │  │   (React)   │  │   Service   │  │   Service   │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Cấu trúc thư mục

```
NT548-Project/
├── 1-terraform-ci-platform/     # Terraform cho CI/CD platform
│   ├── modules/
│   │   ├── ec2-jenkins-server/  # Jenkins server
│   │   ├── ec2-sonarqube-server/# SonarQube server  
│   │   ├── ec2-harbor-server/   # Harbor registry
│   │   ├── vpc/                 # VPC configuration
│   │   ├── route-tables/        # Route tables
│   │   └── security-group/      # Security groups
│   └── main.tf
│
├── 2-terraform-eks-deployment/  # Terraform cho EKS cluster
│   ├── modules/
│   │   ├── eks/                 # EKS cluster module
│   │   └── vpc/                 # VPC cho EKS
│   └── main.tf
│
├── microservices-app/           # Ứng dụng microservices
│   ├── fe-app/                  # Frontend (React + Vite)
│   ├── user-service/            # User Service (Node.js + Express)
│   └── recipe-service/          # Recipe Service (Node.js + Express)
│
├── deployment/                  # Kubernetes manifests
│   ├── namespace.yaml
│   ├── user-service-all.yaml
│   ├── recipe-service-all.yaml
│   └── deploy.sh
│
├── script-for-install-tools/    # Scripts cài đặt tools
│   ├── docker_install.sh
│   ├── jenkins_install.sh
│   └── sonarqube_install.sh
│
└── Jenkinsfile                  # CI/CD Pipeline
```

## 🛠️ Công nghệ sử dụng

### Infrastructure
| Công nghệ | Mô tả |
|-----------|-------|
| **Terraform** | Infrastructure as Code (IaC) |
| **AWS** | Cloud Provider |
| **EKS** | Kubernetes cluster |
| **VPC** | Virtual Private Cloud |

### CI/CD Pipeline
| Công nghệ | Mô tả |
|-----------|-------|
| **Jenkins** | CI/CD automation server |
| **SonarQube** | Code quality & security analysis |
| **Harbor** | Private container registry |
| **Trivy** | Container vulnerability scanner |

### Application Stack
| Công nghệ | Mô tả |
|-----------|-------|
| **React 19** | Frontend framework |
| **Vite** | Build tool |
| **TailwindCSS** | CSS framework |
| **Node.js + Express 5** | Backend framework |
| **MongoDB (Mongoose)** | Database |
| **JWT** | Authentication |
| **Swagger** | API Documentation |
| **Cloudinary** | Image storage |

## 🚀 Microservices

### 1. Frontend (KitchenWhiz)
- **Port:** 80 (nginx)
- **Tech:** React 19, Vite, TailwindCSS, React Router
- **Features:** UI/UX cho ứng dụng quản lý công thức nấu ăn

### 2. User Service
- **Port:** 5001
- **API Docs:** `/user-api-docs`
- **Features:**
  - Đăng ký/Đăng nhập người dùng
  - Quản lý profile
  - Authentication với JWT
  - Upload ảnh avatar (Cloudinary)
  - Email notifications (Nodemailer)

### 3. Recipe Service
- **Port:** 5002
- **API Docs:** `/recipe-api-docs`
- **Features:**
  - CRUD công thức nấu ăn
  - Quản lý nguyên liệu
  - Upload ảnh công thức
  - Tìm kiếm và lọc công thức

## 📦 CI/CD Pipeline

Pipeline được cấu hình trong `Jenkinsfile` với các stage:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Verify     │───▶│   SonarQube  │───▶│    Build     │
│     Tag      │    │     Scan     │    │    Image     │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Deploy     │◀───│     Push     │◀───│    Trivy     │
│   to EKS     │    │   to Harbor  │    │     Scan     │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Các bước trong pipeline:
1. **Verify Tag** - Xác nhận tag version
2. **SonarQube Scan** - Kiểm tra chất lượng code
3. **Build Image** - Build Docker image
4. **Trivy Scan** - Quét lỗ hổng bảo mật container
5. **Push to Harbor** - Push image lên private registry
6. **Deploy to EKS** - Triển khai lên Kubernetes cluster

## 🏃‍♂️ Hướng dẫn triển khai

### 1. Triển khai CI Platform

```bash
cd 1-terraform-ci-platform
terraform init
terraform plan
terraform apply
```

### 2. Triển khai EKS Cluster

```bash
cd 2-terraform-eks-deployment
terraform init
terraform plan
terraform apply
```

### 3. Triển khai ứng dụng lên Kubernetes

```bash
cd deployment
chmod +x deploy.sh
./deploy.sh
```

### 4. Chạy local development

```bash
# Frontend
cd microservices-app/fe-app
npm install
npm run dev

# User Service
cd microservices-app/user-service
npm install
npm start

# Recipe Service
cd microservices-app/recipe-service
npm install
npm start
```

## 🔧 Cấu hình Environment Variables

### User Service (.env)
```env
PORT=5001
MONGODB_URI=<mongodb_connection_string>
JWT_SECRET=<jwt_secret_key>
CLOUDINARY_CLOUD_NAME=<cloudinary_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
EMAIL_USER=<email_for_notifications>
EMAIL_PASS=<email_password>
```

### Recipe Service (.env)
```env
PORT=5002
MONGODB_URI=<mongodb_connection_string>
JWT_SECRET=<jwt_secret_key>
CLOUDINARY_CLOUD_NAME=<cloudinary_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
```

## 👥 Thành viên nhóm

**NT548 - Group 09**
| Tên thành viên | Mã số sinh viên |
|----------------|-----------------|
| **Trần Thị Thùy Tiên** | 23521588 |
| **Trần Lê Uyên Thy** | 23521564 |
| **Lê Trung Kiên** | 23520797 |
| **Trần Thuận Thến** | 23521471 |

---

## 📌 QUY TẮC LÀM VIỆC TRÊN GITHUB

- Trước khi bắt đầu làm, đọc kĩ quy trình làm việc với Git & GitHub [tại đây](https://www.figma.com/board/sAU9OhFxPQCTKGghPKQqbF/Quy-tr%C3%ACnh-Git-%26-GitHub?node-id=0-1&t=GYFBeSfRyeSQG1Zb-1).
- Ghi rõ nội dung commit
- Chỉ commit khi hoàn thành 1 feature/ bug nào đó, không commit khi đang làm dở, không commit dồn.
- Khi muốn task/feature merge vào main, tạo pull request (đã cài Protection rules), sau đó nhờ một bạn trong nhóm review code và approve pull request.
- Xóa nhánh khi merge thành công.

---

## 📄 License

This project is for educational purposes - NT548 Course Project.