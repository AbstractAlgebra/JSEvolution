"use strict";

const MAX_HUNGER = 1000;
const NO_FAMILY = -1;

var Actor = function(world, x, y)
{
	this.alive = true;
	this.world = world;
	this.x = x;
	this.y = y;
	this.size = 4 + Math.random() * 32;
	this.speed = 0.5 + Math.random() * 2.3;
	this.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
	this.newRandomTarget();
	this.hunger = MAX_HUNGER;
	this.family = NO_FAMILY;
	this.btree = new Walk();
};

Actor.prototype.update = function(world)
{
	this.btree.run(this, this.world);

	var collisions = this.world.collisions(this.x, this.y, this.size, "actor");
	for (var i = 0; i < collisions.length; ++i)
	{
		const related = this.family != NO_FAMILY && this.family == collisions[i].family;
		if ((this.world.canKill() || !related) &&
			this != collisions[i] &&
			this.size <= collisions[i].size)
		{
			this.alive = false;
			collisions[i].hunger = MAX_HUNGER;
		}
	}

	var foodNear = this.world.collisions(this.x, this.y, this.size, "food");
	if (foodNear.length > 0)
	{
		foodNear[0].eaten = true;
		this.hunger = MAX_HUNGER;
	}
	this.hunger -= 0.3 + this.size / 128 + this.speed / 256;
	if (this.hunger <= 0)
	{
		this.alive = false;
	}
};

Actor.prototype.draw = function(context)
{
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	context.fillStyle = rgb(this.color[0], this.color[1], this.color[2]);
	context.fill();
	context.beginPath();
	context.arc(this.x, this.y, this.size, 0, 2*Math.PI * this.hunger / MAX_HUNGER);
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	context.stroke();
};

Actor.prototype.reproduce = function(context)
{
	var child = new Actor(this.world, this.x, this.y);
	child.speed = clamp(this.speed * variancem(0.3), 0.5, 32);
	child.size = clamp(this.size * variancem(0.3), 4, 256);
	child.color[0] = this.color[0] * variancem(0.15);
	child.color[1] = this.color[1] * variancem(0.15);
	child.color[2] = this.color[2] * variancem(0.15);
	const averageHunger = (this.hunger + child.hunger) / 2;
	this.hunger = averageHunger;
	child.hunger = averageHunger;
	return child;
};

Actor.prototype.newRandomTarget = function()
{
	this.targetx = Math.random() * this.world.width;
	this.targety = Math.random() * this.world.height;
};