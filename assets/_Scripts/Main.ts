import LoginUI from "./UI/LoginUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    // onLoad () {}

    start () {
        LoginUI.openView()
    }

    // update (dt) {}
}
