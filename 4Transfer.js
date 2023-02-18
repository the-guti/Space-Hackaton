set timeFactor to 0.7.
set progradeBaseline to 800.
set progradeRange to 600.
set maxPeri to 20000.
set currentPeri to 0.

when true then {
    set timeToMnv to time:seconds + timeFactor * obt:period * RANDOM() .
    set progradeDV to progradeBaseline + RANDOM() * progradeRange.

    set timeToMnv to 879999.
    set progradeDV to 969.973236569191.
    

    set mnv to node(timeToMnv, 0, 0, progradeDV).
    add mnv.

    wait 0.1.
    // When maneuver has body transition and next body is Moon
    if mnv:orbit:hasNextPatch and mnv:orbit:nextPatch:body = Mun {
        // Optimizar peri
        set currentPeri to mnv:orbit:periapsis.

        screen("Found random trajectory to the Moon").
        
        // print("To Moon " + Mun:periapsis - mnv:orbit:apoapsis).
        print("timeToMnv " + timeToMnv).
        print("progradeDV " + progradeDV).
        print("We got into Moons orbit").
        print(currentPeri).

        if maxPeri < currentPeri {
            print("better" + currentPeri).
            MNV_EXEC_NODE(true).
        }  
        
        when not HASNODE then {
            DO_WARP(time:seconds + obt:nextPatchEta +1 ).
        }  
        
        // maneuver is non blocking, so we need to wait when it is done
        // we know when it is done when there is no maneuver node anymore

    }else{remove mnv. preserve.}
}

set timeFactorMoon to 0.01.
set progradeBaselineMoon to 10.
set progradeRangeMoon to 100.

when KUniverse:timewarp:issettled and ship:orbit:body:name = "Mun" then {
    
    screen("We are in a fly over the Moon now. Do something!", red).

    set timeToMnvMoon to time:seconds + timeFactorMoon * Mun:orbit:period * RANDOM().
    set progradeDVMoon to progradeBaselineMoon + RANDOM() * progradeRangeMoon.
    set timeToMnvMoon to 788864.110322889.
    set progradeDVMoon to 1.

    set mnvMoon to node(timeToMnvMoon, 0, 0, progradeDVMoon).
    print("timeToMnvMoon Moon" + timeToMnvMoon).
    print("prograde Moon" + progradeDVMoon).

    add mnvMoon.

    MNV_EXEC_NODE(true).

    // Change
    wait 5.
    // abortMission().
}