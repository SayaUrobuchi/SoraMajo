
var image = {};
var audio = {};

var IMAGE = {
	MINYAN_BATTLE: "p/minyan.png", 
};
var AUDIO = {};

function is_preload_complete()
{
	return image.__cnt == image.__max_cnt && audio.__cnt == audio.__max_cnt;
}

var COLOR = {
	WHITE: "white", 
	GRAY: "#CCCCCC", 
	BLACK: "#000", 
	TRANSPARENT: rgba(0, 0, 0, 0), 
};

COLOR.TEXT = COLOR.GRAY;

var UI = {
	DEFAULT_FONT: "DFKai-SB", 
};

UI.SCREEN = {
	WIDTH: 1000, 
	HEIGHT: 800, 
};

UI.LOADING = {
	TEXT: "少女變身中", 
	TEXT_COLOR: COLOR.TEXT, 
	FONT: "60px "+UI.DEFAULT_FONT, 
	ANI_IN_FCNT: 24, 
	ANI_OUT_FCNT: 8, 
};

