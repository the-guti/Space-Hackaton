
on round(time:seconds/10) {
    screen("Distance from radar (inaccurate): " + round(alt:radar), white).
    screen("Distance from laser scanner: " + round(laserSensorValue()), yellow).
    preserve.
}

set thr to 0.
lock steering to ship:up.
lock throttle to thr.
wait 1.
speedup(3).

when laserSensorValue() < 1500 and laserSensorValue() > 0 then{
    speedup(0).
    screen("Dont forget landing gear!!!", white).
    gear on. rcs on. 
    set thr to 1.
    lock steering to srfRetrograde.
}
