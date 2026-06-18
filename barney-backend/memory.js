const memoryStore = {};

function getUserMemory(userId) {
  if (!memoryStore[userId]) {
    memoryStore[userId] = [];
  }

  return memoryStore[userId];
}

function addMemory(userId, memory) {
  if (!memoryStore[userId]) {
    memoryStore[userId] = [];
  }

  if (!memoryStore[userId].includes(memory)) {
    memoryStore[userId].push(memory);
  }
}

module.exports = {
  getUserMemory,
  addMemory,
};
