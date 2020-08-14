import { FormType } from "../Common/SysDefine";
import UIBase from "../Common/UIBase";
import GameUI from "../UI/GameUI";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginUI extends UIBase {
    formType = FormType.SceneBase
    canDestory = true;
    static prefabPath = "LoginUI";
    // onLoad () {}

    start () {
        this.node.getChildByName("btnStartGame").getComponent(cc.Button).node.on("click",()=>{
            console.log("开始游戏")
            GameUI.openView()
        })
        

    }

    // update (dt) {}
}
