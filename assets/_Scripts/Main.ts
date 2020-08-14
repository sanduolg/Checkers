import LoginUI from "./UI/LoginUI";
import UIBase from "./Common/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    // onLoad () {}

    start () {
        LoginUI.openView()
    }

    // update (dt) {}
}
