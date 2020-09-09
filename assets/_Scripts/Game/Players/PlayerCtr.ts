import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import { PlaneState, PlaneColor } from "../Plane/BasePlane";
import PlaneCtr from "../Plane/PlaneCtr";
import BasePlayer from "./BasePlayer";
import CocosHelper from "../../Common/CocosHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCtr extends BasePlayer {
    @property([cc.Component])
    planes: cc.Component[] = []
    planesAnim: cc.Animation[] = []
    planesCtr: PlaneCtr[] = []
    arrow: cc.Node = null
    arrowAnim: cc.Animation = null


    onLoad() {
        EventCenter.on(EventType.GamePlayPlaneAnim, this.playPlanesAnim, this)
        EventCenter.on(EventType.GameStopAllPlaneAnim, this.stopPlanesAnim, this)
    }
    start() {
        for (var i = 0; i < 4; i++) {
            this.planesAnim.push(this.planes[i].getComponent(cc.Animation))
            this.planesCtr.push(this.planes[i].getComponent(PlaneCtr))
            this.planesCtr[i].planeNum = i
            this.planesCtr[i].playerChairId = this.chairId
            this.planesCtr[i].color = this.color
        }

        this.arrow = CocosHelper.findChildInNode('spriteArrow',this.node)
        this.arrow.active = false
        this.arrowAnim = this.arrow.getComponent(cc.Animation)
    }
    onDestroy() {
        EventCenter.off(EventType.GamePlayPlaneAnim, this.playPlanesAnim, this)
        EventCenter.off(EventType.GameStopAllPlaneAnim, this.stopPlanesAnim, this)
    }


    checkPlayPlaneAnim(diceNum: number) {
        if (diceNum % 2 == 0) {
            this.planesCtr.forEach(plane => {
                if (plane.state == PlaneState.origin || plane.state == PlaneState.ready || plane.state == PlaneState.flown)
                    plane.playPlaneAnim()
            })
        } else {
            this.planesCtr.forEach(plane => {
                if (plane.state == PlaneState.ready || plane.state == PlaneState.flown)
                    plane.playPlaneAnim()
            })
        }
    }
    //检测飞机的状态是不是在origin
    isPlaneStateOrigin(): boolean {
        let isOrigin = true
        this.planesCtr.forEach(plane => {
            if (plane.state != PlaneState.origin)
                isOrigin = false
        })
        return isOrigin;
    }
    setPlaneState(planeId: number, state: PlaneState) {
        if (planeId >= 0 && planeId < 4) {
            this.planesCtr[planeId].state = state
        }
        this.playPlanesAnim()
    }


    playPlanesAnim() {
        this.planesCtr.forEach(plane => {
            plane.playPlaneAnim()
        })
    }

    stopPlanesAnim() {
        this.planesCtr.forEach(plane => {
            plane.stopPlaneAnim()
        })
    }

    setArrowActive(isShow: boolean) {
        this.arrow.active = isShow
        if (isShow)
            this.arrowAnim.play()
        else
            this.arrowAnim.stop()
    }


    // update (dt) {}
}
