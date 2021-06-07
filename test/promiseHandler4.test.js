const APromise = require("../promiseHandler");

describe("handling executor errors", () => {
  it("should transition to the REJECTED state if the executor fails", () => {
    const reason = new Error("Some error occured");
    const onRejected = jest.fn();
    const promise = new APromise((resolve, reject) => {
      throw reason;
    });
    promise.then(null, onRejected);
    expect(onRejected.mock.calls.length).toBe(1);
    expect(onRejected.mock.calls[0][0]).toBe(reason);
    expect(promise.state === "REJECTED");
  });
});
