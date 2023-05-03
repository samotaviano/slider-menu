// The header wich has the arrows, and the arrows
const arrowsContainer = document.querySelector("header");
const leftArrow = document.querySelector(".nav-arrow:first-child");
const rightArrow = document.querySelector(".nav-arrow:last-child");


// The nav element
const nav = document.querySelector("nav");

// The ul that contains the menu items
const menuItems = document.querySelector("ul");
const menuItemsWidth = window.getComputedStyle(menuItems.querySelector("li")).width.slice(0,-2);
console.log(menuItemsWidth);


let menuItemsTotalWidth = menuItems.querySelectorAll("li").length * menuItemsWidth;
let menuItemsxPos = menuItems.getBoundingClientRect().left;
let navWidth = window.getComputedStyle(nav).width;

// Create variables to detect if the button is pressed,
// the distance to move horizontally
// and the direction to move
let onPress = false;
let distance = 0;
const step = 2;
let direction;

function logFollowUp () {
  console.log(`
  ##################################

  Nav width: ${navWidth}
  Menu Total Width: ${menuItemsTotalWidth}
  Menu left: ${menuItemsxPos}
  Moved: ${menuPos}
  Distance: ${distance}
  Menu right: ${menuItems.style.right}

  ##################################
  `);
}

setArrows();

function setArrows () {
  navWidth = window.getComputedStyle(nav).width.slice(0,-2);
  menuItemsxPos = menuItems.getBoundingClientRect().left;
  console.log(menuItemsxPos === 40 && menuItemsTotalWidth > navWidth);
  if (menuItemsxPos === 40 && menuItemsTotalWidth > navWidth) {
    rightArrow.style.display = "block";
  }
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



// Add mousedown event
arrowsContainer.addEventListener("mousedown",(evt) => {
  onPress = true;
  direction = evt.target.getAttribute("data-dir");
  setInterval(function() {
    move(direction);
  }, 1);

});

// Add mouseup event
arrowsContainer.addEventListener("mouseup", () => {
  onPress = false;
  distance = 0;
  console.log(`Released and distance = ${distance}`);
});

// Function to activate the movement
function move (arrowDir) {
    
  if (onPress === true) {
    // && menuPos < 0
    if (arrowDir === "left") {
      console.log(`Pressed the left arrow and distance = ${distance}`);
        distance = distance - step;
        menuItems.style.right = distance + "px";
        menuPos = window.getComputedStyle(menuItems).right.slice(0,-2);
        menuItemsxPos = menuItems.getBoundingClientRect().left;
        logFollowUp();
        // console.log(`Moved ${distance} to the ${arrowDir} and is positioned ${menuItems.style.right}`);
    } else if (arrowDir === "right") {
      console.log(`Pressed the right arrow and distance = ${distance}`);
        distance = distance + step;
        menuItems.style.right = distance + "px";
        menuPos = window.getComputedStyle(menuItems).right.slice(0,-2);
        menuItemsxPos = menuItems.getBoundingClientRect().left;
        logFollowUp();
        // console.log(`Moved ${distance} to the ${arrowDir} and is positioned ${menuItems.style.right}`);
    }   

  }
}