/* The orbit beside the bio. Same topics as /knowledge/: rings ordered by how
   connected a topic is, so the hubs sit in the middle. Positions, label
   placement and per-topic label size are precomputed in _data/knowledge.yml;
   nothing is solved here.

   Motion, all of it first-order or softly damped so nothing jitters:
     - every dot drifts idly, detuned per node, at a speed set by its tier
     - the cursor magnifies the patch of graph around it, without moving anything
     - the whole drawing trails the page when you scroll, then settles back with
       one soft rebound

   Nothing here highlights, selects or explains a topic: it is a link to the page
   that does. */
(function () {
  "use strict";

  var host = document.querySelector("[data-orbit]");
  var svg = document.querySelector("[data-orbit-svg]");
  var link = document.querySelector("[data-orbit-link]");
  if (!host || !svg || !link) return;

  var d;
  try { d = JSON.parse(host.textContent); } catch (err) { return; }
  if (!d || !d.ox || d.ox.length < 2) return;

  var NS = "http://www.w3.org/2000/svg";
  var W = d.vw, Hh = d.vh, CX = W / 2, CY = Hh / 2;
  svg.setAttribute("viewBox", "0 0 " + W + " " + Hh);

  function bail() {
    link.hidden = true;
  }

  // Tier sets how briskly a topic floats: the newest are least anchored and
  // skip along, the ones he knows deepest sit heavier.
  var SPIN = { 4: 0.80, 3: 1.00, 2: 1.22, 1: 1.48 };
  var AMPT = { 4: 0.86, 3: 1.00, 2: 1.06, 1: 1.14 };

  var nodes = d.ox.map(function (ox, i) {
    var solid = d.states[i] === "solid";
    return {
      bx: ox, by: d.oy[i],
      x: ox, y: d.oy[i],
      ly: d.ly[i] - d.oy[i],          // label offset, so it travels with its dot
      side: d.side[i],
      label: d.labels[i],
      fs: d.fs[i],
      depth: d.depth[i],
      // width of this label at its base size, used to cap the lens so a
      // magnified name can never run past the edge of the drawing and be cut
      w0: d.labels[i].length * d.fs[i] * 0.61,
      r: solid ? 2.6 : 2.2,
      mag: 1, lastMag: -1,
      phase: i * 1.37,
      phase2: i * 2.11 + 0.7,
      fx: (0.40 + (i % 5) * 0.031) * SPIN[d.depth[i]],
      fy: (0.33 + (i % 7) * 0.025) * SPIN[d.depth[i]],
      amp: AMPT[d.depth[i]]
    };
  });

  var idx = {};
  d.ids.forEach(function (id, i) { idx[id] = i; });
  var pairs = [];
  for (var i = 0; i < d.ef.length; i++) {
    var a = idx[d.ef[i]], b = idx[d.et[i]];
    if (a === undefined || b === undefined) continue;
    pairs.push([a, b]);
  }

  // Spider web: the strands spring from the same two nodes as the edge they
  // belong to, each one bowed a little further than the last, so they nest
  // outward into the gap on either side instead of reading as extra edges.
  var WEB_MIN_STRENGTH = 9, WEB_BOW = 9.0, WEB_MAX_LINES = 3;
  var neighbours = nodes.map(function () { return []; });
  pairs.forEach(function (p) {
    neighbours[p[0]].push(p[1]);
    neighbours[p[1]].push(p[0]);
  });
  var strands = [];
  pairs.forEach(function (p, ei) {
    var strength = neighbours[p[0]].length + neighbours[p[1]].length;
    if (strength < WEB_MIN_STRENGTH) return;
    var lines = Math.min(WEB_MAX_LINES,
                         Math.floor((strength - WEB_MIN_STRENGTH) / 2) + 1);
    for (var j = 1; j <= lines; j++) {
      strands.push([ei, j * WEB_BOW]);
      strands.push([ei, -j * WEB_BOW]);
    }
  });

  function mk(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) { if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]); }
    return n;
  }

  var chordEls = [], dotEls = [], textEls = [], webEls = [];
  try {
    var webLayer = mk("g", { "class": "orbit-webs" });
    var chordLayer = mk("g", { "class": "orbit-chords" });
    var dotLayer = mk("g", { "class": "orbit-dots" });
    var textLayer = mk("g", { "class": "orbit-names" });
    svg.appendChild(webLayer);
    svg.appendChild(chordLayer);
    svg.appendChild(dotLayer);
    svg.appendChild(textLayer);

    pairs.forEach(function () {
      var p = mk("path", { "class": "orbit-chord" });
      chordLayer.appendChild(p);
      chordEls.push(p);
    });
    strands.forEach(function () {
      var p = mk("path", { "class": "orbit-web" });
      webLayer.appendChild(p);
      webEls.push(p);
    });
    nodes.forEach(function (n) {
      var c = mk("circle", { r: n.r, "class": "orbit-dot" + (n.r < 2.5 ? " is-open" : "") });
      dotLayer.appendChild(c);
      dotEls.push(c);
      // is-d4..is-d1 carry the weight and colour for his depth tiers; the size
      // comes from the data. Dropping this class drops the whole hierarchy.
      var t = mk("text", { "class": "orbit-name is-d" + n.depth,
                           "font-size": n.fs,
                           "text-anchor": n.side === "start" ? "start" : "end",
                           "dominant-baseline": "central" });
      t.textContent = n.label;
      textLayer.appendChild(t);
      textEls.push(t);
    });
  } catch (err) {
    bail();
    return;
  }

  var GAP = 5, BUNDLE = 0.55;
  function draw() {
    var i, n;
    for (i = 0; i < pairs.length; i++) {
      var a = nodes[pairs[i][0]], b = nodes[pairs[i][1]];
      var mx2 = (a.x + b.x) / 2, my2 = (a.y + b.y) / 2;
      var qx = mx2 + (CX - mx2) * BUNDLE, qy = my2 + (CY - my2) * BUNDLE;
      chordEls[i].setAttribute("d",
        "M" + a.x.toFixed(2) + " " + a.y.toFixed(2) +
        "Q" + qx.toFixed(2) + " " + qy.toFixed(2) +
        " " + b.x.toFixed(2) + " " + b.y.toFixed(2));
    }
    for (i = 0; i < strands.length; i++) {
      var se = pairs[strands[i][0]], bow = strands[i][1];
      var sa = nodes[se[0]], sb = nodes[se[1]];
      var ex = sb.x - sa.x, ey = sb.y - sa.y;
      var el = Math.sqrt(ex * ex + ey * ey) || 1;
      // Same endpoints as the edge; only the control point swings wider, so
      // each strand is a fatter parabola nested inside the one before it.
      var nx = -ey / el, ny = ex / el;
      var smx = (sa.x + sb.x) / 2, smy = (sa.y + sb.y) / 2;
      var sqx = smx + (CX - smx) * BUNDLE + nx * bow * 1.4;
      var sqy = smy + (CY - smy) * BUNDLE + ny * bow * 1.4;
      webEls[i].setAttribute("d",
        "M" + sa.x.toFixed(2) + " " + sa.y.toFixed(2) +
        "Q" + sqx.toFixed(2) + " " + sqy.toFixed(2) +
        " " + sb.x.toFixed(2) + " " + sb.y.toFixed(2));
    }
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      dotEls[i].setAttribute("cx", n.x.toFixed(2));
      dotEls[i].setAttribute("cy", n.y.toFixed(2));
      var g = GAP * n.mag;
      textEls[i].setAttribute("x", (n.x + (n.side === "start" ? g : -g)).toFixed(2));
      textEls[i].setAttribute("y", (n.y + n.ly).toFixed(2));
      if (Math.abs(n.mag - n.lastMag) > 0.002) {
        dotEls[i].setAttribute("r", (n.r * n.mag).toFixed(2));
        textEls[i].setAttribute("font-size", (n.fs * n.mag).toFixed(2));
        n.lastMag = n.mag;
      }
    }
  }

  link.hidden = false;
  draw();

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (still && still.matches) return;

  // --- cursor lens ---------------------------------------------------------
  // Magnifies the patch of graph around the pointer. Nothing is displaced:
  // the label layout was de-collided offline for one exact geometry, and
  // moving labels around breaks it, whereas growing them in place does not.
  var mx = null, my = null;
  // LENS magnifies the patch under the pointer; OUT pushes those nodes out
  // along the radius from the drawing's centre, lengthening their chords.
  // These are the strongest values that still never collide two labels: the
  // label slots carry 2.3x vertical headroom precisely so the lens has room,
  // and the pair was picked by sweeping the cursor over the whole drawing.
  var LENS = 0.40, OUT = 0.14, LENS_R = 120;

  window.addEventListener("pointermove", function (ev) {
    var r = svg.getBoundingClientRect();
    if (!r.width || !r.height) { mx = my = null; return; }
    var pad = r.width * 0.4;
    if (ev.clientX < r.left - pad || ev.clientX > r.right + pad ||
        ev.clientY < r.top - pad || ev.clientY > r.bottom + pad) {
      mx = my = null;
      return;
    }
    mx = ((ev.clientX - r.left) / r.width) * W;
    my = ((ev.clientY - r.top) / r.height) * Hh;
  }, { passive: true });

  window.addEventListener("blur", function () { mx = my = null; });

  // --- scroll: the drawing trails the page, then resettles ------------------
  var lastY = window.pageYOffset || 0;
  var lag = 0, lagV = 0;
  // A soft, slow spring: one clear rebound as it resettles, big enough to read
  // even on a short scroll, and the excursion after that is a pixel or two.
  // No hard wall on how far it trails. SOFT_LAG is an asymptote, not a cap:
  // tanh is the identity for small values, so ordinary scrolling never feels a
  // limit, and only an extreme fling is gently restrained from flying away.
  var FOLLOW = 0.42, SOFT_LAG = 230, OMEGA = 4.5, ZETA = 0.55;

  var onScreen = true;
  if (window.IntersectionObserver) {
    new window.IntersectionObserver(function (es) {
      onScreen = es[0].isIntersecting;
    }, { threshold: 0 }).observe(svg);
  }

  // Idle drift. SEC is the second, slower harmonic laid across the first: raising
  // it buys a wandering path rather than a tidy ellipse. The pair is capped by the
  // tightest label pair in the drawing (Astrophysics / Algorithms) and by the frame
  // edge at Signal processing; a swept check leaves 3.2u and 1.2u of clearance.
  var AX = 3.8, AY = 2.7, SEC = 0.55, EASE = 0.09;
  var t0 = null, tPrev = 0;

  function frame(ts) {
    window.requestAnimationFrame(frame);
    if (document.hidden || !onScreen) {
      t0 = null;
      lastY = window.pageYOffset || 0;   // otherwise it lurches when it returns
      return;
    }
    if (t0 === null) { t0 = ts; tPrev = ts; }
    var t = (ts - t0) / 1000;
    var dt = (ts - tPrev) / 1000;
    tPrev = ts;
    if (dt > 1 / 30) dt = 1 / 30; else if (dt < 1 / 240) dt = 1 / 240;

    var y = window.pageYOffset || 0;
    lag -= (y - lastY) * FOLLOW;
    lastY = y;
    lag = SOFT_LAG * Math.tanh(lag / SOFT_LAG);
    lagV += (-(OMEGA * OMEGA) * lag - 2 * ZETA * OMEGA * lagV) * dt;
    lag += lagV * dt;
    if (Math.abs(lag) < 0.04 && Math.abs(lagV) < 0.3) { lag = 0; lagV = 0; }
    link.style.transform = "translate3d(0," + lag.toFixed(2) + "px,0)";

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var ax = AX * n.amp, ay = AY * n.amp;
      var tx = n.bx + Math.cos(t * n.fx + n.phase) * ax
                    + Math.sin(t * n.fy * 0.6 + n.phase2) * (ax * SEC);
      var ty = n.by + Math.sin(t * n.fy + n.phase * 1.3) * ay
                    + Math.cos(t * n.fx * 0.7 + n.phase2) * (ay * SEC);
      var want = 1;
      if (mx !== null) {
        var dx = n.x - mx, dy = n.y - my;
        var dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < LENS_R) {
          var u = 1 - (dd / LENS_R) * (dd / LENS_R);
          var wgt = u * u;
          want = 1 + LENS * wgt;
          var k = 1 + OUT * wgt;
          tx = CX + (tx - CX) * k;
          ty = CY + (ty - CY) * k;
          // keep the pushed dot inside the frame, so neither it nor the web
          // strands hanging off it can wander off the edge of the screen
          if (tx < 4) tx = 4; else if (tx > W - 4) tx = W - 4;
          if (ty < 4) ty = 4; else if (ty > Hh - 4) ty = Hh - 4;
        }
      }
      // Cap the magnification so the label stays inside the viewBox. Without
      // this a long name near the edge grows past the frame and loses its first
      // characters: "Writing & teaching" becomes "iting & teaching".
      var room = n.side === "start" ? (W - 2 - n.x) : (n.x - 2);
      var capM = room / (GAP + n.w0);
      if (capM < 1) capM = 1;
      if (want > capM) want = capM;
      n.mag += (want - n.mag) * 0.14;
      // first-order ease, not a spring: a spring stores energy and overshoots,
      // which reads as bounce. This can only ever approach its target.
      n.x += (tx - n.x) * EASE;
      n.y += (ty - n.y) * EASE;
    }
    draw();
  }
  window.requestAnimationFrame(frame);
})();
