class WorldClock {
    constructor() {
        this.cities = {
            houston: {
                timezone: 'America/Chicago',
                hourHand: document.getElementById('houston-hour'),
                minuteHand: document.getElementById('houston-minute'),
                secondHand: document.getElementById('houston-second'),
                timeDisplay: document.getElementById('houston-time'),
                workWindow: document.getElementById('houston-work')
            },
            barcelona: {
                timezone: 'Europe/Madrid',
                hourHand: document.getElementById('barcelona-hour'),
                minuteHand: document.getElementById('barcelona-minute'),
                secondHand: document.getElementById('barcelona-second'),
                timeDisplay: document.getElementById('barcelona-time'),
                workWindow: document.getElementById('barcelona-work')
            },
            london: {
                timezone: 'Europe/London',
                hourHand: document.getElementById('london-hour'),
                minuteHand: document.getElementById('london-minute'),
                secondHand: document.getElementById('london-second'),
                timeDisplay: document.getElementById('london-time'),
                workWindow: document.getElementById('london-work')
            }
        };
        
        this.init();
    }
    
    init() {
        this.updateAllClocks();
        this.updateWorkWindows();
        setInterval(() => {
            this.updateAllClocks();
            this.updateWorkWindows();
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
    
    updateWorkWindows() {
        const now = new Date();
        const barcelonaTime = new Date(now.toLocaleString("en-US", {timeZone: 'Europe/Madrid'}));
        const barcelonaHour = barcelonaTime.getHours();
        
        const houstonTime = new Date(now.toLocaleString("en-US", {timeZone: 'America/Chicago'}));
        const houstonHour = houstonTime.getHours();
        
        const londonTime = new Date(now.toLocaleString("en-US", {timeZone: 'Europe/London'}));
        const londonHour = londonTime.getHours();
        
        let houstonWindow = '';
        let londonWindow = '';
        
        if (barcelonaHour >= 14 || barcelonaHour < 1) {
            if (barcelonaHour === 14) {
                houstonWindow = 'Work window: 8am East Coast';
            } else if (barcelonaHour === 17) {
                houstonWindow = 'Work window: 9am West Coast (East Coast at lunch)';
            } else if (barcelonaHour === 20) {
                houstonWindow = 'Work window: 2pm East Coast (West Coast at lunch)';
            } else if (barcelonaHour >= 21 && barcelonaHour <= 22) {
                houstonWindow = 'Work window: 3-4pm East Coast / Central still going';
            } else if (barcelonaHour >= 22 || barcelonaHour < 1) {
                houstonWindow = 'Work window: finish West Coast at 4pm';
            } else {
                houstonWindow = 'Work window: 8am-4pm US timezones';
            }
        } else {
            houstonWindow = 'Outside work window';
        }
        
        if (barcelonaHour >= 14 || barcelonaHour < 1) {
            londonWindow = 'Work window: overlaps with US hours';
        } else {
            londonWindow = 'Outside work window';
        }
        
        // Work-window elements are optional in the markup.
        if (this.cities.houston.workWindow) {
            this.cities.houston.workWindow.textContent = houstonWindow;
        }
        if (this.cities.london.workWindow) {
            this.cities.london.workWindow.textContent = londonWindow;
        }
        if (this.cities.barcelona.workWindow) {
            this.cities.barcelona.workWindow.textContent = 'Work window: 2pm-midnight';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WorldClock();
});
