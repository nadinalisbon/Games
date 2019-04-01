	const holes = document.querySelectorAll('.hole');
	const scoreBoard = document.querySelector('.score');
	const moles = document.querySelectorAll('.mole');
	const h1Text = document.querySelector('.h1Text');
	const h3Timer = document.querySelector('.h3Timer');
	let lastHole;
	let timeUp = false;
	let score = 0;

	function randomTime(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function randomHole(holes) {
		const idx = Math.floor(Math.random() * holes.length);
		const hole = holes[idx];
		if (hole === lastHole) {
		  return randomHole(holes);
		}
		lastHole = hole;
		return hole;
	}

	function peep() {
		const time = randomTime(200, 1000);
		const hole = randomHole(holes);
		hole.classList.add('up');
		jumpSound(); 
		setTimeout(() => {
		hole.classList.remove('up')
			if (!timeUp) {
			  peep();
			} else {
			  //Add conditional
			  if(score == 0){
				h1Text.textContent = 'Try Again Score: ';
			  }
			  if(score > 0 && score <= 10){
				h1Text.textContent = 'Nice Job! Score: ';
			  }
			  if(score > 10){
				h1Text.textContent = 'Congratulation!!! Score: ';
			  }
			}
		}, time)
	}

	function startGame() {
		scoreBoard.textContent = 0;
		h1Text.textContent = 'Find Astro! ';
		timeUp = false;
		score = 0;
		h3Timer.textContent = '00:25';
		timer();
		peep();
		
		setTimeout(function() {
			// stuff here
			timeUp = true;
			if(score == 0){
				sounds["sound.js-master/sounds/explosion.wav"].play();
			}
				
			if(score > 10){
				confettiSound();
				throwConfetti();
			}
		}, 25000);
	}
	
	function timer(){
		var sec = 25;
		var timer = setInterval(function(){
			sec--;
			if (sec >= 10) {
			  h3Timer.textContent= '00:'+sec;
			}
			if (sec <= 9) {
			  h3Timer.textContent = '00:0'+sec;
			}
			if (sec < 0) {
			  h3Timer.textContent = '00:00';
			  clearInterval(timer);
			}
		}, 1000);
	}

	function bonk(e) {
	if(!e.isTrusted) return; // cheater!
	score = score + 2;
	this.parentNode.classList.remove('up');
	scoreBoard.textContent = score;
	}
	function throwConfetti() {
		maxParticleCount = Math.random() * 250 + 53;
		startConfetti();
		setInterval(function() {
			stopConfetti();
		}, 15000);
	}
	
	//The jump sound
	function jumpSound() {
		  soundEffect(
			523.25,       //frequency
			0.05,         //attack
			0.2,          //decay
			"sine",       //waveform
			3,            //volume
			0.8,          //pan
			0,            //wait before playing
			600,          //pitch bend amount
			true,         //reverse
			100,          //random pitch range
			0,            //dissonance
			undefined,    //echo: [delay, feedback, filter]
			undefined     //reverb: [duration, decay, reverse?]
		);
	}
	//The bonus points sound
	function confettiSound() {
	  //D
	  soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
	  //A
	  soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
	  //High D
	  soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
	}

	moles.forEach(mole => mole.addEventListener('click', bonk));
