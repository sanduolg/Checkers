import BasePlane, { PlaneState, PlaneColor } from "./BasePlane";
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
        this.node.color = cc.color(255,255,255,255);
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
            let action = [cc.moveTo(.5, PlanePosConfig.planesPos[this.playerChairId][0])]
            await CocosHelper.runSyncActions(this.node, action);
        } else {
            let action = []
            let oldStep = this.jumpStep;
            this.jumpStep = this.jumpStep + diceNum;
            if (this.jumpStep == GameData.mapStep) {
                this.state = PlaneState.finish
                for (var i = oldStep; i <= this.jumpStep; i++) {
                    action.push(cc.moveTo(.5, PlanePosConfig.planesPos[this.playerChairId][i]))
                }
            } else if (this.jumpStep > GameData.mapStep) {
                this.state = PlaneState.flown
                for (var i = oldStep; i <= GameData.mapStep; i++) {
                    action.push(cc.moveTo(.5, PlanePosConfig.planesPos[this.playerChairId][i]))
                }
                for (var i = GameData.mapStep - 1; i >= 2 * GameData.mapStep - this.jumpStep; i--) {
                    action.push(cc.moveTo(.5, PlanePosConfig.planesPos[this.playerChairId][i]))
                }
                this.jumpStep = 2 * GameData.mapStep - this.jumpStep
            } else {
                this.state = PlaneState.flown
                for (var i = oldStep; i <= this.jumpStep; i++) {
                    action.push(cc.moveTo(.5, PlanePosConfig.planesPos[this.playerChairId][i]))
                }
            }

            await CocosHelper.runSyncActions(this.node, action);
            this.planeArriveEnd()
        }
    }


    async planeArriveEnd(){
        if(this.state == PlaneState.finish){
            console.log("飞机到达终点")
            await CocosHelper.runSyncAction(this.node,cc.moveTo(.5, PlanePosConfig.planesOriginPos[this.playerChairId][this.num]));
            this.node.color = cc.color(255,255,0,255)
        }
       
    }
    // update (dt) {}
}
