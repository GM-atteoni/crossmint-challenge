import { CosmicObject } from "./cosmic-object";

export class Soloon extends CosmicObject {
    private color: string;
    constructor(row: number, column: number, color: string) {
        super(row, column);
        this.color = color;
    }


    public get getColor(): string {
        return this.color;
    }
}