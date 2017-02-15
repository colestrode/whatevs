const request = require('request')
const url = `some url goes here`
const { numRequests = 10, parallelLimit = 10 } = require('yargs').argv
let requestsRemaining = numRequests


runInParallel()

function runInParallel () {
  let parallelRequests = parallelLimit
  if (requestsRemaining < parallelRequests) {
    parallelRequests = requestsRemaining
  }

  if (parallelRequests < 1) {
    console.log('done')
    return
  }

  const requestsPerformed = parallelRequests

  for (let i = 0; i < parallelRequests; i++) {
    getSpfHistory(done)
  }

  function done () {
    requestsRemaining--
    parallelRequests--

    if (parallelRequests < 1) {
      console.log(`finished ${requestsPerformed}, ${requestsRemaining} remaining`)
      runInParallel()
    }
  }
}

function getSpfHistory (done) {
  request({
    method: 'GET',
    uri: url,
    headers: {
      authorization: process.env.API_TOKEN
    }
  }, (err) => {
    if (err) {
      console.log(err)
    }
    done()
  })
}
