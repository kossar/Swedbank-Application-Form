// ====== Function for navigation to Form
function navigateTo(a) {
    window.location.href = a + '.html';
}





// Modifyed w3schools script for displaying correct tab when moving on questions

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form 
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
    
  }
  if (n == (x.length - 1)) {
    submit = document.getElementById("nextBtn");
    submit.innerHTML = "Submit";
    submit.setAttribute('type', 'submit'); 
  } else {
    document.getElementById("nextBtn").innerHTML = "Forward";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;


  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("leasingForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName('select');
  w = x[currentTab].getElementsByTagName('textarea');
  
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].type && y[i].type !== 'checkbox' && y[i].id !== 'costOfTheVehicle' && y[i].id !== 'obligation_due' ) {
      if (y[i].value == '' && y[i].style.display !== 'none' ) {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    } else if (y[i].type && y[i].type === 'checkbox' && y[i].id !== 'costOfTheVehicle' && y[i].id !== 'obligation_due' ) {
       if (y[i].checked == false) {
         y[i].className += ' invalid';
         valid = false;
       }
    } else if (y[i].id == 'costOfTheVehicle' && y[i].id !== 'obligation_due' ) {
        if (y[i].value < 5000) {
          y[i].className += ' invalid';
          valid = false;
          document.getElementById('val-message').style.display = 'block';
        }
    } else if (y[i].id == 'obligation_due' && y[i].id !== 'costOfTheVehicle' ) {
        if (y[i].value < 2018) {
          y[i].className += ' invalid';
          valid = false;
          // Add error message for date
      }
    }
   }
    
  for (i = 0; i < z.length; i++) {
    // If a field is empty...
    if (z[i].value == '--select--' && z[i].style.display !== 'none' ) {
      // add an "invalid" class to the field:
      z[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  
  for(i = 0; i < w.length; i++) {
    if (w[i].value.length < 5) {
      w[i].className += ' invalid';
      valid = false;
    }
  } 
  
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("question")[currentTab].className += " passed";
  }
  return valid; // return the valid status
}



function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("question");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  
  // Remove passed class if going back
  //x[n].classList.remove('passed');
  if (x[n].classList.contains('passed')) {
    x[n].classList.remove('passed');
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// Radio buttons to display correct select box or input
function check() {
  var type = document.getElementsByName('vehicleType');
  var cars = document.getElementsByName('makeModel');
  var others = document.getElementsByName('customMake');
  var i;

  // Getting value of radio button
  for ( i = 0; i < type.length; i++) {
    if (type[i].checked) {
      var selection = type[i].value;
    }
  }

  // Changing display to none or to block according to checked radio button
  if (selection == 'Car') {
    for( i = 0; i < cars.length; i++) {
      cars[i].style.display = 'block';
    }
    for ( i = 0; i < others.length; i++) {
      others[i].style.display = 'none';
    }
  } else {
    for( i = 0; i < cars.length; i++) {
      cars[i].style.display = 'none';
    }
    for ( i = 0; i < others.length; i++) {
      others[i].style.display = 'block';
    }
  }
}

// Changing car models according to selected car

function changeModels() {
  var leasingCars = {};
  leasingCars['--select--'] = ['--select--'];
  leasingCars['BMW'] = ['--select--', 'X5', 'X6', '750'];
  leasingCars['Audi'] = ['--select--', 'A4', 'A6', 'A8'];
  leasingCars['Ford'] = ['--select--', 'Mondeo', 'Fiesta', 'Transit'];


    var carList = document.getElementById("make");
    var modelList = document.getElementById("model");
    var selectCar = carList.options[carList.selectedIndex].value;
    while (modelList.options.length) {
        modelList.remove(0);
    }
    var cars = leasingCars[selectCar];
    if (cars) {
        var i;
        for (i = 0; i < cars.length; i++) {
            var car = new Option(cars[i], i);
            modelList.options.add(car);
        }
    }
} 

// Check if entered price is number
/*
function isNumber(evt) {
  var char = String.fromCharCode(evt.which);
  var x = document.getElementById('priceNumber');
  var y = document.getElementById('costOfTheVehicle');
  if(!(/[0-9, . ]/.test(char))) {
    x.style.display = 'block';
    y.classList.add('invalid');
    evt.preventDefault();
  } else {
    x.style.display = 'none';
    y.classList.remove('invalid');
  }
}*/

// Clearing input after failed validation
var input = document.getElementsByClassName('form-data-input');

inputHandler = function(input){
  if (input.classList.contains('invalid')){
      input.classList.remove('invalid');
  }
}
for (i=0; i<input.length; i++){
  input[i].oninput = function(){
      inputHandler(this);
  }
}

// Calculating total income

function calculate() {
  var a = parseFloat(document.getElementById('netIncome').value);
  var b = parseFloat(document.getElementById('otherIncome').value);
  
  if (isNaN(b) && isNaN(a) == false) {
    result = a;
    document.getElementById('totalIncome').innerHTML = result;
    document.getElementById('incomeTotal').value = result;
  }
  else if (isNaN(a) && isNaN(b) == false) {
    result = a;
    document.getElementById('totalIncome').innerHTML = result;
    document.getElementById('incomeTotal').value = result;
  } else {
    result = a + b;
    document.getElementById('totalIncome').innerHTML = result;
    document.getElementById('incomeTotal').value = result;
  }
  
}


// script for getting submitted data to summary page, but there were some problems with it.cannot get letters like Ä Ö Ü from url..
/*
function getData() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
  return vars;
  
  }
  console.log(vars);
  var first = getData()["vehicleType"];
  var second = getData()["page"];
  document.getElementById('vehicleTypeLoaded').innerHTML = 'Car';    
    */

    /*
   function isCar() {
    car = document.getElementById('vehicleType-car');
    other = document.getElementById('vehicleType-other');
    if(vehicleType.value = 'Car') {
      document.getElementById('vehicleTypeLoaded').innerHTML = 'Car';
    } else {
      document.getElementById('vehicleTypeLoaded').innerHTML = 'Other';
    }
  } */
  /*
  function processData() {
    var parameters = location.search.substring(1).split("&");
  
    //Vehicletype
    var temp = parameters[0].split("=");
    type = unescape(temp[1]);
  
    // Car Make
    temp = parameters[1].split("=");
    carMake = unescape(temp[1]);
      
    //Other make
    temp = parameters[2].split("=");
    otherMake = unescape(temp[1]);

    // Car model
    temp = parameters[3].split("=");
    carModel = unescape(temp[1]);   
      
    // Other model
    temp = parameters[4].split("=");
    otherModel = unescape(temp[1]);

    // Cost of the vehicle
    temp = parameters[5].split("=");
    price = unescape(temp[1]);
    // Firstname
    temp = parameters[6].split("=");
    firstName = unescape(temp[1]);
    // Last name
    temp = parameters[7].split("=");
    lastName = unescape(temp[1]);
    //Address
    temp = parameters[8].split("=");
    address = unescape(temp[1]);
    //Obligation type
    temp = parameters[9].split("=");
    oblType = unescape(temp[1]);
    //Obligation owner
    temp = parameters[10].split("=");
    oblOwner = unescape(temp[1]);
    //Obligation due
    temp = parameters[11].split("=");
    oblDue = unescape(temp[1]);
    //Obligation size
    temp = parameters[12].split("=");
    oblSize = unescape(temp[1]);
    //Obligation monthly payment
    temp = parameters[13].split("=");
    oblMonthly = unescape(temp[1]);
    
    // Net income
    temp = parameters[16].split("=");
    incomeNet = unescape(temp[1]);
    // Other income
    temp = parameters[17].split("=");
    incomeOther = unescape(temp[1]);
    // Total income
    temp = parameters[18].split("=");
    incomeTotal = unescape(temp[1]);
    // Info
    temp = parameters[19].split("=");
    info = unescape(temp[1]);
    // Terms and conditions
    temp = parameters[20].split("=");
    accepted = unescape(temp[1]);

    document.getElementById("vehicleTypeLoaded").innerHTML = type;
    if(type == 'car'){
        console.log('car');
        document.getElementById("make").innerHTML = carMake;

      // .innerHTML didn't work with those if and else statements 
      if (carMake ==='BMW' && carModel == '1' ) {
          
          document.getElementById('model').appendChild(document.createTextNode('X5'));
      }
      else if (carMake === 'BMW' && carModel === '2' ) {
          document.getElementById('model').appendChild(document.createTextNode('X6'));;
      }
      else if (carMake === 'BMW' && carModel === '3' ) {
          document.getElementById('model').appendChild(document.createTextNode('750'));
      }
      else if (carMake == 'Audi' && carModel == '1' ) {
          document.getElementById('model').appendChild(document.createTextNode('A4'));
      }
      else if (carMake == 'Audi' && carModel == '2' ) {
          document.getElementById('model').appendChild(document.createTextNode('A6'));
      }
      else if (carMake == 'Audi' && carModel == '3' ) {
          document.getElementById('model').appendChild(document.createTextNode('A8'));
      }
      else if (carMake == 'Ford' && carModel == '1' ) {
          document.getElementById('model').appendChild(document.createTextNode('Mondeo'));
      }
      else if (carMake == 'Ford' && carModel == '2' ) {
          document.getElementById('model').appendChild(document.createTextNode('Fiesta'));
      }
      else if (carMake == 'Ford' && carModel == '3') {
          document.getElementById('model').appendChild(document.createTextNode('Transit'));
      }
     
    }
    else if (type == 'other') { 
        console.log('other');
      document.getElementById("make").innerHTML = otherMake;
      document.getElementById("model").innerHTML = otherModel;
    }
    
    document.getElementById('price').appendChild(document.createTextNode(price));
    document.getElementById('firstName').innerHTML = firstName;
    document.getElementById('lastName').innerHTML = lastName;
    document.getElementById('address').innerHTML = address;
    document.getElementById('oblType').innerHTML = oblType;
    document.getElementById('oblOwner').innerHTML = oblOwner;
    document.getElementById('oblDue').innerHTML = oblDue;
    document.getElementById('oblSize').innerHTML = oblSize;
    document.getElementById('oblMonthly').innerHTML = oblMonthly;
    document.getElementById('incomeNet').innerHTML = incomeNet;
    document.getElementById('incomeOth').innerHTML = incomeOther;
    document.getElementById('incomeTot').innerHTML = incomeTotal;
    document.getElementById('info').innerHTML = info;
    if(accepted == 'on') {
      document.getElementById('accept').innerHTML = 'Accepted';
    }
    
   
  } */