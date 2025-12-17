// Initialize AOS with mobile-friendly settings
AOS.init({ duration: 800, once: true, disable: 'mobile' === false });

// Telemetry Content
const logs = [
    "[SYS] PRODBY026B_MOBILE_LINK",
    "[NET] CCNA_CERT_VERIFIED",
    "[SEC] ENCRYPTION_ACTIVE",
    "[KERN] LPIC_1_COMPLIANT",
    "[CMD] status --check"
];
const fullLog = logs.join(" // ") + " // ";
document.getElementById('dirTextA').textContent = fullLog;
document.getElementById('dirTextB').textContent = fullLog;

// Metrics Update (Simulated for Mobile)
function updateSystem() {
    document.getElementById('cpuLoad').textContent = (Math.random() * 3 + 0.5).toFixed(1) + "%";
    document.getElementById('memUsage').textContent = (Math.random() * 0.5 + 4.1).toFixed(1) + "G";
    
    const d = new Date();
    document.getElementById('utcTime').textContent = d.toLocaleTimeString('en-GB', { hour12: false });
}
setInterval(updateSystem, 2000);

// Simple Uptime
let secs = 0;
setInterval(() => {
    secs++;
    let m = Math.floor(secs / 60);
    let s = secs % 60;
    document.getElementById('sysUptime').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}, 1000);