import PlaneCtr from "../Plane/PlaneCtr";

const { ccclass, property } = cc._decorator;
export enum PlayerState {
    join,
    start,
    gaming,
    readyFlying,
    noFlying,
    flying,
    end,
}

@ccclass
export default class BasePlayer extends cc.Component {
    name: string
    userId: number
    // planes:PlaneCtr[]
    chairId: number
    state: PlayerState
}
