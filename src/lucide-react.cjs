// lucide-react polyfill — icônes garanties correctes
const React = (typeof window !== 'undefined' && window.React) || (typeof global !== 'undefined' && global.React) || require('react');

function I(name, paths) {
  return function(props) {
    var attrs = Object.assign({
      width: 24, height: 24, viewBox: '0 0 24 24',
      fill: 'none', stroke: 'currentColor',
      strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
    }, props);
    var children = paths.map(function(d) { return React.createElement('path', { d: d, key: d.slice(0,12) }); });
    return React.createElement('svg', attrs, children);
  };
}

module.exports = {
  Home: I('home', ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10']),
  Dumbbell: I('dumbbell', ['M6 10V6a2 2 0 0 1 4 0v12a2 2 0 0 1-4 0M14 6v12a2 2 0 0 0 4 0V6a2 2 0 0 0-4 0','M6 12h12']),
  UtensilsCrossed: I('utensils', ['M7 2v9a2 2 0 0 1-2 2','M17 2v9a2 2 0 0 0 2 2','M2 7h10','M12 7h10','M7 15l5 5 5-5']),
  Moon: I('moon', ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z']),
  ChefHat: I('chef', ['M6 16V10a6 6 0 0 1 12 0v6','M4 18h16','M12 12v6','M9 16v2h6v-2']),
  Check: I('check', ['M20 6 9 17l-5-5']),
  Plus: I('plus', ['M5 12h14','M12 5v14']),
  Minus: I('minus', ['M5 12h14']),
  Flame: I('flame', ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z']),
  Trophy: I('trophy', ['M6 9H4.5a2.5 2.5 0 0 1 0-5H6','M18 9h1.5a2.5 2.5 0 0 0 0-5H18','M4 22h16','M8 22v-5a4 4 0 0 1 8 0v5']),
  ChevronDown: I('chevron-down', ['m6 9 6 6 6-6']),
  Clock: I('clock', ['M12 6v6l4 2','M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z']),
  Scale: I('scale', ['M21 3 3 21','M12 3v18','M3 12h18']),
  Sunrise: I('sunrise', ['M12 2v8','M2 18h20','M5 18a7 7 0 0 1 14 0','M12 10a4 4 0 0 0-4 4','M8 14a4 4 0 0 0 8 0']),
  Play: I('play', ['M6 3l14 9-14 9V3']),
  X: I('x', ['M18 6 6 18','M6 6l12 12']),
  Pencil: I('pencil', ['M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z']),
  Trash2: I('trash', ['M3 6h18','M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6','M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2','M10 11v6','M14 11v6']),
  Sparkles: I('sparkles', ['M12 3l1.88 5.12L19 10l-5.12 1.88L12 17l-1.88-5.12L5 10l5.12-1.88z','M19 3v4','M17 5h4','M3 19v2','M4 20H2']),
  Camera: I('camera', ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z','M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0z']),
  Calendar: I('calendar', ['M8 2v4','M16 2v4','M2 10h20','M4 6h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z']),
  ShoppingCart: I('cart', ['M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6']),
  ChevronLeft: I('chevron-left', ['m15 18-6-6 6-6']),
  ChevronRight: I('chevron-right', ['m9 18 6-6-6-6']),
  ExternalLink: I('external', ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6','M15 3h6v6','M10 14 21 3']),
  Sun: I('sun', ['M12 2v2','M12 20v2','m4.93 4.93 1.41 1.41','m17.66 17.66 1.41 1.41','M2 12h2','M20 12h2','m6.34 17.66-1.41 1.41','m19.07 4.93-1.41 1.41','M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z']),
  Cloud: I('cloud', ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z']),
  CloudSun: I('cloud-sun', ['M12 2v2','m4.93 4.93 1.41 1.41','M20 12h2','m19.07 4.93-1.41 1.41','M15.95 12.65a4 4 0 0 0-5.92-4.13','M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z']),
  CloudRain: I('rain', ['M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24','M16 14v6','M8 14v6','M12 16v6']),
  CloudSnow: I('snow', ['M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24','M8 15h.01','M8 19h.01','M12 17h.01','M12 21h.01','M16 15h.01','M16 19h.01']),
  CloudLightning: I('lightning', ['M6 16.33A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97','M13 12l-4 8h6l-4-8']),
  CloudFog: I('fog', ['M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24','M9 17h7','M9 21h7']),
  CloudDrizzle: I('drizzle', ['M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24','M8 19v2','M8 13v2','M16 19v2','M16 13v2','M12 21v2','M12 15v2']),
};
