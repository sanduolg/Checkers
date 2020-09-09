import { GameState } from "./GameCtr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameData {
    public static diceNum:number = 0
    public static lastDiceNum:number = 0
    public static mapStep:number = 56
    public static gameState:GameState = GameState.ready
    public static AWARD_DICENUM:number = 6 
    public static JUMP_DOTTEDLINE:number = 18
    public static DISTANCE_EVERYPLAYER = 13                              //每一个玩家距离 
    public static NUM_ONECIRCLE = 52                                     // 一圈步数(不包括单独通道部分 13*4)

}


