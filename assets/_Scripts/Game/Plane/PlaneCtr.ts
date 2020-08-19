import BasePlane, { PlaneState } from "./BasePlane";
import CocosHelper from "../../Common/CocosHelper";
import PlanePosConfig from "./PlanePosConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaneCtr extends BasePlane {
    // onLoad () {}

    btnPlane: cc.Button = null
    planeAnim: cc.Animation = null
    start() {
        this.btnPlane = this.getComponent(cc.Button)
        this.planeAnim = this.getComponent(cc.Animation)
        this.btnPlane.node.on('click', this.onClickPlane, this)
        this.btnPlane.interactable = false
    }

    onClickPlane() {
        if(this.state == PlaneState.origin){
            this.state = PlaneState.ready
        }else if(this.state == PlaneState.ready){
            this.state = PlaneState.flying
            this.btnPlane.interactable = false
        }
        this.planeMoveAnim(1)
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

     public async planeMoveAnim(jumpStep:number){
        if(jumpStep<=0) return
        if(this.state == PlaneState.ready){
            await CocosHelper.runSyncAction(this.node, cc.moveTo(.5, PlanePosConfig.planesPos[0][0]),cc.moveTo(.5, PlanePosConfig.planesPos[0][1]));
        }else{
            
        }
        this.stopPlaneAnim()
    }

    // update (dt) {}
}
