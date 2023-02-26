export class CosmicObject {
    private row: number;
    private column: number;

    constructor(row: number, column: number){
        this.column = column;
        this.row = row;
    }

    public get getRow() : number {
        return this.row
    }

    public get getColumn() : number {
        return this.column
    }
}