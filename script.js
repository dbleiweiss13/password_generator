// Assignment Code
var generateBtn = document.querySelector("#generate");
// array of possible values to pick from
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var numbers = ['1','2','3','4','5','6','7','8','9','0']
var charcters = ['!','/"','#','$','%','&',"/'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',"/'",']','^','_','{','|','}','~']

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Function to generate password 
function generatePassword() {
  
  //get password length
  var lenthPicked = false;

  while(lenthPicked == false) {
    var length = passwordLength();

    if (length >= 8 && length <= 128) {
      lenthPicked = true;
      console.log(length);
    }
    else {
      alert("you must select a number between 8 and 128");
    }
  }

  //get Character to include
  // character types to choose from
  var characterTypes = ["special characters","uppercase","lowercase","numeric"];
  var selectedChars = [];
  var charsPicked = false;

  // loop through each character type available
  while(charsPicked == false) {
    for(let i = 0; i < characterTypes.length; i++) {
      selectedChars = selectChar(characterTypes[i],selectedChars);
    }

    if (selectedChars.length > 0) {
      charsPicked = true;
    } 
    else {
      alert("you must select atleast one character to include");
    }
  }

  // determine how many of each character should be included
  var numberOfEachChars = [];
  var percentageRemaining = 100 ;
  var checkLen = length

  //select random number of elements to pick for each character selected
  for (let i = 0; i < selectedChars.length - 1; i++) {
    var ranNum = Math.floor(Math.random() * checkLen)
    if (ranNum == 0) {
      ranNum = 1;
    }
    numberOfEachChars.push(ranNum) 
    checkLen -= numberOfEachChars[i]
  }

  if (checkLen == 0 ) {
    var n = numberOfEachChars.indexOf(Math.max(numberOfEachChars))

    numberOfEachChars[n] = numberOfEachChars[n] - 1;
    checkLen = 1
  }
  numberOfEachChars.push(checkLen)

  console.log(numberOfEachChars)

  //picked characters
  var specialCharVals = [];
  var uppercaseVals = []
  var lowercaseVals = []
  var numericVals = [];
  
  //add the appropriate number of each character selected
  var selectedIndex = 0;

  if(selectedChars.indexOf("lowercase") != -1) {
    lowercaseVals = returnRandomVals(numberOfEachChars[selectedIndex],letters)
    selectedIndex++;
  }

  if(selectedChars.indexOf("numeric") != -1) {
    numericVals = returnRandomVals(numberOfEachChars[selectedIndex],numbers)
    selectedIndex++;
  }
  
  if(selectedChars.indexOf("uppercase") != -1) {
    uppercaseVals = returnRandomVals(numberOfEachChars[selectedIndex],letters)
    for(let i = 0; i < uppercaseVals.length; i++) {
      uppercaseVals[i] = uppercaseVals[i].toUpperCase()
    }
    selectedIndex++;
  }
  
  if(selectedChars.indexOf("special characters") != -1) {
    specialCharVals = returnRandomVals(numberOfEachChars[selectedIndex],charcters)
    selectedIndex++;
  }

  console.log(lowercaseVals)
  console.log(numericVals)
  console.log(uppercaseVals)
  console.log(specialCharVals)
  
  //Build Password
  var passwordString = "";
  var charPicked;

  for (let i = 0; i < length; i++) {
    charPicked = false;

    while (charPicked == false) {
      var chooseChar = selectedChars[Math.floor(Math.random() * selectedChars.length)]

      console.log(chooseChar)

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
      else if (chooseChar == "special characters") {
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


//Get Password length
function passwordLength() {
  return(prompt("How long should the password be? pick a number between 8-128"));
}

//Get special character choices
function selectChar(char,selectedChars) {
  var toInclude = confirm("should the password include " + char);

  if(toInclude) {
    selectedChars.push(char);
  }
  return(selectedChars);
}

// function to get random characters from each array
function returnRandomVals(loopNum,array) {
  var returnArray = [];
  for (let i = 0; i < loopNum; i++) {
    returnArray.push(array[Math.floor(Math.random() * array.length)])
  }

  return(returnArray);
}


