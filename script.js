// ============================================================
// Theme toggle
// ============================================================
const root = document.documentElement;
const themeButton = document.getElementById("themeButton");

try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
} catch (e) { /* storage unavailable */ }

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const current = root.dataset.theme === "dark" ? "" : "dark";
        const next = current === "dark" ? "dark" : "";
        if (next) {
            root.dataset.theme = "dark";
        } else {
            delete root.dataset.theme;
        }
        try { localStorage.setItem("theme", next); } catch (e) {}
    });
}


// ============================================================
// Mobile navigation toggle
// ============================================================
const bottomNav = document.querySelector(".bottom-nav");
const mobileToggle = document.getElementById("mobileToggle");
const navButtons = document.querySelectorAll(".nav-button[data-go]");

if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        bottomNav.classList.toggle("open");
    });

    navButtons.forEach((button) => {
        button.addEventListener("click", () => bottomNav.classList.remove("open"));
    });

    document.addEventListener("click", (e) => {
        if (!bottomNav.contains(e.target)) bottomNav.classList.remove("open");
    });
}


// ============================================================
// POPUP PAGES
// Every .star-orb opens the popup named in its data-popup attribute.
// Only one popup is open at a time.
// ============================================================
const starOrbs = Array.from(document.querySelectorAll(".star-orb[data-popup]"));
const popups = Array.from(document.querySelectorAll(".fade-popup"));

let activeOrb = null;
const NAV_SPACE = 88;        // keep in sync with "bottom" of .fade-popup in style.css
const MIN_POPUP_HEIGHT = 260;

// The popup starts just below the page text of the current section
// (e.g. "Projects / A selection of things I made.") and ends above the nav.
function positionPopup(orb) {
    const section = orb.closest(".orb-layer")?.dataset.section;
    const panel = document.querySelector('.intro[data-panel="' + section + '"]');
    if (!panel) return;

    const textBottom = panel.offsetTop + panel.offsetHeight;
    const latestTop = window.innerHeight - NAV_SPACE - MIN_POPUP_HEIGHT;
    const top = Math.max(16, Math.min(textBottom + 16, latestTop));

    root.style.setProperty("--popup-top", top + "px");
}

window.addEventListener("resize", () => {
    if (activeOrb) positionPopup(activeOrb);
});

function closeAllPopups({ restoreFocus = false } = {}) {
    let opener = null;

    starOrbs.forEach((orb) => {
        if (orb.classList.contains("active")) opener = orb;
        orb.classList.remove("active");
        orb.setAttribute("aria-expanded", "false");
    });

    popups.forEach((popup) => popup.classList.remove("open"));
    activeOrb = null;

    if (restoreFocus && opener) opener.focus({ preventScroll: true });
}

starOrbs.forEach((orb) => {
    const popup = document.getElementById(orb.dataset.popup);
    if (!popup) return;

    orb.addEventListener("click", () => {
        const wasOpen = popup.classList.contains("open");
        closeAllPopups();

        if (!wasOpen) {
            activeOrb = orb;
            positionPopup(orb);
            popup.classList.add("open");
            orb.classList.add("active");
            orb.setAttribute("aria-expanded", "true");
            popup.focus({ preventScroll: true });
        }
    });
});

popups.forEach((popup) => {
    popup.querySelector(".popup-close")?.addEventListener("click", () => {
        closeAllPopups({ restoreFocus: true });
    });
});

// Click/tap outside a popup closes it
document.addEventListener("click", (e) => {
    if (e.target.closest(".fade-popup, .star-orb")) return;
    closeAllPopups();
});

// Escape closes it
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllPopups({ restoreFocus: true });
});

// Close popups when switching sections
document.querySelectorAll(".nav-button[data-go]").forEach((button) => {
    button.addEventListener("click", () => closeAllPopups());
});


// ============================================================
// CONTACT FORM
// Set ONE of these:
//   email    -> opens the visitor's email app with the message filled in
//   endpoint -> posts the form to a form service (e.g. Formspree:
//               "https://formspree.io/f/yourFormId") so it is sent
//               straight to your inbox without opening an email app
// ============================================================
const CONTACT = {
    email: "your@email.com",   // <-- CHANGE THIS
    endpoint: ""               // <-- optional, see above
};

(() => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;

    const button = form.querySelector(".send-button");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));
        status.textContent = "";

        if (CONTACT.endpoint) {
            button.disabled = true;
            status.textContent = "Sending…";

            try {
                const response = await fetch(CONTACT.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error("Request failed");

                status.textContent = "Thanks! Your message has been sent.";
                form.reset();
            } catch (err) {
                status.textContent = "Something went wrong. Please try again.";
            } finally {
                button.disabled = false;
            }
        } else {
            const subject = encodeURIComponent("Portfolio message from " + data.name);
            const body = encodeURIComponent(
                data.message + "\n\n— " + data.name + " (" + data.email + ")"
            );

            status.textContent = "Opening your email app…";
            window.location.href = "mailto:" + CONTACT.email + "?subject=" + subject + "&body=" + body;
        }
    });
})();


// ============================================================
// PANEL CROSS-FADE (Home / About / Projects / Contact)
// World.js toggles the [hidden] attribute on each panel. We watch for
// that and fade the old panel out, then fade the new one in.
// ============================================================
(() => {
    const FADE_OUT_MS = 350;
    const FADE_IN_MS = 600;

    const panels = document.querySelectorAll(".intro[data-panel]");
    const shown = new Map();   // panel -> is it (meant to be) visible?
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slide = reduceMotion ? 0 : 12;

    panels.forEach((p) => shown.set(p, !p.hidden));

    const observer = new MutationObserver((records) => {
        // What World.js wants for each panel after its batch of changes
        const desired = new Map();
        records.forEach((r) => desired.set(r.target, !r.target.hidden));

        desired.forEach((show, panel) => {
            if (shown.get(panel) === show) return; // nothing changed
            shown.set(panel, show);

            // Start from the current opacity if we interrupt a running fade
            let from = 1;
            if (panel._fade) {
                from = parseFloat(getComputedStyle(panel).opacity);
                panel._fade.cancel();
                panel._fade = null;
            }

            if (show) {
                // FADE IN (waits until the old panel has faded out)
                panel.style.pointerEvents = "";
                const startOpacity = panel.hidden ? 0 : Math.min(from, 0.01);
                panel._fade = panel.animate(
                    [
                        { opacity: startOpacity, transform: `translateY(${slide}px)` },
                        { opacity: 1, transform: "translateY(0)" }
                    ],
                    {
                        duration: FADE_IN_MS,
                        delay: FADE_OUT_MS,
                        easing: "ease",
                        fill: "backwards"
                    }
                );
            } else {
                // FADE OUT: keep it on screen while it fades, then really hide it
                panel.hidden = false;
                panel.style.pointerEvents = "none";
                const anim = panel.animate(
                    [
                        { opacity: from, transform: "translateY(0)" },
                        { opacity: 0, transform: `translateY(${-slide}px)` }
                    ],
                    { duration: FADE_OUT_MS, easing: "ease", fill: "forwards" }
                );
                panel._fade = anim;
                anim.onfinish = () => {
                    if (shown.get(panel)) return;
                    panel.hidden = true;
                    panel.style.pointerEvents = "";
                    anim.cancel();
                    panel._fade = null;
                    observer.takeRecords(); // ignore our own change
                };
            }
        });

        observer.takeRecords(); // ignore the un-hide we did above
    });

    panels.forEach((p) =>
        observer.observe(p, { attributes: true, attributeFilter: ["hidden"] })
    );
})();


// ============================================================
// STAR ORBS: glued to the stars of the 3D constellations
// World.js exposes window.WORLD and calls WORLD.onFrame() every frame.
// For each section (about / projects / contact) there is one .orb-layer.
// We project the 3D star positions to screen pixels and move the HTML
// buttons there. A layer is only visible while its section is active.
// ============================================================
(() => {
    // which constellation belongs to which section
    const SHAPES = {
        about: "person",
        projects: "folder",
        contact: "envelope"
    };

    const FADE_IN_MS = 700;
    const FADE_IN_DELAY_MS = 700;   // wait for the text + camera to arrive
    const FADE_OUT_MS = 250;

    function createLayer(layer) {
        const section = layer.dataset.section;
        const orbEls = Array.from(layer.querySelectorAll(".star-orb"));

        let on = false;
        let fade = null;
        let vec = null;

        function update() {
            const W = window.WORLD;
            if (!W || (!on && !fade)) return;

            if (!vec) vec = new W.THREE.Vector3();

            const group = W.meshes[section];
            const shape = W.constellations[SHAPES[section]];
            if (!group || !shape) return;

            const w = window.innerWidth;
            const h = window.innerHeight;

            orbEls.forEach((el) => {
                const p = shape.points[Number(el.dataset.point)];
                if (!p) return;

                vec.set(p[0], p[1], 0.015);
                group.localToWorld(vec);
                vec.project(W.camera);

                const x = (vec.x * 0.5 + 0.5) * w;
                const y = (-vec.y * 0.5 + 0.5) * h;

                el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
            });
        }

        function set(show) {
            if (show === on) return;
            on = show;

            const from = parseFloat(getComputedStyle(layer).opacity) || 0;
            if (fade) {
                fade.cancel();
                fade = null;
            }

            if (show) {
                layer.classList.remove("off");
                layer.style.visibility = "visible";

                const anim = layer.animate(
                    [{ opacity: from }, { opacity: 1 }],
                    {
                        duration: FADE_IN_MS,
                        delay: FADE_IN_DELAY_MS,
                        easing: "ease",
                        fill: "both"
                    }
                );
                fade = anim;
                anim.onfinish = () => {
                    if (!on) return;
                    layer.style.opacity = "1";
                    anim.cancel();
                    fade = null;
                };
            } else {
                layer.classList.add("off");

                const anim = layer.animate(
                    [{ opacity: from }, { opacity: 0 }],
                    { duration: FADE_OUT_MS, easing: "ease", fill: "forwards" }
                );
                fade = anim;
                anim.onfinish = () => {
                    if (on) return;
                    layer.style.opacity = "0";
                    layer.style.visibility = "hidden";
                    anim.cancel();
                    fade = null;
                };
            }
        }

        return { section, update, set };
    }

    const layers = Array.from(document.querySelectorAll(".orb-layer[data-section]"))
        .map(createLayer);

    if (!layers.length) return;

    // Hook into the World.js render loop (World.js loads before this file)
    function hookIntoWorld() {
        if (window.WORLD) {
            window.WORLD.onFrame = () => layers.forEach((l) => l.update());
        } else {
            requestAnimationFrame(hookIntoWorld);
        }
    }
    hookIntoWorld();

    // Show only the layer that belongs to the active section
    document.querySelectorAll("[data-go]").forEach((button) => {
        button.addEventListener("click", () => {
            layers.forEach((l) => l.set(l.section === button.dataset.go));
        });
    });
})();







// ============================================================
// TELESCOPE CHARACTER (PNG sprite sheet)
// Frame 0 on load. Plays forward when you open About / Projects / Contact
// and holds on the last frame. Plays backwards when you go Home.
// It always continues from the frame it is on, so it never jumps.
// ============================================================
(() => {
    // ---- SETTINGS ------------------------------------------------
    const SHEET = "Assets%20zelfgemaakt/telescope_spritesheet.png";
    const FRAME_W = 960;       // size of ONE frame in the sheet (px)
    const FRAME_H = 540;
    const COLUMNS = 10;        // frames per row in the sheet
    const ROWS = 10;           // rows in the sheet
    const FRAME_COUNT = 95;    // total frames (last row is not full)
    const FPS = 24;            // playback speed - lower = slower
    const WIDTH = "clamp(200px, 28vw, 520px)";   // size on screen - make bigger/smaller here
    // --------------------------------------------------------------

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = `
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 99;
        pointer-events: none;
        width: ${WIDTH};
        aspect-ratio: ${FRAME_W} / ${FRAME_H};
        background-image: url("${SHEET}");
        background-repeat: no-repeat;
        background-size: ${COLUMNS * 100}% ${ROWS * 100}%;
    `;
    document.body.appendChild(el);

    // Preload the sheet so the first play does not stutter
    const preload = new Image();
    preload.src = SHEET;

    function showFrame(i) {
        const col = i % COLUMNS;
        const row = Math.floor(i / COLUMNS);
        const x = (col / (COLUMNS - 1)) * 100;
        const y = (row / (ROWS - 1)) * 100;
        el.style.backgroundPosition = `${x}% ${y}%`;
    }

    const LAST = FRAME_COUNT - 1;
    let frame = 0;          // current frame (fractional while playing)
    let raf = null;
    let direction = 0;      // 1 forward, -1 backward, 0 stopped

    function play(dir) {
        // Already heading that way, or already at that end: do nothing
        if (dir === direction && raf) return;
        if (!raf && ((dir === 1 && frame >= LAST) || (dir === -1 && frame <= 0))) return;

        if (raf) cancelAnimationFrame(raf);
        raf = null;
        direction = dir;

        let prev = performance.now();

        function tick(now) {
            const dt = Math.max(0, Math.min((now - prev) / 1000, 0.1));   // ignore long pauses (tab switch)
            prev = now;
            frame += direction * FPS * dt;

            if ((direction === 1 && frame >= LAST) || (direction === -1 && frame <= 0)) {
                frame = direction === 1 ? LAST : 0;
                showFrame(frame);
                raf = null;
                direction = 0;
                return;
            }

            showFrame(Math.floor(frame));
            raf = requestAnimationFrame(tick);
        }

        raf = requestAnimationFrame(tick);
    }

    showFrame(0);

    document.querySelectorAll("[data-go]").forEach((button) => {
        button.addEventListener("click", () => {
            play(button.dataset.go === "home" ? -1 : 1);
        });
    });
})();


