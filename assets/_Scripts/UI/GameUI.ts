import { EventCenter } from "../Common/EventCenter";
import { EventType } from "../Common/EventType";
import { FormType } from "../Common/SysDefine";
import UIBase from "../Common/UIBase";
import { CommonUtils } from "../Common/Utils/CommonUtils";
import GameCtr from "../Game/GameCtr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends UIBase {
    formType = FormType.SceneBase
    canDestory = true;
    static prefabPath = "GameUI";
    gameCtr:GameCtr = null
    btnDice:cc.Button = null
    start () {
        this.gameCtr = new GameCtr()
        this.gameCtr.start()
        this.btnDice = this.node.getChildByName('btnDice').getComponent(cc.Button)
        this.onClickAdd(this.btnDice,this.onClickDice,this)
    }


    onClickDice(){
       let num = CommonUtils.randomRange(1,6)
       console.log(num)
       EventCenter.emit(EventType.GameClickDice,num)
    }
    // update (dt) {}
}
 