
var SHOT = {
	DRAW_NORMAL: function (field, g, self)
	{
		g.beginPath();
		g.fillStyle = self.data.color;
		g.arc(self.x, self.y, self.data.dr, 0, 2*Math.PI, false);
		g.fill();
		g.lineWidth = 1;
		g.strokeStyle = self.data.out_color;
		g.stroke();
	}, 
	MOVE_LINE: function (field, self)
	{
		self.x += self.data.dx * self.data.spd;
		self.y += self.data.dy * self.data.spd;
	}, 
	DISAPPEAR_OUT_RANGE: function (field, self)
	{
		return self.hp <= 0 || 
			self.x < 0 || self.x > field.range_x || self.y < 0 || self.y > field.range_y;
	}, 
	UPDATE_TO_MC: function (field, self)
	{
		var mc = field.get_mchara();
		if (mc)
		{
			var ang = self.angle_to(mc);
			var dang = Math.abs(ang-self.data.ang);
			if (dang > self.data.limit_ang)
			{
				dang = self.data.limit_ang;
			}
			if (dang > self.data.limit_total_ang)
			{
				dang = self.data.limit_total_ang;
				self.data.limit_total_ang = 0;
			}
			else
			{
				self.data.limit_total_ang -= dang;
			}
			if (ang < self.data.ang)
			{
				dang = -dang;
			}
			self.data.ang += dang;
			self.data.dx = Math.cos(self.data.ang);
			self.data.dy = Math.sin(self.data.ang);
		}
	}, 
};

var SHOT_TEMPLATE = {
	ox: 0, 
	oy: 0, 
	color: COLOR.WHITE, 
	draw: SHOT.DRAW_NORMAL, 
	move: SHOT.MOVE_LINE, 
	update: DO_NOTHING, 
	is_disappear: SHOT.DISAPPEAR_OUT_RANGE, 
};

function Shot(data)
{
	var self = Chara();
	
	self.init = function ()
	{
		self.x = data.x;
		self.y = data.y;
		self.target = data.target;
		self.data = data;
		self.r = data.r;
	}
	
	self.update = function (field)
	{
		if (field.state == STG.BATTLE)
		{
			data.update(field, self);
			data.move(field, self);
		}
	}
	
	self.draw = function (field, g)
	{
		data.draw(field, g, self);
	}
	
	self.is_disappear = function (field)
	{
		return data.is_disappear(field, self);
	}
	
	self.init();

	return self;
}

