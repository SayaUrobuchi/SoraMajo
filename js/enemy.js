
var ENEMY = {
	MOVE_NONE: function (field, self)
	{
	}, 
	SHOT_NONE: function (field, self)
	{
	}, 
	DRAW_NORMAL: function (field, g, self)
	{
		g.drawImage(self.data.img, 
			self.data.sx, self.data.sy, self.data.sw, self.data.sh, 
			self.x-self.data.w/2, self.y-self.data.h/2, self.data.w, self.data.h);
	}, 
};

var ENEMY_TEMPLATE = {
	hp: 2048, 
	move: ENEMY.MOVE_NONE, 
	shot: ENEMY.SHOT_NONE, 
	draw: ENEMY.DRAW_NORMAL, 
};

function Enemy(data)
{
	var self = Chara();
	
	self.init = function ()
	{
		self.data = data;
		self.hp = data.hp;
		self.mhp = data.hp;
		self.x = data.x;
		self.y = data.y;
		self.r = data.r;
		self.lvl = 0;
		self.state = 0;
		self.hp_bar_rate = 0;
	};
	
	self.update = function (field)
	{
		self.data.move(field, self);
		self.data.shot(field, self);
		self.update_hp(field);
	}
	
	self.update_hp = function (field)
	{
		self.real_hp_rate = self.hp / self.mhp;
		var dis = self.real_hp_rate - self.hp_bar_rate;
		var dir = (dis < 0 ? -1 : 1);
		dis = Math.abs(dis);
		if (dis > UI.ENEMY.HP_ANI_SPD)
		{
			dis = UI.ENEMY.HP_ANI_SPD;
		}
		self.hp_bar_rate += dis*dir;
	}
	
	self.draw = function (field, g)
	{
		self.data.draw(field, g, self);
		self.draw_hp_bar(field, g);
		self.draw_lvl_name(field, g);
	}
	
	self.draw_hp_bar = function (field, g)
	{
		var len = field.range_x-40;
		g.fillStyle = COLOR.GREEN;
		g.fillRect(20, 10, len*self.hp_bar_rate, 16);
		g.strokeStyle = COLOR.RED;
		g.lineWidth = 2;
		g.strokeRect(20, 10, len, 16);
	}
	
	self.draw_lvl_name = function (field, g)
	{
		g.font = UI.ENEMY.LVL_NAME_FONT;
		g.textAlign = "center";
		g.fillStyle = COLOR.TEXT;
		g.fillText(self.data.lvl_name[self.lvl], field.range_x/2, 50);
		g.strokeStyle = COLOR.RED;
		g.lineWidth = 0.2;
		g.strokeText(self.data.lvl_name[self.lvl], field.range_x/2, 50);
	}
	
	self.init();
	
	return self;
}

