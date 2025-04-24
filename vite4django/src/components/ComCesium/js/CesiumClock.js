class CesiumClock {
    static playOrPause(clock) {
        clock.shouldAnimate = !clock.shouldAnimate;
    }

    static forward(clock) {
        clock.shouldAnimate = true;
        clock.multiplier = 1.0;
    }

    static backward(clock) {
        clock.shouldAnimate = true;
        clock.multiplier = -1.0;
    }
    static setSpeed(clock, speed) {
        clock.multiplier +=speed;
    }


    static change(clock, speed) {
        clock.multiplier += speed;
    }

    static play(clock) {
        clock.shouldAnimate = true;
    }

    static pause(clock) {
        clock.shouldAnimate = false;
    }

}export default CesiumClock;