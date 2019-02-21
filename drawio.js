var myStorage = window.localStorage;



window.drawio = {
	shapes: [],
	undoStack: [],
	selectedShape: 'pen',
	canvas: document.getElementById('my-canvas'),
	ctx: document.getElementById('my-canvas').getContext('2d'),
	selectedElement: null,
	availableShapes: {
		RECTANGLE: 'rectangle',
		LINE: 'line',
		PEN: 'pen',
		TEXT: 'text',
		CIRCLE: 'circle'
	}
};

$(function (){

	function drawCanvas() {
		if(drawio.selectedElement){
			drawio.selectedElement.render();
		}
		for(var i = 0; i < drawio.shapes.length; i++){
			drawio.shapes[i].render();
		}
	};
	function loadDrawing(){
		drawio.shapes = [];
		var items = JSON.parse(myStorage.getItem($(this).text()));
		for(var i = 0; i < items.length; i++){
			switch(items[i].form){
				case drawio.availableShapes.RECTANGLE:
					drawio.shapes.push(new Rectangle(items[i].position , items[i].width, items[i].height, items[i].fill, items[i].linewidth, items[i].color));
					break;
				case drawio.availableShapes.LINE:
					drawio.shapes.push(new Line(items[i].position, items[i].end_position, items[i].linewidth, items[i].color));
					break;
				case drawio.availableShapes.CIRCLE:
					drawio.shapes.push(new Cirlcle(items[i].position, items[i].end_position, items[i].fill, items[i].linewidth, items[i].color));
					break;
				case drawio.availableShapes.TEXT:
					drawio.shapes.push(new Text(items[i].position, items[i].text, items[i].size, items[i].font, items[i].fill, items[i].color));
					break;
				case drawio.availableShapes.PEN:
					drawio.shapes.push(new Pen(items[i].position, items[i].penPoints, items[i].linewidth, items[i].color));
					break;
			}
		}
		drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
		drawCanvas();
	}
	function loadStorage(){
		for(var i = 0; i < myStorage.length; i++){
			var name = myStorage.key(i);
			var item = $("<p class=\"save-file\">" + name + "</p>");
			item.on('click', loadDrawing);
			$('.saved').append(item);
		}
	}
	loadStorage();
	$('.undo').on('click', function(){
		if(drawio.shapes.length > 0){
			drawio.undoStack.push(drawio.shapes.pop());
			drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
			drawCanvas();
		}
	});
	$('.redo').on('click', function(){
		if(drawio.undoStack.length > 0){
			drawio.shapes.push(drawio.undoStack.pop());
			drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
			drawCanvas();
		}	
	});

	$('.save').on('click', function(){
		var size = myStorage.length;
		localStorage.setItem("drawing " + size , JSON.stringify(drawio.shapes));
		var item = $("<p class=\"save-file\">drawing " + size + "</p>");
		item.on('click', loadDrawing);
		$('.saved').append(item);
	});
	$('.icon').on('click', function () {
		$('.icon').removeClass('selected');
		$(this).addClass('selected');
		drawio.selectedShape = $(this).data('shape');
	});

	$('#my-canvas').on('mousedown', function(mouseEvent){
		var fill;
		var fontsize = $('#fontsize').val();
		var linewidth = +$('#linewidth').val();
		var font = $('#font').val();
		var color = $('#color').val();
		var txt = $('#text-input').val();
		if($('#fillchoice').val() == "true"){
			fill = true;
		}
		else{
			fill = false;
		}
		switch(drawio.selectedShape){
			case drawio.availableShapes.RECTANGLE:
				drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0, fill, linewidth, color);
				break;
			case drawio.availableShapes.LINE:
				drawio.selectedElement = new Line({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, { x: 0, y: 0 }, linewidth, color);
				break;
			case drawio.availableShapes.PEN:
				drawio.selectedElement = new Pen({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, null, linewidth, color);
				break;
			case drawio.availableShapes.TEXT:
				if(txt){
					drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, txt, fontsize, font, fill, color);
					drawCanvas();
				}
				break;
			case drawio.availableShapes.CIRCLE:
				drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, { x: 0, y: 0}, fill, linewidth, color)
				break;
		}
	});

	$('#my-canvas').on('mousemove', function(mouseEvent){
		if(drawio.selectedElement != null && drawio.selectedElement != drawio.availableShapes.TEXT){
			drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
			drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
			drawCanvas();	
		}
	});

	$('#my-canvas').on('mouseup', function (){
		if(drawio.selectedElement != null){
			drawio.shapes.push(drawio.selectedElement);
			drawio.selectedElement = null;
		}
	});
});