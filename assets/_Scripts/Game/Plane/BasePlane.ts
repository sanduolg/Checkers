const { ccclass, property } = cc._decorator;

export enum PlaneColor {
    unKnow,
    red,
    yellow,
    blue,
    green
}
export enum PlaneState {
    origin,              //在原点
    ready,               //准备起飞
    flown,               //已经起飞
    flying,              //正在起飞
    finish,              //到达终点
}
export default class BasePlane extends cc.Component {
    position: cc.Vec2
    color: PlaneColor
    num: number              //飞机编号
    id: number               //飞机ID
    state: PlaneState = PlaneState.origin

}
