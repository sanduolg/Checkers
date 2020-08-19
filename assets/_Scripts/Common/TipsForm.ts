import CocosHelper from "./CocosHelper";
import UIBase from "./UIBase";
import { FormType } from "./SysDefine";
import ResMgr from "../Manager/ResMgr";
import UIManager from "../Manager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsForm extends UIBase {
    @property(cc.Label)
    tips: cc.Label = null;

    formType = FormType.TopTips;
    static topTips = null


    public static async popUp(url: string, params: any) {
        let prefab = await ResMgr.inst.loadRes<cc.Prefab>("_DynamicAssets",url, cc.Prefab);
        if(!prefab) return ;
        if (TipsForm.topTips== null){
            TipsForm.topTips = cc.find("Canvas/UIROOT/TopTips")
        }
        let node = cc.instantiate(prefab);
        let com = node.getComponent(TipsForm);
        com.tips.string = params;
        node.setParent(TipsForm.topTips)
        // todo...
        await com.exitAnim();
    }
    // onLoad () {}

    start () {
       
        
    }

    async exitAnim() {
        await CocosHelper.runSyncAction(this.node, cc.moveBy(1.5, 0, 150));
        this.node.removeFromParent();
        this.node.destroy();
    }

    // update (dt) {}
}
