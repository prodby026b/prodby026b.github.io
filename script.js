// AOS Initialization
AOS.init({ once: true, duration: 800 }); 

// --- Logic: Time and Network Status (Footer) ---
function updateFooter() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US');
    document.getElementById('currentTime').textContent = 'Time: ' + timeStr;
    
    const networkStatusEl = document.getElementById('networkStatusText');
    if (networkStatusEl) {
        const isOnline = navigator.onLine;
        networkStatusEl.textContent = isOnline ? "Network: stable" : "Network: offline (CRITICAL)";
        // استفاده از classList برای اعمال استایل‌های نئون رنگی
        networkStatusEl.className = isOnline ? 'status-ok' : 'status-crit';
    }
}
setInterval(updateFooter, 1000);
updateFooter(); 

// --- Logic: System Health (LPIC-1 Focus) ---
function updateSystemHealth() {
    // شبیه‌سازی Uptime
    let seconds = parseInt(localStorage.getItem('uptimeSeconds') || '3900000') + 2; 
    localStorage.setItem('uptimeSeconds', seconds);

    const days = Math.floor(seconds / (3600 * 24));
    seconds %= (3600 * 24);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const uptimeStr = `${days} days, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('systemUptime').textContent = uptimeStr;
    
    // شبیه‌سازی Load Average (1 دقیقه)
    const load1 = (0.1 + Math.random() * 0.3).toFixed(2);
    const loadAvg1El = document.getElementById('loadAvg1');
    loadAvg1El.textContent = load1;
    loadAvg1El.className = (load1 > 0.35) ? 'status-warn' : 'status-ok';

    // شبیه‌سازی RAM Usage
    const ram = (Math.random() * 20 + 70).toFixed(0); 
    const ramUsageEl = document.getElementById('ramUsage');
    ramUsageEl.textContent = `${ram}%`;
    ramUsageEl.className = (ram > 85) ? 'status-crit' : 'status-warn';

    document.getElementById('activeSessions').textContent = `${Math.floor(Math.random() * 5) + 3} (SSH)`;
}
setInterval(updateSystemHealth, 2000); 
updateSystemHealth();

// --- Logic: Network Monitoring (CCNA Focus) ---
function updateNetworkMonitor() {
     // شبیه‌سازی Traffic In
     const trafficIn = (Math.random() * 10 + 1).toFixed(2);
     document.getElementById('trafficIn').textContent = `${trafficIn} Mbps`;

     // شبیه‌سازی Errors
     const errors = (Math.random() * 0.5).toFixed(1);
     const errorsEl = document.getElementById('errors');
     errorsEl.textContent = `${errors}%`;
     errorsEl.className = (errors > 0.3) ? 'status-warn' : 'status-ok';
     
     // شبیه‌سازی Down شدن لینک (برای نمایش عیب‌یابی)
     const linkStatusEl = document.getElementById('linkStatus');
     if (Math.random() > 0.95) { 
         linkStatusEl.textContent = 'DOWN/DOWN (CRIT)';
         linkStatusEl.className = 'status-crit';
     } else {
         linkStatusEl.textContent = 'UP/UP';
         linkStatusEl.className = 'status-ok';
     }
}
setInterval(updateNetworkMonitor, 3500);
updateNetworkMonitor();


// --- Logic: Dir Scroll (Status Bar Effect) ---
function getNetworkStatusText() { return navigator.onLine ? "Network: ONLINE" : "Network: OFFLINE"; }
function getLastActivityText() { 
    let last = localStorage.getItem('lastVisit026b');
    return last ? 'Last activity: ' + last : 'Last activity: NOW';
}
// به‌روزرسانی زمان بازدید در localStorage
let nowDir = new Date();
let dateStrDir = nowDir.toLocaleDateString('en-US') + ' - ' + nowDir.toLocaleTimeString('en-US');
localStorage.setItem('lastVisit026b', dateStrDir);

function getStatusInfo() {
    // ترکیب اطلاعات وضعیت برای نوار اسکرول
    return [
        'Cyber Nexus Status', '------------------', 'User: prodby026b', 
        getNetworkStatusText(), getLastActivityText(), ' '
    ].join('   ');
}
function randomDirOutput() {
    const folders = [
        'C:\\CyberNexus\\network\\', 'C:\\CyberNexus\\security\\', 'C:\\CyberNexus\\packets\\', 
        'C:\\CyberNexus\\certs\\CCNA\\', 'C:\\CyberNexus\\os\\LPIC-1\\', 'C:\\CyberNexus\\logs\\Firewall\\',
    ];
    const files = [
        'init.bat', 'config.sys', 'packet.log', 'netstat.txt', 'firewall.db',
        'secure.key', 'auth.json', 'data.csv', 'driver.sys', 'matrix.py'
    ];
    const lines = [];
    lines.push(getStatusInfo());
    for(let i=0; i<folders.length; i++) {
        lines.push(' Directory of ' + folders[i]);
        let count = Math.floor(Math.random()*3) + 4;
        for(let j=0; j<count; j++) {
            let date = '2025-07-' + (Math.floor(Math.random()*20)+1).toString().padStart(2,'0');
            let time = (Math.floor(Math.random()*12)+10) + ':' + (Math.floor(Math.random()*60)).toString().padStart(2,'0');
            let isFolder = Math.random() > 0.8;
            let name = isFolder ? '<DIR> ' + folders[Math.floor(Math.random()*folders.length)].split('\\').slice(-2,-1)[0] : files[Math.floor(Math.random()*files.length)];
            lines.push(' ' + date + '  ' + time + '   ' + name);
        }
        lines.push(' ');
    }
    return lines.join('   ');
}

const dirTextA = document.getElementById('dirTextA');
const dirTextB = document.getElementById('dirTextB');

function updateDirTextLoop() {
    const text = randomDirOutput();
    dirTextA.textContent = text;
    dirTextB.textContent = text;
}
updateDirTextLoop();
// به‌روزرسانی حلقه هر 170 ثانیه (برای تغییر محتوا)
setInterval(updateDirTextLoop, 170000); 

window.addEventListener('online', updateDirTextLoop);
window.addEventListener('offline', updateDirTextLoop);