const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {
    OnAddClick( button:cc.Button,func:Function){
      console.log("uiBase")
      button.node.on("click",func)
    }
    
}
