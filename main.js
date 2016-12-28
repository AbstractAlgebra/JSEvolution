"use strict";

var context;
var world;
var drawAnimId;
var updateAnimId;
var updateStep = 32;

// html interface
function initialize()
{
	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	world = new World(canvas.width, canvas.height);
	
	// set up animation loop
	drawAnimId = setInterval(redraw, 32);
	updateAnimId = setInterval(update, updateStep);
}

function increaseStep()
{
	setUpdateStep(updateStep * 2);
}

function decreaseStep()
{
	if (updateStep > 1)
	{
		setUpdateStep(updateStep / 2);
	}
}

// non-interface
function update()
{
	for (var i = 0; i < 32; ++i)
	{
		world.update();
	}
}

function redraw()
{
	world.draw(context);
}

function setUpdateStep(newStep)
{
	updateStep = newStep;
	clearInterval(updateAnimId);
	updateAnimId = setInterval(update, updateStep);
}