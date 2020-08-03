import UIBase from "./Base/UIBase";
import Util from "./Tool/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSceneUI extends UIBase {
    @property(cc.Button)
    btnDice: cc.Button = null
    start() {
       
        this.OnAddClick(this.btnDice, this.OnClickDice)
    }
    OnClickDice() {
        console.log("----------:"+ Util.randomRange(1,6))
        // this.btnDice.normalSprite = null
        cc.assetManager.loadBundle("Dice",cc.Texture2D,function(err,bundle){
            if (err) {
                return console.error(err);
            }
            // this.btnDice.normalSprite = bundle['1']
            let tex = cc.instantiate(bundle)
            console.log('load bundle successfully.'+tex['1']);
        })
        // Math.random()
    }

     
    // update (dt) {}
}
