"use strict";

var context;
var world;
var drawAnimId;
var updateAnimId;

function initialize()
{
	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	world = new World(canvas.width, canvas.height);
	
	// set up animation loop
	drawAnimId = setInterval(redraw, 32);
	updateAnimId = setInterval(update, 16);
}

function update()
{
	world.update();
}

function redraw()
{
	world.draw(context);
}