class Visual {
  _hue = 0;
  _freq = 2;
  _amp = 1;

  constructor(canvasId, width, height) {
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById(canvasId);
    this.processingInstance = new Processing(this.canvas, processing => {
      processing.setup = this.setup.bind(this, processing, width, height);
      processing.draw = this.draw.bind(this, processing);
    });
  }

  setup(processing, width, height) {
    const p = processing;
    p.size(width, height);
    p.noLoop();
    p.colorMode(p.HSB, 127, 100, 100);
  }

  draw(processing) {
    this.drawBubbles(processing, this._hue);
    this.drawSin(processing, this._hue, this._freq, this._amp);
  }

  drawSin(processing, hue, freq, amp) {
    const p = processing;
    p.stroke(hue, 63, 127);
    p.strokeWeight(5);
    for (let x = 0; x < p.width ; x++) {
      p.point(x, (amp * p.height / 2) * p.sin(p.TWO_PI * (2 * freq / p.width) * (x - p.width / 2)) + p.height / 2)
    }
  }

  drawBubbles(processing, hue) {
    const p = processing;
    p.background(hue, 63, 127);
    p.noStroke();
    for (let i = 0; i < 500; i++) {
      p.fill((hue + 19) % 127, 63, 127, p.random(0,127));
      const r = p.random(5, 50);
      const x = p.random(r, p.width - r);
      const y = p.random(r, p.height - r);
      p.ellipse(x, y, 2 * r, 2 * r);
    }
  }

  set hue(hue) {
    this._hue = hue;
    this.processingInstance.redraw();
  }

  set freq(freq) {
    this._freq = freq;
    this.processingInstance.redraw();
  }

  set amp(amp) {
    this._amp = amp;
    this.processingInstance.redraw();
  }

  undrawNote(note) {
    //p.background(note, 53, 53);
  }
}

export default Visual;
