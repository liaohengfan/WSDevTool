// import {command} from "./core/Command";
class Main {
    ws: WebSocket;
    constructor() {
        this.ws = new WebSocket('ws:localhost:8100');
        this.init();
    }
    private init(): void {
        let buttons: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByTagName('button');
        console.log(buttons);
        for (let i = 0; i < buttons.length; i++) {
            const btn: HTMLButtonElement = buttons[i];
            btn.addEventListener('click', () => {
                this.send(btn.dataset.code || '')
            });
        }
    }

    private send(msg: string): void {
        if (!msg) return;
        this.ws.send(msg)
        // command.toMainMsg(msg);
    }

}

window.onload = () => {
    new Main();
};
