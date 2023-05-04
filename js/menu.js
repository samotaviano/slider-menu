// The header wich has the arrows, and the arrows
const arrowsContainer = document.querySelector("header");
const arrowsContainerPadding = window.getComputedStyle(arrowsContainer).paddingLeft.slice(0,-2);
console.log(arrowsContainerPadding);
const leftArrow = document.querySelector(".nav-arrow:first-child");
const rightArrow = document.querySelector(".nav-arrow:last-child");


// The nav element
const nav = document.querySelector("nav");

// The ul that contains the menu items
const menuItems = document.querySelector("ul");
const menuItemsWidth = window.getComputedStyle(menuItems.querySelector("li")).width.slice(0,-2);


let menuItemsTotalWidth = menuItems.querySelectorAll("li").length * menuItemsWidth;
let menuItemsxPos = menuItems.getBoundingClientRect().left;
let navWidth = window.getComputedStyle(nav).width.slice(0,-2);

// Create variables to detect if the button is pressed,
// the distance to move horizontally
// and the direction to move
let onPress = false;
let distance = 0;
const step = 10;
let direction;
let timer;

function logFollowUp () {
  console.log(`
  ##################################

  Nav width: ${navWidth}
  Menu Total Width (menuItemsTotalWidth): ${menuItemsTotalWidth}
  Menu left (menuItemsxPos): ${menuItemsxPos}
  Moved: ${menuPos}
  Distance: ${distance}
  Menu right menuItems.style.right: ${menuItems.style.right}

  ##################################
  `);
}

setArrows();

function setArrows () {
  navWidth = window.getComputedStyle(nav).width.slice(0,-2);
  menuItemsxPos = menuItems.getBoundingClientRect().left;
  rigthLimit = calcRigthLimit(menuItemsxPos, navWidth, arrowsContainerPadding);
  console.log(rigthLimit);
  if (rigthLimit >= 1190) {
    rightArrow.style.display = "none";
    leftArrow.style.display = "block";
  } else if (menuItemsxPos === 40 && menuItemsTotalWidth > navWidth) {
    rightArrow.style.display = "block";
    leftArrow.style.display = "none";
  } else if (menuItemsxPos < 40 && menuItemsTotalWidth > navWidth) {
    rightArrow.style.display = "block";
    leftArrow.style.display = "block";
  }
}

// Calculate the rigth limit: sum of menu left, nav width and header padding
// 
function calcRigthLimit (menuLeft, navWidth, headerPadding) {
  return Math.abs(menuLeft) + Number(navWidth) + Number(headerPadding);
}


// Get the x position of the menu (the ul element)
let menuPos = window.getComputedStyle(menuItems).right.slice(0,-2);
logFollowUp();

// If the window is resized gets the width of the nav element
// which is the menu container
window.addEventListener('resize', function(event) {
  setArrows();
  logFollowUp();
}, true);

let counter= 0;


// Add mousedown event
arrowsContainer.addEventListener("mousedown",(evt) => {
  onPress = true;
  direction = evt.target.getAttribute("data-dir");
  
  if (!timer) {
    timer = setInterval(function() {
      move(direction);
      // counter += 1;
      setArrows();
      console.log(`Counter is: ${counter}`);
    }, 5);
  }

});

// Add mouseup event
arrowsContainer.addEventListener("mouseup", () => {
  onPress = false;
  clearInterval(timer);
  // release our intervalID from the variable
  timer = null;
  console.log(`Released and distance = ${distance}`);
});

// Function to activate the movement
function move (arrowDir) {
    
  if (onPress === true) {
    // && menuPos < 0
    if (arrowDir === "left" && menuItemsxPos <= 30 ) {
      // console.log(`Pressed the left arrow and distance = ${distance}`);
      
        distance = distance - step;
        menuItems.style.right = distance + "px";
        menuPos = window.getComputedStyle(menuItems).right.slice(0,-2);
        menuItemsxPos = menuItems.getBoundingClientRect().left;
        logFollowUp();
        // console.log(`Moved ${distance} to the ${arrowDir} and is positioned ${menuItems.style.right}`);
    } else if (arrowDir === "right" && calcRigthLimit(menuItemsxPos, navWidth, arrowsContainerPadding) < 1200) {
      // console.log(`Pressed the right arrow and distance = ${distance}`);
      console.log(calcRigthLimit(menuItemsxPos, navWidth, arrowsContainerPadding));
        distance = distance + step;
        menuItems.style.right = distance + "px";
        menuPos = window.getComputedStyle(menuItems).right.slice(0,-2);
        menuItemsxPos = menuItems.getBoundingClientRect().left;
        logFollowUp();
        // console.log(`Moved ${distance} to the ${arrowDir} and is positioned ${menuItems.style.right}`);
    }   

  }
}