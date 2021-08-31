"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchTraits(people)
      
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person)
    break;
    case "family":
    // TODO: get person's family
    let foundFamMem = displayFamily(person,people)
    displayPeople(foundFamMem)


    foundFamMem = displayParents(person,people)
    displayPeople(foundFamMem)

    break;
    case "descendants":
    // TODO: get person's descendants
    foundFamMem = displayChildren(person,people)
    displayPeople(foundFamMem)
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "gender:" + person.gender + "\n"
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n"
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function displayFamily(person,people){
  
  let foundSpouse = people.filter(function(item){
    if(person.id === item.currentSpouse){
      return true;
    }
    
  })
  return foundSpouse;
  }

  function displayChildren(person,people){

    let foundChildren = people.filter(function(item){
      if(person.id === item.parents[0] || person.id === item.parents[1]){
        return true;
      }
    })
    return foundChildren;
  }

  function displayParents(person,people){
    let foundParents = people.filter(function(item){
      if(person.parents[0] === item.id || person.parents[1] === item.id){
        return true;
      }
    })
    return foundParents;
  }

  // 
  // !!!!!!!!!!!!!!!!!!!Below are all the Traits Functions!!!!!!!!!!!!!
  // 


function searchTraits(people){
    let searchResults = people;
    while (searchResults.length > 1){
    let searchChoice = promptFor('Choose a trait to search by.\nEnter corresponding number: \n1. Gender\n2. Weight\n3. Height\n4. Occupations\n5. Eye Color\n6. Date of Birth', chars);
      switch(searchChoice){
        case '1':
          searchResults = displayGender(searchResults) 
          displayPeople(searchResults)
          break;
          // switch(searchChoice){
          // //   case '1':
          //     let weightSearch = displayWeight(searchResults)
          //     displayPeople(weightSearch)
          //     break;
          // }
        case '2':
          searchResults = displayWeight(searchResults)
          displayPeople(searchResults)
          break;
        case '3':
          searchResults = displayHeight(searchResults)
          displayPeople(searchResults)
          break;
        case '4':
          searchResults = displayOccupation(searchResults)
          displayPeople(searchResults)
          break;
        case '5':
          searchResults = displayEyeColor(searchResults)
          displayPeople(searchResults)
          break;  
    
      }
    }
        // for(let i = 0; i < searchResults.length; i++);
        // while(searchResults.length < 1){
        return searchResults;


  }


  // ******* GENDER **********

  function displayGender(people){
    let genderPrompt = promptFor("What is the Gender you are searching for?", chars);
    let genderSearch = people.filter(function(person){
      if(person.gender === genderPrompt){
        return true;
      }else{
        return false;
      }
    })
      return genderSearch
    }



  // ******* WEIGHT **********

  function displayWeight(people){
    let weightPrompt = promptFor("What is the weight of the person you are searching for in pounds?", chars)
    let weightSearch = people.filter(function(person){
      if(person.weight == weightPrompt){
        return true;
      }else{
        return false;
      }
    })
    return weightSearch
  }

  // ******* Height **********

  function displayHeight(people){
    let heightPrompt = promptFor('What is the height of the person you are searching for?', chars);
    let heightSearch = people.filter(function(person){
      if(person.height == heightPrompt){
        return true;
      }else{
        return false;
      }
    })
      return heightSearch
    }

   // ******* Occupation ********** 

   function displayOccupation(people){
    let occuPrompt = promptFor("What is the occupation of the person you are searching for?", chars)
    let occuSearch = people.filter(function(person){
      if(person.occupation == occuPrompt){
        return true;
      }else{
        return false;
      }
    })
    return occuSearch
  }


  // ******* Eye Color **********

  function displayEyeColor(people){
    alert(people.map(function(person){
      return "Name: " + person.firstName + " " + person.lastName + " // " + "Eye Color: " + person.eyeColor;
    }).join("\n"));
  }

