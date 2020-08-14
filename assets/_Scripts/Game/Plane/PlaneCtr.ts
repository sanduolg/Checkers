import BasePlane from "./BasePlane";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlaneCtr extends BasePlane {
    // onLoad () {}

    start () {
        this.getComponent(cc.Button).node.on("click",this.onClickPlane,this)
    }

    onClickPlane(){
        
    }
    // update (dt) {}
}
