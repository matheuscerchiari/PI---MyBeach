import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormAdvertencia extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _eladvertencia: HTMLXInput;
    private _elidusuario: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._eladvertencia = <HTMLXInput>this._root.querySelector("#advertencia");
        this._elidusuario = <HTMLXInput>this._root.querySelector("#id_usuario");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._adicionar(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, advertencia: string }) {
        this._eladvertencia.value = data.advertencia;
        }


    private async _adicionar(ev: MouseEvent) {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            advertencia: this._eladvertencia.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/advertencia", configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
            this._elBtDelete.classList.add("show");
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

customElements.define("x-advertencia", HTMLXFormAdvertencia);
