console.clear();

// instigate our audio context ~~~~~~~~~~~~~~~ 1
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// fetch the audio file and decode the data
async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}
// create a buffer, plop in data, connect and play -> modify graph here if required
function playSourceNode(audioContext, audioBuffer) {
  const soundSource = audioContext.createBufferSource();
  soundSource.buffer = audioBuffer;
  soundSource.connect(audioContext.destination);
  soundSource.start();
	return soundSource;
}

async function setupSample() {
	const filePath = '../../../Fur Elise.mp3';
	// Here we're `await`ing the async/promise that is `getFile`.
	// To be able to use this keyword we need to be within an `async` function
	sample = await getFile(audioCtx, filePath);
	return sample;
}

// change this to change the filter - can be 0-3 and will reference the values in the array below
const filterNumber = 2;

let lowPassCoefs = [
	{
		frequency: 200,
		feedforward: [0.00020298, 0.0004059599, 0.00020298],
		feedback: [1.0126964558, -1.9991880801, 0.9873035442]
	},
	{
		frequency: 500,
		feedforward: [0.0012681742, 0.0025363483, 0.0012681742],
		feedback: [1.0317185917, -1.9949273033, 0.9682814083]
	},
	{
		frequency: 1000,
		feedforward: [0.0050662636, 0.0101325272, 0.0050662636],
		feedback: [1.0632762845, -1.9797349456, 0.9367237155]
	},
	{
		frequency: 5000,
		feedforward: [0.1215955842, 0.2431911684, 0.1215955842],
		feedback: [1.2912769759, -1.5136176632, 0.7087230241]
	}
]

let feedForward = lowPassCoefs[filterNumber].feedforward,
	feedBack = lowPassCoefs[filterNumber].feedback;

// create a canvas element and append it to our dom
const canvasContainer = document.querySelector('.filter-graph');
const canvasEl = document.createElement('canvas');
canvasContainer.appendChild(canvasEl);
// set 2d context and set dimesions
const canvasCtx = canvasEl.getContext('2d');
const width = canvasContainer.offsetWidth;
const height = canvasContainer.offsetHeight;
canvasEl.width = width;
canvasEl.height = height;

// set fill and create axis
canvasCtx.fillStyle = 'white';
canvasCtx.fillRect(0, 0, width, height);

const spacing = width/16;
const fontSize = Math.floor(spacing/1.5);
canvasCtx.lineWidth = 2;
canvasCtx.strokeStyle = 'grey';

// draw our axis
canvasCtx.beginPath();
canvasCtx.moveTo(spacing, spacing);
canvasCtx.lineTo(spacing, height-spacing);
canvasCtx.lineTo(width-spacing, height-spacing);
canvasCtx.stroke();
// axis is gain by frequency
canvasCtx.font = fontSize+'px sans-serif';
canvasCtx.fillStyle = 'grey';
canvasCtx.fillText('1', spacing-fontSize, spacing+fontSize);
canvasCtx.fillText('g', spacing-fontSize, (height-spacing+fontSize)/2);
canvasCtx.fillText('0', spacing-fontSize, height-spacing+fontSize);
canvasCtx.fillText('Hz', width/2, height-spacing+fontSize);
canvasCtx.fillText('20k', width-spacing, height-spacing+fontSize);

// dom elements needed
const loadingSection = document.querySelector('.loading');
const playButton = document.querySelector('.button-play');
const filterButton = document.querySelector('.button-filter');

// arrays for our frequency response
const totalArrayItems = 30;
// Here we want to create an array of frequency values that we would like to get data about. We could go for a linear approach, but it's far better when working with frequencies to take a log approach, so let's fill our array with frequencies that get larger as array item goes up.
let myFrequencyArray = new Float32Array(totalArrayItems);
myFrequencyArray = myFrequencyArray.map(function(item, index) {
    return Math.pow(1.4, index);
});
// We need to create arrays that return the data, these need to be the same size as the origianl frequency array
let magResponseOutput = new Float32Array(totalArrayItems);
let phaseResponseOutput = new Float32Array(totalArrayItems);

// let the magic happen! When the file has loaded...
setupSample()
	.then((sample) => {
	
	// remove loading screen
	loadingSection.style.display = 'none';
	
	// create out iir filter
	const iirfilter = audioCtx.createIIRFilter(feedForward, feedBack);
	
	let srcNode;
	// play/pause our track
	playButton.addEventListener('click', function() {
		if (this.dataset.playing === 'false') {
			
			// check if context is in suspended state (autoplay policy)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
			
			srcNode = playSourceNode(audioCtx, sample);
			this.setAttribute('data-playing', 'true');
			this.setAttribute('aria-pressed', 'true');
			this.innerText = 'Pause';
			filterButton.removeAttribute('disabled');
		} else {
			srcNode.stop();
			this.setAttribute('data-playing', 'false');
			this.setAttribute('aria-pressed', 'false');
			this.innerText = 'Play';
			filterButton.disabled = 'true';
		}

	}, false);
	
	// on turn on filter connect iir
	filterButton.addEventListener('click', function() {
		if (this.dataset.filteron === 'false') {
			srcNode.disconnect(audioCtx.destination);
			srcNode.connect(iirfilter).connect(audioCtx.destination);
			this.setAttribute('data-filteron', 'true');
			this.setAttribute('aria-pressed', 'true');
		} else {
			srcNode.disconnect(iirfilter);
			srcNode.connect(audioCtx.destination);
			this.setAttribute('data-filteron', 'false');
			this.setAttribute('aria-pressed', 'false');
		}
		
	}, false);
	
	// get our frequency response
	iirfilter.getFrequencyResponse(myFrequencyArray, magResponseOutput, phaseResponseOutput);
	
	// draw our graph
	canvasCtx.beginPath();
  for(let i = 0; i < magResponseOutput.length; i++) {
		
		if (i === 0) {
			canvasCtx.moveTo(spacing, height-(magResponseOutput[i]*(height-(spacing*2)))-spacing );
		} else {
			canvasCtx.lineTo((width/totalArrayItems)*i, height-(magResponseOutput[i]*(height-(spacing*2)))-spacing );
		}
		
  }
  canvasCtx.stroke();

});