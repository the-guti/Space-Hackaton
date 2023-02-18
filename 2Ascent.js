
// optimize fuel consumption time, apagar motores antes

DO_STAGE(). // release the rocket from launch pad
set start_time to time:seconds.
LOCK STEERING TO up.

LOCK THROTTLE TO 1. // full throttle. LAUNCH
screen("LAUNCH!! Steering to UP!").

speedup(3). // if not movve 3

// First verctor is pointing to ship UP 
set upVec to vecdraw(v(0,5,0), ship:up:vector*15, yellow, "UP", 1.0, true, 0.2).
// Second is shouwing where we want to be headed
set pitch45vector to vecdraw(v(0,5,0), heading(90, 45):vector*10, green, "45 pitch", 1.0, true, 0.2).

// Third is where we actually headed
set shipDirVector to vecdraw(v(0,5,0), ship:facing:vector*25, blue, "facing", 1.0, true, 0.2).
// Facing is changing with the time so we need to update the vector
set shipDirVector:vecupdater to {
   return ship:facing:vector*25. 
}.

set timeInFuture to time:seconds + 25. // defining the time for maneuver
set timeToStop to time:seconds + 45. // defining the time for maneuver


LOCK STEERING TO heading(90 , 90).

// lock tilt to round(10 + 200*sin(2*(time:seconds - start_time))). 

ON round(KUniverse:REALTIME) {
    // LOCK STEERING TO heading(90, tilt).
    // screen("Steering to WEST with " + tilt +" degree over horizon!", yellow).
    screen("Apoapsis:"+ SHIP:APOAPSIS, green).
    preserve.
}


// WHEN (time:seconds > timeInFuture and time:seconds < timeToStop) THEN {
//     LOCK STEERING TO heading(90, 45).
//     // LOCK STEERING TO heading(-90, 10 + 250*sin(2*(time:seconds - start_time))).
// }

WHEN SHIP:ALTITUDE>400 THEN {
    LOCK STEERING TO heading(90 , 85).
}

WHEN SHIP:ALTITUDE>1000 THEN {
    LOCK STEERING TO heading(90 , 75).
}

WHEN SHIP:ALTITUDE>2000 THEN {
    LOCK STEERING TO heading(90 , 55).
}


WHEN SHIP:ALTITUDE>10000 THEN {
    LOCK STEERING TO heading(90 , 45).
}


// WHEN (time:seconds > timeInFuture and time:seconds < timeToStop) THEN {
// //     LOCK STEERING TO heading(90, 45).
 

// WHEN SHIP:ALTITUDE > 70000 THEN{   
//     LOCK THROTTLE TO 0.
//     wait 0.2.
//     D0_STAGE().
// }
// you can lock both stering and throttle to the equations
// value of the equation will be re evaluated on every simulation tick
// -90 degrees off north is west, pitch is set just for fun.
//you need to fix this...

// throttle value will be trimmed between 0 <= throttle <= 1.
// So if it set to 10, it will be trimmed to 1.
// LOCK THROTTLE TO (1100 - SHIP:GROUNDSPEED).


// WHEN (SHIP:ALTITUDE>30000 )THEN {
//     LOCK THROTTLE TO 0.
//     wait 0.1.
//     // do booster separation
//     DO_STAGE().
// }

WHEN SHIP:GROUNDSPEED>1000 THEN {
    LOCK THROTTLE TO 0.
    wait 0.1.
    // do booster separation
    DO_STAGE().
    LOCK THROTTLE TO 1.
}
