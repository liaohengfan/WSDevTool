const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

class WSServer {
    name:string;
    port:number;
    server: any;
    clients: any[] = [];
    constructor(name_:string,port_:number) {
        this.name=name_;
        this.port=port_;
        this.init();
    }

    private init(): void {
        this.clients = [];
        this.server = new WebSocketServer({port: this.port});
        this.server.on('connection', (client_: any) => {
            this.clients.push(client_);
            client_.on('message', (msg_: any) => {
                this.onmessage(client_, msg_)
            });
            client_.on('close', () => {
                this.disClient(client_);
            });
        })
    }

    private onmessage(msgClient_: any, msg_: any): void {
        this.clients.map((client_: any) => {
            if (client_ == msgClient_) return;
            client_.send(msg_);
        });
    }

    private disClient(client_: any): void {
        this.clients.splice(this.clients.indexOf(client_), 1);
    }

}

export {WSServer}
