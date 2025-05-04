export class Item{
    private id : number
    private id_product : number 
    private id_cart : number | null
    private created_at : Date | null
    private updated_at : Date | null


  constructor(id_item : number, 
    id_product : number, 
    id_cart : number|null, 
    created_at : Date|null, 
    updated_at : Date|null
    ){
    this.id = id_item
    this.id_product = id_product
    this.id_cart = id_cart
    this.created_at = created_at
    this.updated_at = updated_at
  }

  public getId() : number{
    return this.id
  }

  public getId_product() : number{
    return this.id_product
  }

  public getCartId() : number | null{
    return this.id_cart
  }

  public getCreated_at() : Date | null{
    return this.created_at
  }

  public getUpdated_at() : Date | null{
    return this.updated_at
  }

  public setUpdated_at(updated_at : Date | null) : void{
    this.updated_at = updated_at
  }


}

export type ItemDTO = {
  id : number
  id_product : number
  id_cart : number | null
}
