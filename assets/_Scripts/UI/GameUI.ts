import CocosHelper from "../Common/CocosHelper";
import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import { FormType } from "../Common/SysDefine";
import UIBase from "../Common/UIBase";
import { CommonUtils } from "../Common/Utils/CommonUtils";
import GameCtr, { GameState } from "../Game/GameCtr";
import PlayerCtr from "../Game/Players/PlayerCtr";
import GameData from "../Game/GameData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends UIBase {
    formType = FormType.SceneBase
    canDestory = true;
    static prefabPath = "GameUI";
    gameCtr: GameCtr = null
    btnDice: cc.Button = null
    players: PlayerCtr[] = []
    btnStart: cc.Button = null
    mask: cc.Node = null
    onLoad() {
        this.gameCtr = new GameCtr()
        this.gameCtr.onLoad()
        EventCenter.on(EventType.GameSetDiceClick, this.setBtnDice, this)
    }
    start() {
        this.gameCtr.start()
        this.btnDice = this.node.getChildByName('btnDice').getComponent(cc.Button)
        this.btnStart = this.node.getChildByName('btnStart').getComponent(cc.Button)
        this.onClickAdd(this.btnDice, this.onClickDice, this)
        this.onClickAdd(this.btnStart, this.onClickStart, this)
        this.mask = this.node.getChildByName('Mask')
        for (var i = 0; i < 4; i++) {
            this.players[i] = CocosHelper.findChildInNode("player" + i, this.node).getComponent(PlayerCtr)
            this.players[i].chairId = i
            this.players[i].color = i + 1
        }

        this.gameCtr.setPlayerInfo(this.players)
    }
    onDestroy() {
        this.gameCtr.onDestroy()
        EventCenter.off(EventType.GameSetDiceClick, this.setBtnDice, this)
    }


    onClickDice() {
        let num = CommonUtils.randomRange(1, 6)
        console.log("骰子数：" + num)
        EventCenter.emit(EventType.GameClickDice, num)
    }

    setBtnDice(isAble: boolean) {
        this.btnDice.interactable = isAble
    }

    onClickStart() {
        this.mask.active = false
        this.btnStart.node.active = false
        GameData.gameState = GameState.gaming
        EventCenter.emit(EventType.GameStart)
    }




    // update (dt) {}
}
