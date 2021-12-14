
import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormPraias extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elnome: HTMLXInput;
    private _elobservacoes: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;
    constructor() {
        super();
        this._root.innerHTML = template;
        this._elnome = <HTMLXInput>this._root.querySelector("#nome");
        this._elobservacoes = <HTMLXInput>this._root.querySelector("#observacoes");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._adicionar(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, nome: string, observacoes: string }) {
        this._elnome.value = data.nome;
        this._elobservacoes.value = data.observacoes;
    }

    private async _adicionar(ev:MouseEvent) {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            nome: this._elnome.value,
            observacoes: this._elobservacoes.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/praias", configReq);
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
customElements.define("x-praias", HTMLXFormPraias);
