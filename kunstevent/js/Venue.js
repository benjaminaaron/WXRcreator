
var Venue = function(){
    
    this.subpages = [];
    this.subpages.push(new VenueSubpage('Informationen', true, false));
    this.subpages.push(new VenueSubpage('Fotos', true, true));
    this.subpages.push(new VenueSubpage('Events', true, true));
    
    this.category = 'Ausstellungsort';
    this.categoryURL = 'ausstellungsort'; 
    this.tdClass = 'tdVenue';
    this.tdTitle = 'neuer Ausstellungsort';
    this.inputPretext = 'Name: ';
    this.inputPrefill = 'Mein neuer Ausstellungsort';   

    Template.call(this);
};

Venue.prototype = {
    __proto__: Template.prototype    
};

var VenueSubpage = function(title, defaultOn, changeAllowed){
    TemplateSubpage.call(this, title, defaultOn, changeAllowed);
};

VenueSubpage.prototype = {
    __proto__: TemplateSubpage.prototype,
    
    buildContent: function(parentPage){
        return TemplateSubpage.prototype.buildContent.call(this, parentPage) + venueAdressTable;
    } 
};
