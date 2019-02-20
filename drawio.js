



window.drawio = {
	shapes: [],
	selectedShape: 'rectangle',
	ctx: document.getElementById('my-canvas').getContext('2d'),
	selectedElement: null,
	availableShapes: {
		RECTANGLE: 'rectangle'
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
			case drawio.availableShapes.RECTANGLE;
				drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
				break;
		}
	});

	$('#my-canvas').on('mousemove', function(mouseEvent){
		if(drawio.selectedElement){
			drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
			drawCanvas();
		}
	});
});