
level[1] = extend(LEVEL_TEMPLATE, {
	events: {
		start: [
			LEVEL_TALK({
				name: "彌兒", 
				text: [
					"真是個適合散步的好天氣。", 
					"說不定會遇上什麼好事呢？", 
				], 
			}), 
		], 
		win: [
			LEVEL_TALK({
			}), 
		], 
	}, 
});

enemy.purin = extend(ENEMY_TEMPLATE, {
	img: image.PURIN_BATTLE, 
	sx: 32, 
	sy: 0, 
	sw: 32, 
	sh: 32, 
	w: 32, 
	h: 32, 
	x: 250, 
	y: 80, 
	r: 20, 
	lvl_name: [
		"歡樂送、雷雷戳", 
		"獵奇圖大亂射", 
		"", 
		"", 
	], 
	shot: function (field, self)
	{
		switch (self.lvl)
		{
		case 0:
			switch (self.state)
			{
			case 0:
				self.acnt = 0;
				self.aang = 0;
				self.bcnt = 0;
				self.state = 1;
				break;
			case 1:
				if (self.acnt++ >= 48)
				{
					self.acnt = 0;
					var spd = 4;
					var r = 8;
					var dr = 6;
					self.fire(field, [
						extend(SHOT_TEMPLATE, {
							ox: 0, 
							oy: 0, 
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang), 
							dy: Math.cos(self.aang), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
						extend(SHOT_TEMPLATE, {
							ox: 0, 
							oy: 0, 
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang+Math.PI/2), 
							dy: Math.cos(self.aang+Math.PI/2), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
						extend(SHOT_TEMPLATE, {
							ox: 0, 
							oy: 0, 
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang+Math.PI), 
							dy: Math.cos(self.aang+Math.PI), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
						extend(SHOT_TEMPLATE, {
							ox: 0, 
							oy: 0, 
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang-Math.PI/2), 
							dy: Math.cos(self.aang-Math.PI/2), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
					]);
					self.aang += Math.PI / 6;
				}
				break;
			}
			break;
		}
	}, 
});

