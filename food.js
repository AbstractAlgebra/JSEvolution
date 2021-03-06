"use strict";

var Food = function(x, y)
{
	this.x = x;
	this.y = y;
	this.size = 5;
	this.eaten = false;
};

Food.prototype.update = function()
{

};

Food.prototype.draw = function(context)
{
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	context.fillStyle = "#BB2200";
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.stroke();
	context.fillText("food", this.x, this.y);
};