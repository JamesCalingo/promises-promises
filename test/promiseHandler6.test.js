const APromise = require("../promiseHandler");

describe("Chaining promises", () => {
  it("the .then method should return a new promise", () => {
    expect(function () {
      const qOnFulfilled = jest.fn();
      const rOnFulfilled = jest.fn();
      const p = new APromise((fulfill) => fulfill());
      const q = p.then(qOnFulfilled);
      const r = q.then(rOnFulfilled);
    }).not.toThrow();
  });

  it("should transition to FULFILLED if the .then's onFulfilled is called without errors", () => {
    const value = "YOUR DATA, NOT NULL";
    const fn1 = jest.fn();
    new APromise((fulfill) => fulfill()).then(() => value).then(fn1);
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn1.mock.calls[0][0]).toBe(value);
  });

  it("should transition to FULFILLED if .then's onRejected is called without errors", () => {
    const value = "YOUR DATA, NOT NULL";
    const fn1 = jest.fn();
    new APromise((fulfill, reject) => reject())
      .then(null, () => value)
      .then(fn1);
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn1.mock.calls[0][0]).toBe(value);
  });

  it("should transition to REJECTED if .then's onFulfilled is called but an error occurs", () => {
    const reason = new Error("Some error occured");
    const fn1 = jest.fn();
    new APromise((fulfill) => fulfill())
      .then(() => {
        throw reason;
      })
      .then(null, fn1);
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn1.mock.calls[0][0]).toBe(reason);
  });

  it("should transition to REJECTED if .then's onRejected is called and an error occurs", () => {
    const reason = new Error("Some error occured");
    const fn1 = jest.fn();
    new APromise((fulfill, reject) => reject())
      .then(null, () => {
        throw reason;
      })
      .then(null, fn1);
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn1.mock.calls[0][0]).toBe(reason);
  });
});
