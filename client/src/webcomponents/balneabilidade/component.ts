import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormBalneabilidade extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elhoraAnalise: HTMLXInput;
    private _eldataAnalise: HTMLXInput;
    private _elanalise: HTMLXInput;
    private _elobservacoes: HTMLXInput;
    private _elid_praia: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elhoraAnalise = <HTMLXInput>this._root.querySelector("#horaAnalise");
        this._eldataAnalise = <HTMLXInput>this._root.querySelector("#dataAnalise");
        this._elanalise = <HTMLXInput>this._root.querySelector("#analise");
        this._elobservacoes = <HTMLXInput>this._root.querySelector("#observacoes");
        this._elid_praia = <HTMLXInput>this._root.querySelector("#id_praia");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._action(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, dataAnalise: string, horaAnalise: string, analise: string, observacoes: string, id_praia: string}) {
        if (data.id) {
            this._id = data.id;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        }
        this._elhoraAnalise.value = data.horaAnalise;
        this._eldataAnalise.value = data.dataAnalise;
        this._elanalise.value = data.analise;
        this._elobservacoes.value = data.observacoes;
        this._elid_praia.value = data.id_praia;
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
            horaAnalise: this._elhoraAnalise.value,
            dataAnalise: this._eldataAnalise.value,
            analise: this._elanalise.value,
            observacoes: this._elobservacoes.value,
            id_praia: this._elid_praia.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/balneabilidade", configReq);
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
            horaAnalise: this._elhoraAnalise.value,
            dataAnalise: this._eldataAnalise.value,
            analise: this._elanalise.value,
            observacoes: this._elobservacoes.value,
            id_praia: this._elid_praia.value,
        };

        const configReq = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/balneabilidade/" + this._id, configReq);
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
        const req = await fetch("http://localhost:8081/balneabilidade/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this.remove();
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }
}

customElements.define("x-balneabilidade", HTMLXFormBalneabilidade);
