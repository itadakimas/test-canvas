import _assign from 'lodash/assign';

const DEFAULT_OPTIONS = {
  colors: {
    background: '#FFFFFF',
    foreground: '#000000'
  },
  line: {
    cap: 'round',
    width: 20
  },
  selector: null,
  tool: 'pencil'
};

class PainterCanvas
{
  constructor(options)
  {
    const opts = _assign({}, DEFAULT_OPTIONS, options);
    const canvas = document.querySelector(opts.selector);

    if (canvas === null)
    {
      throw new Error(`canvas with selector "${opts.selector}" not found`);
    }

    this.colors = opts.colors;
    this.line = opts.line;
    this.selector = opts.selector;

    this._context = canvas.getContext('2d');
    this._cursorPosition = { x: 0, y: 0 };

    this._resizeCanvas();
    window.addEventListener('resize', this._resizeCanvas.bind(this));
    canvas.addEventListener('mousemove', this._draw.bind(this));
    canvas.addEventListener('mousedown', this._setCursorPosition.bind(this));
    canvas.addEventListener('mouseenter', this._setCursorPosition.bind(this));
  }
  setForegroundColor(color)
  {
    this.colors.foreground = color;
  }
  _draw(e)
  {
    // NOTE: returns if the left button is not pressed
    if (e.buttons !== 1)
    {
      return;
    }
    this._drawLine(e);
  }
  _drawLine(e)
  {
    const ctx = this._context;

    ctx.beginPath();
    ctx.lineWidth = this.line.width;
    ctx.lineCap = this.line.cap;
    ctx.strokeStyle = this.colors.foreground;
    ctx.moveTo(this._cursorPosition.x, this._cursorPosition.y);
    this._setCursorPosition(e);
    ctx.lineTo(this._cursorPosition.x, this._cursorPosition.y);
    ctx.stroke();
  }
  _resizeCanvas()
  {
    const rect = this._context.canvas.getBoundingClientRect();

    this._context.canvas.height = rect.height;
    this._context.canvas.width = rect.width;
  }
  _setCursorPosition(e)
  {
    this._cursorPosition.x = e.clientX;
    this._cursorPosition.y = e.clientY;
  }
}

export default PainterCanvas;
