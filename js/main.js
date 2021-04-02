//MMP PHONE RAVE COLOURS

setInterval(() => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16); //random hex colour value

    let randomColorHash = `#${randomColor}` //adding a # to randomcolor

    document.getElementById("textphone").style.textShadow = `
    3px 4px 2px ${randomColorHash},
    3px 6px 2px ${randomColorHash},
    4px 8px 2px ${randomColorHash},
    4px 10px 2px ${randomColorHash},
    5px 12px 2px ${randomColorHash},
    5px 14px 2px ${randomColorHash}`;

    //console.log(randomColor);

}, 50);

setInterval(() => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16); //random hex colour value

    let randomColorHash = `#${randomColor}`

    document.getElementById("textphone").style.color = randomColorHash;

    //console.log(randomColor);

}, 200);

//PHONE SOUNDS + GIFS

const pickup_phone = document.getElementById('pickup');
const putdown_phone = document.getElementById('putdown');
const ring_phone = document.getElementById('ring');
const tone_phone = document.getElementById('tone');

const deterrentSound = document.getElementById('deterrent');

const detSounds = [
    'audio/det1.mp3',
    'audio/det2.mp3',
    'audio/det3.mp3'
]

const detGifs = [
    'images/det1.gif',
    'images/det2.gif',
    'images/det3.gif'
];



//GAME LOGIC

let holdingPhone;

const phoneAudioEnum = {
    ABSOLUTE: 'absolute',
    RANDOM: 'random'
}

const phoneAudioLogic = [
    {
        mode: phoneAudioEnum.ABSOLUTE,
        value: pickup_phone,
    },

    {
        mode: phoneAudioEnum.ABSOLUTE,
        value: tone_phone,
    },

    {
        mode: phoneAudioEnum.RANDOM,
        value: detSounds,
    }

]






//DRAGGING PHONE HANDLE

function dragElement(draggableElement){
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    draggableElement.onpointerdown = pointerDrag;

    
        
        function pointerDrag(e) {
            e.preventDefault();
            //console.log(e);
            
            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onpointermove = elementDrag;
            document.onpointerup = stopElementDrag;
            document.onpointerdown = elementClick;
        }

        function elementDrag(e) {
            
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;

            pos3 = e.clientX;
            pos4 = e.clientY;

            //console.log(pos1, pos2, pos3, pos4);
            
            draggableElement.style.top = draggableElement.offsetTop - pos2 + 'px';
            draggableElement.style.left = draggableElement.offsetLeft - pos1 + 'px';
        }

        function stopElementDrag() {

            holdingPhone = false;

            document.onpointerup = null;
            document.onpointermove = null;

            draggableElement.style.top = 0; // resets back to original position
            draggableElement.style.left = 0;

            document.getElementById("blare").style.opacity = 0;

            document.getElementById("handle__container").style.transform = 'rotate(0deg)';


            putdown_phone.play()
            tone_phone.muted = false;


        }

        function elementClick(){

            holdingPhone = true;

            pickupPhoneDuration = pickup_phone.duration*1000;

            pickup_phone.play();

            setTimeout(() => {
                tone_phone.play()
            }, pickupPhoneDuration);




            tone_phone.currentTime = 0;
            tone_phone.muted = true;

            interactCounter++;
            console.log(`Times interacted with handle within a second: ${interactCounter}`);


            function Deterrent(){

                //choosing a random deterrent sound
                let randSoundNum = Math.floor(Math.random() * detSounds.length);

                deterrentSound.src = detSounds[randSoundNum];

                console.log(`This is the random sound number: ${randSoundNum}`);

                let deterrentSoundLength = undefined;

                deterrentSound.onloadedmetadata = function(){
                    console.log(deterrentSound.duration*1000);

                }


                console.log(deterrentSoundLength);

                deterrentSound.play();

                //choosing a random gif
                let randGifNum = Math.floor(Math.random() * detGifs.length);

                document.getElementById("gif").src = detGifs[randGifNum];

                console.log(`This is the random gif number: ${randGifNum}`);

                //showing the gif
                document.getElementById("gif__container").style.display = "block";

                document.getElementById("handle__container").style.display = "none";

                //hiding gif again after a time
                setTimeout(() => {
                    document.getElementById("gif__container").style.display = "none";
                    document.getElementById("handle__container").style.display = "block";
                }, 9000); //deterrentSoundLength is meant to be here

                //whtstht[Math.round(Math.random()*16)].play(); // play random sound from array no 0 to 16
            }

            if(interactCounter > 6){

                interactCounter = 0;

                console.log('Deterrent function condition met');

                Deterrent();

            }
            else if(interactCounter > 0){
                setTimeout(() => {

                    //ring_phone.play();
                    console.log('the phone rings');

                }, 3000);
            }

            document.getElementById("blare").style.opacity = 1;

            document.getElementById("handle__container").style.transform = 'rotate(90deg)';
        }

}

dragElement(document.getElementById('handle__container'));

//add earrape scary cancer if you click too many times at the phone

let interactCounter = 0;

setInterval(() => {
    console.log('1 second has elapsed, interactCounter reset');
    interactCounter = 0;
  }, 1000);


//GAME LOGIC (UPDATE)
let currentAudioPath = false;

function playAudioPath(audioPath){

    audioPath.forEach((path, i) => {
        
    });

}

setInterval(() => {

    if(holdingPhone && !currentAudioPath){
        currentAudioPath = phoneAudioLogic;
    }



}, 10);