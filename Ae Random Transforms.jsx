if (app.project.activeItem == null || app.project.activeItem.typeName != "Composición" || app.project.activeItem.selectedLayers == null || app.project.activeItem.selectedLayers.length < 1){
        alert("Selecciona una capa dentro de una composción primero");
    } else {
// Initial values for user interface
var composition_name = app.project.activeItem.name;
var layer_name = app.project.activeItem.selectedLayers[0].name;
var comp = getItemByName (composition_name);
var propPos   = comp.layer(layer_name).property("Transform").property("Position");
var propRot   = comp.layer(layer_name).property("Transform").property("Rotation");
var propSca  = comp.layer(layer_name).property("Transform").property("Scale");     
var current_time = app.project.activeItem.time;
var X0 = propPos.valueAtTime(current_time, false)[0];
var Y0 = propPos.valueAtTime(current_time, false)[1];
var R0 = propRot.valueAtTime(current_time, false);
var S0x = propSca.valueAtTime(current_time, false)[0];
var S0y = propSca.valueAtTime(current_time, false)[1];
var posX_factor = 50;
var posY_factor = 100;
var rot_factor = 30;
var scaX_factor = 25;
var scaY_factor = 25;
var time_initial = current_time;
var time_final   = time_initial + 10.0;
var n_intervals = 10;


// Creates user interface
var win = new Window("dialog", "Alert Box Builder");
win.frameLocation = [100,100]; 

// Constants for user interface
var X_INI = 10;
var X_INI_2 = X_INI + 100;
var X_INI_3 = X_INI_2 + 80;
var X_INI_4 = X_INI_3 +100;
var Y_SPACE = 10;
var TEXT_WIDTH = 50;
var TEXT_HEIGHT = 20;
var SELECT_WIDTH = 200;
var SELECT_HEIGHT = 100;
var BUTTON_WIDTH = 70;
var BUTTON_HEIGHT = 20;
var LABEL_WIDTH = 100;
var LABEL_HEIGHT = 20;
var Y_INI = 10;

var y = Y_INI;

var composition_listbox               = win.add("listbox", [X_INI, y, X_INI+ SELECT_WIDTH, y + SELECT_HEIGHT], getCompositionsArray(), {numberOfColumns: 1, showHeaders: true, columnTitles: ['Composition Name'], columnWidths: [SELECT_WIDTH] });
preselectCompositionInListbox();
y += SELECT_HEIGHT + Y_SPACE;
var layers_listbox              = win.add("listbox", [X_INI, y, X_INI + SELECT_WIDTH, y + SELECT_HEIGHT], getLayersFromComposition (composition_name),  {numberOfColumns: 1, showHeaders: true, columnTitles: ['Layer Name'] });
y += SELECT_HEIGHT + Y_SPACE;
preselectLayerInListbox();

var time_initial_label          = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Initial time:");
var time_initial_edittext       = win.add("edittext", [X_INI_2, y, X_INI_2 + TEXT_WIDTH, y + TEXT_HEIGHT], time_initial);
var time_final_label            = win.add("statictext", [X_INI_3, y, X_INI_3 + LABEL_WIDTH, y + LABEL_HEIGHT], "Final time:");
var time_final_edittext         = win.add("edittext", [X_INI_4, y, X_INI_4 + TEXT_WIDTH, y + TEXT_HEIGHT], time_initial + 10);
y += TEXT_HEIGHT + Y_SPACE;
var n_intervals_label           = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Intervals:");
var n_intervals_edittext        = win.add("edittext", [X_INI_2, y, X_INI_2 + TEXT_WIDTH, y + TEXT_HEIGHT], n_intervals);
y += TEXT_HEIGHT + Y_SPACE;
var X0_label                    = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Initial X position:");
var X0_edittext                 = win.add("edittext", [X_INI_2, y, X_INI_2 + TEXT_WIDTH, y + TEXT_HEIGHT], X0);
var posX_factor_label           = win.add("statictext", [X_INI_3, y, X_INI_3 + LABEL_WIDTH, y + LABEL_HEIGHT], "Change X position:");
var posX_factor_edittext        = win.add("edittext", [X_INI_4, y, X_INI_4 + TEXT_WIDTH, y + TEXT_HEIGHT], posX_factor);
y += TEXT_HEIGHT + Y_SPACE;
var Y0_label                    = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Initial Y position:");
var Y0_edittext                 = win.add("edittext", [X_INI_2, y, X_INI_2 + TEXT_WIDTH, y + TEXT_HEIGHT], Y0);
var posY_factor_label           = win.add("statictext", [X_INI_3, y, X_INI_3 + LABEL_WIDTH, y + LABEL_HEIGHT], "Change Y position:");
var posY_factor_edittext        = win.add("edittext", [X_INI_4, y, X_INI_4 + TEXT_WIDTH, y + TEXT_HEIGHT], posY_factor);
y += TEXT_HEIGHT + Y_SPACE;
var R0_label                    = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Initial rotation:");
var R0_edittext                 = win.add("edittext", [X_INI_2, y, X_INI_2+ TEXT_WIDTH, y + TEXT_HEIGHT], R0);
var rot_factor_label            = win.add("statictext", [X_INI_3, y, X_INI_3 + LABEL_WIDTH, y + LABEL_HEIGHT], "Change rotation:");
var rot_factor_edittext         = win.add("edittext", [X_INI_4, y, X_INI_4 + TEXT_WIDTH, y + TEXT_HEIGHT], rot_factor);
y += TEXT_HEIGHT + Y_SPACE;
var S0x_label                   = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Initial X scale:");
var S0x_edittext                = win.add("edittext", [X_INI_2, y, X_INI_2 + TEXT_WIDTH, y + TEXT_HEIGHT], S0x);
var scax_factor_label           = win.add("statictext", [X_INI_3, y, X_INI_3 + LABEL_WIDTH, y + LABEL_HEIGHT], "Change X scale:");
var scaX_factor_edittext        = win.add("edittext", [X_INI_4, y, X_INI_4 + TEXT_WIDTH, y + TEXT_HEIGHT], scaX_factor);
y += TEXT_HEIGHT + Y_SPACE;
var S0y_label                   = win.add("statictext", [X_INI, y, X_INI + LABEL_WIDTH, y + LABEL_HEIGHT], "Initial Y scale:");
var S0y_edittext                = win.add("edittext", [X_INI_2, y, X_INI_2 + TEXT_WIDTH, y + TEXT_HEIGHT], S0y);
var scaY_label                  = win.add("statictext", [X_INI_3, y, X_INI_3 + LABEL_WIDTH, y + LABEL_HEIGHT], "Change Y scale:");
var scaY_factor_edittext        = win.add("edittext", [X_INI_4, y, X_INI_4+ TEXT_WIDTH, y + TEXT_HEIGHT], scaY_factor);
y += TEXT_HEIGHT + 3*Y_SPACE;
var ok_button                   = win.add("button",  [X_INI_4, y, X_INI_4 + BUTTON_WIDTH, y + BUTTON_HEIGHT], "OK");
y += TEXT_HEIGHT + Y_SPACE;
win.size = [X_INI_4 + BUTTON_WIDTH + Y_SPACE , y];

ok_button.onClick =  function() { 
        if(composition_listbox.selection != null && layers_listbox.selection != null){
                composition_name = composition_listbox.selection.text;
                layer_name  = layers_listbox.selection.text;
            }else{
                composition_name = null;
                layer_name  = null;
            }
        time_initial    = Number(time_initial_edittext.text);
        time_final      = Number(time_final_edittext.text);    
        n_intervals     = Number(n_intervals_edittext.text);   
        X0              = Number(X0_edittext.text);          
        posX_factor     = Number(posX_factor_edittext.text); 
        Y0              = Number(Y0_edittext.text);          
        posY_factor     = Number(posY_factor_edittext.text);  
        R0              = Number(R0_edittext.text);          
        rot_factor      = Number(rot_factor_edittext.text);   
        S0x             = Number(S0x_edittext.text);         
        scaX_factor     = Number(scaX_factor_edittext.text);
        S0y             = Number(S0y_edittext.text);
        scaY_factor     = Number(scaY_factor_edittext.text);  
        
        generateRandonMovements(composition_name, layer_name, time_initial, time_final, n_intervals, X0, Y0, R0, S0x, S0y, posX_factor, posY_factor, rot_factor, scaX_factor, scaY_factor);
        win.close();
    }

composition_listbox.onChange = function() {
        if(composition_listbox.selection != null){
                var composition_selected = getItemByName (composition_listbox.selection.text);
                var layers = composition_selected.layers;
                layers_listbox.removeAll();
                for( j=1 ; j<= layers.length ; j++){
                        layers_listbox.add("item", layers[j].name);
                    }
            }
        }
   
win.show();

function linspace(initial_time, final_time, number_intervals){
        if (final_time < initial_time){
                    var temp = initial_time;
                    initial_time = final_time;
                    final_time = temp;
            }
        
        if (number_intervals < 2){
                    return [initial_time, final_time];
            } else {
                    var time_interval = (final_time - initial_time)/number_intervals;
                    var time_array = [];
                    for (var k=0 ; k<=number_intervals ; k++){
                                time_array.push(initial_time + k*time_interval); 
                        }
                    return time_array;
             }
    }

function getItemByName(name){
        if (name == null ){
               return null;
            }else{
                var docItems = app.project.items;
                for(var i=1 ; i<=docItems.length ; i++){
                    if(name === docItems[i].name){
                            return docItems[i];
                        }
                }    
            }
    }


// Get list of available compositions 
function getCompositionsArray(){
            var comp_items = [];
            var general_items = app.project.items;
            for( var i=1; i<=general_items.length ; i++){
                    if (general_items[i].typeName === "Composición")
                        comp_items.push(general_items[i].name);
                }
            return comp_items;
    }

function getLayersFromComposition(compositionName){
        var composition = getItemByName (compositionName);
        var layersName = [];
        for (var i=1; i<=composition.layers.length ; i++){
                layersName.push(composition.layers[i].name);
            }
        return layersName;
    }

function generateRandonMovements(composition_name, layer_name, time_initial, time_final, n_intervals, X0, Y0, R0, S0x, S0y, posX_factor, posY_factor, rot_factor, scaX_factor, scaY_factor){
        // Check that all arguments are defined
        if( composition_name           != null &&
            layer_name, time_initial    != null &&
            time_final, n_intervals       != null &&
            X0                                   != null &&
            Y0                                   != null &&
            R0                                   != null &&
            S0x                                 != null &&
            S0y                                 != null &&
            posX_factor                     != null &&
            posY_factor                     != null &&
            rot_factor                        != null &&
            scaX_factor                     != null &&
            scaY_factor                     != null ){
                 // Get the properties
                var comp = getItemByName (composition_name);
                var propPos   = comp.layer(layer_name).property("Transform").property("Position");
                var propRot   = comp.layer(layer_name).property("Transform").property("Rotation");
                var propSca  = comp.layer(layer_name).property("Transform").property("Scale");        
                var sign = 1; 
                // Generates the instans of time 
                var time = linspace(time_initial, time_final, n_intervals);
                // Generate the keyframes in the given instants os time
                for (var i = 0; i<time.length; i++){
                        // Inserts keyframes, for initial time random change is not inserted
                        if(i == 0){
                                propPos.setValueAtTime(time[i], [X0, Y0]);
                                propRot.setValueAtTime(time[i],  R0);
                                propSca.setValueAtTime(time[i], [S0x, S0y]);           
                            } else {
                                if(Math.random() < 0.5){
                                        sign = -1
                                    } else {
                                        sign = 1;    
                                    }
                                propPos.setValueAtTime(time[i], [X0 + posX_factor*Math.random(), Y0 + posY_factor*Math.random()]);
                                propRot.setValueAtTime(time[i],  R0  + sign*rot_factor*Math.random());
                                propSca.setValueAtTime(time[i], [S0x + scaX_factor*Math.random(), S0y + scaY_factor*Math.random()]);
                            }
                    }                
            }
    }

function generateRandonMovementsSameScaleFactor(composition_name, layer_name, time_initial, time_final, n_intervals, X0, Y0, R0, S0x, S0y, posX_factor, posY_factor, rot_factor, sca_factor){
        generateRandonMovements(composition_name, layer_name, time_initial, time_final, n_intervals, X0, Y0, R0, S0x, S0y, posX_factor, posY_factor, rot_factor, sca_factor, sca_factor);
    }

function preselectCompositionInListbox(){
        // preselect the composition in the listbox
        for (var i=0; i<getCompositionsArray().length; i++){
                //alert (getCompositionsArray()[i]);
                if(composition_name === getCompositionsArray()[i])
                    composition_listbox.selection = i;
            }    
    }

function preselectLayerInListbox(){
        for (var i=0; i<getLayersFromComposition(composition_listbox.selection.text).length; i++){
                if(layer_name === getLayersFromComposition(composition_listbox.selection.text)[i])
                    layers_listbox.selection = i;
            } 
    }
 } // End of else (initial validation)