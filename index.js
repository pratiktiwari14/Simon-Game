// adding sound on click.
var noOfDrumButtons= document.querySelectorAll(".panel").length;
for(var i=0;i<noOfDrumButtons; i++){

    document.querySelectorAll(".panel")[i].addEventListener("click",function(){

      var audio= new Audio("sounds/beep-02.mp3");
      audio.play();

    });
}



const topLeft=document.querySelector('.top-left-panel');
const topRight=document.querySelector('.top-right-panel');
const bottomLeft=document.querySelector('.bottom-left-panel');
const bottomRight=document.querySelector('.bottom-right-panel');

const getRandomPanel = () => {
    const panels= [topLeft , topRight , bottomLeft , bottomRight];
    return panels[parseInt(Math.random()*panels.length)];
};

const sequence= [getRandomPanel()];
let sequenceToGuess= [...sequence];


const flash= panel=> {
  return new Promise((resolve) => {
    panel.className += ' active';
    setTimeout(()=> {
      panel.className= panel.className.replace(' active','');
      setTimeout(()=> {
          resolve();
      },250);
    },  1000);
  });
};

let canClick= false;
var count=0;

const panelClicked= panelClicked => {
  if(!canClick) return ;
  const expectedPanel = sequenceToGuess.shift();
  if(expectedPanel === panelClicked){
    if(sequenceToGuess.length === 0) {
      // start new round.
      count++;
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      setTimeout(startFlashing, 1000);
    }
  }
    else{
      // end the game.
      alert("Game Over Your score is "+count);
    }
  };

const startFlashing= async () => {
  canClick= false;
  for(const panel of sequence){
    await flash(panel);
  }
  canClick=true;
};

startFlashing();
