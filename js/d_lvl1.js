
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
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang), 
							dy: Math.cos(self.aang), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
						extend(SHOT_TEMPLATE, {
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang+Math.PI/2), 
							dy: Math.cos(self.aang+Math.PI/2), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
						extend(SHOT_TEMPLATE, {
							r: r, 
							dr: dr, 
							dx: Math.sin(self.aang+Math.PI), 
							dy: Math.cos(self.aang+Math.PI), 
							spd: spd, 
							color: COLOR.GRAY, 
							target: GROUP.MIKATA, 
						}), 
						extend(SHOT_TEMPLATE, {
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
				if (self.bcnt++ >= 170-(40*(1-self.real_hp_rate)))
				{
					self.bcnt = 0;
					var mc = field.get_mchara();
					if (is_def(mc))
					{
						var ang = self.angle_to(field.get_mchara());
						var offset = 12;
						var r = 8;
						var dr = 6;
						var spd = 4;
						var aspd = 0.25;
						var ang_shift = deg(5);
						var shot_ang = ang+ang_shift;
						for (var i=0; i<8; i++)
						{
							self.fire(field, [
								extend(SHOT_TEMPLATE, {
									ox: 12*Math.cos(shot_ang), 
									oy: 12*Math.sin(shot_ang), 
									r: r, 
									dr: dr, 
									dx: Math.cos(shot_ang), 
									dy: Math.sin(shot_ang), 
									spd: spd+aspd*i, 
									color: COLOR.GRAY, 
									target: GROUP.MIKATA, 
								}), 
							]);
						}
						shot_ang = ang-ang_shift;
						for (var i=0; i<8; i++)
						{
							self.fire(field, [
								extend(SHOT_TEMPLATE, {
									ox: 12*Math.cos(shot_ang), 
									oy: 12*Math.sin(shot_ang), 
									r: r, 
									dr: dr, 
									dx: Math.cos(shot_ang), 
									dy: Math.sin(shot_ang), 
									spd: spd+aspd*i, 
									color: COLOR.GRAY, 
									target: GROUP.MIKATA, 
								}), 
							]);
						}
						shot_ang = ang;
						aspd = 0.4;
						for (var i=0; i<8; i++)
						{
							self.fire(field, [
								extend(SHOT_TEMPLATE, {
									ox: 12*Math.cos(shot_ang), 
									oy: 12*Math.sin(shot_ang), 
									r: r, 
									dr: dr, 
									dx: Math.cos(shot_ang), 
									dy: Math.sin(shot_ang), 
									spd: spd+aspd*i, 
									color: COLOR.GRAY, 
									target: GROUP.MIKATA, 
								}), 
							]);
						}
					}
				}
				break;
			}
			break;
		}
	}, 
});

level[1] = extend(LEVEL_TEMPLATE, {
	events: {
		start: [
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"真是個適合散步的好天氣。", 
					"說不定會遇上什麼好事呢？", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_GOOD, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"啊─啊──無聊無聊無聊！", 
					"…嗯？這不是彌兒嗎？", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_NOTGOOD, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"來得正好！", 
					"喂、決鬥啦！！", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_LOL, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"…啊？為毛非跟你決鬥不可啊。", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_NOTGOOD, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"當然是太閒啦！", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_LOL, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"給我好好工作啊喂！", 
					"風紀的維持如何了？", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_ANGRY, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"糟得不能再糟。", 
					"沒人違法亂紀，也就沒人可殺。", 
					"簡直無聊透頂！", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_NOTGOOD, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"那不是很和平嗎！", 
					"天下太平萬萬歲啦！", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_SAD, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"大錯特錯！！", 
					"身為魔法少女、擁有一身魔力，", 
					"卻完全無用武之地！", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_NOTGOOD, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"沒有惡人可殺、", 
					"也就沒理由失手誤傷無辜、", 
					"沒理由順手破壞城鎮了啊！", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_NOTGOOD, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"你把風紀當成什麼了！？", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_ANGRY, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"合法殺手！（眼睛一亮", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_LOL, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"看來有必要再教育呢…", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_HAKI, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "丁丁", 
				text: [
					"哦哦，想動粗嗎？", 
					"那麼就算是女僕長，也只好痛下決心、", 
					"揮下風紀的制裁之拳啦！", 
				], 
				text_loc: STG_TALK.TEXT_BOT, 
				img: TACHIE.PURIN_LOL, 
				img_loc: STG_TALK.TACHIE_RIGHT, 
			}), 
			extend(LEVEL_TALK_TEMPLATE, {
				name: "彌兒", 
				text: [
					"可笑！", 
					"在穹之聖地，本王就是法律！", 
					"好吧，既然如此想死，", 
					"就先陪你玩玩，之後再好好『懲罰』！", 
				], 
				text_loc: STG_TALK.TEXT_TOP, 
				img: TACHIE.MINYAN_HAKI, 
				img_loc: STG_TALK.TACHIE_LEFT, 
			}), 
			extend(LEVEL_ENEMY_TEMPLATE, {
				enemy: enemy.purin, 
			}), 
		], 
		win: [
		], 
	}, 
});

