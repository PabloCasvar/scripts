$.writeln("");
var FONDO  = "Fondo";
var FONDO_BN = "Fondo BN";
var FONDO_BN_INVERSE = "Fondo BN Inversa";
var COPIA   = " copia";
var doc       = app.activeDocument;

// Specific variables to generate puppets
var CARA_COLOR    = "Cara color";
var BOCA_COLOR    = "Boca color";
var CABELLO_CEJAS_COLOR   = "Cabello Cejas color";
var DIENTES_OJOS_COLOR = "Dientes Ojos color"
var COLORES = "Colores";
var MASCARA = "Mascara";

duplicateLayerByName (FONDO, FONDO_BN);
getLayerByName (FONDO_BN).desaturate();
duplicateLayerByName (FONDO_BN, FONDO_BN_INVERSE);
getLayerByName (FONDO_BN_INVERSE).invert();

var colorsLayerSet = doc.layerSets.add(); 
colorsLayerSet.name = COLORES;

createNewLayerInsideLayerSet (CARA_COLOR, COLORES);
createNewLayerInsideLayerSet (DIENTES_OJOS_COLOR, COLORES);
createNewLayerInsideLayerSet (BOCA_COLOR, COLORES);
createNewLayerInsideLayerSet (CABELLO_CEJAS_COLOR, COLORES);


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

function createNewLayerInsideLayerSet(layerName, layerSetName){
        createNewLayer (layerName);
        getLayerByName (layerName).move (getLayerSetByName (layerSetName), ElementPlacement.INSIDE);    
    }