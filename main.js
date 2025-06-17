// Vanilla javascript



// stars

document.addEventListener("DOMContentLoaded", () => {
  // --- Create a fixed container for stars ---
  const starContainer = document.createElement('div');
  starContainer.style.position = 'fixed';
  starContainer.style.top = 0;
  starContainer.style.left = 0;
  starContainer.style.width = '100vw';
  starContainer.style.height = '100vh';
  starContainer.style.pointerEvents = 'none';
  starContainer.style.zIndex = -1;
  document.body.appendChild(starContainer);

  // --- Add star styles and blink animation ---
  const style = document.createElement('style');
  style.textContent = `
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      width: 2px;
      height: 2px;
      opacity: 0.8;
      animation: blink 2s infinite ease-in-out;
    }

    @keyframes blink {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // --- Generate stars inside the fixed container ---
  const numStars = 100;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random position within the visible screen (viewport)
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';

    // Random animation delay
    star.style.animationDelay = Math.random() * 2 + 's';

    starContainer.appendChild(star);
  }
});





// Gsap

// Animation image
gsap.to(".foto-mika", {
    rotation: 360,
    duration: 2,
});

















// Bootstrap








// Zdog

// Maak hier zdog vormen en animaties

const canvas = document.querySelector('.zdog-canvas-custom');



function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  
}
resize();
window.addEventListener('resize', resize);

// Create illo with the correct canvas element
let illo = new Zdog.Illustration({
  element: canvas,  // Use the canvas element directly here
  zoom: 5,          // Optional, scales the illustration

  dragRotate: false, // Prevents user from interacting with object
});

// Objects


//rgb(210, 97, 180) 

let partyHat = new Zdog.Cone({
  addTo: illo,
  diameter: 70,
  length: 90,
  stroke: false,
  color: '#636',
  backface: '#C25',

  translate: { x: 25, y: 40, z: 0 }, // Position start
  rotate: { x: 90, y: 50, z: 0.1 }, // Rotation start



});


let dome = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 120,
  // fill enabled by default
  // disable stroke for crisp edge
  stroke: false,
  color: '#C25',
  backface: '#EA0',

  translate: { x: 0, y: 120, z: 0 }, // Position start
  rotate: { x: 90, y: 50, z: 0.1 }, // Rotation start




});

// Animate or render once
function animate() {

  illo.rotate.x += 0.0;
  illo.rotate.y += 0.001;


  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}
animate();





