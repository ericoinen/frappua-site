/* ============================================================
   Frappua! — interaction layer
   Progressive enhancement: if GSAP/Lenis are missing, content
   still shows (see .no-anim fallback at the bottom).
   ============================================================ */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasLenis = typeof window.Lenis !== "undefined";
  const isTouch = window.matchMedia("(hover: none)").matches;

  /* ---------- preloader ---------- */
  function runPreloader(done) {
    const el = document.getElementById("preloader");
    const count = document.getElementById("preCount");
    const bar = document.getElementById("preBar");
    if (!el) return done();
    let p = 0;
    const tick = () => {
      p += Math.max(1, Math.round((100 - p) * 0.08));
      if (p >= 100) p = 100;
      if (count) count.textContent = p;
      if (bar) bar.style.width = p + "%";
      if (p < 100) {
        setTimeout(tick, 60 + Math.random() * 70);
      } else {
        setTimeout(() => {
          el.classList.add("is-done");
          document.body.classList.remove("is-loading");
          done();
          setTimeout(() => el.remove(), 1100);
        }, 250);
      }
    };
    tick();
  }

  /* ---------- smooth scroll (Lenis) ---------- */
  let lenis = null;
  function initLenis() {
    if (!hasLenis || reduced || isTouch) return;
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
    }
    // anchor links
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").replace(/^\/?#/, "#");
        const target = id.length > 1 && document.querySelector(id);
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -20 }); }
      });
    });
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("burger");
    const links = document.getElementById("navLinks");
    let last = 0;
    const onScroll = (y) => {
      nav.classList.toggle("is-scrolled", y > 40);
      if (y > last && y > 400 && !document.body.classList.contains("menu-open")) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
      last = y;
    };
    if (lenis) lenis.on("scroll", (e) => onScroll(e.scroll));
    else window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });

    if (burger) {
      burger.addEventListener("click", () => {
        const open = document.body.classList.toggle("menu-open");
        links.classList.toggle("is-open", open);
        if (lenis) open ? lenis.stop() : lenis.start();
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          document.body.classList.remove("menu-open");
          links.classList.remove("is-open");
          if (lenis) lenis.start();
        })
      );
    }
  }

  /* ---------- custom cursor ---------- */
  function initCursor() {
    if (isTouch) return;
    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!cursor) return;
    const label = document.createElement("span");
    label.className = "cursor__label";
    label.textContent = "View";
    cursor.appendChild(label);

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      label.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll("a,button,[data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
    document.querySelectorAll('[data-cursor="view"]').forEach((el) => {
      el.addEventListener("mouseenter", () => { cursor.classList.add("is-view"); cursor.classList.remove("is-hover"); });
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
    });
  }

  /* ---------- magnetic buttons ---------- */
  function initMagnetic() {
    if (isTouch) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = 0.35;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px,${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- hero intro (kinetic title) ---------- */
  function heroIntro() {
    if (!hasGSAP) return;
    const tl = window.gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".hero .display .line-i", { y: "0%", duration: 1.1, stagger: 0.09 }, 0)
      .to(".hero .reveal-now", { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.3);
    if (document.querySelector(".hero__media"))
      tl.from(".hero__media", { opacity: 0, scale: 0.94, duration: 1.2 }, 0.4);
  }

  /* ---------- scroll reveals ---------- */
  function initReveals() {
    if (!hasGSAP || !window.ScrollTrigger) return;
    const ST = window.ScrollTrigger;
    document.querySelectorAll(".reveal").forEach((el) => {
      ST.create({
        trigger: el, start: "top 88%",
        onEnter: () => el.classList.add("is-in"),
      });
    });
    // word-by-word lit text
    document.querySelectorAll("[data-split]").forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
      const spans = el.querySelectorAll(".word");
      ST.create({
        trigger: el, start: "top 80%", end: "bottom 55%", scrub: true,
        onUpdate: (self) => {
          const lit = Math.floor(self.progress * spans.length + 0.0001);
          spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
        },
      });
    });
  }

  /* ---------- parallax ---------- */
  function initParallax() {
    if (!hasGSAP || !window.ScrollTrigger || reduced) return;
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 0.1;
      window.gsap.to(el, {
        yPercent: -amt * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }

  /* ---------- marquee (scroll-velocity reactive) ---------- */
  let marqueeTween = null;
  function initMarquee() {
    const track = document.querySelector(".marquee__track");
    if (!track || !hasGSAP) return;
    const w = track.scrollWidth / 2;
    marqueeTween = window.gsap.to(track, { x: -w, duration: 22, ease: "none", repeat: -1 });
  }
  function marqueeVelocity(v) {
    if (!marqueeTween) return;
    const boost = Math.min(6, 1 + Math.abs(v) * 0.35);
    window.gsap.to(marqueeTween, { timeScale: boost, duration: 0.4, overwrite: true });
    window.gsap.to(marqueeTween, { timeScale: 1, duration: 1.2, delay: 0.4, overwrite: false });
  }

  /* ---------- text scramble ---------- */
  function scramble(el) {
    if (el.dataset.scrambled) return;
    el.dataset.scrambled = "1";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·×/—";
    const final = el.textContent;
    const total = final.length;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      el.textContent = final
        .split("")
        .map((c, i) => (c === " " ? " " : i < frame / 2 ? final[i] : chars[(Math.random() * chars.length) | 0]))
        .join("");
      if (frame / 2 >= total) { clearInterval(id); el.textContent = final; }
    }, 30);
  }
  function initScramble() {
    if (!hasGSAP || !window.ScrollTrigger) return;
    document.querySelectorAll(".eyebrow, .hero__kicker").forEach((el) => {
      window.ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => scramble(el) });
    });
  }

  /* ---------- shared GL helpers ---------- */
  let scrollV = 0; // smoothed, normalised scroll speed (0..1)
  const NOISE_GLSL = `
vec2 hash(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453123);}
float noise(vec2 p){const float K1=0.366025404,K2=0.211324865;vec2 i=floor(p+(p.x+p.y)*K1);vec2 a=p-i+(i.x+i.y)*K2;float m=step(a.y,a.x);vec2 o=vec2(m,1.-m);vec2 b=a-o+K2;vec2 c=a-1.+2.*K2;vec3 h=max(0.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.);vec3 n=h*h*h*h*vec3(dot(a,hash(i)),dot(b,hash(i+o)),dot(c,hash(i+1.)));return dot(n,vec3(70.));}
float fbm(vec2 p){float v=0.,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}`;
  function compile(gl, vert, frag) {
    const mk = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    return prog;
  }
  function accentRGB() {
    const v = getComputedStyle(document.body).getPropertyValue("--crgb").trim();
    return v ? v.split(",").map((n) => parseFloat(n) / 255) : [0.55, 0.48, 1.0];
  }

  /* ---------- WebGL hero dispatcher ---------- */
  function initHeroFX() {
    document.querySelectorAll(".hero").forEach((hero) => {
      const stage = hero.querySelector(".hero__stage");
      if (stage) initVideoStage(hero, stage);
      else if (!reduced) initBgShader(hero);
    });
  }

  /* ---------- calm gradient backdrop (heroes without footage) ---------- */
  function initBgShader(hero) {
    const accent = accentRGB();
    const accent2 = [accent[0] * 0.45, accent[1] * 0.5, accent[2] * 0.95];
    const FRAG = `precision highp float;
uniform float u_time;uniform vec2 u_res;uniform vec2 u_mouse;uniform vec3 u_a;uniform vec3 u_b;
${NOISE_GLSL}
void main(){vec2 uv=gl_FragCoord.xy/u_res.xy;vec2 p=uv;p.x*=u_res.x/u_res.y;
float t=u_time*0.028;
vec2 q=vec2(fbm(p*1.2+t),fbm(p*1.2+vec2(5.2,1.3)-t));
vec2 r=vec2(fbm(p*1.2+1.6*q+vec2(1.7,9.2)+t),fbm(p*1.2+1.6*q+vec2(8.3,2.8)-t));
float f=fbm(p*1.2+1.8*r);
vec3 base=vec3(0.02,0.02,0.032);
vec3 col=mix(base,u_a,smoothstep(0.1,1.05,f)*0.85);
col=mix(col,u_b,clamp(length(r)*0.35,0.,0.45));
vec2 m=u_mouse;m.x*=u_res.x/u_res.y;
col+=u_a*0.18*smoothstep(0.6,0.0,distance(p,m));
col*=smoothstep(1.35,0.1,length(uv-0.5));
col*=0.42;col=pow(col,vec3(0.95));
gl_FragColor=vec4(col,1.0);}`;
    const cv = document.createElement("canvas");
    cv.className = "hero__gl";
    const gl = cv.getContext("webgl") || cv.getContext("experimental-webgl");
    if (!gl) return;
    hero.prepend(cv);
    document.body.classList.add("webgl-on");
    const prog = compile(gl, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}", FRAG);
    if (!prog) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    const uT = U("u_time"), uR = U("u_res"), uM = U("u_mouse");
    gl.uniform3fv(U("u_a"), accent); gl.uniform3fv(U("u_b"), accent2);
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    const resize = () => { const r = hero.getBoundingClientRect(); cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr); gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uR, cv.width, cv.height); };
    resize(); window.addEventListener("resize", resize);
    hero.addEventListener("mousemove", (e) => { const r = hero.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; tmy = 1 - (e.clientY - r.top) / r.height; });
    let t0 = null, visible = true;
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(hero);
    const render = (ts) => {
      if (t0 === null) t0 = ts;
      if (visible) { mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05; gl.uniform1f(uT, (ts - t0) / 1000); gl.uniform2f(uM, mx, my); gl.drawArrays(gl.TRIANGLES, 0, 3); }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    requestAnimationFrame(() => cv.classList.add("is-on"));
  }

  /* ---------- footage rendered THROUGH a shader (the centrepiece) ---------- */
  function initVideoStage(hero, stage) {
    const video = stage.querySelector(".hero__src");
    const cv = stage.querySelector(".hero__canvas");
    if (!video || !cv) return;
    const fallback = () => { stage.classList.add("is-raw"); cv.style.display = "none"; };
    if (reduced) return fallback();
    const gl = cv.getContext("webgl", { alpha: true, premultipliedAlpha: false }) || cv.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return fallback();

    const accent = accentRGB();
    const VERT = "attribute vec2 a;varying vec2 vUv;void main(){vUv=a*0.5+0.5;gl_Position=vec4(a,0.,1.);}";
    const FRAG = `precision highp float;
varying vec2 vUv;
uniform sampler2D u_tex;uniform float u_time,u_hover,u_vel,u_vaspect;uniform vec2 u_res,u_mouse;uniform vec3 u_accent;
${NOISE_GLSL}
void main(){
  float ca=u_res.x/u_res.y;
  vec2 scale = ca>u_vaspect ? vec2(1.0,u_vaspect/ca) : vec2(ca/u_vaspect,1.0);
  vec2 uv=(vUv-0.5)*scale+0.5;
  // SPOTLIGHT LENS: a clean circle of true footage follows the cursor.
  vec2 sp=vUv; sp.x*=ca;
  vec2 mp=u_mouse; mp.x*=ca;
  float ld=distance(sp,mp);
  float reveal=u_hover*smoothstep(0.40,0.18,ld); // 1 inside lens -> 0 outside
  float fx=1.0-reveal;                            // shader strength (0 inside lens)
  // ambient flow distortion (everywhere except inside the lens)
  float n=noise(uv*3.2+u_time*0.28);
  float t=u_time*2.2;
  uv += (n-0.5)*(0.008+u_vel*0.03)*fx;
  uv += vec2(noise(uv*5.0+t)-0.5, noise(uv*5.0-t)-0.5)*0.005*fx;
  float ab=(0.003+u_vel*0.022)*fx;
  vec3 col;
  col.r=texture2D(u_tex,uv+vec2(ab,0.0)).r;
  col.g=texture2D(u_tex,uv).g;
  col.b=texture2D(u_tex,uv-vec2(ab,0.0)).b;
  float lum=dot(col,vec3(0.299,0.587,0.114));
  col=mix(col,u_accent*pow(lum,0.9)*1.25,0.16*fx);
  col+=u_accent*0.045*fx;
  // faint accent rim around the lens edge
  col += u_accent*0.5*u_hover*smoothstep(0.02,0.0,abs(ld-0.30));
  vec2 d=abs(vUv-0.5);
  float ex=smoothstep(0.5,0.40,d.x), ey=smoothstep(0.5,0.40,d.y);
  gl_FragColor=vec4(col, ex*ey);
}`;
    const prog = compile(gl, VERT, FRAG);
    if (!prog) return fallback();
    gl.useProgram(prog);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const U = (n) => gl.getUniformLocation(prog, n);
    const uTime = U("u_time"), uRes = U("u_res"), uMouse = U("u_mouse"), uHover = U("u_hover"), uVel = U("u_vel"), uVA = U("u_vaspect");
    gl.uniform3fv(U("u_accent"), accent);
    gl.uniform1i(U("u_tex"), 0);

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { const r = stage.getBoundingClientRect(); cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr); gl.viewport(0, 0, cv.width, cv.height); };
    resize(); window.addEventListener("resize", resize);

    let hover = 0, thover = 0, mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5, vel = 0;
    stage.addEventListener("mouseenter", () => (thover = 1));
    stage.addEventListener("mouseleave", () => (thover = 0));
    stage.addEventListener("mousemove", (e) => { const r = stage.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; tmy = 1 - (e.clientY - r.top) / r.height; });

    let ready = false;
    const markReady = () => { if (video.videoWidth > 0) ready = true; };
    video.addEventListener("loadeddata", markReady);
    if (video.readyState >= 2) markReady();
    const pp = video.play && video.play();
    if (pp && pp.catch) pp.catch(() => {});

    let visible = true, t0 = null, on = false;
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(hero);
    const render = (ts) => {
      if (t0 === null) t0 = ts;
      hover += (thover - hover) * 0.12; mx += (tmx - mx) * 0.2; my += (tmy - my) * 0.2;
      vel += (scrollV - vel) * 0.1;
      if (visible && ready && video.readyState >= 2) {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video); } catch (e) {}
        gl.uniform1f(uTime, (ts - t0) / 1000);
        gl.uniform2f(uRes, cv.width, cv.height);
        gl.uniform2f(uMouse, mx, my);
        gl.uniform1f(uHover, hover);
        gl.uniform1f(uVel, Math.min(1, Math.abs(vel)));
        gl.uniform1f(uVA, video.videoWidth / video.videoHeight || 1.6);
        gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        if (!on) { on = true; cv.classList.add("is-on"); }
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    // safety: if the video never decodes, show it raw
    setTimeout(() => { if (!on) fallback(); }, 3500);
  }

  /* ---------- scroll progress ---------- */
  function initProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const upd = (y) => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    };
    if (lenis) lenis.on("scroll", (e) => upd(e.scroll));
    else window.addEventListener("scroll", () => upd(window.scrollY), { passive: true });
  }

  /* ---------- boot ---------- */
  function boot() {
    initLenis();
    initNav();
    initCursor();
    initMagnetic();
    initHeroFX();
    initReveals();
    initScramble();
    initParallax();
    initMarquee();
    initProgress();
    // feed scroll velocity into the marquee + video shader
    const onVel = (v) => { scrollV += (Math.min(1, Math.abs(v) / 30) - scrollV) * 0.4; marqueeVelocity(v); };
    if (lenis) lenis.on("scroll", (e) => onVel(e.velocity || 0));
    else {
      let ly = 0;
      window.addEventListener("scroll", () => { onVel((window.scrollY - ly)); ly = window.scrollY; }, { passive: true });
    }
    // decay velocity when idle
    setInterval(() => { scrollV *= 0.9; }, 100);
    if (hasGSAP && window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  /* ---------- page transitions ---------- */
  const ss = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: (k) => { try { sessionStorage.removeItem(k); } catch (e) {} },
  };
  function start() { document.body.classList.remove("is-loading"); boot(); heroIntro(); }

  function initTransitionClicks() {
    if (reduced) return;
    const cover = document.getElementById("pageCover");
    if (!cover) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || a.target === "_blank" || a.hasAttribute("data-notrans")) return;
      if (href.startsWith("#") || href.startsWith("/#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      // only same-origin internal navigations
      let url; try { url = new URL(href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      ss.set("frx-nav", "1");
      cover.classList.add("is-cover");
      if (lenis) lenis.stop();
      setTimeout(() => { location.href = url.href; }, 560);
    });
  }

  function loadSequence() {
    const cover = document.getElementById("pageCover");
    const pre = document.getElementById("preloader");
    const navigated = ss.get("frx-nav");

    if (navigated) {
      // arrived via in-site navigation: skip counter, reveal the accent cover
      ss.del("frx-nav");
      if (pre) pre.remove();
      start();
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("frx-incoming");
        if (cover) {
          cover.classList.add("is-cover"); // ensure covered state, then reveal
          requestAnimationFrame(() => {
            cover.classList.remove("is-cover");
            cover.classList.add("is-reveal");
            setTimeout(() => { cover.classList.remove("is-reveal"); }, 850);
          });
        }
      });
    } else if (!ss.get("frx-seen")) {
      // genuine first visit: full counting preloader
      ss.set("frx-seen", "1");
      runPreloader(start);
    } else {
      // reload / direct hit: quick reveal, no counter
      if (pre) { pre.classList.add("is-done"); setTimeout(() => pre.remove(), 1100); }
      document.body.classList.remove("is-loading");
      start();
    }
  }

  if (!hasGSAP) document.documentElement.classList.add("no-anim");
  document.body.classList.add("is-loading");
  // pageshow handles back/forward cache so the cover never stays stuck
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      const cover = document.getElementById("pageCover");
      if (cover) { cover.classList.remove("is-cover"); cover.style.transform = ""; }
      if (lenis) lenis.start();
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    initTransitionClicks();
    loadSequence();
    // safety net
    setTimeout(() => {
      if (document.body.classList.contains("is-loading")) {
        document.body.classList.remove("is-loading");
        const pl = document.getElementById("preloader");
        if (pl) pl.remove();
        start();
      }
    }, 4000);
  });
})();
