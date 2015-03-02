
var scene;
var screen;

function preload()
{
	var cnt = 0;
	for (var key in IMAGE)
	{
		cnt++;
		if (!image[key])
		{
			var img = new Image();
			img.addEventListener("load", preload_image_callback, true);
			img.src = IMAGE[key];
			image[key] = img;
		}
	}
	image.__max_cnt = cnt;
	
	cnt = 0;
	for (var key in AUDIO)
	{
		cnt++;
		if (!audio[key])
		{
			var sound = new Audio();
			sound.addEventListener("canplaythrough", preload_audio_callback, true);
			sound.preload = 'auto';
			sound.src = AUDIO[key];
			audio[key] = sound;
		}
	}
	audio.__max_cnt = cnt;
}

function preload_image_callback()
{
	image.__cnt++;
}

function preload_audio_callback()
{
	audio.__cnt++;
}

function keydown(e)
{
	return scene.keydown(e);
}

function keyup(e)
{
	return scene.keyup(e);
}

function init()
{
	scene = SceneManager();
	
	var canvas = document.getElementById("canvas");
	screen = canvas.getContext("2d");
	
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
}

function update()
{
	for (var i=0; i<scene.length; i++)
	{
		scene.update(screen);
	}
}

function main()
{
	init();
	scene.push(STGScene());
	setInterval(update, 30);
}

window.onload = main;
preload();
