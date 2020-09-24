import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import UIBase from "../../Common/UIBase";
import ResMgr from "../../Manager/ResMgr";
import GameData from "../GameData";
import TipsForm from "../../Common/TipsForm";
import SoundMgr from "../../Manager/SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiceUICtr extends UIBase {
    diceAinm: cc.Animation = null
    diceSprite: cc.Sprite = null
    diceNum: number = 0
    onLoad() {
        EventCenter.on(EventType.GameClickDice, this.showDice, this)
    }
    onDestroy() {
        EventCenter.off(EventType.GameClickDice, this.showDice, this)
    }
    start() {
        this.diceAinm = this.node.getComponent(cc.Animation)
        this.diceSprite = this.getComponent(cc.Sprite)
        this.diceAinm.on('stop', this.onStopAnim, this)
    }

    showDice(num: number) {
        this.diceNum = num;
        GameData.diceNum = num
        SoundMgr.inst.playEffectMusic("Sound/dice")
        if (num == GameData.AWARD_DICENUM) {
            TipsForm.popUp("Prefab/Common/TipsFrom", "增加一次摇筛子次数")
        }
        this.diceAinm.play()
    }
    onStopAnim() {
        ResMgr.inst.loadRes("_DynamicAssets", "Sprite/Dice/" + this.diceNum.toString(), cc.SpriteFrame).then((spriteFrame: cc.SpriteFrame) => {
            this.diceSprite.spriteFrame = spriteFrame
            EventCenter.emit(EventType.GameDiceAnimFinish, this.diceNum)
        })
    }
    // update (dt) {}
}
