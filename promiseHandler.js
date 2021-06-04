const PENDING = "PENDING"
const RESOLVED = "RESOLVED"
const REJECTED = "REJECTED"

class APromise {
  constructor(executor) {
    this.state = PENDING
    doResolve(this, executor)
  }
}

function resolve(promise, value) {
  promise.state = RESOLVED
  promise.value = value
}

function reject(promise, reason) {
  promise.state = REJECTED
  promise.reason = reason
}

function doResolve(promise, executor) {
  function wrapFulfill(value) {
    resolve(promise, value)
  }

  function wrapReject(reason) {
    reject(promise, reason)
  }

  executor(wrapFulfill, wrapReject)
}

module.exports = APromise