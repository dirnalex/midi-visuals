function connectMIDI(onKeyPressed) {
  if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
    navigator.requestMIDIAccess().then(onMIDISuccess.bind(null, onKeyPressed), onMIDIFailure);
  } else {
    console.log('WebMIDI is not supported in this browser.');
  }
}

function onMIDISuccess(onKeyPressed, midiAccess) {
  console.log(midiAccess);

  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage.bind(null, onKeyPressed);
  }
}

function getMIDIMessage(onKeyPressed, midiMessage) {
  onKeyPressed(...midiMessage.data);
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}

export default connectMIDI;