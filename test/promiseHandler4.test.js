const APromise = require("../promiseHandler");

describe("Handling executor/resolver errors", () => {
  it("should transition to the REJECTED state if the executor fails", () => {
    const reason = new Error("Some error occured");
    const onRejected = jest.fn();
    const promise = new APromise((resolve, reject) => {
      throw reason;
    });
    promise.then(null, onRejected);

    setTimeout(() => {
    expect(onRejected.mock.calls.length).toBe(1);
    expect(onRejected.mock.calls[0][0]).toBe(reason);
    expect(promise.state === "REJECTED");
  }, 10)
  });
});

// NOTE: I did this without adding the "done" paramter
