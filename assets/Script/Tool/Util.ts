const {ccclass, property} = cc._decorator;

@ccclass
export default class Util {

    public static randomRange(nMin: number, nMax: number) {
        if (nMin < nMax) {
            [nMin, nMax] = [nMax, nMin];
        }

        let range = nMax - nMin;
        let r = nMin + Math.round(Math.random() * range);
        return r;
    }
}
