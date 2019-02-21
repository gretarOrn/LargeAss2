
function Shape(position) {
	this.position = position;
};

Shape.prototype.render = function(){};

Shape.prototype.move = function() {
	this.position = position;
};

Shape.prototype.resize = function() {};

 // ----------- Rectangle

function Rectangle(position, width, height, fill, linewidth, color){

	Shape.call(this, position);
	this.width = width;
	this.height = height;
	this.fill = fill;
	this.linewidth = linewidth;
	this.color = color;
	this.form = 'rectangle';
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
	if(this.fill){
		drawio.ctx.fillStyle = this.color;
		drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	else{
		drawio.ctx.strokeStyle = this.color;
		drawio.ctx.lineWidth = this.linewidth;
		drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
	}
};

Rectangle.prototype.resize = function(x, y) {
	this.width = x - this.position.x;
	this.height = y - this.position.y;
};

// -------- line

function Line(position, end_position, linewidth, color){
	Shape.call(this, position);
	this.end_position = {x: end_position.x , y: end_position.y };
	this.linewidth = linewidth;
	this.color = color;
	this.form = 'line';
};
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function() {
	drawio.ctx.beginPath();
	drawio.ctx.moveTo(this.position.x, this.position.y);
	drawio.ctx.lineTo(this.end_position.x + this.position.x, this.end_position.y + this.position.y);
	drawio.ctx.lineWidth = this.linewidth;
	drawio.ctx.strokeStyle = this.color;
	drawio.ctx.stroke();
	drawio.ctx.closePath();
};

Line.prototype.resize = function(x, y) {
	this.end_position.x = x - this.position.x;
	this.end_position.y = y - this.position.y;
};


 // ----------- circle

function Circle(position, end_position, fill, linewidth, color){
	Shape.call(this, position);
	this.end_position = {x: end_position.x, y: end_position.y };
	this.fill = fill;
	this.linewidth = linewidth;
	this.color = color;
	this.form = 'circle';
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function() {
	drawio.ctx.beginPath();
	drawio.ctx.arc(this.position.x, this.position.y, Math.abs(this.end_position.x - this.position.x), 0, Math.PI * 4);
	if(this.fill){
		drawio.ctx.fillStyle = this.color;
		drawio.ctx.fill();
	} 
	else{
		drawio.ctx.strokeStyle = this.color;
		drawio.ctx.lineWidth = this.linewidth;
		drawio.ctx.stroke(); 
		drawio.ctx.closePath();
	}
};

Circle.prototype.resize = function(x, y) {
	this.end_position.x = x;
	this.end_position.y = y;
};

function Pen(position, penPoints, linewidth, color){
	Shape.call(this, position);
	this.linewidth = linewidth;
	this.color = color;
	if(penPoints){
		this.penPoints = penPoints;
	}
	else{
		this.penPoints = [];
	}
	this.form = 'pen';
};

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function() {
	drawio.ctx.beginPath();
	for(var i = 0; i < this.penPoints.length; i++){
		drawio.ctx.lineTo(this.penPoints[i].x, this.penPoints[i].y);
	}
	drawio.ctx.strokeStyle = this.color
	drawio.ctx.lineWidth = this.linewidth;
	drawio.ctx.stroke();
	drawio.ctx.closePath();
};

Pen.prototype.resize = function(x, y) {
	this.penPoints.push({ x: x , y: y });
};

function Text(position, text, size, font, fill, color){
	Shape.call(this, position);
	this.position = position;
	this.text = text;
	this.size = size;
	this.font = font;
	this.fill = fill;
	this.color = color;
	this.form = 'text';
};

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function() {
	drawio.ctx.beginPath();
	drawio.ctx.font = this.size + " " + this.font;
	if(this.fill){
		drawio.ctx.fillStyle = this.color
		drawio.ctx.fillText(this.text, this.position.x, this.position.y);
	}
	else{
		drawio.ctx.strokeStyle = this.color
		drawio.ctx.strokeText(this.text, this.position.x, this.position.y);
	}
	drawio.ctx.closePath();
};

Text.prototype.resize = function(x, y) {
	this.position.x = x;
	this.position.y = y;
};