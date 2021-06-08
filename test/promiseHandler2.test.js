const APromise = require("../promiseHandler");

describe("Observing changes in state of promise with '.then'", () => {
  it("should have a .then method", () => {
    const promise = new APromise(() => {});
    expect(typeof promise.then).toBe("function");
  });

  it("should call the onFulfilled method when a promise is in a FULFILLED state", (done) => {
    const value = "YOUR DATA, NOT NULL";
    const onFulfilled = jest.fn();
    const promise = new APromise((fulfill, reject) => {
      fulfill(value);
    }).then(onFulfilled);
    setTimeout(() => {
      expect(onFulfilled.mock.calls.length).toBe(1);
      expect(onFulfilled.mock.calls[0][0]).toBe(value);
      done();
    }, 10);
  });

  it("transitions to the REJECTED state with a 'reason'", (done) => {
    const reason = "Some error occured";
    const onRejected = jest.fn();
    const promise = new APromise((fulfill, reject) => {
      reject(reason);
    }).then(null, onRejected);
    expect(onRejected.mock.calls.length).toBe(0);

    setTimeout(() => {
      expect(onRejected.mock.calls.length).toBe(1);
      expect(onRejected.mock.calls[0][0]).toBe(reason);
      done();
    }, 10);
  });
});
