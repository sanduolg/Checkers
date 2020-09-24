import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import TipsForm from "../Common/TipsForm";
import GameData from "./GameData";
import { PlaneState, PlaneColor } from "./Plane/BasePlane";
import PlayerCtr from "./Players/PlayerCtr";
import NetManager from "../Network/NetManager";
import PlaneCtr from "./Plane/PlaneCtr";
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
    nowPlane: PlaneCtr = null
    onLoad() {
        EventCenter.on(EventType.GameDiceAnimFinish, this.setCurrentPlayerAnim, this)
        EventCenter.on(EventType.GameStart, this.onStartGame, this)
        EventCenter.on(EventType.GamePlaneAnimFinish, this.planeAnimFinish, this)
        EventCenter.on(EventType.GamePlaneJumpEnd, this.planeJumpEnd, this)
        EventCenter.on(EventType.GameSetNowPlane, this.setNowPlane, this)
    }

    onDestroy() {
        EventCenter.off(EventType.GameDiceAnimFinish, this.setCurrentPlayerAnim, this)
        EventCenter.off(EventType.GameStart, this.onStartGame, this)
        EventCenter.off(EventType.GamePlaneAnimFinish, this.planeAnimFinish, this)
        EventCenter.off(EventType.GamePlaneJumpEnd, this.planeJumpEnd, this)
        EventCenter.off(EventType.GameSetNowPlane, this.setNowPlane, this)
    }

    start() {
    }
    setPlayerInfo(players: PlayerCtr[]) {
        this.players = players
    }
    setNowPlane(plane: PlaneCtr) {
        this.nowPlane = plane
        console.log(this.nowPlane.name)
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

    planeJumpEnd(planeClor: PlaneColor, localJumpStep: number) {
        this.checkPlanesSamePos(planeClor, localJumpStep)
        if (this.chackGameIsEnd()) {
            console.log('游戏结束')
            EventCenter.emit(EventType.GameRestart)
            this.players.forEach(player => {
                player.planesCtr.forEach(plane => {
                    plane.setPlaneOrigin()
                });
            });
        }
    }
    //检测相同位置飞机
    checkPlanesSamePos(planeClor: PlaneColor, localJumpStep: number) {
        console.log("planeClor:" + planeClor + "   localJumpStep:" + localJumpStep)
        if (localJumpStep < 0)
            return
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
        //设置相同位置两架飞机 落在此位置的飞机也要返回到原点
        if (this.listSamePosPlane.length >= 2) {
            this.nowPlane.setPlaneOrigin()
        }
    }

    chackGameIsEnd(): boolean {
        for (var i = 0; i < this.players.length; i++) {
            if (!this.players[i].checkAllPlaneIsEnd()) {
                return false
            }
        }
        return true
    }

    // update (dt) {}
}
