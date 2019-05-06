var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var vid = document.getElementById("video");
var is_mobile = navigator.userAgent.match(/Android/i);


speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;


var diagnostic = document.querySelector('.output');
//var audio = document.querySelector('.audio');
//var bg = document.querySelector('html');
var scrollDown = false;
var scrollUp = false;
var stop = true;
var scrollDownIndex = -1;
var scrollUpIndex = -1;
var stopIndex = -1;
var playIndex = -1;
var pauseIndex = -1;
var video_playing = false;

var scrolling;

//var diagnostic = document.querySelector('.output');


document.body.onload = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}



recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

if(video_playing) playVid();

  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;

  //diagnostic.textContent = 'Result received: ' + event.results[last][0].transcript + '  ' + color.includes('scroll down') + '  ' + color.includes('scroll up') + ' Confidence: ' + event.results[0][0].confidence + '.';
  
  while (color.indexOf('scroll down') !== -1) {
	  scrollDownIndex = color.indexOf('scroll down');
	  color = color.substring(scrollDownIndex + 1);
  }
  
  while (color.indexOf('scroll up') !== -1) {
	  scrollUpIndex = color.indexOf('scroll up');
	  color = color.substring(scrollUpIndex + 1);
  }
  
  while (color.indexOf('stop') !== -1 && (color.substring(color.indexOf('stop') + 5, color.indexOf('stop') + 12)).indexOf('playing') == -1) {
	  stopIndex = color.indexOf('stop');
	  color = color.substring(stopIndex + 1);
  }
  //diagnostic.textContent = 'Result received: ' + event.results[last][0].transcript + '  ' + playIndex + ' ' + pauseIndex + ' ' + stopIndex + ' ' + color.substring(color.indexOf('play') + 4, color.indexOf('play') + 7) + ' ' + color.includes('stop') + '  ' + color.includes('stop playing') + ' Confidence: ' + event.results[0][0].confidence + '.';
  while (color.indexOf('play') !== -1 && (color.substring(color.indexOf('play') + 4, color.indexOf('play') + 10)).indexOf('ing') == -1) {
	  playIndex = color.indexOf('play');
	  color = color.substring(playIndex + 1);
  }
  while (color.indexOf('stop playing') !== -1) {
	  pauseIndex = color.indexOf('stop playing');
	  color = color.substring(pauseIndex + 1);
  }
  
  
  
  
  
  if(scrollDownIndex > scrollUpIndex && scrollDownIndex > stopIndex) {
	  scrollDown = true;
	  scrollUp = false;
	  stop = false;
	  clearInterval(scrolling);
	  scrolling = setInterval(scrollDownFunc, 100);
  }
  if(scrollUpIndex > scrollDownIndex && scrollUpIndex > stopIndex) {
	  clearInterval(scrolling);
	  scrolling = setInterval(scrollUpFunc, 100);
	  scrollUp = true;
	  scrollDown = false;
	  stop = false;
  }
  if(stopIndex > scrollDownIndex && stopIndex > scrollUpIndex) {
	  stop = true;
	  
	  
	  clearInterval(scrolling);
	  //scrolling = setInterval(stopFunc, 100);
	  scrollDown = false;
	  scrollUp = false;
  }
  if(playIndex > pauseIndex) {
	  if(!is_mobile) playVid();
  }
  if(pauseIndex > playIndex) {
	  if(!is_mobile) pauseVid();
  }
  
  if (event.results[last].isFinal) {
    scrollDownIndex = -1;
	scrollUpIndex = -1;
	stopIndex = -1;
	playIndex = -1;
	pauseIndex = -1;
   }

  
  
  bg.style.backgroundColor = color;
  
  console.log('Confidence: ' + event.results[0][0].confidence);
  


  recognition.start();

  //if(video_playing) playVid();
  //else pauseVid();
	
  //audio.textContent = 'speach started';
}


recognition.onsoundend = function() {
  recognition.start();
  //audio.textContent = 'speach started';
}

recognition.onspeechend = function() {
	recognition.start();
	//recognition.stop();
	//audio.textContent = 'speach ended';
	
}

recognition.onend = function(event) {
  recognition.start();
}


/*

recodnition.onstart = function(event) {
  diagnostic.textContent = "on start";
  if(video_playing) playVid();
  else pauseVid();
}



recognition.onend = function() {
	  diagnostic.textContent = "on end";
  if(video_playing) playVid();
  else pauseVid();
    recognition.start();
  if(video_playing) playVid();
  else pauseVid();
};
*/


recognition.onnomatch = function(event) {
  recognition.start();
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  recognition.start();
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

window.onscroll = function(ev) {
	if(scrollDown && !stop) {
		if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
			clearInterval(scrolling);
			scrollDown = false;
			stop = true;
		}
	}
	if(scrollUp && !stop) {
		var body = document.body; //IE 'quirks'
		var document = document.documentElement; //IE with doctype
		document = (document.clientHeight) ? document : body;

		if (document.scrollTop == 0) {
			scrollUp = false;
			stop = true;
			clearInterval(scrolling);
		} 
	}  
};


function stopFunc() {

	  recognition.start();
}

function scrollDownFunc() {
	window.scrollBy({
	top: 20,
	behavior: 'smooth'
	});
	  
}

function scrollUpFunc() {
	window.scrollBy({
	top: -20,
	behavior: 'smooth'
	});
	  
}


function playVid() { 
  vid.play(); 
} 

function pauseVid() { 
  vid.pause(); 
} 