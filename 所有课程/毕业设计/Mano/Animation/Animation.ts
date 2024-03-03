class Animation {
    public currentTime: number;
    public finished: boolean;
    public id: number;
    public pending: boolean;
    public playbackRate: number;
    public playState: "idle" | "running" | "paused" | "finished";
    public ready: boolean;
    public startTime: number;
    public timeline: AnimationTimeline;

    public play(): void {
    }

    public cancel(): void {
    }

    public finish(): void {
    }

    public reverse(): void {
    }

    public updatePlaybackRate(playbackRate: number): void {
    }

    public commitStyles(): void {
    }
}

export {Animation}