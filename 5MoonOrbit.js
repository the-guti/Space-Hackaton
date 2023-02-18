
// Good Luck!
// Optimization = retrograde burn before at lower power

// print("Speed:"+ SHIP:GROUNDSPEED).
// print("Apoapsis:"+ SHIP:APOAPSIS).
// print("Periapsis:"+ SHIP:PERIAPSIS).
// print("Atiitude:"+ SHIP:ALTITUDE).

set hora to 1.
set tiempo to time:seconds + 1.
set powa to -10.

when true then {// Retrograde


    set mnv to node(tiempo, 0, 0, powa + RANDOM() * progradeRange).
    print("timeToMnvMoon Moon " + tiempo).
    print("prograde Moon " + powa).
    
    add mnv.    

    if ( mnv:orbit:periapsis > 10000 and mnv:orbit:periapsis < 20000 and  abs(mnv:orbit:periapsis - mnv:orbit:apoapsis) < 500 ){
        print("...SIII").

        MNV_EXEC_NODE(true).

        print("Orbit eccent: " + mnv:orbit:eccentricity).
        print("Delta: " + abs(mnv:orbit:periapsis - mnv:orbit:apoapsis)).

        when not HASNODE then {
                wait 5.
                abortMission().
        }

    }else{
        remove mnv.
        PRESERVE.
    }

}


