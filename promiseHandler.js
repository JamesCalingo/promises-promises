const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class APromise {
  constructor(executor) {
    this.state = PENDING;
    this.queue = [];
    doResolve(this, executor);
  }

  then(onFulfilled, onRejected) {
    const promise = new APromise(() => {});
    handle(this, { promise, onFulfilled, onRejected });
    return promise;
  }
}

function handle(promise, handler) {
  while (promise.state !== REJECTED && promise.value instanceof APromise) {
    promise = promise.value;
  }
  if (promise.state === PENDING) {
    promise.queue.push(handler);
  } else {
    handleResolved(promise, handler);
  }
}

function handleResolved(promise, handler) {
  // The tutorial uses SetImmediate for this, but that causes ReferenceErrors in Jest...
  setTimeout(() => {
    const cb =
      promise.state === FULFILLED ? handler.onFulfilled : handler.onRejected;

    if (typeof cb !== "function") {
      if (promise.state === FULFILLED) {
        fulfill(handler.promise, promise.value);
      } else {
        reject(handler.promise, promise.value);
      }
      return;
    }
    try {
      const value = cb(promise.value);
      fulfill(handler.promise, value);
    } catch (err) {
      reject(handler.promise, err);
    }
  });
}

function fulfill(promise, value) {
  if (value === promise) {
    return reject(promise, new TypeError());
  }

  if (value && (typeof value === "object" || typeof value === "function")) {
    let then;
    try {
      then = value.then;
    } catch (err) {
      return reject(promise, err);
    }

    if (then === promise.then && promise instanceof APromise) {
      promise.state = FULFILLED;
      promise.value = value;
      return finale(promise);
    }

    if (typeof then === "function") {
      return doResolve(promise, then.bind(value));
    }
  }

  promise.state = FULFILLED;
  promise.value = value;
  finale(promise);
}

function reject(promise, reason) {
  promise.state = REJECTED;
  promise.value = reason;
  finale(promise);
}

function finale(promise) {
  const length = promise.queue.length;
  for (let i = 0; i < length; i++) {
    handle(promise, promise.queue[i]);
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
