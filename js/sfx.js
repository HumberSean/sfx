/**
 * SOUND BOARD APP FOR LIVE SOUND EFFECTS MATCHED TO SCRIPT TEXT.
 * SEAN DOYLE V2.0 NOVEMBER 2026
 *
 * TODO
 - add countdown timer for each track
 - add save/retrieve functionality
 - add algorithmic fades https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime

V 2.0 NOVEMBER 2026
Add WILLIAM GEORGE BARKER- The Will to Win a War.

V 1.5 MAY 2026
Add music page for Victoria, BC show.
 
V 1 OCTOBER 2024
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
} else if (thisEpisode === "BARKER") {
	episodeFX = SFX_BARKER;
	episodeTXT = TEXT_BARKER;
}

// class Volumebar extends HTMLElement {
// 	constructor(){
// 		super();
// 		let template = document.getElementById("volumeTemplate");
// 		let templateContent = template.content;
// 		const shadowRoot = this.attachShadow({mode:'open'}).appendChild(templateContent.cloneNode(true));
// 	}
// }
// customElements.define('volume-bar', Volumebar);
window.onload = function(){
	//HTML element variables
	const cueContainer = document.getElementById("cuelist");
	var btnSave = document.getElementById("buttons__save");
	var btnGet = document.getElementById("buttons__get");
	var btnClear = document.getElementById("buttons__clear");
	
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
function countAudio(){//this is the one running in the app.
 loadedAudio++;
 //console.log(loadedAudio + " of " + episodeFX.length);
}

//==== CREATE SFX TEXT, AUDIO ELEMENTS AND CONTROLS ====
	for(let i = 0; i < episodeFX.length; i++){
		//CONTAINER div
		let newBlock = document.createElement('div');
		newBlock.setAttribute("class", "sfx_box");
		//TEXT P
		let newText = document.createElement('p');
		newText.setAttribute("class", "sfx_text");
		newText.innerText = episodeTXT[i];
		newBlock.appendChild(newText);
		//CONTROLS P
		let newControls =  document.createElement('p');
		newControls.setAttribute("class", "sfx_controls");
		
		//INPUT SLIDER
		let volCtrl = document.createElement("input"); 
		volCtrl.setAttribute("type", "range");
		volCtrl.setAttribute("min", "0");
		volCtrl.setAttribute("max", "1");
		volCtrl.setAttribute("value", "1");
		volCtrl.setAttribute("step", "0.1");
		newControls.appendChild(volCtrl);

//newControls.innerHTML += "<volume-bar></volume-bar>";
//newControls.appendChild(testControls);
		newControls.innerHTML += "<div class='controls__labels'><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div>";
				
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

		newBlock.appendChild(newControls);
		newBlock.appendChild(btn_play);
		newBlock.appendChild(btn_stop);
		newBlock.appendChild(btn_fade);		
		cueContainer.appendChild(newBlock);

		//Set listeners
		btn_play.onclick = playSound;
		btn_stop.onclick = stopSound;
		btn_fade.onclick = fadeSound;

		newSFX.oncanplaythrough = countAudio;		
	}//end for loop

//==== AUDIO CONTROL FUNCTIONS ====
	function playSound(e){
		//Get audio element and volume control 
		thisSfx = e.target.lastChild;
		let thisVolCtrl = e.target.previousSibling.firstChild;
		
		//Set volume level and play audio, then style button as played.
		thisSfx.volume = thisVolCtrl.value;
		thisSfx.play();
		e.target.classList = "sfx_play_done";
		e.target.disabled = true;
		thisSfx = null;
	}//END playSound
	
	function stopSound(e){
		let playingSFX = e.target.previousSibling.lastChild;		
		playingSFX.pause();
		e.target.classList = "sfx_play_done";
	}//END stopSound
	
	function fadeSound(e){
		let playingSFX = e.target.parentElement.children[2].lastChild;		
		let numberOfTimesToRun = fadeDuration * fractionsOfSecond;
		let incrementor = 1 / numberOfTimesToRun;
		
		fadeSoundFlag = setInterval(function(){
			let newVolumeLevel = playingSFX.volume - incrementor;
			if(newVolumeLevel <= 0){
				playingSFX.volume = 0;
				playingSFX.pause();
				clearInterval(fadeSoundFlag);
				fadeSoundFlag = null;
			} else {
				playingSFX.volume = newVolumeLevel.toFixed(3);
			}
		},1000/fractionsOfSecond);
		e.target.classList = "sfx_play_done";
	}//END fadeSound

	//--==== SETTINGS FUNCTIONS ====--
	function saveSettings(){
		//create array of volume levels
		let settings = [];
		let allSliders = document.querySelectorAll('input');
		for (let i = 0; i < allSliders.length; i++) {
			settings.push(allSliders[i].value);
		}
		//stringify array
		let settingsString = settings.join("#");
		//Save to localStorage
		localStorage.setItem(thisEpisode + "_Settings", settingsString);
		alert("All settings saved.");
	}//END saveSettings

	function loadSettings(){
		if(localStorage.getItem(thisEpisode + "_Settings") !== null){
			let savedSettings = localStorage.getItem(thisEpisode + "_Settings");
			let settingsArray = savedSettings.split("#");
			let allSliders = document.querySelectorAll('input');
			for (let i = 0; i < allSliders.length; i++) {
				allSliders[i].value = settingsArray[i];
			}
			alert("Saved settings reloaded.");
		}
	}//END loadSettings

	function clearSettings(){
		let userConfirm = confirm("Are you certain you want to delete all saved settings for all 3 plays?");
		if(userConfirm === true){
			localStorage.clear();
			alert("All setting deleted.");
		}
		
	}//END clearSettings
	

	//--==== LISTENERS ====--
	document.addEventListener('input', function(e){
		if (e.target.matches('input[type="range"]')){
			let playingSFX = e.target.parentElement.parentElement.children[2].lastChild;
			let thisVolCtrl = e.target;
			playingSFX.volume = thisVolCtrl.value;
		}
	});
	btnSave.onclick = saveSettings;
	btnGet.onclick = loadSettings;
	btnClear.onclick = clearSettings;
};