import imagemMapa from "url:./../../../mapa.jpg";
import "../advertencia/component";
import "../balneabilidade/component";
import "../boletim_informativo/component";
import "../praias/component";
import "../usuarios/component";
import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";//salva as informações inseridas
import { HTMLXFormBalneabilidade } from "../balneabilidade/component";
import { HTMLXFormAdvertencia } from "../advertencia/component";
import { HTMLXFormBoletim } from "../boletim_informativo/component";
import { HTMLXFormPraias } from "../praias/component";
//ver como mostrar erro de id inexistente para praias 
export class HTMLXFormLogin extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _id?: number;
    private _elemail: HTMLXInput;
    private _elsenha: HTMLXInput;
    private _elBtEntrar: HTMLButtonElement;
    private _elBtSair: HTMLButtonElement;
    private usuario_tipo?: number;


    constructor() {
        super();
        //
        this._root.innerHTML = template;
        this._elemail = <HTMLXInput>this._root.querySelector("#email");
        this._elsenha = <HTMLXInput>this._root.querySelector("#senha");
        this._elBtEntrar = <HTMLButtonElement>this._root.querySelector(".entrar");
        this._elBtSair = <HTMLButtonElement>this._root.querySelector(".cancelar");
        //
        this._elBtEntrar.addEventListener("click", ev => this._entrar(ev));
        this._elBtSair.addEventListener("click", ev => this._cancelar(ev));
    }

    load(data: { email: string, senha: string }) {
        this._elemail.value = data.email;
        this._elsenha.value = data.senha;
    }

    private async _entrar(ev: MouseEvent) {
        this._elBtEntrar.setAttribute('disabled', "true");

        const data = {
            email: this._elemail.value,
            senha: this._elsenha.value,
        };

        const configReq = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const req = await fetch("http://localhost:8081/login", configReq);
        const res = await req.json();
        
        if (req.status == 200) {
            console.log(this.usuario_tipo)
            this.usuario_tipo = res[0].tipo
        } else {
            alert(res.error);
            return
        }
        const elstyle = <HTMLElement>document.querySelector("#style")
        const elAcoes = <HTMLElement>document.querySelector("#acoes")
        const elMain = <HTMLElement>document.querySelector('main')
        
        if (this.usuario_tipo == 0) {
            elAcoes.innerHTML += `
                <button class="new-advertencia">Nova advertencia</button>
                <button class="new-boletim">Novo boletim</button>
                <button class="new-balneabilidade">Nova balneabilidade</button>
                <button class="new-praias">Nova praia</button>`
            document.querySelector('.new-advertencia')?.addEventListener('click', el => elMain.append(document.createElement("x-advertencia")))
            document.querySelector('.new-boletim')?.addEventListener('click', el => elMain.append(document.createElement("x-boletim")))
            document.querySelector('.new-balneabilidade')?.addEventListener('click', el => elMain.append(document.createElement("x-balneabilidade")))
            document.querySelector('.new-praias')?.addEventListener('click', el => elMain.append(document.createElement("x-praias")));
            
            elstyle.innerHTML +=`
            <style>
            body{
                background-image: url(${imagemMapa});
                background-repeat: no-repeat;
            } </style>
            `
            return
        }

        if (this.usuario_tipo == 1 || this.usuario_tipo == 2) {
            elAcoes.innerHTML += `
                <button class="new-boletim">Novo boletim</button>
                <button class="new-balneabilidade">Nova balneabilidade</button>`
            document.querySelector('.new-boletim')?.addEventListener('click', el => elMain.append(document.createElement("x-boletim")))
            document.querySelector('.new-balneabilidade')?.addEventListener('click', el => elMain.append(document.createElement("x-balneabilidade")))
            elstyle.innerHTML +=`
            <style>body{
                background-image: url(${imagemMapa});
                background-repeat: no-repeat;
            } </style>
            `
            return
        }

        elAcoes.innerHTML += `<button class="new-boletim">Novo boletim</button>`
        document.querySelector('.new-boletim')?.addEventListener('click', el => elMain.append(document.createElement("x-boletim")))
        elstyle.innerHTML +=`
            <style>body{
                background-image: url(${imagemMapa});
                background-repeat: no-repeat;
            } </style>
            `
        return
    }
    
    private async _cancelar(ev: MouseEvent) {
        this._elBtSair.setAttribute('disabled', "true");

        const data = {
            email: this._elemail.value = "",
            senha: this._elsenha.value = "",
        };
    }

}

customElements.define("x-login", HTMLXFormLogin)
