



DO_STAGE(). // Zero stage is unlock the rocket from the launching pad and not it is ready for ignition
LOCK STEERING // autopilot will try to keep rocket poited up and not spinning  TO up.by using engine gimble
LOCK THROTTLE TO 1. // full throttle. LAUNCH
screen("LAUNCH!! Steering to UP!"). // Print info on the HUD display (it will disappear in 5 seconds)
// You want to pass the densest part of the athmosphere as fast as possible with the best aerodinamic profile.
speedup(4). // Speed up simulation x2 times, just to save some time

set timeInFuture to time:seconds + 30. // defining the time for maneuver
WHEN time:seconds > timeInFuture THEN {
    screen("Steering to EAST with 45 degree over horizon!", yellow). // log on the game HUD
    LOCK STEERING TO heading(90, 45). // First number - degrees from north, so it is east, second number is pitch or inclination from the horizon
    // check https://ksp-kos.github.io/KOS/math/direction.html?highlight=heading#HEADING for the details
}


// Let's drow some vectors to understand where we need to be
// For more examples read https://ksp-kos.github.io/KOS/structures/misc/vecdraw.html?highlight=draw

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

// Another type of triggers is "ON" ( meaning OnChange ) 
// next trigger will fire every 3th realtime second
// !! Please note the absence of "then" statement
ON round(KUniverse:REALTIME/3) {
  screen("Alt: " + round(altitude) + " m", green).
  print "Angle btw facing and 45pitch: " + round(vang(ship:facing:vector, heading(90, 45):vector)).
  preserve. // keep the trigger activated
}


// that will set up the conditional trigger. It will be checked on every tick and it will be executed when the condition is satisfied.
// after execution trigger will be deactivated ( unless "PRESERVE." is used to keep it going... )

// WHEN SHIP:ALTITUDE>50000 THEN {
//     screen("Going to dive", red).
//     LOCK STEERING TO heading(90,-80).
// }


WHEN (SHIP:DYNAMICPRESSURE>0.5) THEN {
    set THROTTLE TO 0.8.
}
// last trigger will be activated on aerodynamic pressure to reach some value
// ideally you don't want to experience the maxQ ( about 0.32 for a normal ascent ) 
// you should trhrottle down before maxQ and never let it to reach values more then ~0.29. 
// But you don't want to start early, so don't start slowing down before ~0.27 
WHEN (SHIP:DYNAMICPRESSURE>0.15) THEN {
    PRINT "Huston, the aerodynamic pressure is "+round(SHIP:DYNAMICPRESSURE,2)+" at the moment".
}

