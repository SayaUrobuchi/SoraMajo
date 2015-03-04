
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
	y: 50, 
	r: 20, 
});

