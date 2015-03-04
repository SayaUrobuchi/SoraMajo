
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
	hp: 1024, 
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
		self.x = data.x;
		self.y = data.y;
		self.r = data.r;
	};
	
	self.update = function (field)
	{
		self.data.move(field, self);
		self.data.shot(field, self);
		console.log(self.hp);
	}
	
	self.draw = function (field, g)
	{
		self.data.draw(field, g, self);
	}
	
	self.init();
	
	return self;
}

