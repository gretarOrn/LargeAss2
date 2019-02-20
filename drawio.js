



window.drawio = {
	shapes: [],
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

	$('.icon').on('click', function () {
		$('.icon').removeClass('selected');
		$(this).addClass('selected');
		drawio.selectedShape = $(this).data('shape');
	});

	$('#my-canvas').on('mousedown', function(mouseEvent){
		switch(drawio.selectedShape){
			case drawio.availableShapes.RECTANGLE:
				drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0, false);
				break;
			case drawio.availableShapes.LINE:
				drawio.selectedElement = new Line({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, { x: 0, y: 0 });
				break;
			case drawio.availableShapes.PEN:
				drawio.selectedElement = new Pen({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, null);
				break;
			case drawio.availableShapes.TEXT:
				var txt = $('#text-input').val();
				if(txt) drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, txt, "30px", "Arial", true);
				break;
			case drawio.availableShapes.CIRCLE:
				drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, { x: 0, y: 0})
				break;
		}
	});

	$('#my-canvas').on('mousemove', function(mouseEvent){
		if(drawio.selectedElement){
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