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

function clamp(x, min, max)
{
	return Math.max(min, Math.min(x, max));
}

function rgb(r, g, b)
{
	function adjust(x)
	{
		return clamp(Math.floor(x), 0, 255);
	}
	return "rgb(" + adjust(r) + "," + adjust(g) + "," + adjust(b) + ")";
}