import { EventCenter } from "../../Common/EventCenter";
import { EventType } from "../../Common/EventType";
import { PlaneState } from "../Plane/BasePlane";
import PlaneCtr from "../Plane/PlaneCtr";
import BasePlayer from "./BasePlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCtr extends BasePlayer {
    @property([cc.Component])
    planes: cc.Component[] = []
    planesAnim: cc.Animation[] = []
    planesCtr:PlaneCtr[] = []
   

    onLoad() {
        EventCenter.on(EventType.GamePlayPlaneAnim, this.palyPlanesAnim,this)
    }
    start() {
        this.planes.forEach(plane => {
            this.planesAnim.push(plane.getComponent(cc.Animation))
        });
        this.planesCtr.forEach(plane =>{
            this.planesCtr.push(plane.getComponent(PlaneCtr))
        })
    }
    onDestroy(){
        EventCenter.off(EventType.GamePlayPlaneAnim, this.palyPlanesAnim,this)
    }

    setPlaneState(planeId:number,state:PlaneState){
        if(planeId>0&&planeId<4){
            this.planesCtr[planeId].state = state
        }
        this.palyPlanesAnim()
    }
  

    palyPlanesAnim() {
       this.planesCtr.forEach(plane=>{
        plane.playPlaneAnim()
       })
    }

    stopPlanesAnim() {
        this.planesCtr.forEach(plane=>{
            plane.stopPlaneAnim()
           })
    }


    // update (dt) {}
}
