import PlaneCtr from "../Plane/PlaneCtr";

const {ccclass, property} = cc._decorator;
export enum PlayerState{
    wait,
    start,
    gaming,
    flying,
    end,
}

@ccclass
export default class BasePlayer extends cc.Component {
    name:string
    userId:number
    // planes:PlaneCtr[]
    chairID:number
    state:PlayerState
}
