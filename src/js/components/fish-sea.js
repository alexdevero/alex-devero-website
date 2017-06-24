// Sea constructor
import { Fish } from './fish-fish.js';
import { Food } from './fish-food.js';

const fishSea = () => {
  // POPULATION SETUP
  const POPULATION = 40; // 60
  const MIN_MASS = .5;
  const MAX_MASS = 3.5;
  const FOOD_RATIO = .25; // .2
  const SCREEN = 1.5;

  // canvas elements
  const canvas = document.querySelector('.js-shoal-fish-canvas');
  const ctx = canvas.getContext('2d');
  const info = document.querySelector('.js-shoal-fish-info');

  // THE SEA
  const sea = {
    width: window.innerWidth /** SCREEN*/,
    height: window.innerHeight /** SCREEN*/,
    population: [],
    food: [],
    canvas: ctx
  }

  // internal use
  const time = null;
  const interval = 20;
  const steps = 0;

  // resizing the dimesions of the sea when resising the screen
  // $(window).resize(function() {
    // resize sea
    // sea.width = $(window).width() * SCREEN;
    // sea.height = $(window).height() * SCREEN;

    window.onclick = function () {
      Fish.showBehavior = !Fish.showBehavior;
    }

    // resize canvas element
    var e = document.getElementById('canvas');

    e.setAttribute('width', sea.width);
    e.setAttribute('height', sea.height);
  // }).resize();

  // populate the sea
  for (var i = 0; i < POPULATION; i++) {
    // random setup
    var randomX = Math.random() * sea.width;
    var randomY = Math.random() * sea.height
    var randomMass = MIN_MASS + (Math.random() * Math.random() * Math.random() * Math.random()) * MAX_MASS;

    // create fish
    var fish = new Fish(randomMass, randomX, randomY);

    // add fish to the sea population
    sea.population.push(fish);
  }

  // add food to the sea
  var initialFood = POPULATION * FOOD_RATIO;

  for (var i = 0; i < initialFood; i++) {
    // initial values
    var randomX = Math.random() * sea.width;
    var randomY = Math.random() * sea.height;
    var foodAmmount = Math.random() * 100 + 20;

    // create food
    var food = new Food(randomX, randomY, foodAmmount);

    sea.food.push(food);
  }

  // one time-step of the timeline loop
  var step = function() {
    // print info
    info.innerHTML = 'Population: ' + sea.population.length;

    // clear the screen (with a fade)
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // update the food
    for (var i in sea.food) {
      var food = sea.food[i];

      if (food && !food.dead) {
        food.draw(ctx);
        food.update(sea);
      } else {
        sea.food[i] = null;

        if (Math.random() < .001) {
          sea.food[i] = new Food(Math.random() * sea.width, Math.random() * sea.height, Math.random() * 100 + 20);
        }
      }
    }

    // list of fish that died during this time-step
    var deadList = [];

    // update all the fishes
    for (var i in sea.population) {
      // current fish
      var fish = sea.population[i];

      // if the fish is dead or null, skip it
      if (fish == null) {
        deadList.push(i);

        continue;
      }

      // makes the fish compute an action (which direction to swim) according to the information it can get from the environment
      fish.swim(sea);

      // update the fish (position and state)
      fish.update(sea);

      // draw the fish
      fish.draw(ctx);

      // if dead, add the fish to the dead list
      if (fish.dead) {
        sea.population[i] = null;
        deadList.push(i);
      }
    }

    // clean all the dead fishes from the sea population
    for (var j in deadList) {
      sea.population.splice(deadList[j], 1);
    }
  }

  // kick it off!
  setInterval(step, interval);
}

export { fishSea };
