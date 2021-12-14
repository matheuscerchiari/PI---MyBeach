import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";
import "../../main.ts";

export class HTMLXFormRegistro extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elnome: HTMLXInput;
    private _elemail: HTMLXInput;
    private _elsenha: HTMLXInput;
    private _elbatalhao: HTMLXInput;
    private _elfuncao: HTMLXInput;
    private _elusuario_tipo: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elnome = <HTMLXInput>this._root.querySelector("#nome");
        this._elemail = <HTMLXInput>this._root.querySelector("#email");
        this._elsenha = <HTMLXInput>this._root.querySelector("#senha");
        this._elbatalhao = <HTMLXInput>this._root.querySelector("#batalhao");
        this._elfuncao = <HTMLXInput>this._root.querySelector("#funcao");
        this._elusuario_tipo = <HTMLXInput>this._root.querySelector("#usuario_tipo");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._adicionar(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, nome: string, email: string, senha: string, batalhao: string, funcao: string, tipo: string}) {
        this._elnome.value = data.nome;
        this._elemail.value = data.email;
        this._elsenha.value = data.senha;
        this._elbatalhao.value = data.batalhao;
        this._elfuncao.value = data.funcao;
    }


    private async _adicionar(ev:MouseEvent) {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            nome: this._elnome.value,
            email: this._elemail.value,
            senha: this._elsenha.value,
            batalhao: this._elbatalhao.value,
            funcao: this._elfuncao.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        

        const req = await fetch("http://localhost:8081/registro", configReq);
        const res = await req.json();

        if (req.status == 200) {
            this._id = res.lastID;
            alert("para continuar realize seu login");
            this.remove();
                return;
            } else {
            alert(res.error);
        }

        this._elBtSave.removeAttribute('disabled');
    }

    private async _excluir(ev: MouseEvent) {
        this._elBtSave.removeAttribute('disabled');    
        this.remove();
            return;
    }
}

customElements.define("x-registro", HTMLXFormRegistro);
