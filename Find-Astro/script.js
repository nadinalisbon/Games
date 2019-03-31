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
		  console.log('Ah nah thats the same one bud');
		  return randomHole(holes);
		}
		lastHole = hole;
		return hole;
	}

	function peep() {
		const time = randomTime(200, 1000);
		const hole = randomHole(holes);
		hole.classList.add('up');
		sounds["sound.js-master/sounds/bounce.mp3"].play();
		setTimeout(() => {
		hole.classList.remove('up')
			if (!timeUp) {
			  peep()
			} else {
			  //Add Switch
			  if(score > 5){
				h1Text.textContent = 'Congratulation!!! Score: '
			  }
			  if(score == 0){
				h1Text.textContent = 'Try Again Score: '
			  }
			  
			}
		}, time)
	}

	function startGame() {
		scoreBoard.textContent = 0;
		h1Text.textContent = 'Find Astro! ';
		timeUp = false;
		score = 0;
		h3Timer.textContent = '00:15';
		timer();
		peep();
		
		
		setTimeout(function() {
			// stuff here
			timeUp = true;
			if(score > 5){
				throwConfetti();
			}
		}, 15000);
	}
	
	function timer(){
		var sec = 15;
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
	score++;
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

	moles.forEach(mole => mole.addEventListener('click', bonk));
