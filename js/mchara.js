
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
		self.spd = 8;
		self.r = 8;
		self.img_data = {
			NORM: {
				img: image.MINYAN_BATTLE, 
				sx: 32, 
				sy: 96, 
				sw: 32, 
				sh: 32, 
				ox: self.w2, 
				oy: self.h2, 
			}, 
			MOVE_LEFT: {
			}, 
			MOVE_RIGHT: {
			}, 
		};
		self.img[0] = self.img_data.NORM;
		self.attack = {
			norm: [
				extend(SHOT_TEMPLATE, {
					ox: -10, 
					oy: -14, 
					r: 8, 
					dr: 6, 
					dx: 0, 
					dy: -1, 
					spd: 12, 
					color: COLOR.GRAY, 
					target: GROUP.ENEMY, 
				}), 
				extend(SHOT_TEMPLATE, {
					ox: 10, 
					oy: -14, 
					r: 8, 
					dr: 6, 
					dx: 0, 
					dy: -1, 
					spd: 12, 
					color: COLOR.GRAY, 
					target: GROUP.ENEMY, 
				}), 
				extend(SHOT_TEMPLATE, {
					ox: -16, 
					oy: -4, 
					r: 8, 
					dr: 6, 
					dx: -0.1, 
					dy: -1, 
					spd: 12, 
					color: COLOR.GRAY, 
					target: GROUP.ENEMY, 
				}), 
				extend(SHOT_TEMPLATE, {
					ox: 16, 
					oy: -4, 
					r: 8, 
					dr: 6, 
					dx: 0.1, 
					dy: -1, 
					spd: 12, 
					color: COLOR.GRAY, 
					target: GROUP.ENEMY, 
				}), 
			], 
		};
	}
	
	self.update = function (field)
	{
		var dx = 0, dy = 0;
		if (field.input[KEY.MOVE_LEFT])
		{
			dx--;
		}
		if (field.input[KEY.MOVE_UP])
		{
			dy--;
		}
		if (field.input[KEY.MOVE_RIGHT])
		{
			dx++;
		}
		if (field.input[KEY.MOVE_DOWN])
		{
			dy++;
		}
		self.move(field, dx, dy, self.spd);
		
		if (field.input[KEY.FIRE])
		{
			self.fire(field, self.attack.norm);
		}
	}
	
	self.init();
	
	return self;
}

