var WIDTH = 320
var HEIGHT = 240
var sensors = []
var RADIUS = 5;
var ROVER = {};
var ANGLES_DX = [1,1,0,-1,-1,-1,0,1];
var ANGLES_DY = [0,1,1,1,0,-1,-1,-1];
var NUM_ANGLES = 8;
var NUM_SENSORS = 3 
var Time_to_live = 1000;
var TRY = 0;

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min )) + min; //not inclusive never max 
}
function getRandomFloat(min,max) {
    return 0.0 + (Math.random() * (max - min )) + min;
}

function make_table() {
    results = "";
    for(i=0;i<POP_SIZE;i++) {
        results = results + "<tr><td>" + POPULATION[i].Fitness + "</td></tr>";
    }
    document.getElementById('fitness_table').innerHTML = results;
}

function startGame() {
        SENSOR_DATA = [0,0,0]
        make_rectangle()
        make_population();
        make_rover()
        make_table();
        myGameArea.start();
}

myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);
        },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
} 
