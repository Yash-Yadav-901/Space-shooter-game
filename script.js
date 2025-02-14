let leftM = 0;
let inter1;
function rightMove() {
    let sh = document.querySelector(".ship");
    if (leftM < 90) {
        leftM += 1;
        sh.style.left = `${leftM}vw`;
    }
    else {
        clearInterval(inter1);
    }
}

document.querySelector(".right").addEventListener("mousedown", (e) => {
    e.preventDefault();
    inter1 = setInterval(rightMove, 40);
})

document.querySelector(".right").addEventListener("mouseup", () => {
    clearInterval(inter1);
})
document.querySelector(".right").addEventListener("mouseleave", () => {
    clearInterval(inter1);
})

document.querySelector(".right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    inter1 = setInterval(() => {
        if (leftM > 62) {
            leftM = 62;
            clearInterval(inter1);
        }
        rightMove()
    }, 40);
})

document.querySelector(".right").addEventListener("touchend", () => {
    clearInterval(inter1);
})
document.querySelector(".right").addEventListener("touchcancel", () => {
    clearInterval(inter1);
})

let inter2;
function leftMove() {
    let sh = document.querySelector(".ship");
    if (leftM >= 1) {
        leftM -= 1;
        sh.style.left = `${leftM}vw`;
    }
    else {
        clearInterval(inter2);
    }
}

document.querySelector(".left").addEventListener("mousedown", (e) => {
    e.preventDefault();
    inter2 = setInterval(leftMove, 40);

})

document.querySelector(".left").addEventListener("mouseup", () => {
    clearInterval(inter2);
})
document.querySelector(".left").addEventListener("mouseleave", () => {
    clearInterval(inter2);
})

document.querySelector(".left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    inter2 = setInterval(leftMove, 40);
})

document.querySelector(".left").addEventListener("touchend", () => {
    clearInterval(inter2);
})
document.querySelector(".left").addEventListener("touchcancel", () => {
    clearInterval(inter2);
})



//for stones




let heart = 10;
let a = 1;
let dropStone;

function makeDiv(val, mark) {
    let div = document.createElement("div");

    div.setAttribute('style', `padding-top: 10px;  line-height: 50px ; text-align: center; border-radius: 5px;  font-size:15px; width: 100%; height: 30%; background-color: skyblue; position:absolute; z-index: 20; color:rgb(136, 0, 255); font-family: "Press Start 2P", serif;
    font-weight: 300;
    font-style: normal;`);
    let main = document.querySelector(".main");

    if (mark == "health") {
        div.textContent = "Defeated";
    }
    else {
        div.textContent = "WON";
    }


    div.textContent += " Reload To Start Again";
    main.append(div);
    clearInterval(dropStone);
    return
}

function spawn() {
    let healthbar = document.querySelector(".health");
    healthbar.innerHTML = `${heart}/10`;
    let random = Math.floor(Math.random() * 85) + 2;
    let stone = `<div class="stones${a}" style="width: 50px; height: 50px;  position: absolute; top: -4%; left: ${random}%; z-index: 1; background:url(pixil-frame-0.png); background-position: center center;  background-repeat: no-repeat;"></div>`;
    let curr = a;
    a++;
    document.querySelector(".main").innerHTML += stone;

    let vt = setInterval(() => {
        let sel = document.querySelector(`.stones${curr}`);
        if (sel) {
            let conv = parseFloat(sel.style.top);
            let ship = document.querySelector(".ship");
            let shipPos = ship.getBoundingClientRect();
            let stonePos = sel.getBoundingClientRect();

            if (shipPos.left < stonePos.right &&
                shipPos.right > stonePos.left &&
                shipPos.top < stonePos.bottom &&
                shipPos.bottom > stonePos.top) {
                ship.style.filter = "drop-shadow(3px 3px 8px rgb(255, 2, 2))";

                heart--;
                if (heart == 0) {
                    heart = 0;
                    makeDiv(heart, "health");

                }
                healthbar.innerHTML = `${heart}/50`;


                setTimeout(() => {
                    ship.style.filter = "drop-shadow(3px 3px 8px rgb(2, 179, 255))";
                }, 100);

                sel.remove();
                clearInterval(vt);
            } else {
                sel.style.top = `${conv + 1}%`;
            }
        }
    }, 60);

    setTimeout(() => {
        clearInterval(vt);
        let sel = document.querySelector(`.stones${curr}`);
        if (sel) {
            sel.remove();
        }
    }, 7000);
}

dropStone = setInterval(() => {
    spawn();
}, 3000);

let points = 0;


function Bee(count) {
    let getship = document.querySelector(".ship").getBoundingClientRect();
    let mainPos = document.querySelector(".main").getBoundingClientRect();
    let postop = getship.top - mainPos.top;
    let posleft = getship.left - mainPos.left + (getship.width / 2) - 2;


    let beam = `<div class="beam${count}" style="width: 4px; height: 20px; background-color: rgb(242, 0, 255); border-radius: 10px; position: absolute; z-index: 1; top:${postop}px; left: ${posleft}px; "></div>`

    document.querySelector(".main").innerHTML += beam;

    let kam = setInterval(() => {
        let ele = document.querySelector(`.beam${count}`);
        let pos = parseFloat(ele.style.top);
        ele.style.top = `${pos - 10}px`;

        let stones = document.querySelectorAll(`.stones${a - 1}`);
        stones.forEach(stone => {
            let stonePos = stone.getBoundingClientRect();
            let beamPos = ele.getBoundingClientRect();

            if (beamPos.left <= stonePos.right &&
                beamPos.right >= stonePos.left &&
                beamPos.top <= stonePos.bottom &&
                beamPos.bottom >= stonePos.top) {
                stone.remove();
                ele.remove();
                clearInterval(kam);
                points++;
                if (points == 15) {
                    points = 15;
                    makeDiv(heart, "win");
                }
                document.querySelector(".points").innerHTML = `${points}/15`;
            }
        });


    }, 40)


    setTimeout(() => {
        let ele = document.querySelector(`.beam${count}`);
        clearInterval(kam);
        if (ele) ele.remove();
    }, 2000)

}

let count = 1;
setInterval(() => {
    Bee(count);
    count++;
}, 200)



