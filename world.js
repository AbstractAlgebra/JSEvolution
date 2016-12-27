"use strict";

const targetpop = 34;

var World = function(width, height)
{
	this.width = width;
	this.height = height;
	this.actors = [];
	for (var i = 0; i < targetpop; ++i)
	{
		this.actors.push(new Actor(this, Math.random() * width, Math.random() * height));
	}
	this.generation = 0;
	this.cooldown = 32;
};

World.prototype.update = function()
{
	for (var i = 0; i < this.actors.length; ++i)
	{
		this.actors[i].update();
		if (!this.actors[i].alive)
		{
			this.actors[i] = this.actors.pop();
		}
	}
	// if the pop is half the target pop, we treat this as the end of a
	// a generation and all survivors will reproduce to start the next one
	if (this.actors.length <= targetpop / 2)
	{
		const oldlen = this.actors.length;
		for (var i = 0; i < oldlen; ++i)
		{
			this.actors.push(this.actors[i].reproduce());
		}
		++this.generation;
		this.cooldown = 64;
	}
	
	if (this.cooldown > 0)
	{
		--this.cooldown;
	}
};

World.prototype.draw = function(context)
{
	context.fillStyle = "#44BB44";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < this.actors.length; ++i)
	{
		this.actors[i].draw(context);
	}
	
	context.fillStyle = "#000000";
	context.fillText("Generation: " + this.generation, 16, 16);
	context.fillText("Population: " + this.actors.length + " / " + targetpop, 16, 32);
	context.fillText("cooldown: " + this.cooldown, 16, 48);
};

World.prototype.collisions = function(x, y, radius)
{
	var out = [];
	for (var i = 0; i < this.actors.length; ++i)
	{
		const actor = this.actors[i];
		// TOOD: replace with non-sqrt dist calculation?
		if (dist(x, y, actor.x, actor.y) <= radius + actor.size)
		{
			out.push(actor);
		}
	}
	return out;
};

World.prototype.canKill = function()
{
	return this.cooldown == 0;
};

World.prototype