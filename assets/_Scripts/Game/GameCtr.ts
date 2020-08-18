import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import TipsForm from "../Common/TipsForm";
import { PlaneState } from "./Plane/BasePlane";
import PlayerCtr from "./Players/PlayerCtr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtr {
    players: PlayerCtr[] = null
    onLoad() {
        EventCenter.on(EventType.GameDiceAnimFinish, this.isCanFlying, this)
    }

    start() {
        
    }
    setPlayerInfo(players:PlayerCtr[]){
        this.players = players
    }

    onDestroy() {
        EventCenter.off(EventType.GameDiceAnimFinish, this.isCanFlying, this)
    }

    isCanFlying(diceNum: number) {
        if (diceNum % 2 == 0) {
            this.players[0].setPlaneState(0,PlaneState.flying)
            this.players[0].setPlaneState(3,PlaneState.flying)
        } else {
            TipsForm.popUp("Prefab/Common/TipsFrom", "点数是2，4，6才能起飞")
        }
    }


    // update (dt) {}
}
