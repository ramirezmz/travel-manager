export interface ICrud {
  isConnected(): Promise<any>;
  connect(): Promise<void>;
  create(item: any): Promise<any>;
  read(item: any, skip: number, limit: number): Promise<any>;
  update(id: string, item: any): Promise<any>;
  delete(id: string): Promise<any>;
}
