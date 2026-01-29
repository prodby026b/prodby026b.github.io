// AOS init
AOS.init({
    duration: 800,
    once: true
});

// Telemetry content – dedicated to Iran & Reza Pahlavi
const logs = [
    "[IRAN] REZA_PAHLAVI_POPULAR_SUPPORT",
    "[VOICE] MILLIONS_CHANT_HIS_NAME",
    "[HOPE] CALL_FOR_HIS_RETURN",
    "[UNITY] IRANIANS_STAND_TOGETHER",
    "[FREEDOM] زن_زندگی_آزادی"
];

const fullLog = logs.join(" // ") + " // ";

const dirA = document.getElementById('dirTextA');
const dirB = document.getElementById('dirTextB');

if (dirA && dirB) {
    dirA.textContent = fullLog;
    dirB.textContent = fullLog;
}

// Metrics (symbolic)
function updateSystem() {
    const cpuEl = document.getElementById('cpuLoad');
    const memEl = document.getElementById('memUsage');
    const timeEl = document.getElementById('utcTime');

    if (cpuEl) {
        cpuEl.textContent = (Math.random() * 3 + 0.5).toFixed(1) + "%";
    }
    if (memEl) {
        memEl.textContent = (Math.random() * 0.5 + 4.1).toFixed(1) + "G";
    }
    if (timeEl) {
        const d = new Date();
        timeEl.textContent = d.toLocaleTimeString('en-GB', { hour12: false });
    }
}

setInterval(updateSystem, 2000);
updateSystem();

// Simple uptime
let secs = 0;
setInterval(() => {
    secs++;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const upEl = document.getElementById('sysUptime');
    if (upEl) {
        upEl.textContent =
            `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
}, 1000);
