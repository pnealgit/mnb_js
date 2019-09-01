function updateGameArea() {
    "use strict";
    var s = "";
    var response;
    myGameArea.clear();
     myGameArea.frameNo += 1;
    draw_rover();
    draw_rectangle();
    s = get_sensor_data();
    response = think(s);
    set_positions(response);
}
