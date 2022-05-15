// @authors Henry Chan, Douglas Pattison, Elias Salas
// Learned and source code from Wes and Webdevsimplified

//The meat
const dungeoncrawl = [
    {

        id:1,
        description:"Welcome to the Wanderer's Dungeon the path inside splits, how would you like to explore? Thers an odd key on the ground.",
        img:'img/sitelogo2.png',
        choice:[
          {
            text:'Take the key with ya',
            item:{oddKey:true},
            nextStep:2
          },
          {
            text: "Moving on" ,
            nextStep: 2
          }

        ]
      }
    ,
    {
      id:2,
      description:"As you enter the dungeon, a purple fog fills the halls, blinding your sight.You can't see them but you have a sense of danger approaching. The gut in your stomach is giving you a bad feeling of whats about to come.",
      img:'img/dungeon.png',
      choice:[
        {
          text:'run away',
          nextStep:3
        },
        {
          text: "charge",
          nextStep:4
        }

      ]
    },
    {
      id:3,
      description:"Scared out of your mind you decide a way to calm yourself down. You notice a charm on small statue, staring at you intensely.",
      img:'img/sitelogo2.png',
      choice:[
        {
          text:'get drunk',
          nextStep:4
        },
        {
          text: "The small statue releases the charm in exchange for the Key." ,
          requiredItem:(heldItem) => heldItem.oddKey,
          item:{oddKey:false, charm:true},
          nextStep:4
        }

      ]
      }
    ,
      {
        id:4,
        description:"Hello there, the voice comes out of nowhere. You now realize the room you are in are filled with multiple different holes.",
        img:'img/sitelogo2.png',
        choice:[
          {
            text:'Ignore the voice and run out of the room',
            nextStep:5
          },
          {
            text: "Theres a strange hole marked similar to the odd key, Use the key?" ,
            requiredItem:(heldItem) => heldItem.oddKey,
            item:{oddKey:false},
            nextStep:6
          },
          {
            text:'Throw some rocks at the large hole in the center of the room',
            nextStep:7
          },
          {
            text:'Climb up the hole in the ceiling',
            nextStep:8
          }

        ]
        }
      ,
        {
          id:5,
          description:"Uh oh!!!! you enter the trap house. You are swamped by enemies on all sides. You can hear their laughter through your battered vision. You feel your eyes drop fearing that this may be your last moments.",
          img:'img/sitelogo2.png',
          choice:[
            {
              text:'Try again?',
              nextStep:-1
            }
          ]
        }
      ,
        {
          id:6,
          description:"The ground begins to shake, and a crack begins to form along the south wall. A massive gate opens up to a shiny room, a large treasure room filled with mountains of gold.With your new found riches, you decide to retire and relax on your own private Manor up in the mountains.",
          img:'img/sitelogo2.png',
          choice:[
            {
              text:'Return to the start',
              nextStep:-1
            }

          ]
        }
      ,
        {
          id:7,
          description:"The voice didn't like the rocks raining down from above. The purple mist from before begins to flood the room on all sides. The mist takes shapes around a spirit, not just taking shape of one but many..",
          img:'img/sitelogo2.png',
          choice:[
            {
              text:'Apologize and offer food',
              nextStep:9
            },
            {
              text:'Attack with all your might',
              nextStep:9
            },
            {
              text:'???',
              requiredItem:(heldItem) => heldItem.charm,
              item:{charm:false},
              nextStep:10
            }

          ]
        }
    ,
      {
        id:8,
        description:"The hole in the ceiling gets narrower and narrower as you climb... you finally reach the end of the tunnl and can only fit your head through. You some how stuck your head in a dragons den, and are unable to move. The elder dragon laughs at the state you are in, and decides to freeze you in place.",
        img:'img/sitelogo2.png',
        choice:[
          {
            text:'Try again?',
            nextStep:-1
          }
        ]
      }
    ,
      {
        id:9,
        description:"The purple spirits were not pleased with your choice. For your transgressions, the spirits have decided your fate. You lose the feeling of your body, as you have inhaled too much of purple mist. The guardian spirits tells you that you will now become trapped within the mist.",
        img:'img/fog.png',
        choice:[
          {
            text:'Centuries pass as you take other adventurers and seal their fate. Try Again?',
            nextStep:-1
          }
        ]
      }
    ,
      {
        id:10,
        description:"The charm begins to blink a bright light, as if.. from the charm spews forth a woman. She halts the spirits' actions and you are bathed in a cleansing light. She tells you that she is one of the gods that have been sealed away when humanity began losing their faith in the Elder Gods.",
        img:'img/sitelogo2.png',
        choice:[
          {
            text:'Nope, back in that charm you go',
            nextStep:11
          },
          {
            text:'Do you want to travel with me?',
            nextStep:12
          }
          ]
      }
    ,
      {
        id:11,
        description:"The goddess is pissed off, cursing you as the charm reseals her back in… A status pops up, the curse inflicted on you is punishment worse than death, your body slowly transforms and splits.  Becoming new relics, you have no control over your new forms, they begin to float and scatter all across the world into multiple dungeons, but each piece is linked back to your consciousness.",
        img:'img/sitelogo2.png',
        choice:[
          {
            text:'Try Again?',
            nextStep:-1
          }
        ]
      }
    ,
      {
        id:12,
        description:"The goddess gladly accepts and aids you on your journey. With her presence felt, the dungeon instantly clears out, allowing you to easily pick up everything inside. When you are done, she picks you up and carries you out like a child. ",
        img:'img/sitelogo2.png',
        choice:[
          {
            text:'Replay?',
            nextStep:-1
          }
        ]
      }
]
//the engine
const textholder = document.getElementById('text')
const optionHolder = document.getElementById('option-buttons')
const imgHolder =document.getElementById('pics')

let inventory ={}

function Hajime(){
  inventory={}
  showGame(1)

}

function showGame(pathTrack){
  const textNode = dungeoncrawl.find(textNode => textNode.id === pathTrack)
  textholder.innerText = textNode.description
  imgHolder.src = textNode.img

  while(optionHolder.firstChild){
    optionHolder.removeChild(optionHolder.firstChild)
  }

  textNode.choice.forEach(choice => {
      if(showChoice(choice)){
        const button = document.createElement('button')
        button.innerText = choice.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectChoice(choice))
        optionHolder.appendChild(button)
      }
    })
  }
function showChoice(choice) {
    return choice.requiredItem == null || choice.requiredItem(inventory)
}

function selectChoice(choice){
  const nextMove = choice.nextStep
  if(nextMove <= 0){
    return Hajime()
  }
  inventory = Object.assign(inventory, choice.item)
  showGame(nextMove)
}

Hajime()
