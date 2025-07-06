export interface AudioRefs {
    moveAudio: HTMLAudioElement | null;
    winAudio: HTMLAudioElement | null;
    drawAudio: HTMLAudioElement | null;
}

export const createAudioRefs = (): AudioRefs => ({
    moveAudio: null,
    winAudio: null,
    drawAudio: null
});

export const initializeAudio = (refs: AudioRefs): AudioRefs => {
    if (!refs.moveAudio) refs.moveAudio = new window.Audio('/move.wav');
    if (!refs.winAudio) refs.winAudio = new window.Audio('/win.wav');
    if (!refs.drawAudio) refs.drawAudio = new window.Audio('/draw.wav');
    return refs;
};

export const playMoveSound = (refs: AudioRefs): void => {
    if (refs.moveAudio && localStorage.getItem('soundMuted') !== 'true') {
        refs.moveAudio.currentTime = 0;
        refs.moveAudio.play().catch(() => {});
    }
};

export const playWinSound = (refs: AudioRefs): void => {
    if (refs.winAudio && localStorage.getItem('soundMuted') !== 'true') {
        refs.winAudio.currentTime = 0;
        refs.winAudio.play().catch(() => {});
    }
};

export const playDrawSound = (refs: AudioRefs): void => {
    if (refs.drawAudio && localStorage.getItem('soundMuted') !== 'true') {
        refs.drawAudio.currentTime = 0;
        refs.drawAudio.play().catch(() => {});
    }
};
