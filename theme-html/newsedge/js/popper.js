! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function() {
    "use strict";

    function e(e) {
        var t = !1,
            n = 0,
            r = document.createElement("span"),
            o = new MutationObserver(function() {
                e(), t = !1
            });
        return o.observe(r, {
                attributes: !0
            }),
            function() {
                t || (t = !0, r.setAttribute("x-index", n), n += 1)
            }
    }

    function t(e) {
        var t = !1;
        return function() {
            t || (t = !0, setTimeout(function() {
                t = !1, e()
            }, fe))
        }
    }

    function n(e) {
        var t = {};
        return e && "[object Function]" === t.toString.call(e)
    }

    function r(e, t) {
        if (1 !== e.nodeType) return [];
        var n = window.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function o(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function i(e) {
        if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName)) return window.document.body;
        var t = r(e),
            n = t.overflow,
            a = t.overflowX,
            s = t.overflowY;
        return /(auto|scroll)/.test(n + s + a) ? e : i(o(e))
    }

    function a(e) {
        var t = e && e.offsetParent,
            n = t && t.nodeName;
        return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === r(t, "position") ? a(t) : t : window.document.documentElement
    }

    function s(e) {
        var t = e.nodeName;
        return "BODY" === t ? !1 : "HTML" === t || a(e.firstElementChild) === e
    }

    function f(e) {
        return null !== e.parentNode ? f(e.parentNode) : e
    }

    function p(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return window.document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            r = n ? e : t,
            o = n ? t : e,
            i = document.createRange();
        i.setStart(r, 0), i.setEnd(o, 0);
        var u = i.commonAncestorContainer;
        if (e !== u && t !== u || r.contains(o)) return s(u) ? u : a(u);
        var l = f(e);
        return l.host ? p(l.host, t) : p(e, f(t).host)
    }

    function u(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === t ? "scrollTop" : "scrollLeft",
            r = e.nodeName;
        if ("BODY" === r || "HTML" === r) {
            var o = window.document.documentElement,
                i = window.document.scrollingElement || o;
            return i[n]
        }
        return e[n]
    }

    function l(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = u(t, "top"),
            o = u(t, "left"),
            i = n ? -1 : 1;
        return e.top += r * i, e.bottom += r * i, e.left += o * i, e.right += o * i, e
    }

    function d(e, t) {
        var n = "x" === t ? "Left" : "Top",
            r = "Left" === n ? "Right" : "Bottom";
        return +e["border" + n + "Width"].split("px")[0] + +e["border" + r + "Width"].split("px")[0]
    }

    function c(e, t, n, r) {
        return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], ce() ? n["offset" + e] + r["margin" + ("Height" === e ? "Top" : "Left")] + r["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
    }

    function h() {
        var e = window.document.body,
            t = window.document.documentElement,
            n = ce() && window.getComputedStyle(t);
        return {
            height: c("Height", e, t, n),
            width: c("Width", e, t, n)
        }
    }

    function m(e) {
        return ve({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function g(e) {
        var t = {};
        if (ce()) try {
            t = e.getBoundingClientRect();
            var n = u(e, "top"),
                o = u(e, "left");
            t.top += n, t.left += o, t.bottom += n, t.right += o
        } catch (i) {} else t = e.getBoundingClientRect();
        var a = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
            s = "HTML" === e.nodeName ? h() : {},
            f = s.width || e.clientWidth || a.right - a.left,
            p = s.height || e.clientHeight || a.bottom - a.top,
            l = e.offsetWidth - f,
            c = e.offsetHeight - p;
        if (l || c) {
            var g = r(e);
            l -= d(g, "x"), c -= d(g, "y"), a.width -= l, a.height -= c
        }
        return m(a)
    }

    function v(e, t) {
        var n = ce(),
            o = "HTML" === t.nodeName,
            a = g(e),
            s = g(t),
            f = i(e),
            p = r(t),
            u = +p.borderTopWidth.split("px")[0],
            d = +p.borderLeftWidth.split("px")[0],
            c = m({
                top: a.top - s.top - u,
                left: a.left - s.left - d,
                width: a.width,
                height: a.height
            });
        if (c.marginTop = 0, c.marginLeft = 0, !n && o) {
            var h = +p.marginTop.split("px")[0],
                v = +p.marginLeft.split("px")[0];
            c.top -= u - h, c.bottom -= u - h, c.left -= d - v, c.right -= d - v, c.marginTop = h, c.marginLeft = v
        }
        return (n ? t.contains(f) : t === f && "BODY" !== f.nodeName) && (c = l(c, t)), c
    }

    function b(e) {
        var t = window.document.documentElement,
            n = v(e, t),
            r = Math.max(t.clientWidth, window.innerWidth || 0),
            o = Math.max(t.clientHeight, window.innerHeight || 0),
            i = u(t),
            a = u(t, "left"),
            s = {
                top: i - n.top + n.marginTop,
                left: a - n.left + n.marginLeft,
                width: r,
                height: o
            };
        return m(s)
    }

    function w(e) {
        var t = e.nodeName;
        return "BODY" === t || "HTML" === t ? !1 : "fixed" === r(e, "position") ? !0 : w(o(e))
    }

    function y(e, t, n, r) {
        var a = {
                top: 0,
                left: 0
            },
            s = p(e, t);
        if ("viewport" === r) a = b(s);
        else {
            var f = void 0;
            "scrollParent" === r ? (f = i(o(e)), "BODY" === f.nodeName && (f = window.document.documentElement)) : f = "window" === r ? window.document.documentElement : r;
            var u = v(f, s);
            if ("HTML" !== f.nodeName || w(s)) a = u;
            else {
                var l = h(),
                    d = l.height,
                    c = l.width;
                a.top += u.top - u.marginTop, a.bottom = d + u.top, a.left += u.left - u.marginLeft, a.right = c + u.left
            }
        }
        return a.left += n, a.top += n, a.right -= n, a.bottom -= n, a
    }

    function O(e) {
        var t = e.width,
            n = e.height;
        return t * n
    }

    function E(e, t, n, r, o) {
        var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var a = y(n, r, i, o),
            s = {
                top: {
                    width: a.width,
                    height: t.top - a.top
                },
                right: {
                    width: a.right - t.right,
                    height: a.height
                },
                bottom: {
                    width: a.width,
                    height: a.bottom - t.bottom
                },
                left: {
                    width: t.left - a.left,
                    height: a.height
                }
            },
            f = Object.keys(s).map(function(e) {
                return ve({
                    key: e
                }, s[e], {
                    area: O(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            p = f.filter(function(e) {
                var t = e.width,
                    r = e.height;
                return t >= n.clientWidth && r >= n.clientHeight
            }),
            u = p.length > 0 ? p[0].key : f[0].key,
            l = e.split("-")[1];
        return u + (l ? "-" + l : "")
    }

    function x(e, t, n) {
        var r = p(t, n);
        return v(n, r)
    }

    function L(e) {
        var t = window.getComputedStyle(e),
            n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            r = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            o = {
                width: e.offsetWidth + r,
                height: e.offsetHeight + n
            };
        return o
    }

    function T(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function M(e, t, n) {
        n = n.split("-")[0];
        var r = L(e),
            o = {
                width: r.width,
                height: r.height
            },
            i = -1 !== ["right", "left"].indexOf(n),
            a = i ? "top" : "left",
            s = i ? "left" : "top",
            f = i ? "height" : "width",
            p = i ? "width" : "height";
        return o[a] = t[a] + t[f] / 2 - r[f] / 2, n === s ? o[s] = t[s] - r[p] : o[s] = t[T(s)], o
    }

    function C(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function N(e, t, n) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === n
        });
        var r = C(e, function(e) {
            return e[t] === n
        });
        return e.indexOf(r)
    }

    function k(e, t, r) {
        var o = void 0 === r ? e : e.slice(0, N(e, "name", r));
        return o.forEach(function(e) {
            e["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var r = e["function"] || e.fn;
            e.enabled && n(r) && (t.offsets.popper = m(t.offsets.popper), t.offsets.reference = m(t.offsets.reference), t = r(t, e))
        }), t
    }

    function S() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = E(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = M(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = k(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var n = e.name,
                r = e.enabled;
            return r && n === t
        })
    }

    function A(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length - 1; r++) {
            var o = t[r],
                i = o ? "" + o + n : e;
            if ("undefined" != typeof window.document.body.style[i]) return i
        }
        return null
    }

    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[A("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function D(e, t, n, r) {
        var o = "BODY" === e.nodeName,
            a = o ? window : e;
        a.addEventListener(t, n, {
            passive: !0
        }), o || D(i(a.parentNode), t, n, r), r.push(a)
    }

    function H(e, t, n, r) {
        n.updateBound = r, window.addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = i(e);
        return D(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function P() {
        this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function j(e, t) {
        return window.removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function I() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = j(this.reference, this.state))
    }

    function F(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function R(e, t) {
        Object.keys(t).forEach(function(n) {
            var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && F(t[n]) && (r = "px"), e.style[n] = t[n] + r
        })
    }

    function U(e, t) {
        Object.keys(t).forEach(function(n) {
            var r = t[n];
            r !== !1 ? e.setAttribute(n, t[n]) : e.removeAttribute(n)
        })
    }

    function Y(e) {
        return R(e.instance.popper, e.styles), U(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && R(e.arrowElement, e.arrowStyles), e
    }

    function q(e, t, n, r, o) {
        var i = x(o, t, e),
            a = E(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
        return t.setAttribute("x-placement", a), R(t, {
            position: "absolute"
        }), n
    }

    function K(e, t) {
        var n = t.x,
            r = t.y,
            o = e.offsets.popper,
            i = C(e.instance.modifiers, function(e) {
                return "applyStyle" === e.name
            }).gpuAcceleration;
        void 0 !== i && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
        var s = void 0 !== i ? i : t.gpuAcceleration,
            f = a(e.instance.popper),
            p = g(f),
            u = {
                position: o.position
            },
            l = {
                left: Math.floor(o.left),
                top: Math.floor(o.top),
                bottom: Math.floor(o.bottom),
                right: Math.floor(o.right)
            },
            d = "bottom" === n ? "top" : "bottom",
            c = "right" === r ? "left" : "right",
            h = A("transform"),
            m = void 0,
            v = void 0;
        if (v = "bottom" === d ? -p.height + l.bottom : l.top, m = "right" === c ? -p.width + l.right : l.left, s && h) u[h] = "translate3d(" + m + "px, " + v + "px, 0)", u[d] = 0, u[c] = 0, u.willChange = "transform";
        else {
            var b = "bottom" === d ? -1 : 1,
                w = "right" === c ? -1 : 1;
            u[d] = v * b, u[c] = m * w, u.willChange = d + ", " + c
        }
        var y = {
            "x-placement": e.placement
        };
        return e.attributes = ve({}, y, e.attributes), e.styles = ve({}, u, e.styles), e.arrowStyles = ve({}, e.offsets.arrow, e.arrowStyles), e
    }

    function z(e, t, n) {
        var r = C(e, function(e) {
                var n = e.name;
                return n === t
            }),
            o = !!r && e.some(function(e) {
                return e.name === n && e.enabled && e.order < r.order
            });
        if (!o) {
            var i = "`" + t + "`",
                a = "`" + n + "`";
            console.warn(a + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
        }
        return o
    }

    function G(e, t) {
        if (!z(e.instance.modifiers, "arrow", "keepTogether")) return e;
        var n = t.element;
        if ("string" == typeof n) {
            if (n = e.instance.popper.querySelector(n), !n) return e
        } else if (!e.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
        var o = e.placement.split("-")[0],
            i = e.offsets,
            a = i.popper,
            s = i.reference,
            f = -1 !== ["left", "right"].indexOf(o),
            p = f ? "height" : "width",
            u = f ? "Top" : "Left",
            l = u.toLowerCase(),
            d = f ? "left" : "top",
            c = f ? "bottom" : "right",
            h = L(n)[p];
        s[c] - h < a[l] && (e.offsets.popper[l] -= a[l] - (s[c] - h)), s[l] + h > a[c] && (e.offsets.popper[l] += s[l] + h - a[c]);
        var g = s[l] + s[p] / 2 - h / 2,
            v = r(e.instance.popper, "margin" + u).replace("px", ""),
            b = g - m(e.offsets.popper)[l] - v;
        return b = Math.max(Math.min(a[p] - h, b), 0), e.arrowElement = n, e.offsets.arrow = {}, e.offsets.arrow[l] = Math.round(b), e.offsets.arrow[d] = "", e
    }

    function V(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e
    }

    function _(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = we.indexOf(e),
            r = we.slice(n + 1).concat(we.slice(0, n));
        return t ? r.reverse() : r
    }

    function X(e, t) {
        if (W(e.instance.modifiers, "inner")) return e;
        if (e.flipped && e.placement === e.originalPlacement) return e;
        var n = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
            r = e.placement.split("-")[0],
            o = T(r),
            i = e.placement.split("-")[1] || "",
            a = [];
        switch (t.behavior) {
            case ye.FLIP:
                a = [r, o];
                break;
            case ye.CLOCKWISE:
                a = _(r);
                break;
            case ye.COUNTERCLOCKWISE:
                a = _(r, !0);
                break;
            default:
                a = t.behavior
        }
        return a.forEach(function(s, f) {
            if (r !== s || a.length === f + 1) return e;
            r = e.placement.split("-")[0], o = T(r);
            var p = e.offsets.popper,
                u = e.offsets.reference,
                l = Math.floor,
                d = "left" === r && l(p.right) > l(u.left) || "right" === r && l(p.left) < l(u.right) || "top" === r && l(p.bottom) > l(u.top) || "bottom" === r && l(p.top) < l(u.bottom),
                c = l(p.left) < l(n.left),
                h = l(p.right) > l(n.right),
                m = l(p.top) < l(n.top),
                g = l(p.bottom) > l(n.bottom),
                v = "left" === r && c || "right" === r && h || "top" === r && m || "bottom" === r && g,
                b = -1 !== ["top", "bottom"].indexOf(r),
                w = !!t.flipVariations && (b && "start" === i && c || b && "end" === i && h || !b && "start" === i && m || !b && "end" === i && g);
            (d || v || w) && (e.flipped = !0, (d || v) && (r = a[f + 1]), w && (i = V(i)), e.placement = r + (i ? "-" + i : ""), e.offsets.popper = ve({}, e.offsets.popper, M(e.instance.popper, e.offsets.reference, e.placement)), e = k(e.instance.modifiers, e, "flip"))
        }), e
    }

    function J(e) {
        var t = e.offsets,
            n = t.popper,
            r = t.reference,
            o = e.placement.split("-")[0],
            i = Math.floor,
            a = -1 !== ["top", "bottom"].indexOf(o),
            s = a ? "right" : "bottom",
            f = a ? "left" : "top",
            p = a ? "width" : "height";
        return n[s] < i(r[f]) && (e.offsets.popper[f] = i(r[f]) - n[p]), n[f] > i(r[s]) && (e.offsets.popper[f] = i(r[s])), e
    }

    function Q(e, t, n, r) {
        var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            i = +o[1],
            a = o[2];
        if (!i) return e;
        if (0 === a.indexOf("%")) {
            var s = void 0;
            switch (a) {
                case "%p":
                    s = n;
                    break;
                case "%":
                case "%r":
                default:
                    s = r
            }
            var f = m(s);
            return f[t] / 100 * i
        }
        if ("vh" === a || "vw" === a) {
            var p = void 0;
            return p = "vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), p / 100 * i
        }
        return i
    }

    function Z(e, t, n, r) {
        var o = [0, 0],
            i = -1 !== ["right", "left"].indexOf(r),
            a = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = a.indexOf(C(a, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var f = /\s*,\s*|\s+/,
            p = -1 !== s ? [a.slice(0, s).concat([a[s].split(f)[0]]), [a[s].split(f)[1]].concat(a.slice(s + 1))] : [a];
        return p = p.map(function(e, r) {
            var o = (1 === r ? !i : i) ? "height" : "width",
                a = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return Q(e, o, t, n)
            })
        }), p.forEach(function(e, t) {
            e.forEach(function(n, r) {
                F(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1))
            })
        }), o
    }

    function $(e, t) {
        var n = t.offset,
            r = e.placement,
            o = e.offsets,
            i = o.popper,
            a = o.reference,
            s = r.split("-")[0],
            f = void 0;
        return f = F(+n) ? [+n, 0] : Z(n, i, a, s), "left" === s ? (i.top += f[0], i.left -= f[1]) : "right" === s ? (i.top += f[0], i.left += f[1]) : "top" === s ? (i.left += f[0], i.top -= f[1]) : "bottom" === s && (i.left += f[0], i.top += f[1]), e.popper = i, e
    }

    function ee(e, t) {
        var n = t.boundariesElement || a(e.instance.popper);
        e.instance.reference === n && (n = a(n));
        var r = y(e.instance.popper, e.instance.reference, t.padding, n);
        t.boundaries = r;
        var o = t.priority,
            i = e.offsets.popper,
            s = {
                primary: function(e) {
                    var n = i[e];
                    return i[e] < r[e] && !t.escapeWithReference && (n = Math.max(i[e], r[e])), ge({}, e, n)
                },
                secondary: function(e) {
                    var n = "right" === e ? "left" : "top",
                        o = i[n];
                    return i[e] > r[e] && !t.escapeWithReference && (o = Math.min(i[n], r[e] - ("right" === e ? i.width : i.height))), ge({}, n, o)
                }
            };
        return o.forEach(function(e) {
            var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
            i = ve({}, i, s[t](e))
        }), e.offsets.popper = i, e
    }

    function te(e) {
        var t = e.placement,
            n = t.split("-")[0],
            r = t.split("-")[1];
        if (r) {
            var o = e.offsets,
                i = o.reference,
                a = o.popper,
                s = -1 !== ["bottom", "top"].indexOf(n),
                f = s ? "left" : "top",
                p = s ? "width" : "height",
                u = {
                    start: ge({}, f, i[f]),
                    end: ge({}, f, i[f] + i[p] - a[p])
                };
            e.offsets.popper = ve({}, a, u[r])
        }
        return e
    }

    function ne(e) {
        if (!z(e.instance.modifiers, "hide", "preventOverflow")) return e;
        var t = e.offsets.reference,
            n = C(e.instance.modifiers, function(e) {
                return "preventOverflow" === e.name
            }).boundaries;
        if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
            if (e.hide === !0) return e;
            e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
        } else {
            if (e.hide === !1) return e;
            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
        }
        return e
    }

    function re(e) {
        var t = e.placement,
            n = t.split("-")[0],
            r = e.offsets,
            o = r.popper,
            i = r.reference,
            a = -1 !== ["left", "right"].indexOf(n),
            s = -1 === ["top", "left"].indexOf(n);
        return o[a ? "left" : "top"] = i[n] - (s ? o[a ? "width" : "height"] : 0), e.placement = T(t), e.offsets.popper = m(o), e
    }
    for (var oe = ["native code", "[object MutationObserverConstructor]"], ie = function(e) {
            return oe.some(function(t) {
                return (e || "").toString().indexOf(t) > -1
            })
        }, ae = "undefined" != typeof window, se = ["Edge", "Trident", "Firefox"], fe = 0, pe = 0; pe < se.length; pe += 1)
        if (ae && navigator.userAgent.indexOf(se[pe]) >= 0) {
            fe = 1;
            break
        }
    var ue = ae && ie(window.MutationObserver),
        le = ue ? e : t,
        de = void 0,
        ce = function() {
            return void 0 === de && (de = -1 !== navigator.appVersion.indexOf("MSIE 10")), de
        },
        he = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        me = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        ge = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        ve = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        be = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        we = be.slice(3),
        ye = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        Oe = {
            shift: {
                order: 100,
                enabled: !0,
                fn: te
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: $,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: ee,
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: J
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: G,
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: X,
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: re
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: ne
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: K,
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: Y,
                onLoad: q,
                gpuAcceleration: void 0
            }
        },
        Ee = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: Oe
        },
        xe = function() {
            function e(t, r) {
                var o = this,
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                he(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(o.update)
                }, this.update = le(this.update.bind(this)), this.options = ve({}, e.Defaults, i), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = t.jquery ? t[0] : t, this.popper = r.jquery ? r[0] : r, this.options.modifiers = {}, Object.keys(ve({}, e.Defaults.modifiers, i.modifiers)).forEach(function(t) {
                    o.options.modifiers[t] = ve({}, e.Defaults.modifiers[t] || {}, i.modifiers ? i.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return ve({
                        name: e
                    }, o.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && n(e.onLoad) && e.onLoad(o.reference, o.popper, o.options, e, o.state)
                }), this.update();
                var a = this.options.eventsEnabled;
                a && this.enableEventListeners(), this.state.eventsEnabled = a
            }
            return me(e, [{
                key: "update",
                value: function() {
                    return S.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return B.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return P.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return I.call(this)
                }
            }]), e
        }();
    return xe.Utils = ("undefined" != typeof window ? window : global).PopperUtils, xe.placements = be, xe.Defaults = Ee, xe
});