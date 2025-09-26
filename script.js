const subtitles = [
    'i see you but i ignore you',
    'by any means necessary',
    'you never understood what i did',
    'huh. okay. moving on.',
    'nope',
    'k.',
    'THE WORLD HAS RESERVED NOTHING FOR YOU',
    'YOU\'RE THE CAPTAIN NOW',
    'wild',
    'bold of you to assume i am awake',
    'experiencing technical difficulties between chair and screen',
    'i cannot hear you over the sound of AAAAAAAAAAAAAAAAAAAA',
    'certified catboy',
    'FUCK.',
    'spilled monster on my keeb',
    'kanker motorsport',
    'never let a number be your legacy :keycap_ten:',
    'living, laughing, losing my shit',
    'achieving nothing with great success',
    'having a time',
    'aggressively doing nothing',
    'thriving (derogatory)',
    'losing it (affectionate)',
    'WELCOME TO YOUR PERSONAL SIMULATION',
    'assassinated my own sleep schedule',
    'detonated a VM for fun',
    'immolated a keyboard with caffeine',
    'thank you kind stranger!',
    'sentenced to 10 minutes of twitter!'
];

function updateSubtitle() {
    const subtitle = document.getElementById('subtitle');
    const randomIndex = Math.floor(Math.random() * subtitles.length);
    subtitle.textContent = subtitles[randomIndex];
}

function showSection(targetId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(targetId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${targetId}"]`).classList.add('active');
}

function copyButtonCode(e) {
    e.preventDefault();
    const code = '<a href="https://sen.wtf"><img src="https://sen.wtf/img/buttons/sen.png" alt="sen.wtf"></a>';
    navigator.clipboard.writeText(code).then(() => {
        const img = e.target;
        const originalTitle = img.title;
        img.title = 'copied!';
        setTimeout(() => {
            img.title = originalTitle;
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateSubtitle();
    setInterval(updateSubtitle, 6000);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
});

async function updateDiscordStatus() {
    try {
        const res = await fetch("https://api.lanyard.rest/v1/users/374589381752913930");
        const data = await res.json();

        if (!data.success) return;

        const status = data.data.discord_status;
        const colors = {
            online: "limegreen",
            idle: "orange",
            dnd: "red",
            offline: "gray"
        };

        const text = document.getElementById("discord-status-text");

        text.textContent = ` (${status})`;
        text.style.color = colors[status] || "gray";
        text.style.fontWeight = "bold";
    } catch (e) {
        console.error("Failed to fetch Discord status:", e);
    }
}

updateDiscordStatus();
setInterval(updateDiscordStatus, 30000);