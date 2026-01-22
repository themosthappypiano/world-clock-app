class WorldClock {
    constructor() {
        this.cities = {
            houston: {
                timezone: 'America/Chicago',
                hourHand: document.getElementById('houston-hour'),
                minuteHand: document.getElementById('houston-minute'),
                secondHand: document.getElementById('houston-second'),
                timeDisplay: document.getElementById('houston-time')
            },
            barcelona: {
                timezone: 'Europe/Madrid',
                hourHand: document.getElementById('barcelona-hour'),
                minuteHand: document.getElementById('barcelona-minute'),
                secondHand: document.getElementById('barcelona-second'),
                timeDisplay: document.getElementById('barcelona-time')
            },
            london: {
                timezone: 'Europe/London',
                hourHand: document.getElementById('london-hour'),
                minuteHand: document.getElementById('london-minute'),
                secondHand: document.getElementById('london-second'),
                timeDisplay: document.getElementById('london-time')
            }
        };
        
        this.init();
    }
    
    init() {
        this.updateAllClocks();
        setInterval(() => {
            this.updateAllClocks();
        }, 1000);
    }
    
    updateAllClocks() {
        Object.keys(this.cities).forEach(city => {
            this.updateClock(city);
        });
    }
    
    updateClock(cityKey) {
        const city = this.cities[cityKey];
        const now = new Date();
        const localTime = new Date(now.toLocaleString("en-US", {timeZone: city.timezone}));
        
        const hours = localTime.getHours();
        const minutes = localTime.getMinutes();
        const seconds = localTime.getSeconds();
        
        const hourDeg = (hours % 12) * 30 + (minutes * 0.5);
        const minuteDeg = minutes * 6 + (seconds * 0.1);
        const secondDeg = seconds * 6;
        
        city.hourHand.style.transform = `rotate(${hourDeg}deg)`;
        city.minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        city.secondHand.style.transform = `rotate(${secondDeg}deg)`;
        
        const dayName = localTime.toLocaleDateString('en-US', { weekday: 'short' });
        const timeString = localTime.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        city.timeDisplay.textContent = `${dayName} ${timeString}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WorldClock();
});