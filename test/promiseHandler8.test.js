const APromise = require("../promiseHandler");

describe("Other important considerations for promises", () => {
  describe("working with invalid handlers", () => {
    it("works with invalid handlers (fulfill)", () => {
      const value = "YOUR DATA, NOT NULL";
      const f1 = jest.fn();

      const p = new APromise((fulfill) => fulfill(value));
      const q = p.then(null);
      q.then(f1);

      expect(f1.mock.calls.length).toBe(1);
      expect(f1.mock.calls[0][0]).toBe(value);
    });

    it("works with invalid handlers (reject)", () => {
      const reason = "Some error occured"
      const r1 = jest.fn();

      const p = new APromise((fulfill, reject) => reject(reason));
      const q = p.then(null, null);
      q.then(null, r1);

      expect(r1.mock.calls.length).toBe(1);
      expect(r1.mock.calls[0][0]).toBe(reason);
    });

    
  });


});
