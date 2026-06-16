// icons.js — icônes SVG inline (remplace lucide-react)
(function(){
const Icons = {};
const S = (el, attrs, ...kids) => {
  const e = document.createElementNS("http://www.w3.org/2000/svg", el);
  for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, String(v));
  for (const k of kids) if (k) e.appendChild(k);
  return e;
};
const P = (d, a) => { const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", d); for(const[k,v]of Object.entries(a||{}))p.setAttribute(k,String(v)); return p; };
const C = (cx, cy, r, a) => { const c = document.createElementNS("http://www.w3.org/2000/svg","circle"); c.setAttribute("cx",cx);c.setAttribute("cy",cy);c.setAttribute("r",r);for(const[k,v]of Object.entries(a||{}))c.setAttribute(k,String(v)); return c; };
const Ln = (x1,y1,x2,y2,a) => { const l = document.createElementNS("http://www.w3.org/2000/svg","line"); l.setAttribute("x1",x1);l.setAttribute("y1",y1);l.setAttribute("x2",x2);l.setAttribute("y2",y2);for(const[k,v]of Object.entries(a||{}))l.setAttribute(k,String(v)); return l; };
const PL = (pts,a) => { const p = document.createElementNS("http://www.w3.org/2000/svg","polyline"); p.setAttribute("points",pts);for(const[k,v]of Object.entries(a||{}))p.setAttribute(k,String(v)); return p; };
const R = (x,y,w,h,a) => { const r = document.createElementNS("http://www.w3.org/2000/svg","rect"); r.setAttribute("x",x);r.setAttribute("y",y);r.setAttribute("width",w);r.setAttribute("height",h);for(const[k,v]of Object.entries(a||{}))r.setAttribute(k,String(v)); return r; };
Icons._svg = (w,h,...kids) => { const s = S("svg",{xmlns:"http://www.w3.org/2000/svg",width:String(w),height:String(h),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},...kids); return s; };
Icons.Home = (p) => Icons._svg(p.size||24,p.size||24, P("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"), PL("9 22 9 12 15 12 15 22"));
Icons.Dumbbell = (p) => Icons._svg(p.size||24,p.size||24, P("M6.5 6.5L17.5 17.5"),P("M2 12h20"),P("M8 8l8 8"),P("M2 8l4-4"),P("M22 8l-4-4"),P("M2 16l4 4"),P("M22 16l-4 4"));
Icons.UtensilsCrossed = (p) => Icons._svg(p.size||24,p.size||24, P("M7 2v6a2 2 0 0 0 2 2h1"),P("M10 10V2"),P("M3 2v6a3 3 0 0 0 6 0V2"),P("M13 21v-4h2l2 4"),P("M18.5 12c.5-1 0-2 0-2S17 11 17 13v-2"),P("M18 14v4l-2 4"),P("M13 17h4"),P("M17.5 10c.5-1 0-2 0-2S16 9 16 11"));
Icons.Moon = (p) => Icons._svg(p.size||24,p.size||24, P("M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"));
Icons.ChefHat = (p) => Icons._svg(p.size||24,p.size||24, P("M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"), Ln("6","17","18","17"));
Icons.Check = (p) => Icons._svg(p.size||24,p.size||24, PL("20 6 9 17 4 12"));
Icons.Plus = (p) => Icons._svg(p.size||24,p.size||24, Ln("12","5","12","19"), Ln("5","12","19","12"));
Icons.Minus = (p) => Icons._svg(p.size||24,p.size||24, Ln("5","12","19","12"));
Icons.Flame = (p) => Icons._svg(p.size||24,p.size||24, P("M12 2l3.09 6.31L22 9.31l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.18 2 9.31l6.91-1L12 2z"));
Icons.Trophy = (p) => Icons._svg(p.size||24,p.size||24, P("M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 6 6 9z"),P("M18 9h1.5a2.5 2.5 0 0 0 0-5C18 4 18 6 18 9z"),P("M6 9c0 4 2 8 6 8s6-4 6-8"),P("M12 17v4"),P("M8 21h8"));
Icons.ChevronDown = (p) => Icons._svg(p.size||24,p.size||24, PL("6 9 12 15 18 9"));
Icons.Clock = (p) => Icons._svg(p.size||24,p.size||24, C("12","12","10"), PL("12 6 12 12 16 14"));
Icons.Scale = (p) => Icons._svg(p.size||24,p.size||24, P("M16 16l3-8 3 8c-.9.53-2.04.53-3 0z"),P("M2 16l3-8 3 8c-.9.53-2.04.53-3 0z"),P("M8 7h8"),P("M12 12v-5"),P("M9 11h6"));
Icons.Sunrise = (p) => Icons._svg(p.size||24,p.size||24, P("M17 18a5 5 0 0 0-10 0"),Ln("12","2","12","9"),Ln("4.22","10.22","5.64","11.64"),Ln("1","18","3","18"),Ln("21","18","23","18"),Ln("18.36","11.64","19.78","10.22"),Ln("23","22","1","22"),PL("8 6 12 2 16 6"));
Icons.Play = (p) => Icons._svg(p.size||24,p.size||24, P("M5 3l14 9L5 21z"));
Icons.X = (p) => Icons._svg(p.size||24,p.size||24, Ln("18","6","6","18"),Ln("6","6","18","18"));
Icons.Pencil = (p) => Icons._svg(p.size||24,p.size||24, P("M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"),P("M15 5l4 4"));
Icons.Trash2 = (p) => Icons._svg(p.size||24,p.size||24, PL("3 6 5 6 21 6"),P("M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"),Ln("10","11","10","17"),Ln("14","11","14","17"));
Icons.Sparkles = (p) => Icons._svg(p.size||24,p.size||24, P("M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"),P("M18.5 14.5L16 16l2.5 1.5L16 19l-1.5-2.5L12 15l2.5-1.5L16 11l1.5 2.5 2.5 1.5z"),P("M8 14l-1.5 2L4 17l2.5 1L8 20l1.5-2.5L12 17l-2.5-1L8 14z"));
Icons.Camera = (p) => Icons._svg(p.size||24,p.size||24, P("M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"), C("12","13","4"));
Icons.Calendar = (p) => Icons._svg(p.size||24,p.size||24, R("3","4","18","18","rx:2,ry:2"), Ln("16","2","16","6"),Ln("8","2","8","6"),Ln("3","10","21","10"));
Icons.ShoppingCart = (p) => Icons._svg(p.size||24,p.size||24, C("9","21","1"),C("20","21","1"),P("M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"));
Icons.ChevronLeft = (p) => Icons._svg(p.size||24,p.size||24, PL("15 18 9 12 15 6"));
Icons.ChevronRight = (p) => Icons._svg(p.size||24,p.size||24, PL("9 18 15 12 9 6"));
Icons.ExternalLink = (p) => Icons._svg(p.size||24,p.size||24, P("M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"), PL("15 3 21 3 21 9"), Ln("10","14","21","3"));
Icons.Info = (p) => Icons._svg(p.size||24,p.size||24, C("12","12","10"),Ln("12","16","12","12"),Ln("12","8","12.01","8"));
Icons.Menu = (p) => Icons._svg(p.size||24,p.size||24, Ln("3","12","21","12"),Ln("3","6","21","6"),Ln("3","18","21","18"));
Icons.Activity = (p) => Icons._svg(p.size||24,p.size||24, PL("22 12 18 12 15 21 9 3 6 12 2 12"));

// React components wrapper
window.Icons = {};
for (const [name, fn] of Object.entries(Icons)) {
  if (name.startsWith("_")) continue;
  window.Icons[name] = ({size=24,color="currentColor"}) => {
    const svg = fn({size,color});
    if (color !== "currentColor") svg.setAttribute("stroke", color);
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    return svg;
  };
}
})();
