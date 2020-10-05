# password_generator
<!-- Password Generator READ ME

For this project i made the following changes:
-added inputs to the html document for a better UX, so the password generator could be controlled with a form and operate faster
-added logic to generate a new password
-added some CSS to make sure the new inputs were mobile responsive
-added a function that ensures there are no repeats (only works on passwords less than 10)

To generate a password i follow these steps
-i first need to determine the parameters that the password must conform to
-logic will check to make sure that the parameters meet the minimum requirements and i notify the user if that isn't the case
-if all parameters are met the password generator function is called
-function will start by assigning a random number for each character type selected, so that the total number of all character types is equal to the desired password length
-then i create arrays, of the calculated length, of random character for each character type
-i then loop through the random value arrays and randomly add them to a string which is the new password


 -->