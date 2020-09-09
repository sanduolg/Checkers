import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import TipsForm from "../Common/TipsForm";
import GameData from "./GameData";
import { PlaneState, PlaneColor } from "./Plane/BasePlane";
import PlayerCtr from "./Players/PlayerCtr";
import NetManager from "../Network/NetManager";
const { ccclass, property } = cc._decorator;

export enum GameState {
    ready,
    gaming,
    finish,
}

@ccclass
export default class GameCtr {
    players: PlayerCtr[] = null
    nowActionPlayer: number = 0               //当前可操作玩家
    listSamePosPlane: number[][] = []
    onLoad() {
        EventCenter.on(EventType.GameDiceAnimFinish, this.setCurrentPlayerAnim, this)
        EventCenter.on(EventType.GameStart, this.onStartGame, this)
        EventCenter.on(EventType.GamePlaneAnimFinish, this.planeAnimFinish, this)
        EventCenter.on(EventType.GameCheckSamePos, this.checkPlanesSamePos, this)
    }

    start() {
    }
    setPlayerInfo(players: PlayerCtr[]) {
        this.players = players
    }

    onDestroy() {
        EventCenter.off(EventType.GameDiceAnimFinish, this.setCurrentPlayerAnim, this)
        EventCenter.off(EventType.GameStart, this.onStartGame, this)
        EventCenter.off(EventType.GamePlaneAnimFinish, this.planeAnimFinish, this)
        EventCenter.off(EventType.GameCheckSamePos, this.checkPlanesSamePos, this)
    }

    onStartGame() {
        this.setCanActionPlayer()
    }

    setCanActionPlayer() {
        this.players.forEach(player => {
            player.setArrowActive(false)
        });
        this.players[this.nowActionPlayer].setArrowActive(true)
    }

    setCurrentPlayerAnim(diceNum: number) {
        if (diceNum % 2 != 0) {
            if (this.players[this.nowActionPlayer].isPlaneStateOrigin()) {
                TipsForm.popUp("Prefab/Common/TipsFrom", "点数是2，4，6才能起飞")
                this.planeAnimFinish()
                return
            }
        }
        EventCenter.emit(EventType.GameSetDiceClick, false)
        this.players[this.nowActionPlayer].checkPlayPlaneAnim(diceNum)
    }

    planeAnimFinish() {
        this.setNowActionPlayer()
        this.setCanActionPlayer()
    }

    setNowActionPlayer() {
        this.nowActionPlayer = this.nowActionPlayer + 1;
        if (GameData.diceNum == GameData.AWARD_DICENUM) {
            this.nowActionPlayer = this.nowActionPlayer - 1;
        }
        if (this.nowActionPlayer > 3) {
            this.nowActionPlayer = this.nowActionPlayer - 4
        }
    }
    //检测相同位置飞机
    checkPlanesSamePos(planeClor: PlaneColor, localJumpStep: number) {
        console.log("planeClor:" + planeClor + "   localJumpStep:" + localJumpStep)
        this.listSamePosPlane = []
        this.players.forEach(player => {
            if (player.color != planeClor) {
                player.planesCtr.forEach(plane => {
                    if (plane.localJumpStep == localJumpStep) {
                        let info = [plane.playerChairId, plane.planeNum]
                        this.listSamePosPlane.push(info)
                    }
                })
            }
        })
        this.setSamePosPlaneReturnOrigin()
    }
    //设置飞机到原点
    setSamePosPlaneReturnOrigin() {
        if (this.listSamePosPlane.length > 0) {
            this.listSamePosPlane.forEach(info => {
                this.players[info[0]].planesCtr[info[1]].setPlaneOrigin()
            })
        }
    }


    // update (dt) {}
}
