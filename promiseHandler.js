const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class APromise {
  constructor(executor) {
    this.state = PENDING;
    this.queue = []
    doResolve(this, executor);
  }

  then(onFulfilled, onRejected) {
    const promise = new APromise(() => {})
    handle(this, { onFulfilled, onRejected });
    return promise
  }
}

function handle(promise, handler) {
  if(promise.state === PENDING) {
    promise.queue.push(handler)
  }else {
    handleResolved(promise, handler)
  }
}

function handleResolved(promise, handler) {
  const cb = promise.state === FULFILLED ? handler.onFulfilled : handler.onRejected;
  cb(promise.value);
}

function fulfill(promise, value) {
  promise.state = FULFILLED;
  promise.value = value;
  finale(promise)
}

function reject(promise, reason) {
  promise.state = REJECTED;
  promise.value = reason;
  finale(promise)
}

function finale(promise) {
  const length = promise.queue.length
  for(let i = 0; i < length; i++) {
    handle(promise, promise.queue[i])
  }
}

function doResolve(promise, executor) {
  let called = false;

  function wrapFulfill(value) {
    if (called) return;
    called = true;
    fulfill(promise, value);
  }

  function wrapReject(reason) {
    if (called) return;
    called = true;
    reject(promise, reason);
  }

  try {
    executor(wrapFulfill, wrapReject);
  } catch (err) {
    wrapReject(err);
  }
}

module.exports = APromise;
