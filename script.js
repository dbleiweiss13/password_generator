// Assignment Code
var generateBtn = document.querySelector("#generate");
// array of possible values to pick from
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var numbers = ['1','2','3','4','5','6','7','8','9','0']
var charcters = ['!','\"','#','$','%','&',"\'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',"\'",']','^','_','{','|','}','~']

var lengthInput = document.querySelector("#length");
var lowerInput = document.querySelector("#lower");
var upperInput = document.querySelector("#upper");
var numberInput = document.querySelector("#number");
var specialInput = document.querySelector("#special");
var duplicateInput = document.querySelector("#duplicates")


var lenErrorString = document.querySelector("#errorMessageLen")
var charErrorString = document.querySelector("#errorMessageChar")
var dupErrorString = document.querySelector("#errorMessageDup")


// Write password to the #password input
function writePassword() {
  //get character types selected by user
  var charArray = charInputsSelected();

  //make sure all conditions are met before generating password
  if (lengthInputTest() && charArray.length > 0 && duplicateCheck()) {

    // removes printed error messages
    lenErrorString.textContent = ''
    charErrorString.textContent = ''

    var password = generatePassword(charArray);
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Function to generate password 
function generatePassword(charArray) {
  
  //get password length
  var length = lengthInput.value.trim();

  //get character types selected by user
  var selectedChars = charArray;

  // determine how many of each character should be included
  var numberOfEachChars = [];
  var percentageRemaining = length ;

  //select random number of elements to pick for each character selected
  for (let i = 0; i < selectedChars.length - 1; i++) {
    var ranNum = Math.floor(Math.random() * (percentageRemaining * 0.8))
    if (ranNum == 0) {
      ranNum = 1;
    }
    numberOfEachChars.push(ranNum) 
    percentageRemaining -= numberOfEachChars[i]
  }

  //if the total number of characters that have been assigned is equal to the password length, remove 1 from he largest num and add to the last
  if (percentageRemaining == 0 && selectedChars.length > 1) {
    var n = numberOfEachChars.indexOf(Math.max(numberOfEachChars))
    numberOfEachChars[n] = numberOfEachChars[n] - 1;
    percentageRemaining = 1
  }
  numberOfEachChars.push(percentageRemaining)

  //picked characters
  var specialCharVals = [];
  var uppercaseVals = []
  var lowercaseVals = []
  var numericVals = [];
  
  //add the appropriate number of each character selected
  var selectedIndex = 0;
  var noDuplicates = duplicateInput.checked;

  console.log(noDuplicates)

  if(selectedChars.indexOf("lowercase") != -1) {
    lowercaseVals = returnRandomVals(numberOfEachChars[selectedIndex],letters,noDuplicates)
    selectedIndex++;
  }

  if(selectedChars.indexOf("numeric") != -1) {
    numericVals = returnRandomVals(numberOfEachChars[selectedIndex],numbers,noDuplicates)
    selectedIndex++;
  }
  
  if(selectedChars.indexOf("uppercase") != -1) {
    uppercaseVals = returnRandomVals(numberOfEachChars[selectedIndex],letters,noDuplicates)
    for(let i = 0; i < uppercaseVals.length; i++) {
      uppercaseVals[i] = uppercaseVals[i].toUpperCase()
    }
    selectedIndex++;
  }
  
  if(selectedChars.indexOf("specialChar") != -1) {
    specialCharVals = returnRandomVals(numberOfEachChars[selectedIndex],charcters,noDuplicates)
    selectedIndex++;
  }
  
  //Build Password by ranomizing the order of the random character types selected
  var passwordString = "";
  var charPicked;

  for (let i = 0; i < length; i++) {
    charPicked = false;

    while (charPicked == false) {
      var chooseChar = selectedChars[Math.floor(Math.random() * selectedChars.length)]

      if (chooseChar == "lowercase") {
        if (lowercaseVals.length > 0) {
          passwordString = passwordString + lowercaseVals[0];
          lowercaseVals.shift();
          charPicked = true
        }
      }
      else if (chooseChar == "numeric") {
        if (numericVals.length > 0) {
          passwordString = passwordString + numericVals[0];
          numericVals.shift();
          charPicked = true
        }
      }
      else if (chooseChar == "uppercase") {
        if (uppercaseVals.length > 0) {
          passwordString = passwordString + uppercaseVals[0];
          uppercaseVals.shift();
          charPicked = true
        }
      }
      else if (chooseChar == "specialChar") {
        if (specialCharVals.length > 0) {
          passwordString = passwordString + specialCharVals[0];
          specialCharVals.shift();
          charPicked = true
        }
      }
    }
  }
  return(passwordString)
}

//check password length
function lengthInputTest() {
  var num = lengthInput.value.trim()
  if(num >= 8 && num <= 128) {
    return(true)
  }
  else {
    // print error message to p tag on screen
    lenErrorString.textContent = 'you must select a number between 8 and 128'
    return(false)
  }
} 

//get the characters selected
function charInputsSelected() {
  var charArray = []
  if (numberInput.checked == true) {
    charArray.push("numeric")
  }
  if (lowerInput.checked == true) {
    charArray.push("lowercase") 
  }
  if (upperInput.checked == true) {
    charArray.push("uppercase")
  }
  if (specialInput.checked == true) {
    charArray.push("specialChar")
  }

  // make sure that the appropriate conditions are met
  if (charArray.length == 0) {
    // print error message to p tag on screen
    charErrorString.textContent = 'you must select atleast one character type to include'
  }

  return(charArray)
}

// if requested length is too long, password must contain duplicates
function duplicateCheck() {
  if(duplicateInput.checked) {
    if (lengthInput.value.trim() <= 10) {
      return(true)
    }
    else {
      dupErrorString.textContent = "You can only remove duplicates for a password of 10 or fewer characters"
      return(false)
    }
  }
  else {
    return(true)
  }
}


// function to get random characters from each array
function returnRandomVals(loopNum,array,removeDuplicates) {
  var checkArray = [...array]
  var returnArray = [];
  for (let i = 0; i < loopNum; i++) {
    returnArray.push(checkArray[Math.floor(Math.random() * checkArray.length)])

    //remove duplicates if selected
    if (removeDuplicates) {
      var index = checkArray.indexOf(returnArray[i])
      checkArray.splice(index,1)
      console.log(checkArray)
    }
  }

  return(returnArray);
}