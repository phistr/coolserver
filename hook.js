const http = require('http')
const url = require('url')
const request = require('request')

const buildName = process.env.OPENSHIFT_BUILD_NAME
const nameSpace = process.env.OPENSHIFT_BUILD_NAMESPACE
const buildSrc = process.env.OPENSHIFT_BUILD_SOURCE
const buildCommit = process.env.OPENSHIFT_BUILD_COMMIT
const hostname = process.env.HOSTNAME
const deploymentName = hostname.slice(0, hostname.indexOf('-', hostname.indexOf('-') + 1))
const repoName = buildSrc.slice(buildSrc.indexOf('.com') + 5)
const openshiftBaseUrl = "https://192.168.42.146:8443/console/project"
const githubApiBaseUrl = "https://api.github.com/repos"
const deployURL = `${openshiftBaseUrl}/${nameSpace}/browse/rc/${deploymentName}`

let description = {};
description['success'] = 'Deployed!'
description['pending'] = 'Starting deployment...'
description['failure'] = 'Deployment failed.'
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
      target_url: deployURL,
      description: description[state],
      context: "openshift deployment"
    }
  }, (err, res, body) => {
    console.log(res)
  })
}

function sendStatusToServer(st) {
  let surl = `${process.env.OUR_SERVER_URL}/?state=${st}&sha=${buildCommit}&namespace=${nameSpace}`
        + `&buildName=${buildName}&deployURL=${deployURL}&buildURL=${buildSrc}`
  console.log(surl)
  http.get(url.parse(surl, true), (resp) => {
    console.log("sent get request")
  })
}

sendStatusToGithub(process.argv[2])
sendStatusToServer(process.argv[2])
