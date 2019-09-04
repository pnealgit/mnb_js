
//August 29, 2019
 
//essentially sweep might be a kind of finite state machine (fsm)

IN_STATE = new Array(STATE_SIZE).fill(0);
OUT_STATE = new Array(STATE_SIZE).fill(0);

var ACCUMULATORS = [0,0,0];

function think(payload) {
    "use strict";
    var data_in = [0,0,0];
    data_in = payload;

    var ix = 0;
    var max_index = 0;
    var max_value = -9;
    for(var i = 0;i<ACCUMULATORS.length;i++){
        ACCUMULATORS[i] = 0;
    }

    sweep(data_in)
    var possibles = (STATE_SIZE - INPS_SIZE);
    var modo = possibles/INPS_SIZE;
    
    for (var ak=0;ak<possibles;ak++) {
         ix = ak % modo;
         ACCUMULATORS[ix] = ACCUMULATORS[ix] + OUT_STATE[INPS_SIZE+ak]
    } 
    
    //console.log("ACC: ",ACCUMULATORS);
    for(var jj=0;jj<ACCUMULATORS.length;jj++) {
        if (ACCUMULATORS[jj]  > max_value) {
            max_value = ACCUMULATORS[jj];
            max_index = jj;
        }
    } 
    //if you don't know what you are doing, go straight
    /*if (ACCUMULATORS[0] == ACCUMULATORS[1] && ACCUMULATORS[1]  == ACCUMULATORS[2]) {
        max_index = 1;
    }
*/

    return max_index
}

function sweep(data_in) {
    "use strict"; 
    var gate_type = 0;
    var val1;
    var val2;
    var out;
    var output;
    for(var j= 0;j<STATE_SIZE;j++) {
       //IN_STATE[j]  = 0;
       IN_STATE[j]  = OUT_STATE[j];
       
    }

    //write over input section
    for(var j=0;j<data_in.length;j++) {
       IN_STATE[j] = data_in[j];
    }
    for(var j=0;j<STATE_SIZE;j++) {
        OUT_STATE[j] = 0;
    }

    //big loop
    for(var ni=0;ni<NUM_NEURONS;ni++) {
        val1 = IN_STATE[BRAIN.NEURONS[ni][0]]
        val2 = IN_STATE[BRAIN.NEURONS[ni][1]]
        out = -9
        var tt = BRAIN.NEURONS[ni][4];
        out =  tt[val1][val2]
       
        if (out == 1 ) {
            OUT_STATE[BRAIN.NEURONS[ni][2]] = out;
        }

        if (out == 1 ) {
            OUT_STATE[BRAIN.NEURONS[ni][3]] = out;
        }
    } //end of loop on NEURONS
    //end of sweep
}
 
