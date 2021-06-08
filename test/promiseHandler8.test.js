const APromise = require("../promiseHandler");

describe("Other important considerations for promises", () => {
  describe("working with invalid handlers", () => {
    it("works with invalid handlers (fulfill)", () => {
      const value = "YOUR DATA, NOT NULL";
      const f1 = jest.fn();

      const p = new APromise((fulfill) => fulfill(value));
      const q = p.then(null);
      q.then(f1);

      setTimeout(() => {
      expect(f1.mock.calls.length).toBe(1);
      expect(f1.mock.calls[0][0]).toBe(value);
    })
    });

    it("works with invalid handlers (reject)", () => {
      const reason = "Some error occured";
      const r1 = jest.fn();

      const p = new APromise((fulfill, reject) => reject(reason));
      const q = p.then(null, null);
      q.then(null, r1);
      setTimeout(() => {
      expect(r1.mock.calls.length).toBe(1);
      expect(r1.mock.calls[0][0]).toBe(reason);
    })
    });
  });

  describe("Executing handlers after event loop", () => {
    it("calls promise observers after event loop", (done) => {
      const value = "YOUR DATA, NOT NULL";
      const f1 = jest.fn();
      let resolved = false;

      const p = new APromise((fulfill) => {
        fulfill(value);
        resolved = true;
      }).then(f1);

      expect(f1.mock.calls.length).toBe(0);
      // This is at the "beginning", so to speak, so f1 hasn't run yet

      setTimeout( function()   {
        expect(f1.mock.calls.length).toBe(1);
        expect(f1.mock.calls[0][0]).toBe(value);
        expect(resolved).toBe(true);
        done();
      }, 10);
    });
    //NOTE: This code required to make this pass will require refactoring of a significant number of other tests to be changed to async (see promiseHandler line )
  });

  describe("Reject with resolved promise", () => {
    it("rejects with a resolved promise", (done) => {
      const value = "SOME VALUE";
      const reason = new APromise((fulfill) => fulfill(value));

      const r1 = jest.fn();
      const p = new APromise((fulfill) => fulfill())
        .then(() => {
          throw reason;
        })
        .then(null, r1);

      expect(r1.mock.calls.length).toBe(0);

      setTimeout(function () {
        expect(r1.mock.calls.length).toBe(1);
        expect(r1.mock.calls[0][0]).toBe(reason);
        done();
      }, 10);
    });
  });

  describe("Promise shouldn't be resolved with itself", () => {
    it("should throw when attempted to be resolved with itself", done => {
      const r1 = jest.fn()
      const p = new APromise(fulfill => fulfill())
      const q = p.then(()=> q)
      q.then(null, r1)

      setTimeout(function() {
        expect(r1.mock.calls.length).toBe(1)
        expect(r1.mock.calls[0][0] instanceof TypeError).toBe(true)
        done()
      }, 10)
    })
  })

  describe("Thenables", () => {
    it("should work with thenables", done => {
      const value = "YOUR DATA, NOT NULL"
      const thenable = {
        then:fulfill => fulfill(value)
      }
      const f1 = jest.fn()
      new APromise(fulfill => fulfill(value))
      .then(() => thenable)
      .then(f1)

      setTimeout(function() {
        expect(f1.mock.calls.length).toBe(1)
        expect(f1.mock.calls[0][0]).toBe(value)
        done()
      }, 10)
    })
  })
});
