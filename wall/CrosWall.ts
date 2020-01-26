import { Wall, textResult } from "fortjs";

export class CrosWall extends Wall {
    async onIncoming() {
        this.response.setHeader("Access-Control-Allow-Origin","*")
    }

    
}