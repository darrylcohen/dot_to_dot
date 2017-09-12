var gridSize = 10
var gridSize = gridSize * 2 + 1;

var grid = document.querySelector('#grid')

var addListeners = function() {
  grid.addEventListener('dblclick', function(event){
    if (Number(event.target.id) % 2 !== 0) {
      console.log(event.target.id);
    }
  });
}



for (var i = 0; i < gridSize; i++) {
  var row = document.createElement('div');
  row.className = "row"
  for (var j = 0; j < gridSize; j++) {
    var block = document.createElement('div');
    block.id = i * gridSize + j;
    if (j % 2 === 0 && i % 2 === 0 ) {
      block.className = "block point";
    } else if (i % 2 === 1 & j % 2 === 1) {
      if (j % 2 === 1) {
        block.className = "block initial"
      } else {
        block.className = "block empty"
      }
    } else {
        block.className = "block";

    }

    row.appendChild(block)
  }
  grid.appendChild(row)
}
