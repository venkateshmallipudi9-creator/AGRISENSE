import * as tf from '@tensorflow/tfjs';

export class PestDetectionModel {
  constructor() {
    this.model = null;
  }

  async load(modelPath) {
    try {
      // In real implementation, load your TensorFlow Lite converted model
      // For now, we'll simulate it
      console.log('Loading model from:', modelPath);
      // this.model = await tf.loadGraphModel(modelPath);
      return true;
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }

  async predict(imageData) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      // Convert image to tensor
      let tensor = tf.browser.fromPixels(imageData);
      tensor = tf.image.resizeBilinear(tensor, [224, 224]);
      tensor = tensor.div(255.0);
      const batched = tensor.expandDims(0);

      // Make prediction
      const prediction = await this.model.predict(batched);
      const result = await prediction.data();

      // Cleanup
      tensor.dispose();
      batched.dispose();
      prediction.dispose();

      return Array.from(result);
    } catch (error) {
      console.error('Error during prediction:', error);
      throw error;
    }
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }
}

export const diseaseDetectionModel = new PestDetectionModel();
