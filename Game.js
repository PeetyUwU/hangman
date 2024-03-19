class Game {
	static words = [
		'přetěžováni',
		'povztekání',
		'prozpěvování',
		'pořizovateli',
		'přemazávání',
		'převazovanými',
		'perverznějšími',
		'prezentovanými',
		'příznakovější',
		'převzorkování',
		'keprový',
		'keynesiánců',
		'kejklavé',
		'kesonech',
		'keprovýma',
		'keser',
		'kesonovýma',
		'kelímkovým',
		'kempem',
		'ken',
		'nedokážeš',
		'neprivatizujme',
		'vymalovali',
		'linhartického',
		'ploutevním',
		'zakreslený',
		'čistokrevností',
		'kopolyesterovému',
		'účastnily',
		'nenasazovaly',
		'zelináře',
		'radostí',
		'obešly',
		'kyzovém',
		'skrývými',
		'zneprůzračnit',
		'předepsánými',
		'jihoameričanovo',
		'záškodníkova',
		'netřebickou',
		'příjmového',
		'roznožky',
		'obkladovým',
		'hospodyňskýma',
		'nerovnoramenném',
		'nevědecký',
		'zajistitelem',
		'nejuspořádanějším',
		'vidítou',
		'korpulentních',
		'osvobozují',
		'toaletnímu',
		'nezablokujte',
		'rozlišovány',
		'jamajce',
		'spínátkem',
		'litovaného',
		'vysypte',
		'rozměřovaném',
		'taxikářův',
		'křečkové',
		'odpálíte',
		'rovnodušný',
		'zbytečným',
		'rohlíčku',
		'paralytikovy',
		'peršanovou',
		'automatizujme',
		'práčem',
		'vyťukaných',
		'arzenálem',
		'zanikajícího',
		'otitulkovávat',
		'sebedefinice',
		'aktivem',
		'zreorganizovaném',
		'svízelný',
		'zahnulo',
		'lékarnický',
		'nezachráněni',
		'založily',
		'okořeňují',
		'přeplní',
		'rozostřili',
		'plnomocných',
		'podsouvaná',
		'dokládali',
		'ukřivdíme',
		'svačinkovýma',
		'nestřídé',
		'nešikových',
		'polévejte',
		'nominujte',
		'osívaném',
		'kalibrací',
		'nepoučen',
		'malečovskou',
		'dovřeli',
		'stylce',
		'okrašlovat',
	];
	static ceskaAbeceda = [
		'A',
		'Á',
		'B',
		'C',
		'Č',
		'D',
		'Ď',
		'E',
		'É',
		'Ě',
		'F',
		'G',
		'H',
		'CH',
		'I',
		'Í',
		'J',
		'K',
		'L',
		'M',
		'N',
		'Ň',
		'O',
		'Ó',
		'P',
		'Q',
		'R',
		'Ř',
		'S',
		'Š',
		'T',
		'Ť',
		'U',
		'Ú',
		'Ů',
		'V',
		'W',
		'X',
		'Y',
		'Ý',
		'Z',
		'Ž',
	];

	/**
	 *
	 * @param {object} opts
	 * @param {Element} opts.letterBtnsEl
	 * @param {Element} opts.wordEl
	 * @param {Element} opts.hpEl
	 * @param {number} [opts.hp]
	 * @param {number} [opts.hpDrain] - number of how many times you can guess wrong
	 */
	constructor(opts = {}) {
		if (!opts.hpEl || !opts.letterBtnsEl || !opts.wordEl)
			this.errorManager('Missing parameters');

		this.word = '';
		this.dashes = [];
		this.guesses = 0;
		this.wrongGuesses = 0;
		this.streak = 0;
		this.hp = opts.hp || 100;
		this.hpDrain = opts.hpDrain || 12;
		this.maxHp = opts.hp || 100;

		this.elements = {
			letterBtns: opts.letterBtnsEl,
			wordEl: opts.wordEl,
			hpEl: opts.hpEl,
		};
	}

	start() {
		//* clear btns and word
		this.elements.letterBtns.innerHTML = '';
		this.elements.wordEl.innerHTML = '';

		//* create btns
		this.displayBtns();

		//* get random word
		this.word = Game.words[Math.floor(Math.random() * Game.words.length)];
		for (let i = 0; i < this.word.length; i++) {
			this.dashes.push('_');
		}

		//* display hp
		this.displayHp();

		//* display word
		this.displayWord();
	}

	end(b) {
		this.clear();
	}

	/**
	 *
	 * @param {Event} ev
	 * @returns
	 */
	input(ev) {
		const letter = ev.currentTarget.innerHTML.toLowerCase();

		if (this.dashes.includes(letter)) return;

		const indexes = this.getLetterPositions(letter);

		if (indexes.length == 0) return this.manageHp(false);

		indexes.forEach((index) => {
			this.dashes[index] = letter;
		});

		if (!this.dashes.includes('_')) this.end();

		this.manageHp(true);

		this.displayWord();
	}

	/**
	 *
	 * @param {string} letter
	 * @returns {number[]}
	 */
	getLetterPositions(letter) {
		const positions = [];

		//* Loop through each letter in the word
		for (let i = 0; i < this.word.length; i++) {
			if (this.word[i] === letter) {
				//* If the current letter matches the specified letter, add its position to the array
				positions.push(i);
			}
		}

		return positions;
	}

	displayWord() {
		this.dashes.forEach((l) => {
			this.elements.wordEl.innerHTML += `<span>${l}</span>`;
		});
		this.elements.wordEl.innerHTML += '<br>';
	}

	displayBtns() {
		this.elements.letterBtns.innerHTML = '';
		Game.ceskaAbeceda.forEach((cA) => {
			const btn = document.createElement('button');
			btn.innerHTML = cA;
			btn.onclick = this.input.bind(this);
			this.elements.letterBtns.appendChild(btn);
		});
	}

	displayHp() {
		this.elements.hpEl.innerHTML = '';
		this.elements.hpEl.innerHTML = `${this.hp}/${this.maxHp}`;
	}

	manageHp(b) {
		if (b && this.streak > 0) {
			this.hp += Math.floor(
				(this.maxHp / this.hpDrain / 2) * this.streak
			);

			if (this.hp > this.maxHp) this.hp = this.maxHp;

			this.streak++;
		} else if (b) {
			this.streak++;
		} else {
			this.hp -= Math.floor(this.maxHp / this.hpDrain);
			this.streak = 0;
		}

		this.displayHp();

		if (this.hp <= 0) this.end();
		return;
	}

	clear() {
		Object.keys(this.elements).forEach((e) => {
			this.elements[e].innerHTML = '';
		});
		this.hp = this.maxHp;
		this.word = '';
		this.dashes = [];
		this.guesses = 0;
		this.wrongGuesses = 0;
		this.streak = 0;
	}

	/**
	 *
	 * @param {string} msg
	 * @param {Array[]} args
	 */
	errorManager(msg) {
		throw new Error(`${msg}`);
	}
}
