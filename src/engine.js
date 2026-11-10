/* Flat, faceless illustration of a woman (no outlines): organic tapered limbs, a torso with hips, waist and bust,
   sports top and high-waist leggings, hair in a bun. Three tones (far / body / near) give depth without strokes.
   Poses are joint angles in degrees (0 = right, 90 = down); `view: 'front'` draws her facing the viewer. */
const L = {T:58, NK:16, R:12, UA:29, FA:26, TH:46, SH:44, FT:14};
const PROF = {
  side:[[-0.12,5,7],[-0.04,9,11.5],[0.06,10.5,13.2],[0.2,10,11.5],[0.34,8.6,9.4],[0.46,8,8.6],[0.6,10,9],[0.71,12.6,9.6],[0.82,11,10],[0.92,8,9],[0.98,5.5,6],[1.0,4.6,4.6]],
  front:[[-0.12,9,9],[-0.04,14.5,14.5],[0.08,16.5,16.5],[0.22,15,15],[0.44,11,11],[0.62,12,12],[0.8,13.6,13.6],[0.92,15.2,15.2],[0.98,9,9],[1.0,4.8,4.8]]
};
const LIMB = {
  thighS:[[0,11,10],[0.3,10.6,10.2],[0.7,8.2,8.2],[1,6.2,6.4]],
  shinS:[[0,6.2,6.2],[0.25,7.8,5.6],[0.6,5.3,4.6],[1,3.7,3.4]],
  thighF:[[0,10.5,10.5],[0.35,9.6,9.6],[0.75,7.6,7.6],[1,6.2,6.2]],
  shinF:[[0,6,6],[0.28,6.8,6.8],[0.65,4.8,4.8],[1,3.6,3.6]],
  upper:[[0,5,5],[0.4,4.5,4.5],[1,3.4,3.4]],
  fore:[[0,3.4,3.4],[0.3,3.7,3.7],[1,2.5,2.5]],
  hand:[[0,2.5,2.5],[0.5,3,3],[1,2.1,2.1]],
  foot:[[0,3.8,3.4],[0.5,3,3],[1,1.9,1.9]],
  neck:[[0,4.9,4.9],[1,4.3,4.3]]
};
const SK = 'var(--fig-skin)', SKM = 'var(--fig-skin-mid)', SK2 = 'var(--fig-skin-2)', HAIR = 'var(--fig-hair)',
      TOP = 'var(--fig-top)', LEG = 'var(--fig-leg)', LEGM = 'var(--fig-leg-mid)', LEG2 = 'var(--fig-leg-2)';
const ANG = ['ta','na','aN1','aN2','aF1','aF2','lN1','lN2','lF1','lF2'];
const DISCRETE = ['face','view','fo'];
const BASE = {k:1.2,hx:160,hy:178,ta:180,bend:0,na:180,face:1,view:'side',fo:0,hw:0,sw:0,pt:0.5,aN1:0,aN2:0,aF1:0,aF2:0,lN1:0,lN2:0,lF1:0,lF2:0};
const P = (o) => Object.assign({}, BASE, o);
const rad = (d) => d * Math.PI / 180;
const dir = (a) => [Math.cos(rad(a)), Math.sin(rad(a))];
const f1 = (n) => n.toFixed(1);
const fp = (q) => f1(q[0]) + ',' + f1(q[1]);
const circ = (q, r, c) => `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${r}" fill="${c}"/>`;
const add = (a, d, k) => [a[0] + d[0] * k, a[1] + d[1] * k];

function wAt(prof, s){
  if (s <= prof[0][0]) return [prof[0][1], prof[0][2]];
  for (let i = 1; i < prof.length; i++){
    const b = prof[i];
    if (s <= b[0]) { const a = prof[i-1], k = (s - a[0]) / (b[0] - a[0]); return [a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; }
  }
  const z = prof[prof.length - 1]; return [z[1], z[2]];
}
function closedPath(p){
  const n = p.length; let d = 'M' + fp(p[0]);
  for (let i = 0; i < n; i++){
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    d += 'C' + fp([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]) + ' ' + fp([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]) + ' ' + fp(p2);
  }
  return d + 'Z';
}
/* one body segment as a soft organic shape; `face` decides which side is the back (calf, glute side) */
function organ(a, b, prof, face, c){
  const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, d = [dx / l, dy / l], nb = [-d[1] * face, d[0] * face];
  const A = [], K = [];
  for (const r of prof){ const q = [a[0] + dx * r[0], a[1] + dy * r[0]]; A.push(add(q, nb, r[1])); K.push(add(q, nb, -r[2])); }
  const e = prof[prof.length - 1], s = prof[0];
  return `<path d="${closedPath(A.concat([add(b, d, Math.max(e[1], e[2]) * 0.75)], K.reverse(), [add(a, d, -Math.max(s[1], s[2]) * 0.6)]))}" fill="${c}"/>`;
}

function figure(p){
  const face = p.face < 0 ? -1 : 1, front = p.view === 'front';
  const t = dir(p.ta), H = [p.hx, p.hy], N = add(H, t, L.T);
  const pf = [-face * t[1], face * t[0]];
  const Cc = add([(H[0] + N[0]) / 2, (H[1] + N[1]) / 2], pf, p.bend * 2);
  const B = (s) => { const a = (1 - s) * (1 - s), b = 2 * s * (1 - s), c = s * s; return [a * H[0] + b * Cc[0] + c * N[0], a * H[1] + b * Cc[1] + c * N[1]]; };
  const NF = (s) => {
    const x = 2 * (1 - s) * (Cc[0] - H[0]) + 2 * s * (N[0] - Cc[0]), y = 2 * (1 - s) * (Cc[1] - H[1]) + 2 * s * (N[1] - Cc[1]), l = Math.hypot(x, y) || 1;
    return [-face * y / l, face * x / l];
  };
  const prof = front ? PROF.front : PROF.side;
  const shape = (s0, s1, pad, c) => {
    const F = [], K = [], n = Math.max(4, Math.round((s1 - s0) / 0.07));
    for (let i = 0; i <= n; i++){
      const s = s0 + (s1 - s0) * i / n, q = B(s), nf = NF(s), w = wAt(prof, s);
      F.push(add(q, nf, w[0] + pad)); K.push(add(q, nf, -(w[1] + pad)));
    }
    return `<path d="${closedPath(F.concat(K.reverse()))}" fill="${c}"/>`;
  };
  const hb = B(0.03), hn = NF(0.03), sb = B(0.88), sn = NF(0.88);
  const hw = front ? p.hw : 0, sw = front ? p.sw : 0;
  const hipN = add(hb, hn, hw), hipF = add(hb, hn, -hw), shN = add(sb, sn, sw), shF = add(sb, sn, -sw);
  const leg = (o, a1, a2, near) => {
    const cl = near ? LEG : LEG2, cs = near ? SK : SK2;
    const k = add(o, dir(a1), L.TH), an = add(k, dir(a2), L.SH);
    const fa = p.fo ? a2 + (near ? -p.fo : p.fo) : a2 - face * (90 - 70 * p.pt);
    const toe = add(an, dir(fa), p.fo ? 9 : (front ? L.FT * 0.75 : L.FT));
    return organ(an, toe, LIMB.foot, face, cs) +
      organ(o, k, front ? LIMB.thighF : LIMB.thighS, face, cl) + circ(k, 6.2, cl) +
      organ(k, an, front ? LIMB.shinF : LIMB.shinS, face, cl);
  };
  const arm = (o, a1, a2, near) => {
    const c = near ? SK : SK2, e = add(o, dir(a1), L.UA), w = add(e, dir(a2), L.FA);
    return circ(o, 5, c) + organ(o, e, LIMB.upper, face, c) + circ(e, 3.4, c) + organ(e, w, LIMB.fore, face, c) + organ(w, add(w, dir(a2), 9), LIMB.hand, face, c);
  };
  const nd = dir(p.na), Hc = add(N, nd, L.NK), hf = [-face * nd[1], face * nd[0]];
  let head;
  if (front){
    head = circ(add(Hc, nd, L.R + 3), 6.5, HAIR) + circ(add(Hc, nd, 2.4), L.R + 1, HAIR) + circ(add(Hc, nd, -1.9), L.R - 1, SKM);
  } else {
    let u = [nd[0] * 0.55 - hf[0] * 0.85, nd[1] * 0.55 - hf[1] * 0.85]; const ul = Math.hypot(u[0], u[1]) || 1; u = [u[0] / ul, u[1] / ul];
    head = circ(add(Hc, u, L.R + 2), 6.5, HAIR) + circ(add(Hc, u, 2.4), L.R + 1, HAIR) + circ(add(add(Hc, hf, 1.8), nd, -0.6), L.R - 0.4, SKM);
  }
  return arm(shF, p.aF1, p.aF2, false) + leg(hipF, p.lF1, p.lF2, false) +
    organ(B(0.9), add(N, nd, 7), LIMB.neck, face, SKM) +
    shape(-0.12, 1, 0, SKM) + shape(-0.12, 0.40, 0.5, LEGM) + shape(0.57, 0.875, 0.6, TOP) +
    head + leg(hipN, p.lN1, p.lN2, true) + arm(shN, p.aN1, p.aN2, true);
}
function mix(a, b, k, shortest){
  const o = {};
  for (const key in b){
    if (DISCRETE.indexOf(key) !== -1 || typeof b[key] !== 'number') { o[key] = b[key]; continue; }
    let d = b[key] - a[key];
    if (shortest && ANG.indexOf(key) !== -1) d = ((d % 360) + 540) % 360 - 180;
    o[key] = a[key] + d * k;
  }
  return o;
}
const ease = (x) => { const u = Math.min(1, Math.max(0, (x - 0.08) / 0.84)); return u*u*(3 - 2*u); };
const MAT = '<rect x="-40" y="192" width="400" height="40" fill="var(--scene-mat)"/>';

