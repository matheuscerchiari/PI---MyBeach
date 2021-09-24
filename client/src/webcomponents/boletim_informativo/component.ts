import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormBoletim extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _eldataEnvio: HTMLXInput;
    private _elhoraEnvio: HTMLXInput;
    private _elboletimInformativo: HTMLXInput;
    private _elid_usuario: HTMLXInput;
    private _elid_praia: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._eldataEnvio = <HTMLXInput>this._root.querySelector("#dataEnvio");
        this._elhoraEnvio = <HTMLXInput>this._root.querySelector("#horaEnvio");
        this._elboletimInformativo = <HTMLXInput>this._root.querySelector("#boletimInformativo");
        this._elid_usuario = <HTMLXInput>this._root.querySelector("#id_usuario");
        this._elid_praia = <HTMLXInput>this._root.querySelector("#id_praia");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._action(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, dataEnvio: string, horaEnvio: string, boletimInformativo: string, id_usuario: string, id_praia: string}) {
        if (data.id) {
            this._id = data.id;
            this._elBtSave.innerText = "Alterar";
            this._elBtDelete.classList.add("show");
        }
        this._eldataEnvio.value = data.dataEnvio;
        this._elhoraEnvio.value = data.horaEnvio;
        this._elboletimInformativo.value = data.boletimInformativo;
        this._elid_usuario.value = data.id_usuario;
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
            dataEnvio: this._eldataEnvio.value,
            horaEnvio: this._elhoraEnvio.value,
            boletimInformativo: this._elboletimInformativo.value,
            id_usuario: this._elid_usuario.value,
            id_praia: this._elid_praia.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/boletim", configReq);
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
            dataEnvio: this._eldataEnvio.value,
            horaEnvio: this._elhoraEnvio.value,
            boletimInformativo: this._elboletimInformativo.value,
            id_usuario: this._elid_usuario.value,
            id_praia: this._elid_praia.value,
        };

        const configReq = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/boletim/" + this._id, configReq);
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
        const req = await fetch("http://localhost:8081/boletim/" + this._id, configReq);
        const res = await req.json();

        if (req.status == 200) {
            this.remove();
        } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }
}

customElements.define("x-boletim", HTMLXFormBoletim);
