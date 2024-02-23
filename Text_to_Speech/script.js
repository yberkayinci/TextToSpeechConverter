const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});

document.querySelector("textarea").addEventListener('input', function () {
    const textArea = this.value;
    const charCount = textArea.length;
    const wordCount = textArea.trim().split(/\s+/).filter(function (item) {
        return item.length > 0;
    }).length;

    // Kelime ve karakter sayısını gösterecek elementleri burada belirtin
    document.getElementById("wordCount").textContent = `Words: ${wordCount}`;
    document.getElementById("charCount").textContent = `Characters: ${charCount}`;
});
const rateSlider = document.getElementById('rate');

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    utterance.rate = rateSlider.value; // Konuşma hızını kaydırıcıdan al
    synth.speak(utterance);
}

rateSlider.addEventListener('change', () => {
    if (synth.speaking) {
        // Konuşma sırasında hızı değiştirmek için durdurup tekrar başlat
        synth.cancel();
        textToSpeech(textarea.value);
    }
});
