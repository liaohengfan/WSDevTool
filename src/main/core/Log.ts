import { dialog} from 'electron';

class Log {
    static _instance:Log;
    static getInstance():Log{
        if(!this._instance){
            new Log();
        }
        return this._instance;
    }
    constructor(){
        if(Log._instance){
            throw new Error("ws server manage 是单例模式");
        }
        Log._instance=this;
    }
    msg(msg_:string){
        dialog.showMessageBox({
            title:'提示',
            message:msg_
        })
    }
}
const log:Log=Log.getInstance()
export {log};
