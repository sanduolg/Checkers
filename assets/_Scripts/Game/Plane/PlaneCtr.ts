import BasePlane, { PlaneState } from "./BasePlane";
import CocosHelper from "../../Common/CocosHelper";
import PlanePosConfig from "./PlanePosConfig";
import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import GameData from "../GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaneCtr extends BasePlane {
    // onLoad () {}

    btnPlane: cc.Button = null
    planeAnim: cc.Animation = null
    jumpStep: number = -1
    start() {
        this.btnPlane = this.getComponent(cc.Button)
        this.planeAnim = this.getComponent(cc.Animation)
        this.btnPlane.node.on('click', this.onClickPlane, this)
        this.btnPlane.interactable = false
    }

    onClickPlane() {
        if (this.state == PlaneState.origin) {
            this.state = PlaneState.ready
        } else if (this.state == PlaneState.ready || this.state == PlaneState.flown) {
            this.state = PlaneState.flying
            this.btnPlane.interactable = false
        }
        EventCenter.emit(EventType.GameStopAllPlaneAnim)
        this.planeMoveAnim(GameData.diceNum)
    }

    playPlaneAnim() {
        this.btnPlane.interactable = true
        this.planeAnim.play()
        this.planeAnim.defaultClip.wrapMode = cc.WrapMode.Loop
    }

    stopPlaneAnim() {
        this.btnPlane.interactable = false
        this.planeAnim.stop()
    }

    public async planeMoveAnim(diceNum: number) {
        if (diceNum <= 0) return
        if (this.state == PlaneState.ready) {
            this.jumpStep = 0
            let action = [cc.moveTo(.5, PlanePosConfig.planesPos[0][0])]
            await CocosHelper.runSyncActions(this.node, action);
        } else {
            let action = []
            for (var i = this.jumpStep; i <= diceNum + this.jumpStep; i++) {
                action.push(cc.moveTo(.5, PlanePosConfig.planesPos[0][i]))
            }
            this.jumpStep = this.jumpStep + diceNum;
            // if()
            await CocosHelper.runSyncActions(this.node, action);
            this.state = PlaneState.flown
           
        }
    }

    // update (dt) {}
}
