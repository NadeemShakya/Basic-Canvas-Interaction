// get the canvas element.
let canvas = document.querySelector('canvas');
// set the width and height of the canvas.
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
// get the canvas content in 2d.
let ctx = canvas.getContext('2d');
// initialize mouse object.
let mouse = {
    x: undefined,
    y: undefined
}
// store all the bubbles in the canvas.
let bubbles = [];
// color set for the bubbles.
let colors = [
    '#635E5A',
    '#FF7573',
    '#F0E6CD',
    '#30324A',
    '#30324A'
];
// when user moves their fingers on a touch device.
window.addEventListener('touchmove', event => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
})
// when user removes their fingers from a touch device.
window.addEventListener('touchend', () => {
    mouse.x = undefined;
    mouse.y = undefined;
})
// when user moves the mouse in a desktop device.
window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
})
// Bubbles Class .
class Bubbles {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = Math.floor(randomNumbers(0, 4));
    }
    // set velocity of the bubbles to move.
    velocity = {
        x: Math.random() < 0.5 ? .5 : -.5 ,
        y: Math.random() < 0.5 ? .5 : -.5 ,
    }
    // show the bubbles on canvas.
    show() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors[this.color];
    }
    // move the bubbles by their velocities.
    move() {
        this.x += this.velocity.x,
        this.y += this.velocity.y
    }
    // bubble animator.
    update() {
        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x *= -1;
        }
        if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y *= -1;
        }
        if(mouse.x - this.x < 120 && mouse.x - this.x > -120 && mouse.y - this.y < 120 && mouse.y - this.y > -120) {
            if(this.radius < 40) {
                this.radius += 1;
            }
        }else if(this.radius > 5) {
            this.radius -= 1;
        }
    }
}

// function to get random numbers between a min and max values.
let randomNumbers = (min, max) => Math.random() * (max - min) + min; 

// create all the random bubbles.
let createBubbles = () => {
    let bubblesCount = 300;
    let r = 5;
    for(let i = 0; i < bubblesCount; i++) {
        let x = randomNumbers(0 + r, canvas.width - r);
        let y = randomNumbers(0 + r, canvas.height - r);
        let bubble = new Bubbles(x, y, r);
        bubbles.push(bubble);
    }
}

let animate = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].move();
        bubbles[i].show();
    }
    requestAnimationFrame(animate);
}
// call the functions.
createBubbles();
animate();
