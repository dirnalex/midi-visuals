import connectMIDI from "./midi.js";
import Visual from "./visual.js";


const visual = new Visual("canvas1", window.innerWidth, window.innerHeight);
connectMIDI(onKeyPressed);

function onKeyPressed(status, data1, data2) {
  if (status>>4 === 9) {
    visual.hue = data1;
    console.log(data2);
    const freq = Math.pow(2, ((data1 - 69)/12)) * 440;
    visual.freq = freq / 440;
    //visual.amp = data2 / 127;
  } else {
    visual.undrawNote(data1 - 36);
  }
}