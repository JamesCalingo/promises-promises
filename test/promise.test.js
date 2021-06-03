const promiseHandler = require("../promiseHandler");

it("receives an executor functionwhen constructed which is immediately called", () => {
  const executor = jest.fn();
  const promise = new APromise(executor);
  expect(executor.mock.calls.length).toBe(1);
  expect(typeof executor.mock.calls[0][0]).toBe("function");
  expect(typeof executor.mock.calls[0][1]).toBe("function");
});

it("is in a PENDING state", () => {
  const promise = new APromise(function executor(resolve, reject) {});
  expect(promise.state).toBe("PENDING");
});

it("transitions to RESOLVED state with 'value'", () => {
  const value = "promise resolved";
  const promise = new APromise((resolve, reject) => {
    resolve(value);
  });
  expect(promise.state).toBe("RESOLVED");
});

it("transitions to REJECTED state with a 'reason'", () => {
  const reason = "some error occured";
  const promise = new APromise((resolve, reject) => {
    reject(reason);
  });
  expect(promise.state).toBe("REJECTED");
});
