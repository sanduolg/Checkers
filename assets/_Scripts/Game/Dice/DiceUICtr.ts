import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import UIBase from "../../Common/UIBase";
import ResMgr from "../../Manager/ResMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiceUICtr extends UIBase {
    diceAinm: cc.Animation = null
    diceSprite: cc.Sprite = null
    diceNum:number = 0
    onLoad() {
        EventCenter.on(EventType.GameClickDice,(num)=>{
            this.showDice(num)
        })
    }
    onDestroy() {
        EventCenter.off(EventType.GameClickDice, (num)=>{
            this.showDice(num)
        })
    }
    start() {
        this.diceAinm = this.node.getComponent(cc.Animation)
        this.diceSprite = this.getComponent(cc.Sprite)
        this.diceAinm.on('stop', this.onStopAnim, this)
    }
   
    showDice(num: number) {
        this.diceNum = num;
        this.diceAinm.play()
    }

    onStopAnim() {
        ResMgr.inst.loadRes("_DynamicAssets","Sprite/Dice/"+this.diceNum.toString(), cc.SpriteFrame).then((spriteFrame: cc.SpriteFrame) => {
            this.diceSprite.spriteFrame = spriteFrame
            EventCenter.emit(EventType.GameDiceAnimFinish,this.diceNum)
        })
    }
    // update (dt) {}
}
