import { CosmicObject } from "./cosmic-object";

export enum ComethDirections {
    UP = "up",
    RIGHT = "right",
    DOWN = "down",
    LEFT = "left",
}

export class Cometh extends CosmicObject {
    private direction: ComethDirections
    constructor(row: number, column: number, direction: ComethDirections) {
        super(row, column);
        this.direction = direction;
    }

    public get getDirection() : ComethDirections {
        return this.direction;
    }
}