
function move_rover() {
     "use strict";
     var wall = -99;
     var dx = ROVER.Velocity * ANGLES_DX[ROVER.Angle_index];
     var dy = ROVER.Velocity * ANGLES_DY[Rover.Angle_index];
     ROVER.Xpos += dx;
     ROVER.Ypos += dy;
     wall = check_borders(ROVER.Xpos,ROVER.Ypos,1);
     if (wall > 0 ) {
        ROVER.Dead = true;
     }
}

