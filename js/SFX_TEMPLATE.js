//Ep. ## FULL TITLE OF EPISODE 
/*
1. Save copy of this file.
2. Rename array. It must match the variable set on the HTML page and be uppercase.
3. Rename audio files with shortcode prefix.
4. Get text list of files with...
Select all files.
Shift + Right-click > Copy as path.
Paste into the array below.
Use regex to remove file path.
OR use cmd.exe to create a text file with list of files:		dir /b > AAA-filelist.txt
5. Use regex to add "", to each line...
Find		^(.*)$
Replace 	"$1",	one line at at time through text lines (not the whole file).
6. Remove comma from last text item.
7. Add audio files to AUDIO folder.
*/

var SFX_BORNTOFLY = [
"b2f_00-BottleFactory.wav",
"b2f_00-FactoryWhistle.wav",
"b2f_00-FactoryWhistle.wav",
"b2f_06-EngineStart.wav",
"b2f_07-08Taxi-Flight.wav",
"b2f_09-Turn.wav",
"b2f_10-11-13Sputter-FreeFall-Wind.wav",
"b2f_12-RestartEngineFail.wav",
"b2f_12-RestartEngineFail.wav",
"b2f_14-BumpyLand.wav",
"b2f_15-RadioOn-Tuning.wav",
"b2f_17-AirportAmbience.wav",
"b2f_19-StreetSounds.wav",
"b2f_21-CarPullsUp.wav",
"b2f_22-CarHorn-DrivesOff.wav"
];