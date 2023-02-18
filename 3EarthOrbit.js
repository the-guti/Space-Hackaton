


// optimize fuel consumption , cambiar baseline dependiendo las mejoras, 
// minimizar distancia de apo y de peria ya es la mejor
// Optimizar tiempo de quema 
set max to 0.
set min to 10000.

set timeBaseline to 90.
set timeRange to 10.
// ETA APOAPSIS

set progradeBaseline to 950.
set progradeRange to 50.

// set trigger cycle that allows other parralel code to run
when true then {
    // set progradeDV to RANDOM() * progradeRange + progradeBaseline. // random amount of thrust for maneuver
    // set mnvTimeAdd to timeBaseline + timeRange * RANDOM(). // random amount of time for maneuver

    set mnvTimeAdd to 96.527712720692.
    set progradeDV to 980.780507894596.

    set mnv to node(time:seconds + mnvTimeAdd, 0, 0, progradeDV). // create maneuver node
    add mnv. // Add node to the simulator

    // print parameters on the hud
    // screen( "Maneuver in " + round(mnvTimeAdd) + "s with DeltaV: " + round(progradeDV), green).

    // if ( mnv:orbit:apoapsis > 80000 and abs(mnv:orbit:periapsis - mnv:orbit:apoapsis) < 8000 ){
    //     print("We have this progradeDV " + progradeDV).
    //     print("We have this mnvTimeAdd" + mnvTimeAdd).
    //     print("Dif " + abs(mnv:orbit:periapsis - mnv:orbit:apoapsis)).
    // }


    if ( mnv:orbit:apoapsis > 80000 and abs(mnv:orbit:periapsis - mnv:orbit:apoapsis) < 3000 ){
    // if ( min(mnv:orbit:periapsis, mnv:orbit:apoapsis) > 70000 and max(mnv:orbit:periapsis, mnv:orbit:apoapsis) < 450000 ){
        wait 2.
        // if we randomly got the maneuver node that will put us to the orbit - launch it
        // screen("Found something!", red).
        // print("We have this progradeDV " + progradeDV).
        // print("We have this mnvTimeAdd" + mnvTimeAdd).
        // print("Dif" + abs(mnv:orbit:periapsis - mnv:orbit:apoapsis)).
        
        MNV_EXEC_NODE(true).
        // !! Do not preserve the trigger, we do not need it anymore.
        when not HASNODE then {
            wait 5.
            abortMission().
        }
    }else{
        remove mnv. // If node is not good - remove it
        PRESERVE. // preserve the trigger so that it will be checked on a next tick.
    }
}
