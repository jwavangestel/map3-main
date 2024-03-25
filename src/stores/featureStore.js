import { defineStore } from 'pinia'


export const useFeatureStore = defineStore('feature', {
  state: () => ({
    currentFeature: null,
    currentFeaturePklAkl: null,

  }),
  actions: {
    setCurrentFeature(feature) {
      this.currentFeature = feature;
    },
    resetCurrentFeature() {
      this.currentFeature = null;
    },
  },
});