
var Template = function(tdClass){

    var tr = $('<tr/>');
    $(tr).insertAfter(appendRow).closest('tr');
    appendRow = tr; //it moves downwards with each new template

    this.td = $('<td/>').attr({
        'align' : 'center',
        'class' : this.tdClass
    }).appendTo(tr);
    this.td.append('<h2 class=\"' + this.tdTitleClass + '\">' + this.tdTitle + '</h2>');
    this.td.append('<br>');
        
    this.td.append(this.inputPretext);
    this.inputField = $('<input/>').attr({
        'type' : 'text',
        'value' : this.inputPrefill,
        'size' : 30
    }).appendTo(this.td);
    this.td.append('<br>');
    
    for(var i = 0; i < this.subpages.length; i ++)
        this.subpages[i].appendCheckboxDOM(this.td);
};

Template.prototype = {

    getWXRcontrib: function(){
        
        var parentPageID = currentMaxID ++;
        
        this.parentPageTitle = $(this.inputField).val();
        this.parentPageTitleURL = formatForURL(this.parentPageTitle)
        
        var wxrContrib = instantiatePageTemplate(this.parentPageTitle, '', parentPageID, this.parentPageTitleURL, 0);

        for(var i = 0; i < this.subpages.length; i ++){
            var subpage = this.subpages[i];
            if(subpage.isActive()){
                var content = subpage.buildContent(this);
                wxrContrib += instantiatePageTemplate(this.parentPageTitle + ' - ' + subpage.title , content, currentMaxID ++, subpage.titleURL, parentPageID);
            };
        };
        
        this.buildEmbeddingSnippet();
        return wxrContrib;
    },

    buildEmbeddingSnippet: function(){
        
        this.inputField.attr('disabled', true);
        
        //SELECT
        this.td.append($('<br/>'));
        
        this.td.append('Landing-Page: ');
        var selector = $('<select/>').appendTo(this.td);
                    
        for(var i = 0; i < this.subpages.length; i ++)
            this.subpages[i].disableCheckboxAndAppendToSelector(selector);
            
        var option = $('<option/>').attr({
            'value' : 'parentPage',
        }).appendTo(selector);
        option.append('empty parent page');    
                
        //TEXTAREA
        this.td.append($('<br/>'));
            
        var textarea = $('<textarea/>').attr({
            'rows' : this.textareaRows,
            'cols' : this.textareaCols
        }).appendTo(this.td);

        var chosen = $(selector).val();
        var embed = getEmbeddingSnippet(this.embeddingSnippet, this.parentPageTitle + ' - ' + chosen, this.parentPageTitle, this.parentPageTitleURL + '/' + formatForURL(chosen), this.categoryURL);

        $(textarea).val(embed);
        
        $(textarea).on('click', function(e) {
            this.select();
        });
        
        var self = this;
        
        $(selector).on('change', function (e) {       
            var chosen = $(this).val();    
            var landingpageLongTitle = '';
            var landingpageURL = '';
            if(chosen == 'parentPage'){
                landingpageLongTitle = self.parentPageTitle;
                landingpageURL = self.parentPageTitleURL;
            }
            else {
                landingpageLongTitle = self.parentPageTitle + ' - ' + chosen;
                landingpageURL = self.parentPageTitleURL + '/' + formatForURL(chosen);
            }
            var embed = getEmbeddingSnippet(self.embeddingSnippet, landingpageLongTitle, self.parentPageTitle, landingpageURL, self.categoryURL);
            $(textarea).val(embed);
        });
        
        var div = $('<div/>').attr({
            'align' : 'center',
            'style' : 'font-size: 0.8em;'
        }).appendTo(this.td);
        $(div).append('<br/>Diesen Code <a target="_blank" href=\"' + this.pageWhereToEmbedInEditMode + '\">hier</a> einbauen.');   
    }
    
};

var TemplateSubpage = function(title, defaultOn, changeAllowed){
    this.title = title;
    this.titleURL = formatForURL(title);
    this.defaultOn = defaultOn;
    this.changeAllowed = changeAllowed;
};

TemplateSubpage.prototype = {
    
    appendCheckboxDOM: function(td){    
        this.checkbox = $('<input/>').attr({
            'type' : 'checkbox',
            'checked' : this.defaultOn,
            'disabled' : !this.changeAllowed
        }).appendTo(td);   
        td.append(this.title + ' ');
    },
    
    isActive: function(){
        return this.checkbox.prop('checked');    
    },
    
    buildContent: function(parentPage){
        var content = pageNavTableStart.replace('$PAGETITLE$', parentPage.parentPageTitle);
                
        for(var i = 0; i < parentPage.subpages.length; i ++){
            var subpage = parentPage.subpages[i];
            if(subpage.isActive()){         
                var focuscol = subpage.title == this.title ? pageNavTableFocusColumn : '';
                var header = pageNavTableOneHeader.replace('$FOCUSCOL$', focuscol)
                    .replace('$SUBPAGE_TITLE$', parentPage.parentPageTitle + ' - ' + subpage.title)
                    .replace('$CATEGORY_URL$', parentPage.categoryURL)
                    .replace('$SUBPAGE_URL$', parentPage.parentPageTitleURL + '/' + subpage.titleURL)
                    .replace('$SUBPAGE_TITLE$', subpage.title);  
                content += header;
            };
        };
        content += pageNavTableEnd.replace('$CATEGORY_URL$', parentPage.categoryURL)
            .replace('$CATEGORY$', parentPage.category)
            .replace('$CATEGORY$', parentPage.category);
        return content;
    },
    
    disableCheckboxAndAppendToSelector: function(selector){
        this.checkbox.attr('disabled', true);
        
        if(this.isActive()){
            var option = $('<option/>').attr({
                'value' : this.title,
            }).appendTo(selector);
            option.append(this.title);
        };
    }
    
};
