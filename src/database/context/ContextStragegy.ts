import { ICrud } from "../@types";

class ContextStrategy implements ICrud {
  database: ICrud;
  constructor(database: ICrud) {
    this.database = database;
  }
  isConnected(): Promise<boolean> {
    return this.database.isConnected();
  }
  connect(): Promise<void> {
    return this.database.connect();
  }
  create(item: any): Promise<any> {
    return this.database.create(item);
  }
  read(item: any): Promise<any> {
    return this.database.read(item);
  }
  update(id: string, item: any): Promise<any> {
    return this.database.update(id, item);
  }
  delete(id: string): Promise<any> {
    return this.database.delete(id);
  }
}

export default ContextStrategy;
