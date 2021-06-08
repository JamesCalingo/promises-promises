const APromise = require("../promiseHandler")

describe("Observing changes in state of promise with '.then'", () => {

it("should have a .then method", () => {
  const promise = new APromise(() => {})
  expect(typeof promise.then).toBe("function")
})

it("should call the onFulfilled method when a promise is in a FULFILLED state", () => {
  const value = "YOUR DATA, NOT NULL";
  const onFulfilled = jest.fn()
  const promise = new APromise((fulfill, reject) => {
    fulfill(value)
  })
  .then(onFulfilled)
  expect(onFulfilled.mock.calls.length).toBe(1)
  expect(onFulfilled.mock.calls[0][0]).toBe(value)
})

it("transitions to the REJECTED state with a 'reason'", () => {
  const reason = "Some error occured";
  const onRejected = jest.fn();
  const promise = new APromise((fulfill, reject) => {
    reject(reason)
  })
  .then(null, onRejected)
  expect(onRejected.mock.calls.length).toBe(1)
  expect(onRejected.mock.calls[0][0]).toBe(reason)
})

})