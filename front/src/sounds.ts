import { Howl } from 'howler';

export const quackSound = new Howl({ src: ['/sounds/quack.mp3'], loop: true });
export const shotSound = new Howl({ src: ['/sounds/awp.mp3'], loop: false });
