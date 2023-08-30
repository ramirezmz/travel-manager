import assert from "assert";
import MongoDB from "./mongoDB";
import ContextStrategy from "./context/ContextStragegy";
import UserSchema from "./schemas/UserSchema";
import mongoose from "mongoose";

let context: any;

const MOCK_USER_DEFAULT = {
  name: `Homen de Ferro-${Date.now()}`,
  age: 25,
  email: `homen_de_ferro${Date.now()}@mail.com`,
};

describe("MongoDB Suite de testes", function () {
  let pedroId: any;
  this.timeout(Infinity);
  this.beforeAll(async function () {
    const connection = await MongoDB.connect();
    context = new ContextStrategy(new MongoDB(connection, UserSchema));

    pedroId = await context.create({
      name: "Pedro",
      age: 2,
      email: `pedro${Date.now()}@mail.com`,
    });
  });
  describe("isConnection", () => {
    it("Should return true when connection was done", async () => {
      const result = await context.isConnected();
      assert.equal(result, "Conectado");
    });
  });
  describe("Create User", () => {
    it("Should create a user with correct params", async () => {
      const { name, age, email } = await context.create(MOCK_USER_DEFAULT);
      assert.deepStrictEqual({ name, age, email }, MOCK_USER_DEFAULT);
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
    it("Should return 0 when passed duplicated email", async () => {
      try {
        const MOCK = {
          name: "Pedro",
          age: 2,
          email: pedroId.email,
        };
        await context.create(MOCK);
      } catch (error: any) {
        assert.deepStrictEqual(error.index, 0);
      }
    });
  });
  describe("Find Users", () => {
    it("Should return a list of users", async () => {
      const result = await context.read({}, 0, 10);
      assert.ok(Array.isArray(result));
    });
    it("Should return a user when it passed correct id or email", async () => {
      const result = await context.read({ _id: pedroId._id });
      assert.deepStrictEqual(result[0].name, "Pedro");
    });
  });
  describe("Update User", () => {
    it("Should update a user when it passed correct id", async () => {
      const getPedroId = pedroId._id.toString();
      const result = await context.update(getPedroId, {
        name: "Messi",
      });
      assert.deepStrictEqual(result.modifiedCount, 1);
    });
  });
  describe("Delete User", () => {
    it("Should delete a user when it passed correct id", async () => {
      const getPedroId = pedroId._id.toString();
      const result = await context.delete(getPedroId);
      assert.deepStrictEqual(result.deletedCount, 1);
    });
  });
});
