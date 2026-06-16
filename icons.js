// icons.js — icônes SVG en React.createElement (compatible React 18)
(function(){
var h = React.createElement;
var svg = function(size, color, children) {
  return h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color || "currentColor",
    strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"
  }, children);
};
var p = function(d, extra) { return h("path", Object.assign({d: d, key: d.slice(0,20)}, extra || {})); };
var c = function(cx,cy,r) { return h("circle", {cx:cx,cy:cy,r:r, key:"c"+cx+cy+r}); };
var ln = function(x1,y1,x2,y2) { return h("line", {x1:x1,y1:y1,x2:x2,y2:y2, key:"l"+x1+y1+x2+y2}); };
var pl = function(pts) { return h("polyline", {points: pts, key:"pl"+pts}); };
var rect = function(x,y,w,ht,extra) { return h("rect", Object.assign({x:x,y:y,width:w,height:ht, key:"r"+x+y+w+ht}, extra || {})); };

window.Icons = {
  Home: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"),pl("9 22 9 12 15 12 15 22")]);
  },
  Dumbbell: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M6.5 6.5L17.5 17.5"),p("M2 12h20"),p("M8 8l8 8"),p("M2 8l4-4"),p("M22 8l-4-4"),p("M2 16l4 4"),p("M22 16l-4 4")]);
  },
  UtensilsCrossed: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M7 2v6a2 2 0 0 0 2 2h1"),p("M10 10V2"),p("M3 2v6a3 3 0 0 0 6 0V2"),p("M13 21v-4h2l2 4"),p("M18.5 12c.5-1 0-2 0-2S17 11 17 13v-2"),p("M18 14v4l-2 4"),p("M13 17h4"),p("M17.5 10c.5-1 0-2 0-2S16 9 16 11")]);
  },
  Moon: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z")]);
  },
  ChefHat: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"),ln("6","17","18","17")]);
  },
  Check: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[pl("20 6 9 17 4 12")]);
  },
  Plus: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[ln("12","5","12","19"),ln("5","12","19","12")]);
  },
  Minus: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[ln("5","12","19","12")]);
  },
  Flame: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M12 2l3.09 6.31L22 9.31l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.18 2 9.31l6.91-1L12 2z")]);
  },
  Trophy: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 6 6 9z"),p("M18 9h1.5a2.5 2.5 0 0 0 0-5C18 4 18 6 18 9z"),p("M6 9c0 4 2 8 6 8s6-4 6-8"),p("M12 17v4"),p("M8 21h8")]);
  },
  ChevronDown: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[pl("6 9 12 15 18 9")]);
  },
  Clock: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[c("12","12","10"),pl("12 6 12 12 16 14")]);
  },
  Scale: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M16 16l3-8 3 8c-.9.53-2.04.53-3 0z"),p("M2 16l3-8 3 8c-.9.53-2.04.53-3 0z"),p("M8 7h8"),p("M12 12v-5"),p("M9 11h6")]);
  },
  Sunrise: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M17 18a5 5 0 0 0-10 0"),ln("12","2","12","9"),ln("4.22","10.22","5.64","11.64"),ln("1","18","3","18"),ln("21","18","23","18"),ln("18.36","11.64","19.78","10.22"),ln("23","22","1","22"),pl("8 6 12 2 16 6")]);
  },
  Play: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M5 3l14 9L5 21z")]);
  },
  X: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[ln("18","6","6","18"),ln("6","6","18","18")]);
  },
  Pencil: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"),p("M15 5l4 4")]);
  },
  Trash2: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[pl("3 6 5 6 21 6"),p("M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"),ln("10","11","10","17"),ln("14","11","14","17")]);
  },
  Sparkles: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"),p("M18.5 14.5L16 16l2.5 1.5L16 19l-1.5-2.5L12 15l2.5-1.5L16 11l1.5 2.5 2.5 1.5z"),p("M8 14l-1.5 2L4 17l2.5 1L8 20l1.5-2.5L12 17l-2.5-1L8 14z")]);
  },
  Camera: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"),c("12","13","4")]);
  },
  Calendar: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[rect("3","4","18","18",{rx:2,ry:2}),ln("16","2","16","6"),ln("8","2","8","6"),ln("3","10","21","10")]);
  },
  ShoppingCart: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[c("9","21","1"),c("20","21","1"),p("M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6")]);
  },
  ChevronLeft: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[pl("15 18 9 12 15 6")]);
  },
  ChevronRight: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[pl("9 18 15 12 9 6")]);
  },
  ExternalLink: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[p("M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"),pl("15 3 21 3 21 9"),ln("10","14","21","3")]);
  },
  Info: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[c("12","12","10"),ln("12","16","12","12"),ln("12","8","12.01","8")]);
  },
  Menu: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[ln("3","12","21","12"),ln("3","6","21","6"),ln("3","18","21","18")]);
  },
  Activity: function(a) { var s=a&&a.size||24,cl=a&&a.color;
    return svg(s,cl,[pl("22 12 18 12 15 21 9 3 6 12 2 12")]);
  }
};
})();
