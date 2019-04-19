import {WSServer} from "./WSServer";
import {HashMap} from "../../org/lhf/core/HashMap";
import {log} from "../core/Log";

class ServerManage{
    static _instance:ServerManage;
    static getInstance():ServerManage{
        if(!this._instance){
            new ServerManage();
        }
        return this._instance;
    }
    serversHash:HashMap;
    constructor(){
        if(ServerManage._instance){
            throw new Error("ws server manage 是单例模式");
        }
        ServerManage._instance=this;
        this.serversHash=new HashMap();
    }

    /**
     * 创建websocket服务器
     * @param name_ 名称
     * @param port_ 端口号
     */
    createServer(name_:string,port_:number):boolean{
        let portJudage:boolean=false;
        this.serversHash.values().map((item_:WSServer)=>{
            if(item_.port==port_){
                portJudage=true;
            }
        });
        if(portJudage){
            log.msg("该端口号已被占用");
            return false;
        }
        if(this.serversHash.containsKey(name_)){
            log.msg("该服务器名称已存在");
            return false;
        }

        //添加到哈希表
        let ws:WSServer=new WSServer(name_,port_);
        this.serversHash.put(name_,ws);
        return true;
    }
}
const serverManage:ServerManage=ServerManage.getInstance();
export {serverManage}
