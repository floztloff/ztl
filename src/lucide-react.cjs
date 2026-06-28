// lucide-react polyfill (CommonJS)
const React = (typeof window !== 'undefined' && window.React) || (typeof global !== 'undefined' && global.React) || require('react');
function Svg(props, children) {
  return React.createElement('svg', Object.assign({
    width: 24, height: 24, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
  }, props), ...children);
}
function P(d) { return React.createElement('path', { d: d }); }
function L(x1,y1,x2,y2) { return React.createElement('line', { x1, y1, x2, y2 }); }
function C(cx,cy,r) { return React.createElement('circle', { cx, cy, r }); }
function Poly(p) { return React.createElement('polyline', { points: p }); }
function Rect(x,y,w,h,rx) { return React.createElement('rect', { x, y, width: w, height: h, rx }); }

module.exports = {
  Home: (p) => Svg(p, P('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'), Poly('9 22 9 12 15 12 15 22')),
  Dumbbell: (p) => Svg(p, P('M14.4 14.4 9.6 9.6'), P('M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767-1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l1.768 1.767a2 2 0 1 1 2.828 2.829z'), P('M21.485 18.657a2 2 0 0 0-2.829-2.829l-5.657-5.657a2 2 0 0 0-2.829 2.829l5.657 5.657a2 2 0 0 0 2.829 2.829z'), P('M3.515 5.343a2 2 0 0 0 2.829 2.829l5.657 5.657a2 2 0 0 0 2.829-2.829L9.172 5.343a2 2 0 0 0-2.829-2.829z')),
  UtensilsCrossed: (p) => Svg(p, P('M16 2v5c0 1.5-.5 3-2 4'), P('M8 2v5c0 1.5.5 3 2 4'), P('M3 7h18'), P('M12 7v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2'), P('M16 16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2')),
  Moon: (p) => Svg(p, P('M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z')),
  ChefHat: (p) => Svg(p, P('M17 12c0 2.2-.8 3-2 4l-1 2H10l-1-2c-1.2-1-2-1.8-2-4'), P('M6 12V6a3 3 0 0 1 6 0v6'), P('M12 6a3 3 0 0 1 6 0v6'), P('M6 12h12'), P('M10 18h4')),
  Check: (p) => Svg(p, Poly('20 6 9 17 4 12')),
  Plus: (p) => Svg(p, L(5,12,19,12), L(12,5,12,19)),
  Minus: (p) => Svg(p, L(5,12,19,12)),
  Flame: (p) => Svg(p, P('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z')),
  Trophy: (p) => Svg(p, P('M6 9H4.5a2.5 2.5 0 0 1 0-5H6'), P('M18 9h1.5a2.5 2.5 0 0 0 0-5H18'), P('M4 22h16'), P('M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'), P('M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'), P('M18 2H6v7a6 6 0 0 0 12 0V2Z')),
  ChevronDown: (p) => Svg(p, Poly('6 9 12 15 18 9')),
  Clock: (p) => Svg(p, C(12,12,10), Poly('12 6 12 12 16 14')),
  Scale: (p) => Svg(p, P('M16 16 3 3'), P('M21 21 13 13'), P('M21 6 18 3 11 10'), P('M3 18 6 21 13 14')),
  Sunrise: (p) => Svg(p, P('M12 2v8'), P('M4.93 10.93l1.41 1.41'), P('M2 18h2'), P('M20 18h2'), P('M17.66 10.93l1.41-1.41'), P('M22 22H2'), P('M8 22v-4a4 4 0 0 1 8 0v4'), L(2,18,22,18)),
  Play: (p) => Svg(p, Poly('5 3 19 12 5 21 5 3')),
  X: (p) => Svg(p, L(18,6,6,18), L(6,6,18,18)),
  Pencil: (p) => Svg(p, P('M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'), P('M15 5l4 4')),
  Trash2: (p) => Svg(p, Poly('3 6 5 6 21 6'), P('M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'), L(10,11,10,17), L(14,11,14,17)),
  Sparkles: (p) => Svg(p, P('M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.3a.5.5 0 0 1 0-.966L8.5 10.563A2 2 0 0 0 9.937 9.2l1.3-6.135a.5.5 0 0 1 .966 0l1.3 6.135A2 2 0 0 0 14.063 9.2l6.135 1.3a.5.5 0 0 1 0 .966l-6.135 1.3a2 2 0 0 0-1.296 1.296l-1.3 6.136a.5.5 0 0 1-.967 0z'), P('M17 4v4'), P('M19 6h-4'), P('M15 19v2'), P('M14 20h2')),
  Camera: (p) => Svg(p, P('M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'), C(12,13,4)),
  Calendar: (p) => Svg(p, Rect(3,4,18,18,2), L(16,2,16,6), L(8,2,8,6), L(3,10,21,10)),
  ShoppingCart: (p) => Svg(p, C(9,20,1), C(20,20,1), P('M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6')),
  ChevronLeft: (p) => Svg(p, Poly('15 18 9 12 15 6')),
  ChevronRight: (p) => Svg(p, Poly('9 18 15 12 9 6')),
  ExternalLink: (p) => Svg(p, P('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'), Poly('15 3 21 3 21 9'), L(10,14,21,3)),
  Sun: (p) => Svg(p, C(12,12,5), L(12,1,12,3), L(12,21,12,23), L(4.22,4.22,5.64,5.64), L(1.41,1.41,5.64,5.64), L(1,12,3,12), L(21,12,23,12), L(4.22,17.78,5.64,16.36), L(18.36,5.64,19.78,4.22)),
  Cloud: (p) => Svg(p, P('M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z')),
  CloudSun: (p) => Svg(p, P('M12 2v2'), P('M4.93 4.93l1.41 1.41'), P('M20 12h2'), P('M19.07 4.93l-1.41 1.41'), P('M15.947 12.65a4 4 0 0 0-5.925-4.128'), P('M17.5 19H9a5 5 0 1 1 4.9-6.2A3.5 3.5 0 1 1 17.5 19Z')),
  CloudRain: (p) => Svg(p, P('M17.5 19H9a5 5 0 1 1 4.9-6.2A3.5 3.5 0 1 1 17.5 19Z'), L(11,20,11,22), L(7,19,7,21)),
  CloudSnow: (p) => Svg(p, P('M17.5 19H9a5 5 0 1 1 4.9-6.2A3.5 3.5 0 1 1 17.5 19Z'), C(12,21,1), C(8,20,1), C(16,20,1)),
  CloudLightning: (p) => Svg(p, P('M17.5 19H9a5 5 0 1 1 4.9-6.2A3.5 3.5 0 1 1 17.5 19Z'), L(13,19,11,22), L(11,19,9,22)),
  CloudFog: (p) => Svg(p, P('M17.5 19H9a5 5 0 1 1 4.9-6.2A3.5 3.5 0 1 1 17.5 19Z'), L(6,16,18,16), L(5,19,19,19), L(7,22,17,22)),
  CloudDrizzle: (p) => Svg(p, P('M17.5 19H9a5 5 0 1 1 4.9-6.2A3.5 3.5 0 1 1 17.5 19Z'), L(8,19,8,21), L(10,18,10,20), L(12,19,12,21), L(14,18,14,20), L(16,19,16,21)),
};
