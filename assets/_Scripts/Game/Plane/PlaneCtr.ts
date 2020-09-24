import BasePlane, { PlaneState, PlaneColor } from "./BasePlane";
import CocosHelper from "../../Common/CocosHelper";
import PlanePosConfig from "./PlanePosConfig";
import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import GameData from "../GameData";
import ResMgr from "../../Manager/ResMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaneCtr extends BasePlane {
    // onLoad () {}

    btnPlane: cc.Button = null
    planeAnim: cc.Animation = null
    jumpStep: number = -1
    localJumpStep: number = -1                      //根据左下角为原始点(1),方便检测飞机重叠
    normalSprite: cc.SpriteFrame = null
    winSprite: cc.SpriteFrame = null
    start() {
        this.btnPlane = this.getComponent(cc.Button)
        this.planeAnim = this.getComponent(cc.Animation)
        this.btnPlane.node.on('click', this.onClickPlane, this)
        this.btnPlane.interactable = false
        this.normalSprite = this.getComponent(cc.Sprite).spriteFrame
        ResMgr.inst.loadRes("_DynamicAssets", "Sprite/Game/Sprite_win", cc.SpriteFrame).then((spriteFrame: cc.SpriteFrame) => {
            this.winSprite = spriteFrame
        })
    }

    onClickPlane() {
        if (this.state == PlaneState.origin) {
            this.state = PlaneState.ready
        } else if (this.state == PlaneState.ready || this.state == PlaneState.flown) {
            this.state = PlaneState.flying
            this.btnPlane.interactable = false
        }
        EventCenter.emit(EventType.GameStopAllPlaneAnim)
        EventCenter.emit(EventType.GameSetNowPlane, this)
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
            let action = [cc.jumpTo(.5, PlanePosConfig.planesPos[this.playerChairId][0], 50, 1)]
            await CocosHelper.runSyncActions(this.node, action);
        } else {
            let action = []
            let oldStep = this.jumpStep;
            this.jumpStep = this.jumpStep + diceNum;
            if (this.jumpStep == GameData.mapStep) {
                this.state = PlaneState.finish
                for (var i = oldStep + 1; i <= this.jumpStep; i++) {
                    action.push(cc.jumpTo(.5, PlanePosConfig.planesPos[this.playerChairId][i], 50, 1))
                }
            } else if (this.jumpStep > GameData.mapStep) {
                this.state = PlaneState.flown
                for (var i = oldStep + 1; i <= GameData.mapStep; i++) {
                    action.push(cc.jumpTo(.5, PlanePosConfig.planesPos[this.playerChairId][i], 50, 1))
                }
                for (var i = GameData.mapStep - 1; i >= 2 * GameData.mapStep - this.jumpStep; i--) {
                    action.push(cc.jumpTo(.5, PlanePosConfig.planesPos[this.playerChairId][i], 50, 1))
                }
                this.jumpStep = 2 * GameData.mapStep - this.jumpStep
            } else {
                this.state = PlaneState.flown
                for (var i = oldStep + 1; i <= this.jumpStep; i++) {
                    action.push(cc.jumpTo(.5, PlanePosConfig.planesPos[this.playerChairId][i], 50, 1))
                }
            }
            let jumpPos = this.planeJumpPos()
            if (jumpPos) {
                action.push(cc.jumpTo(.5, jumpPos,50,1))
            }
            this.selfJumpStepToLocalJumpStep()
            await CocosHelper.runSyncActions(this.node, action);
            
        }

        EventCenter.emit(EventType.GamePlaneAnimFinish, true)
        EventCenter.emit(EventType.GameSetDiceClick, true)
        EventCenter.emit(EventType.GamePlaneJumpEnd, this.color, this.localJumpStep)
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
            this.getComponent(cc.Sprite).spriteFrame = this.winSprite
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

    public async setPlaneOrigin() {
        this.release()
        await CocosHelper.runSyncAction(this.node, cc.moveTo(.5, PlanePosConfig.planesOriginPos[this.playerChairId][this.planeNum]));
    }

    release() {
        this.jumpStep = -1
        this.localJumpStep = -1
        this.state = PlaneState.origin
        this.getComponent(cc.Sprite).spriteFrame = this.normalSprite
    }

    // update (dt) {}
}
