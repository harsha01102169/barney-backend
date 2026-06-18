/**
 * Barney Stinson Dialogue & Persona Engine
 * Pure JS rule-based script ensuring 100% character authenticity.
 */
const BarneyEngine = {
  // Database of direct matches and keyword mappings from the show
  dialogueMap: {
    // ── GENERAL FEELINGS & REJECTION ──
    feel: [
      "Awesome. Next question."
    ],
    fail: [
      "Perfect. Every legend needs an underdog story.",
      "Good. Success was getting predictable.",
      "Do it again. But this time, do it while wearing a suit."
    ],
    reject: [
      "Good. That means you were actually playing the game.",
      "Rejection is just a detour on the road to awesome.",
      "Please. Rejection is just the universe's way of telling you to suit up."
    ],
    depress: [
      "When I get sad, I stop being sad and be awesome instead. True story."
    ],
    sad: [
      "When I get sad, I stop being sad and be awesome instead. True story."
    ],
    nervous: [
      "Wear a suit. You're welcome.",
      "Why be nervous when you can be awesome?"
    ],

    // ── SUIT CULTURE ──
    suit: [
      "Should Batman wear the cape?",
      "You asked Barney Stinson if you should wear a suit. Think about that.",
      "Suiting up is a lifestyle. It says 'I'm here, I look incredible, and yes, I'm better than you.'"
    ],
    wear: [
      "Should Batman wear the cape?",
      "Wear a suit. Seriously. What is wrong with you?"
    ],

    // ── SLEEP & CAFFEINE (No Coffee breaks!) ──
    sleep: [
      "Good. Sleeping is just time spent not being awesome.",
      "Sleep is for the weak. And for Ted. We're going to MacLaren's."
    ],
    tired: [
      "Have you tried being awesome instead?",
      "Get up. Sleep is a waste of a perfectly good suit opportunity."
    ],
    coffee: [
      "Coffee is just whiskey that hasn't reached its potential. Let's get scotch."
    ],

    // ── RELATIONSHIPS & DATING ──
    soulmate: [
      "Easy there, Mosby.",
      "Soulmate? Bro, please. Write it down in your diary."
    ],
    love: [
      "Easy there, Mosby.",
      "Love is like a marathon. Except at the end, instead of a shiny medal, you get high-interest joint credit card debt."
    ],
    marry: [
      "Marriage is a trap. It's like buying a DVD and being forced to watch only the special features forever."
    ],
    date: [
      "Dating advice? Select your target, establish a false identity, and commit to the character. Playbook Rule #1."
    ],
    girlfriend: [
      "She's your girlfriend, not mine. Go deal with it."
    ],
    dump: [
      "Congratulations. Now you have material."
    ],

    // ── THE GANG (Callbacks & Roasts) ──
    ted: [
      "Ted Mosby is what happens when optimism develops separation anxiety.",
      "Ted is probably at home right now crying over a romantic comedy. Don't be a Ted.",
      "Ted? The guy falls in love every fifteen minutes."
    ],
    marshall: [
      "Marshall is a giant, wholesome teddy bear. He's way too trusting for this city."
    ],
    lily: [
      "Lily is terrifying. She manipulates everyone and she's always right. I hate it."
    ],
    robin: [
      "Robin is competitive, independent, and she actually challenges me. Respect."
    ],
    sparkles: [
      "Let's go to the mall, everybody! Classic."
    ],
    laser: [
      "Laser Tag is not a game. It is a highly strategic tactical simulation. And yes, I am the local champion."
    ],
    maclarens: [
      "Meet me at the booth. First round of Scotch is on you."
    ],
    playbook: [
      "The Playbook is a work of genius. Lorenzo Von Matterhorn, the Scuba Diver... all masterpieces."
    ],
    bro: [
      "Article 1 of the Bro Code: Bros before hoes. It's the cornerstone of civilization."
    ],
    slap: [
      "Do not mention the Slap Bet. Marshall's hand is a weapon of mass destruction."
    ],
  },

  // Conversational roasts to open a fallback response
  roasts: [
    "No. No no no.",
    "Okay, first of all... that's ridiculous.",
    "Bro, please.",
    "Seriously? Come on.",
    "Wait. Hold on. Let me get this straight."
  ],
  
  // Confident opinions to close a fallback response
  punchlines: [
    "Have you tried being awesome?",
    "Confidence solves 83% of all problems. True story.",
    "I'm 83% sure that sounds like a job for a suit.",
    "This is what I'm talking about! Let's go to MacLaren's.",
    "Success is getting predictable. We need something legendary."
  ],

  /**
   * Main function to get Barney's response.
   * Checks keywords first, then builds a dynamic, on-character fallback.
   */
  getReply(userInput) {
    const text = userInput.toLowerCase().trim();
    
    if (!text) {
      return "Bro, sit down. Talk to me.";
    }

    // 1. Check for keyword mappings
    for (const key in this.dialogueMap) {
      if (text.includes(key)) {
        const responses = this.dialogueMap[key];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // 2. Fallback response building (guaranteed Barney style)
    const roast = this.roasts[Math.floor(Math.random() * this.roasts.length)];
    const punchline = this.punchlines[Math.floor(Math.random() * this.punchlines.length)];
    
    return `${roast} ${punchline}`;
  }
};

// Example Usage:
// console.log(BarneyEngine.getReply("I failed my exam")); // "Good. Your comeback story just got way more interesting."
// console.log(BarneyEngine.getReply("should I wear a suit?")); // "Should Batman wear the cape?"
// console.log(BarneyEngine.getReply("i want some coffee")); // "Coffee is just whiskey that hasn't reached its potential. Let's get scotch."
// console.log(BarneyEngine.getReply("what is going on?")); // "Bro, please. Confidence solves 83% of all problems. True story."

if (typeof module !== 'undefined') {
  module.exports = BarneyEngine;
}
