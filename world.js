(() => {
  const THREE = window.THREE;

  // ============================================================
  // 1. SETTINGS — EASY CUSTOMIZATION
  // ============================================================

  const SETTINGS = {
    cameraSpeed: 0.025,
    mouseParallax: 0.1,
    constellationRotation: 0,
    cameraOffset: [0, 0, 10],

    starCount: 1100,
    starSize: 0.5,

    backgroundColor: 0x050508,

    mountainDeep: 0x070914,
    mountainShadow: 0x111326,
    mountainBase: 0x292b49,
    mountainHighlight: 0x7789ad,

    treeDark: 0x090d1b,
    treeHighlight: 0x1b2340,

    ambientColor: 0x555b8c,
    directionalColor: 0x9aa9ff,
  };

  // ============================================================
  // 2. LANDSCAPE POSITION — CHANGE THIS FIRST
  // ============================================================

  const LANDSCAPE_POSITION = {
    x: 0,
    y: -12,
    z: -8,
  };

  // ============================================================
  // 3. CAMERA POSITION
  // ============================================================

  const CAMERA = {
    homeCameraHeight: 4,
    homeLookHeight: 8,
    homeDistance: 23,
    homeLookDepth: -2,
  };

  // ============================================================
  // 3b. [CHANGED] CONSTELLATION SIZE ON SCREEN
  //     The shapes now scale automatically so they are big on desktop
  //     and still fit on a phone (portrait or landscape).
  // ============================================================

  const CONSTELLATION_VIEW = {
    desktopScale: 2.0,            // max size of the shapes (was 0.8) - make bigger/smaller here
    maxWidthFraction: 0.8,        // a shape may use at most 80% of the screen width
    maxHeightFraction: 0.5,       // ...and at most 50% of the screen height
    portraitLowerBy: 0.12,        // phones (portrait): push the shape down 12% so it clears the text
    shortLandscapeShiftRight: 0.16, // phones (landscape): push the shape right so it clears the text
  };

  // ============================================================
  // 4. ZODIAC / NAVIGATION POSITIONS
  // ============================================================

  // [CHANGED] x and y are close together, the depth (z) is far apart,
  // so the three zodiacs sit behind each other and all show up on a phone.
  // Smaller x/y numbers = closer together, bigger z gap = more depth.

  const SECTIONS = {
    home: {
      shape: "mountain",
      color: 0x312e81,
      at: [
        LANDSCAPE_POSITION.x,
        LANDSCAPE_POSITION.y,
        LANDSCAPE_POSITION.z,
      ],
    },

    about: {
      shape: "person",
      color: 0x06b6d4,
      at: [5, 6, -30],      // nearest to the camera
      scale: 0.8,
    },

    projects: {
      shape: "folder",
      color: 0xec4899,
      at: [-5, 9, -42],     // in the middle
      scale: 0.8,
    },

    contact: {
      shape: "envelope",
      color: 0xf59e0b,
      at: [0, 3, -54],      // furthest away
      scale: 0.8,
    },
  };

  // ============================================================
  // 5. MOUNTAIN DESIGN
  // ============================================================

  const MOUNTAIN = {
    width: 44,
    depth: 48,

    segmentsX: 48,
    segmentsZ: 40,

    peaks: [
      [-18, -17, 2.8, 4.0],
      [-13, -19, 4.8, 3.5],
      [-8, -16, 3.0, 3.5],
      [-3, -18, 4.0, 3.5],
      [2, -16, 2.8, 3.0],
      [7, -19, 4.5, 3.5],
      [12, -17, 3.3, 3.2],
      [17, -15, 4.0, 4.0],

      [-16, -9, 1.8, 4.0],
      [-9, -10, 2.0, 3.5],
      [-2, -9, 1.8, 4.0],
      [6, -10, 2.2, 4.0],
      [14, -8, 1.8, 4.0],
    ],
  };

  // ============================================================
  // 6. CONSTELLATION DESIGNS
  // ============================================================

  const CONSTELLATIONS = {
    // ABOUT: a person.
    person: {
      points: [
        [0, 0.95],      // 0: Head top
        [-0.22, 0.72],  // 1: Head left
        [0.22, 0.72],   // 2: Head right
        [0, 0.52],      // 3: Head bottom
        [-0.35, 0.40],  // 4: Left shoulder
        [0.35, 0.40],   // 5: Right shoulder
        [-0.48, -0.28], // 6: Left hand
        [0.48, -0.28],  // 7: Right hand
        [-0.18, 0.12],  // 8: Left inner chest
        [0.18, 0.12],   // 9: Right inner chest
        [-0.20, -0.25], // 10: Left hip
        [0.20, -0.25],  // 11: Right hip
        [0, -0.32],     // 12: Center pelvis
        [-0.22, -0.85], // 13: Left foot
        [0.22, -0.85],  // 14: Right foot
      ],

      lines: [
        // Head diamond
        [0, 1], [1, 3], [3, 2], [2, 0],
        // Neck and shoulders
        [3, 4], [3, 5], [4, 5],
        // Arms
        [4, 6], [5, 7],
        // Torso structure
        [4, 8], [5, 9],
        [8, 10], [9, 11],
        [10, 11],
        // Pelvis & Legs
        [10, 12], [11, 12],
        [10, 13], [11, 14],
        // Inner leg diagonal braces
        [12, 13], [12, 14],
      ],
    },

    // CONTACT: an envelope.
    envelope: {
      points: [
        [-1.0, 0.62],  // 0: Top-left
        [1.0, 0.62],   // 1: Top-right
        [-1.0, -0.62], // 2: Bottom-left
        [1.0, -0.62],  // 3: Bottom-right
        [0, 0.02],     // 4: Center flap tip
      ],

      lines: [
        [0, 1],        // Top edge
        [1, 3],        // Right edge
        [3, 2],        // Bottom edge
        [2, 0],        // Left edge
        [0, 4],        // Flap line left
        [1, 4],        // Flap line right
      ],
    },

    // PROJECTS: a folder.
    folder: {
      points: [
        [-1.0, -0.65],
        [-1.0, 0.38],
        [-0.38, 0.38],
        [-0.08, 0.12],
        [1.0, 0.12],
        [1.0, -0.65],
        [0.0, -0.65],
        [-0.72, -0.25],
        [0.72, -0.25],
      ],

      lines: [
        [0, 1], [1, 2],
        [2, 3], [3, 4],
        [4, 5], [5, 6],
        [6, 0], [7, 8],
      ],
    },
  };

  // ============================================================
  // 7. INITIALIZE THREE.JS
  // ============================================================

  const canvas = document.querySelector("#world-canvas");

  if (!canvas) {
    console.error("Missing #world-canvas element.");
    return;
  }

  if (!THREE) {
    console.error("Three.js has not been loaded.");
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
  );

  const scene = new THREE.Scene();

  scene.background = new THREE.Color(
    SETTINGS.backgroundColor
  );

  const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    1000
  );

  scene.add(
    new THREE.AmbientLight(
      SETTINGS.ambientColor,
      1.1
    )
  );

  const directionalLight = new THREE.DirectionalLight(
    SETTINGS.directionalColor,
    1.4
  );

  directionalLight.position.set(-5, 10, 6);
  scene.add(directionalLight);

  // ============================================================
  // 8. BACKGROUND STARS (FIXED DEPTH & GLITCHING)
  // ============================================================

  const starGeometry = new THREE.BufferGeometry();
  const starPositions = [];
  const starPhases = [];

  for (let i = 0; i < SETTINGS.starCount; i++) {
    starPositions.push(
      (Math.random() - 0.5) * 140,
      (Math.random() - 0.5) * 140,
      -Math.random() * 35 - 35 // Safely placed behind mountains (Z = -35 to -70)
    );

    starPhases.push(
      Math.random() * Math.PI * 2
    );
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      starPositions,
      3
    )
  );

  starGeometry.setAttribute(
    "phase",
    new THREE.Float32BufferAttribute(
      starPhases,
      1
    )
  );

  const uTime = { value: 0 };

  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime,
      uStarSize: {
        value: SETTINGS.starSize,
      },
    },

    vertexShader: `
      attribute float phase;
      uniform float uTime;
      uniform float uStarSize;
      varying float vPhase;

      void main() {
        vPhase = phase;

        vec4 mvPosition =
          modelViewMatrix * vec4(position, 1.0);

        float pulse =
          (3.5 + 1.5 * sin(uTime + phase))
          * uStarSize;

        // Minimum floor added to stop sub-pixel glitching/flickering
        float sizeFactor = 70.0 / max(5.0, -mvPosition.z);
        gl_PointSize = max(1.5, pulse * sizeFactor);

        gl_Position =
          projectionMatrix * mvPosition;
      }
    `,

    fragmentShader: `
      uniform float uTime;
      varying float vPhase;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);

        if (length(coord) > 0.45) discard;

        if (
          abs(coord.x) > 0.12 &&
          abs(coord.y) > 0.12
        ) discard;

        float blink =
          0.5 + 0.5 * sin(uTime + vPhase);

        gl_FragColor = vec4(
          vec3(1.0, 0.98, 0.8),
          blink * 0.7 + 0.3
        );
      }
    `,

    transparent: true,
    depthWrite: false,
  });

  scene.add(
    new THREE.Points(
      starGeometry,
      starMaterial
    )
  );

  // ============================================================
  // 9. MOUNTAIN HEIGHT FUNCTION
  // ============================================================

  function terrainHeight(x, z) {
    let y = 0;

    for (const [px, pz, height, spread] of MOUNTAIN.peaks) {
      const dx = (x - px) / spread;
      const dz = (z - pz) / spread;

      const distance = Math.sqrt(
        dx * dx + dz * dz
      );

      const ridge = Math.max(0, 1 - distance);

      y += height * ridge * ridge;
    }

    y += Math.sin(x * 1.15 + z * 0.43) * 0.25;
    y += Math.cos(z * 1.35 - x * 0.32) * 0.2;
    y += Math.sin(x * 0.37 + z * 0.82) * 0.2;

    const foreground = THREE.MathUtils.smoothstep(
      z,
      0,
      16
    );

    y *= 1 - foreground * 0.7;

    return y;
  }

  // ============================================================
  // 10. CREATE LOW-POLY LANDSCAPE
  // ============================================================

  function createMountainGeometry() {
    const geo = new THREE.PlaneGeometry(
      MOUNTAIN.width,
      MOUNTAIN.depth,
      MOUNTAIN.segmentsX,
      MOUNTAIN.segmentsZ
    );

    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      pos.setY(
        i,
        terrainHeight(x, z)
      );
    }

    const lowPoly = geo.toNonIndexed();

    lowPoly.computeVertexNormals();

    const p = lowPoly.attributes.position;
    const n = lowPoly.attributes.normal;
    const colors = [];

    const deep = new THREE.Color(
      SETTINGS.mountainDeep
    );

    const shadow = new THREE.Color(
      SETTINGS.mountainShadow
    );

    const base = new THREE.Color(
      SETTINGS.mountainBase
    );

    const highlight = new THREE.Color(
      SETTINGS.mountainHighlight
    );

    for (let i = 0; i < p.count; i++) {
      const height = p.getY(i);
      const upward = n.getY(i);

      const color = deep.clone();

      if (height > 0.3) {
        color.lerp(
          shadow,
          THREE.MathUtils.clamp(
            height / 2.5,
            0,
            1
          )
        );
      }

      if (height > 1.0) {
        color.lerp(
          base,
          THREE.MathUtils.clamp(
            (height - 1) / 3,
            0,
            0.8
          )
        );
      }

      if (upward > 0.68 && height > 0.8) {
        color.lerp(
          highlight,
          (upward - 0.68) * 0.35
        );
      }

      colors.push(
        color.r,
        color.g,
        color.b
      );
    }

    lowPoly.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(
        colors,
        3
      )
    );

    geo.dispose();

    return lowPoly;
  }

  const meshes = {};

  const home = new THREE.Mesh(
    createMountainGeometry(),
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide,
    })
  );

  home.position.set(
    LANDSCAPE_POSITION.x,
    LANDSCAPE_POSITION.y,
    LANDSCAPE_POSITION.z
  );

  scene.add(home);
  meshes.home = home;

  // ============================================================
  // 11. CREATE ZODIAC CONSTELLATIONS
  // ============================================================

  function createConstellation(name, color) {
    const data = CONSTELLATIONS[name];
    const group = new THREE.Group();

    const linePositions = [];

    for (const [a, b] of data.lines) {
      const pointA = data.points[a];
      const pointB = data.points[b];

      linePositions.push(
        pointA[0], pointA[1], 0,
        pointB[0], pointB[1], 0
      );
    }

    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        linePositions,
        3
      )
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });

    group.add(
      new THREE.LineSegments(
        lineGeometry,
        lineMaterial
      )
    );

    const positions = data.points.flatMap(
      ([x, y]) => [x, y, 0.015]
    );

    const pointsGeometry = new THREE.BufferGeometry();

    pointsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        positions,
        3
      )
    );

    const haloMaterial = new THREE.PointsMaterial({
      color,
      size: 0.15,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      sizeAttenuation: true,
    });

    group.add(
      new THREE.Points(
        pointsGeometry,
        haloMaterial
      )
    );

    const coreMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.065,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      sizeAttenuation: true,
    });

    group.add(
      new THREE.Points(
        pointsGeometry,
        coreMaterial
      )
    );

    group.userData.constellationMaterials = {
      line: lineMaterial,
      halo: haloMaterial,
      star: coreMaterial,
    };

    return group;
  }

  for (const name of ["about", "projects", "contact"]) {
    const section = SECTIONS[name];

    const constellation = createConstellation(
      section.shape,
      section.color
    );

    constellation.scale.setScalar(
      section.scale ?? 0.8
    );

    constellation.position.set(...section.at);

    scene.add(constellation);
    meshes[name] = constellation;
  }

  // ============================================================
  // 12. TREES
  // ============================================================

  const TREE_POSITIONS = [
    [8, 5, 0.7],
    [2, 10, 1.2],
    [-2, 5, 1.1],
    [-5, 5, 0.7],
    [-5, 7, 0.9],
    [-9, 4, 0.7],
    [-5, 7, 1.2],
  ];

  const treeDark = new THREE.MeshStandardMaterial({
    color: SETTINGS.treeDark,
    roughness: 1,
    flatShading: true,
  });

  const treeLight = new THREE.MeshStandardMaterial({
    color: SETTINGS.treeHighlight,
    roughness: 1,
    flatShading: true,
  });

  function addTree(x, z, scale) {
    const tree = new THREE.Group();

    const lower = new THREE.Mesh(
      new THREE.ConeGeometry(0.48, 1.3, 5),
      treeDark
    );

    lower.position.y = 0.55;
    tree.add(lower);

    const upper = new THREE.Mesh(
      new THREE.ConeGeometry(0.32, 1.0, 5),
      treeLight
    );

    upper.position.y = 1.05;
    tree.add(upper);

    tree.position.set(
      x,
      terrainHeight(x, z),
      z
    );

    tree.scale.setScalar(scale);

    home.add(tree);
  }

  for (const [x, z, scale] of TREE_POSITIONS) {
    addTree(x, z, scale);
  }

  // ============================================================
  // 13. CAMERA AND NAVIGATION
  // ============================================================

  const goalPos = new THREE.Vector3();
  const goalLook = new THREE.Vector3();
  const look = new THREE.Vector3();

  const mouse = {
    x: 0,
    y: 0,
  };

  // [CHANGED] which section we are on + screen-dependent camera shift
  let currentSection = "home";
  const viewShift = { x: 0, y: 0 };

  // [CHANGED] Sizes the three constellations to the screen and works out
  // how far to shift the camera so they never sit under the text.
  function applyConstellationScale() {
    const distance = SETTINGS.cameraOffset[2];

    const visibleHeight =
      2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const visibleWidth = visibleHeight * camera.aspect;

    const widestShape = 2.0;   // envelope / folder width (in shape units)
    const tallestShape = 1.8;  // person height (in shape units)

    const scale = Math.min(
      CONSTELLATION_VIEW.desktopScale,
      (visibleWidth * CONSTELLATION_VIEW.maxWidthFraction) / widestShape,
      (visibleHeight * CONSTELLATION_VIEW.maxHeightFraction) / tallestShape
    );

    for (const name of ["about", "projects", "contact"]) {
      meshes[name].scale.setScalar(scale);
    }

    viewShift.x = 0;
    viewShift.y = 0;

    if (camera.aspect < 1) {
      // Phone in portrait: text is at the top, so move the shape down
      viewShift.y = visibleHeight * CONSTELLATION_VIEW.portraitLowerBy;
    } else if (window.innerHeight < 520) {
      // Phone in landscape: text is on the left, so move the shape right
      viewShift.x = -visibleWidth * CONSTELLATION_VIEW.shortLandscapeShiftRight;
    }
  }

  // [CHANGED] Camera goals are now recalculated here (also on resize)
  function updateGoals() {
    const section = SECTIONS[currentSection];

    if (!section) return;

    if (currentSection === "home") {
      goalPos.set(
        LANDSCAPE_POSITION.x,
        LANDSCAPE_POSITION.y + CAMERA.homeCameraHeight,
        LANDSCAPE_POSITION.z + CAMERA.homeDistance
      );

      goalLook.set(
        LANDSCAPE_POSITION.x,
        LANDSCAPE_POSITION.y + CAMERA.homeLookHeight,
        LANDSCAPE_POSITION.z + CAMERA.homeLookDepth
      );
    } else {
      goalPos.set(...section.at).add(
        new THREE.Vector3(
          ...SETTINGS.cameraOffset
        )
      );

      goalLook.set(...section.at);

      // Move camera AND target together so the view stays straight-on
      goalPos.x += viewShift.x;
      goalLook.x += viewShift.x;
      goalPos.y += viewShift.y;
      goalLook.y += viewShift.y;
    }
  }

  function flyTo(name) {
    const section = SECTIONS[name];

    if (!section) return;

    currentSection = name;
    updateGoals();

    document.querySelectorAll("[data-go]").forEach(
      (button) => {
        button.classList.toggle(
          "active",
          button.dataset.go === name
        );
      }
    );

    document.querySelectorAll("[data-panel]").forEach(
      (panel) => {
        panel.hidden =
          panel.dataset.panel !== name;
      }
    );
  }

  document.querySelectorAll("[data-go]").forEach(
    (button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        flyTo(button.dataset.go);
      });
    }
  );

  window.addEventListener("mousemove", (event) => {
    mouse.x =
      event.clientX / window.innerWidth - 0.5;

    mouse.y =
      event.clientY / window.innerHeight - 0.5;
  });

  // ============================================================
  // 14. RESIZE
  // ============================================================

  function resize() {
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    camera.aspect =
      window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    // [CHANGED] re-fit the constellations + camera to the new screen size
    applyConstellationScale();
    updateGoals();
  }

  window.addEventListener("resize", resize);
  resize();

  // ============================================================
  // 15. OPTIONAL TWEAK PANEL
  // ============================================================

  if (window.lil) {
    const gui = new window.lil.GUI({
      title: "Scene settings",
    });

    gui.add(
      SETTINGS,
      "starSize",
      0.3,
      2.5,
      0.1
    )
      .name("Star size")
      .onChange((value) => {
        starMaterial.uniforms.uStarSize.value = value;
      });

    // [CHANGED] now controls the real size setting
    gui.add(
      CONSTELLATION_VIEW,
      "desktopScale",
      0.5,
      3,
      0.05
    )
      .name("Symbol size")
      .onChange(() => {
        applyConstellationScale();
        updateGoals();
      });

    for (const name of ["about", "projects", "contact"]) {
      const materials =
        meshes[name].userData.constellationMaterials;

      const folder = gui.addFolder(name);

      folder.addColor(
        {
          color: "#" + materials.line.color.getHexString(),
        },
        "color"
      ).onChange((value) => {
        materials.line.color.set(value);
        materials.halo.color.set(value);
      });

      folder.add(
        materials.line,
        "opacity",
        0.0,
        1,
        0.05
      ).name("Line brightness");

      folder.add(
        materials.halo,
        "opacity",
        0,
        0.8,
        0.05
      ).name("Star glow");
    }
  }

  // ============================================================
  // 16. START AT HOME
  // ============================================================

  // [CHANGED] Hook so script.js can place the HTML star-orbs on the 3D person
  window.WORLD = {
    THREE,
    camera,
    meshes,
    constellations: CONSTELLATIONS,
    onFrame: null,
  };

  flyTo("home");

  camera.position.copy(goalPos);
  look.copy(goalLook);

  camera.lookAt(look);

  // ============================================================
  // 17. ANIMATION LOOP
  // ============================================================

  // [CHANGED] the constellations you are NOT looking at fade down (on Home all are bright)
  const INACTIVE_BRIGHTNESS = 0.3;   // 0 = invisible, 1 = no dimming
  const fadeLevel = { about: 1, projects: 1, contact: 1 };
  const baseOpacity = {};

  for (const name of ["about", "projects", "contact"]) {
    const m = meshes[name].userData.constellationMaterials;
    baseOpacity[name] = {
      line: m.line.opacity,
      halo: m.halo.opacity,
      star: m.star.opacity,
    };
  }

  renderer.setAnimationLoop((now) => {
    uTime.value = now * 0.001;

    for (const name of ["about", "projects", "contact"]) {
      const target =
        currentSection === "home" || currentSection === name
          ? 1
          : INACTIVE_BRIGHTNESS;

      fadeLevel[name] += (target - fadeLevel[name]) * 0.05;

      const m = meshes[name].userData.constellationMaterials;
      const b = baseOpacity[name];

      m.line.opacity = b.line * fadeLevel[name];
      m.halo.opacity = b.halo * fadeLevel[name];
      m.star.opacity = b.star * fadeLevel[name];
    }

    for (const name of ["about", "projects", "contact"]) {
      meshes[name].rotation.z =
        uTime.value * SETTINGS.constellationRotation;
    }

    const target = goalPos.clone().add(
      new THREE.Vector3(
        mouse.x * SETTINGS.mouseParallax,
        -mouse.y * SETTINGS.mouseParallax,
        0
      )
    );

    camera.position.lerp(
      target,
      SETTINGS.cameraSpeed
    );

    look.lerp(
      goalLook,
      SETTINGS.cameraSpeed
    );

    camera.lookAt(look);

    renderer.render(scene, camera);

    // [CHANGED] let script.js update the orb positions after every frame
    if (window.WORLD && window.WORLD.onFrame) {
      window.WORLD.onFrame();
    }
  });
})();