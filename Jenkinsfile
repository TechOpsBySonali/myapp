pipeline {
    agent any

    environment {
        ACR_NAME = 'myAcrRegistry'
        IMAGE_NAME = 'myapp'
    }

    stages {
        stage('Clone Code') {
            steps {
                git 'https://github.com/your-org/your-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${ACR_NAME}.azurecr.io/${IMAGE_NAME}:$BUILD_NUMBER")
                }
            }
        }

        stage('Push to ACR') {
            steps {
                script {
                    docker.withRegistry("https://${ACR_NAME}.azurecr.io", "acr-creds-id") {
                        docker.image("${ACR_NAME}.azurecr.io/${IMAGE_NAME}:$BUILD_NUMBER").push()
                    }
                }
            }
        }

        stage('Deploy to AKS') {
            steps {
                withCredentials([azureServicePrincipal('azure-creds-id')]) {
                    sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    az aks get-credentials --resource-group my-aks-rg --name myAKSCluster
                    kubectl set image deployment/myapp-deployment myapp-container=${ACR_NAME}.azurecr.io/${IMAGE_NAME}:$BUILD_NUMBER
                    '''
                }
            }
        }
    }
}
