const APromise = require("../promiseHandler");

describe("Async executor", () => {
  it("should queue callbacks when the promise is not fulfilled immediately", (done) => {
    const value = "YOUR DATA, NOT NULL";
    const promise = new APromise((fulfill, reject) => {
      setTimeout(fulfill, 1, value);
    });

    const onFulfilled = jest.fn();

    promise.then(onFulfilled);
    setTimeout(() => {
      expect(onFulfilled.mock.calls.length).toBe(1);
      expect(onFulfilled.mock.calls[0][0]).toBe(value);
      promise.then(onFulfilled);
    }, 5);

    expect(onFulfilled.mock.calls.length).toBe(0);
    // Remember, we're delaying fulfillment by a bit. This means that on initialization, we shouldn't have anything fulfilled yet.

    setTimeout(function () {
      expect(onFulfilled.mock.calls.length).toBe(2);
      expect(onFulfilled.mock.calls[1][0]).toBe(value);
      done();
    }, 10);
  });

  it("should queue callbacks when the promise is not rejected immediately", (done) => {
    const reason = "Some error occured";
    const promise = new APromise((fulfill, reject) => {
      setTimeout(reject, 1, reason);
    });

    const onRejected = jest.fn();

    promise.then(null, onRejected);
    setTimeout(() => {
      expect(onRejected.mock.calls.length).toBe(1);
      expect(onRejected.mock.calls[0][0]).toBe(reason);
      promise.then(null, onRejected);
    }, 5);

    expect(onRejected.mock.calls.length).toBe(0);
    // Remember, we're delaying fulfillment by a bit. This means that on initialization, we shouldn't have anything fulfilled yet.

    setTimeout(function () {
      expect(onRejected.mock.calls.length).toBe(2);
      expect(onRejected.mock.calls[1][0]).toBe(reason);
      done();
    }, 10);
  });
});
