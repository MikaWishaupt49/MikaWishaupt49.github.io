// ------------------------------------------------------------
// CONTACT
// email    -> shown as fallback if sending fails
// endpoint -> FormSubmit forwards the form to your inbox.
//             The first submission sends an activation email to
//             m.wishaupt@hotmail.nl: click the link in it (check spam).
// ------------------------------------------------------------
const CONTACT = {
    email: "m.wishaupt@hotmail.nl",
    endpoint: "https://formsubmit.co/ajax/m.wishaupt@hotmail.nl",
};


// ------------------------------------------------------------
// PROJECTS
// images: a plain filename OR { file: "name.png", caption: "text" }
// Captions may contain basic HTML (<b>, <a href="...">).
// tools: comma separated. These feed the "Favourite tools" bubbles
// (keep the spelling consistent: "Blender", not "Blender 3D").
//
// TEMPLATE for a new project (copy this into Page 2, 3 or 4):
// {
//     title: "Project name",
//     summary: "One-line description.",
//     folder: "Assets zelfgemaakt/projects/FolderName/",
//     cover: "cover.png",
//     role: "Your role",
//     year: "2026",
//     tools: "Tool one, Tool two",
//     about: [ `Paragraph one.`, `Paragraph two.` ],
//     highlights: [ "Highlight one", "Highlight two" ],
//     images: [
//         { file: "image1.png", caption: "What this image shows." },
//         { file: "image2.png", caption: "What this image shows." },
//     ],
//     video: "YouTubeVideoId",
// },
// ------------------------------------------------------------
const PROJECTS = {
    // Page 1
    1: [
        // Project 1
        {
            title: "EduCAD",
            summary: "An adaptive education tool to accelerate the learning process of inCAD for different employees",
            folder: "Assets zelfgemaakt/projects/EduCAD/",
            cover: "CAD-1.png",
            role: "Designer & Researcher",
            year: "2026",
            tools: "Godot, Inkscape, LM Studio",
            about: [
                `For Nunu I worked on their tool called inCAD to let people learn more effectively based on their learning outcomes (<a href="https://incad.nl/" target="_blank" rel="noopener">link inCAD</a>).`,

                `In the end I came up with EduCAD, an additional tool that leverages the power of AI and data to accelerate the learning process of inCAD. Different users come with different needs: inCAD has tasks for an electrical engineer as well as for a project manager. EduCAD lets users create adaptive learning courses based on their wishes and needs. A project manager might need further education in file structuring while an engineer needs a deeper understanding of the schematics. With EduCAD, both can learn at their own pace with the help of AI.`,

                `EduCAD gave me ideas on how to make education more accessible for different users, and it showed me the important ethical decisions when working with personal AI and data. In a future with more AI and data, it becomes more and more important to have designers also working as researchers, working towards the best outcome for different stakeholders.`,
            ],
            highlights: [
                "Ethical understanding of AI and data",
                "Working with emerging technology",
                "Deep research from different academic sources and working on my own insights",
            ],
            images: [
                { file: "Homepage filled example.png",
                  caption: "The EduCAD homepage with example data, giving the user a quick overview of their courses and progress." },
                { file: "MyCourse page example 1 filled - layout path.png",
                  caption: "A filled-in course page in the <b>path</b> layout, where the lessons are shown as a route the learner follows step by step." },
                { file: "MyCourse page example 2.png",
                  caption: "A second course page example, showing how the content changes depending on the course and the learner." },
                { file: "MyCourse page example 3.png",
                  caption: "A third course page example, showing a different topic and learning focus." },
                { file: "MyCourse page Layout default-1.png",
                  caption: "The <b>default</b> course layout: a clear, list-based overview of all lessons." },
                { file: "MyCourse page Layout tree-1.png",
                  caption: "The <b>tree</b> layout, which shows how lessons build on each other and lets users see the bigger picture of a course." },
                { file: "MyCourses Edit course.png",
                  caption: "The edit screen where users adjust a course to their own wishes and needs." },
                { file: "MyCourses page Edit AI-1.png",
                  caption: "Where the user controls how the AI helps shape the course, keeping the user in charge of their own data and learning." },
                { file: "MyCourses page Join.png",
                  caption: "The join screen, where users can find and join existing courses." },
            ],
            video: "ZAKFlKwHR0E",
        },

        // Project 2
        {
            title: "Create a High-end Video Game",
            summary: "Working on your own game and a big project with over more than 30 people",
            folder: "Assets zelfgemaakt/projects/MinorHAN/",
            cover: "Screenshot 2024-01-19 150025.png",
            role: "Designer & Artist",
            year: "2023",
            tools: "Unity, Blender, VS Code, Git, Audacity",
            about: [
                `During the minor, I learned to conceptualize and put my creative ideas into functional ideas. With the first part of the minor, I learned how to differentiate different art approaches for a game environment and worked on my own concepts. During classes I got a lot of theory about game design from User Experience (UX) to overall coverage of what makes a game fun for certain types of audiences.`,

                `Later during the minor, one of the games got chosen to be part of the art team as the environmental artist, which I mostly did. From sketching out ideas to 3D modeling whole animal enclosures to buildings. It was a fun experience where previously learned skills came to use while working with more than 30 other individuals with their own ideas, workflows, and communication preferences.`,

                `I also worked on audio manipulation and programming for game development to get an all-round understanding of what it means to be part of the gaming industry.`,

                `Crazy Croc game: <a href="https://the-crazy-crocs.itch.io/the-crazy-croc" target="_blank" rel="noopener">link group game</a>.`
            ],
            highlights: [
                "Understanding game design fundamentals",
                "Working with a big group with different tasks",
                "Creative thinking to prototyping and functional products",
            ],
            // CHECK these captions: I wrote them from the filenames and your project text.
            images: [
                { file: "20231117_111932.jpg",
                  caption: "A photo from the minor, taken during the early concept and reference phase of the project." },
                { file: "caveroof2.png",
                  caption: "A 3D model of a cave roof, made as part of the environment art for the game." },
                { file: "DSCN1351.JPG",
                  caption: "A reference photo used as inspiration for the animal enclosures and buildings I modelled." },
                { file: "Examples_environment_work (1).png",
                  caption: "Environment work for the game: one of the 3D enclosures I modelled and textured." },
                { file: "Examples_environment_work (2).png",
                  caption: "More environment work, showing how the props and buildings fit together in one scene." },
                { file: "Examples_environment_work (3).png",
                  caption: "A further example of the environment art, made in Blender and placed in Unity." },
                { file: "textureStatue.png",
                  caption: "Texture work on a statue, exploring how materials and detail bring a 3D model to life." },
                { file: "Screenshot 2023-09-29 112706.png",
                  caption: "An early prototype from the first part of the minor, when I was exploring my own game concepts." },
                { file: "Screenshot 2024-01-19 145839.png",
                  caption: "A screenshot of the finished Crazy Croc game, showing the environment in-engine." },
                { file: "Screenshot 2024-01-19 145944.png",
                  caption: "Another in-game view of Crazy Croc, showing the work of the whole art team together." },
                { file: "Screenshot 2024-01-19 150025.png",
                  caption: "The final look of the game, with the environment art I contributed in place." },
                { file: "Screenshot 2026-11-04 134029.png",
                  caption: "A closer look at one of the environments I created for the game." },
                { file: "Screenshot 2026-11-04 134107.png",
                  caption: "Another close-up of the environment art, showing the level of detail in the models." },
            ],
            video: "7IKRfPL_DA4&t",
        },

        // Project 3
        {
            title: "Planned Obsolescence and humans",
            summary: "Critical design about planned obsolescence and the role of humans and AI",
            folder: "Assets zelfgemaakt/projects/CMDGraduation/",
            cover: "RobotFace.png",
            role: "Designer, Artist & developer",
            year: "2025",
            tools: "Godot, Blender, VS Code, Git, Indesign, Illustrator, Audacity",
            about: [
                `During my graduation for BSc CMD (Communication & Multimedia Design) I worked with the Avans research group "Brede Welvaart en Nieuwe Ondernemerschap / Broad Prosperity and New Entrepreneurship" on the topic of Planned Obsolescence (PO) and the impacts of it on a large scale. From environmental problems, consumers and general impact on our society.`,

                `During my research I explored many different topics within PO and came up with the idea of PO, humans and AI. With more and more people fearing being replaced with AI I focused on the gaming industry. My concept mainly contained a physical and digital layer.`,

                `The physical layer consisted of a fictional office that was slowly drowned by the replacement and usage of AI.`,

                `The digital layer consisted mostly of two games. 1 game was the so-called human game that was made by me and designed with gamers. The idea was to update the game every time when played with a new test group to show the importance of human labour and communication during the development.`,

                `The other so-called 'AI' game was also designed by me with principles of generative design where I used things like mathematical design to create generative shapes. The idea showed an AI game with an AI that follows you around and pushes you off the map. The idea behind it is to show that while AI can do certain tasks, it should not be a complete replacement of humans and with too much help it can harm the user.`,

                `The project showed me the impact of PO on our world but also new emerging problems with overusage of AI and was for me a foundation that also became part of joining the master program Data-Driven Design.`,

                `Link project itch human game: <a href="https://mikawishaupt49.itch.io/bytejump" target="_blank" rel="noopener">link</a>.<br>
                Link project itch 'AI' game: <a href="https://mikawishaupt49.itch.io/byterunner-vm" target="_blank" rel="noopener">link</a>.`
            ],
            highlights: [
                "Researching a topic and add my personal approach to it",
                "Designing, developing and testing prototypes and products",
            ],
            // CHECK these captions: I wrote them from the filenames and your project text.
            images: [
                { file: "20250115_123751.jpg",
                  caption: "The physical layer of the concept: a fictional office that is slowly taken over by AI." },
                { file: "m-post-1 (1).png",
                  caption: "A designed post from the project, communicating the theme of planned obsolescence." },
                { file: "m-post-1 (2).png",
                  caption: "A second post in the same series, continuing the story about humans and AI." },
                { file: "Screenshot 2025-01-16 123155.png",
                  caption: "A screenshot from the human game, which was updated after every test round with new players." },
                { file: "Screenshot 2025-01-16 124816.png",
                  caption: "A view of the 'AI' game, built with generative design and mathematical shapes." },
                { file: "Screenshot 2025-01-17 104921.png",
                  caption: "The AI that follows the player and pushes them off the map, showing how too much help can harm the user." },
            ],
            video: "H43tg9wHPHg",
        },
    ],

    // Page 2
    2: [
        { title: "Project four", summary: "A short description of the project goes here." },
        { title: "Project five", summary: "A short description of the project goes here." },
        { title: "Project six", summary: "A short description of the project goes here." },
    ],

    // Page 3
    3: [
        { title: "Project seven", summary: "A short description of the project goes here." },
        { title: "Project eight", summary: "A short description of the project goes here." },
        { title: "Project nine", summary: "A short description of the project goes here." },
    ],

    // Page 4
    4: [
        { title: "Project ten", summary: "A short description of the project goes here." },
        { title: "Project eleven", summary: "A short description of the project goes here." },
        { title: "Project twelve", summary: "A short description of the project goes here." },
    ],
};


// ------------------------------------------------------------
// SKILL TREE (your creative journey, top to bottom)
// size:  "minor" | "notable" | "keystone"
// state: "done" | "current" | "locked"
// from:  ids of the nodes this one connects to (draws the lines)
// x / y: position in a 480 x 960 box
// open:  true = draws a dashed trail below it (the tree is not finished)
// ------------------------------------------------------------
const SKILL_TREE = {
    width: 480,
    height: 960,
    branches: {
        start:   { color: "#fde68a" },
        origin:  { color: "#f59e0b" },
        cmd:     { color: "#06b6d4" },
        minor:   { color: "#ec4899" },
        grad:    { color: "#22d3ee" },
        master:  { color: "#a78bfa" },
        journey: { color: "#34d399" },
        future:  { color: "#94a3b8" },
    },
    nodes: [
        { id: "start", name: "The spark", icon: "✦", x: 240, y: 34, size: "keystone", state: "done", branch: "start",
          about: "It started with making things for the fun of it: videos, animations and music." },

        // ---- Origins ----
        { id: "yt", name: "YouTube", icon: "📹", x: 80, y: 96, size: "notable", state: "done", branch: "origin", from: ["start"],
          about: "Making and uploading videos on YouTube. My first real taste of telling stories to an audience." },
        { id: "yt1", name: "Storytelling", x: 48, y: 158, size: "minor", state: "done", branch: "origin", from: ["yt"],
          about: "Learning what makes people keep watching." },
        { id: "yt2", name: "Video editing", x: 112, y: 168, size: "minor", state: "done", branch: "origin", from: ["yt"],
          about: "Cutting, pacing and polishing videos." },

        { id: "an", name: "Animation", icon: "🎞️", x: 240, y: 100, size: "notable", state: "done", branch: "origin", from: ["start"],
          about: "Bringing drawings and ideas to life through animation." },
        { id: "an1", name: "Motion", x: 208, y: 170, size: "minor", state: "done", branch: "origin", from: ["an"],
          about: "Timing, movement and how things feel when they move." },
        { id: "an2", name: "Visual style", x: 272, y: 170, size: "minor", state: "done", branch: "origin", from: ["an"],
          about: "Finding a look of my own." },

        { id: "mu", name: "Music", icon: "🎵", x: 400, y: 96, size: "notable", state: "done", branch: "origin", from: ["start"],
          about: "Making music, for my own projects and as a creative outlet." },
        { id: "mu1", name: "Composing", x: 368, y: 168, size: "minor", state: "done", branch: "origin", from: ["mu"],
          about: "Writing and arranging my own tracks." },
        { id: "mu2", name: "Sound design", x: 432, y: 158, size: "minor", state: "done", branch: "origin", from: ["mu"],
          about: "Shaping sound and audio for games and animation." },

        // ---- Bachelor CMD ----
        { id: "cmd", name: "Bachelor", sub: "Communication & Multimedia Design", icon: "🎓", x: 240, y: 255,
          size: "keystone", state: "done", branch: "cmd", from: ["yt2", "an1", "an2", "mu1"],
          about: "BSc Communication & Multimedia Design (Engineer title). All my creative hobbies came together here and became a profession." },
        { id: "ux", name: "UX design", x: 50, y: 310, size: "minor", state: "done", branch: "cmd", from: ["cmd"],
          about: "Designing with and for real users." },
        { id: "cd", name: "Concept development", x: 110, y: 345, size: "minor", state: "done", branch: "cmd", from: ["cmd"],
          about: "Turning a loose idea into a concept that can be built and tested." },
        { id: "mm", name: "3D & multimedia", x: 370, y: 345, size: "minor", state: "done", branch: "cmd", from: ["cmd"],
          about: "3D, animation and interactive media." },
        { id: "rs", name: "Research", x: 430, y: 310, size: "minor", state: "done", branch: "cmd", from: ["cmd"],
          about: "Researching a topic and adding my own approach to it." },

        // ---- Minor (part of the bachelor) ----
        { id: "minor", name: "Create a High-end Video Game", sub: "Minor", icon: "🎮", x: 120, y: 450,
          size: "keystone", state: "done", branch: "minor", from: ["cmd"], period: "2023",
          about: "The minor Create a High-end Video Game: game design and game development, from my own concepts to a big production." },
        { id: "gd", name: "Game design", x: 40, y: 520, size: "minor", state: "done", branch: "minor", from: ["minor"],
          about: "UX and what makes a game fun for different audiences." },
        { id: "dev", name: "Game development", x: 95, y: 555, size: "minor", state: "done", branch: "minor", from: ["minor"],
          about: "Prototyping and programming in Unity." },
        { id: "env", name: "Environment art", x: 150, y: 555, size: "minor", state: "done", branch: "minor", from: ["minor"],
          about: "3D modelling animal enclosures and buildings for the Crazy Croc game." },
        { id: "tm", name: "Teamwork (30+ people)", x: 205, y: 520, size: "minor", state: "done", branch: "minor", from: ["minor"],
          about: "Working in a team of more than 30 people with different workflows and communication styles." },

        // ---- Graduation (part of the bachelor) ----
        { id: "gr", name: "Graduation", sub: "Planned obsolescence & AI", icon: "🧩", x: 360, y: 450,
          size: "keystone", state: "done", branch: "grad", from: ["cmd"], period: "2025",
          about: "A critical design project on planned obsolescence, humans and AI, with a physical office and two games." },
        { id: "gr1", name: "AI & ethics", x: 330, y: 555, size: "minor", state: "done", branch: "grad", from: ["gr"],
          about: "Looking at where AI helps and where it harms." },
        { id: "gr2", name: "Prototyping & testing", x: 400, y: 520, size: "minor", state: "done", branch: "grad", from: ["gr"],
          about: "Designing, building and testing games with real players." },

        // ---- Master ----
        { id: "ma", name: "Master", sub: "Data-Driven Design", icon: "📊", x: 240, y: 670,
          size: "keystone", state: "done", branch: "master", from: ["env", "gr1"],
          about: "MA Data-Driven Design: combining creativity with data and emerging tech. Completed." },

        // ---- New journey ----
        { id: "nj", name: "A new Journey", icon: "🚀", x: 240, y: 790,
          size: "keystone", state: "current", branch: "journey", from: ["ma"],
          about: "The next chapter starts here." },

        { id: "f1", name: "Machine learning", icon: "🧠", x: 105, y: 875, size: "notable", state: "locked", branch: "future", from: ["nj"], open: true,
          about: "Next on my list." },
        { id: "f2", name: "XR", icon: "🥽", x: 240, y: 885, size: "notable", state: "locked", branch: "future", from: ["nj"], open: true,
          about: "More XR experiences." },
        { id: "f3", name: "???", x: 375, y: 875, size: "notable", state: "locked", branch: "future", from: ["nj"], open: true,
          about: "Not decided yet. The tree stays open." },
    ],
};


// ------------------------------------------------------------
// TOOL INFO (Favourite tools popup)
// The bubbles are built automatically from the `tools:` line of
// every project. Bigger bubble = used in more projects.
// Key = tool name in lowercase. icon = image path ("" for none yet).
// ------------------------------------------------------------
const TOOL_INFO = {
    "blender":   { icon: "", about: "Why you like Blender, what you use it for." },
    "godot":     { icon: "", about: "Why you like Godot, what you use it for." },
    "unity":     { icon: "", about: "Why you like Unity, what you use it for." },
    "inkscape":  { icon: "", about: "Why you like Inkscape, what you use it for." },
    "lm studio": { icon: "", about: "Why you like LM Studio, what you use it for." },
    // tools without an entry still get a bubble, with a default text
};


// ------------------------------------------------------------
// HOBBIES
// ------------------------------------------------------------
const HOBBIES = [
    { icon: "🎮", name: "Gaming",  about: "Write something about this hobby." },
    { icon: "🧊", name: "3D art",  about: "Write something about this hobby." },
    { icon: "🥾", name: "Hobby 3", about: "Write something about this hobby." },
];


// ------------------------------------------------------------
// STAR ORBS (the clickable stars)
// ------------------------------------------------------------
const ORBS = {
    about: [
        { point: 0, label: "right", popup: "myPopup2", color: "orb-flow",  name: "Skilltree" },
        { point: 6, label: "below", popup: "myPopup1", color: "orb-tools", name: "Favourite tools" },
        { point: 7, label: "below", popup: "myPopup3", color: "orb-tech",  name: "Hobbies" },
    ],
    projects: [
        { point: 1, label: "above", popup: "projPopup1", color: "orb-p1" },
        { point: 4, label: "above", popup: "projPopup2", color: "orb-p2" },
        { point: 0, label: "below", popup: "projPopup3", color: "orb-p3" },
        { point: 5, label: "below", popup: "projPopup4", color: "orb-p4" },
    ],
    contact: [
        { point: 4, label: "below", popup: "contactPopup", color: "orb-contact", name: "Send a message" },
    ],
};