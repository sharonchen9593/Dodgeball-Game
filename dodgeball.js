function runGame() {


  var nEnemies = 20;
  var highScore = 0;
  var hits = 0;
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
    .attr({
      cx: randomX,
      cy: randomY,
      r: 15
    })


  var move = function() {
    enemies
    .transition().duration(2000)
    .attr({
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
    .attr({
      cx: w/2,
      cy: h/2,
      rx: 10,
      ry: 10,
      stroke: 'red',
      fill: 'red'
    })
    .call(d3.behavior.drag().on("drag", function(){
      player
      .attr({
        cx: d3.event.x,
        cy: d3.event.y
      })
    }));

  // check if there is any collisions with distance formula. d = sqrt((x1-x2)^2 + (y1-y2)^2)
  var checkCollision = function() {
    var collision = false;
    enemies.each(function() {
      var enemy = d3.select(this)
      var xDist = enemy.attr('cx')-player.attr('cx')
      var yDist = enemy.attr('cy')-player.attr('cy')
      var rDist = parseInt(enemy.attr('r'))+parseInt(player.attr('rx'))

      var totalDistApart = Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2))
      if (totalDistApart<=rDist) {
        collision = true;
      }
    })
    if (collision) {
      currentScore = 0
      if (alreadyCollided != collision){
        hits++
      }
    }

    alreadyCollided = collision;
  }
  d3.timer(checkCollision)

  var updateScore = function() {
    currentScore++
    highScore = Math.max(currentScore, highScore);
    d3.select(".current span").text(currentScore)
    d3.select(".highscore span").text(highScore)
    d3.select(".hits span").text(hits)
  }

  setInterval(updateScore, 100);
}

runGame()


