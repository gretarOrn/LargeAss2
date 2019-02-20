
function Shape(position) {
	this.position = position;
};

Shape.prototype.render = function(){};

Shape.prototype.move = function() {
	this.position = position;
};

Shape.prototype.resize = function() {};

 // ----------- Rectangle

function Rectangle(position, width, height, fill){

	Shape.call(this, position);
	this.width = width;
	this.height = height;
	this.fill = fill;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
	if(this.fill) drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	else drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
};

Rectangle.prototype.resize = function(x, y) {
	this.width = x - this.position.x;
	this.height = y - this.position.y;
};

// -------- line

function Line(position, end_position){
	Shape.call(this, position);
	this.end_position = {x: end_position.x , y: end_position.y };
};
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function() {
	drawio.ctx.beginPath();
	drawio.ctx.moveTo(this.position.x, this.position.y);
	drawio.ctx.lineTo(this.end_position.x + this.position.x, this.end_position.y + this.position.y);
	drawio.ctx.stroke();
	drawio.ctx.closePath();
};

Line.prototype.resize = function(x, y) {
	this.end_position.x = x - this.position.x;
	this.end_position.y = y - this.position.y;
};


 // ----------- circle

function Circle(position, end_position, fills){
	Shape.call(this, position);
	this.end_position = {x: end_position.x, y: end_position.y };
	this.fills = fills;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function(fills) {
	drawio.ctx.beginPath();
	this.fills = true;
	drawio.ctx.arc(this.position.x, this.position.y, Math.abs(this.end_position.x - this.position.x), 0, Math.PI * 4);
	if(this.fills) {drawio.ctx.fill();} else {drawio.ctx.stroke(); drawio.ctx.closePath();}
};

Circle.prototype.resize = function(x, y) {
	this.end_position.x = x;
	this.end_position.y = y;
};

function Pen(position, penPoints){
	Shape.call(this, position);
	if(penPoints){
		this.penPoints = penPoints;
	}
	else{
		this.penPoints = [];
	}
};

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function() {
	drawio.ctx.beginPath();
	for(var i = 0; i < this.penPoints.length; i++){
		drawio.ctx.lineTo(this.penPoints[i].x, this.penPoints[i].y);
	}
	drawio.ctx.stroke();
	drawio.ctx.closePath();
};

Pen.prototype.resize = function(x, y) {
	this.penPoints.push({ x: x , y: y });
};