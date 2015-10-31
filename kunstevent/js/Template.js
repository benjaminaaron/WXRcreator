
var Template = function(tdClass){

    var tr = $('<tr/>');
    $(tr).insertAfter(appendRow).closest('tr');
    appendRow = tr; //it moves downwards with each new template

    this.td = $('<td/>').attr({
        'align' : 'center',
        'class' : this.tdClass
    }).appendTo(tr);
    this.td.append('<b>' + this.tdTitle + '<b>');
    this.td.append('<br>');
    
    this.td.append(this.inputPretext);
    this.inputField = $('<input/>').attr({
        'type' : 'text',
        'value' : this.inputPrefill
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

        return wxrContrib;
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
    }
    
};
