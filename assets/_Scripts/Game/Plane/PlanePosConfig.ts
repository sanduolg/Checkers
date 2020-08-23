const { ccclass, property } = cc._decorator;

@ccclass
export default class PlanePosConfig {
    public static planesPos = [
        [new cc.Vec2(-255,-378),new cc.Vec2(-190,-315),new cc.Vec2(-226,-243),new cc.Vec2(-226,-174.427),new cc.Vec2(-195,-112),
            new cc.Vec2(-250,-41),new cc.Vec2(-317,-77),new cc.Vec2(-383,-77),new cc.Vec2(-447,-44),new cc.Vec2(-473,23),new cc.Vec2(-473,92),
            new cc.Vec2(-473,161),new cc.Vec2(-473,226),new cc.Vec2(-473,293),new cc.Vec2(-450,366),new cc.Vec2(-382,394),new cc.Vec2(-320,394),
            new cc.Vec2(-252,367),new cc.Vec2(-189,431),new cc.Vec2(-220,502),new cc.Vec2(-220,566),new cc.Vec2(-193,639),new cc.Vec2(-125,668),
            new cc.Vec2(-63,668),new cc.Vec2(-2.736,668),new cc.Vec2(62,668),new cc.Vec2(127,668),new cc.Vec2(196,636),new cc.Vec2(220,565),
            new cc.Vec2(220,498),new cc.Vec2(195,434),new cc.Vec2(248,366),new cc.Vec2(318,400),new cc.Vec2(383,400),new cc.Vec2(442,369),
            new cc.Vec2(475,300),new cc.Vec2(475,231),new cc.Vec2(475,160),new cc.Vec2(475,90),new cc.Vec2(475,23),new cc.Vec2(448,-45),
            new cc.Vec2(385,-78),new cc.Vec2(320,-78),new cc.Vec2(257,-43),new cc.Vec2(192,-116),new cc.Vec2(225,-177),new cc.Vec2(225,-244),
            new cc.Vec2(195,-314),new cc.Vec2(129,-347),new cc.Vec2(65,-347),new cc.Vec2(0,-347),new cc.Vec2(0,-245),new cc.Vec2(0,-179),
            new cc.Vec2(0,-108),new cc.Vec2(0,-36),new cc.Vec2(0,28.109),new cc.Vec2(0,100)],
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] ,
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] ,
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] ,
        [new cc.Vec2(100,100),new cc.Vec2(100,200),new cc.Vec2(100,300),new cc.Vec2(100,400),new cc.Vec2(100,500),new cc.Vec2(100,600)] 
    ]

    
    public static getPlanesConfigPos(playerIndex:number,posIndex:number){

    }
}
