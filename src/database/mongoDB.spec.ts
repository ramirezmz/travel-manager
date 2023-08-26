import assert from "assert";
import MongoDB from "./mongoDB";
import ContextStrategy from "./context/ContextStragegy";
import UserSchema from "./schemas/UserSchema";
import mongoose from "mongoose";

let context: any;

const MOCK_USER_DEFAULT = {
  name: `Homen de Ferro-${Date.now()}`,
  age: 25,
};

describe("MongoDB Suite de testes", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    const connection = await MongoDB.connect();
    context = new ContextStrategy(new MongoDB(connection, UserSchema));
  });

  describe("isConnection", () => {
    it("Should return true when connection was done", async () => {
      const result = await context.isConnected();
      assert.equal(result, "Conectado");
    });
  });
  describe("Create User", () => {
    it("Should create a user with correct params", async () => {
      const { name, age } = await context.create(MOCK_USER_DEFAULT);
      assert.deepStrictEqual({ name, age }, MOCK_USER_DEFAULT);
    });
    it("Should return throw error when it not passed obrigatory params", async () => {
      try {
        const result = await context.create({});
        assert.fail(result);
      } catch (error) {
        assert.ok(error instanceof mongoose.Error.ValidationError);
        assert.deepStrictEqual(
          error.errors.name.message,
          "Path `name` is required."
        );
      }
    });
  });
  describe("Find Users", () => {
    it("Should return a list of users", async () => {
      const result = await context.read({}, 0, 10);
      assert.ok(Array.isArray(result));
    });
  });
});
