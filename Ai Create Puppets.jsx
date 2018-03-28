$.writeln("");
var FONDO  = "Fondo";
var COPIA   = " copia";
var doc       = app.activeDocument;

// Specific variables to generate puppets
var CARA    = "Cara";
var BOCA    = "Boca";
var CEJAD   = "CejaD";
var CEJAI    = "CejaI";
var COLORES = "Colores";
var MASCARA = "Mascara";

// Colors
var BLACK_COLOR = new SolidColor();
BLACK_COLOR.rgb.red        = 0;
BLACK_COLOR.rgb.green    = 0;
BLACK_COLOR.rgb.blue      = 0;

// Deselect any path, otherwise script doesn`t work propertly
if(doc.pathItems.length > 0)
    app.activeDocument.pathItems[0].deselect();

for (var i = 0 ; i<doc.layerSets.length ; i++){
        if (doc.layerSets[i].name != COLORES)
            doc.layerSets[i].visible = false;
    }

for (i = 0 ; i<doc.artLayers.length ; i++){
        if(doc.artLayers[i].name != MASCARA)
            doc.artLayers[i].visible = false;
    }

getLayerSetByName(COLORES).visible = true;
getLayerByName (MASCARA).visible = true;
setActiveLayerByName (MASCARA);
doc.activeLayer.move (doc, ElementPlacement.PLACEATBEGINNING);

createPuppetLayer (CARA);
createPuppetLayer (BOCA);
createPuppetLayer (CEJAI);
createPuppetLayer (CEJAD);

// Clears CARA layer
getPathByName (BOCA).makeSelection();
setActiveLayerByName (CARA);
doc.selection.clear();
doc.selection.fill(BLACK_COLOR);
getPathByName (CARA).makeSelection ();
doc.selection.invert();
doc.selection.clear();

//Clears BOCA layer
getPathByName (CARA).makeSelection();
setActiveLayerByName (BOCA);
doc.selection.invert();
doc.selection.clear();

doc.selection.deselect();

// Resize BOCA
app.preferences.rulerUnits = Units.PERCENT; 
doc.activeLayer.resize (93, 100);



function createPuppetLayer(puppetPart){
        getPathByName(puppetPart).makeSelection();
        setActiveLayerByName (MASCARA);
        doc.selection.copy(true);
        createNewLayer (puppetPart);
        setActiveLayerByName (puppetPart);
        doc.paste();
    }

function getLayerByName(name){
    return app.activeDocument.artLayers.getByName(name);
}

function createNewLayer(name){
    var newLayer = app.activeDocument.artLayers.add();
    newLayer.name = name;
}

function getPathByName(name){
        return app.activeDocument.pathItems.getByName (name);
    }

function duplicateLayerByName(name, newLayersName){
        getLayerByName (name).duplicate();
        getLayerByName (name + COPIA).name = newLayersName;
    }

function setActiveLayerByName(name){
        app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName (name);
    }

function getLayerSetByName(name){
        return app.activeDocument.layerSets.getByName (name);
    }
