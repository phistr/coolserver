const http = require('http')
const url = require('url')
const request = require('request')

const buildName = process.env.OPENSHIFT_BUILD_NAME
const nameSpace = process.env.OPENSHIFT_BUILD_NAMESPACE
const buildSrc = process.env.OPENSHIFT_BUILD_SOURCE.slice(0, -4)
const buildCommit = process.env.OPENSHIFT_BUILD_COMMIT
const hostname = process.env.HOSTNAME
const deploymentName = hostname.slice(0, hostname.lastIndexOf('-') - 1)
const repoName = buildSrc.slice(buildSrc.indexOf('.com') + 5)
const openshiftBaseUrl = "https://192.168.42.146:8443/console/project"
const githubApiBaseUrl = "https://api.github.com/repos"
console.log(deploymentName)

let sucDep = `${buildName} deployed successfully in ${nameSpace}\n\n${buildSrc}\nbuild commit: ${buildCommit}`

function sendStatusToSlack() {
  request({
    url: process.env.WEBHOOK_SERVICE_URL,
    method: 'POST',
    json: {
      text: sucDep
    }
  }, (err, res, body) => {
    console.log(res)
  })
}

function sendStatusToGithub(state) {
  request({
    url: `${githubApiBaseUrl}/${repoName}/statuses/${buildCommit}`,
    method: 'POST',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': repoName
    },
    json: {
      state: state,
      target_url: `${openshiftBaseUrl}/${nameSpace}/browse/rc/${deploymentName}`,
      description: "Deployed!",
      context: "openshift deployment"
    }
  }, (err, res, body) => {
    console.log(res)
  })
}

sendStatusToSlack()
sendStatusToGithub('success')
