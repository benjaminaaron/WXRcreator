
var Artist = function(){
    
    this.subpages = [];
    this.subpages.push(new ArtistSubpage('Werke', true, true));
    this.subpages.push(new ArtistSubpage('Informationen', true, true));
    this.subpages.push(new ArtistSubpage('Biografie', true, true));
    
    this.category = 'Künstler';
    this.categoryURL = 'kunstler'; 
    this.tdClass = 'tdArtist';
    this.tdTitle = 'neuer Künstler';
    this.tdTitleClass = 'tdTitleArtist';
    this.inputPretext = 'Name: ';
    this.inputPrefill = 'Max Mustermann';
    this.embeddingSnippet = embeddingSnippet;
    this.textareaRows = 10;
    this.textareaCols = 60;

    Template.call(this);
};

Artist.prototype = {
    __proto__: Template.prototype
};

var ArtistSubpage = function(title, defaultOn, changeAllowed){
    TemplateSubpage.call(this, title, defaultOn, changeAllowed);
};

ArtistSubpage.prototype = {
    __proto__: TemplateSubpage.prototype,
};
