import ae, { useRef as W, useEffect as F, useMemo as ie, useState as J, useCallback as K } from "react";
import { onLCP as ce, onINP as le, onCLS as ue, onTTFB as fe } from "web-vitals";
var D = { exports: {} }, k = {};
var ee;
function de() {
  if (ee) return k;
  ee = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(a, i, c) {
    var u = null;
    if (c !== void 0 && (u = "" + c), i.key !== void 0 && (u = "" + i.key), "key" in i) {
      c = {};
      for (var v in i)
        v !== "key" && (c[v] = i[v]);
    } else c = i;
    return i = c.ref, {
      $$typeof: t,
      type: a,
      key: u,
      ref: i !== void 0 ? i : null,
      props: c
    };
  }
  return k.Fragment = r, k.jsx = o, k.jsxs = o, k;
}
var O = {};
var re;
function pe() {
  return re || (re = 1, process.env.NODE_ENV !== "production" && (function() {
    function t(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === C ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case S:
          return "Fragment";
        case A:
          return "Profiler";
        case j:
          return "StrictMode";
        case I:
          return "Suspense";
        case s:
          return "SuspenseList";
        case E:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case x:
            return "Portal";
          case B:
            return e.displayName || "Context";
          case L:
            return (e._context.displayName || "Context") + ".Consumer";
          case Y:
            var n = e.render;
            return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case f:
            return n = e.displayName || null, n !== null ? n : t(e.type) || "Memo";
          case d:
            n = e._payload, e = e._init;
            try {
              return t(e(n));
            } catch {
            }
        }
      return null;
    }
    function r(e) {
      return "" + e;
    }
    function o(e) {
      try {
        r(e);
        var n = !1;
      } catch {
        n = !0;
      }
      if (n) {
        n = console;
        var p = n.error, m = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return p.call(
          n,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          m
        ), r(e);
      }
    }
    function a(e) {
      if (e === S) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === d)
        return "<...>";
      try {
        var n = t(e);
        return n ? "<" + n + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var e = P.A;
      return e === null ? null : e.getOwner();
    }
    function c() {
      return Error("react-stack-top-frame");
    }
    function u(e) {
      if (z.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function v(e, n) {
      function p() {
        H || (H = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          n
        ));
      }
      p.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: p,
        configurable: !0
      });
    }
    function y() {
      var e = t(this.type);
      return q[e] || (q[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function _(e, n, p, m, M, U) {
      var h = p.ref;
      return e = {
        $$typeof: w,
        type: e,
        key: n,
        props: p,
        _owner: m
      }, (h !== void 0 ? h : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: y
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: U
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function R(e, n, p, m, M, U) {
      var h = n.children;
      if (h !== void 0)
        if (m)
          if (oe(h)) {
            for (m = 0; m < h.length; m++)
              g(h[m]);
            Object.freeze && Object.freeze(h);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else g(h);
      if (z.call(n, "key")) {
        h = t(e);
        var N = Object.keys(n).filter(function(se) {
          return se !== "key";
        });
        m = 0 < N.length ? "{key: someKey, " + N.join(": ..., ") + ": ...}" : "{key: someKey}", Q[h + m] || (N = 0 < N.length ? "{" + N.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          m,
          h,
          N,
          h
        ), Q[h + m] = !0);
      }
      if (h = null, p !== void 0 && (o(p), h = "" + p), u(n) && (o(n.key), h = "" + n.key), "key" in n) {
        p = {};
        for (var X in n)
          X !== "key" && (p[X] = n[X]);
      } else p = n;
      return h && v(
        p,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), _(
        e,
        h,
        p,
        i(),
        M,
        U
      );
    }
    function g(e) {
      b(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === d && (e._payload.status === "fulfilled" ? b(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function b(e) {
      return typeof e == "object" && e !== null && e.$$typeof === w;
    }
    var T = ae, w = /* @__PURE__ */ Symbol.for("react.transitional.element"), x = /* @__PURE__ */ Symbol.for("react.portal"), S = /* @__PURE__ */ Symbol.for("react.fragment"), j = /* @__PURE__ */ Symbol.for("react.strict_mode"), A = /* @__PURE__ */ Symbol.for("react.profiler"), L = /* @__PURE__ */ Symbol.for("react.consumer"), B = /* @__PURE__ */ Symbol.for("react.context"), Y = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), s = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), d = /* @__PURE__ */ Symbol.for("react.lazy"), E = /* @__PURE__ */ Symbol.for("react.activity"), C = /* @__PURE__ */ Symbol.for("react.client.reference"), P = T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = Object.prototype.hasOwnProperty, oe = Array.isArray, $ = console.createTask ? console.createTask : function() {
      return null;
    };
    T = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var H, q = {}, G = T.react_stack_bottom_frame.bind(
      T,
      c
    )(), Z = $(a(c)), Q = {};
    O.Fragment = S, O.jsx = function(e, n, p) {
      var m = 1e4 > P.recentlyCreatedOwnerStacks++;
      return R(
        e,
        n,
        p,
        !1,
        m ? Error("react-stack-top-frame") : G,
        m ? $(a(e)) : Z
      );
    }, O.jsxs = function(e, n, p) {
      var m = 1e4 > P.recentlyCreatedOwnerStacks++;
      return R(
        e,
        n,
        p,
        !0,
        m ? Error("react-stack-top-frame") : G,
        m ? $(a(e)) : Z
      );
    };
  })()), O;
}
var te;
function me() {
  return te || (te = 1, process.env.NODE_ENV === "production" ? D.exports = de() : D.exports = pe()), D.exports;
}
var l = me();
const he = {
  id: "LCP",
  name: "Largest Contentful Paint",
  thresholds: { good: 2500, poor: 4e3 },
  supportedBrowsers: { chrome: !0 },
  observe: (t) => (ce((r) => {
    t({
      value: r.value,
      delta: r.delta
    });
  }, { reportAllChanges: !0 }), () => {
  })
}, ge = {
  id: "INP",
  name: "Interaction to Next Paint",
  thresholds: { good: 200, poor: 500 },
  supportedBrowsers: { chrome: !0 },
  observe: (t) => (le((r) => {
    t({
      value: r.value,
      delta: r.delta
    });
  }, { reportAllChanges: !0 }), () => {
  })
}, ve = {
  id: "CLS",
  name: "Cumulative Layout Shift",
  thresholds: { good: 0.1, poor: 0.25 },
  supportedBrowsers: { chrome: !0 },
  observe: (t) => (ue((r) => {
    t({
      value: r.value,
      delta: r.delta
    });
  }, { reportAllChanges: !0 }), () => {
  })
}, be = {
  id: "FCP",
  name: "First Contentful Paint",
  thresholds: { good: 1800, poor: 3e3 },
  supportedBrowsers: { chrome: !0, firefox: !0, safari: !0 },
  observe: (t) => {
    let r = !1;
    const o = new PerformanceObserver((a) => {
      const i = a.getEntries();
      for (const c of i)
        c.name === "first-contentful-paint" && !r && (r = !0, t({ value: c.startTime }), o.disconnect());
    });
    return o.observe({ type: "paint", buffered: !0 }), () => o.disconnect();
  }
}, xe = {
  id: "TTFB",
  name: "Time to First Byte",
  thresholds: { good: 800, poor: 1800 },
  supportedBrowsers: { chrome: !0, firefox: !0, safari: !0 },
  observe: (t) => (fe((r) => {
    t({
      value: r.value,
      delta: r.delta
    });
  }, { reportAllChanges: !0 }), () => {
  })
}, Ee = {
  id: "TBT",
  name: "Total Blocking Time",
  thresholds: { good: 200, poor: 600 },
  supportedBrowsers: { chrome: !0 },
  observe: (t) => {
    let r = 0;
    const o = new PerformanceObserver((a) => {
      const i = a.getEntries();
      for (const c of i)
        r += c.duration - 50, t({ value: r, delta: c.duration - 50 });
    });
    try {
      o.observe({ type: "longtask", buffered: !0 });
    } catch {
    }
    return () => o.disconnect();
  }
}, Te = {
  id: "Memory",
  name: "JS Heap Usage (MB)",
  thresholds: { good: 50, poor: 150 },
  // Arbitrary thresholds for memory
  supportedBrowsers: { chrome: !0 },
  observe: (t) => {
    let r;
    const o = () => {
      if (performance && performance.memory) {
        const a = performance.memory, i = Math.round(a.usedJSHeapSize / (1024 * 1024));
        t({ value: i, delta: 0 });
      }
    };
    return performance && performance.memory && (r = window.setInterval(o, 1e3), o()), () => {
      r && clearInterval(r);
    };
  }
}, ye = {
  LCP: he,
  INP: ge,
  CLS: ve,
  FCP: be,
  TTFB: xe,
  TBT: Ee,
  Memory: Te
};
function ne(t) {
  return ye[t];
}
function we(t, r) {
  return t <= r.good ? "good" : t > r.poor ? "poor" : "needs-improvement";
}
function Re() {
  const t = performance.getEntriesByType("navigation")[0];
  return t ? t.type : "navigate";
}
let V = "";
function _e() {
  return V || (V = crypto.randomUUID()), V;
}
class Se {
  config;
  cleanups = [];
  constructor(r) {
    this.config = Object.assign({
      sampleRate: 1,
      metrics: ["LCP", "INP", "CLS", "FCP", "TTFB"]
    }, r);
  }
  start() {
    Math.random() > (this.config.sampleRate || 1) || this.config.metrics.forEach((r) => {
      const o = ne(r);
      if (!o) return;
      const a = o.observe((i) => {
        const c = i.value ?? 0, u = i.delta ?? 0, v = we(c, o.thresholds), y = {
          metric: r,
          value: c,
          delta: u,
          rating: v,
          navigationType: Re(),
          sessionId: _e(),
          url: window.location.href,
          timestamp: performance.timeOrigin + performance.now()
        };
        this.config.onVital && this.config.onVital(y), this.report(y);
      });
      this.cleanups.push(a);
    });
  }
  stop() {
    this.cleanups.forEach((r) => r()), this.cleanups = [];
  }
  report(r) {
    if (this.config.reportTo) {
      if (typeof this.config.reportTo == "function")
        this.config.reportTo(r);
      else if (typeof this.config.reportTo == "string") {
        const o = JSON.stringify(r);
        navigator.sendBeacon ? navigator.sendBeacon(this.config.reportTo, o) : fetch(this.config.reportTo, {
          body: o,
          method: "POST",
          keepalive: !0,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
}
const Pe = ({ data: t, color: r, width: o = 60, height: a = 20 }) => {
  const i = W(null);
  return F(() => {
    const c = i.current;
    if (!c) return;
    const u = c.getContext("2d");
    if (!u || (u.clearRect(0, 0, o, a), t.length === 0)) return;
    const v = Math.max(...t) || 1, y = 0, _ = v - y, R = o / (t.length > 1 ? t.length - 1 : 1);
    u.beginPath(), u.strokeStyle = r, u.lineWidth = 1.5, u.lineJoin = "round", t.forEach((g, b) => {
      const T = b * R, w = Math.max(0, g - y), x = a - w / (_ || 1) * a * 0.8;
      b === 0 ? u.moveTo(T, x) : u.lineTo(T, x);
    }), u.stroke();
  }, [t, r, o, a]), /* @__PURE__ */ l.jsx("canvas", { ref: i, width: o, height: a, className: "ph-sparkline" });
}, Ce = ({
  metricId: t,
  value: r,
  delta: o,
  rating: a,
  history: i,
  isExpanded: c,
  budgets: u
}) => {
  const v = ne(t), y = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor), _ = /Firefox/.test(navigator.userAgent), R = /Safari/.test(navigator.userAgent) && !y;
  let g = !0;
  !v?.supportedBrowsers.chrome && y && (g = !1), !v?.supportedBrowsers.firefox && _ && (g = !1), !v?.supportedBrowsers.safari && R && (g = !1);
  const b = r === null || !g ? "--" : t === "CLS" ? r.toFixed(3) : Math.round(r), T = o === 0 ? "" : o > 0 ? `+${Math.round(o)}` : `${Math.round(o)}`, w = v?.name || t, x = u?.[t] !== void 0 && r !== null && r > u[t], S = ie(() => {
    switch (a) {
      case "good":
        return "#0cce6b";
      case "needs-improvement":
        return "#ffa400";
      case "poor":
        return "#ff4e42";
      default:
        return "#888888";
    }
  }, [a]);
  return c ? /* @__PURE__ */ l.jsxs("div", { className: `ph-tile ${x ? "ph-budget-exceeded" : ""}`, title: g ? w : "Metric not supported in this browser", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "ph-tile-header", children: [
      /* @__PURE__ */ l.jsx("span", { className: "ph-metric-id", children: t }),
      g && a && /* @__PURE__ */ l.jsx("span", { className: `ph-badge ph-badge-${a}`, style: { backgroundColor: S }, children: a.replace("-", " ") })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "ph-tile-body", children: [
      /* @__PURE__ */ l.jsxs("span", { className: "ph-metric-value", children: [
        b,
        " ",
        r !== null && g && t !== "CLS" ? "ms" : ""
      ] }),
      g && o !== 0 && /* @__PURE__ */ l.jsx("span", { className: "ph-metric-delta", children: T })
    ] }),
    g && i.length > 0 && /* @__PURE__ */ l.jsx("div", { className: "ph-tile-chart", children: /* @__PURE__ */ l.jsx(Pe, { data: i, color: S }) })
  ] }) : x || a === "poor" ? /* @__PURE__ */ l.jsx("div", { className: "ph-tile-mini ph-rating-poor", title: `${t} is poor or exceeds budget`, children: /* @__PURE__ */ l.jsx("span", { children: t }) }) : null;
}, ke = ({
  metrics: t = ["LCP", "INP", "CLS", "FCP", "TTFB"],
  position: r = "bottom-right",
  theme: o = "dark",
  reportTo: a,
  sampleRate: i = 1,
  onVital: c,
  budgets: u,
  defaultExpanded: v = !0
}) => {
  const [y, _] = J(() => {
    const s = {};
    return t.forEach((f) => {
      s[f] = { value: null, delta: 0, rating: null, history: [] };
    }), s;
  }), [R, g] = J(() => {
    try {
      const s = sessionStorage.getItem("react-perf-hud-expanded");
      if (s !== null) return s === "true";
    } catch {
    }
    return v;
  }), [b, T] = J({ x: 0, y: 0 }), w = W(null), x = W({ isDragging: !1, startX: 0, startY: 0, initialX: 0, initialY: 0 });
  if (typeof process < "u" && process.env && process.env.NODE_ENV === "production")
    return null;
  F(() => {
    sessionStorage.setItem("react-perf-hud-expanded", String(R));
  }, [R]), F(() => {
    try {
      const E = sessionStorage.getItem("react-perf-hud-pos");
      if (E) {
        T(JSON.parse(E));
        return;
      }
    } catch {
    }
    const s = 20;
    let f = 0, d = 0;
    r.includes("right") ? f = window.innerWidth - 250 - s : f = s, r.includes("bottom") ? d = window.innerHeight - 400 - s : d = s, setTimeout(() => {
      if (w.current) {
        const E = w.current.getBoundingClientRect();
        r.includes("right") && (f = window.innerWidth - E.width - s), r.includes("bottom") && (d = window.innerHeight - E.height - s), T({ x: Math.max(0, f), y: Math.max(0, d) });
      } else
        T({ x: Math.max(0, f), y: Math.max(0, d) });
    }, 100);
  }, [r]), F(() => {
    const s = (d) => {
      _((E) => {
        const P = [...(E[d.metric] || { history: [] }).history, d.value].slice(-20);
        return {
          ...E,
          [d.metric]: {
            value: d.value,
            delta: d.delta,
            rating: d.rating,
            history: P
          }
        };
      }), c && c(d);
    }, f = new Se({
      metrics: t,
      reportTo: a,
      sampleRate: i,
      onVital: s
    });
    return f.start(), () => {
      f.stop();
    };
  }, [t, a, i, c]);
  const S = (s) => {
    x.current.isDragging || s.target.tagName.toLowerCase() !== "button" && (x.current = {
      isDragging: !0,
      startX: s.clientX,
      startY: s.clientY,
      initialX: b.x,
      initialY: b.y
    }, s.preventDefault(), document.body.style.userSelect = "none", window.addEventListener("pointermove", j), window.addEventListener("pointerup", A));
  }, j = K((s) => {
    if (!x.current.isDragging || !w.current) return;
    const f = s.clientX - x.current.startX, d = s.clientY - x.current.startY;
    let E = x.current.initialX + f, C = x.current.initialY + d;
    const P = w.current.getBoundingClientRect();
    E = Math.max(0, Math.min(window.innerWidth - P.width, E)), C = Math.max(0, Math.min(window.innerHeight - P.height, C)), T({ x: E, y: C });
  }, []), A = K(() => {
    x.current.isDragging = !1, document.body.style.userSelect = "";
    try {
      sessionStorage.setItem("react-perf-hud-pos", JSON.stringify(b));
    } catch {
    }
    window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", A);
  }, [b, j]), L = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor), B = /Firefox/.test(navigator.userAgent), Y = /Safari/.test(navigator.userAgent) && !L, I = B || Y;
  return R ? /* @__PURE__ */ l.jsxs(
    "div",
    {
      ref: w,
      className: `ph-container ph-theme-${o}`,
      style: { left: b.x, top: b.y },
      children: [
        /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "ph-drag-handle",
            onPointerDown: S,
            children: [
              /* @__PURE__ */ l.jsx("span", { children: "⚡ UX Vitals" }),
              /* @__PURE__ */ l.jsxs("div", { className: "ph-controls", children: [
                /* @__PURE__ */ l.jsx("button", { className: "ph-btn", onClick: () => {
                  _((s) => {
                    const f = {};
                    return Object.keys(s).forEach((d) => {
                      f[d] = { ...s[d], history: [] };
                    }), f;
                  });
                }, title: "Clear History", children: "↺" }),
                /* @__PURE__ */ l.jsx("button", { className: "ph-btn", onClick: () => g(!1), title: "Minimize", children: "−" })
              ] })
            ]
          }
        ),
        I && /* @__PURE__ */ l.jsx("div", { className: "ph-browser-banner", children: "Some metrics are Chromium-only. Showing available data." }),
        /* @__PURE__ */ l.jsx("div", { className: "ph-content", children: t.map((s) => {
          const f = y[s];
          return /* @__PURE__ */ l.jsx(
            Ce,
            {
              metricId: s,
              value: f.value,
              delta: f.delta,
              rating: f.rating,
              history: f.history,
              isExpanded: R,
              budgets: u
            },
            s
          );
        }) })
      ]
    }
  ) : /* @__PURE__ */ l.jsx(
    "button",
    {
      className: `ph-container ph-theme-${o} ph-minimized`,
      style: { left: b.x, top: b.y },
      onClick: () => g(!0),
      title: "Open Performance HUD",
      children: /* @__PURE__ */ l.jsx("span", { className: "ph-minimized-icon", children: "⚡" })
    }
  );
};
export {
  ke as PerfHud
};
