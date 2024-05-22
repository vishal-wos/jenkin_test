pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git url: 'https://github.com/vishal-wos/jenkin_test.git', branch: 'test'
            }
        }

        stage('Install Dependencies') {
            steps {
                // in windows bat and linux is sh
                bat 'npm install'
            }
        }

        stage('Start the server') {
            steps {
                // in windows bat and linux is sh
                bat 'pm2 start server.js'
            }
        }
        
        
    }
}
