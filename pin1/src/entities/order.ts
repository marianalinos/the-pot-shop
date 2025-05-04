export class Order {
    
    public static status = {
        PENDING: 0,
        PAID: 1,
        CANCELED: 2,
    };
    
    private orde_id: number;
    private orde_nf: string;
    private orde_status: number;
    private cart_id: number;
    private created_at: Date;
    private updated_at: Date;

    constructor(
        id: number,
        cart_id: number,
        orde_status: number,
        orde_nf: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.orde_id = id;
        this.orde_status = orde_status;
        this.cart_id = cart_id;
        this.orde_nf = orde_nf;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public getId(): number {
        return this.orde_id;
    }

    public getCartId(): number {
        return this.cart_id;
    }

    public getStatus(): number {
        return this.orde_status;
    }

    public getNf(): string {
        return this.orde_nf;
    }
    
    public getCreatedAt(): Date {  
        return this.created_at;
    }

    public getUpdatedAt(): Date {
        return this.updated_at;
    }
}

export type OrderDTO = {
    id: number;
    cart_id: number;
    orde_status: number;
    orde_nf: string;
    created_at: Date;
    updated_at: Date;
};
