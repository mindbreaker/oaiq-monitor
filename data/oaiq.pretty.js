"use strict";
(() => {
  var Fs = Object.defineProperty;
  var mo = Object.getOwnPropertySymbols;
  var Ls = Object.prototype.hasOwnProperty,
    Hs = Object.prototype.propertyIsEnumerable;
  var po = Math.pow,
    go = (e, n, t) =>
      n in e ? Fs(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (e[n] = t),
    me = (e, n) => {
      for (var t in n || (n = {})) Ls.call(n, t) && go(e, t, n[t]);
      if (mo) for (var t of mo(n)) Hs.call(n, t) && go(e, t, n[t]);
      return e;
    };
  var je = (e, n, t) =>
    new Promise((i, o) => {
      var r = (a) => {
          try {
            d(t.next(a));
          } catch (c) {
            o(c);
          }
        },
        s = (a) => {
          try {
            d(t.throw(a));
          } catch (c) {
            o(c);
          }
        },
        d = (a) => (a.done ? i(a.value) : Promise.resolve(a.value).then(r, s));
      d((t = t.apply(e, n)).next());
    });
  var ot = "https://bzr.openai.com/v1/sdk/events",
    ho = "https://bzrcdn.openai.com";
  var zt = "oppref",
    ue = "__oppref",
    Pn = "oaiq_consent",
    Kt = "__oaiq_consent",
    dn = "__obref";
  var _o = "oaiq-web",
    Ie = "0.1.105",
    yo = "oaiq_test_session_id",
    vo = "oaiq_test_pixel_id",
    jt = "oaiq_test_session";
  var cn = Object.freeze({
    PixelId: "pid",
    SdkType: "st",
    SdkVersion: "sv",
    Timestamp: "t",
    EventCount: "ec",
  });
  var Us = ["country", "city", "region", "postal_code", "zip_code"],
    Co = /^[0-9a-f]{64}$/i,
    Bs =
      /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    qs = 254,
    Yt = 1024,
    Vs = 3,
    zs = 2,
    Ks = /^[1-9][0-9]{7,14}$/,
    js = /^\+?[0-9]+$/,
    Gs = /[\s().-]+/g,
    $s = /[!"#$%&'()*+,\-./:;<=>?@ \[\\\]^_`{|}~\s]+/g,
    Ws = /^(?=[a-z0-9 -]*\d)[a-z0-9][a-z0-9 -]{0,31}$/i,
    Eo = {
      australia: "au",
      brazil: "br",
      canada: "ca",
      france: "fr",
      germany: "de",
      "great britain": "gb",
      india: "in",
      ireland: "ie",
      italy: "it",
      japan: "jp",
      mexico: "mx",
      "new zealand": "nz",
      singapore: "sg",
      "south korea": "kr",
      spain: "es",
      switzerland: "ch",
      "u.k.": "gb",
      uk: "gb",
      "u.s.": "us",
      "u.s.a.": "us",
      "united arab emirates": "ae",
      "united kingdom": "gb",
      "united states": "us",
      "united states of america": "us",
      usa: "us",
    };
  function Ys(e) {
    let n = e.trim().toLowerCase();
    return n.length <= qs && Bs.test(n) ? n : void 0;
  }
  function Qs(e) {
    let n = e.trim().replace(Gs, "");
    if (!js.test(n) || n.startsWith("+0")) return;
    let t = n.startsWith("+") || n.startsWith("00"),
      i = n.replace(/^\+?0*/, "");
    if (!(t && i.startsWith("1") && i.length !== 11)) return Ks.test(i) ? i : void 0;
  }
  function So(e) {
    if (e.length > Yt) return;
    let n = e.replace($s, "").toLowerCase();
    return /\D/.test(n) ? n : void 0;
  }
  function rt(e) {
    let n = e.trim().toLowerCase().replace(/\s+/g, " ");
    return n.length > 0 && n.length <= 128 ? n : void 0;
  }
  function Xs(e) {
    let n = rt(e);
    if (!n) return;
    let t = Object.prototype.hasOwnProperty.call(Eo, n) ? Eo[n] : void 0;
    if (t) return t;
    if (/^[a-z]{2}$/.test(n)) return n;
  }
  function Js(e) {
    let n = rt(e);
    return n && Ws.test(n) ? n : void 0;
  }
  var kn = [
      {
        kind: "email",
        field: "email_sha256",
        wire: "em",
        maximum: Vs,
        automatic: !0,
        normalize: Ys,
      },
      {
        kind: "phone",
        field: "phone_number_sha256",
        wire: "ph",
        maximum: zs,
        automatic: !0,
        normalize: Qs,
      },
      {
        kind: "externalId",
        field: "external_id_sha256",
        wire: "eid",
        maximum: 1,
        automatic: !1,
        normalize: (e) => e,
      },
      {
        kind: "firstName",
        field: "first_name_sha256",
        wire: "fn",
        maximum: 1,
        automatic: !0,
        normalize: So,
      },
      {
        kind: "lastName",
        field: "last_name_sha256",
        wire: "ln",
        maximum: 1,
        automatic: !0,
        normalize: So,
      },
    ],
    Zs = [
      { kind: "country", field: "country", wire: "co", maximum: 1, normalize: Xs },
      { kind: "city", field: "city", wire: "ct", maximum: 1, normalize: rt },
      { kind: "region", field: "region", wire: "rg", maximum: 1, normalize: rt },
      { kind: "postalCode", field: "postal_code", wire: "pc", maximum: 1, normalize: Js },
    ],
    st = [...kn.filter((e) => e.automatic), ...Zs];
  function ea(e, n) {
    if (typeof e != "string" || e.length > Yt) return {};
    let t = e.trim();
    if (t.length === 0) return {};
    if (Co.test(t)) return { hash: t.toLowerCase() };
    let i = n(t);
    return i ? { raw: i } : {};
  }
  function na(e) {
    if (typeof e != "string" || e.length > Yt) return;
    let n = e.trim();
    return Co.test(n) ? n.toLowerCase() : void 0;
  }
  function bo(e) {
    if (!e || typeof e != "object" || Array.isArray(e)) return null;
    let n = e,
      t = {};
    for (let r of Us) {
      let s = n[r];
      typeof s == "string" && s.length > 0 && (t[r] = s);
    }
    let i = kn.map((r) => ({ definition: r, value: ea(n[r.field], r.normalize) })),
      o = i.find(({ definition: r }) => r.kind === "phone");
    return {
      identifiers: i,
      phoneNumberWithPlusHash:
        o != null && o.value.hash ? na(n.phone_number_with_plus_sha256) : void 0,
      passthrough: t,
    };
  }
  function ta(e) {
    return Object.keys(e).length > 0 ? e : void 0;
  }
  function Gt(e, n, t) {
    let i = Object.assign({}, n);
    t && (i.phone_number_with_plus_sha256 = t);
    for (let { field: o, hash: r, phoneNumberWithPlusHash: s } of e)
      (r && (i[o] = r), s && (i.phone_number_with_plus_sha256 = s));
    return ta(i);
  }
  function $t(e) {
    return je(this, null, function* () {
      let n = typeof window != "undefined" ? window.crypto : globalThis.crypto;
      if (!(n != null && n.subtle) || typeof TextEncoder == "undefined")
        throw new Error("Web Crypto SHA-256 is unavailable");
      let t = yield n.subtle.digest("SHA-256", new TextEncoder().encode(e));
      return Array.from(new Uint8Array(t), (i) => i.toString(16).padStart(2, "0")).join("");
    });
  }
  function Wt(e) {
    return new Promise((n, t) => {
      let i = setTimeout(() => {
        t(new Error("Web Crypto SHA-256 timed out"));
      }, 4e3);
      e.then(
        (o) => {
          (clearTimeout(i), n(o));
        },
        (o) => {
          (clearTimeout(i), t(o));
        },
      );
    });
  }
  function ia(e, n) {
    return je(this, null, function* () {
      let t = Wt($t(e)),
        i = Wt($t(`+${e}`)).catch(() => {}),
        o = yield t;
      n == null || n(o);
      let r = yield i;
      return { hash: o, phoneNumberWithPlusHash: r };
    });
  }
  function at(e, n) {
    let t = bo(e);
    if (!t) return {};
    let i = Gt(
        t.identifiers.map(({ definition: a, value: c }) => ({ field: a.field, hash: c.hash })),
        t.passthrough,
        t.phoneNumberWithPlusHash,
      ),
      o = t.identifiers.filter(({ value: a }) => a.raw);
    if (o.length === 0) return { user: i };
    let r = {};
    for (let { definition: a } of o) r[a.kind] = 1;
    let s = {},
      d = Promise.all(
        t.identifiers.map(({ definition: a, value: c }) => {
          if (!c.raw) return Promise.resolve({ field: a.field, hash: c.hash });
          let u = (
            a.kind === "phone"
              ? ia(c.raw, (h) => {
                  n == null || n(a.kind, { field: a.field, hash: h });
                })
              : Wt($t(c.raw)).then((h) => ({ hash: h, phoneNumberWithPlusHash: void 0 }))
          ).then(
            ({ hash: h, phoneNumberWithPlusHash: m }) => {
              let v = { field: a.field, hash: h, phoneNumberWithPlusHash: m };
              return ((a.kind !== "phone" || m) && (n == null || n(a.kind, v)), v);
            },
            (h) => {
              let m = { field: a.field, error: h };
              return (n == null || n(a.kind, m), m);
            },
          );
          return ((s[a.kind] = u), u);
        }),
      ).then((a) => {
        let c = Gt(a, t.passthrough, t.phoneNumberWithPlusHash);
        if (!a.some(({ hash: l }) => l) && !t.phoneNumberWithPlusHash) {
          let l = a.find(({ error: u }) => u !== void 0);
          if (l) throw l.error;
        }
        return c;
      });
    return { user: i, pending: d, pendingHashCounts: r, pendingHashPromises: s };
  }
  function dt(e) {
    let n = bo(e);
    if (n)
      return Gt(
        n.identifiers.map(({ definition: t, value: i }) => ({ field: t.field, hash: i.hash })),
        n.passthrough,
        n.phoneNumberWithPlusHash,
      );
  }
  var p = {
      consent: null,
      initialized: !1,
      userConfigHashingPending: !1,
      pixelId: void 0,
      endpoint: void 0,
      config: {},
      clickId: void 0,
      explicitClickId: void 0,
      nativeClickId: void 0,
      browserRef: void 0,
    },
    ge = [],
    Ge = new Map();
  function oa() {
    return {
      flushSchedulerInterval: null,
      firstPendingEventAtMs: null,
      lastPendingEventAtMs: null,
      nextFlushRetryAtMs: null,
      consecutiveFlushFailures: 0,
      activeFetchRequest: null,
      credentiallessEventsInFlight: new Set(),
    };
  }
  function q(e) {
    return e !== void 0 ? Ge.get(e) : Ge.values().next().value;
  }
  function j() {
    return Array.from(Ge.values());
  }
  function Io(e) {
    let n = Ge.get(e);
    if (n) return n;
    let t = Ge.size === 0,
      i = {
        pixelId: e,
        sdkInitQueued: !1,
        config: t ? p.config : { pixelId: e },
        pendingEvents: t ? ge : [],
        userConfigHashingPending: !1,
        userHashingPendingCounts: {},
        userConfigUpdateRevision: 0,
        transport: oa(),
      };
    i.config.pixelId = e;
    for (let o of i.pendingEvents) An(o, e);
    return (Ge.set(e, i), i);
  }
  function An(e, n) {
    var t;
    e.testSessionContext !== void 0 &&
      ((e.testSessionId =
        ((t = e.testSessionContext) == null ? void 0 : t.pixelId) === n
          ? e.testSessionContext.testSessionId
          : null),
      delete e.testSessionContext);
  }
  function Mo() {
    Ge.clear();
  }
  function w() {
    return p.consent !== !1;
  }
  function Ao() {
    return typeof globalThis != "undefined"
      ? globalThis
      : typeof window != "undefined"
        ? window
        : null;
  }
  function W() {
    return typeof window != "undefined" && typeof document != "undefined";
  }
  function V(e, ...n) {
    var t;
    (t = e.config) != null && t.debug && console.debug("[oaiq]", ...n);
  }
  var Po = new Set();
  function To(e, n) {
    if (typeof console == "undefined" || typeof console.warn != "function") return;
    let t = (n == null ? void 0 : n.details) === !0,
      i =
        typeof e.eventName == "string"
          ? e.eventName
          : e.eventName == null
            ? null
            : `<${typeof e.eventName}>`,
      o = JSON.stringify([e.command, i, e.issues, t]);
    if (Po.has(o)) return;
    Po.add(o);
    let r = e.command === "measure" ? "validation failed; event dropped" : "validation warning";
    if (t) {
      console.warn("[oaiq]", r, e);
      return;
    }
    console.warn("[oaiq]", r);
  }
  var ko = new Set();
  function x(e, n, t, i) {
    var r;
    if (
      ((r = i == null ? void 0 : i.debug) != null ? r : p.config.debug === !0) &&
      !ko.has(e) &&
      (ko.add(e), typeof console != "undefined" && typeof console.warn == "function")
    ) {
      let s = Object.assign({}, t != null ? t : {}, n !== void 0 ? { error: n } : {});
      console.warn("[oaiq]", e, s);
    }
  }
  function J() {
    return typeof crypto != "undefined" && typeof crypto.randomUUID == "function"
      ? crypto.randomUUID()
      : `oaiq_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  }
  function un() {
    return typeof performance != "undefined" && typeof performance.now == "function"
      ? performance.now()
      : Date.now();
  }
  var Qt = new Map();
  function Tn(e) {
    var n;
    try {
      let t = ((n = window.location) == null ? void 0 : n.protocol) === "https:";
      return (
        (document.cookie = `${e}; SameSite=Lax${t ? "; Secure" : ""}`),
        t && (document.cookie = `${e}; SameSite=None; Secure`),
        !0
      );
    } catch (t) {
      return (x("cookie_write_failed", t), !1);
    }
  }
  function Oe(e) {
    if (!W()) return;
    let n;
    try {
      n = document.cookie;
    } catch (i) {
      x("cookie_read_failed", i, { cookie_name: e });
      return;
    }
    let t = n ? n.split("; ") : [];
    for (let i of t) {
      let [o, ...r] = i.split("=");
      if (o === e) {
        let s = r.join("=");
        try {
          return decodeURIComponent(s);
        } catch (d) {
          return (x("cookie_decode_failed", d, { cookie_name: e }), s);
        }
      }
    }
  }
  function wo(e) {
    return e ? (e.includes(":") ? !0 : /^(\d{1,3}\.){3}\d{1,3}$/.test(e)) : !1;
  }
  function ra() {
    var o, r, s;
    if (!W()) return;
    let e =
      (s =
        (r = (o = window.location) == null ? void 0 : o.hostname) == null
          ? void 0
          : r.toLowerCase()) != null
        ? s
        : "";
    if (!e || e === "localhost" || wo(e)) return;
    let n = e.split(".").filter(Boolean);
    if (n.length < 2) return;
    let t = "__oaiq_domain_probe",
      i = "1";
    for (let d = 2; d <= n.length; d += 1) {
      let a = n.slice(n.length - d).join("."),
        c = [`${t}=${i}`, "Path=/", "Max-Age=60", `Domain=${a}`].join("; ");
      if (!Tn(c)) return;
      if (Oe(t) === i) return (Tn(`${t}=; Path=/; Max-Age=0; Domain=${a}`), a);
    }
  }
  function sa() {
    var t, i, o;
    let e =
      W() &&
      (o =
        (i = (t = window.location) == null ? void 0 : t.hostname) == null
          ? void 0
          : i.toLowerCase()) != null
        ? o
        : "";
    if (Qt.has(e)) return Qt.get(e);
    let n = ra();
    return (Qt.set(e, n), n);
  }
  function pe(e, n, t) {
    if (!W()) return !1;
    let i = sa(),
      o = i ? `; Domain=${i}` : "",
      r = [`${e}=${encodeURIComponent(n)}`, "Path=/", `Max-Age=${Math.max(0, Math.floor(t))}`].join(
        "; ",
      );
    return Tn(`${r}${o}`);
  }
  function Xt(e) {
    var o, r, s;
    if (!W()) return;
    let n = `${e}=; Path=/; Max-Age=0`;
    Tn(n);
    let t =
      (s =
        (r = (o = window.location) == null ? void 0 : o.hostname) == null
          ? void 0
          : r.toLowerCase()) != null
        ? s
        : "";
    if (!t || t === "localhost" || wo(t)) return;
    let i = t.split(".").filter(Boolean);
    for (let d = 2; d <= i.length; d += 1) {
      let a = i.slice(i.length - d).join(".");
      Tn(`${n}; Domain=${a}`);
    }
  }
  function ie(e) {
    if (typeof e != "string" || e.trim().length === 0) return !1;
    try {
      return (encodeURIComponent(e), !0);
    } catch (n) {
      return !1;
    }
  }
  function fn() {
    var t, i;
    if (p.explicitClickId !== void 0) return p.explicitClickId;
    if (!W()) return;
    let e = (i = (t = window.location) == null ? void 0 : t.search) != null ? i : "",
      n = new URLSearchParams(e).get(zt);
    return ie(n) ? n : void 0;
  }
  function ct(e) {
    let n = fn();
    if (n !== void 0)
      return (
        n !== p.nativeClickId && (p.nativeClickId = void 0),
        p.explicitClickId === void 0 &&
          (pe(ue, n, 30 * 86400),
          V(p, "captured click id from query param", { param: zt, cookieName: ue })),
        n
      );
    if (p.nativeClickId !== void 0) return p.nativeClickId;
    let t = Oe(ue);
    return ie(t) ? (V(p, "using stored click id from cookie", { cookieName: ue }), t) : e;
  }
  function No() {
    Oe(ue) !== void 0 && pe(ue, "", 0);
  }
  var Jt = "true",
    Zt = "false";
  function Oo(e) {
    return e === Jt ? !0 : e === Zt ? !1 : null;
  }
  function Ro() {
    var e;
    if (!W()) return null;
    try {
      return (e = window.localStorage) != null ? e : null;
    } catch (n) {
      return (x("consent_local_storage_unavailable", n), null);
    }
  }
  function aa() {
    let e = Ro();
    if (!e) return null;
    try {
      return Oo(e.getItem(Pn));
    } catch (n) {
      return (x("consent_local_storage_read_failed", n), null);
    }
  }
  function da(e) {
    let n = Ro();
    if (n)
      try {
        n.setItem(Pn, e ? Jt : Zt);
      } catch (t) {
        x("consent_local_storage_write_failed", t);
      }
  }
  function U() {
    if (!W()) return null;
    let e = aa();
    if (e === !1) return !1;
    let n = Oo(Oe(Kt));
    return n === !1 ? !1 : e === !0 || n === !0 ? !0 : null;
  }
  function Do(e) {
    W() && (da(e), pe(Kt, e ? Jt : Zt, 720 * 60 * 60));
  }
  var ln = new WeakMap(),
    We = new WeakMap(),
    ni = new WeakMap(),
    ei = new WeakMap();
  function Fo(e) {
    return typeof window != "undefined" && e.length > 0 && ln.has(window);
  }
  function Lo() {
    if (
      typeof document == "undefined" ||
      document.referrer !== "android-app://com.openai.chatgpt/" ||
      typeof window == "undefined"
    )
      return !1;
    let e = ni.get(window);
    return e !== void 0 && performance.now() - e.installedAtMs < 4e3;
  }
  function Me(e = !1) {
    if (typeof window == "undefined") return;
    let n = We.get(window);
    n && (clearTimeout(n.timeout), n.port.close(), We.delete(window));
    let t = ln.get(window);
    if ((ln.delete(window), !!t)) {
      if (e)
        try {
          t.port.postMessage(
            JSON.stringify(Object.assign({}, t.binding, { kind: "consent_revoked" })),
          );
        } catch (i) {}
      for (let i of t.pending.values()) i(!1);
      t.port.close();
    }
  }
  function Ho(e, n = "android-app://chatgpt.com") {
    var c;
    if (typeof performance == "undefined" || !Number.isFinite(performance.timeOrigin))
      return () => {};
    let t = window;
    (c = ei.get(t)) == null || c();
    let i = ni.get(t);
    i ||
      ((i = {
        id: J(),
        startedAtMs: Math.floor(performance.timeOrigin),
        installedAtMs: performance.now(),
      }),
      ni.set(t, i));
    let o = i,
      r = () => (U() === !1 && e(), w()),
      s = (l) => {
        var m;
        if (l.origin !== n || !((m = l.ports) != null && m[0])) return;
        if (!r()) {
          l.ports[0].close();
          return;
        }
        Me();
        let u = l.ports[0],
          h = setTimeout(() => {
            var v;
            ((v = We.get(t)) == null ? void 0 : v.port) === u && Me();
          }, 1e4);
        (We.set(t, { port: u, timeout: h }),
          (u.onmessage = (v) => {
            var E;
            if (((E = We.get(t)) == null ? void 0 : E.port) !== u || !r()) return;
            let f;
            try {
              f = JSON.parse(v.data);
            } catch (M) {
              Me();
              return;
            }
            if (
              (f == null ? void 0 : f.version) !== 1 ||
              f.kind !== "hello" ||
              !Number.isSafeInteger(f.generation) ||
              f.generation < 0 ||
              ![f.visitId, f.nonce].every(
                (M) => typeof M == "string" && M.length > 0 && M.length <= 256,
              )
            ) {
              Me();
              return;
            }
            let g = Object.assign({}, f, { documentId: o.id });
            ((u.onmessage = (M) => {
              var T;
              if (((T = We.get(t)) == null ? void 0 : T.port) !== u || !r()) return;
              let S;
              try {
                S = JSON.parse(M.data);
              } catch (_) {
                return;
              }
              if (
                (S == null ? void 0 : S.kind) !== "bound" ||
                S.version !== 1 ||
                S.visitId !== f.visitId ||
                S.nonce !== f.nonce ||
                S.generation !== f.generation ||
                S.documentId !== o.id
              )
                return;
              (clearTimeout(h), We.delete(t));
              let P = { binding: g, port: u, pending: new Map() };
              (ln.set(t, P),
                (u.onmessage = (_) => {
                  let y;
                  try {
                    y = JSON.parse(_.data);
                  } catch (F) {
                    return;
                  }
                  if (
                    ln.get(t) !== P ||
                    (y == null ? void 0 : y.version) !== 1 ||
                    y.kind !== "accepted" ||
                    y.visitId !== f.visitId ||
                    y.nonce !== f.nonce ||
                    y.generation !== f.generation ||
                    y.documentId !== o.id
                  )
                    return;
                  let b = P.pending.get(y.requestId);
                  b && Number.isInteger(y.accepted_events) && b(y.accepted_events);
                }));
            }),
              u.postMessage(
                JSON.stringify(
                  Object.assign({}, g, {
                    kind: "hello_ack",
                    userAgent: navigator.userAgent,
                    documentStartedAtMs: o.startedAtMs,
                    sourceUrl: `${t.location.origin}${t.location.pathname}`,
                  }),
                ),
              ));
          }),
          (u.onmessageerror = () => Me()),
          u.start());
      },
      d = () => Me();
    (t.addEventListener("message", s), t.addEventListener("pagehide", d));
    let a = () => {
      (Me(),
        t.removeEventListener("message", s),
        t.removeEventListener("pagehide", d),
        ei.delete(t));
    };
    return (ei.set(t, a), a);
  }
  function xo(e, n, t) {
    let i = ln.get(window);
    if (!(!i || !e || !w()))
      return i.pending.size >= 4
        ? Promise.resolve(!1)
        : new Promise((o) => {
            let r = J(),
              s = setTimeout(() => d(!1), 2e3),
              d = (a) => {
                i.pending.delete(r) && (clearTimeout(s), o(a === t));
              };
            i.pending.set(r, d);
            try {
              i.port.postMessage(
                JSON.stringify(
                  Object.assign({}, i.binding, {
                    kind: "conversion",
                    requestId: r,
                    pixelId: e,
                    sdkVersion: Ie,
                    body: n,
                    consent: !0,
                  }),
                ),
              );
            } catch (a) {
              d(!1);
            }
          });
  }
  var ca = 10,
    oe;
  function wn(e, n) {
    if (typeof e != "string") return;
    let t = e.trim();
    return t.length > 0 && t.length <= n && !/[\x00-\x1f\x7f]/.test(t) ? t : void 0;
  }
  function ua(e) {
    if (!Array.isArray(e) || e.length > ca) return;
    let n = [];
    for (let t of e) {
      if (!t || typeof t != "object" || Array.isArray(t)) continue;
      let i = wn(t.brand, 64),
        o = wn(t.version, 32);
      i && o && n.push({ brand: i, version: o });
    }
    return n.length ? n : void 0;
  }
  function oi() {
    if (oe || U() === !1) return;
    let e = { cancel: () => {} };
    oe = e;
    try {
      if (typeof navigator == "undefined") return;
      let n = navigator.userAgentData;
      if (typeof (n == null ? void 0 : n.getHighEntropyValues) != "function") return;
      let t;
      e.pending = new Promise((r) => {
        t = r;
      });
      let i = (r) => {
          e.pending && (clearTimeout(o), U() !== !1 && (e.hints = r), (e.pending = void 0), t());
        },
        o = setTimeout(() => i(), 250);
      ((e.cancel = () => i()),
        n
          .getHighEntropyValues(["model", "platformVersion", "fullVersionList"])
          .then((r) => {
            let s = {
              model: wn(r == null ? void 0 : r.model, 128),
              platform: wn(r == null ? void 0 : r.platform, 32),
              platform_version: wn(r == null ? void 0 : r.platformVersion, 32),
              full_version_list: ua(r == null ? void 0 : r.fullVersionList),
            };
            i(s.model || s.platform || s.platform_version || s.full_version_list ? s : void 0);
          })
          .catch(() => i()));
    } catch (n) {
      e.cancel();
    }
  }
  function Uo() {
    return oe == null ? void 0 : oe.pending;
  }
  function Bo() {
    let e = oe == null ? void 0 : oe.hints;
    if (!e) return;
    let n = me({}, e);
    return (
      e.full_version_list && (n.full_version_list = e.full_version_list.map((t) => me({}, t))),
      n
    );
  }
  function ri() {
    (oe == null || oe.cancel(), (oe = void 0));
  }
  var si =
      /(?:^|[^a-z0-9])(?:(?:u?e[\s_-]*mail(?:[\s_-]*address)?|mail[\s_-]*address)[0-9]*|メールアドレス|이메일)(?:$|[^a-z0-9])/i,
    ai =
      /phone|mobile|contact[\s_-]*number|(?:^|[^a-z0-9])(?:cell|tel|電話(?:番号)?|휴대폰|전화번호)(?:$|[^a-z0-9])/i,
    qo = /(?:^|[^a-z0-9])(?:country(?:[\s_-]*code)?|countries|país|国家)(?:$|[^a-z0-9])/i,
    Vo = /(?:^|[^a-z0-9])(?:city|town|locality)(?:$|[^a-z0-9])/i,
    zo = /(?:^|[^a-z0-9])(?:state|region|province)(?:$|[^a-z0-9])/i,
    di =
      /(?:^|[^a-z0-9])(?:zip|zipcode|zip[\s_-]*code|(?:shipping|billing|postal)[\s_-]+pin[\s_-]*code|p[\s_-]*code|z[\s_-]*code|postal(?![\s_-]*address)(?:[\s_-]*code)?|post[\s_-]*code|postcode)(?:$|[^a-z0-9])/i,
    Ko =
      /^(?:address|(?:(?:customer[\s_-]+)?(?:full|street|shipping|billing|delivery|home)|customer)[\s_-]+address)$/i,
    ut =
      /(?:^|[^a-z0-9])(?:phone|dial(?:ing)?|store|merchant|shop|organization|locale|consent)(?:$|[^a-z0-9])/i,
    ci = {
      firstName: ["firstname", "fn", "fname", "givenname", "forename"],
      lastName: ["lastname", "ln", "lname", "surname", "familyname"],
    },
    jo = /[!"#$%&'()*+,\-./:;<=>?@ \[\\\]^_`{|}~\s]+/,
    Go =
      /^(?:full[\s_-]*name|customer[\s_-]*name|your[\s_-]*name|billing[\s_-]*name|shipping[\s_-]*name|name[\s_-]*first[\s_-]*last|first[\s_-]*last[\s_-]*name)$/i,
    ft =
      /(?:^|[^a-z0-9])(?:cc|card(?:holder)?|credit[\s_-]*card|pay(?:ment)?|security)(?:$|[^a-z0-9])/i,
    he =
      /(?:^|[^a-z0-9])(?:password|passwd|passcode|pass[\s_-]*code|one[\s_-]*time[\s_-]*(?:code|password|passcode)|(?:verification|security|recovery)[\s_-]*code|otp|cvv|cvc|cvn|csc|credit[\s_-]*card(?![\s_-]*(?:holder[\s_-]*)?(?:(?:first|given|last|family)[\s_-]*)?name$)|card[\s_-]*(?:number|security|verification)|cc[\s_-]*(?:number|exp|csc)|social[\s_-]*security|ssn|date[\s_-]*of[\s_-]*birth|birth[\s_-]*date|dob|court(?:[\s_-]*(?:date|name|case))?|case[\s_-]*(?:description|details|type)|medical[\s_-]*(?:record|history)|diagnosis|offen[cs]e)(?:$|[^a-z0-9])/i,
    Pe =
      /(?:^|[^a-z0-9])(?:gift[\s_-]*recipient|recipient|invitee?|donor|beneficiary|third[\s_-]*party|customer[\s_-]*service|support|referr(?:al|er|ed)|seller|organizer|affiliate|friend|sku)s?(?:$|[^a-z0-9])/i,
    ui = /(?:^|[^a-z0-9])products?(?:$|[^a-z0-9])/i,
    Nn = /(?:^|[^a-z0-9])(?:confirm(?:ation|ed)?|re[\s_-]*enter|verify)(?:$|[^a-z0-9])/i,
    lt = /(?:^|[^a-z0-9])(?:account|profile|customer|order[\s_-]*confirmation)(?:$|[^a-z0-9])/i,
    On =
      /(?:^|[^a-z0-9])(?:(?:company|business)[\s_-]*(?:contact|support|email|phone)|contact[\s_-]*us)(?:$|[^a-z0-9])/i,
    $o = /^[a-z_$][a-z0-9_$]{0,63}$/i,
    Wo = [
      '[aria-label*="account" i]',
      '[aria-label*="profile" i]',
      '[aria-label*="customer" i]',
      '[aria-label*="order confirmation" i]',
      '[id*="account" i]',
      '[class*="account" i]',
      '[id*="profile" i]',
      '[class*="profile" i]',
      '[id*="customer" i]',
      '[class*="customer" i]',
      '[id*="order-confirmation" i]',
      '[class*="order-confirmation" i]',
      '[id*="order_confirmation" i]',
      '[class*="order_confirmation" i]',
      "[data-account]",
      "[data-profile]",
      "section[aria-labelledby]",
      "article[aria-labelledby]",
      "main[aria-labelledby]",
      '[role="region"][aria-labelledby]',
    ].join(", "),
    Yo = 'h1, h2, h3, h4, h5, h6, [role="heading"]',
    fi = "[id], [class], [name], [aria-label], [aria-labelledby], [itemprop], [data-bind]",
    Qo = "dt, th, label, span, p",
    li = new Set([
      "current-password",
      "new-password",
      "one-time-code",
      "cc-name",
      "cc-given-name",
      "cc-family-name",
      "cc-additional-name",
      "cc-number",
      "cc-exp",
      "cc-exp-month",
      "cc-exp-year",
      "cc-csc",
      "cc-type",
      "transaction-currency",
      "transaction-amount",
    ]),
    Xo = new Set(["home", "work", "mobile", "fax", "pager"]);
  function Jo(e, n, t, i) {
    (n == null ? void 0 : n.leadingPlusHash) === e ? i.push(e) : t.push(e);
  }
  function Zo(e, n, t, i) {
    var s, d;
    let o = (s = n == null ? void 0 : n.digitsHash) != null ? s : e[0],
      r = (d = n == null ? void 0 : n.leadingPlusHash) != null ? d : e[1];
    (o && t.push(o), r && r !== o && i.push(r));
  }
  var qn = new Set(["input", "select", "textarea"]),
    Dn = 2,
    cr = 15,
    ur = 8,
    pn = 256,
    fa = 20,
    la = 15,
    Vn = 100,
    er = 4,
    ma = 12,
    Te = 5,
    ga = 30,
    pa = 60,
    ha = 15,
    nr = 4,
    tr = 'button, input[type="submit"], input[type="image"], [role="button"]',
    _a = {
      email: ["email"],
      phone: ["tel", "tel-national", "tel-local"],
      firstName: ["given-name", "name"],
      lastName: ["family-name", "name"],
      country: ["country", "country-name"],
      city: ["address-level2", "address-level3"],
      region: ["address-level1"],
      postalCode: ["postal-code"],
    },
    D = ["form", "js", "html"],
    ya = ["email", "phone", "firstName", "lastName"],
    Ee = st.map(({ kind: e }) => e),
    va = new Set(["firstName", "lastName", "country", "city", "region", "postalCode"]),
    Ea = ["email", "phone"],
    gi = ["email", "phone"],
    Sa = ["email", "phone", "country", "city", "region", "postalCode"],
    Ye = ["email", "phone"],
    Ca = new Map(st.map((e) => [e.kind, e])),
    fe = new Map(),
    Re,
    Ae,
    _t,
    yt;
  function zn(e) {
    let n = Ca.get(e);
    if (!n) throw new Error(`Unsupported automatic matching identity: ${e}`);
    return n;
  }
  function Fe(e) {
    let n = {};
    for (let t of Ee) n[t] = e(t);
    return n;
  }
  var gt;
  function ee(e) {
    return e === "firstName" || e === "lastName";
  }
  var vt = ["country", "city", "region", "postalCode"];
  function H(e) {
    return vt.includes(e);
  }
  function fr(e) {
    return new Set(e.filter(({ kind: t }) => t === "country").map(({ value: t }) => t)).size > 1;
  }
  function Et(e) {
    var i;
    let n = new Map();
    for (let o of e) {
      if (!H(o.kind) || !o.geographyBundle) continue;
      let r = (i = n.get(o.geographyBundle)) != null ? i : [];
      (r.push(o), n.set(o.geographyBundle, r));
    }
    let t = new Set();
    for (let [o, r] of n) fr(r.map(({ kind: s, raw: d }) => ({ kind: s, value: d }))) && t.add(o);
    return e.filter(
      (o) => !H(o.kind) || (o.geographyBundle !== void 0 && !t.has(o.geographyBundle)),
    );
  }
  function ba(e) {
    var i;
    let n = new Map();
    for (let o of e) {
      if (!H(o.kind) || !o.geographyBundle) continue;
      let r = (i = n.get(o.geographyBundle)) != null ? i : [];
      (r.push(o), n.set(o.geographyBundle, r));
    }
    let t = new Set();
    for (let [o, r] of n)
      fr(r.map(({ kind: s, normalized: d }) => ({ kind: s, value: d }))) && t.add(o);
    return e.filter(
      (o) => !H(o.kind) || (o.geographyBundle !== void 0 && !t.has(o.geographyBundle)),
    );
  }
  function bt(e) {
    return e === "email" || e === "phone" || ee(e);
  }
  function Ei(e, n) {
    var t, i;
    return bt(n) && (i = (t = q(e)) == null ? void 0 : t.userHashingPendingCounts[n]) != null
      ? i
      : 0;
  }
  function lr() {
    return { js: [], form: [], html: [] };
  }
  function mr(e) {
    var n;
    return (n = e != null ? e : p.pixelId) != null ? n : fe.keys().next().value;
  }
  function Z(e) {
    let n = mr(e);
    return n === void 0 ? void 0 : fe.get(n);
  }
  function Ia(e) {
    let n = mr(e);
    if (n === void 0) return;
    let t = fe.get(n);
    return (
      t ||
        ((t = {
          pixelId: n,
          active: !1,
          candidatesBySource: lr(),
          ignoredFingerprints: Fe(() => new Set()),
          ignoredMerchantHashes: {},
          excludedNameOwners: new WeakSet(),
          pendingEvidenceRetries: new Map(),
          pendingFormRetries: new Map(),
          stateGeneration: 0,
          latestMatchingFormOwners: {},
          merchantPhoneProbeSources: new Map(),
          retryableMerchantPhoneProbes: new Set(),
          detachedMerchantPhoneProbeTasks: new Map(),
        }),
        fe.set(n, t)),
      t
    );
  }
  function De() {
    for (let e of fe.values()) if (e.active) return !0;
    return !1;
  }
  function Qe() {
    return De() ? (U() === !1 ? (G(), !1) : !0) : !1;
  }
  function ye(e) {
    return zn(e).maximum;
  }
  function yn(e, n) {
    var r;
    if (!bt(n)) return [];
    let t = (r = q(e.pixelId)) == null ? void 0 : r.config.user,
      i = t == null ? void 0 : t[zn(n).field],
      o = n === "phone" ? [i, t == null ? void 0 : t.phone_number_with_plus_sha256] : [i];
    return Array.from(new Set(o.filter((s) => s !== void 0)));
  }
  function Q(e, n) {
    let t = yn(e, n);
    return t.length > 0 ? t.join(":") : void 0;
  }
  function Xe(e, n) {
    var o;
    if (n !== "phone") return;
    let t = yn(e, n);
    if (t.length !== 1) return;
    let i = t[0];
    return ((o = e.merchantPhoneSupplement) == null ? void 0 : o.merchantHashSignature) === i
      ? void 0
      : i;
  }
  function Ma(e, n, t, i = e.candidatesBySource[t]) {
    let o = D.indexOf(t);
    return D.slice(0, o + 1).some((r) =>
      (r === t ? i : e.candidatesBySource[r]).some((s) => s.task.merchantPhoneProbeSignature === n),
    );
  }
  function It(e, n, t, i) {
    for (let o of D)
      for (let r of e.candidatesBySource[o])
        if (
          r.task.kind === t &&
          r.task.merchantPhoneProbeSignature === n &&
          _e(r.task.fingerprint, i)
        )
          return r.task;
  }
  function hn(e, n, t, i, o, r = !1) {
    let s = ae(t),
      d = D.indexOf(i),
      a = Ma(e, n, i, o),
      c = e.merchantPhoneProbeSources.has(s);
    return (
      !a &&
      (r || pr(e) < Dn) &&
      (c
        ? e.retryableMerchantPhoneProbes.has(s)
        : e.merchantPhoneProbeSources.size < Dn ||
          [...e.merchantPhoneProbeSources].some(([u, h]) => D.indexOf(h) > d && !gr(e, u)))
    );
  }
  function gr(e, n) {
    let t = e.detachedMerchantPhoneProbeTasks.get(n);
    return (t == null ? void 0 : t.pending) !== void 0
      ? !0
      : D.some((i) =>
          e.candidatesBySource[i].some(
            (o) =>
              o.task.pending !== void 0 &&
              ae(o.task.fingerprint) === n &&
              o.task.merchantPhoneProbeSignature !== void 0 &&
              o.task.merchantPhoneProbeSignature === Q(e, "phone"),
          ),
        );
  }
  function pr(e) {
    let n = new Set();
    for (let t of D)
      for (let i of e.candidatesBySource[t])
        i.task.kind === "phone" && i.task.pending !== void 0 && n.add(i.task);
    for (let t of e.detachedMerchantPhoneProbeTasks.values()) t.pending !== void 0 && n.add(t);
    return n.size;
  }
  function Fn(e, n, t) {
    let i = ae(n),
      o = e.merchantPhoneProbeSources.get(i),
      r = D.indexOf(t);
    if (o !== void 0) {
      (e.retryableMerchantPhoneProbes.delete(i),
        r < D.indexOf(o) && e.merchantPhoneProbeSources.set(i, t));
      return;
    }
    if (e.merchantPhoneProbeSources.size >= Dn) {
      let s,
        d = r;
      for (let [a, c] of e.merchantPhoneProbeSources) {
        let l = D.indexOf(c);
        l > d && !gr(e, a) && ((s = a), (d = l));
      }
      if (s === void 0) return;
      (e.merchantPhoneProbeSources.delete(s), e.retryableMerchantPhoneProbes.delete(s));
    }
    (e.merchantPhoneProbeSources.set(i, t), e.retryableMerchantPhoneProbes.delete(i));
  }
  function Si(e, n, t) {
    let i = ae(n),
      o = e.merchantPhoneProbeSources.get(i);
    o !== void 0 && D.indexOf(t) < D.indexOf(o) && e.merchantPhoneProbeSources.set(i, t);
  }
  function Pa(e, n) {
    if (n.kind !== "phone") return;
    let t = ae(n.fingerprint);
    if (e.merchantPhoneProbeSources.has(t)) {
      for (let i of D)
        if (e.candidatesBySource[i].some((o) => o.task === n)) {
          e.merchantPhoneProbeSources.set(t, i);
          return;
        }
    }
  }
  function Ci(e, n) {
    let t = n === "phone" ? Q(e, n) : void 0,
      i = e.merchantPhoneSupplement,
      o = n === "phone" && i && i.merchantHashSignature === Q(e, n) ? i.task : void 0,
      r = new Set(),
      s = ye(n) - (yn(e, n).length > 0 ? 1 : 0) - Ei(e.pixelId, n);
    for (let d of D)
      for (let a of e.candidatesBySource[d])
        a.task.kind === n &&
          (t === void 0 || a.task.merchantPhoneProbeSignature !== t) &&
          a.task !== o &&
          !r.has(a.task) &&
          (r.add(a.task), (s -= 1));
    return Math.max(0, s);
  }
  function hr(e) {
    var t;
    let n = (t = e.getAttribute("autocomplete")) == null ? void 0 : t.trim().toLowerCase();
    return n ? n.split(/\s+/) : [];
  }
  function ve(e, n) {
    var i, o, r;
    let t = 0;
    return (
      (i = e[t]) != null && i.startsWith("section-") && e[t] !== "section-" && (t += 1),
      (e[t] === "shipping" || e[t] === "billing") && (t += 1),
      Xo.has((o = e[t]) != null ? o : "") && (t += 1),
      _a[n].includes((r = e[t]) != null ? r : "")
        ? ((t += 1), e[t] === "webauthn" && (t += 1), t === e.length)
        : !1
    );
  }
  function B(e) {
    return typeof e != "string"
      ? ""
      : e
          .slice(0, pn)
          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
          .toLowerCase();
  }
  function bi(e) {
    var t, i, o;
    let n = [];
    try {
      let r = e.labels;
      if (r)
        for (let a = 0; a < r.length && a < nr; a += 1) {
          let c = (t = r[a]) == null ? void 0 : t.textContent;
          typeof c == "string" && n.push(c);
        }
      let s = e.getAttribute("aria-labelledby"),
        d = (i = e.ownerDocument) != null ? i : typeof document == "undefined" ? void 0 : document;
      if (s && typeof (d == null ? void 0 : d.getElementById) == "function") {
        let a = s.trim().split(/\s+/).slice(0, nr);
        for (let c of a) {
          let l = (o = d.getElementById(c)) == null ? void 0 : o.textContent;
          typeof l == "string" && n.push(l);
        }
      }
    } catch (r) {
      return;
    }
    return n;
  }
  function ka(e, n) {
    let t = bi(e);
    if (!t) return;
    let i = [
      e.name || e.getAttribute("name"),
      e.id || e.getAttribute("id"),
      e.getAttribute("aria-label"),
      e.getAttribute("placeholder"),
      ...t,
    ];
    if (
      !i.some((o) => typeof o == "string" && o.length > pn) &&
      !(
        n === "hidden" &&
        i.slice(0, 2).some((o) => typeof o == "string" && o.trim().toLowerCase() === "state")
      )
    )
      return i.map(B);
  }
  function Ln(e, n = !0) {
    var t;
    try {
      let i = e.type.toLowerCase(),
        o = ka(e, i),
        r = n && o !== void 0 ? e.value : void 0;
      return {
        input: e,
        tagName: e.tagName.toLowerCase(),
        type: i,
        value: r,
        autocomplete: hr(e),
        hints: o,
        inputMode: (t = e.getAttribute("inputmode")) == null ? void 0 : t.trim().toLowerCase(),
      };
    } catch (i) {
      return;
    }
  }
  function Mt(e) {
    let { autocomplete: n, hints: t } = e;
    return t !== void 0 && !n.some((i) => li.has(i)) && !t.some((i) => Pe.test(i));
  }
  function _r(e) {
    return e.split(jo).filter(Boolean);
  }
  function Rn(e, n) {
    let i = _r(e).join("");
    return ci[n].includes(i);
  }
  function St(e, n) {
    let t = _r(e);
    if (t.length < 2 || (t[0] !== "billing" && t[0] !== "shipping")) return !1;
    let i = t.slice(1).join("");
    return i === "name" || ci[n].includes(i);
  }
  function Ii(e) {
    return (
      !_n(e) && (Rn(e, "firstName") || Rn(e, "lastName") || St(e, "firstName") || St(e, "lastName"))
    );
  }
  function _n(e) {
    return Go.test(e.trim());
  }
  function yr(e) {
    return e !== void 0 && e.some(_n) && !e.some(Ii);
  }
  function Hn(e) {
    var t, i;
    return (
      (ve(e.autocomplete, "firstName") && ve(e.autocomplete, "lastName")) ||
      yr(e.hints) ||
      (e.input.form != null &&
        !!((t = e.hints) != null && t.includes("name")) &&
        !((i = e.hints) != null && i.some(Ii)))
    );
  }
  function vr(e) {
    return Ko.test(e.trim());
  }
  function Er(e) {
    return e.slice(0, 2).some((n) => ut.test(n));
  }
  function Kn(e, n) {
    if (H(n) && ut.test(e)) return !1;
    switch (n) {
      case "email":
        return si.test(e);
      case "phone":
        return ai.test(e);
      case "firstName":
        return _n(e) || (Rn(e, "firstName") && !Rn(e, "lastName"));
      case "lastName":
        return Rn(e, "lastName") || _n(e);
      case "country":
        return qo.test(e);
      case "city":
        return Vo.test(e);
      case "region":
        return zo.test(e);
      case "postalCode":
        return di.test(e);
    }
  }
  function Pt(e, n, t = !1) {
    if (typeof e != "string") return;
    if (!t || !ee(n)) return e;
    let i = e.trim().split(/\s+/);
    return n === "firstName" ? i[0] : i.slice(1).join(" ") || void 0;
  }
  function Aa(e) {
    let { tagName: n, type: t, autocomplete: i } = e;
    if (!qn.has(n) || !Mt(e) || (n === "input" && t !== "email" && t !== "text" && t !== "hidden"))
      return !1;
    let { hints: o } = e;
    return t === "hidden" && o.some((s) => he.test(s))
      ? !1
      : Gn(e)
        ? !0
        : !(
            t === "hidden" ||
            o.some((s) => he.test(s)) ||
            n !== "input" ||
            i.length > 1 ||
            (i.length === 1 && i[0] !== "on" && i[0] !== "off")
          );
  }
  function Ta(e) {
    var s;
    let { tagName: n, type: t, autocomplete: i, inputMode: o } = e,
      r = ve(i, "postalCode") || !!((s = e.hints) != null && s.some((d) => di.test(d)));
    return !qn.has(n) ||
      (n === "input" && t !== "tel" && t !== "text" && t !== "hidden") ||
      !Mt(e) ||
      e.hints.some((d) => he.test(d)) ||
      r
      ? !1
      : t === "tel" || ve(i, "phone") || o === "tel" || e.hints.some((d) => ai.test(d));
  }
  function ir(e, n) {
    let { tagName: t, type: i, autocomplete: o } = e;
    return e.input.form == null ||
      !qn.has(t) ||
      (t === "input" && i !== "text" && i !== "hidden") ||
      !Mt(e) ||
      o.some((r) => r.startsWith("cc-")) ||
      e.hints.some((r) => he.test(r) || ft.test(r))
      ? !1
      : ve(o, n) || e.hints.includes("name") || e.hints.some((r) => Kn(r, n) || St(r, n));
  }
  function mt(e, n) {
    var r;
    if (e.autocomplete.includes("street-address") || ((r = e.hints) != null && r.some(vr)))
      return !1;
    let { tagName: t, type: i, autocomplete: o } = e;
    return (
      qn.has(t) &&
      (t !== "input" ||
        i === "text" ||
        i === "hidden" ||
        i === "tel" ||
        (n === "postalCode" && i === "number")) &&
      Mt(e) &&
      !e.hints.some((s) => he.test(s)) &&
      (ve(o, n) || (!Er(e.hints) && e.hints.some((s) => Kn(s, n))))
    );
  }
  var Mi = {
    email: Aa,
    phone: Ta,
    firstName: (e) => ir(e, "firstName"),
    lastName: (e) => ir(e, "lastName"),
    country: (e) => mt(e, "country"),
    city: (e) => mt(e, "city"),
    region: (e) => mt(e, "region"),
    postalCode: (e) => mt(e, "postalCode"),
  };
  function wa(e) {
    return Ee.filter((n) => ve(e.autocomplete, n));
  }
  function Na(e, n) {
    return n.length === 2 && n.includes("firstName") && n.includes("lastName") && Hn(e);
  }
  function jn(e) {
    let n = Ee.filter((r) => Mi[r](e)),
      t = new Set(n),
      i = wa(e);
    if (i.length > 0) return i.filter((r) => t.has(r));
    let o = n.filter((r) => va.has(r));
    return o.length > 1 && !Na(e, o) ? [] : n;
  }
  function Gn(e) {
    let { type: n, autocomplete: t, hints: i, inputMode: o } = e;
    return (
      n === "email" ||
      ve(t, "email") ||
      o === "email" ||
      t.includes("username") ||
      !!(i != null && i.some((r) => si.test(r)))
    );
  }
  function xn(e) {
    var n;
    return !!((n = e.hints) != null && n.some((t) => Nn.test(t)));
  }
  function pi(e, n) {
    return Mi[n](e) && !xn(e) && (n !== "email" || Gn(e));
  }
  function Sr(e, n = "") {
    let t = e;
    return [
      B(n),
      B(t.id),
      B(t.name),
      B(typeof t.getAttribute == "function" ? t.getAttribute("aria-label") : void 0),
    ];
  }
  function Pi(e, n = "") {
    return Sr(e, n).some((t) => Pe.test(t));
  }
  function Oa(e, n = "") {
    return Sr(e, n).some((t) => ft.test(t));
  }
  function Cr(e, n, t) {
    return (
      (t.inferredNameExclusion || Oa(n, t.intent)) && e.excludedNameOwners.add(n),
      e.excludedNameOwners.has(n)
    );
  }
  function br(e, n) {
    var t;
    return (
      (ve(e.autocomplete, n) && e.autocomplete.some((i) => i === "billing" || i === "shipping")) ||
      !!((t = e.hints) != null && t.some((i) => St(i, n)))
    );
  }
  function Ra(e) {
    return xn(e) ? 0 : Gn(e) ? 2 : 1;
  }
  function Ir(e) {
    return ve(e.autocomplete, "city") && e.autocomplete.includes("address-level2");
  }
  function mn(e) {
    let n = 2166136261,
      t = 2246822507;
    for (let i = 0; i < e.length; i += 1) {
      let o = e.charCodeAt(i);
      ((n = Math.imul(n ^ o, 16777619)), (t = Math.imul(t ^ o, 3266489909)));
    }
    return { primary: n >>> 0, secondary: t >>> 0, length: e.length };
  }
  function _e(e, n) {
    return e.primary === n.primary && e.secondary === n.secondary && e.length === n.length;
  }
  function Y(e, n) {
    if (!e || typeof e != "object" || Array.isArray(e)) return;
    let t = Object.getOwnPropertyDescriptor(e, n);
    return t && "value" in t ? t.value : void 0;
  }
  function Mr(e, n, t, i) {
    if (typeof e != "string") return;
    let o = zn(t).normalize(e);
    return o
      ? Object.assign({ source: n, kind: t, raw: o }, H(t) && i ? { geographyBundle: i } : {})
      : void 0;
  }
  function Pr(e, n, t, i, o) {
    let r = Mr(n, t, i, o);
    r && e.push(r);
  }
  function gn(e, n = Ea, t) {
    let i = Y(e, "event");
    if (i !== void 0 && (typeof i != "string" || i.length === 0 || i.length > pn)) return [];
    let o = [],
      r = [{ value: e, suppressGeography: !1 }],
      s = new WeakSet(),
      d = Vn;
    for (let a = 0; a < r.length && d > 0; a += 1) {
      let { value: c, suppressGeography: l } = r[a];
      if (!c || typeof c != "object" || Array.isArray(c) || s.has(c)) continue;
      s.add(c);
      let u;
      try {
        u = Object.getOwnPropertyNames(c);
        let m = Y(c, "role");
        if (typeof m == "string" && (Pe.test(B(m)) || ui.test(B(m)))) continue;
      } catch (m) {
        continue;
      }
      let h = u.some((m) => Ii(B(m)));
      for (let m of u) {
        if (d-- === 0) return Et(o);
        let v = B(m);
        if (m === "event" || he.test(v) || Pe.test(v) || ui.test(v)) continue;
        let f;
        try {
          f = Y(c, m);
        } catch (E) {
          continue;
        }
        let g = n.filter((E) => (!H(E) || (!l && v.trim() !== "state")) && Kn(v, E));
        if (g.length > 0) {
          let E = _n(v);
          if (E && h) continue;
          for (let M of g) Pr(o, Pt(f, M, E), "js", M, t != null ? t : c);
        } else
          f && typeof f == "object" && r.push({ value: f, suppressGeography: l || ut.test(v) });
      }
    }
    return Et(o);
  }
  function Da(e) {
    if (!Array.isArray(e)) return [];
    let n = Math.max(0, e.length - Vn),
      t = [];
    for (let i = e.length - 1; i >= n; i -= 1) t.push(...gn(e[i]));
    return Et(t);
  }
  function Fa(e) {
    if (!Array.isArray(e)) return [];
    let n = [],
      t = Math.max(0, e.length - Vn);
    for (let i = e.length - 1; i >= t; i -= 1) {
      let o = e[i];
      Array.isArray(o) && o[0] === "identify" && n.push(...gn(o[1], gi));
    }
    return n;
  }
  function or(e, n) {
    if (typeof n != "function") return;
    let t = n.call(e),
      i = Y(t, "traits");
    return typeof i == "function" ? i.call(t) : i;
  }
  function La() {
    let e = [];
    try {
      let r = Y(window, "Shopify"),
        s = Y(r, "checkout");
      e.push(...gn(s, gi));
    } catch (r) {}
    let n = new WeakSet();
    for (let r of ["klaviyo", "_learnq", "_klOnsite"])
      try {
        let s = Y(window, r);
        s && typeof s == "object" && !n.has(s) && (n.add(s), e.push(...Fa(s)));
      } catch (s) {}
    let t = new WeakSet();
    try {
      let r = Y(window, "analytics"),
        s = Y(r, "user");
      r &&
        typeof r == "object" &&
        typeof s == "function" &&
        (e.push(...gn(or(r, s), gi)), t.add(r));
    } catch (r) {}
    let i = Object.getOwnPropertyNames(window),
      o = Math.max(0, i.length - Vn);
    for (let r = o; r < i.length; r += 1)
      try {
        let s = Y(window, i[r]);
        if (
          !s ||
          typeof s != "object" ||
          Array.isArray(s) ||
          t.has(s) ||
          typeof Y(s, "identify") != "function" ||
          typeof Y(s, "track") != "function"
        )
          continue;
        t.add(s);
        let d = Y(s, "getUserTraits"),
          a;
        if (typeof d == "function") a = d.call(s);
        else {
          let c = Y(s, "user");
          if (typeof c != "function") continue;
          a = or(s, c);
        }
        e.push(...gn(a));
      } catch (s) {}
    return Et(e);
  }
  function Ha() {
    if (typeof window == "undefined") return [];
    let e = [],
      n = window.dataLayer;
    Array.isArray(n) && e.push(n);
    let t = Y(window, "adobeDataLayer");
    if (
      (Array.isArray(t) && !e.includes(t) && e.length < er && e.push(t),
      typeof document == "undefined" || typeof document.getElementsByTagName != "function")
    )
      return e;
    let i = document.getElementsByTagName("script");
    for (let o = 0; o < i.length && o < ma && e.length < er; o += 1) {
      let r = i[o],
        s = r == null ? void 0 : r.getAttribute("src");
      if (!s) continue;
      let d;
      try {
        d = new URL(s, window.location.href);
      } catch (l) {
        continue;
      }
      if (
        d.protocol !== "https:" ||
        d.hostname !== "www.googletagmanager.com" ||
        d.pathname !== "/gtm.js"
      )
        continue;
      let a = d.searchParams.get("l");
      if (!a || a === "dataLayer" || !$o.test(a)) continue;
      let c = Y(window, a);
      Array.isArray(c) && !e.includes(c) && e.push(c);
    }
    return e;
  }
  function Un(e, n = !1, t) {
    var r, s, d, a;
    let i = ((r = e.tagName) == null ? void 0 : r.toLowerCase()) === "form" || !!e.form;
    if (!i && (s = e.closest) != null && s.call(e, 'footer, [role="contentinfo"]')) return !0;
    let o = e;
    for (let c = 0; o && c < ur; c += 1) {
      if (c > 0 && o === t) return !1;
      if (
        ((((d = o.tagName) == null ? void 0 : d.toLowerCase()) === "footer" ||
          ((a = o.getAttribute("role")) == null ? void 0 : a.trim().toLowerCase()) ===
            "contentinfo") &&
          !i) ||
        [
          B(o.id),
          B(o.getAttribute("class")),
          B(o.getAttribute("name")),
          B(o.getAttribute("aria-label")),
        ].some((u) => Pe.test(u) || On.test(u) || he.test(u) || (c === 0 && n && Nn.test(u)))
      )
        return !0;
      o = o.parentElement;
    }
    return !1;
  }
  function xa(e) {
    var r, s, d, a, c, l, u, h;
    let n = (s = (r = e.tagName) == null ? void 0 : r.toLowerCase()) != null ? s : "",
      t =
        /^h[1-6]$/.test(n) ||
        ((d = e.getAttribute("role")) == null ? void 0 : d.trim().toLowerCase()) === "heading",
      i = e;
    if (t) {
      let m = e.textContent;
      if (typeof m != "string" || m.length > pn || !lt.test(B(m))) return;
      i =
        (l =
          (c =
            (a = e.closest) == null
              ? void 0
              : a.call(e, 'section, article, main, [role="region"]')) != null
            ? c
            : e.parentElement) != null
          ? l
          : e;
    }
    let o = i.getAttribute("aria-labelledby");
    if (!t && o) {
      let m =
          [i.id, i.getAttribute("class"), i.getAttribute("aria-label")].some((f) =>
            lt.test(B(f)),
          ) ||
          i.getAttribute("data-account") !== null ||
          i.getAttribute("data-profile") !== null,
        v =
          (h = (u = bi(i)) == null ? void 0 : u.filter((f) => f.length <= pn).map(B)) != null
            ? h
            : [];
      if (v.some((f) => Pe.test(f) || On.test(f)) || (!m && !v.some((f) => lt.test(f)))) return;
    }
    return typeof i.querySelectorAll == "function" && !Un(i) ? i : void 0;
  }
  function Ua(e, n) {
    var c, l, u, h;
    let t = n.get(e);
    if (t) return t;
    let i = e.getAttribute("data-bind"),
      o =
        (l =
          (c = i == null ? void 0 : i.match(/(?:^|,)\s*(?:text|value)\s*:\s*([^,]+)/)) == null
            ? void 0
            : c[1]) == null
          ? void 0
          : l.trim(),
      r =
        (u =
          o == null
            ? void 0
            : o
                .replace(/\(\)\s*$/, "")
                .split(".")
                .pop()) == null
          ? void 0
          : u.trim(),
      s = r && !/[\s()[\]{}?:,+*/|&=!<>]/.test(r) ? r : void 0,
      d = hr(e),
      a = {
        hints: [
          e.id,
          e.getAttribute("name"),
          e.getAttribute("class"),
          e.getAttribute("aria-label"),
          e.getAttribute("itemprop"),
          ...((h = bi(e)) != null ? h : []),
          s,
        ].map(B),
        hasSensitiveAutocomplete: d.some((m) => li.has(m)),
      };
    return (n.set(e, a), a);
  }
  function rr(e, n, t, i, o, r, s = !1, d, a = Ee) {
    let c = a.filter((g) => t[g] < Te && !i[g].has(n));
    if (c.length === 0) return;
    let l = Ua(n, o);
    if (l.hasSensitiveAutocomplete || Un(n, !0, r)) return;
    let u = d === void 0 ? l.hints : [...l.hints, B(d)];
    if (u.some((g) => Pe.test(g) || On.test(g) || he.test(g) || Nn.test(g))) return;
    let h = !Er(u) && !u.some(vr),
      m = c.filter((g) => (!H(g) || h) && u.some((E) => Kn(E, g)));
    if (m.length === 0) return;
    let v = n.textContent,
      f = s || yr(u);
    for (let g of m) (i[g].add(n), (t[g] += 1), Pr(e, Pt(v, g, f), "html", g));
  }
  function Ba(e, n, t, i, o, r, s) {
    var u;
    let d = (h, m) => {
      r.has(h) || (rr(n, h, t, i, o, m, !1, void 0, Ye), r.add(h));
    };
    typeof e.matches == "function" && e.matches(fi) && d(e);
    let a = e.querySelectorAll(fi);
    for (let h = 0; h < a.length && Ye.some((m) => t[m] < Te); h += 1) d(a[h], e);
    if (s === 0 || !Ye.some((h) => t[h] < Te)) return s;
    let c = e.querySelectorAll(Qo),
      l = 0;
    for (let h = 0; h < c.length && s > 0 && l < ha && Ye.some((m) => t[m] < Te); h += 1) {
      s -= 1;
      let m = c[h];
      if (Un(m, !0, e)) continue;
      let v = m.textContent;
      if (typeof v != "string" || v.length > pn) continue;
      let f = B(v);
      if (Pe.test(f) || On.test(f) || he.test(f) || Nn.test(f)) continue;
      let g = Ye.filter((S) => t[S] < Te && Kn(f, S)),
        E = m.parentElement,
        M = (u = m.nextElementSibling) != null ? u : E && E !== e ? E.nextElementSibling : null;
      g.length === 0 || !M || ((l += 1), rr(n, M, t, i, o, e, _n(f), f, g));
    }
    return s;
  }
  function qa(e) {
    var r, s, d;
    if (typeof document == "undefined" || typeof document.querySelectorAll != "function") return [];
    let n = [],
      t = [],
      i = !1,
      o = Fe(() => 0);
    try {
      let a = document.querySelectorAll("input, select, textarea"),
        c = new Map(),
        l = new WeakMap();
      for (let E = 0; E < a.length && Ee.some((M) => o[M] < Te); E += 1) {
        let M = a[E];
        if (!M || typeof M.tagName != "string" || typeof M.type != "string") continue;
        let S = `${M.tagName.toLowerCase()}:${M.type.toLowerCase()}`,
          P = (r = c.get(S)) != null ? r : 0;
        if (P >= cr || (M.form && e.has(M.form))) continue;
        let T = Le(M);
        if (!T) continue;
        let _ = (s = T.form) != null ? s : void 0;
        if (_) {
          let N = l.get(_);
          if ((N === void 0 && ((N = Un(_)), l.set(_, N)), N)) continue;
        }
        let y = _ ? Bn(_) : {},
          b = (d = y.intent) != null ? d : "";
        if (Pi(_ != null ? _ : T, b) || Un(T, !1, _)) continue;
        c.set(S, P + 1);
        let F = Ln(T, !1);
        if (!F) continue;
        let z = jn(F);
        if (_) {
          z.some((N) => pi(F, N)) && e.set(_, y);
          continue;
        }
        let I,
          C = !1,
          A = Hn(F),
          L = z.filter((N) => Sa.includes(N));
        for (let N of L) {
          if (o[N] >= Te || !pi(F, N)) continue;
          C || ((I = T.value), (C = !0));
          let O = Mr(Pt(I, N, A), "html", N, T);
          O &&
            (!i && N === "city" && Ir(F) ? (n.unshift(O), (i = !0)) : (A ? t : n).push(O),
            (o[N] += 1));
        }
      }
      let u = new Set(),
        h = Fe(() => new Set()),
        m = new WeakMap(),
        v = new Set(),
        f = ga,
        g = pa;
      for (let E of [Wo, Yo]) {
        if (f === 0 || !Ye.some((S) => o[S] < Te)) break;
        let M = document.querySelectorAll(E);
        for (let S = 0; S < M.length && f > 0 && Ye.some((P) => o[P] < Te); S += 1) {
          f -= 1;
          let P = xa(M[S]);
          !P || u.has(P) || (u.add(P), (g = Ba(P, n, o, h, m, v, g)));
        }
      }
    } catch (a) {}
    return (n.some(({ kind: a }) => ee(a)) || n.push(...t), n);
  }
  function Va(e) {
    if (!De() || typeof window == "undefined") return [];
    let n = [];
    for (let t of Ha()) (t === Ae && t === _t) || (n.push(...Da(t)), t === Ae && (_t = t));
    return (n.push(...La()), n.push(...qa(e)), n);
  }
  function ae(e) {
    return `${e.primary}:${e.secondary}:${e.length}`;
  }
  function ki(e, n) {
    let t = Q(e, n);
    if (e.ignoredMerchantHashes[n] !== t) {
      if ((e.ignoredFingerprints[n].clear(), (e.ignoredMerchantHashes[n] = t), n === "phone")) {
        (e.merchantPhoneProbeSources.clear(), e.retryableMerchantPhoneProbes.clear());
        for (let o of e.detachedMerchantPhoneProbeTasks.values()) o.pending = void 0;
        e.detachedMerchantPhoneProbeTasks.clear();
      }
      let i = e.merchantPhoneSupplement;
      n === "phone" &&
        i &&
        i.merchantHashSignature !== t &&
        ((i.task.merchantPhoneProbeSignature = void 0), (e.merchantPhoneSupplement = void 0));
    }
    return e.ignoredFingerprints[n];
  }
  function $n(e) {
    (e.formInputs.size === 0 && e.sources.delete("form"),
      (e.source = D.find((n) => e.sources.has(n))));
  }
  function Ai(e, n, t, i, o) {
    let r = e.merchantPhoneSupplement;
    if (!(n !== "phone" || !r || r.merchantHashSignature !== Q(e, n) || r.fingerprint !== ae(t))) {
      if (i === "form") {
        if (!o) return;
        r.formInputs.add(o);
      }
      return (r.sources.add(i), $n(r), r);
    }
  }
  function Ti(e, n, t, i, o = !1) {
    var d;
    let r = e.find((a) => a.task === n.task);
    if (r) {
      if ((t === "form" && i && ((d = r.inputs) == null || d.add(i)), o)) {
        let a = e.indexOf(r);
        a > 0 && (e.splice(a, 1), e.unshift(r));
      }
      return;
    }
    let s =
      t === "form" ? { task: n.task, inputs: new Set(i ? [i] : n.formInputs) } : { task: n.task };
    o ? e.unshift(s) : e.push(s);
  }
  function re(e, n, t) {
    let i = e.candidatesBySource[n];
    e.candidatesBySource[n] = t;
    let o = new Set(i.filter((s) => !t.includes(s)).map((s) => s.task)),
      r = new Set();
    for (let s of o)
      D.some((a) => e.candidatesBySource[a].some((c) => c.task === s))
        ? Pa(e, s)
        : (s.kind === "phone" && s.pending !== void 0 && Xe(e, "phone") !== void 0
            ? e.detachedMerchantPhoneProbeTasks.set(ae(s.fingerprint), s)
            : (s.pending = void 0),
          r.add(s.kind));
    r.size > 0 &&
      Promise.resolve().then(() => {
        e.active && Z(e.pixelId) === e && ke(e, r);
      });
  }
  function pt(e, n) {
    n.source ||
      ((n.task.merchantPhoneProbeSignature = void 0),
      e.ignoredFingerprints.phone.delete(n.fingerprint),
      e.merchantPhoneProbeSources.delete(n.fingerprint),
      e.retryableMerchantPhoneProbes.delete(n.fingerprint),
      (e.merchantPhoneSupplement = void 0));
  }
  function za(e, n) {
    var r, s;
    let t = e.merchantPhoneSupplement;
    if (!t || !t.formInputs.delete(n)) return;
    let i = e.candidatesBySource.form,
      o = i.find((d) => d.task === t.task);
    ((r = o == null ? void 0 : o.inputs) == null || r.delete(n),
      ((s = o == null ? void 0 : o.inputs) == null ? void 0 : s.size) === 0 &&
        re(
          e,
          "form",
          i.filter((d) => d !== o),
        ),
      $n(t),
      pt(e, t));
  }
  function Ka(e) {
    let n = e.merchantPhoneSupplement;
    !n || n.formInputs.size === 0 || (n.formInputs.clear(), $n(n));
  }
  function se(e) {
    var n, t, i, o;
    for (let r of Ee) {
      let s = new Set();
      for (let S of D) for (let P of e.candidatesBySource[S]) P.task.kind === r && s.add(P.task);
      let d = yn(e, r),
        a = new Set(d),
        c = Q(e, r),
        l = ki(e, r),
        u = new Set(d),
        h = e.merchantPhoneSupplement;
      r === "phone" &&
        h &&
        h.merchantHashSignature === Q(e, r) &&
        h.wireValue &&
        u.add(h.wireValue);
      let m = new Set(),
        v = new Set(),
        f = 0,
        g = Ei(e.pixelId, r),
        E = Math.max(0, ye(r) - (d.length > 0 ? 1 : 0) - g);
      for (let S of D) {
        let P = e.candidatesBySource[S];
        if (S === "js") {
          let _ = P.findIndex((y) => {
            var b;
            return (
              y.task.kind === r &&
              y.deferredNewest === !0 &&
              (y.task.merchantPhoneProbeSignature !== c ||
                ((b = e.merchantPhoneSupplement) == null ? void 0 : b.merchantHashSignature) === c)
            );
          });
          if (_ >= 0) {
            P = [...P];
            let [y] = P.splice(_, 1);
            ((y.deferredNewest = void 0), P.unshift(y));
          }
        }
        let T = [];
        for (let _ of P) {
          if (_.task.kind !== r) {
            T.push(_);
            continue;
          }
          let y = (n = _.task.wireValues) != null ? n : [],
            b = ae(_.task.fingerprint);
          _.task.merchantPhoneProbeSignature !== void 0 &&
            (r !== "phone" ||
              _.task.merchantPhoneProbeSignature !== c ||
              ((t = e.merchantPhoneSupplement) == null ? void 0 : t.merchantHashSignature) === c) &&
            (_.task.merchantPhoneProbeSignature = void 0);
          let F = !1;
          if (y.some((I) => a.has(I))) {
            if (r === "phone" && y.length < 2 && _.task.pending !== void 0 && c) {
              ((_.task.merchantPhoneProbeSignature = c),
                T.push(_),
                m.add(b),
                v.add(_.task),
                (f += 1));
              continue;
            }
            if (
              r === "phone" &&
              (d.length === 1 || d.length === 2) &&
              (y.length === 1 || y.length === 2)
            ) {
              let I = y.filter((O) => !a.has(O)),
                C = d.length === 1 && I.length === 1 ? I[0] : void 0,
                A = d.length === 2 && I.length === 0,
                L = y.length === 1 && _.task.pending === void 0 && I.length === 0,
                N = Q(e, r);
              if ((C || A || L) && N) {
                let O = e.merchantPhoneSupplement;
                if (O && O.merchantHashSignature === N && O.wireValue === C) {
                  if ((O.sources.add(S), S === "form"))
                    for (let K of (i = _.inputs) != null ? i : []) O.formInputs.add(K);
                  $n(O);
                } else if (
                  !O ||
                  O.merchantHashSignature !== N ||
                  O.source === void 0 ||
                  D.indexOf(S) < D.indexOf(O.source)
                ) {
                  let K = new Set();
                  if (S === "form") for (let ce of (o = _.inputs) != null ? o : []) K.add(ce);
                  e.merchantPhoneSupplement = {
                    fingerprint: b,
                    formInputs: K,
                    merchantHashSignature: N,
                    source: S,
                    sources: new Set([S]),
                    task: _.task,
                    wireValue: C,
                  };
                }
                let k = e.merchantPhoneSupplement;
                (k == null ? void 0 : k.task) === _.task &&
                  (k.wireValue && u.add(k.wireValue), (F = !0));
              }
            }
            (l.add(b), F && (T.push(_), m.add(b), v.add(_.task)));
            continue;
          }
          if (m.has(b) || y.some((I) => u.has(I))) {
            v.has(_.task) && T.push(_);
            continue;
          }
          if (
            r === "phone" &&
            c !== void 0 &&
            _.task.merchantPhoneProbeSignature === c &&
            _.task.pending !== void 0
          ) {
            (T.push(_), m.add(b), v.add(_.task), (f += 1));
            continue;
          }
          if (
            r === "phone" &&
            c !== void 0 &&
            _.task.merchantPhoneProbeSignature === c &&
            E === 0
          ) {
            if (f > 0) {
              (T.push(_), m.add(b), v.add(_.task));
              for (let I of y) u.add(I);
            }
            continue;
          }
          let z =
            r === "phone" &&
            E === 0 &&
            _.task.pending !== void 0 &&
            _.task.merchantPhoneProbeSignature === void 0
              ? Xe(e, r)
              : void 0;
          if (z !== void 0 && hn(e, z, _.task.fingerprint, S, T, !0)) {
            ((_.task.merchantPhoneProbeSignature = z),
              Fn(e, _.task.fingerprint, S),
              T.push(_),
              m.add(b),
              v.add(_.task));
            for (let I of y) u.add(I);
            f += 1;
            continue;
          }
          if (E === 0 && (g > 0 || f > 0)) {
            T.push(_);
            continue;
          }
          if (E !== 0) {
            ((_.task.merchantPhoneProbeSignature = void 0), T.push(_), m.add(b), v.add(_.task));
            for (let I of y) u.add(I);
            (_.task.pending !== void 0 && (f += 1), (E -= 1));
          }
        }
        re(e, S, T);
      }
      let M = new Set();
      for (let S of D) for (let P of e.candidatesBySource[S]) P.task.kind === r && M.add(P.task);
      for (let S of s)
        !M.has(S) &&
          ![...e.detachedMerchantPhoneProbeTasks.values()].includes(S) &&
          (S.pending = void 0);
    }
  }
  function wi(e, n, t, i, o = !1) {
    let r = D.indexOf(n);
    for (let d = 0; d < D.length; d += 1) {
      let a = D[d];
      if (e.candidatesBySource[a].find((l) => l.task.kind === t && _e(l.task.fingerprint, i)))
        return d >= r;
    }
    let s = Xe(e, t);
    return s && pr(e) >= Dn
      ? !1
      : Ci(e, t) > 0 ||
          (s && (It(e, s, t, i) !== void 0 || hn(e, s, i, n))) ||
          (o && e.candidatesBySource[n].some((d) => d.task.kind === t))
        ? !0
        : D.slice(r + 1).some((d) => e.candidatesBySource[d].some((a) => a.task.kind === t));
  }
  function sr(e, n) {
    for (let t of D) {
      let i = e.candidatesBySource[t],
        o = i.filter((r) => r.task !== n);
      o.length !== i.length && re(e, t, o);
    }
    e.active && se(e);
  }
  function kt(e, n, t) {
    for (let i of D)
      for (let o of e.candidatesBySource[i])
        if (o.task.kind === n && _e(o.task.fingerprint, t)) return o.task;
    if (n === "phone") {
      let i = ae(t),
        o = e.detachedMerchantPhoneProbeTasks.get(i);
      if (o) return (e.detachedMerchantPhoneProbeTasks.delete(i), o);
    }
  }
  function ke(e, n) {
    let t = new Set();
    for (let [i, o] of e.pendingEvidenceRetries) o.evidence.some((r) => n.has(r.kind)) && t.add(i);
    for (let [i, o] of e.pendingFormRetries)
      Array.from(o.values()).some((r) => Array.from(r.kinds).some((s) => n.has(s))) && t.add(i);
    se(e);
    for (let i of t) (hi(e, i), yi(e, i));
  }
  function kr(e, n, t, i) {
    let o = ki(e, n),
      r = ae(i);
    if (o.has(r)) return;
    if (H(n)) return { kind: n, fingerprint: i, wireValues: [t] };
    let s = zn(n).field,
      d = { kind: n, fingerprint: i },
      a = e.stateGeneration,
      c;
    if (
      ((c = at(
        { [s]: t },
        n === "phone"
          ? (u, h) => {
              !h.hash ||
                !e.active ||
                Z(e.pixelId) !== e ||
                e.stateGeneration !== a ||
                d.pending !== c ||
                ((d.wireValues = Array.from(
                  new Set([h.hash, h.phoneNumberWithPlusHash].filter((m) => m !== void 0)),
                )),
                (d.phoneWireValues = {
                  digitsHash: h.hash,
                  leadingPlusHash: h.phoneNumberWithPlusHash,
                }),
                ke(e, new Set([n])));
            }
          : void 0,
      ).pending),
      !!c)
    )
      return (
        (d.pending = c),
        n === "phone" &&
          e.merchantPhoneProbeSources.has(r) &&
          e.retryableMerchantPhoneProbes.delete(r),
        c.then(
          (u) => {
            var f, g;
            if (!e.active || Z(e.pixelId) !== e || e.stateGeneration !== a || d.pending !== c)
              return;
            d.pending = void 0;
            let h = u == null ? void 0 : u[s],
              m = n === "phone" ? [h, u == null ? void 0 : u.phone_number_with_plus_sha256] : [h],
              v = Array.from(new Set(m.filter((E) => E !== void 0)));
            if (v.length === 0) {
              let E = n === "phone" && e.detachedMerchantPhoneProbeTasks.get(r) === d;
              if (
                (E && e.detachedMerchantPhoneProbeTasks.delete(r),
                ((g = (f = d.wireValues) == null ? void 0 : f.length) != null ? g : 0) > 0)
              ) {
                (E && e.retryableMerchantPhoneProbes.add(r), ke(e, new Set([n])));
                return;
              }
              (o.add(r), sr(e, d), ke(e, new Set([n])));
              return;
            }
            if (
              ((d.wireValues = v),
              n === "phone" &&
                h &&
                (d.phoneWireValues = {
                  digitsHash: h,
                  leadingPlusHash: u == null ? void 0 : u.phone_number_with_plus_sha256,
                }),
              n === "phone" && e.detachedMerchantPhoneProbeTasks.get(r) === d)
            ) {
              let E =
                d.merchantPhoneProbeSignature !== void 0 &&
                d.merchantPhoneProbeSignature === Q(e, n);
              ((v.length < 2 || !E) && e.detachedMerchantPhoneProbeTasks.delete(r),
                v.length < 2 && E && e.retryableMerchantPhoneProbes.add(r));
            }
            ke(e, new Set([n]));
          },
          () => {
            var u, h, m, v;
            if (e.active && Z(e.pixelId) === e && e.stateGeneration === a && d.pending === c) {
              if (
                ((d.pending = void 0),
                n === "phone" &&
                  ((h = (u = d.wireValues) == null ? void 0 : u.length) != null ? h : 0) < 2 &&
                  e.detachedMerchantPhoneProbeTasks.get(r) === d &&
                  (e.detachedMerchantPhoneProbeTasks.delete(r),
                  e.retryableMerchantPhoneProbes.add(r)),
                ((v = (m = d.wireValues) == null ? void 0 : m.length) != null ? v : 0) > 0)
              ) {
                ke(e, new Set([n]));
                return;
              }
              (o.add(r), sr(e, d), ke(e, new Set([n])));
            }
          },
        ),
        d
      );
  }
  function Ar(e, n, t = []) {
    var r;
    let i = new Set();
    for (let s of t) s.task.kind === n && s.task.pending !== void 0 && i.add(s.task.pending);
    for (let s of D)
      for (let d of e.candidatesBySource[s])
        d.task.kind === n && d.task.pending !== void 0 && i.add(d.task.pending);
    if (n === "phone")
      for (let s of e.detachedMerchantPhoneProbeTasks.values())
        s.pending !== void 0 && i.add(s.pending);
    let o = q(e.pixelId);
    if (bt(n) && o != null && o.userHashingPendingCounts[n]) {
      let s = (r = o.userHashingPendingPromises) == null ? void 0 : r[n];
      s && i.add(s);
    }
    return i;
  }
  function ja(e, n, t) {
    let i = Ar(e, n.kind);
    for (let o of i) {
      let r = e.pendingEvidenceRetries.get(o);
      if (r) {
        if (r.evidence.some((s) => s.source === n.source && s.kind === n.kind && s.raw === n.raw))
          return;
        t
          ? (r.evidence.unshift(n),
            (r.evidence.length = Math.min(r.evidence.length, ye(n.kind))),
            (r.preferNewest = !0))
          : r.evidence.length < ye(n.kind) && r.evidence.push(n);
        return;
      }
      (e.pendingEvidenceRetries.set(o, { evidence: [n], preferNewest: t }),
        o.then(
          () => hi(e, o),
          () => hi(e, o),
        ));
      return;
    }
  }
  function hi(e, n) {
    let t = e.pendingEvidenceRetries.get(n);
    (e.pendingEvidenceRetries.delete(n),
      t && e.active && Z(e.pixelId) === e && Qe() && (se(e), Ct(e, t.evidence, t.preferNewest)));
  }
  function _i(e, n, t, i, o = []) {
    var s, d, a, c, l, u;
    let r = Ar(e, t, o);
    for (let h of r) {
      let m = e.pendingFormRetries.get(h);
      if (m) {
        let v = (d = (s = Le(n)) == null ? void 0 : s.form) != null ? d : n,
          f =
            (c = m.get(n)) != null
              ? c
              : (a = Array.from(m.entries()).find(([g]) => {
                    var E, M;
                    return ((M = (E = Le(g)) == null ? void 0 : E.form) != null ? M : g) === v;
                  })) == null
                ? void 0
                : a[1];
        if (f)
          (f.kinds.add(t),
            i &&
              (!f.options || i.passive !== !0) &&
              (f.options = Object.assign({}, f.options, i, {
                inferredNameExclusion:
                  ((l = f.options) == null ? void 0 : l.inferredNameExclusion) === !0 ||
                  i.inferredNameExclusion === !0,
                passive: ((u = f.options) == null ? void 0 : u.passive) === !0 && i.passive === !0,
              })));
        else {
          let g = 0;
          for (let E of m.values()) E.kinds.has(t) && (g += 1);
          if (g >= ye(t) && e.latestMatchingFormOwners[t] === v) {
            for (let [E, M] of m)
              if (M.kinds.has(t)) {
                (M.kinds.delete(t), M.kinds.size === 0 && m.delete(E), (g -= 1));
                break;
              }
          }
          g < ye(t) && m.set(n, { kinds: new Set([t]), options: i ? me({}, i) : void 0 });
        }
        return;
      }
      (e.pendingFormRetries.set(
        h,
        new Map([[n, { kinds: new Set([t]), options: i ? me({}, i) : void 0 }]]),
      ),
        h.then(
          () => yi(e, h),
          () => yi(e, h),
        ));
      return;
    }
  }
  function yi(e, n) {
    var i, o, r, s;
    let t = e.pendingFormRetries.get(n);
    if ((e.pendingFormRetries.delete(n), !(!t || !e.active || Z(e.pixelId) !== e || !Qe()))) {
      se(e);
      for (let [d, a] of t) {
        let c = Le(d),
          l = (i = c == null ? void 0 : c.form) != null ? i : d,
          u = new Set(
            Array.from(a.kinds).filter((f) => {
              var E;
              if (((E = a.options) == null ? void 0 : E.passive) === !0) return !0;
              let g = e.latestMatchingFormOwners[f];
              return g === void 0 || g === l;
            }),
          );
        if (u.size === 0) continue;
        let h = e.activeMatchingForm,
          m = e.latestMatchingFormOwner,
          v = ((o = a.options) == null ? void 0 : o.passive) !== !0 && m !== void 0 && m !== l;
        try {
          c != null && c.form
            ? He(e, c.form, (r = a.options) != null ? r : {}, u)
            : c
              ? Fr(e, c, u)
              : He(e, d, (s = a.options) != null ? s : { passive: !0 }, u);
        } finally {
          v && ((e.activeMatchingForm = h), (e.latestMatchingFormOwner = m));
        }
      }
    }
  }
  function Tr(e, n) {
    let t = Z(e);
    !(t != null && t.active) || Z(e) !== t || n === "externalId" || ke(t, new Set([n]));
  }
  function wr(e) {
    let n = Z(e);
    !(n != null && n.active) || Z(e) !== n || ke(n, new Set(ya));
  }
  function Ct(e, n, t = !1) {
    let i = new Map();
    for (let o of n)
      H(o.kind) && o.geographyBundle && !i.has(o.source) && i.set(o.source, o.geographyBundle);
    for (let [o, r] of i) {
      let s = e.candidatesBySource[o];
      s.some((d) => H(d.task.kind) && d.geographyBundle !== r) &&
        re(
          e,
          o,
          s.filter((d) => !H(d.task.kind)),
        );
    }
    for (let o of n) {
      if (H(o.kind) && (!o.geographyBundle || i.get(o.source) !== o.geographyBundle)) continue;
      let r = e.candidatesBySource[o.source],
        s = mn(o.raw),
        d = ki(e, o.kind),
        a = Ai(e, o.kind, s, o.source);
      if (
        (a && Ti(r, a, o.source, void 0, t),
        d.has(ae(s)) || r.find((m) => m.task.kind === o.kind && _e(m.task.fingerprint, s)))
      )
        continue;
      let l = kt(e, o.kind, s);
      if (l) {
        let m = { task: l };
        (o.kind === "phone" &&
          l.merchantPhoneProbeSignature === Q(e, o.kind) &&
          Si(e, l.fingerprint, o.source),
          H(o.kind) && o.geographyBundle && (m.geographyBundle = o.geographyBundle),
          t && o.source === "js" && l.merchantPhoneProbeSignature === void 0
            ? r.unshift(m)
            : (t && o.source === "js" && (m.deferredNewest = !0), r.push(m)),
          se(e));
        continue;
      }
      if (!wi(e, o.source, o.kind, s, t && H(o.kind))) {
        ja(e, o, t);
        continue;
      }
      let u = Ci(e, o.kind) === 0 ? Xe(e, o.kind) : void 0,
        h = kr(e, o.kind, o.raw, s);
      if (h) {
        let m = u !== void 0 && (It(e, u, o.kind, s) !== void 0 || hn(e, u, s, o.source, r)),
          v = { task: h };
        (m &&
          ((h.merchantPhoneProbeSignature = u),
          Fn(e, s, o.source),
          t && o.source === "js" && (v.deferredNewest = !0)),
          H(o.kind) && o.geographyBundle && (v.geographyBundle = o.geographyBundle),
          t && o.source === "js" && !m ? r.unshift(v) : r.push(v),
          se(e));
      }
    }
  }
  function vi() {
    try {
      Ae && Ae.push === yt && (gt ? Object.defineProperty(Ae, "push", gt) : delete Ae.push);
    } catch (e) {}
    ((Ae = void 0), (_t = void 0), (yt = void 0), (gt = void 0));
  }
  function ar(e) {
    try {
      return window.dataLayer === e;
    } catch (n) {
      return !1;
    }
  }
  function Ga() {
    if (!De() || typeof window == "undefined") return;
    let e = window.dataLayer;
    if (!Array.isArray(e)) {
      vi();
      return;
    }
    let n = e;
    if (Ae === n && n.push === yt) return;
    vi();
    let t = n.push;
    if (typeof t != "function") return;
    let i = Object.getOwnPropertyDescriptor(n, "push"),
      o = function (...r) {
        if (!De() || this !== n || !ar(n)) return t.apply(this, r);
        let s = t.apply(this, r);
        if (!De() || !ar(n)) return s;
        try {
          if (!Qe()) return s;
          let d = [],
            a = Math.max(0, r.length - Vn);
          for (let c = a; c < r.length; c += 1) d.push(...gn(r[c]));
          if (d.length === 0) return s;
          for (let c of fe.values()) c.active && Ct(c, d, !0);
        } catch (d) {}
        return s;
      };
    try {
      if (((n.push = o), n.push !== o)) return;
      ((Ae = n), (yt = o), (gt = i));
    } catch (r) {}
  }
  function $a(e, n = Ee) {
    (re(
      e,
      "form",
      e.candidatesBySource.form.filter((t) => !n.includes(t.task.kind)),
    ),
      e.candidatesBySource.form.length === 0 && (e.activeMatchingForm = void 0));
  }
  function Nr(e, n) {
    let t = e.candidatesBySource.form.filter((i) => {
      var s;
      let o = i.task.kind;
      if (!ee(o) || (n !== void 0 && i.nameOwner !== n)) return !0;
      let r = new Set();
      for (let d of (s = i.inputs) != null ? s : []) {
        let a = Le(d),
          c = a ? Ln(a, !1) : void 0;
        c && jn(c).includes(o) && br(c, o) && r.add(d);
      }
      return ((i.inputs = r), r.size > 0);
    });
    (re(e, "form", t), e.candidatesBySource.form.length === 0 && (e.activeMatchingForm = void 0));
  }
  function Ni(e, n, t, i) {
    var o;
    return Object.assign(
      { task: e, inputs: new Set([t]) },
      ee(n) ? { nameOwner: (o = t.form) != null ? o : void 0 } : {},
      H(n) && i ? { geographyBundle: i } : {},
    );
  }
  function Or(e, n, t, i, o, r, s) {
    var a;
    let d = (a = kt(e, n, o)) != null ? a : kr(e, n, t, o);
    if (d) return (s && (d.merchantPhoneProbeSignature = s), Ni(d, n, i, r));
  }
  function Rr(e, n, t, i = Ee, o = !0, r, s = t) {
    var P, T;
    let d =
        i.some(H) || n.some(({ kind: _ }) => H(_)) ? Array.from(new Set([...i, ...vt])) : [...i],
      a = e.merchantPhoneSupplement,
      c = o && d.includes("phone") && a ? new Set(a.formInputs) : void 0;
    o && d.includes("phone") && Ka(e);
    let l = new Set(n.map(({ kind: _ }) => _));
    if (n.some(({ kind: _ }) => H(_))) for (let _ of vt) l.add(_);
    let u = o
        ? e.candidatesBySource.form.flatMap((_) => {
            if (!d.includes(_.task.kind)) return [_];
            if (l.has(_.task.kind) || !_.inputs) return [];
            let y = new Set([..._.inputs].filter((b) => !mi(b, t)));
            return y.size === 0
              ? []
              : y.size === _.inputs.size
                ? [_]
                : [Object.assign({}, _, { inputs: y })];
          })
        : [...e.candidatesBySource.form],
      h = u.length,
      m = !1,
      v = !1,
      f = Fe(
        (_) =>
          u.filter((y) => {
            var b;
            return (
              y.task.kind === _ &&
              y.task.merchantPhoneProbeSignature === void 0 &&
              y.task !== ((b = e.merchantPhoneSupplement) == null ? void 0 : b.task)
            );
          }).length,
      ),
      g = Fe((_) => Math.max(0, ye(_) - (yn(e, _).length > 0 ? 1 : 0) - Ei(e.pixelId, _))),
      E = Xe(e, "phone"),
      M = E !== void 0 && u.some((_) => _.task.merchantPhoneProbeSignature === E);
    for (let _ = 0; _ < n.length; _ += 1) {
      let y = n[_],
        b = mn(y.normalized),
        F = n.slice(_ + 1).filter((k) => k.kind === y.kind && !_e(mn(k.normalized), b)).length,
        z = Ai(e, y.kind, b, "form", y.input);
      if (z) {
        (Ti(u, z, "form", y.input), (m = !0));
        continue;
      }
      let I = u.find((k) => k.task.kind === y.kind && _e(k.task.fingerprint, b));
      if (I) {
        ((P = I.inputs) == null || P.add(y.input), (m = !0));
        continue;
      }
      let C = kt(e, y.kind, b);
      if (C) {
        (u.push(Ni(C, y.kind, y.input, t)), (m = !0));
        let k = C.merchantPhoneProbeSignature;
        k !== void 0 && k === Q(e, y.kind)
          ? (Si(e, C.fingerprint, "form"), (M = !0))
          : y.kind === "phone" &&
              C.pending !== void 0 &&
              E !== void 0 &&
              (f[y.kind] >= g[y.kind] || F === g[y.kind] - f[y.kind]) &&
              !M &&
              hn(e, E, C.fingerprint, "form", u, !0)
            ? ((C.merchantPhoneProbeSignature = E), Fn(e, C.fingerprint, "form"), (M = !0))
            : C !== ((T = e.merchantPhoneSupplement) == null ? void 0 : T.task) && (f[y.kind] += 1);
        continue;
      }
      let A = y.kind === "phone" ? Q(e, y.kind) : void 0,
        L = A === void 0 ? void 0 : It(e, A, y.kind, b),
        N =
          y.kind === "phone" &&
          (L !== void 0 ||
            (f[y.kind] >= g[y.kind] && E !== void 0 && !M && hn(e, E, b, "form", u)));
      if (f[y.kind] >= g[y.kind] && !N) {
        (_i(e, s, y.kind, r, u), (v = !0));
        continue;
      }
      if (!N && !wi(e, "form", y.kind, b, !0)) {
        (_i(e, s, y.kind, r, u), (v = !0));
        continue;
      }
      let O = Or(e, y.kind, y.normalized, y.input, b, t, N ? A : void 0);
      O && (u.push(O), (m = !0), N ? ((M = !0), Fn(e, b, "form")) : (f[y.kind] += 1));
    }
    if (!(m || u.length > h)) {
      if (o && e.activeMatchingForm !== t) {
        let _ = !1,
          y = e.candidatesBySource.form.filter((b) => {
            if (!d.includes(b.task.kind) || !b.inputs) return !0;
            for (let F of [...b.inputs]) mi(F, t) && (b.inputs.delete(F), (_ = !0));
            return b.inputs.size > 0;
          });
        if (
          (y.length !== e.candidatesBySource.form.length && (_ = !0),
          _ && re(e, "form", y),
          a && c != null && c.size && e.merchantPhoneSupplement === a)
        ) {
          for (let b of c) mi(b, t) || a.formInputs.add(b);
          (a.formInputs.size > 0 ? a.sources.add("form") : a.sources.delete("form"),
            $n(a),
            pt(e, a));
        }
        return (_ && se(e), v);
      }
      return o
        ? (re(e, "form", u),
          a && e.merchantPhoneSupplement === a && pt(e, a),
          (e.activeMatchingForm = u.length > 0 ? t : void 0),
          se(e),
          !0)
        : v;
    }
    return (
      re(e, "form", u),
      a && e.merchantPhoneSupplement === a && pt(e, a),
      (o || !e.activeMatchingForm) && (e.activeMatchingForm = t),
      se(e),
      !0
    );
  }
  function Le(e) {
    if (!e || typeof e != "object") return;
    let n = e;
    if (
      typeof n.tagName != "string" ||
      !qn.has(n.tagName.toLowerCase()) ||
      typeof n.getAttribute != "function"
    )
      return;
    let t = n;
    return typeof t.type == "string" ? t : void 0;
  }
  function mi(e, n) {
    if (e === n) return !0;
    let t = Le(e);
    if (!t) return !1;
    if (t.form) return t.form === n;
    if ("contains" in n && typeof n.contains == "function")
      try {
        return n.contains(t);
      } catch (i) {
        return !1;
      }
    return !1;
  }
  function Dr(e, n = jn(e)) {
    let t = Hn(e),
      i = [];
    for (let o of n) {
      let r = Pt(e.value, o, t),
        s = r === void 0 ? void 0 : zn(o).normalize(r);
      if (s) {
        if ((i.push({ kind: o, normalized: s }), !t || !ee(o))) break;
      } else if (o === "email" && Gn(e)) break;
    }
    return i;
  }
  function Fr(e, n, t) {
    var P, T, _, y, b, F, z;
    let i = Le(n);
    if (!i) return;
    let o = (P = i.form) != null ? P : void 0,
      r = o != null ? o : i,
      s = o ? Bn(o) : void 0,
      d = t === void 0 || t.has("firstName") || t.has("lastName");
    if ((o && s && d && Cr(e, o, s) && Nr(e), Pi(r))) {
      o && s && He(e, o, s, t);
      return;
    }
    let a = Ln(i, !1);
    if (!a) return;
    let c = jn(a).filter((I) => t === void 0 || t.has(I)),
      l = c.some(H),
      u = e.candidatesBySource.form.some((I) => {
        var C;
        return ee(I.task.kind) && ((C = I.inputs) == null ? void 0 : C.has(i));
      }),
      h = e.activeMatchingForm,
      m =
        h !== void 0 &&
        h !== i &&
        "contains" in h &&
        typeof h.contains == "function" &&
        h.contains(i),
      v = o != null ? o : m ? h : void 0;
    if (v && (u || c.some((I) => ee(I)) || l)) {
      He(e, v, s != null ? s : Bn(v), t);
      return;
    }
    let f = [];
    if (c.length > 0)
      try {
        ((a.value = i.value), (f = Dr(a, c)));
      } catch (I) {
        f = [];
      }
    let g = f.some(({ kind: I, normalized: C }) => {
      var A;
      return (
        I === "phone" &&
        ((A = e.merchantPhoneSupplement) == null ? void 0 : A.fingerprint) === ae(mn(C))
      );
    });
    if (
      ((t === void 0 || t.has("phone")) && !g && za(e, i),
      xn(a) &&
        ((f = f.filter(({ kind: I, normalized: C }) => {
          var O;
          if (
            !e.candidatesBySource.form.find((k) => {
              var K;
              return (
                k.task.kind === I &&
                Array.from((K = k.inputs) != null ? K : []).some((ce) => {
                  let Ne = Ln(ce, !1);
                  return Ne !== void 0 && !xn(Ne);
                })
              );
            })
          )
            return !0;
          let L = mn(C),
            N = e.candidatesBySource.form.find(
              (k) => k.task.kind === I && _e(k.task.fingerprint, L),
            );
          return ((O = N == null ? void 0 : N.inputs) == null || O.add(i), !1);
        })),
        f.length === 0))
    )
      return;
    let E = new Set(f.map(({ kind: I }) => I));
    for (let I of [...e.candidatesBySource.form])
      (t === void 0 || t.has(I.task.kind)) &&
        (T = I.inputs) != null &&
        T.has(i) &&
        !E.has(I.task.kind) &&
        (I.inputs.delete(i),
        I.inputs.size === 0 &&
          re(
            e,
            "form",
            e.candidatesBySource.form.filter((C) => C !== I),
          ));
    if (f.length === 0) {
      e.candidatesBySource.form.length === 0 && (e.activeMatchingForm = void 0);
      return;
    }
    let M = e.latestMatchingFormOwner,
      S = new Map(Array.from(E).map((I) => [I, e.latestMatchingFormOwners[I]]));
    e.latestMatchingFormOwner = r;
    for (let { kind: I } of f) e.latestMatchingFormOwners[I] = r;
    if (e.activeMatchingForm !== r || f.some(({ kind: I }) => H(I))) {
      if (
        !Rr(
          e,
          f.map(({ kind: C, normalized: A }) => ({ input: i, kind: C, normalized: A })),
          r,
          Array.from(E),
          !0,
          o ? (s != null ? s : {}) : void 0,
          i,
        )
      ) {
        e.latestMatchingFormOwner = M;
        for (let C of E) e.latestMatchingFormOwners[C] = S.get(C);
      }
      return;
    }
    for (let { kind: I, normalized: C } of f) {
      let A = e.candidatesBySource.form.find((k) => {
          var K;
          return k.task.kind === I && ((K = k.inputs) == null ? void 0 : K.has(i));
        }),
        L = mn(C),
        N = Ai(e, I, L, "form", i);
      if (N) {
        (A &&
          !_e(A.task.fingerprint, L) &&
          ((_ = A.inputs) == null || _.delete(i),
          ((y = A.inputs) != null && y.size) ||
            re(
              e,
              "form",
              e.candidatesBySource.form.filter((k) => k !== A),
            )),
          Ti(e.candidatesBySource.form, N, "form", i));
        continue;
      }
      if (A && _e(A.task.fingerprint, L)) continue;
      A &&
        ((b = A.inputs) == null || b.delete(i),
        ((F = A.inputs) != null && F.size) ||
          re(
            e,
            "form",
            e.candidatesBySource.form.filter((k) => k !== A),
          ));
      let O = e.candidatesBySource.form.find((k) => k.task.kind === I && _e(k.task.fingerprint, L));
      if (O) (z = O.inputs) == null || z.add(i);
      else {
        let k = e.candidatesBySource.form.filter((an) => {
            var lo;
            return (
              an.task.kind === I &&
              an.task.merchantPhoneProbeSignature === void 0 &&
              an.task !== ((lo = e.merchantPhoneSupplement) == null ? void 0 : lo.task)
            );
          }).length,
          K = kt(e, I, L);
        if (K) {
          let an = I === "phone" ? Q(e, I) : void 0;
          (an !== void 0 && K.merchantPhoneProbeSignature === an && Si(e, K.fingerprint, "form"),
            e.candidatesBySource.form.push(Ni(K, I, i)),
            se(e));
          continue;
        }
        let ce = Ci(e, I) === 0 ? Xe(e, I) : void 0,
          Ne = ce !== void 0 && (It(e, ce, I, L) !== void 0 || hn(e, ce, L, "form"));
        if (!(Ne || (k < ye(I) && wi(e, "form", I, L)))) {
          _i(e, i, I, o ? (s != null ? s : {}) : void 0);
          continue;
        }
        let fo = Or(e, I, C, i, L, void 0, Ne ? ce : void 0);
        fo && (Ne && Fn(e, L, "form"), e.candidatesBySource.form.push(fo), se(e));
      }
    }
    e.candidatesBySource.form.length === 0 && (e.activeMatchingForm = void 0);
  }
  function Oi(e) {
    var n, t;
    if (Qe())
      for (let i of fe.values())
        i.active &&
          Fr(i, (t = (n = e.composedPath) == null ? void 0 : n.call(e)[0]) != null ? t : e.target);
  }
  function Lr(e) {
    e.key === "Enter" && Oi(e);
  }
  function He(e, n, t = {}, i) {
    var z, I;
    if (!e.active || !n || typeof n != "object") return;
    let o = n,
      { intent: r = "", passive: s = !1 } = t,
      a = (i === void 0 || i.has("firstName") || i.has("lastName")) && Cr(e, o, t);
    if ((a && !s ? $a(e, ["firstName", "lastName"]) : a && Nr(e, o), Pi(o, r))) return;
    let c, l;
    if ("elements" in n) ((c = n), (l = c.elements));
    else if ("querySelectorAll" in n && typeof n.querySelectorAll == "function")
      l = n.querySelectorAll("input, select, textarea");
    else return;
    if (!l || typeof l.length != "number") return;
    let u = [],
      h = [],
      m = new Set(),
      v = new Set(),
      f = new Set(),
      g = new Map();
    for (let C = 0; C < l.length; C += 1) {
      let A = l[C];
      if (!A || typeof A.tagName != "string" || typeof A.type != "string") continue;
      let L = `${A.tagName.toLowerCase()}:${A.type.toLowerCase()}`,
        N = (z = g.get(L)) != null ? z : 0;
      if (N >= cr) continue;
      let O = Le(A);
      if (!O || (!c && O.form)) continue;
      g.set(L, N + 1);
      for (let R of e.candidatesBySource.form)
        (i === void 0 || i.has(R.task.kind)) &&
          (I = R.inputs) != null &&
          I.has(O) &&
          ((R.task.kind === "email" || R.task.kind === "phone") && m.add(R.task.kind),
          ee(R.task.kind) && v.add(R.task.kind));
      let k = Ln(O, !1);
      if (!k) continue;
      let K = jn(k).filter((R) => i === void 0 || i.has(R));
      for (let R of K)
        ((R === "phone" || (R === "email" && Gn(k))) && m.add(R),
          ee(R) && v.add(R),
          H(R) && f.add(R));
      let ce = K.filter((R) => !ee(R) || !a || br(k, R));
      if (!ce.some((R) => (s ? pi(k, R) : Mi[R](k)))) continue;
      try {
        k.value = O.value;
      } catch (R) {
        continue;
      }
      let Ne = Dr(k, ce);
      for (let R of Ne)
        h.push({
          snapshot: k,
          kind: R.kind,
          normalized: R.normalized,
          confidence: R.kind === "email" ? Ra(k) : R.kind === "city" && Ir(k) ? 3 : 2,
          confirmation: xn(k),
          geographyBundle: H(R.kind) ? o : void 0,
        });
    }
    let E = ba(h);
    E.sort((C, A) => A.confidence - C.confidence);
    let M = E.some(({ kind: C, snapshot: A }) => ee(C) && !Hn(A)),
      S = E.filter((C) => !(M && ee(C.kind) && Hn(C.snapshot))),
      P = new Set();
    for (let C of ["firstName", "lastName"])
      new Set(S.filter((L) => L.kind === C).map((L) => L.normalized)).size > 1 && P.add(C);
    let T = Fe(() => new Set());
    for (let C of S) {
      if (P.has(C.kind)) continue;
      let A = T[C.kind],
        L = C.kind === "phone" ? e.merchantPhoneSupplement : void 0,
        N = L !== void 0 && L.merchantHashSignature === Q(e, C.kind),
        O = ye(C.kind) + (Xe(e, C.kind) || N ? Dn : 0);
      A.size >= O ||
        (C.confirmation && A.size > 0 && !A.has(C.normalized)) ||
        (u.push({ input: C.snapshot.input, kind: C.kind, normalized: C.normalized }),
        C.confirmation || A.add(C.normalized));
    }
    let _ = Array.from(
        new Set([...u.map(({ kind: C }) => C), ...m, ...v, ...P, ...(f.size > 0 ? vt : [])]),
      ),
      y = e.latestMatchingFormOwner,
      b = new Map(_.map((C) => [C, e.latestMatchingFormOwners[C]]));
    if (!s && _.length > 0) {
      e.latestMatchingFormOwner = o;
      for (let C of _) e.latestMatchingFormOwners[C] = o;
    }
    let F = Rr(e, u, o, _, !s || e.activeMatchingForm === o, t);
    if (!s && !F) {
      e.latestMatchingFormOwner = y;
      for (let C of _) e.latestMatchingFormOwners[C] = b.get(C);
    }
  }
  function dr(e, n) {
    let t = e.activeMatchingForm;
    if (t) {
      let i = n.get(t);
      i !== void 0 && He(e, t, Object.assign({}, i, { passive: !0 }));
    }
    for (let [i, o] of n) i !== t && He(e, i, Object.assign({}, o, { passive: !0 }));
  }
  function Wa(e, n) {
    var t, i;
    try {
      let o = e.submitter,
        r = xr(o);
      return r &&
        ((i = r.form) != null ? i : (t = r.closest) == null ? void 0 : t.call(r, "form")) === n
        ? r
        : void 0;
    } catch (o) {
      return;
    }
  }
  function Hr(e) {
    var o, r;
    if (!Qe()) return;
    let n = (r = (o = e.composedPath) == null ? void 0 : o.call(e)[0]) != null ? r : e.target;
    if (!n || typeof n != "object") return;
    let t = Wa(e, n),
      i = Bn(n);
    if (t)
      try {
        i.intent = Ri(t);
      } catch (s) {}
    for (let s of fe.values()) s.active && He(s, n, i);
  }
  function xr(e) {
    var t;
    let n = e;
    for (let i = 0; n && typeof n == "object" && i < fa; i += 1) {
      let o = n,
        r = typeof o.tagName == "string" ? o.tagName.toLowerCase() : "";
      if (
        r === "button" ||
        r === "input" ||
        (typeof o.getAttribute == "function" &&
          ((t = o.getAttribute("role")) == null ? void 0 : t.trim().toLowerCase()) === "button")
      )
        return o;
      n = o.parentElement;
    }
  }
  function Ri(e) {
    return [
      B(e.textContent),
      B(e.value),
      B(e.name),
      B(e.id),
      B(typeof e.getAttribute == "function" ? e.getAttribute("aria-label") : void 0),
    ].join(" ");
  }
  function Bn(e) {
    var r;
    let n = e,
      t = [];
    try {
      if (typeof n.querySelectorAll == "function") {
        let s = n.querySelectorAll(tr);
        for (let d = 0; d < s.length && d < la; d += 1) t.push(s[d]);
      }
    } catch (s) {}
    if (t.length === 0)
      try {
        let s = (r = n.querySelector) == null ? void 0 : r.call(n, tr);
        s && t.push(s);
      } catch (s) {}
    let i = "",
      o = !1;
    for (let s of t)
      if (!(!s || typeof s != "object"))
        try {
          let d = Ri(s);
          (i || (i = d), o || (o = ft.test(d)));
        } catch (d) {}
    return { intent: i, inferredNameExclusion: o };
  }
  function Ya(e) {
    let n = e.parentElement;
    for (let t = 0; n && t < ur; t += 1) {
      let i = n.tagName.toLowerCase();
      if (i === "body" || i === "html") return;
      if (typeof n.querySelector == "function" && n.querySelector("input, select, textarea"))
        return n;
      n = n.parentElement;
    }
  }
  function Ur(e) {
    var a, c, l, u, h, m, v, f, g;
    if (!De()) return;
    let n = xr((c = (a = e.composedPath) == null ? void 0 : a.call(e)[0]) != null ? c : e.target);
    if (
      !n ||
      n.disabled ||
      ((u = (l = n.getAttribute) == null ? void 0 : l.call(n, "aria-disabled")) == null
        ? void 0
        : u.trim().toLowerCase()) === "true" ||
      (typeof n.matches == "function" && n.matches(":disabled"))
    )
      return;
    let t = n.tagName.toLowerCase(),
      o =
        (typeof n.type == "string" ? n.type.toLowerCase() : "") ||
        (t === "button"
          ? "submit"
          : ((m = (h = n.getAttribute) == null ? void 0 : h.call(n, "role")) == null
                ? void 0
                : m.trim().toLowerCase()) === "button"
            ? "button"
            : "");
    if (o !== "submit" && o !== "image" && o !== "button") return;
    let r =
      (g = (f = n.form) != null ? f : (v = n.closest) == null ? void 0 : v.call(n, "form")) != null
        ? g
        : Ya(n);
    if (!r) return;
    let s = Ri(n);
    if (!Qe()) return;
    let d = Object.assign(Bn(r), { intent: s });
    for (let E of fe.values()) E.active && He(E, r, d);
  }
  function Qa(e) {
    e.stateGeneration += 1;
    for (let n of D) for (let t of e.candidatesBySource[n]) t.task.pending = void 0;
    for (let n of e.detachedMerchantPhoneProbeTasks.values()) n.pending = void 0;
    (e.detachedMerchantPhoneProbeTasks.clear(), (e.candidatesBySource = lr()));
    for (let n of Ee) e.ignoredFingerprints[n].clear();
    ((e.ignoredMerchantHashes = {}),
      (e.activeMatchingForm = void 0),
      (e.latestMatchingFormOwner = void 0),
      (e.latestMatchingFormOwners = {}),
      (e.excludedNameOwners = new WeakSet()),
      e.pendingEvidenceRetries.clear(),
      e.pendingFormRetries.clear(),
      (e.merchantPhoneSupplement = void 0),
      e.merchantPhoneProbeSources.clear(),
      e.retryableMerchantPhoneProbes.clear());
  }
  function ht() {
    (vi(),
      Re &&
        (Re.removeEventListener("change", Oi, !0),
        Re.removeEventListener("keydown", Lr, !0),
        Re.removeEventListener("click", Ur, !0),
        Re.removeEventListener("submit", Hr, !0),
        (Re = void 0)));
  }
  function Je(e, n) {
    let t = e ? Ia(n) : Z(n);
    if (!t) {
      !e && !De() && ht();
      return;
    }
    if (!e) {
      ((t.active = !1), Qa(t), De() || ht());
      return;
    }
    (t.active || (_t = void 0),
      (t.active = !0),
      typeof document != "undefined" &&
        (Re !== document &&
          (ht(),
          document.addEventListener("change", Oi, !0),
          document.addEventListener("keydown", Lr, !0),
          document.addEventListener("click", Ur, !0),
          document.addEventListener("submit", Hr, !0),
          (Re = document)),
        Wn(t.pixelId)));
  }
  function Br(e, n = !0, t) {
    var l, u, h, m, v, f;
    let i = Z(t),
      o = dt(e);
    n && i != null && i.active && se(i);
    let r = {},
      s = {},
      d = Fe(() => new Set()),
      a = Fe(() => 0);
    (o != null && o.external_id_sha256 && (s.eid = o.external_id_sha256),
      o != null && o.country && (s.co = o.country),
      o != null && o.city && (s.ct = o.city),
      o != null && o.region && (s.rg = o.region));
    let c = (l = o == null ? void 0 : o.postal_code) != null ? l : o == null ? void 0 : o.zip_code;
    c && (s.pc = c);
    for (let g of st) {
      if (!bt(g.kind)) continue;
      let E = o == null ? void 0 : o[g.field],
        M = g.kind === "phone" ? (o == null ? void 0 : o.phone_number_with_plus_sha256) : void 0,
        S = g.kind === "phone" ? [E, M] : [E],
        P = Array.from(new Set(S.filter((T) => T !== void 0))).slice(0, g.kind === "phone" ? 2 : 1);
      if (P.length > 0) {
        for (let T of P) d[g.kind].add(T);
        ((a[g.kind] = 1),
          g.kind === "phone" ? ((s.ph = E), M && M !== E && (s.php = M)) : (s[g.wire] = P[0]));
      }
    }
    if ((Object.keys(s).length > 0 && (r.in = s), n && i != null && i.active))
      for (let g of D) {
        let E = g === "form" ? "fm" : g === "html" ? "ht" : "js",
          M =
            (u = i.candidatesBySource[g].find((S) => H(S.task.kind) && S.geographyBundle)) == null
              ? void 0
              : u.geographyBundle;
        for (let S of Ee) {
          let P = [],
            T = [],
            _ = [],
            y =
              S === "phone" &&
              ((h = i.merchantPhoneSupplement) == null ? void 0 : h.source) === g &&
              i.merchantPhoneSupplement.merchantHashSignature === Q(i, S)
                ? i.merchantPhoneSupplement.wireValue
                : void 0;
          if (y && !d[S].has(y)) {
            (d[S].add(y), P.push(y));
            let b = (m = i.merchantPhoneSupplement) == null ? void 0 : m.task;
            Jo(y, b == null ? void 0 : b.phoneWireValues, T, _);
          }
          for (let b of i.candidatesBySource[g]) {
            if (a[S] >= ye(S)) break;
            let F = (v = b.task.wireValues) != null ? v : [];
            if (
              b.task.kind === S &&
              b.task.merchantPhoneProbeSignature === void 0 &&
              (!H(S) || (M !== void 0 && b.geographyBundle === M)) &&
              F.length > 0 &&
              !F.some((z) => d[S].has(z))
            ) {
              for (let z of F) (d[S].add(z), P.push(z));
              (S === "phone" && Zo(F, b.task.phoneWireValues, T, _), (a[S] += 1));
            }
          }
          if (P.length > 0) {
            let b = (f = r[E]) != null ? f : {};
            (S === "firstName"
              ? (b.fn = P[0])
              : S === "lastName"
                ? (b.ln = P[0])
                : S === "country"
                  ? (b.co = P[0])
                  : S === "city"
                    ? (b.ct = P[0])
                    : S === "region"
                      ? (b.rg = P[0])
                      : S === "postalCode"
                        ? (b.pc = P[0])
                        : S === "phone"
                          ? (T.length > 0 && (b.ph = T), _.length > 0 && (b.php = _))
                          : (b.em = P),
              (r[E] = b));
          }
        }
      }
    return Object.keys(r).length > 0 ? r : void 0;
  }
  function qr(e) {
    let n = Z(e);
    return !!(
      n != null &&
      n.active &&
      D.some((t) =>
        n.candidatesBySource[t].some((i) => {
          var s;
          if (i.task.pending === void 0) return !1;
          if (i.task.kind !== "phone") return !0;
          let o = yn(n, "phone"),
            r = (s = i.task.wireValues) != null ? s : [];
          return o.length !== 2 || r.length === 0 || r.some((d) => !o.includes(d));
        }),
      )
    );
  }
  function Wn(e) {
    if (Qe())
      try {
        Ga();
        let n = new Map(),
          t = Va(n);
        if (e !== void 0) {
          let i = Z(e);
          i != null && i.active && (dr(i, n), Ct(i, t));
          return;
        }
        for (let i of fe.values()) i.active && (dr(i, n), Ct(i, t));
      } catch (n) {}
  }
  function Vr() {
    (ht(), fe.clear());
  }
  var Xa = "oaiq_cs:",
    Yn = "v",
    Tt = "c",
    vn = "g",
    zr = new WeakMap();
  function At(e) {
    return e === Yn || e === vn;
  }
  function Di(e) {
    return e === Tt || e === vn;
  }
  function Fi(e, n) {
    let t = At(e) || At(n),
      i = Di(e) || Di(n);
    return t && i ? vn : i ? Tt : t ? Yn : void 0;
  }
  function Li() {
    if (!W()) return null;
    let e = zr.get(window);
    return (e || ((e = new Map()), zr.set(window, e)), e);
  }
  function Kr() {
    var e;
    if (!W()) return null;
    try {
      return (e = window.sessionStorage) != null ? e : null;
    } catch (n) {
      return (x("consent_session_storage_unavailable", n), null);
    }
  }
  function jr(e) {
    let n = Kr();
    if (n)
      try {
        let t = n.getItem(e);
        if (t === Yn || t === Tt || t === vn) return t;
        if (t !== null) return (x("consent_session_storage_invalid_value"), vn);
      } catch (t) {
        x("consent_session_storage_read_failed", t);
      }
  }
  function Ja(e) {
    var t;
    let n = (t = Li()) == null ? void 0 : t.get(e);
    return n != null ? n : jr(e);
  }
  function Hi(e, n) {
    var t;
    (t = Li()) == null || t.set(e, n);
  }
  function Za(e, n) {
    let t = Kr();
    if (t)
      try {
        t.setItem(e, n);
      } catch (i) {
        x("consent_session_storage_write_failed", i);
      }
  }
  function xi(e) {
    try {
      return `${Xa}${encodeURIComponent(e)}`;
    } catch (n) {
      return (x("consent_session_storage_key_failed", n), null);
    }
  }
  function Gr(e, n, t) {
    let i = xi(e);
    if (!i) return null;
    let o = Ja(i),
      r = t && !At(o),
      s = At(o) || r,
      d = n && s && !Di(o);
    if (!r && !d) return null;
    let a = Fi(o, r && d ? vn : d ? Tt : Yn);
    return (a && Hi(i, a), { isFirstVisit: r, isFirstConsentGrant: d });
  }
  function ed(e) {
    let n = xi(e);
    n && Hi(n, Yn);
  }
  function Ui(e) {
    let n = e.consentSessionMarker;
    if (!(n != null && n.revocableGrant)) return !1;
    let t = Object.assign({}, e.metadata, {
      consent: !1,
      dropped_event_count: 0,
      dropped_event_reason_counts: {},
      dropped_event_name_counts: {},
      dropped_event_phase_counts: {},
    });
    return (
      delete t.is_first_consent_grant_in_session,
      (e.metadata = t),
      (n.state = "v"),
      (n.revocableGrant = !1),
      ed(n.pixelId),
      !0
    );
  }
  function Bi(e, n) {
    var r;
    let t = xi(e);
    if (!t) return;
    let i = Fi(jr(t), n);
    if (!i) return;
    Za(t, i);
    let o = Fi((r = Li()) == null ? void 0 : r.get(t), i);
    o && Hi(t, o);
  }
  var ne = null,
    En = !1,
    Qn = !1;
  function wt(e) {
    return typeof e == "string" && e.length > 0 && e.length <= 128 && !/[^A-Za-z0-9_-]/.test(e);
  }
  function Wr(e) {
    let n = window.sessionStorage.getItem(jt);
    if (!n) return null;
    try {
      let t = JSON.parse(n);
      if (!t || typeof t != "object" || Array.isArray(t)) return null;
      let i = t;
      return !wt(i.pixelId) ||
        !wt(i.testSessionId) ||
        typeof i.expiresAtMs != "number" ||
        !Number.isFinite(i.expiresAtMs) ||
        i.expiresAtMs <= 0 ||
        i.expiresAtMs > e + 18e5
        ? null
        : { pixelId: i.pixelId, testSessionId: i.testSessionId, expiresAtMs: i.expiresAtMs };
    } catch (t) {
      return null;
    }
  }
  function Yr() {
    if (((ne = null), (En = !1), (Qn = !1), typeof window == "undefined")) return;
    let e = Date.now();
    try {
      ne = Wr(e);
    } catch (n) {
      Qn = !0;
    }
    try {
      let n = new URLSearchParams(window.location.search),
        t = n.getAll(yo),
        i = n.getAll(vo);
      if (t.length === 0 && i.length === 0) return;
      if (t.length !== 1 || i.length !== 1 || !wt(t[0]) || !wt(i[0])) {
        En = !0;
        return;
      }
      let o = t[0],
        r = i[0];
      if ((ne == null ? void 0 : ne.testSessionId) === o) {
        En = ne.pixelId !== r;
        return;
      }
      ne = { pixelId: r, testSessionId: o, expiresAtMs: e + 18e5 };
      try {
        window.sessionStorage.setItem(jt, JSON.stringify(ne));
      } catch (s) {
        Qn = !0;
      }
    } catch (n) {
      En = !0;
    }
  }
  function Qr() {
    if (!(En || Qn || typeof window == "undefined"))
      try {
        ne = Wr(Date.now());
      } catch (e) {
        Qn = !0;
      }
  }
  function Xn(e = Date.now()) {
    return En || !ne || e >= ne.expiresAtMs
      ? null
      : { pixelId: ne.pixelId, testSessionId: ne.testSessionId };
  }
  function Xr(e, n, t) {
    var i, o, r;
    try {
      let s =
        (o = (i = window.webkit) == null ? void 0 : i.messageHandlers) == null
          ? void 0
          : o.openaiConversionEvent;
      return typeof (s == null ? void 0 : s.postMessage) != "function"
        ? (r = od(e, n, t)) != null
          ? r
          : xo(e, n, t)
        : new Promise((d) => {
            let a = setTimeout(() => d(!1), 2e3),
              c = (l) => {
                (clearTimeout(a), d(l));
              };
            try {
              Promise.resolve(
                s.postMessage(JSON.stringify({ version: 1, pixelId: e, sdkVersion: Ie, body: n })),
              )
                .then((l) => {
                  let u = l;
                  c((u == null ? void 0 : u.version) === 1 && u.accepted_events === t);
                })
                .catch(() => c(!1));
            } catch (l) {
              c(!1);
            }
          });
    } catch (s) {
      return;
    }
  }
  var td = 4,
    qi = 0,
    id = 0;
  function od(e, n, t) {
    let i = window.openaiConversionEvent;
    if (
      !i ||
      typeof i != "object" ||
      typeof i.postMessage != "function" ||
      typeof i.addEventListener != "function" ||
      typeof i.removeEventListener != "function"
    )
      return;
    if (qi >= td) return Promise.resolve(!1);
    let o = `${J()}_${++id}`;
    return (
      qi++,
      new Promise((r) => {
        let s = !1,
          d = setTimeout(() => a(!1), 2e3),
          a = (l) => {
            if (!s) {
              ((s = !0), clearTimeout(d), qi--);
              try {
                i.removeEventListener("message", c);
              } catch (u) {}
              r(l);
            }
          },
          c = (l) => {
            try {
              if (typeof l.data != "string" || l.data.length > 4096) return;
              let u = JSON.parse(l.data);
              if ((u == null ? void 0 : u.requestId) !== o) return;
              a(u.version === 1 && u.accepted_events === t);
            } catch (u) {}
          };
        try {
          (i.addEventListener("message", c),
            i.postMessage(
              JSON.stringify({ version: 1, requestId: o, pixelId: e, sdkVersion: Ie, body: n }),
            ));
        } catch (l) {
          a(!1);
        }
      })
    );
  }
  var Vi = !1,
    Ze,
    Nt = [];
  function rd() {
    var e, n;
    try {
      let t = window,
        i =
          (n = (e = t.webkit) == null ? void 0 : e.messageHandlers) == null
            ? void 0
            : n.openaiAdClickContextV1;
      if (typeof (i == null ? void 0 : i.postMessage) == "function")
        return { kind: "webkit", handler: i };
      let o = t.openaiAdClickContextV1;
      return typeof (o == null ? void 0 : o.postMessage) == "function" &&
        typeof o.addEventListener == "function" &&
        typeof o.removeEventListener == "function"
        ? { kind: "android", handler: o }
        : void 0;
    } catch (t) {
      return;
    }
  }
  function xe() {
    Ze == null || Ze();
  }
  function Sn() {
    return Ze !== void 0;
  }
  function Jn() {
    ((Vi = !1), xe());
  }
  function zi(e) {
    if (!w() || U() === !1 || fn()) return (xe(), !1);
    if (Ze) return (Nt.push(e), !0);
    if (Vi) return !1;
    Vi = !0;
    let n = rd();
    if (!n) return !1;
    Nt.push(e);
    let t = !1,
      i,
      o = () => {
        if (t) return;
        ((t = !0), clearTimeout(s));
        try {
          i == null || i();
        } catch (a) {}
        Ze = void 0;
        let d = Nt;
        Nt = [];
        for (let a of d) a();
      },
      r = (d) => {
        if (!t)
          try {
            if (!d || typeof d != "object" || Array.isArray(d)) return;
            let a = d.oppref;
            if (a !== null && !ie(a)) return;
            (ie(a) && w() && U() !== !1 && !fn() && ((p.nativeClickId = a), pe(ue, a, 30 * 86400)),
              o());
          } catch (a) {}
      },
      s = setTimeout(o, 250);
    Ze = o;
    try {
      if (n.kind === "webkit") Promise.resolve(n.handler.postMessage("get")).then(r, o);
      else {
        let d = n.handler,
          a = J(),
          c = (l) => {
            try {
              if (typeof l.data != "string") return;
              let u = JSON.parse(l.data);
              (u == null ? void 0 : u.requestId) === a && r(u);
            } catch (u) {}
          };
        ((i = () => d.removeEventListener("message", c)),
          d.addEventListener("message", c),
          d.postMessage(JSON.stringify({ requestId: a })));
      }
    } catch (d) {
      o();
    }
    return !0;
  }
  var ad = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    dd = 365 * 24 * 60 * 60;
  function Ki(e) {
    return typeof e == "string" && ad.test(e);
  }
  function cd(e) {
    ((e[6] = (e[6] & 15) | 64), (e[8] = (e[8] & 63) | 128));
    let n = Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
    return `${n.slice(0, 8)}-${n.slice(8, 12)}-${n.slice(12, 16)}-${n.slice(16, 20)}-${n.slice(20)}`;
  }
  function ud() {
    let e = typeof window != "undefined" ? window.crypto : globalThis.crypto;
    if (typeof (e == null ? void 0 : e.randomUUID) == "function") {
      let n = e.randomUUID();
      if (Ki(n)) return n;
    }
    if (typeof (e == null ? void 0 : e.getRandomValues) == "function")
      return cd(e.getRandomValues(new Uint8Array(16)));
    x("browser_ref_random_unavailable");
  }
  function ji() {
    if (!w()) return;
    let e = Oe(dn);
    if (Ki(e)) return e;
    e !== void 0 && Xt(dn);
    let n = ud();
    if (!n || !pe(dn, n, dd)) return;
    let t = Oe(dn);
    return t === n && Ki(t) ? t : void 0;
  }
  function Ot() {
    Xt(dn);
  }
  var $i = {
      appointment_scheduled: "customer_action",
      checkout_started: "contents",
      contents_viewed: "contents",
      custom: "custom",
      items_added: "contents",
      lead_created: "customer_action",
      order_created: "contents",
      page_viewed: "contents",
      registration_completed: "customer_action",
      subscription_created: "plan_enrollment",
      trial_started: "plan_enrollment",
    },
    fd = { contents: !0, custom: !0, customer_action: !0, plan_enrollment: !0 },
    es = {
      contents: ["type", "amount", "currency", "contents"],
      custom: ["type", "plan_id", "amount", "currency", "contents"],
      customer_action: ["type", "amount", "currency"],
      plan_enrollment: ["type", "plan_id", "amount", "currency", "contents"],
    },
    ns = ["id", "name", "content_type", "quantity", "amount", "currency"],
    ld = ["event_id", "eventId", "custom_event_name", "opt_out"],
    md = /^[A-Za-z]{3}$/,
    Jr = /^[0-9a-f]{64}$/i,
    gd = /^[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?$/,
    pd =
      "eventOptions.custom_event_name must be 1-64 characters of letters, numbers, underscores, or dashes, and must start and end with a letter or number.",
    hd = "eventOptions.custom_event_name must not overlap with reserved event names.",
    _d = ["pixelId", "oppref", "debug", "user"],
    yd = [
      ...kn.map(({ field: e }) => e),
      "phone_number_with_plus_sha256",
      "country",
      "city",
      "region",
      "postal_code",
      "zip_code",
    ];
  function Ue(e) {
    return !!e && typeof e == "object" && !Array.isArray(e);
  }
  function $(e, n) {
    return e[n] !== void 0;
  }
  function Cn(e) {
    return typeof e == "string" && e.length > 0;
  }
  function Zn(e) {
    return typeof e == "string" && Object.prototype.hasOwnProperty.call($i, e);
  }
  function vd(e) {
    return typeof e == "string" && Object.prototype.hasOwnProperty.call(fd, e);
  }
  function Se(e, n, t, i = !1) {
    return n === void 0
      ? !1
      : typeof n != "string" || (!i && n.length === 0)
        ? (e.push(`${t} should be ${i ? "a string" : "a non-empty string"}.`), !0)
        : !1;
  }
  function Gi(e, n, t) {
    return n !== void 0 && !Number.isInteger(n) ? (e.push(`${t} should be an integer.`), !0) : !1;
  }
  function ts(e, n, t) {
    if (n !== void 0) {
      if (!Cn(n)) {
        e.push(`${t} should be a non-empty string.`);
        return;
      }
      md.test(n) || e.push(`${t} should be a 3-letter ISO 4217 currency code.`);
    }
  }
  function Ed(e, n) {
    if (!Cn(n)) return;
    let t = n.toLowerCase();
    if (!gd.test(t))
      return (e.push(pd), { code: "invalid_custom_event_name", field: "custom_event_name" });
    if (Zn(t))
      return (e.push(hd), { code: "invalid_custom_event_name", field: "custom_event_name" });
  }
  function et(e, n, t, i) {
    let o = Object.keys(n);
    for (let r = 0; r < o.length; r += 1) {
      let s = o[r];
      t.includes(s) || e.push(`${i}.${s} is not a documented field.`);
    }
  }
  function Sd(e, n, t, i) {
    if ($(n, "amount") && !$(n, "currency"))
      return (
        e.push(`${t}.currency is required when ${i} is present.`),
        { code: "missing_currency", field: "data.currency" }
      );
    if ($(n, "currency") && (ts(e, n.currency, `${t}.currency`), typeof n.currency != "string"))
      return { code: "invalid_field_type", field: "data.currency" };
  }
  function Cd(e, n, t, i) {
    let o = `eventProps.contents[${n}]`;
    if (!Ue(e)) {
      i.push(`${o} should be an object.`);
      return;
    }
    (et(i, e, ns, o), Se(i, e.id, `${o}.id`), Se(i, e.name, `${o}.name`, !0));
    let r = Se(i, e.content_type, `${o}.content_type`),
      s = Gi(i, e.quantity, `${o}.quantity`),
      d = Gi(i, e.amount, `${o}.amount`),
      a;
    return (
      r && typeof e.content_type != "string"
        ? (a = { code: "invalid_field_type", field: "data.contents[].content_type" })
        : s
          ? (a = { code: "invalid_field_type", field: "data.contents[].quantity" })
          : d && (a = { code: "invalid_amount", field: "data.contents[].amount" }),
      $(e, "amount") && !t && !$(e, "currency")
        ? (i.push(
            `${o}.currency is required when ${o}.amount is present and eventProps.currency is absent.`,
          ),
          a != null ? a : { code: "missing_currency", field: "data.contents[].currency" })
        : ($(e, "currency") &&
            (ts(i, e.currency, `${o}.currency`),
            !a &&
              typeof e.currency != "string" &&
              (a = { code: "invalid_field_type", field: "data.contents[].currency" })),
          a)
    );
  }
  function bd(e, n) {
    if (!$(e, "contents")) return;
    if (!Array.isArray(e.contents))
      return (
        n.push("eventProps.contents should be an array."),
        { code: "invalid_field_type", field: "data.contents" }
      );
    let t = Cn(e.currency),
      i;
    for (let o = 0; o < e.contents.length; o += 1) {
      let r = Cd(e.contents[o], o, t, n);
      i || (i = r);
    }
    return i;
  }
  function Id(e, n, t) {
    if (n == null) {
      e && t.push(`eventProps.type should be "${e}".`);
      return;
    }
    if (!Ue(n))
      return (
        t.push("eventProps should be an object when provided."),
        { code: "invalid_field_type", field: "data" }
      );
    e && et(t, n, es[e], "eventProps");
    let i,
      o = n.type;
    e
      ? o === void 0
        ? (t.push(`eventProps.type should be "${e}".`),
          (i = { code: "missing_required_field", field: "data.type" }))
        : o !== e &&
          (t.push(`eventProps.type should be "${e}".`),
          typeof o != "string" && (i = { code: "invalid_field_type", field: "data.type" }))
      : o !== void 0 &&
        !vd(o) &&
        t.push("eventProps.type should be a documented data object type.");
    let r = Gi(t, n.amount, "eventProps.amount"),
      s = Sd(t, n, "eventProps", "eventProps.amount");
    if (
      (i || (r ? (i = { code: "invalid_amount", field: "data.amount" }) : (i = s)),
      (e === "custom" || e === "plan_enrollment") && Se(t, n.plan_id, "eventProps.plan_id"),
      e === "contents" || e === "custom" || e === "plan_enrollment")
    ) {
      let d = bd(n, t);
      i || (i = d);
    }
    return i;
  }
  function Md(e, n, t) {
    if (n == null)
      return e === "custom"
        ? (t.push("eventOptions.custom_event_name is required for custom events."),
          { code: "custom_event_name_required", field: "custom_event_name" })
        : void 0;
    if (!Ue(n)) {
      t.push("eventOptions should be an object when provided.");
      return;
    }
    let i;
    if (
      (et(t, n, ld, "eventOptions"),
      $(n, "event_id") && Se(t, n.event_id, "eventOptions.event_id"),
      $(n, "eventId") && Se(t, n.eventId, "eventOptions.eventId"),
      $(n, "custom_event_name"))
    ) {
      Se(t, n.custom_event_name, "eventOptions.custom_event_name");
      let o = Ed(t, n.custom_event_name);
      e === "custom" &&
        (Cn(n.custom_event_name)
          ? (i = o)
          : (i = {
              code:
                n.custom_event_name == null || n.custom_event_name === ""
                  ? "custom_event_name_required"
                  : "invalid_field_type",
              field: "custom_event_name",
            }));
    }
    return (
      $(n, "opt_out") &&
        typeof n.opt_out != "boolean" &&
        (t.push("eventOptions.opt_out should be a boolean."),
        i || (i = { code: "invalid_field_type", field: "opt_out" })),
      e !== "custom" &&
        $(n, "custom_event_name") &&
        t.push("eventOptions.custom_event_name is only supported for custom events."),
      e === "custom" &&
        !Cn(n.custom_event_name) &&
        (t.push("eventOptions.custom_event_name is required for custom events."),
        i || (i = { code: "custom_event_name_required", field: "custom_event_name" })),
      i
    );
  }
  function is(e, n) {
    let t = [];
    if (!Ue(e)) return (t.push("init config should be an object."), t);
    if (
      (et(t, e, _d, "init"),
      $(e, "oppref") &&
        !ie(e.oppref) &&
        t.push("init.oppref should be a non-empty, well-formed string."),
      $(e, "pixelId")
        ? Se(t, e.pixelId, "init.pixelId")
        : n || t.push("init.pixelId is required on the first init call."),
      $(e, "debug") && typeof e.debug != "boolean" && t.push("init.debug should be a boolean."),
      $(e, "user"))
    )
      if (!Ue(e.user)) t.push("init.user should be an object.");
      else {
        et(t, e.user, yd, "init.user");
        for (let { field: i } of kn)
          if ($(e.user, i)) {
            let o = e.user[i];
            Se(t, typeof o == "string" ? o.trim() : o, `init.user.${i}`);
          }
        if ($(e.user, "phone_number_with_plus_sha256")) {
          let i = e.user.phone_number_with_plus_sha256,
            o = typeof i == "string" ? i.trim() : i;
          if (typeof o != "string" || o.length === 0)
            Se(t, o, "init.user.phone_number_with_plus_sha256");
          else if (!Jr.test(o))
            t.push(
              "init.user.phone_number_with_plus_sha256 should be a 64-character hexadecimal SHA-256 digest.",
            );
          else {
            let r = e.user.phone_number_sha256;
            (typeof r != "string" || !Jr.test(r.trim())) &&
              t.push(
                "init.user.phone_number_with_plus_sha256 requires init.user.phone_number_sha256 to be a 64-character hexadecimal SHA-256 digest.",
              );
          }
        }
      }
    return t;
  }
  function Rt(e) {
    return Zn(e) ? e : "unknown";
  }
  function os(e, n, t) {
    let i = [];
    if (!Cn(e))
      return (
        i.push("eventName should be a non-empty string."),
        { issues: i, diagnosticReason: "unsupported_event_name" }
      );
    let o = Zn(e) ? $i[e] : void 0;
    o || i.push("eventName is not a documented measurement event.");
    let r = [],
      s = Id(o, n, r),
      d = [],
      a = Md(e, t, d);
    if ((i.push(...r, ...d), !o))
      return {
        issues: i,
        diagnosticReason: "unsupported_event_name",
        diagnosticDetail: { code: "unknown_event_type", field: "type" },
      };
    if (n == null)
      return {
        issues: i,
        diagnosticReason: "missing_event_props",
        diagnosticDetail: { code: "missing_required_field", field: "data" },
      };
    if (r.length > 0) {
      let c = Ue(t) ? t.custom_event_name : void 0,
        u =
          (typeof c != "string" || (c !== "" && !Zn(c.toLowerCase()))) &&
          (a == null ? void 0 : a.field) === "custom_event_name"
            ? a
            : s,
        h = { issues: i, diagnosticReason: "invalid_event_props" };
      return (u && (h.diagnosticDetail = u), h);
    }
    if (d.length > 0) {
      let c = { issues: i, diagnosticReason: "invalid_event_options" };
      return (a && (c.diagnosticDetail = a), c);
    }
    return { issues: i };
  }
  function Zr(e, n) {
    let t = Object.create(null);
    for (let i of Object.keys(e)) t[i] = void 0;
    for (let i of n) {
      let o = e[i];
      o !== void 0 && (t[i] = o);
    }
    return t;
  }
  function rs(e, n) {
    if (!Zn(e) || !Ue(n)) return n;
    let t = Zr(n, es[$i[e]]),
      i = t.contents;
    if (Array.isArray(i)) {
      let o = [],
        r = i.length;
      for (let s = 0; s < r; s += 1) {
        let d = i[s];
        o[s] = Ue(d) ? Zr(d, ns) : d;
      }
      t.contents = o;
    }
    return t;
  }
  var wd = 250,
    Ve = "oai::diagnostic",
    Nd = "openai::sdk_init",
    Qi = 2147483647,
    Dt = 64,
    ss = 60 * 1024,
    be = 64 * 1024,
    nn = new WeakMap(),
    as = new WeakMap();
  function no(e, n) {
    return Object.prototype.hasOwnProperty.call(e, n);
  }
  function us(e) {
    e.metadata &&
      ((e.metadata.schema_version = 1),
      delete e.metadata.dropped_event_details,
      delete e.metadata.dropped_event_details_schema_version);
  }
  function X(e) {
    var n, t;
    return (
      e.eventName === Ve &&
      (((n = e.metadata) == null ? void 0 : n.is_first_visit_in_session) === !0 ||
        ((t = e.metadata) == null ? void 0 : t.is_first_consent_grant_in_session) === !0)
    );
  }
  function tn(e, n) {
    var o, r;
    let t = n != null ? n : j().find((s) => s.pendingEvents.includes(e));
    if (!t) return !1;
    let i = t.transport;
    return (
      ((r = (o = i.activeFetchRequest) == null ? void 0 : o.events.has(e)) != null ? r : !1) ||
      i.credentiallessEventsInFlight.has(e)
    );
  }
  function G() {
    ((nn = new WeakMap()),
      ri(),
      (p.consent = !1),
      Me(!0),
      bn(!1),
      (p.browserRef = void 0),
      Ot(),
      (p.clickId = void 0),
      (p.explicitClickId = void 0),
      (p.nativeClickId = void 0),
      No());
    let e = j();
    if (e.length === 0) {
      (ge.splice(0, ge.length), Jn());
      return;
    }
    for (let n of e) {
      let t = n.pendingEvents.filter(X).filter((i) => {
        var o, r;
        return (
          (i.clickContext = {}),
          (i.metadata = Object.assign({}, i.metadata, {
            dropped_event_count: 0,
            dropped_event_reason_counts: {},
            dropped_event_name_counts: {},
            dropped_event_phase_counts: {},
          })),
          us(i),
          !((o = i.consentSessionMarker) != null && o.revocableGrant) || tn(i, n)
            ? !0
            : (Ui(i), ((r = i.metadata) == null ? void 0 : r.is_first_visit_in_session) === !0)
        );
      });
      (n.pendingEvents.splice(0, n.pendingEvents.length, ...t), ls(n));
    }
    Jn();
  }
  function to(e) {
    return (
      e.transport.activeFetchRequest !== null || e.transport.credentiallessEventsInFlight.size > 0
    );
  }
  function Lt(e) {
    return e.pendingEvents.length > 0 && e.pendingEvents.every(X);
  }
  function qe(e) {
    ((e.transport.nextFlushRetryAtMs = null), (e.transport.consecutiveFlushFailures = 0));
  }
  function Ce(e) {
    (e.transport.flushSchedulerInterval &&
      (clearInterval(e.transport.flushSchedulerInterval),
      (e.transport.flushSchedulerInterval = null)),
      (e.transport.firstPendingEventAtMs = null),
      (e.transport.lastPendingEventAtMs = null));
  }
  function fs(e) {
    let n = un();
    ((e.transport.firstPendingEventAtMs = n), (e.transport.lastPendingEventAtMs = n));
  }
  function Ht(e) {
    e.transport.consecutiveFlushFailures += 1;
    let n = Math.min(5e3 * po(2, e.transport.consecutiveFlushFailures - 1), 3e5);
    e.transport.nextFlushRetryAtMs = un() + n;
  }
  function Xi(e) {
    if (!w()) for (let n of e) Ui(n) && us(n);
  }
  function nt(e, n) {
    let t = e.pendingEvents,
      i = 0;
    for (; i < n.length && t[i] === n[i];) i += 1;
    let o = n.slice(0, i);
    t.splice(0, i);
    for (let r of n.slice(i)) {
      let s = t.indexOf(r);
      s >= 0 && (t.splice(s, 1), o.push(r));
    }
    for (let r of o)
      r.consentSessionMarker && Bi(r.consentSessionMarker.pixelId, r.consentSessionMarker.state);
    if ((qe(e), t.length === 0)) {
      Ce(e);
      return;
    }
    (fs(e), te(e.pixelId));
  }
  function ls(e) {
    let n = e ? [e] : j();
    for (let t of n) (Ce(t), qe(t));
  }
  function ms() {
    ((nn = new WeakMap()), ri());
    for (let e of j())
      (ls(e),
        (e.transport.activeFetchRequest = null),
        e.transport.credentiallessEventsInFlight.clear());
  }
  function Od(e) {
    try {
      return new URL(e);
    } catch (n) {
      return (x("invalid_endpoint_url", n, { endpoint: e }), null);
    }
  }
  function Ft(e, n) {
    if (typeof navigator != "undefined" && typeof navigator.sendBeacon == "function")
      try {
        if (navigator.sendBeacon(e, n)) return !0;
      } catch (t) {
        x("send_beacon_failed", t, { endpoint: e });
      }
    return !1;
  }
  function Rd(e = 1, n = p.pixelId) {
    if (!p.endpoint || !n) return null;
    let t = Od(p.endpoint);
    return t
      ? (t.searchParams.set(cn.PixelId, n),
        t.searchParams.set(cn.SdkType, _o),
        t.searchParams.set(cn.SdkVersion, Ie),
        t.searchParams.set(cn.Timestamp, String(Date.now())),
        t.searchParams.set(cn.EventCount, String(Math.max(1, Math.floor(e)))),
        t.toString())
      : null;
  }
  function io(e, n, t) {
    let i = q(n);
    if (!w() || !p.initialized || !i) return;
    let o = Date.now(),
      r = {
        testSessionContext: Xn(o),
        clickContext: { clickId: p.clickId },
        eventName: Ve,
        metadata: {
          type: "diagnostic",
          schema_version: 1,
          config: me({ automatic_advanced_matching: e }, t != null ? t : {}),
          dropped_event_count: 0,
          dropped_event_reason_counts: {},
          dropped_event_name_counts: {},
          dropped_event_phase_counts: {},
        },
        eventId: J(),
        time: o,
      };
    (An(r, i.pixelId),
      i.pendingEvents.push(r),
      V(p, "SDK config telemetry queued", { config: "automatic_advanced_matching", outcome: e }),
      te(i.pixelId));
  }
  function te(e) {
    let n = e === void 0 ? j() : [q(e)];
    for (let t of n) {
      if (!t) continue;
      if (!w() && !Lt(t)) {
        (t.pendingEvents.splice(0, t.pendingEvents.length), qe(t), Ce(t));
        continue;
      }
      if (t.pendingEvents.length === 0) {
        (t.transport.activeFetchRequest || qe(t), Ce(t));
        continue;
      }
      if (!p.initialized) {
        Ce(t);
        continue;
      }
      if (typeof setInterval != "function") {
        ze(void 0, t.pixelId);
        continue;
      }
      let i = t.transport,
        o = un();
      (i.firstPendingEventAtMs == null && (i.firstPendingEventAtMs = o),
        (i.lastPendingEventAtMs = o),
        i.flushSchedulerInterval ||
          (i.flushSchedulerInterval = setInterval(() => {
            if (t.pendingEvents.length === 0 || !p.initialized) {
              Ce(t);
              return;
            }
            if (!w() && !Lt(t)) {
              (t.pendingEvents.splice(0, t.pendingEvents.length), qe(t), Ce(t));
              return;
            }
            if (i.activeFetchRequest) return;
            let r = un(),
              s = i.nextFlushRetryAtMs != null && r >= i.nextFlushRetryAtMs;
            if (i.nextFlushRetryAtMs != null && !s) return;
            let d = Dd(t) ? 4e3 : 1e3,
              a = i.lastPendingEventAtMs != null && r - i.lastPendingEventAtMs >= d,
              c = i.firstPendingEventAtMs != null && r - i.firstPendingEventAtMs >= 4e3;
            (s || a || c) && ze(void 0, t.pixelId);
          }, wd)));
    }
  }
  function ds(e, n = !0) {
    var t, i, o, r, s;
    return {
      test_session_id: (t = e.testSessionId) != null ? t : null,
      type: e.eventName,
      oppref: X(e)
        ? w() &&
          ((i = e.metadata) == null ? void 0 : i.consent) === !0 &&
          ie((o = e.clickContext) == null ? void 0 : o.clickId)
          ? e.clickContext.clickId
          : void 0
        : n
          ? (r = e.clickContext) == null
            ? void 0
            : r.clickId
          : void 0,
      timestamp_ms: e.time,
      id: e.eventId,
      source_url: e.sourceUrl,
      referrer_url: e.referrerUrl,
      opt_out: e.optOut,
      custom_event_name: e.eventName === "custom" ? e.customEventName : void 0,
      data: e.eventName === Ve ? Ld(e.metadata) : (s = e.metadata) != null ? s : {},
    };
  }
  function en(e) {
    return e === Nd || e === Ve;
  }
  function Dd(e) {
    return e.pendingEvents.length > 0 && e.pendingEvents.every((n) => n.eventName === Ve);
  }
  function Wi(e, n, t) {
    var i, o, r;
    try {
      let s = (i = e.metadata) == null ? void 0 : i[t],
        d = (o = n.metadata) == null ? void 0 : o[t];
      for (let a in d) no(d, a) && (s[a] = ((r = s[a]) != null ? r : 0) + d[a]);
      return s;
    } catch (s) {
      return {};
    }
  }
  function Fd(e, n) {
    try {
      let t = e.metadata,
        i = n.metadata;
      if (!t || !i) return null;
      let o = t.dropped_event_details,
        r = i.dropped_event_details;
      if ((o && o.length > Dt) || (r && r.length > Dt)) return null;
      if (!o) return r;
      if (!r) return o;
      if (o.length === 1 && r.length === 1) {
        let d = o[0],
          a = r[0];
        if (d.reason === a.reason && d.code === a.code && d.field === a.field) {
          let c = d.count + a.count;
          return !Number.isInteger(c) || c <= 0 || c > Qi ? null : ((d.count = c), o);
        }
      }
      let s = as.get(o);
      if (!s || s.size !== o.length) {
        s = new Map();
        for (let d = 0; d < o.length; d += 1) {
          let { reason: a, code: c, field: l } = o[d],
            u = `${a}|${c}|${l}`;
          s.has(u) || s.set(u, d);
        }
        as.set(o, s);
      }
      for (let d = 0; d < r.length; d += 1) {
        let a = r[d],
          c = `${a.reason}|${a.code}|${a.field}`,
          l = s.get(c),
          u = l === void 0 ? void 0 : o[l];
        if (u) {
          let h = u.count + a.count;
          if (!Number.isInteger(h) || h <= 0 || h > Qi) return null;
          u.count = h;
        } else {
          if (o.length >= Dt) return null;
          (s.set(c, o.length), o.push(a));
        }
      }
      return o;
    } catch (t) {
      return null;
    }
  }
  function Yi(e, n) {
    let t = {};
    for (let i in e) {
      let o = e[i];
      !no(e, i) ||
        typeof o != "number" ||
        o <= 0 ||
        ((n === "dropped_event_reason_counts"
          ? /^(?:unsupported_event_name|missing_event_props|invalid_event_props|invalid_event_options)$/.test(
              i,
            )
          : n === "dropped_event_phase_counts"
            ? /^(?:before_init|after_init)$/.test(i)
            : i === "unknown" || Rt(i) === i) &&
          (t[i] = o));
    }
    return t;
  }
  function Ld(e) {
    try {
      if (e && !no(e, "dropped_event_details_schema_version")) {
        let n = e.dropped_event_details,
          t = e.dropped_event_count;
        if (
          (e.schema_version === 2 && !n) ||
          typeof t != "number" ||
          !Number.isSafeInteger(t) ||
          t < 0
        )
          throw new Error();
        let i = {
          type: "diagnostic",
          schema_version: n ? 2 : 1,
          dropped_event_count: t,
          dropped_event_reason_counts: Yi(
            e.dropped_event_reason_counts,
            "dropped_event_reason_counts",
          ),
          dropped_event_name_counts: Yi(e.dropped_event_name_counts, "dropped_event_name_counts"),
          dropped_event_phase_counts: Yi(
            e.dropped_event_phase_counts,
            "dropped_event_phase_counts",
          ),
        };
        if (n) {
          if (!Array.isArray(n) || n.length === 0 || n.length > Dt) throw new Error();
          let s = [];
          for (let d = 0; d < n.length; d += 1) {
            let { reason: a, code: c, field: l, count: u } = n[d];
            if (
              typeof a != "string" ||
              !/^(?:unsupported_event_name|missing_event_props|invalid_event_props|invalid_event_options)$/.test(
                a,
              ) ||
              typeof c != "string" ||
              !/^(?:(?:unknown_event|invalid_field)_type|missing_(?:required_field|currency)|invalid_(?:amount|custom_event_name)|custom_event_name_required)$/.test(
                c,
              ) ||
              typeof l != "string" ||
              !/^(?:type|custom_event_name|action_source|source_url|referrer_url|opt_out|data(?:\.(?:type|amount|currency|contents(?:\[\]\.(?:content_type|quantity|amount|currency))?))?)$/.test(
                l,
              ) ||
              !Number.isInteger(u) ||
              u <= 0 ||
              u > Qi
            )
              throw new Error();
            s.push({ reason: a, code: c, field: l, count: u });
          }
          i.dropped_event_details = s;
        }
        let o = e.consent;
        (typeof o == "boolean" && (i.consent = o),
          e.is_first_visit_in_session === !0 && (i.is_first_visit_in_session = !0),
          e.is_first_consent_grant_in_session === !0 && (i.is_first_consent_grant_in_session = !0));
        let r = e.config;
        if (r) {
          let s = r.automatic_advanced_matching;
          if (
            typeof s != "string" ||
            !/^(?:enabled|disabled|not_found|invalid|request_failed)$/.test(s)
          )
            throw new Error();
          let d = { automatic_advanced_matching: s };
          if (r.retry_attempted !== void 0 || r.retry_succeeded !== void 0) {
            if (r.retry_attempted !== !0 || typeof r.retry_succeeded != "boolean")
              throw new Error();
            ((d.retry_attempted = !0), (d.retry_succeeded = r.retry_succeeded));
          }
          i.config = d;
        }
        return i;
      }
    } catch (n) {}
    return {
      type: "diagnostic",
      schema_version: 1,
      dropped_event_count: 0,
      dropped_event_reason_counts: {},
      dropped_event_name_counts: {},
      dropped_event_phase_counts: {},
    };
  }
  function Be(e, n) {
    var t;
    return (t = e.metadata) == null ? void 0 : t[n];
  }
  function Ji(e, n) {
    var _, y, b;
    let t =
        ((_ = e.metadata) == null ? void 0 : _.dropped_event_count) +
        ((y = n.metadata) == null ? void 0 : y.dropped_event_count),
      i = Fd(e, n),
      o = Wi(e, n, "dropped_event_reason_counts"),
      r = Wi(e, n, "dropped_event_name_counts"),
      s = Wi(e, n, "dropped_event_phase_counts"),
      d = Be(n, "consent"),
      a = Be(e, "consent"),
      c = typeof d == "boolean" ? d : a,
      l = Be(n, "config"),
      u = Be(e, "config"),
      h =
        l && typeof l == "object" && !Array.isArray(l)
          ? l
          : u && typeof u == "object" && !Array.isArray(u)
            ? u
            : void 0,
      m = Be(e, "is_first_visit_in_session") === !0 || Be(n, "is_first_visit_in_session") === !0,
      v =
        Be(e, "is_first_consent_grant_in_session") === !0 ||
        Be(n, "is_first_consent_grant_in_session") === !0;
    !X(e) && X(n) && (e.clickContext = (b = n.clickContext) != null ? b : {});
    let f = e.consentSessionMarker,
      g = n.consentSessionMarker,
      E = (f == null ? void 0 : f.state) === "c" || (f == null ? void 0 : f.state) === "g",
      M = (g == null ? void 0 : g.state) === "c" || (g == null ? void 0 : g.state) === "g",
      S = (f == null ? void 0 : f.state) === "v" || (f == null ? void 0 : f.state) === "g",
      P = (g == null ? void 0 : g.state) === "v" || (g == null ? void 0 : g.state) === "g",
      T = E ? f : M ? g : S ? f : P ? g : void 0;
    if (T) {
      let F = E || M;
      e.consentSessionMarker = Object.assign({}, T, {
        state: F && (S || P) ? "g" : F ? "c" : "v",
        revocableGrant:
          F &&
          (!E || (f == null ? void 0 : f.revocableGrant) === !0) &&
          (!M || (g == null ? void 0 : g.revocableGrant) === !0),
      });
    } else delete e.consentSessionMarker;
    return (
      (e.metadata = Object.assign(
        {
          type: "diagnostic",
          schema_version: i ? 2 : 1,
          dropped_event_count: t,
          dropped_event_reason_counts: o,
          dropped_event_name_counts: r,
          dropped_event_phase_counts: s,
        },
        i ? { dropped_event_details: i } : {},
        typeof c == "boolean" ? { consent: c } : {},
        h === void 0 ? {} : { config: h },
        m ? { is_first_visit_in_session: !0 } : {},
        v ? { is_first_consent_grant_in_session: !0 } : {},
      )),
      e
    );
  }
  function Zi(e) {
    var i, o;
    let n = e.testSessionContext,
      t = JSON.stringify(
        n ? [n.pixelId, n.testSessionId] : (i = e.testSessionId) != null ? i : null,
      );
    return X(e) && ((o = e.metadata) == null ? void 0 : o.consent) === !1 ? `${t}:denied` : t;
  }
  function gs(e, n) {
    var s;
    if (e.eventName !== Ve) return null;
    let t = q(n),
      i = (s = t == null ? void 0 : t.pendingEvents) != null ? s : ge,
      o = Zi(e),
      r;
    for (let d = 0; d < i.length; d += 1) {
      let a = i[d];
      a.eventName !== Ve ||
        Zi(a) !== o ||
        tn(a, t) ||
        (r ? (Ji(r, a), i.splice(d, 1), (d -= 1)) : (r = a));
    }
    return r ? Ji(r, e) : null;
  }
  function Hd(e) {
    let n = new Map();
    for (let t = 0; t < e.pendingEvents.length; t += 1) {
      let i = e.pendingEvents[t];
      if (i.eventName !== Ve || tn(i, e)) continue;
      let o = Zi(i),
        r = n.get(o);
      r ? (Ji(r, i), e.pendingEvents.splice(t, 1), (t -= 1)) : n.set(o, i);
    }
  }
  function le(e, n) {
    var c;
    if (n.length === 0) return null;
    let t = Rd(n.length, e.pixelId);
    if (!t) return null;
    let i = n.map((l) => l.eventName),
      o = n.some((l) => !en(l.eventName)),
      r = !w() || n.every(X),
      s = (c = n[0].clickContext) == null ? void 0 : c.clickId,
      d = n.every((l) => {
        var u, h;
        return (
          ((u = l.clickContext) == null ? void 0 : u.clickId) !== void 0 &&
          (!X(l) ||
            (((h = l.metadata) == null ? void 0 : h.consent) === !0 && ie(l.clickContext.clickId)))
        );
      })
        ? s
        : void 0,
      a = r
        ? { events: n.map((l) => ds(l, !1)) }
        : {
            obref: p.browserRef,
            events: n.map((l) => {
              var u;
              return ds(l, ((u = l.clickContext) == null ? void 0 : u.clickId) !== d);
            }),
            oppref: d,
            client_hints: o ? Bo() : void 0,
            user: o ? Br(e.config.user, !0, e.pixelId) : void 0,
          };
    return {
      endpoint: t,
      eventsToSend: n,
      eventNames: i,
      body: JSON.stringify(a),
      omitCredentials: r,
    };
  }
  function xd(e, { coalesceDiagnostics: n = !0 } = {}) {
    return (n && Hd(e), le(e, e.pendingEvents.slice()));
  }
  function de(e) {
    try {
      return new Blob([e.body]).size;
    } catch (n) {
      let t = 0;
      for (let i of e.body) {
        let o = i.codePointAt(0);
        t += o < 128 ? 1 : o < 2048 ? 2 : o < 65536 ? 3 : 4;
      }
      return t;
    }
  }
  function xt(e, n) {
    if (de(n) <= ss) return n;
    let t = le(e, n.eventsToSend.slice(0, 1)),
      i = 2,
      o = n.eventsToSend.length - 1;
    for (; i <= o;) {
      let r = Math.floor((i + o) / 2),
        s = le(e, n.eventsToSend.slice(0, r));
      de(s) <= ss ? ((t = s), (i = r + 1)) : (o = r - 1);
    }
    return t;
  }
  function ps(e) {
    return (
      e.eventName === "order_created" ||
      e.eventName === "subscription_created" ||
      e.eventName === "lead_created" ||
      e.eventName === "appointment_scheduled" ||
      e.eventName === "registration_completed" ||
      e.eventName === "trial_started"
    );
  }
  function Ut(e, n) {
    let t = n.eventsToSend.filter((i) => ps(i) && !tn(i, e) && de(le(e, [i])) <= be);
    return t.length > 0 && t.length < n.eventsToSend.length ? le(e, t) : null;
  }
  function Ud(e, n) {
    let t = Ut(e, n);
    return t ? tt(e, t) : xt(e, n);
  }
  function tt(e, n) {
    var d, a;
    let t = de(n);
    if (t <= be) return n;
    let i = n.eventsToSend,
      o = null,
      r = 0,
      s = 0;
    for (let c = 1; c <= i.length; c += 1) {
      if (
        c < i.length &&
        (((d = i[c].clickContext) == null ? void 0 : d.clickId) !== void 0) ==
          (((a = i[s].clickContext) == null ? void 0 : a.clickId) !== void 0)
      )
        continue;
      let l = le(e, i.slice(s, c));
      if ((o != null || (o = l), (r += de(l)), r >= t)) return Ud(e, n);
      s = c;
    }
    if (r > be) {
      let c = Ut(e, n);
      if (c) return tt(e, c);
    }
    return o && o.eventsToSend.length < i.length ? (de(o) <= be ? o : xt(e, o)) : xt(e, n);
  }
  function eo(e, n = !1) {
    var o;
    let t = new Set(e.pendingEvents),
      i = !1;
    e: for (; w();) {
      if (U() === !1) return (G(), i);
      let r = e.pendingEvents.filter((d) => t.has(d) && !X(d) && !tn(d, e)),
        s = le(e, r);
      if (!s) return i;
      for (n && (s = (o = Ut(e, s)) != null ? o : s), s = tt(e, s); ;) {
        if (!w()) return i;
        if (U() === !1) return (G(), i);
        if (s.eventsToSend.length === 1 && de(s) > be) {
          t.delete(s.eventsToSend[0]);
          continue e;
        }
        if (de(s) <= be && Ft(s.endpoint, s.body)) break;
        if ((U() === !1 && G(), !w())) return i;
        let d = Ut(e, s);
        if (d) {
          s = tt(e, d);
          continue;
        }
        if (s.eventsToSend.length === 1 || !w()) return i;
        s = le(e, s.eventsToSend.slice(0, Math.floor(s.eventsToSend.length / 2)));
      }
      for (let d of s.eventsToSend) t.delete(d);
      (nt(e, s.eventsToSend), (i = !0));
    }
    return i;
  }
  function cs(e, n) {
    n.eventsToSend.length < e.pendingEvents.length && eo(e);
  }
  function hs(e, n) {
    let t;
    do ((t = e.pendingEvents.length), qd(e, n));
    while (
      (n == null ? void 0 : n.preferBeacon) === !0 &&
      !to(e) &&
      e.pendingEvents.length > 0 &&
      e.pendingEvents.length < t
    );
  }
  function Bd(e, n, t) {
    if (typeof fetch != "function") return;
    let i = le(
      e,
      n.eventsToSend.filter((s) => X(s) && !tn(s, e)),
    );
    if (!i) return;
    let o = i.eventsToSend;
    for (let s of o) e.transport.credentiallessEventsInFlight.add(s);
    V(p, "credentialless queue flush started", {
      reason: t,
      eventCount: o.length,
      eventNames: i.eventNames,
    });
    let r;
    try {
      r = fetch(i.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: i.body,
        keepalive: !0,
        credentials: "omit",
        mode: "no-cors",
        referrerPolicy: "no-referrer",
      });
    } catch (s) {
      for (let d of o) e.transport.credentiallessEventsInFlight.delete(d);
      (Xi(o), x("fetch_failed", s, { endpoint: i.endpoint }), Ht(e), te(e.pixelId));
      return;
    }
    r.then(
      () => {
        for (let s of o) {
          if (!e.transport.credentiallessEventsInFlight.delete(s)) continue;
          let d = e.pendingEvents.indexOf(s);
          d >= 0 &&
            (e.pendingEvents.splice(d, 1),
            s.consentSessionMarker &&
              Bi(s.consentSessionMarker.pixelId, s.consentSessionMarker.state));
        }
        (qe(e), e.pendingEvents.length === 0 && !to(e) ? Ce(e) : (fs(e), te(e.pixelId)));
      },
      (s) => {
        let d = !1;
        for (let a of o) d = e.transport.credentiallessEventsInFlight.delete(a) || d;
        (Xi(o), x("fetch_failed", s, { endpoint: i.endpoint }), d && (Ht(e), te(e.pixelId)));
      },
    );
  }
  function ze(e, n) {
    if (!W()) return;
    if (Sn()) {
      if ((e == null ? void 0 : e.preferBeacon) !== !0) return;
      xe();
    }
    let t = n === void 0 ? j() : [q(n)];
    for (let i of t) i && hs(i, e);
  }
  function qd(e, n) {
    var m, v;
    let t = e.pendingEvents,
      i = e.transport;
    if (t.length === 0) {
      (qe(e), Ce(e));
      return;
    }
    if (!w() && !Lt(e)) {
      (t.splice(0, t.length), qe(e), Ce(e));
      return;
    }
    if (!p.initialized) return;
    if (
      (oo(e.pixelId),
      U() === !1 && G(),
      (n == null ? void 0 : n.preferBeacon) !== !0 &&
        w() &&
        t.some((f) => !en(f.eventName)) &&
        Wn(e.pixelId),
      (n == null ? void 0 : n.preferBeacon) === !0)
    )
      nn.delete(e);
    else if (w() && t.some((f) => !en(f.eventName))) {
      let f = Uo();
      if (f) {
        nn.get(e) !== f &&
          (nn.set(e, f),
          f.then(() => {
            nn.get(e) === f && (nn.delete(e), q(e.pixelId) === e && hs(e, n));
          }));
        return;
      }
    }
    let o = qr(e.pixelId) && t.some((f) => !en(f.eventName));
    if (
      ((e.userConfigHashingPending || o) &&
        w() &&
        !Lt(e) &&
        (n == null ? void 0 : n.preferBeacon) !== !0) ||
      !p.endpoint
    )
      return;
    let r = (n == null ? void 0 : n.preferBeacon) === !0;
    if (!r && i.nextFlushRetryAtMs != null && un() < i.nextFlushRetryAtMs) return;
    let s = to(e),
      d = Fo(e.pixelId);
    if (
      !s &&
      !r &&
      !d &&
      Lo() &&
      t.some((f) => {
        var g;
        return (
          f.eventName === "page_viewed" &&
          f.optOut !== !0 &&
          !((g = f.clickContext) != null && g.clickId)
        );
      })
    )
      return;
    let a = xd(e, { coalesceDiagnostics: !s });
    if (!a) return;
    let c = r && !a.omitCredentials,
      l = (m = n == null ? void 0 : n.reason) != null ? m : "scheduler";
    if (s) {
      if ((r && Bd(e, a, l), c)) {
        let f = le(
          e,
          a.eventsToSend.filter((g) => !X(g)),
        );
        f && !Ft(f.endpoint, f.body) && eo(e, !0);
      }
      return;
    }
    if (!r && d && !a.omitCredentials) {
      let f = a.eventsToSend.filter((g) => !X(g));
      f.length < a.eventsToSend.length &&
        f.some((g) => !en(g.eventName)) &&
        (a = (v = le(e, f)) != null ? v : a);
    }
    if (((a = r ? tt(e, a) : xt(e, a)), (c = r && !a.omitCredentials), c)) {
      if (de(a) <= be && Ft(a.endpoint, a.body)) {
        (V(p, "queue flushed", {
          reason: l,
          transport: "beacon",
          eventCount: a.eventsToSend.length,
          eventNames: a.eventNames,
        }),
          nt(e, a.eventsToSend));
        return;
      }
      if (
        (U() === !1 && G(),
        !w() || (e.pendingEvents.some((f) => ps(f) && !tn(f, e)) && (eo(e, !0) || !w())))
      )
        return;
    }
    if (typeof fetch == "function") {
      let f = { events: new Set(a.eventsToSend) };
      ((i.activeFetchRequest = f),
        V(p, "queue flush started", {
          reason: l,
          transport: "fetch",
          eventCount: a.eventsToSend.length,
          eventNames: a.eventNames,
        }),
        je(null, null, function* () {
          try {
            let g =
              !r &&
              !a.omitCredentials &&
              a.eventsToSend.length <= 100 &&
              de(a) <= be &&
              a.eventsToSend.some((M) => !en(M.eventName)) &&
              a.eventsToSend.every((M) => {
                var S, P;
                return (
                  !X(M) &&
                  M.optOut !== !0 &&
                  (en(M.eventName) ||
                    !!(
                      (P = (S = M.clickContext) == null ? void 0 : S.clickId) != null && P.trim()
                    ) ||
                    d)
                );
              })
                ? Xr(e.pixelId, a.body, a.eventsToSend.length)
                : void 0;
            if (g) {
              let M = yield g;
              if ((U() === !1 && G(), i.activeFetchRequest !== f)) return;
              if (!w() || !a.eventsToSend.every((S) => e.pendingEvents.includes(S))) {
                ((i.activeFetchRequest = null), te(e.pixelId));
                return;
              }
              if (M) {
                (V(p, "queue flushed", {
                  reason: l,
                  transport: "native",
                  eventCount: a.eventsToSend.length,
                  eventNames: a.eventNames,
                }),
                  nt(e, a.eventsToSend),
                  (i.activeFetchRequest = null));
                return;
              }
              V(p, "native delivery unavailable; using web transport");
            }
            let E = {
              method: "POST",
              headers: { "Content-Type": "text/plain" },
              body: a.body,
              keepalive: de(a) <= be,
              credentials: a.omitCredentials ? "omit" : "include",
              mode: "no-cors",
            };
            if (
              (a.omitCredentials && (E.referrerPolicy = "no-referrer"),
              yield fetch(a.endpoint, E),
              i.activeFetchRequest !== f)
            )
              return;
            (V(p, "queue flushed", {
              reason: l,
              transport: "fetch",
              eventCount: a.eventsToSend.length,
              eventNames: a.eventNames,
            }),
              nt(e, a.eventsToSend),
              (i.activeFetchRequest = null));
          } catch (g) {
            if (i.activeFetchRequest !== f) return;
            ((i.activeFetchRequest = null),
              Xi(a.eventsToSend),
              V(p, "queue flush failed", {
                reason: l,
                transport: "fetch",
                eventCount: a.eventsToSend.length,
                eventNames: a.eventNames,
              }),
              x("fetch_failed", g, { endpoint: a.endpoint }),
              Ht(e),
              te(e.pixelId));
          }
        }),
        r && cs(e, a));
      return;
    }
    let u = !c && !a.omitCredentials && de(a) <= be && Ft(a.endpoint, a.body) ? "beacon" : "none",
      h = { reason: l, transport: u, eventCount: a.eventsToSend.length, eventNames: a.eventNames };
    if (u === "none") {
      (V(p, "queue flush failed", h), Ht(e), te(e.pixelId), r && a.omitCredentials && cs(e, a));
      return;
    }
    (V(p, "queue flushed", h), nt(e, a.eventsToSend));
  }
  var Vd = 3e5,
    zd = 250,
    Ke = new Map(),
    ro,
    Mn = !0,
    we;
  function Kd() {
    if (!(typeof window == "undefined" || typeof window.fetch != "function"))
      return window.fetch.bind(window);
  }
  function jd(e) {
    return !e || typeof e != "object" || Array.isArray(e)
      ? !1
      : typeof e.automatic_advanced_matching_enabled == "boolean";
  }
  function Gd(e) {
    return `${ho}/pixel-config/v1/${encodeURIComponent(e)}.json`;
  }
  function Bt(e) {
    (e.refreshTimeout !== void 0 && (clearTimeout(e.refreshTimeout), (e.refreshTimeout = void 0)),
      e.expiryTimeout !== void 0 && (clearTimeout(e.expiryTimeout), (e.expiryTimeout = void 0)));
  }
  function ys(e) {
    var t;
    Bt(e);
    let n = Math.max(0, ((t = e.expiresAt) != null ? t : Date.now()) - Date.now());
    ((e.refreshTimeout = setTimeout(
      () => {
        ((e.refreshTimeout = void 0), In(e, !0));
      },
      Math.max(0, n - 3e3),
    )),
      (e.expiryTimeout = setTimeout(() => {
        ((e.expiryTimeout = void 0), (e.enabled = !1), (e.loaded = !1), Je(!1, e.pixelId), In(e));
      }, n)),
      typeof e.refreshTimeout == "object" &&
        "unref" in e.refreshTimeout &&
        e.refreshTimeout.unref(),
      typeof e.expiryTimeout == "object" && "unref" in e.expiryTimeout && e.expiryTimeout.unref());
  }
  function on(e, n, t, i) {
    let o =
      i.retryAttempted === !0
        ? { retry_attempted: !0, retry_succeeded: n === "enabled" || n === "disabled" }
        : void 0;
    if (n === "request_failed" && e.loaded && e.expiresAt !== void 0 && e.expiresAt > Date.now()) {
      o && io(n, e.pixelId, o);
      return;
    }
    let r = !e.loaded || e.enabled !== t;
    ((e.enabled = t),
      (e.loaded = !0),
      (e.expiresAt = Date.now() + Vd),
      Je(e.enabled && Mn, e.pixelId),
      (r || o) && io(n, e.pixelId, o),
      ys(e));
  }
  function rn(e, n) {
    return e.activeLoad === n && Mn;
  }
  function _s(e, n) {
    return !rn(e, n) || n.retryAttempted
      ? !1
      : ((n.retryAttempted = !0),
        (n.retryTimeout = setTimeout(() => {
          ((n.retryTimeout = void 0),
            rn(e, n) &&
              ((n.abortController =
                typeof AbortController == "function" ? new AbortController() : void 0),
              vs(e, n)));
        }, zd)),
        !0);
  }
  function vs(e, n) {
    return je(this, null, function* () {
      let t = n.abortController,
        i;
      try {
        let o = Kd();
        if (!o) {
          rn(e, n) && on(e, "request_failed", !1, n);
          return;
        }
        let r = new Promise((c, l) => {
            i = setTimeout(() => {
              (t == null || t.abort(), l(new Error("Automatic matching config request timed out")));
            }, 3e3);
          }),
          s = yield Promise.race([
            o(Gd(e.pixelId), {
              method: "GET",
              credentials: "omit",
              mode: "cors",
              referrerPolicy: "no-referrer",
              signal: t == null ? void 0 : t.signal,
            }),
            r,
          ]);
        if (!rn(e, n)) return;
        if (s.status === 404) {
          on(e, "not_found", !1, n);
          return;
        }
        if (!s.ok) {
          if ((s.status === 408 || (s.status >= 500 && s.status < 600)) && _s(e, n)) return;
          on(e, "request_failed", !1, n);
          return;
        }
        let d;
        try {
          d = yield s.json();
        } catch (c) {
          rn(e, n) && on(e, "invalid", !1, n);
          return;
        }
        if (!rn(e, n)) return;
        if (!jd(d)) {
          on(e, "invalid", !1, n);
          return;
        }
        let a = d.automatic_advanced_matching_enabled;
        on(e, a ? "enabled" : "disabled", a, n);
      } catch (o) {
        rn(e, n) && !_s(e, n) && on(e, "request_failed", !1, n);
      } finally {
        (i !== void 0 && clearTimeout(i),
          e.activeLoad === n && n.retryTimeout === void 0 && (e.activeLoad = void 0));
      }
    });
  }
  function In(e, n = !1) {
    if (
      !Mn ||
      (e.loaded && !n) ||
      e.activeLoad ||
      (e.expiresAt !== void 0 &&
        typeof document != "undefined" &&
        document.visibilityState === "hidden")
    )
      return;
    let t = {
      abortController: typeof AbortController == "function" ? new AbortController() : void 0,
    };
    ((e.activeLoad = t), vs(e, t));
  }
  function Es(e) {
    var n, t, i;
    (((n = e.activeLoad) == null ? void 0 : n.retryTimeout) !== void 0 &&
      (clearTimeout(e.activeLoad.retryTimeout), (e.activeLoad.retryTimeout = void 0)),
      (i = (t = e.activeLoad) == null ? void 0 : t.abortController) == null || i.abort(),
      (e.activeLoad = void 0));
  }
  function oo(e) {
    let n = Ke.get(e);
    !(n != null && n.loaded) ||
      n.expiresAt === void 0 ||
      n.expiresAt > Date.now() ||
      (Bt(n), (n.enabled = !1), (n.loaded = !1), Je(!1, n.pixelId), In(n));
  }
  function so() {
    if (typeof document != "undefined" && document.visibilityState !== "hidden")
      for (let e of Ke.values()) {
        oo(e.pixelId);
        let n = e.loaded && e.expiresAt !== void 0 && e.expiresAt - Date.now() <= 3e3;
        In(e, n);
      }
  }
  function $d() {
    typeof document == "undefined" ||
      we === document ||
      (we == null || we.removeEventListener("visibilitychange", so),
      document.addEventListener("visibilitychange", so),
      (we = document));
  }
  function Ss(e, n) {
    ro === void 0 && (ro = e);
    let t = Ke.get(e);
    (t || ((t = { pixelId: e, enabled: !1, loaded: !1 }), Ke.set(e, t)),
      (Mn = n !== !1),
      $d(),
      In(t));
  }
  function bn(e) {
    if (((Mn = e), !e)) {
      for (let n of Ke.values()) (Je(!1, n.pixelId), Es(n), Bt(n));
      return;
    }
    for (let n of Ke.values())
      (n.loaded &&
        n.expiresAt !== void 0 &&
        n.expiresAt <= Date.now() &&
        ((n.enabled = !1), (n.loaded = !1)),
        Je(n.loaded && n.enabled, n.pixelId),
        n.loaded ? ys(n) : In(n));
  }
  function Cs() {
    for (let e of Ke.values()) (Es(e), Bt(e), Je(!1, e.pixelId));
    (Ke.clear(),
      we == null || we.removeEventListener("visibilitychange", so),
      (we = void 0),
      (ro = void 0),
      (Mn = !0));
  }
  var Ps = "oai::diagnostic";
  function Wd(e) {
    return !!e && typeof e == "object" && !Array.isArray(e);
  }
  function Yd(e) {
    return Wd(e) && e.debug !== void 0
      ? typeof e.debug == "boolean"
        ? e.debug
        : !0
      : !!p.config.debug;
  }
  function qt(e, n, t, i) {
    n.length === 0 ||
      (e === "init" && !t) ||
      To({ command: e, issues: n, eventName: i }, { details: t });
  }
  function bs(e, n, t) {
    x(e, void 0, { command: "init", issues: n }, { debug: t });
  }
  function uo(e) {
    !p.initialized || !w() || te(e);
  }
  function co(e, n) {
    n ? (e.config.user = n) : delete e.config.user;
  }
  function ks() {
    for (let e of j())
      ((e.userConfigUpdateRevision += 1),
        (e.userConfigHashingPending = !1),
        (e.userHashingPendingCounts = {}),
        delete e.userHashingPendingPromises);
    p.userConfigHashingPending = !1;
  }
  function Qd(e, n, t) {
    var s;
    let i = ++e.userConfigUpdateRevision,
      o = at(n, (d, a) => {
        if (!(i !== e.userConfigUpdateRevision || q(e.pixelId) !== e)) {
          if ((delete e.userHashingPendingCounts[d], a.hash)) {
            let c = me(
              { [a.field]: a.hash },
              a.phoneNumberWithPlusHash
                ? { phone_number_with_plus_sha256: a.phoneNumberWithPlusHash }
                : {},
            );
            co(e, Object.assign({}, e.config.user, c));
          }
          Tr(e.pixelId, d);
        }
      });
    if (
      (co(e, o.user),
      (e.userHashingPendingCounts = (s = o.pendingHashCounts) != null ? s : {}),
      (e.userHashingPendingPromises = o.pendingHashPromises),
      wr(e.pixelId),
      !o.pending)
    ) {
      ((e.userConfigHashingPending = !1), e === q() && (p.userConfigHashingPending = !1));
      return;
    }
    ((e.userConfigHashingPending = !0), e === q() && (p.userConfigHashingPending = !0));
    let r = () => {
      i !== e.userConfigUpdateRevision ||
        q(e.pixelId) !== e ||
        ((e.userConfigHashingPending = !1),
        (e.userHashingPendingCounts = {}),
        delete e.userHashingPendingPromises,
        e === q() && (p.userConfigHashingPending = !1),
        uo(e.pixelId));
    };
    o.pending
      .then((d) => {
        i !== e.userConfigUpdateRevision || q(e.pixelId) !== e || co(e, d);
      })
      .catch((d) => {
        i !== e.userConfigUpdateRevision ||
          q(e.pixelId) !== e ||
          x("user_identifier_hash_failed", d, { command: "init" }, { debug: t });
      })
      .then(r, r);
  }
  function Xd(e) {
    var u, h, m, v, f, g;
    let n = Yd(e),
      t = j(),
      i =
        (m = (h = (u = t[0]) == null ? void 0 : u.pixelId) != null ? h : p.pixelId) != null
          ? m
          : p.config.pixelId,
      o = is(e, i);
    if ((n && qt("init", o, n), !e || typeof e != "object" || Array.isArray(e))) {
      bs("init_invalid_config", o, n);
      return;
    }
    let r = e,
      s = r.pixelId,
      d = s === void 0 ? i : s;
    if (!d || typeof d != "string") {
      bs("init_invalid_pixel_id", o, n);
      return;
    }
    let a = q(d);
    !a &&
      t.length === 0 &&
      p.config.pixelId !== void 0 &&
      p.config.pixelId !== d &&
      delete p.config.user;
    let c = a != null ? a : Io(d),
      l = Object.prototype.hasOwnProperty.call(r, "user");
    ((c.config.pixelId = d),
      (c.config.debug =
        typeof r.debug == "boolean"
          ? r.debug
          : !!((v = c.config.debug) != null ? v : p.config.debug)),
      l && Qd(c, r.user, n),
      (p.pixelId = (f = q()) == null ? void 0 : f.pixelId),
      (p.endpoint = (g = p.endpoint) != null ? g : ot),
      U() === !1 && G(),
      w() &&
        (ie(r.oppref) && ((p.explicitClickId = r.oppref), pe(ue, r.oppref, 720 * 60 * 60)), oi()),
      !((!p.initialized || Sn()) && zi(() => Is(c, !a))) && Is(c, !a));
  }
  function Is(e, n) {
    var t, i;
    if ((U() === !1 && G(), (p.initialized = !0), w())) {
      ((p.clickId = ct(p.clickId)), (p.browserRef = (t = p.browserRef) != null ? t : ji()));
      for (let o of e.pendingEvents)
        (i = o.clickContext) != null || (o.clickContext = { clickId: p.clickId });
    } else ((p.clickId = void 0), (p.explicitClickId = void 0), (p.browserRef = void 0), Ot());
    (Ss(e.pixelId, p.consent), n && ws(e), Ns(e, !0), uo(e.pixelId));
  }
  function As(e) {
    if (!(typeof e != "string" || e.length === 0))
      try {
        let n = new URL(e);
        return n.protocol === "file:"
          ? "file://"
          : n.protocol === "about:" && n.pathname === "blank"
            ? "about:blank"
            : n.protocol === "data:"
              ? "data:"
              : n.protocol === "content:"
                ? "content://"
                : n.protocol !== "http:" && n.protocol !== "https:"
                  ? void 0
                  : n.hostname
                    ? `${n.origin}${n.pathname}`
                    : void 0;
      } catch (n) {
        return;
      }
  }
  function Jd() {
    var e;
    return typeof window == "undefined"
      ? void 0
      : As((e = window.location) == null ? void 0 : e.href);
  }
  function Zd() {
    return typeof document == "undefined" ? void 0 : As(document.referrer);
  }
  function ec(e, n, t) {
    Ts(e, n, t, j());
  }
  function nc(e, n, t, i) {
    if (typeof e != "string" || e.length === 0) {
      qt("measure", ["measureSingle.pixelId should be a non-empty string."], !!p.config.debug, n);
      return;
    }
    let o = q(e);
    if (!o) {
      qt(
        "measure",
        ["measureSingle.pixelId must identify an initialized pixel."],
        !!p.config.debug,
        n,
      );
      return;
    }
    Ts(n, t, i, [o]);
  }
  function Ts(e, n, t, i) {
    let o = rs(e, n),
      { issues: r, diagnosticReason: s, diagnosticDetail: d } = os(e, o, t);
    if (r.length > 0) {
      (qt("measure", r, !!p.config.debug, e), s && tc(s, e, i, d));
      return;
    }
    typeof e != "string" ||
      e.length === 0 ||
      (U() === !1 && G(),
      w() && Wn(i.length === 1 ? i[0].pixelId : void 0),
      Os(e, o != null && typeof o == "object" && !Array.isArray(o) ? o : void 0, t, i));
  }
  function ws(e) {
    e.sdkInitQueued ||
      !w() ||
      ((e.sdkInitQueued = !0), Os("openai::sdk_init", { type: "sdk_lifecycle" }, void 0, [e]));
  }
  function Ns(e, n) {
    if (!p.initialized) return;
    let t = w(),
      i = Gr(e.pixelId, t, n);
    i &&
      (it(
        {
          eventName: Ps,
          testSessionId: null,
          metadata: Object.assign(
            {
              type: "diagnostic",
              schema_version: 1,
              consent: t,
              dropped_event_count: 0,
              dropped_event_reason_counts: {},
              dropped_event_name_counts: {},
              dropped_event_phase_counts: {},
            },
            i.isFirstVisit ? { is_first_visit_in_session: !0 } : {},
            i.isFirstConsentGrant ? { is_first_consent_grant_in_session: !0 } : {},
          ),
          eventId: J(),
          time: Date.now(),
          consentSessionMarker: {
            pixelId: e.pixelId,
            state:
              i.isFirstVisit && i.isFirstConsentGrant ? "g" : i.isFirstConsentGrant ? "c" : "v",
            revocableGrant: n && p.consent === null && i.isFirstConsentGrant,
          },
        },
        e,
      ),
      (!t || !n) && ze(void 0, e.pixelId));
  }
  function tc(e, n, t, i) {
    if (!w()) return;
    let o = Rt(n),
      r = p.initialized ? "after_init" : "before_init",
      s = J(),
      d = Date.now(),
      a = Xn(d),
      c = (l) => ({
        testSessionContext: a,
        eventName: Ps,
        metadata: Object.assign(
          {
            type: "diagnostic",
            schema_version: i ? 2 : 1,
            dropped_event_count: 1,
            dropped_event_reason_counts: { [e]: 1 },
            dropped_event_name_counts: { [o]: 1 },
            dropped_event_phase_counts: { [r]: 1 },
          },
          i
            ? { dropped_event_details: [{ reason: e, code: i.code, field: i.field, count: 1 }] }
            : {},
        ),
        eventId: l,
        time: d,
      });
    if (t.length === 0) {
      it(c(s));
      return;
    }
    for (let l of t) it(c(l === t[0] ? s : J()), l);
  }
  function Os(e, n, t, i = j()) {
    var c;
    if (!w()) {
      V(p, "event dropped because consent is not granted", {
        eventName: e,
        initialized: p.initialized,
        consent: p.consent,
      });
      return;
    }
    let o = t && typeof t == "object" ? ((c = t.event_id) != null ? c : t.eventId) : void 0,
      r = t && typeof t == "object" ? t.custom_event_name : void 0,
      s = t && typeof t == "object" ? t.opt_out : void 0,
      d = Date.now(),
      a = {
        testSessionContext: Xn(d),
        eventName: e,
        metadata: n,
        sourceUrl: Jd(),
        referrerUrl: Zd(),
        eventId: typeof o == "string" && o.length > 0 ? o : J(),
        customEventName: e === "custom" && typeof r == "string" && r.length > 0 ? r : void 0,
        optOut: typeof s == "boolean" ? s : void 0,
        time: d,
      };
    if (i.length === 0) {
      it(a);
      return;
    }
    for (let l of i) it(Object.assign({}, a), l);
  }
  function it(e, n) {
    var o, r, s, d;
    (n && An(e, n.pixelId),
      p.initialized &&
        w() &&
        !Sn() &&
        ((p.clickId = (o = p.clickId) != null ? o : ct()),
        (r = e.clickContext) != null || (e.clickContext = { clickId: p.clickId })));
    let t = (s = n == null ? void 0 : n.pendingEvents) != null ? s : ge,
      i = (d = gs(e, n == null ? void 0 : n.pixelId)) != null ? d : e;
    (i === e && t.push(e),
      V(p, "event queued", {
        eventName: i.eventName,
        eventId: i.eventId,
        pendingEventCount: t.length,
        initialized: p.initialized,
      }),
      !(!p.initialized || !n) && te(n.pixelId));
  }
  function ic(e) {
    if (typeof e != "boolean") return;
    let n = !w() || U() === !1;
    if (
      (n && w() && G(), Do(e), (p.consent = e), bn(e), V(p, "consent updated", { consent: e }), !e)
    ) {
      (G(), ze({ preferBeacon: !0, reason: "consent_denied" }));
      return;
    }
    if ((p.initialized && oi(), Sn())) {
      fn() && xe();
      return;
    }
    (n && p.initialized && zi(Ms)) || Ms();
  }
  function Ms() {
    var e, n, t;
    if ((U() === !1 && G(), !!w())) {
      p.clickId = ct(p.clickId);
      for (let i of j()) {
        for (let o of i.pendingEvents)
          ((e = o.clickContext) != null || (o.clickContext = { clickId: p.clickId }),
            (n = o.consentSessionMarker) != null &&
              n.revocableGrant &&
              (o.consentSessionMarker.revocableGrant = !1));
        Ns(i, !1);
      }
      if (p.initialized) {
        p.browserRef = (t = p.browserRef) != null ? t : ji();
        for (let i of j()) ws(i);
      }
      uo();
    }
  }
  function sn(e, ...n) {
    if (typeof e == "string")
      switch (e) {
        case "init":
        case "initialize":
          Xd(n[0]);
          break;
        case "consent":
          ic(n[0]);
          break;
        case "measure":
          ec(n[0], n[1], n[2]);
          break;
        case "measureSingle":
          nc(n[0], n[1], n[2], n[3]);
          break;
        default:
          break;
      }
  }
  var Vt = "oaiq",
    Rs = !1,
    Ds = !1;
  function oc(e) {
    if (Rs) return;
    let n = e.window,
      t = e.document,
      i = (s) => {
        (xe(),
          V(p, "lifecycle flush requested", {
            reason: s,
            pendingEventCount: j().reduce((d, a) => d + a.pendingEvents.length, 0),
          }),
          ze({ preferBeacon: !0, reason: s }));
      },
      o = new Map(),
      r = !1;
    (n &&
      typeof n.addEventListener == "function" &&
      (n.addEventListener("pagehide", () => {
        (o.clear(), i("pagehide"));
        for (let s of j()) {
          let d = s.transport.activeFetchRequest;
          d && [...d.events].some((a) => !X(a)) && o.set(s.pixelId, d);
        }
      }),
      n.addEventListener("pageshow", (s) => {
        if ((s == null ? void 0 : s.persisted) === !0) {
          Qr();
          for (let d of j()) {
            let a = o.get(d.pixelId);
            a &&
              d.transport.activeFetchRequest === a &&
              ((d.transport.activeFetchRequest = null), te(d.pixelId));
          }
        }
        o.clear();
      }),
      n.addEventListener("beforeunload", () => i("beforeunload")),
      (r = !0)),
      t &&
        typeof t.addEventListener == "function" &&
        (t.addEventListener("visibilitychange", () => {
          t.visibilityState === "hidden" && i("visibilitychange_hidden");
        }),
        (r = !0)),
      (Rs = r));
  }
  function rc(e) {
    if (Ds) return;
    let n = e.window;
    !n ||
      typeof n.addEventListener != "function" ||
      (n.addEventListener("storage", (t) => {
        let i = t;
        (i == null ? void 0 : i.key) !== Pn ||
          i.newValue !== "false" ||
          (bn(!1),
          G(),
          V(p, "consent revoked from persisted storage"),
          ze({ preferBeacon: !0, reason: "consent_storage_denied" }));
      }),
      (Ds = !0));
  }
  (function (n) {
    var c, l, u, h;
    if (!n) return;
    oc(n);
    let t = n.window && typeof n.window == "object" ? n.window : null,
      i = n[Vt],
      o = t ? t[Vt] : void 0,
      r = i != null ? i : o;
    if ((i != null && i.__oaiqInitialized) || (o != null && o.__oaiqInitialized)) return;
    Yr();
    let s = [i, o].filter((m) => !!m),
      d = [];
    for (let m of s) {
      if (Array.isArray(m)) {
        d = m;
        break;
      }
      if (Array.isArray(m == null ? void 0 : m.q)) {
        d = m.q;
        break;
      }
      if (Array.isArray(m == null ? void 0 : m.queue)) {
        d = m.queue;
        break;
      }
    }
    ((p.consent = U()),
      Vr(),
      Cs(),
      ms(),
      ks(),
      Mo(),
      (p.initialized = !1),
      (p.pixelId =
        typeof ((c = r == null ? void 0 : r.config) == null ? void 0 : c.pixelId) == "string"
          ? r.config.pixelId
          : void 0),
      (p.endpoint = ot),
      (p.config = {
        pixelId:
          typeof ((l = r == null ? void 0 : r.config) == null ? void 0 : l.pixelId) == "string"
            ? r.config.pixelId
            : void 0,
        debug: !!((u = r == null ? void 0 : r.config) != null && u.debug),
        user: dt((h = r == null ? void 0 : r.config) == null ? void 0 : h.user),
      }),
      (p.clickId = void 0),
      (p.explicitClickId = void 0),
      (p.nativeClickId = void 0),
      (p.browserRef = void 0),
      ge.splice(0, ge.length),
      p.consent === !1 && Jn(),
      rc(n),
      typeof window != "undefined" && typeof window.addEventListener == "function" && Ho(G));
    let a = (...m) => {
      let [v, ...f] = m;
      typeof v == "string" && sn(v, ...f);
    };
    ((a.q = []),
      (a.queue = a.q),
      (a.config = p.config),
      (a.loaded = !0),
      (a.version = Ie),
      (a.__oaiqInitialized = !0),
      (a.measure = (m, v, f) => sn("measure", m, v, f)),
      (a.measureSingle = (m, v, f, g) => sn("measureSingle", m, v, f, g)),
      (a.init = (m) => sn("init", m)),
      (a.consent = (m) => sn("consent", m)),
      (n[Vt] = a),
      t && t !== n && (t[Vt] = a));
    for (let m = 0; m < d.length; m += 1) {
      let v = d[m],
        f = Array.isArray(v) ? v : Array.from(v || []);
      if (f.length === 0) continue;
      let [g, ...E] = f;
      typeof g == "string" && sn(g, ...E);
    }
  })(Ao());
})();
