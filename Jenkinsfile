node ("docker")
    {
        def is_master=(env.BRANCH_NAME == 'master')
        parameters { booleanParam(name: 'promote_artifact', defaultValue: false, description: '') }
        def is_promote=(params.promote_artifact)
        echo "BUILDTYPE: " + (is_promote ? "Promote Image" : "Build, Publish and Tag")

        try {
            def VENV_BIN = "/local1/virtualenvs/jenkinstools/bin"
            def PYTHON = "${VENV_BIN}/python3"

            stage ("git") {
                def git_url=gitUrl()
                if (env.BRANCH_NAME == null) {
                    git url: "${git_url}"
                }
                else {
                    println "*** BRANCH ${env.BRANCH_NAME}"
                    git url: "${git_url}", branch: "${env.BRANCH_NAME}"
                }
            }

            // Checkout the branch to build. This will use the jenkins user key in stash
            if (!is_promote) {
                if (is_master) {
                    stage ("prepare version") {
                        sh "${PYTHON} ${VENV_BIN}/manage_version -t gradle -s prepare"
                    }
                }

                stage ("build and push") {
                    if (is_master) {
                        env.DEPLOYMENT_ENV = 'production'
                    } else {
                        env.DEPLOYMENT_ENV = 'staging'
                    }

                    sh './gradlew -i snapshotPublishTarGzAndDockerImage'
                }

                if (is_master) {
                    stage ("tag and commit") {
                        sh "${PYTHON} ${VENV_BIN}/manage_version -t gradle -s tag"
                    }
                }
            } else {
                stage("promote") {
                    sh "${PYTHON} ${VENV_BIN}/promote_artifact -t maven -g ${params.git_tag}"
                }
            }

            currentBuild.result = "SUCCESS"
        }
        catch(e) {
            // If there was an exception thrown, the build failed
            currentBuild.result = "FAILURE"
            throw e
        }
        finally {
        if (!is_promote) {
                sh './gradlew -i dockerCleanAndArtifactClean'
            }
        }
    }

def gitUrl() {
    checkout scm
    sh(returnStdout: true, script: 'git config remote.origin.url').trim()
}
