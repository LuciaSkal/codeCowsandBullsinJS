const oznam = document.querySelector('.oznam')
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

	  	if (bulls === 0 && cows === 0) {
        oznam.innerHTML = 'try again'
	  		console.log('try again')
      }	else if (bulls === 4) {
        oznam.innerHTML = `you won the game, after ${counter} guesses`
        console.log(`you won the game ${counter}`)
      } else {
        oznam.innerHTML = `${tip} : ${bulls} bulls and ${cows} cows , guesses ${counter}`
        console.log(`${tip} : ${bulls} bulls and ${cows} cows , guesses ${counter}, huray...`)
      }

    }
      
  }
  game = true
} 


