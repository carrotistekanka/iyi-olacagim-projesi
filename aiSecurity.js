const brain = require('brain.js');

const net = new brain.NeuralNetwork();

const trainingData = [
  { input: { reqPerMinute: 5 }, output: { suspicious: 0 } }, // Normal
  { input: { reqPerMinute: 20 }, output: { suspicious: 1 } }, // Şüpheli
  { input: { reqPerMinute: 50 }, output: { suspicious: 1 } }, // Şüpheli
];

net.train(trainingData);

function isSuspicious(reqPerMinute) {
  const result = net.run({ reqPerMinute });
  return result.suspicious > 0.5; 
}

module.exports = isSuspicious;
