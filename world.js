"use strict";

const targetpop = 134;

var World = function(width, height)
{
	this.width = width;
	this.height = height;
	this.actors = [];
	this.foods = [];
	for (var i = 0; i < targetpop; ++i)
	{
		this.actors.push(new Actor(this, Math.random() * width, Math.random() * height));
	}
	this.generation = 0;
	this.cooldown = 0;
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
	for (var i = 0; i < this.foods.length; ++i)
	{
		this.foods[i].update();
		if (this.foods[i].eaten)
		{
			this.foods[i] = this.foods.pop();
		}
	}
	// if the pop is half the target pop, we treat this as the end of a
	// a generation and all survivors will reproduce to start the next one
	if (this.actors.length <= targetpop / 2)
	{
		const oldlen = this.actors.length;
		for (var i = 0; i < oldlen; ++i)
		{
			var parent = this.actors[i];
			var child = parent.reproduce();
			// mark them as being in the same family so they don't eat each
			// other until after the cooldown
			parent.family = i;
			child.family = i;
			this.actors.push(child);
		}
		++this.generation;
		this.cooldown = 1024;
	}
	
	if (this.cooldown > 0)
	{
		--this.cooldown;
	}
	
	if (this.foods.length < 420 && Math.random() < 0.05)
	{
		this.foods.push(new Food((0.05 + 0.9 * Math.random()) * this.width, (0.05 + 0.9 * Math.random()) * this.height));
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
	
	for (var i = 0; i < this.foods.length; ++i)
	{
		this.foods[i].draw(context);
	}
	
	context.fillStyle = "#000000";
	context.fillText("Generation: " + this.generation, 16, 16);
	context.fillText("Population: " + this.actors.length + " / " + targetpop, 16, 32);
	context.fillText("cooldown: " + this.cooldown, 16, 48);
};

World.prototype.collisions = function(x, y, radius, type)
{
	switch (type)
	{
		case "actor":
			return collisionImpl(x, y, radius, this.actors);
		case "food":
			return collisionImpl(x, y, radius, this.foods);
		default:
			alert("invald collision type: " + type)
			break;
	}
	return [];
};

World.prototype.canKill = function()
{
	return this.cooldown == 0;
};

function collisionImpl(x, y, radius, list)
{
	var out = [];
	for (var i = 0; i < list.length; ++i)
	{
		const obj = list[i];
		// TOOD: replace with non-sqrt dist calculation?
		if (dist(x, y, obj.x, obj.y) <= radius + obj.size)
		{
			out.push(obj);
		}
	}
	return out;
}