
var GROUP = {
};

GROUP.LIST = [
	GROUP.MIKATA = 0, 
	GROUP.ENEMY = 1, 
];

var STG = {
	READY: 0, 
	LOADING: 1, 
	ANI_IN: 2, 
	ANI_OUT: 3, 
	WAITING: 4, 
	END: 5, 
};

function STGScene()
{
	var self = Scene();
	
	self.init = function ()
	{
		self.state = STG.READY;
		self.range_x = 600;
		self.range_y = canvas.height;
	
		self.group_list = [];
		for (var i=0; i<GROUP.LIST.length; i++)
		{
			self.group_list[GROUP.LIST[i]] = [];
		}
		
		self.mchara = [MainChara()];
		self.mchara[0].x = self.range_x / 2;
		self.mchara[0].y = self.range_y - 80;
	}
	
	self.deinit = function ()
	{
	}
	
	self.update = function (g)
	{
		if (!is_preload_complete())
		{
			if (self.state != STG.LOADING)
			{
				self.state = STG.LOADING;
				self.ss = STG.READY;
			}
			self.update_loading(g);
			return;
		}
		self.update_main(g);
		self.update_sub(g);
	}
	
	self.update_loading = function (g)
	{
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
		self.update_background(g);
		// 自機
		self.update_mchara(g);
	}
	
	self.update_background = function (g)
	{
	}
	
	self.update_mchara = function (g)
	{
		for (var i=0; i<self.mchara.length; i++)
		{
			var mc = self.mchara[i];
			mc.update(self);
			mc.draw(self, g);
		}
	}
	
	self.update_sub = function (g)
	{
	}
	
	self.keyup = function (e)
	{
	}
	
	self.keydown = function (e)
	{
	}
	
	self.init();
	
	return self;
}
