const { ccclass, property } = cc._decorator;

@ccclass
export default class PlanePosConfig {
    public static planesPos = [
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] ,
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] ,
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] ,
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] 
    ]

    
    public static getPlanesConfigPos(playerIndex:number,posIndex:number){

    }
}
