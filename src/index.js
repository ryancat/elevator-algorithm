let _ = require('lodash');

class Elevator {

  constructor ({
    currentLevel = 0, 
    destLevel = 0,
    direction = Elevator.direction.up,
    upList = [],
    downList = [],
    maxLevel = Infinity,
    minLevel = 0
  }) {
    this.currentLevel = currentLevel;
    this.destLevel = destLevel;
    this.direction = direction;
    // this.levelList = {};
    // for (dir in Elevator.direction) {
    //   this.levelList[dir] = [];
    // }
    this.upList = upList;
    this.downList = downList;
    this.maxLevel = maxLevel;
    this.minLevel = minLevel;

    this.isWait = false;

    // Report the level information after init
    // setInterval(() => {
    //   this.log();
    // }, 1000);

  }

  static validateLevel (level) {
    if (!level || level < this.minLevel || level > this.maxLevel) {
      return false;
    } else {
      return true;
    }
  }

  log () {
    console.log(
      `The current level is: ${this.currentLevel}.
       The current direction is: ${this.direction}.
       UP list: ${this.upList}.
       DOWN list: ${this.downList}.
       Going to level: ${this.direction === Elevator.direction.up ? _.last(this.upList) : _.last(this.downList)}
    `);
  }

  addLevel (level) {
    if (!Elevator.validateLevel(level)) {
      return false;
    }

    if (level > this.currentLevel) {
      if (this.upList.indexOf(level) >= 0) {
        return;
      }
      this.upList.push(level);
      this.upList = this.upList.sort(function (a, b) {
        return a - b;
      });
    } else {
      if (this.downList.indexOf(level) >= 0) {
        return;
      }
      this.downList.push(level);
      this.downList = this.downList.sort(function (a, b) {
        return b - a;
      });
    }
  }

  stop () {
    window.clearInterval(this.stopKey);
    this.stopKey = null;
  }

  start () {
    console.log('elevator starts');

    this.stopKey = setInterval(() => {
      this.move();
    }, 1500);
  }

  move () {
    if (!this.stopKey || this.isWait) {
      return;
    }
    
    this.log();

    if (this.direction === Elevator.direction.up) {

      if (!_.isEmpty(this.upList)) {
        // If we reach the next wait level, we wait
        if (this.currentLevel === _.first(this.upList)) {
          this.upList.shift();
          this.wait();
        } else {
          this.currentLevel++;
        }
      } else {
        this.direction = Elevator.direction.down;
      }
      
    } 

    if (this.direction === Elevator.direction.down) {

      if (!_.isEmpty(this.downList)) {
        // If we reach the next wait level, we wait
        if (this.currentLevel === _.first(this.downList)) {
          this.downList.shift();
          this.wait();
        } else {
          this.currentLevel--;
        }
      } else {
        this.direction = Elevator.direction.up;        
      }
    }
  }

  wait () {
    console.log('elevator wait');

    this.isWait = true;

    setTimeout(() => {
      this.isWait = false;
    }, 3000);
  }

}

Elevator.direction = {
  'up': 'up',
  'down': 'down'
};

console.log('this is the elevator main app');

var elevator = new Elevator({});

let randomAddLevel = (level) => {

  elevator.addLevel(level);

  let randomTime = Math.floor(Math.random() * 10 * 1000);
  let randomLevel = Math.floor(Math.random() * 10);

  setTimeout(() => {
    randomAddLevel(randomLevel);
  }, randomTime)

};

randomAddLevel(5);

elevator.start();
