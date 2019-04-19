import {LHFEventDispatcher} from "../../org/lhf/core/LHFEventDispatcher";
import {ipcRenderer} from 'electron';
import {Message} from "../../common/Message";

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
        Command._instance = this;
        ipcRenderer.on(Message.TO_VIEW_MESSAGE,this.messageHandler);
    }

    private messageHandler=(event_:any,msg_:string)=>{
    }

    public toMainMsg(msg_:string):void{
        ipcRenderer.send(Message.TO_MAIN_MESSAGE,msg_);
    }

}
let command:Command=Command.getInstance();
export {command}
