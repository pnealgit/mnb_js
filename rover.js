var straight_count = 0;
var angle_count_for_fitness = 4;

function make_rover() {
    "use strict";
    ROVER.Xpos = WIDTH/2 + getRandomInt(-20,20);
    ROVER.Ypos = HEIGHT/5 + getRandomInt(-5,5);
    ROVER.Velocity = 1;
    ROVER.Angle_index = getRandomInt(0,3);
    ROVER.Sensor_angle = getRandomInt(0,NUM_ANGLES);
    ROVER.Time_to_live = Time_to_live;
    ROVER.Dead = false;
    ROVER.FITNESS = 0.0;
    ROVER.Sensor_length = 100;
}

function draw_rover()
{   
    "use strict";
    var ctx = myGameArea.context
    ctx.beginPath();
    ctx.arc(ROVER.Xpos, ROVER.Ypos, RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
} //end fo draw rover

function do_fitness(choice) {
   "use strict";

   if (choice == 1) {
       straight_count++;
   }

   if ( straight_count >= angle_count_for_fitness ) {
       ROVER.FITNESS = ROVER.FITNESS + 1;
       straight_count--;
   }
   if (choice != 1) {
       straight_count = 0;
   }

}
function signal_new_rover() {
    "use strict";
    var FITNESS;
    FITNESS = Math.round(ROVER.FITNESS)
    update_population(FITNESS);
}

function check_for_dead() {
    "use strict";
    ROVER.Time_to_live--;
    if (ROVER.Time_to_live <= 0) {
        console.log("DEAD TTL",TRY,ROVER.FITNESS);
        ROVER.Dead = true;
    }

    var wall_status = check_borders(ROVER.Xpos,ROVER.Ypos,1);
    if (wall_status > 0) {
       console.log("DEAD WALL",TRY,ROVER.FITNESS);
       ROVER.Dead = true;
    }
}

function move_rover() {
     "use strict";
     var wall = -99;
     //var dx = ROVER.Velocity * ANGLES_DX[ROVER.Angle_index];
     //var dy = ROVER.Velocity * ANGLES_DY[ROVER.Angle_index];
     ROVER.Xpos += (ROVER.Velocity * ANGLES_DX[ROVER.Angle_index]);
     ROVER.Ypos += (ROVER.Velocity * ANGLES_DY[ROVER.Angle_index]);
     wall = check_borders(ROVER.Xpos,ROVER.Ypos,1);
     if (wall > 0 ) {
        ROVER.Dead = true;
     }
}

