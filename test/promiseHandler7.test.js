const APromise = require("../promiseHandler");

describe("Asynchronous handlers with chained promises", () => {
  it("if a handler returns a promise, the previous promise should adopt the state of the returned promise", () => {
    const value = "YOUR DATA, NOT NULL";
    const f1 = jest.fn();
    new APromise((fulfill) => fulfill())
      .then(() => new APromise((resolve) => resolve(value)))
      .then(f1);

    setTimeout(() => {
      expect(f1.mock.calls.length).toBe(1);
      expect(f1.mock.calls[0][0]).toBe(value);
    });
  });

  it("if a handler returns a promise resolved in the future, the previous promise should adopt its value", (done) => {
    const value = "YOUR DATA, NOT NULL";
    const f1 = jest.fn();
    new APromise((fulfill) => setTimeout(fulfill, 0))
      .then(() => new APromise((resolve) => setTimeout(resolve, 0, value)))
      .then(f1);
    setTimeout(() => {
      expect(f1.mock.calls.length).toBe(1);
      expect(f1.mock.calls[0][0]).toBe(value);
      done();
    }, 10);
  });
});
