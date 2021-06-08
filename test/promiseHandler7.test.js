const APromise = require("../promiseHandler");

describe("Asynchronous handlers with chained promises", () => {
  it("if a handler returns a promise, the previous promise should adopt the state of the returned promise", () => {
    const value = "YOUR DATA, NOT NULL";
    const fn1 = jest.fn();
    new APromise((fulfill) => fulfill())
      .then(() => new APromise((resolve) => resolve(value)))
      .then(fn1);
    expect(fn1.mock.calls.length).toBe(1);
    expect(fn1.mock.calls[0][0]).toBe(value);
  });

  it("if a handler returns a promise resolved in the future, the previous promise should adopt its value", (done) => {
    const value = "YOUR DATA, NOT NULL";
    const fn1 = jest.fn();
    new APromise((fulfill) => setTimeout(fulfill, 0))
      .then(() => new APromise((resolve) => setTimeout(resolve, 0, value)))
      .then(fn1);
    setTimeout(() => {
      expect(fn1.mock.calls.length).toBe(1);
      expect(fn1.mock.calls[0][0]).toBe(value);
      done();
    }, 10);
  });
});
