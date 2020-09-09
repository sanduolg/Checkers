import BasePlane, { PlaneState, PlaneColor } from "./BasePlane";
import CocosHelper from "../../Common/CocosHelper";
import PlanePosConfig from "./PlanePosConfig";
import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import GameData from "../GameData";
import ButtonPlus from "../../Common/Components/ButtonPlus";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaneCtr extends BasePlane {
    // onLoad () {}

    btnPlane: cc.Button = null
    planeAnim: cc.Animation = null
    jumpStep: number = -1
    localJumpStep: number = -1                      //根据左下角为原始点(1),方便检测飞机重叠
    start() {
        this.btnPlane = this.getComponent(cc.Button)
        this.planeAnim = this.getComponent(cc.Animation)
        this.btnPlane.node.on('click', this.onClickPlane, this)
        this.btnPlane.interactable = false
        this.node.color = cc.color(255, 255, 255, 255);
    }

    onClickPlane() {
        if (this.state == PlaneState.origin) {
            this.state = PlaneState.ready
        } else if (this.state == PlaneState.ready || this.state == PlaneState.flown) {
            this.state = PlaneState.flying
            this.btnPlane.interactable = false
        }
        EventCenter.emit(EventType.GameStopAllPlaneAnim)
        EventCenter.emit(EventType.GameSetNowPlane,this)
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
            let jumpPos = this.planeJumpPos()
            if (jumpPos) {
                action.push(cc.moveTo(.5, jumpPos))
            }
            this.selfJumpStepToLocalJumpStep()
            await CocosHelper.runSyncActions(this.node, action);
        }

        EventCenter.emit(EventType.GamePlaneAnimFinish, true)
        EventCenter.emit(EventType.GameSetDiceClick, true)
        EventCenter.emit(EventType.GameCheckSamePos,this.color,this.localJumpStep)
        this.planeArriveEnd()
    }

    planeJumpPos(): cc.Vec2 {
        if (this.jumpStep == GameData.JUMP_DOTTEDLINE && this.isCanJump()) {   //可以跳过虚线的
            this.jumpStep = 30
            return PlanePosConfig.planesPos[this.playerChairId][30]
        } else if (this.isCanJump()) {
            this.jumpStep = this.jumpStep + 4
            return PlanePosConfig.planesPos[this.playerChairId][this.jumpStep]
        }
        else {
            return null
        }

    }
    //判断可以跳跃位置
    isCanJump(): boolean {
        if (this.jumpStep > 0 && this.jumpStep < 50 && this.jumpStep % 4 == 2) {
            return true
        }
        else
            return false
    }


    async planeArriveEnd() {
        if (this.state == PlaneState.finish) {
            console.log("飞机到达终点")
            await CocosHelper.runSyncAction(this.node, cc.moveTo(.5, PlanePosConfig.planesOriginPos[this.playerChairId][this.planeNum]));
            this.node.color = cc.color(255, 255, 0, 255)
        }

    }

    selfJumpStepToLocalJumpStep() {
        if (this.color == PlaneColor.red) {
            this.localJumpStep = this.jumpStep
        } else {
            if (this.color == PlaneColor.yellow) {
                this.localJumpStep = this.jumpStep + GameData.DISTANCE_EVERYPLAYER
            }
            else if (this.color == PlaneColor.blue) {
                this.localJumpStep = this.jumpStep + GameData.DISTANCE_EVERYPLAYER * 2
            } else if (this.color == PlaneColor.green) {
                this.localJumpStep = this.jumpStep + GameData.DISTANCE_EVERYPLAYER * 3
            }
            if (this.localJumpStep > GameData.NUM_ONECIRCLE) {
                this.localJumpStep = this.localJumpStep - GameData.NUM_ONECIRCLE
            }
        }
    }

   public async setPlaneOrigin(){
      this.release()
      await CocosHelper.runSyncAction(this.node, cc.moveTo(.5, PlanePosConfig.planesOriginPos[this.playerChairId][this.planeNum]));
    }

    release(){
        this.jumpStep = -1 
        this.localJumpStep = -1
        this.state = PlaneState.origin
    }

    // update (dt) {}
}
