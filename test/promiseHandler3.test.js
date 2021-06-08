const APromise = require("../promiseHandler");

describe("Ensuring that promises do not change state on resolve", () => {
  const value = "YOUR DATA, NOT NULL";
  const reason = "Some error occured";

  it("should not be rejected with another value if promise is fulfilled", (done) => {
    const onFulfilled = jest.fn();
    const onRejected = jest.fn();

    const promise = new APromise((resolve, reject) => {
      resolve(value);
      reject(reason);
    });
    promise.then(onFulfilled, onRejected);
    setTimeout(() => {
      expect(onFulfilled.mock.calls.length).toBe(1);
      expect(onFulfilled.mock.calls[0][0]).toBe(value);
      expect(onRejected.mock.calls.length).toBe(0);
      expect(promise.state === "FULFILLED");
      done();
    }, 10);
  });

  it("should not be fulfilled with another value if promise is rejected", (done) => {
    const onFulfilled = jest.fn();
    const onRejected = jest.fn();

    const promise = new APromise((resolve, reject) => {
      reject(reason);
      resolve(value);
    });
    promise.then(onFulfilled, onRejected);

    setTimeout(() => {
      expect(onRejected.mock.calls.length).toBe(1);
      expect(onRejected.mock.calls[0][0]).toBe(reason);
      expect(onFulfilled.mock.calls.length).toBe(0);
      expect(promise.state === "REJECTED");
      done();
    }, 10);
  });
});
