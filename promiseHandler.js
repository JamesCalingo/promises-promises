const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class APromise {
  constructor(executor) {
    this.state = PENDING;
    doResolve(this, executor);
  }

  then(onFulfilled, onRejected) {
    handleResolved(this, onFulfilled, onRejected);
  }
}

function handleResolved(promise, onFulfilled, onRejected) {
  const cb = promise.state === FULFILLED ? onFulfilled : onRejected;
  cb(promise.value);
}

function fulfill(promise, value) {
  promise.state = FULFILLED;
  promise.value = value;
}

function reject(promise, reason) {
  promise.state = REJECTED;
  promise.value = reason;
}

function doResolve(promise, executor) {
  function wrapFulfill(value) {
    fulfill(promise, value);
  }

  function wrapReject(reason) {
    reject(promise, reason);
  }

  executor(wrapFulfill, wrapReject);
}

module.exports = APromise;
