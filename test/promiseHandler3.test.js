const APromise = require("../promiseHandler");
const value = "YOUR DATA, NOT NULL"
const reason = "Some error occured"

describe("Promise constructor", () => {

  it("should not be rejected with another value if promise is fulfilled", () => {
    const onFulfilled = jest.fn()
    const onRejected = jest.fn()

    const promise = new APromise((resolve, reject) => {
      resolve(value)
      reject(reason)
    })
    promise.then(onFulfilled, onRejected)

    expect(onFulfilled.mock.calls.length).toBe(1)
    expect(onFulfilled.mock.calls[0][0]).toBe(value)
    expect(onRejected.mock.calls.length).toBe(0)
    expect(promise.state === "FULFILLED")
  })

it("should not be fulfilled with another value if promise is rejected", () => {
  const onFulfilled = jest.fn()
  const onRejected = jest.fn()

  const promise = new APromise((resolve, reject) => {
    reject(reason)
    resolve(value)
  })
  promise.then(onFulfilled, onRejected)

  expect(onRejected.mock.calls.length).toBe(1)
  expect(onRejected.mock.calls[0][0]).toBe(reason)
  expect(onFulfilled.mock.calls.length).toBe(0)
  expect(promise.state === "REJECTED")
})

})