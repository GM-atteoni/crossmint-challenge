import axios from 'axios';
import { Cometh, ComethDirections } from '../models/cometh';
import { Polyanet } from '../models/polyanet';
import { Soloon } from '../models/soloon';
import { delay } from '../util/delay';
import { applyInterceptor, CANDIDATE_ID } from './middlewares/crossmint-middleware';

applyInterceptor(axios)
const API_URI = 'https://challenge.crossmint.io/api/'

enum UnitState {
    SPACE = 'SPACE',
    POLYANET = 'POLYANET',
    BLUE_SOLOON = 'BLUE_SOLOON',
    PURPLE_SOLOON = 'PURPLE_SOLOON',
    WHITE_SOLOON = 'WHITE_SOLOON',
    RED_SOLOON = 'RED_SOLOON',
    UP_COMETH = 'UP_COMETH',
    RIGHT_COMETH = 'RIGHT_COMETH',
    LEFT_COMETH = 'LEFT_COMETH',
    DOWN_COMETH = 'DOWN_COMETH'
}

interface GoalMap {
    data: {
        goal: [][]
    }
}

export const placePolyanet = async (polyanet: Polyanet) => {
    await axios.post(`${API_URI}polyanets`, {
        row: polyanet.getRow,
        column: polyanet.getColumn
    }).then(() => {
        console.log('Polyanet placed')
    }).catch(() => {
        console.log('Failed to place Polyanet')
    })
}

export const placeSoloon = async (soloon: Soloon) => {
    await axios.post(`${API_URI}soloons`, {
        row: soloon.getRow,
        column: soloon.getColumn,
        color: soloon.getColor
    }).then(() => {
        console.log('Soloon placed')
    }).catch(() => {
        console.log('Failed to place Soloon')
    })
}

export const placeCometh = async (cometh: Cometh) => {
    await axios.post(`${API_URI}comeths`, {
        row: cometh.getRow,
        column: cometh.getColumn,
        direction: cometh.getDirection
    }).then(() => {
        console.log('Cometh placed')
    }).catch(() => {
        console.log('Failed to place Cometh')
    })
}

export const getGoalMap = async (): Promise<GoalMap> => {
    return await axios.get(`${API_URI}map/${CANDIDATE_ID}/goal`)
}

export const clearMap = async () => {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            await delay(1000);
            await axios.delete(`${API_URI}polyanets`, {
                data: {
                    row: i,
                    column: j
                }
            }).then(() => {
                console.log('unit cleared')
            }).catch(() => {
                console.log('Failed to clear unit')
            })
        }
    }
}

export const placeObject = async (unitState: UnitState, row: number, column: number) => {
    switch (unitState) {
        case UnitState.SPACE:
            console.log('Space unit!')
            break;
        case UnitState.POLYANET:
            await placePolyanet(new Polyanet(row, column))
            break;
        case UnitState.RED_SOLOON:
            await placeSoloon(new Soloon(row, column, 'red'))
            break;
        case UnitState.BLUE_SOLOON:
            await placeSoloon(new Soloon(row, column, 'blue'))
            break;
        case UnitState.WHITE_SOLOON:
            await placeSoloon(new Soloon(row, column, 'white'))
            break;
        case UnitState.PURPLE_SOLOON:
            await placeSoloon(new Soloon(row, column, 'purple'))
            break;
        case UnitState.UP_COMETH:
            await placeCometh(new Cometh(row, column, ComethDirections.UP))
            break;
        case UnitState.RIGHT_COMETH:
            await placeCometh(new Cometh(row, column, ComethDirections.RIGHT))
            break;
        case UnitState.DOWN_COMETH:
            await placeCometh(new Cometh(row, column, ComethDirections.DOWN))
            break;
        case UnitState.LEFT_COMETH:
            await placeCometh(new Cometh(row, column, ComethDirections.LEFT))
            break;

        default:
            break;
    }
    // console.log(`STATE: ${unitState} ROW: ${row} COLUMN ${column}`)
}