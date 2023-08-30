import { ICrud } from "./@types";
import mongoose, { Connection } from "mongoose";

const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectando",
};

class MongoDB implements ICrud {
  connection: Connection;
  schema: any;
  constructor(connection: any, schema: any) {
    this.connection = connection;
    this.schema = schema;
  }
  connect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async isConnected(): Promise<any> {
    const state = STATUS[this.connection.readyState as keyof typeof STATUS];
    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return STATUS[this.connection.readyState as keyof typeof STATUS];
  }
  static connect(): Promise<any> {
    mongoose.connect("mongodb://ramirezmz:admin@localhost:27017");

    const connection = mongoose.connection;

    connection.on("error", (error) => {
      console.log("Falha na conexão!", error);
    });

    connection.once("open", () => console.log("database rodando!!"));
    return connection as any;
  }
  create(item: any) {
    return this.schema.create(item);
  }
  read(item: any, skip: number = 0, limit: number = 10): Promise<any> {
    return this.schema.find(item).skip(skip).limit(limit);
  }
  update(id: string, item: any): Promise<any> {
    return this.schema.updateOne({ _id: id }, { $set: item });
  }
  delete(id: string): Promise<any> {
    return this.schema.deleteOne({ _id: id });
  }
}

export default MongoDB;
