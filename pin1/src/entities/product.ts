export class Product{

public static readonly TYPE_HIGHLIGHT = 1;
public static readonly TYPE_OFFER = 2;
public static readonly TYPE_ACCESSORY = 3;
public static readonly TYPE_BEACHWEAR = 4;

  private prod_id: number;
  private prod_name: string;
  private prod_price: number;
  private prod_img: string;
  private prod_type: number
  private cata_id: number;
  private prod_desc: string;
  private created_at: Date;
  private updated_at: Date;
  
  constructor(
    id: number,
    name: string,
    price: number,
    img: string,
    type: number,
    cata_id: number,
    prod_desc: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.prod_id = id;
    this.prod_name = name;
    this.prod_price = price;
    this.cata_id = cata_id;
    this.prod_desc = prod_desc;
    this.prod_type = type;
    this.prod_img = img;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getId(): number {
    return this.prod_id;
  }

  public getDesc(): string {
    return this.prod_desc;
  }

  public setDesc(desc: string): void {
    this.prod_desc = desc;
  }

  public getCataId(): number {
    return this.cata_id;
  }

  public getName(): string {
    return this.prod_name;
  }

  public getPrice(): number {
    return this.prod_price;
  }

  public getImg(): string {
    return this.prod_img;
  }

  public getType(): number {
    return this.prod_type;
  }

  public getCreatedAt(): Date {
		return this.created_at;
	}

	public getUpdatedAt(): Date {
		return this.updated_at;
	}
  
}