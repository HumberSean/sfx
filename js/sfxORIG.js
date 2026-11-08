/**
 * SOUND BOARD APP FOR LIVE SOUND EFFECTS MATCHED TO SCRIPT TEXT.
 * SEAN DOYLE OCTOBER 2024
 *
 * TODO
 - turn off audio after fade out
 - add volume control to each sfx
 */

//Single episode variables
var episodeFX = null;
var episodeTXT = null;

//Set episode based on text in HTML file.
if (thisEpisode === "MERCYFLIGHT"){
	episodeFX = SFX_MERCYFLIGHT;
	episodeTXT = TEXT_MERCYFLIGHT;
} else if (thisEpisode === "BORNTOFLY") {
	episodeFX = SFX_BORNTOFLY;
	episodeTXT = TEXT_BORNTOFLY;
} else if (thisEpisode === "BADTHINGS") {
	episodeFX = SFX_BADTHINGS;
	episodeTXT = TEXT_BADTHINGS;
}


window.onload = function(){
	//HTML element variables
	const cueContainer = document.getElementById("cuelist");
	const volume = document.getElementById("volume__slider");
	
	//Logic variables
	var thisSfx = null;//Global variable for the active sound effect.
	var loadedAudio = 0;//Counter for loaded audio files.
	var fadeSoundFlag = null;//Interval loop variable.
	var fadeDuration = 3;//Fade out timer in seconds.
	var fractionsOfSecond = 5;//Fade out timer frequency in fractions of a second.
	
	
 //==== AUDIO CREATION & LOADING FUNCTIONS ====
 function createSFX(sfx){
	let newBlock = document.createElement('div');
	newBlock.setAttribute("class", "sfx_box");
	
	let newText = document.createElement('p');
	newText.setAttribute("class", "sfx_text");
	newText.innerText = episodeTXT[i];
	newBlock.appendChild(newText);
	
	cueContainer.appendChild(newBlock);
 }//END createSFX 
 
//COUNT LOADED AUDIO
function countAudio(){
 loadedAudio++;
 console.log(loadedAudio + " of " + episodeFX.length);
}
function countAudio2(){//this is the one running in the app.
 loadedAudio++;
 console.log(loadedAudio + " of " + episodeFX.length);
}
	 
 
//==== CREATE SFX TEXT AND AUDIO ELEMENTS AND CONTROLS ====
	for(let i = 0; i < episodeFX.length; i++){
		let newBlock = document.createElement('div');
		newBlock.setAttribute("class", "sfx_box");
		
		let newText = document.createElement('p');
		newText.setAttribute("class", "sfx_text");
		newText.innerText = episodeTXT[i];
		newBlock.appendChild(newText);
		
		//Play button		
		let btn_play = document.createElement('button');
		btn_play.setAttribute("class", "sfx_play");
		btn_play.innerText = "PLAY"
		
		//Stop button		
		let btn_stop = document.createElement('button');
		btn_stop.setAttribute("class", "sfx_stop");
		btn_stop.innerText = "STOP";
		
		//Fade out button
		let btn_fade = document.createElement('button');
		btn_fade.setAttribute("class", "sfx_fade");
		btn_fade.innerText = "FADE";
		
		let newSFX = document.createElement('audio');
		newSFX.setAttribute("preload", "auto");
		newSFX.setAttribute("src", "AUDIO/" + episodeFX[i]);
		btn_play.appendChild(newSFX);
		newBlock.appendChild(btn_play);
		newBlock.appendChild(btn_stop);
		newBlock.appendChild(btn_fade);
		
		cueContainer.appendChild(newBlock);
		btn_play.onclick = playSound;
		btn_stop.onclick = stopSound;
		btn_fade.onclick = fadeSound;
		newSFX.onload = countAudio;
		newSFX.oncanplaythrough = countAudio2;
		
		
	}//end for loop

//==== AUDIO CONTROL FUNCTIONS ====
	function playSound(e){
		//Get audio element.
		thisSfx = e.target.lastChild;
		//Get volume level.
		let vol = volume.value;
		
		//Play audio and style as played.
		thisSfx.volume = vol;
		thisSfx.play();
		e.target.classList = "sfx_play_done";
		e.target.disabled = true;
	}//END playSound
	
	function stopSound(e){
		let playingSFX = e.target.previousSibling.lastChild;		
		playingSFX.pause();
		e.target.classList = "sfx_play_done";
	}
	
	function fadeSound(e){
		e.target.classList = "sfx_play_done";
		let playingSFX = e.target.parentElement.children[1].lastChild;
		
		let numberOfTimesToRun = fadeDuration * fractionsOfSecond;

		let incrementor = 1 / numberOfTimesToRun;
		
		fadeSoundFlag = setInterval(function(){
			let newVolumeLevel = playingSFX.volume - incrementor;
			if(newVolumeLevel <= 0){
				playingSFX.volume = 0;
				clearInterval(fadeSoundFlag);
				fadeSoundFlag = null;
			} else {
				playingSFX.volume = newVolumeLevel.toFixed(3);
			}
		},1000/fractionsOfSecond);
	}//END fadeSound
	
	function adjustGain(){
		if (thisSfx !== null){
			thisSfx.volume = volume.value;
		}
	}//END adjustGain
	

	//--==== LISTENERS ====--
	volume.onchange = adjustGain;
};