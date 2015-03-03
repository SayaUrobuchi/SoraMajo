
function MainChara()
{
	var self = Chara();
	
	self.init = function ()
	{
		self.x = 0;
		self.y = 0;
		self.w = 32;
		self.h = 32;
		self.w2 = 16;
		self.h2 = 16;
		self.img = image.MINYAN_BATTLE;
	}
	
	self.update = function (field)
	{
	}
	
	self.draw = function (field, g)
	{
		if (self.moving_left)
		{
		}
		else if (self.moving_left)
		{
		}
		else
		{
			g.drawImage(self.img, 32, 96, 32, 32, self.x-self.w2, self.y-self.h2, self.w, self.h);
		}
	}
	
	self.init();
	
	return self;
}

