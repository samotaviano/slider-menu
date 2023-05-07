// Variables to store the header (container) and the arrows
const arrowsContainer = document.querySelector("header");
const leftArrow = document.querySelector(".nav-arrow:first-child");
const rightArrow = document.querySelector(".nav-arrow:last-child");


// The ul that contains the menu items is called menuContainer
const menuContainer = document.querySelector("ul");
let menuContainerWidth = window.getComputedStyle(menuContainer).width.slice(0,-2);

// Measurements to control the menu functionality

// Header left padding (the left limit for the menu)
const arrowsContainerPadding = window.getComputedStyle(arrowsContainer).paddingLeft.slice(0,-2);

// Total width of menu items (all the li)
const singleMenuItem = menuContainer.querySelector("li");
const menuItemWidth = window.getComputedStyle(singleMenuItem).width.slice(0,-2);
let menuItemsTotalWidth = menuContainer.querySelectorAll("li").length * menuItemWidth;

// The first and the last menu items
const firstMenuItem = menuContainer.querySelector("li:first-child");
let firstMenuItemXPos = firstMenuItem.getBoundingClientRect().left;

const lastMenuItem = menuContainer.querySelector("li:last-child");
let lastMenuItemXPos = lastMenuItem.getBoundingClientRect().left;

function checkSizesPos() {
  menuContainerWidth = window.getComputedStyle(menuContainer).width.slice(0,-2);
  firstMenuItemXPos = firstMenuItem.getBoundingClientRect().left;
  lastMenuItemXPos = lastMenuItem.getBoundingClientRect().left;
  setArrows();
}


// Variabes to trigger or to stop the menu functionality
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
  Largura ul [menuContainerWidth]: ${menuContainerWidth}
  Largura de cada item de menu [menuItemWidth]: ${menuItemWidth}
  Largura total de todos os items de menu [menuItemsTotalWidth]: ${menuItemsTotalWidth}
  1º item de menu posição X (left) [firstMenuItemXPos]: ${firstMenuItemXPos}
  Último item de menu posição X (left) [lastMenuItemXPos]: ${lastMenuItemXPos}
  ##################################
  `);
}


// Function to display or hidde the arros
// According to certain conditions
setArrows();

function setArrows () {
  // navWidth = window.getComputedStyle(nav).width.slice(0,-2);
  menuContainerWidth = window.getComputedStyle(menuContainer).width.slice(0,-2);
  if (menuItemsTotalWidth < menuContainerWidth) {
    rightArrow.style.display = "none";
    leftArrow.style.display = "none";
  } else {
    rightArrow.style.display = "block";
    leftArrow.style.display = "block";
  }
  // menuItemsxPos = menuItems.getBoundingClientRect().left;
  // rigthLimit = calcRigthLimit(menuItemsxPos, navWidth, arrowsContainerPadding);
  // console.log(rigthLimit);
  // if (rigthLimit >= 1190) {
  //   rightArrow.style.display = "none";
  //   leftArrow.style.display = "block";
  // } else if (menuItemsxPos === 40 && menuItemsTotalWidth > navWidth) {
  //   rightArrow.style.display = "block";
  //   leftArrow.style.display = "none";
  // } else if (menuItemsxPos < 40 && menuItemsTotalWidth > navWidth) {
  //   rightArrow.style.display = "block";
  //   leftArrow.style.display = "block";
  // }
}

// Calculate the rigth limit: sum of menu left, nav width and header padding
// 
function calcRigthLimit (menuLeft, liGroupWidth, headerPadding) {
  return Math.abs(menuLeft) + Number(liGroupWidth) + Number(headerPadding);
}


// Get the x position of the menu (the ul element)
let liGroupRight = window.getComputedStyle(menuContainer).right.slice(0,-2);
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
  
  if (!timer) {
    timer = setInterval(function() {
      moveDirection(direction);
      checkSizesPos()
      setArrows();
    }, 1);
  }

});

// Add mouseup event
arrowsContainer.addEventListener("mouseup", () => {
  onPress = false;
  clearInterval(timer);
  // Sets back the timer variable to null
  timer = null;
});

// Function detect moving direction and activate the movement
function moveDirection (arrowDir) {
    
  if (onPress === true) {
    // Condition:  && menuItemsxPos <= 30  
    if (arrowDir === "left" && firstMenuItemXPos < 40) {
        
        let dir = distance = distance - step;
        move (dir);
        checkSizesPos()

      // Condition:   && calcRigthLimit(liGroupxPos, navWidth, arrowsContainerPadding) < 1200  
    } else if (arrowDir === "right" && lastMenuItemXPos > menuContainerWidth - 100) {
        
        let dir = distance = distance + step;
        move (dir);
        checkSizesPos()

    }   

  }
}

function move (direction) {
  menuContainer.style.right = direction + "px";
  // liGroupRight = window.getComputedStyle(menuContainer).right.slice(0,-2);
  // liGroupxPos = menuContainer.getBoundingClientRect().left;
  logFollowUp();
}