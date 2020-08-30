import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import TipsForm from "../Common/TipsForm";
import GameData from "./GameData";
import { PlaneState } from "./Plane/BasePlane";
import PlayerCtr from "./Players/PlayerCtr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtr {
    players: PlayerCtr[] = null
    nowActionPlayer:number = 0               //当前可操作玩家
    onLoad() {
        EventCenter.on(EventType.GameDiceAnimFinish, this.setCurrentPlayerAnim, this)
    }

    start() {

    }
    setPlayerInfo(players: PlayerCtr[]) {
        this.players = players
    }

    onDestroy() {
        EventCenter.off(EventType.GameDiceAnimFinish, this.setCurrentPlayerAnim, this)
    }

    setCurrentPlayerAnim(diceNum: number) {
        if (diceNum % 2 != 0) {
            if (this.players[0].isPlaneStateOrigin()) {
                TipsForm.popUp("Prefab/Common/TipsFrom", "点数是2，4，6才能起飞")
                return
            }
        }
        this.players[0].checkPlayPlaneAnim(diceNum)
    }




    // update (dt) {}
}
