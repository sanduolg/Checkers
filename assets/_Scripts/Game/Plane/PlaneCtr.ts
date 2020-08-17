import BasePlane, { PlaneState } from "./BasePlane";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaneCtr extends BasePlane {
    // onLoad () {}

    btnPlane: cc.Button = null
    planeAnim: cc.Animation = null
    a:number = 1
    start() {
        this.btnPlane = this.getComponent(cc.Button)
        this.planeAnim = this.getComponent(cc.Animation)
        this.btnPlane.node.on('click', this.onClickPlane, this)
    }

    onClickPlane() {

    }

    playPlaneAnim() {
        if (this.state == PlaneState.ready || this.state == PlaneState.flying) {
            this.planeAnim.play()
            this.planeAnim.defaultClip.wrapMode = cc.WrapMode.Loop
        }
    }

    stopPlaneAnim() {
        this.planeAnim.stop()
    }
    // update (dt) {}
}
