import { clearMap, getGoalMap, placeObject } from "./services/crossmint-service";
import { delay } from "./util/delay";

(async () => {
 const {data: {goal}} = await getGoalMap();

 for (let i = 0; i < goal.length; i++) {
    for (let j = 0; j < goal[i].length; j++) {
        await delay(1000)
        placeObject(goal[i][j], i , j)
    }
 }

})();

// clearMap();