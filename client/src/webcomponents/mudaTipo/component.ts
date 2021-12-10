import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormMudaTipo extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elusuario_tipo: HTMLXInput;
    private _elidusuario: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elusuario_tipo = <HTMLXInput>this._root.querySelector("#tipo");
        this._elidusuario = <HTMLXInput>this._root.querySelector("#id_usuario");
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
        //
        this._elBtSave.addEventListener("click", ev => this._action(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, tipo: string, id_usuario:string }){
        if (data.id) {
            this._id = data.id;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        }
        this._elusuario_tipo.value = data.tipo;
        this._elidusuario.value = data.id_usuario;
    }

    private _action(ev: MouseEvent) {
        if (this._id) {
            this._alterar();
        } else {
            this._adicionar();
        }
    }

    private async _adicionar() {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            tipo: this._elusuario_tipo.value,
            id_usuario: this._elidusuario.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        console.log(data)
        const req = await fetch("http://localhost:8081/mudatipo", configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        } else {
            alert(res.error);
            
        }

        this._elBtSave.removeAttribute('disabled');
        this.remove();
            return;
    }

    private async _alterar() {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            tipo: this._elusuario_tipo.value,
            id_usuario: this._elidusuario.value,
        };

        const configReq = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/mudatipo/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }

    private async _excluir(ev: MouseEvent) {
        if (!this._id) {
            this.remove();
            return;
        }

        this._elBtSave.setAttribute('disabled', "true");

        const configReq = { method: "delete" };
        const req = await fetch("http://localhost:8081/mudatipo/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this.remove();
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }
}

customElements.define("x-mudatipo", HTMLXFormMudaTipo);
