export class Client {

  private id : number;
  private age : number;
  private user_id: number;
  private created_at : Date;
  private updated_at : Date;

  constructor(id: number, age: number, user_id: number, created_at: Date, updated_at: Date) {
    this.id = id;
    this.age = age;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getId() : number {
    return this.id;
  }

  public getAge() : number {
    return this.age;
  }

  public getUserId() : number {
    return this.user_id;
  }

  public getCreatedAt() : Date {
    return this.created_at;
  }

  public getUpdatedAt() : Date {
    return this.updated_at;
  }
}