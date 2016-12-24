"use strict";

var Actor = function(x, y)
{
	this.x = x;
	this.y = y;
	this.size = 2 + Math.random() * 5;
	this.speed = 0.5 + Math.random() * 1.3;
	this.newRandomTarget();
	this.hunger = 1000;
};

Actor.prototype.update = function()
{
	const distToTarget = dist(this.x, this.y, this.targetx, this.targety);
	if (distToTarget < this.speed)
	{
		this.newRandomTarget();
	}
	else
	{
		// ugh.... pls make less ugly by either writing a dir(x1, y1, x2, y2)
		// or making this all in terms of vectors and writing normalize() and len() for those
		const scale = this.speed / distToTarget;
		this.x += (this.targetx - this.x) * scale;
		this.y += (this.targety - this.y) * scale;
	}

	for(var i = 0; i < foods.length; i++)
	{
		if (Math.abs(this.x - foods[i].x) < this.size && Math.abs(this.y - foods[i].y) < this.size)
		{
			var temp = foods[i];
			foods[i] = foods[foods.length-1];
			foods[foods.length-1] = temp;
	//		document.append(foods.length);
			this.size += temp.size/2;
			foods.pop();
			this.hunger = 1000;
		}
	}
	this.hunger--;

};

Actor.prototype.draw = function(context)
{
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	context.fillStyle = "#008000"
	//context.fillStyle = "#BB2200";
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.stroke();
};

Actor.prototype.newRandomTarget = function()
{
	this.targetx = Math.random() * 640;
	this.targety = Math.random() * 480;
};