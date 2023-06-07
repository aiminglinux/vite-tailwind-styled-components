pipeline {
    agent any
    stages {
        stage('Sonarqube') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
        steps {
            withSonarQubeEnv('sonarqube') {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=fe-devkonnect -Dsonar.sources=. -Dsonar.host.url=http://sonar.devkonnect.com -Dsonar.login=sqp_781d8eb48f7f5e5f27d09599c4a5cfae8d7ca1ec"
            }
            timeout(time: 10, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
        }
        }
    }
}
