// Inside AnimationWorkletGlobalScope.
// console.log(self);
registerAnimator('twitter-header', class HeaderAnimator extends StatelessAnimator {
    constructor(options) {
        this.timing_ = new CubicBezier('ease-out');
    }

    animate(currentTime, effect) {
        const scroll = currentTime;  // scroll is in [0, 1000] range

        // Drive the output group effect by setting its children local times individually.
        effect.children[0].localTime = scroll;
        effect.children[1].localTime = this.timing_(clamp(scroll, 0, 500));
    }
});

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}