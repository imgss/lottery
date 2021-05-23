import color from 'color';
export default function draw(c, names = []) {
  //SETUP
  var ctx = c.getContext("2d");

  //making the canvas full screen
  c.height = window.innerHeight;
  c.width = window.innerWidth;

  const backgroundColor = "rgba(0, 0, 0, 0.15)";
  // 控制绘制时间间隔
  const defaultSpeed = 60;
  const space = 0.3;
  const font_size = 12;
  var columns = c.width / font_size; //number of columns for the rain
  //an array of drops - one per column
  var drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)

  /*
         Switches betweeen different letter sets
     */
  var LangManager = {
    langPointer: 0,
    // Potential to add support for more character sets
    langArr: names,
    changeLang: function () {
      this.langPointer++;
    },
    getLetters: function () {
      if (this.langArr.length) {
        return this.langArr.map(str => {
          const letters = str.split("");
          return letters.length > 3 ? [...letters.slice(0, 3), '...'] : letters;
        });
      }
    },
  };

  //------------------------------------ Color Management ---------------------------------------

  /*
         Not currently used but was able to toggle betweeen sets of colors
     */
  var ColorManager = {
    pointer: 0,
    arr: [
      ["#0F0", "#F00"],
      ["#FFF", "#4d94ff"],
      ["#ffff00", "#8533ff"],
    ],

    currentColors: function () {
      return this.arr[this.pointer % this.arr.length];
    },

    toggle: function () {
      this.pointer++;
    },
  };

  var SpeedManager = {
    speed: defaultSpeed,
    resetSpeed: function () {
      clearInterval(draw);
      setInterval(draw, 33);
    },
  };

  /*
     *An object used for generating a sequence of rainbow colors. Intended to be called reapeated times, with each call producing a different
     color of the rainbow
     */
  var rainbowGenerator = {
    noOfColors: 10,
    currentColor: 0,
    getColor: function (noOfColors) {
      this.noOfColors = noOfColors || this.noOfColors;
      var frequency = 5 / this.noOfColors;
      // Switch variable for ease of indexing
      var i = this.currentColor;
      var width = 127;
      var center = 128;
      // Generate color using sin waves
      var r = Math.sin(frequency * i + 0) * width + center;
      var g = Math.sin(frequency * i + 1) * width + center;
      var b = Math.sin(frequency * i + 3) * width + center;
      r = Math.floor(r);
      b = Math.floor(b);
      g = Math.floor(g);
      if (this.currentColor === this.noOfColors - 1) {
        this.currentColor = 0;
      } else {
        this.currentColor++;
      }
      // Return rbg color
      return "rgb(" + r + ", " + g + ", " + b + ")";
    },
  };

  var rainbowFunction = function (count) {
    if (count < columns) {
      // call the function.
      drops[count].setColor(rainbowGenerator.getColor(columns));
      drops[count].y = 0;
      // The currently executing function which is an anonymous function.
      window.setTimeout(function () {
        // the caller and the count variables are
        // captured in a closure as they are defined
        // in the outside scope.
        rainbowFunction(count + 1);
      });
    }
  };

  //RandomColor generater
  function getRandomColor() {
    var letters = "23456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 14)];
    }
    console.log(color);
    return color;
  }

  var randColorFunction = function (count, color) {
    if (count < columns) {
      // call the function.
      drops[count].setColor(color);

      // The currently executing function which is an anonymous function.
      window.setTimeout(function () {
        // the caller and the count variables are
        // captured in a closure as they are defined
        // in the outside scope.
        randColorFunction(count + 1, color);
      }, 5);
    }
  };

  // ----------------------------------------------------------------------------------------------

  /*
         Space action
     */
  // On space we want to change color
  var SpaceFunction = function (toggle) {
    randColorFunction(0, getRandomColor());
  };

  // Check
  var toggle = false;
  window.onkeydown = function (e) {
    // If space
    if (e.keyCode === 0 || e.keyCode === 32) {
      SpaceFunction(toggle);
      toggle = !toggle;
    }
  };

  // **************************************************************************************

  // Checks every 100 milliseconds whether all the drops have been 'hit'
  setInterval(function () {
    var allHit = true;
    drops[0].hit = true;
    drops[0].color = backgroundColor;
    //Check if all the drops have been hit
    for (let i = 0; i < drops.length; i++) {
      if (drops[i].hit === false) {
        allHit = false;
      }
    }

    if (allHit) {
      //Change speed
      SpeedManager.resetSpeed();
      // Set timer for color change
      setTimeout(function () {
        randColorFunction(0, ColorManager.currentColors()[0]);
      }, (c.height * SpeedManager.speed) / 10);

      // Toggle current color palette
      ColorManager.toggle();
      //Invoke rainbow color effect
      rainbowFunction(0);
      // reset hit to false
      for (let i = 0; i < drops.length; i++) {
        drops[i].hit = false;
      }
    }
  }, 100);

  class Drop {
    constructor() {
      this.hit = false;
      this.language = LangManager.currentLang;
      this.y = 1000;
      this.color = "#0F0";
    }

    hide() {
      this.color = backgroundColor;
      this.y = -10000;
    };

    setColor(col) {
      this.color = col;
    };
  }


  for (var x = 0; x < columns; x++) {
    drops[x] = new Drop();
  }

  /*
         Responsible for drawing the drops. Gets the latest letters from LangManager, generates a random letter for each drop
         Increments drops y position
     */
  function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px console";

    var letters = LangManager.getLetters();
    //looping over drops
    for (var i = 0; i < drops.length; i++) {

      var text = letters[i % letters.length];

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i].y * font_size > c.height && Math.random() > 0.975) {
        drops[i].y = 0;
      }

      drops[i].y += text.length + space;
      for (let j = 0; j < text.length; j++) {
        ctx.fillStyle = color(drops[i].color).lighten((j / text.length) * 0.5);
        ctx.fillText(text[j], i * font_size, (drops[i].y + j) * font_size);  
      }
    }
  }

  setInterval(draw, defaultSpeed);
};
