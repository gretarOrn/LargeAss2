



window.drawio = {
	shapes: [],
	undoStack: [],
	selectedShape: 'pen',
	fill: true,
	linewidth: 10,
	fontsize: "11px",
	font: "Calibri",
	color: "black",
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

	$('.icon').on('click', function () {
		$('.icon').removeClass('selected');
		$(this).addClass('selected');
		drawio.selectedShape = $(this).data('shape');
	});

	$('#my-canvas').on('mousedown', function(mouseEvent){
		if($('#fillchoice').val() == "true") fill = true;
		else fill = false;
		fontsize = $('#fontsize').val();
		linewidth = +$('#linewidth').val();
		font = $('#font').val();
		color = $('#color').val();
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
				var txt = $('#text-input').val();
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
		if (drawio.selectedElement != null && drawio.selectedElement != "text"){
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