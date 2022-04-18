// @authors Henry Chan

dungeoncrawl = {
  start:{
    name:"Entrance",
    description:"Welcome to the Wanderer's Dungeon the path inside splits, how would you like to explore?",
    exitKeys:['room1','room2'],
    exitTexts:["Go Left","Go Right"]
  },
  room1:{
    name:"Fog Zone",
    description:"The fog of war fills the halls, blinding your sight.You can't see them but you have a sense of danger approaching. The gut in your stomache is giving you a bad feeling of whats about to come.",
    exitKeys:['room3','room4'],
    exitTexts:["CHARGE!!","Run"]
  },
  room2:{
    name:"Straight way",
    description:"The path is clear, nothing seems off about this part of the dungeon. The only odd things is the strange purple light that lines the walls.",
    exitKeys:['room5','start'],
    exitTexts:["Continue Ahead?","Turnback"]
  },
  room3:{
    name:"The pit",
    description:"You are swamped by enemies on all sides. You can hear their laughter through your battered vision. You feel your eyes drop fearing that this may be your last moments",
    exitKeys:['start'],
    exitTexts:["The angels are taking you back to the inn."]
  },
  room4:{
    name:"Odd keyhole",
    description:"You notice there is a odd hole in the wall after you escape that trap house. Seems like you can squeeze your way through, though no one has confirmed what is on the other side of that hole.",
    exitKeys:['room6','room5'],
    exitTexts:["Squeeze through","Take the safe route"]
  },
  room5:{
    name:"Straight way",
    description:"The path is clear, nothing seems off about this part of the dungeon. The only odd things is the strange purple light that lines the walls. The lights grow in intesity with each step you take.",
    exitKeys:['room5','room2'],
    exitTexts:["Continue Ahead?","Turnback"]
  },
  room6:{
    name:"Hidden Gem",
    description:"!!!POP!!! You tumble out of that odd hole. You find a shiny chest right in front of you. It seems that the keyhole on the chest matches the key your Grandpa has given you as a good luck charm. Inisde the chest contains various artifacts and ancient knowledge. Do you want to headback or explore deeper?",
    exitKeys:['Start','Boss1'],
    exitTexts:["Go home","Continue exploring"]
  },
  Boss1:{
    name:"No turning back",
    description:"As the ground shakes beneath you, the floor colapses. You find yourself in front of a massive door. The every fiber in your body is telling you to run. Sadly the pit you are in has no way out as the doors open... to a tiny bunny?!?! This tiny little bunny approaches towards you, seeming to be perfectly harmless",
    exitKeys:['Boss2','Boss3'],
    exitTexts:["Fight","Toss a treat"]
  },
  Boss2:{
    name:"Uh Oh",
    description:"You don't believe the innocent behavior of this bunny. You get ready to fight. The bunny now enrage grows, it grows until its fluff fills the chamber rendering you unable to attack. You are now stuck here unable to decide your fate.",
    exitKeys:['start'],
    exitTexts:["The bunny robs you of all your possessions and promptly kicks you out."]
  },
  Boss3:{
    name:"Wait a minute",
    description:"The bunny evaluates your tribute. It takes a couple of sniffs, and deems it worthy. It walks up to you and takes a liking to you. Turns out it would like to follow you on all your future journeys.",
    exitKeys:['end'],
    exitTexts:["Welcome aboard"]
  },
  end:{
    name:"Finish",
    description:"Boss bunny shows you a new way out of the dungeon as the two of you begin your new journey together.",
    exitKeys:['start'],
    exitTexts:["Before the next adventure time for a well deserve rest"]
  }
}

var pathTrack = 1;
var outputHTML ="#output"

function display(string){
  $(outputHTML).append(string);
}
function clearDisplayArea(){
  $(outputHTML).empty();
}

function displayRoute(pathTrack){
  display("<p>"+pathTrack.name+"</p>");
  display("<p>"+pathTrack.description+"</p>");
}
function displayExitroute(pathTrack){
    display("<p>Whats your next move?</p><ul>");
  for(i = 0; i < pathTrack.exitKeys.length; i++) {
  exitHTML = "<li class = 'answers', onClick = 'javascript:newPath(\"" + pathTrack.exitKeys[i] + "\")'>" + pathTrack.exitTexts[i] + "</li>";
  display(exitHTML);
  }
  display("</ul>")
}

function newPath(nextPath) {
  pathTrack = nextPath;
  pathTrackObj = dungeoncrawl[pathTrack];
  clearDisplayArea();
  displayRoute(pathTrackObj);
  displayExitroute(pathTrackObj);
}

$("DOMContentLoaded", function(event) {
  newPath('start')
});
