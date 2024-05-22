pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        PM2_HOME = "${WORKSPACE}\\.pm2"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Ensure Node.js and npm are installed
                    bat 'node -v'
                    bat 'npm -v'
                    
                    // Install project dependencies
                    bat 'npm install'
                }
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         script {
        //             // Run your tests here
        //             bat 'npm test'
        //         }
        //     }
        // }

        // stage('Build') {
        //     steps {
        //         script {
        //             // If you have any build steps, include them here
        //             bat 'npm run build'
        //         }
        //     }
        // }

        stage('Start Server') {
            steps {
                script {
                    // Install PM2 globally if not already installed
                    bat 'npm install -g pm2'
                    
                    // Stop the existing PM2 process if it exists
                    bat 'pm2 stop all || exit 0'
                    
                    // Start the application using PM2
                    bat 'pm2 start server.js --name "my-node-app"'
                }
            }
        }
    }

    post {
        always {
            // Archive the artifacts or any other post-build steps
            archiveArtifacts artifacts: 'logs/**', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
