	const holes = document.querySelectorAll('.hole');
	const scoreBoard = document.querySelector('.score');
	const moles = document.querySelectorAll('.mole');
	const h1Text = document.querySelector('.h1Text');
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
	peep();
	setTimeout(function() {
		// stuff here
		timeUp = true;
		if(score > 5){
			throwConfetti();
		}
		
	}, 15000);
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
