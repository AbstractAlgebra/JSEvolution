"use strict";

var canvas;
var context;
var actors;
var foods;
var drawAnimId;
var updateAnimId;
var numActors = 9;
var numFoods = 90;

function initialize()
{
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	// initialize world
	actors = [];
	foods = [];
	for (var i = 0; i < numActors; ++i)
	{
		actors.push(new Actor(Math.random() * canvas.width, Math.random() * canvas.height));
	}

	for(var i = 0; i < numFoods; ++i)
	{
		foods.push(new Food(Math.random() * canvas.width, Math.random() * canvas.height));
	}
	
	// set up animation loop
	drawAnimId = setInterval(redraw, 30);
	updateAnimId = setInterval(update, 30);
}

function update()
{
	for (var i = 0; i < actors.length; ++i)
	{
		actors[i].update();
		
		//checking hunger of specific actor
		if (i == 3)
		{

			console.log(actors[i].hunger);
		}
		if(actors[i].hunger < 1)
		{
			var temp = actors[i];
			actors[i] = actors[actors.length-1];
			actors[actors.length-1] = temp;
			actors.pop();
		}
			

	}
	for (var i = 0; i < foods.length; ++i)
	{
		foods[i].update();
	}
}

function redraw()
{
	//context.fillStyle = "#44BB44";
	context.fillStyle = "#A0522D";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < actors.length; ++i)
	{
		actors[i].draw(context);
	}
	for( var i = 0; i < foods.length; ++i)
	{
		foods[i].draw(context);
	}
}