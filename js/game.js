
var image = {};
var audio = {};

var IMAGE = {
	MINYAN_BATTLE: "p/minyan.png", 
	PURIN_BATTLE: "p/purin.png", 
};
var AUDIO = {};

function is_preload_complete()
{
	return image.__cnt == image.__max_cnt && audio.__cnt == audio.__max_cnt;
}

var enemy = {};

var KEY = {
	LEFT: 37, 
	UP: 38, 
	RIGHT: 39, 
	DOWN: 40, 
	Z: 90, 
};

KEY.ACCEPT = {};
KEY.ACCEPT[KEY.MOVE_LEFT = KEY.LEFT] = true;
KEY.ACCEPT[KEY.MOVE_UP = KEY.UP] = true;
KEY.ACCEPT[KEY.MOVE_RIGHT = KEY.RIGHT] = true;
KEY.ACCEPT[KEY.MOVE_DOWN = KEY.DOWN] = true;
KEY.ACCEPT[KEY.FIRE = KEY.Z] = true;

var COLOR = {
	WHITE: "white", 
	GRAY: "#CCCCCC", 
	BLACK: "#000", 
	RED: "#FF0000", 
	GREEN: "#00FF00", 
	BLUE: "#0000FF", 
	TRANSPARENT: rgba(0, 0, 0, 0), 
};

COLOR.TEXT = COLOR.GRAY;

var UI = {
	DEFAULT_FONT: "DFKai-SB", 
};

UI.SCREEN = {
	WIDTH: 800, 
	HEIGHT: 600, 
};

UI.LOADING = {
	TEXT: "少女變身中", 
	TEXT_COLOR: COLOR.TEXT, 
	FONT: "60px "+UI.DEFAULT_FONT, 
	ANI_IN_FCNT: 24, 
	ANI_OUT_FCNT: 8, 
};

UI.SUB = {
	OFFSET_X: 500, 
	OFFSET_Y: 0, 
	WIDTH: 300, 
	HEIGHT: UI.SCREEN.HEIGHT, 
	BACKGROUND_COLOR: rgb(0x44, 0x44, 0xAA), 
};

UI.ENEMY = {
	LVL_NAME_FONT: "20px "+UI.DEFAULT_FONT, 
	HP_ANI_SPD: 0.01, 
};

