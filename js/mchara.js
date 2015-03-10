
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
		self.zanki = 4;
		self.muteki = 0;
		self.mc = true;
		self.hide = false;
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
			self.moving = 0;
			if (field.input[KEY.MOVE_LEFT])
			{
				dx--;
				self.moving = -1;
			}
			if (field.input[KEY.MOVE_UP])
			{
				dy--;
			}
			if (field.input[KEY.MOVE_RIGHT])
			{
				dx++;
				self.moving = 1;
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
		self.update_mess(field);
		if (self.muteki > 0)
		{
			self.muteki--;
		}
	}
	
	self.update_mess = function (field)
	{
		if (self.mess)
		{
			if (self.mess_f < 1)
			{
				self.mess_f += UI.MIKATA.MESS_FSPD;
				if (self.mess_f > 1)
				{
					self.mess_f = 1;
				}
			}
			else if (self.mess_s > 0)
			{
				self.mess_s--;
			}
			else if (self.mess_a > 0)
			{
				self.mess_a -= UI.MIKATA.MESS_ASPD;
				if (self.mess_a < 0)
				{
					self.mess_a = 0;
				}
			}
			else
			{
				self.mess = null;
			}
		}
	}
	
	self.draw = function (field, g)
	{
		self.draw_chara(field, g);
		self.draw_message(field, g);
	}
	
	self.draw_chara = function (field, g)
	{
		if (!(self.muteki & 1) && !self.hide)
		{
			var img = self.img[0];
			g.drawImage(img.img, img.sx+32*self.moving, img.sy, img.sw, img.sh, self.x-img.ox, self.y-img.oy, self.w, self.h);
		}
	}
	
	self.draw_message = function (field, g)
	{
		if (self.mess)
		{
			g.font = UI.MIKATA.MESS_FONT;
			g.textAlign = "center";
			g.textBaseline = "middle";
			g.fillStyle = UI.MIKATA.MESS_COLOR;
			var temp = g.globalAlpha;
			g.globalAlpha = self.mess_a;
			var x = sqrt_f(UI.MIKATA.MESS_SX, UI.MIKATA.MESS_EX, self.mess_f);
			var y = sqrt_f(UI.MIKATA.MESS_SY, UI.MIKATA.MESS_EY, self.mess_f);
			g.fillText(self.mess, self.x+x, self.y+y);
			g.globalAlpha = temp;
		}
	}
	
	self.draw_zanki = function (field, g)
	{
		var x = UI.SUB.ZANKI_X + g.measureText(UI.SUB.ZANKI_TEXT).width;
		var y = UI.SUB.ZANKI_Y;
		for (var i=0; i<self.zanki; i++)
		{
			g.drawImage(image.MINYAN_BATTLE, 32, 0, 32, 32, x+i*32, y, 32, 32);
		}
	}
	
	self.show_mess = function (mess)
	{
		self.mess = mess;
		self.mess_f = 0;
		self.mess_s = UI.MIKATA.MESS_SFCNT;
		self.mess_a = 1;
	}
	
	self.die = function (field)
	{
		if (!self.is_muteki())
		{
			self.zanki--;
			if (self.zanki >= 0)
			{
				self.muteki = 128;
				self.show_mess(UI.MIKATA.MESS_DEAD);
			}
			else
			{
				self.hide = true;
				field.game_over();
			}
		}
	}
	
	self.is_muteki = function ()
	{
		return self.muteki > 0;
	}
	
	self.init();
	
	return self;
}

