/*************************************************************************************************
******************************************* VARIABLEN ´*******************************************
*************************************************************************************************/

const gesamterText = 'Es war einmal Bob, der kam in den Raum,\nEr sprach viel in Reimen, er hatte nen Traum.\nIch hab einen Traum, sprach Bob, der Träumer,\nund starb an einer seltenen Genkrankheit.'; // der Text, der am Ende dastehen soll
const textfeld = document.getElementById('textCanvas'); // der Bereich, in dem der Text erscheint
let textfeldBuffer = ''; // bisher im Textfeld dargestellter Text. Also "was ich bisher schon geschrieben habe". Muss nach jedem keystroke ins textfeld geladen werden 
let eingegebeneZeichen = 0; // zählt, wie oft bisher Tasten gedrückt wurden, um zu wissen, wie viele Buchstaben von textfeldBuffer da stehen müssen


/*************************************************************************************************
*************************************** AUSGEFÜHRTER CODE ´***************************************
*************************************************************************************************/

eingabeListenerHinzufügen(); // fügt einen Eventlistener hinzu, welcher die tastenpresses registriert (heißen keydown events)

function eingabeVerarbeiten(event){ // wird aufgerufen, wenn eine Taste gedrückt wird. abhängig vom keydown event (das argument), welcher den keyCode der gedrückten Taste speichert
	textBufferBearbeiten(event);
	textUpdaten();
}








/*************************************************************************************************
***************************** eingabeVerarbeiten() - HELPERFUNKTIONEN*****************************
*************************************************************************************************/
function textBufferBearbeiten(event){
	if(tasteIstBackspace(event)){
		textLöschen();		
	} else {
		textHinzufügen();
	}
}

function tasteIstBackspace(event){
	return event.keyCode===8;// keyCode ist eine für jede Taste spezifische Nummer (z.B. backspace = 8). Das hier checkt, ob die Taste, die gedrückt wurde backspace war oder nicht
}

function textLöschen(){
	if (textIstLöschbar()) { // ist noch Text da zum löschen? Wenn nein, tue nichts
			buchstabeLöschen();
			eingegebeneZeichenReduzieren();
	}
}

if (textIstLöschbar()) { // ist noch Text da zum löschen? Wenn nein, tue nichts
	buchstabeLöschen();
	eingegebeneZeichenReduzieren();
}

function textIstLöschbar(){
	return eingegebeneZeichen > 0;
}

function buchstabeLöschen(){
	textfeldBuffer = textfeldBuffer.substr(0, textfeldBuffer.length - 1);
}

function eingegebeneZeichenReduzieren(){
	eingegebeneZeichen--;
}

function textHinzufügen(){
	if (textÜbrig()) { // Ist der gesamte Text bereits abgebildet? Oder ist noch text übrig, den man hinten dran hängen kann? Ansonsten tue nichts
			const nächsterBuchstabe = nächstenBuchstabenFinden();
			buchstabeAnhängen(nächsterBuchstabe);
			eingegebeneZeichenErhöhen();
	}
}

function textÜbrig() {
	return (eingegebeneZeichen < gesamterText.length);
}

function nächstenBuchstabenFinden() {
	return gesamterText[eingegebeneZeichen];
}

function buchstabeAnhängen(buchstabe){
	textfeldBuffer += buchstabe;
}

function eingegebeneZeichenErhöhen(){
	eingegebeneZeichen++;
}

function textUpdaten(){
	textfeld.value = textfeldBuffer;
}


/*************************************************************************************************
************************** eingabeListenerHinzufügen() - HELPERFUNKTIONEN*************************
*************************************************************************************************/

function eingabeListenerHinzufügen(){
	document.addEventListener('keyup', eingabeVerarbeiten); //eingabeVerarbeiten); 
}