class AudioAnalyzer {
  private context: AudioContext;
  private analyzer: AnalyserNode;

  constructor() {
    this.context = new AudioContext();
    this.analyzer = this.context.createAnalyser();
    this.analyzer.fftSize = 2048;
  }

  async analyze(audioBlob: Blob): Promise<number[]> {
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioData = await this.context.decodeAudioData(audioBuffer);
    const source = this.context.createBufferSource();
    source.buffer = audioData;
    
    source.connect(this.analyzer);
    this.analyzer.connect(this.context.destination);
    
    const dataArray = new Float32Array(this.analyzer.frequencyBinCount);
    this.analyzer.getFloatFrequencyData(dataArray);
    
    // Normalize data between 0-100
    return Array.from(dataArray).map(value => 
      Math.max(0, ((value + 140) / 140) * 100)
    ).slice(0, 100); // Only take first 100 values
  }
}
