
var Artist = function(appendRowParam){
    var tr, td;

    tr = $('<tr/>');

    $(tr).insertAfter(appendRowParam).closest('tr');
    appendRow = tr;

    td = $('<td/>').attr({
        'align' : 'center',
        'colspan' : '3',
        'class' : 'artistCell'
    }).appendTo(tr);

    td.append('Name: ');
    this.inputName = $('<input/>').attr({
        'type' : 'text',
        'value' : 'Max Mustermann'
    }).appendTo(td);
    td.append('<br>');

    this.werkeCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append('Werke ');
    
    this.infoCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append('Informationen ');
    
    this.bioCheckbox = $('<input/>').attr({
        'type' : 'checkbox',
        'checked' : 'true',
    }).appendTo(td);
    td.append('Biografie ');
    
    this.td = td;        
};

Artist.prototype = {

    getWXRcontrib: function(){
        this.artistFullName = $(this.inputName).val();
        this.personPageID = currentMaxID ++;
        this.nameForURL = formatNameForURL(this.artistFullName);
        var wxrContrib = instantiatePageTemplate(this.artistFullName, '', this.personPageID, this.nameForURL, 0);

        this.prepareSubpages();
            
        for(var i = 0; i < this.subpages.length; i ++)
            wxrContrib += this.subpages[i].getWXRcontrib();
            
        this.createLandingPageSelectorAndArtistPageCode();
        return wxrContrib;
    },

    prepareSubpages: function(){
        this.werkeChecked = this.werkeCheckbox.prop('checked');
        this.infoChecked = this.infoCheckbox.prop('checked')
        this.bioChecked = this.bioCheckbox.prop('checked');    
        
        var pageID;
        
        this.subpages = [];
        
        if(this.werkeChecked)
            this.subpages.push( new ArtistSubpage(this.artistFullName, 'Werke', currentMaxID ++, 'werke', this.personPageID));
        
        if(this.infoChecked)
            this.subpages.push( new ArtistSubpage(this.artistFullName, 'Informationen', currentMaxID ++, 'informationen', this.personPageID));
        
        if(this.bioChecked)
            this.subpages.push( new ArtistSubpage(this.artistFullName, 'Biografie', currentMaxID ++, 'biografie', this.personPageID));
        
        for(var i = 0; i < this.subpages.length; i ++)
            this.subpages[i].createContent(this.subpages);    
    },
    
    createLandingPageSelectorAndArtistPageCode: function(){
        $(this.inputName).attr('disabled', true);
        $(this.werkeCheckbox).attr('disabled', true);
        $(this.infoCheckbox).attr('disabled', true);
        $(this.bioCheckbox).attr('disabled', true);
        
        //SELECT
        this.td.append($('<br/>'));
        
        this.td.append('Landingpage: ');
        var selector = $('<select/>').appendTo(this.td);
                    
        if(this.werkeChecked){
            var werkeOption = $('<option/>').attr({
                'value' : 'Werke',
            }).appendTo(selector);
            werkeOption.append('Werke');
        };
        
        if(this.infoChecked){
            var infoOption = $('<option/>').attr({
                'value' : 'Informationen',
            }).appendTo(selector);
            infoOption.append('Informationen');
        };
        
        if(this.bioChecked){
            var bioOption = $('<option/>').attr({
                'value' : 'Biografie',
            }).appendTo(selector);
            bioOption.append('Biografie');
        };

        var artistnodepageOption = $('<option/>').attr({
            'value' : 'artistnodepage',
        }).appendTo(selector);
        artistnodepageOption.append('leere Künstlerseite');


        //TEXTAREA
        this.td.append($('<br/>'));
            
        var textarea = $('<textarea/>').attr({
            'rows' : 9,
            'cols' : 80
        }).appendTo(this.td);

        $(textarea).val(this.updateEmbeddCode(this.artistFullName + ' - ' + $(selector).val(), this.nameForURL + '/' + $(selector).val().toLowerCase(), this.artistFullName));
        
        $(textarea).on('click', function(e) {
            this.select();
        });
        
        var self = this;
        
        $(selector).on('change', function (e) {        
            var chosen = $(this).val();    
            if(chosen == 'artistnodepage')
                $(textarea).val(self.updateEmbeddCode(self.artistFullName, self.nameForURL, self.artistFullName));
            else
                $(textarea).val(self.updateEmbeddCode(self.artistFullName + ' - ' + chosen, self.nameForURL + '/' + chosen.toLowerCase(), self.artistFullName));    
        });

    },
    
    updateEmbeddCode: function(landingpageTitle, landingpageURL, artistName){
        var embedd = artistPageEmbedding.innerHTML;
        embedd = embedd.replace('$LANDINGPAGE_TITLE$', landingpageTitle);
        embedd = embedd.replace('$LANDINGPAGE_URL$', landingpageURL);
        embedd = embedd.replace('$LANDINGPAGE_URL$', landingpageURL); // appears twice and replace func stops after doing one
        embedd = embedd.replace('$ARTIST_NAME$', artistName);
        return embedd;        
    }
};


// ARTIST SUBPAGE

var ArtistSubpage = function(artistFullName, subpageHeaderTitle, pageID, URLpart, personPageID){
    this.artistFullName = artistFullName;
    this.subpageHeaderTitle = subpageHeaderTitle;
    this.pageID = pageID;
    this.URLpart = URLpart;
    this.personPageID = personPageID;
};

ArtistSubpage.prototype = {

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



