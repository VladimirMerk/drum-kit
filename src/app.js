'use strict';
// All samples are stored in a base64 json file
const SAMPLES = require('../dist/sounds.json');
// Convert string base64 values to ArrayBuffer
for (const key of Object.keys(SAMPLES)) {
  SAMPLES[key] = Buffer.from(SAMPLES[key], 'base64').buffer
}

window.addEventListener('load', init, false);
function init() {
  function playSound(e) {
    try {
      // Fix up for prefixing
      const byteArray = new Int8Array(SAMPLES[e.target.dataset.name].slice(0)).buffer;
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      const context = new AudioContext();
      context.decodeAudioData(byteArray, function(buffer) {
        const source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer;
        source.connect(context.destination); // connect the source to the context's destination (the speakers)
        source.start()
        source.onended = function(event) {
          console.log('onended')
        }
      }, function(err) { console.log("err(decodeAudioData): "+err); });
    }
    catch(e) {
      console.error(e)
      alert('Web Audio API is not supported in this browser');
    }
  }

  Array.from(document.querySelectorAll('.item-pad')).map((item) => {
    item.addEventListener("click", playSound, false);
  })
}
