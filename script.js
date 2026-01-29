AOS.init({ duration: 800, once: true });

const logs = [
  "[IRAN] REZA_PAHLAVI_POPULAR_SUPPORT",
  "[VOICE] MILLIONS_CHANT_HIS_NAME",
  "[HOPE] CALL_FOR_HIS_RETURN",
  "[UNITY] IRANIANS_STAND_TOGETHER",
  "[FREEDOM] زن_زندگی_آزادی"
];

const fullLog = logs.join(" // ") + " // ";

document.getElementById('dirTextA').textContent = fullLog;
document.getElementById('dirTextB').textContent = fullLog;

function updateSystem() {
  document.getElementById('cpuLoad').textContent = "100%";
  document.getElementById('cpuLoad').classList.add("max-pulse");

  document.getElementById('memUsage').textContent = "8.0G";
  document.getElementById('memUsage').classList.add("max-pulse");

  const d = new Date();
  document.getElementById('utcTime').textContent =
    d.toLocaleTimeString('en-GB', { hour12: false });
}

setInterval(updateSystem, 2000);
updateSystem();

let secs = 0;
setInterval(() => {
  secs++;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  document.getElementById('sysUptime').textContent =
    `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}, 1000);
