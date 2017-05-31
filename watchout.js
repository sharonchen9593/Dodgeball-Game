function runGame() {


  var nEnemies = 20;
  var highScore = 0;
  var collisions = 0;
  var currentScore = 0;



  // draw enemies in as SVG element

  var h = window.innerHeight-100   // height in px of browser window
  var w = window.innerWidth-100    // width of browser window


  // get coordinates to randomly put svg element
  var randomX = function() {
    return Math.random() * w;
  }

  var randomY = function() {
    return Math.random() * h;
  }

  // build game window
  var gameWindow = d3
    .select('body')
    .append('svg')
    .attr({
      width: w,
      height: h,
    })

  // put enemies in

  var enemies = gameWindow
    .selectAll('circle')
    .data(d3.range(nEnemies))
    .enter()
    .append('circle')
    .style({
      cx: randomX,
      cy: randomY,
      r: 15
    })


  var move = function() {
    enemies
    .transition().duration(2000)
    .style({
      cx: randomX,
      cy: randomY,
      r: 15
    })
    .transition()
    .duration(100)
    .each('end', move)
  }
  move()

  //create player element
  var player = gameWindow
    .selectAll('ellipse')
    .data([1])
    .enter()
    .append('ellipse')
    .style({
      cx: w/2,
      cy: h/2,
      rx: 10,
      ry: 10,
      stroke: 'red',
      fill: 'red'
    })

}

runGame()


