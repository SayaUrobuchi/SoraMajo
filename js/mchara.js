
var MCHAR_SHOT_TEMPLATE = extend(SHOT_TEMPLATE, {
	r: 4, 
	dr: 6, 
	spd: 12, 
	color: COLOR.GRAY, 
	out_color: COLOR.GREEN, 
	target: GROUP.ENEMY, 
});

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
		self.spd = 6;
		self.sspd = 2;
		self.r = 4;
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
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: -10, 
					oy: -14, 
					dx: 0, 
					dy: -1, 
				}), 
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: 10, 
					oy: -14, 
					dx: 0, 
					dy: -1, 
				}), 
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: -16, 
					oy: -4, 
					dx: -0.1, 
					dy: -1, 
				}), 
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: 16, 
					oy: -4, 
					dx: 0.1, 
					dy: -1, 
				}), 
			], 
			mode: [
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: -10, 
					oy: -14, 
					dx: 0, 
					dy: -1, 
				}), 
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: 10, 
					oy: -14, 
					dx: 0, 
					dy: -1, 
				}), 
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: -16, 
					oy: -4, 
					dx: -0.05, 
					dy: -1, 
				}), 
				extend(MCHAR_SHOT_TEMPLATE, {
					ox: 16, 
					oy: -4, 
					dx: 0.05, 
					dy: -1, 
				}), 
			], 
		};
	}
	
	self.update = function (field)
	{
		if (field.state == STG.BATTLE)
		{
			var dx = 0, dy = 0, spd = self.spd;
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
			if (field.input[KEY.MODE])
			{
				spd = self.sspd;
			}
			self.move(field, dx, dy, spd);
		
			if (field.input[KEY.FIRE])
			{
				var attack = self.attack.norm;
				if (field.input[KEY.MODE])
				{
					attack = self.attack.mode;
				}
				self.fire(field, attack);
			}
		}
	}
	
	self.init();
	
	return self;
}

