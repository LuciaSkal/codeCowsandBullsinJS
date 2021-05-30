
gsap.from(".krava", {duration: 2, opacity: 0, scale: 0.5, ease: "back"});

function randomUnique(set, delka) {
  if (delka > set.length) {
      throw new Error("Cannot generate that many unique characters.");
  }
  const arr = [...set];
  for (let i = 0; i < delka; i++) {
      const r = i + Math.floor(Math.random() * (set.length - i));
      [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr.slice(0, delka);
}



function parse(set, delka, input) {
  if (input.length !== delka) {
      return 'length';
  }
  const split = input.split("");
  for (let i = 0; i < split.length; i++) {
      const c = split[i];
      if (!set.includes(c)) {
          return 'not-in-set';
      }
      if (split.lastIndexOf(c) > i) {
          return 'repeating';
      }
  }
  return split;
}

function check(rnd, tip) {
  const result = {
      bulls: 0,
      cows: 0,
      calf: 0
  };
  for (let i = 0; i < rnd.length; i++) {
      if (rnd[i] === tip[i]) {
          result.bulls++;
      } else if (rnd.includes(tip[i])) {
          result.cows++;
      } else {
          result.calf++;
      }
  }
  return result
}

function reportError(error) {
  switch (error) {
      case 'length':
          alert("This number is too long or short to be valid!");
          break;
      case 'not-in-set':
          alert("The guess contains an illegal character!");
          break;
      case 'repeating':
          alert("The guess contains a repeating digit!");
          break;
      default:
          alert(`Error: ${error}`);
  }
}

function game(wrapper, set, delka) {
  const oznam = wrapper.querySelector('.oznam');
  const oznamVyhra = wrapper.querySelector('.oznam-vyhra');
  const tip = wrapper.querySelector('.tip')
  const button = wrapper.querySelector('button')

  let rnd = randomUnique(set, delka);
  let history = [];
  
  console.log(rnd)

  button.addEventListener('click', () => {
      const input = tip.value;
      const parsed = parse(set, delka, input)
      if (typeof parsed === 'string') {
          reportError(parsed);
          return;
      }
      history.push(parsed);

      const {bulls, cows} = check(rnd, parsed);
      if (bulls === delka) {
          oznamVyhra.innerHTML = `you won the game, after ${history.length} guesses`
      } else {
          oznam.innerHTML += `${input} : ${bulls} bulls | ${cows} cows | guesses: ${history.length} <br>`
      }
  });
}

game(document, "0123456789".split(""), 4);

/*const oznam = document.querySelector('.oznam')
let game = true
let counter = 0

document.querySelector('button').addEventListener('click', () => {
  const tip = document.querySelector('.tip').value
  console.log(tip)
  check()
})



const randomUnique = (delka) => {
  var arr = [];
  while (arr.length < delka) {
    var randomnumber = Math.floor(Math.random() * 10);
    var found = false;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === randomnumber) {
        found = true;
        break;
      }
    }
    if (!found) arr[arr.length] = randomnumber;
  }
  return arr
}

const rnd = randomUnique(4)
console.log(rnd)


const verifyEntry = (number) => {
	number = number.toString()
	verify = true
	for (var i=0; i < number.length; i++ ) {
		if (number.lastIndexOf(number.charAt(i)) != i) {
			verify = false
			break
		}
	}
	return verify
}

const check = () => {
	const tip = document.querySelector('.tip').value
  var myArr = String(tip).split("").map((tip)=>{
    return Number(tip)
  })

  const secretNumber = rnd
  
  if (myArr.length !== 4) {
    alert("This number is too long or short to be valid.")
  } else if (verifyEntry(tip) === false) {
    alert("This game doesn't have any repeating digits.");
  } else {
    if (game) {

	  let bulls=0;
	  let cows=0;
    
    

	  for (let n = 0; n < myArr.length; n++) {
	  	for (let i=0; i < secretNumber.length; i++){
	  	  if ((myArr[n] === secretNumber[i]) && n===i) {
        bulls++;
        } else if ((myArr[n] === secretNumber[i]) && (n!==i)) {
            cows++;
      }

	  	}

	  }
	  
    counter++

	  	
       if (bulls === 4) {
        oznam.innerHTML = `you won the game, after ${counter} guesses`
        console.log(`you won the game ${counter}`)
      } else {
        oznam.innerHTML += ` ${tip} : ${bulls} bulls | ${cows} cows | guesses:${counter} <br>`
        console.log(`${tip} : ${bulls} bulls and ${cows} cows , guesses ${counter}, huray...`)
      }
    }
    
      
  }
  game = true
} */


