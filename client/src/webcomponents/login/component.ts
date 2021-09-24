import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormLogin extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elemail: HTMLXInput;
    private _elsenha: HTMLXInput;
    private _elBtEntrar: HTMLButtonElement;
    private _elBtSair: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elemail = <HTMLXInput>this._root.querySelector("#email");
        this._elsenha = <HTMLXInput>this._root.querySelector("#senha");
        this._elBtEntrar = <HTMLButtonElement>this._root.querySelector(".entrar");
        this._elBtSair= <HTMLButtonElement>this._root.querySelector(".cancelar");
        //
        this._elBtEntrar.addEventListener("click", ev => this._action(ev));
        this._elBtSair.addEventListener("click", ev => this._action(ev));
    }

    load(data: {email: string, senha: string}) {
        this._elemail.value = data.email;
        this._elsenha.value = data.senha;
       }

    private _action(ev: MouseEvent) {
        if (this._elemail) {
            this._entrar();
        } else {
            this._cancelar();
        }
    }
    private async _cancelar() {
        this._elBtEntrar.setAttribute('disabled', "true");

        const data = {
            email: this._elemail.value = "",
            senha: this._elsenha.value = "",
           };
        }
    private async _entrar() {
        this._elBtEntrar.setAttribute('disabled', "true");

        const data = {
            email: this._elemail.value,
            senha: this._elsenha.value,
           };

          
        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/login", configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
        } else {
            alert(res.error);
        }

        this._elBtEntrar.removeAttribute('disabled');
    }

    private async _Cancelar() {
        this._elBtEntrar.setAttribute('disabled', "true");

        const data = {
            email: "",
            senha: "",
           };
        }
    
    }
customElements.define("x-login", HTMLXFormLogin);
