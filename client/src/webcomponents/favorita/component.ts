import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormFavorita extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elid_usuario = localStorage.getItem("id_usuario");
    private _elid_praia = localStorage.getItem("id_praia");
    constructor() {
        super();
       
        this.temAcesso();
    }

    async temAcesso() {
        console.log("123")
        const data = {
            fk_id_praia: this._elid_praia,
            fk_id_usuario: this._elid_usuario,
        };
        console.log(data);
        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/temacesso", configReq);
        const res = await req.json();
        return
        
    }
}
customElements.define("x-favorita", HTMLXFormFavorita);
