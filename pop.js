var POP_SIZE = 10 ;
var INPS_SIZE = 3;
var NUM_NEURONS = 16;
var STATE_SIZE = 40;
BRAIN = {};
POPULATION = [];
var ID_COUNTER = 0;
var NUM_GATE_TYPES = 6;
var FPGA_STRING;
 
function make_neuron(){
    "use strict"; 
    //only 5 things really needed assuming 2 inputs, 2 outputs and a gate type
    var neuron = [0,0,0,0,0]
    //gate type
    neuron[0] = getRandomInt(0,NUM_GATE_TYPES);
    //inputs
    neuron[1] = getRandomInt(0,STATE_SIZE);
    neuron[2] = getRandomInt(0,STATE_SIZE);
    //outputs
    neuron[3] = getRandomInt(INPS_SIZE,STATE_SIZE);
    neuron[4] = getRandomInt(INPS_SIZE,STATE_SIZE);
    return neuron 
}

function make_brain() { 
   "use strict";
   var b = {};
   var stuff = [];
   b.Fitness = -1.0 * Math.random();
   b.Id = ID_COUNTER;
   b.NEURONS = [];
   for(var i=0;i<NUM_NEURONS;i++) {
      stuff = make_neuron();
      b.NEURONS.push(stuff);
   }
   return b
}
function make_population() {
    "use strict";
    ID_COUNTER = 0;
    for (var i=0;i<POP_SIZE;i++) {
       ID_COUNTER+= 1;
       var stuff = make_brain();
       POPULATION.push(stuff);
    }

    get_new_brain(); //start things off
}

function deepcopy(x) {
   BRAIN = {};
   BRAIN = JSON.parse(JSON.stringify(x));
}

     
function get_new_brain() {
   "use strict";
   BRAIN = {}; 
   if (TRY < POP_SIZE) {
         deepcopy(POPULATION[TRY]);
         return
    }

   POPULATION = POPULATION.sort((a, b) => Number(b.Fitness) - Number(a.Fitness));
   BRAIN = JSON.parse(JSON.stringify(POPULATION[0]));
   BRAIN.Fitness = 0;

   ID_COUNTER+= 1;
   xc();
   mutate();
}

function xc(){
    "use strict";
    //crossover
    var b1_index = getRandomInt(1,5);
    var cb = JSON.parse(JSON.stringify(POPULATION[b1_index]));
    var n_step = getRandomInt(0,NUM_NEURONS);
    BRAIN.NEURONS[n_step] = cb.NEURONS[n_step];
    n_step = getRandomInt(0,NUM_NEURONS);
    BRAIN.NEURONS[n_step] = cb.NEURONS[n_step];
}
     
function update_population(fitness){ 
   "use strict";
   console.log("TRY: ",TRY," FITNESS : ",fitness);
   BRAIN.Fitness = fitness;
   if (TRY < POP_SIZE) {
       POPULATION[TRY] = JSON.parse(JSON.stringify(BRAIN));
       make_table()
       TRY++;
       get_new_brain();
       return
   }
   TRY++;
   POPULATION = POPULATION.sort((a, b) => Number(b.Fitness) - Number(a.Fitness));
   var Fmin = POPULATION[POP_SIZE-1].Fitness;
   if (Fmin <= BRAIN.Fitness) {
       console.log("FOUND BETTER OR EQUAL");
       POPULATION[POP_SIZE-1] = JSON.parse(JSON.stringify(BRAIN));
   }
   var Fmax = 0
   var sum = 0.0
   var Fmean = 0.0

   for(var i=0;i<POP_SIZE;i++) {
     if (POPULATION[i].Fitness > Fmax ) {
         Fmax = POPULATION[i].Fitness
     }
     sum += POPULATION[i].Fitness;
     Fmean = sum/ POP_SIZE
   }
   make_table()
   console.log(ID_COUNTER,BRAIN.Fitness,Fmean,Fmax,Fmin)
   get_new_brain();
}

function mutate(){
    "use strict";
    //gate_type goes from 0-NUM_GATE_TYPES so on different scale.
    var s = BRAIN.NEURONS.length;
    var rnum;
    var snum;
    var num_mutations = Math.round(.2*NUM_NEURONS);
    for(var i=0;i<num_mutations;i++) {
        rnum = getRandomInt(0,NUM_NEURONS)
        snum = getRandomInt(0,NUM_GATE_TYPES)
        BRAIN.NEURONS[rnum][0] = snum

        rnum = getRandomInt(0,NUM_NEURONS)
        snum = getRandomInt(0,STATE_SIZE)
        BRAIN.NEURONS[rnum][1] = snum
        rnum = getRandomInt(0,NUM_NEURONS)
        snum = getRandomInt(0,STATE_SIZE)
        BRAIN.NEURONS[rnum][2] = snum

        //mutate output connections
        //don't want to write over input in IN_STATE
        rnum = getRandomInt(0,NUM_NEURONS)
        snum = getRandomInt(INPS_SIZE,STATE_SIZE)
        BRAIN.NEURONS[rnum][3] = snum
        rnum = getRandomInt(0,NUM_NEURONS)
        snum = getRandomInt(INPS_SIZE,STATE_SIZE)
        BRAIN.NEURONS[rnum][4] = snum
    }
    //mutate a gate type
}
