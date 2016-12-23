"use strict";

var canvas;
var context;
var actors;
var animId;

function initialize()
{
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	// initialize world
	actors = [];
	for (var i = 0; i < 9; ++i)
	{
		actors.push(new Actor(Math.random() * canvas.width, Math.random() * canvas.height));
	}
	
	// set up animation loop
	animId = setInterval(redraw, 30);
}

function redraw()
{
	context.fillStyle = "#44BB44";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < actors.length; ++i)
	{
		actors[i].draw(context);
	}
}