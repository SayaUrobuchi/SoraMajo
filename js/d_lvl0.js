
var level = {};

var LEVEL_TEMPLATE = {
};

var LEVEL_EVENT_TEMPLATE = {
};

var LEVEL_TALK_TEMPLATE = extend(LEVEL_EVENT_TEMPLATE, {
	type: STGEVENT.TALK, 
	text_loc: STG_TALK.TEXT_MID, 
});

var LEVEL_ENEMY_TEMPLATE = extend(LEVEL_EVENT_TEMPLATE, {
	type: STGEVENT.ENEMY, 
});

var LEVEL_NEXT_TEMPLATE = extend(LEVEL_EVENT_TEMPLATE, {
	type: STGEVENT.NEXT, 
});

var TACHIE_TEMPLATE = {
};

var TACHIE = {
	MINYAN_GOOD: extend(TACHIE_TEMPLATE, {
		img: image.MINYAN_GOOD, 
		w: 352, 
		h: 415, 
	}), 
	MINYAN_NOTGOOD: extend(TACHIE_TEMPLATE, {
		img: image.MINYAN_NOTGOOD, 
		w: 352, 
		h: 415, 
	}), 
	MINYAN_ANGRY: extend(TACHIE_TEMPLATE, {
		img: image.MINYAN_ANGRY, 
		w: 352, 
		h: 415, 
	}), 
	MINYAN_SAD: extend(TACHIE_TEMPLATE, {
		img: image.MINYAN_SAD, 
		w: 352, 
		h: 415, 
	}), 
	MINYAN_HAKI: extend(TACHIE_TEMPLATE, {
		img: image.MINYAN_HAKI, 
		w: 352, 
		h: 415, 
	}), 
	PURIN_LOL: extend(TACHIE_TEMPLATE, {
		img: image.PURIN_LOL, 
		w: 352, 
		h: 415, 
	}), 
	PURIN_NOTGOOD: extend(TACHIE_TEMPLATE, {
		img: image.PURIN_NOTGOOD, 
		w: 352, 
		h: 415, 
	}), 
	SHOKUSYU_GOOD: extend(TACHIE_TEMPLATE, {
		img: image.SHOKUSYU_GOOD, 
		w: 352, 
		h: 415, 
	}), 
};

