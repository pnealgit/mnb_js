var SENSOR_DATA = [];
var angle_index = -99;
var SENSOR_ANGLES = [0,0,0];

function get_sensor_data() {
    "use strict";
    SENSOR_DATA = [];
    var Xpos = 0;
    var Ypos = 0;
    var deltax = 0.0;
    var deltay = 0.0;
    var Wall = -9;
    var fdx = 0;
    var fdy = 0;
    var dist = 0.0;
    var yes_no = [];

    for( var isensor=0;isensor<NUM_SENSORS;isensor++) {
        Wall = -9;
        Xpos = ROVER.Xpos
        Ypos = ROVER.Ypos
        yes_no = 0;
        //angle_index is between 0,7
        angle_index = get_sensor_angle_index(isensor);

        SENSOR_ANGLES[isensor] = angle_index;
        deltax = ANGLES_DX[angle_index];
        deltay = ANGLES_DY[angle_index];

        for(var step=0;step<ROVER.Sensor_length;step++) {
            Xpos += deltax;
            Ypos += deltay;
            Wall = check_borders(Xpos,Ypos,1)
            if (Wall > 0 ){
               yes_no = 1;
               break
            }
            fdx = Xpos - ROVER.Xpos;
            fdy = Ypos - ROVER.Ypos;
            dist = Math.hypot(fdx,fdy);
            if(dist >= ROVER.Sensor_length) {
               break;
            }
        } //end of loop on step
     
        //var dist_code = get_dist_code(dist,isensor);
        //SENSOR_DATA = SENSOR_DATA + dist_code;
        SENSOR_DATA.push(yes_no);

        draw_sensor(Xpos,Ypos);
     } //end of loop on sensor
     return SENSOR_DATA;
} //end of function

function check_borders(xp , yp, rad ) {
    "use strict";
    if ((yp - rad) < 2) {
       return 1;
    }
    if((yp+rad) > HEIGHT -2) {
       return 2;
    }
    if((xp-rad) < 2) {
       return 3;
    }
    if((xp+rad) > WIDTH -2 ) {
       return 4;
    }

    //do all rectangles
    //ulx ,uly is upper left x,y
    //lrx ,lry is lower rightt x,y
    var lrx,lry
    var r = {}

    for (var i=0;i<rectangles.length;i++) {
        r = rectangles[i]
        lrx = r.ulx + r.rw
        lry = r.uly + r.rh
        if ((r.ulx <= xp && xp <= lrx  ) && (r.uly <= yp && yp  <= lry) ){
            return 99
        }
    }
    return 0;
}
function get_sensor_angle_index(i) {
    "use strict";

    var ai = 99;
    if (i == 0) {
      ai = ROVER.Angle_index + 1
    }
    if (i == 1) {
      ai = ROVER.Angle_index
    }
    if (i == 2) {
      ai = ROVER.Angle_index - 1
    }

    if (ai > NUM_ANGLES-1) {
       ai = ai % NUM_ANGLES
    }

    if (ai < 0) {
       ai = NUM_ANGLES - 1
    }
    return ai
}

function get_dist_code(dist,isensor) {
    "use strict";
     var a_dist = 0.0;
     var dist_code = "";
     a_dist = 1.0 - (dist/ROVER.Sensor_length);
     if (a_dist >= 5.0/7.0)  {
        if(isensor == 1) {
          dist_code = "00";
        } else {
          dist_code = "000";
        }

     }
     if (a_dist >= 4.0/7.0 && a_dist < 5.0/7.0 ) {
        if(isensor == 1) {
          dist_code = "01";
        } else {
          dist_code = "011";
        }
     }
     if (a_dist >= 2.0/7.0 && a_dist < 4.0/7.0 ) {
        if(isensor == 1) {
          dist_code = "10";
        } else {
          dist_code = "111";
        }
     }


     if (a_dist < 2.0/7.0) {
        if(isensor == 1) {
          dist_code = "11";
        } else {
          dist_code = "111";
        }
     }

    return dist_code;
}
function draw_sensor(x,y) {
    "use strict";
        var ctx = myGameArea.context
        ctx.beginPath()
        ctx.strokeStyle = '#000000';
        ctx.moveTo(ROVER.Xpos,ROVER.Ypos);
        ctx.lineTo(x,y)
        ctx.stroke();
        ctx.closePath();
}

