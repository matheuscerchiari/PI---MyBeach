import "./main.scss";
import "./webcomponents/input/component";
import "./webcomponents/form/component";
import "./webcomponents/advertencia/component";
import "./webcomponents/balneabilidade/component";
import "./webcomponents/boletim_informativo/component";
import "./webcomponents/praias/component";
import "./webcomponents/usuarios/component";
import "./webcomponents/registro/component";
import "./webcomponents/login/component";
import { HTMLXForm } from "./webcomponents/form/component";
import { HTMLXFormBalneabilidade } from "./webcomponents/balneabilidade/component";
import { HTMLXFormAdvertencia } from "./webcomponents/advertencia/component";
import { HTMLXFormBoletim } from "./webcomponents/boletim_informativo/component";
import { HTMLXFormPraias } from "./webcomponents/praias/component";
import { HTMLXFormUsuarios } from "./webcomponents/usuarios/component";
import { HTMLXFormRegistro } from "./webcomponents/registro/component";
import { HTMLXFormLogin} from "./webcomponents/login/component";

const elMain = <HTMLElement>document.querySelector('main');
const elBtNewAdvertencia = <HTMLButtonElement>document.querySelector('.new-advertencia');
const elBtNewForm = <HTMLButtonElement>document.querySelector('.new-form');
const elBtNewBalneabilidade = <HTMLButtonElement>document.querySelector('.new-balneabilidade');
const elBtNewBoletim = <HTMLButtonElement>document.querySelector('.new-boletim');
const elBtNewPraias = <HTMLButtonElement>document.querySelector('.new-praias');
const elBtNewUsuarios = <HTMLButtonElement>document.querySelector('.new-usuarios');
const elBtNewRegistro = <HTMLButtonElement>document.querySelector('.new-registro');
const elBtNewLogin = <HTMLButtonElement>document.querySelector('.new-login');

elBtNewForm.addEventListener('click', el => {
    const form = <HTMLXForm>document.createElement("x-form");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(form);
});
elBtNewAdvertencia.addEventListener('click', el => {
    const advertencia = <HTMLXFormAdvertencia>document.createElement("x-advertencia");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(advertencia);
});
elBtNewBalneabilidade.addEventListener('click', el => {
    const balneabilidade = <HTMLXFormBalneabilidade>document.createElement("x-balneabilidade");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(balneabilidade);
});
elBtNewBoletim.addEventListener('click', el => {
    const boletim = <HTMLXFormBoletim>document.createElement("x-boletim");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(boletim);
});
elBtNewPraias.addEventListener('click', el => {
    const praias = <HTMLXFormPraias>document.createElement("x-praias");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(praias);
});
elBtNewUsuarios.addEventListener('click', el => {
    const usuarios = <HTMLXFormUsuarios>document.createElement("x-usuarios");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(usuarios);
});
elBtNewLogin.addEventListener('click', el => {
    const login = <HTMLXFormLogin>document.createElement("x-login");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(login);
});
elBtNewRegistro.addEventListener('click', el => {
    const registro = <HTMLXFormRegistro>document.createElement("x-registro");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(registro);
});

async function listarPessoas() {
    const req = await fetch("http://localhost:8081/pessoa/");
    const res = await req.json();
    res.forEach((pessoa: { nome: string, sobrenome: string, apelido: string }) => {
        const el = <HTMLXForm>document.createElement("x-form");
        el.load(pessoa);
        elMain.appendChild(el);
    });
}
async function login() {
    const req = await fetch("http://localhost:8081/login/");
    const res = await req.json();
    }

login();
//listarPessoas();