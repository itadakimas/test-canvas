import 'core/polyfills';
import PainterCanvas from 'modules/ui/painter-canvas';
import SVG4Everybody from 'svg4everybody';

document.addEventListener('DOMContentLoaded', function() {

  SVG4Everybody();

  console.log('main.js loaded');

  const canvas = new PainterCanvas({
    selector: '#canvas'
  });

  const colorInput = document.querySelector('#color');

  colorInput.addEventListener('input', (e) => canvas.setForegroundColor(e.target.value));
});
