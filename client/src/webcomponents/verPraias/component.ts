.borderButtonComboBox
            {
                border-left: #A0C0E7 1px solid;
                border-right: #A0C0E7 1px solid;
                border-top: #A0C0E7 1px solid;
                border-bottom: #A0C0E7 1px solid;
                background-color: #E2EBF5;
            }
            
            .fontLabelComboBox
            {
                font-family:Segoe UI, Tahoma, Sans-Serif;
                font-size:10pt;
                color:#000000;
            }
            
            .fontItemComboBox
            {
                font-family:Segoe UI, Tahoma, Sans-Serif;
                font-size:10pt;
                color:#000000;
            }</style>
        <blockquote>
            <p>
                <script>
                    var AlignComboBox = { ToUp: 0, ToDown: 1 };
                    function itemComboBox(text, value) {
                        this.text = text;
                        this.value = value;
                    }
                    function comboBox(id, alignPopup) {
    this.id = id;
    this.alignPopup = alignPopup;
    this.items = [];//Itens.
    this.width;//Largura do combobox.
    this.widthList;//Largura da lista de itens.
    this.heightList;//Altura da lista de itens.
    this.onClick;//Evento click do botão.
    this.onSelectitem;//Evento da seleção do item.

    this.idTextTD = this.id + 'TextTD';
    this.idImageTD = this.id + 'ImageTD';
    this.imgArrowComboBox = 'Imagens/SetaCombo.png';
}
comboBox.prototype.addItem = function (text, value) {
    this.items[this.items.length] = new itemComboBox(text, value);
};

comboBox.prototype.removeItem = function (index) {
    return this.items.splice(index, 1);
};

comboBox.prototype.getItem = function (index) {
    return this.items[index];
};

comboBox.prototype.clearItem = function (index) {
    this.items = [];
};
comboBox.prototype.changeSelectionItem = function (text, value) {
    document.getElementById('value' + this.id).innerHTML = text;

    if (this.onSelectitem != null) {
        this.onSelectitem(new itemComboBox(text, value));
    }

    this.hideDivCombox();
};

comboBox.prototype.button_OnClick = function () {
    var obj = document.getElementById(this.id + 'ListDIV');

    if (obj.style.display != 'block') {

        if (this.onClick != null) {
            this.onClick();
        }

        if (this.alignPopup == AlignComboBox.ToUp) {
            var objImg = document.getElementById('upImgPosition' + this.id);

            obj.style.top = (objImg.offsetTop - parseInt(obj.style.height) - 2) + 'px';
        }
        else {
            var objImg = document.getElementById('downImgPosition' + this.id);

            obj.style.top = (objImg.offsetTop + 2) + 'px';
        }

        obj.style.display = 'block';
    }
    else {
        this.hideDivCombox();
    }
};

comboBox.prototype.hideDivCombox = function () {
    document.getElementById(this.id + 'ListDIV').style.display = 'none';
};

comboBox.prototype.selectionComboBox = function () {
    var objTextTD = document.getElementById(this.idTextTD);
    var objImageTD = document.getElementById(this.idImageTD);

    objTextTD.style.borderBottomColor = "#FFCD4A";
    objTextTD.style.borderTopColor = "#FFCD4A";
    objTextTD.style.borderLeftColor = "#FFCD4A";
    objTextTD.style.borderRightColor = "#FFCD4A";

    objImageTD.style.backgroundColor = "#FFE6A0";
    objImageTD.style.borderBottomColor = "#FFCD4A";
    objImageTD.style.borderTopColor = "#FFCD4A";
    objImageTD.style.borderLeftColor = "#FFCD4A";
    objImageTD.style.borderRightColor = "#FFCD4A";
};

comboBox.prototype.deSelectionComboBox = function () {
    var objTextTD = document.getElementById(this.idTextTD);
    var objImageTD = document.getElementById(this.idImageTD);

    objTextTD.style.borderBottomColor = "";
    objTextTD.style.borderTopColor = "";
    objTextTD.style.borderLeftColor = "";
    objTextTD.style.borderRightColor = "";

    objImageTD.style.backgroundColor = "";
    objImageTD.style.borderBottomColor = "";
    objImageTD.style.borderTopColor = "";
    objImageTD.style.borderLeftColor = "";
    objImageTD.style.borderRightColor = "";
};

comboBox.prototype.itemSelectionComboBox = function (elemento) {
    elemento.style.backgroundColor = "#FFE6A0";
};

comboBox.prototype.deItemSelectionComboBox = function (elemento) {
    elemento.style.backgroundColor = "";
};
comboBox.prototype.createComboBox = function (recipientElemento) {
    var valueTable = '';

    valueTable += '<Table cellpadding="0" cellspacing="0" border="0" width="'
    + parseInt(this.width) + 'px">';
    valueTable += '    <tr>';
    valueTable += '        <td id="' + this.idTextTD + '" style="width:'
    + (parseInt(this.width) - 10) + 'px;" class="borderButtonComboBox"';
    valueTable += ' onclick="' + this.id + '.button_OnClick();" onmouseover="'
    + this.id + '.selectionComboBox();" onmouseout="' + this.id + '.deSelectionComboBox();" >';
    valueTable += '            <img id="upImgPosition' + this.id + '"
    style="position:absolute;visibility:hidden;" alt="" src="' +
    this.imgArrowComboBox + '" />  \r\n';
    valueTable += ' <label id="value' + this.id + '" class="fontLabelComboBox"
    style="width:100%"> </label>';
    valueTable += '        </td>';
    valueTable += '        <td id="' + this.idImageTD + '"
    style="width:10px;" align="center" class="borderButtonComboBox"';
    valueTable += ' onclick="' + this.id + '.button_OnClick();"
    onmouseover="' + this.id + '.selectionComboBox();" onmouseout="'
    + this.id + '.deSelectionComboBox();" >';
    valueTable += '            <img alt="" src="' + this.imgArrowComboBox + '" />';
    valueTable += '        </td>';
    valueTable += '    </tr>';
    valueTable += '    <tr>';
    valueTable += '        <td colspan="2">';
    valueTable += '             <img id="downImgPosition'
    + this.id + '" style="position:absolute;visibility:hidden;"
    alt="" src="' + this.imgArrowComboBox + '" />';
    valueTable += '             <div id="' + this.id + 'ListDIV"
    style="position:absolute;width:' + parseInt(this.widthList)
    + 'px;height:' + parseInt(this.heightList) + 'px;display:none;overflow-
y:auto;top:0;" class="borderButtonComboBox">';
    valueTable += '                 <Table cellpadding="0"
    cellspacing="0" border="0" width="100%">';

    for (var i = 0; i < this.items.length; i++) {
        valueTable += '                 <Tr>';
        valueTable += '
        <Td class="fontItemComboBox" onclick="' + this.id
         + '.changeSelectionItem(\'' + this.getItem(i).text + '\', \''
         + this.getItem(i).value + '\');" onmouseover="' +
this.id + '.itemSelectionComboBox(this);" onmouseout="'
+ this.id + '.deItemSelectionComboBox(this);">';
        valueTable += '
        <label > ' + this.getItem(i).text + ' </label>';
        valueTable += '                   </Td>';
        valueTable += '                 </Tr>';
    }

    valueTable += '                 </Table>';
    valueTable += '             </div>';
    valueTable += '        </td>';
    valueTable += '    </tr>';
    valueTable += '</Table>';

    recipientElemento.innerHTML = valueTable;
};