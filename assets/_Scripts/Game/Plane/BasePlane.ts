const { ccclass, property } = cc._decorator;

export enum PlaneColor {
    unKnow,
    red,
    yellow,
    blue,
    green
}
export enum PlaneState {
    origin,
    wait,
    ready,
    flying,
    finish,
}
export default class BasePlane extends cc.Component {
    position: cc.Vec2
    color: PlaneColor
    num: number              //飞机编号
    id: number               //飞机ID
    state: PlaneState

}
