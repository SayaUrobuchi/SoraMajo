
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
	EVENT: 8, 
	DONE: 9, 
	ANI_IN: 32, 
	ANI_OUT: 33, 
	WAITING: 34, 
	END: 35, 
};

var STGEVENT = {
	TALK: 1, 
	ENEMY: 2, 
};

var STG_TALK = {
	TEXT_TOP: 0, 
	TEXT_BOT: 1, 
	TEXT_MID: 2, 
	TACHIE_LEFT: 0, 
	TACHIE_RIGHT: 1, 
	KEY_CD: 8, 
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
		
		self.stage = level[game.stg_stage];
		
		self.clear_input();
		self.clear_talk();
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
			self.state = STG.START;
			break;
		case STG.START:
			self.state = STG.EVENT;
			self.ss = STG.DONE;
			self.next_state = STG.BATTLE;
			self.event = self.stage.events.start;
			self.event_idx = 0;
			break;
		case STG.BATTLE:
			break;
		case STG.WIN:
			break;
		case STG.LOSE:
			break;
		case STG.EVENT:
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
		self.update_event(g);
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
								atk.hit(self, tar);
								tar.hit(self, atk);
							}
						}
					}
				}
			}
		}
	}
	
	self.update_event = function (g)
	{
		if (self.state != STG.EVENT)
		{
			return;
		}
		if (self.ss == STG.DONE)
		{
			if (!self.event || self.event_idx >= self.event.length)
			{
				self.state = self.next_state;
				self.ss = STG.READY;
				return;
			}
			self.cur_event = self.event[self.event_idx++];
			self.ss = STG.READY;
			self.clear_input();
		}
		switch (self.cur_event.type)
		{
		case STGEVENT.ENEMY:
			self.add_enemy(self.cur_event.enemy);
			self.ss = STG.DONE;
			break;
		case STGEVENT.TALK:
			if (self.ss == STG.READY)
			{
				self.set_talk(self.cur_event);
				self.ss = STG.WAITING;
			}
			if (self.ss == STG.WAITING)
			{
				self.update_talk(g);
			}
			break;
		}
	}
	
	self.update_talk = function (g)
	{
		var tachie = self.tachie[1-self.top_tachie];
		var x = (self.top_tachie == 0 ? UI.TALK.TACHIE_RIGHT_X : UI.TALK.TACHIE_LEFT_X);
		var y = UI.TALK.TACHIE_Y;
		if (tachie)
		{
			self.update_talk_tachie(g, tachie, x, y);
		}
		tachie = self.tachie[self.top_tachie];
		x = (self.top_tachie == 1 ? UI.TALK.TACHIE_RIGHT_X : UI.TALK.TACHIE_LEFT_X);
		if (tachie)
		{
			self.update_talk_tachie(g, tachie, x, y);
		}
		// top
		var talk = self.top_talk;
		if (talk)
		{
			self.update_talk_dialog(g, talk, UI.TALK.X, UI.TALK.TOP_Y, STG_TALK.TEXT_TOP);
		}
		// mid
		talk = self.mid_talk;
		if (talk)
		{
			self.update_talk_dialog(g, talk, UI.TALK.X, UI.TALK.MID_Y, STG_TALK.TEXT_MID);
		}
		// bot
		talk = self.bot_talk;
		if (talk)
		{
			self.update_talk_dialog(g, talk, UI.TALK.X, UI.TALK.BOT_Y, STG_TALK.TEXT_BOT);
		}
		// input handle
		if (self.input[KEY.FIRE] || self.input[KEY.BOMB])
		{
			self.ss = STG.DONE;
		}
	}
	
	self.update_talk_tachie = function (g, t, x, y)
	{
		g.drawImage(t.img, x-t.w/2, y-t.h/2);
	}
	
	self.update_talk_dialog = function (g, t, x, y, loc)
	{
		g.translate(x, y);
		g.beginPath();
		/*
		 10--------20
		01          31
		|            |
		02          32
		 13----+ --23
			   |/
		*/
		var x0 = 0, x1 = UI.TALK.CORN_SIZE, x2 = UI.TALK.WIDTH+UI.TALK.CORN_SIZE, x3 = x2+UI.TALK.CORN_SIZE;
		var y0 = 0, y1 = UI.TALK.CORN_SIZE, y2 = UI.TALK.HEIGHT+UI.TALK.CORN_SIZE, y3 = y2+UI.TALK.CORN_SIZE;
		g.moveTo(x1, y0);
		if (loc == STG_TALK.TEXT_BOT)
		{
			g.lineTo(UI.TALK.FROM_X0, y0);
			g.lineTo(UI.TALK.FROM_X0+UI.TALK.FROM_OX, y0-UI.TALK.FROM_OY);
			g.lineTo(UI.TALK.FROM_X1, y0);
		}
		g.lineTo(x2, y0);
		g.arcTo(x3, y0, x3, y1, UI.TALK.CORN_SIZE);
		g.lineTo(x3, y2);
		g.arcTo(x3, y3, x2, y3, UI.TALK.CORN_SIZE);
		if (loc == STG_TALK.TEXT_TOP)
		{
			g.lineTo(UI.TALK.FROM_X1, y3);
			g.lineTo(UI.TALK.FROM_X1-UI.TALK.FROM_OX, y3+UI.TALK.FROM_OY);
			g.lineTo(UI.TALK.FROM_X0, y3);
		}
		g.lineTo(x1, y3);
		g.arcTo(x0, y3, x0, y2, UI.TALK.CORN_SIZE);
		g.lineTo(x0, y1);
		g.arcTo(x0, y0, x1, y0, UI.TALK.CORN_SIZE);
		if (self.dialog_top == loc)
		{
			g.fillStyle = COLOR.TALK_BACK;
		}
		else
		{
			g.fillStyle = COLOR.TALK_BACK_INACTIVE;
		}
		g.fill();
		g.strokeStyle = COLOR.GREEN;
		g.stroke();
		g.font = UI.TALK.FONT;
		g.textAlign = "left";
		if (t.name)
		{
			g.fillStyle = COLOR.TEXT;
			g.fillText(t.name, UI.TALK.NAME_X, UI.TALK.NAME_Y);
		}
		var text = t.text;
		for (var i=0; i<text.length; i++)
		{
			g.fillText(text[i], UI.TALK.TEXT_X, UI.TALK.TEXT_Y+UI.TALK.TEXT_HEIGHT*i);
		}
		g.translate(-x, -y);
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
	
	self.set_talk = function (data)
	{
		self.talk_data = data;
		if (data.text)
		{
			if (data.text_loc == STG_TALK.TEXT_TOP)
			{
				self.top_talk = data;
				self.dialog_top = STG_TALK.TEXT_TOP;
			}
			else if (data.text_loc == STG_TALK.TEXT_MID)
			{
				self.mid_talk = data;
				self.dialog_top = STG_TALK.TEXT_MID;
			}
			else
			{
				self.bot_talk = data;
				self.dialog_top = STG_TALK.TEXT_BOT;
			}
		}
		if (data.img)
		{
			if (data.img_loc == STG_TALK.TACHIE_LEFT)
			{
				self.top_tachie = STG_TALK.TACHIE_LEFT;
			}
			else
			{
				self.top_tachie = STG_TALK.TACHIE_RIGHT;
			}
			self.tachie[self.top_tachie] = data.img;
		}
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
				if (key == KEY.FIRE)
				{
					self.input[key] = true;
				}
				else if (key == KEY.BOMB)
				{
					self.input[key] = false;
				}
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
				if (key == KEY.BOMB)
				{
					self.input[key] = true;
				}
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
	
	self.clear_talk = function ()
	{
		self.tachie = [];
		self.top_tachie = 0;
		self.top_talk = null;
		self.mid_talk = null;
		self.bot_talk = null;
	}
	
	self.init();
	
	return self;
}
