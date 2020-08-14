import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import PlaneCtr from "../Plane/PlaneCtr";
import BasePlayer from "./BasePlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCtr extends BasePlayer {
    @property([cc.Component])
    planes: cc.Component[] = []
    planesAnim: cc.Animation[] = []

    onLoad() {
        EventCenter.on(EventType.GamePlayPlaneAnim,()=>{
            this.palyPlanesAnim()
        })
    }
    start() {
        this.planes.forEach(plane => {
            this.planesAnim.push(plane.getComponent(cc.Animation))
        });
    }
    onDestroy(){
        EventCenter.off(EventType.GamePlayPlaneAnim,()=>{
            this.palyPlanesAnim()
        })
    }


    palyPlanesAnim() {
        if (this.planesAnim.length <= 0) {
            console.log("未找到飞机动画组件")
            return
        }
        this.planesAnim.forEach(planeAinm => {
            planeAinm.play()
            planeAinm.defaultClip.wrapMode = cc.WrapMode.Loop
        });
    }
    stopPlanesAnim() {
        if (this.planesAnim.length <= 0) {
            console.log("未找到飞机动画组件")
            return
        }
        this.planesAnim.forEach(planeAnim => {
            planeAnim.stop()
        })

    }


    // update (dt) {}
}
