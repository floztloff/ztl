// lucide-react polyfill — icônes correctes (CommonJS)
const React = (typeof window !== 'undefined' && window.React) || (typeof global !== 'undefined' && global.React) || require('react');

function Svg(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  var attrs = Object.assign({
    width: 24, height: 24, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
  }, props);
  return React.createElement.apply(null, ['svg', attrs].concat(children));
}

function P(d, extra) { return React.createElement('path', Object.assign({ d: d }, extra || {})); }
function L(x1,y1,x2,y2) { return React.createElement('line', { x1,y1,x2,y2 }); }
function C(cx,cy,r) { return React.createElement('circle', { cx,cy,r }); }
function Poly(p) { return React.createElement('polyline', { points: p }); }
function Rect(x,y,w,h,rx) { return React.createElement('rect', { x,y,width:w,height:h,rx }); }

// Icônes avec chemins SVG officiels Lucide
module.exports = {
  Home: (p) => Svg(p,P('m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'),Poly('9 22 9 12 15 12 15 22')),
  Dumbbell: (p) => Svg(p,P('M14.4 14.4 9.6 9.6'),P('M6.343 17.657a2 2 0 0 1 0-2.829l1.414-1.414L3.515 9.172a2 2 0 1 1 2.829-2.829L8.586 8.586 9.172 8a2 2 0 0 1 2.829 0l4.242 4.243a2 2 0 0 1 0 2.828l-.586.586 2.829 2.829a2 2 0 0 1-2.829 2.828l-2.829-2.828-1.414 1.414a2 2 0 0 1-2.829 0z'),P('m17.657 6.343-1.414-1.414a2 2 0 0 0-2.829 2.829l4.243 4.242a2 2 0 0 0 2.828-2.828z'),P('M6.343 17.657a2 2 0 0 0 0-2.829')),
  UtensilsCrossed: (p) => Svg(p,P('M16 2v5c0 1.5-.5 3-2 4'),P('M8 2v5c0 1.5.5 3 2 4'),P('M3 7h18'),P('M12 7v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2'),P('M18 16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2')),
  Moon: (p) => Svg(p,P('M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z')),
  ChefHat: (p) => Svg(p,P('M17 12h1a5 5 0 0 0 0-10H6a5 5 0 0 0 0 10h1'),P('M20 18H4'),P('M12 10v8'),P('M15 10v8'),P('M9 10v8'),P('M6 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2')),
  Check: (p) => Svg(p,P('M20 6 9 17l-5-5')),
  Plus: (p) => Svg(p,P('M5 12h14'),P('M12 5v14')),
  Minus: (p) => Svg(p,P('M5 12h14')),
  Flame: (p) => Svg(p,P('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z')),
  Trophy: (p) => Svg(p,P('M6 9H4.5a2.5 2.5 0 0 1 0-5H6'),P('M18 9h1.5a2.5 2.5 0 0 0 0-5H18'),P('M4 22h16'),P('M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'),P('M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'),P('M18 2H6v7a6 6 0 0 0 12 0V2Z')),
  ChevronDown: (p) => Svg(p,P('m6 9 6 6 6-6')),
  Clock: (p) => Svg(p,C(12,12,10),P('M12 6v6l4 2')),
  Scale: (p) => Svg(p,P('m3 6 3-3 3 3'),P('m15 6 3-3 3 3'),P('M3 21v-5h18v5'),P('M12 16V6')),
  Sunrise: (p) => Svg(p,P('M12 2v8'),P('m4.93 10.93 1.41 1.41'),P('M2 18h2'),P('M20 18h2'),P('m19.07 10.93-1.41 1.41'),P('M22 22H2'),P('m8 6 4-4 4 4'),P('M16 18a4 4 0 0 0-8 0')),
  Play: (p) => Svg(p,P('m6 3 14 9-14 9V3')),
  X: (p) => Svg(p,P('M18 6 6 18'),P('m6 6 12 12')),
  Pencil: (p) => Svg(p,P('M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'),P('m15 5 4 4')),
  Trash2: (p) => Svg(p,P('M3 6h18'),P('M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'),P('M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'),L(10,11,10,17),L(14,11,14,17)),
  Sparkles: (p) => Svg(p,P('M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.3a.5.5 0 0 1 0-.966L8.5 10.571A2 2 0 0 0 9.937 9.2l1.3-6.135a.5.5 0 0 1 .966 0l1.3 6.135A2 2 0 0 0 14.571 9.2l6.135 1.3a.5.5 0 0 1 0 .966l-6.135 1.3a2 2 0 0 0-1.296 1.296l-1.3 6.136a.5.5 0 0 1-.967 0z'),P('M20 3v4'),P('M22 5h-4'),P('M4 17v2'),P('M5 18H3')),
  Camera: (p) => Svg(p,P('M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'),C(12,13,3)),
  Calendar: (p) => Svg(p,P('M8 2v4'),P('M16 2v4'),Rect(3,4,18,18,2),P('M3 10h18')),
  ShoppingCart: (p) => Svg(p,C(8,21,1),C(19,21,1),P('M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12')),
  ChevronLeft: (p) => Svg(p,P('m15 18-6-6 6-6')),
  ChevronRight: (p) => Svg(p,P('m9 18 6-6-6-6')),
  ExternalLink: (p) => Svg(p,P('M15 3h6v6'),P('M10 14 21 3'),P('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6')),
  Sun: (p) => Svg(p,C(12,12,4),P('M12 2v2'),P('M12 20v2'),P('m4.93 4.93 1.41 1.41'),P('m17.66 17.66 1.41 1.41'),P('M2 12h2'),P('M20 12h2'),P('m6.34 17.66-1.41 1.41'),P('m19.07 4.93-1.41 1.41')),
  Cloud: (p) => Svg(p,P('M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z')),
  CloudSun: (p) => Svg(p,P('M12 2v2'),P('m4.93 4.93 1.41 1.41'),P('M20 12h2'),P('m19.07 4.93-1.41 1.41'),P('M15.947 12.65a4 4 0 0 0-5.925-4.128'),P('M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z')),
  CloudRain: (p) => Svg(p,P('M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242'),P('M16 14v6'),P('M8 14v6'),P('M12 16v6')),
  CloudSnow: (p) => Svg(p,P('M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242'),P('M8 15h.01'),P('M8 19h.01'),P('M12 17h.01'),P('M12 21h.01'),P('M16 15h.01'),P('M16 19h.01')),
  CloudLightning: (p) => Svg(p,P('M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973'),P('m13 12-4 8h6l-4-8')),
  CloudFog: (p) => Svg(p,P('M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242'),P('M16 17H7'),P('M17 21H9')),
  CloudDrizzle: (p) => Svg(p,P('M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242'),P('M8 19v2'),P('M8 13v2'),P('M16 19v2'),P('M16 13v2'),P('M12 21v2'),P('M12 15v2')),
};
