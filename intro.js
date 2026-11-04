// ============================================================
// ENTER SCREEN
// Rotating text: fades in from the right, moves to the left, and fades out.
// ============================================================
(() => {
    const ROLES = [
        "BSc Communication & Multimedia Design",
        "MA Data-Driven Design",
        "Game Designer",
        "Concept Developer",
        "UX",
        "OpenSource Lover",
        "XR experience",
        "Creative Technologist",
        "R&D explorer",
    ];

    const HOLD_MS = 2500;       // How long each role stays readable in the center
    const MOVE_MS = 700;        // Duration of the slide and fade transition
    const DISTANCE = 250;       // Pixel distance for the smooth train-like slide

    const splash = document.getElementById("splash");
    const roleEl = document.getElementById("splashRole");
    const enterButton = document.getElementById("splashEnter");
    if (!splash || !roleEl || !enterButton) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const travel = reduceMotion ? 0 : DISTANCE;

    let running = true;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const animate = (el, keyframes) =>
        el.animate(keyframes, { 
            duration: MOVE_MS, 
            easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Gives it a smooth "train braking/accelerating" feel
            fill: "both" 
        }).finished;

    async function rotateRoles() {
        let i = 0;

        while (running) {
            roleEl.getAnimations().forEach((a) => a.cancel());
            roleEl.textContent = ROLES[i];

            // 1. ENTER: Fades in while sliding from the right (Right -> Center)
            await animate(roleEl, [
                { opacity: 0, transform: `translateX(${travel}px)` },
                { opacity: 1, transform: "translateX(0)" },
            ]);

            // 2. HOLD: Stays visible in the center
            await wait(HOLD_MS);

            // 3. EXIT: Fades out while sliding to the left (Center -> Left)
            await animate(roleEl, [
                { opacity: 1, transform: "translateX(0)" },
                { opacity: 0, transform: `translateX(${-travel}px)` },
            ]);

            i = (i + 1) % ROLES.length;
        }
    }

    function enter() {
        running = false;
        splash.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: "ease", fill: "forwards" })
            .finished.then(() => { splash.hidden = true; });
    }

    enterButton.addEventListener("click", enter);
    enterButton.focus({ preventScroll: true });
    rotateRoles();
})();