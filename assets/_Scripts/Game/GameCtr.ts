import PlayerCtr from "./Players/PlayerCtr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCtr {
    players:PlayerCtr[] = null
    onLoad () {}

    start () {
        
    }

    // update (dt) {}
}
