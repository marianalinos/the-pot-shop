export class Catalogue{
    private id : number;
    private title : string;

    constructor(id : number, title : string){
        this.id = id;
        this.title = title;
    }

    getTitle() : string{
        return this.title;
    }
    setTitle(title : string){
        this.title = title;
    }
    getId() : number{
        return this.id;
    }

}

