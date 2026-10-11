/* ==========================================================================
   avatar.js — WebGL particle "avatar"
   A point-cloud that morphs between three procedural formations
   (sphere core → orbital rings → data lattice), rendered in two passes:
   a wide soft halo pass for bloom and a crisp pass for detail.
   Includes depth-of-field blur, twinkle, breathing, idle spin and
   pointer parallax. Pauses when off-screen or when the tab is hidden.
   No dependencies.
   ========================================================================== */
(function (global) {
  'use strict';

  var VERT = [
    'precision highp float;',
    'attribute vec4 aA; attribute vec4 aB; attribute vec4 aC; attribute vec4 aRnd;',
    'uniform float uTime; uniform float uProg; uniform float uRot; uniform float uTilt;',
    'uniform float uPoint; uniform float uFocus; uniform float uHalo; uniform float uMotion; uniform float uCam;',
    'uniform vec2 uProj; uniform vec3 uFromW; uniform vec3 uToW; uniform vec3 uDeep; uniform vec3 uMid; uniform vec3 uIce;',
    'varying vec3 vCol; varying float vA;',
    'vec3 rotY(vec3 p,float a){float c=cos(a),s=sin(a);return vec3(c*p.x+s*p.z,p.y,-s*p.x+c*p.z);}',
    'vec3 rotX(vec3 p,float a){float c=cos(a),s=sin(a);return vec3(p.x,c*p.y-s*p.z,s*p.y+c*p.z);}',
    'void main(){',
    '  float r0=aRnd.x, r1=aRnd.y, sz=aRnd.z, r3=aRnd.w;',
    '  vec3 from=aA.xyz*uFromW.x+aB.xyz*uFromW.y+aC.xyz*uFromW.z;',
    '  vec3 to  =aA.xyz*uToW.x  +aB.xyz*uToW.y  +aC.xyz*uToW.z;',
    '  float bF=dot(vec3(aA.w,aB.w,aC.w),uFromW);',
    '  float bT=dot(vec3(aA.w,aB.w,aC.w),uToW);',
    /* staggered, top-to-bottom morph with a swirling arc in the middle */
    '  float delay=r0*0.3+clamp((to.y+1.0)*0.5,0.0,1.0)*0.35;',
    '  float lt=clamp(uProg*1.65-delay,0.0,1.0);',
    '  float e=lt<0.5?4.0*lt*lt*lt:1.0-pow(-2.0*lt+2.0,3.0)*0.5;',
    '  float arc=sin(3.14159265*lt);',
    '  vec3 p=mix(from,to,e);',
    '  vec3 q=rotY(p,arc*2.6*(0.45+r1));',
    '  float rl=length(q.xz)+1e-4;',
    '  q.xz+=q.xz/rl*arc*(0.1+0.3*r0);',
    '  q.y+=arc*0.18*(r1-0.5);',
    '  p=q;',
    /* idle spin, breathing and organic jitter */
    '  p=rotY(p,uTime*0.16*uMotion)*(1.0+0.02*sin(uTime*1.3)*uMotion);',
    '  p+=0.008*uMotion*vec3(sin(uTime*0.9+r1*23.0),cos(uTime*0.7+r0*17.0),sin(uTime*1.1+r3*31.0));',
    /* camera */
    '  vec3 pr=rotX(rotY(p,uRot),uTilt);',
    '  float depth=uCam-pr.z;',
    '  gl_Position=vec4(pr.x*uProj.x,pr.y*uProj.y,0.0,depth);',
    '  float blur=clamp(abs(depth-uFocus)*0.8,0.0,1.6);',
    '  gl_PointSize=uPoint*sz*(7.5/depth)*(1.0+arc*0.3)*(1.0+blur*1.5)*uHalo;',
    /* colour: deep → mid by randomness, towards ice by brightness */
    '  float bright=mix(bF,bT,e);',
    '  vec3 col=mix(uDeep,uMid,r1*0.8);',
    '  col=mix(col,uIce,smoothstep(0.22,0.95,bright)*0.92);',
    '  col=mix(col,uIce,arc*0.28);',
    '  float tw=0.6+0.4*sin(uTime*(0.8+r0*2.6)*uMotion+r1*50.0);',
    '  float a=(0.14+1.25*bright)*tw*(1.0+arc*0.1);',
    '  a/=(1.0+blur*2.2);',
    '  a*=mix(1.0,smoothstep(0.12,0.7,bright),step(1.5,uHalo));',
    '  vCol=col; vA=a;',
    '}'
  ].join('\n');

  var FRAG = [
    'precision mediump float;',
    'uniform float uGain;',
    'varying vec3 vCol; varying float vA;',
    'void main(){',
    '  vec2 c=gl_PointCoord-0.5; float r=length(c)*2.0;',
    '  if(r>1.0) discard;',
    '  float a=pow(1.0-r,1.8);',
    '  gl_FragColor=vec4(vCol,vA*a*uGain);',
    '}'
  ].join('\n');

  var UNIFORMS = ['uTime', 'uProg', 'uRot', 'uTilt', 'uPoint', 'uFocus', 'uHalo', 'uMotion', 'uCam',
    'uProj', 'uFromW', 'uToW', 'uDeep', 'uMid', 'uIce', 'uGain'];

  /* Deterministic PRNG so the formation looks the same on every load. */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function randomDir(rand) {
    var th = 2 * Math.PI * rand(), ph = Math.acos(2 * rand() - 1);
    return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)];
  }
  function rotX3(x, y, z, a) { var c = Math.cos(a), s = Math.sin(a); return [x, c * y - s * z, s * y + c * z]; }
  function rotZ3(x, y, z, a) { var c = Math.cos(a), s = Math.sin(a); return [c * x - s * y, s * x + c * y, z]; }

  /* Build the three formations. Index i in every shape is the same particle,
     and the first `nCore` indices are always the brightest, most central
     points, so the glowing core stays coherent while morphing. */
  function buildShapes(N, rand) {
    var A = new Float32Array(N * 4), B = new Float32Array(N * 4), C = new Float32Array(N * 4), R = new Float32Array(N * 4);
    var nCore = Math.round(N * 0.28), i, d, r, b, k, x, y, z;

    /* A — sphere: dense bright core + fibonacci shell with occasional sparks */
    for (i = 0; i < N; i++) {
      if (i < nCore) {
        d = randomDir(rand); r = 0.62 * Math.pow(rand(), 0.55);
        x = d[0] * r; y = d[1] * r; z = d[2] * r; b = 0.45 + 0.55 * (1 - r / 0.62);
      } else {
        k = i - nCore;
        var n = N - nCore, ph = Math.acos(1 - 2 * (k + 0.5) / n), th = Math.PI * (1 + Math.sqrt(5)) * k;
        r = 1 + (rand() - 0.5) * 0.05;
        x = r * Math.sin(ph) * Math.cos(th); y = r * Math.cos(ph); z = r * Math.sin(ph) * Math.sin(th);
        b = rand() < 0.08 ? 0.55 + 0.4 * rand() : 0.1 + 0.22 * rand();
      }
      A[i * 4] = x; A[i * 4 + 1] = y; A[i * 4 + 2] = z; A[i * 4 + 3] = b;
    }

    /* B — orbit: nucleus + tilted thick torus + a thinner ring on another axis */
    for (i = 0; i < N; i++) {
      if (i < nCore) {
        d = randomDir(rand); r = 0.34 * Math.pow(rand(), 0.5);
        x = d[0] * r; y = d[1] * r; z = d[2] * r; b = 0.5 + 0.5 * (1 - r / 0.34);
      } else if (rand() < 0.66) {
        var u = rand() * Math.PI * 2, v = rand() * Math.PI * 2, Rm = 0.98, rm = 0.13 * Math.sqrt(rand());
        var tx = (Rm + rm * Math.cos(v)) * Math.cos(u), tz = (Rm + rm * Math.cos(v)) * Math.sin(u), ty = rm * Math.sin(v) * 0.8;
        var t1 = rotX3(tx, ty, tz, 0.52);
        x = t1[0]; y = t1[1]; z = t1[2];
        b = 0.18 + 0.3 * rand();
      } else {
        var u2 = rand() * Math.PI * 2, R2 = 1.12 + 0.05 * rand();
        var t2 = rotZ3.apply(null, rotX3(R2 * Math.cos(u2), 0, R2 * Math.sin(u2), 1.15).concat([0.6]));
        x = t2[0]; y = t2[1]; z = t2[2];
        b = 0.45 + 0.4 * rand();
      }
      B[i * 4] = x; B[i * 4 + 1] = y; B[i * 4 + 2] = z; B[i * 4 + 3] = b;
    }

    /* C — lattice: wireframe-style cube (bright edges, dimmer faces, faint interior)
       sorted by distance so the glowing core sits in the centre, then tilted */
    var kk = Math.max(6, Math.floor(Math.cbrt(N))), cells = [], ix, iy, iz, half = 0.85;
    for (ix = 0; ix < kk; ix++) for (iy = 0; iy < kk; iy++) for (iz = 0; iz < kk; iz++) {
      x = (ix / (kk - 1) - 0.5) * 2 * half; y = (iy / (kk - 1) - 0.5) * 2 * half; z = (iz / (kk - 1) - 0.5) * 2 * half;
      var ext = (Math.abs(x) > half - 0.01 ? 1 : 0) + (Math.abs(y) > half - 0.01 ? 1 : 0) + (Math.abs(z) > half - 0.01 ? 1 : 0);
      cells.push([x, y, z, Math.sqrt(x * x + y * y + z * z), ext]);
    }
    cells.sort(function (p, q) { return p[3] - q[3]; });
    for (i = 0; i < N; i++) {
      var c = cells[i % cells.length], j = 0.012;
      var l1 = rotZ3.apply(null, rotX3(c[0] + (rand() - 0.5) * j, c[1] + (rand() - 0.5) * j, c[2] + (rand() - 0.5) * j, 0.42).concat([0.32]));
      x = l1[0]; y = l1[1]; z = l1[2];
      if (i < nCore) b = 0.6 + 0.4 * Math.max(0, 1 - c[3] / 0.5);
      else b = c[4] >= 2 ? 0.75 + 0.25 * rand() : (c[4] === 1 ? 0.3 + 0.2 * rand() : 0.12 + (rand() < 0.05 ? 0.5 : 0));
      C[i * 4] = x; C[i * 4 + 1] = y; C[i * 4 + 2] = z; C[i * 4 + 3] = Math.min(1, b);
    }

    /* per-particle randomness: r0, r1, size, r3 */
    for (i = 0; i < N; i++) {
      var s = rand();
      R[i * 4] = rand(); R[i * 4 + 1] = rand(); R[i * 4 + 2] = 0.55 + 1.1 * s * s; R[i * 4 + 3] = rand();
    }
    return { A: A, B: B, C: C, R: R, count: N };
  }

  function compile(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src); gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      if (global.console) console.warn('[avatar] shader error:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh); return null;
    }
    return sh;
  }

  function link(gl, attribs) {
    var vs = compile(gl, gl.VERTEX_SHADER, VERT), fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    attribs.forEach(function (name, loc) { gl.bindAttribLocation(prog, loc, name); });
    gl.linkProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      if (global.console) console.warn('[avatar] link error:', gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  function onehot(i) { return [i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0]; }

  function create(canvas, opts) {
    var o = Object.assign({
      count: 4200,
      deep: [0.07, 0.30, 1.00],
      mid: [0.28, 0.70, 1.00],
      ice: [0.85, 0.93, 1.00],
      worldH: 3.7,
      seed: 7,
      gain: 2.0,
      onReady: null
    }, opts || {});

    var gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' })
        || canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    } catch (e) { gl = null; }
    if (!gl) return null;

    var attribs = ['aA', 'aB', 'aC', 'aRnd'];
    var prog = link(gl, attribs);
    if (!prog) return null;

    var shapes = buildShapes(o.count, mulberry32(o.seed));
    var buffers = [shapes.A, shapes.B, shapes.C, shapes.R].map(function (data, loc) {
      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
      return buf;
    });

    gl.useProgram(prog);
    var U = {};
    UNIFORMS.forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var st = {
      from: 0, to: 0, prog: 1, pending: null,
      time: 0, last: 0, raf: null, visible: true, ready: false,
      px: 0, py: 0, tx: 0, ty: 0, energy: 0,
      motion: reduced ? 0 : 1, w: 0, h: 0, dpr: 1, lost: false
    };

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      var w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
      if (w !== canvas.width || h !== canvas.height) { canvas.width = w; canvas.height = h; }
      st.w = w; st.h = h; st.dpr = dpr;
      gl.viewport(0, 0, w, h);
    }

    function frame(now) {
      if (st.lost || !st.w) return;
      var t = now / 1000;
      var dt = st.last ? Math.max(0, Math.min(0.05, t - st.last)) : 0.016;
      st.last = t;
      st.time += dt;

      if (st.prog < 1) {
        st.prog = Math.min(1, st.prog + dt / 1.7);
        if (st.prog >= 1) {
          st.from = st.to;
          if (st.pending !== null) { var nxt = st.pending; st.pending = null; st.to = nxt; st.prog = 0; }
        }
      }
      var k = Math.min(1, dt * 4);
      st.px += (st.tx - st.px) * k;
      st.py += (st.ty - st.py) * k;

      var cam = 7.5, aspect = st.w / st.h, pxPerUnit = st.h / o.worldH, small = st.h < 560 * st.dpr;
      var gain = o.gain * (1 + st.energy * 0.25);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(U.uTime, st.time);
      gl.uniform1f(U.uProg, st.prog);
      gl.uniform1f(U.uMotion, st.motion);
      gl.uniform1f(U.uRot, Math.sin(st.time * 0.21) * 0.16 * st.motion + st.px * 0.42);
      gl.uniform1f(U.uTilt, 0.22 + st.py * 0.13);
      gl.uniform1f(U.uPoint, 0.015 * pxPerUnit);
      gl.uniform1f(U.uFocus, cam);
      gl.uniform1f(U.uCam, cam);
      gl.uniform2f(U.uProj, 2 * cam / o.worldH / aspect, 2 * cam / o.worldH);
      gl.uniform3fv(U.uFromW, onehot(st.from));
      gl.uniform3fv(U.uToW, onehot(st.to));
      gl.uniform3fv(U.uDeep, o.deep);
      gl.uniform3fv(U.uMid, o.mid);
      gl.uniform3fv(U.uIce, o.ice);

      /* pass 1 — wide, dim halo for bloom (bright points only) */
      gl.uniform1f(U.uHalo, small ? 4.4 : 5.5);
      gl.uniform1f(U.uGain, gain * 0.065);
      gl.drawArrays(gl.POINTS, 0, shapes.count);
      /* pass 2 — crisp particles */
      gl.uniform1f(U.uHalo, 1);
      gl.uniform1f(U.uGain, gain);
      gl.drawArrays(gl.POINTS, 0, shapes.count);

      if (!st.ready) { st.ready = true; if (typeof o.onReady === 'function') o.onReady(); }
    }

    function shouldRun() { return st.visible && !global.document.hidden && !st.lost && (st.motion > 0 || st.prog < 1); }
    function tick(now) { st.raf = null; frame(now); if (shouldRun()) st.raf = global.requestAnimationFrame(tick); }
    function start() { if (st.raf === null && shouldRun()) { st.last = 0; st.raf = global.requestAnimationFrame(tick); } }
    function stop() { if (st.raf !== null) { global.cancelAnimationFrame(st.raf); st.raf = null; } }

    var io = null;
    if ('IntersectionObserver' in global) {
      io = new IntersectionObserver(function (entries) {
        st.visible = entries[0].isIntersecting;
        if (st.visible) start(); else stop();
      }, { threshold: 0.01 });
      io.observe(canvas);
    }
    var ro = null;
    if ('ResizeObserver' in global) { ro = new ResizeObserver(function () { resize(); if (st.motion === 0) frame(global.performance.now()); }); ro.observe(canvas); }
    else global.addEventListener('resize', resize);
    global.document.addEventListener('visibilitychange', function () { if (global.document.hidden) stop(); else start(); });
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); st.lost = true; stop(); });

    resize();
    /* first frame immediately so the fade-in has something to show */
    frame(global.performance.now());
    start();

    return {
      morphTo: function (i) {
        i = ((i % 3) + 3) % 3;
        if (i === st.to && st.pending === null) return;
        if (st.prog < 1) { st.pending = i; return; }
        st.from = st.to; st.to = i; st.prog = 0; start();
      },
      setPointer: function (x, y) { st.tx = Math.max(-1, Math.min(1, x)); st.ty = Math.max(-1, Math.min(1, y)); },
      setEnergy: function (v) { st.energy = Math.max(0, Math.min(1, v)); },
      current: function () { return st.to; },
      state: function () { return { from: st.from, to: st.to, prog: st.prog, pending: st.pending, running: st.raf !== null, visible: st.visible, time: st.time, w: st.w, h: st.h }; },
      /* advance the simulation by dt seconds and draw one frame (debug / tests) */
      step: function (dt) { st.clock = (st.clock || global.performance.now()) + Math.max(0, dt || 0.016) * 1000; frame(st.clock); },
      _shapes: shapes,
      destroy: function () {
        stop(); if (io) io.disconnect(); if (ro) ro.disconnect();
        buffers.forEach(function (b) { gl.deleteBuffer(b); }); gl.deleteProgram(prog);
      }
    };
  }

  global.Avatar = { create: create };
})(window);
