
var Event = function(){
    
    this.subpages = [];
    this.subpages.push(new EventSubpage('Informationen', true, false));
    this.subpages.push(new EventSubpage('Werke', true, true));
    this.subpages.push(new EventSubpage('Fotos', false, true));
    
    this.category = 'Events';
    this.categoryURL = 'events'; 
    this.tdClass = 'tdEvent';
    this.tdTitle = 'neues Event';
    this.inputPretext = 'Titel: ';
    this.inputPrefill = 'Mein neues Event';   

    Template.call(this);
    
    this.buildEventTable();
};

Event.prototype = {
    __proto__: Template.prototype,
    
    buildEventTable: function(){
        this.td.append('<br>');
        
        var div = $('<div/>').attr({
            'style' : 'font-size:80%'
        }).appendTo(this.td);
        div.append('weitere Punkte unter Informationen: ');
        
        this.tags = $('<ul/>').appendTo(this.td);   
        $('<li/>').appendTo(this.tags).append('Ausstellungsort');

        $(this.tags).tagit({
            availableTags : ['Ausstellungsort', 'Künstler', 'Links', 'Pressemitteilung', 'Artikel'],
            showAutocompleteOnFocus : true
        });
    }
};

var EventSubpage = function(title, defaultOn, changeAllowed){
    TemplateSubpage.call(this, title, defaultOn, changeAllowed);
};

EventSubpage.prototype = {
    __proto__: TemplateSubpage.prototype,
    
    buildContent: function(parentPage){
        var content = TemplateSubpage.prototype.buildContent.call(this, parentPage);
                
        if(this.title == "Informationen"){
            var additionalLabels = $(parentPage.tags).tagit('assignedTags'); //for eventTable
            
            if(additionalLabels.length > 0){
                content += eventTableStart;
                for(var i = 0; i < additionalLabels.length; i ++)
                    content += eventTableRow.replace('$LABEL$', additionalLabels[i]);                
                content += eventTableEnd;
            };
        }

        return content;
    }    
};
