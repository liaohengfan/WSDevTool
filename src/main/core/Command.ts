import {LHFEventDispatcher} from "../../org/lhf/core/LHFEventDispatcher";
import {ipcMain} from 'electron';
import {Message} from "../../common/Message";
import {log} from "./Log";

class Command extends LHFEventDispatcher{
    static _instance:Command;
    static getInstance():Command{
        if(!this._instance){
            new Command();
        }
        return this._instance;
    }
    constructor(){
        super();
        if(Command._instance){
            throw new Error("通信连接manage 是单例模式");
        }
        Command._instance=this;
        ipcMain.on(Message.TO_MAIN_MESSAGE,this.messageHandler);
    }

    private messageHandler=(event_:any,msg_:string)=>{
        log.msg(msg_);
    }
    public toViewMsg(msg_:string):void{


    }

}
let command:Command=Command.getInstance();
export {command}
