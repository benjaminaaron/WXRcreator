
var Event = function(appendRowParam){
    var tr, td;

    tr = $('<tr/>');

    $(tr).insertAfter(appendRowParam).closest('tr');
    appendRow = tr;

    td = $('<td/>').attr({
        'align' : 'center',
        'colspan' : '3',
        'class' : 'eventCell'
    }).appendTo(tr);

    td.append('Titel: ');
    this.eventTitle = $('<input/>').attr({
        'type' : 'text',
        'value' : 'Titel des neuen Events'
    }).appendTo(td);
    td.append('<br>');

    this.infoCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append('Informationen ');
    
    this.werkeCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append('Werke ');
    
    this.photosCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append('Fotos ');
    
    this.td = td;    
};

Event.prototype = {

    getWXRcontrib: function(){
        this.eventTitle = $(this.eventTitle).val();
        this.eventPageID = currentMaxID ++;
        this.titleForURL = formatNameForURL(this.eventTitle);
        var wxrContrib = instantiatePageTemplate(this.eventTitle, '', this.eventPageID, this.titleForURL, 0);

        this.prepareSubpages();
            
        for(var i = 0; i < this.subpages.length; i ++)
            wxrContrib += this.subpages[i].getWXRcontrib();
            
        this.createLandingPageSelectorAndArtistPageCode();
        return wxrContrib;
    },
    
    prepareSubpages: function(){
        this.infoChecked = this.infoCheckbox.prop('checked')
        this.werkeChecked = this.werkeCheckbox.prop('checked');
        this.photosChecked = this.photosCheckbox.prop('checked');    
        
        var pageID;
        
        this.subpages = [];
        
        if(this.infoChecked)
            this.subpages.push( new EventSubpage(this.eventTitle, 'Informationen', currentMaxID ++, 'informationen', this.eventPageID));
        
        if(this.werkeChecked)
            this.subpages.push( new EventSubpage(this.eventTitle, 'Werke', currentMaxID ++, 'werke', this.eventPageID));

        if(this.photosChecked)
            this.subpages.push( new EventSubpage(this.eventTitle, 'Biografie', currentMaxID ++, 'photos', this.eventPageID));
        
        for(var i = 0; i < this.subpages.length; i ++)
            this.subpages[i].createContent(this.subpages);    
    },
    
    
    
    
    
    
    
    
    
};





// EVENT SUBPAGE

var EventSubpage = function(eventTitle, subpageHeaderTitle, pageID, URLpart, eventPageID){
    this.eventTitle = eventTitle;
    this.subpageHeaderTitle = subpageHeaderTitle;
    this.pageID = pageID;
    this.URLpart = URLpart;
    this.eventPageID = eventPageID;
};

EventSubpage.prototype = { //TODO

    createContent: function(subpages){    
        this.content = artistPageStart.replace('$TITLE$', this.artistFullName + ' - ' + this.subpageHeaderTitle);
        
        for(var i = 0; i < subpages.length; i ++){
            var subpage = subpages[i];
            var focuscol = '';
            if(subpage.pageID == this.pageID)            
                focuscol = focusColumn;
            var header = artistPageHeader.replace('$FOCUSCOL$', focuscol);
            header = header.replace('$MOUSEOVERLINKTITLE$', subpage.artistFullName + ' - ' + subpage.subpageHeaderTitle);
            header = header.replace('$SUBPAGEURL$', subpage.URLpart);
            header = header.replace('$SUBPAGE_TITLE$', subpage.subpageHeaderTitle);    
            this.content += header;
        };
        this.content += artistPageEnd;           
    },
    
    getWXRcontrib: function(){
        return instantiatePageTemplate(this.artistFullName + ' - ' + this.subpageHeaderTitle, this.content, this.pageID, this.URLpart, this.personPageID);    
    }    
};













