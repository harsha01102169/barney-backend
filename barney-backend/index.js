const {
getUserMemory,
addMemory,
} = require("./memory");

const barneyPrompt = require("./prompts/barney");
const tedPrompt = require("./prompts/ted");
const robinPrompt = require("./prompts/robin");
const lilyPrompt = require("./prompts/lily");
const marshallPrompt = require("./prompts/marshall");

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPTS = {
barney: barneyPrompt,
ted: tedPrompt,
robin: robinPrompt,
lily: lilyPrompt,
marshall: marshallPrompt,
};

function extractMemory(text) {
const lower = text.toLowerCase();

const patterns = [
["interview", "User has an interview"],
["exam", "User mentioned an exam"],
["crush", "User has a crush"],
["girlfriend", "User has a girlfriend"],
["boyfriend", "User has a boyfriend"],
["job", "User is focused on getting a job"],
["promotion", "User wants a promotion"],
["date", "User is going on a date"],
["breakup", "User experienced a breakup"],
["ex", "User talks about an ex"],
];

for (const [keyword, memory] of patterns) {
if (lower.includes(keyword)) {
return memory;
}
}

return null;
}

app.get("/", (req, res) => {
res.json({ status: "HIMYM gang is ready." });
});

app.post("/chat", async (req, res) => {
const {
messages,
character,
userId = "default",
} = req.body;

if (!messages || !Array.isArray(messages)) {
return res.status(400).json({
error: "messages array is required",
});
}

const selectedCharacter = character || "barney";

if (!SYSTEM_PROMPTS[selectedCharacter]) {
return res.status(400).json({
error: "Invalid character",
});
}

const lastMessage =
messages[messages.length - 1]?.content || "";

const memory = extractMemory(lastMessage);

if (memory) {
addMemory(userId, memory);
}

const memories = getUserMemory(userId);

const systemPrompt =
SYSTEM_PROMPTS[selectedCharacter] +
`

KNOWN USER FACTS:

${memories.join("\n")}

Reference these naturally when relevant.
Do not list them.
Do not repeat them.
`;

try {
const model = genAI.getGenerativeModel({
model: "gemini-3.1-flash-lite",
systemInstruction: systemPrompt,
});

```
const history = messages.slice(0, -1).map((msg) => ({
  role: msg.role === "assistant" ? "model" : "user",
  parts: [{ text: msg.content }],
}));

const chat = model.startChat({
  history,
});

const result = await chat.sendMessage(
  lastMessage
);

const reply = result.response.text();

res.json({
  reply,
  character: selectedCharacter,
  memories,
});
```

} catch (error) {
console.error(
"Gemini API error:",
error
);

```
res.status(500).json({
  error: "API call failed",
  details: error.message,
});
```

}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(
`HIMYM backend running on port ${PORT}`
);
});
