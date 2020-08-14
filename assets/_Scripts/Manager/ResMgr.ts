import CocosHelper from "../Common/CocosHelper";
import UIBase from "../Common/UIBase";
import { EventCenter } from "../Common/EventCenter";

/**
 * 资源加载, 针对的是Form
 * 首先将资源分为两类
 * 一种是在编辑器时将其拖上去图片, 这里将其称为静态图片, 
 * 一种是在代码中使用cc.loader加载的图片, 这里将其称为动态图片
 * 
 * 对于静态资源
 * 1, 加载  在加载prefab时, cocos会将其依赖的图片一并加载, 所有不需要我们担心
 * 2, 释放  这里采用的引用计数的管理方法, 只需要调用destoryForm即可
 */
export default class ResMgr {
    private static instance: ResMgr = null;
    public static get inst() {
        if(this.instance === null) {
            this.instance = new ResMgr();
        }
        return this.instance;
    }

    private loadedAssetBundles:{[key: string]: cc.AssetManager.Bundle} = cc.js.createMap();

    public async loadRes<T>(bundleName:string,url: string, type: typeof cc.Asset, progressCallback?: (completedCount: number, totalCount: number, item: any) => void): Promise<T>{
        let assetBundle : cc.AssetManager.Bundle = null;
        if(!bundleName){
            assetBundle = cc.resources;
        }else{
            if(this.loadedAssetBundles[bundleName]){
                assetBundle = this.loadedAssetBundles[bundleName];
            }else{
                assetBundle = await new Promise((resolve, reject) => {
                    cc.assetManager.loadBundle(bundleName,(err: Error, bundle: cc.AssetManager.Bundle)=>{
                        if(err){
                            cc.log(`${bundleName} ${url} [资源加载] 错误 ${err}`);
                            resolve(null);
                        }else{
                            resolve(bundle)
                        }
                    })
                });
                if(assetBundle){
                    this.loadedAssetBundles[bundleName] = assetBundle;
                }
            }
        }
        return new Promise((resolve, reject) => {
            if(!assetBundle){
                cc.log("无效的assetBundle",bundleName);
                resolve(null);
            }
            if (!url || !type) {
                cc.log("参数错误", url, type);
                resolve(null);
            }
            assetBundle.load(url,type,(err, asset)=>{
                if (err) {
                    cc.log(`${url} [资源加载] 错误 ${err}`);
                    resolve(null);
                }else {
                    resolve(asset as any);
                }
            })
            
        })
    }

    /** 加载窗体 */
    public async loadForm(formName: string) {
        console.log("加载的路径："+formName)
        let form = await this.loadRes<cc.Prefab>("_DynamicAssets","Prefab/"+formName,cc.Prefab);//CocosHelper.loadRes<cc.Prefab>(formName, cc.Prefab);
        return form;
    }
    /** 销毁窗体 */
    public destoryForm(com: UIBase) {
        if(!com) {
            cc.log("只支持销毁继承了UIBase的窗体!");
            return;
        }
        EventCenter.targetOff(com);
        com.node.destroy();
    }

}