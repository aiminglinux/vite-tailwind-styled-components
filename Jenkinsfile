pipeline {
    agent {
        node {
            tool 'nodejs'
        }
    }
    stages {
        stage('Sonarqube') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
        steps {
            withSonarQubeEnv('sonarqube') {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=fe-devkonnect -Dsonar.sources=. -Dsonar.host.url=http://sonar.devkonnect.com -Dsonar.login=sqp_84b602b04260bd17c924df27890f655391cf8800"
            }
            timeout(time: 10, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
        }
        }
    }
}
