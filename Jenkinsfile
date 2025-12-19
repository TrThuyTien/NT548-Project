pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    environment {
        // Registry credentials
        REGISTRY_CRED = credentials('REGISTRY-CRED')
        REGISTRY_URL = credentials('REGISTRY_URL')
        REGISTRY_PROJECT = 'nt548-project'
        
        // AWS credentials
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_REGION = 'us-east-1'
        EKS_CLUSTER_NAME = credentials('eks-cluster-name')
        
        // Git info
        CI_COMMIT_TAG = "${env.TAG_NAME ?: 'latest'}"
        CI_COMMIT_SHORT_SHA = "${env.GIT_COMMIT[0..7]}"
        
        // Service names
        RECIPE_SERVICE = "recipe-service"
        USER_SERVICE = "user-service"
        
        // Image tags
        RECIPE_IMAGE = "${REGISTRY_URL}/${REGISTRY_PROJECT}/${RECIPE_SERVICE}:${CI_COMMIT_TAG}_${CI_COMMIT_SHORT_SHA}"
        USER_IMAGE = "${REGISTRY_URL}/${REGISTRY_PROJECT}/${USER_SERVICE}:${CI_COMMIT_TAG}_${CI_COMMIT_SHORT_SHA}"
        
        // Docker login command
        dockerLogin = "echo ${REGISTRY_CRED_PSW} | docker login ${REGISTRY_URL} -u ${REGISTRY_CRED_USR} --password-stdin"
        
        // Directories
        RECIPE_DIR = "microservices-app/recipe-service"
        USER_DIR = "microservices-app/user-service"
        DEPLOY_DIR = "deployment"
    }
    
    triggers { 
        githubPush()
    }
    
    stages {
        
        stage('build-and-push') {
            parallel {
                stage('recipe-service') {
                    stages {
                        stage('sonarqube-recipe') {
                            steps {
                                dir("${RECIPE_DIR}") {
                                    sh(script: "npm install", label: "install dependencies")
                                    withSonarQubeEnv('SonarQube') {
                                        sh(script: """
                                            sonar-scanner \
                                                -Dsonar.projectKey=${RECIPE_SERVICE} \
                                                -Dsonar.projectName='Recipe Service' \
                                                -Dsonar.projectVersion=${CI_COMMIT_TAG} \
                                                -Dsonar.sources=. \
                                                -Dsonar.exclusions=node_modules/**,test/**,coverage/**
                                        """, label: "sonarqube scan")
                                    }
                                }
                            }
                        }
                        
                        stage('build-recipe') {
                            steps {
                                dir("${RECIPE_DIR}") {
                                    sh(script: "${dockerLogin}", label: "docker login")
                                    sh(script: "docker build -t ${RECIPE_IMAGE} .", label: "build image")
                                }
                            }
                        }
                        
                        stage('trivy-recipe') {
                            steps {
                                sh(script: """
                                    trivy image \
                                        --severity HIGH,CRITICAL \
                                        --exit-code 0 \
                                        --format table \
                                        ${RECIPE_IMAGE}
                                """, label: "trivy scan")
                            }
                        }
                        
                        stage('push-recipe') {
                            steps {
                                sh(script: "${dockerLogin}", label: "docker login")
                                sh(script: "docker push ${RECIPE_IMAGE}", label: "push image")
                            }
                        }
                    }
                }
                
                stage('user-service') {
                    stages {
                        stage('sonarqube-user') {
                            steps {
                                dir("${USER_DIR}") {
                                    sh(script: "npm install", label: "install dependencies")
                                    withSonarQubeEnv('SonarQube') {
                                        sh(script: """
                                            sonar-scanner \
                                                -Dsonar.projectKey=${USER_SERVICE} \
                                                -Dsonar.projectName='User Service' \
                                                -Dsonar.projectVersion=${CI_COMMIT_TAG} \
                                                -Dsonar.sources=. \
                                                -Dsonar.exclusions=node_modules/**,test/**,coverage/**
                                        """, label: "sonarqube scan")
                                    }
                                }
                            }
                        }
                        
                        stage('build-user') {
                            steps {
                                dir("${USER_DIR}") {
                                    sh(script: "${dockerLogin}", label: "docker login")
                                    sh(script: "docker build -t ${USER_IMAGE} .", label: "build image")
                                }
                            }
                        }
                        
                        stage('trivy-user') {
                            steps {
                                sh(script: """
                                    trivy image \
                                        --severity HIGH,CRITICAL \
                                        --exit-code 0 \
                                        --format table \
                                        ${USER_IMAGE}
                                """, label: "trivy scan")
                            }
                        }
                        
                        stage('push-user') {
                            steps {
                                sh(script: "${dockerLogin}", label: "docker login")
                                sh(script: "docker push ${USER_IMAGE}", label: "push image")
                            }
                        }
                    }
                }
            }
        }
        
        stage('deploy') {
            steps {
                script {
                    try {
                        timeout(time: 5, unit: 'MINUTES') {
                            env.useChoice = input message: "Can it be deployed?",
                                parameters: [choice(name: 'deploy', choices: 'no\nyes', description: 'Choose "yes" if you want to deploy!')]
                        }
                        if (env.useChoice == 'yes') {
                            
                            // Configure kubectl using explicit AWS credentials
                            withCredentials([
                                string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                                string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY')
                            ]) {
                                sh(script: """
                                    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                                    export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                                    aws eks update-kubeconfig \
                                        --region ${AWS_REGION} \
                                        --name ${EKS_CLUSTER_NAME}
                                """, label: "update kubeconfig")
                            }

                            
                            // Apply namespace
                            dir("${DEPLOY_DIR}") {
                                sh(script: "kubectl apply -f namespace.yaml", label: "create namespace")
                            }
                            
                            // Create secrets from credentials
                            withCredentials([
                                file(credentialsId: 'secret-recipe-yaml', variable: 'RECIPE_SECRET_FILE'),
                                file(credentialsId: 'secret-user-yaml', variable: 'USER_SECRET_FILE')
                            ]) {
                                sh(script: "kubectl apply -f ${RECIPE_SECRET_FILE}", label: "apply recipe secret")
                                sh(script: "kubectl apply -f ${USER_SECRET_FILE}", label: "apply user secret")
                            }
                            
                            // Deploy recipe service
                            dir("${DEPLOY_DIR}") {
                                sh(script: "kubectl apply -f recipe-service-deploy.yaml", label: "deploy recipe service")
                                sh(script: """
                                                kubectl set image deployment/cookmate-recipe \
                                                    cookmate-recipe=${RECIPE_IMAGE} \
                                                    -n cookmate
                                            """, label: "update recipe image tag")
                            }
                            
                            // Deploy user service
                            dir("${DEPLOY_DIR}") {
                                sh(script: "kubectl apply -f user-service-deploy.yaml", label: "deploy user service")
                                sh(script: """
                                                kubectl set image deployment/cookmate-user \
                                                    cookmate-user=${USER_IMAGE} \
                                                    -n cookmate
                                            """, label: "update user image tag")
                            }

                            
                            // Verify deployment
                            sh(script: """
                                kubectl get deployments -n cookmate
                                echo ""
                                kubectl get pods -n cookmate
                                echo ""
                                kubectl get svc -n cookmate
                            """, label: "check deployment status")
                            
                        } else {
                            echo "Deployment cancelled by user!"
                        }
                    } catch (Exception err) {
                        echo "Deployment timeout or cancelled!"
                    }
                }
            }
        }
    }
    
}
