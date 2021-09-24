
import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormPraias extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elnome: HTMLXInput;
    private _elobservacoes: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;
    //private _jComboBox: HTMLDListElement;
    constructor() {
        super();
        //
      //  this.jComboBox = <HTMLDListElement>this._root.querySelector("#jComboBox");
        this._root.innerHTML = template;
        this._elnome = <HTMLXInput>this._root.querySelector("#nome");
        this._elobservacoes = <HTMLXInput>this._root.querySelector("#observacoes");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._action(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, nome: string, observacoes: string}) {
        if (data.id) {
            this._id = data.id;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        }
        this._elnome.value = data.nome;
        this._elobservacoes.value = data.observacoes;
        }
        

    //private jComboBox(){
      //  jComboBox.setSelectedItem(this._elnome);
    //}
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
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }

    private async _alterar() {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            nome: this._elnome.value,
            observacoes: this._elobservacoes.value,
        };

        const configReq = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/praias/" + this._id, configReq);
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
        const req = await fetch("http://localhost:8081/praias/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this.remove();
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }
}

customElements.define("x-praias", HTMLXFormPraias);
