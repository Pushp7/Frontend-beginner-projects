// let boxes = document.querySelector(".container").children;
// let boxes = document.querySelectorAll(".box")
let boxes = document.getElementsByClassName("box")

function randomColGen() {
    // Math.floor(Math.random() * (max - min) + min)
    let R = Math.floor(Math.random() * (255 - 0) + 0);
    let G = Math.floor(Math.random() * (255 - 0) + 0);
    let B = Math.floor(Math.random() * (255 - 0) + 0);
    return `rgb(${R}, ${G}, ${B})`
}

Array.from(boxes).forEach((e) => {
    // e.style.color = randomColGen();
    e.style.backgroundColor = randomColGen();
})