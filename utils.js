"use strict";

function dist(x1, y1, x2, y2)
{
	const xd = x2 - x1;
	const yd = y2 - y1;
	return Math.sqrt(xd*xd + yd*yd);
}

function variancea(base, difference)
{
	return base - difference + 2 * difference * Math.random();
}

function variancem(difference)
{
	return variancea(1, difference);
}