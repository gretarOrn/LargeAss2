
function Shape(position) {
	this.position = position;
};

Shape.prototype.render = function(){};

Shape.prototype.move = function() {
	this.position = position;
};

Shape.prototype.resize = function() {};

function Rectangle(position, width, height){
	Shape.call(this, position);
	this.width = width;
	this.height = height;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function(fill) {
	fill = true;
	if(fill) drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	else drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
};

Rectangle.prototype.resize = function(x, y) {
	this.width = x - this.position.x;
	this.height = y - this.position.y;
};

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