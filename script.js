function updateSystem() {
    const cpuEl = document.getElementById('cpuLoad');
    const memEl = document.getElementById('memUsage');
    const timeEl = document.getElementById('utcTime');

    // صدای مردم = MAX
    if (cpuEl) {
        cpuEl.textContent = "100%";
        cpuEl.classList.add("max-pulse");
    }

    // امید ملی = MAX
    if (memEl) {
        memEl.textContent = "8.0G";
        memEl.classList.add("max-pulse");
    }

    // زمان UTC
    if (timeEl) {
        const d = new Date();
        timeEl.textContent = d.toLocaleTimeString('en-GB', { hour12: false });
    }
}

setInterval(updateSystem, 2000);
updateSystem();

// Uptime
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

.max-pulse {
    color: #ffd66b !important;
    text-shadow: 0 0 12px rgba(255, 214, 107, 0.9),
                 0 0 22px rgba(255, 214, 107, 0.7);
    animation: pulseGlow 1.6s ease-in-out infinite;
}

@keyframes pulseGlow {
    0% {
        transform: scale(1);
        text-shadow: 0 0 10px rgba(255, 214, 107, 0.7);
    }
    50% {
        transform: scale(1.08);
        text-shadow: 0 0 22px rgba(255, 214, 107, 1);
    }
    100% {
        transform: scale(1);
        text-shadow: 0 0 10px rgba(255, 214, 107, 0.7);
    }
}
