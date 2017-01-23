"use strict";

const BTResult = {
	SUCCEEDED : "succeeded",
	FAILED : "failed",
	IN_PROGRESS : "in_progress"
};

var Sequence = function()
{
	this.children = [];
};

Sequence.prototype.run = function(actor, world)
{
	for (var i = 0; i < this.children.length; ++i)
	{
		// FILL IN LATER
	}
};

var Walk = function()
{
};

Walk.prototype.run = function(actor, world)
{
	const distToTarget = dist(this.x, this.y, this.targetx, this.targety);
	if (distToTarget < this.speed)
	{
		this.newRandomTarget();
		return BTResult.SUCCEEDED;
	}
	else
	{
		// ugh.... pls make less ugly by either writing a dir(x1, y1, x2, y2)
		// or making this all in terms of vectors and writing normalize() and len() for those
		const scale = this.speed / distToTarget;
		this.x += (this.targetx - this.x) * scale;
		this.y += (this.targety - this.y) * scale;
		return BTResult.IN_PROGRESS;
	}
};