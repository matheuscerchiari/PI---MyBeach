import "./login.scss";
import "./webcomponents/input/component";
import "./webcomponents/login/component";
import { HTMLXFormLogin} from "./webcomponents/login/component";

const elMain = <HTMLElement>document.querySelector('main');
const elBtNewRegistro = <HTMLButtonElement>document.querySelector('.new-registro');
const elBtNewLogin = <HTMLButtonElement>document.querySelector('.new-login');

elBtNewLogin.addEventListener('click', el => {
    const login = <HTMLXFormLogin>document.createElement("x-login");
    // elMain.insertBefore(form, elBtNewForm.nextElementSibling);
    elMain.append(login);
});
elBtNewRegistro.addEventListener('click', el => {
    const redirectURL = html://localhost:8081/registro.http/
});