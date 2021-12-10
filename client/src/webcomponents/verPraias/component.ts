import template from "bundle-text:./component.html";
import { HTMLXInput } from "../input/component";

export class HTMLXFormVerPraias extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" });
    private _elid_usuario = localStorage.getItem("id_usuario")
    private _id?: number;
    private _elidPraia: HTMLXInput;
    private _elBtSave: HTMLButtonElement;
    private nomePraia?: string;
    private observacoesPraia?: string;
    private idBalneabilidade?: number;
    private dataAnalise?: string;
    private horaAnalise?: string;
    private analise?: string;
    private observacoesBalneabilidade?: string;
    private idBoletim?: number;
    private dataEnvio?: string;
    private horaEnvio?: string;
    private boletimInformativo?: string;
    private favorita?: boolean;

    //private _jComboBox: HTMLDListElement;
    constructor() {
        super();
        //
        //  this.jComboBox = <HTMLDListElement>this._root.querySelector("#jComboBox");
        this._root.innerHTML = template;
        this._elidPraia = <HTMLXInput>this._root.querySelector("#idPraia");
        this._elBtSave = <HTMLButtonElement>this._root.querySelector(".save");
        //
        const AcharPraia = async () => {
            const configReq = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            const reqPraia = await fetch("http://localhost:8081/idpraia", configReq);
            const resPraia = await reqPraia.json();
            console.log(resPraia)
            resPraia.forEach((praia: any) => {
                this._elidPraia.innerHTML += `<option value="${praia.id_praia}"> ${praia.nome} </option>`
            });
        }
        AcharPraia();
        //
        this._elBtSave.addEventListener("click", ev => this._adicionar(ev));
    }

    load(data: { id?: number, idPraia: string }) {
        if (data.id) {
            this._elBtSave.innerText = "Alterar";
        }
        this._elidPraia.value = data.idPraia;
    }

    private async _adicionar(ev: MouseEvent) {
        this._elBtSave.setAttribute('disabled', "true");

        const data = {
            idPraia: this._elidPraia.value,
        };

        const configReq = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        const reqPraia = await fetch("http://localhost:8081/verpraia", configReq);
        const resPraias = await reqPraia.json();

        const reqFavorita = await fetch("http://localhost:8081/verfavorita", configReq);
        const resFavorita = await reqFavorita.json();

        const reqBoletim = await fetch("http://localhost:8081/verboletim", configReq);
        const resBoletim = await reqBoletim.json();

        const reqBalneabilidade = await fetch("http://localhost:8081/verbalneabilidade", configReq);
        const resBalneabilidade = await reqBalneabilidade.json();
        console.log(resPraias)
        // console.log(resFavorita)
        console.log(resBoletim)
        console.log(resBalneabilidade)
        this.nomePraia = resPraias[0].nome;
        this.observacoesPraia = resPraias[0].observacoes;
        this.idBalneabilidade = resBalneabilidade[0].id_balneabilidade;
        this.dataAnalise = resBalneabilidade[0].dataAnalise;
        this.horaAnalise = resBalneabilidade[0].horaAnalise;
        this.analise = resBalneabilidade[0].analise;
        this.observacoesBalneabilidade = resBalneabilidade[0].observacoes;
        this.idBoletim = resBoletim[0].id_boletim;
        this.dataEnvio = resBoletim[0].dataEnvio;
        this.horaEnvio = resBoletim[0].horaEnvio;
        this.boletimInformativo = resBoletim[0].boletimInformativo;
        //this.favorita = resFavorita[0].favorita; não está pegando o false como default no banco de dados, logo não tem o que puxar
        const elpraia = <HTMLElement>document.querySelector('#praia')
        elpraia.innerHTML = `
        <p> <strong> Praia </strong> </p>
        <p> Nome: ${this.nomePraia} </p>
        <p> Observações: ${this.observacoesPraia} </p>
        <p> <strong> Balneabilidade </strong> </p>
        <p> Dia Análise: ${this.dataAnalise}</p>
        <p> Hora Análise: ${this.horaAnalise} </p>
        <p> Análise: ${this.analise} </p>
        <p> observações: ${this.observacoesBalneabilidade} </p>
        <p> <strong> Ultimo Boletim Informativo do Usuário </strong> </p>
        <p> Data Envio: ${this.dataEnvio} </p>
        <p> Hora Envio: ${this.horaEnvio} </p>
        <p> Boletim: ${this.boletimInformativo} </p>
        <button class="favorita"> Favoritar </button>
        <button class="fechar"> fechar </button>
        <script> favorita.onclick = {
            const datatemAcesso = {
                id_praia: ${this._elidPraia},
                id_usuario: ${this._elid_usuario},
            };
    
            const configReqtemAcesso = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datatemAcesso)
            };
    
            console.log(datatemAcesso)
            const reqtemAcesso = await fetch("http://localhost:8081/temacesso", configReqtemAcesso);
            const restemAcesso = await reqtemAcesso.json();
            console.log(datatemAcesso)
        }
        fechar.onclick{
            this.remove(${elpraia.innerHTML});
            return;
        }
        `
        this.remove();
        return;
            
    }
        
        
}
customElements.define("x-verpraias", HTMLXFormVerPraias);

