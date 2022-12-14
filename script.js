let cis = {
    "a" : 65,
    "b" : 66,
    "c" : 67,
    "d" : 68,
    "e" : 69,
    "f" : 70,
    "g" : 71,
    "h" : 72,
    "i" : 73,
    "j" : 74,
    "k" : 75,
    "l" : 76,
    "m" : 77,
    "n" : 78,
    "o" : 79,
    "p" : 80,
    "q" : 81,
    "r" : 82,
    "s" : 83,
    "t" : 84,
    "u" : 85,
    "v" : 86,
    "w" : 87,
    "x" : 88,
    "y" : 89,
    "z" : 90,
    " " : 32,
}

function inverse(obj){
    var retobj = {};
    for(var key in obj){
      retobj[obj[key]] = key;
    }
    return retobj;
}

var intervalID = setInterval(blink1, 1500);

var trans = inverse(cis);

var keyboard_press_sound = document.createElement("audio");
keyboard_press_sound.src = "./sounds/keyboard-press2.mp3";

var backspace_press_sound = document.createElement("audio");
backspace_press_sound.src = "./sounds/keyboard-press-sound-effect.mp3";

var spacebar_press_sound = document.createElement("audio");
spacebar_press_sound.src = "./sounds/spacebar-press.mp3";

var power_buzz = document.createElement("audio");
power_buzz.src = "./sounds/power-buzz.mp3"

power_buzz.loop = true;
power_buzz.volume = 0.3

async function print(message, elementID) {
    for (let i = 0; i < message.length; i++) {
        document.getElementById(elementID).innerHTML += message[i];
        if (message[i] == "\n") {
            document.getElementById(elementID).appendChild(document.createElement('br'));
        }
        if (message[i] == "," || message[i] == "." || message[i] == "?" || message[i] == "!" || message[i] == ":") {
            await wait(300)
        } else {
            await wait(20);
        }
    }
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

let command_answer = {};

schedule_re = "Hello, what are you doing here in this lovely little";
schedule_ac = "Monday █ Tuesday █ Wednesday █ Thursday █ Friday\n████████████████████████████████████\nVisArt .█ Maths .█ Grammar █ Geography █ Chem\nInformT █ Lit. . █ Lit . . █ Physical .█ French\nPhysics █ French █ Maths . █ English . █ Maths\nChem .. █ Bio .. █ Physics █ Biology . █ English\nInformT █ PhysEd █ InformT █ Math . . .█ InformT\nLit . . █ History█ History █ French . .█ Physics\nEnglish █ HomeR .█ Music . █ . . . . ..█" 

command_answer = {
    "" : "type help to get a list of available commands",
    "hi" : "Hello, what are you doing here in this lovely little farm?\nwondering about? aaaaaaaaaaaa",
    "bye" : "Aw. You're already going... Come back soon!",
    "who am i" : "The better question is: who are YOU?",
    "schedule" : schedule_ac,
    "what is the purpose of this" : "uh, so basically I thought that we had to make a website for github, like, any website, but we actually only needed to upload our schedules :/ lmao,but I actually also did that, so I guess, uh, mission complete?"
}
  
window.addEventListener('focus', function() {
    power_buzz.play();
});

window.addEventListener('blur', function() {
    power_buzz.pause();
});

document.body.addEventListener("keydown", function(event) {
    if (event.keyCode == 32) {
        var clone_audio = spacebar_press_sound.cloneNode();
        clone_audio.volume = 1;
        clone_audio.play();
    }
    else if (event.keyCode == 8) {
        var clone_audio = spacebar_press_sound.cloneNode();
        clone_audio.volume = 0.20;
        clone_audio.play();
    }
    else {
        var clone_audio = keyboard_press_sound.cloneNode();
        clone_audio.volume = 0.10;
        clone_audio.play();
    }
    
    power_buzz.play();

    console.log(event.keyCode)
    var current = document.getElementById("current_writing").innerHTML;
    var after = document.getElementById("after_write").innerHTML;
    if (trans[event.keyCode] != undefined) {
        current = current.replace(/█/g, "");
        current += trans[event.keyCode];
        if (after.length == 0) {
            after = after.replace(/_/g, "");
            current += "█";
        }
    }
    else if (event.keyCode == 13) {
        console.log("you pressed enter")
        let command = current.slice().replace(/█/g, "");
        if (command == "help") {
            document.getElementById("feeder").innerHTML = "";
            let answer = Object.keys(command_answer);
            print(answer.slice(1, answer.length).join("..\n"), "feeder");
        }
        else {
            let answer = command_answer[command];
            console.log("you typed: " + command);
            if (answer != undefined) {
                document.getElementById("feeder").innerHTML = "";
                print(answer, "feeder");
            }
        }
        current = "";
    }
    else if (event.keyCode == 8) {
        if (current[current.length - 1] == "█") {
            current = current.slice(0, current.length - 2);
        } else {
            current = current.slice(0, current.length - 1);
        }
    }
    else if (event.keyCode == 37 && current.length != 0) { //left
        current = current.replace(/█/g, "");
        after = after.replace(/_/g, "");
        after = "_" + current[current.length - 1] + after
        current = current.slice(0, current.length - 1);
    }
    else if (event.keyCode == 39 && after.length != 0) { //right
        current += after[1];
        after = after.slice(0, 1) + after.slice(2);
        if (after.length == 1) {
            after = "";
        }

    }
    console.log(after.length);
    document.getElementById("after_write").innerHTML = after;
    document.getElementById("current_writing").innerHTML = current;
});

document.body.addEventListener("keyup", function(event) {
    document.getElementById("current_writing").innerHTML = document.getElementById("current_writing").innerHTML.replace(/█/g, "")
});

function blink1() {
    if (document.getElementById("after_write").innerHTML == "") {
        document.getElementById("current_writing").innerHTML += "█";
        setTimeout(blink2, 750)
    }
}
function blink2() {
    document.getElementById("current_writing").innerHTML = document.getElementById("current_writing").innerHTML.replace(/█/g, "")
    document.getElementById("after_write").innerHTML = document.getElementById("after_write").innerHTML.replace(/█/g, "");
}
