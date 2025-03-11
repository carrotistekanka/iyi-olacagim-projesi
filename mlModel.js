const tf = require('@tensorflow/tfjs-node'); // node.js TensorFlow.js kütüphanesi
class MLModel {
  constructor() {
    this.model = this.createModel();
  }

  createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [5] }));
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    return model;
  }

  async train(trainingData) {
    const inputs = [];
    const outputs = [];

    trainingData.forEach(data => {
      inputs.push([data.requestCount, data.timeOfRequest, data.latency, data.countryCode, data.frequency]);
      outputs.push(data.isSuspicious ? 1 : 0);
    });

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs, [outputs.length, 1]);

    await this.model.fit(xs, ys, { epochs: 20 });
  }

  async predict(inputData) {
    const tensor = tf.tensor([inputData]);
    const prediction = await this.model.predict(tensor).data();
    return prediction[0]; // 1'e yakınsa şüpheli
  }
}

module.exports = MLModel;
