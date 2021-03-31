//MMP PHONE RAVE COLOURS

setInterval(() => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16); //random hex colour value

    let randomColorHash = `#${randomColor}` //adding a # to randomcolor

    document.getElementById("textphone").style.textShadow = `
    3px 4px 1px ${randomColorHash},
    3px 6px 1px ${randomColorHash},
    4px 8px 1px ${randomColorHash},
    4px 10px 1px ${randomColorHash},
    5px 12px 1px ${randomColorHash},
    5px 14px 1px ${randomColorHash}`;

    //console.log(randomColor);

}, 50);

setInterval(() => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16); //random hex colour value

    let randomColorHash = `#${randomColor}`

    document.getElementById("textphone").style.color = randomColorHash;

    //console.log(randomColor);

}, 200);


//PHONE SOUNDS

const pickup_phone = document.getElementById('pickup');
const putdown_phone = document.getElementById('putdown');
const ring_phone = document.getElementById('ring');



//DRAGGING PHONE HANDLE

function dragElement(draggableElement){
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

        draggableElement.onpointerdown = pointerDrag;
        
        function pointerDrag(e) {
            e.preventDefault();
            console.log(e);
            
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
            document.onpointerup = null;
            document.onpointermove = null;

            putdown_phone.play();

            document.getElementById("blare").style.opacity = 0;

            document.getElementById("handle__container").style.transform = 'rotate(0deg)';
        }

        function elementClick(){

            pickup_phone.play();

            document.getElementById("blare").style.opacity = 1;

            document.getElementById("handle__container").style.transform = 'rotate(90deg)';
        }

}

dragElement(document.getElementById('handle__container'));

//todo: reset phone so it resets positon to origin
//pickup and putdown sounds