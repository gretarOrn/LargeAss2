
function Shape(position) {
	this.position = position;
};

Shape.prototype.render = function(){};

Shape.prototype.move = function() {
	this.position = position;
};

Shape.prototype.resize = function() {};

function Rectangle(position, width, height){
	Shape.clal(this, position);
	this.width = width;
	this.height = height;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
	drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Rectangle.prototype.resize = function() {
	this.width = x - this.position.x;
	this.height = y - this.position.y;
};