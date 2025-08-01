// Get references to the HTML elements we need to work with
const card = document.getElementById('birthdayCard');
const confettiContainer = document.getElementById('confetti-container');
let isCardOpen = false;

// --- Audio Setup using Tone.js ---

// Create a synthesizer to play the music. toDestination() connects it to the speakers.
const synth = new Tone.Synth().toDestination();

// Define the notes for the "Happy Birthday" melody.
// Each object has a note (e.g., 'C4'), a duration ('4n' = quarter note), and a time to play.
const melody = [
    { note: 'C4', duration: '8n', time: '0:0' }, { note: 'C4', duration: '8n', time: '0:0:2' },
    { note: 'D4', duration: '4n', time: '0:1' }, { note: 'C4', duration: '4n', time: '0:2' },
    { note: 'F4', duration: '4n', time: '0:3' }, { note: 'E4', duration: '2n', time: '1:0' },

    { note: 'C4', duration: '8n', time: '1:2' }, { note: 'C4', duration: '8n', time: '1:2:2' },
    { note: 'D4', duration: '4n', time: '1:3' }, { note: 'C4', duration: '4n', time: '2:0' },
    { note: 'G4', duration: '4n', time: '2:1' }, { note: 'F4', duration: '2n', time: '2:2' },

    { note: 'C4', duration: '8n', time: '3:0' }, { note: 'C4', duration: '8n', time: '3:0:2' },
    { note: 'C5', duration: '4n', time: '3:1' }, { note: 'A4', duration: '4n', time: '3:2' },
    { note: 'F4', duration: '4n', time: '3:3' }, { note: 'E4', duration: '4n', time: '4:0' },
    { note: 'D4', duration: '2n', time: '4:1' },

    { note: 'Bb4', duration: '8n', time: '4:3' }, { note: 'Bb4', duration: '8n', time: '4:3:2' },
    { note: 'A4', duration: '4n', time: '5:0' }, { note: 'F4', duration: '4n', time: '5:1' },
    { note: 'G4', duration: '4n', time: '5:2' }, { note: 'F4', duration: '2n', time: '5:3' },
];

// Create a Part, which is a collection of musical events.
const part = new Tone.Part((time, value) => {
    // This callback is triggered for each note in the melody.
    synth.triggerAttackRelease(value.note, value.duration, time);
}, melody).start(0);
part.loop = false; // We only want the melody to play once.

// --- Event Listener ---

// Listen for a click on the card.
card.addEventListener('click', async () => {
    // If the card is already open, do nothing.
    if (isCardOpen) return;
    isCardOpen = true;

    // Browsers require user interaction (like a click) to start audio.
    // Tone.start() activates the audio context.
    await Tone.start();
    
    // Add the 'open' class to the card to trigger the CSS flip animation.
    card.classList.add('open');
    
    // Start the music transport, which begins playing the scheduled Part.
    Tone.Transport.start();
    
    // Start the confetti animation after a short delay to sync with the card opening.
    setTimeout(startConfetti, 300);
});

// --- Confetti Function ---

function startConfetti() {
    const confettiColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
        // Create a new div element for each piece of confetti.
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Assign random properties to each piece for a varied effect.
        confetti.style.left = Math.random() * 100 + 'vw'; // Random horizontal position.
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)]; // Random color.
        confetti.style.animationDelay = Math.random() * 5 + 's'; // Random start time for the fall.
        confetti.style.width = Math.floor(Math.random() * 8 + 8) + 'px'; // Random size.
        confetti.style.height = confetti.style.width; // Keep it square/round.
        confetti.style.opacity = Math.random(); // Random opacity.

        // Add the new confetti piece to the container.
        confettiContainer.appendChild(confetti);
    }
}

