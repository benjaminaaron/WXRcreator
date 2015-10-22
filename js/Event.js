
var Event = function(appendRowParam){

    var tr, td;

    tr = $('<tr/>');

    $(tr).insertAfter(appendRowParam).closest("tr");
    appendRow = tr;

    td = $('<td/>').attr({
        'align' : 'center',
        'colspan' : '3'
    }).appendTo(tr);

    td.append("Titel: ");
    this.inputTitel = $('<input/>').attr({
        'type' : 'text',
        'value' : 'Neues Event'
    }).appendTo(td);
    td.append("<br>");

    this.informationenCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append("Informationen ");
    this.werkeCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append("Werke ");
};

Event.prototype = {

    getWXRcontrib: function(){

    }
};
