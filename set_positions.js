function set_positions(duh) {
    "use strict";
    var wall_status = -99;
    do_fitness(duh)
    ROVER.Angle_index = get_sensor_angle_index(duh);
    move_rover();
    check_for_dead();

    if (ROVER.Dead == true) {
       signal_new_rover();
       make_rover();
    }
} //end of function set_position
