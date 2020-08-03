import UIBase from "./Base/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScene extends UIBase {

    @property(cc.Button)
    btnStart:cc.Button = null
    // onLoad () {}

    start () {
        this.OnAddClick(this.btnStart,this.OnClickStart)
    }

    OnClickStart(){
        cc.director.loadScene("GameScene")
    }
}
