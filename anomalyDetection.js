const tf = require("@tensorflow/tfjs");
const { getIPInfo } = require('./ipInfo');

class AnomalyDetection {
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

  async predict(inputData) {
    const tensor = tf.tensor([inputData]);
    const prediction = await this.model.predict(tensor).data();
    return prediction[0];
  }

  async train(trainingData) {
    const inputs = [];
    const outputs = [];
    trainingData.forEach(data => {
      inputs.push([data.requestCount, data.timeOfRequest, data.ipAddressInfo.latency, data.geolocation, data.frequency]);
      outputs.push(data.label);
    });

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs, [outputs.length, 1]);

    await this.model.fit(xs, ys, { epochs: 10 });
  }
}

// IP hakkında veri alıp yapay zekanın eğitimini sağlayacak fonksiyon
async function analyzeIP(ip, requestCount, timeOfRequest) {
  const ipInfo = await getIPInfo(ip);
  const anomalyDetector = new AnomalyDetection();

  const result = await anomalyDetector.predict([requestCount, timeOfRequest, ipInfo.latency, ipInfo.countryCode, ipInfo.frequency]);
  if (result > 0.7) {
    console.log(`Şüpheli aktivite tespit edildi: ${ip}`);
    return true;
  }
  return false;
}

module.exports = { analyzeIP };
