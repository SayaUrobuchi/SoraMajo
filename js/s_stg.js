
var GROUP = {
};

GROUP.LIST = [
	GROUP.MIKATA = 0, 
	GROUP.ENEMY = 1, 
];

var STG = {
	NONE: -1, 
	LOADING: 0, 
	READY: 1, 
	START: 2, 
	BATTLE: 3, 
	WAIT_EVENT: 8, 
	ANI_IN: 32, 
	ANI_OUT: 33, 
	WAITING: 34, 
	END: 35, 
};

function STGScene()
{
	var self = Scene();
	
	self.init = function ()
	{
		self.state = STG.NONE;
		self.range_x = 500;
		self.range_y = canvas.height;
	
		self.attack_list = [];
		self.group_list = [];
		for (var i=0; i<GROUP.LIST.length; i++)
		{
			self.group_list[GROUP.LIST[i]] = [];
			self.attack_list[GROUP.LIST[i]] = [];
		}
		
		var mc = MainChara();
		mc.x = self.range_x / 2;
		mc.y = self.range_y - 80;
		self.group_list[GROUP.MIKATA].push(mc);
		
		self.clear_input();
	}
	
	self.deinit = function ()
	{
	}
	
	self.update = function (g)
	{
		switch (self.state)
		{
		case STG.NONE:
			if (!is_preload_complete())
			{
				self.state = STG.LOADING;
				self.ss = STG.READY;
			}
			else
			{
				self.state = STG.READY;
			}
			break;
		case STG.READY:
			self.state = STG.BATTLE;
			self.add_enemy(enemy.purin);
			break;
		case STG.START:
			break;
		case STG.BATTLE:
			break;
		case STG.WIN:
			break;
		case STG.LOSE:
			break;
		}
		self.update_loading(g);
		self.update_main(g);
		self.update_sub(g);
	}
	
	self.update_loading = function (g)
	{
		if (self.state != STG.LOADING)
		{
			return;
		}
		switch (self.ss)
		{
		case STG.READY:
			self.ss = STG.ANI_IN;
			self.l_fcnt = 0;
			break;
		case STG.ANI_IN:
			self.l_fcnt++;
			g.font = UI.LOADING.FONT;
			g.textAlign = "center";
			var text_width = g.measureText(UI.LOADING.TEXT).width;
			var color_width = pow2(0, text_width*20, self.l_fcnt/UI.LOADING.ANI_IN_FCNT);
			var color = g.createLinearGradient(0, 0, color_width, 0);
			color.addColorStop(0, UI.LOADING.TEXT_COLOR);
			color.addColorStop(1, COLOR.TRANSPARENT);
			g.fillStyle = color;
			g.fillText(UI.LOADING.TEXT, canvas.width/2, canvas.height/2);
			if (self.l_fcnt >= UI.LOADING.ANI_IN_FCNT)
			{
				self.ss = STG.WAITING;
			}
			break;
		case STG.WAITING:
			g.font = UI.LOADING.FONT;
			g.textAlign = "center";
			g.fillStyle = UI.LOADING.TEXT_COLOR;
			g.fillText(UI.LOADING.TEXT, canvas.width/2, canvas.height/2);
			if (is_preload_complete())
			{
				self.ss = STG.ANI_OUT;
				self.l_fcnt = 0;
			}
			break;
		case STG.ANI_OUT:
			self.l_fcnt++;
			g.font = UI.LOADING.FONT;
			g.textAlign = "center";
			g.fillStyle = UI.LOADING.TEXT_COLOR;
			var temp = g.globalAlpha;
			g.globalAlpha = 1 - (self.l_fcnt/UI.LOADING.ANI_OUT_FCNT);
			g.fillText(UI.LOADING.TEXT, canvas.width/2, canvas.height/2);
			g.globalAlpha = temp;
			if (self.l_fcnt >= UI.LOADING.ANI_OUT_FCNT)
			{
				self.ss = STG.END;
			}
			break;
		case STG.END:
			self.state = STG.READY;
			break;
		}
	}
	
	self.update_main = function (g)
	{
		if (self.state <= STG.LOADING)
		{
			return;
		}
		self.update_background(g);
		self.update_attack(g);
	}
	
	self.update_background = function (g)
	{
	}
	
	self.update_attack = function (g)
	{
		for (var i=0; i<self.attack_list.length; i++)
		{
			var attack_list = self.attack_list[i];
			var group_list = self.group_list[i];
			var ll = [attack_list, group_list];
			for (var k=0; k<ll.length; k++)
			{
				var l = ll[k];
				var cnt = 0;
				for (var j=0; j<l.length; j++)
				{
					if (l[j].is_disappear(self))
					{
						cnt++;
					}
					else
					{
						l[j].update(self);
						l[j].draw(self, g);
					}
				}
				if (cnt >= l.length / 2)
				{
					var a = [];
					for (var p=0, q=0; p<l.length; p++)
					{
						if (!l[p].is_disappear(self))
						{
							l[q++] = l[p];
						}
					}
					l.length = q;
				}
			}
			for (var k=0; k<group_list.length; k++)
			{
				var tar = group_list[k];
				if (!tar.is_disappear(self))
				{
					for (var j=0; j<attack_list.length; j++)
					{
						var atk = attack_list[j];
						if (!atk.is_disappear(self))
						{
							if (is_collide(atk.get_collider(), tar.get_collider()))
							{
								atk .hit(self, tar);
								tar.hit(self, atk);
							}
						}
					}
				}
			}
		}
	}
	
	self.update_sub = function (g)
	{
		g.translate(UI.SUB.OFFSET_X, UI.SUB.OFFSET_Y);
		self.update_sub_background(g);
		g.translate(-UI.SUB.OFFSET_X, -UI.SUB.OFFSET_Y);
	}
	
	self.update_sub_background = function (g)
	{
		g.fillStyle = UI.SUB.BACKGROUND_COLOR;
		g.fillRect(0, 0, UI.SUB.WIDTH, UI.SUB.HEIGHT);
	}
	
	self.add_attack = function (shot, target)
	{
		self.attack_list[target].push(shot);
	}
	
	self.add_enemy = function (data)
	{
		var e = Enemy(enemy.purin);
		self.group_list[GROUP.ENEMY].push(e);
		self.attack_list[GROUP.MIKATA].push(e);
	}
	
	self.get_mchara = function ()
	{
		return self.group_list[GROUP.MIKATA][0];
	}
	
	self.keyup = function (e)
	{
		var key = e.which || e.keyCode;
		if (KEY.ACCEPT[key])
		{
			switch (self.state)
			{
			case STG.EVENT:
				break;
			default:
				self.input[key] = false;
				break;
			}
			return false;
		}
		return true;
	}
	
	self.keydown = function (e)
	{
		var key = e.which || e.keyCode;
		if (KEY.ACCEPT[key])
		{
			switch (self.state)
			{
			case STG.EVENT:
				break;
			default:
				self.input[key] = true;
				break;
			}
			return false;
		}
		return true;
	}
	
	self.clear_input = function ()
	{
		self.input = {};
	}
	
	self.init();
	
	return self;
}
