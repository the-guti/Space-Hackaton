
set maxspeed to 2.
set maxThrottle to 0.3.

set thr to 0.3.
lock WHEELTHROTTLE to thr.
lock WHEELSTEERING to poi. // go to the first POI ( Point of Interest )

brakes off. // That is important line! you have brakes and it is ON by default! 


// "on" instead of "when!" is important
// on - working only when expression is changed. it will not fire all the time
on (ship:groundspeed > maxspeed) {
    // not allow rover to go faster then 2 m/s 
    set thr to 0.
    screen("slow down", red).
    preserve.
}


on (ship:groundspeed < (maxspeed - 0.5)) {
    // let's keep the speed between 2 m/s 
    set thr to maxThrottle.
    screen("speed up", green).
    preserve.
}

set timeInFuture to time:seconds + 10.
WHEN time:seconds > timeInFuture THEN {
    screen("change our mind, going to poi2", yellow).
    set targets to list(poi, poi1, poi2, poi3). // just some notion of lists out there
    lock WHEELSTEERING to targets[1]. // chose to go to the POI1 instead of poi

    set timeInFuture to time:seconds + 5.
    WHEN time:seconds > timeInFuture THEN {
        screen("Let's speed up!", red).
        set maxspeed to 10.
        set maxThrottle to 1.
    }
    
}

// let's drow some important vectors

set topV to vecdraw(v(0,0,0), ship:facing:topvector:normalized*2, green, "Top", 1.0, true, 0.2).
// Facing is changing with the time so we need to update the vector
set topV:vecupdater to {
   return ship:facing:topvector:normalized*2. 
}.


set aheadPoint to vecdraw(v(0,0,0), ship:velocity:surface:normalized*maxspeed*2, blue, "2 seconds ahead", 1.0, true, 0.2).
// Facing is changing with the time so we need to update the vector
set aheadPoint:vecupdater to {
   return ship:velocity:surface:normalized*maxspeed*2. 
}.

on round(time:seconds){ // run each second
    set HeightAhead3meters to BODY:GEOPOSITIONOF(ship:velocity:surface:normalized*3):TERRAINHEIGHT.
    set HeightAhead9meters to BODY:GEOPOSITIONOF(ship:velocity:surface:normalized*9):TERRAINHEIGHT.
    set HeightAhead15meters to BODY:GEOPOSITIONOF(ship:velocity:surface:normalized*15):TERRAINHEIGHT.
    screen("Heiht difference near: " + round(HeightAhead9meters - HeightAhead3meters, 1) + " meters").
    screen("Heiht difference far: " + round(HeightAhead15meters - HeightAhead9meters, 1) + " meters").
    preserve.
}
