import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormUsuarios extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elnome: HTMLXInput;
    private _elemail: HTMLXInput;
    private _elsenha: HTMLXInput;
    private _elgameficacaoPontos: HTMLXInput;
    private _elgameficacaoNivel: HTMLXInput;
    private _elbatalhao: HTMLXInput;
    private _elfuncao: HTMLXInput;
    private _elUSUARIO_TIPO: HTMLXInput;
    private _elid_praia: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private _elBtDelete: HTMLButtonElement;

    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elnome = <HTMLXInput>this._root.querySelector("#nome");
        this._elemail = <HTMLXInput>this._root.querySelector("#email");
        this._elsenha = <HTMLXInput>this._root.querySelector("#senha");
        this._elgameficacaoPontos = <HTMLXInput>this._root.querySelector("#gameficacaoPontos");
        this._elgameficacaoNivel = <HTMLXInput>this._root.querySelector("#gameficacaoNive");
        this._elbatalhao = <HTMLXInput>this._root.querySelector("#batalhao");
        this._elfuncao = <HTMLXInput>this._root.querySelector("#funcao");
        this._elUSUARIO_TIPO = <HTMLXInput>this._root.querySelector("#USUARIO_TIPO");
        this._elid_praia = <HTMLXInput>this._root.querySelector("#id_praia");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        this._elBtDelete = <HTMLButtonElement>this._root.querySelector(".delete");
        //
        this._elBtSave.addEventListener("click", ev => this._adicionar(ev));
        this._elBtDelete.addEventListener("click", ev => this._excluir(ev));
    }

    load(data: { id?: number, nome: string, email: string, senha: string, gameficacaoPontos: string, gameficacaoNivel: string, batalhao: string, funcao: string, USUARIO_TIPO: string, id_praia: string}) {
        this._elnome.value = data.nome;
        this._elemail.value = data.email;
        this._elsenha.value = data.senha;
        this._elgameficacaoPontos.value = data.gameficacaoPontos;
        this._elgameficacaoNivel.value = data.gameficacaoNivel;
        this._elbatalhao.value = data.batalhao;
        this._elfuncao.value = data.funcao;
        this._elUSUARIO_TIPO.value = data.USUARIO_TIPO;
        this._elid_praia.value = data.id_praia;
        }

    private async _adicionar(ev:MouseEvent) {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            nome: this._elnome.value,
            email: this._elemail.value,
            senha: this._elsenha.value,
            gameficacaoPontos: this._elgameficacaoPontos.value,
            gameficacaoNivel: this._elgameficacaoNivel.value,
            batalhao: this._elbatalhao.value,
            funcao: this._elfuncao.value,
            USUARIO_TIPO: this._elUSUARIO_TIPO.value,
            id_praia: this._elid_praia.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/usuarios", configReq);
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
        alert("para continuar realize seu login");
        this.remove();
            return;

    }

    private async _excluir(ev: MouseEvent) {
        this._elBtSave.removeAttribute('disabled');    
        this.remove();
            return;
    }
}

customElements.define("x-usuarios", HTMLXFormUsuarios);
