// ============================================================
// ABOUT POPUPS: skill tree, tool bubbles, hobbies
// Everything is built from content.js. Loads AFTER script.js.
// ============================================================
(() => {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");


    // ---------- SKILL TREE ----------
    const skillsBody = document.getElementById("skillsBody");

    if (skillsBody && typeof SKILL_TREE !== "undefined") {
        const T = SKILL_TREE;
        const byId = Object.fromEntries(T.nodes.map((n) => [n.id, n]));
        const RADIUS = { minor: 8, notable: 14, keystone: 21 };
        const colorOf = (n) => T.branches[n.branch]?.color || "#94a3b8";
        const STATE_TEXT = { done: "Unlocked", current: "In progress", locked: "Locked: still open" };

        const links = T.nodes.flatMap((n) => (n.from || []).map((id) => {
            const p = byId[id];
            if (!p) return "";
            const locked = n.state === "locked" || p.state === "locked";
            const mid = (p.y + n.y) / 2;
            return `<path class="pt-link ${locked ? "locked" : ""}" style="--c:${colorOf(n)}"
                          d="M${p.x} ${p.y} C${p.x} ${mid}, ${n.x} ${mid}, ${n.x} ${n.y}"/>`;
        })).join("");

        const trails = T.nodes.filter((n) => n.open).map((n) =>
            `<path class="pt-link locked trail" style="--c:${colorOf(n)}" d="M${n.x} ${n.y} L${n.x} ${n.y + 48}"/>`
        ).join("");

        const nodes = T.nodes.map((n) => {
            const r = RADIUS[n.size] || 8;
            const icon = n.icon || (n.state === "locked" ? "?" : "");
            return `
            <g class="pt-node ${n.size} ${n.state}" data-id="${n.id}" style="--c:${colorOf(n)}"
               transform="translate(${n.x} ${n.y})" tabindex="0" role="button"
               aria-label="${n.name}${n.sub ? ", " + n.sub : ""}. ${STATE_TEXT[n.state]}">
                <circle class="pt-hit" r="${r + 10}"/>
                ${n.size === "keystone" ? `<circle class="pt-frame" r="${r + 7}"/>` : ""}
                <circle class="pt-ring" r="${r + 4}"/>
                <circle class="pt-core" r="${r}"/>
                ${n.size !== "minor" && icon ? `<text class="pt-icon" style="font-size:${r * 1.05}px" text-anchor="middle" dominant-baseline="central">${icon}</text>` : ""}
                <text class="pt-label" y="${r + (n.size === "keystone" ? 22 : 16)}" text-anchor="middle">
                    <tspan x="0">${n.name}</tspan>${n.sub ? `<tspan class="pt-sub" x="0" dy="12">${n.sub}</tspan>` : ""}
                </text>
            </g>`;
        }).join("");

        skillsBody.innerHTML = `
            <p class="about-intro">My creative journey, from the top down. Click a node to read its story. The journey continues.</p>
            <svg class="pt-svg" viewBox="0 0 ${T.width} ${T.height}" role="group" aria-label="My creative journey as a skill tree">
                ${links}${trails}${nodes}
            </svg>
            <div class="about-detail" id="skillDetail" aria-live="polite"></div>`;

        const detail = document.getElementById("skillDetail");

        // small story window that pops up on the big nodes (text: SKILL_STORIES in content.js)
        const popupEl = skillsBody.closest(".fade-popup");
        const story = document.createElement("div");
        story.className = "pt-story";
        story.hidden = true;
        story.setAttribute("role", "dialog");
        story.setAttribute("aria-label", "Story");
        story.innerHTML = `
            <div class="pt-story-card" tabindex="-1">
                <button type="button" class="pt-story-close" aria-label="Close">×</button>
                <h4></h4>
                <p></p>
            </div>`;
        popupEl.append(story);

        const storyCard = story.querySelector(".pt-story-card");
        const closeStory = () => { story.hidden = true; };

        const openStory = (n, s) => {
            story.style.setProperty("--c", colorOf(n));
            story.querySelector("h4").textContent = s.title || n.name;
            story.querySelector("p").innerHTML = s.text || "";
            story.hidden = false;
            storyCard.focus({ preventScroll: true });
        };

        story.addEventListener("click", (e) => {
            if (e.target === story || e.target.closest(".pt-story-close")) closeStory();
        });

        // Esc closes only the story window, not the whole popup behind it
        document.addEventListener("keydown", (e) => {
            if (e.key !== "Escape" || story.hidden) return;
            e.stopPropagation();
            closeStory();
        }, true);

        // closing the skill tree popup also closes the story
        new MutationObserver(() => {
            if (!popupEl.classList.contains("open")) closeStory();
        }).observe(popupEl, { attributes: true, attributeFilter: ["class"] });

        const select = (el) => {
            skillsBody.querySelectorAll(".pt-node.selected").forEach((n) => n.classList.remove("selected"));
            el.classList.add("selected");
            const n = byId[el.dataset.id];

            // big nodes with a story: show the small window instead of the text below the tree
            const s = typeof SKILL_STORIES !== "undefined" && SKILL_STORIES[n.id];
            if (s) {
                detail.innerHTML = "";
                openStory(n, s);
                return;
            }

            detail.innerHTML = `
                <h4>${n.name}${n.sub ? ` <small>· ${n.sub}</small>` : ""}</h4>
                <p class="detail-level">${STATE_TEXT[n.state]}${n.period ? " · " + n.period : ""}</p>
                <p>${n.about || ""}</p>`;
        };

        skillsBody.addEventListener("click", (e) => {
            const el = e.target.closest(".pt-node");
            if (el) select(el);
        });

        skillsBody.addEventListener("keydown", (e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            const el = e.target.closest(".pt-node");
            if (!el) return;
            e.preventDefault();
            select(el);
        });
    }


    // ---------- FAVOURITE TOOLS (floating bubbles) ----------
    const toolsBody = document.getElementById("toolsBody");

    // Reads the `tools:` line of every project and counts them
    function collectTools() {
        const map = new Map();

        Object.entries(PROJECTS).forEach(([page, list]) => {
            list.forEach((project, index) => {
                if (!project.tools) return;

                project.tools.split(",").map((t) => t.trim()).filter(Boolean).forEach((name) => {
                    const key = name.toLowerCase();
                    if (!map.has(key)) map.set(key, { key, name, projects: [] });

                    const entry = map.get(key);

                    // same project title = same project (so a duplicate entry is only listed once)
                    if (!entry.projects.some((p) => p.title === project.title)) {
                        entry.projects.push({ page, index, title: project.title, year: project.year });
                    }
                });
            });
        });

        return Array.from(map.values()).sort((a, b) => b.projects.length - a.projects.length);
    }

    // Fly the 3D scene to Projects, open that page, show that project
    function openProject(page, index) {
        document.querySelector('.nav-button[data-go="projects"]')?.click();

        const popup = document.getElementById("projPopup" + page);
        if (!popup || !window.PORTFOLIO) return;

        window.PORTFOLIO.openPopup(popup);
        popup.dispatchEvent(new CustomEvent("show-project", { detail: { index: Number(index) } }));
    }

    if (toolsBody && typeof PROJECTS !== "undefined") {
        const tools = collectTools();
        const counts = tools.map((t) => t.projects.length);
        const min = Math.min(...counts);
        const max = Math.max(...counts);

        const MIN_SIZE = 78;    // px, smallest bubble
        const MAX_SIZE = 150;   // px, biggest bubble

        // Lowercase every TOOL_INFO key, so "VS Code" and "vs code" both match
        const toolInfo = Object.fromEntries(
            Object.entries(typeof TOOL_INFO !== "undefined" ? TOOL_INFO : {})
                .map(([key, value]) => [key.trim().toLowerCase(), value])
        );
        const info = (tool) => toolInfo[tool.key] || {};

        toolsBody.innerHTML = `
            <p class="about-intro">Click a bubble to see what I use it for. Bigger bubble = used in more projects.</p>
            <div class="tool-field">
                ${tools.map((tool, i) => {
                    const count = tool.projects.length;
                    const size = max === min ? 100 : MIN_SIZE + ((count - min) / (max - min)) * (MAX_SIZE - MIN_SIZE);
                    const icon = info(tool).icon
                        ? `<img src="${encodeURI(info(tool).icon)}" alt="" loading="lazy">` : "";

                    return `
                    <button type="button" class="tool-ball" data-i="${i}"
                        style="--size:${size.toFixed(0)}px; --fs:${Math.max(11, size * 0.15).toFixed(0)}px;
                               --hue:${(i * 47 + 190) % 360}; --dur:${5 + (i % 4) * 0.9}s;
                               --delay:${-(i * 1.3).toFixed(1)}s;
                               --dx:${(i * 37) % 24 - 12}px; --dy:${(i * 53) % 24 - 12}px">
                        ${icon}<span class="tool-ball-name">${esc(tool.name)}</span>
                    </button>`;
                }).join("")}
            </div>
            <div class="about-detail" id="toolDetail" aria-live="polite"></div>`;

        const detail = document.getElementById("toolDetail");

        toolsBody.addEventListener("click", (e) => {
            const project = e.target.closest(".tool-project");
            if (project) {
                openProject(project.dataset.page, project.dataset.index);
                return;
            }

            const ball = e.target.closest(".tool-ball");
            if (!ball) return;

            toolsBody.querySelectorAll(".tool-ball.selected").forEach((b) => b.classList.remove("selected"));
            ball.classList.add("selected");

            const tool = tools[ball.dataset.i];
            const n = tool.projects.length;

            detail.innerHTML = `
                <h4>${esc(tool.name)}</h4>
                <p class="detail-level">Used in ${n} project${n === 1 ? "" : "s"}</p>
                <p>${info(tool).about || "Add a description in TOOL_INFO (content.js)."}</p>
                <div class="tool-projects">
                    ${tool.projects.map((p) => `
                        <button type="button" class="tool-project" data-page="${p.page}" data-index="${p.index}">
                            <strong>${p.title}</strong>
                            ${p.year ? `<span>${p.year}</span>` : ""}
                        </button>`).join("")}
                </div>`;
        });
    }


    // ---------- HOBBIES ----------
    const hobbiesBody = document.getElementById("hobbiesBody");

    if (hobbiesBody && typeof HOBBIES !== "undefined") {
        hobbiesBody.innerHTML = `
            <div class="hobby-grid">
                ${HOBBIES.map((h) => `
                    <div class="hobby-card">
                        <span class="hobby-icon" aria-hidden="true">${h.icon || "✦"}</span>
                        <h4>${h.name}</h4>
                        <p>${h.about || ""}</p>
                    </div>`).join("")}
            </div>`;
    }
})();