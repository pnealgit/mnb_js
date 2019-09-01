var POP_SIZE = 10 ;
var INPS_SIZE = 3;
var NUM_NEURONS = 16;
var STATE_SIZE = 40;
BRAIN = {};
POPULATION = [];
var ID_COUNTER = 0;
MUTATION_RATE = .2; 
MUTATION_RATE = .1; 
function make_neuron(){
    "use strict"; 
    //only 5 things really needed assuming 2 inputs, 2 outputs and a gate type
    //nope - throw out gate_type
    var neuron = [0,0,0,0,0]
    //inputs
    neuron[0] = getRandomInt(0,STATE_SIZE);
    neuron[1] = getRandomInt(0,STATE_SIZE);
    //outputs
    neuron[2] = getRandomInt(INPS_SIZE,STATE_SIZE);
    neuron[3] = getRandomInt(INPS_SIZE,STATE_SIZE);
    var tt = make_truth_table();
    neuron[4] = tt;
    return neuron 

}
function make_truth_table() {
    "use strict";
    var tt = [];
    var row = [];
    for(var i = 0;i<2;i++) {
       row = [];
       for(var j=0;j<2;j++) {
           row[j] = getRandomInt(0,2);
       }
       tt.push(row);
    }
    return tt;
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
    console.log("NEW POPULATION");
    console.log(POPULATION);
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
   cross_over();
   mutate();
}

function cross_over(){
    "use strict";
    //crossover - only do once
    var b1_index = getRandomInt(1,5);
    var cb = JSON.parse(JSON.stringify(POPULATION[b1_index]));
    var n_step = getRandomInt(0,NUM_NEURONS);
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
    var s = BRAIN.NEURONS.length;
    var rnum;
    var snum;
    var num_mutations = Math.round(MUTATION_RATE*NUM_NEURONS);
    for(var i=0;i<num_mutations;i++) {
        rnum = getRandomInt(0,NUM_NEURONS)
        //inputs
        snum = getRandomInt(0,STATE_SIZE)
        BRAIN.NEURONS[rnum][0] = snum
        snum = getRandomInt(0,STATE_SIZE)
        BRAIN.NEURONS[rnum][1] = snum
        //outputs
        snum = getRandomInt(INPS_SIZE,STATE_SIZE)
        BRAIN.NEURONS[rnum][2] = snum
        snum = getRandomInt(INPS_SIZE,STATE_SIZE)
        BRAIN.NEURONS[rnum][3] = snum

        //no tt mutations yet
    }
}
