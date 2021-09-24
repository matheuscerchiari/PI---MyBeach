class Maroto extends HTMLElement {
    private _root = this.attachShadow({ mode: "closed" })
    private _div = document.createElement("div")
    private _num = 1

    constructor() {
        super()
        this._div.innerHTML = "1"
        this._root.append(this._div)

        this._div.onclick = () => {
            this._num++
            this._div.innerHTML = this._num.toString()
        }
    }
}

customElements.define("daniel-maroto", Maroto)