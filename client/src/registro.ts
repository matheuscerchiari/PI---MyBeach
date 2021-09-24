import "./registro.scss";
import "./webcomponents/input/component";
import "./webcomponents/registro/component";
import "./webcomponents/login/component";
import { HTMLXFormRegistro } from "./webcomponents/registro/component";
import { HTMLXFormLogin} from "./webcomponents/login/component";

const elMain = <HTMLElement>document.querySelector('main');
const elBtNewRegistro = <HTMLButtonElement>document.querySelector('.new-registro');
const elBtNewLogin = <HTMLButtonElement>document.querySelector('.new-login');

elBtNewLogin.addEventListener('click', el => {
    const redirectURL = html://localhost:8081/login.http/
    ;
});
elBtNewRegistro.addEventListener('click', el => {
    const registro = <HTMLXFormRegistro>document.createElement("x-registro");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(registro);
});