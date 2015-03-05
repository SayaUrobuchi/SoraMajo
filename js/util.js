
function DO_NOTHING()
{
}

function ALWAYS_RETURN(val)
{
	return function ()
	{
		return val;
	}
}

function is_ndef(v)
{
	return v === undefined;
}

function is_def(v)
{
	return !is_ndef(v);
}

function extend(p, q)
{
	var ret = {};
	for (var k in p)
	{
		ret[k] = p[k];
	}
	for (var k in q)
	{
		ret[k] = q[k];
	}
	return ret;
}

function rgba(r, g, b, a)
{
	return "rgba("+[r, g, b, a].join(",")+")";
}

function rgb(r, g, b)
{
	return rgba(r, g, b, 1.0);
}

function deg(ang)
{
	return ang*Math.PI/180;
}

function linear(st, ed, now)
{
	return st + (ed-st)*now;
}

function pow2(st, ed, now)
{
	return st + (ed-st)*(now*now);
}

function is_collide(p, q)
{
	var dx = p.x - q.x;
	var dy = p.y - q.y;
	var r = p.r + q.r;
	return (dx*dx) + (dy*dy) < r*r;
}

