
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
        
    this.parentPageID = currentMaxID ++;
};

Template.prototype = {

    getWXRcontrib: function(){
        
        var parentPageTitle = $(this.inputField).val();
        var parentPageTitleURL = formatForURL(parentPageTitle)
        
        var wxrContrib = instantiatePageTemplate(parentPageTitle, '', this.parentPageID, parentPageTitleURL, 0);

        for(var i = 0; i < this.subpages.length; i ++){
            var subpage = this.subpages[i];
            if(subpage.isActive()){
                var content = subpage.buildContent(this.subpages, this.category, this.categoryURL, parentPageTitle, parentPageTitleURL);
                wxrContrib += instantiatePageTemplate(parentPageTitle + ' - ' + subpage.title , content, currentMaxID ++, subpage.titleURL, this.parentPageID);
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
    
    buildContent: function(subpages, category, categoryURL, parentPageTitle, parentPageTitleURL){
        
        var content = pageNavTableStart.replace('$PAGETITLE$', parentPageTitle);
                
        for(var i = 0; i < subpages.length; i ++){
            var subpage = subpages[i];
            if(subpage.isActive()){         
                var focuscol = subpage.title == this.title ? pageNavTableFocusColumn : '';
                var header = pageNavTableOneHeader.replace('$FOCUSCOL$', focuscol)
                    .replace('$SUBPAGE_TITLE$', parentPageTitle + ' - ' + subpage.title)
                    .replace('$CATEGORY_URL$', categoryURL)
                    .replace('$SUBPAGE_URL$', parentPageTitleURL + '/' + subpage.titleURL)
                    .replace('$SUBPAGE_TITLE$', subpage.title);  
                content += header;
            };
        };
        
        content += pageNavTableEnd.replace('$CATEGORY_URL$', categoryURL)
            .replace('$CATEGORY$', category)
            .replace('$CATEGORY$', category);

        return content;
    }
    
};
