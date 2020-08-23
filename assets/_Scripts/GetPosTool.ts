const {ccclass, property} = cc._decorator;

@ccclass
export default class GetPosTool extends cc.Component {
    path:string = null
    start () {
        this.node.children.forEach(child=>{
            this.path = this.path+"new cc.Vec2("+child.position.x+","+child.position.y+"),"
        })
        console.log(this.path)
    }

    // update (dt) {}
}
