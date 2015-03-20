$(function() {

  var STATE = {
    "go" : true,
    "numberOfLines": 5,
    "transitionDuration": 1000,
    "updateInterval": 5000
  };

  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  var maxStrokeWidth = Math.ceil(_.min([screenWidth, screenHeight]) / 100);

  var randomLine = function(svg) {
    return svg.append('line').attr(randomLineAttr());
  }

  var randomLineAttr = function() {
    return { 
      'x1': _.random(0, screenWidth), 
      'x2': _.random(0, screenWidth), 
      'y1': _.random(0, screenHeight), 
      'y2': _.random(0, screenHeight),
      'stroke': "#333",
      'stroke-width': _.random(1, maxStrokeWidth),
    }
  }
  
  var randomizeLine = function(line) {
    return line.transition().duration(STATE.transitionDuration).attr(randomLineAttr());
  }

  var randomLines = function() { 
    return _(STATE.numberOfLines).times(_.partial(randomLine, svg));
  }
  
  var randomizeTheLines = function() {
    return _(lines).map(randomizeLine);
  }
  
  var tryUpdate = function() { if (STATE.go) { randomizeTheLines(); } }
  var pauceResume = function() {  STATE.go = !STATE.go }
  
  Mousetrap.bind('space', pauceResume);
  Mousetrap.bind('right', randomizeTheLines);
  
  var svg = d3.select("body").append("svg").attr({
    "width": screenWidth,
    "height": screenHeight
  });
  
  var lines = randomLines();
  setInterval(tryUpdate , STATE.updateInterval);

});