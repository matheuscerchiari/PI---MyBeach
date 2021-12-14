import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormRecebe extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elidadvertencia: HTMLXInput;
    private _elidusuario: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elidadvertencia = <HTMLXInput>this._root.querySelector("#fk_id_advertencia");
        this._elidusuario = <HTMLXInput>this._root.querySelector("#fk_id_usuario");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        const AcharUsuario = async () => {
            const configReq = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            const reqUsuario = await fetch("http://localhost:8081/idusuario", configReq);
            const resUsuario = await reqUsuario.json();
            console.log(resUsuario)
            resUsuario.forEach((usuarios: any) => {
                this._elidusuario.innerHTML += `<option value="${usuarios.id_usuario}"> ${usuarios.nome} </option>`
            });
        } 
        AcharUsuario();
        const AcharAdvertencia = async () => {
            const configReq = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            const reqAdvertencia = await fetch("http://localhost:8081/idadvertencia", configReq);
            const resAdvertencia = await reqAdvertencia.json();
            console.log(resAdvertencia)
            resAdvertencia.forEach((advertencia: any) => {
                this._elidadvertencia.innerHTML += `<option value="${advertencia.id_advertencia}"> ${advertencia.advertencia} </option>`
            });
        } 
        AcharAdvertencia();
        //
        this._elBtSave.addEventListener("click", ev => this._adicionar(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, fk_id_advertencia: string, fk_id_usuario:string }){
        this._elidadvertencia.value = data.fk_id_advertencia;
        this._elidusuario.value = data.fk_id_usuario;
    }

    private async _adicionar(ev:MouseEvent) {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            fk_id_advertencia: this._elidadvertencia.value,
            fk_id_usuario: this._elidusuario.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/recebe", configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
        this.remove();
            return;
    }
    private async _excluir(ev: MouseEvent) {
        this._elBtSave.removeAttribute('disabled');
            this.remove();
            return;
    }
}

customElements.define("x-recebe", HTMLXFormRecebe);
