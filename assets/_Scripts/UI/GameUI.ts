import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import { FormType } from "../Common/SysDefine";
import UIBase from "../Common/UIBase";
import { CommonUtils } from "../Common/Utils/CommonUtils";
import GameCtr from "../Game/GameCtr";
import PlayerCtr from "../Game/Players/PlayerCtr";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends UIBase {
    formType = FormType.SceneBase
    canDestory = true;
    static prefabPath = "GameUI";
    gameCtr: GameCtr = null
    btnDice: cc.Button = null
    players: PlayerCtr[] = null
    onLoad() {
        this.gameCtr = new GameCtr()
        this.gameCtr.onLoad()
    }
    start() {
        this.gameCtr.start()
        this.btnDice = this.node.getChildByName('btnDice').getComponent(cc.Button)
        this.onClickAdd(this.btnDice, this.onClickDice, this)
       console.log(cc.find('Canvas/GameUI/Players/player0'))
        this.players[0] = cc.find('Canvas/GameUI/Players/player0').getComponent(PlayerCtr)
       
        this.gameCtr.setPlayerInfo(this.players)
    }
    onDestroy() {
        this.gameCtr.onDestroy()
    }


    onClickDice() {
        let num = CommonUtils.randomRange(1, 6)
        console.log(num)
        EventCenter.emit(EventType.GameClickDice, num)
    }





    // update (dt) {}
}
