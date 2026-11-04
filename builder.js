// ============================================================
// BUILDER - turns content.js into HTML. Nothing to edit here.
// Must load AFTER content.js and BEFORE script.js.
// ============================================================
(() => {

    // ---------- star orbs ----------

    function orbHTML(orb, name) {
        return `
        <button class="star-orb ${orb.color}" data-point="${orb.point}" data-label="${orb.label}"
                data-popup="${orb.popup}" aria-haspopup="dialog" aria-expanded="false">
            <span class="star-body">
                <span class="star-glow"></span><span class="star-ring"></span><span class="star-spark"></span>
            </span>
            <span class="star-label">
                <span class="star-name">${name}</span>
                <span class="star-hint">
                    <span class="hint-tap">Tap to open</span><span class="hint-click">Click to open</span>
                </span>
            </span>
        </button>`;
    }

    Object.entries(ORBS).forEach(([section, orbs]) => {
        const layer = document.createElement("div");
        layer.className = "orb-layer off";
        layer.dataset.section = section;

        layer.innerHTML = orbs.map((orb) => {
            const popupTitle = document.querySelector(`#${orb.popup} .popup-head h3`);
            return orbHTML(orb, orb.name ?? popupTitle?.textContent ?? "Open");
        }).join("");

        document.body.append(layer);
    });


    // Project cards and detail pages

    const file = (project, name) => encodeURI(project.folder + name);

    function cardHTML(project) {
        const cover = project.cover
            ? `<img src="${file(project, project.cover)}" alt="${project.title}" loading="lazy">`
            : "";

        return `
        <div class="proj-card">
            <div class="proj-img">${cover}</div>
            <div class="proj-info">
                <h2>${project.title}</h2>
                <p>${project.summary}</p>
                <button class="proj-open">View project →</button>
            </div>
        </div>`;
    }

    // Compact carousel: each screenshot sits inside a button, so it can be
    // enlarged with a click, Enter or Space (and reached with Tab).
    function carouselHTML(project, id) {
        const total = project.images.length;

        const slides = project.images.map((name, i) => `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
                <button type="button" class="carousel-zoom"
                        aria-label="Enlarge screenshot ${i + 1} of ${total}">
                    <img src="${file(project, name)}"
                         class="carousel-img"
                         alt="Screenshot ${i + 1} of ${project.title}"
                         loading="lazy">
                </button>
                <p class="carousel-description">Screenshot ${i + 1} of ${total}</p>
            </div>
        `).join("");

        const controls = total > 1 ? `
            <button class="carousel-control-prev" type="button"
                    data-bs-target="#${id}" data-bs-slide="prev" aria-label="Previous screenshot">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button"
                    data-bs-target="#${id}" data-bs-slide="next" aria-label="Next screenshot">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>` : "";

        return `
        <div id="${id}" class="carousel slide project-carousel" data-bs-ride="false">
            <div class="carousel-inner">${slides}</div>
            ${controls}
        </div>`;
    }

    function pageHTML(project, id) {
        const meta = [["Role", project.role], ["Year", project.year], ["Tools", project.tools]]
            .filter(([, value]) => value)
            .map(([label, value]) => `<li><span>${label}</span>${value}</li>`)
            .join("");

        return `
        <div class="proj-page">
            <h2>${project.title}</h2>
            <p class="proj-sub">${project.summary}</p>
            ${meta ? `<ul class="proj-meta">${meta}</ul>` : ""}

            <h3>About the project</h3>
            ${project.about.map((text) => `<p>${text}</p>`).join("")}

            ${project.highlights ? `<h3>Important highlights</h3>
                <ul>${project.highlights.map((text) => `<li>${text}</li>`).join("")}</ul>` : ""}

            ${project.images ? `<h3>Media</h3>${carouselHTML(project, id + "-carousel")}` : ""}

            ${project.video ? `<h3>Video</h3>
                <div class="embed">
                    <iframe src="https://www.youtube.com/embed/${project.video}" title="${project.title} video"
                            loading="lazy" allowfullscreen></iframe>
                </div>` : ""}

            <h3>For more information:</h3>
            <p>Please go to contact and send me a message :]</p>
        </div>`;
    }

    // Fill the popup of every page number found in PROJECTS
    Object.entries(PROJECTS).forEach(([pageNumber, projects]) => {
        const body = document.querySelector(`#projPopup${pageNumber} .popup-body`);
        if (!body) return;

        const articles = projects.map((project, i) => `
            <article class="proj">
                ${cardHTML(project)}
                ${project.about ? pageHTML(project, `proj${pageNumber}-${i + 1}`) : ""}
            </article>`).join("");

        body.innerHTML = `<div class="proj-list">${articles}</div>`;
    });


    // ---------- list <-> detail page switching ----------

    document.querySelectorAll(".fade-popup").forEach((popup) => {
        const body = popup.querySelector(".popup-body");
        const projects = Array.from(popup.querySelectorAll(".proj"));
        if (!body || !projects.length) return;

        const showList = () => {
            projects.forEach((p) => p.classList.remove("is-open"));
            body.classList.remove("showing-page");
            body.scrollTop = 0;
        };

        const showPage = (project) => {
            projects.forEach((p) => p.classList.toggle("is-open", p === project));
            body.classList.add("showing-page");
            body.scrollTop = 0;
        };

        projects.forEach((project) => {
            const open = project.querySelector(".proj-open");
            const page = project.querySelector(".proj-page");

            // No detail page: grey out the button
            if (!page) {
                open.classList.add("is-empty");
                open.disabled = true;
                return;
            }

            const back = document.createElement("button");
            back.type = "button";
            back.className = "proj-back";
            back.textContent = "← Back to projects";
            back.addEventListener("click", showList);
            page.prepend(back);

            open.addEventListener("click", () => showPage(project));
        });

        // Closing the popup returns to the list and stops videos
        new MutationObserver(() => {
            if (popup.classList.contains("open") || !body.classList.contains("showing-page")) return;

            showList();
            body.querySelectorAll(".embed iframe").forEach((frame) => { frame.src = frame.src; });
        }).observe(popup, { attributes: true, attributeFilter: ["class"] });
    });


    // ---------- screenshot lightbox ----------
    // Click / tap / Enter / Space on a screenshot to inspect it full size.
    // Inside: arrows or buttons to browse, click the image to zoom to 100%,
    // Esc or the X (or clicking the dark background) to close.

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Screenshot viewer");
    lightbox.innerHTML = `
        <button type="button" class="lb-btn lb-close" aria-label="Close viewer">✕</button>
        <button type="button" class="lb-btn lb-prev" aria-label="Previous screenshot">‹</button>
        <div class="lb-stage"><img class="lb-img" alt=""></div>
        <button type="button" class="lb-btn lb-next" aria-label="Next screenshot">›</button>
        <p class="lb-caption"></p>`;
    document.body.append(lightbox);

    const lbStage = lightbox.querySelector(".lb-stage");
    const lbImg = lightbox.querySelector(".lb-img");
    const lbCaption = lightbox.querySelector(".lb-caption");
    const lbPrev = lightbox.querySelector(".lb-prev");
    const lbNext = lightbox.querySelector(".lb-next");
    const lbClose = lightbox.querySelector(".lb-close");

    let lbItems = [];
    let lbIndex = 0;
    let lbCarousel = null;
    let lbReturnFocus = null;

    function lbShow() {
        const item = lbItems[lbIndex];
        lbImg.src = item.src;
        lbImg.alt = item.alt;
        lbImg.classList.remove("zoomed");
        lbStage.scrollTo(0, 0);
        lbCaption.textContent = `${item.alt} (${lbIndex + 1} / ${lbItems.length})`;
        const single = lbItems.length < 2;
        lbPrev.hidden = single;
        lbNext.hidden = single;
    }

    function lbStep(delta) {
        if (lbItems.length < 2) return;
        lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
        lbShow();
    }

    function lbOpen(carousel, index, trigger) {
        lbCarousel = carousel;
        lbReturnFocus = trigger;
        lbItems = Array.from(carousel.querySelectorAll(".carousel-img"))
            .map((img) => ({ src: img.currentSrc || img.src, alt: img.alt }));
        lbIndex = index;
        lightbox.hidden = false;
        document.documentElement.classList.add("lightbox-open");
        lbShow();
        lbClose.focus();
    }

    function lbDismiss() {
        lightbox.hidden = true;
        document.documentElement.classList.remove("lightbox-open");
        lbImg.removeAttribute("src");

        // keep the carousel on the slide that was being viewed
        if (lbCarousel && window.bootstrap?.Carousel) {
            window.bootstrap.Carousel.getOrCreateInstance(lbCarousel).to(lbIndex);
        }
        lbReturnFocus?.focus?.();
        lbCarousel = lbReturnFocus = null;
    }

    // open from any screenshot button
    document.addEventListener("click", (event) => {
        const trigger = event.target.closest(".carousel-zoom");
        if (!trigger) return;

        const carousel = trigger.closest(".carousel");
        const slides = Array.from(carousel.querySelectorAll(".carousel-item"));
        lbOpen(carousel, slides.indexOf(trigger.closest(".carousel-item")), trigger);
    });

    lbPrev.addEventListener("click", () => lbStep(-1));
    lbNext.addEventListener("click", () => lbStep(1));
    lbClose.addEventListener("click", lbDismiss);
    lbImg.addEventListener("click", () => lbImg.classList.toggle("zoomed"));

    // click on the dark area (not the image or buttons) closes
    lbStage.addEventListener("click", (event) => {
        if (event.target === lbStage) lbDismiss();
    });

    // capture phase, so Esc closes only the viewer and not the popup behind it
    document.addEventListener("keydown", (event) => {
        if (lightbox.hidden) return;

        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            lbDismiss();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            event.stopPropagation();
            lbStep(-1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            lbStep(1);
        } else if (event.key === "Tab") {
            // keep focus inside the viewer
            const focusable = Array.from(lightbox.querySelectorAll(".lb-btn")).filter((b) => !b.hidden);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }, true);

})();