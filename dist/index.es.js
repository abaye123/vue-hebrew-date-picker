import { defineComponent as $, computed as h, openBlock as p, createElementBlock as x, normalizeClass as z, toDisplayString as _, createElementVNode as j, Fragment as F, renderList as E, ref as B, watch as G, createVNode as U, createBlock as Y, onMounted as ee, onUnmounted as te, withModifiers as q, createStaticVNode as ne } from "vue";
import { getJewishMonthsInOrder as ae, getJewishMonthInHebrew as se, JewishMonth as H, toGregorianDate as re, toJewishDate as ie, formatJewishDateInHebrew as J, formatJewishDate as I, convertNumberToHebrew as K } from "jewish-date";
import k from "dayjs";
const oe = () => ["א", "ב", "ג", "ד", "ה", "ו", "ש"], le = () => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], ce = (t) => t ? oe() : le(), P = (t, e) => ae(t).slice(1).map((a) => ({
  id: a,
  text: e ? se(H[a]) : a
})), ue = (t = 5785) => {
  const e = [];
  for (let n = 100; n > 0; n--) {
    const a = t - n;
    e.push(a);
  }
  e.push(t);
  for (let n = 1; n <= 100; n++) {
    const a = t + n;
    e.push(a);
  }
  return e;
}, de = (t, e) => {
  const n = P(e, !1), a = n.map((u) => u.id).indexOf(H[t]);
  return a === 0 ? {
    month: H[n[n.length - 1].id],
    year: e - 1
  } : {
    month: H[n[a - 1].id],
    year: e
  };
}, he = (t, e) => {
  const n = P(e, !1), a = n.map((u) => u.id).indexOf(H[t]);
  return a === n.length - 1 ? {
    month: H[n[0].id],
    year: e + 1
  } : {
    month: H[n[a + 1].id],
    year: e
  };
}, R = (t) => {
  if (!t || t.monthName === H.None || t.year < 1 || t.day < 1)
    return /* @__PURE__ */ new Date();
  const e = {
    day: t.day,
    monthName: t.monthName,
    year: t.year
  };
  return re(e);
}, M = (t) => ie(t), Q = (t, e) => t && e && t.day === e.day && t.month === e.month && t.year === e.year, W = (t) => {
  const e = M(t.toDate());
  return {
    day: e.day,
    jewishDateStr: I(e),
    jewishDateStrHebrew: J(e),
    jewishDate: e,
    dayjsDate: t,
    date: t.toDate(),
    isCurrentMonth: !1
  };
}, ye = (t) => {
  const e = M(t), n = k(t).subtract(e.day - 1, "day"), a = Number(n.format("d")), u = n.subtract(a, "day"), f = {
    selectedDay: null,
    jewishMonth: e.month,
    jewishYear: e.year,
    jewishMonthString: e.monthName,
    days: []
  };
  let y = u;
  for (let o = 0; o < 42; o++) {
    const l = W(y);
    l.isCurrentMonth = f.jewishMonth === l.jewishDate.month, Q(e, l.jewishDate) && (f.selectedDay = l), (o < 7 || l.isCurrentMonth || l.date.getDay() > 0) && (f.days.push(l), y = y.add(1, "day"));
  }
  return f;
}, ve = (t) => {
  const e = [
    "1 Tishri",
    "2 Tishri",
    "10 Tishri",
    "15 Tishri",
    "22 Tishri",
    "15 Nisan",
    "21 Nisan",
    "6 Sivan"
  ];
  return t || e.push("16 Tishri", "23 Tishri", "16 Nisan", "22 Nisan", "7 Sivan"), e;
}, fe = (t) => {
  const e = ve(t ?? !1);
  return (n) => !e.includes(
    `${n.jewishDate.day} ${n.jewishDate.monthName}`
  );
}, De = (t) => t.date.getDay() !== 6, Ee = (t) => (e) => De(e) && fe(t)(e);
function we(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var V = { exports: {} }, me = V.exports, L;
function ge() {
  return L || (L = 1, (function(t, e) {
    (function(n, a) {
      t.exports = a();
    })(me, (function() {
      return function(n, a, u) {
        a.prototype.isBetween = function(f, y, o, l) {
          var m = u(f), D = u(y), w = (l = l || "()")[0] === "(", c = l[1] === ")";
          return (w ? this.isAfter(m, o) : !this.isBefore(m, o)) && (c ? this.isBefore(D, o) : !this.isAfter(D, o)) || (w ? this.isBefore(m, o) : !this.isAfter(m, o)) && (c ? this.isAfter(D, o) : !this.isBefore(D, o));
        };
      };
    }));
  })(V)), V.exports;
}
var Se = ge();
const pe = /* @__PURE__ */ we(Se), be = ["title"], ke = /* @__PURE__ */ $({
  __name: "Day",
  props: {
    day: {},
    isHebrew: { type: Boolean },
    selectedDay: {},
    onClick: { type: Function },
    onMouseOver: { type: Function },
    canSelect: { type: Function },
    customizeDayStyle: { type: Function },
    isRange: { type: Boolean },
    startDay: {},
    endDay: {}
  },
  setup(t) {
    k.extend(pe);
    const e = t, n = h(() => e.isHebrew ? K(e.day.day, !1, !1) : e.day.day), a = h(() => e.isHebrew ? e.day.jewishDateStrHebrew : e.day.jewishDateStr), u = h(() => e.day.isCurrentMonth ? "" : "other-month"), f = h(() => e.selectedDay && Q(e.day.jewishDate, e.selectedDay.jewishDate) ? "selected-day" : ""), y = h(() => e.canSelect && !e.canSelect(e.day) ? "no-select" : ""), o = (i, r, d) => {
      if (r && d) {
        const S = k(r.date), T = k(d.date);
        return k(i).isBetween(S, T, "day", "[]");
      }
      return !1;
    }, l = (i, r) => {
      if (r) {
        const d = k(r.date).startOf("d");
        return k(i).startOf("d").isSame(d);
      }
      return !1;
    }, m = (i, r, d) => {
      if (d && r) {
        const S = k(i).startOf("d"), T = k(r.date).startOf("d"), s = k(d.date).startOf("d");
        return S.isSame(s) && !S.isSame(T);
      }
      return !1;
    }, D = h(() => o(e.day.date, e.startDay, e.endDay) ? "is-in-range" : ""), w = h(() => l(e.day.date, e.startDay) ? "start-day" : ""), c = h(() => m(e.day.date, e.startDay, e.endDay) ? "end-day" : ""), v = h(() => e.customizeDayStyle ? e.customizeDayStyle(e.day) : ""), g = h(() => [
      "day",
      u.value,
      f.value,
      y.value,
      D.value,
      w.value,
      c.value,
      v.value
    ].filter(Boolean).join(" ")), N = () => {
      (!e.canSelect || e.canSelect(e.day)) && e.onClick(e.day);
    }, O = () => {
      e.onMouseOver && e.onMouseOver(e.day);
    };
    return (i, r) => (p(), x("div", {
      class: z(g.value),
      title: a.value,
      onClick: N,
      onMouseover: O
    }, _(n.value), 43, be));
  }
}), je = { class: "weekday" }, He = /* @__PURE__ */ $({
  __name: "Weekday",
  props: {
    value: {}
  },
  setup(t) {
    return (e, n) => (p(), x("div", je, _(t.value), 1));
  }
}), Me = { class: "navigation" }, xe = { class: "month-year-selection" }, Ce = ["value"], Be = ["value"], Ne = ["value"], Re = ["value"], Oe = /* @__PURE__ */ $({
  __name: "Navigation",
  props: {
    month: {},
    year: {},
    isHebrew: { type: Boolean }
  },
  emits: ["click"],
  setup(t, { emit: e }) {
    const n = t, a = e, u = h(() => P(n.year, n.isHebrew)), f = h(() => ue(n.year)), y = (c) => H[c], o = () => {
      const c = y(n.month), v = de(c, n.year);
      a("click", H[v.month], v.year);
    }, l = () => {
      const c = y(n.month), v = he(c, n.year);
      a("click", H[v.month], v.year);
    }, m = (c) => {
      const v = c.target;
      a("click", v.value, n.year);
    }, D = (c) => {
      const v = c.target;
      a("click", n.month, Number(v.value));
    }, w = (c) => n.isHebrew ? K(c) : c;
    return (c, v) => (p(), x("div", Me, [
      j("div", {
        class: "arrow-left",
        onClick: o
      }, [...v[0] || (v[0] = [
        j("span", null, null, -1)
      ])]),
      j("div", xe, [
        j("select", {
          value: t.month,
          onChange: m
        }, [
          (p(!0), x(F, null, E(u.value, (g) => (p(), x("option", {
            key: g.id,
            value: g.id
          }, _(g.text), 9, Be))), 128))
        ], 40, Ce),
        j("select", {
          value: t.year,
          onChange: D
        }, [
          (p(!0), x(F, null, E(f.value, (g) => (p(), x("option", {
            key: g,
            value: g
          }, _(w(g)), 9, Re))), 128))
        ], 40, Ne)
      ]),
      j("div", {
        class: "arrow-right",
        onClick: l
      }, [...v[1] || (v[1] = [
        j("span", null, null, -1)
      ])])
    ]));
  }
}), Te = { class: "weekday-wrapper" }, _e = { class: "month" }, $e = /* @__PURE__ */ $({
  __name: "Month",
  props: {
    value: {},
    isHebrew: { type: Boolean },
    isRange: { type: Boolean },
    canSelect: { type: Function },
    customizeDayStyle: { type: Function }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const n = t, a = e, u = (s) => s ? s instanceof Date ? s : s.startDate ? s.startDate instanceof Date ? s.startDate : R(s.startDate) : s.day && s.monthName && s.year ? R(s) : /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(), f = (s) => s && typeof s == "object" && "startDate" in s && "endDate" in s, y = B(u(n.value)), o = h(() => f(n.value) ? u(n.value.endDate) : null), l = h(() => ye(y.value)), m = h(() => {
      if (!n.isRange && n.value && !f(n.value))
        return l.value.selectedDay || void 0;
    }), D = h(() => {
      if (n.isRange && f(n.value)) {
        const s = u(n.value.startDate);
        return W(k(s));
      }
    }), w = h(() => {
      if (n.isRange && f(n.value) && o.value)
        return W(k(o.value));
    }), c = B(void 0), v = h(() => {
      if (n.isRange)
        return w.value ? D.value : c.value;
    }), g = h(() => {
      if (n.isRange)
        return w.value || c.value;
    }), N = h(() => ce(n.isHebrew || !1)), O = h(() => `month-container${n.isHebrew ? " is-hebrew" : ""}`), i = (s, b) => {
      var A;
      const C = ((A = l.value.selectedDay) == null ? void 0 : A.day) || 1, X = {
        year: b,
        monthName: H[s],
        day: C
      }, Z = R(X);
      y.value = Z;
    }, r = (s, b) => {
      i(s, b);
    }, d = (s) => {
      if (n.isRange)
        if (!D.value || w.value)
          a("select", s, void 0);
        else {
          const [b, C] = T(D.value, s);
          a("select", b, C);
        }
      else
        a("select", s, void 0);
    }, S = (s) => {
      n.isRange && (c.value = s);
    }, T = (s, b) => s.date.getTime() <= b.date.getTime() ? [s, b] : [b, s];
    return G(() => n.value, (s) => {
      const b = u(s);
      y.value = b;
    }), (s, b) => (p(), x("div", {
      class: z(O.value)
    }, [
      U(Oe, {
        month: l.value.jewishMonthString,
        year: l.value.jewishYear,
        "is-hebrew": t.isHebrew,
        onClick: r
      }, null, 8, ["month", "year", "is-hebrew"]),
      j("div", Te, [
        (p(!0), x(F, null, E(N.value, (C) => (p(), Y(He, {
          key: C,
          value: C
        }, null, 8, ["value"]))), 128))
      ]),
      j("div", _e, [
        (p(!0), x(F, null, E(l.value.days, (C) => (p(), Y(ke, {
          key: C.jewishDateStr,
          day: C,
          "is-hebrew": t.isHebrew,
          "selected-day": m.value,
          "can-select": t.canSelect,
          "customize-day-style": t.customizeDayStyle,
          "is-range": t.isRange,
          "start-day": v.value,
          "end-day": g.value,
          onClick: d,
          onMouseover: S
        }, null, 8, ["day", "is-hebrew", "selected-day", "can-select", "customize-day-style", "is-range", "start-day", "end-day"]))), 128))
      ])
    ], 2));
  }
}), Je = { class: "selected-date-text" }, Ie = /* @__PURE__ */ $({
  __name: "HebrewDatePicker",
  props: {
    modelValue: {},
    isHebrew: { type: Boolean },
    canSelect: { type: Function },
    customizeDayStyle: { type: Function },
    isRange: { type: Boolean }
  },
  emits: ["update:modelValue", "select"],
  setup(t, { emit: e }) {
    const n = t, a = e, u = B(!1), f = B(null), y = B(void 0), o = B(void 0), l = B(void 0), m = (i) => i && typeof i == "object" && "startDate" in i && "endDate" in i, D = () => {
      if (n.isRange) {
        if (o.value && l.value) {
          const i = n.isHebrew ? o.value.jewishDateStrHebrew : o.value.jewishDateStr, r = n.isHebrew ? l.value.jewishDateStrHebrew : l.value.jewishDateStr;
          return `${i} - ${r}`;
        } else if (o.value)
          return n.isHebrew ? o.value.jewishDateStrHebrew : o.value.jewishDateStr;
        return "";
      } else if (y.value)
        return n.isHebrew ? y.value.jewishDateStrHebrew : y.value.jewishDateStr;
      return "";
    }, w = B(D());
    G([() => n.modelValue, () => n.isHebrew, () => n.isRange], () => {
      c();
    }, { deep: !0 });
    const c = () => {
      const i = n.modelValue;
      if (n.isRange)
        if (m(i)) {
          const r = i, d = r.startDate instanceof Date ? r.startDate : R(r.startDate), S = r.endDate instanceof Date ? r.endDate : R(r.endDate);
          o.value = {
            jewishDateStr: I(M(d)),
            jewishDateStrHebrew: J(M(d)),
            jewishDate: M(d),
            date: d
          }, l.value = {
            jewishDateStr: I(M(S)),
            jewishDateStrHebrew: J(M(S)),
            jewishDate: M(S),
            date: S
          };
        } else
          o.value = void 0, l.value = void 0;
      else if (i && !m(i)) {
        const r = i, d = r instanceof Date ? r : R(r);
        y.value = {
          jewishDateStr: I(M(d)),
          jewishDateStrHebrew: J(M(d)),
          jewishDate: M(d),
          date: d
        };
      } else
        y.value = void 0;
      w.value = D();
    }, v = (i, r, d = !0) => {
      n.isRange ? (o.value = i, l.value = r, r ? (a("update:modelValue", {
        startDate: i.jewishDate,
        endDate: r.jewishDate
      }), a("select", i, r), d && (u.value = !1)) : (a("update:modelValue", i), a("select", i))) : (y.value = i, a("update:modelValue", i.jewishDate), a("select", i), d && (u.value = !1)), w.value = D();
    }, g = () => {
      u.value = !u.value;
    }, N = (i) => {
      f.value && !f.value.contains(i.target) && (u.value = !1);
    };
    ee(() => {
      document.addEventListener("click", N), c();
    }), te(() => {
      document.removeEventListener("click", N);
    });
    const O = h(() => `hebrew-date-picker${n.isHebrew ? " is-hebrew" : ""}`);
    return (i, r) => (p(), x("div", {
      ref_key: "pickerRef",
      ref: f,
      class: z(O.value)
    }, [
      j("div", {
        class: "selected-date",
        onClick: q(g, ["stop"])
      }, [
        r[2] || (r[2] = ne('<svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>', 1)),
        j("span", Je, _(w.value || (t.isHebrew ? "בחר תאריך" : "Select date")), 1)
      ]),
      j("div", {
        class: z(["month-wrapper", { open: u.value }]),
        onClick: r[1] || (r[1] = q(() => {
        }, ["stop"]))
      }, [
        U($e, {
          value: t.modelValue,
          "is-hebrew": t.isHebrew,
          "is-range": t.isRange,
          "can-select": t.canSelect,
          "customize-day-style": t.customizeDayStyle,
          onSelect: r[0] || (r[0] = (d, S) => v(d, S))
        }, null, 8, ["value", "is-hebrew", "is-range", "can-select", "customize-day-style"])
      ], 2)
    ], 2));
  }
}), We = {
  install(t) {
    t.component("HebrewDatePicker", Ie);
  }
};
export {
  Ie as HebrewDatePicker,
  Q as IsJewishDatesEqual,
  We as default,
  fe as dontSelectHolidays,
  De as dontSelectShabat,
  Ee as dontSelectShabatAndHolidays,
  R as getGregDate,
  M as getJewishDate,
  ye as getJewishMonth,
  P as getJewishMonths,
  ue as getJewishYears,
  he as getNextMonth,
  de as getPrevMonth,
  ce as getWeekdays
};
