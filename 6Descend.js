


// Retrograde 

// Let's find some objects
set directionToMun to vecdraw(v(0,3,0), Mun:position:normalized*15, blue, "Mun", 1.0, true, 0.2).
// Facing is changing with the time so we need to update the vector
set directionToMun:vecupdater to {
   return mun:position:normalized*15. 
}.

set directionToSun to vecdraw(v(0,3,0), Sun:position:normalized*15, green, "Sun", 1.0, true, 0.2).
// Facing is changing with the time so we need to update the vector
set directionToSun:vecupdater to {
   return Sun:position:normalized*15. 
}.

set powa to -30.

when true then {// Retrograde

    set mnv to node(0, 0, 0, powa).
    
    add mnv.    

    if ( true ){
        // if ( mnv:orbit:periapsis > 10000 and mnv:orbit:periapsis < 20000 and  abs(mnv:orbit:periapsis - mnv:orbit:apoapsis) < 500 ){
        print("...SIII").

        MNV_EXEC_NODE(true).

        wait 100.


        when not HASNODE then {
                wait 5.
                abortMission().
        }

    }else{
        remove mnv.
        PRESERVE.
    }

}




set timeInFuture to time:seconds + 1000. 
WHEN time:seconds > timeInFuture THEN {
    abortMission().
}

// You get it from here
// Good luck
