const APromise = require("../promiseHandler")

describe("Chaining promises", () => {
  it("the .then method should return a new promise", () => {
    expect(function() {
      const qOnFulfilled = jest.fn()
      const rOnFulfilled = jest.fn()
      const p = new APromise(fulfill => fulfill())
      const q = p.then(qOnFulfilled)
      const r = q.then(rOnFulfilled)
    }).not.toThrow()
  })
})