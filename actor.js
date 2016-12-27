"use strict";

var Actor = function(world, x, y)
{
	this.alive = true;
	this.world = world;
	this.x = x;
	this.y = y;
	this.size = 4 + Math.random() * 13;
	this.speed = 0.5 + Math.random() * 2.3;
	this.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
	this.newRandomTarget();
};

Actor.prototype.update = function(world)
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
	
	if (this.world.canKill())
	{
		var collisions = this.world.collisions(this.x, this.y, this.size);
		for (var i = 0; i < collisions.length; ++i)
		{
			if (this != collisions[i] && this.size <= collisions[i].size)
			{
				this.alive = false;
			}
		}
	}
};

Actor.prototype.draw = function(context)
{
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	context.fillStyle = rgb(this.color[0], this.color[1], this.color[2]);
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.stroke();
};

Actor.prototype.reproduce = function(context)
{
	var child = new Actor(this.world, this.x, this.y);
	child.speed = this.speed * variancem(0.3);
	child.size = Math.min(23, this.size * variancem(0.3));
	child.color[0] = this.color[0] * variancem(0.15);
	child.color[1] = this.color[1] * variancem(0.15);
	child.color[2] = this.color[2] * variancem(0.15);
	return child;
};

Actor.prototype.newRandomTarget = function()
{
	this.targetx = Math.random() * this.world.width;
	this.targety = Math.random() * this.world.height;
};