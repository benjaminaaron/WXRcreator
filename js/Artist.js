
var Artist = function(appendRowParam){

    var tr, td;

    tr = $('<tr/>');

    $(tr).insertAfter(appendRowParam).closest("tr");
    appendRow = tr;

    td = $('<td/>').attr({
        'align' : 'center',
        'colspan' : '3'
    }).appendTo(tr);

    td.append("Name: ");
    this.inputName = $('<input/>').attr({
        'type' : 'text',
        'value' : 'Max Mustermann'
    }).appendTo(td);
    td.append("<br>");

    this.werkeCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append("Werke ");
    this.informationenCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append("Informationen ");
    this.biografieCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append("Biografie ");
};

Artist.prototype = {

    getWXRcontrib: function(){
        var wxrContrib = "";
        var name = $(this.inputName).val();

        var personPageID = currentMaxID ++;
        var pageID;
        wxrContrib += instantiatePageTemplate(name, "", personPageID, formatNameForURL(name), 0);

        if(this.werkeCheckbox.prop('checked')){
            pageID = currentMaxID ++;
            wxrContrib += instantiatePageTemplate(name + " - Werke", "werke content", pageID, "werke", personPageID);
        }

        if(this.informationenCheckbox.prop('checked')){
            pageID = currentMaxID ++;
            wxrContrib += instantiatePageTemplate(name + " - Informationen", "informationen content", pageID, "informationen", personPageID);
        }

        if(this.biografieCheckbox.prop('checked')){
            pageID = currentMaxID ++;
            wxrContrib += instantiatePageTemplate(name + " - Biografie", "biografie content", pageID, "biografie", personPageID);
        }

        return wxrContrib;
    }
    
};
