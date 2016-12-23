"use strict";

var Actor = function(x, y)
{
	this.x = x;
	this.y = y;
	this.size = 2 + Math.random() * 5;
};

Actor.prototype.draw = function(context)
{
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	context.fillStyle = "#BB2200";
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.stroke();
};