const http = require('http')
const url = require('url')
const request = require('request')

const buildName = process.env.OPENSHIFT_BUILD_NAME
const nameSpace = process.env.OPENSHIFT_BUILD_NAMESPACE
const buildSrc = process.env.OPENSHIFT_BUILD_SOURCE
const buildCommit = process.env.OPENSHIFT_BUILD_COMMIT

let sucDep = `${buildName} deployed successfully in ${nameSpace}\n\n${buildSrc}\nbuild commit: ${buildCommit}`

function sendReq() {
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

sendReq()
