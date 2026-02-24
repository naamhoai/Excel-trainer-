import { ipcMain as jE, shell as Ti, app as nn, BrowserWindow as ft } from "electron";
import en from "path";
import ai, { fileURLToPath as Oi } from "url";
import L_ from "fs";
import zE from "util";
import d_ from "stream";
import T_ from "zlib";
import ui from "assert";
import de from "buffer";
import ci from "http";
import Ci from "node:buffer";
import JE from "events";
import Nn from "process";
import ri from "net";
import Mt from "tls";
import Ue from "timers";
import Di from "string_decoder";
import U_ from "crypto";
import "bcrypt";
import si from "os";
import { WebSocketServer as li } from "ws";
var hi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function oe(E) {
  return E && E.__esModule && Object.prototype.hasOwnProperty.call(E, "default") ? E.default : E;
}
var bE = {}, gt = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, we = {}, aE = {};
let Ge;
const Si = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
aE.getSymbolSize = function(_) {
  if (!_) throw new Error('"version" cannot be null or undefined');
  if (_ < 1 || _ > 40) throw new Error('"version" should be in range from 1 to 40');
  return _ * 4 + 17;
};
aE.getSymbolTotalCodewords = function(_) {
  return Si[_];
};
aE.getBCHDigit = function(E) {
  let _ = 0;
  for (; E !== 0; )
    _++, E >>>= 1;
  return _;
};
aE.setToSJISFunction = function(_) {
  if (typeof _ != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  Ge = _;
};
aE.isKanjiModeEnabled = function() {
  return typeof Ge < "u";
};
aE.toSJIS = function(_) {
  return Ge(_);
};
var Tn = {};
(function(E) {
  E.L = { bit: 1 }, E.M = { bit: 0 }, E.Q = { bit: 3 }, E.H = { bit: 2 };
  function _(n) {
    if (typeof n != "string")
      throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "l":
      case "low":
        return E.L;
      case "m":
      case "medium":
        return E.M;
      case "q":
      case "quartile":
        return E.Q;
      case "h":
      case "high":
        return E.H;
      default:
        throw new Error("Unknown EC Level: " + n);
    }
  }
  E.isValid = function(e) {
    return e && typeof e.bit < "u" && e.bit >= 0 && e.bit < 4;
  }, E.from = function(e, A) {
    if (E.isValid(e))
      return e;
    try {
      return _(e);
    } catch {
      return A;
    }
  };
})(Tn);
function Lt() {
  this.buffer = [], this.length = 0;
}
Lt.prototype = {
  get: function(E) {
    const _ = Math.floor(E / 8);
    return (this.buffer[_] >>> 7 - E % 8 & 1) === 1;
  },
  put: function(E, _) {
    for (let n = 0; n < _; n++)
      this.putBit((E >>> _ - n - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(E) {
    const _ = Math.floor(this.length / 8);
    this.buffer.length <= _ && this.buffer.push(0), E && (this.buffer[_] |= 128 >>> this.length % 8), this.length++;
  }
};
var Bi = Lt;
function o_(E) {
  if (!E || E < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = E, this.data = new Uint8Array(E * E), this.reservedBit = new Uint8Array(E * E);
}
o_.prototype.set = function(E, _, n, e) {
  const A = E * this.size + _;
  this.data[A] = n, e && (this.reservedBit[A] = !0);
};
o_.prototype.get = function(E, _) {
  return this.data[E * this.size + _];
};
o_.prototype.xor = function(E, _, n) {
  this.data[E * this.size + _] ^= n;
};
o_.prototype.isReserved = function(E, _) {
  return this.reservedBit[E * this.size + _];
};
var fi = o_, dt = {};
(function(E) {
  const _ = aE.getSymbolSize;
  E.getRowColCoords = function(e) {
    if (e === 1) return [];
    const A = Math.floor(e / 7) + 2, t = _(e), R = t === 145 ? 26 : Math.ceil((t - 13) / (2 * A - 2)) * 2, i = [t - 7];
    for (let I = 1; I < A - 1; I++)
      i[I] = i[I - 1] - R;
    return i.push(6), i.reverse();
  }, E.getPositions = function(e) {
    const A = [], t = E.getRowColCoords(e), R = t.length;
    for (let i = 0; i < R; i++)
      for (let I = 0; I < R; I++)
        i === 0 && I === 0 || // top-left
        i === 0 && I === R - 1 || // bottom-left
        i === R - 1 && I === 0 || A.push([t[i], t[I]]);
    return A;
  };
})(dt);
var Ut = {};
const Mi = aE.getSymbolSize, tA = 7;
Ut.getPositions = function(_) {
  const n = Mi(_);
  return [
    // top-left
    [0, 0],
    // top-right
    [n - tA, 0],
    // bottom-left
    [0, n - tA]
  ];
};
var ot = {};
(function(E) {
  E.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const _ = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  E.isValid = function(A) {
    return A != null && A !== "" && !isNaN(A) && A >= 0 && A <= 7;
  }, E.from = function(A) {
    return E.isValid(A) ? parseInt(A, 10) : void 0;
  }, E.getPenaltyN1 = function(A) {
    const t = A.size;
    let R = 0, i = 0, I = 0, N = null, T = null;
    for (let a = 0; a < t; a++) {
      i = I = 0, N = T = null;
      for (let u = 0; u < t; u++) {
        let C = A.get(a, u);
        C === N ? i++ : (i >= 5 && (R += _.N1 + (i - 5)), N = C, i = 1), C = A.get(u, a), C === T ? I++ : (I >= 5 && (R += _.N1 + (I - 5)), T = C, I = 1);
      }
      i >= 5 && (R += _.N1 + (i - 5)), I >= 5 && (R += _.N1 + (I - 5));
    }
    return R;
  }, E.getPenaltyN2 = function(A) {
    const t = A.size;
    let R = 0;
    for (let i = 0; i < t - 1; i++)
      for (let I = 0; I < t - 1; I++) {
        const N = A.get(i, I) + A.get(i, I + 1) + A.get(i + 1, I) + A.get(i + 1, I + 1);
        (N === 4 || N === 0) && R++;
      }
    return R * _.N2;
  }, E.getPenaltyN3 = function(A) {
    const t = A.size;
    let R = 0, i = 0, I = 0;
    for (let N = 0; N < t; N++) {
      i = I = 0;
      for (let T = 0; T < t; T++)
        i = i << 1 & 2047 | A.get(N, T), T >= 10 && (i === 1488 || i === 93) && R++, I = I << 1 & 2047 | A.get(T, N), T >= 10 && (I === 1488 || I === 93) && R++;
    }
    return R * _.N3;
  }, E.getPenaltyN4 = function(A) {
    let t = 0;
    const R = A.data.length;
    for (let I = 0; I < R; I++) t += A.data[I];
    return Math.abs(Math.ceil(t * 100 / R / 5) - 10) * _.N4;
  };
  function n(e, A, t) {
    switch (e) {
      case E.Patterns.PATTERN000:
        return (A + t) % 2 === 0;
      case E.Patterns.PATTERN001:
        return A % 2 === 0;
      case E.Patterns.PATTERN010:
        return t % 3 === 0;
      case E.Patterns.PATTERN011:
        return (A + t) % 3 === 0;
      case E.Patterns.PATTERN100:
        return (Math.floor(A / 2) + Math.floor(t / 3)) % 2 === 0;
      case E.Patterns.PATTERN101:
        return A * t % 2 + A * t % 3 === 0;
      case E.Patterns.PATTERN110:
        return (A * t % 2 + A * t % 3) % 2 === 0;
      case E.Patterns.PATTERN111:
        return (A * t % 3 + (A + t) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + e);
    }
  }
  E.applyMask = function(A, t) {
    const R = t.size;
    for (let i = 0; i < R; i++)
      for (let I = 0; I < R; I++)
        t.isReserved(I, i) || t.xor(I, i, n(A, I, i));
  }, E.getBestMask = function(A, t) {
    const R = Object.keys(E.Patterns).length;
    let i = 0, I = 1 / 0;
    for (let N = 0; N < R; N++) {
      t(N), E.applyMask(N, A);
      const T = E.getPenaltyN1(A) + E.getPenaltyN2(A) + E.getPenaltyN3(A) + E.getPenaltyN4(A);
      E.applyMask(N, A), T < I && (I = T, i = N);
    }
    return i;
  };
})(ot);
var an = {};
const QE = Tn, Y_ = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], y_ = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
an.getBlocksCount = function(_, n) {
  switch (n) {
    case QE.L:
      return Y_[(_ - 1) * 4 + 0];
    case QE.M:
      return Y_[(_ - 1) * 4 + 1];
    case QE.Q:
      return Y_[(_ - 1) * 4 + 2];
    case QE.H:
      return Y_[(_ - 1) * 4 + 3];
    default:
      return;
  }
};
an.getTotalCodewordsCount = function(_, n) {
  switch (n) {
    case QE.L:
      return y_[(_ - 1) * 4 + 0];
    case QE.M:
      return y_[(_ - 1) * 4 + 1];
    case QE.Q:
      return y_[(_ - 1) * 4 + 2];
    case QE.H:
      return y_[(_ - 1) * 4 + 3];
    default:
      return;
  }
};
var wt = {}, On = {};
const B_ = new Uint8Array(512), An = new Uint8Array(256);
(function() {
  let _ = 1;
  for (let n = 0; n < 255; n++)
    B_[n] = _, An[_] = n, _ <<= 1, _ & 256 && (_ ^= 285);
  for (let n = 255; n < 512; n++)
    B_[n] = B_[n - 255];
})();
On.log = function(_) {
  if (_ < 1) throw new Error("log(" + _ + ")");
  return An[_];
};
On.exp = function(_) {
  return B_[_];
};
On.mul = function(_, n) {
  return _ === 0 || n === 0 ? 0 : B_[An[_] + An[n]];
};
(function(E) {
  const _ = On;
  E.mul = function(e, A) {
    const t = new Uint8Array(e.length + A.length - 1);
    for (let R = 0; R < e.length; R++)
      for (let i = 0; i < A.length; i++)
        t[R + i] ^= _.mul(e[R], A[i]);
    return t;
  }, E.mod = function(e, A) {
    let t = new Uint8Array(e);
    for (; t.length - A.length >= 0; ) {
      const R = t[0];
      for (let I = 0; I < A.length; I++)
        t[I] ^= _.mul(A[I], R);
      let i = 0;
      for (; i < t.length && t[i] === 0; ) i++;
      t = t.slice(i);
    }
    return t;
  }, E.generateECPolynomial = function(e) {
    let A = new Uint8Array([1]);
    for (let t = 0; t < e; t++)
      A = E.mul(A, new Uint8Array([1, _.exp(t)]));
    return A;
  };
})(wt);
const Gt = wt;
function Fe(E) {
  this.genPoly = void 0, this.degree = E, this.degree && this.initialize(this.degree);
}
Fe.prototype.initialize = function(_) {
  this.degree = _, this.genPoly = Gt.generateECPolynomial(this.degree);
};
Fe.prototype.encode = function(_) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const n = new Uint8Array(_.length + this.degree);
  n.set(_);
  const e = Gt.mod(n, this.genPoly), A = this.degree - e.length;
  if (A > 0) {
    const t = new Uint8Array(this.degree);
    return t.set(e, A), t;
  }
  return e;
};
var gi = Fe, Ft = {}, mE = {}, Pe = {};
Pe.isValid = function(_) {
  return !isNaN(_) && _ >= 1 && _ <= 40;
};
var sE = {};
const Pt = "[0-9]+", Li = "[A-Z $%*+\\-./:]+";
let g_ = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
g_ = g_.replace(/u/g, "\\u");
const di = "(?:(?![A-Z0-9 $%*+\\-./:]|" + g_ + `)(?:.|[\r
]))+`;
sE.KANJI = new RegExp(g_, "g");
sE.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
sE.BYTE = new RegExp(di, "g");
sE.NUMERIC = new RegExp(Pt, "g");
sE.ALPHANUMERIC = new RegExp(Li, "g");
const Ui = new RegExp("^" + g_ + "$"), oi = new RegExp("^" + Pt + "$"), wi = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
sE.testKanji = function(_) {
  return Ui.test(_);
};
sE.testNumeric = function(_) {
  return oi.test(_);
};
sE.testAlphanumeric = function(_) {
  return wi.test(_);
};
(function(E) {
  const _ = Pe, n = sE;
  E.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, E.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, E.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, E.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, E.MIXED = {
    bit: -1
  }, E.getCharCountIndicator = function(t, R) {
    if (!t.ccBits) throw new Error("Invalid mode: " + t);
    if (!_.isValid(R))
      throw new Error("Invalid version: " + R);
    return R >= 1 && R < 10 ? t.ccBits[0] : R < 27 ? t.ccBits[1] : t.ccBits[2];
  }, E.getBestModeForData = function(t) {
    return n.testNumeric(t) ? E.NUMERIC : n.testAlphanumeric(t) ? E.ALPHANUMERIC : n.testKanji(t) ? E.KANJI : E.BYTE;
  }, E.toString = function(t) {
    if (t && t.id) return t.id;
    throw new Error("Invalid mode");
  }, E.isValid = function(t) {
    return t && t.bit && t.ccBits;
  };
  function e(A) {
    if (typeof A != "string")
      throw new Error("Param is not a string");
    switch (A.toLowerCase()) {
      case "numeric":
        return E.NUMERIC;
      case "alphanumeric":
        return E.ALPHANUMERIC;
      case "kanji":
        return E.KANJI;
      case "byte":
        return E.BYTE;
      default:
        throw new Error("Unknown mode: " + A);
    }
  }
  E.from = function(t, R) {
    if (E.isValid(t))
      return t;
    try {
      return e(t);
    } catch {
      return R;
    }
  };
})(mE);
(function(E) {
  const _ = aE, n = an, e = Tn, A = mE, t = Pe, R = 7973, i = _.getBCHDigit(R);
  function I(u, C, r) {
    for (let D = 1; D <= 40; D++)
      if (C <= E.getCapacity(D, r, u))
        return D;
  }
  function N(u, C) {
    return A.getCharCountIndicator(u, C) + 4;
  }
  function T(u, C) {
    let r = 0;
    return u.forEach(function(D) {
      const c = N(D.mode, C);
      r += c + D.getBitsLength();
    }), r;
  }
  function a(u, C) {
    for (let r = 1; r <= 40; r++)
      if (T(u, r) <= E.getCapacity(r, C, A.MIXED))
        return r;
  }
  E.from = function(C, r) {
    return t.isValid(C) ? parseInt(C, 10) : r;
  }, E.getCapacity = function(C, r, D) {
    if (!t.isValid(C))
      throw new Error("Invalid QR Code version");
    typeof D > "u" && (D = A.BYTE);
    const c = _.getSymbolTotalCodewords(C), l = n.getTotalCodewordsCount(C, r), S = (c - l) * 8;
    if (D === A.MIXED) return S;
    const B = S - N(D, C);
    switch (D) {
      case A.NUMERIC:
        return Math.floor(B / 10 * 3);
      case A.ALPHANUMERIC:
        return Math.floor(B / 11 * 2);
      case A.KANJI:
        return Math.floor(B / 13);
      case A.BYTE:
      default:
        return Math.floor(B / 8);
    }
  }, E.getBestVersionForData = function(C, r) {
    let D;
    const c = e.from(r, e.M);
    if (Array.isArray(C)) {
      if (C.length > 1)
        return a(C, c);
      if (C.length === 0)
        return 1;
      D = C[0];
    } else
      D = C;
    return I(D.mode, D.getLength(), c);
  }, E.getEncodedBits = function(C) {
    if (!t.isValid(C) || C < 7)
      throw new Error("Invalid QR Code version");
    let r = C << 12;
    for (; _.getBCHDigit(r) - i >= 0; )
      r ^= R << _.getBCHDigit(r) - i;
    return C << 12 | r;
  };
})(Ft);
var Qt = {};
const Ne = aE, Vt = 1335, Gi = 21522, RA = Ne.getBCHDigit(Vt);
Qt.getEncodedBits = function(_, n) {
  const e = _.bit << 3 | n;
  let A = e << 10;
  for (; Ne.getBCHDigit(A) - RA >= 0; )
    A ^= Vt << Ne.getBCHDigit(A) - RA;
  return (e << 10 | A) ^ Gi;
};
var bt = {};
const Fi = mE;
function R_(E) {
  this.mode = Fi.NUMERIC, this.data = E.toString();
}
R_.getBitsLength = function(_) {
  return 10 * Math.floor(_ / 3) + (_ % 3 ? _ % 3 * 3 + 1 : 0);
};
R_.prototype.getLength = function() {
  return this.data.length;
};
R_.prototype.getBitsLength = function() {
  return R_.getBitsLength(this.data.length);
};
R_.prototype.write = function(_) {
  let n, e, A;
  for (n = 0; n + 3 <= this.data.length; n += 3)
    e = this.data.substr(n, 3), A = parseInt(e, 10), _.put(A, 10);
  const t = this.data.length - n;
  t > 0 && (e = this.data.substr(n), A = parseInt(e, 10), _.put(A, t * 3 + 1));
};
var Pi = R_;
const Qi = mE, hn = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function i_(E) {
  this.mode = Qi.ALPHANUMERIC, this.data = E;
}
i_.getBitsLength = function(_) {
  return 11 * Math.floor(_ / 2) + 6 * (_ % 2);
};
i_.prototype.getLength = function() {
  return this.data.length;
};
i_.prototype.getBitsLength = function() {
  return i_.getBitsLength(this.data.length);
};
i_.prototype.write = function(_) {
  let n;
  for (n = 0; n + 2 <= this.data.length; n += 2) {
    let e = hn.indexOf(this.data[n]) * 45;
    e += hn.indexOf(this.data[n + 1]), _.put(e, 11);
  }
  this.data.length % 2 && _.put(hn.indexOf(this.data[n]), 6);
};
var Vi = i_;
const bi = mE;
function I_(E) {
  this.mode = bi.BYTE, typeof E == "string" ? this.data = new TextEncoder().encode(E) : this.data = new Uint8Array(E);
}
I_.getBitsLength = function(_) {
  return _ * 8;
};
I_.prototype.getLength = function() {
  return this.data.length;
};
I_.prototype.getBitsLength = function() {
  return I_.getBitsLength(this.data.length);
};
I_.prototype.write = function(E) {
  for (let _ = 0, n = this.data.length; _ < n; _++)
    E.put(this.data[_], 8);
};
var mi = I_;
const Yi = mE, yi = aE;
function N_(E) {
  this.mode = Yi.KANJI, this.data = E;
}
N_.getBitsLength = function(_) {
  return _ * 13;
};
N_.prototype.getLength = function() {
  return this.data.length;
};
N_.prototype.getBitsLength = function() {
  return N_.getBitsLength(this.data.length);
};
N_.prototype.write = function(E) {
  let _;
  for (_ = 0; _ < this.data.length; _++) {
    let n = yi.toSJIS(this.data[_]);
    if (n >= 33088 && n <= 40956)
      n -= 33088;
    else if (n >= 57408 && n <= 60351)
      n -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[_] + `
Make sure your charset is UTF-8`
      );
    n = (n >>> 8 & 255) * 192 + (n & 255), E.put(n, 13);
  }
};
var Wi = N_, mt = { exports: {} };
(function(E) {
  var _ = {
    single_source_shortest_paths: function(n, e, A) {
      var t = {}, R = {};
      R[e] = 0;
      var i = _.PriorityQueue.make();
      i.push(e, 0);
      for (var I, N, T, a, u, C, r, D, c; !i.empty(); ) {
        I = i.pop(), N = I.value, a = I.cost, u = n[N] || {};
        for (T in u)
          u.hasOwnProperty(T) && (C = u[T], r = a + C, D = R[T], c = typeof R[T] > "u", (c || D > r) && (R[T] = r, i.push(T, r), t[T] = N));
      }
      if (typeof A < "u" && typeof R[A] > "u") {
        var l = ["Could not find a path from ", e, " to ", A, "."].join("");
        throw new Error(l);
      }
      return t;
    },
    extract_shortest_path_from_predecessor_list: function(n, e) {
      for (var A = [], t = e; t; )
        A.push(t), n[t], t = n[t];
      return A.reverse(), A;
    },
    find_path: function(n, e, A) {
      var t = _.single_source_shortest_paths(n, e, A);
      return _.extract_shortest_path_from_predecessor_list(
        t,
        A
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(n) {
        var e = _.PriorityQueue, A = {}, t;
        n = n || {};
        for (t in e)
          e.hasOwnProperty(t) && (A[t] = e[t]);
        return A.queue = [], A.sorter = n.sorter || e.default_sorter, A;
      },
      default_sorter: function(n, e) {
        return n.cost - e.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(n, e) {
        var A = { value: n, cost: e };
        this.queue.push(A), this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  E.exports = _;
})(mt);
var Hi = mt.exports;
(function(E) {
  const _ = mE, n = Pi, e = Vi, A = mi, t = Wi, R = sE, i = aE, I = Hi;
  function N(l) {
    return unescape(encodeURIComponent(l)).length;
  }
  function T(l, S, B) {
    const h = [];
    let g;
    for (; (g = l.exec(B)) !== null; )
      h.push({
        data: g[0],
        index: g.index,
        mode: S,
        length: g[0].length
      });
    return h;
  }
  function a(l) {
    const S = T(R.NUMERIC, _.NUMERIC, l), B = T(R.ALPHANUMERIC, _.ALPHANUMERIC, l);
    let h, g;
    return i.isKanjiModeEnabled() ? (h = T(R.BYTE, _.BYTE, l), g = T(R.KANJI, _.KANJI, l)) : (h = T(R.BYTE_KANJI, _.BYTE, l), g = []), S.concat(B, h, g).sort(function(U, F) {
      return U.index - F.index;
    }).map(function(U) {
      return {
        data: U.data,
        mode: U.mode,
        length: U.length
      };
    });
  }
  function u(l, S) {
    switch (S) {
      case _.NUMERIC:
        return n.getBitsLength(l);
      case _.ALPHANUMERIC:
        return e.getBitsLength(l);
      case _.KANJI:
        return t.getBitsLength(l);
      case _.BYTE:
        return A.getBitsLength(l);
    }
  }
  function C(l) {
    return l.reduce(function(S, B) {
      const h = S.length - 1 >= 0 ? S[S.length - 1] : null;
      return h && h.mode === B.mode ? (S[S.length - 1].data += B.data, S) : (S.push(B), S);
    }, []);
  }
  function r(l) {
    const S = [];
    for (let B = 0; B < l.length; B++) {
      const h = l[B];
      switch (h.mode) {
        case _.NUMERIC:
          S.push([
            h,
            { data: h.data, mode: _.ALPHANUMERIC, length: h.length },
            { data: h.data, mode: _.BYTE, length: h.length }
          ]);
          break;
        case _.ALPHANUMERIC:
          S.push([
            h,
            { data: h.data, mode: _.BYTE, length: h.length }
          ]);
          break;
        case _.KANJI:
          S.push([
            h,
            { data: h.data, mode: _.BYTE, length: N(h.data) }
          ]);
          break;
        case _.BYTE:
          S.push([
            { data: h.data, mode: _.BYTE, length: N(h.data) }
          ]);
      }
    }
    return S;
  }
  function D(l, S) {
    const B = {}, h = { start: {} };
    let g = ["start"];
    for (let L = 0; L < l.length; L++) {
      const U = l[L], F = [];
      for (let Q = 0; Q < U.length; Q++) {
        const y = U[Q], k = "" + L + Q;
        F.push(k), B[k] = { node: y, lastCount: 0 }, h[k] = {};
        for (let G = 0; G < g.length; G++) {
          const s = g[G];
          B[s] && B[s].node.mode === y.mode ? (h[s][k] = u(B[s].lastCount + y.length, y.mode) - u(B[s].lastCount, y.mode), B[s].lastCount += y.length) : (B[s] && (B[s].lastCount = y.length), h[s][k] = u(y.length, y.mode) + 4 + _.getCharCountIndicator(y.mode, S));
        }
      }
      g = F;
    }
    for (let L = 0; L < g.length; L++)
      h[g[L]].end = 0;
    return { map: h, table: B };
  }
  function c(l, S) {
    let B;
    const h = _.getBestModeForData(l);
    if (B = _.from(S, h), B !== _.BYTE && B.bit < h.bit)
      throw new Error('"' + l + '" cannot be encoded with mode ' + _.toString(B) + `.
 Suggested mode is: ` + _.toString(h));
    switch (B === _.KANJI && !i.isKanjiModeEnabled() && (B = _.BYTE), B) {
      case _.NUMERIC:
        return new n(l);
      case _.ALPHANUMERIC:
        return new e(l);
      case _.KANJI:
        return new t(l);
      case _.BYTE:
        return new A(l);
    }
  }
  E.fromArray = function(S) {
    return S.reduce(function(B, h) {
      return typeof h == "string" ? B.push(c(h, null)) : h.data && B.push(c(h.data, h.mode)), B;
    }, []);
  }, E.fromString = function(S, B) {
    const h = a(S, i.isKanjiModeEnabled()), g = r(h), L = D(g, B), U = I.find_path(L.map, "start", "end"), F = [];
    for (let Q = 1; Q < U.length - 1; Q++)
      F.push(L.table[U[Q]].node);
    return E.fromArray(C(F));
  }, E.rawSplit = function(S) {
    return E.fromArray(
      a(S, i.isKanjiModeEnabled())
    );
  };
})(bt);
const un = aE, Sn = Tn, vi = Bi, Xi = fi, Ki = dt, ki = Ut, Te = ot, ae = an, ji = gi, tn = Ft, zi = Qt, Ji = mE, Bn = bt;
function Zi(E, _) {
  const n = E.size, e = ki.getPositions(_);
  for (let A = 0; A < e.length; A++) {
    const t = e[A][0], R = e[A][1];
    for (let i = -1; i <= 7; i++)
      if (!(t + i <= -1 || n <= t + i))
        for (let I = -1; I <= 7; I++)
          R + I <= -1 || n <= R + I || (i >= 0 && i <= 6 && (I === 0 || I === 6) || I >= 0 && I <= 6 && (i === 0 || i === 6) || i >= 2 && i <= 4 && I >= 2 && I <= 4 ? E.set(t + i, R + I, !0, !0) : E.set(t + i, R + I, !1, !0));
  }
}
function qi(E) {
  const _ = E.size;
  for (let n = 8; n < _ - 8; n++) {
    const e = n % 2 === 0;
    E.set(n, 6, e, !0), E.set(6, n, e, !0);
  }
}
function pi(E, _) {
  const n = Ki.getPositions(_);
  for (let e = 0; e < n.length; e++) {
    const A = n[e][0], t = n[e][1];
    for (let R = -2; R <= 2; R++)
      for (let i = -2; i <= 2; i++)
        R === -2 || R === 2 || i === -2 || i === 2 || R === 0 && i === 0 ? E.set(A + R, t + i, !0, !0) : E.set(A + R, t + i, !1, !0);
  }
}
function xi(E, _) {
  const n = E.size, e = tn.getEncodedBits(_);
  let A, t, R;
  for (let i = 0; i < 18; i++)
    A = Math.floor(i / 3), t = i % 3 + n - 8 - 3, R = (e >> i & 1) === 1, E.set(A, t, R, !0), E.set(t, A, R, !0);
}
function fn(E, _, n) {
  const e = E.size, A = zi.getEncodedBits(_, n);
  let t, R;
  for (t = 0; t < 15; t++)
    R = (A >> t & 1) === 1, t < 6 ? E.set(t, 8, R, !0) : t < 8 ? E.set(t + 1, 8, R, !0) : E.set(e - 15 + t, 8, R, !0), t < 8 ? E.set(8, e - t - 1, R, !0) : t < 9 ? E.set(8, 15 - t - 1 + 1, R, !0) : E.set(8, 15 - t - 1, R, !0);
  E.set(e - 8, 8, 1, !0);
}
function $i(E, _) {
  const n = E.size;
  let e = -1, A = n - 1, t = 7, R = 0;
  for (let i = n - 1; i > 0; i -= 2)
    for (i === 6 && i--; ; ) {
      for (let I = 0; I < 2; I++)
        if (!E.isReserved(A, i - I)) {
          let N = !1;
          R < _.length && (N = (_[R] >>> t & 1) === 1), E.set(A, i - I, N), t--, t === -1 && (R++, t = 7);
        }
      if (A += e, A < 0 || n <= A) {
        A -= e, e = -e;
        break;
      }
    }
}
function EI(E, _, n) {
  const e = new vi();
  n.forEach(function(I) {
    e.put(I.mode.bit, 4), e.put(I.getLength(), Ji.getCharCountIndicator(I.mode, E)), I.write(e);
  });
  const A = un.getSymbolTotalCodewords(E), t = ae.getTotalCodewordsCount(E, _), R = (A - t) * 8;
  for (e.getLengthInBits() + 4 <= R && e.put(0, 4); e.getLengthInBits() % 8 !== 0; )
    e.putBit(0);
  const i = (R - e.getLengthInBits()) / 8;
  for (let I = 0; I < i; I++)
    e.put(I % 2 ? 17 : 236, 8);
  return _I(e, E, _);
}
function _I(E, _, n) {
  const e = un.getSymbolTotalCodewords(_), A = ae.getTotalCodewordsCount(_, n), t = e - A, R = ae.getBlocksCount(_, n), i = e % R, I = R - i, N = Math.floor(e / R), T = Math.floor(t / R), a = T + 1, u = N - T, C = new ji(u);
  let r = 0;
  const D = new Array(R), c = new Array(R);
  let l = 0;
  const S = new Uint8Array(E.buffer);
  for (let U = 0; U < R; U++) {
    const F = U < I ? T : a;
    D[U] = S.slice(r, r + F), c[U] = C.encode(D[U]), r += F, l = Math.max(l, F);
  }
  const B = new Uint8Array(e);
  let h = 0, g, L;
  for (g = 0; g < l; g++)
    for (L = 0; L < R; L++)
      g < D[L].length && (B[h++] = D[L][g]);
  for (g = 0; g < u; g++)
    for (L = 0; L < R; L++)
      B[h++] = c[L][g];
  return B;
}
function nI(E, _, n, e) {
  let A;
  if (Array.isArray(E))
    A = Bn.fromArray(E);
  else if (typeof E == "string") {
    let N = _;
    if (!N) {
      const T = Bn.rawSplit(E);
      N = tn.getBestVersionForData(T, n);
    }
    A = Bn.fromString(E, N || 40);
  } else
    throw new Error("Invalid data");
  const t = tn.getBestVersionForData(A, n);
  if (!t)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!_)
    _ = t;
  else if (_ < t)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + t + `.
`
    );
  const R = EI(_, n, A), i = un.getSymbolSize(_), I = new Xi(i);
  return Zi(I, _), qi(I), pi(I, _), fn(I, n, 0), _ >= 7 && xi(I, _), $i(I, R), isNaN(e) && (e = Te.getBestMask(
    I,
    fn.bind(null, I, n)
  )), Te.applyMask(e, I), fn(I, n, e), {
    modules: I,
    version: _,
    errorCorrectionLevel: n,
    maskPattern: e,
    segments: A
  };
}
we.create = function(_, n) {
  if (typeof _ > "u" || _ === "")
    throw new Error("No input text");
  let e = Sn.M, A, t;
  return typeof n < "u" && (e = Sn.from(n.errorCorrectionLevel, Sn.M), A = tn.from(n.version), t = Te.from(n.maskPattern), n.toSJISFunc && un.setToSJISFunction(n.toSJISFunc)), nI(_, A, e, t);
};
var Yt = {}, yt = {}, Wt = { exports: {} }, Ht = { exports: {} };
let eI = zE, vt = d_, CE = Ht.exports = function() {
  vt.call(this), this._buffers = [], this._buffered = 0, this._reads = [], this._paused = !1, this._encoding = "utf8", this.writable = !0;
};
eI.inherits(CE, vt);
CE.prototype.read = function(E, _) {
  this._reads.push({
    length: Math.abs(E),
    // if length < 0 then at most this length
    allowLess: E < 0,
    func: _
  }), process.nextTick(
    (function() {
      this._process(), this._paused && this._reads && this._reads.length > 0 && (this._paused = !1, this.emit("drain"));
    }).bind(this)
  );
};
CE.prototype.write = function(E, _) {
  if (!this.writable)
    return this.emit("error", new Error("Stream not writable")), !1;
  let n;
  return Buffer.isBuffer(E) ? n = E : n = Buffer.from(E, _ || this._encoding), this._buffers.push(n), this._buffered += n.length, this._process(), this._reads && this._reads.length === 0 && (this._paused = !0), this.writable && !this._paused;
};
CE.prototype.end = function(E, _) {
  E && this.write(E, _), this.writable = !1, this._buffers && (this._buffers.length === 0 ? this._end() : (this._buffers.push(null), this._process()));
};
CE.prototype.destroySoon = CE.prototype.end;
CE.prototype._end = function() {
  this._reads.length > 0 && this.emit("error", new Error("Unexpected end of input")), this.destroy();
};
CE.prototype.destroy = function() {
  this._buffers && (this.writable = !1, this._reads = null, this._buffers = null, this.emit("close"));
};
CE.prototype._processReadAllowingLess = function(E) {
  this._reads.shift();
  let _ = this._buffers[0];
  _.length > E.length ? (this._buffered -= E.length, this._buffers[0] = _.slice(E.length), E.func.call(this, _.slice(0, E.length))) : (this._buffered -= _.length, this._buffers.shift(), E.func.call(this, _));
};
CE.prototype._processRead = function(E) {
  this._reads.shift();
  let _ = 0, n = 0, e = Buffer.alloc(E.length);
  for (; _ < E.length; ) {
    let A = this._buffers[n++], t = Math.min(A.length, E.length - _);
    A.copy(e, _, 0, t), _ += t, t !== A.length && (this._buffers[--n] = A.slice(t));
  }
  n > 0 && this._buffers.splice(0, n), this._buffered -= E.length, E.func.call(this, e);
};
CE.prototype._process = function() {
  try {
    for (; this._buffered > 0 && this._reads && this._reads.length > 0; ) {
      let E = this._reads[0];
      if (E.allowLess)
        this._processReadAllowingLess(E);
      else if (this._buffered >= E.length)
        this._processRead(E);
      else
        break;
    }
    this._buffers && !this.writable && this._end();
  } catch (E) {
    this.emit("error", E);
  }
};
var Xt = Ht.exports, Kt = { exports: {} }, kt = { exports: {} }, cn = {};
let PE = [
  {
    // pass 1 - 1px
    x: [0],
    y: [0]
  },
  {
    // pass 2 - 1px
    x: [4],
    y: [0]
  },
  {
    // pass 3 - 2px
    x: [0, 4],
    y: [4]
  },
  {
    // pass 4 - 4px
    x: [2, 6],
    y: [0, 4]
  },
  {
    // pass 5 - 8px
    x: [0, 2, 4, 6],
    y: [2, 6]
  },
  {
    // pass 6 - 16px
    x: [1, 3, 5, 7],
    y: [0, 2, 4, 6]
  },
  {
    // pass 7 - 32px
    x: [0, 1, 2, 3, 4, 5, 6, 7],
    y: [1, 3, 5, 7]
  }
];
cn.getImagePasses = function(E, _) {
  let n = [], e = E % 8, A = _ % 8, t = (E - e) / 8, R = (_ - A) / 8;
  for (let i = 0; i < PE.length; i++) {
    let I = PE[i], N = t * I.x.length, T = R * I.y.length;
    for (let a = 0; a < I.x.length && I.x[a] < e; a++)
      N++;
    for (let a = 0; a < I.y.length && I.y[a] < A; a++)
      T++;
    N > 0 && T > 0 && n.push({ width: N, height: T, index: i });
  }
  return n;
};
cn.getInterlaceIterator = function(E) {
  return function(_, n, e) {
    let A = _ % PE[e].x.length, t = (_ - A) / PE[e].x.length * 8 + PE[e].x[A], R = n % PE[e].y.length, i = (n - R) / PE[e].y.length * 8 + PE[e].y[R];
    return t * 4 + i * E * 4;
  };
};
var jt = function(_, n, e) {
  let A = _ + n - e, t = Math.abs(A - _), R = Math.abs(A - n), i = Math.abs(A - e);
  return t <= R && t <= i ? _ : R <= i ? n : e;
};
let AI = cn, tI = jt;
function iA(E, _, n) {
  let e = E * _;
  return n !== 8 && (e = Math.ceil(e / (8 / n))), e;
}
let a_ = kt.exports = function(E, _) {
  let n = E.width, e = E.height, A = E.interlace, t = E.bpp, R = E.depth;
  if (this.read = _.read, this.write = _.write, this.complete = _.complete, this._imageIndex = 0, this._images = [], A) {
    let i = AI.getImagePasses(n, e);
    for (let I = 0; I < i.length; I++)
      this._images.push({
        byteWidth: iA(i[I].width, t, R),
        height: i[I].height,
        lineIndex: 0
      });
  } else
    this._images.push({
      byteWidth: iA(n, t, R),
      height: e,
      lineIndex: 0
    });
  R === 8 ? this._xComparison = t : R === 16 ? this._xComparison = t * 2 : this._xComparison = 1;
};
a_.prototype.start = function() {
  this.read(
    this._images[this._imageIndex].byteWidth + 1,
    this._reverseFilterLine.bind(this)
  );
};
a_.prototype._unFilterType1 = function(E, _, n) {
  let e = this._xComparison, A = e - 1;
  for (let t = 0; t < n; t++) {
    let R = E[1 + t], i = t > A ? _[t - e] : 0;
    _[t] = R + i;
  }
};
a_.prototype._unFilterType2 = function(E, _, n) {
  let e = this._lastLine;
  for (let A = 0; A < n; A++) {
    let t = E[1 + A], R = e ? e[A] : 0;
    _[A] = t + R;
  }
};
a_.prototype._unFilterType3 = function(E, _, n) {
  let e = this._xComparison, A = e - 1, t = this._lastLine;
  for (let R = 0; R < n; R++) {
    let i = E[1 + R], I = t ? t[R] : 0, N = R > A ? _[R - e] : 0, T = Math.floor((N + I) / 2);
    _[R] = i + T;
  }
};
a_.prototype._unFilterType4 = function(E, _, n) {
  let e = this._xComparison, A = e - 1, t = this._lastLine;
  for (let R = 0; R < n; R++) {
    let i = E[1 + R], I = t ? t[R] : 0, N = R > A ? _[R - e] : 0, T = R > A && t ? t[R - e] : 0, a = tI(N, I, T);
    _[R] = i + a;
  }
};
a_.prototype._reverseFilterLine = function(E) {
  let _ = E[0], n, e = this._images[this._imageIndex], A = e.byteWidth;
  if (_ === 0)
    n = E.slice(1, A + 1);
  else
    switch (n = Buffer.alloc(A), _) {
      case 1:
        this._unFilterType1(E, n, A);
        break;
      case 2:
        this._unFilterType2(E, n, A);
        break;
      case 3:
        this._unFilterType3(E, n, A);
        break;
      case 4:
        this._unFilterType4(E, n, A);
        break;
      default:
        throw new Error("Unrecognised filter type - " + _);
    }
  this.write(n), e.lineIndex++, e.lineIndex >= e.height ? (this._lastLine = null, this._imageIndex++, e = this._images[this._imageIndex]) : this._lastLine = n, e ? this.read(e.byteWidth + 1, this._reverseFilterLine.bind(this)) : (this._lastLine = null, this.complete());
};
var zt = kt.exports;
let RI = zE, Jt = Xt, iI = zt, II = Kt.exports = function(E) {
  Jt.call(this);
  let _ = [], n = this;
  this._filter = new iI(E, {
    read: this.read.bind(this),
    write: function(e) {
      _.push(e);
    },
    complete: function() {
      n.emit("complete", Buffer.concat(_));
    }
  }), this._filter.start();
};
RI.inherits(II, Jt);
var NI = Kt.exports, Zt = { exports: {} }, w_ = {
  PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
  TYPE_IHDR: 1229472850,
  TYPE_IEND: 1229278788,
  TYPE_IDAT: 1229209940,
  TYPE_PLTE: 1347179589,
  TYPE_tRNS: 1951551059,
  // eslint-disable-line camelcase
  TYPE_gAMA: 1732332865,
  // eslint-disable-line camelcase
  // color-type bits
  COLORTYPE_GRAYSCALE: 0,
  COLORTYPE_PALETTE: 1,
  COLORTYPE_COLOR: 2,
  COLORTYPE_ALPHA: 4,
  // e.g. grayscale and alpha
  // color-type combinations
  COLORTYPE_PALETTE_COLOR: 3,
  COLORTYPE_COLOR_ALPHA: 6,
  COLORTYPE_TO_BPP_MAP: {
    0: 1,
    2: 3,
    3: 1,
    4: 2,
    6: 4
  },
  GAMMA_DIVISION: 1e5
}, qt = { exports: {} };
let Qe = [];
(function() {
  for (let E = 0; E < 256; E++) {
    let _ = E;
    for (let n = 0; n < 8; n++)
      _ & 1 ? _ = 3988292384 ^ _ >>> 1 : _ = _ >>> 1;
    Qe[E] = _;
  }
})();
let Ve = qt.exports = function() {
  this._crc = -1;
};
Ve.prototype.write = function(E) {
  for (let _ = 0; _ < E.length; _++)
    this._crc = Qe[(this._crc ^ E[_]) & 255] ^ this._crc >>> 8;
  return !0;
};
Ve.prototype.crc32 = function() {
  return this._crc ^ -1;
};
Ve.crc32 = function(E) {
  let _ = -1;
  for (let n = 0; n < E.length; n++)
    _ = Qe[(_ ^ E[n]) & 255] ^ _ >>> 8;
  return _ ^ -1;
};
var pt = qt.exports;
let $ = w_, TI = pt, nE = Zt.exports = function(E, _) {
  this._options = E, E.checkCRC = E.checkCRC !== !1, this._hasIHDR = !1, this._hasIEND = !1, this._emittedHeadersFinished = !1, this._palette = [], this._colorType = 0, this._chunks = {}, this._chunks[$.TYPE_IHDR] = this._handleIHDR.bind(this), this._chunks[$.TYPE_IEND] = this._handleIEND.bind(this), this._chunks[$.TYPE_IDAT] = this._handleIDAT.bind(this), this._chunks[$.TYPE_PLTE] = this._handlePLTE.bind(this), this._chunks[$.TYPE_tRNS] = this._handleTRNS.bind(this), this._chunks[$.TYPE_gAMA] = this._handleGAMA.bind(this), this.read = _.read, this.error = _.error, this.metadata = _.metadata, this.gamma = _.gamma, this.transColor = _.transColor, this.palette = _.palette, this.parsed = _.parsed, this.inflateData = _.inflateData, this.finished = _.finished, this.simpleTransparency = _.simpleTransparency, this.headersFinished = _.headersFinished || function() {
  };
};
nE.prototype.start = function() {
  this.read($.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};
nE.prototype._parseSignature = function(E) {
  let _ = $.PNG_SIGNATURE;
  for (let n = 0; n < _.length; n++)
    if (E[n] !== _[n]) {
      this.error(new Error("Invalid file signature"));
      return;
    }
  this.read(8, this._parseChunkBegin.bind(this));
};
nE.prototype._parseChunkBegin = function(E) {
  let _ = E.readUInt32BE(0), n = E.readUInt32BE(4), e = "";
  for (let t = 4; t < 8; t++)
    e += String.fromCharCode(E[t]);
  let A = !!(E[4] & 32);
  if (!this._hasIHDR && n !== $.TYPE_IHDR) {
    this.error(new Error("Expected IHDR on beggining"));
    return;
  }
  if (this._crc = new TI(), this._crc.write(Buffer.from(e)), this._chunks[n])
    return this._chunks[n](_);
  if (!A) {
    this.error(new Error("Unsupported critical chunk type " + e));
    return;
  }
  this.read(_ + 4, this._skipChunk.bind(this));
};
nE.prototype._skipChunk = function() {
  this.read(8, this._parseChunkBegin.bind(this));
};
nE.prototype._handleChunkEnd = function() {
  this.read(4, this._parseChunkEnd.bind(this));
};
nE.prototype._parseChunkEnd = function(E) {
  let _ = E.readInt32BE(0), n = this._crc.crc32();
  if (this._options.checkCRC && n !== _) {
    this.error(new Error("Crc error - " + _ + " - " + n));
    return;
  }
  this._hasIEND || this.read(8, this._parseChunkBegin.bind(this));
};
nE.prototype._handleIHDR = function(E) {
  this.read(E, this._parseIHDR.bind(this));
};
nE.prototype._parseIHDR = function(E) {
  this._crc.write(E);
  let _ = E.readUInt32BE(0), n = E.readUInt32BE(4), e = E[8], A = E[9], t = E[10], R = E[11], i = E[12];
  if (e !== 8 && e !== 4 && e !== 2 && e !== 1 && e !== 16) {
    this.error(new Error("Unsupported bit depth " + e));
    return;
  }
  if (!(A in $.COLORTYPE_TO_BPP_MAP)) {
    this.error(new Error("Unsupported color type"));
    return;
  }
  if (t !== 0) {
    this.error(new Error("Unsupported compression method"));
    return;
  }
  if (R !== 0) {
    this.error(new Error("Unsupported filter method"));
    return;
  }
  if (i !== 0 && i !== 1) {
    this.error(new Error("Unsupported interlace method"));
    return;
  }
  this._colorType = A;
  let I = $.COLORTYPE_TO_BPP_MAP[this._colorType];
  this._hasIHDR = !0, this.metadata({
    width: _,
    height: n,
    depth: e,
    interlace: !!i,
    palette: !!(A & $.COLORTYPE_PALETTE),
    color: !!(A & $.COLORTYPE_COLOR),
    alpha: !!(A & $.COLORTYPE_ALPHA),
    bpp: I,
    colorType: A
  }), this._handleChunkEnd();
};
nE.prototype._handlePLTE = function(E) {
  this.read(E, this._parsePLTE.bind(this));
};
nE.prototype._parsePLTE = function(E) {
  this._crc.write(E);
  let _ = Math.floor(E.length / 3);
  for (let n = 0; n < _; n++)
    this._palette.push([E[n * 3], E[n * 3 + 1], E[n * 3 + 2], 255]);
  this.palette(this._palette), this._handleChunkEnd();
};
nE.prototype._handleTRNS = function(E) {
  this.simpleTransparency(), this.read(E, this._parseTRNS.bind(this));
};
nE.prototype._parseTRNS = function(E) {
  if (this._crc.write(E), this._colorType === $.COLORTYPE_PALETTE_COLOR) {
    if (this._palette.length === 0) {
      this.error(new Error("Transparency chunk must be after palette"));
      return;
    }
    if (E.length > this._palette.length) {
      this.error(new Error("More transparent colors than palette size"));
      return;
    }
    for (let _ = 0; _ < E.length; _++)
      this._palette[_][3] = E[_];
    this.palette(this._palette);
  }
  this._colorType === $.COLORTYPE_GRAYSCALE && this.transColor([E.readUInt16BE(0)]), this._colorType === $.COLORTYPE_COLOR && this.transColor([
    E.readUInt16BE(0),
    E.readUInt16BE(2),
    E.readUInt16BE(4)
  ]), this._handleChunkEnd();
};
nE.prototype._handleGAMA = function(E) {
  this.read(E, this._parseGAMA.bind(this));
};
nE.prototype._parseGAMA = function(E) {
  this._crc.write(E), this.gamma(E.readUInt32BE(0) / $.GAMMA_DIVISION), this._handleChunkEnd();
};
nE.prototype._handleIDAT = function(E) {
  this._emittedHeadersFinished || (this._emittedHeadersFinished = !0, this.headersFinished()), this.read(-E, this._parseIDAT.bind(this, E));
};
nE.prototype._parseIDAT = function(E, _) {
  if (this._crc.write(_), this._colorType === $.COLORTYPE_PALETTE_COLOR && this._palette.length === 0)
    throw new Error("Expected palette not found");
  this.inflateData(_);
  let n = E - _.length;
  n > 0 ? this._handleIDAT(n) : this._handleChunkEnd();
};
nE.prototype._handleIEND = function(E) {
  this.read(E, this._parseIEND.bind(this));
};
nE.prototype._parseIEND = function(E) {
  this._crc.write(E), this._hasIEND = !0, this._handleChunkEnd(), this.finished && this.finished();
};
var xt = Zt.exports, be = {};
let IA = cn, aI = [
  // 0 - dummy entry
  function() {
  },
  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function(E, _, n, e) {
    if (e === _.length)
      throw new Error("Ran out of data");
    let A = _[e];
    E[n] = A, E[n + 1] = A, E[n + 2] = A, E[n + 3] = 255;
  },
  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function(E, _, n, e) {
    if (e + 1 >= _.length)
      throw new Error("Ran out of data");
    let A = _[e];
    E[n] = A, E[n + 1] = A, E[n + 2] = A, E[n + 3] = _[e + 1];
  },
  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function(E, _, n, e) {
    if (e + 2 >= _.length)
      throw new Error("Ran out of data");
    E[n] = _[e], E[n + 1] = _[e + 1], E[n + 2] = _[e + 2], E[n + 3] = 255;
  },
  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function(E, _, n, e) {
    if (e + 3 >= _.length)
      throw new Error("Ran out of data");
    E[n] = _[e], E[n + 1] = _[e + 1], E[n + 2] = _[e + 2], E[n + 3] = _[e + 3];
  }
], OI = [
  // 0 - dummy entry
  function() {
  },
  // 1 - L
  // 0: 0, 1: 0, 2: 0, 3: 0xff
  function(E, _, n, e) {
    let A = _[0];
    E[n] = A, E[n + 1] = A, E[n + 2] = A, E[n + 3] = e;
  },
  // 2 - LA
  // 0: 0, 1: 0, 2: 0, 3: 1
  function(E, _, n) {
    let e = _[0];
    E[n] = e, E[n + 1] = e, E[n + 2] = e, E[n + 3] = _[1];
  },
  // 3 - RGB
  // 0: 0, 1: 1, 2: 2, 3: 0xff
  function(E, _, n, e) {
    E[n] = _[0], E[n + 1] = _[1], E[n + 2] = _[2], E[n + 3] = e;
  },
  // 4 - RGBA
  // 0: 0, 1: 1, 2: 2, 3: 3
  function(E, _, n) {
    E[n] = _[0], E[n + 1] = _[1], E[n + 2] = _[2], E[n + 3] = _[3];
  }
];
function uI(E, _) {
  let n = [], e = 0;
  function A() {
    if (e === E.length)
      throw new Error("Ran out of data");
    let t = E[e];
    e++;
    let R, i, I, N, T, a, u, C;
    switch (_) {
      default:
        throw new Error("unrecognised depth");
      case 16:
        u = E[e], e++, n.push((t << 8) + u);
        break;
      case 4:
        u = t & 15, C = t >> 4, n.push(C, u);
        break;
      case 2:
        T = t & 3, a = t >> 2 & 3, u = t >> 4 & 3, C = t >> 6 & 3, n.push(C, u, a, T);
        break;
      case 1:
        R = t & 1, i = t >> 1 & 1, I = t >> 2 & 1, N = t >> 3 & 1, T = t >> 4 & 1, a = t >> 5 & 1, u = t >> 6 & 1, C = t >> 7 & 1, n.push(C, u, a, T, N, I, i, R);
        break;
    }
  }
  return {
    get: function(t) {
      for (; n.length < t; )
        A();
      let R = n.slice(0, t);
      return n = n.slice(t), R;
    },
    resetAfterLine: function() {
      n.length = 0;
    },
    end: function() {
      if (e !== E.length)
        throw new Error("extra data found");
    }
  };
}
function cI(E, _, n, e, A, t) {
  let R = E.width, i = E.height, I = E.index;
  for (let N = 0; N < i; N++)
    for (let T = 0; T < R; T++) {
      let a = n(T, N, I);
      aI[e](_, A, a, t), t += e;
    }
  return t;
}
function CI(E, _, n, e, A, t) {
  let R = E.width, i = E.height, I = E.index;
  for (let N = 0; N < i; N++) {
    for (let T = 0; T < R; T++) {
      let a = A.get(e), u = n(T, N, I);
      OI[e](_, a, u, t);
    }
    A.resetAfterLine();
  }
}
be.dataToBitMap = function(E, _) {
  let n = _.width, e = _.height, A = _.depth, t = _.bpp, R = _.interlace, i;
  A !== 8 && (i = uI(E, A));
  let I;
  A <= 8 ? I = Buffer.alloc(n * e * 4) : I = new Uint16Array(n * e * 4);
  let N = Math.pow(2, A) - 1, T = 0, a, u;
  if (R)
    a = IA.getImagePasses(n, e), u = IA.getInterlaceIterator(n, e);
  else {
    let C = 0;
    u = function() {
      let r = C;
      return C += 4, r;
    }, a = [{ width: n, height: e }];
  }
  for (let C = 0; C < a.length; C++)
    A === 8 ? T = cI(
      a[C],
      I,
      u,
      t,
      E,
      T
    ) : CI(
      a[C],
      I,
      u,
      t,
      i,
      N
    );
  if (A === 8) {
    if (T !== E.length)
      throw new Error("extra data found");
  } else
    i.end();
  return I;
};
function rI(E, _, n, e, A) {
  let t = 0;
  for (let R = 0; R < e; R++)
    for (let i = 0; i < n; i++) {
      let I = A[E[t]];
      if (!I)
        throw new Error("index " + E[t] + " not in palette");
      for (let N = 0; N < 4; N++)
        _[t + N] = I[N];
      t += 4;
    }
}
function DI(E, _, n, e, A) {
  let t = 0;
  for (let R = 0; R < e; R++)
    for (let i = 0; i < n; i++) {
      let I = !1;
      if (A.length === 1 ? A[0] === E[t] && (I = !0) : A[0] === E[t] && A[1] === E[t + 1] && A[2] === E[t + 2] && (I = !0), I)
        for (let N = 0; N < 4; N++)
          _[t + N] = 0;
      t += 4;
    }
}
function sI(E, _, n, e, A) {
  let t = 255, R = Math.pow(2, A) - 1, i = 0;
  for (let I = 0; I < e; I++)
    for (let N = 0; N < n; N++) {
      for (let T = 0; T < 4; T++)
        _[i + T] = Math.floor(
          E[i + T] * t / R + 0.5
        );
      i += 4;
    }
}
var $t = function(E, _) {
  let n = _.depth, e = _.width, A = _.height, t = _.colorType, R = _.transColor, i = _.palette, I = E;
  return t === 3 ? rI(E, I, e, A, i) : (R && DI(E, I, e, A, R), n !== 8 && (n === 16 && (I = Buffer.alloc(e * A * 4)), sI(E, I, e, A, n))), I;
};
let lI = zE, Mn = T_, ER = Xt, hI = NI, SI = xt, BI = be, fI = $t, lE = Wt.exports = function(E) {
  ER.call(this), this._parser = new SI(E, {
    read: this.read.bind(this),
    error: this._handleError.bind(this),
    metadata: this._handleMetaData.bind(this),
    gamma: this.emit.bind(this, "gamma"),
    palette: this._handlePalette.bind(this),
    transColor: this._handleTransColor.bind(this),
    finished: this._finished.bind(this),
    inflateData: this._inflateData.bind(this),
    simpleTransparency: this._simpleTransparency.bind(this),
    headersFinished: this._headersFinished.bind(this)
  }), this._options = E, this.writable = !0, this._parser.start();
};
lI.inherits(lE, ER);
lE.prototype._handleError = function(E) {
  this.emit("error", E), this.writable = !1, this.destroy(), this._inflate && this._inflate.destroy && this._inflate.destroy(), this._filter && (this._filter.destroy(), this._filter.on("error", function() {
  })), this.errord = !0;
};
lE.prototype._inflateData = function(E) {
  if (!this._inflate)
    if (this._bitmapInfo.interlace)
      this._inflate = Mn.createInflate(), this._inflate.on("error", this.emit.bind(this, "error")), this._filter.on("complete", this._complete.bind(this)), this._inflate.pipe(this._filter);
    else {
      let n = ((this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1) * this._bitmapInfo.height, e = Math.max(n, Mn.Z_MIN_CHUNK);
      this._inflate = Mn.createInflate({ chunkSize: e });
      let A = n, t = this.emit.bind(this, "error");
      this._inflate.on("error", function(i) {
        A && t(i);
      }), this._filter.on("complete", this._complete.bind(this));
      let R = this._filter.write.bind(this._filter);
      this._inflate.on("data", function(i) {
        A && (i.length > A && (i = i.slice(0, A)), A -= i.length, R(i));
      }), this._inflate.on("end", this._filter.end.bind(this._filter));
    }
  this._inflate.write(E);
};
lE.prototype._handleMetaData = function(E) {
  this._metaData = E, this._bitmapInfo = Object.create(E), this._filter = new hI(this._bitmapInfo);
};
lE.prototype._handleTransColor = function(E) {
  this._bitmapInfo.transColor = E;
};
lE.prototype._handlePalette = function(E) {
  this._bitmapInfo.palette = E;
};
lE.prototype._simpleTransparency = function() {
  this._metaData.alpha = !0;
};
lE.prototype._headersFinished = function() {
  this.emit("metadata", this._metaData);
};
lE.prototype._finished = function() {
  this.errord || (this._inflate ? this._inflate.end() : this.emit("error", "No Inflate block"));
};
lE.prototype._complete = function(E) {
  if (this.errord)
    return;
  let _;
  try {
    let n = BI.dataToBitMap(E, this._bitmapInfo);
    _ = fI(n, this._bitmapInfo), n = null;
  } catch (n) {
    this._handleError(n);
    return;
  }
  this.emit("parsed", _);
};
var MI = Wt.exports, _R = { exports: {} }, nR = { exports: {} };
let OE = w_;
var gI = function(E, _, n, e) {
  let A = [OE.COLORTYPE_COLOR_ALPHA, OE.COLORTYPE_ALPHA].indexOf(
    e.colorType
  ) !== -1;
  if (e.colorType === e.inputColorType) {
    let r = function() {
      let D = new ArrayBuffer(2);
      return new DataView(D).setInt16(
        0,
        256,
        !0
        /* littleEndian */
      ), new Int16Array(D)[0] !== 256;
    }();
    if (e.bitDepth === 8 || e.bitDepth === 16 && r)
      return E;
  }
  let t = e.bitDepth !== 16 ? E : new Uint16Array(E.buffer), R = 255, i = OE.COLORTYPE_TO_BPP_MAP[e.inputColorType];
  i === 4 && !e.inputHasAlpha && (i = 3);
  let I = OE.COLORTYPE_TO_BPP_MAP[e.colorType];
  e.bitDepth === 16 && (R = 65535, I *= 2);
  let N = Buffer.alloc(_ * n * I), T = 0, a = 0, u = e.bgColor || {};
  u.red === void 0 && (u.red = R), u.green === void 0 && (u.green = R), u.blue === void 0 && (u.blue = R);
  function C() {
    let r, D, c, l = R;
    switch (e.inputColorType) {
      case OE.COLORTYPE_COLOR_ALPHA:
        l = t[T + 3], r = t[T], D = t[T + 1], c = t[T + 2];
        break;
      case OE.COLORTYPE_COLOR:
        r = t[T], D = t[T + 1], c = t[T + 2];
        break;
      case OE.COLORTYPE_ALPHA:
        l = t[T + 1], r = t[T], D = r, c = r;
        break;
      case OE.COLORTYPE_GRAYSCALE:
        r = t[T], D = r, c = r;
        break;
      default:
        throw new Error(
          "input color type:" + e.inputColorType + " is not supported at present"
        );
    }
    return e.inputHasAlpha && (A || (l /= R, r = Math.min(
      Math.max(Math.round((1 - l) * u.red + l * r), 0),
      R
    ), D = Math.min(
      Math.max(Math.round((1 - l) * u.green + l * D), 0),
      R
    ), c = Math.min(
      Math.max(Math.round((1 - l) * u.blue + l * c), 0),
      R
    ))), { red: r, green: D, blue: c, alpha: l };
  }
  for (let r = 0; r < n; r++)
    for (let D = 0; D < _; D++) {
      let c = C();
      switch (e.colorType) {
        case OE.COLORTYPE_COLOR_ALPHA:
        case OE.COLORTYPE_COLOR:
          e.bitDepth === 8 ? (N[a] = c.red, N[a + 1] = c.green, N[a + 2] = c.blue, A && (N[a + 3] = c.alpha)) : (N.writeUInt16BE(c.red, a), N.writeUInt16BE(c.green, a + 2), N.writeUInt16BE(c.blue, a + 4), A && N.writeUInt16BE(c.alpha, a + 6));
          break;
        case OE.COLORTYPE_ALPHA:
        case OE.COLORTYPE_GRAYSCALE: {
          let l = (c.red + c.green + c.blue) / 3;
          e.bitDepth === 8 ? (N[a] = l, A && (N[a + 1] = c.alpha)) : (N.writeUInt16BE(l, a), A && N.writeUInt16BE(c.alpha, a + 2));
          break;
        }
        default:
          throw new Error("unrecognised color Type " + e.colorType);
      }
      T += i, a += I;
    }
  return N;
};
let eR = jt;
function LI(E, _, n, e, A) {
  for (let t = 0; t < n; t++)
    e[A + t] = E[_ + t];
}
function dI(E, _, n) {
  let e = 0, A = _ + n;
  for (let t = _; t < A; t++)
    e += Math.abs(E[t]);
  return e;
}
function UI(E, _, n, e, A, t) {
  for (let R = 0; R < n; R++) {
    let i = R >= t ? E[_ + R - t] : 0, I = E[_ + R] - i;
    e[A + R] = I;
  }
}
function oI(E, _, n, e) {
  let A = 0;
  for (let t = 0; t < n; t++) {
    let R = t >= e ? E[_ + t - e] : 0, i = E[_ + t] - R;
    A += Math.abs(i);
  }
  return A;
}
function wI(E, _, n, e, A) {
  for (let t = 0; t < n; t++) {
    let R = _ > 0 ? E[_ + t - n] : 0, i = E[_ + t] - R;
    e[A + t] = i;
  }
}
function GI(E, _, n) {
  let e = 0, A = _ + n;
  for (let t = _; t < A; t++) {
    let R = _ > 0 ? E[t - n] : 0, i = E[t] - R;
    e += Math.abs(i);
  }
  return e;
}
function FI(E, _, n, e, A, t) {
  for (let R = 0; R < n; R++) {
    let i = R >= t ? E[_ + R - t] : 0, I = _ > 0 ? E[_ + R - n] : 0, N = E[_ + R] - (i + I >> 1);
    e[A + R] = N;
  }
}
function PI(E, _, n, e) {
  let A = 0;
  for (let t = 0; t < n; t++) {
    let R = t >= e ? E[_ + t - e] : 0, i = _ > 0 ? E[_ + t - n] : 0, I = E[_ + t] - (R + i >> 1);
    A += Math.abs(I);
  }
  return A;
}
function QI(E, _, n, e, A, t) {
  for (let R = 0; R < n; R++) {
    let i = R >= t ? E[_ + R - t] : 0, I = _ > 0 ? E[_ + R - n] : 0, N = _ > 0 && R >= t ? E[_ + R - (n + t)] : 0, T = E[_ + R] - eR(i, I, N);
    e[A + R] = T;
  }
}
function VI(E, _, n, e) {
  let A = 0;
  for (let t = 0; t < n; t++) {
    let R = t >= e ? E[_ + t - e] : 0, i = _ > 0 ? E[_ + t - n] : 0, I = _ > 0 && t >= e ? E[_ + t - (n + e)] : 0, N = E[_ + t] - eR(R, i, I);
    A += Math.abs(N);
  }
  return A;
}
let bI = {
  0: LI,
  1: UI,
  2: wI,
  3: FI,
  4: QI
}, mI = {
  0: dI,
  1: oI,
  2: GI,
  3: PI,
  4: VI
};
var YI = function(E, _, n, e, A) {
  let t;
  if (!("filterType" in e) || e.filterType === -1)
    t = [0, 1, 2, 3, 4];
  else if (typeof e.filterType == "number")
    t = [e.filterType];
  else
    throw new Error("unrecognised filter types");
  e.bitDepth === 16 && (A *= 2);
  let R = _ * A, i = 0, I = 0, N = Buffer.alloc((R + 1) * n), T = t[0];
  for (let a = 0; a < n; a++) {
    if (t.length > 1) {
      let u = 1 / 0;
      for (let C = 0; C < t.length; C++) {
        let r = mI[t[C]](E, I, R, A);
        r < u && (T = t[C], u = r);
      }
    }
    N[i] = T, i++, bI[T](E, I, R, N, i, A), i += R, I += R;
  }
  return N;
};
let tE = w_, yI = pt, WI = gI, HI = YI, vI = T_, YE = nR.exports = function(E) {
  if (this._options = E, E.deflateChunkSize = E.deflateChunkSize || 32 * 1024, E.deflateLevel = E.deflateLevel != null ? E.deflateLevel : 9, E.deflateStrategy = E.deflateStrategy != null ? E.deflateStrategy : 3, E.inputHasAlpha = E.inputHasAlpha != null ? E.inputHasAlpha : !0, E.deflateFactory = E.deflateFactory || vI.createDeflate, E.bitDepth = E.bitDepth || 8, E.colorType = typeof E.colorType == "number" ? E.colorType : tE.COLORTYPE_COLOR_ALPHA, E.inputColorType = typeof E.inputColorType == "number" ? E.inputColorType : tE.COLORTYPE_COLOR_ALPHA, [
    tE.COLORTYPE_GRAYSCALE,
    tE.COLORTYPE_COLOR,
    tE.COLORTYPE_COLOR_ALPHA,
    tE.COLORTYPE_ALPHA
  ].indexOf(E.colorType) === -1)
    throw new Error(
      "option color type:" + E.colorType + " is not supported at present"
    );
  if ([
    tE.COLORTYPE_GRAYSCALE,
    tE.COLORTYPE_COLOR,
    tE.COLORTYPE_COLOR_ALPHA,
    tE.COLORTYPE_ALPHA
  ].indexOf(E.inputColorType) === -1)
    throw new Error(
      "option input color type:" + E.inputColorType + " is not supported at present"
    );
  if (E.bitDepth !== 8 && E.bitDepth !== 16)
    throw new Error(
      "option bit depth:" + E.bitDepth + " is not supported at present"
    );
};
YE.prototype.getDeflateOptions = function() {
  return {
    chunkSize: this._options.deflateChunkSize,
    level: this._options.deflateLevel,
    strategy: this._options.deflateStrategy
  };
};
YE.prototype.createDeflate = function() {
  return this._options.deflateFactory(this.getDeflateOptions());
};
YE.prototype.filterData = function(E, _, n) {
  let e = WI(E, _, n, this._options), A = tE.COLORTYPE_TO_BPP_MAP[this._options.colorType];
  return HI(e, _, n, this._options, A);
};
YE.prototype._packChunk = function(E, _) {
  let n = _ ? _.length : 0, e = Buffer.alloc(n + 12);
  return e.writeUInt32BE(n, 0), e.writeUInt32BE(E, 4), _ && _.copy(e, 8), e.writeInt32BE(
    yI.crc32(e.slice(4, e.length - 4)),
    e.length - 4
  ), e;
};
YE.prototype.packGAMA = function(E) {
  let _ = Buffer.alloc(4);
  return _.writeUInt32BE(Math.floor(E * tE.GAMMA_DIVISION), 0), this._packChunk(tE.TYPE_gAMA, _);
};
YE.prototype.packIHDR = function(E, _) {
  let n = Buffer.alloc(13);
  return n.writeUInt32BE(E, 0), n.writeUInt32BE(_, 4), n[8] = this._options.bitDepth, n[9] = this._options.colorType, n[10] = 0, n[11] = 0, n[12] = 0, this._packChunk(tE.TYPE_IHDR, n);
};
YE.prototype.packIDAT = function(E) {
  return this._packChunk(tE.TYPE_IDAT, E);
};
YE.prototype.packIEND = function() {
  return this._packChunk(tE.TYPE_IEND, null);
};
var AR = nR.exports;
let XI = zE, tR = d_, KI = w_, kI = AR, RR = _R.exports = function(E) {
  tR.call(this);
  let _ = E || {};
  this._packer = new kI(_), this._deflate = this._packer.createDeflate(), this.readable = !0;
};
XI.inherits(RR, tR);
RR.prototype.pack = function(E, _, n, e) {
  this.emit("data", Buffer.from(KI.PNG_SIGNATURE)), this.emit("data", this._packer.packIHDR(_, n)), e && this.emit("data", this._packer.packGAMA(e));
  let A = this._packer.filterData(E, _, n);
  this._deflate.on("error", this.emit.bind(this, "error")), this._deflate.on(
    "data",
    (function(t) {
      this.emit("data", this._packer.packIDAT(t));
    }).bind(this)
  ), this._deflate.on(
    "end",
    (function() {
      this.emit("data", this._packer.packIEND()), this.emit("end");
    }).bind(this)
  ), this._deflate.end(A);
};
var jI = _R.exports, me = {}, Oe = { exports: {} };
(function(E, _) {
  let n = ui.ok, e = T_, A = zE, t = de.kMaxLength;
  function R(a) {
    if (!(this instanceof R))
      return new R(a);
    a && a.chunkSize < e.Z_MIN_CHUNK && (a.chunkSize = e.Z_MIN_CHUNK), e.Inflate.call(this, a), this._offset = this._offset === void 0 ? this._outOffset : this._offset, this._buffer = this._buffer || this._outBuffer, a && a.maxLength != null && (this._maxLength = a.maxLength);
  }
  function i(a) {
    return new R(a);
  }
  function I(a, u) {
    a._handle && (a._handle.close(), a._handle = null);
  }
  R.prototype._processChunk = function(a, u, C) {
    if (typeof C == "function")
      return e.Inflate._processChunk.call(this, a, u, C);
    let r = this, D = a && a.length, c = this._chunkSize - this._offset, l = this._maxLength, S = 0, B = [], h = 0, g;
    this.on("error", function(Q) {
      g = Q;
    });
    function L(Q, y) {
      if (r._hadError)
        return;
      let k = c - y;
      if (n(k >= 0, "have should not go down"), k > 0) {
        let G = r._buffer.slice(r._offset, r._offset + k);
        if (r._offset += k, G.length > l && (G = G.slice(0, l)), B.push(G), h += G.length, l -= G.length, l === 0)
          return !1;
      }
      return (y === 0 || r._offset >= r._chunkSize) && (c = r._chunkSize, r._offset = 0, r._buffer = Buffer.allocUnsafe(r._chunkSize)), y === 0 ? (S += D - Q, D = Q, !0) : !1;
    }
    n(this._handle, "zlib binding closed");
    let U;
    do
      U = this._handle.writeSync(
        u,
        a,
        // in
        S,
        // in_off
        D,
        // in_len
        this._buffer,
        // out
        this._offset,
        //out_off
        c
      ), U = U || this._writeState;
    while (!this._hadError && L(U[0], U[1]));
    if (this._hadError)
      throw g;
    if (h >= t)
      throw I(this), new RangeError(
        "Cannot create final Buffer. It would be larger than 0x" + t.toString(16) + " bytes"
      );
    let F = Buffer.concat(B, h);
    return I(this), F;
  }, A.inherits(R, e.Inflate);
  function N(a, u) {
    if (typeof u == "string" && (u = Buffer.from(u)), !(u instanceof Buffer))
      throw new TypeError("Not a string or buffer");
    let C = a._finishFlushFlag;
    return C == null && (C = e.Z_FINISH), a._processChunk(u, C);
  }
  function T(a, u) {
    return N(new R(u), a);
  }
  E.exports = _ = T, _.Inflate = R, _.createInflate = i, _.inflateSync = T;
})(Oe, Oe.exports);
var zI = Oe.exports, iR = { exports: {} };
let IR = iR.exports = function(E) {
  this._buffer = E, this._reads = [];
};
IR.prototype.read = function(E, _) {
  this._reads.push({
    length: Math.abs(E),
    // if length < 0 then at most this length
    allowLess: E < 0,
    func: _
  });
};
IR.prototype.process = function() {
  for (; this._reads.length > 0 && this._buffer.length; ) {
    let E = this._reads[0];
    if (this._buffer.length && (this._buffer.length >= E.length || E.allowLess)) {
      this._reads.shift();
      let _ = this._buffer;
      this._buffer = _.slice(E.length), E.func.call(this, _.slice(0, E.length));
    } else
      break;
  }
  if (this._reads.length > 0)
    return new Error("There are some read requests waitng on finished stream");
  if (this._buffer.length > 0)
    return new Error("unrecognised content at end of stream");
};
var NR = iR.exports, TR = {};
let JI = NR, ZI = zt;
TR.process = function(E, _) {
  let n = [], e = new JI(E);
  return new ZI(_, {
    read: e.read.bind(e),
    write: function(t) {
      n.push(t);
    },
    complete: function() {
    }
  }).start(), e.process(), Buffer.concat(n);
};
let aR = !0, OR = T_, qI = zI;
OR.deflateSync || (aR = !1);
let pI = NR, xI = TR, $I = xt, EN = be, _N = $t;
var nN = function(E, _) {
  if (!aR)
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  let n;
  function e(h) {
    n = h;
  }
  let A;
  function t(h) {
    A = h;
  }
  function R(h) {
    A.transColor = h;
  }
  function i(h) {
    A.palette = h;
  }
  function I() {
    A.alpha = !0;
  }
  let N;
  function T(h) {
    N = h;
  }
  let a = [];
  function u(h) {
    a.push(h);
  }
  let C = new pI(E);
  if (new $I(_, {
    read: C.read.bind(C),
    error: e,
    metadata: t,
    gamma: T,
    palette: i,
    transColor: R,
    inflateData: u,
    simpleTransparency: I
  }).start(), C.process(), n)
    throw n;
  let D = Buffer.concat(a);
  a.length = 0;
  let c;
  if (A.interlace)
    c = OR.inflateSync(D);
  else {
    let g = ((A.width * A.bpp * A.depth + 7 >> 3) + 1) * A.height;
    c = qI(D, {
      chunkSize: g,
      maxLength: g
    });
  }
  if (D = null, !c || !c.length)
    throw new Error("bad png - invalid inflate data response");
  let l = xI.process(c, A);
  D = null;
  let S = EN.dataToBitMap(l, A);
  l = null;
  let B = _N(S, A);
  return A.data = B, A.gamma = N || 0, A;
};
let uR = !0, cR = T_;
cR.deflateSync || (uR = !1);
let eN = w_, AN = AR;
var tN = function(E, _) {
  if (!uR)
    throw new Error(
      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
    );
  let n = _ || {}, e = new AN(n), A = [];
  A.push(Buffer.from(eN.PNG_SIGNATURE)), A.push(e.packIHDR(E.width, E.height)), E.gamma && A.push(e.packGAMA(E.gamma));
  let t = e.filterData(
    E.data,
    E.width,
    E.height
  ), R = cR.deflateSync(
    t,
    e.getDeflateOptions()
  );
  if (t = null, !R || !R.length)
    throw new Error("bad png - invalid compressed data response");
  return A.push(e.packIDAT(R)), A.push(e.packIEND()), Buffer.concat(A);
};
let RN = nN, iN = tN;
me.read = function(E, _) {
  return RN(E, _ || {});
};
me.write = function(E, _) {
  return iN(E, _);
};
let IN = zE, CR = d_, NN = MI, TN = jI, aN = me, IE = yt.PNG = function(E) {
  CR.call(this), E = E || {}, this.width = E.width | 0, this.height = E.height | 0, this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null, E.fill && this.data && this.data.fill(0), this.gamma = 0, this.readable = this.writable = !0, this._parser = new NN(E), this._parser.on("error", this.emit.bind(this, "error")), this._parser.on("close", this._handleClose.bind(this)), this._parser.on("metadata", this._metadata.bind(this)), this._parser.on("gamma", this._gamma.bind(this)), this._parser.on(
    "parsed",
    (function(_) {
      this.data = _, this.emit("parsed", _);
    }).bind(this)
  ), this._packer = new TN(E), this._packer.on("data", this.emit.bind(this, "data")), this._packer.on("end", this.emit.bind(this, "end")), this._parser.on("close", this._handleClose.bind(this)), this._packer.on("error", this.emit.bind(this, "error"));
};
IN.inherits(IE, CR);
IE.sync = aN;
IE.prototype.pack = function() {
  return !this.data || !this.data.length ? (this.emit("error", "No data provided"), this) : (process.nextTick(
    (function() {
      this._packer.pack(this.data, this.width, this.height, this.gamma);
    }).bind(this)
  ), this);
};
IE.prototype.parse = function(E, _) {
  if (_) {
    let n, e;
    n = (function(A) {
      this.removeListener("error", e), this.data = A, _(null, this);
    }).bind(this), e = (function(A) {
      this.removeListener("parsed", n), _(A, null);
    }).bind(this), this.once("parsed", n), this.once("error", e);
  }
  return this.end(E), this;
};
IE.prototype.write = function(E) {
  return this._parser.write(E), !0;
};
IE.prototype.end = function(E) {
  this._parser.end(E);
};
IE.prototype._metadata = function(E) {
  this.width = E.width, this.height = E.height, this.emit("metadata", E);
};
IE.prototype._gamma = function(E) {
  this.gamma = E;
};
IE.prototype._handleClose = function() {
  !this._parser.writable && !this._packer.readable && this.emit("close");
};
IE.bitblt = function(E, _, n, e, A, t, R, i) {
  if (n |= 0, e |= 0, A |= 0, t |= 0, R |= 0, i |= 0, n > E.width || e > E.height || n + A > E.width || e + t > E.height)
    throw new Error("bitblt reading outside image");
  if (R > _.width || i > _.height || R + A > _.width || i + t > _.height)
    throw new Error("bitblt writing outside image");
  for (let I = 0; I < t; I++)
    E.data.copy(
      _.data,
      (i + I) * _.width + R << 2,
      (e + I) * E.width + n << 2,
      (e + I) * E.width + n + A << 2
    );
};
IE.prototype.bitblt = function(E, _, n, e, A, t, R) {
  return IE.bitblt(this, E, _, n, e, A, t, R), this;
};
IE.adjustGamma = function(E) {
  if (E.gamma) {
    for (let _ = 0; _ < E.height; _++)
      for (let n = 0; n < E.width; n++) {
        let e = E.width * _ + n << 2;
        for (let A = 0; A < 3; A++) {
          let t = E.data[e + A] / 255;
          t = Math.pow(t, 1 / 2.2 / E.gamma), E.data[e + A] = Math.round(t * 255);
        }
      }
    E.gamma = 0;
  }
};
IE.prototype.adjustGamma = function() {
  IE.adjustGamma(this);
};
var G_ = {};
(function(E) {
  function _(n) {
    if (typeof n == "number" && (n = n.toString()), typeof n != "string")
      throw new Error("Color should be defined as hex string");
    let e = n.slice().replace("#", "").split("");
    if (e.length < 3 || e.length === 5 || e.length > 8)
      throw new Error("Invalid hex color: " + n);
    (e.length === 3 || e.length === 4) && (e = Array.prototype.concat.apply([], e.map(function(t) {
      return [t, t];
    }))), e.length === 6 && e.push("F", "F");
    const A = parseInt(e.join(""), 16);
    return {
      r: A >> 24 & 255,
      g: A >> 16 & 255,
      b: A >> 8 & 255,
      a: A & 255,
      hex: "#" + e.slice(0, 6).join("")
    };
  }
  E.getOptions = function(e) {
    e || (e = {}), e.color || (e.color = {});
    const A = typeof e.margin > "u" || e.margin === null || e.margin < 0 ? 4 : e.margin, t = e.width && e.width >= 21 ? e.width : void 0, R = e.scale || 4;
    return {
      width: t,
      scale: t ? 4 : R,
      margin: A,
      color: {
        dark: _(e.color.dark || "#000000ff"),
        light: _(e.color.light || "#ffffffff")
      },
      type: e.type,
      rendererOpts: e.rendererOpts || {}
    };
  }, E.getScale = function(e, A) {
    return A.width && A.width >= e + A.margin * 2 ? A.width / (e + A.margin * 2) : A.scale;
  }, E.getImageWidth = function(e, A) {
    const t = E.getScale(e, A);
    return Math.floor((e + A.margin * 2) * t);
  }, E.qrToImageData = function(e, A, t) {
    const R = A.modules.size, i = A.modules.data, I = E.getScale(R, t), N = Math.floor((R + t.margin * 2) * I), T = t.margin * I, a = [t.color.light, t.color.dark];
    for (let u = 0; u < N; u++)
      for (let C = 0; C < N; C++) {
        let r = (u * N + C) * 4, D = t.color.light;
        if (u >= T && C >= T && u < N - T && C < N - T) {
          const c = Math.floor((u - T) / I), l = Math.floor((C - T) / I);
          D = a[i[c * R + l] ? 1 : 0];
        }
        e[r++] = D.r, e[r++] = D.g, e[r++] = D.b, e[r] = D.a;
      }
  };
})(G_);
(function(E) {
  const _ = L_, n = yt.PNG, e = G_;
  E.render = function(t, R) {
    const i = e.getOptions(R), I = i.rendererOpts, N = e.getImageWidth(t.modules.size, i);
    I.width = N, I.height = N;
    const T = new n(I);
    return e.qrToImageData(T.data, t, i), T;
  }, E.renderToDataURL = function(t, R, i) {
    typeof i > "u" && (i = R, R = void 0), E.renderToBuffer(t, R, function(I, N) {
      I && i(I);
      let T = "data:image/png;base64,";
      T += N.toString("base64"), i(null, T);
    });
  }, E.renderToBuffer = function(t, R, i) {
    typeof i > "u" && (i = R, R = void 0);
    const I = E.render(t, R), N = [];
    I.on("error", i), I.on("data", function(T) {
      N.push(T);
    }), I.on("end", function() {
      i(null, Buffer.concat(N));
    }), I.pack();
  }, E.renderToFile = function(t, R, i, I) {
    typeof I > "u" && (I = i, i = void 0);
    let N = !1;
    const T = (...u) => {
      N || (N = !0, I.apply(null, u));
    }, a = _.createWriteStream(t);
    a.on("error", T), a.on("close", T), E.renderToFileStream(a, R, i);
  }, E.renderToFileStream = function(t, R, i) {
    E.render(R, i).pack().pipe(t);
  };
})(Yt);
var rR = {};
(function(E) {
  const _ = G_, n = {
    WW: " ",
    WB: "▄",
    BB: "█",
    BW: "▀"
  }, e = {
    BB: " ",
    BW: "▄",
    WW: "█",
    WB: "▀"
  };
  function A(t, R, i) {
    return t && R ? i.BB : t && !R ? i.BW : !t && R ? i.WB : i.WW;
  }
  E.render = function(t, R, i) {
    const I = _.getOptions(R);
    let N = n;
    (I.color.dark.hex === "#ffffff" || I.color.light.hex === "#000000") && (N = e);
    const T = t.modules.size, a = t.modules.data;
    let u = "", C = Array(T + I.margin * 2 + 1).join(N.WW);
    C = Array(I.margin / 2 + 1).join(C + `
`);
    const r = Array(I.margin + 1).join(N.WW);
    u += C;
    for (let D = 0; D < T; D += 2) {
      u += r;
      for (let c = 0; c < T; c++) {
        const l = a[D * T + c], S = a[(D + 1) * T + c];
        u += A(l, S, N);
      }
      u += r + `
`;
    }
    return u += C.slice(0, -1), typeof i == "function" && i(null, u), u;
  }, E.renderToFile = function(R, i, I, N) {
    typeof N > "u" && (N = I, I = void 0);
    const T = L_, a = E.render(i, I);
    T.writeFile(R, a, N);
  };
})(rR);
var DR = {}, sR = {};
sR.render = function(E, _, n) {
  const e = E.modules.size, A = E.modules.data, t = "\x1B[40m  \x1B[0m", R = "\x1B[47m  \x1B[0m";
  let i = "";
  const I = Array(e + 3).join(R), N = Array(2).join(R);
  i += I + `
`;
  for (let T = 0; T < e; ++T) {
    i += R;
    for (let a = 0; a < e; a++)
      i += A[T * e + a] ? t : R;
    i += N + `
`;
  }
  return i += I + `
`, typeof n == "function" && n(null, i), i;
};
var lR = {};
const ON = "\x1B[47m", uN = "\x1B[40m", ue = "\x1B[37m", ce = "\x1B[30m", KE = "\x1B[0m", cN = ON + ce, CN = uN + ue, rN = function(E, _, n) {
  return {
    // 1 ... white, 2 ... black, 0 ... transparent (default)
    "00": KE + " " + E,
    "01": KE + _ + "▄" + E,
    "02": KE + n + "▄" + E,
    10: KE + _ + "▀" + E,
    11: " ",
    12: "▄",
    20: KE + n + "▀" + E,
    21: "▀",
    22: "█"
  };
}, NA = function(E, _, n, e) {
  const A = _ + 1;
  if (n >= A || e >= A || e < -1 || n < -1) return "0";
  if (n >= _ || e >= _ || e < 0 || n < 0) return "1";
  const t = e * _ + n;
  return E[t] ? "2" : "1";
}, TA = function(E, _, n, e) {
  return NA(E, _, n, e) + NA(E, _, n, e + 1);
};
lR.render = function(E, _, n) {
  const e = E.modules.size, A = E.modules.data, t = !!(_ && _.inverse), R = _ && _.inverse ? CN : cN, N = rN(R, t ? ce : ue, t ? ue : ce), T = KE + `
` + R;
  let a = R;
  for (let u = -1; u < e + 1; u += 2) {
    for (let C = -1; C < e; C++)
      a += N[TA(A, e, C, u)];
    a += N[TA(A, e, e, u)] + T;
  }
  return a += KE, typeof n == "function" && n(null, a), a;
};
const DN = sR, sN = lR;
DR.render = function(E, _, n) {
  return _ && _.small ? sN.render(E, _, n) : DN.render(E, _, n);
};
var hR = {}, Ye = {};
const lN = G_;
function aA(E, _) {
  const n = E.a / 255, e = _ + '="' + E.hex + '"';
  return n < 1 ? e + " " + _ + '-opacity="' + n.toFixed(2).slice(1) + '"' : e;
}
function gn(E, _, n) {
  let e = E + _;
  return typeof n < "u" && (e += " " + n), e;
}
function hN(E, _, n) {
  let e = "", A = 0, t = !1, R = 0;
  for (let i = 0; i < E.length; i++) {
    const I = Math.floor(i % _), N = Math.floor(i / _);
    !I && !t && (t = !0), E[i] ? (R++, i > 0 && I > 0 && E[i - 1] || (e += t ? gn("M", I + n, 0.5 + N + n) : gn("m", A, 0), A = 0, t = !1), I + 1 < _ && E[i + 1] || (e += gn("h", R), R = 0)) : A++;
  }
  return e;
}
Ye.render = function(_, n, e) {
  const A = lN.getOptions(n), t = _.modules.size, R = _.modules.data, i = t + A.margin * 2, I = A.color.light.a ? "<path " + aA(A.color.light, "fill") + ' d="M0 0h' + i + "v" + i + 'H0z"/>' : "", N = "<path " + aA(A.color.dark, "stroke") + ' d="' + hN(R, t, A.margin) + '"/>', T = 'viewBox="0 0 ' + i + " " + i + '"', u = '<svg xmlns="http://www.w3.org/2000/svg" ' + (A.width ? 'width="' + A.width + '" height="' + A.width + '" ' : "") + T + ' shape-rendering="crispEdges">' + I + N + `</svg>
`;
  return typeof e == "function" && e(null, u), u;
};
(function(E) {
  const _ = Ye;
  E.render = _.render, E.renderToFile = function(e, A, t, R) {
    typeof R > "u" && (R = t, t = void 0);
    const i = L_, N = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + E.render(A, t);
    i.writeFile(e, N, R);
  };
})(hR);
var pE = {}, Ln = {}, OA;
function SN() {
  return OA || (OA = 1, function(E) {
    const _ = G_;
    function n(A, t, R) {
      A.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), t.height = R, t.width = R, t.style.height = R + "px", t.style.width = R + "px";
    }
    function e() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    E.render = function(t, R, i) {
      let I = i, N = R;
      typeof I > "u" && (!R || !R.getContext) && (I = R, R = void 0), R || (N = e()), I = _.getOptions(I);
      const T = _.getImageWidth(t.modules.size, I), a = N.getContext("2d"), u = a.createImageData(T, T);
      return _.qrToImageData(u.data, t, I), n(a, N, T), a.putImageData(u, 0, 0), N;
    }, E.renderToDataURL = function(t, R, i) {
      let I = i;
      typeof I > "u" && (!R || !R.getContext) && (I = R, R = void 0), I || (I = {});
      const N = E.render(t, R, I), T = I.type || "image/png", a = I.rendererOpts || {};
      return N.toDataURL(T, a.quality);
    };
  }(Ln)), Ln;
}
var uA;
function BN() {
  if (uA) return pE;
  uA = 1;
  const E = gt, _ = we, n = SN(), e = Ye;
  function A(t, R, i, I, N) {
    const T = [].slice.call(arguments, 1), a = T.length, u = typeof T[a - 1] == "function";
    if (!u && !E())
      throw new Error("Callback required as last argument");
    if (u) {
      if (a < 2)
        throw new Error("Too few arguments provided");
      a === 2 ? (N = i, i = R, R = I = void 0) : a === 3 && (R.getContext && typeof N > "u" ? (N = I, I = void 0) : (N = I, I = i, i = R, R = void 0));
    } else {
      if (a < 1)
        throw new Error("Too few arguments provided");
      return a === 1 ? (i = R, R = I = void 0) : a === 2 && !R.getContext && (I = i, i = R, R = void 0), new Promise(function(C, r) {
        try {
          const D = _.create(i, I);
          C(t(D, R, I));
        } catch (D) {
          r(D);
        }
      });
    }
    try {
      const C = _.create(i, I);
      N(null, t(C, R, I));
    } catch (C) {
      N(C);
    }
  }
  return pE.create = _.create, pE.toCanvas = A.bind(null, n.render), pE.toDataURL = A.bind(null, n.renderToDataURL), pE.toString = A.bind(null, function(t, R, i) {
    return e.render(t, i);
  }), pE;
}
const SR = gt, Ce = we, fN = Yt, BR = rR, MN = DR, fR = hR;
function F_(E, _, n) {
  if (typeof E > "u")
    throw new Error("String required as first argument");
  if (typeof n > "u" && (n = _, _ = {}), typeof n != "function")
    if (SR())
      _ = n || {}, n = null;
    else
      throw new Error("Callback required as last argument");
  return {
    opts: _,
    cb: n
  };
}
function gN(E) {
  return E.slice((E.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
}
function Cn(E) {
  switch (E) {
    case "svg":
      return fR;
    case "txt":
    case "utf8":
      return BR;
    case "png":
    case "image/png":
    default:
      return fN;
  }
}
function LN(E) {
  switch (E) {
    case "svg":
      return fR;
    case "terminal":
      return MN;
    case "utf8":
    default:
      return BR;
  }
}
function P_(E, _, n) {
  if (!n.cb)
    return new Promise(function(e, A) {
      try {
        const t = Ce.create(_, n.opts);
        return E(t, n.opts, function(R, i) {
          return R ? A(R) : e(i);
        });
      } catch (t) {
        A(t);
      }
    });
  try {
    const e = Ce.create(_, n.opts);
    return E(e, n.opts, n.cb);
  } catch (e) {
    n.cb(e);
  }
}
bE.create = Ce.create;
bE.toCanvas = BN().toCanvas;
bE.toString = function(_, n, e) {
  const A = F_(_, n, e), t = A.opts ? A.opts.type : void 0, R = LN(t);
  return P_(R.render, _, A);
};
bE.toDataURL = function(_, n, e) {
  const A = F_(_, n, e), t = Cn(A.opts.type);
  return P_(t.renderToDataURL, _, A);
};
bE.toBuffer = function(_, n, e) {
  const A = F_(_, n, e), t = Cn(A.opts.type);
  return P_(t.renderToBuffer, _, A);
};
bE.toFile = function(_, n, e, A) {
  if (typeof _ != "string" || !(typeof n == "string" || typeof n == "object"))
    throw new Error("Invalid argument");
  if (arguments.length < 3 && !SR())
    throw new Error("Too few arguments provided");
  const t = F_(n, e, A), R = t.opts.type || gN(_), I = Cn(R).renderToFile.bind(null, _);
  return P_(I, n, t);
};
bE.toFileStream = function(_, n, e) {
  if (arguments.length < 2)
    throw new Error("Too few arguments provided");
  const A = F_(n, e, _.emit.bind(_, "error")), R = Cn("png").renderToFileStream.bind(null, _);
  P_(R, n, A);
};
var dN = bE;
const UN = /* @__PURE__ */ oe(dN);
var MR = {}, rn = {};
(function(E) {
  Object.defineProperty(E, "__esModule", { value: !0 }), E.raw = E.format = E.escape = E.arrayToList = E.bufferToString = E.objectToValues = E.escapeId = E.dateToString = void 0;
  const _ = Ci, n = {
    backtick: /`/g,
    dot: /\./g,
    timezone: /([+\-\s])(\d\d):?(\d\d)?/,
    escapeChars: /[\0\b\t\n\r\x1a"'\\]/g
  }, e = {
    "\0": "\\0",
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\r": "\\r",
    "": "\\Z",
    '"': '\\"',
    "'": "\\'",
    "\\": "\\\\"
  }, A = {
    singleQuote: 39,
    backtick: 96,
    backslash: 92,
    dash: 45,
    slash: 47,
    asterisk: 42,
    questionMark: 63,
    newline: 10,
    space: 32,
    tab: 9,
    carriageReturn: 13
  }, t = (s) => typeof s == "object" && s !== null && !Array.isArray(s), R = (s) => s >= 65 && s <= 90 || s >= 97 && s <= 122 || s >= 48 && s <= 57 || s === 95, i = (s) => s === A.space || s === A.tab || s === A.newline || s === A.carriageReturn, I = (s, f, O) => {
    if (f >= O)
      return !0;
    for (let M = f; M < O; M++) {
      const d = s.charCodeAt(M);
      if (d !== A.space && d !== A.tab && d !== A.newline && d !== A.carriageReturn)
        return !1;
    }
    return !0;
  }, N = (s) => s | 32, T = (s, f, O, M) => {
    for (let d = 0; d < O.length; d++)
      if (N(s.charCodeAt(f + d)) !== O.charCodeAt(d))
        return !1;
    return (f === 0 || !R(s.charCodeAt(f - 1))) && (f + O.length >= M || !R(s.charCodeAt(f + O.length)));
  }, a = (s, f) => {
    const O = s.charCodeAt(f), M = s.charCodeAt(f + 1);
    if (O === A.singleQuote) {
      for (let d = f + 1; d < s.length; d++)
        if (s.charCodeAt(d) === A.backslash)
          d++;
        else if (s.charCodeAt(d) === A.singleQuote)
          return d + 1;
      return s.length;
    }
    if (O === A.backtick) {
      const d = s.length;
      for (let w = f + 1; w < d; w++)
        if (s.charCodeAt(w) === A.backtick) {
          if (s.charCodeAt(w + 1) === A.backtick) {
            w++;
            continue;
          }
          return w + 1;
        }
      return d;
    }
    if (O === A.dash && M === A.dash) {
      const d = s.indexOf(`
`, f + 2);
      return d === -1 ? s.length : d + 1;
    }
    if (O === A.slash && M === A.asterisk) {
      const d = s.indexOf("*/", f + 2);
      return d === -1 ? s.length : d + 2;
    }
    return -1;
  }, u = (s, f) => {
    const O = s.length;
    for (let M = f; M < O; M++) {
      const d = s.charCodeAt(M);
      if (d === A.questionMark)
        return M;
      if (d === A.singleQuote || d === A.backtick || d === A.dash || d === A.slash) {
        const w = a(s, M);
        w !== -1 && (M = w - 1);
      }
    }
    return -1;
  }, C = (s, f = 0) => {
    const O = s.length;
    for (let M = f; M < O; M++) {
      const d = s.charCodeAt(M), w = d | 32;
      if (d === A.singleQuote || d === A.backtick || d === A.dash || d === A.slash) {
        const o = a(s, M);
        if (o !== -1) {
          M = o - 1;
          continue;
        }
      }
      if (w === 115 && T(s, M, "set", O))
        return M + 3;
      if (w === 107 && T(s, M, "key", O)) {
        let o = M + 3;
        for (; o < O && i(s.charCodeAt(o)); )
          o++;
        if (T(s, o, "update", O))
          return o + 6;
      }
    }
    return -1;
  }, r = (s) => Object.prototype.toString.call(s) === "[object Date]", D = (s) => typeof s == "object" && s !== null && "toSqlString" in s && typeof s.toSqlString == "function", c = (s) => {
    n.escapeChars.lastIndex = 0;
    let f = 0, O = "", M;
    for (M = n.escapeChars.exec(s); M !== null; M = n.escapeChars.exec(s))
      O += s.slice(f, M.index), O += e[M[0]], f = n.escapeChars.lastIndex;
    return f === 0 ? `'${s}'` : f < s.length ? `'${O}${s.slice(f)}'` : `'${O}'`;
  }, l = (s) => s < 10 ? "0" + s : "" + s, S = (s) => s < 10 ? "00" + s : s < 100 ? "0" + s : "" + s, B = (s) => s < 10 ? "000" + s : s < 100 ? "00" + s : s < 1e3 ? "0" + s : "" + s, h = (s) => {
    if (s === "Z")
      return 0;
    const f = s.match(n.timezone);
    return f ? (f[1] === "-" ? -1 : 1) * (Number.parseInt(f[2], 10) + (f[3] ? Number.parseInt(f[3], 10) : 0) / 60) * 60 : !1;
  }, g = (s, f) => {
    if (Number.isNaN(s.getTime()))
      return "NULL";
    let O, M, d, w, o, m, b;
    if (f === "local")
      O = s.getFullYear(), M = s.getMonth() + 1, d = s.getDate(), w = s.getHours(), o = s.getMinutes(), m = s.getSeconds(), b = s.getMilliseconds();
    else {
      const p = h(f);
      let v = s.getTime();
      p !== !1 && p !== 0 && (v += p * 6e4);
      const P = new Date(v);
      O = P.getUTCFullYear(), M = P.getUTCMonth() + 1, d = P.getUTCDate(), w = P.getUTCHours(), o = P.getUTCMinutes(), m = P.getUTCSeconds(), b = P.getUTCMilliseconds();
    }
    return c(B(O) + "-" + l(M) + "-" + l(d) + " " + l(w) + ":" + l(o) + ":" + l(m) + "." + S(b));
  };
  E.dateToString = g;
  const L = (s, f) => {
    if (Array.isArray(s)) {
      const d = s.length, w = new Array(d);
      for (let o = 0; o < d; o++)
        w[o] = (0, E.escapeId)(s[o], f);
      return w.join(", ");
    }
    const O = String(s), M = O.indexOf("->") !== -1;
    return f || M ? O.indexOf("`") === -1 ? `\`${O}\`` : `\`${O.replace(n.backtick, "``")}\`` : O.indexOf("`") === -1 && O.indexOf(".") === -1 ? `\`${O}\`` : `\`${O.replace(n.backtick, "``").replace(n.dot, "`.`")}\``;
  };
  E.escapeId = L;
  const U = (s, f) => {
    const O = Object.keys(s), M = O.length;
    if (M === 0)
      return "";
    let d = "";
    for (let w = 0; w < M; w++) {
      const o = O[w], m = s[o];
      typeof m != "function" && (d.length > 0 && (d += ", "), d += (0, E.escapeId)(o), d += " = ", d += (0, E.escape)(m, !0, f));
    }
    return d;
  };
  E.objectToValues = U;
  const F = (s) => `X${c(s.toString("hex"))}`;
  E.bufferToString = F;
  const Q = (s, f) => {
    const O = s.length, M = new Array(O);
    for (let d = 0; d < O; d++) {
      const w = s[d];
      Array.isArray(w) ? M[d] = `(${(0, E.arrayToList)(w, f)})` : M[d] = (0, E.escape)(w, !0, f);
    }
    return M.join(", ");
  };
  E.arrayToList = Q;
  const y = (s, f, O) => {
    if (s == null)
      return "NULL";
    switch (typeof s) {
      case "boolean":
        return s ? "true" : "false";
      case "number":
      case "bigint":
        return s + "";
      case "object":
        return r(s) ? (0, E.dateToString)(s, O || "local") : Array.isArray(s) ? (0, E.arrayToList)(s, O) : _.Buffer.isBuffer(s) ? (0, E.bufferToString)(s) : s instanceof Uint8Array ? (0, E.bufferToString)(_.Buffer.from(s)) : D(s) ? String(s.toSqlString()) : f != null ? c(String(s)) : t(s) ? (0, E.objectToValues)(s, O) : c(String(s));
      case "string":
        return c(s);
      default:
        return c(String(s));
    }
  };
  E.escape = y;
  const k = (s, f, O, M) => {
    if (f == null)
      return s;
    const d = Array.isArray(f) ? f : [f], w = d.length;
    let o = -2, m = "", b = 0, p = 0, v = u(s, 0);
    for (; p < w && v !== -1; ) {
      let P = v + 1, x;
      for (; s.charCodeAt(P) === 63; )
        P++;
      const q = P - v, X = d[p];
      if (q > 2) {
        v = u(s, P);
        continue;
      }
      q === 2 ? x = (0, E.escapeId)(X) : typeof X == "number" ? x = `${X}` : typeof X == "object" && X !== null && !O ? (o === -2 && (o = C(s)), o !== -1 && o <= v && I(s, o, v) && !D(X) && !Array.isArray(X) && !_.Buffer.isBuffer(X) && !(X instanceof Uint8Array) && !r(X) && t(X) ? (x = (0, E.objectToValues)(X, M), o = C(s, P)) : x = (0, E.escape)(X, !0, M)) : x = (0, E.escape)(X, O, M), m += s.slice(b, v), m += x, b = P, p++, v = u(s, P);
    }
    return b === 0 ? s : b < s.length ? m + s.slice(b) : m;
  };
  E.format = k;
  const G = (s) => {
    if (typeof s != "string")
      throw new TypeError("argument sql must be a string");
    return {
      toSqlString: () => s
    };
  };
  E.raw = G;
})(rn);
var ZE = {};
Object.defineProperty(ZE, "__esModule", { value: !0 });
ZE.createLRU = void 0;
const oN = (E) => {
  let { max: _ } = E;
  if (!(Number.isInteger(_) && _ > 0))
    throw new TypeError("`max` must be a positive integer");
  let n = 0, e = 0, A = 0, t = [];
  const { onEviction: R } = E, i = /* @__PURE__ */ new Map(), I = new Array(_).fill(void 0), N = new Array(_).fill(void 0), T = new Array(_).fill(0), a = new Array(_).fill(0), u = (c) => {
    T[A] = c, a[c] = A, T[c] = 0, A = c;
  }, C = (c) => {
    if (c === A)
      return;
    const l = T[c], S = a[c];
    c === e ? e = l : T[S] = l, a[l] = S, u(c);
  }, r = (c) => {
    let l = A;
    const S = Math.min(n, c), B = n - S, h = new Array(S), g = new Array(S);
    for (let L = 0; L < B; L++) {
      const U = I[e];
      R == null || R(U, N[e]), i.delete(U), e = T[e];
    }
    for (let L = S - 1; L >= 0; L--)
      h[L] = I[l], g[L] = N[l], i.set(I[l], L), l = a[l];
    e = 0, A = S - 1, n = S, I.length = c, N.length = c, T.length = c, a.length = c;
    for (let L = 0; L < S; L++)
      I[L] = h[L], N[L] = g[L], T[L] = L + 1, a[L] = L - 1;
    t = [];
    for (let L = S; L < c; L++)
      t.push(L);
  }, D = (c) => {
    I.length = c, N.length = c, T.length = c, a.length = c, I.fill(void 0, _), N.fill(void 0, _), T.fill(0, _), a.fill(0, _);
  };
  return {
    /** Adds a key-value pair to the cache. Updates the value if the key already exists. */
    set(c, l) {
      if (c === void 0)
        return;
      let S = i.get(c);
      if (S === void 0) {
        if (n === _) {
          S = e;
          const B = I[S];
          R == null || R(B, N[S]), i.delete(B), e = T[S], a[e] = 0;
        } else
          S = t.length > 0 ? t.pop() : n, n++;
        i.set(c, S), I[S] = c, N[S] = l, n === 1 ? e = A = S : u(S);
      } else
        R == null || R(c, N[S]), N[S] = l, C(S);
    },
    /** Retrieves the value for a given key and moves the key to the most recent position. */
    get(c) {
      const l = i.get(c);
      if (l !== void 0)
        return l !== A && C(l), N[l];
    },
    /** Retrieves the value for a given key without changing its position. */
    peek: (c) => {
      const l = i.get(c);
      return l !== void 0 ? N[l] : void 0;
    },
    /** Checks if a key exists in the cache. */
    has: (c) => i.has(c),
    /** Iterates over all keys in the cache, from most recent to least recent. */
    *keys() {
      let c = A;
      for (let l = 0; l < n; l++)
        yield I[c], c = a[c];
    },
    /** Iterates over all values in the cache, from most recent to least recent. */
    *values() {
      let c = A;
      for (let l = 0; l < n; l++)
        yield N[c], c = a[c];
    },
    /** Iterates over `[key, value]` pairs in the cache, from most recent to least recent. */
    *entries() {
      let c = A;
      for (let l = 0; l < n; l++)
        yield [I[c], N[c]], c = a[c];
    },
    /** Iterates over each value-key pair in the cache, from most recent to least recent. */
    forEach: (c) => {
      let l = A;
      for (let S = 0; S < n; S++) {
        const B = I[l], h = N[l];
        c(h, B), l = a[l];
      }
    },
    /** Deletes a key-value pair from the cache. */
    delete(c) {
      const l = i.get(c);
      if (l === void 0)
        return !1;
      R == null || R(c, N[l]), i.delete(c), t.push(l), I[l] = void 0, N[l] = void 0;
      const S = a[l], B = T[l];
      return l === e ? e = B : T[S] = B, l === A ? A = S : a[B] = S, n--, !0;
    },
    /** Evicts the oldest item or the specified number of the oldest items from the cache. */
    evict: (c) => {
      let l = Math.min(c, n);
      for (; l > 0; ) {
        const S = e, B = I[S];
        R == null || R(B, N[S]), i.delete(B), I[S] = void 0, N[S] = void 0, e = T[S], a[e] = 0, n--, t.push(S), l--;
      }
      n === 0 && (e = A = 0);
    },
    /** Clears all key-value pairs from the cache. */
    clear() {
      if (R) {
        let c = e;
        for (let l = 0; l < n; l++)
          R(I[c], N[c]), c = T[c];
      }
      i.clear(), I.fill(void 0), N.fill(void 0), t = [], n = 0, e = A = 0;
    },
    /** Resizes the cache to a new maximum size, evicting items if necessary. */
    resize: (c) => {
      if (!(Number.isInteger(c) && c > 0))
        throw new TypeError("`max` must be a positive integer");
      c !== _ && (c < _ ? r(c) : D(c), _ = c);
    },
    /** Returns the maximum number of items that can be stored in the cache. */
    get max() {
      return _;
    },
    /** Returns the number of items currently stored in the cache. */
    get size() {
      return n;
    },
    /** Returns the number of currently available slots in the cache before reaching the maximum size. */
    get available() {
      return _ - n;
    }
  };
};
ZE.createLRU = oN;
const { createLRU: wN } = ZE, Rn = wN({
  max: 15e3
});
function gR(E, _, n, e) {
  const A = [
    E,
    typeof n.nestTables,
    n.nestTables,
    !!n.rowsAsArray,
    !!(n.supportBigNumbers || e.supportBigNumbers),
    !!(n.bigNumberStrings || e.bigNumberStrings),
    typeof n.typeCast == "boolean" ? n.typeCast : typeof n.typeCast,
    n.timezone || e.timezone,
    !!n.decimalNumbers,
    n.dateStrings
  ];
  for (let t = 0; t < _.length; ++t) {
    const R = _[t];
    A.push([
      R.name,
      R.columnType,
      R.length,
      R.schema,
      R.table,
      R.flags,
      R.characterSet
    ]);
  }
  return JSON.stringify(A, null, 0);
}
function GN(E, _, n, e, A) {
  const t = gR(E, _, n, e);
  let R = Rn.get(t);
  return R || (R = A(_, n, e), Rn.set(t, R), R);
}
function FN(E) {
  Rn.resize(E);
}
function PN() {
  Rn.clear();
}
var ye = {
  getParser: GN,
  setMaxCache: FN,
  clearCache: PN,
  _keyFromFields: gR
};
function J(E, n) {
  var n = n || {};
  this._capacity = n.capacity, this._head = 0, this._tail = 0, Array.isArray(E) ? this._fromArray(E) : (this._capacityMask = 3, this._list = new Array(4));
}
J.prototype.peekAt = function(_) {
  var n = _;
  if (n === (n | 0)) {
    var e = this.size();
    if (!(n >= e || n < -e))
      return n < 0 && (n += e), n = this._head + n & this._capacityMask, this._list[n];
  }
};
J.prototype.get = function(_) {
  return this.peekAt(_);
};
J.prototype.peek = function() {
  if (this._head !== this._tail)
    return this._list[this._head];
};
J.prototype.peekFront = function() {
  return this.peek();
};
J.prototype.peekBack = function() {
  return this.peekAt(-1);
};
Object.defineProperty(J.prototype, "length", {
  get: function() {
    return this.size();
  }
});
J.prototype.size = function() {
  return this._head === this._tail ? 0 : this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
};
J.prototype.unshift = function(_) {
  if (arguments.length === 0) return this.size();
  var n = this._list.length;
  return this._head = this._head - 1 + n & this._capacityMask, this._list[this._head] = _, this._tail === this._head && this._growArray(), this._capacity && this.size() > this._capacity && this.pop(), this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
};
J.prototype.shift = function() {
  var _ = this._head;
  if (_ !== this._tail) {
    var n = this._list[_];
    return this._list[_] = void 0, this._head = _ + 1 & this._capacityMask, _ < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2 && this._shrinkArray(), n;
  }
};
J.prototype.push = function(_) {
  if (arguments.length === 0) return this.size();
  var n = this._tail;
  return this._list[n] = _, this._tail = n + 1 & this._capacityMask, this._tail === this._head && this._growArray(), this._capacity && this.size() > this._capacity && this.shift(), this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
};
J.prototype.pop = function() {
  var _ = this._tail;
  if (_ !== this._head) {
    var n = this._list.length;
    this._tail = _ - 1 + n & this._capacityMask;
    var e = this._list[this._tail];
    return this._list[this._tail] = void 0, this._head < 2 && _ > 1e4 && _ <= n >>> 2 && this._shrinkArray(), e;
  }
};
J.prototype.removeOne = function(_) {
  var n = _;
  if (n === (n | 0) && this._head !== this._tail) {
    var e = this.size(), A = this._list.length;
    if (!(n >= e || n < -e)) {
      n < 0 && (n += e), n = this._head + n & this._capacityMask;
      var t = this._list[n], R;
      if (_ < e / 2) {
        for (R = _; R > 0; R--)
          this._list[n] = this._list[n = n - 1 + A & this._capacityMask];
        this._list[n] = void 0, this._head = this._head + 1 + A & this._capacityMask;
      } else {
        for (R = e - 1 - _; R > 0; R--)
          this._list[n] = this._list[n = n + 1 + A & this._capacityMask];
        this._list[n] = void 0, this._tail = this._tail - 1 + A & this._capacityMask;
      }
      return t;
    }
  }
};
J.prototype.remove = function(_, n) {
  var e = _, A, t = n;
  if (e === (e | 0) && this._head !== this._tail) {
    var R = this.size(), i = this._list.length;
    if (!(e >= R || e < -R || n < 1)) {
      if (e < 0 && (e += R), n === 1 || !n)
        return A = new Array(1), A[0] = this.removeOne(e), A;
      if (e === 0 && e + n >= R)
        return A = this.toArray(), this.clear(), A;
      e + n > R && (n = R - e);
      var I;
      for (A = new Array(n), I = 0; I < n; I++)
        A[I] = this._list[this._head + e + I & this._capacityMask];
      if (e = this._head + e & this._capacityMask, _ + n === R) {
        for (this._tail = this._tail - n + i & this._capacityMask, I = n; I > 0; I--)
          this._list[e = e + 1 + i & this._capacityMask] = void 0;
        return A;
      }
      if (_ === 0) {
        for (this._head = this._head + n + i & this._capacityMask, I = n - 1; I > 0; I--)
          this._list[e = e + 1 + i & this._capacityMask] = void 0;
        return A;
      }
      if (e < R / 2) {
        for (this._head = this._head + _ + n + i & this._capacityMask, I = _; I > 0; I--)
          this.unshift(this._list[e = e - 1 + i & this._capacityMask]);
        for (e = this._head - 1 + i & this._capacityMask; t > 0; )
          this._list[e = e - 1 + i & this._capacityMask] = void 0, t--;
        _ < 0 && (this._tail = e);
      } else {
        for (this._tail = e, e = e + n + i & this._capacityMask, I = R - (n + _); I > 0; I--)
          this.push(this._list[e++]);
        for (e = this._tail; t > 0; )
          this._list[e = e + 1 + i & this._capacityMask] = void 0, t--;
      }
      return this._head < 2 && this._tail > 1e4 && this._tail <= i >>> 2 && this._shrinkArray(), A;
    }
  }
};
J.prototype.splice = function(_, n) {
  var e = _;
  if (e === (e | 0)) {
    var A = this.size();
    if (e < 0 && (e += A), !(e > A))
      if (arguments.length > 2) {
        var t, R, i, I = arguments.length, N = this._list.length, T = 2;
        if (!A || e < A / 2) {
          for (R = new Array(e), t = 0; t < e; t++)
            R[t] = this._list[this._head + t & this._capacityMask];
          for (n === 0 ? (i = [], e > 0 && (this._head = this._head + e + N & this._capacityMask)) : (i = this.remove(e, n), this._head = this._head + e + N & this._capacityMask); I > T; )
            this.unshift(arguments[--I]);
          for (t = e; t > 0; t--)
            this.unshift(R[t - 1]);
        } else {
          R = new Array(A - (e + n));
          var a = R.length;
          for (t = 0; t < a; t++)
            R[t] = this._list[this._head + e + n + t & this._capacityMask];
          for (n === 0 ? (i = [], e != A && (this._tail = this._head + e + N & this._capacityMask)) : (i = this.remove(e, n), this._tail = this._tail - a + N & this._capacityMask); T < I; )
            this.push(arguments[T++]);
          for (t = 0; t < a; t++)
            this.push(R[t]);
        }
        return i;
      } else
        return this.remove(e, n);
  }
};
J.prototype.clear = function() {
  this._list = new Array(this._list.length), this._head = 0, this._tail = 0;
};
J.prototype.isEmpty = function() {
  return this._head === this._tail;
};
J.prototype.toArray = function() {
  return this._copyArray(!1);
};
J.prototype._fromArray = function(_) {
  var n = _.length, e = this._nextPowerOf2(n);
  this._list = new Array(e), this._capacityMask = e - 1, this._tail = n;
  for (var A = 0; A < n; A++) this._list[A] = _[A];
};
J.prototype._copyArray = function(_, n) {
  var e = this._list, A = e.length, t = this.length;
  if (n = n | t, n == t && this._head < this._tail)
    return this._list.slice(this._head, this._tail);
  var R = new Array(n), i = 0, I;
  if (_ || this._head > this._tail) {
    for (I = this._head; I < A; I++) R[i++] = e[I];
    for (I = 0; I < this._tail; I++) R[i++] = e[I];
  } else
    for (I = this._head; I < this._tail; I++) R[i++] = e[I];
  return R;
};
J.prototype._growArray = function() {
  if (this._head != 0) {
    var _ = this._copyArray(!0, this._list.length << 1);
    this._tail = this._list.length, this._head = 0, this._list = _;
  } else
    this._tail = this._list.length, this._list.length <<= 1;
  this._capacityMask = this._capacityMask << 1 | 1;
};
J.prototype._shrinkArray = function() {
  this._list.length >>>= 1, this._capacityMask >>>= 1;
};
J.prototype._nextPowerOf2 = function(_) {
  var n = Math.log(_) / Math.log(2), e = 1 << n + 1;
  return Math.max(e, 4);
};
var LR = J, Dn = {};
(function(E) {
  E.EE_CANTCREATEFILE = 1, E.EE_READ = 2, E.EE_WRITE = 3, E.EE_BADCLOSE = 4, E.EE_OUTOFMEMORY = 5, E.EE_DELETE = 6, E.EE_LINK = 7, E.EE_EOFERR = 9, E.EE_CANTLOCK = 10, E.EE_CANTUNLOCK = 11, E.EE_DIR = 12, E.EE_STAT = 13, E.EE_CANT_CHSIZE = 14, E.EE_CANT_OPEN_STREAM = 15, E.EE_GETWD = 16, E.EE_SETWD = 17, E.EE_LINK_WARNING = 18, E.EE_OPEN_WARNING = 19, E.EE_DISK_FULL = 20, E.EE_CANT_MKDIR = 21, E.EE_UNKNOWN_CHARSET = 22, E.EE_OUT_OF_FILERESOURCES = 23, E.EE_CANT_READLINK = 24, E.EE_CANT_SYMLINK = 25, E.EE_REALPATH = 26, E.EE_SYNC = 27, E.EE_UNKNOWN_COLLATION = 28, E.EE_FILENOTFOUND = 29, E.EE_FILE_NOT_CLOSED = 30, E.EE_CHANGE_OWNERSHIP = 31, E.EE_CHANGE_PERMISSIONS = 32, E.EE_CANT_SEEK = 33, E.EE_CAPACITY_EXCEEDED = 34, E.EE_DISK_FULL_WITH_RETRY_MSG = 35, E.EE_FAILED_TO_CREATE_TIMER = 36, E.EE_FAILED_TO_DELETE_TIMER = 37, E.EE_FAILED_TO_CREATE_TIMER_QUEUE = 38, E.EE_FAILED_TO_START_TIMER_NOTIFY_THREAD = 39, E.EE_FAILED_TO_CREATE_TIMER_NOTIFY_THREAD_INTERRUPT_EVENT = 40, E.EE_EXITING_TIMER_NOTIFY_THREAD = 41, E.EE_WIN_LIBRARY_LOAD_FAILED = 42, E.EE_WIN_RUN_TIME_ERROR_CHECK = 43, E.EE_FAILED_TO_DETERMINE_LARGE_PAGE_SIZE = 44, E.EE_FAILED_TO_KILL_ALL_THREADS = 45, E.EE_FAILED_TO_CREATE_IO_COMPLETION_PORT = 46, E.EE_FAILED_TO_OPEN_DEFAULTS_FILE = 47, E.EE_FAILED_TO_HANDLE_DEFAULTS_FILE = 48, E.EE_WRONG_DIRECTIVE_IN_CONFIG_FILE = 49, E.EE_SKIPPING_DIRECTIVE_DUE_TO_MAX_INCLUDE_RECURSION = 50, E.EE_INCORRECT_GRP_DEFINITION_IN_CONFIG_FILE = 51, E.EE_OPTION_WITHOUT_GRP_IN_CONFIG_FILE = 52, E.EE_CONFIG_FILE_PERMISSION_ERROR = 53, E.EE_IGNORE_WORLD_WRITABLE_CONFIG_FILE = 54, E.EE_USING_DISABLED_OPTION = 55, E.EE_USING_DISABLED_SHORT_OPTION = 56, E.EE_USING_PASSWORD_ON_CLI_IS_INSECURE = 57, E.EE_UNKNOWN_SUFFIX_FOR_VARIABLE = 58, E.EE_SSL_ERROR_FROM_FILE = 59, E.EE_SSL_ERROR = 60, E.EE_NET_SEND_ERROR_IN_BOOTSTRAP = 61, E.EE_PACKETS_OUT_OF_ORDER = 62, E.EE_UNKNOWN_PROTOCOL_OPTION = 63, E.EE_FAILED_TO_LOCATE_SERVER_PUBLIC_KEY = 64, E.EE_PUBLIC_KEY_NOT_IN_PEM_FORMAT = 65, E.EE_DEBUG_INFO = 66, E.EE_UNKNOWN_VARIABLE = 67, E.EE_UNKNOWN_OPTION = 68, E.EE_UNKNOWN_SHORT_OPTION = 69, E.EE_OPTION_WITHOUT_ARGUMENT = 70, E.EE_OPTION_REQUIRES_ARGUMENT = 71, E.EE_SHORT_OPTION_REQUIRES_ARGUMENT = 72, E.EE_OPTION_IGNORED_DUE_TO_INVALID_VALUE = 73, E.EE_OPTION_WITH_EMPTY_VALUE = 74, E.EE_FAILED_TO_ASSIGN_MAX_VALUE_TO_OPTION = 75, E.EE_INCORRECT_BOOLEAN_VALUE_FOR_OPTION = 76, E.EE_FAILED_TO_SET_OPTION_VALUE = 77, E.EE_INCORRECT_INT_VALUE_FOR_OPTION = 78, E.EE_INCORRECT_UINT_VALUE_FOR_OPTION = 79, E.EE_ADJUSTED_SIGNED_VALUE_FOR_OPTION = 80, E.EE_ADJUSTED_UNSIGNED_VALUE_FOR_OPTION = 81, E.EE_ADJUSTED_ULONGLONG_VALUE_FOR_OPTION = 82, E.EE_ADJUSTED_DOUBLE_VALUE_FOR_OPTION = 83, E.EE_INVALID_DECIMAL_VALUE_FOR_OPTION = 84, E.EE_COLLATION_PARSER_ERROR = 85, E.EE_FAILED_TO_RESET_BEFORE_PRIMARY_IGNORABLE_CHAR = 86, E.EE_FAILED_TO_RESET_BEFORE_TERTIARY_IGNORABLE_CHAR = 87, E.EE_SHIFT_CHAR_OUT_OF_RANGE = 88, E.EE_RESET_CHAR_OUT_OF_RANGE = 89, E.EE_UNKNOWN_LDML_TAG = 90, E.EE_FAILED_TO_RESET_BEFORE_SECONDARY_IGNORABLE_CHAR = 91, E.EE_FAILED_PROCESSING_DIRECTIVE = 92, E.EE_PTHREAD_KILL_FAILED = 93, E.HA_ERR_KEY_NOT_FOUND = 120, E.HA_ERR_FOUND_DUPP_KEY = 121, E.HA_ERR_INTERNAL_ERROR = 122, E.HA_ERR_RECORD_CHANGED = 123, E.HA_ERR_WRONG_INDEX = 124, E.HA_ERR_ROLLED_BACK = 125, E.HA_ERR_CRASHED = 126, E.HA_ERR_WRONG_IN_RECORD = 127, E.HA_ERR_OUT_OF_MEM = 128, E.HA_ERR_NOT_A_TABLE = 130, E.HA_ERR_WRONG_COMMAND = 131, E.HA_ERR_OLD_FILE = 132, E.HA_ERR_NO_ACTIVE_RECORD = 133, E.HA_ERR_RECORD_DELETED = 134, E.HA_ERR_RECORD_FILE_FULL = 135, E.HA_ERR_INDEX_FILE_FULL = 136, E.HA_ERR_END_OF_FILE = 137, E.HA_ERR_UNSUPPORTED = 138, E.HA_ERR_TOO_BIG_ROW = 139, E.HA_WRONG_CREATE_OPTION = 140, E.HA_ERR_FOUND_DUPP_UNIQUE = 141, E.HA_ERR_UNKNOWN_CHARSET = 142, E.HA_ERR_WRONG_MRG_TABLE_DEF = 143, E.HA_ERR_CRASHED_ON_REPAIR = 144, E.HA_ERR_CRASHED_ON_USAGE = 145, E.HA_ERR_LOCK_WAIT_TIMEOUT = 146, E.HA_ERR_LOCK_TABLE_FULL = 147, E.HA_ERR_READ_ONLY_TRANSACTION = 148, E.HA_ERR_LOCK_DEADLOCK = 149, E.HA_ERR_CANNOT_ADD_FOREIGN = 150, E.HA_ERR_NO_REFERENCED_ROW = 151, E.HA_ERR_ROW_IS_REFERENCED = 152, E.HA_ERR_NO_SAVEPOINT = 153, E.HA_ERR_NON_UNIQUE_BLOCK_SIZE = 154, E.HA_ERR_NO_SUCH_TABLE = 155, E.HA_ERR_TABLE_EXIST = 156, E.HA_ERR_NO_CONNECTION = 157, E.HA_ERR_NULL_IN_SPATIAL = 158, E.HA_ERR_TABLE_DEF_CHANGED = 159, E.HA_ERR_NO_PARTITION_FOUND = 160, E.HA_ERR_RBR_LOGGING_FAILED = 161, E.HA_ERR_DROP_INDEX_FK = 162, E.HA_ERR_FOREIGN_DUPLICATE_KEY = 163, E.HA_ERR_TABLE_NEEDS_UPGRADE = 164, E.HA_ERR_TABLE_READONLY = 165, E.HA_ERR_AUTOINC_READ_FAILED = 166, E.HA_ERR_AUTOINC_ERANGE = 167, E.HA_ERR_GENERIC = 168, E.HA_ERR_RECORD_IS_THE_SAME = 169, E.HA_ERR_LOGGING_IMPOSSIBLE = 170, E.HA_ERR_CORRUPT_EVENT = 171, E.HA_ERR_NEW_FILE = 172, E.HA_ERR_ROWS_EVENT_APPLY = 173, E.HA_ERR_INITIALIZATION = 174, E.HA_ERR_FILE_TOO_SHORT = 175, E.HA_ERR_WRONG_CRC = 176, E.HA_ERR_TOO_MANY_CONCURRENT_TRXS = 177, E.HA_ERR_NOT_IN_LOCK_PARTITIONS = 178, E.HA_ERR_INDEX_COL_TOO_LONG = 179, E.HA_ERR_INDEX_CORRUPT = 180, E.HA_ERR_UNDO_REC_TOO_BIG = 181, E.HA_FTS_INVALID_DOCID = 182, E.HA_ERR_TABLE_IN_FK_CHECK = 183, E.HA_ERR_TABLESPACE_EXISTS = 184, E.HA_ERR_TOO_MANY_FIELDS = 185, E.HA_ERR_ROW_IN_WRONG_PARTITION = 186, E.HA_ERR_INNODB_READ_ONLY = 187, E.HA_ERR_FTS_EXCEED_RESULT_CACHE_LIMIT = 188, E.HA_ERR_TEMP_FILE_WRITE_FAILURE = 189, E.HA_ERR_INNODB_FORCED_RECOVERY = 190, E.HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE = 191, E.HA_ERR_FK_DEPTH_EXCEEDED = 192, E.HA_MISSING_CREATE_OPTION = 193, E.HA_ERR_SE_OUT_OF_MEMORY = 194, E.HA_ERR_TABLE_CORRUPT = 195, E.HA_ERR_QUERY_INTERRUPTED = 196, E.HA_ERR_TABLESPACE_MISSING = 197, E.HA_ERR_TABLESPACE_IS_NOT_EMPTY = 198, E.HA_ERR_WRONG_FILE_NAME = 199, E.HA_ERR_NOT_ALLOWED_COMMAND = 200, E.HA_ERR_COMPUTE_FAILED = 201, E.HA_ERR_ROW_FORMAT_CHANGED = 202, E.HA_ERR_NO_WAIT_LOCK = 203, E.HA_ERR_DISK_FULL_NOWAIT = 204, E.HA_ERR_NO_SESSION_TEMP = 205, E.HA_ERR_WRONG_TABLE_NAME = 206, E.HA_ERR_TOO_LONG_PATH = 207, E.HA_ERR_SAMPLING_INIT_FAILED = 208, E.HA_ERR_FTS_TOO_MANY_NESTED_EXP = 209, E.ER_HASHCHK = 1e3, E.ER_NISAMCHK = 1001, E.ER_NO = 1002, E.ER_YES = 1003, E.ER_CANT_CREATE_FILE = 1004, E.ER_CANT_CREATE_TABLE = 1005, E.ER_CANT_CREATE_DB = 1006, E.ER_DB_CREATE_EXISTS = 1007, E.ER_DB_DROP_EXISTS = 1008, E.ER_DB_DROP_DELETE = 1009, E.ER_DB_DROP_RMDIR = 1010, E.ER_CANT_DELETE_FILE = 1011, E.ER_CANT_FIND_SYSTEM_REC = 1012, E.ER_CANT_GET_STAT = 1013, E.ER_CANT_GET_WD = 1014, E.ER_CANT_LOCK = 1015, E.ER_CANT_OPEN_FILE = 1016, E.ER_FILE_NOT_FOUND = 1017, E.ER_CANT_READ_DIR = 1018, E.ER_CANT_SET_WD = 1019, E.ER_CHECKREAD = 1020, E.ER_DISK_FULL = 1021, E.ER_DUP_KEY = 1022, E.ER_ERROR_ON_CLOSE = 1023, E.ER_ERROR_ON_READ = 1024, E.ER_ERROR_ON_RENAME = 1025, E.ER_ERROR_ON_WRITE = 1026, E.ER_FILE_USED = 1027, E.ER_FILSORT_ABORT = 1028, E.ER_FORM_NOT_FOUND = 1029, E.ER_GET_ERRNO = 1030, E.ER_ILLEGAL_HA = 1031, E.ER_KEY_NOT_FOUND = 1032, E.ER_NOT_FORM_FILE = 1033, E.ER_NOT_KEYFILE = 1034, E.ER_OLD_KEYFILE = 1035, E.ER_OPEN_AS_READONLY = 1036, E.ER_OUTOFMEMORY = 1037, E.ER_OUT_OF_SORTMEMORY = 1038, E.ER_UNEXPECTED_EOF = 1039, E.ER_CON_COUNT_ERROR = 1040, E.ER_OUT_OF_RESOURCES = 1041, E.ER_BAD_HOST_ERROR = 1042, E.ER_HANDSHAKE_ERROR = 1043, E.ER_DBACCESS_DENIED_ERROR = 1044, E.ER_ACCESS_DENIED_ERROR = 1045, E.ER_NO_DB_ERROR = 1046, E.ER_UNKNOWN_COM_ERROR = 1047, E.ER_BAD_NULL_ERROR = 1048, E.ER_BAD_DB_ERROR = 1049, E.ER_TABLE_EXISTS_ERROR = 1050, E.ER_BAD_TABLE_ERROR = 1051, E.ER_NON_UNIQ_ERROR = 1052, E.ER_SERVER_SHUTDOWN = 1053, E.ER_BAD_FIELD_ERROR = 1054, E.ER_WRONG_FIELD_WITH_GROUP = 1055, E.ER_WRONG_GROUP_FIELD = 1056, E.ER_WRONG_SUM_SELECT = 1057, E.ER_WRONG_VALUE_COUNT = 1058, E.ER_TOO_LONG_IDENT = 1059, E.ER_DUP_FIELDNAME = 1060, E.ER_DUP_KEYNAME = 1061, E.ER_DUP_ENTRY = 1062, E.ER_WRONG_FIELD_SPEC = 1063, E.ER_PARSE_ERROR = 1064, E.ER_EMPTY_QUERY = 1065, E.ER_NONUNIQ_TABLE = 1066, E.ER_INVALID_DEFAULT = 1067, E.ER_MULTIPLE_PRI_KEY = 1068, E.ER_TOO_MANY_KEYS = 1069, E.ER_TOO_MANY_KEY_PARTS = 1070, E.ER_TOO_LONG_KEY = 1071, E.ER_KEY_COLUMN_DOES_NOT_EXITS = 1072, E.ER_BLOB_USED_AS_KEY = 1073, E.ER_TOO_BIG_FIELDLENGTH = 1074, E.ER_WRONG_AUTO_KEY = 1075, E.ER_READY = 1076, E.ER_NORMAL_SHUTDOWN = 1077, E.ER_GOT_SIGNAL = 1078, E.ER_SHUTDOWN_COMPLETE = 1079, E.ER_FORCING_CLOSE = 1080, E.ER_IPSOCK_ERROR = 1081, E.ER_NO_SUCH_INDEX = 1082, E.ER_WRONG_FIELD_TERMINATORS = 1083, E.ER_BLOBS_AND_NO_TERMINATED = 1084, E.ER_TEXTFILE_NOT_READABLE = 1085, E.ER_FILE_EXISTS_ERROR = 1086, E.ER_LOAD_INFO = 1087, E.ER_ALTER_INFO = 1088, E.ER_WRONG_SUB_KEY = 1089, E.ER_CANT_REMOVE_ALL_FIELDS = 1090, E.ER_CANT_DROP_FIELD_OR_KEY = 1091, E.ER_INSERT_INFO = 1092, E.ER_UPDATE_TABLE_USED = 1093, E.ER_NO_SUCH_THREAD = 1094, E.ER_KILL_DENIED_ERROR = 1095, E.ER_NO_TABLES_USED = 1096, E.ER_TOO_BIG_SET = 1097, E.ER_NO_UNIQUE_LOGFILE = 1098, E.ER_TABLE_NOT_LOCKED_FOR_WRITE = 1099, E.ER_TABLE_NOT_LOCKED = 1100, E.ER_BLOB_CANT_HAVE_DEFAULT = 1101, E.ER_WRONG_DB_NAME = 1102, E.ER_WRONG_TABLE_NAME = 1103, E.ER_TOO_BIG_SELECT = 1104, E.ER_UNKNOWN_ERROR = 1105, E.ER_UNKNOWN_PROCEDURE = 1106, E.ER_WRONG_PARAMCOUNT_TO_PROCEDURE = 1107, E.ER_WRONG_PARAMETERS_TO_PROCEDURE = 1108, E.ER_UNKNOWN_TABLE = 1109, E.ER_FIELD_SPECIFIED_TWICE = 1110, E.ER_INVALID_GROUP_FUNC_USE = 1111, E.ER_UNSUPPORTED_EXTENSION = 1112, E.ER_TABLE_MUST_HAVE_COLUMNS = 1113, E.ER_RECORD_FILE_FULL = 1114, E.ER_UNKNOWN_CHARACTER_SET = 1115, E.ER_TOO_MANY_TABLES = 1116, E.ER_TOO_MANY_FIELDS = 1117, E.ER_TOO_BIG_ROWSIZE = 1118, E.ER_STACK_OVERRUN = 1119, E.ER_WRONG_OUTER_JOIN = 1120, E.ER_NULL_COLUMN_IN_INDEX = 1121, E.ER_CANT_FIND_UDF = 1122, E.ER_CANT_INITIALIZE_UDF = 1123, E.ER_UDF_NO_PATHS = 1124, E.ER_UDF_EXISTS = 1125, E.ER_CANT_OPEN_LIBRARY = 1126, E.ER_CANT_FIND_DL_ENTRY = 1127, E.ER_FUNCTION_NOT_DEFINED = 1128, E.ER_HOST_IS_BLOCKED = 1129, E.ER_HOST_NOT_PRIVILEGED = 1130, E.ER_PASSWORD_ANONYMOUS_USER = 1131, E.ER_PASSWORD_NOT_ALLOWED = 1132, E.ER_PASSWORD_NO_MATCH = 1133, E.ER_UPDATE_INFO = 1134, E.ER_CANT_CREATE_THREAD = 1135, E.ER_WRONG_VALUE_COUNT_ON_ROW = 1136, E.ER_CANT_REOPEN_TABLE = 1137, E.ER_INVALID_USE_OF_NULL = 1138, E.ER_REGEXP_ERROR = 1139, E.ER_MIX_OF_GROUP_FUNC_AND_FIELDS = 1140, E.ER_NONEXISTING_GRANT = 1141, E.ER_TABLEACCESS_DENIED_ERROR = 1142, E.ER_COLUMNACCESS_DENIED_ERROR = 1143, E.ER_ILLEGAL_GRANT_FOR_TABLE = 1144, E.ER_GRANT_WRONG_HOST_OR_USER = 1145, E.ER_NO_SUCH_TABLE = 1146, E.ER_NONEXISTING_TABLE_GRANT = 1147, E.ER_NOT_ALLOWED_COMMAND = 1148, E.ER_SYNTAX_ERROR = 1149, E.ER_UNUSED1 = 1150, E.ER_UNUSED2 = 1151, E.ER_ABORTING_CONNECTION = 1152, E.ER_NET_PACKET_TOO_LARGE = 1153, E.ER_NET_READ_ERROR_FROM_PIPE = 1154, E.ER_NET_FCNTL_ERROR = 1155, E.ER_NET_PACKETS_OUT_OF_ORDER = 1156, E.ER_NET_UNCOMPRESS_ERROR = 1157, E.ER_NET_READ_ERROR = 1158, E.ER_NET_READ_INTERRUPTED = 1159, E.ER_NET_ERROR_ON_WRITE = 1160, E.ER_NET_WRITE_INTERRUPTED = 1161, E.ER_TOO_LONG_STRING = 1162, E.ER_TABLE_CANT_HANDLE_BLOB = 1163, E.ER_TABLE_CANT_HANDLE_AUTO_INCREMENT = 1164, E.ER_UNUSED3 = 1165, E.ER_WRONG_COLUMN_NAME = 1166, E.ER_WRONG_KEY_COLUMN = 1167, E.ER_WRONG_MRG_TABLE = 1168, E.ER_DUP_UNIQUE = 1169, E.ER_BLOB_KEY_WITHOUT_LENGTH = 1170, E.ER_PRIMARY_CANT_HAVE_NULL = 1171, E.ER_TOO_MANY_ROWS = 1172, E.ER_REQUIRES_PRIMARY_KEY = 1173, E.ER_NO_RAID_COMPILED = 1174, E.ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE = 1175, E.ER_KEY_DOES_NOT_EXITS = 1176, E.ER_CHECK_NO_SUCH_TABLE = 1177, E.ER_CHECK_NOT_IMPLEMENTED = 1178, E.ER_CANT_DO_THIS_DURING_AN_TRANSACTION = 1179, E.ER_ERROR_DURING_COMMIT = 1180, E.ER_ERROR_DURING_ROLLBACK = 1181, E.ER_ERROR_DURING_FLUSH_LOGS = 1182, E.ER_ERROR_DURING_CHECKPOINT = 1183, E.ER_NEW_ABORTING_CONNECTION = 1184, E.ER_DUMP_NOT_IMPLEMENTED = 1185, E.ER_FLUSH_MASTER_BINLOG_CLOSED = 1186, E.ER_INDEX_REBUILD = 1187, E.ER_SOURCE = 1188, E.ER_SOURCE_NET_READ = 1189, E.ER_SOURCE_NET_WRITE = 1190, E.ER_FT_MATCHING_KEY_NOT_FOUND = 1191, E.ER_LOCK_OR_ACTIVE_TRANSACTION = 1192, E.ER_UNKNOWN_SYSTEM_VARIABLE = 1193, E.ER_CRASHED_ON_USAGE = 1194, E.ER_CRASHED_ON_REPAIR = 1195, E.ER_WARNING_NOT_COMPLETE_ROLLBACK = 1196, E.ER_TRANS_CACHE_FULL = 1197, E.ER_SLAVE_MUST_STOP = 1198, E.ER_REPLICA_NOT_RUNNING = 1199, E.ER_BAD_REPLICA = 1200, E.ER_CONNECTION_METADATA = 1201, E.ER_REPLICA_THREAD = 1202, E.ER_TOO_MANY_USER_CONNECTIONS = 1203, E.ER_SET_CONSTANTS_ONLY = 1204, E.ER_LOCK_WAIT_TIMEOUT = 1205, E.ER_LOCK_TABLE_FULL = 1206, E.ER_READ_ONLY_TRANSACTION = 1207, E.ER_DROP_DB_WITH_READ_LOCK = 1208, E.ER_CREATE_DB_WITH_READ_LOCK = 1209, E.ER_WRONG_ARGUMENTS = 1210, E.ER_NO_PERMISSION_TO_CREATE_USER = 1211, E.ER_UNION_TABLES_IN_DIFFERENT_DIR = 1212, E.ER_LOCK_DEADLOCK = 1213, E.ER_TABLE_CANT_HANDLE_FT = 1214, E.ER_CANNOT_ADD_FOREIGN = 1215, E.ER_NO_REFERENCED_ROW = 1216, E.ER_ROW_IS_REFERENCED = 1217, E.ER_CONNECT_TO_SOURCE = 1218, E.ER_QUERY_ON_MASTER = 1219, E.ER_ERROR_WHEN_EXECUTING_COMMAND = 1220, E.ER_WRONG_USAGE = 1221, E.ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT = 1222, E.ER_CANT_UPDATE_WITH_READLOCK = 1223, E.ER_MIXING_NOT_ALLOWED = 1224, E.ER_DUP_ARGUMENT = 1225, E.ER_USER_LIMIT_REACHED = 1226, E.ER_SPECIFIC_ACCESS_DENIED_ERROR = 1227, E.ER_LOCAL_VARIABLE = 1228, E.ER_GLOBAL_VARIABLE = 1229, E.ER_NO_DEFAULT = 1230, E.ER_WRONG_VALUE_FOR_VAR = 1231, E.ER_WRONG_TYPE_FOR_VAR = 1232, E.ER_VAR_CANT_BE_READ = 1233, E.ER_CANT_USE_OPTION_HERE = 1234, E.ER_NOT_SUPPORTED_YET = 1235, E.ER_SOURCE_FATAL_ERROR_READING_BINLOG = 1236, E.ER_REPLICA_IGNORED_TABLE = 1237, E.ER_INCORRECT_GLOBAL_LOCAL_VAR = 1238, E.ER_WRONG_FK_DEF = 1239, E.ER_KEY_REF_DO_NOT_MATCH_TABLE_REF = 1240, E.ER_OPERAND_COLUMNS = 1241, E.ER_SUBQUERY_NO_1_ROW = 1242, E.ER_UNKNOWN_STMT_HANDLER = 1243, E.ER_CORRUPT_HELP_DB = 1244, E.ER_CYCLIC_REFERENCE = 1245, E.ER_AUTO_CONVERT = 1246, E.ER_ILLEGAL_REFERENCE = 1247, E.ER_DERIVED_MUST_HAVE_ALIAS = 1248, E.ER_SELECT_REDUCED = 1249, E.ER_TABLENAME_NOT_ALLOWED_HERE = 1250, E.ER_NOT_SUPPORTED_AUTH_MODE = 1251, E.ER_SPATIAL_CANT_HAVE_NULL = 1252, E.ER_COLLATION_CHARSET_MISMATCH = 1253, E.ER_SLAVE_WAS_RUNNING = 1254, E.ER_SLAVE_WAS_NOT_RUNNING = 1255, E.ER_TOO_BIG_FOR_UNCOMPRESS = 1256, E.ER_ZLIB_Z_MEM_ERROR = 1257, E.ER_ZLIB_Z_BUF_ERROR = 1258, E.ER_ZLIB_Z_DATA_ERROR = 1259, E.ER_CUT_VALUE_GROUP_CONCAT = 1260, E.ER_WARN_TOO_FEW_RECORDS = 1261, E.ER_WARN_TOO_MANY_RECORDS = 1262, E.ER_WARN_NULL_TO_NOTNULL = 1263, E.ER_WARN_DATA_OUT_OF_RANGE = 1264, E.WARN_DATA_TRUNCATED = 1265, E.ER_WARN_USING_OTHER_HANDLER = 1266, E.ER_CANT_AGGREGATE_2COLLATIONS = 1267, E.ER_DROP_USER = 1268, E.ER_REVOKE_GRANTS = 1269, E.ER_CANT_AGGREGATE_3COLLATIONS = 1270, E.ER_CANT_AGGREGATE_NCOLLATIONS = 1271, E.ER_VARIABLE_IS_NOT_STRUCT = 1272, E.ER_UNKNOWN_COLLATION = 1273, E.ER_REPLICA_IGNORED_SSL_PARAMS = 1274, E.ER_SERVER_IS_IN_SECURE_AUTH_MODE = 1275, E.ER_WARN_FIELD_RESOLVED = 1276, E.ER_BAD_REPLICA_UNTIL_COND = 1277, E.ER_MISSING_SKIP_REPLICA = 1278, E.ER_UNTIL_COND_IGNORED = 1279, E.ER_WRONG_NAME_FOR_INDEX = 1280, E.ER_WRONG_NAME_FOR_CATALOG = 1281, E.ER_WARN_QC_RESIZE = 1282, E.ER_BAD_FT_COLUMN = 1283, E.ER_UNKNOWN_KEY_CACHE = 1284, E.ER_WARN_HOSTNAME_WONT_WORK = 1285, E.ER_UNKNOWN_STORAGE_ENGINE = 1286, E.ER_WARN_DEPRECATED_SYNTAX = 1287, E.ER_NON_UPDATABLE_TABLE = 1288, E.ER_FEATURE_DISABLED = 1289, E.ER_OPTION_PREVENTS_STATEMENT = 1290, E.ER_DUPLICATED_VALUE_IN_TYPE = 1291, E.ER_TRUNCATED_WRONG_VALUE = 1292, E.ER_TOO_MUCH_AUTO_TIMESTAMP_COLS = 1293, E.ER_INVALID_ON_UPDATE = 1294, E.ER_UNSUPPORTED_PS = 1295, E.ER_GET_ERRMSG = 1296, E.ER_GET_TEMPORARY_ERRMSG = 1297, E.ER_UNKNOWN_TIME_ZONE = 1298, E.ER_WARN_INVALID_TIMESTAMP = 1299, E.ER_INVALID_CHARACTER_STRING = 1300, E.ER_WARN_ALLOWED_PACKET_OVERFLOWED = 1301, E.ER_CONFLICTING_DECLARATIONS = 1302, E.ER_SP_NO_RECURSIVE_CREATE = 1303, E.ER_SP_ALREADY_EXISTS = 1304, E.ER_SP_DOES_NOT_EXIST = 1305, E.ER_SP_DROP_FAILED = 1306, E.ER_SP_STORE_FAILED = 1307, E.ER_SP_LILABEL_MISMATCH = 1308, E.ER_SP_LABEL_REDEFINE = 1309, E.ER_SP_LABEL_MISMATCH = 1310, E.ER_SP_UNINIT_VAR = 1311, E.ER_SP_BADSELECT = 1312, E.ER_SP_BADRETURN = 1313, E.ER_SP_BADSTATEMENT = 1314, E.ER_UPDATE_LOG_DEPRECATED_IGNORED = 1315, E.ER_UPDATE_LOG_DEPRECATED_TRANSLATED = 1316, E.ER_QUERY_INTERRUPTED = 1317, E.ER_SP_WRONG_NO_OF_ARGS = 1318, E.ER_SP_COND_MISMATCH = 1319, E.ER_SP_NORETURN = 1320, E.ER_SP_NORETURNEND = 1321, E.ER_SP_BAD_CURSOR_QUERY = 1322, E.ER_SP_BAD_CURSOR_SELECT = 1323, E.ER_SP_CURSOR_MISMATCH = 1324, E.ER_SP_CURSOR_ALREADY_OPEN = 1325, E.ER_SP_CURSOR_NOT_OPEN = 1326, E.ER_SP_UNDECLARED_VAR = 1327, E.ER_SP_WRONG_NO_OF_FETCH_ARGS = 1328, E.ER_SP_FETCH_NO_DATA = 1329, E.ER_SP_DUP_PARAM = 1330, E.ER_SP_DUP_VAR = 1331, E.ER_SP_DUP_COND = 1332, E.ER_SP_DUP_CURS = 1333, E.ER_SP_CANT_ALTER = 1334, E.ER_SP_SUBSELECT_NYI = 1335, E.ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG = 1336, E.ER_SP_VARCOND_AFTER_CURSHNDLR = 1337, E.ER_SP_CURSOR_AFTER_HANDLER = 1338, E.ER_SP_CASE_NOT_FOUND = 1339, E.ER_FPARSER_TOO_BIG_FILE = 1340, E.ER_FPARSER_BAD_HEADER = 1341, E.ER_FPARSER_EOF_IN_COMMENT = 1342, E.ER_FPARSER_ERROR_IN_PARAMETER = 1343, E.ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER = 1344, E.ER_VIEW_NO_EXPLAIN = 1345, E.ER_FRM_UNKNOWN_TYPE = 1346, E.ER_WRONG_OBJECT = 1347, E.ER_NONUPDATEABLE_COLUMN = 1348, E.ER_VIEW_SELECT_DERIVED = 1349, E.ER_VIEW_SELECT_CLAUSE = 1350, E.ER_VIEW_SELECT_VARIABLE = 1351, E.ER_VIEW_SELECT_TMPTABLE = 1352, E.ER_VIEW_WRONG_LIST = 1353, E.ER_WARN_VIEW_MERGE = 1354, E.ER_WARN_VIEW_WITHOUT_KEY = 1355, E.ER_VIEW_INVALID = 1356, E.ER_SP_NO_DROP_SP = 1357, E.ER_SP_GOTO_IN_HNDLR = 1358, E.ER_TRG_ALREADY_EXISTS = 1359, E.ER_TRG_DOES_NOT_EXIST = 1360, E.ER_TRG_ON_VIEW_OR_TEMP_TABLE = 1361, E.ER_TRG_CANT_CHANGE_ROW = 1362, E.ER_TRG_NO_SUCH_ROW_IN_TRG = 1363, E.ER_NO_DEFAULT_FOR_FIELD = 1364, E.ER_DIVISION_BY_ZERO = 1365, E.ER_TRUNCATED_WRONG_VALUE_FOR_FIELD = 1366, E.ER_ILLEGAL_VALUE_FOR_TYPE = 1367, E.ER_VIEW_NONUPD_CHECK = 1368, E.ER_VIEW_CHECK_FAILED = 1369, E.ER_PROCACCESS_DENIED_ERROR = 1370, E.ER_RELAY_LOG_FAIL = 1371, E.ER_PASSWD_LENGTH = 1372, E.ER_UNKNOWN_TARGET_BINLOG = 1373, E.ER_IO_ERR_LOG_INDEX_READ = 1374, E.ER_BINLOG_PURGE_PROHIBITED = 1375, E.ER_FSEEK_FAIL = 1376, E.ER_BINLOG_PURGE_FATAL_ERR = 1377, E.ER_LOG_IN_USE = 1378, E.ER_LOG_PURGE_UNKNOWN_ERR = 1379, E.ER_RELAY_LOG_INIT = 1380, E.ER_NO_BINARY_LOGGING = 1381, E.ER_RESERVED_SYNTAX = 1382, E.ER_WSAS_FAILED = 1383, E.ER_DIFF_GROUPS_PROC = 1384, E.ER_NO_GROUP_FOR_PROC = 1385, E.ER_ORDER_WITH_PROC = 1386, E.ER_LOGGING_PROHIBIT_CHANGING_OF = 1387, E.ER_NO_FILE_MAPPING = 1388, E.ER_WRONG_MAGIC = 1389, E.ER_PS_MANY_PARAM = 1390, E.ER_KEY_PART_0 = 1391, E.ER_VIEW_CHECKSUM = 1392, E.ER_VIEW_MULTIUPDATE = 1393, E.ER_VIEW_NO_INSERT_FIELD_LIST = 1394, E.ER_VIEW_DELETE_MERGE_VIEW = 1395, E.ER_CANNOT_USER = 1396, E.ER_XAER_NOTA = 1397, E.ER_XAER_INVAL = 1398, E.ER_XAER_RMFAIL = 1399, E.ER_XAER_OUTSIDE = 1400, E.ER_XAER_RMERR = 1401, E.ER_XA_RBROLLBACK = 1402, E.ER_NONEXISTING_PROC_GRANT = 1403, E.ER_PROC_AUTO_GRANT_FAIL = 1404, E.ER_PROC_AUTO_REVOKE_FAIL = 1405, E.ER_DATA_TOO_LONG = 1406, E.ER_SP_BAD_SQLSTATE = 1407, E.ER_STARTUP = 1408, E.ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR = 1409, E.ER_CANT_CREATE_USER_WITH_GRANT = 1410, E.ER_WRONG_VALUE_FOR_TYPE = 1411, E.ER_TABLE_DEF_CHANGED = 1412, E.ER_SP_DUP_HANDLER = 1413, E.ER_SP_NOT_VAR_ARG = 1414, E.ER_SP_NO_RETSET = 1415, E.ER_CANT_CREATE_GEOMETRY_OBJECT = 1416, E.ER_FAILED_ROUTINE_BREAK_BINLOG = 1417, E.ER_BINLOG_UNSAFE_ROUTINE = 1418, E.ER_BINLOG_CREATE_ROUTINE_NEED_SUPER = 1419, E.ER_EXEC_STMT_WITH_OPEN_CURSOR = 1420, E.ER_STMT_HAS_NO_OPEN_CURSOR = 1421, E.ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG = 1422, E.ER_NO_DEFAULT_FOR_VIEW_FIELD = 1423, E.ER_SP_NO_RECURSION = 1424, E.ER_TOO_BIG_SCALE = 1425, E.ER_TOO_BIG_PRECISION = 1426, E.ER_M_BIGGER_THAN_D = 1427, E.ER_WRONG_LOCK_OF_SYSTEM_TABLE = 1428, E.ER_CONNECT_TO_FOREIGN_DATA_SOURCE = 1429, E.ER_QUERY_ON_FOREIGN_DATA_SOURCE = 1430, E.ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST = 1431, E.ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE = 1432, E.ER_FOREIGN_DATA_STRING_INVALID = 1433, E.ER_CANT_CREATE_FEDERATED_TABLE = 1434, E.ER_TRG_IN_WRONG_SCHEMA = 1435, E.ER_STACK_OVERRUN_NEED_MORE = 1436, E.ER_TOO_LONG_BODY = 1437, E.ER_WARN_CANT_DROP_DEFAULT_KEYCACHE = 1438, E.ER_TOO_BIG_DISPLAYWIDTH = 1439, E.ER_XAER_DUPID = 1440, E.ER_DATETIME_FUNCTION_OVERFLOW = 1441, E.ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG = 1442, E.ER_VIEW_PREVENT_UPDATE = 1443, E.ER_PS_NO_RECURSION = 1444, E.ER_SP_CANT_SET_AUTOCOMMIT = 1445, E.ER_MALFORMED_DEFINER = 1446, E.ER_VIEW_FRM_NO_USER = 1447, E.ER_VIEW_OTHER_USER = 1448, E.ER_NO_SUCH_USER = 1449, E.ER_FORBID_SCHEMA_CHANGE = 1450, E.ER_ROW_IS_REFERENCED_2 = 1451, E.ER_NO_REFERENCED_ROW_2 = 1452, E.ER_SP_BAD_VAR_SHADOW = 1453, E.ER_TRG_NO_DEFINER = 1454, E.ER_OLD_FILE_FORMAT = 1455, E.ER_SP_RECURSION_LIMIT = 1456, E.ER_SP_PROC_TABLE_CORRUPT = 1457, E.ER_SP_WRONG_NAME = 1458, E.ER_TABLE_NEEDS_UPGRADE = 1459, E.ER_SP_NO_AGGREGATE = 1460, E.ER_MAX_PREPARED_STMT_COUNT_REACHED = 1461, E.ER_VIEW_RECURSIVE = 1462, E.ER_NON_GROUPING_FIELD_USED = 1463, E.ER_TABLE_CANT_HANDLE_SPKEYS = 1464, E.ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA = 1465, E.ER_REMOVED_SPACES = 1466, E.ER_AUTOINC_READ_FAILED = 1467, E.ER_USERNAME = 1468, E.ER_HOSTNAME = 1469, E.ER_WRONG_STRING_LENGTH = 1470, E.ER_NON_INSERTABLE_TABLE = 1471, E.ER_ADMIN_WRONG_MRG_TABLE = 1472, E.ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT = 1473, E.ER_NAME_BECOMES_EMPTY = 1474, E.ER_AMBIGUOUS_FIELD_TERM = 1475, E.ER_FOREIGN_SERVER_EXISTS = 1476, E.ER_FOREIGN_SERVER_DOESNT_EXIST = 1477, E.ER_ILLEGAL_HA_CREATE_OPTION = 1478, E.ER_PARTITION_REQUIRES_VALUES_ERROR = 1479, E.ER_PARTITION_WRONG_VALUES_ERROR = 1480, E.ER_PARTITION_MAXVALUE_ERROR = 1481, E.ER_PARTITION_SUBPARTITION_ERROR = 1482, E.ER_PARTITION_SUBPART_MIX_ERROR = 1483, E.ER_PARTITION_WRONG_NO_PART_ERROR = 1484, E.ER_PARTITION_WRONG_NO_SUBPART_ERROR = 1485, E.ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR = 1486, E.ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR = 1487, E.ER_FIELD_NOT_FOUND_PART_ERROR = 1488, E.ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR = 1489, E.ER_INCONSISTENT_PARTITION_INFO_ERROR = 1490, E.ER_PARTITION_FUNC_NOT_ALLOWED_ERROR = 1491, E.ER_PARTITIONS_MUST_BE_DEFINED_ERROR = 1492, E.ER_RANGE_NOT_INCREASING_ERROR = 1493, E.ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR = 1494, E.ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR = 1495, E.ER_PARTITION_ENTRY_ERROR = 1496, E.ER_MIX_HANDLER_ERROR = 1497, E.ER_PARTITION_NOT_DEFINED_ERROR = 1498, E.ER_TOO_MANY_PARTITIONS_ERROR = 1499, E.ER_SUBPARTITION_ERROR = 1500, E.ER_CANT_CREATE_HANDLER_FILE = 1501, E.ER_BLOB_FIELD_IN_PART_FUNC_ERROR = 1502, E.ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF = 1503, E.ER_NO_PARTS_ERROR = 1504, E.ER_PARTITION_MGMT_ON_NONPARTITIONED = 1505, E.ER_FOREIGN_KEY_ON_PARTITIONED = 1506, E.ER_DROP_PARTITION_NON_EXISTENT = 1507, E.ER_DROP_LAST_PARTITION = 1508, E.ER_COALESCE_ONLY_ON_HASH_PARTITION = 1509, E.ER_REORG_HASH_ONLY_ON_SAME_NO = 1510, E.ER_REORG_NO_PARAM_ERROR = 1511, E.ER_ONLY_ON_RANGE_LIST_PARTITION = 1512, E.ER_ADD_PARTITION_SUBPART_ERROR = 1513, E.ER_ADD_PARTITION_NO_NEW_PARTITION = 1514, E.ER_COALESCE_PARTITION_NO_PARTITION = 1515, E.ER_REORG_PARTITION_NOT_EXIST = 1516, E.ER_SAME_NAME_PARTITION = 1517, E.ER_NO_BINLOG_ERROR = 1518, E.ER_CONSECUTIVE_REORG_PARTITIONS = 1519, E.ER_REORG_OUTSIDE_RANGE = 1520, E.ER_PARTITION_FUNCTION_FAILURE = 1521, E.ER_PART_STATE_ERROR = 1522, E.ER_LIMITED_PART_RANGE = 1523, E.ER_PLUGIN_IS_NOT_LOADED = 1524, E.ER_WRONG_VALUE = 1525, E.ER_NO_PARTITION_FOR_GIVEN_VALUE = 1526, E.ER_FILEGROUP_OPTION_ONLY_ONCE = 1527, E.ER_CREATE_FILEGROUP_FAILED = 1528, E.ER_DROP_FILEGROUP_FAILED = 1529, E.ER_TABLESPACE_AUTO_EXTEND_ERROR = 1530, E.ER_WRONG_SIZE_NUMBER = 1531, E.ER_SIZE_OVERFLOW_ERROR = 1532, E.ER_ALTER_FILEGROUP_FAILED = 1533, E.ER_BINLOG_ROW_LOGGING_FAILED = 1534, E.ER_BINLOG_ROW_WRONG_TABLE_DEF = 1535, E.ER_BINLOG_ROW_RBR_TO_SBR = 1536, E.ER_EVENT_ALREADY_EXISTS = 1537, E.ER_EVENT_STORE_FAILED = 1538, E.ER_EVENT_DOES_NOT_EXIST = 1539, E.ER_EVENT_CANT_ALTER = 1540, E.ER_EVENT_DROP_FAILED = 1541, E.ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG = 1542, E.ER_EVENT_ENDS_BEFORE_STARTS = 1543, E.ER_EVENT_EXEC_TIME_IN_THE_PAST = 1544, E.ER_EVENT_OPEN_TABLE_FAILED = 1545, E.ER_EVENT_NEITHER_M_EXPR_NOR_M_AT = 1546, E.ER_COL_COUNT_DOESNT_MATCH_CORRUPTED = 1547, E.ER_CANNOT_LOAD_FROM_TABLE = 1548, E.ER_EVENT_CANNOT_DELETE = 1549, E.ER_EVENT_COMPILE_ERROR = 1550, E.ER_EVENT_SAME_NAME = 1551, E.ER_EVENT_DATA_TOO_LONG = 1552, E.ER_DROP_INDEX_FK = 1553, E.ER_WARN_DEPRECATED_SYNTAX_WITH_VER = 1554, E.ER_CANT_WRITE_LOCK_LOG_TABLE = 1555, E.ER_CANT_LOCK_LOG_TABLE = 1556, E.ER_FOREIGN_DUPLICATE_KEY = 1557, E.ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE = 1558, E.ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR = 1559, E.ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT = 1560, E.ER_NDB_CANT_SWITCH_BINLOG_FORMAT = 1561, E.ER_PARTITION_NO_TEMPORARY = 1562, E.ER_PARTITION_CONST_DOMAIN_ERROR = 1563, E.ER_PARTITION_FUNCTION_IS_NOT_ALLOWED = 1564, E.ER_DDL_LOG_ERROR = 1565, E.ER_NULL_IN_VALUES_LESS_THAN = 1566, E.ER_WRONG_PARTITION_NAME = 1567, E.ER_CANT_CHANGE_TX_CHARACTERISTICS = 1568, E.ER_DUP_ENTRY_AUTOINCREMENT_CASE = 1569, E.ER_EVENT_MODIFY_QUEUE_ERROR = 1570, E.ER_EVENT_SET_VAR_ERROR = 1571, E.ER_PARTITION_MERGE_ERROR = 1572, E.ER_CANT_ACTIVATE_LOG = 1573, E.ER_RBR_NOT_AVAILABLE = 1574, E.ER_BASE64_DECODE_ERROR = 1575, E.ER_EVENT_RECURSION_FORBIDDEN = 1576, E.ER_EVENTS_DB_ERROR = 1577, E.ER_ONLY_INTEGERS_ALLOWED = 1578, E.ER_UNSUPORTED_LOG_ENGINE = 1579, E.ER_BAD_LOG_STATEMENT = 1580, E.ER_CANT_RENAME_LOG_TABLE = 1581, E.ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT = 1582, E.ER_WRONG_PARAMETERS_TO_NATIVE_FCT = 1583, E.ER_WRONG_PARAMETERS_TO_STORED_FCT = 1584, E.ER_NATIVE_FCT_NAME_COLLISION = 1585, E.ER_DUP_ENTRY_WITH_KEY_NAME = 1586, E.ER_BINLOG_PURGE_EMFILE = 1587, E.ER_EVENT_CANNOT_CREATE_IN_THE_PAST = 1588, E.ER_EVENT_CANNOT_ALTER_IN_THE_PAST = 1589, E.ER_SLAVE_INCIDENT = 1590, E.ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT = 1591, E.ER_BINLOG_UNSAFE_STATEMENT = 1592, E.ER_BINLOG_FATAL_ERROR = 1593, E.ER_SLAVE_RELAY_LOG_READ_FAILURE = 1594, E.ER_SLAVE_RELAY_LOG_WRITE_FAILURE = 1595, E.ER_SLAVE_CREATE_EVENT_FAILURE = 1596, E.ER_SLAVE_MASTER_COM_FAILURE = 1597, E.ER_BINLOG_LOGGING_IMPOSSIBLE = 1598, E.ER_VIEW_NO_CREATION_CTX = 1599, E.ER_VIEW_INVALID_CREATION_CTX = 1600, E.ER_SR_INVALID_CREATION_CTX = 1601, E.ER_TRG_CORRUPTED_FILE = 1602, E.ER_TRG_NO_CREATION_CTX = 1603, E.ER_TRG_INVALID_CREATION_CTX = 1604, E.ER_EVENT_INVALID_CREATION_CTX = 1605, E.ER_TRG_CANT_OPEN_TABLE = 1606, E.ER_CANT_CREATE_SROUTINE = 1607, E.ER_NEVER_USED = 1608, E.ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT = 1609, E.ER_REPLICA_CORRUPT_EVENT = 1610, E.ER_LOAD_DATA_INVALID_COLUMN = 1611, E.ER_LOG_PURGE_NO_FILE = 1612, E.ER_XA_RBTIMEOUT = 1613, E.ER_XA_RBDEADLOCK = 1614, E.ER_NEED_REPREPARE = 1615, E.ER_DELAYED_NOT_SUPPORTED = 1616, E.WARN_NO_CONNECTION_METADATA = 1617, E.WARN_OPTION_IGNORED = 1618, E.ER_PLUGIN_DELETE_BUILTIN = 1619, E.WARN_PLUGIN_BUSY = 1620, E.ER_VARIABLE_IS_READONLY = 1621, E.ER_WARN_ENGINE_TRANSACTION_ROLLBACK = 1622, E.ER_SLAVE_HEARTBEAT_FAILURE = 1623, E.ER_REPLICA_HEARTBEAT_VALUE_OUT_OF_RANGE = 1624, E.ER_NDB_REPLICATION_SCHEMA_ERROR = 1625, E.ER_CONFLICT_FN_PARSE_ERROR = 1626, E.ER_EXCEPTIONS_WRITE_ERROR = 1627, E.ER_TOO_LONG_TABLE_COMMENT = 1628, E.ER_TOO_LONG_FIELD_COMMENT = 1629, E.ER_FUNC_INEXISTENT_NAME_COLLISION = 1630, E.ER_DATABASE_NAME = 1631, E.ER_TABLE_NAME = 1632, E.ER_PARTITION_NAME = 1633, E.ER_SUBPARTITION_NAME = 1634, E.ER_TEMPORARY_NAME = 1635, E.ER_RENAMED_NAME = 1636, E.ER_TOO_MANY_CONCURRENT_TRXS = 1637, E.WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED = 1638, E.ER_DEBUG_SYNC_TIMEOUT = 1639, E.ER_DEBUG_SYNC_HIT_LIMIT = 1640, E.ER_DUP_SIGNAL_SET = 1641, E.ER_SIGNAL_WARN = 1642, E.ER_SIGNAL_NOT_FOUND = 1643, E.ER_SIGNAL_EXCEPTION = 1644, E.ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER = 1645, E.ER_SIGNAL_BAD_CONDITION_TYPE = 1646, E.WARN_COND_ITEM_TRUNCATED = 1647, E.ER_COND_ITEM_TOO_LONG = 1648, E.ER_UNKNOWN_LOCALE = 1649, E.ER_REPLICA_IGNORE_SERVER_IDS = 1650, E.ER_QUERY_CACHE_DISABLED = 1651, E.ER_SAME_NAME_PARTITION_FIELD = 1652, E.ER_PARTITION_COLUMN_LIST_ERROR = 1653, E.ER_WRONG_TYPE_COLUMN_VALUE_ERROR = 1654, E.ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR = 1655, E.ER_MAXVALUE_IN_VALUES_IN = 1656, E.ER_TOO_MANY_VALUES_ERROR = 1657, E.ER_ROW_SINGLE_PARTITION_FIELD_ERROR = 1658, E.ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD = 1659, E.ER_PARTITION_FIELDS_TOO_LONG = 1660, E.ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE = 1661, E.ER_BINLOG_ROW_MODE_AND_STMT_ENGINE = 1662, E.ER_BINLOG_UNSAFE_AND_STMT_ENGINE = 1663, E.ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE = 1664, E.ER_BINLOG_STMT_MODE_AND_ROW_ENGINE = 1665, E.ER_BINLOG_ROW_INJECTION_AND_STMT_MODE = 1666, E.ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE = 1667, E.ER_BINLOG_UNSAFE_LIMIT = 1668, E.ER_UNUSED4 = 1669, E.ER_BINLOG_UNSAFE_SYSTEM_TABLE = 1670, E.ER_BINLOG_UNSAFE_AUTOINC_COLUMNS = 1671, E.ER_BINLOG_UNSAFE_UDF = 1672, E.ER_BINLOG_UNSAFE_SYSTEM_VARIABLE = 1673, E.ER_BINLOG_UNSAFE_SYSTEM_FUNCTION = 1674, E.ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS = 1675, E.ER_MESSAGE_AND_STATEMENT = 1676, E.ER_SLAVE_CONVERSION_FAILED = 1677, E.ER_REPLICA_CANT_CREATE_CONVERSION = 1678, E.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT = 1679, E.ER_PATH_LENGTH = 1680, E.ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT = 1681, E.ER_WRONG_NATIVE_TABLE_STRUCTURE = 1682, E.ER_WRONG_PERFSCHEMA_USAGE = 1683, E.ER_WARN_I_S_SKIPPED_TABLE = 1684, E.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT = 1685, E.ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT = 1686, E.ER_SPATIAL_MUST_HAVE_GEOM_COL = 1687, E.ER_TOO_LONG_INDEX_COMMENT = 1688, E.ER_LOCK_ABORTED = 1689, E.ER_DATA_OUT_OF_RANGE = 1690, E.ER_WRONG_SPVAR_TYPE_IN_LIMIT = 1691, E.ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE = 1692, E.ER_BINLOG_UNSAFE_MIXED_STATEMENT = 1693, E.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN = 1694, E.ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN = 1695, E.ER_FAILED_READ_FROM_PAR_FILE = 1696, E.ER_VALUES_IS_NOT_INT_TYPE_ERROR = 1697, E.ER_ACCESS_DENIED_NO_PASSWORD_ERROR = 1698, E.ER_SET_PASSWORD_AUTH_PLUGIN = 1699, E.ER_GRANT_PLUGIN_USER_EXISTS = 1700, E.ER_TRUNCATE_ILLEGAL_FK = 1701, E.ER_PLUGIN_IS_PERMANENT = 1702, E.ER_REPLICA_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN = 1703, E.ER_REPLICA_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX = 1704, E.ER_STMT_CACHE_FULL = 1705, E.ER_MULTI_UPDATE_KEY_CONFLICT = 1706, E.ER_TABLE_NEEDS_REBUILD = 1707, E.WARN_OPTION_BELOW_LIMIT = 1708, E.ER_INDEX_COLUMN_TOO_LONG = 1709, E.ER_ERROR_IN_TRIGGER_BODY = 1710, E.ER_ERROR_IN_UNKNOWN_TRIGGER_BODY = 1711, E.ER_INDEX_CORRUPT = 1712, E.ER_UNDO_RECORD_TOO_BIG = 1713, E.ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT = 1714, E.ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE = 1715, E.ER_BINLOG_UNSAFE_REPLACE_SELECT = 1716, E.ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT = 1717, E.ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT = 1718, E.ER_BINLOG_UNSAFE_UPDATE_IGNORE = 1719, E.ER_PLUGIN_NO_UNINSTALL = 1720, E.ER_PLUGIN_NO_INSTALL = 1721, E.ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT = 1722, E.ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC = 1723, E.ER_BINLOG_UNSAFE_INSERT_TWO_KEYS = 1724, E.ER_TABLE_IN_FK_CHECK = 1725, E.ER_UNSUPPORTED_ENGINE = 1726, E.ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST = 1727, E.ER_CANNOT_LOAD_FROM_TABLE_V2 = 1728, E.ER_SOURCE_DELAY_VALUE_OUT_OF_RANGE = 1729, E.ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT = 1730, E.ER_PARTITION_EXCHANGE_DIFFERENT_OPTION = 1731, E.ER_PARTITION_EXCHANGE_PART_TABLE = 1732, E.ER_PARTITION_EXCHANGE_TEMP_TABLE = 1733, E.ER_PARTITION_INSTEAD_OF_SUBPARTITION = 1734, E.ER_UNKNOWN_PARTITION = 1735, E.ER_TABLES_DIFFERENT_METADATA = 1736, E.ER_ROW_DOES_NOT_MATCH_PARTITION = 1737, E.ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX = 1738, E.ER_WARN_INDEX_NOT_APPLICABLE = 1739, E.ER_PARTITION_EXCHANGE_FOREIGN_KEY = 1740, E.ER_NO_SUCH_KEY_VALUE = 1741, E.ER_RPL_INFO_DATA_TOO_LONG = 1742, E.ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE = 1743, E.ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE = 1744, E.ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX = 1745, E.ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT = 1746, E.ER_PARTITION_CLAUSE_ON_NONPARTITIONED = 1747, E.ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET = 1748, E.ER_NO_SUCH_PARTITION = 1749, E.ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE = 1750, E.ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE = 1751, E.ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE = 1752, E.ER_MTA_FEATURE_IS_NOT_SUPPORTED = 1753, E.ER_MTA_UPDATED_DBS_GREATER_MAX = 1754, E.ER_MTA_CANT_PARALLEL = 1755, E.ER_MTA_INCONSISTENT_DATA = 1756, E.ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING = 1757, E.ER_DA_INVALID_CONDITION_NUMBER = 1758, E.ER_INSECURE_PLAIN_TEXT = 1759, E.ER_INSECURE_CHANGE_SOURCE = 1760, E.ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO = 1761, E.ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO = 1762, E.ER_SQLTHREAD_WITH_SECURE_REPLICA = 1763, E.ER_TABLE_HAS_NO_FT = 1764, E.ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER = 1765, E.ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION = 1766, E.ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST = 1767, E.ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION = 1768, E.ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION = 1769, E.ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL = 1770, E.ER_SKIPPING_LOGGED_TRANSACTION = 1771, E.ER_MALFORMED_GTID_SET_SPECIFICATION = 1772, E.ER_MALFORMED_GTID_SET_ENCODING = 1773, E.ER_MALFORMED_GTID_SPECIFICATION = 1774, E.ER_GNO_EXHAUSTED = 1775, E.ER_BAD_REPLICA_AUTO_POSITION = 1776, E.ER_AUTO_POSITION_REQUIRES_GTID_MODE_NOT_OFF = 1777, E.ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET = 1778, E.ER_GTID_MODE_ON_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON = 1779, E.ER_GTID_MODE_REQUIRES_BINLOG = 1780, E.ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF = 1781, E.ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON = 1782, E.ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF = 1783, E.ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF = 1784, E.ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE = 1785, E.ER_GTID_UNSAFE_CREATE_SELECT = 1786, E.ER_GTID_UNSAFE_CREATE_DROP_TEMP_TABLE_IN_TRANSACTION = 1787, E.ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME = 1788, E.ER_SOURCE_HAS_PURGED_REQUIRED_GTIDS = 1789, E.ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID = 1790, E.ER_UNKNOWN_EXPLAIN_FORMAT = 1791, E.ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION = 1792, E.ER_TOO_LONG_TABLE_PARTITION_COMMENT = 1793, E.ER_REPLICA_CONFIGURATION = 1794, E.ER_INNODB_FT_LIMIT = 1795, E.ER_INNODB_NO_FT_TEMP_TABLE = 1796, E.ER_INNODB_FT_WRONG_DOCID_COLUMN = 1797, E.ER_INNODB_FT_WRONG_DOCID_INDEX = 1798, E.ER_INNODB_ONLINE_LOG_TOO_BIG = 1799, E.ER_UNKNOWN_ALTER_ALGORITHM = 1800, E.ER_UNKNOWN_ALTER_LOCK = 1801, E.ER_MTA_CHANGE_SOURCE_CANT_RUN_WITH_GAPS = 1802, E.ER_MTA_RECOVERY_FAILURE = 1803, E.ER_MTA_RESET_WORKERS = 1804, E.ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2 = 1805, E.ER_REPLICA_SILENT_RETRY_TRANSACTION = 1806, E.ER_DISCARD_FK_CHECKS_RUNNING = 1807, E.ER_TABLE_SCHEMA_MISMATCH = 1808, E.ER_TABLE_IN_SYSTEM_TABLESPACE = 1809, E.ER_IO_READ_ERROR = 1810, E.ER_IO_WRITE_ERROR = 1811, E.ER_TABLESPACE_MISSING = 1812, E.ER_TABLESPACE_EXISTS = 1813, E.ER_TABLESPACE_DISCARDED = 1814, E.ER_INTERNAL_ERROR = 1815, E.ER_INNODB_IMPORT_ERROR = 1816, E.ER_INNODB_INDEX_CORRUPT = 1817, E.ER_INVALID_YEAR_COLUMN_LENGTH = 1818, E.ER_NOT_VALID_PASSWORD = 1819, E.ER_MUST_CHANGE_PASSWORD = 1820, E.ER_FK_NO_INDEX_CHILD = 1821, E.ER_FK_NO_INDEX_PARENT = 1822, E.ER_FK_FAIL_ADD_SYSTEM = 1823, E.ER_FK_CANNOT_OPEN_PARENT = 1824, E.ER_FK_INCORRECT_OPTION = 1825, E.ER_FK_DUP_NAME = 1826, E.ER_PASSWORD_FORMAT = 1827, E.ER_FK_COLUMN_CANNOT_DROP = 1828, E.ER_FK_COLUMN_CANNOT_DROP_CHILD = 1829, E.ER_FK_COLUMN_NOT_NULL = 1830, E.ER_DUP_INDEX = 1831, E.ER_FK_COLUMN_CANNOT_CHANGE = 1832, E.ER_FK_COLUMN_CANNOT_CHANGE_CHILD = 1833, E.ER_UNUSED5 = 1834, E.ER_MALFORMED_PACKET = 1835, E.ER_READ_ONLY_MODE = 1836, E.ER_GTID_NEXT_TYPE_UNDEFINED_GTID = 1837, E.ER_VARIABLE_NOT_SETTABLE_IN_SP = 1838, E.ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF = 1839, E.ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY = 1840, E.ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY = 1841, E.ER_GTID_PURGED_WAS_CHANGED = 1842, E.ER_GTID_EXECUTED_WAS_CHANGED = 1843, E.ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES = 1844, E.ER_ALTER_OPERATION_NOT_SUPPORTED = 1845, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON = 1846, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY = 1847, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION = 1848, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME = 1849, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE = 1850, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK = 1851, E.ER_UNUSED6 = 1852, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK = 1853, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC = 1854, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS = 1855, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS = 1856, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS = 1857, E.ER_SQL_REPLICA_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE = 1858, E.ER_DUP_UNKNOWN_IN_INDEX = 1859, E.ER_IDENT_CAUSES_TOO_LONG_PATH = 1860, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL = 1861, E.ER_MUST_CHANGE_PASSWORD_LOGIN = 1862, E.ER_ROW_IN_WRONG_PARTITION = 1863, E.ER_MTA_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX = 1864, E.ER_INNODB_NO_FT_USES_PARSER = 1865, E.ER_BINLOG_LOGICAL_CORRUPTION = 1866, E.ER_WARN_PURGE_LOG_IN_USE = 1867, E.ER_WARN_PURGE_LOG_IS_ACTIVE = 1868, E.ER_AUTO_INCREMENT_CONFLICT = 1869, E.WARN_ON_BLOCKHOLE_IN_RBR = 1870, E.ER_REPLICA_CM_INIT_REPOSITORY = 1871, E.ER_REPLICA_AM_INIT_REPOSITORY = 1872, E.ER_ACCESS_DENIED_CHANGE_USER_ERROR = 1873, E.ER_INNODB_READ_ONLY = 1874, E.ER_STOP_REPLICA_SQL_THREAD_TIMEOUT = 1875, E.ER_STOP_REPLICA_IO_THREAD_TIMEOUT = 1876, E.ER_TABLE_CORRUPT = 1877, E.ER_TEMP_FILE_WRITE_FAILURE = 1878, E.ER_INNODB_FT_AUX_NOT_HEX_ID = 1879, E.ER_OLD_TEMPORALS_UPGRADED = 1880, E.ER_INNODB_FORCED_RECOVERY = 1881, E.ER_AES_INVALID_IV = 1882, E.ER_PLUGIN_CANNOT_BE_UNINSTALLED = 1883, E.ER_GTID_UNSAFE_BINLOG_SPLITTABLE_STATEMENT_AND_ASSIGNED_GTID = 1884, E.ER_REPLICA_HAS_MORE_GTIDS_THAN_SOURCE = 1885, E.ER_MISSING_KEY = 1886, E.WARN_NAMED_PIPE_ACCESS_EVERYONE = 1887, E.ER_FILE_CORRUPT = 3e3, E.ER_ERROR_ON_SOURCE = 3001, E.ER_INCONSISTENT_ERROR = 3002, E.ER_STORAGE_ENGINE_NOT_LOADED = 3003, E.ER_GET_STACKED_DA_WITHOUT_ACTIVE_HANDLER = 3004, E.ER_WARN_LEGACY_SYNTAX_CONVERTED = 3005, E.ER_BINLOG_UNSAFE_FULLTEXT_PLUGIN = 3006, E.ER_CANNOT_DISCARD_TEMPORARY_TABLE = 3007, E.ER_FK_DEPTH_EXCEEDED = 3008, E.ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE_V2 = 3009, E.ER_WARN_TRIGGER_DOESNT_HAVE_CREATED = 3010, E.ER_REFERENCED_TRG_DOES_NOT_EXIST = 3011, E.ER_EXPLAIN_NOT_SUPPORTED = 3012, E.ER_INVALID_FIELD_SIZE = 3013, E.ER_MISSING_HA_CREATE_OPTION = 3014, E.ER_ENGINE_OUT_OF_MEMORY = 3015, E.ER_PASSWORD_EXPIRE_ANONYMOUS_USER = 3016, E.ER_REPLICA_SQL_THREAD_MUST_STOP = 3017, E.ER_NO_FT_MATERIALIZED_SUBQUERY = 3018, E.ER_INNODB_UNDO_LOG_FULL = 3019, E.ER_INVALID_ARGUMENT_FOR_LOGARITHM = 3020, E.ER_REPLICA_CHANNEL_IO_THREAD_MUST_STOP = 3021, E.ER_WARN_OPEN_TEMP_TABLES_MUST_BE_ZERO = 3022, E.ER_WARN_ONLY_SOURCE_LOG_FILE_NO_POS = 3023, E.ER_QUERY_TIMEOUT = 3024, E.ER_NON_RO_SELECT_DISABLE_TIMER = 3025, E.ER_DUP_LIST_ENTRY = 3026, E.ER_SQL_MODE_NO_EFFECT = 3027, E.ER_AGGREGATE_ORDER_FOR_UNION = 3028, E.ER_AGGREGATE_ORDER_NON_AGG_QUERY = 3029, E.ER_REPLICA_WORKER_STOPPED_PREVIOUS_THD_ERROR = 3030, E.ER_DONT_SUPPORT_REPLICA_PRESERVE_COMMIT_ORDER = 3031, E.ER_SERVER_OFFLINE_MODE = 3032, E.ER_GIS_DIFFERENT_SRIDS = 3033, E.ER_GIS_UNSUPPORTED_ARGUMENT = 3034, E.ER_GIS_UNKNOWN_ERROR = 3035, E.ER_GIS_UNKNOWN_EXCEPTION = 3036, E.ER_GIS_INVALID_DATA = 3037, E.ER_BOOST_GEOMETRY_EMPTY_INPUT_EXCEPTION = 3038, E.ER_BOOST_GEOMETRY_CENTROID_EXCEPTION = 3039, E.ER_BOOST_GEOMETRY_OVERLAY_INVALID_INPUT_EXCEPTION = 3040, E.ER_BOOST_GEOMETRY_TURN_INFO_EXCEPTION = 3041, E.ER_BOOST_GEOMETRY_SELF_INTERSECTION_POINT_EXCEPTION = 3042, E.ER_BOOST_GEOMETRY_UNKNOWN_EXCEPTION = 3043, E.ER_STD_BAD_ALLOC_ERROR = 3044, E.ER_STD_DOMAIN_ERROR = 3045, E.ER_STD_LENGTH_ERROR = 3046, E.ER_STD_INVALID_ARGUMENT = 3047, E.ER_STD_OUT_OF_RANGE_ERROR = 3048, E.ER_STD_OVERFLOW_ERROR = 3049, E.ER_STD_RANGE_ERROR = 3050, E.ER_STD_UNDERFLOW_ERROR = 3051, E.ER_STD_LOGIC_ERROR = 3052, E.ER_STD_RUNTIME_ERROR = 3053, E.ER_STD_UNKNOWN_EXCEPTION = 3054, E.ER_GIS_DATA_WRONG_ENDIANESS = 3055, E.ER_CHANGE_SOURCE_PASSWORD_LENGTH = 3056, E.ER_USER_LOCK_WRONG_NAME = 3057, E.ER_USER_LOCK_DEADLOCK = 3058, E.ER_REPLACE_INACCESSIBLE_ROWS = 3059, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_GIS = 3060, E.ER_ILLEGAL_USER_VAR = 3061, E.ER_GTID_MODE_OFF = 3062, E.ER_UNSUPPORTED_BY_REPLICATION_THREAD = 3063, E.ER_INCORRECT_TYPE = 3064, E.ER_FIELD_IN_ORDER_NOT_SELECT = 3065, E.ER_AGGREGATE_IN_ORDER_NOT_SELECT = 3066, E.ER_INVALID_RPL_WILD_TABLE_FILTER_PATTERN = 3067, E.ER_NET_OK_PACKET_TOO_LARGE = 3068, E.ER_INVALID_JSON_DATA = 3069, E.ER_INVALID_GEOJSON_MISSING_MEMBER = 3070, E.ER_INVALID_GEOJSON_WRONG_TYPE = 3071, E.ER_INVALID_GEOJSON_UNSPECIFIED = 3072, E.ER_DIMENSION_UNSUPPORTED = 3073, E.ER_REPLICA_CHANNEL_DOES_NOT_EXIST = 3074, E.ER_SLAVE_MULTIPLE_CHANNELS_HOST_PORT = 3075, E.ER_REPLICA_CHANNEL_NAME_INVALID_OR_TOO_LONG = 3076, E.ER_REPLICA_NEW_CHANNEL_WRONG_REPOSITORY = 3077, E.ER_SLAVE_CHANNEL_DELETE = 3078, E.ER_REPLICA_MULTIPLE_CHANNELS_CMD = 3079, E.ER_REPLICA_MAX_CHANNELS_EXCEEDED = 3080, E.ER_REPLICA_CHANNEL_MUST_STOP = 3081, E.ER_REPLICA_CHANNEL_NOT_RUNNING = 3082, E.ER_REPLICA_CHANNEL_WAS_RUNNING = 3083, E.ER_REPLICA_CHANNEL_WAS_NOT_RUNNING = 3084, E.ER_REPLICA_CHANNEL_SQL_THREAD_MUST_STOP = 3085, E.ER_REPLICA_CHANNEL_SQL_SKIP_COUNTER = 3086, E.ER_WRONG_FIELD_WITH_GROUP_V2 = 3087, E.ER_MIX_OF_GROUP_FUNC_AND_FIELDS_V2 = 3088, E.ER_WARN_DEPRECATED_SYSVAR_UPDATE = 3089, E.ER_WARN_DEPRECATED_SQLMODE = 3090, E.ER_CANNOT_LOG_PARTIAL_DROP_DATABASE_WITH_GTID = 3091, E.ER_GROUP_REPLICATION_CONFIGURATION = 3092, E.ER_GROUP_REPLICATION_RUNNING = 3093, E.ER_GROUP_REPLICATION_APPLIER_INIT_ERROR = 3094, E.ER_GROUP_REPLICATION_STOP_APPLIER_THREAD_TIMEOUT = 3095, E.ER_GROUP_REPLICATION_COMMUNICATION_LAYER_SESSION_ERROR = 3096, E.ER_GROUP_REPLICATION_COMMUNICATION_LAYER_JOIN_ERROR = 3097, E.ER_BEFORE_DML_VALIDATION_ERROR = 3098, E.ER_PREVENTS_VARIABLE_WITHOUT_RBR = 3099, E.ER_RUN_HOOK_ERROR = 3100, E.ER_TRANSACTION_ROLLBACK_DURING_COMMIT = 3101, E.ER_GENERATED_COLUMN_FUNCTION_IS_NOT_ALLOWED = 3102, E.ER_UNSUPPORTED_ALTER_INPLACE_ON_VIRTUAL_COLUMN = 3103, E.ER_WRONG_FK_OPTION_FOR_GENERATED_COLUMN = 3104, E.ER_NON_DEFAULT_VALUE_FOR_GENERATED_COLUMN = 3105, E.ER_UNSUPPORTED_ACTION_ON_GENERATED_COLUMN = 3106, E.ER_GENERATED_COLUMN_NON_PRIOR = 3107, E.ER_DEPENDENT_BY_GENERATED_COLUMN = 3108, E.ER_GENERATED_COLUMN_REF_AUTO_INC = 3109, E.ER_FEATURE_NOT_AVAILABLE = 3110, E.ER_CANT_SET_GTID_MODE = 3111, E.ER_CANT_USE_AUTO_POSITION_WITH_GTID_MODE_OFF = 3112, E.ER_CANT_REPLICATE_ANONYMOUS_WITH_AUTO_POSITION = 3113, E.ER_CANT_REPLICATE_ANONYMOUS_WITH_GTID_MODE_ON = 3114, E.ER_CANT_REPLICATE_GTID_WITH_GTID_MODE_OFF = 3115, E.ER_CANT_ENFORCE_GTID_CONSISTENCY_WITH_ONGOING_GTID_VIOLATING_TX = 3116, E.ER_ENFORCE_GTID_CONSISTENCY_WARN_WITH_ONGOING_GTID_VIOLATING_TX = 3117, E.ER_ACCOUNT_HAS_BEEN_LOCKED = 3118, E.ER_WRONG_TABLESPACE_NAME = 3119, E.ER_TABLESPACE_IS_NOT_EMPTY = 3120, E.ER_WRONG_FILE_NAME = 3121, E.ER_BOOST_GEOMETRY_INCONSISTENT_TURNS_EXCEPTION = 3122, E.ER_WARN_OPTIMIZER_HINT_SYNTAX_ERROR = 3123, E.ER_WARN_BAD_MAX_EXECUTION_TIME = 3124, E.ER_WARN_UNSUPPORTED_MAX_EXECUTION_TIME = 3125, E.ER_WARN_CONFLICTING_HINT = 3126, E.ER_WARN_UNKNOWN_QB_NAME = 3127, E.ER_UNRESOLVED_HINT_NAME = 3128, E.ER_WARN_ON_MODIFYING_GTID_EXECUTED_TABLE = 3129, E.ER_PLUGGABLE_PROTOCOL_COMMAND_NOT_SUPPORTED = 3130, E.ER_LOCKING_SERVICE_WRONG_NAME = 3131, E.ER_LOCKING_SERVICE_DEADLOCK = 3132, E.ER_LOCKING_SERVICE_TIMEOUT = 3133, E.ER_GIS_MAX_POINTS_IN_GEOMETRY_OVERFLOWED = 3134, E.ER_SQL_MODE_MERGED = 3135, E.ER_VTOKEN_PLUGIN_TOKEN_MISMATCH = 3136, E.ER_VTOKEN_PLUGIN_TOKEN_NOT_FOUND = 3137, E.ER_CANT_SET_VARIABLE_WHEN_OWNING_GTID = 3138, E.ER_REPLICA_CHANNEL_OPERATION_NOT_ALLOWED = 3139, E.ER_INVALID_JSON_TEXT = 3140, E.ER_INVALID_JSON_TEXT_IN_PARAM = 3141, E.ER_INVALID_JSON_BINARY_DATA = 3142, E.ER_INVALID_JSON_PATH = 3143, E.ER_INVALID_JSON_CHARSET = 3144, E.ER_INVALID_JSON_CHARSET_IN_FUNCTION = 3145, E.ER_INVALID_TYPE_FOR_JSON = 3146, E.ER_INVALID_CAST_TO_JSON = 3147, E.ER_INVALID_JSON_PATH_CHARSET = 3148, E.ER_INVALID_JSON_PATH_WILDCARD = 3149, E.ER_JSON_VALUE_TOO_BIG = 3150, E.ER_JSON_KEY_TOO_BIG = 3151, E.ER_JSON_USED_AS_KEY = 3152, E.ER_JSON_VACUOUS_PATH = 3153, E.ER_JSON_BAD_ONE_OR_ALL_ARG = 3154, E.ER_NUMERIC_JSON_VALUE_OUT_OF_RANGE = 3155, E.ER_INVALID_JSON_VALUE_FOR_CAST = 3156, E.ER_JSON_DOCUMENT_TOO_DEEP = 3157, E.ER_JSON_DOCUMENT_NULL_KEY = 3158, E.ER_SECURE_TRANSPORT_REQUIRED = 3159, E.ER_NO_SECURE_TRANSPORTS_CONFIGURED = 3160, E.ER_DISABLED_STORAGE_ENGINE = 3161, E.ER_USER_DOES_NOT_EXIST = 3162, E.ER_USER_ALREADY_EXISTS = 3163, E.ER_AUDIT_API_ABORT = 3164, E.ER_INVALID_JSON_PATH_ARRAY_CELL = 3165, E.ER_BUFPOOL_RESIZE_INPROGRESS = 3166, E.ER_FEATURE_DISABLED_SEE_DOC = 3167, E.ER_SERVER_ISNT_AVAILABLE = 3168, E.ER_SESSION_WAS_KILLED = 3169, E.ER_CAPACITY_EXCEEDED = 3170, E.ER_CAPACITY_EXCEEDED_IN_RANGE_OPTIMIZER = 3171, E.ER_TABLE_NEEDS_UPG_PART = 3172, E.ER_CANT_WAIT_FOR_EXECUTED_GTID_SET_WHILE_OWNING_A_GTID = 3173, E.ER_CANNOT_ADD_FOREIGN_BASE_COL_VIRTUAL = 3174, E.ER_CANNOT_CREATE_VIRTUAL_INDEX_CONSTRAINT = 3175, E.ER_ERROR_ON_MODIFYING_GTID_EXECUTED_TABLE = 3176, E.ER_LOCK_REFUSED_BY_ENGINE = 3177, E.ER_UNSUPPORTED_ALTER_ONLINE_ON_VIRTUAL_COLUMN = 3178, E.ER_MASTER_KEY_ROTATION_NOT_SUPPORTED_BY_SE = 3179, E.ER_MASTER_KEY_ROTATION_ERROR_BY_SE = 3180, E.ER_MASTER_KEY_ROTATION_BINLOG_FAILED = 3181, E.ER_MASTER_KEY_ROTATION_SE_UNAVAILABLE = 3182, E.ER_TABLESPACE_CANNOT_ENCRYPT = 3183, E.ER_INVALID_ENCRYPTION_OPTION = 3184, E.ER_CANNOT_FIND_KEY_IN_KEYRING = 3185, E.ER_CAPACITY_EXCEEDED_IN_PARSER = 3186, E.ER_UNSUPPORTED_ALTER_ENCRYPTION_INPLACE = 3187, E.ER_KEYRING_UDF_KEYRING_SERVICE_ERROR = 3188, E.ER_USER_COLUMN_OLD_LENGTH = 3189, E.ER_CANT_RESET_SOURCE = 3190, E.ER_GROUP_REPLICATION_MAX_GROUP_SIZE = 3191, E.ER_CANNOT_ADD_FOREIGN_BASE_COL_STORED = 3192, E.ER_TABLE_REFERENCED = 3193, E.ER_PARTITION_ENGINE_DEPRECATED_FOR_TABLE = 3194, E.ER_WARN_USING_GEOMFROMWKB_TO_SET_SRID_ZERO = 3195, E.ER_WARN_USING_GEOMFROMWKB_TO_SET_SRID = 3196, E.ER_XA_RETRY = 3197, E.ER_KEYRING_AWS_UDF_AWS_KMS_ERROR = 3198, E.ER_BINLOG_UNSAFE_XA = 3199, E.ER_UDF_ERROR = 3200, E.ER_KEYRING_MIGRATION_FAILURE = 3201, E.ER_KEYRING_ACCESS_DENIED_ERROR = 3202, E.ER_KEYRING_MIGRATION_STATUS = 3203, E.ER_PLUGIN_FAILED_TO_OPEN_TABLES = 3204, E.ER_PLUGIN_FAILED_TO_OPEN_TABLE = 3205, E.ER_AUDIT_LOG_NO_KEYRING_PLUGIN_INSTALLED = 3206, E.ER_AUDIT_LOG_ENCRYPTION_PASSWORD_HAS_NOT_BEEN_SET = 3207, E.ER_AUDIT_LOG_COULD_NOT_CREATE_AES_KEY = 3208, E.ER_AUDIT_LOG_ENCRYPTION_PASSWORD_CANNOT_BE_FETCHED = 3209, E.ER_AUDIT_LOG_JSON_FILTERING_NOT_ENABLED = 3210, E.ER_AUDIT_LOG_UDF_INSUFFICIENT_PRIVILEGE = 3211, E.ER_AUDIT_LOG_SUPER_PRIVILEGE_REQUIRED = 3212, E.ER_COULD_NOT_REINITIALIZE_AUDIT_LOG_FILTERS = 3213, E.ER_AUDIT_LOG_UDF_INVALID_ARGUMENT_TYPE = 3214, E.ER_AUDIT_LOG_UDF_INVALID_ARGUMENT_COUNT = 3215, E.ER_AUDIT_LOG_HAS_NOT_BEEN_INSTALLED = 3216, E.ER_AUDIT_LOG_UDF_READ_INVALID_MAX_ARRAY_LENGTH_ARG_TYPE = 3217, E.ER_AUDIT_LOG_UDF_READ_INVALID_MAX_ARRAY_LENGTH_ARG_VALUE = 3218, E.ER_AUDIT_LOG_JSON_FILTER_PARSING_ERROR = 3219, E.ER_AUDIT_LOG_JSON_FILTER_NAME_CANNOT_BE_EMPTY = 3220, E.ER_AUDIT_LOG_JSON_USER_NAME_CANNOT_BE_EMPTY = 3221, E.ER_AUDIT_LOG_JSON_FILTER_DOES_NOT_EXISTS = 3222, E.ER_AUDIT_LOG_USER_FIRST_CHARACTER_MUST_BE_ALPHANUMERIC = 3223, E.ER_AUDIT_LOG_USER_NAME_INVALID_CHARACTER = 3224, E.ER_AUDIT_LOG_HOST_NAME_INVALID_CHARACTER = 3225, E.WARN_DEPRECATED_MAXDB_SQL_MODE_FOR_TIMESTAMP = 3226, E.ER_XA_REPLICATION_FILTERS = 3227, E.ER_CANT_OPEN_ERROR_LOG = 3228, E.ER_GROUPING_ON_TIMESTAMP_IN_DST = 3229, E.ER_CANT_START_SERVER_NAMED_PIPE = 3230, E.ER_WRITE_SET_EXCEEDS_LIMIT = 3231, E.ER_DEPRECATED_TLS_VERSION_SESSION_57 = 3232, E.ER_WARN_DEPRECATED_TLS_VERSION_57 = 3233, E.ER_WARN_WRONG_NATIVE_TABLE_STRUCTURE = 3234, E.ER_AES_INVALID_KDF_NAME = 3235, E.ER_AES_INVALID_KDF_ITERATIONS = 3236, E.WARN_AES_KEY_SIZE = 3237, E.ER_AES_INVALID_KDF_OPTION_SIZE = 3238, E.ER_UNSUPPORT_COMPRESSED_TEMPORARY_TABLE = 3500, E.ER_ACL_OPERATION_FAILED = 3501, E.ER_UNSUPPORTED_INDEX_ALGORITHM = 3502, E.ER_NO_SUCH_DB = 3503, E.ER_TOO_BIG_ENUM = 3504, E.ER_TOO_LONG_SET_ENUM_VALUE = 3505, E.ER_INVALID_DD_OBJECT = 3506, E.ER_UPDATING_DD_TABLE = 3507, E.ER_INVALID_DD_OBJECT_ID = 3508, E.ER_INVALID_DD_OBJECT_NAME = 3509, E.ER_TABLESPACE_MISSING_WITH_NAME = 3510, E.ER_TOO_LONG_ROUTINE_COMMENT = 3511, E.ER_SP_LOAD_FAILED = 3512, E.ER_INVALID_BITWISE_OPERANDS_SIZE = 3513, E.ER_INVALID_BITWISE_AGGREGATE_OPERANDS_SIZE = 3514, E.ER_WARN_UNSUPPORTED_HINT = 3515, E.ER_UNEXPECTED_GEOMETRY_TYPE = 3516, E.ER_SRS_PARSE_ERROR = 3517, E.ER_SRS_PROJ_PARAMETER_MISSING = 3518, E.ER_WARN_SRS_NOT_FOUND = 3519, E.ER_SRS_NOT_CARTESIAN = 3520, E.ER_SRS_NOT_CARTESIAN_UNDEFINED = 3521, E.ER_PK_INDEX_CANT_BE_INVISIBLE = 3522, E.ER_UNKNOWN_AUTHID = 3523, E.ER_FAILED_ROLE_GRANT = 3524, E.ER_OPEN_ROLE_TABLES = 3525, E.ER_FAILED_DEFAULT_ROLES = 3526, E.ER_COMPONENTS_NO_SCHEME = 3527, E.ER_COMPONENTS_NO_SCHEME_SERVICE = 3528, E.ER_COMPONENTS_CANT_LOAD = 3529, E.ER_ROLE_NOT_GRANTED = 3530, E.ER_FAILED_REVOKE_ROLE = 3531, E.ER_RENAME_ROLE = 3532, E.ER_COMPONENTS_CANT_ACQUIRE_SERVICE_IMPLEMENTATION = 3533, E.ER_COMPONENTS_CANT_SATISFY_DEPENDENCY = 3534, E.ER_COMPONENTS_LOAD_CANT_REGISTER_SERVICE_IMPLEMENTATION = 3535, E.ER_COMPONENTS_LOAD_CANT_INITIALIZE = 3536, E.ER_COMPONENTS_UNLOAD_NOT_LOADED = 3537, E.ER_COMPONENTS_UNLOAD_CANT_DEINITIALIZE = 3538, E.ER_COMPONENTS_CANT_RELEASE_SERVICE = 3539, E.ER_COMPONENTS_UNLOAD_CANT_UNREGISTER_SERVICE = 3540, E.ER_COMPONENTS_CANT_UNLOAD = 3541, E.ER_WARN_UNLOAD_THE_NOT_PERSISTED = 3542, E.ER_COMPONENT_TABLE_INCORRECT = 3543, E.ER_COMPONENT_MANIPULATE_ROW_FAILED = 3544, E.ER_COMPONENTS_UNLOAD_DUPLICATE_IN_GROUP = 3545, E.ER_CANT_SET_GTID_PURGED_DUE_SETS_CONSTRAINTS = 3546, E.ER_CANNOT_LOCK_USER_MANAGEMENT_CACHES = 3547, E.ER_SRS_NOT_FOUND = 3548, E.ER_VARIABLE_NOT_PERSISTED = 3549, E.ER_IS_QUERY_INVALID_CLAUSE = 3550, E.ER_UNABLE_TO_STORE_STATISTICS = 3551, E.ER_NO_SYSTEM_SCHEMA_ACCESS = 3552, E.ER_NO_SYSTEM_TABLESPACE_ACCESS = 3553, E.ER_NO_SYSTEM_TABLE_ACCESS = 3554, E.ER_NO_SYSTEM_TABLE_ACCESS_FOR_DICTIONARY_TABLE = 3555, E.ER_NO_SYSTEM_TABLE_ACCESS_FOR_SYSTEM_TABLE = 3556, E.ER_NO_SYSTEM_TABLE_ACCESS_FOR_TABLE = 3557, E.ER_INVALID_OPTION_KEY = 3558, E.ER_INVALID_OPTION_VALUE = 3559, E.ER_INVALID_OPTION_KEY_VALUE_PAIR = 3560, E.ER_INVALID_OPTION_START_CHARACTER = 3561, E.ER_INVALID_OPTION_END_CHARACTER = 3562, E.ER_INVALID_OPTION_CHARACTERS = 3563, E.ER_DUPLICATE_OPTION_KEY = 3564, E.ER_WARN_SRS_NOT_FOUND_AXIS_ORDER = 3565, E.ER_NO_ACCESS_TO_NATIVE_FCT = 3566, E.ER_RESET_SOURCE_TO_VALUE_OUT_OF_RANGE = 3567, E.ER_UNRESOLVED_TABLE_LOCK = 3568, E.ER_DUPLICATE_TABLE_LOCK = 3569, E.ER_BINLOG_UNSAFE_SKIP_LOCKED = 3570, E.ER_BINLOG_UNSAFE_NOWAIT = 3571, E.ER_LOCK_NOWAIT = 3572, E.ER_CTE_RECURSIVE_REQUIRES_UNION = 3573, E.ER_CTE_RECURSIVE_REQUIRES_NONRECURSIVE_FIRST = 3574, E.ER_CTE_RECURSIVE_FORBIDS_AGGREGATION = 3575, E.ER_CTE_RECURSIVE_FORBIDDEN_JOIN_ORDER = 3576, E.ER_CTE_RECURSIVE_REQUIRES_SINGLE_REFERENCE = 3577, E.ER_SWITCH_TMP_ENGINE = 3578, E.ER_WINDOW_NO_SUCH_WINDOW = 3579, E.ER_WINDOW_CIRCULARITY_IN_WINDOW_GRAPH = 3580, E.ER_WINDOW_NO_CHILD_PARTITIONING = 3581, E.ER_WINDOW_NO_INHERIT_FRAME = 3582, E.ER_WINDOW_NO_REDEFINE_ORDER_BY = 3583, E.ER_WINDOW_FRAME_START_ILLEGAL = 3584, E.ER_WINDOW_FRAME_END_ILLEGAL = 3585, E.ER_WINDOW_FRAME_ILLEGAL = 3586, E.ER_WINDOW_RANGE_FRAME_ORDER_TYPE = 3587, E.ER_WINDOW_RANGE_FRAME_TEMPORAL_TYPE = 3588, E.ER_WINDOW_RANGE_FRAME_NUMERIC_TYPE = 3589, E.ER_WINDOW_RANGE_BOUND_NOT_CONSTANT = 3590, E.ER_WINDOW_DUPLICATE_NAME = 3591, E.ER_WINDOW_ILLEGAL_ORDER_BY = 3592, E.ER_WINDOW_INVALID_WINDOW_FUNC_USE = 3593, E.ER_WINDOW_INVALID_WINDOW_FUNC_ALIAS_USE = 3594, E.ER_WINDOW_NESTED_WINDOW_FUNC_USE_IN_WINDOW_SPEC = 3595, E.ER_WINDOW_ROWS_INTERVAL_USE = 3596, E.ER_WINDOW_NO_GROUP_ORDER = 3597, E.ER_WINDOW_EXPLAIN_JSON = 3598, E.ER_WINDOW_FUNCTION_IGNORES_FRAME = 3599, E.ER_WL9236_NOW = 3600, E.ER_INVALID_NO_OF_ARGS = 3601, E.ER_FIELD_IN_GROUPING_NOT_GROUP_BY = 3602, E.ER_TOO_LONG_TABLESPACE_COMMENT = 3603, E.ER_ENGINE_CANT_DROP_TABLE = 3604, E.ER_ENGINE_CANT_DROP_MISSING_TABLE = 3605, E.ER_TABLESPACE_DUP_FILENAME = 3606, E.ER_DB_DROP_RMDIR2 = 3607, E.ER_IMP_NO_FILES_MATCHED = 3608, E.ER_IMP_SCHEMA_DOES_NOT_EXIST = 3609, E.ER_IMP_TABLE_ALREADY_EXISTS = 3610, E.ER_IMP_INCOMPATIBLE_MYSQLD_VERSION = 3611, E.ER_IMP_INCOMPATIBLE_DD_VERSION = 3612, E.ER_IMP_INCOMPATIBLE_SDI_VERSION = 3613, E.ER_WARN_INVALID_HINT = 3614, E.ER_VAR_DOES_NOT_EXIST = 3615, E.ER_LONGITUDE_OUT_OF_RANGE = 3616, E.ER_LATITUDE_OUT_OF_RANGE = 3617, E.ER_NOT_IMPLEMENTED_FOR_GEOGRAPHIC_SRS = 3618, E.ER_ILLEGAL_PRIVILEGE_LEVEL = 3619, E.ER_NO_SYSTEM_VIEW_ACCESS = 3620, E.ER_COMPONENT_FILTER_FLABBERGASTED = 3621, E.ER_PART_EXPR_TOO_LONG = 3622, E.ER_UDF_DROP_DYNAMICALLY_REGISTERED = 3623, E.ER_UNABLE_TO_STORE_COLUMN_STATISTICS = 3624, E.ER_UNABLE_TO_UPDATE_COLUMN_STATISTICS = 3625, E.ER_UNABLE_TO_DROP_COLUMN_STATISTICS = 3626, E.ER_UNABLE_TO_BUILD_HISTOGRAM = 3627, E.ER_MANDATORY_ROLE = 3628, E.ER_MISSING_TABLESPACE_FILE = 3629, E.ER_PERSIST_ONLY_ACCESS_DENIED_ERROR = 3630, E.ER_CMD_NEED_SUPER = 3631, E.ER_PATH_IN_DATADIR = 3632, E.ER_CLONE_DDL_IN_PROGRESS = 3633, E.ER_CLONE_TOO_MANY_CONCURRENT_CLONES = 3634, E.ER_APPLIER_LOG_EVENT_VALIDATION_ERROR = 3635, E.ER_CTE_MAX_RECURSION_DEPTH = 3636, E.ER_NOT_HINT_UPDATABLE_VARIABLE = 3637, E.ER_CREDENTIALS_CONTRADICT_TO_HISTORY = 3638, E.ER_WARNING_PASSWORD_HISTORY_CLAUSES_VOID = 3639, E.ER_CLIENT_DOES_NOT_SUPPORT = 3640, E.ER_I_S_SKIPPED_TABLESPACE = 3641, E.ER_TABLESPACE_ENGINE_MISMATCH = 3642, E.ER_WRONG_SRID_FOR_COLUMN = 3643, E.ER_CANNOT_ALTER_SRID_DUE_TO_INDEX = 3644, E.ER_WARN_BINLOG_PARTIAL_UPDATES_DISABLED = 3645, E.ER_WARN_BINLOG_V1_ROW_EVENTS_DISABLED = 3646, E.ER_WARN_BINLOG_PARTIAL_UPDATES_SUGGESTS_PARTIAL_IMAGES = 3647, E.ER_COULD_NOT_APPLY_JSON_DIFF = 3648, E.ER_CORRUPTED_JSON_DIFF = 3649, E.ER_RESOURCE_GROUP_EXISTS = 3650, E.ER_RESOURCE_GROUP_NOT_EXISTS = 3651, E.ER_INVALID_VCPU_ID = 3652, E.ER_INVALID_VCPU_RANGE = 3653, E.ER_INVALID_THREAD_PRIORITY = 3654, E.ER_DISALLOWED_OPERATION = 3655, E.ER_RESOURCE_GROUP_BUSY = 3656, E.ER_RESOURCE_GROUP_DISABLED = 3657, E.ER_FEATURE_UNSUPPORTED = 3658, E.ER_ATTRIBUTE_IGNORED = 3659, E.ER_INVALID_THREAD_ID = 3660, E.ER_RESOURCE_GROUP_BIND_FAILED = 3661, E.ER_INVALID_USE_OF_FORCE_OPTION = 3662, E.ER_GROUP_REPLICATION_COMMAND_FAILURE = 3663, E.ER_SDI_OPERATION_FAILED = 3664, E.ER_MISSING_JSON_TABLE_VALUE = 3665, E.ER_WRONG_JSON_TABLE_VALUE = 3666, E.ER_TF_MUST_HAVE_ALIAS = 3667, E.ER_TF_FORBIDDEN_JOIN_TYPE = 3668, E.ER_JT_VALUE_OUT_OF_RANGE = 3669, E.ER_JT_MAX_NESTED_PATH = 3670, E.ER_PASSWORD_EXPIRATION_NOT_SUPPORTED_BY_AUTH_METHOD = 3671, E.ER_INVALID_GEOJSON_CRS_NOT_TOP_LEVEL = 3672, E.ER_BAD_NULL_ERROR_NOT_IGNORED = 3673, E.WARN_USELESS_SPATIAL_INDEX = 3674, E.ER_DISK_FULL_NOWAIT = 3675, E.ER_PARSE_ERROR_IN_DIGEST_FN = 3676, E.ER_UNDISCLOSED_PARSE_ERROR_IN_DIGEST_FN = 3677, E.ER_SCHEMA_DIR_EXISTS = 3678, E.ER_SCHEMA_DIR_MISSING = 3679, E.ER_SCHEMA_DIR_CREATE_FAILED = 3680, E.ER_SCHEMA_DIR_UNKNOWN = 3681, E.ER_ONLY_IMPLEMENTED_FOR_SRID_0_AND_4326 = 3682, E.ER_BINLOG_EXPIRE_LOG_DAYS_AND_SECS_USED_TOGETHER = 3683, E.ER_REGEXP_BUFFER_OVERFLOW = 3684, E.ER_REGEXP_ILLEGAL_ARGUMENT = 3685, E.ER_REGEXP_INDEX_OUTOFBOUNDS_ERROR = 3686, E.ER_REGEXP_INTERNAL_ERROR = 3687, E.ER_REGEXP_RULE_SYNTAX = 3688, E.ER_REGEXP_BAD_ESCAPE_SEQUENCE = 3689, E.ER_REGEXP_UNIMPLEMENTED = 3690, E.ER_REGEXP_MISMATCHED_PAREN = 3691, E.ER_REGEXP_BAD_INTERVAL = 3692, E.ER_REGEXP_MAX_LT_MIN = 3693, E.ER_REGEXP_INVALID_BACK_REF = 3694, E.ER_REGEXP_LOOK_BEHIND_LIMIT = 3695, E.ER_REGEXP_MISSING_CLOSE_BRACKET = 3696, E.ER_REGEXP_INVALID_RANGE = 3697, E.ER_REGEXP_STACK_OVERFLOW = 3698, E.ER_REGEXP_TIME_OUT = 3699, E.ER_REGEXP_PATTERN_TOO_BIG = 3700, E.ER_CANT_SET_ERROR_LOG_SERVICE = 3701, E.ER_EMPTY_PIPELINE_FOR_ERROR_LOG_SERVICE = 3702, E.ER_COMPONENT_FILTER_DIAGNOSTICS = 3703, E.ER_NOT_IMPLEMENTED_FOR_CARTESIAN_SRS = 3704, E.ER_NOT_IMPLEMENTED_FOR_PROJECTED_SRS = 3705, E.ER_NONPOSITIVE_RADIUS = 3706, E.ER_RESTART_SERVER_FAILED = 3707, E.ER_SRS_MISSING_MANDATORY_ATTRIBUTE = 3708, E.ER_SRS_MULTIPLE_ATTRIBUTE_DEFINITIONS = 3709, E.ER_SRS_NAME_CANT_BE_EMPTY_OR_WHITESPACE = 3710, E.ER_SRS_ORGANIZATION_CANT_BE_EMPTY_OR_WHITESPACE = 3711, E.ER_SRS_ID_ALREADY_EXISTS = 3712, E.ER_WARN_SRS_ID_ALREADY_EXISTS = 3713, E.ER_CANT_MODIFY_SRID_0 = 3714, E.ER_WARN_RESERVED_SRID_RANGE = 3715, E.ER_CANT_MODIFY_SRS_USED_BY_COLUMN = 3716, E.ER_SRS_INVALID_CHARACTER_IN_ATTRIBUTE = 3717, E.ER_SRS_ATTRIBUTE_STRING_TOO_LONG = 3718, E.ER_DEPRECATED_UTF8_ALIAS = 3719, E.ER_DEPRECATED_NATIONAL = 3720, E.ER_INVALID_DEFAULT_UTF8MB4_COLLATION = 3721, E.ER_UNABLE_TO_COLLECT_LOG_STATUS = 3722, E.ER_RESERVED_TABLESPACE_NAME = 3723, E.ER_UNABLE_TO_SET_OPTION = 3724, E.ER_REPLICA_POSSIBLY_DIVERGED_AFTER_DDL = 3725, E.ER_SRS_NOT_GEOGRAPHIC = 3726, E.ER_POLYGON_TOO_LARGE = 3727, E.ER_SPATIAL_UNIQUE_INDEX = 3728, E.ER_INDEX_TYPE_NOT_SUPPORTED_FOR_SPATIAL_INDEX = 3729, E.ER_FK_CANNOT_DROP_PARENT = 3730, E.ER_GEOMETRY_PARAM_LONGITUDE_OUT_OF_RANGE = 3731, E.ER_GEOMETRY_PARAM_LATITUDE_OUT_OF_RANGE = 3732, E.ER_FK_CANNOT_USE_VIRTUAL_COLUMN = 3733, E.ER_FK_NO_COLUMN_PARENT = 3734, E.ER_CANT_SET_ERROR_SUPPRESSION_LIST = 3735, E.ER_SRS_GEOGCS_INVALID_AXES = 3736, E.ER_SRS_INVALID_SEMI_MAJOR_AXIS = 3737, E.ER_SRS_INVALID_INVERSE_FLATTENING = 3738, E.ER_SRS_INVALID_ANGULAR_UNIT = 3739, E.ER_SRS_INVALID_PRIME_MERIDIAN = 3740, E.ER_TRANSFORM_SOURCE_SRS_NOT_SUPPORTED = 3741, E.ER_TRANSFORM_TARGET_SRS_NOT_SUPPORTED = 3742, E.ER_TRANSFORM_SOURCE_SRS_MISSING_TOWGS84 = 3743, E.ER_TRANSFORM_TARGET_SRS_MISSING_TOWGS84 = 3744, E.ER_TEMP_TABLE_PREVENTS_SWITCH_SESSION_BINLOG_FORMAT = 3745, E.ER_TEMP_TABLE_PREVENTS_SWITCH_GLOBAL_BINLOG_FORMAT = 3746, E.ER_RUNNING_APPLIER_PREVENTS_SWITCH_GLOBAL_BINLOG_FORMAT = 3747, E.ER_CLIENT_GTID_UNSAFE_CREATE_DROP_TEMP_TABLE_IN_TRX_IN_SBR = 3748, E.ER_XA_CANT_CREATE_MDL_BACKUP = 3749, E.ER_TABLE_WITHOUT_PK = 3750, E.ER_WARN_DATA_TRUNCATED_FUNCTIONAL_INDEX = 3751, E.ER_WARN_DATA_OUT_OF_RANGE_FUNCTIONAL_INDEX = 3752, E.ER_FUNCTIONAL_INDEX_ON_JSON_OR_GEOMETRY_FUNCTION = 3753, E.ER_FUNCTIONAL_INDEX_REF_AUTO_INCREMENT = 3754, E.ER_CANNOT_DROP_COLUMN_FUNCTIONAL_INDEX = 3755, E.ER_FUNCTIONAL_INDEX_PRIMARY_KEY = 3756, E.ER_FUNCTIONAL_INDEX_ON_LOB = 3757, E.ER_FUNCTIONAL_INDEX_FUNCTION_IS_NOT_ALLOWED = 3758, E.ER_FULLTEXT_FUNCTIONAL_INDEX = 3759, E.ER_SPATIAL_FUNCTIONAL_INDEX = 3760, E.ER_WRONG_KEY_COLUMN_FUNCTIONAL_INDEX = 3761, E.ER_FUNCTIONAL_INDEX_ON_FIELD = 3762, E.ER_GENERATED_COLUMN_NAMED_FUNCTION_IS_NOT_ALLOWED = 3763, E.ER_GENERATED_COLUMN_ROW_VALUE = 3764, E.ER_GENERATED_COLUMN_VARIABLES = 3765, E.ER_DEPENDENT_BY_DEFAULT_GENERATED_VALUE = 3766, E.ER_DEFAULT_VAL_GENERATED_NON_PRIOR = 3767, E.ER_DEFAULT_VAL_GENERATED_REF_AUTO_INC = 3768, E.ER_DEFAULT_VAL_GENERATED_FUNCTION_IS_NOT_ALLOWED = 3769, E.ER_DEFAULT_VAL_GENERATED_NAMED_FUNCTION_IS_NOT_ALLOWED = 3770, E.ER_DEFAULT_VAL_GENERATED_ROW_VALUE = 3771, E.ER_DEFAULT_VAL_GENERATED_VARIABLES = 3772, E.ER_DEFAULT_AS_VAL_GENERATED = 3773, E.ER_UNSUPPORTED_ACTION_ON_DEFAULT_VAL_GENERATED = 3774, E.ER_GTID_UNSAFE_ALTER_ADD_COL_WITH_DEFAULT_EXPRESSION = 3775, E.ER_FK_CANNOT_CHANGE_ENGINE = 3776, E.ER_WARN_DEPRECATED_USER_SET_EXPR = 3777, E.ER_WARN_DEPRECATED_UTF8MB3_COLLATION = 3778, E.ER_WARN_DEPRECATED_NESTED_COMMENT_SYNTAX = 3779, E.ER_FK_INCOMPATIBLE_COLUMNS = 3780, E.ER_GR_HOLD_WAIT_TIMEOUT = 3781, E.ER_GR_HOLD_KILLED = 3782, E.ER_GR_HOLD_MEMBER_STATUS_ERROR = 3783, E.ER_RPL_ENCRYPTION_FAILED_TO_FETCH_KEY = 3784, E.ER_RPL_ENCRYPTION_KEY_NOT_FOUND = 3785, E.ER_RPL_ENCRYPTION_KEYRING_INVALID_KEY = 3786, E.ER_RPL_ENCRYPTION_HEADER_ERROR = 3787, E.ER_RPL_ENCRYPTION_FAILED_TO_ROTATE_LOGS = 3788, E.ER_RPL_ENCRYPTION_KEY_EXISTS_UNEXPECTED = 3789, E.ER_RPL_ENCRYPTION_FAILED_TO_GENERATE_KEY = 3790, E.ER_RPL_ENCRYPTION_FAILED_TO_STORE_KEY = 3791, E.ER_RPL_ENCRYPTION_FAILED_TO_REMOVE_KEY = 3792, E.ER_RPL_ENCRYPTION_UNABLE_TO_CHANGE_OPTION = 3793, E.ER_RPL_ENCRYPTION_MASTER_KEY_RECOVERY_FAILED = 3794, E.ER_SLOW_LOG_MODE_IGNORED_WHEN_NOT_LOGGING_TO_FILE = 3795, E.ER_GRP_TRX_CONSISTENCY_NOT_ALLOWED = 3796, E.ER_GRP_TRX_CONSISTENCY_BEFORE = 3797, E.ER_GRP_TRX_CONSISTENCY_AFTER_ON_TRX_BEGIN = 3798, E.ER_GRP_TRX_CONSISTENCY_BEGIN_NOT_ALLOWED = 3799, E.ER_FUNCTIONAL_INDEX_ROW_VALUE_IS_NOT_ALLOWED = 3800, E.ER_RPL_ENCRYPTION_FAILED_TO_ENCRYPT = 3801, E.ER_PAGE_TRACKING_NOT_STARTED = 3802, E.ER_PAGE_TRACKING_RANGE_NOT_TRACKED = 3803, E.ER_PAGE_TRACKING_CANNOT_PURGE = 3804, E.ER_RPL_ENCRYPTION_CANNOT_ROTATE_BINLOG_MASTER_KEY = 3805, E.ER_BINLOG_MASTER_KEY_RECOVERY_OUT_OF_COMBINATION = 3806, E.ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_OPERATE_KEY = 3807, E.ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_ROTATE_LOGS = 3808, E.ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_REENCRYPT_LOG = 3809, E.ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_CLEANUP_UNUSED_KEYS = 3810, E.ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_CLEANUP_AUX_KEY = 3811, E.ER_NON_BOOLEAN_EXPR_FOR_CHECK_CONSTRAINT = 3812, E.ER_COLUMN_CHECK_CONSTRAINT_REFERENCES_OTHER_COLUMN = 3813, E.ER_CHECK_CONSTRAINT_NAMED_FUNCTION_IS_NOT_ALLOWED = 3814, E.ER_CHECK_CONSTRAINT_FUNCTION_IS_NOT_ALLOWED = 3815, E.ER_CHECK_CONSTRAINT_VARIABLES = 3816, E.ER_CHECK_CONSTRAINT_ROW_VALUE = 3817, E.ER_CHECK_CONSTRAINT_REFERS_AUTO_INCREMENT_COLUMN = 3818, E.ER_CHECK_CONSTRAINT_VIOLATED = 3819, E.ER_CHECK_CONSTRAINT_REFERS_UNKNOWN_COLUMN = 3820, E.ER_CHECK_CONSTRAINT_NOT_FOUND = 3821, E.ER_CHECK_CONSTRAINT_DUP_NAME = 3822, E.ER_CHECK_CONSTRAINT_CLAUSE_USING_FK_REFER_ACTION_COLUMN = 3823, E.WARN_UNENCRYPTED_TABLE_IN_ENCRYPTED_DB = 3824, E.ER_INVALID_ENCRYPTION_REQUEST = 3825, E.ER_CANNOT_SET_TABLE_ENCRYPTION = 3826, E.ER_CANNOT_SET_DATABASE_ENCRYPTION = 3827, E.ER_CANNOT_SET_TABLESPACE_ENCRYPTION = 3828, E.ER_TABLESPACE_CANNOT_BE_ENCRYPTED = 3829, E.ER_TABLESPACE_CANNOT_BE_DECRYPTED = 3830, E.ER_TABLESPACE_TYPE_UNKNOWN = 3831, E.ER_TARGET_TABLESPACE_UNENCRYPTED = 3832, E.ER_CANNOT_USE_ENCRYPTION_CLAUSE = 3833, E.ER_INVALID_MULTIPLE_CLAUSES = 3834, E.ER_UNSUPPORTED_USE_OF_GRANT_AS = 3835, E.ER_UKNOWN_AUTH_ID_OR_ACCESS_DENIED_FOR_GRANT_AS = 3836, E.ER_DEPENDENT_BY_FUNCTIONAL_INDEX = 3837, E.ER_PLUGIN_NOT_EARLY = 3838, E.ER_INNODB_REDO_LOG_ARCHIVE_START_SUBDIR_PATH = 3839, E.ER_INNODB_REDO_LOG_ARCHIVE_START_TIMEOUT = 3840, E.ER_INNODB_REDO_LOG_ARCHIVE_DIRS_INVALID = 3841, E.ER_INNODB_REDO_LOG_ARCHIVE_LABEL_NOT_FOUND = 3842, E.ER_INNODB_REDO_LOG_ARCHIVE_DIR_EMPTY = 3843, E.ER_INNODB_REDO_LOG_ARCHIVE_NO_SUCH_DIR = 3844, E.ER_INNODB_REDO_LOG_ARCHIVE_DIR_CLASH = 3845, E.ER_INNODB_REDO_LOG_ARCHIVE_DIR_PERMISSIONS = 3846, E.ER_INNODB_REDO_LOG_ARCHIVE_FILE_CREATE = 3847, E.ER_INNODB_REDO_LOG_ARCHIVE_ACTIVE = 3848, E.ER_INNODB_REDO_LOG_ARCHIVE_INACTIVE = 3849, E.ER_INNODB_REDO_LOG_ARCHIVE_FAILED = 3850, E.ER_INNODB_REDO_LOG_ARCHIVE_SESSION = 3851, E.ER_STD_REGEX_ERROR = 3852, E.ER_INVALID_JSON_TYPE = 3853, E.ER_CANNOT_CONVERT_STRING = 3854, E.ER_DEPENDENT_BY_PARTITION_FUNC = 3855, E.ER_WARN_DEPRECATED_FLOAT_AUTO_INCREMENT = 3856, E.ER_RPL_CANT_STOP_REPLICA_WHILE_LOCKED_BACKUP = 3857, E.ER_WARN_DEPRECATED_FLOAT_DIGITS = 3858, E.ER_WARN_DEPRECATED_FLOAT_UNSIGNED = 3859, E.ER_WARN_DEPRECATED_INTEGER_DISPLAY_WIDTH = 3860, E.ER_WARN_DEPRECATED_ZEROFILL = 3861, E.ER_CLONE_DONOR = 3862, E.ER_CLONE_PROTOCOL = 3863, E.ER_CLONE_DONOR_VERSION = 3864, E.ER_CLONE_OS = 3865, E.ER_CLONE_PLATFORM = 3866, E.ER_CLONE_CHARSET = 3867, E.ER_CLONE_CONFIG = 3868, E.ER_CLONE_SYS_CONFIG = 3869, E.ER_CLONE_PLUGIN_MATCH = 3870, E.ER_CLONE_LOOPBACK = 3871, E.ER_CLONE_ENCRYPTION = 3872, E.ER_CLONE_DISK_SPACE = 3873, E.ER_CLONE_IN_PROGRESS = 3874, E.ER_CLONE_DISALLOWED = 3875, E.ER_CANNOT_GRANT_ROLES_TO_ANONYMOUS_USER = 3876, E.ER_SECONDARY_ENGINE_PLUGIN = 3877, E.ER_SECOND_PASSWORD_CANNOT_BE_EMPTY = 3878, E.ER_DB_ACCESS_DENIED = 3879, E.ER_DA_AUTH_ID_WITH_SYSTEM_USER_PRIV_IN_MANDATORY_ROLES = 3880, E.ER_DA_RPL_GTID_TABLE_CANNOT_OPEN = 3881, E.ER_GEOMETRY_IN_UNKNOWN_LENGTH_UNIT = 3882, E.ER_DA_PLUGIN_INSTALL_ERROR = 3883, E.ER_NO_SESSION_TEMP = 3884, E.ER_DA_UNKNOWN_ERROR_NUMBER = 3885, E.ER_COLUMN_CHANGE_SIZE = 3886, E.ER_REGEXP_INVALID_CAPTURE_GROUP_NAME = 3887, E.ER_DA_SSL_LIBRARY_ERROR = 3888, E.ER_SECONDARY_ENGINE = 3889, E.ER_SECONDARY_ENGINE_DDL = 3890, E.ER_INCORRECT_CURRENT_PASSWORD = 3891, E.ER_MISSING_CURRENT_PASSWORD = 3892, E.ER_CURRENT_PASSWORD_NOT_REQUIRED = 3893, E.ER_PASSWORD_CANNOT_BE_RETAINED_ON_PLUGIN_CHANGE = 3894, E.ER_CURRENT_PASSWORD_CANNOT_BE_RETAINED = 3895, E.ER_PARTIAL_REVOKES_EXIST = 3896, E.ER_CANNOT_GRANT_SYSTEM_PRIV_TO_MANDATORY_ROLE = 3897, E.ER_XA_REPLICATION_FILTERS = 3898, E.ER_UNSUPPORTED_SQL_MODE = 3899, E.ER_REGEXP_INVALID_FLAG = 3900, E.ER_PARTIAL_REVOKE_AND_DB_GRANT_BOTH_EXISTS = 3901, E.ER_UNIT_NOT_FOUND = 3902, E.ER_INVALID_JSON_VALUE_FOR_FUNC_INDEX = 3903, E.ER_JSON_VALUE_OUT_OF_RANGE_FOR_FUNC_INDEX = 3904, E.ER_EXCEEDED_MV_KEYS_NUM = 3905, E.ER_EXCEEDED_MV_KEYS_SPACE = 3906, E.ER_FUNCTIONAL_INDEX_DATA_IS_TOO_LONG = 3907, E.ER_WRONG_MVI_VALUE = 3908, E.ER_WARN_FUNC_INDEX_NOT_APPLICABLE = 3909, E.ER_GRP_RPL_UDF_ERROR = 3910, E.ER_UPDATE_GTID_PURGED_WITH_GR = 3911, E.ER_GROUPING_ON_TIMESTAMP_IN_DST = 3912, E.ER_TABLE_NAME_CAUSES_TOO_LONG_PATH = 3913, E.ER_AUDIT_LOG_INSUFFICIENT_PRIVILEGE = 3914, E.ER_AUDIT_LOG_PASSWORD_HAS_BEEN_COPIED = 3915, E.ER_DA_GRP_RPL_STARTED_AUTO_REJOIN = 3916, E.ER_SYSVAR_CHANGE_DURING_QUERY = 3917, E.ER_GLOBSTAT_CHANGE_DURING_QUERY = 3918, E.ER_GRP_RPL_MESSAGE_SERVICE_INIT_FAILURE = 3919, E.ER_CHANGE_SOURCE_WRONG_COMPRESSION_ALGORITHM_CLIENT = 3920, E.ER_CHANGE_SOURCE_WRONG_COMPRESSION_LEVEL_CLIENT = 3921, E.ER_WRONG_COMPRESSION_ALGORITHM_CLIENT = 3922, E.ER_WRONG_COMPRESSION_LEVEL_CLIENT = 3923, E.ER_CHANGE_SOURCE_WRONG_COMPRESSION_ALGORITHM_LIST_CLIENT = 3924, E.ER_CLIENT_PRIVILEGE_CHECKS_USER_CANNOT_BE_ANONYMOUS = 3925, E.ER_CLIENT_PRIVILEGE_CHECKS_USER_DOES_NOT_EXIST = 3926, E.ER_CLIENT_PRIVILEGE_CHECKS_USER_CORRUPT = 3927, E.ER_CLIENT_PRIVILEGE_CHECKS_USER_NEEDS_RPL_APPLIER_PRIV = 3928, E.ER_WARN_DA_PRIVILEGE_NOT_REGISTERED = 3929, E.ER_CLIENT_KEYRING_UDF_KEY_INVALID = 3930, E.ER_CLIENT_KEYRING_UDF_KEY_TYPE_INVALID = 3931, E.ER_CLIENT_KEYRING_UDF_KEY_TOO_LONG = 3932, E.ER_CLIENT_KEYRING_UDF_KEY_TYPE_TOO_LONG = 3933, E.ER_JSON_SCHEMA_VALIDATION_ERROR_WITH_DETAILED_REPORT = 3934, E.ER_DA_UDF_INVALID_CHARSET_SPECIFIED = 3935, E.ER_DA_UDF_INVALID_CHARSET = 3936, E.ER_DA_UDF_INVALID_COLLATION = 3937, E.ER_DA_UDF_INVALID_EXTENSION_ARGUMENT_TYPE = 3938, E.ER_MULTIPLE_CONSTRAINTS_WITH_SAME_NAME = 3939, E.ER_CONSTRAINT_NOT_FOUND = 3940, E.ER_ALTER_CONSTRAINT_ENFORCEMENT_NOT_SUPPORTED = 3941, E.ER_TABLE_VALUE_CONSTRUCTOR_MUST_HAVE_COLUMNS = 3942, E.ER_TABLE_VALUE_CONSTRUCTOR_CANNOT_HAVE_DEFAULT = 3943, E.ER_CLIENT_QUERY_FAILURE_INVALID_NON_ROW_FORMAT = 3944, E.ER_REQUIRE_ROW_FORMAT_INVALID_VALUE = 3945, E.ER_FAILED_TO_DETERMINE_IF_ROLE_IS_MANDATORY = 3946, E.ER_FAILED_TO_FETCH_MANDATORY_ROLE_LIST = 3947, E.ER_CLIENT_LOCAL_FILES_DISABLED = 3948, E.ER_IMP_INCOMPATIBLE_CFG_VERSION = 3949, E.ER_DA_OOM = 3950, E.ER_DA_UDF_INVALID_ARGUMENT_TO_SET_CHARSET = 3951, E.ER_DA_UDF_INVALID_RETURN_TYPE_TO_SET_CHARSET = 3952, E.ER_MULTIPLE_INTO_CLAUSES = 3953, E.ER_MISPLACED_INTO = 3954, E.ER_USER_ACCESS_DENIED_FOR_USER_ACCOUNT_BLOCKED_BY_PASSWORD_LOCK = 3955, E.ER_WARN_DEPRECATED_YEAR_UNSIGNED = 3956, E.ER_CLONE_NETWORK_PACKET = 3957, E.ER_SDI_OPERATION_FAILED_MISSING_RECORD = 3958, E.ER_DEPENDENT_BY_CHECK_CONSTRAINT = 3959, E.ER_GRP_OPERATION_NOT_ALLOWED_GR_MUST_STOP = 3960, E.ER_WARN_DEPRECATED_JSON_TABLE_ON_ERROR_ON_EMPTY = 3961, E.ER_WARN_DEPRECATED_INNER_INTO = 3962, E.ER_WARN_DEPRECATED_VALUES_FUNCTION_ALWAYS_NULL = 3963, E.ER_WARN_DEPRECATED_SQL_CALC_FOUND_ROWS = 3964, E.ER_WARN_DEPRECATED_FOUND_ROWS = 3965, E.ER_MISSING_JSON_VALUE = 3966, E.ER_MULTIPLE_JSON_VALUES = 3967, E.ER_HOSTNAME_TOO_LONG = 3968, E.ER_WARN_CLIENT_DEPRECATED_PARTITION_PREFIX_KEY = 3969, E.ER_GROUP_REPLICATION_USER_EMPTY_MSG = 3970, E.ER_GROUP_REPLICATION_USER_MANDATORY_MSG = 3971, E.ER_GROUP_REPLICATION_PASSWORD_LENGTH = 3972, E.ER_SUBQUERY_TRANSFORM_REJECTED = 3973, E.ER_DA_GRP_RPL_RECOVERY_ENDPOINT_FORMAT = 3974, E.ER_DA_GRP_RPL_RECOVERY_ENDPOINT_INVALID = 3975, E.ER_WRONG_VALUE_FOR_VAR_PLUS_ACTIONABLE_PART = 3976, E.ER_STATEMENT_NOT_ALLOWED_AFTER_START_TRANSACTION = 3977, E.ER_FOREIGN_KEY_WITH_ATOMIC_CREATE_SELECT = 3978, E.ER_NOT_ALLOWED_WITH_START_TRANSACTION = 3979, E.ER_INVALID_JSON_ATTRIBUTE = 3980, E.ER_ENGINE_ATTRIBUTE_NOT_SUPPORTED = 3981, E.ER_INVALID_USER_ATTRIBUTE_JSON = 3982, E.ER_INNODB_REDO_DISABLED = 3983, E.ER_INNODB_REDO_ARCHIVING_ENABLED = 3984, E.ER_MDL_OUT_OF_RESOURCES = 3985, E.ER_IMPLICIT_COMPARISON_FOR_JSON = 3986, E.ER_FUNCTION_DOES_NOT_SUPPORT_CHARACTER_SET = 3987, E.ER_IMPOSSIBLE_STRING_CONVERSION = 3988, E.ER_SCHEMA_READ_ONLY = 3989, E.ER_RPL_ASYNC_RECONNECT_GTID_MODE_OFF = 3990, E.ER_RPL_ASYNC_RECONNECT_AUTO_POSITION_OFF = 3991, E.ER_DISABLE_GTID_MODE_REQUIRES_ASYNC_RECONNECT_OFF = 3992, E.ER_DISABLE_AUTO_POSITION_REQUIRES_ASYNC_RECONNECT_OFF = 3993, E.ER_INVALID_PARAMETER_USE = 3994, E.ER_CHARACTER_SET_MISMATCH = 3995, E.ER_WARN_VAR_VALUE_CHANGE_NOT_SUPPORTED = 3996, E.ER_INVALID_TIME_ZONE_INTERVAL = 3997, E.ER_INVALID_CAST = 3998, E.ER_HYPERGRAPH_NOT_SUPPORTED_YET = 3999, E.ER_WARN_HYPERGRAPH_EXPERIMENTAL = 4e3, E.ER_DA_NO_ERROR_LOG_PARSER_CONFIGURED = 4001, E.ER_DA_ERROR_LOG_TABLE_DISABLED = 4002, E.ER_DA_ERROR_LOG_MULTIPLE_FILTERS = 4003, E.ER_DA_CANT_OPEN_ERROR_LOG = 4004, E.ER_USER_REFERENCED_AS_DEFINER = 4005, E.ER_CANNOT_USER_REFERENCED_AS_DEFINER = 4006, E.ER_REGEX_NUMBER_TOO_BIG = 4007, E.ER_SPVAR_NONINTEGER_TYPE = 4008, E.WARN_UNSUPPORTED_ACL_TABLES_READ = 4009, E.ER_BINLOG_UNSAFE_ACL_TABLE_READ_IN_DML_DDL = 4010, E.ER_STOP_REPLICA_MONITOR_IO_THREAD_TIMEOUT = 4011, E.ER_STARTING_REPLICA_MONITOR_IO_THREAD = 4012, E.ER_CANT_USE_ANONYMOUS_TO_GTID_WITH_GTID_MODE_NOT_ON = 4013, E.ER_CANT_COMBINE_ANONYMOUS_TO_GTID_AND_AUTOPOSITION = 4014, E.ER_ASSIGN_GTIDS_TO_ANONYMOUS_TRANSACTIONS_REQUIRES_GTID_MODE_ON = 4015, E.ER_SQL_REPLICA_SKIP_COUNTER_USED_WITH_GTID_MODE_ON = 4016, E.ER_USING_ASSIGN_GTIDS_TO_ANONYMOUS_TRANSACTIONS_AS_LOCAL_OR_UUID = 4017, E.ER_CANT_SET_ANONYMOUS_TO_GTID_AND_WAIT_UNTIL_SQL_THD_AFTER_GTIDS = 4018, E.ER_CANT_SET_SQL_AFTER_OR_BEFORE_GTIDS_WITH_ANONYMOUS_TO_GTID = 4019, E.ER_ANONYMOUS_TO_GTID_UUID_SAME_AS_GROUP_NAME = 4020, E.ER_CANT_USE_SAME_UUID_AS_GROUP_NAME = 4021, E.ER_GRP_RPL_RECOVERY_CHANNEL_STILL_RUNNING = 4022, E.ER_INNODB_INVALID_AUTOEXTEND_SIZE_VALUE = 4023, E.ER_INNODB_INCOMPATIBLE_WITH_TABLESPACE = 4024, E.ER_INNODB_AUTOEXTEND_SIZE_OUT_OF_RANGE = 4025, E.ER_CANNOT_USE_AUTOEXTEND_SIZE_CLAUSE = 4026, E.ER_ROLE_GRANTED_TO_ITSELF = 4027, E.ER_TABLE_MUST_HAVE_A_VISIBLE_COLUMN = 4028, E.ER_INNODB_COMPRESSION_FAILURE = 4029, E.ER_WARN_ASYNC_CONN_FAILOVER_NETWORK_NAMESPACE = 4030, E.ER_CLIENT_INTERACTION_TIMEOUT = 4031, E.ER_INVALID_CAST_TO_GEOMETRY = 4032, E.ER_INVALID_CAST_POLYGON_RING_DIRECTION = 4033, E.ER_GIS_DIFFERENT_SRIDS_AGGREGATION = 4034, E.ER_RELOAD_KEYRING_FAILURE = 4035, E.ER_SDI_GET_KEYS_INVALID_TABLESPACE = 4036, E.ER_CHANGE_RPL_SRC_WRONG_COMPRESSION_ALGORITHM_SIZE = 4037, E.ER_WARN_DEPRECATED_TLS_VERSION_FOR_CHANNEL_CLI = 4038, E.ER_CANT_USE_SAME_UUID_AS_VIEW_CHANGE_UUID = 4039, E.ER_ANONYMOUS_TO_GTID_UUID_SAME_AS_VIEW_CHANGE_UUID = 4040, E.ER_GRP_RPL_VIEW_CHANGE_UUID_FAIL_GET_VARIABLE = 4041, E.ER_WARN_ADUIT_LOG_MAX_SIZE_AND_PRUNE_SECONDS = 4042, E.ER_WARN_ADUIT_LOG_MAX_SIZE_CLOSE_TO_ROTATE_ON_SIZE = 4043, E.ER_KERBEROS_CREATE_USER = 4044, E.ER_INSTALL_PLUGIN_CONFLICT_CLIENT = 4045, E.ER_DA_ERROR_LOG_COMPONENT_FLUSH_FAILED = 4046, E.ER_WARN_SQL_AFTER_MTS_GAPS_GAP_NOT_CALCULATED = 4047, E.ER_INVALID_ASSIGNMENT_TARGET = 4048, E.ER_OPERATION_NOT_ALLOWED_ON_GR_SECONDARY = 4049, E.ER_GRP_RPL_FAILOVER_CHANNEL_STATUS_PROPAGATION = 4050, E.ER_WARN_AUDIT_LOG_FORMAT_UNIX_TIMESTAMP_ONLY_WHEN_JSON = 4051, E.ER_INVALID_MFA_PLUGIN_SPECIFIED = 4052, E.ER_IDENTIFIED_BY_UNSUPPORTED = 4053, E.ER_INVALID_PLUGIN_FOR_REGISTRATION = 4054, E.ER_PLUGIN_REQUIRES_REGISTRATION = 4055, E.ER_MFA_METHOD_EXISTS = 4056, E.ER_MFA_METHOD_NOT_EXISTS = 4057, E.ER_AUTHENTICATION_POLICY_MISMATCH = 4058, E.ER_PLUGIN_REGISTRATION_DONE = 4059, E.ER_INVALID_USER_FOR_REGISTRATION = 4060, E.ER_USER_REGISTRATION_FAILED = 4061, E.ER_MFA_METHODS_INVALID_ORDER = 4062, E.ER_MFA_METHODS_IDENTICAL = 4063, E.ER_INVALID_MFA_OPERATIONS_FOR_PASSWORDLESS_USER = 4064, E.ER_CHANGE_REPLICATION_SOURCE_NO_OPTIONS_FOR_GTID_ONLY = 4065, E.ER_CHANGE_REP_SOURCE_CANT_DISABLE_REQ_ROW_FORMAT_WITH_GTID_ONLY = 4066, E.ER_CHANGE_REP_SOURCE_CANT_DISABLE_AUTO_POSITION_WITH_GTID_ONLY = 4067, E.ER_CHANGE_REP_SOURCE_CANT_DISABLE_GTID_ONLY_WITHOUT_POSITIONS = 4068, E.ER_CHANGE_REP_SOURCE_CANT_DISABLE_AUTO_POS_WITHOUT_POSITIONS = 4069, E.ER_CHANGE_REP_SOURCE_GR_CHANNEL_WITH_GTID_MODE_NOT_ON = 4070, E.ER_CANT_USE_GTID_ONLY_WITH_GTID_MODE_NOT_ON = 4071, E.ER_WARN_C_DISABLE_GTID_ONLY_WITH_SOURCE_AUTO_POS_INVALID_POS = 4072, E.ER_DA_SSL_FIPS_MODE_ERROR = 4073, E.ER_VALUE_OUT_OF_RANGE = 4074, E.ER_FULLTEXT_WITH_ROLLUP = 4075, E.ER_REGEXP_MISSING_RESOURCE = 4076, E.ER_WARN_REGEXP_USING_DEFAULT = 4077, E.ER_REGEXP_MISSING_FILE = 4078, E.ER_WARN_DEPRECATED_COLLATION = 4079, E.ER_CONCURRENT_PROCEDURE_USAGE = 4080, E.ER_DA_GLOBAL_CONN_LIMIT = 4081, E.ER_DA_CONN_LIMIT = 4082, E.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE_INSTANT = 4083, E.ER_WARN_SF_UDF_NAME_COLLISION = 4084, E.ER_CANNOT_PURGE_BINLOG_WITH_BACKUP_LOCK = 4085, E.ER_TOO_MANY_WINDOWS = 4086, E.ER_MYSQLBACKUP_CLIENT_MSG = 4087, E.ER_COMMENT_CONTAINS_INVALID_STRING = 4088, E.ER_DEFINITION_CONTAINS_INVALID_STRING = 4089, E.ER_CANT_EXECUTE_COMMAND_WITH_ASSIGNED_GTID_NEXT = 4090, E.ER_XA_TEMP_TABLE = 4091, E.ER_INNODB_MAX_ROW_VERSION = 4092, E.ER_INNODB_INSTANT_ADD_NOT_SUPPORTED_MAX_SIZE = 4093, E.ER_OPERATION_NOT_ALLOWED_WHILE_PRIMARY_CHANGE_IS_RUNNING = 4094, E.ER_WARN_DEPRECATED_DATETIME_DELIMITER = 4095, E.ER_WARN_DEPRECATED_SUPERFLUOUS_DELIMITER = 4096, E.ER_CANNOT_PERSIST_SENSITIVE_VARIABLES = 4097, E.ER_WARN_CANNOT_SECURELY_PERSIST_SENSITIVE_VARIABLES = 4098, E.ER_WARN_TRG_ALREADY_EXISTS = 4099, E.ER_IF_NOT_EXISTS_UNSUPPORTED_TRG_EXISTS_ON_DIFFERENT_TABLE = 4100, E.ER_IF_NOT_EXISTS_UNSUPPORTED_UDF_NATIVE_FCT_NAME_COLLISION = 4101, E.ER_SET_PASSWORD_AUTH_PLUGIN_ERROR = 4102, E.ER_REDUCED_DBLWR_FILE_CORRUPTED = 4103, E.ER_REDUCED_DBLWR_PAGE_FOUND = 4104, E.ER_SRS_INVALID_LATITUDE_OF_ORIGIN = 4105, E.ER_SRS_INVALID_LONGITUDE_OF_ORIGIN = 4106, E.ER_SRS_UNUSED_PROJ_PARAMETER_PRESENT = 4107, E.ER_GIPK_COLUMN_EXISTS = 4108, E.ER_GIPK_FAILED_AUTOINC_COLUMN_EXISTS = 4109, E.ER_GIPK_COLUMN_ALTER_NOT_ALLOWED = 4110, E.ER_DROP_PK_COLUMN_TO_DROP_GIPK = 4111, E.ER_CREATE_SELECT_WITH_GIPK_DISALLOWED_IN_SBR = 4112, E.ER_DA_EXPIRE_LOGS_DAYS_IGNORED = 4113, E.ER_CTE_RECURSIVE_NOT_UNION = 4114, E.ER_COMMAND_BACKEND_FAILED_TO_FETCH_SECURITY_CTX = 4115, E.ER_COMMAND_SERVICE_BACKEND_FAILED = 4116, E.ER_CLIENT_FILE_PRIVILEGE_FOR_REPLICATION_CHECKS = 4117, E.ER_GROUP_REPLICATION_FORCE_MEMBERS_COMMAND_FAILURE = 4118, E.ER_WARN_DEPRECATED_IDENT = 4119, E.ER_INTERSECT_ALL_MAX_DUPLICATES_EXCEEDED = 4120, E.ER_TP_QUERY_THRS_PER_GRP_EXCEEDS_TXN_THR_LIMIT = 4121, E.ER_BAD_TIMESTAMP_FORMAT = 4122, E.ER_SHAPE_PRIDICTION_UDF = 4123, E.ER_SRS_INVALID_HEIGHT = 4124, E.ER_SRS_INVALID_SCALING = 4125, E.ER_SRS_INVALID_ZONE_WIDTH = 4126, E.ER_SRS_INVALID_LATITUDE_POLAR_STERE_VAR_A = 4127, E.ER_WARN_DEPRECATED_CLIENT_NO_SCHEMA_OPTION = 4128, E.ER_TABLE_NOT_EMPTY = 4129, E.ER_TABLE_NO_PRIMARY_KEY = 4130, E.ER_TABLE_IN_SHARED_TABLESPACE = 4131, E.ER_INDEX_OTHER_THAN_PK = 4132, E.ER_LOAD_BULK_DATA_UNSORTED = 4133, E.ER_BULK_EXECUTOR_ERROR = 4134, E.ER_BULK_READER_LIBCURL_INIT_FAILED = 4135, E.ER_BULK_READER_LIBCURL_ERROR = 4136, E.ER_BULK_READER_SERVER_ERROR = 4137, E.ER_BULK_READER_COMMUNICATION_ERROR = 4138, E.ER_BULK_LOAD_DATA_FAILED = 4139, E.ER_BULK_LOADER_COLUMN_TOO_BIG_FOR_LEFTOVER_BUFFER = 4140, E.ER_BULK_LOADER_COMPONENT_ERROR = 4141, E.ER_BULK_LOADER_FILE_CONTAINS_LESS_LINES_THAN_IGNORE_CLAUSE = 4142, E.ER_BULK_PARSER_MISSING_ENCLOSED_BY = 4143, E.ER_BULK_PARSER_ROW_BUFFER_MAX_TOTAL_COLS_EXCEEDED = 4144, E.ER_BULK_PARSER_COPY_BUFFER_SIZE_EXCEEDED = 4145, E.ER_BULK_PARSER_UNEXPECTED_END_OF_INPUT = 4146, E.ER_BULK_PARSER_UNEXPECTED_ROW_TERMINATOR = 4147, E.ER_BULK_PARSER_UNEXPECTED_CHAR_AFTER_ENDING_ENCLOSED_BY = 4148, E.ER_BULK_PARSER_UNEXPECTED_CHAR_AFTER_NULL_ESCAPE = 4149, E.ER_BULK_PARSER_UNEXPECTED_CHAR_AFTER_COLUMN_TERMINATOR = 4150, E.ER_BULK_PARSER_INCOMPLETE_ESCAPE_SEQUENCE = 4151, E.ER_LOAD_BULK_DATA_FAILED = 4152, E.ER_LOAD_BULK_DATA_WRONG_VALUE_FOR_FIELD = 4153, E.ER_LOAD_BULK_DATA_WARN_NULL_TO_NOTNULL = 4154, E.ER_REQUIRE_TABLE_PRIMARY_KEY_CHECK_GENERATE_WITH_GR = 4155, E.ER_CANT_CHANGE_SYS_VAR_IN_READ_ONLY_MODE = 4156, E.ER_INNODB_INSTANT_ADD_DROP_NOT_SUPPORTED_MAX_SIZE = 4157, E.ER_INNODB_INSTANT_ADD_NOT_SUPPORTED_MAX_FIELDS = 4158, E.ER_CANT_SET_PERSISTED = 4159, E.ER_INSTALL_COMPONENT_SET_NULL_VALUE = 4160, E.ER_INSTALL_COMPONENT_SET_UNUSED_VALUE = 4161, E.ER_WARN_DEPRECATED_USER_DEFINED_COLLATIONS = 4162, E[1] = "EE_CANTCREATEFILE", E[2] = "EE_READ", E[3] = "EE_WRITE", E[4] = "EE_BADCLOSE", E[5] = "EE_OUTOFMEMORY", E[6] = "EE_DELETE", E[7] = "EE_LINK", E[9] = "EE_EOFERR", E[10] = "EE_CANTLOCK", E[11] = "EE_CANTUNLOCK", E[12] = "EE_DIR", E[13] = "EE_STAT", E[14] = "EE_CANT_CHSIZE", E[15] = "EE_CANT_OPEN_STREAM", E[16] = "EE_GETWD", E[17] = "EE_SETWD", E[18] = "EE_LINK_WARNING", E[19] = "EE_OPEN_WARNING", E[20] = "EE_DISK_FULL", E[21] = "EE_CANT_MKDIR", E[22] = "EE_UNKNOWN_CHARSET", E[23] = "EE_OUT_OF_FILERESOURCES", E[24] = "EE_CANT_READLINK", E[25] = "EE_CANT_SYMLINK", E[26] = "EE_REALPATH", E[27] = "EE_SYNC", E[28] = "EE_UNKNOWN_COLLATION", E[29] = "EE_FILENOTFOUND", E[30] = "EE_FILE_NOT_CLOSED", E[31] = "EE_CHANGE_OWNERSHIP", E[32] = "EE_CHANGE_PERMISSIONS", E[33] = "EE_CANT_SEEK", E[34] = "EE_CAPACITY_EXCEEDED", E[35] = "EE_DISK_FULL_WITH_RETRY_MSG", E[36] = "EE_FAILED_TO_CREATE_TIMER", E[37] = "EE_FAILED_TO_DELETE_TIMER", E[38] = "EE_FAILED_TO_CREATE_TIMER_QUEUE", E[39] = "EE_FAILED_TO_START_TIMER_NOTIFY_THREAD", E[40] = "EE_FAILED_TO_CREATE_TIMER_NOTIFY_THREAD_INTERRUPT_EVENT", E[41] = "EE_EXITING_TIMER_NOTIFY_THREAD", E[42] = "EE_WIN_LIBRARY_LOAD_FAILED", E[43] = "EE_WIN_RUN_TIME_ERROR_CHECK", E[44] = "EE_FAILED_TO_DETERMINE_LARGE_PAGE_SIZE", E[45] = "EE_FAILED_TO_KILL_ALL_THREADS", E[46] = "EE_FAILED_TO_CREATE_IO_COMPLETION_PORT", E[47] = "EE_FAILED_TO_OPEN_DEFAULTS_FILE", E[48] = "EE_FAILED_TO_HANDLE_DEFAULTS_FILE", E[49] = "EE_WRONG_DIRECTIVE_IN_CONFIG_FILE", E[50] = "EE_SKIPPING_DIRECTIVE_DUE_TO_MAX_INCLUDE_RECURSION", E[51] = "EE_INCORRECT_GRP_DEFINITION_IN_CONFIG_FILE", E[52] = "EE_OPTION_WITHOUT_GRP_IN_CONFIG_FILE", E[53] = "EE_CONFIG_FILE_PERMISSION_ERROR", E[54] = "EE_IGNORE_WORLD_WRITABLE_CONFIG_FILE", E[55] = "EE_USING_DISABLED_OPTION", E[56] = "EE_USING_DISABLED_SHORT_OPTION", E[57] = "EE_USING_PASSWORD_ON_CLI_IS_INSECURE", E[58] = "EE_UNKNOWN_SUFFIX_FOR_VARIABLE", E[59] = "EE_SSL_ERROR_FROM_FILE", E[60] = "EE_SSL_ERROR", E[61] = "EE_NET_SEND_ERROR_IN_BOOTSTRAP", E[62] = "EE_PACKETS_OUT_OF_ORDER", E[63] = "EE_UNKNOWN_PROTOCOL_OPTION", E[64] = "EE_FAILED_TO_LOCATE_SERVER_PUBLIC_KEY", E[65] = "EE_PUBLIC_KEY_NOT_IN_PEM_FORMAT", E[66] = "EE_DEBUG_INFO", E[67] = "EE_UNKNOWN_VARIABLE", E[68] = "EE_UNKNOWN_OPTION", E[69] = "EE_UNKNOWN_SHORT_OPTION", E[70] = "EE_OPTION_WITHOUT_ARGUMENT", E[71] = "EE_OPTION_REQUIRES_ARGUMENT", E[72] = "EE_SHORT_OPTION_REQUIRES_ARGUMENT", E[73] = "EE_OPTION_IGNORED_DUE_TO_INVALID_VALUE", E[74] = "EE_OPTION_WITH_EMPTY_VALUE", E[75] = "EE_FAILED_TO_ASSIGN_MAX_VALUE_TO_OPTION", E[76] = "EE_INCORRECT_BOOLEAN_VALUE_FOR_OPTION", E[77] = "EE_FAILED_TO_SET_OPTION_VALUE", E[78] = "EE_INCORRECT_INT_VALUE_FOR_OPTION", E[79] = "EE_INCORRECT_UINT_VALUE_FOR_OPTION", E[80] = "EE_ADJUSTED_SIGNED_VALUE_FOR_OPTION", E[81] = "EE_ADJUSTED_UNSIGNED_VALUE_FOR_OPTION", E[82] = "EE_ADJUSTED_ULONGLONG_VALUE_FOR_OPTION", E[83] = "EE_ADJUSTED_DOUBLE_VALUE_FOR_OPTION", E[84] = "EE_INVALID_DECIMAL_VALUE_FOR_OPTION", E[85] = "EE_COLLATION_PARSER_ERROR", E[86] = "EE_FAILED_TO_RESET_BEFORE_PRIMARY_IGNORABLE_CHAR", E[87] = "EE_FAILED_TO_RESET_BEFORE_TERTIARY_IGNORABLE_CHAR", E[88] = "EE_SHIFT_CHAR_OUT_OF_RANGE", E[89] = "EE_RESET_CHAR_OUT_OF_RANGE", E[90] = "EE_UNKNOWN_LDML_TAG", E[91] = "EE_FAILED_TO_RESET_BEFORE_SECONDARY_IGNORABLE_CHAR", E[92] = "EE_FAILED_PROCESSING_DIRECTIVE", E[93] = "EE_PTHREAD_KILL_FAILED", E[120] = "HA_ERR_KEY_NOT_FOUND", E[121] = "HA_ERR_FOUND_DUPP_KEY", E[122] = "HA_ERR_INTERNAL_ERROR", E[123] = "HA_ERR_RECORD_CHANGED", E[124] = "HA_ERR_WRONG_INDEX", E[125] = "HA_ERR_ROLLED_BACK", E[126] = "HA_ERR_CRASHED", E[127] = "HA_ERR_WRONG_IN_RECORD", E[128] = "HA_ERR_OUT_OF_MEM", E[130] = "HA_ERR_NOT_A_TABLE", E[131] = "HA_ERR_WRONG_COMMAND", E[132] = "HA_ERR_OLD_FILE", E[133] = "HA_ERR_NO_ACTIVE_RECORD", E[134] = "HA_ERR_RECORD_DELETED", E[135] = "HA_ERR_RECORD_FILE_FULL", E[136] = "HA_ERR_INDEX_FILE_FULL", E[137] = "HA_ERR_END_OF_FILE", E[138] = "HA_ERR_UNSUPPORTED", E[139] = "HA_ERR_TOO_BIG_ROW", E[140] = "HA_WRONG_CREATE_OPTION", E[141] = "HA_ERR_FOUND_DUPP_UNIQUE", E[142] = "HA_ERR_UNKNOWN_CHARSET", E[143] = "HA_ERR_WRONG_MRG_TABLE_DEF", E[144] = "HA_ERR_CRASHED_ON_REPAIR", E[145] = "HA_ERR_CRASHED_ON_USAGE", E[146] = "HA_ERR_LOCK_WAIT_TIMEOUT", E[147] = "HA_ERR_LOCK_TABLE_FULL", E[148] = "HA_ERR_READ_ONLY_TRANSACTION", E[149] = "HA_ERR_LOCK_DEADLOCK", E[150] = "HA_ERR_CANNOT_ADD_FOREIGN", E[151] = "HA_ERR_NO_REFERENCED_ROW", E[152] = "HA_ERR_ROW_IS_REFERENCED", E[153] = "HA_ERR_NO_SAVEPOINT", E[154] = "HA_ERR_NON_UNIQUE_BLOCK_SIZE", E[155] = "HA_ERR_NO_SUCH_TABLE", E[156] = "HA_ERR_TABLE_EXIST", E[157] = "HA_ERR_NO_CONNECTION", E[158] = "HA_ERR_NULL_IN_SPATIAL", E[159] = "HA_ERR_TABLE_DEF_CHANGED", E[160] = "HA_ERR_NO_PARTITION_FOUND", E[161] = "HA_ERR_RBR_LOGGING_FAILED", E[162] = "HA_ERR_DROP_INDEX_FK", E[163] = "HA_ERR_FOREIGN_DUPLICATE_KEY", E[164] = "HA_ERR_TABLE_NEEDS_UPGRADE", E[165] = "HA_ERR_TABLE_READONLY", E[166] = "HA_ERR_AUTOINC_READ_FAILED", E[167] = "HA_ERR_AUTOINC_ERANGE", E[168] = "HA_ERR_GENERIC", E[169] = "HA_ERR_RECORD_IS_THE_SAME", E[170] = "HA_ERR_LOGGING_IMPOSSIBLE", E[171] = "HA_ERR_CORRUPT_EVENT", E[172] = "HA_ERR_NEW_FILE", E[173] = "HA_ERR_ROWS_EVENT_APPLY", E[174] = "HA_ERR_INITIALIZATION", E[175] = "HA_ERR_FILE_TOO_SHORT", E[176] = "HA_ERR_WRONG_CRC", E[177] = "HA_ERR_TOO_MANY_CONCURRENT_TRXS", E[178] = "HA_ERR_NOT_IN_LOCK_PARTITIONS", E[179] = "HA_ERR_INDEX_COL_TOO_LONG", E[180] = "HA_ERR_INDEX_CORRUPT", E[181] = "HA_ERR_UNDO_REC_TOO_BIG", E[182] = "HA_FTS_INVALID_DOCID", E[183] = "HA_ERR_TABLE_IN_FK_CHECK", E[184] = "HA_ERR_TABLESPACE_EXISTS", E[185] = "HA_ERR_TOO_MANY_FIELDS", E[186] = "HA_ERR_ROW_IN_WRONG_PARTITION", E[187] = "HA_ERR_INNODB_READ_ONLY", E[188] = "HA_ERR_FTS_EXCEED_RESULT_CACHE_LIMIT", E[189] = "HA_ERR_TEMP_FILE_WRITE_FAILURE", E[190] = "HA_ERR_INNODB_FORCED_RECOVERY", E[191] = "HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE", E[192] = "HA_ERR_FK_DEPTH_EXCEEDED", E[193] = "HA_MISSING_CREATE_OPTION", E[194] = "HA_ERR_SE_OUT_OF_MEMORY", E[195] = "HA_ERR_TABLE_CORRUPT", E[196] = "HA_ERR_QUERY_INTERRUPTED", E[197] = "HA_ERR_TABLESPACE_MISSING", E[198] = "HA_ERR_TABLESPACE_IS_NOT_EMPTY", E[199] = "HA_ERR_WRONG_FILE_NAME", E[200] = "HA_ERR_NOT_ALLOWED_COMMAND", E[201] = "HA_ERR_COMPUTE_FAILED", E[202] = "HA_ERR_ROW_FORMAT_CHANGED", E[203] = "HA_ERR_NO_WAIT_LOCK", E[204] = "HA_ERR_DISK_FULL_NOWAIT", E[205] = "HA_ERR_NO_SESSION_TEMP", E[206] = "HA_ERR_WRONG_TABLE_NAME", E[207] = "HA_ERR_TOO_LONG_PATH", E[208] = "HA_ERR_SAMPLING_INIT_FAILED", E[209] = "HA_ERR_FTS_TOO_MANY_NESTED_EXP", E[1e3] = "ER_HASHCHK", E[1001] = "ER_NISAMCHK", E[1002] = "ER_NO", E[1003] = "ER_YES", E[1004] = "ER_CANT_CREATE_FILE", E[1005] = "ER_CANT_CREATE_TABLE", E[1006] = "ER_CANT_CREATE_DB", E[1007] = "ER_DB_CREATE_EXISTS", E[1008] = "ER_DB_DROP_EXISTS", E[1009] = "ER_DB_DROP_DELETE", E[1010] = "ER_DB_DROP_RMDIR", E[1011] = "ER_CANT_DELETE_FILE", E[1012] = "ER_CANT_FIND_SYSTEM_REC", E[1013] = "ER_CANT_GET_STAT", E[1014] = "ER_CANT_GET_WD", E[1015] = "ER_CANT_LOCK", E[1016] = "ER_CANT_OPEN_FILE", E[1017] = "ER_FILE_NOT_FOUND", E[1018] = "ER_CANT_READ_DIR", E[1019] = "ER_CANT_SET_WD", E[1020] = "ER_CHECKREAD", E[1021] = "ER_DISK_FULL", E[1022] = "ER_DUP_KEY", E[1023] = "ER_ERROR_ON_CLOSE", E[1024] = "ER_ERROR_ON_READ", E[1025] = "ER_ERROR_ON_RENAME", E[1026] = "ER_ERROR_ON_WRITE", E[1027] = "ER_FILE_USED", E[1028] = "ER_FILSORT_ABORT", E[1029] = "ER_FORM_NOT_FOUND", E[1030] = "ER_GET_ERRNO", E[1031] = "ER_ILLEGAL_HA", E[1032] = "ER_KEY_NOT_FOUND", E[1033] = "ER_NOT_FORM_FILE", E[1034] = "ER_NOT_KEYFILE", E[1035] = "ER_OLD_KEYFILE", E[1036] = "ER_OPEN_AS_READONLY", E[1037] = "ER_OUTOFMEMORY", E[1038] = "ER_OUT_OF_SORTMEMORY", E[1039] = "ER_UNEXPECTED_EOF", E[1040] = "ER_CON_COUNT_ERROR", E[1041] = "ER_OUT_OF_RESOURCES", E[1042] = "ER_BAD_HOST_ERROR", E[1043] = "ER_HANDSHAKE_ERROR", E[1044] = "ER_DBACCESS_DENIED_ERROR", E[1045] = "ER_ACCESS_DENIED_ERROR", E[1046] = "ER_NO_DB_ERROR", E[1047] = "ER_UNKNOWN_COM_ERROR", E[1048] = "ER_BAD_NULL_ERROR", E[1049] = "ER_BAD_DB_ERROR", E[1050] = "ER_TABLE_EXISTS_ERROR", E[1051] = "ER_BAD_TABLE_ERROR", E[1052] = "ER_NON_UNIQ_ERROR", E[1053] = "ER_SERVER_SHUTDOWN", E[1054] = "ER_BAD_FIELD_ERROR", E[1055] = "ER_WRONG_FIELD_WITH_GROUP", E[1056] = "ER_WRONG_GROUP_FIELD", E[1057] = "ER_WRONG_SUM_SELECT", E[1058] = "ER_WRONG_VALUE_COUNT", E[1059] = "ER_TOO_LONG_IDENT", E[1060] = "ER_DUP_FIELDNAME", E[1061] = "ER_DUP_KEYNAME", E[1062] = "ER_DUP_ENTRY", E[1063] = "ER_WRONG_FIELD_SPEC", E[1064] = "ER_PARSE_ERROR", E[1065] = "ER_EMPTY_QUERY", E[1066] = "ER_NONUNIQ_TABLE", E[1067] = "ER_INVALID_DEFAULT", E[1068] = "ER_MULTIPLE_PRI_KEY", E[1069] = "ER_TOO_MANY_KEYS", E[1070] = "ER_TOO_MANY_KEY_PARTS", E[1071] = "ER_TOO_LONG_KEY", E[1072] = "ER_KEY_COLUMN_DOES_NOT_EXITS", E[1073] = "ER_BLOB_USED_AS_KEY", E[1074] = "ER_TOO_BIG_FIELDLENGTH", E[1075] = "ER_WRONG_AUTO_KEY", E[1076] = "ER_READY", E[1077] = "ER_NORMAL_SHUTDOWN", E[1078] = "ER_GOT_SIGNAL", E[1079] = "ER_SHUTDOWN_COMPLETE", E[1080] = "ER_FORCING_CLOSE", E[1081] = "ER_IPSOCK_ERROR", E[1082] = "ER_NO_SUCH_INDEX", E[1083] = "ER_WRONG_FIELD_TERMINATORS", E[1084] = "ER_BLOBS_AND_NO_TERMINATED", E[1085] = "ER_TEXTFILE_NOT_READABLE", E[1086] = "ER_FILE_EXISTS_ERROR", E[1087] = "ER_LOAD_INFO", E[1088] = "ER_ALTER_INFO", E[1089] = "ER_WRONG_SUB_KEY", E[1090] = "ER_CANT_REMOVE_ALL_FIELDS", E[1091] = "ER_CANT_DROP_FIELD_OR_KEY", E[1092] = "ER_INSERT_INFO", E[1093] = "ER_UPDATE_TABLE_USED", E[1094] = "ER_NO_SUCH_THREAD", E[1095] = "ER_KILL_DENIED_ERROR", E[1096] = "ER_NO_TABLES_USED", E[1097] = "ER_TOO_BIG_SET", E[1098] = "ER_NO_UNIQUE_LOGFILE", E[1099] = "ER_TABLE_NOT_LOCKED_FOR_WRITE", E[1100] = "ER_TABLE_NOT_LOCKED", E[1101] = "ER_BLOB_CANT_HAVE_DEFAULT", E[1102] = "ER_WRONG_DB_NAME", E[1103] = "ER_WRONG_TABLE_NAME", E[1104] = "ER_TOO_BIG_SELECT", E[1105] = "ER_UNKNOWN_ERROR", E[1106] = "ER_UNKNOWN_PROCEDURE", E[1107] = "ER_WRONG_PARAMCOUNT_TO_PROCEDURE", E[1108] = "ER_WRONG_PARAMETERS_TO_PROCEDURE", E[1109] = "ER_UNKNOWN_TABLE", E[1110] = "ER_FIELD_SPECIFIED_TWICE", E[1111] = "ER_INVALID_GROUP_FUNC_USE", E[1112] = "ER_UNSUPPORTED_EXTENSION", E[1113] = "ER_TABLE_MUST_HAVE_COLUMNS", E[1114] = "ER_RECORD_FILE_FULL", E[1115] = "ER_UNKNOWN_CHARACTER_SET", E[1116] = "ER_TOO_MANY_TABLES", E[1117] = "ER_TOO_MANY_FIELDS", E[1118] = "ER_TOO_BIG_ROWSIZE", E[1119] = "ER_STACK_OVERRUN", E[1120] = "ER_WRONG_OUTER_JOIN", E[1121] = "ER_NULL_COLUMN_IN_INDEX", E[1122] = "ER_CANT_FIND_UDF", E[1123] = "ER_CANT_INITIALIZE_UDF", E[1124] = "ER_UDF_NO_PATHS", E[1125] = "ER_UDF_EXISTS", E[1126] = "ER_CANT_OPEN_LIBRARY", E[1127] = "ER_CANT_FIND_DL_ENTRY", E[1128] = "ER_FUNCTION_NOT_DEFINED", E[1129] = "ER_HOST_IS_BLOCKED", E[1130] = "ER_HOST_NOT_PRIVILEGED", E[1131] = "ER_PASSWORD_ANONYMOUS_USER", E[1132] = "ER_PASSWORD_NOT_ALLOWED", E[1133] = "ER_PASSWORD_NO_MATCH", E[1134] = "ER_UPDATE_INFO", E[1135] = "ER_CANT_CREATE_THREAD", E[1136] = "ER_WRONG_VALUE_COUNT_ON_ROW", E[1137] = "ER_CANT_REOPEN_TABLE", E[1138] = "ER_INVALID_USE_OF_NULL", E[1139] = "ER_REGEXP_ERROR", E[1140] = "ER_MIX_OF_GROUP_FUNC_AND_FIELDS", E[1141] = "ER_NONEXISTING_GRANT", E[1142] = "ER_TABLEACCESS_DENIED_ERROR", E[1143] = "ER_COLUMNACCESS_DENIED_ERROR", E[1144] = "ER_ILLEGAL_GRANT_FOR_TABLE", E[1145] = "ER_GRANT_WRONG_HOST_OR_USER", E[1146] = "ER_NO_SUCH_TABLE", E[1147] = "ER_NONEXISTING_TABLE_GRANT", E[1148] = "ER_NOT_ALLOWED_COMMAND", E[1149] = "ER_SYNTAX_ERROR", E[1150] = "ER_UNUSED1", E[1151] = "ER_UNUSED2", E[1152] = "ER_ABORTING_CONNECTION", E[1153] = "ER_NET_PACKET_TOO_LARGE", E[1154] = "ER_NET_READ_ERROR_FROM_PIPE", E[1155] = "ER_NET_FCNTL_ERROR", E[1156] = "ER_NET_PACKETS_OUT_OF_ORDER", E[1157] = "ER_NET_UNCOMPRESS_ERROR", E[1158] = "ER_NET_READ_ERROR", E[1159] = "ER_NET_READ_INTERRUPTED", E[1160] = "ER_NET_ERROR_ON_WRITE", E[1161] = "ER_NET_WRITE_INTERRUPTED", E[1162] = "ER_TOO_LONG_STRING", E[1163] = "ER_TABLE_CANT_HANDLE_BLOB", E[1164] = "ER_TABLE_CANT_HANDLE_AUTO_INCREMENT", E[1165] = "ER_UNUSED3", E[1166] = "ER_WRONG_COLUMN_NAME", E[1167] = "ER_WRONG_KEY_COLUMN", E[1168] = "ER_WRONG_MRG_TABLE", E[1169] = "ER_DUP_UNIQUE", E[1170] = "ER_BLOB_KEY_WITHOUT_LENGTH", E[1171] = "ER_PRIMARY_CANT_HAVE_NULL", E[1172] = "ER_TOO_MANY_ROWS", E[1173] = "ER_REQUIRES_PRIMARY_KEY", E[1174] = "ER_NO_RAID_COMPILED", E[1175] = "ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE", E[1176] = "ER_KEY_DOES_NOT_EXITS", E[1177] = "ER_CHECK_NO_SUCH_TABLE", E[1178] = "ER_CHECK_NOT_IMPLEMENTED", E[1179] = "ER_CANT_DO_THIS_DURING_AN_TRANSACTION", E[1180] = "ER_ERROR_DURING_COMMIT", E[1181] = "ER_ERROR_DURING_ROLLBACK", E[1182] = "ER_ERROR_DURING_FLUSH_LOGS", E[1183] = "ER_ERROR_DURING_CHECKPOINT", E[1184] = "ER_NEW_ABORTING_CONNECTION", E[1185] = "ER_DUMP_NOT_IMPLEMENTED", E[1186] = "ER_FLUSH_MASTER_BINLOG_CLOSED", E[1187] = "ER_INDEX_REBUILD", E[1188] = "ER_SOURCE", E[1189] = "ER_SOURCE_NET_READ", E[1190] = "ER_SOURCE_NET_WRITE", E[1191] = "ER_FT_MATCHING_KEY_NOT_FOUND", E[1192] = "ER_LOCK_OR_ACTIVE_TRANSACTION", E[1193] = "ER_UNKNOWN_SYSTEM_VARIABLE", E[1194] = "ER_CRASHED_ON_USAGE", E[1195] = "ER_CRASHED_ON_REPAIR", E[1196] = "ER_WARNING_NOT_COMPLETE_ROLLBACK", E[1197] = "ER_TRANS_CACHE_FULL", E[1198] = "ER_SLAVE_MUST_STOP", E[1199] = "ER_REPLICA_NOT_RUNNING", E[1200] = "ER_BAD_REPLICA", E[1201] = "ER_CONNECTION_METADATA", E[1202] = "ER_REPLICA_THREAD", E[1203] = "ER_TOO_MANY_USER_CONNECTIONS", E[1204] = "ER_SET_CONSTANTS_ONLY", E[1205] = "ER_LOCK_WAIT_TIMEOUT", E[1206] = "ER_LOCK_TABLE_FULL", E[1207] = "ER_READ_ONLY_TRANSACTION", E[1208] = "ER_DROP_DB_WITH_READ_LOCK", E[1209] = "ER_CREATE_DB_WITH_READ_LOCK", E[1210] = "ER_WRONG_ARGUMENTS", E[1211] = "ER_NO_PERMISSION_TO_CREATE_USER", E[1212] = "ER_UNION_TABLES_IN_DIFFERENT_DIR", E[1213] = "ER_LOCK_DEADLOCK", E[1214] = "ER_TABLE_CANT_HANDLE_FT", E[1215] = "ER_CANNOT_ADD_FOREIGN", E[1216] = "ER_NO_REFERENCED_ROW", E[1217] = "ER_ROW_IS_REFERENCED", E[1218] = "ER_CONNECT_TO_SOURCE", E[1219] = "ER_QUERY_ON_MASTER", E[1220] = "ER_ERROR_WHEN_EXECUTING_COMMAND", E[1221] = "ER_WRONG_USAGE", E[1222] = "ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT", E[1223] = "ER_CANT_UPDATE_WITH_READLOCK", E[1224] = "ER_MIXING_NOT_ALLOWED", E[1225] = "ER_DUP_ARGUMENT", E[1226] = "ER_USER_LIMIT_REACHED", E[1227] = "ER_SPECIFIC_ACCESS_DENIED_ERROR", E[1228] = "ER_LOCAL_VARIABLE", E[1229] = "ER_GLOBAL_VARIABLE", E[1230] = "ER_NO_DEFAULT", E[1231] = "ER_WRONG_VALUE_FOR_VAR", E[1232] = "ER_WRONG_TYPE_FOR_VAR", E[1233] = "ER_VAR_CANT_BE_READ", E[1234] = "ER_CANT_USE_OPTION_HERE", E[1235] = "ER_NOT_SUPPORTED_YET", E[1236] = "ER_SOURCE_FATAL_ERROR_READING_BINLOG", E[1237] = "ER_REPLICA_IGNORED_TABLE", E[1238] = "ER_INCORRECT_GLOBAL_LOCAL_VAR", E[1239] = "ER_WRONG_FK_DEF", E[1240] = "ER_KEY_REF_DO_NOT_MATCH_TABLE_REF", E[1241] = "ER_OPERAND_COLUMNS", E[1242] = "ER_SUBQUERY_NO_1_ROW", E[1243] = "ER_UNKNOWN_STMT_HANDLER", E[1244] = "ER_CORRUPT_HELP_DB", E[1245] = "ER_CYCLIC_REFERENCE", E[1246] = "ER_AUTO_CONVERT", E[1247] = "ER_ILLEGAL_REFERENCE", E[1248] = "ER_DERIVED_MUST_HAVE_ALIAS", E[1249] = "ER_SELECT_REDUCED", E[1250] = "ER_TABLENAME_NOT_ALLOWED_HERE", E[1251] = "ER_NOT_SUPPORTED_AUTH_MODE", E[1252] = "ER_SPATIAL_CANT_HAVE_NULL", E[1253] = "ER_COLLATION_CHARSET_MISMATCH", E[1254] = "ER_SLAVE_WAS_RUNNING", E[1255] = "ER_SLAVE_WAS_NOT_RUNNING", E[1256] = "ER_TOO_BIG_FOR_UNCOMPRESS", E[1257] = "ER_ZLIB_Z_MEM_ERROR", E[1258] = "ER_ZLIB_Z_BUF_ERROR", E[1259] = "ER_ZLIB_Z_DATA_ERROR", E[1260] = "ER_CUT_VALUE_GROUP_CONCAT", E[1261] = "ER_WARN_TOO_FEW_RECORDS", E[1262] = "ER_WARN_TOO_MANY_RECORDS", E[1263] = "ER_WARN_NULL_TO_NOTNULL", E[1264] = "ER_WARN_DATA_OUT_OF_RANGE", E[1265] = "WARN_DATA_TRUNCATED", E[1266] = "ER_WARN_USING_OTHER_HANDLER", E[1267] = "ER_CANT_AGGREGATE_2COLLATIONS", E[1268] = "ER_DROP_USER", E[1269] = "ER_REVOKE_GRANTS", E[1270] = "ER_CANT_AGGREGATE_3COLLATIONS", E[1271] = "ER_CANT_AGGREGATE_NCOLLATIONS", E[1272] = "ER_VARIABLE_IS_NOT_STRUCT", E[1273] = "ER_UNKNOWN_COLLATION", E[1274] = "ER_REPLICA_IGNORED_SSL_PARAMS", E[1275] = "ER_SERVER_IS_IN_SECURE_AUTH_MODE", E[1276] = "ER_WARN_FIELD_RESOLVED", E[1277] = "ER_BAD_REPLICA_UNTIL_COND", E[1278] = "ER_MISSING_SKIP_REPLICA", E[1279] = "ER_UNTIL_COND_IGNORED", E[1280] = "ER_WRONG_NAME_FOR_INDEX", E[1281] = "ER_WRONG_NAME_FOR_CATALOG", E[1282] = "ER_WARN_QC_RESIZE", E[1283] = "ER_BAD_FT_COLUMN", E[1284] = "ER_UNKNOWN_KEY_CACHE", E[1285] = "ER_WARN_HOSTNAME_WONT_WORK", E[1286] = "ER_UNKNOWN_STORAGE_ENGINE", E[1287] = "ER_WARN_DEPRECATED_SYNTAX", E[1288] = "ER_NON_UPDATABLE_TABLE", E[1289] = "ER_FEATURE_DISABLED", E[1290] = "ER_OPTION_PREVENTS_STATEMENT", E[1291] = "ER_DUPLICATED_VALUE_IN_TYPE", E[1292] = "ER_TRUNCATED_WRONG_VALUE", E[1293] = "ER_TOO_MUCH_AUTO_TIMESTAMP_COLS", E[1294] = "ER_INVALID_ON_UPDATE", E[1295] = "ER_UNSUPPORTED_PS", E[1296] = "ER_GET_ERRMSG", E[1297] = "ER_GET_TEMPORARY_ERRMSG", E[1298] = "ER_UNKNOWN_TIME_ZONE", E[1299] = "ER_WARN_INVALID_TIMESTAMP", E[1300] = "ER_INVALID_CHARACTER_STRING", E[1301] = "ER_WARN_ALLOWED_PACKET_OVERFLOWED", E[1302] = "ER_CONFLICTING_DECLARATIONS", E[1303] = "ER_SP_NO_RECURSIVE_CREATE", E[1304] = "ER_SP_ALREADY_EXISTS", E[1305] = "ER_SP_DOES_NOT_EXIST", E[1306] = "ER_SP_DROP_FAILED", E[1307] = "ER_SP_STORE_FAILED", E[1308] = "ER_SP_LILABEL_MISMATCH", E[1309] = "ER_SP_LABEL_REDEFINE", E[1310] = "ER_SP_LABEL_MISMATCH", E[1311] = "ER_SP_UNINIT_VAR", E[1312] = "ER_SP_BADSELECT", E[1313] = "ER_SP_BADRETURN", E[1314] = "ER_SP_BADSTATEMENT", E[1315] = "ER_UPDATE_LOG_DEPRECATED_IGNORED", E[1316] = "ER_UPDATE_LOG_DEPRECATED_TRANSLATED", E[1317] = "ER_QUERY_INTERRUPTED", E[1318] = "ER_SP_WRONG_NO_OF_ARGS", E[1319] = "ER_SP_COND_MISMATCH", E[1320] = "ER_SP_NORETURN", E[1321] = "ER_SP_NORETURNEND", E[1322] = "ER_SP_BAD_CURSOR_QUERY", E[1323] = "ER_SP_BAD_CURSOR_SELECT", E[1324] = "ER_SP_CURSOR_MISMATCH", E[1325] = "ER_SP_CURSOR_ALREADY_OPEN", E[1326] = "ER_SP_CURSOR_NOT_OPEN", E[1327] = "ER_SP_UNDECLARED_VAR", E[1328] = "ER_SP_WRONG_NO_OF_FETCH_ARGS", E[1329] = "ER_SP_FETCH_NO_DATA", E[1330] = "ER_SP_DUP_PARAM", E[1331] = "ER_SP_DUP_VAR", E[1332] = "ER_SP_DUP_COND", E[1333] = "ER_SP_DUP_CURS", E[1334] = "ER_SP_CANT_ALTER", E[1335] = "ER_SP_SUBSELECT_NYI", E[1336] = "ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG", E[1337] = "ER_SP_VARCOND_AFTER_CURSHNDLR", E[1338] = "ER_SP_CURSOR_AFTER_HANDLER", E[1339] = "ER_SP_CASE_NOT_FOUND", E[1340] = "ER_FPARSER_TOO_BIG_FILE", E[1341] = "ER_FPARSER_BAD_HEADER", E[1342] = "ER_FPARSER_EOF_IN_COMMENT", E[1343] = "ER_FPARSER_ERROR_IN_PARAMETER", E[1344] = "ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER", E[1345] = "ER_VIEW_NO_EXPLAIN", E[1346] = "ER_FRM_UNKNOWN_TYPE", E[1347] = "ER_WRONG_OBJECT", E[1348] = "ER_NONUPDATEABLE_COLUMN", E[1349] = "ER_VIEW_SELECT_DERIVED", E[1350] = "ER_VIEW_SELECT_CLAUSE", E[1351] = "ER_VIEW_SELECT_VARIABLE", E[1352] = "ER_VIEW_SELECT_TMPTABLE", E[1353] = "ER_VIEW_WRONG_LIST", E[1354] = "ER_WARN_VIEW_MERGE", E[1355] = "ER_WARN_VIEW_WITHOUT_KEY", E[1356] = "ER_VIEW_INVALID", E[1357] = "ER_SP_NO_DROP_SP", E[1358] = "ER_SP_GOTO_IN_HNDLR", E[1359] = "ER_TRG_ALREADY_EXISTS", E[1360] = "ER_TRG_DOES_NOT_EXIST", E[1361] = "ER_TRG_ON_VIEW_OR_TEMP_TABLE", E[1362] = "ER_TRG_CANT_CHANGE_ROW", E[1363] = "ER_TRG_NO_SUCH_ROW_IN_TRG", E[1364] = "ER_NO_DEFAULT_FOR_FIELD", E[1365] = "ER_DIVISION_BY_ZERO", E[1366] = "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD", E[1367] = "ER_ILLEGAL_VALUE_FOR_TYPE", E[1368] = "ER_VIEW_NONUPD_CHECK", E[1369] = "ER_VIEW_CHECK_FAILED", E[1370] = "ER_PROCACCESS_DENIED_ERROR", E[1371] = "ER_RELAY_LOG_FAIL", E[1372] = "ER_PASSWD_LENGTH", E[1373] = "ER_UNKNOWN_TARGET_BINLOG", E[1374] = "ER_IO_ERR_LOG_INDEX_READ", E[1375] = "ER_BINLOG_PURGE_PROHIBITED", E[1376] = "ER_FSEEK_FAIL", E[1377] = "ER_BINLOG_PURGE_FATAL_ERR", E[1378] = "ER_LOG_IN_USE", E[1379] = "ER_LOG_PURGE_UNKNOWN_ERR", E[1380] = "ER_RELAY_LOG_INIT", E[1381] = "ER_NO_BINARY_LOGGING", E[1382] = "ER_RESERVED_SYNTAX", E[1383] = "ER_WSAS_FAILED", E[1384] = "ER_DIFF_GROUPS_PROC", E[1385] = "ER_NO_GROUP_FOR_PROC", E[1386] = "ER_ORDER_WITH_PROC", E[1387] = "ER_LOGGING_PROHIBIT_CHANGING_OF", E[1388] = "ER_NO_FILE_MAPPING", E[1389] = "ER_WRONG_MAGIC", E[1390] = "ER_PS_MANY_PARAM", E[1391] = "ER_KEY_PART_0", E[1392] = "ER_VIEW_CHECKSUM", E[1393] = "ER_VIEW_MULTIUPDATE", E[1394] = "ER_VIEW_NO_INSERT_FIELD_LIST", E[1395] = "ER_VIEW_DELETE_MERGE_VIEW", E[1396] = "ER_CANNOT_USER", E[1397] = "ER_XAER_NOTA", E[1398] = "ER_XAER_INVAL", E[1399] = "ER_XAER_RMFAIL", E[1400] = "ER_XAER_OUTSIDE", E[1401] = "ER_XAER_RMERR", E[1402] = "ER_XA_RBROLLBACK", E[1403] = "ER_NONEXISTING_PROC_GRANT", E[1404] = "ER_PROC_AUTO_GRANT_FAIL", E[1405] = "ER_PROC_AUTO_REVOKE_FAIL", E[1406] = "ER_DATA_TOO_LONG", E[1407] = "ER_SP_BAD_SQLSTATE", E[1408] = "ER_STARTUP", E[1409] = "ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR", E[1410] = "ER_CANT_CREATE_USER_WITH_GRANT", E[1411] = "ER_WRONG_VALUE_FOR_TYPE", E[1412] = "ER_TABLE_DEF_CHANGED", E[1413] = "ER_SP_DUP_HANDLER", E[1414] = "ER_SP_NOT_VAR_ARG", E[1415] = "ER_SP_NO_RETSET", E[1416] = "ER_CANT_CREATE_GEOMETRY_OBJECT", E[1417] = "ER_FAILED_ROUTINE_BREAK_BINLOG", E[1418] = "ER_BINLOG_UNSAFE_ROUTINE", E[1419] = "ER_BINLOG_CREATE_ROUTINE_NEED_SUPER", E[1420] = "ER_EXEC_STMT_WITH_OPEN_CURSOR", E[1421] = "ER_STMT_HAS_NO_OPEN_CURSOR", E[1422] = "ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG", E[1423] = "ER_NO_DEFAULT_FOR_VIEW_FIELD", E[1424] = "ER_SP_NO_RECURSION", E[1425] = "ER_TOO_BIG_SCALE", E[1426] = "ER_TOO_BIG_PRECISION", E[1427] = "ER_M_BIGGER_THAN_D", E[1428] = "ER_WRONG_LOCK_OF_SYSTEM_TABLE", E[1429] = "ER_CONNECT_TO_FOREIGN_DATA_SOURCE", E[1430] = "ER_QUERY_ON_FOREIGN_DATA_SOURCE", E[1431] = "ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST", E[1432] = "ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE", E[1433] = "ER_FOREIGN_DATA_STRING_INVALID", E[1434] = "ER_CANT_CREATE_FEDERATED_TABLE", E[1435] = "ER_TRG_IN_WRONG_SCHEMA", E[1436] = "ER_STACK_OVERRUN_NEED_MORE", E[1437] = "ER_TOO_LONG_BODY", E[1438] = "ER_WARN_CANT_DROP_DEFAULT_KEYCACHE", E[1439] = "ER_TOO_BIG_DISPLAYWIDTH", E[1440] = "ER_XAER_DUPID", E[1441] = "ER_DATETIME_FUNCTION_OVERFLOW", E[1442] = "ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG", E[1443] = "ER_VIEW_PREVENT_UPDATE", E[1444] = "ER_PS_NO_RECURSION", E[1445] = "ER_SP_CANT_SET_AUTOCOMMIT", E[1446] = "ER_MALFORMED_DEFINER", E[1447] = "ER_VIEW_FRM_NO_USER", E[1448] = "ER_VIEW_OTHER_USER", E[1449] = "ER_NO_SUCH_USER", E[1450] = "ER_FORBID_SCHEMA_CHANGE", E[1451] = "ER_ROW_IS_REFERENCED_2", E[1452] = "ER_NO_REFERENCED_ROW_2", E[1453] = "ER_SP_BAD_VAR_SHADOW", E[1454] = "ER_TRG_NO_DEFINER", E[1455] = "ER_OLD_FILE_FORMAT", E[1456] = "ER_SP_RECURSION_LIMIT", E[1457] = "ER_SP_PROC_TABLE_CORRUPT", E[1458] = "ER_SP_WRONG_NAME", E[1459] = "ER_TABLE_NEEDS_UPGRADE", E[1460] = "ER_SP_NO_AGGREGATE", E[1461] = "ER_MAX_PREPARED_STMT_COUNT_REACHED", E[1462] = "ER_VIEW_RECURSIVE", E[1463] = "ER_NON_GROUPING_FIELD_USED", E[1464] = "ER_TABLE_CANT_HANDLE_SPKEYS", E[1465] = "ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA", E[1466] = "ER_REMOVED_SPACES", E[1467] = "ER_AUTOINC_READ_FAILED", E[1468] = "ER_USERNAME", E[1469] = "ER_HOSTNAME", E[1470] = "ER_WRONG_STRING_LENGTH", E[1471] = "ER_NON_INSERTABLE_TABLE", E[1472] = "ER_ADMIN_WRONG_MRG_TABLE", E[1473] = "ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT", E[1474] = "ER_NAME_BECOMES_EMPTY", E[1475] = "ER_AMBIGUOUS_FIELD_TERM", E[1476] = "ER_FOREIGN_SERVER_EXISTS", E[1477] = "ER_FOREIGN_SERVER_DOESNT_EXIST", E[1478] = "ER_ILLEGAL_HA_CREATE_OPTION", E[1479] = "ER_PARTITION_REQUIRES_VALUES_ERROR", E[1480] = "ER_PARTITION_WRONG_VALUES_ERROR", E[1481] = "ER_PARTITION_MAXVALUE_ERROR", E[1482] = "ER_PARTITION_SUBPARTITION_ERROR", E[1483] = "ER_PARTITION_SUBPART_MIX_ERROR", E[1484] = "ER_PARTITION_WRONG_NO_PART_ERROR", E[1485] = "ER_PARTITION_WRONG_NO_SUBPART_ERROR", E[1486] = "ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR", E[1487] = "ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR", E[1488] = "ER_FIELD_NOT_FOUND_PART_ERROR", E[1489] = "ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR", E[1490] = "ER_INCONSISTENT_PARTITION_INFO_ERROR", E[1491] = "ER_PARTITION_FUNC_NOT_ALLOWED_ERROR", E[1492] = "ER_PARTITIONS_MUST_BE_DEFINED_ERROR", E[1493] = "ER_RANGE_NOT_INCREASING_ERROR", E[1494] = "ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR", E[1495] = "ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR", E[1496] = "ER_PARTITION_ENTRY_ERROR", E[1497] = "ER_MIX_HANDLER_ERROR", E[1498] = "ER_PARTITION_NOT_DEFINED_ERROR", E[1499] = "ER_TOO_MANY_PARTITIONS_ERROR", E[1500] = "ER_SUBPARTITION_ERROR", E[1501] = "ER_CANT_CREATE_HANDLER_FILE", E[1502] = "ER_BLOB_FIELD_IN_PART_FUNC_ERROR", E[1503] = "ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF", E[1504] = "ER_NO_PARTS_ERROR", E[1505] = "ER_PARTITION_MGMT_ON_NONPARTITIONED", E[1506] = "ER_FOREIGN_KEY_ON_PARTITIONED", E[1507] = "ER_DROP_PARTITION_NON_EXISTENT", E[1508] = "ER_DROP_LAST_PARTITION", E[1509] = "ER_COALESCE_ONLY_ON_HASH_PARTITION", E[1510] = "ER_REORG_HASH_ONLY_ON_SAME_NO", E[1511] = "ER_REORG_NO_PARAM_ERROR", E[1512] = "ER_ONLY_ON_RANGE_LIST_PARTITION", E[1513] = "ER_ADD_PARTITION_SUBPART_ERROR", E[1514] = "ER_ADD_PARTITION_NO_NEW_PARTITION", E[1515] = "ER_COALESCE_PARTITION_NO_PARTITION", E[1516] = "ER_REORG_PARTITION_NOT_EXIST", E[1517] = "ER_SAME_NAME_PARTITION", E[1518] = "ER_NO_BINLOG_ERROR", E[1519] = "ER_CONSECUTIVE_REORG_PARTITIONS", E[1520] = "ER_REORG_OUTSIDE_RANGE", E[1521] = "ER_PARTITION_FUNCTION_FAILURE", E[1522] = "ER_PART_STATE_ERROR", E[1523] = "ER_LIMITED_PART_RANGE", E[1524] = "ER_PLUGIN_IS_NOT_LOADED", E[1525] = "ER_WRONG_VALUE", E[1526] = "ER_NO_PARTITION_FOR_GIVEN_VALUE", E[1527] = "ER_FILEGROUP_OPTION_ONLY_ONCE", E[1528] = "ER_CREATE_FILEGROUP_FAILED", E[1529] = "ER_DROP_FILEGROUP_FAILED", E[1530] = "ER_TABLESPACE_AUTO_EXTEND_ERROR", E[1531] = "ER_WRONG_SIZE_NUMBER", E[1532] = "ER_SIZE_OVERFLOW_ERROR", E[1533] = "ER_ALTER_FILEGROUP_FAILED", E[1534] = "ER_BINLOG_ROW_LOGGING_FAILED", E[1535] = "ER_BINLOG_ROW_WRONG_TABLE_DEF", E[1536] = "ER_BINLOG_ROW_RBR_TO_SBR", E[1537] = "ER_EVENT_ALREADY_EXISTS", E[1538] = "ER_EVENT_STORE_FAILED", E[1539] = "ER_EVENT_DOES_NOT_EXIST", E[1540] = "ER_EVENT_CANT_ALTER", E[1541] = "ER_EVENT_DROP_FAILED", E[1542] = "ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG", E[1543] = "ER_EVENT_ENDS_BEFORE_STARTS", E[1544] = "ER_EVENT_EXEC_TIME_IN_THE_PAST", E[1545] = "ER_EVENT_OPEN_TABLE_FAILED", E[1546] = "ER_EVENT_NEITHER_M_EXPR_NOR_M_AT", E[1547] = "ER_COL_COUNT_DOESNT_MATCH_CORRUPTED", E[1548] = "ER_CANNOT_LOAD_FROM_TABLE", E[1549] = "ER_EVENT_CANNOT_DELETE", E[1550] = "ER_EVENT_COMPILE_ERROR", E[1551] = "ER_EVENT_SAME_NAME", E[1552] = "ER_EVENT_DATA_TOO_LONG", E[1553] = "ER_DROP_INDEX_FK", E[1554] = "ER_WARN_DEPRECATED_SYNTAX_WITH_VER", E[1555] = "ER_CANT_WRITE_LOCK_LOG_TABLE", E[1556] = "ER_CANT_LOCK_LOG_TABLE", E[1557] = "ER_FOREIGN_DUPLICATE_KEY", E[1558] = "ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE", E[1559] = "ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR", E[1560] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT", E[1561] = "ER_NDB_CANT_SWITCH_BINLOG_FORMAT", E[1562] = "ER_PARTITION_NO_TEMPORARY", E[1563] = "ER_PARTITION_CONST_DOMAIN_ERROR", E[1564] = "ER_PARTITION_FUNCTION_IS_NOT_ALLOWED", E[1565] = "ER_DDL_LOG_ERROR", E[1566] = "ER_NULL_IN_VALUES_LESS_THAN", E[1567] = "ER_WRONG_PARTITION_NAME", E[1568] = "ER_CANT_CHANGE_TX_CHARACTERISTICS", E[1569] = "ER_DUP_ENTRY_AUTOINCREMENT_CASE", E[1570] = "ER_EVENT_MODIFY_QUEUE_ERROR", E[1571] = "ER_EVENT_SET_VAR_ERROR", E[1572] = "ER_PARTITION_MERGE_ERROR", E[1573] = "ER_CANT_ACTIVATE_LOG", E[1574] = "ER_RBR_NOT_AVAILABLE", E[1575] = "ER_BASE64_DECODE_ERROR", E[1576] = "ER_EVENT_RECURSION_FORBIDDEN", E[1577] = "ER_EVENTS_DB_ERROR", E[1578] = "ER_ONLY_INTEGERS_ALLOWED", E[1579] = "ER_UNSUPORTED_LOG_ENGINE", E[1580] = "ER_BAD_LOG_STATEMENT", E[1581] = "ER_CANT_RENAME_LOG_TABLE", E[1582] = "ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT", E[1583] = "ER_WRONG_PARAMETERS_TO_NATIVE_FCT", E[1584] = "ER_WRONG_PARAMETERS_TO_STORED_FCT", E[1585] = "ER_NATIVE_FCT_NAME_COLLISION", E[1586] = "ER_DUP_ENTRY_WITH_KEY_NAME", E[1587] = "ER_BINLOG_PURGE_EMFILE", E[1588] = "ER_EVENT_CANNOT_CREATE_IN_THE_PAST", E[1589] = "ER_EVENT_CANNOT_ALTER_IN_THE_PAST", E[1590] = "ER_SLAVE_INCIDENT", E[1591] = "ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT", E[1592] = "ER_BINLOG_UNSAFE_STATEMENT", E[1593] = "ER_BINLOG_FATAL_ERROR", E[1594] = "ER_SLAVE_RELAY_LOG_READ_FAILURE", E[1595] = "ER_SLAVE_RELAY_LOG_WRITE_FAILURE", E[1596] = "ER_SLAVE_CREATE_EVENT_FAILURE", E[1597] = "ER_SLAVE_MASTER_COM_FAILURE", E[1598] = "ER_BINLOG_LOGGING_IMPOSSIBLE", E[1599] = "ER_VIEW_NO_CREATION_CTX", E[1600] = "ER_VIEW_INVALID_CREATION_CTX", E[1601] = "ER_SR_INVALID_CREATION_CTX", E[1602] = "ER_TRG_CORRUPTED_FILE", E[1603] = "ER_TRG_NO_CREATION_CTX", E[1604] = "ER_TRG_INVALID_CREATION_CTX", E[1605] = "ER_EVENT_INVALID_CREATION_CTX", E[1606] = "ER_TRG_CANT_OPEN_TABLE", E[1607] = "ER_CANT_CREATE_SROUTINE", E[1608] = "ER_NEVER_USED", E[1609] = "ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT", E[1610] = "ER_REPLICA_CORRUPT_EVENT", E[1611] = "ER_LOAD_DATA_INVALID_COLUMN", E[1612] = "ER_LOG_PURGE_NO_FILE", E[1613] = "ER_XA_RBTIMEOUT", E[1614] = "ER_XA_RBDEADLOCK", E[1615] = "ER_NEED_REPREPARE", E[1616] = "ER_DELAYED_NOT_SUPPORTED", E[1617] = "WARN_NO_CONNECTION_METADATA", E[1618] = "WARN_OPTION_IGNORED", E[1619] = "ER_PLUGIN_DELETE_BUILTIN", E[1620] = "WARN_PLUGIN_BUSY", E[1621] = "ER_VARIABLE_IS_READONLY", E[1622] = "ER_WARN_ENGINE_TRANSACTION_ROLLBACK", E[1623] = "ER_SLAVE_HEARTBEAT_FAILURE", E[1624] = "ER_REPLICA_HEARTBEAT_VALUE_OUT_OF_RANGE", E[1625] = "ER_NDB_REPLICATION_SCHEMA_ERROR", E[1626] = "ER_CONFLICT_FN_PARSE_ERROR", E[1627] = "ER_EXCEPTIONS_WRITE_ERROR", E[1628] = "ER_TOO_LONG_TABLE_COMMENT", E[1629] = "ER_TOO_LONG_FIELD_COMMENT", E[1630] = "ER_FUNC_INEXISTENT_NAME_COLLISION", E[1631] = "ER_DATABASE_NAME", E[1632] = "ER_TABLE_NAME", E[1633] = "ER_PARTITION_NAME", E[1634] = "ER_SUBPARTITION_NAME", E[1635] = "ER_TEMPORARY_NAME", E[1636] = "ER_RENAMED_NAME", E[1637] = "ER_TOO_MANY_CONCURRENT_TRXS", E[1638] = "WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED", E[1639] = "ER_DEBUG_SYNC_TIMEOUT", E[1640] = "ER_DEBUG_SYNC_HIT_LIMIT", E[1641] = "ER_DUP_SIGNAL_SET", E[1642] = "ER_SIGNAL_WARN", E[1643] = "ER_SIGNAL_NOT_FOUND", E[1644] = "ER_SIGNAL_EXCEPTION", E[1645] = "ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER", E[1646] = "ER_SIGNAL_BAD_CONDITION_TYPE", E[1647] = "WARN_COND_ITEM_TRUNCATED", E[1648] = "ER_COND_ITEM_TOO_LONG", E[1649] = "ER_UNKNOWN_LOCALE", E[1650] = "ER_REPLICA_IGNORE_SERVER_IDS", E[1651] = "ER_QUERY_CACHE_DISABLED", E[1652] = "ER_SAME_NAME_PARTITION_FIELD", E[1653] = "ER_PARTITION_COLUMN_LIST_ERROR", E[1654] = "ER_WRONG_TYPE_COLUMN_VALUE_ERROR", E[1655] = "ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR", E[1656] = "ER_MAXVALUE_IN_VALUES_IN", E[1657] = "ER_TOO_MANY_VALUES_ERROR", E[1658] = "ER_ROW_SINGLE_PARTITION_FIELD_ERROR", E[1659] = "ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD", E[1660] = "ER_PARTITION_FIELDS_TOO_LONG", E[1661] = "ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE", E[1662] = "ER_BINLOG_ROW_MODE_AND_STMT_ENGINE", E[1663] = "ER_BINLOG_UNSAFE_AND_STMT_ENGINE", E[1664] = "ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE", E[1665] = "ER_BINLOG_STMT_MODE_AND_ROW_ENGINE", E[1666] = "ER_BINLOG_ROW_INJECTION_AND_STMT_MODE", E[1667] = "ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE", E[1668] = "ER_BINLOG_UNSAFE_LIMIT", E[1669] = "ER_UNUSED4", E[1670] = "ER_BINLOG_UNSAFE_SYSTEM_TABLE", E[1671] = "ER_BINLOG_UNSAFE_AUTOINC_COLUMNS", E[1672] = "ER_BINLOG_UNSAFE_UDF", E[1673] = "ER_BINLOG_UNSAFE_SYSTEM_VARIABLE", E[1674] = "ER_BINLOG_UNSAFE_SYSTEM_FUNCTION", E[1675] = "ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS", E[1676] = "ER_MESSAGE_AND_STATEMENT", E[1677] = "ER_SLAVE_CONVERSION_FAILED", E[1678] = "ER_REPLICA_CANT_CREATE_CONVERSION", E[1679] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT", E[1680] = "ER_PATH_LENGTH", E[1681] = "ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT", E[1682] = "ER_WRONG_NATIVE_TABLE_STRUCTURE", E[1683] = "ER_WRONG_PERFSCHEMA_USAGE", E[1684] = "ER_WARN_I_S_SKIPPED_TABLE", E[1685] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT", E[1686] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT", E[1687] = "ER_SPATIAL_MUST_HAVE_GEOM_COL", E[1688] = "ER_TOO_LONG_INDEX_COMMENT", E[1689] = "ER_LOCK_ABORTED", E[1690] = "ER_DATA_OUT_OF_RANGE", E[1691] = "ER_WRONG_SPVAR_TYPE_IN_LIMIT", E[1692] = "ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE", E[1693] = "ER_BINLOG_UNSAFE_MIXED_STATEMENT", E[1694] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN", E[1695] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN", E[1696] = "ER_FAILED_READ_FROM_PAR_FILE", E[1697] = "ER_VALUES_IS_NOT_INT_TYPE_ERROR", E[1698] = "ER_ACCESS_DENIED_NO_PASSWORD_ERROR", E[1699] = "ER_SET_PASSWORD_AUTH_PLUGIN", E[1700] = "ER_GRANT_PLUGIN_USER_EXISTS", E[1701] = "ER_TRUNCATE_ILLEGAL_FK", E[1702] = "ER_PLUGIN_IS_PERMANENT", E[1703] = "ER_REPLICA_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN", E[1704] = "ER_REPLICA_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX", E[1705] = "ER_STMT_CACHE_FULL", E[1706] = "ER_MULTI_UPDATE_KEY_CONFLICT", E[1707] = "ER_TABLE_NEEDS_REBUILD", E[1708] = "WARN_OPTION_BELOW_LIMIT", E[1709] = "ER_INDEX_COLUMN_TOO_LONG", E[1710] = "ER_ERROR_IN_TRIGGER_BODY", E[1711] = "ER_ERROR_IN_UNKNOWN_TRIGGER_BODY", E[1712] = "ER_INDEX_CORRUPT", E[1713] = "ER_UNDO_RECORD_TOO_BIG", E[1714] = "ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT", E[1715] = "ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE", E[1716] = "ER_BINLOG_UNSAFE_REPLACE_SELECT", E[1717] = "ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT", E[1718] = "ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT", E[1719] = "ER_BINLOG_UNSAFE_UPDATE_IGNORE", E[1720] = "ER_PLUGIN_NO_UNINSTALL", E[1721] = "ER_PLUGIN_NO_INSTALL", E[1722] = "ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT", E[1723] = "ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC", E[1724] = "ER_BINLOG_UNSAFE_INSERT_TWO_KEYS", E[1725] = "ER_TABLE_IN_FK_CHECK", E[1726] = "ER_UNSUPPORTED_ENGINE", E[1727] = "ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST", E[1728] = "ER_CANNOT_LOAD_FROM_TABLE_V2", E[1729] = "ER_SOURCE_DELAY_VALUE_OUT_OF_RANGE", E[1730] = "ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT", E[1731] = "ER_PARTITION_EXCHANGE_DIFFERENT_OPTION", E[1732] = "ER_PARTITION_EXCHANGE_PART_TABLE", E[1733] = "ER_PARTITION_EXCHANGE_TEMP_TABLE", E[1734] = "ER_PARTITION_INSTEAD_OF_SUBPARTITION", E[1735] = "ER_UNKNOWN_PARTITION", E[1736] = "ER_TABLES_DIFFERENT_METADATA", E[1737] = "ER_ROW_DOES_NOT_MATCH_PARTITION", E[1738] = "ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX", E[1739] = "ER_WARN_INDEX_NOT_APPLICABLE", E[1740] = "ER_PARTITION_EXCHANGE_FOREIGN_KEY", E[1741] = "ER_NO_SUCH_KEY_VALUE", E[1742] = "ER_RPL_INFO_DATA_TOO_LONG", E[1743] = "ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE", E[1744] = "ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE", E[1745] = "ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX", E[1746] = "ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT", E[1747] = "ER_PARTITION_CLAUSE_ON_NONPARTITIONED", E[1748] = "ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET", E[1749] = "ER_NO_SUCH_PARTITION", E[1750] = "ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE", E[1751] = "ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE", E[1752] = "ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE", E[1753] = "ER_MTA_FEATURE_IS_NOT_SUPPORTED", E[1754] = "ER_MTA_UPDATED_DBS_GREATER_MAX", E[1755] = "ER_MTA_CANT_PARALLEL", E[1756] = "ER_MTA_INCONSISTENT_DATA", E[1757] = "ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING", E[1758] = "ER_DA_INVALID_CONDITION_NUMBER", E[1759] = "ER_INSECURE_PLAIN_TEXT", E[1760] = "ER_INSECURE_CHANGE_SOURCE", E[1761] = "ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO", E[1762] = "ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO", E[1763] = "ER_SQLTHREAD_WITH_SECURE_REPLICA", E[1764] = "ER_TABLE_HAS_NO_FT", E[1765] = "ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER", E[1766] = "ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION", E[1767] = "ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST", E[1768] = "ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION", E[1769] = "ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION", E[1770] = "ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL", E[1771] = "ER_SKIPPING_LOGGED_TRANSACTION", E[1772] = "ER_MALFORMED_GTID_SET_SPECIFICATION", E[1773] = "ER_MALFORMED_GTID_SET_ENCODING", E[1774] = "ER_MALFORMED_GTID_SPECIFICATION", E[1775] = "ER_GNO_EXHAUSTED", E[1776] = "ER_BAD_REPLICA_AUTO_POSITION", E[1777] = "ER_AUTO_POSITION_REQUIRES_GTID_MODE_NOT_OFF", E[1778] = "ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET", E[1779] = "ER_GTID_MODE_ON_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON", E[1780] = "ER_GTID_MODE_REQUIRES_BINLOG", E[1781] = "ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF", E[1782] = "ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON", E[1783] = "ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF", E[1784] = "ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF", E[1785] = "ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE", E[1786] = "ER_GTID_UNSAFE_CREATE_SELECT", E[1787] = "ER_GTID_UNSAFE_CREATE_DROP_TEMP_TABLE_IN_TRANSACTION", E[1788] = "ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME", E[1789] = "ER_SOURCE_HAS_PURGED_REQUIRED_GTIDS", E[1790] = "ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID", E[1791] = "ER_UNKNOWN_EXPLAIN_FORMAT", E[1792] = "ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION", E[1793] = "ER_TOO_LONG_TABLE_PARTITION_COMMENT", E[1794] = "ER_REPLICA_CONFIGURATION", E[1795] = "ER_INNODB_FT_LIMIT", E[1796] = "ER_INNODB_NO_FT_TEMP_TABLE", E[1797] = "ER_INNODB_FT_WRONG_DOCID_COLUMN", E[1798] = "ER_INNODB_FT_WRONG_DOCID_INDEX", E[1799] = "ER_INNODB_ONLINE_LOG_TOO_BIG", E[1800] = "ER_UNKNOWN_ALTER_ALGORITHM", E[1801] = "ER_UNKNOWN_ALTER_LOCK", E[1802] = "ER_MTA_CHANGE_SOURCE_CANT_RUN_WITH_GAPS", E[1803] = "ER_MTA_RECOVERY_FAILURE", E[1804] = "ER_MTA_RESET_WORKERS", E[1805] = "ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2", E[1806] = "ER_REPLICA_SILENT_RETRY_TRANSACTION", E[1807] = "ER_DISCARD_FK_CHECKS_RUNNING", E[1808] = "ER_TABLE_SCHEMA_MISMATCH", E[1809] = "ER_TABLE_IN_SYSTEM_TABLESPACE", E[1810] = "ER_IO_READ_ERROR", E[1811] = "ER_IO_WRITE_ERROR", E[1812] = "ER_TABLESPACE_MISSING", E[1813] = "ER_TABLESPACE_EXISTS", E[1814] = "ER_TABLESPACE_DISCARDED", E[1815] = "ER_INTERNAL_ERROR", E[1816] = "ER_INNODB_IMPORT_ERROR", E[1817] = "ER_INNODB_INDEX_CORRUPT", E[1818] = "ER_INVALID_YEAR_COLUMN_LENGTH", E[1819] = "ER_NOT_VALID_PASSWORD", E[1820] = "ER_MUST_CHANGE_PASSWORD", E[1821] = "ER_FK_NO_INDEX_CHILD", E[1822] = "ER_FK_NO_INDEX_PARENT", E[1823] = "ER_FK_FAIL_ADD_SYSTEM", E[1824] = "ER_FK_CANNOT_OPEN_PARENT", E[1825] = "ER_FK_INCORRECT_OPTION", E[1826] = "ER_FK_DUP_NAME", E[1827] = "ER_PASSWORD_FORMAT", E[1828] = "ER_FK_COLUMN_CANNOT_DROP", E[1829] = "ER_FK_COLUMN_CANNOT_DROP_CHILD", E[1830] = "ER_FK_COLUMN_NOT_NULL", E[1831] = "ER_DUP_INDEX", E[1832] = "ER_FK_COLUMN_CANNOT_CHANGE", E[1833] = "ER_FK_COLUMN_CANNOT_CHANGE_CHILD", E[1834] = "ER_UNUSED5", E[1835] = "ER_MALFORMED_PACKET", E[1836] = "ER_READ_ONLY_MODE", E[1837] = "ER_GTID_NEXT_TYPE_UNDEFINED_GTID", E[1838] = "ER_VARIABLE_NOT_SETTABLE_IN_SP", E[1839] = "ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF", E[1840] = "ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY", E[1841] = "ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY", E[1842] = "ER_GTID_PURGED_WAS_CHANGED", E[1843] = "ER_GTID_EXECUTED_WAS_CHANGED", E[1844] = "ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES", E[1845] = "ER_ALTER_OPERATION_NOT_SUPPORTED", E[1846] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON", E[1847] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY", E[1848] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION", E[1849] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME", E[1850] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE", E[1851] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK", E[1852] = "ER_UNUSED6", E[1853] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK", E[1854] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC", E[1855] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS", E[1856] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS", E[1857] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS", E[1858] = "ER_SQL_REPLICA_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE", E[1859] = "ER_DUP_UNKNOWN_IN_INDEX", E[1860] = "ER_IDENT_CAUSES_TOO_LONG_PATH", E[1861] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL", E[1862] = "ER_MUST_CHANGE_PASSWORD_LOGIN", E[1863] = "ER_ROW_IN_WRONG_PARTITION", E[1864] = "ER_MTA_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX", E[1865] = "ER_INNODB_NO_FT_USES_PARSER", E[1866] = "ER_BINLOG_LOGICAL_CORRUPTION", E[1867] = "ER_WARN_PURGE_LOG_IN_USE", E[1868] = "ER_WARN_PURGE_LOG_IS_ACTIVE", E[1869] = "ER_AUTO_INCREMENT_CONFLICT", E[1870] = "WARN_ON_BLOCKHOLE_IN_RBR", E[1871] = "ER_REPLICA_CM_INIT_REPOSITORY", E[1872] = "ER_REPLICA_AM_INIT_REPOSITORY", E[1873] = "ER_ACCESS_DENIED_CHANGE_USER_ERROR", E[1874] = "ER_INNODB_READ_ONLY", E[1875] = "ER_STOP_REPLICA_SQL_THREAD_TIMEOUT", E[1876] = "ER_STOP_REPLICA_IO_THREAD_TIMEOUT", E[1877] = "ER_TABLE_CORRUPT", E[1878] = "ER_TEMP_FILE_WRITE_FAILURE", E[1879] = "ER_INNODB_FT_AUX_NOT_HEX_ID", E[1880] = "ER_OLD_TEMPORALS_UPGRADED", E[1881] = "ER_INNODB_FORCED_RECOVERY", E[1882] = "ER_AES_INVALID_IV", E[1883] = "ER_PLUGIN_CANNOT_BE_UNINSTALLED", E[1884] = "ER_GTID_UNSAFE_BINLOG_SPLITTABLE_STATEMENT_AND_ASSIGNED_GTID", E[1885] = "ER_REPLICA_HAS_MORE_GTIDS_THAN_SOURCE", E[1886] = "ER_MISSING_KEY", E[1887] = "WARN_NAMED_PIPE_ACCESS_EVERYONE", E[3e3] = "ER_FILE_CORRUPT", E[3001] = "ER_ERROR_ON_SOURCE", E[3002] = "ER_INCONSISTENT_ERROR", E[3003] = "ER_STORAGE_ENGINE_NOT_LOADED", E[3004] = "ER_GET_STACKED_DA_WITHOUT_ACTIVE_HANDLER", E[3005] = "ER_WARN_LEGACY_SYNTAX_CONVERTED", E[3006] = "ER_BINLOG_UNSAFE_FULLTEXT_PLUGIN", E[3007] = "ER_CANNOT_DISCARD_TEMPORARY_TABLE", E[3008] = "ER_FK_DEPTH_EXCEEDED", E[3009] = "ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE_V2", E[3010] = "ER_WARN_TRIGGER_DOESNT_HAVE_CREATED", E[3011] = "ER_REFERENCED_TRG_DOES_NOT_EXIST", E[3012] = "ER_EXPLAIN_NOT_SUPPORTED", E[3013] = "ER_INVALID_FIELD_SIZE", E[3014] = "ER_MISSING_HA_CREATE_OPTION", E[3015] = "ER_ENGINE_OUT_OF_MEMORY", E[3016] = "ER_PASSWORD_EXPIRE_ANONYMOUS_USER", E[3017] = "ER_REPLICA_SQL_THREAD_MUST_STOP", E[3018] = "ER_NO_FT_MATERIALIZED_SUBQUERY", E[3019] = "ER_INNODB_UNDO_LOG_FULL", E[3020] = "ER_INVALID_ARGUMENT_FOR_LOGARITHM", E[3021] = "ER_REPLICA_CHANNEL_IO_THREAD_MUST_STOP", E[3022] = "ER_WARN_OPEN_TEMP_TABLES_MUST_BE_ZERO", E[3023] = "ER_WARN_ONLY_SOURCE_LOG_FILE_NO_POS", E[3024] = "ER_QUERY_TIMEOUT", E[3025] = "ER_NON_RO_SELECT_DISABLE_TIMER", E[3026] = "ER_DUP_LIST_ENTRY", E[3027] = "ER_SQL_MODE_NO_EFFECT", E[3028] = "ER_AGGREGATE_ORDER_FOR_UNION", E[3029] = "ER_AGGREGATE_ORDER_NON_AGG_QUERY", E[3030] = "ER_REPLICA_WORKER_STOPPED_PREVIOUS_THD_ERROR", E[3031] = "ER_DONT_SUPPORT_REPLICA_PRESERVE_COMMIT_ORDER", E[3032] = "ER_SERVER_OFFLINE_MODE", E[3033] = "ER_GIS_DIFFERENT_SRIDS", E[3034] = "ER_GIS_UNSUPPORTED_ARGUMENT", E[3035] = "ER_GIS_UNKNOWN_ERROR", E[3036] = "ER_GIS_UNKNOWN_EXCEPTION", E[3037] = "ER_GIS_INVALID_DATA", E[3038] = "ER_BOOST_GEOMETRY_EMPTY_INPUT_EXCEPTION", E[3039] = "ER_BOOST_GEOMETRY_CENTROID_EXCEPTION", E[3040] = "ER_BOOST_GEOMETRY_OVERLAY_INVALID_INPUT_EXCEPTION", E[3041] = "ER_BOOST_GEOMETRY_TURN_INFO_EXCEPTION", E[3042] = "ER_BOOST_GEOMETRY_SELF_INTERSECTION_POINT_EXCEPTION", E[3043] = "ER_BOOST_GEOMETRY_UNKNOWN_EXCEPTION", E[3044] = "ER_STD_BAD_ALLOC_ERROR", E[3045] = "ER_STD_DOMAIN_ERROR", E[3046] = "ER_STD_LENGTH_ERROR", E[3047] = "ER_STD_INVALID_ARGUMENT", E[3048] = "ER_STD_OUT_OF_RANGE_ERROR", E[3049] = "ER_STD_OVERFLOW_ERROR", E[3050] = "ER_STD_RANGE_ERROR", E[3051] = "ER_STD_UNDERFLOW_ERROR", E[3052] = "ER_STD_LOGIC_ERROR", E[3053] = "ER_STD_RUNTIME_ERROR", E[3054] = "ER_STD_UNKNOWN_EXCEPTION", E[3055] = "ER_GIS_DATA_WRONG_ENDIANESS", E[3056] = "ER_CHANGE_SOURCE_PASSWORD_LENGTH", E[3057] = "ER_USER_LOCK_WRONG_NAME", E[3058] = "ER_USER_LOCK_DEADLOCK", E[3059] = "ER_REPLACE_INACCESSIBLE_ROWS", E[3060] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_GIS", E[3061] = "ER_ILLEGAL_USER_VAR", E[3062] = "ER_GTID_MODE_OFF", E[3063] = "ER_UNSUPPORTED_BY_REPLICATION_THREAD", E[3064] = "ER_INCORRECT_TYPE", E[3065] = "ER_FIELD_IN_ORDER_NOT_SELECT", E[3066] = "ER_AGGREGATE_IN_ORDER_NOT_SELECT", E[3067] = "ER_INVALID_RPL_WILD_TABLE_FILTER_PATTERN", E[3068] = "ER_NET_OK_PACKET_TOO_LARGE", E[3069] = "ER_INVALID_JSON_DATA", E[3070] = "ER_INVALID_GEOJSON_MISSING_MEMBER", E[3071] = "ER_INVALID_GEOJSON_WRONG_TYPE", E[3072] = "ER_INVALID_GEOJSON_UNSPECIFIED", E[3073] = "ER_DIMENSION_UNSUPPORTED", E[3074] = "ER_REPLICA_CHANNEL_DOES_NOT_EXIST", E[3075] = "ER_SLAVE_MULTIPLE_CHANNELS_HOST_PORT", E[3076] = "ER_REPLICA_CHANNEL_NAME_INVALID_OR_TOO_LONG", E[3077] = "ER_REPLICA_NEW_CHANNEL_WRONG_REPOSITORY", E[3078] = "ER_SLAVE_CHANNEL_DELETE", E[3079] = "ER_REPLICA_MULTIPLE_CHANNELS_CMD", E[3080] = "ER_REPLICA_MAX_CHANNELS_EXCEEDED", E[3081] = "ER_REPLICA_CHANNEL_MUST_STOP", E[3082] = "ER_REPLICA_CHANNEL_NOT_RUNNING", E[3083] = "ER_REPLICA_CHANNEL_WAS_RUNNING", E[3084] = "ER_REPLICA_CHANNEL_WAS_NOT_RUNNING", E[3085] = "ER_REPLICA_CHANNEL_SQL_THREAD_MUST_STOP", E[3086] = "ER_REPLICA_CHANNEL_SQL_SKIP_COUNTER", E[3087] = "ER_WRONG_FIELD_WITH_GROUP_V2", E[3088] = "ER_MIX_OF_GROUP_FUNC_AND_FIELDS_V2", E[3089] = "ER_WARN_DEPRECATED_SYSVAR_UPDATE", E[3090] = "ER_WARN_DEPRECATED_SQLMODE", E[3091] = "ER_CANNOT_LOG_PARTIAL_DROP_DATABASE_WITH_GTID", E[3092] = "ER_GROUP_REPLICATION_CONFIGURATION", E[3093] = "ER_GROUP_REPLICATION_RUNNING", E[3094] = "ER_GROUP_REPLICATION_APPLIER_INIT_ERROR", E[3095] = "ER_GROUP_REPLICATION_STOP_APPLIER_THREAD_TIMEOUT", E[3096] = "ER_GROUP_REPLICATION_COMMUNICATION_LAYER_SESSION_ERROR", E[3097] = "ER_GROUP_REPLICATION_COMMUNICATION_LAYER_JOIN_ERROR", E[3098] = "ER_BEFORE_DML_VALIDATION_ERROR", E[3099] = "ER_PREVENTS_VARIABLE_WITHOUT_RBR", E[3100] = "ER_RUN_HOOK_ERROR", E[3101] = "ER_TRANSACTION_ROLLBACK_DURING_COMMIT", E[3102] = "ER_GENERATED_COLUMN_FUNCTION_IS_NOT_ALLOWED", E[3103] = "ER_UNSUPPORTED_ALTER_INPLACE_ON_VIRTUAL_COLUMN", E[3104] = "ER_WRONG_FK_OPTION_FOR_GENERATED_COLUMN", E[3105] = "ER_NON_DEFAULT_VALUE_FOR_GENERATED_COLUMN", E[3106] = "ER_UNSUPPORTED_ACTION_ON_GENERATED_COLUMN", E[3107] = "ER_GENERATED_COLUMN_NON_PRIOR", E[3108] = "ER_DEPENDENT_BY_GENERATED_COLUMN", E[3109] = "ER_GENERATED_COLUMN_REF_AUTO_INC", E[3110] = "ER_FEATURE_NOT_AVAILABLE", E[3111] = "ER_CANT_SET_GTID_MODE", E[3112] = "ER_CANT_USE_AUTO_POSITION_WITH_GTID_MODE_OFF", E[3113] = "ER_CANT_REPLICATE_ANONYMOUS_WITH_AUTO_POSITION", E[3114] = "ER_CANT_REPLICATE_ANONYMOUS_WITH_GTID_MODE_ON", E[3115] = "ER_CANT_REPLICATE_GTID_WITH_GTID_MODE_OFF", E[3116] = "ER_CANT_ENFORCE_GTID_CONSISTENCY_WITH_ONGOING_GTID_VIOLATING_TX", E[3117] = "ER_ENFORCE_GTID_CONSISTENCY_WARN_WITH_ONGOING_GTID_VIOLATING_TX", E[3118] = "ER_ACCOUNT_HAS_BEEN_LOCKED", E[3119] = "ER_WRONG_TABLESPACE_NAME", E[3120] = "ER_TABLESPACE_IS_NOT_EMPTY", E[3121] = "ER_WRONG_FILE_NAME", E[3122] = "ER_BOOST_GEOMETRY_INCONSISTENT_TURNS_EXCEPTION", E[3123] = "ER_WARN_OPTIMIZER_HINT_SYNTAX_ERROR", E[3124] = "ER_WARN_BAD_MAX_EXECUTION_TIME", E[3125] = "ER_WARN_UNSUPPORTED_MAX_EXECUTION_TIME", E[3126] = "ER_WARN_CONFLICTING_HINT", E[3127] = "ER_WARN_UNKNOWN_QB_NAME", E[3128] = "ER_UNRESOLVED_HINT_NAME", E[3129] = "ER_WARN_ON_MODIFYING_GTID_EXECUTED_TABLE", E[3130] = "ER_PLUGGABLE_PROTOCOL_COMMAND_NOT_SUPPORTED", E[3131] = "ER_LOCKING_SERVICE_WRONG_NAME", E[3132] = "ER_LOCKING_SERVICE_DEADLOCK", E[3133] = "ER_LOCKING_SERVICE_TIMEOUT", E[3134] = "ER_GIS_MAX_POINTS_IN_GEOMETRY_OVERFLOWED", E[3135] = "ER_SQL_MODE_MERGED", E[3136] = "ER_VTOKEN_PLUGIN_TOKEN_MISMATCH", E[3137] = "ER_VTOKEN_PLUGIN_TOKEN_NOT_FOUND", E[3138] = "ER_CANT_SET_VARIABLE_WHEN_OWNING_GTID", E[3139] = "ER_REPLICA_CHANNEL_OPERATION_NOT_ALLOWED", E[3140] = "ER_INVALID_JSON_TEXT", E[3141] = "ER_INVALID_JSON_TEXT_IN_PARAM", E[3142] = "ER_INVALID_JSON_BINARY_DATA", E[3143] = "ER_INVALID_JSON_PATH", E[3144] = "ER_INVALID_JSON_CHARSET", E[3145] = "ER_INVALID_JSON_CHARSET_IN_FUNCTION", E[3146] = "ER_INVALID_TYPE_FOR_JSON", E[3147] = "ER_INVALID_CAST_TO_JSON", E[3148] = "ER_INVALID_JSON_PATH_CHARSET", E[3149] = "ER_INVALID_JSON_PATH_WILDCARD", E[3150] = "ER_JSON_VALUE_TOO_BIG", E[3151] = "ER_JSON_KEY_TOO_BIG", E[3152] = "ER_JSON_USED_AS_KEY", E[3153] = "ER_JSON_VACUOUS_PATH", E[3154] = "ER_JSON_BAD_ONE_OR_ALL_ARG", E[3155] = "ER_NUMERIC_JSON_VALUE_OUT_OF_RANGE", E[3156] = "ER_INVALID_JSON_VALUE_FOR_CAST", E[3157] = "ER_JSON_DOCUMENT_TOO_DEEP", E[3158] = "ER_JSON_DOCUMENT_NULL_KEY", E[3159] = "ER_SECURE_TRANSPORT_REQUIRED", E[3160] = "ER_NO_SECURE_TRANSPORTS_CONFIGURED", E[3161] = "ER_DISABLED_STORAGE_ENGINE", E[3162] = "ER_USER_DOES_NOT_EXIST", E[3163] = "ER_USER_ALREADY_EXISTS", E[3164] = "ER_AUDIT_API_ABORT", E[3165] = "ER_INVALID_JSON_PATH_ARRAY_CELL", E[3166] = "ER_BUFPOOL_RESIZE_INPROGRESS", E[3167] = "ER_FEATURE_DISABLED_SEE_DOC", E[3168] = "ER_SERVER_ISNT_AVAILABLE", E[3169] = "ER_SESSION_WAS_KILLED", E[3170] = "ER_CAPACITY_EXCEEDED", E[3171] = "ER_CAPACITY_EXCEEDED_IN_RANGE_OPTIMIZER", E[3172] = "ER_TABLE_NEEDS_UPG_PART", E[3173] = "ER_CANT_WAIT_FOR_EXECUTED_GTID_SET_WHILE_OWNING_A_GTID", E[3174] = "ER_CANNOT_ADD_FOREIGN_BASE_COL_VIRTUAL", E[3175] = "ER_CANNOT_CREATE_VIRTUAL_INDEX_CONSTRAINT", E[3176] = "ER_ERROR_ON_MODIFYING_GTID_EXECUTED_TABLE", E[3177] = "ER_LOCK_REFUSED_BY_ENGINE", E[3178] = "ER_UNSUPPORTED_ALTER_ONLINE_ON_VIRTUAL_COLUMN", E[3179] = "ER_MASTER_KEY_ROTATION_NOT_SUPPORTED_BY_SE", E[3180] = "ER_MASTER_KEY_ROTATION_ERROR_BY_SE", E[3181] = "ER_MASTER_KEY_ROTATION_BINLOG_FAILED", E[3182] = "ER_MASTER_KEY_ROTATION_SE_UNAVAILABLE", E[3183] = "ER_TABLESPACE_CANNOT_ENCRYPT", E[3184] = "ER_INVALID_ENCRYPTION_OPTION", E[3185] = "ER_CANNOT_FIND_KEY_IN_KEYRING", E[3186] = "ER_CAPACITY_EXCEEDED_IN_PARSER", E[3187] = "ER_UNSUPPORTED_ALTER_ENCRYPTION_INPLACE", E[3188] = "ER_KEYRING_UDF_KEYRING_SERVICE_ERROR", E[3189] = "ER_USER_COLUMN_OLD_LENGTH", E[3190] = "ER_CANT_RESET_SOURCE", E[3191] = "ER_GROUP_REPLICATION_MAX_GROUP_SIZE", E[3192] = "ER_CANNOT_ADD_FOREIGN_BASE_COL_STORED", E[3193] = "ER_TABLE_REFERENCED", E[3194] = "ER_PARTITION_ENGINE_DEPRECATED_FOR_TABLE", E[3195] = "ER_WARN_USING_GEOMFROMWKB_TO_SET_SRID_ZERO", E[3196] = "ER_WARN_USING_GEOMFROMWKB_TO_SET_SRID", E[3197] = "ER_XA_RETRY", E[3198] = "ER_KEYRING_AWS_UDF_AWS_KMS_ERROR", E[3199] = "ER_BINLOG_UNSAFE_XA", E[3200] = "ER_UDF_ERROR", E[3201] = "ER_KEYRING_MIGRATION_FAILURE", E[3202] = "ER_KEYRING_ACCESS_DENIED_ERROR", E[3203] = "ER_KEYRING_MIGRATION_STATUS", E[3204] = "ER_PLUGIN_FAILED_TO_OPEN_TABLES", E[3205] = "ER_PLUGIN_FAILED_TO_OPEN_TABLE", E[3206] = "ER_AUDIT_LOG_NO_KEYRING_PLUGIN_INSTALLED", E[3207] = "ER_AUDIT_LOG_ENCRYPTION_PASSWORD_HAS_NOT_BEEN_SET", E[3208] = "ER_AUDIT_LOG_COULD_NOT_CREATE_AES_KEY", E[3209] = "ER_AUDIT_LOG_ENCRYPTION_PASSWORD_CANNOT_BE_FETCHED", E[3210] = "ER_AUDIT_LOG_JSON_FILTERING_NOT_ENABLED", E[3211] = "ER_AUDIT_LOG_UDF_INSUFFICIENT_PRIVILEGE", E[3212] = "ER_AUDIT_LOG_SUPER_PRIVILEGE_REQUIRED", E[3213] = "ER_COULD_NOT_REINITIALIZE_AUDIT_LOG_FILTERS", E[3214] = "ER_AUDIT_LOG_UDF_INVALID_ARGUMENT_TYPE", E[3215] = "ER_AUDIT_LOG_UDF_INVALID_ARGUMENT_COUNT", E[3216] = "ER_AUDIT_LOG_HAS_NOT_BEEN_INSTALLED", E[3217] = "ER_AUDIT_LOG_UDF_READ_INVALID_MAX_ARRAY_LENGTH_ARG_TYPE", E[3218] = "ER_AUDIT_LOG_UDF_READ_INVALID_MAX_ARRAY_LENGTH_ARG_VALUE", E[3219] = "ER_AUDIT_LOG_JSON_FILTER_PARSING_ERROR", E[3220] = "ER_AUDIT_LOG_JSON_FILTER_NAME_CANNOT_BE_EMPTY", E[3221] = "ER_AUDIT_LOG_JSON_USER_NAME_CANNOT_BE_EMPTY", E[3222] = "ER_AUDIT_LOG_JSON_FILTER_DOES_NOT_EXISTS", E[3223] = "ER_AUDIT_LOG_USER_FIRST_CHARACTER_MUST_BE_ALPHANUMERIC", E[3224] = "ER_AUDIT_LOG_USER_NAME_INVALID_CHARACTER", E[3225] = "ER_AUDIT_LOG_HOST_NAME_INVALID_CHARACTER", E[3226] = "WARN_DEPRECATED_MAXDB_SQL_MODE_FOR_TIMESTAMP", E[3227] = "ER_XA_REPLICATION_FILTERS", E[3228] = "ER_CANT_OPEN_ERROR_LOG", E[3229] = "ER_GROUPING_ON_TIMESTAMP_IN_DST", E[3230] = "ER_CANT_START_SERVER_NAMED_PIPE", E[3231] = "ER_WRITE_SET_EXCEEDS_LIMIT", E[3232] = "ER_DEPRECATED_TLS_VERSION_SESSION_57", E[3233] = "ER_WARN_DEPRECATED_TLS_VERSION_57", E[3234] = "ER_WARN_WRONG_NATIVE_TABLE_STRUCTURE", E[3235] = "ER_AES_INVALID_KDF_NAME", E[3236] = "ER_AES_INVALID_KDF_ITERATIONS", E[3237] = "WARN_AES_KEY_SIZE", E[3238] = "ER_AES_INVALID_KDF_OPTION_SIZE", E[3500] = "ER_UNSUPPORT_COMPRESSED_TEMPORARY_TABLE", E[3501] = "ER_ACL_OPERATION_FAILED", E[3502] = "ER_UNSUPPORTED_INDEX_ALGORITHM", E[3503] = "ER_NO_SUCH_DB", E[3504] = "ER_TOO_BIG_ENUM", E[3505] = "ER_TOO_LONG_SET_ENUM_VALUE", E[3506] = "ER_INVALID_DD_OBJECT", E[3507] = "ER_UPDATING_DD_TABLE", E[3508] = "ER_INVALID_DD_OBJECT_ID", E[3509] = "ER_INVALID_DD_OBJECT_NAME", E[3510] = "ER_TABLESPACE_MISSING_WITH_NAME", E[3511] = "ER_TOO_LONG_ROUTINE_COMMENT", E[3512] = "ER_SP_LOAD_FAILED", E[3513] = "ER_INVALID_BITWISE_OPERANDS_SIZE", E[3514] = "ER_INVALID_BITWISE_AGGREGATE_OPERANDS_SIZE", E[3515] = "ER_WARN_UNSUPPORTED_HINT", E[3516] = "ER_UNEXPECTED_GEOMETRY_TYPE", E[3517] = "ER_SRS_PARSE_ERROR", E[3518] = "ER_SRS_PROJ_PARAMETER_MISSING", E[3519] = "ER_WARN_SRS_NOT_FOUND", E[3520] = "ER_SRS_NOT_CARTESIAN", E[3521] = "ER_SRS_NOT_CARTESIAN_UNDEFINED", E[3522] = "ER_PK_INDEX_CANT_BE_INVISIBLE", E[3523] = "ER_UNKNOWN_AUTHID", E[3524] = "ER_FAILED_ROLE_GRANT", E[3525] = "ER_OPEN_ROLE_TABLES", E[3526] = "ER_FAILED_DEFAULT_ROLES", E[3527] = "ER_COMPONENTS_NO_SCHEME", E[3528] = "ER_COMPONENTS_NO_SCHEME_SERVICE", E[3529] = "ER_COMPONENTS_CANT_LOAD", E[3530] = "ER_ROLE_NOT_GRANTED", E[3531] = "ER_FAILED_REVOKE_ROLE", E[3532] = "ER_RENAME_ROLE", E[3533] = "ER_COMPONENTS_CANT_ACQUIRE_SERVICE_IMPLEMENTATION", E[3534] = "ER_COMPONENTS_CANT_SATISFY_DEPENDENCY", E[3535] = "ER_COMPONENTS_LOAD_CANT_REGISTER_SERVICE_IMPLEMENTATION", E[3536] = "ER_COMPONENTS_LOAD_CANT_INITIALIZE", E[3537] = "ER_COMPONENTS_UNLOAD_NOT_LOADED", E[3538] = "ER_COMPONENTS_UNLOAD_CANT_DEINITIALIZE", E[3539] = "ER_COMPONENTS_CANT_RELEASE_SERVICE", E[3540] = "ER_COMPONENTS_UNLOAD_CANT_UNREGISTER_SERVICE", E[3541] = "ER_COMPONENTS_CANT_UNLOAD", E[3542] = "ER_WARN_UNLOAD_THE_NOT_PERSISTED", E[3543] = "ER_COMPONENT_TABLE_INCORRECT", E[3544] = "ER_COMPONENT_MANIPULATE_ROW_FAILED", E[3545] = "ER_COMPONENTS_UNLOAD_DUPLICATE_IN_GROUP", E[3546] = "ER_CANT_SET_GTID_PURGED_DUE_SETS_CONSTRAINTS", E[3547] = "ER_CANNOT_LOCK_USER_MANAGEMENT_CACHES", E[3548] = "ER_SRS_NOT_FOUND", E[3549] = "ER_VARIABLE_NOT_PERSISTED", E[3550] = "ER_IS_QUERY_INVALID_CLAUSE", E[3551] = "ER_UNABLE_TO_STORE_STATISTICS", E[3552] = "ER_NO_SYSTEM_SCHEMA_ACCESS", E[3553] = "ER_NO_SYSTEM_TABLESPACE_ACCESS", E[3554] = "ER_NO_SYSTEM_TABLE_ACCESS", E[3555] = "ER_NO_SYSTEM_TABLE_ACCESS_FOR_DICTIONARY_TABLE", E[3556] = "ER_NO_SYSTEM_TABLE_ACCESS_FOR_SYSTEM_TABLE", E[3557] = "ER_NO_SYSTEM_TABLE_ACCESS_FOR_TABLE", E[3558] = "ER_INVALID_OPTION_KEY", E[3559] = "ER_INVALID_OPTION_VALUE", E[3560] = "ER_INVALID_OPTION_KEY_VALUE_PAIR", E[3561] = "ER_INVALID_OPTION_START_CHARACTER", E[3562] = "ER_INVALID_OPTION_END_CHARACTER", E[3563] = "ER_INVALID_OPTION_CHARACTERS", E[3564] = "ER_DUPLICATE_OPTION_KEY", E[3565] = "ER_WARN_SRS_NOT_FOUND_AXIS_ORDER", E[3566] = "ER_NO_ACCESS_TO_NATIVE_FCT", E[3567] = "ER_RESET_SOURCE_TO_VALUE_OUT_OF_RANGE", E[3568] = "ER_UNRESOLVED_TABLE_LOCK", E[3569] = "ER_DUPLICATE_TABLE_LOCK", E[3570] = "ER_BINLOG_UNSAFE_SKIP_LOCKED", E[3571] = "ER_BINLOG_UNSAFE_NOWAIT", E[3572] = "ER_LOCK_NOWAIT", E[3573] = "ER_CTE_RECURSIVE_REQUIRES_UNION", E[3574] = "ER_CTE_RECURSIVE_REQUIRES_NONRECURSIVE_FIRST", E[3575] = "ER_CTE_RECURSIVE_FORBIDS_AGGREGATION", E[3576] = "ER_CTE_RECURSIVE_FORBIDDEN_JOIN_ORDER", E[3577] = "ER_CTE_RECURSIVE_REQUIRES_SINGLE_REFERENCE", E[3578] = "ER_SWITCH_TMP_ENGINE", E[3579] = "ER_WINDOW_NO_SUCH_WINDOW", E[3580] = "ER_WINDOW_CIRCULARITY_IN_WINDOW_GRAPH", E[3581] = "ER_WINDOW_NO_CHILD_PARTITIONING", E[3582] = "ER_WINDOW_NO_INHERIT_FRAME", E[3583] = "ER_WINDOW_NO_REDEFINE_ORDER_BY", E[3584] = "ER_WINDOW_FRAME_START_ILLEGAL", E[3585] = "ER_WINDOW_FRAME_END_ILLEGAL", E[3586] = "ER_WINDOW_FRAME_ILLEGAL", E[3587] = "ER_WINDOW_RANGE_FRAME_ORDER_TYPE", E[3588] = "ER_WINDOW_RANGE_FRAME_TEMPORAL_TYPE", E[3589] = "ER_WINDOW_RANGE_FRAME_NUMERIC_TYPE", E[3590] = "ER_WINDOW_RANGE_BOUND_NOT_CONSTANT", E[3591] = "ER_WINDOW_DUPLICATE_NAME", E[3592] = "ER_WINDOW_ILLEGAL_ORDER_BY", E[3593] = "ER_WINDOW_INVALID_WINDOW_FUNC_USE", E[3594] = "ER_WINDOW_INVALID_WINDOW_FUNC_ALIAS_USE", E[3595] = "ER_WINDOW_NESTED_WINDOW_FUNC_USE_IN_WINDOW_SPEC", E[3596] = "ER_WINDOW_ROWS_INTERVAL_USE", E[3597] = "ER_WINDOW_NO_GROUP_ORDER", E[3598] = "ER_WINDOW_EXPLAIN_JSON", E[3599] = "ER_WINDOW_FUNCTION_IGNORES_FRAME", E[3600] = "ER_WL9236_NOW", E[3601] = "ER_INVALID_NO_OF_ARGS", E[3602] = "ER_FIELD_IN_GROUPING_NOT_GROUP_BY", E[3603] = "ER_TOO_LONG_TABLESPACE_COMMENT", E[3604] = "ER_ENGINE_CANT_DROP_TABLE", E[3605] = "ER_ENGINE_CANT_DROP_MISSING_TABLE", E[3606] = "ER_TABLESPACE_DUP_FILENAME", E[3607] = "ER_DB_DROP_RMDIR2", E[3608] = "ER_IMP_NO_FILES_MATCHED", E[3609] = "ER_IMP_SCHEMA_DOES_NOT_EXIST", E[3610] = "ER_IMP_TABLE_ALREADY_EXISTS", E[3611] = "ER_IMP_INCOMPATIBLE_MYSQLD_VERSION", E[3612] = "ER_IMP_INCOMPATIBLE_DD_VERSION", E[3613] = "ER_IMP_INCOMPATIBLE_SDI_VERSION", E[3614] = "ER_WARN_INVALID_HINT", E[3615] = "ER_VAR_DOES_NOT_EXIST", E[3616] = "ER_LONGITUDE_OUT_OF_RANGE", E[3617] = "ER_LATITUDE_OUT_OF_RANGE", E[3618] = "ER_NOT_IMPLEMENTED_FOR_GEOGRAPHIC_SRS", E[3619] = "ER_ILLEGAL_PRIVILEGE_LEVEL", E[3620] = "ER_NO_SYSTEM_VIEW_ACCESS", E[3621] = "ER_COMPONENT_FILTER_FLABBERGASTED", E[3622] = "ER_PART_EXPR_TOO_LONG", E[3623] = "ER_UDF_DROP_DYNAMICALLY_REGISTERED", E[3624] = "ER_UNABLE_TO_STORE_COLUMN_STATISTICS", E[3625] = "ER_UNABLE_TO_UPDATE_COLUMN_STATISTICS", E[3626] = "ER_UNABLE_TO_DROP_COLUMN_STATISTICS", E[3627] = "ER_UNABLE_TO_BUILD_HISTOGRAM", E[3628] = "ER_MANDATORY_ROLE", E[3629] = "ER_MISSING_TABLESPACE_FILE", E[3630] = "ER_PERSIST_ONLY_ACCESS_DENIED_ERROR", E[3631] = "ER_CMD_NEED_SUPER", E[3632] = "ER_PATH_IN_DATADIR", E[3633] = "ER_CLONE_DDL_IN_PROGRESS", E[3634] = "ER_CLONE_TOO_MANY_CONCURRENT_CLONES", E[3635] = "ER_APPLIER_LOG_EVENT_VALIDATION_ERROR", E[3636] = "ER_CTE_MAX_RECURSION_DEPTH", E[3637] = "ER_NOT_HINT_UPDATABLE_VARIABLE", E[3638] = "ER_CREDENTIALS_CONTRADICT_TO_HISTORY", E[3639] = "ER_WARNING_PASSWORD_HISTORY_CLAUSES_VOID", E[3640] = "ER_CLIENT_DOES_NOT_SUPPORT", E[3641] = "ER_I_S_SKIPPED_TABLESPACE", E[3642] = "ER_TABLESPACE_ENGINE_MISMATCH", E[3643] = "ER_WRONG_SRID_FOR_COLUMN", E[3644] = "ER_CANNOT_ALTER_SRID_DUE_TO_INDEX", E[3645] = "ER_WARN_BINLOG_PARTIAL_UPDATES_DISABLED", E[3646] = "ER_WARN_BINLOG_V1_ROW_EVENTS_DISABLED", E[3647] = "ER_WARN_BINLOG_PARTIAL_UPDATES_SUGGESTS_PARTIAL_IMAGES", E[3648] = "ER_COULD_NOT_APPLY_JSON_DIFF", E[3649] = "ER_CORRUPTED_JSON_DIFF", E[3650] = "ER_RESOURCE_GROUP_EXISTS", E[3651] = "ER_RESOURCE_GROUP_NOT_EXISTS", E[3652] = "ER_INVALID_VCPU_ID", E[3653] = "ER_INVALID_VCPU_RANGE", E[3654] = "ER_INVALID_THREAD_PRIORITY", E[3655] = "ER_DISALLOWED_OPERATION", E[3656] = "ER_RESOURCE_GROUP_BUSY", E[3657] = "ER_RESOURCE_GROUP_DISABLED", E[3658] = "ER_FEATURE_UNSUPPORTED", E[3659] = "ER_ATTRIBUTE_IGNORED", E[3660] = "ER_INVALID_THREAD_ID", E[3661] = "ER_RESOURCE_GROUP_BIND_FAILED", E[3662] = "ER_INVALID_USE_OF_FORCE_OPTION", E[3663] = "ER_GROUP_REPLICATION_COMMAND_FAILURE", E[3664] = "ER_SDI_OPERATION_FAILED", E[3665] = "ER_MISSING_JSON_TABLE_VALUE", E[3666] = "ER_WRONG_JSON_TABLE_VALUE", E[3667] = "ER_TF_MUST_HAVE_ALIAS", E[3668] = "ER_TF_FORBIDDEN_JOIN_TYPE", E[3669] = "ER_JT_VALUE_OUT_OF_RANGE", E[3670] = "ER_JT_MAX_NESTED_PATH", E[3671] = "ER_PASSWORD_EXPIRATION_NOT_SUPPORTED_BY_AUTH_METHOD", E[3672] = "ER_INVALID_GEOJSON_CRS_NOT_TOP_LEVEL", E[3673] = "ER_BAD_NULL_ERROR_NOT_IGNORED", E[3674] = "WARN_USELESS_SPATIAL_INDEX", E[3675] = "ER_DISK_FULL_NOWAIT", E[3676] = "ER_PARSE_ERROR_IN_DIGEST_FN", E[3677] = "ER_UNDISCLOSED_PARSE_ERROR_IN_DIGEST_FN", E[3678] = "ER_SCHEMA_DIR_EXISTS", E[3679] = "ER_SCHEMA_DIR_MISSING", E[3680] = "ER_SCHEMA_DIR_CREATE_FAILED", E[3681] = "ER_SCHEMA_DIR_UNKNOWN", E[3682] = "ER_ONLY_IMPLEMENTED_FOR_SRID_0_AND_4326", E[3683] = "ER_BINLOG_EXPIRE_LOG_DAYS_AND_SECS_USED_TOGETHER", E[3684] = "ER_REGEXP_BUFFER_OVERFLOW", E[3685] = "ER_REGEXP_ILLEGAL_ARGUMENT", E[3686] = "ER_REGEXP_INDEX_OUTOFBOUNDS_ERROR", E[3687] = "ER_REGEXP_INTERNAL_ERROR", E[3688] = "ER_REGEXP_RULE_SYNTAX", E[3689] = "ER_REGEXP_BAD_ESCAPE_SEQUENCE", E[3690] = "ER_REGEXP_UNIMPLEMENTED", E[3691] = "ER_REGEXP_MISMATCHED_PAREN", E[3692] = "ER_REGEXP_BAD_INTERVAL", E[3693] = "ER_REGEXP_MAX_LT_MIN", E[3694] = "ER_REGEXP_INVALID_BACK_REF", E[3695] = "ER_REGEXP_LOOK_BEHIND_LIMIT", E[3696] = "ER_REGEXP_MISSING_CLOSE_BRACKET", E[3697] = "ER_REGEXP_INVALID_RANGE", E[3698] = "ER_REGEXP_STACK_OVERFLOW", E[3699] = "ER_REGEXP_TIME_OUT", E[3700] = "ER_REGEXP_PATTERN_TOO_BIG", E[3701] = "ER_CANT_SET_ERROR_LOG_SERVICE", E[3702] = "ER_EMPTY_PIPELINE_FOR_ERROR_LOG_SERVICE", E[3703] = "ER_COMPONENT_FILTER_DIAGNOSTICS", E[3704] = "ER_NOT_IMPLEMENTED_FOR_CARTESIAN_SRS", E[3705] = "ER_NOT_IMPLEMENTED_FOR_PROJECTED_SRS", E[3706] = "ER_NONPOSITIVE_RADIUS", E[3707] = "ER_RESTART_SERVER_FAILED", E[3708] = "ER_SRS_MISSING_MANDATORY_ATTRIBUTE", E[3709] = "ER_SRS_MULTIPLE_ATTRIBUTE_DEFINITIONS", E[3710] = "ER_SRS_NAME_CANT_BE_EMPTY_OR_WHITESPACE", E[3711] = "ER_SRS_ORGANIZATION_CANT_BE_EMPTY_OR_WHITESPACE", E[3712] = "ER_SRS_ID_ALREADY_EXISTS", E[3713] = "ER_WARN_SRS_ID_ALREADY_EXISTS", E[3714] = "ER_CANT_MODIFY_SRID_0", E[3715] = "ER_WARN_RESERVED_SRID_RANGE", E[3716] = "ER_CANT_MODIFY_SRS_USED_BY_COLUMN", E[3717] = "ER_SRS_INVALID_CHARACTER_IN_ATTRIBUTE", E[3718] = "ER_SRS_ATTRIBUTE_STRING_TOO_LONG", E[3719] = "ER_DEPRECATED_UTF8_ALIAS", E[3720] = "ER_DEPRECATED_NATIONAL", E[3721] = "ER_INVALID_DEFAULT_UTF8MB4_COLLATION", E[3722] = "ER_UNABLE_TO_COLLECT_LOG_STATUS", E[3723] = "ER_RESERVED_TABLESPACE_NAME", E[3724] = "ER_UNABLE_TO_SET_OPTION", E[3725] = "ER_REPLICA_POSSIBLY_DIVERGED_AFTER_DDL", E[3726] = "ER_SRS_NOT_GEOGRAPHIC", E[3727] = "ER_POLYGON_TOO_LARGE", E[3728] = "ER_SPATIAL_UNIQUE_INDEX", E[3729] = "ER_INDEX_TYPE_NOT_SUPPORTED_FOR_SPATIAL_INDEX", E[3730] = "ER_FK_CANNOT_DROP_PARENT", E[3731] = "ER_GEOMETRY_PARAM_LONGITUDE_OUT_OF_RANGE", E[3732] = "ER_GEOMETRY_PARAM_LATITUDE_OUT_OF_RANGE", E[3733] = "ER_FK_CANNOT_USE_VIRTUAL_COLUMN", E[3734] = "ER_FK_NO_COLUMN_PARENT", E[3735] = "ER_CANT_SET_ERROR_SUPPRESSION_LIST", E[3736] = "ER_SRS_GEOGCS_INVALID_AXES", E[3737] = "ER_SRS_INVALID_SEMI_MAJOR_AXIS", E[3738] = "ER_SRS_INVALID_INVERSE_FLATTENING", E[3739] = "ER_SRS_INVALID_ANGULAR_UNIT", E[3740] = "ER_SRS_INVALID_PRIME_MERIDIAN", E[3741] = "ER_TRANSFORM_SOURCE_SRS_NOT_SUPPORTED", E[3742] = "ER_TRANSFORM_TARGET_SRS_NOT_SUPPORTED", E[3743] = "ER_TRANSFORM_SOURCE_SRS_MISSING_TOWGS84", E[3744] = "ER_TRANSFORM_TARGET_SRS_MISSING_TOWGS84", E[3745] = "ER_TEMP_TABLE_PREVENTS_SWITCH_SESSION_BINLOG_FORMAT", E[3746] = "ER_TEMP_TABLE_PREVENTS_SWITCH_GLOBAL_BINLOG_FORMAT", E[3747] = "ER_RUNNING_APPLIER_PREVENTS_SWITCH_GLOBAL_BINLOG_FORMAT", E[3748] = "ER_CLIENT_GTID_UNSAFE_CREATE_DROP_TEMP_TABLE_IN_TRX_IN_SBR", E[3749] = "ER_XA_CANT_CREATE_MDL_BACKUP", E[3750] = "ER_TABLE_WITHOUT_PK", E[3751] = "ER_WARN_DATA_TRUNCATED_FUNCTIONAL_INDEX", E[3752] = "ER_WARN_DATA_OUT_OF_RANGE_FUNCTIONAL_INDEX", E[3753] = "ER_FUNCTIONAL_INDEX_ON_JSON_OR_GEOMETRY_FUNCTION", E[3754] = "ER_FUNCTIONAL_INDEX_REF_AUTO_INCREMENT", E[3755] = "ER_CANNOT_DROP_COLUMN_FUNCTIONAL_INDEX", E[3756] = "ER_FUNCTIONAL_INDEX_PRIMARY_KEY", E[3757] = "ER_FUNCTIONAL_INDEX_ON_LOB", E[3758] = "ER_FUNCTIONAL_INDEX_FUNCTION_IS_NOT_ALLOWED", E[3759] = "ER_FULLTEXT_FUNCTIONAL_INDEX", E[3760] = "ER_SPATIAL_FUNCTIONAL_INDEX", E[3761] = "ER_WRONG_KEY_COLUMN_FUNCTIONAL_INDEX", E[3762] = "ER_FUNCTIONAL_INDEX_ON_FIELD", E[3763] = "ER_GENERATED_COLUMN_NAMED_FUNCTION_IS_NOT_ALLOWED", E[3764] = "ER_GENERATED_COLUMN_ROW_VALUE", E[3765] = "ER_GENERATED_COLUMN_VARIABLES", E[3766] = "ER_DEPENDENT_BY_DEFAULT_GENERATED_VALUE", E[3767] = "ER_DEFAULT_VAL_GENERATED_NON_PRIOR", E[3768] = "ER_DEFAULT_VAL_GENERATED_REF_AUTO_INC", E[3769] = "ER_DEFAULT_VAL_GENERATED_FUNCTION_IS_NOT_ALLOWED", E[3770] = "ER_DEFAULT_VAL_GENERATED_NAMED_FUNCTION_IS_NOT_ALLOWED", E[3771] = "ER_DEFAULT_VAL_GENERATED_ROW_VALUE", E[3772] = "ER_DEFAULT_VAL_GENERATED_VARIABLES", E[3773] = "ER_DEFAULT_AS_VAL_GENERATED", E[3774] = "ER_UNSUPPORTED_ACTION_ON_DEFAULT_VAL_GENERATED", E[3775] = "ER_GTID_UNSAFE_ALTER_ADD_COL_WITH_DEFAULT_EXPRESSION", E[3776] = "ER_FK_CANNOT_CHANGE_ENGINE", E[3777] = "ER_WARN_DEPRECATED_USER_SET_EXPR", E[3778] = "ER_WARN_DEPRECATED_UTF8MB3_COLLATION", E[3779] = "ER_WARN_DEPRECATED_NESTED_COMMENT_SYNTAX", E[3780] = "ER_FK_INCOMPATIBLE_COLUMNS", E[3781] = "ER_GR_HOLD_WAIT_TIMEOUT", E[3782] = "ER_GR_HOLD_KILLED", E[3783] = "ER_GR_HOLD_MEMBER_STATUS_ERROR", E[3784] = "ER_RPL_ENCRYPTION_FAILED_TO_FETCH_KEY", E[3785] = "ER_RPL_ENCRYPTION_KEY_NOT_FOUND", E[3786] = "ER_RPL_ENCRYPTION_KEYRING_INVALID_KEY", E[3787] = "ER_RPL_ENCRYPTION_HEADER_ERROR", E[3788] = "ER_RPL_ENCRYPTION_FAILED_TO_ROTATE_LOGS", E[3789] = "ER_RPL_ENCRYPTION_KEY_EXISTS_UNEXPECTED", E[3790] = "ER_RPL_ENCRYPTION_FAILED_TO_GENERATE_KEY", E[3791] = "ER_RPL_ENCRYPTION_FAILED_TO_STORE_KEY", E[3792] = "ER_RPL_ENCRYPTION_FAILED_TO_REMOVE_KEY", E[3793] = "ER_RPL_ENCRYPTION_UNABLE_TO_CHANGE_OPTION", E[3794] = "ER_RPL_ENCRYPTION_MASTER_KEY_RECOVERY_FAILED", E[3795] = "ER_SLOW_LOG_MODE_IGNORED_WHEN_NOT_LOGGING_TO_FILE", E[3796] = "ER_GRP_TRX_CONSISTENCY_NOT_ALLOWED", E[3797] = "ER_GRP_TRX_CONSISTENCY_BEFORE", E[3798] = "ER_GRP_TRX_CONSISTENCY_AFTER_ON_TRX_BEGIN", E[3799] = "ER_GRP_TRX_CONSISTENCY_BEGIN_NOT_ALLOWED", E[3800] = "ER_FUNCTIONAL_INDEX_ROW_VALUE_IS_NOT_ALLOWED", E[3801] = "ER_RPL_ENCRYPTION_FAILED_TO_ENCRYPT", E[3802] = "ER_PAGE_TRACKING_NOT_STARTED", E[3803] = "ER_PAGE_TRACKING_RANGE_NOT_TRACKED", E[3804] = "ER_PAGE_TRACKING_CANNOT_PURGE", E[3805] = "ER_RPL_ENCRYPTION_CANNOT_ROTATE_BINLOG_MASTER_KEY", E[3806] = "ER_BINLOG_MASTER_KEY_RECOVERY_OUT_OF_COMBINATION", E[3807] = "ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_OPERATE_KEY", E[3808] = "ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_ROTATE_LOGS", E[3809] = "ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_REENCRYPT_LOG", E[3810] = "ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_CLEANUP_UNUSED_KEYS", E[3811] = "ER_BINLOG_MASTER_KEY_ROTATION_FAIL_TO_CLEANUP_AUX_KEY", E[3812] = "ER_NON_BOOLEAN_EXPR_FOR_CHECK_CONSTRAINT", E[3813] = "ER_COLUMN_CHECK_CONSTRAINT_REFERENCES_OTHER_COLUMN", E[3814] = "ER_CHECK_CONSTRAINT_NAMED_FUNCTION_IS_NOT_ALLOWED", E[3815] = "ER_CHECK_CONSTRAINT_FUNCTION_IS_NOT_ALLOWED", E[3816] = "ER_CHECK_CONSTRAINT_VARIABLES", E[3817] = "ER_CHECK_CONSTRAINT_ROW_VALUE", E[3818] = "ER_CHECK_CONSTRAINT_REFERS_AUTO_INCREMENT_COLUMN", E[3819] = "ER_CHECK_CONSTRAINT_VIOLATED", E[3820] = "ER_CHECK_CONSTRAINT_REFERS_UNKNOWN_COLUMN", E[3821] = "ER_CHECK_CONSTRAINT_NOT_FOUND", E[3822] = "ER_CHECK_CONSTRAINT_DUP_NAME", E[3823] = "ER_CHECK_CONSTRAINT_CLAUSE_USING_FK_REFER_ACTION_COLUMN", E[3824] = "WARN_UNENCRYPTED_TABLE_IN_ENCRYPTED_DB", E[3825] = "ER_INVALID_ENCRYPTION_REQUEST", E[3826] = "ER_CANNOT_SET_TABLE_ENCRYPTION", E[3827] = "ER_CANNOT_SET_DATABASE_ENCRYPTION", E[3828] = "ER_CANNOT_SET_TABLESPACE_ENCRYPTION", E[3829] = "ER_TABLESPACE_CANNOT_BE_ENCRYPTED", E[3830] = "ER_TABLESPACE_CANNOT_BE_DECRYPTED", E[3831] = "ER_TABLESPACE_TYPE_UNKNOWN", E[3832] = "ER_TARGET_TABLESPACE_UNENCRYPTED", E[3833] = "ER_CANNOT_USE_ENCRYPTION_CLAUSE", E[3834] = "ER_INVALID_MULTIPLE_CLAUSES", E[3835] = "ER_UNSUPPORTED_USE_OF_GRANT_AS", E[3836] = "ER_UKNOWN_AUTH_ID_OR_ACCESS_DENIED_FOR_GRANT_AS", E[3837] = "ER_DEPENDENT_BY_FUNCTIONAL_INDEX", E[3838] = "ER_PLUGIN_NOT_EARLY", E[3839] = "ER_INNODB_REDO_LOG_ARCHIVE_START_SUBDIR_PATH", E[3840] = "ER_INNODB_REDO_LOG_ARCHIVE_START_TIMEOUT", E[3841] = "ER_INNODB_REDO_LOG_ARCHIVE_DIRS_INVALID", E[3842] = "ER_INNODB_REDO_LOG_ARCHIVE_LABEL_NOT_FOUND", E[3843] = "ER_INNODB_REDO_LOG_ARCHIVE_DIR_EMPTY", E[3844] = "ER_INNODB_REDO_LOG_ARCHIVE_NO_SUCH_DIR", E[3845] = "ER_INNODB_REDO_LOG_ARCHIVE_DIR_CLASH", E[3846] = "ER_INNODB_REDO_LOG_ARCHIVE_DIR_PERMISSIONS", E[3847] = "ER_INNODB_REDO_LOG_ARCHIVE_FILE_CREATE", E[3848] = "ER_INNODB_REDO_LOG_ARCHIVE_ACTIVE", E[3849] = "ER_INNODB_REDO_LOG_ARCHIVE_INACTIVE", E[3850] = "ER_INNODB_REDO_LOG_ARCHIVE_FAILED", E[3851] = "ER_INNODB_REDO_LOG_ARCHIVE_SESSION", E[3852] = "ER_STD_REGEX_ERROR", E[3853] = "ER_INVALID_JSON_TYPE", E[3854] = "ER_CANNOT_CONVERT_STRING", E[3855] = "ER_DEPENDENT_BY_PARTITION_FUNC", E[3856] = "ER_WARN_DEPRECATED_FLOAT_AUTO_INCREMENT", E[3857] = "ER_RPL_CANT_STOP_REPLICA_WHILE_LOCKED_BACKUP", E[3858] = "ER_WARN_DEPRECATED_FLOAT_DIGITS", E[3859] = "ER_WARN_DEPRECATED_FLOAT_UNSIGNED", E[3860] = "ER_WARN_DEPRECATED_INTEGER_DISPLAY_WIDTH", E[3861] = "ER_WARN_DEPRECATED_ZEROFILL", E[3862] = "ER_CLONE_DONOR", E[3863] = "ER_CLONE_PROTOCOL", E[3864] = "ER_CLONE_DONOR_VERSION", E[3865] = "ER_CLONE_OS", E[3866] = "ER_CLONE_PLATFORM", E[3867] = "ER_CLONE_CHARSET", E[3868] = "ER_CLONE_CONFIG", E[3869] = "ER_CLONE_SYS_CONFIG", E[3870] = "ER_CLONE_PLUGIN_MATCH", E[3871] = "ER_CLONE_LOOPBACK", E[3872] = "ER_CLONE_ENCRYPTION", E[3873] = "ER_CLONE_DISK_SPACE", E[3874] = "ER_CLONE_IN_PROGRESS", E[3875] = "ER_CLONE_DISALLOWED", E[3876] = "ER_CANNOT_GRANT_ROLES_TO_ANONYMOUS_USER", E[3877] = "ER_SECONDARY_ENGINE_PLUGIN", E[3878] = "ER_SECOND_PASSWORD_CANNOT_BE_EMPTY", E[3879] = "ER_DB_ACCESS_DENIED", E[3880] = "ER_DA_AUTH_ID_WITH_SYSTEM_USER_PRIV_IN_MANDATORY_ROLES", E[3881] = "ER_DA_RPL_GTID_TABLE_CANNOT_OPEN", E[3882] = "ER_GEOMETRY_IN_UNKNOWN_LENGTH_UNIT", E[3883] = "ER_DA_PLUGIN_INSTALL_ERROR", E[3884] = "ER_NO_SESSION_TEMP", E[3885] = "ER_DA_UNKNOWN_ERROR_NUMBER", E[3886] = "ER_COLUMN_CHANGE_SIZE", E[3887] = "ER_REGEXP_INVALID_CAPTURE_GROUP_NAME", E[3888] = "ER_DA_SSL_LIBRARY_ERROR", E[3889] = "ER_SECONDARY_ENGINE", E[3890] = "ER_SECONDARY_ENGINE_DDL", E[3891] = "ER_INCORRECT_CURRENT_PASSWORD", E[3892] = "ER_MISSING_CURRENT_PASSWORD", E[3893] = "ER_CURRENT_PASSWORD_NOT_REQUIRED", E[3894] = "ER_PASSWORD_CANNOT_BE_RETAINED_ON_PLUGIN_CHANGE", E[3895] = "ER_CURRENT_PASSWORD_CANNOT_BE_RETAINED", E[3896] = "ER_PARTIAL_REVOKES_EXIST", E[3897] = "ER_CANNOT_GRANT_SYSTEM_PRIV_TO_MANDATORY_ROLE", E[3898] = "ER_XA_REPLICATION_FILTERS", E[3899] = "ER_UNSUPPORTED_SQL_MODE", E[3900] = "ER_REGEXP_INVALID_FLAG", E[3901] = "ER_PARTIAL_REVOKE_AND_DB_GRANT_BOTH_EXISTS", E[3902] = "ER_UNIT_NOT_FOUND", E[3903] = "ER_INVALID_JSON_VALUE_FOR_FUNC_INDEX", E[3904] = "ER_JSON_VALUE_OUT_OF_RANGE_FOR_FUNC_INDEX", E[3905] = "ER_EXCEEDED_MV_KEYS_NUM", E[3906] = "ER_EXCEEDED_MV_KEYS_SPACE", E[3907] = "ER_FUNCTIONAL_INDEX_DATA_IS_TOO_LONG", E[3908] = "ER_WRONG_MVI_VALUE", E[3909] = "ER_WARN_FUNC_INDEX_NOT_APPLICABLE", E[3910] = "ER_GRP_RPL_UDF_ERROR", E[3911] = "ER_UPDATE_GTID_PURGED_WITH_GR", E[3912] = "ER_GROUPING_ON_TIMESTAMP_IN_DST", E[3913] = "ER_TABLE_NAME_CAUSES_TOO_LONG_PATH", E[3914] = "ER_AUDIT_LOG_INSUFFICIENT_PRIVILEGE", E[3915] = "ER_AUDIT_LOG_PASSWORD_HAS_BEEN_COPIED", E[3916] = "ER_DA_GRP_RPL_STARTED_AUTO_REJOIN", E[3917] = "ER_SYSVAR_CHANGE_DURING_QUERY", E[3918] = "ER_GLOBSTAT_CHANGE_DURING_QUERY", E[3919] = "ER_GRP_RPL_MESSAGE_SERVICE_INIT_FAILURE", E[3920] = "ER_CHANGE_SOURCE_WRONG_COMPRESSION_ALGORITHM_CLIENT", E[3921] = "ER_CHANGE_SOURCE_WRONG_COMPRESSION_LEVEL_CLIENT", E[3922] = "ER_WRONG_COMPRESSION_ALGORITHM_CLIENT", E[3923] = "ER_WRONG_COMPRESSION_LEVEL_CLIENT", E[3924] = "ER_CHANGE_SOURCE_WRONG_COMPRESSION_ALGORITHM_LIST_CLIENT", E[3925] = "ER_CLIENT_PRIVILEGE_CHECKS_USER_CANNOT_BE_ANONYMOUS", E[3926] = "ER_CLIENT_PRIVILEGE_CHECKS_USER_DOES_NOT_EXIST", E[3927] = "ER_CLIENT_PRIVILEGE_CHECKS_USER_CORRUPT", E[3928] = "ER_CLIENT_PRIVILEGE_CHECKS_USER_NEEDS_RPL_APPLIER_PRIV", E[3929] = "ER_WARN_DA_PRIVILEGE_NOT_REGISTERED", E[3930] = "ER_CLIENT_KEYRING_UDF_KEY_INVALID", E[3931] = "ER_CLIENT_KEYRING_UDF_KEY_TYPE_INVALID", E[3932] = "ER_CLIENT_KEYRING_UDF_KEY_TOO_LONG", E[3933] = "ER_CLIENT_KEYRING_UDF_KEY_TYPE_TOO_LONG", E[3934] = "ER_JSON_SCHEMA_VALIDATION_ERROR_WITH_DETAILED_REPORT", E[3935] = "ER_DA_UDF_INVALID_CHARSET_SPECIFIED", E[3936] = "ER_DA_UDF_INVALID_CHARSET", E[3937] = "ER_DA_UDF_INVALID_COLLATION", E[3938] = "ER_DA_UDF_INVALID_EXTENSION_ARGUMENT_TYPE", E[3939] = "ER_MULTIPLE_CONSTRAINTS_WITH_SAME_NAME", E[3940] = "ER_CONSTRAINT_NOT_FOUND", E[3941] = "ER_ALTER_CONSTRAINT_ENFORCEMENT_NOT_SUPPORTED", E[3942] = "ER_TABLE_VALUE_CONSTRUCTOR_MUST_HAVE_COLUMNS", E[3943] = "ER_TABLE_VALUE_CONSTRUCTOR_CANNOT_HAVE_DEFAULT", E[3944] = "ER_CLIENT_QUERY_FAILURE_INVALID_NON_ROW_FORMAT", E[3945] = "ER_REQUIRE_ROW_FORMAT_INVALID_VALUE", E[3946] = "ER_FAILED_TO_DETERMINE_IF_ROLE_IS_MANDATORY", E[3947] = "ER_FAILED_TO_FETCH_MANDATORY_ROLE_LIST", E[3948] = "ER_CLIENT_LOCAL_FILES_DISABLED", E[3949] = "ER_IMP_INCOMPATIBLE_CFG_VERSION", E[3950] = "ER_DA_OOM", E[3951] = "ER_DA_UDF_INVALID_ARGUMENT_TO_SET_CHARSET", E[3952] = "ER_DA_UDF_INVALID_RETURN_TYPE_TO_SET_CHARSET", E[3953] = "ER_MULTIPLE_INTO_CLAUSES", E[3954] = "ER_MISPLACED_INTO", E[3955] = "ER_USER_ACCESS_DENIED_FOR_USER_ACCOUNT_BLOCKED_BY_PASSWORD_LOCK", E[3956] = "ER_WARN_DEPRECATED_YEAR_UNSIGNED", E[3957] = "ER_CLONE_NETWORK_PACKET", E[3958] = "ER_SDI_OPERATION_FAILED_MISSING_RECORD", E[3959] = "ER_DEPENDENT_BY_CHECK_CONSTRAINT", E[3960] = "ER_GRP_OPERATION_NOT_ALLOWED_GR_MUST_STOP", E[3961] = "ER_WARN_DEPRECATED_JSON_TABLE_ON_ERROR_ON_EMPTY", E[3962] = "ER_WARN_DEPRECATED_INNER_INTO", E[3963] = "ER_WARN_DEPRECATED_VALUES_FUNCTION_ALWAYS_NULL", E[3964] = "ER_WARN_DEPRECATED_SQL_CALC_FOUND_ROWS", E[3965] = "ER_WARN_DEPRECATED_FOUND_ROWS", E[3966] = "ER_MISSING_JSON_VALUE", E[3967] = "ER_MULTIPLE_JSON_VALUES", E[3968] = "ER_HOSTNAME_TOO_LONG", E[3969] = "ER_WARN_CLIENT_DEPRECATED_PARTITION_PREFIX_KEY", E[3970] = "ER_GROUP_REPLICATION_USER_EMPTY_MSG", E[3971] = "ER_GROUP_REPLICATION_USER_MANDATORY_MSG", E[3972] = "ER_GROUP_REPLICATION_PASSWORD_LENGTH", E[3973] = "ER_SUBQUERY_TRANSFORM_REJECTED", E[3974] = "ER_DA_GRP_RPL_RECOVERY_ENDPOINT_FORMAT", E[3975] = "ER_DA_GRP_RPL_RECOVERY_ENDPOINT_INVALID", E[3976] = "ER_WRONG_VALUE_FOR_VAR_PLUS_ACTIONABLE_PART", E[3977] = "ER_STATEMENT_NOT_ALLOWED_AFTER_START_TRANSACTION", E[3978] = "ER_FOREIGN_KEY_WITH_ATOMIC_CREATE_SELECT", E[3979] = "ER_NOT_ALLOWED_WITH_START_TRANSACTION", E[3980] = "ER_INVALID_JSON_ATTRIBUTE", E[3981] = "ER_ENGINE_ATTRIBUTE_NOT_SUPPORTED", E[3982] = "ER_INVALID_USER_ATTRIBUTE_JSON", E[3983] = "ER_INNODB_REDO_DISABLED", E[3984] = "ER_INNODB_REDO_ARCHIVING_ENABLED", E[3985] = "ER_MDL_OUT_OF_RESOURCES", E[3986] = "ER_IMPLICIT_COMPARISON_FOR_JSON", E[3987] = "ER_FUNCTION_DOES_NOT_SUPPORT_CHARACTER_SET", E[3988] = "ER_IMPOSSIBLE_STRING_CONVERSION", E[3989] = "ER_SCHEMA_READ_ONLY", E[3990] = "ER_RPL_ASYNC_RECONNECT_GTID_MODE_OFF", E[3991] = "ER_RPL_ASYNC_RECONNECT_AUTO_POSITION_OFF", E[3992] = "ER_DISABLE_GTID_MODE_REQUIRES_ASYNC_RECONNECT_OFF", E[3993] = "ER_DISABLE_AUTO_POSITION_REQUIRES_ASYNC_RECONNECT_OFF", E[3994] = "ER_INVALID_PARAMETER_USE", E[3995] = "ER_CHARACTER_SET_MISMATCH", E[3996] = "ER_WARN_VAR_VALUE_CHANGE_NOT_SUPPORTED", E[3997] = "ER_INVALID_TIME_ZONE_INTERVAL", E[3998] = "ER_INVALID_CAST", E[3999] = "ER_HYPERGRAPH_NOT_SUPPORTED_YET", E[4e3] = "ER_WARN_HYPERGRAPH_EXPERIMENTAL", E[4001] = "ER_DA_NO_ERROR_LOG_PARSER_CONFIGURED", E[4002] = "ER_DA_ERROR_LOG_TABLE_DISABLED", E[4003] = "ER_DA_ERROR_LOG_MULTIPLE_FILTERS", E[4004] = "ER_DA_CANT_OPEN_ERROR_LOG", E[4005] = "ER_USER_REFERENCED_AS_DEFINER", E[4006] = "ER_CANNOT_USER_REFERENCED_AS_DEFINER", E[4007] = "ER_REGEX_NUMBER_TOO_BIG", E[4008] = "ER_SPVAR_NONINTEGER_TYPE", E[4009] = "WARN_UNSUPPORTED_ACL_TABLES_READ", E[4010] = "ER_BINLOG_UNSAFE_ACL_TABLE_READ_IN_DML_DDL", E[4011] = "ER_STOP_REPLICA_MONITOR_IO_THREAD_TIMEOUT", E[4012] = "ER_STARTING_REPLICA_MONITOR_IO_THREAD", E[4013] = "ER_CANT_USE_ANONYMOUS_TO_GTID_WITH_GTID_MODE_NOT_ON", E[4014] = "ER_CANT_COMBINE_ANONYMOUS_TO_GTID_AND_AUTOPOSITION", E[4015] = "ER_ASSIGN_GTIDS_TO_ANONYMOUS_TRANSACTIONS_REQUIRES_GTID_MODE_ON", E[4016] = "ER_SQL_REPLICA_SKIP_COUNTER_USED_WITH_GTID_MODE_ON", E[4017] = "ER_USING_ASSIGN_GTIDS_TO_ANONYMOUS_TRANSACTIONS_AS_LOCAL_OR_UUID", E[4018] = "ER_CANT_SET_ANONYMOUS_TO_GTID_AND_WAIT_UNTIL_SQL_THD_AFTER_GTIDS", E[4019] = "ER_CANT_SET_SQL_AFTER_OR_BEFORE_GTIDS_WITH_ANONYMOUS_TO_GTID", E[4020] = "ER_ANONYMOUS_TO_GTID_UUID_SAME_AS_GROUP_NAME", E[4021] = "ER_CANT_USE_SAME_UUID_AS_GROUP_NAME", E[4022] = "ER_GRP_RPL_RECOVERY_CHANNEL_STILL_RUNNING", E[4023] = "ER_INNODB_INVALID_AUTOEXTEND_SIZE_VALUE", E[4024] = "ER_INNODB_INCOMPATIBLE_WITH_TABLESPACE", E[4025] = "ER_INNODB_AUTOEXTEND_SIZE_OUT_OF_RANGE", E[4026] = "ER_CANNOT_USE_AUTOEXTEND_SIZE_CLAUSE", E[4027] = "ER_ROLE_GRANTED_TO_ITSELF", E[4028] = "ER_TABLE_MUST_HAVE_A_VISIBLE_COLUMN", E[4029] = "ER_INNODB_COMPRESSION_FAILURE", E[4030] = "ER_WARN_ASYNC_CONN_FAILOVER_NETWORK_NAMESPACE", E[4031] = "ER_CLIENT_INTERACTION_TIMEOUT", E[4032] = "ER_INVALID_CAST_TO_GEOMETRY", E[4033] = "ER_INVALID_CAST_POLYGON_RING_DIRECTION", E[4034] = "ER_GIS_DIFFERENT_SRIDS_AGGREGATION", E[4035] = "ER_RELOAD_KEYRING_FAILURE", E[4036] = "ER_SDI_GET_KEYS_INVALID_TABLESPACE", E[4037] = "ER_CHANGE_RPL_SRC_WRONG_COMPRESSION_ALGORITHM_SIZE", E[4038] = "ER_WARN_DEPRECATED_TLS_VERSION_FOR_CHANNEL_CLI", E[4039] = "ER_CANT_USE_SAME_UUID_AS_VIEW_CHANGE_UUID", E[4040] = "ER_ANONYMOUS_TO_GTID_UUID_SAME_AS_VIEW_CHANGE_UUID", E[4041] = "ER_GRP_RPL_VIEW_CHANGE_UUID_FAIL_GET_VARIABLE", E[4042] = "ER_WARN_ADUIT_LOG_MAX_SIZE_AND_PRUNE_SECONDS", E[4043] = "ER_WARN_ADUIT_LOG_MAX_SIZE_CLOSE_TO_ROTATE_ON_SIZE", E[4044] = "ER_KERBEROS_CREATE_USER", E[4045] = "ER_INSTALL_PLUGIN_CONFLICT_CLIENT", E[4046] = "ER_DA_ERROR_LOG_COMPONENT_FLUSH_FAILED", E[4047] = "ER_WARN_SQL_AFTER_MTS_GAPS_GAP_NOT_CALCULATED", E[4048] = "ER_INVALID_ASSIGNMENT_TARGET", E[4049] = "ER_OPERATION_NOT_ALLOWED_ON_GR_SECONDARY", E[4050] = "ER_GRP_RPL_FAILOVER_CHANNEL_STATUS_PROPAGATION", E[4051] = "ER_WARN_AUDIT_LOG_FORMAT_UNIX_TIMESTAMP_ONLY_WHEN_JSON", E[4052] = "ER_INVALID_MFA_PLUGIN_SPECIFIED", E[4053] = "ER_IDENTIFIED_BY_UNSUPPORTED", E[4054] = "ER_INVALID_PLUGIN_FOR_REGISTRATION", E[4055] = "ER_PLUGIN_REQUIRES_REGISTRATION", E[4056] = "ER_MFA_METHOD_EXISTS", E[4057] = "ER_MFA_METHOD_NOT_EXISTS", E[4058] = "ER_AUTHENTICATION_POLICY_MISMATCH", E[4059] = "ER_PLUGIN_REGISTRATION_DONE", E[4060] = "ER_INVALID_USER_FOR_REGISTRATION", E[4061] = "ER_USER_REGISTRATION_FAILED", E[4062] = "ER_MFA_METHODS_INVALID_ORDER", E[4063] = "ER_MFA_METHODS_IDENTICAL", E[4064] = "ER_INVALID_MFA_OPERATIONS_FOR_PASSWORDLESS_USER", E[4065] = "ER_CHANGE_REPLICATION_SOURCE_NO_OPTIONS_FOR_GTID_ONLY", E[4066] = "ER_CHANGE_REP_SOURCE_CANT_DISABLE_REQ_ROW_FORMAT_WITH_GTID_ONLY", E[4067] = "ER_CHANGE_REP_SOURCE_CANT_DISABLE_AUTO_POSITION_WITH_GTID_ONLY", E[4068] = "ER_CHANGE_REP_SOURCE_CANT_DISABLE_GTID_ONLY_WITHOUT_POSITIONS", E[4069] = "ER_CHANGE_REP_SOURCE_CANT_DISABLE_AUTO_POS_WITHOUT_POSITIONS", E[4070] = "ER_CHANGE_REP_SOURCE_GR_CHANNEL_WITH_GTID_MODE_NOT_ON", E[4071] = "ER_CANT_USE_GTID_ONLY_WITH_GTID_MODE_NOT_ON", E[4072] = "ER_WARN_C_DISABLE_GTID_ONLY_WITH_SOURCE_AUTO_POS_INVALID_POS", E[4073] = "ER_DA_SSL_FIPS_MODE_ERROR", E[4074] = "ER_VALUE_OUT_OF_RANGE", E[4075] = "ER_FULLTEXT_WITH_ROLLUP", E[4076] = "ER_REGEXP_MISSING_RESOURCE", E[4077] = "ER_WARN_REGEXP_USING_DEFAULT", E[4078] = "ER_REGEXP_MISSING_FILE", E[4079] = "ER_WARN_DEPRECATED_COLLATION", E[4080] = "ER_CONCURRENT_PROCEDURE_USAGE", E[4081] = "ER_DA_GLOBAL_CONN_LIMIT", E[4082] = "ER_DA_CONN_LIMIT", E[4083] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE_INSTANT", E[4084] = "ER_WARN_SF_UDF_NAME_COLLISION", E[4085] = "ER_CANNOT_PURGE_BINLOG_WITH_BACKUP_LOCK", E[4086] = "ER_TOO_MANY_WINDOWS", E[4087] = "ER_MYSQLBACKUP_CLIENT_MSG", E[4088] = "ER_COMMENT_CONTAINS_INVALID_STRING", E[4089] = "ER_DEFINITION_CONTAINS_INVALID_STRING", E[4090] = "ER_CANT_EXECUTE_COMMAND_WITH_ASSIGNED_GTID_NEXT", E[4091] = "ER_XA_TEMP_TABLE", E[4092] = "ER_INNODB_MAX_ROW_VERSION", E[4093] = "ER_INNODB_INSTANT_ADD_NOT_SUPPORTED_MAX_SIZE", E[4094] = "ER_OPERATION_NOT_ALLOWED_WHILE_PRIMARY_CHANGE_IS_RUNNING", E[4095] = "ER_WARN_DEPRECATED_DATETIME_DELIMITER", E[4096] = "ER_WARN_DEPRECATED_SUPERFLUOUS_DELIMITER", E[4097] = "ER_CANNOT_PERSIST_SENSITIVE_VARIABLES", E[4098] = "ER_WARN_CANNOT_SECURELY_PERSIST_SENSITIVE_VARIABLES", E[4099] = "ER_WARN_TRG_ALREADY_EXISTS", E[4100] = "ER_IF_NOT_EXISTS_UNSUPPORTED_TRG_EXISTS_ON_DIFFERENT_TABLE", E[4101] = "ER_IF_NOT_EXISTS_UNSUPPORTED_UDF_NATIVE_FCT_NAME_COLLISION", E[4102] = "ER_SET_PASSWORD_AUTH_PLUGIN_ERROR", E[4103] = "ER_REDUCED_DBLWR_FILE_CORRUPTED", E[4104] = "ER_REDUCED_DBLWR_PAGE_FOUND", E[4105] = "ER_SRS_INVALID_LATITUDE_OF_ORIGIN", E[4106] = "ER_SRS_INVALID_LONGITUDE_OF_ORIGIN", E[4107] = "ER_SRS_UNUSED_PROJ_PARAMETER_PRESENT", E[4108] = "ER_GIPK_COLUMN_EXISTS", E[4109] = "ER_GIPK_FAILED_AUTOINC_COLUMN_EXISTS", E[4110] = "ER_GIPK_COLUMN_ALTER_NOT_ALLOWED", E[4111] = "ER_DROP_PK_COLUMN_TO_DROP_GIPK", E[4112] = "ER_CREATE_SELECT_WITH_GIPK_DISALLOWED_IN_SBR", E[4113] = "ER_DA_EXPIRE_LOGS_DAYS_IGNORED", E[4114] = "ER_CTE_RECURSIVE_NOT_UNION", E[4115] = "ER_COMMAND_BACKEND_FAILED_TO_FETCH_SECURITY_CTX", E[4116] = "ER_COMMAND_SERVICE_BACKEND_FAILED", E[4117] = "ER_CLIENT_FILE_PRIVILEGE_FOR_REPLICATION_CHECKS", E[4118] = "ER_GROUP_REPLICATION_FORCE_MEMBERS_COMMAND_FAILURE", E[4119] = "ER_WARN_DEPRECATED_IDENT", E[4120] = "ER_INTERSECT_ALL_MAX_DUPLICATES_EXCEEDED", E[4121] = "ER_TP_QUERY_THRS_PER_GRP_EXCEEDS_TXN_THR_LIMIT", E[4122] = "ER_BAD_TIMESTAMP_FORMAT", E[4123] = "ER_SHAPE_PRIDICTION_UDF", E[4124] = "ER_SRS_INVALID_HEIGHT", E[4125] = "ER_SRS_INVALID_SCALING", E[4126] = "ER_SRS_INVALID_ZONE_WIDTH", E[4127] = "ER_SRS_INVALID_LATITUDE_POLAR_STERE_VAR_A", E[4128] = "ER_WARN_DEPRECATED_CLIENT_NO_SCHEMA_OPTION", E[4129] = "ER_TABLE_NOT_EMPTY", E[4130] = "ER_TABLE_NO_PRIMARY_KEY", E[4131] = "ER_TABLE_IN_SHARED_TABLESPACE", E[4132] = "ER_INDEX_OTHER_THAN_PK", E[4133] = "ER_LOAD_BULK_DATA_UNSORTED", E[4134] = "ER_BULK_EXECUTOR_ERROR", E[4135] = "ER_BULK_READER_LIBCURL_INIT_FAILED", E[4136] = "ER_BULK_READER_LIBCURL_ERROR", E[4137] = "ER_BULK_READER_SERVER_ERROR", E[4138] = "ER_BULK_READER_COMMUNICATION_ERROR", E[4139] = "ER_BULK_LOAD_DATA_FAILED", E[4140] = "ER_BULK_LOADER_COLUMN_TOO_BIG_FOR_LEFTOVER_BUFFER", E[4141] = "ER_BULK_LOADER_COMPONENT_ERROR", E[4142] = "ER_BULK_LOADER_FILE_CONTAINS_LESS_LINES_THAN_IGNORE_CLAUSE", E[4143] = "ER_BULK_PARSER_MISSING_ENCLOSED_BY", E[4144] = "ER_BULK_PARSER_ROW_BUFFER_MAX_TOTAL_COLS_EXCEEDED", E[4145] = "ER_BULK_PARSER_COPY_BUFFER_SIZE_EXCEEDED", E[4146] = "ER_BULK_PARSER_UNEXPECTED_END_OF_INPUT", E[4147] = "ER_BULK_PARSER_UNEXPECTED_ROW_TERMINATOR", E[4148] = "ER_BULK_PARSER_UNEXPECTED_CHAR_AFTER_ENDING_ENCLOSED_BY", E[4149] = "ER_BULK_PARSER_UNEXPECTED_CHAR_AFTER_NULL_ESCAPE", E[4150] = "ER_BULK_PARSER_UNEXPECTED_CHAR_AFTER_COLUMN_TERMINATOR", E[4151] = "ER_BULK_PARSER_INCOMPLETE_ESCAPE_SEQUENCE", E[4152] = "ER_LOAD_BULK_DATA_FAILED", E[4153] = "ER_LOAD_BULK_DATA_WRONG_VALUE_FOR_FIELD", E[4154] = "ER_LOAD_BULK_DATA_WARN_NULL_TO_NOTNULL", E[4155] = "ER_REQUIRE_TABLE_PRIMARY_KEY_CHECK_GENERATE_WITH_GR", E[4156] = "ER_CANT_CHANGE_SYS_VAR_IN_READ_ONLY_MODE", E[4157] = "ER_INNODB_INSTANT_ADD_DROP_NOT_SUPPORTED_MAX_SIZE", E[4158] = "ER_INNODB_INSTANT_ADD_NOT_SUPPORTED_MAX_FIELDS", E[4159] = "ER_CANT_SET_PERSISTED", E[4160] = "ER_INSTALL_COMPONENT_SET_NULL_VALUE", E[4161] = "ER_INSTALL_COMPONENT_SET_UNUSED_VALUE", E[4162] = "ER_WARN_DEPRECATED_USER_DEFINED_COLLATIONS";
})(Dn);
var re = { exports: {} };
(function(E, _) {
  (function(n, e) {
    function A(t) {
      return t.default || t;
    }
    e(_), E.exports = A(_);
  })(
    typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : hi,
    function(n) {
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.default = void 0;
      /**
       * @license
       * Copyright 2009 The Closure Library Authors
       * Copyright 2020 Daniel Wirtz / The long.js Authors.
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *     http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       *
       * SPDX-License-Identifier: Apache-2.0
       */
      var e = null;
      try {
        e = new WebAssembly.Instance(
          new WebAssembly.Module(
            new Uint8Array([
              // \0asm
              0,
              97,
              115,
              109,
              // version 1
              1,
              0,
              0,
              0,
              // section "type"
              1,
              13,
              2,
              // 0, () => i32
              96,
              0,
              1,
              127,
              // 1, (i32, i32, i32, i32) => i32
              96,
              4,
              127,
              127,
              127,
              127,
              1,
              127,
              // section "function"
              3,
              7,
              6,
              // 0, type 0
              0,
              // 1, type 1
              1,
              // 2, type 1
              1,
              // 3, type 1
              1,
              // 4, type 1
              1,
              // 5, type 1
              1,
              // section "global"
              6,
              6,
              1,
              // 0, "high", mutable i32
              127,
              1,
              65,
              0,
              11,
              // section "export"
              7,
              50,
              6,
              // 0, "mul"
              3,
              109,
              117,
              108,
              0,
              1,
              // 1, "div_s"
              5,
              100,
              105,
              118,
              95,
              115,
              0,
              2,
              // 2, "div_u"
              5,
              100,
              105,
              118,
              95,
              117,
              0,
              3,
              // 3, "rem_s"
              5,
              114,
              101,
              109,
              95,
              115,
              0,
              4,
              // 4, "rem_u"
              5,
              114,
              101,
              109,
              95,
              117,
              0,
              5,
              // 5, "get_high"
              8,
              103,
              101,
              116,
              95,
              104,
              105,
              103,
              104,
              0,
              0,
              // section "code"
              10,
              191,
              1,
              6,
              // 0, "get_high"
              4,
              0,
              35,
              0,
              11,
              // 1, "mul"
              36,
              1,
              1,
              126,
              32,
              0,
              173,
              32,
              1,
              173,
              66,
              32,
              134,
              132,
              32,
              2,
              173,
              32,
              3,
              173,
              66,
              32,
              134,
              132,
              126,
              34,
              4,
              66,
              32,
              135,
              167,
              36,
              0,
              32,
              4,
              167,
              11,
              // 2, "div_s"
              36,
              1,
              1,
              126,
              32,
              0,
              173,
              32,
              1,
              173,
              66,
              32,
              134,
              132,
              32,
              2,
              173,
              32,
              3,
              173,
              66,
              32,
              134,
              132,
              127,
              34,
              4,
              66,
              32,
              135,
              167,
              36,
              0,
              32,
              4,
              167,
              11,
              // 3, "div_u"
              36,
              1,
              1,
              126,
              32,
              0,
              173,
              32,
              1,
              173,
              66,
              32,
              134,
              132,
              32,
              2,
              173,
              32,
              3,
              173,
              66,
              32,
              134,
              132,
              128,
              34,
              4,
              66,
              32,
              135,
              167,
              36,
              0,
              32,
              4,
              167,
              11,
              // 4, "rem_s"
              36,
              1,
              1,
              126,
              32,
              0,
              173,
              32,
              1,
              173,
              66,
              32,
              134,
              132,
              32,
              2,
              173,
              32,
              3,
              173,
              66,
              32,
              134,
              132,
              129,
              34,
              4,
              66,
              32,
              135,
              167,
              36,
              0,
              32,
              4,
              167,
              11,
              // 5, "rem_u"
              36,
              1,
              1,
              126,
              32,
              0,
              173,
              32,
              1,
              173,
              66,
              32,
              134,
              132,
              32,
              2,
              173,
              32,
              3,
              173,
              66,
              32,
              134,
              132,
              130,
              34,
              4,
              66,
              32,
              135,
              167,
              36,
              0,
              32,
              4,
              167,
              11
            ])
          ),
          {}
        ).exports;
      } catch {
      }
      function A(f, O, M) {
        this.low = f | 0, this.high = O | 0, this.unsigned = !!M;
      }
      A.prototype.__isLong__, Object.defineProperty(A.prototype, "__isLong__", {
        value: !0
      });
      function t(f) {
        return (f && f.__isLong__) === !0;
      }
      function R(f) {
        var O = Math.clz32(f & -f);
        return f ? 31 - O : O;
      }
      A.isLong = t;
      var i = {}, I = {};
      function N(f, O) {
        var M, d, w;
        return O ? (f >>>= 0, (w = 0 <= f && f < 256) && (d = I[f], d) ? d : (M = a(f, 0, !0), w && (I[f] = M), M)) : (f |= 0, (w = -128 <= f && f < 128) && (d = i[f], d) ? d : (M = a(f, f < 0 ? -1 : 0, !1), w && (i[f] = M), M));
      }
      A.fromInt = N;
      function T(f, O) {
        if (isNaN(f)) return O ? L : g;
        if (O) {
          if (f < 0) return L;
          if (f >= S) return k;
        } else {
          if (f <= -B) return G;
          if (f + 1 >= B) return y;
        }
        return f < 0 ? T(-f, O).neg() : a(
          f % l | 0,
          f / l | 0,
          O
        );
      }
      A.fromNumber = T;
      function a(f, O, M) {
        return new A(f, O, M);
      }
      A.fromBits = a;
      var u = Math.pow;
      function C(f, O, M) {
        if (f.length === 0) throw Error("empty string");
        if (typeof O == "number" ? (M = O, O = !1) : O = !!O, f === "NaN" || f === "Infinity" || f === "+Infinity" || f === "-Infinity")
          return O ? L : g;
        if (M = M || 10, M < 2 || 36 < M) throw RangeError("radix");
        var d;
        if ((d = f.indexOf("-")) > 0) throw Error("interior hyphen");
        if (d === 0)
          return C(f.substring(1), O, M).neg();
        for (var w = T(u(M, 8)), o = g, m = 0; m < f.length; m += 8) {
          var b = Math.min(8, f.length - m), p = parseInt(f.substring(m, m + b), M);
          if (b < 8) {
            var v = T(u(M, b));
            o = o.mul(v).add(T(p));
          } else
            o = o.mul(w), o = o.add(T(p));
        }
        return o.unsigned = O, o;
      }
      A.fromString = C;
      function r(f, O) {
        return typeof f == "number" ? T(f, O) : typeof f == "string" ? C(f, O) : a(
          f.low,
          f.high,
          typeof O == "boolean" ? O : f.unsigned
        );
      }
      A.fromValue = r;
      var D = 65536, c = 1 << 24, l = D * D, S = l * l, B = S / 2, h = N(c), g = N(0);
      A.ZERO = g;
      var L = N(0, !0);
      A.UZERO = L;
      var U = N(1);
      A.ONE = U;
      var F = N(1, !0);
      A.UONE = F;
      var Q = N(-1);
      A.NEG_ONE = Q;
      var y = a(-1, 2147483647, !1);
      A.MAX_VALUE = y;
      var k = a(-1, -1, !0);
      A.MAX_UNSIGNED_VALUE = k;
      var G = a(0, -2147483648, !1);
      A.MIN_VALUE = G;
      var s = A.prototype;
      s.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low;
      }, s.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * l + (this.low >>> 0) : this.high * l + (this.low >>> 0);
      }, s.toString = function(O) {
        if (O = O || 10, O < 2 || 36 < O) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative())
          if (this.eq(G)) {
            var M = T(O), d = this.div(M), w = d.mul(M).sub(this);
            return d.toString(O) + w.toInt().toString(O);
          } else return "-" + this.neg().toString(O);
        for (var o = T(u(O, 6), this.unsigned), m = this, b = ""; ; ) {
          var p = m.div(o), v = m.sub(p.mul(o)).toInt() >>> 0, P = v.toString(O);
          if (m = p, m.isZero()) return P + b;
          for (; P.length < 6; ) P = "0" + P;
          b = "" + P + b;
        }
      }, s.getHighBits = function() {
        return this.high;
      }, s.getHighBitsUnsigned = function() {
        return this.high >>> 0;
      }, s.getLowBits = function() {
        return this.low;
      }, s.getLowBitsUnsigned = function() {
        return this.low >>> 0;
      }, s.getNumBitsAbs = function() {
        if (this.isNegative())
          return this.eq(G) ? 64 : this.neg().getNumBitsAbs();
        for (var O = this.high != 0 ? this.high : this.low, M = 31; M > 0 && !(O & 1 << M); M--) ;
        return this.high != 0 ? M + 33 : M + 1;
      }, s.isSafeInteger = function() {
        var O = this.high >> 21;
        return O ? this.unsigned ? !1 : O === -1 && !(this.low === 0 && this.high === -2097152) : !0;
      }, s.isZero = function() {
        return this.high === 0 && this.low === 0;
      }, s.eqz = s.isZero, s.isNegative = function() {
        return !this.unsigned && this.high < 0;
      }, s.isPositive = function() {
        return this.unsigned || this.high >= 0;
      }, s.isOdd = function() {
        return (this.low & 1) === 1;
      }, s.isEven = function() {
        return (this.low & 1) === 0;
      }, s.equals = function(O) {
        return t(O) || (O = r(O)), this.unsigned !== O.unsigned && this.high >>> 31 === 1 && O.high >>> 31 === 1 ? !1 : this.high === O.high && this.low === O.low;
      }, s.eq = s.equals, s.notEquals = function(O) {
        return !this.eq(
          /* validates */
          O
        );
      }, s.neq = s.notEquals, s.ne = s.notEquals, s.lessThan = function(O) {
        return this.comp(
          /* validates */
          O
        ) < 0;
      }, s.lt = s.lessThan, s.lessThanOrEqual = function(O) {
        return this.comp(
          /* validates */
          O
        ) <= 0;
      }, s.lte = s.lessThanOrEqual, s.le = s.lessThanOrEqual, s.greaterThan = function(O) {
        return this.comp(
          /* validates */
          O
        ) > 0;
      }, s.gt = s.greaterThan, s.greaterThanOrEqual = function(O) {
        return this.comp(
          /* validates */
          O
        ) >= 0;
      }, s.gte = s.greaterThanOrEqual, s.ge = s.greaterThanOrEqual, s.compare = function(O) {
        if (t(O) || (O = r(O)), this.eq(O)) return 0;
        var M = this.isNegative(), d = O.isNegative();
        return M && !d ? -1 : !M && d ? 1 : this.unsigned ? O.high >>> 0 > this.high >>> 0 || O.high === this.high && O.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(O).isNegative() ? -1 : 1;
      }, s.comp = s.compare, s.negate = function() {
        return !this.unsigned && this.eq(G) ? G : this.not().add(U);
      }, s.neg = s.negate, s.add = function(O) {
        t(O) || (O = r(O));
        var M = this.high >>> 16, d = this.high & 65535, w = this.low >>> 16, o = this.low & 65535, m = O.high >>> 16, b = O.high & 65535, p = O.low >>> 16, v = O.low & 65535, P = 0, x = 0, q = 0, X = 0;
        return X += o + v, q += X >>> 16, X &= 65535, q += w + p, x += q >>> 16, q &= 65535, x += d + b, P += x >>> 16, x &= 65535, P += M + m, P &= 65535, a(q << 16 | X, P << 16 | x, this.unsigned);
      }, s.subtract = function(O) {
        return t(O) || (O = r(O)), this.add(O.neg());
      }, s.sub = s.subtract, s.multiply = function(O) {
        if (this.isZero()) return this;
        if (t(O) || (O = r(O)), e) {
          var M = e.mul(
            this.low,
            this.high,
            O.low,
            O.high
          );
          return a(M, e.get_high(), this.unsigned);
        }
        if (O.isZero()) return this.unsigned ? L : g;
        if (this.eq(G)) return O.isOdd() ? G : g;
        if (O.eq(G)) return this.isOdd() ? G : g;
        if (this.isNegative())
          return O.isNegative() ? this.neg().mul(O.neg()) : this.neg().mul(O).neg();
        if (O.isNegative())
          return this.mul(O.neg()).neg();
        if (this.lt(h) && O.lt(h))
          return T(
            this.toNumber() * O.toNumber(),
            this.unsigned
          );
        var d = this.high >>> 16, w = this.high & 65535, o = this.low >>> 16, m = this.low & 65535, b = O.high >>> 16, p = O.high & 65535, v = O.low >>> 16, P = O.low & 65535, x = 0, q = 0, X = 0, m_ = 0;
        return m_ += m * P, X += m_ >>> 16, m_ &= 65535, X += o * P, q += X >>> 16, X &= 65535, X += m * v, q += X >>> 16, X &= 65535, q += w * P, x += q >>> 16, q &= 65535, q += o * v, x += q >>> 16, q &= 65535, q += m * p, x += q >>> 16, q &= 65535, x += d * P + w * v + o * p + m * b, x &= 65535, a(X << 16 | m_, x << 16 | q, this.unsigned);
      }, s.mul = s.multiply, s.divide = function(O) {
        if (t(O) || (O = r(O)), O.isZero()) throw Error("division by zero");
        if (e) {
          if (!this.unsigned && this.high === -2147483648 && O.low === -1 && O.high === -1)
            return this;
          var M = (this.unsigned ? e.div_u : e.div_s)(
            this.low,
            this.high,
            O.low,
            O.high
          );
          return a(M, e.get_high(), this.unsigned);
        }
        if (this.isZero()) return this.unsigned ? L : g;
        var d, w, o;
        if (this.unsigned) {
          if (O.unsigned || (O = O.toUnsigned()), O.gt(this)) return L;
          if (O.gt(this.shru(1)))
            return F;
          o = L;
        } else {
          if (this.eq(G)) {
            if (O.eq(U) || O.eq(Q))
              return G;
            if (O.eq(G)) return U;
            var m = this.shr(1);
            return d = m.div(O).shl(1), d.eq(g) ? O.isNegative() ? U : Q : (w = this.sub(O.mul(d)), o = d.add(w.div(O)), o);
          } else if (O.eq(G)) return this.unsigned ? L : g;
          if (this.isNegative())
            return O.isNegative() ? this.neg().div(O.neg()) : this.neg().div(O).neg();
          if (O.isNegative()) return this.div(O.neg()).neg();
          o = g;
        }
        for (w = this; w.gte(O); ) {
          d = Math.max(1, Math.floor(w.toNumber() / O.toNumber()));
          for (var b = Math.ceil(Math.log(d) / Math.LN2), p = b <= 48 ? 1 : u(2, b - 48), v = T(d), P = v.mul(O); P.isNegative() || P.gt(w); )
            d -= p, v = T(d, this.unsigned), P = v.mul(O);
          v.isZero() && (v = U), o = o.add(v), w = w.sub(P);
        }
        return o;
      }, s.div = s.divide, s.modulo = function(O) {
        if (t(O) || (O = r(O)), e) {
          var M = (this.unsigned ? e.rem_u : e.rem_s)(
            this.low,
            this.high,
            O.low,
            O.high
          );
          return a(M, e.get_high(), this.unsigned);
        }
        return this.sub(this.div(O).mul(O));
      }, s.mod = s.modulo, s.rem = s.modulo, s.not = function() {
        return a(~this.low, ~this.high, this.unsigned);
      }, s.countLeadingZeros = function() {
        return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
      }, s.clz = s.countLeadingZeros, s.countTrailingZeros = function() {
        return this.low ? R(this.low) : R(this.high) + 32;
      }, s.ctz = s.countTrailingZeros, s.and = function(O) {
        return t(O) || (O = r(O)), a(
          this.low & O.low,
          this.high & O.high,
          this.unsigned
        );
      }, s.or = function(O) {
        return t(O) || (O = r(O)), a(
          this.low | O.low,
          this.high | O.high,
          this.unsigned
        );
      }, s.xor = function(O) {
        return t(O) || (O = r(O)), a(
          this.low ^ O.low,
          this.high ^ O.high,
          this.unsigned
        );
      }, s.shiftLeft = function(O) {
        return t(O) && (O = O.toInt()), (O &= 63) === 0 ? this : O < 32 ? a(
          this.low << O,
          this.high << O | this.low >>> 32 - O,
          this.unsigned
        ) : a(0, this.low << O - 32, this.unsigned);
      }, s.shl = s.shiftLeft, s.shiftRight = function(O) {
        return t(O) && (O = O.toInt()), (O &= 63) === 0 ? this : O < 32 ? a(
          this.low >>> O | this.high << 32 - O,
          this.high >> O,
          this.unsigned
        ) : a(
          this.high >> O - 32,
          this.high >= 0 ? 0 : -1,
          this.unsigned
        );
      }, s.shr = s.shiftRight, s.shiftRightUnsigned = function(O) {
        return t(O) && (O = O.toInt()), (O &= 63) === 0 ? this : O < 32 ? a(
          this.low >>> O | this.high << 32 - O,
          this.high >>> O,
          this.unsigned
        ) : O === 32 ? a(this.high, 0, this.unsigned) : a(this.high >>> O - 32, 0, this.unsigned);
      }, s.shru = s.shiftRightUnsigned, s.shr_u = s.shiftRightUnsigned, s.rotateLeft = function(O) {
        var M;
        return t(O) && (O = O.toInt()), (O &= 63) === 0 ? this : O === 32 ? a(this.high, this.low, this.unsigned) : O < 32 ? (M = 32 - O, a(
          this.low << O | this.high >>> M,
          this.high << O | this.low >>> M,
          this.unsigned
        )) : (O -= 32, M = 32 - O, a(
          this.high << O | this.low >>> M,
          this.low << O | this.high >>> M,
          this.unsigned
        ));
      }, s.rotl = s.rotateLeft, s.rotateRight = function(O) {
        var M;
        return t(O) && (O = O.toInt()), (O &= 63) === 0 ? this : O === 32 ? a(this.high, this.low, this.unsigned) : O < 32 ? (M = 32 - O, a(
          this.high << M | this.low >>> O,
          this.low << M | this.high >>> O,
          this.unsigned
        )) : (O -= 32, M = 32 - O, a(
          this.low << M | this.high >>> O,
          this.high << M | this.low >>> O,
          this.unsigned
        ));
      }, s.rotr = s.rotateRight, s.toSigned = function() {
        return this.unsigned ? a(this.low, this.high, !1) : this;
      }, s.toUnsigned = function() {
        return this.unsigned ? this : a(this.low, this.high, !0);
      }, s.toBytes = function(O) {
        return O ? this.toBytesLE() : this.toBytesBE();
      }, s.toBytesLE = function() {
        var O = this.high, M = this.low;
        return [
          M & 255,
          M >>> 8 & 255,
          M >>> 16 & 255,
          M >>> 24,
          O & 255,
          O >>> 8 & 255,
          O >>> 16 & 255,
          O >>> 24
        ];
      }, s.toBytesBE = function() {
        var O = this.high, M = this.low;
        return [
          O >>> 24,
          O >>> 16 & 255,
          O >>> 8 & 255,
          O & 255,
          M >>> 24,
          M >>> 16 & 255,
          M >>> 8 & 255,
          M & 255
        ];
      }, A.fromBytes = function(O, M, d) {
        return d ? A.fromBytesLE(O, M) : A.fromBytesBE(O, M);
      }, A.fromBytesLE = function(O, M) {
        return new A(
          O[0] | O[1] << 8 | O[2] << 16 | O[3] << 24,
          O[4] | O[5] << 8 | O[6] << 16 | O[7] << 24,
          M
        );
      }, A.fromBytesBE = function(O, M) {
        return new A(
          O[4] << 24 | O[5] << 16 | O[6] << 8 | O[7],
          O[0] << 24 | O[1] << 16 | O[2] << 8 | O[3],
          M
        );
      }, typeof BigInt == "function" && (A.fromBigInt = function(O, M) {
        var d = Number(BigInt.asIntN(32, O)), w = Number(BigInt.asIntN(32, O >> BigInt(32)));
        return a(d, w, M);
      }, A.fromValue = function(O, M) {
        return typeof O == "bigint" ? A.fromBigInt(O, M) : r(O, M);
      }, s.toBigInt = function() {
        var O = BigInt(this.low >>> 0), M = BigInt(this.unsigned ? this.high >>> 0 : this.high);
        return M << BigInt(32) | O;
      }), n.default = A;
    }
  );
})(re, re.exports);
var QN = re.exports, O_ = {}, We = { exports: {} }, $_ = de, A_ = $_.Buffer, uE = {}, cE;
for (cE in $_)
  $_.hasOwnProperty(cE) && (cE === "SlowBuffer" || cE === "Buffer" || (uE[cE] = $_[cE]));
var t_ = uE.Buffer = {};
for (cE in A_)
  A_.hasOwnProperty(cE) && (cE === "allocUnsafe" || cE === "allocUnsafeSlow" || (t_[cE] = A_[cE]));
uE.Buffer.prototype = A_.prototype;
(!t_.from || t_.from === Uint8Array.from) && (t_.from = function(E, _, n) {
  if (typeof E == "number")
    throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof E);
  if (E && typeof E.length > "u")
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E);
  return A_(E, _, n);
});
t_.alloc || (t_.alloc = function(E, _, n) {
  if (typeof E != "number")
    throw new TypeError('The "size" argument must be of type number. Received type ' + typeof E);
  if (E < 0 || E >= 2 * (1 << 30))
    throw new RangeError('The value "' + E + '" is invalid for option "size"');
  var e = A_(E);
  return !_ || _.length === 0 ? e.fill(0) : typeof n == "string" ? e.fill(_, n) : e.fill(_), e;
});
if (!uE.kStringMaxLength)
  try {
    uE.kStringMaxLength = process.binding("buffer").kStringMaxLength;
  } catch {
  }
uE.constants || (uE.constants = {
  MAX_LENGTH: uE.kMaxLength
}, uE.kStringMaxLength && (uE.constants.MAX_STRING_LENGTH = uE.kStringMaxLength));
var yE = uE, He = {}, dR = "\uFEFF";
He.PrependBOM = ve;
function ve(E, _) {
  this.encoder = E, this.addBOM = !0;
}
ve.prototype.write = function(E) {
  return this.addBOM && (E = dR + E, this.addBOM = !1), this.encoder.write(E);
};
ve.prototype.end = function() {
  return this.encoder.end();
};
He.StripBOM = Xe;
function Xe(E, _) {
  this.decoder = E, this.pass = !1, this.options = _ || {};
}
Xe.prototype.write = function(E) {
  var _ = this.decoder.write(E);
  return this.pass || !_ || (_[0] === dR && (_ = _.slice(1), typeof this.options.stripBOM == "function" && this.options.stripBOM()), this.pass = !0), _;
};
Xe.prototype.end = function() {
  return this.decoder.end();
};
var VN = typeof Object.hasOwn > "u" ? Function.call.bind(Object.prototype.hasOwnProperty) : Object.hasOwn;
function bN(E, _) {
  for (var n in _)
    VN(_, n) && (E[n] = _[n]);
}
var UR = bN, dn = {}, Un, cA;
function mN() {
  if (cA) return Un;
  cA = 1;
  var E = yE.Buffer;
  Un = {
    // Encodings
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: _
  };
  function _(N, T) {
    this.enc = N.encodingName, this.bomAware = N.bomAware, this.enc === "base64" ? this.encoder = t : this.enc === "utf8" ? this.encoder = I : this.enc === "cesu8" && (this.enc = "utf8", this.encoder = R, E.from("eda0bdedb2a9", "hex").toString() !== "💩" && (this.decoder = i, this.defaultCharUnicode = T.defaultCharUnicode));
  }
  _.prototype.encoder = A, _.prototype.decoder = e;
  var n = Di.StringDecoder;
  function e(N, T) {
    this.decoder = new n(T.enc);
  }
  e.prototype.write = function(N) {
    return E.isBuffer(N) || (N = E.from(N)), this.decoder.write(N);
  }, e.prototype.end = function() {
    return this.decoder.end();
  };
  function A(N, T) {
    this.enc = T.enc;
  }
  A.prototype.write = function(N) {
    return E.from(N, this.enc);
  }, A.prototype.end = function() {
  };
  function t(N, T) {
    this.prevStr = "";
  }
  t.prototype.write = function(N) {
    N = this.prevStr + N;
    var T = N.length - N.length % 4;
    return this.prevStr = N.slice(T), N = N.slice(0, T), E.from(N, "base64");
  }, t.prototype.end = function() {
    return E.from(this.prevStr, "base64");
  };
  function R(N, T) {
  }
  R.prototype.write = function(N) {
    for (var T = E.alloc(N.length * 3), a = 0, u = 0; u < N.length; u++) {
      var C = N.charCodeAt(u);
      C < 128 ? T[a++] = C : C < 2048 ? (T[a++] = 192 + (C >>> 6), T[a++] = 128 + (C & 63)) : (T[a++] = 224 + (C >>> 12), T[a++] = 128 + (C >>> 6 & 63), T[a++] = 128 + (C & 63));
    }
    return T.slice(0, a);
  }, R.prototype.end = function() {
  };
  function i(N, T) {
    this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode = T.defaultCharUnicode;
  }
  i.prototype.write = function(N) {
    for (var T = this.acc, a = this.contBytes, u = this.accBytes, C = "", r = 0; r < N.length; r++) {
      var D = N[r];
      (D & 192) !== 128 ? (a > 0 && (C += this.defaultCharUnicode, a = 0), D < 128 ? C += String.fromCharCode(D) : D < 224 ? (T = D & 31, a = 1, u = 1) : D < 240 ? (T = D & 15, a = 2, u = 1) : C += this.defaultCharUnicode) : a > 0 ? (T = T << 6 | D & 63, a--, u++, a === 0 && (u === 2 && T < 128 && T > 0 ? C += this.defaultCharUnicode : u === 3 && T < 2048 ? C += this.defaultCharUnicode : C += String.fromCharCode(T))) : C += this.defaultCharUnicode;
    }
    return this.acc = T, this.contBytes = a, this.accBytes = u, C;
  }, i.prototype.end = function() {
    var N = 0;
    return this.contBytes > 0 && (N += this.defaultCharUnicode), N;
  };
  function I(N, T) {
    this.highSurrogate = "";
  }
  return I.prototype.write = function(N) {
    if (this.highSurrogate && (N = this.highSurrogate + N, this.highSurrogate = ""), N.length > 0) {
      var T = N.charCodeAt(N.length - 1);
      T >= 55296 && T < 56320 && (this.highSurrogate = N[N.length - 1], N = N.slice(0, N.length - 1));
    }
    return E.from(N, this.enc);
  }, I.prototype.end = function() {
    if (this.highSurrogate) {
      var N = this.highSurrogate;
      return this.highSurrogate = "", E.from(N, this.enc);
    }
  }, Un;
}
var fE = {}, CA;
function YN() {
  if (CA) return fE;
  CA = 1;
  var E = yE.Buffer;
  fE._utf32 = _;
  function _(N, T) {
    this.iconv = T, this.bomAware = !0, this.isLE = N.isLE;
  }
  fE.utf32le = { type: "_utf32", isLE: !0 }, fE.utf32be = { type: "_utf32", isLE: !1 }, fE.ucs4le = "utf32le", fE.ucs4be = "utf32be", _.prototype.encoder = n, _.prototype.decoder = e;
  function n(N, T) {
    this.isLE = T.isLE, this.highSurrogate = 0;
  }
  n.prototype.write = function(N) {
    for (var T = E.from(N, "ucs2"), a = E.alloc(T.length * 2), u = this.isLE ? a.writeUInt32LE : a.writeUInt32BE, C = 0, r = 0; r < T.length; r += 2) {
      var D = T.readUInt16LE(r), c = D >= 55296 && D < 56320, l = D >= 56320 && D < 57344;
      if (this.highSurrogate)
        if (c || !l)
          u.call(a, this.highSurrogate, C), C += 4;
        else {
          var S = (this.highSurrogate - 55296 << 10 | D - 56320) + 65536;
          u.call(a, S, C), C += 4, this.highSurrogate = 0;
          continue;
        }
      c ? this.highSurrogate = D : (u.call(a, D, C), C += 4, this.highSurrogate = 0);
    }
    return C < a.length && (a = a.slice(0, C)), a;
  }, n.prototype.end = function() {
    if (this.highSurrogate) {
      var N = E.alloc(4);
      return this.isLE ? N.writeUInt32LE(this.highSurrogate, 0) : N.writeUInt32BE(this.highSurrogate, 0), this.highSurrogate = 0, N;
    }
  };
  function e(N, T) {
    this.isLE = T.isLE, this.badChar = T.iconv.defaultCharUnicode.charCodeAt(0), this.overflow = [];
  }
  e.prototype.write = function(N) {
    if (N.length === 0)
      return "";
    var T = 0, a = 0, u = E.alloc(N.length + 4), C = 0, r = this.isLE, D = this.overflow, c = this.badChar;
    if (D.length > 0) {
      for (; T < N.length && D.length < 4; T++)
        D.push(N[T]);
      D.length === 4 && (r ? a = D[T] | D[T + 1] << 8 | D[T + 2] << 16 | D[T + 3] << 24 : a = D[T + 3] | D[T + 2] << 8 | D[T + 1] << 16 | D[T] << 24, D.length = 0, C = A(u, C, a, c));
    }
    for (; T < N.length - 3; T += 4)
      r ? a = N[T] | N[T + 1] << 8 | N[T + 2] << 16 | N[T + 3] << 24 : a = N[T + 3] | N[T + 2] << 8 | N[T + 1] << 16 | N[T] << 24, C = A(u, C, a, c);
    for (; T < N.length; T++)
      D.push(N[T]);
    return u.slice(0, C).toString("ucs2");
  };
  function A(N, T, a, u) {
    if ((a < 0 || a > 1114111) && (a = u), a >= 65536) {
      a -= 65536;
      var C = 55296 | a >> 10;
      N[T++] = C & 255, N[T++] = C >> 8;
      var a = 56320 | a & 1023;
    }
    return N[T++] = a & 255, N[T++] = a >> 8, T;
  }
  e.prototype.end = function() {
    this.overflow.length = 0;
  }, fE.utf32 = t, fE.ucs4 = "utf32";
  function t(N, T) {
    this.iconv = T;
  }
  t.prototype.encoder = R, t.prototype.decoder = i;
  function R(N, T) {
    N = N || {}, N.addBOM === void 0 && (N.addBOM = !0), this.encoder = T.iconv.getEncoder(N.defaultEncoding || "utf-32le", N);
  }
  R.prototype.write = function(N) {
    return this.encoder.write(N);
  }, R.prototype.end = function() {
    return this.encoder.end();
  };
  function i(N, T) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = N || {}, this.iconv = T.iconv;
  }
  i.prototype.write = function(N) {
    if (!this.decoder) {
      if (this.initialBufs.push(N), this.initialBufsLen += N.length, this.initialBufsLen < 32)
        return "";
      var T = I(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(T, this.options);
      for (var a = "", u = 0; u < this.initialBufs.length; u++)
        a += this.decoder.write(this.initialBufs[u]);
      return this.initialBufs.length = this.initialBufsLen = 0, a;
    }
    return this.decoder.write(N);
  }, i.prototype.end = function() {
    if (!this.decoder) {
      var N = I(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(N, this.options);
      for (var T = "", a = 0; a < this.initialBufs.length; a++)
        T += this.decoder.write(this.initialBufs[a]);
      var u = this.decoder.end();
      return u && (T += u), this.initialBufs.length = this.initialBufsLen = 0, T;
    }
    return this.decoder.end();
  };
  function I(N, T) {
    var a = [], u = 0, C = 0, r = 0, D = 0, c = 0;
    E:
      for (var l = 0; l < N.length; l++)
        for (var S = N[l], B = 0; B < S.length; B++)
          if (a.push(S[B]), a.length === 4) {
            if (u === 0) {
              if (a[0] === 255 && a[1] === 254 && a[2] === 0 && a[3] === 0)
                return "utf-32le";
              if (a[0] === 0 && a[1] === 0 && a[2] === 254 && a[3] === 255)
                return "utf-32be";
            }
            if ((a[0] !== 0 || a[1] > 16) && r++, (a[3] !== 0 || a[2] > 16) && C++, a[0] === 0 && a[1] === 0 && (a[2] !== 0 || a[3] !== 0) && c++, (a[0] !== 0 || a[1] !== 0) && a[2] === 0 && a[3] === 0 && D++, a.length = 0, u++, u >= 100)
              break E;
          }
    return c - r > D - C ? "utf-32be" : c - r < D - C ? "utf-32le" : T || "utf-32le";
  }
  return fE;
}
var W_ = {}, rA;
function yN() {
  if (rA) return W_;
  rA = 1;
  var E = yE.Buffer;
  W_.utf16be = _;
  function _() {
  }
  _.prototype.encoder = n, _.prototype.decoder = e, _.prototype.bomAware = !0;
  function n() {
  }
  n.prototype.write = function(I) {
    for (var N = E.from(I, "ucs2"), T = 0; T < N.length; T += 2) {
      var a = N[T];
      N[T] = N[T + 1], N[T + 1] = a;
    }
    return N;
  }, n.prototype.end = function() {
  };
  function e() {
    this.overflowByte = -1;
  }
  e.prototype.write = function(I) {
    if (I.length == 0)
      return "";
    var N = E.alloc(I.length + 1), T = 0, a = 0;
    for (this.overflowByte !== -1 && (N[0] = I[0], N[1] = this.overflowByte, T = 1, a = 2); T < I.length - 1; T += 2, a += 2)
      N[a] = I[T + 1], N[a + 1] = I[T];
    return this.overflowByte = T == I.length - 1 ? I[I.length - 1] : -1, N.slice(0, a).toString("ucs2");
  }, e.prototype.end = function() {
    this.overflowByte = -1;
  }, W_.utf16 = A;
  function A(I, N) {
    this.iconv = N;
  }
  A.prototype.encoder = t, A.prototype.decoder = R;
  function t(I, N) {
    I = I || {}, I.addBOM === void 0 && (I.addBOM = !0), this.encoder = N.iconv.getEncoder("utf-16le", I);
  }
  t.prototype.write = function(I) {
    return this.encoder.write(I);
  }, t.prototype.end = function() {
    return this.encoder.end();
  };
  function R(I, N) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = I || {}, this.iconv = N.iconv;
  }
  R.prototype.write = function(I) {
    if (!this.decoder) {
      if (this.initialBufs.push(I), this.initialBufsLen += I.length, this.initialBufsLen < 16)
        return "";
      var N = i(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(N, this.options);
      for (var T = "", a = 0; a < this.initialBufs.length; a++)
        T += this.decoder.write(this.initialBufs[a]);
      return this.initialBufs.length = this.initialBufsLen = 0, T;
    }
    return this.decoder.write(I);
  }, R.prototype.end = function() {
    if (!this.decoder) {
      var I = i(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(I, this.options);
      for (var N = "", T = 0; T < this.initialBufs.length; T++)
        N += this.decoder.write(this.initialBufs[T]);
      var a = this.decoder.end();
      return a && (N += a), this.initialBufs.length = this.initialBufsLen = 0, N;
    }
    return this.decoder.end();
  };
  function i(I, N) {
    var T = [], a = 0, u = 0, C = 0;
    E:
      for (var r = 0; r < I.length; r++)
        for (var D = I[r], c = 0; c < D.length; c++)
          if (T.push(D[c]), T.length === 2) {
            if (a === 0) {
              if (T[0] === 255 && T[1] === 254) return "utf-16le";
              if (T[0] === 254 && T[1] === 255) return "utf-16be";
            }
            if (T[0] === 0 && T[1] !== 0 && C++, T[0] !== 0 && T[1] === 0 && u++, T.length = 0, a++, a >= 100)
              break E;
          }
    return C > u ? "utf-16be" : C < u ? "utf-16le" : N || "utf-16le";
  }
  return W_;
}
var c_ = {}, DA;
function WN() {
  if (DA) return c_;
  DA = 1;
  var E = yE.Buffer;
  c_.utf7 = _, c_.unicode11utf7 = "utf7";
  function _(D, c) {
    this.iconv = c;
  }
  _.prototype.encoder = e, _.prototype.decoder = A, _.prototype.bomAware = !0;
  var n = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function e(D, c) {
    this.iconv = c.iconv;
  }
  e.prototype.write = function(D) {
    return E.from(D.replace(n, (function(c) {
      return "+" + (c === "+" ? "" : this.iconv.encode(c, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  }, e.prototype.end = function() {
  };
  function A(D, c) {
    this.iconv = c.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  for (var t = /[A-Za-z0-9\/+]/, R = [], i = 0; i < 256; i++)
    R[i] = t.test(String.fromCharCode(i));
  var I = 43, N = 45, T = 38;
  A.prototype.write = function(D) {
    for (var c = "", l = 0, S = this.inBase64, B = this.base64Accum, h = 0; h < D.length; h++)
      if (!S)
        D[h] == I && (c += this.iconv.decode(D.slice(l, h), "ascii"), l = h + 1, S = !0);
      else if (!R[D[h]]) {
        if (h == l && D[h] == N)
          c += "+";
        else {
          var g = B + this.iconv.decode(D.slice(l, h), "ascii");
          c += this.iconv.decode(E.from(g, "base64"), "utf16-be");
        }
        D[h] != N && h--, l = h + 1, S = !1, B = "";
      }
    if (!S)
      c += this.iconv.decode(D.slice(l), "ascii");
    else {
      var g = B + this.iconv.decode(D.slice(l), "ascii"), L = g.length - g.length % 8;
      B = g.slice(L), g = g.slice(0, L), c += this.iconv.decode(E.from(g, "base64"), "utf16-be");
    }
    return this.inBase64 = S, this.base64Accum = B, c;
  }, A.prototype.end = function() {
    var D = "";
    return this.inBase64 && this.base64Accum.length > 0 && (D = this.iconv.decode(E.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", D;
  }, c_.utf7imap = a;
  function a(D, c) {
    this.iconv = c;
  }
  a.prototype.encoder = u, a.prototype.decoder = C, a.prototype.bomAware = !0;
  function u(D, c) {
    this.iconv = c.iconv, this.inBase64 = !1, this.base64Accum = E.alloc(6), this.base64AccumIdx = 0;
  }
  u.prototype.write = function(D) {
    for (var c = this.inBase64, l = this.base64Accum, S = this.base64AccumIdx, B = E.alloc(D.length * 5 + 10), h = 0, g = 0; g < D.length; g++) {
      var L = D.charCodeAt(g);
      L >= 32 && L <= 126 ? (c && (S > 0 && (h += B.write(l.slice(0, S).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), h), S = 0), B[h++] = N, c = !1), c || (B[h++] = L, L === T && (B[h++] = N))) : (c || (B[h++] = T, c = !0), c && (l[S++] = L >> 8, l[S++] = L & 255, S == l.length && (h += B.write(l.toString("base64").replace(/\//g, ","), h), S = 0)));
    }
    return this.inBase64 = c, this.base64AccumIdx = S, B.slice(0, h);
  }, u.prototype.end = function() {
    var D = E.alloc(10), c = 0;
    return this.inBase64 && (this.base64AccumIdx > 0 && (c += D.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), c), this.base64AccumIdx = 0), D[c++] = N, this.inBase64 = !1), D.slice(0, c);
  };
  function C(D, c) {
    this.iconv = c.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  var r = R.slice();
  return r[44] = !0, C.prototype.write = function(D) {
    for (var c = "", l = 0, S = this.inBase64, B = this.base64Accum, h = 0; h < D.length; h++)
      if (!S)
        D[h] == T && (c += this.iconv.decode(D.slice(l, h), "ascii"), l = h + 1, S = !0);
      else if (!r[D[h]]) {
        if (h == l && D[h] == N)
          c += "&";
        else {
          var g = B + this.iconv.decode(D.slice(l, h), "ascii").replace(/,/g, "/");
          c += this.iconv.decode(E.from(g, "base64"), "utf16-be");
        }
        D[h] != N && h--, l = h + 1, S = !1, B = "";
      }
    if (!S)
      c += this.iconv.decode(D.slice(l), "ascii");
    else {
      var g = B + this.iconv.decode(D.slice(l), "ascii").replace(/,/g, "/"), L = g.length - g.length % 8;
      B = g.slice(L), g = g.slice(0, L), c += this.iconv.decode(E.from(g, "base64"), "utf16-be");
    }
    return this.inBase64 = S, this.base64Accum = B, c;
  }, C.prototype.end = function() {
    var D = "";
    return this.inBase64 && this.base64Accum.length > 0 && (D = this.iconv.decode(E.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", D;
  }, c_;
}
var on = {}, sA;
function HN() {
  if (sA) return on;
  sA = 1;
  var E = yE.Buffer;
  on._sbcs = _;
  function _(A, t) {
    if (!A)
      throw new Error("SBCS codec is called without the data.");
    if (!A.chars || A.chars.length !== 128 && A.chars.length !== 256)
      throw new Error("Encoding '" + A.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (A.chars.length === 128) {
      for (var R = "", i = 0; i < 128; i++)
        R += String.fromCharCode(i);
      A.chars = R + A.chars;
    }
    this.decodeBuf = E.from(A.chars, "ucs2");
    for (var I = E.alloc(65536, t.defaultCharSingleByte.charCodeAt(0)), i = 0; i < A.chars.length; i++)
      I[A.chars.charCodeAt(i)] = i;
    this.encodeBuf = I;
  }
  _.prototype.encoder = n, _.prototype.decoder = e;
  function n(A, t) {
    this.encodeBuf = t.encodeBuf;
  }
  n.prototype.write = function(A) {
    for (var t = E.alloc(A.length), R = 0; R < A.length; R++)
      t[R] = this.encodeBuf[A.charCodeAt(R)];
    return t;
  }, n.prototype.end = function() {
  };
  function e(A, t) {
    this.decodeBuf = t.decodeBuf;
  }
  return e.prototype.write = function(A) {
    for (var t = this.decodeBuf, R = E.alloc(A.length * 2), i = 0, I = 0, N = 0; N < A.length; N++)
      i = A[N] * 2, I = N * 2, R[I] = t[i], R[I + 1] = t[i + 1];
    return R.toString("ucs2");
  }, e.prototype.end = function() {
  }, on;
}
var wn, lA;
function vN() {
  return lA || (lA = 1, wn = {
    // Not supported by iconv, not sure why.
    10029: "maccenteuro",
    maccenteuro: {
      type: "_sbcs",
      chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    808: "cp808",
    ibm808: "cp808",
    cp808: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    mik: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    cp720: {
      type: "_sbcs",
      chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    ascii8bit: "ascii",
    usascii: "ascii",
    ansix34: "ascii",
    ansix341968: "ascii",
    ansix341986: "ascii",
    csascii: "ascii",
    cp367: "ascii",
    ibm367: "ascii",
    isoir6: "ascii",
    iso646us: "ascii",
    iso646irv: "ascii",
    us: "ascii",
    latin1: "iso88591",
    latin2: "iso88592",
    latin3: "iso88593",
    latin4: "iso88594",
    latin5: "iso88599",
    latin6: "iso885910",
    latin7: "iso885913",
    latin8: "iso885914",
    latin9: "iso885915",
    latin10: "iso885916",
    csisolatin1: "iso88591",
    csisolatin2: "iso88592",
    csisolatin3: "iso88593",
    csisolatin4: "iso88594",
    csisolatincyrillic: "iso88595",
    csisolatinarabic: "iso88596",
    csisolatingreek: "iso88597",
    csisolatinhebrew: "iso88598",
    csisolatin5: "iso88599",
    csisolatin6: "iso885910",
    l1: "iso88591",
    l2: "iso88592",
    l3: "iso88593",
    l4: "iso88594",
    l5: "iso88599",
    l6: "iso885910",
    l7: "iso885913",
    l8: "iso885914",
    l9: "iso885915",
    l10: "iso885916",
    isoir14: "iso646jp",
    isoir57: "iso646cn",
    isoir100: "iso88591",
    isoir101: "iso88592",
    isoir109: "iso88593",
    isoir110: "iso88594",
    isoir144: "iso88595",
    isoir127: "iso88596",
    isoir126: "iso88597",
    isoir138: "iso88598",
    isoir148: "iso88599",
    isoir157: "iso885910",
    isoir166: "tis620",
    isoir179: "iso885913",
    isoir199: "iso885914",
    isoir203: "iso885915",
    isoir226: "iso885916",
    cp819: "iso88591",
    ibm819: "iso88591",
    cyrillic: "iso88595",
    arabic: "iso88596",
    arabic8: "iso88596",
    ecma114: "iso88596",
    asmo708: "iso88596",
    greek: "iso88597",
    greek8: "iso88597",
    ecma118: "iso88597",
    elot928: "iso88597",
    hebrew: "iso88598",
    hebrew8: "iso88598",
    turkish: "iso88599",
    turkish8: "iso88599",
    thai: "iso885911",
    thai8: "iso885911",
    celtic: "iso885914",
    celtic8: "iso885914",
    isoceltic: "iso885914",
    tis6200: "tis620",
    tis62025291: "tis620",
    tis62025330: "tis620",
    1e4: "macroman",
    10006: "macgreek",
    10007: "maccyrillic",
    10079: "maciceland",
    10081: "macturkish",
    cspc8codepage437: "cp437",
    cspc775baltic: "cp775",
    cspc850multilingual: "cp850",
    cspcp852: "cp852",
    cspc862latinhebrew: "cp862",
    cpgr: "cp869",
    msee: "cp1250",
    mscyrl: "cp1251",
    msansi: "cp1252",
    msgreek: "cp1253",
    msturk: "cp1254",
    mshebr: "cp1255",
    msarab: "cp1256",
    winbaltrim: "cp1257",
    cp20866: "koi8r",
    20866: "koi8r",
    ibm878: "koi8r",
    cskoi8r: "koi8r",
    cp21866: "koi8u",
    21866: "koi8u",
    ibm1168: "koi8u",
    strk10482002: "rk1048",
    tcvn5712: "tcvn",
    tcvn57121: "tcvn",
    gb198880: "iso646cn",
    cn: "iso646cn",
    csiso14jisc6220ro: "iso646jp",
    jisc62201969ro: "iso646jp",
    jp: "iso646jp",
    cshproman8: "hproman8",
    r8: "hproman8",
    roman8: "hproman8",
    xroman8: "hproman8",
    ibm1051: "hproman8",
    mac: "macintosh",
    csmacintosh: "macintosh"
  }), wn;
}
var Gn, hA;
function XN() {
  return hA || (hA = 1, Gn = {
    437: "cp437",
    737: "cp737",
    775: "cp775",
    850: "cp850",
    852: "cp852",
    855: "cp855",
    856: "cp856",
    857: "cp857",
    858: "cp858",
    860: "cp860",
    861: "cp861",
    862: "cp862",
    863: "cp863",
    864: "cp864",
    865: "cp865",
    866: "cp866",
    869: "cp869",
    874: "windows874",
    922: "cp922",
    1046: "cp1046",
    1124: "cp1124",
    1125: "cp1125",
    1129: "cp1129",
    1133: "cp1133",
    1161: "cp1161",
    1162: "cp1162",
    1163: "cp1163",
    1250: "windows1250",
    1251: "windows1251",
    1252: "windows1252",
    1253: "windows1253",
    1254: "windows1254",
    1255: "windows1255",
    1256: "windows1256",
    1257: "windows1257",
    1258: "windows1258",
    28591: "iso88591",
    28592: "iso88592",
    28593: "iso88593",
    28594: "iso88594",
    28595: "iso88595",
    28596: "iso88596",
    28597: "iso88597",
    28598: "iso88598",
    28599: "iso88599",
    28600: "iso885910",
    28601: "iso885911",
    28603: "iso885913",
    28604: "iso885914",
    28605: "iso885915",
    28606: "iso885916",
    windows874: {
      type: "_sbcs",
      chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    win874: "windows874",
    cp874: "windows874",
    windows1250: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    win1250: "windows1250",
    cp1250: "windows1250",
    windows1251: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    win1251: "windows1251",
    cp1251: "windows1251",
    windows1252: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    win1252: "windows1252",
    cp1252: "windows1252",
    windows1253: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    win1253: "windows1253",
    cp1253: "windows1253",
    windows1254: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    win1254: "windows1254",
    cp1254: "windows1254",
    windows1255: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    win1255: "windows1255",
    cp1255: "windows1255",
    windows1256: {
      type: "_sbcs",
      chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    win1256: "windows1256",
    cp1256: "windows1256",
    windows1257: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    win1257: "windows1257",
    cp1257: "windows1257",
    windows1258: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    win1258: "windows1258",
    cp1258: "windows1258",
    iso88591: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28591: "iso88591",
    iso88592: {
      type: "_sbcs",
      chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    cp28592: "iso88592",
    iso88593: {
      type: "_sbcs",
      chars: " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    cp28593: "iso88593",
    iso88594: {
      type: "_sbcs",
      chars: " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    cp28594: "iso88594",
    iso88595: {
      type: "_sbcs",
      chars: " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    cp28595: "iso88595",
    iso88596: {
      type: "_sbcs",
      chars: " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    cp28596: "iso88596",
    iso88597: {
      type: "_sbcs",
      chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    cp28597: "iso88597",
    iso88598: {
      type: "_sbcs",
      chars: " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    cp28598: "iso88598",
    iso88599: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    cp28599: "iso88599",
    iso885910: {
      type: "_sbcs",
      chars: " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    cp28600: "iso885910",
    iso885911: {
      type: "_sbcs",
      chars: " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    cp28601: "iso885911",
    iso885913: {
      type: "_sbcs",
      chars: " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    cp28603: "iso885913",
    iso885914: {
      type: "_sbcs",
      chars: " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    cp28604: "iso885914",
    iso885915: {
      type: "_sbcs",
      chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28605: "iso885915",
    iso885916: {
      type: "_sbcs",
      chars: " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    cp28606: "iso885916",
    cp437: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm437: "cp437",
    csibm437: "cp437",
    cp737: {
      type: "_sbcs",
      chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    ibm737: "cp737",
    csibm737: "cp737",
    cp775: {
      type: "_sbcs",
      chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    ibm775: "cp775",
    csibm775: "cp775",
    cp850: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm850: "cp850",
    csibm850: "cp850",
    cp852: {
      type: "_sbcs",
      chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    ibm852: "cp852",
    csibm852: "cp852",
    cp855: {
      type: "_sbcs",
      chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    ibm855: "cp855",
    csibm855: "cp855",
    cp856: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm856: "cp856",
    csibm856: "cp856",
    cp857: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    ibm857: "cp857",
    csibm857: "cp857",
    cp858: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm858: "cp858",
    csibm858: "cp858",
    cp860: {
      type: "_sbcs",
      chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm860: "cp860",
    csibm860: "cp860",
    cp861: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm861: "cp861",
    csibm861: "cp861",
    cp862: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm862: "cp862",
    csibm862: "cp862",
    cp863: {
      type: "_sbcs",
      chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm863: "cp863",
    csibm863: "cp863",
    cp864: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�`
    },
    ibm864: "cp864",
    csibm864: "cp864",
    cp865: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm865: "cp865",
    csibm865: "cp865",
    cp866: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    ibm866: "cp866",
    csibm866: "cp866",
    cp869: {
      type: "_sbcs",
      chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    ibm869: "cp869",
    csibm869: "cp869",
    cp922: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    ibm922: "cp922",
    csibm922: "cp922",
    cp1046: {
      type: "_sbcs",
      chars: "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    ibm1046: "cp1046",
    csibm1046: "cp1046",
    cp1124: {
      type: "_sbcs",
      chars: " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    ibm1124: "cp1124",
    csibm1124: "cp1124",
    cp1125: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    ibm1125: "cp1125",
    csibm1125: "cp1125",
    cp1129: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1129: "cp1129",
    csibm1129: "cp1129",
    cp1133: {
      type: "_sbcs",
      chars: " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    ibm1133: "cp1133",
    csibm1133: "cp1133",
    cp1161: {
      type: "_sbcs",
      chars: "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    ibm1161: "cp1161",
    csibm1161: "cp1161",
    cp1162: {
      type: "_sbcs",
      chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    ibm1162: "cp1162",
    csibm1162: "cp1162",
    cp1163: {
      type: "_sbcs",
      chars: " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1163: "cp1163",
    csibm1163: "cp1163",
    maccroatian: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    maccyrillic: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    macgreek: {
      type: "_sbcs",
      chars: "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    maciceland: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macroman: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macromania: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macthai: {
      type: "_sbcs",
      chars: "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    macturkish: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macukraine: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    koi8r: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8u: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8ru: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8t: {
      type: "_sbcs",
      chars: "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    armscii8: {
      type: "_sbcs",
      chars: " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    rk1048: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    tcvn: {
      type: "_sbcs",
      chars: `\0ÚỤỪỬỮ\x07\b	
\v\f\rỨỰỲỶỸÝỴ\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ`
    },
    georgianacademy: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    georgianps: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    pt154: {
      type: "_sbcs",
      chars: "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    viscii: {
      type: "_sbcs",
      chars: `\0ẲẴẪ\x07\b	
\v\f\rỶỸ\x1BỴ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ`
    },
    iso646cn: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    iso646jp: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    hproman8: {
      type: "_sbcs",
      chars: " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    macintosh: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    ascii: {
      type: "_sbcs",
      chars: "��������������������������������������������������������������������������������������������������������������������������������"
    },
    tis620: {
      type: "_sbcs",
      chars: "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  }), Gn;
}
var Fn = {}, SA;
function KN() {
  if (SA) return Fn;
  SA = 1;
  var E = yE.Buffer;
  Fn._dbcs = I;
  for (var _ = -1, n = -2, e = -10, A = -1e3, t = new Array(256), R = -1, i = 0; i < 256; i++)
    t[i] = _;
  function I(u, C) {
    if (this.encodingName = u.encodingName, !u)
      throw new Error("DBCS codec is called without the data.");
    if (!u.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var r = u.table();
    this.decodeTables = [], this.decodeTables[0] = t.slice(0), this.decodeTableSeq = [];
    for (var D = 0; D < r.length; D++)
      this._addDecodeChunk(r[D]);
    if (typeof u.gb18030 == "function") {
      this.gb18030 = u.gb18030();
      var c = this.decodeTables.length;
      this.decodeTables.push(t.slice(0));
      var l = this.decodeTables.length;
      this.decodeTables.push(t.slice(0));
      for (var S = this.decodeTables[0], D = 129; D <= 254; D++)
        for (var B = this.decodeTables[A - S[D]], h = 48; h <= 57; h++) {
          if (B[h] === _)
            B[h] = A - c;
          else if (B[h] > A)
            throw new Error("gb18030 decode tables conflict at byte 2");
          for (var g = this.decodeTables[A - B[h]], L = 129; L <= 254; L++) {
            if (g[L] === _)
              g[L] = A - l;
            else {
              if (g[L] === A - l)
                continue;
              if (g[L] > A)
                throw new Error("gb18030 decode tables conflict at byte 3");
            }
            for (var U = this.decodeTables[A - g[L]], F = 48; F <= 57; F++)
              U[F] === _ && (U[F] = n);
          }
        }
    }
    this.defaultCharUnicode = C.defaultCharUnicode, this.encodeTable = [], this.encodeTableSeq = [];
    var Q = {};
    if (u.encodeSkipVals)
      for (var D = 0; D < u.encodeSkipVals.length; D++) {
        var y = u.encodeSkipVals[D];
        if (typeof y == "number")
          Q[y] = !0;
        else
          for (var h = y.from; h <= y.to; h++)
            Q[h] = !0;
      }
    if (this._fillEncodeTable(0, 0, Q), u.encodeAdd)
      for (var k in u.encodeAdd)
        Object.prototype.hasOwnProperty.call(u.encodeAdd, k) && this._setEncodeChar(k.charCodeAt(0), u.encodeAdd[k]);
    this.defCharSB = this.encodeTable[0][C.defaultCharSingleByte.charCodeAt(0)], this.defCharSB === _ && (this.defCharSB = this.encodeTable[0]["?"]), this.defCharSB === _ && (this.defCharSB = 63);
  }
  I.prototype.encoder = N, I.prototype.decoder = T, I.prototype._getDecodeTrieNode = function(u) {
    for (var C = []; u > 0; u >>>= 8)
      C.push(u & 255);
    C.length == 0 && C.push(0);
    for (var r = this.decodeTables[0], D = C.length - 1; D > 0; D--) {
      var c = r[C[D]];
      if (c == _)
        r[C[D]] = A - this.decodeTables.length, this.decodeTables.push(r = t.slice(0));
      else if (c <= A)
        r = this.decodeTables[A - c];
      else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + u.toString(16));
    }
    return r;
  }, I.prototype._addDecodeChunk = function(u) {
    var C = parseInt(u[0], 16), r = this._getDecodeTrieNode(C);
    C = C & 255;
    for (var D = 1; D < u.length; D++) {
      var c = u[D];
      if (typeof c == "string")
        for (var l = 0; l < c.length; ) {
          var S = c.charCodeAt(l++);
          if (S >= 55296 && S < 56320) {
            var B = c.charCodeAt(l++);
            if (B >= 56320 && B < 57344)
              r[C++] = 65536 + (S - 55296) * 1024 + (B - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + u[0]);
          } else if (S > 4080 && S <= 4095) {
            for (var h = 4095 - S + 2, g = [], L = 0; L < h; L++)
              g.push(c.charCodeAt(l++));
            r[C++] = e - this.decodeTableSeq.length, this.decodeTableSeq.push(g);
          } else
            r[C++] = S;
        }
      else if (typeof c == "number")
        for (var U = r[C - 1] + 1, l = 0; l < c; l++)
          r[C++] = U++;
      else
        throw new Error("Incorrect type '" + typeof c + "' given in " + this.encodingName + " at chunk " + u[0]);
    }
    if (C > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + u[0] + ": too long" + C);
  }, I.prototype._getEncodeBucket = function(u) {
    var C = u >> 8;
    return this.encodeTable[C] === void 0 && (this.encodeTable[C] = t.slice(0)), this.encodeTable[C];
  }, I.prototype._setEncodeChar = function(u, C) {
    var r = this._getEncodeBucket(u), D = u & 255;
    r[D] <= e ? this.encodeTableSeq[e - r[D]][R] = C : r[D] == _ && (r[D] = C);
  }, I.prototype._setEncodeSequence = function(u, C) {
    var r = u[0], D = this._getEncodeBucket(r), c = r & 255, l;
    D[c] <= e ? l = this.encodeTableSeq[e - D[c]] : (l = {}, D[c] !== _ && (l[R] = D[c]), D[c] = e - this.encodeTableSeq.length, this.encodeTableSeq.push(l));
    for (var S = 1; S < u.length - 1; S++) {
      var B = l[r];
      typeof B == "object" ? l = B : (l = l[r] = {}, B !== void 0 && (l[R] = B));
    }
    r = u[u.length - 1], l[r] = C;
  }, I.prototype._fillEncodeTable = function(u, C, r) {
    for (var D = this.decodeTables[u], c = !1, l = {}, S = 0; S < 256; S++) {
      var B = D[S], h = C + S;
      if (!r[h])
        if (B >= 0)
          this._setEncodeChar(B, h), c = !0;
        else if (B <= A) {
          var g = A - B;
          if (!l[g]) {
            var L = h << 8 >>> 0;
            this._fillEncodeTable(g, L, r) ? c = !0 : l[g] = !0;
          }
        } else B <= e && (this._setEncodeSequence(this.decodeTableSeq[e - B], h), c = !0);
    }
    return c;
  };
  function N(u, C) {
    this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = C.encodeTable, this.encodeTableSeq = C.encodeTableSeq, this.defaultCharSingleByte = C.defCharSB, this.gb18030 = C.gb18030;
  }
  N.prototype.write = function(u) {
    for (var C = E.alloc(u.length * (this.gb18030 ? 4 : 3)), r = this.leadSurrogate, D = this.seqObj, c = -1, l = 0, S = 0; ; ) {
      if (c === -1) {
        if (l == u.length) break;
        var B = u.charCodeAt(l++);
      } else {
        var B = c;
        c = -1;
      }
      if (B >= 55296 && B < 57344)
        if (B < 56320)
          if (r === -1) {
            r = B;
            continue;
          } else
            r = B, B = _;
        else
          r !== -1 ? (B = 65536 + (r - 55296) * 1024 + (B - 56320), r = -1) : B = _;
      else r !== -1 && (c = B, B = _, r = -1);
      var h = _;
      if (D !== void 0 && B != _) {
        var g = D[B];
        if (typeof g == "object") {
          D = g;
          continue;
        } else typeof g == "number" ? h = g : g == null && (g = D[R], g !== void 0 && (h = g, c = B));
        D = void 0;
      } else if (B >= 0) {
        var L = this.encodeTable[B >> 8];
        if (L !== void 0 && (h = L[B & 255]), h <= e) {
          D = this.encodeTableSeq[e - h];
          continue;
        }
        if (h == _ && this.gb18030) {
          var U = a(this.gb18030.uChars, B);
          if (U != -1) {
            var h = this.gb18030.gbChars[U] + (B - this.gb18030.uChars[U]);
            C[S++] = 129 + Math.floor(h / 12600), h = h % 12600, C[S++] = 48 + Math.floor(h / 1260), h = h % 1260, C[S++] = 129 + Math.floor(h / 10), h = h % 10, C[S++] = 48 + h;
            continue;
          }
        }
      }
      h === _ && (h = this.defaultCharSingleByte), h < 256 ? C[S++] = h : h < 65536 ? (C[S++] = h >> 8, C[S++] = h & 255) : h < 16777216 ? (C[S++] = h >> 16, C[S++] = h >> 8 & 255, C[S++] = h & 255) : (C[S++] = h >>> 24, C[S++] = h >>> 16 & 255, C[S++] = h >>> 8 & 255, C[S++] = h & 255);
    }
    return this.seqObj = D, this.leadSurrogate = r, C.slice(0, S);
  }, N.prototype.end = function() {
    if (!(this.leadSurrogate === -1 && this.seqObj === void 0)) {
      var u = E.alloc(10), C = 0;
      if (this.seqObj) {
        var r = this.seqObj[R];
        r !== void 0 && (r < 256 ? u[C++] = r : (u[C++] = r >> 8, u[C++] = r & 255)), this.seqObj = void 0;
      }
      return this.leadSurrogate !== -1 && (u[C++] = this.defaultCharSingleByte, this.leadSurrogate = -1), u.slice(0, C);
    }
  }, N.prototype.findIdx = a;
  function T(u, C) {
    this.nodeIdx = 0, this.prevBytes = [], this.decodeTables = C.decodeTables, this.decodeTableSeq = C.decodeTableSeq, this.defaultCharUnicode = C.defaultCharUnicode, this.gb18030 = C.gb18030;
  }
  T.prototype.write = function(u) {
    for (var C = E.alloc(u.length * 2), r = this.nodeIdx, D = this.prevBytes, c = this.prevBytes.length, l = -this.prevBytes.length, S, B = 0, h = 0; B < u.length; B++) {
      var g = B >= 0 ? u[B] : D[B + c], S = this.decodeTables[r][g];
      if (!(S >= 0)) if (S === _)
        S = this.defaultCharUnicode.charCodeAt(0), B = l;
      else if (S === n) {
        if (B >= 3)
          var L = (u[B - 3] - 129) * 12600 + (u[B - 2] - 48) * 1260 + (u[B - 1] - 129) * 10 + (g - 48);
        else
          var L = (D[B - 3 + c] - 129) * 12600 + ((B - 2 >= 0 ? u[B - 2] : D[B - 2 + c]) - 48) * 1260 + ((B - 1 >= 0 ? u[B - 1] : D[B - 1 + c]) - 129) * 10 + (g - 48);
        var U = a(this.gb18030.gbChars, L);
        S = this.gb18030.uChars[U] + L - this.gb18030.gbChars[U];
      } else if (S <= A) {
        r = A - S;
        continue;
      } else if (S <= e) {
        for (var F = this.decodeTableSeq[e - S], Q = 0; Q < F.length - 1; Q++)
          S = F[Q], C[h++] = S & 255, C[h++] = S >> 8;
        S = F[F.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + S + " at " + r + "/" + g);
      if (S >= 65536) {
        S -= 65536;
        var y = 55296 | S >> 10;
        C[h++] = y & 255, C[h++] = y >> 8, S = 56320 | S & 1023;
      }
      C[h++] = S & 255, C[h++] = S >> 8, r = 0, l = B + 1;
    }
    return this.nodeIdx = r, this.prevBytes = l >= 0 ? Array.prototype.slice.call(u, l) : D.slice(l + c).concat(Array.prototype.slice.call(u)), C.slice(0, h).toString("ucs2");
  }, T.prototype.end = function() {
    for (var u = ""; this.prevBytes.length > 0; ) {
      u += this.defaultCharUnicode;
      var C = this.prevBytes.slice(1);
      this.prevBytes = [], this.nodeIdx = 0, C.length > 0 && (u += this.write(C));
    }
    return this.prevBytes = [], this.nodeIdx = 0, u;
  };
  function a(u, C) {
    if (u[0] > C)
      return -1;
    for (var r = 0, D = u.length; r < D - 1; ) {
      var c = r + (D - r + 1 >> 1);
      u[c] <= C ? r = c : D = c;
    }
    return r;
  }
  return Fn;
}
const kN = [
  [
    "0",
    "\0",
    128
  ],
  [
    "a1",
    "｡",
    62
  ],
  [
    "8140",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×"
  ],
  [
    "8180",
    "÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "81b8",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "81c8",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "81da",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "81f0",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "81fc",
    "◯"
  ],
  [
    "824f",
    "０",
    9
  ],
  [
    "8260",
    "Ａ",
    25
  ],
  [
    "8281",
    "ａ",
    25
  ],
  [
    "829f",
    "ぁ",
    82
  ],
  [
    "8340",
    "ァ",
    62
  ],
  [
    "8380",
    "ム",
    22
  ],
  [
    "839f",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "83bf",
    "α",
    16,
    "σ",
    6
  ],
  [
    "8440",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "8470",
    "а",
    5,
    "ёж",
    7
  ],
  [
    "8480",
    "о",
    17
  ],
  [
    "849f",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "8740",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "875f",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "877e",
    "㍻"
  ],
  [
    "8780",
    "〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "889f",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "8940",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
  ],
  [
    "8980",
    "園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "8a40",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
  ],
  [
    "8a80",
    "橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "8b40",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
  ],
  [
    "8b80",
    "朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "8c40",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
  ],
  [
    "8c80",
    "劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "8d40",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
  ],
  [
    "8d80",
    "項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "8e40",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
  ],
  [
    "8e80",
    "死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "8f40",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
  ],
  [
    "8f80",
    "準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "9040",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
  ],
  [
    "9080",
    "逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "9140",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
  ],
  [
    "9180",
    "操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "9240",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
  ],
  [
    "9280",
    "逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "9340",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
  ],
  [
    "9380",
    "凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "9440",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
  ],
  [
    "9480",
    "楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "9540",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
  ],
  [
    "9580",
    "斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "9640",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
  ],
  [
    "9680",
    "摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "9740",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
  ],
  [
    "9780",
    "沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "9840",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "989f",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "9940",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
  ],
  [
    "9980",
    "凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "9a40",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
  ],
  [
    "9a80",
    "噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "9b40",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
  ],
  [
    "9b80",
    "它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "9c40",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
  ],
  [
    "9c80",
    "怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "9d40",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
  ],
  [
    "9d80",
    "捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "9e40",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
  ],
  [
    "9e80",
    "梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "9f40",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
  ],
  [
    "9f80",
    "麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "e040",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
  ],
  [
    "e080",
    "烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e140",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
  ],
  [
    "e180",
    "痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e240",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
  ],
  [
    "e280",
    "窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e340",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
  ],
  [
    "e380",
    "縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e440",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
  ],
  [
    "e480",
    "艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e540",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
  ],
  [
    "e580",
    "蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "e640",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
  ],
  [
    "e680",
    "諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "e740",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
  ],
  [
    "e780",
    "轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "e840",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
  ],
  [
    "e880",
    "閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "e940",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
  ],
  [
    "e980",
    "騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "ea40",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
  ],
  [
    "ea80",
    "黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
  ],
  [
    "ed40",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
  ],
  [
    "ed80",
    "塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "ee40",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
  ],
  [
    "ee80",
    "蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "eeef",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "f040",
    "",
    62
  ],
  [
    "f080",
    "",
    124
  ],
  [
    "f140",
    "",
    62
  ],
  [
    "f180",
    "",
    124
  ],
  [
    "f240",
    "",
    62
  ],
  [
    "f280",
    "",
    124
  ],
  [
    "f340",
    "",
    62
  ],
  [
    "f380",
    "",
    124
  ],
  [
    "f440",
    "",
    62
  ],
  [
    "f480",
    "",
    124
  ],
  [
    "f540",
    "",
    62
  ],
  [
    "f580",
    "",
    124
  ],
  [
    "f640",
    "",
    62
  ],
  [
    "f680",
    "",
    124
  ],
  [
    "f740",
    "",
    62
  ],
  [
    "f780",
    "",
    124
  ],
  [
    "f840",
    "",
    62
  ],
  [
    "f880",
    "",
    124
  ],
  [
    "f940",
    ""
  ],
  [
    "fa40",
    "ⅰ",
    9,
    "Ⅰ",
    9,
    "￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
  ],
  [
    "fa80",
    "兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
  ],
  [
    "fb40",
    "涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
  ],
  [
    "fb80",
    "祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
  ],
  [
    "fc40",
    "髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ]
], jN = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8ea1",
    "｡",
    62
  ],
  [
    "a1a1",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
  ],
  [
    "a2a1",
    "◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "a2ba",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "a2ca",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "a2dc",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "a2f2",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "a2fe",
    "◯"
  ],
  [
    "a3b0",
    "０",
    9
  ],
  [
    "a3c1",
    "Ａ",
    25
  ],
  [
    "a3e1",
    "ａ",
    25
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a8a1",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "ada1",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "adc0",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "addf",
    "㍻〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "b0a1",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "b1a1",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
  ],
  [
    "b2a1",
    "押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "b3a1",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
  ],
  [
    "b4a1",
    "粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "b5a1",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
  ],
  [
    "b6a1",
    "供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "b7a1",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
  ],
  [
    "b8a1",
    "検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "b9a1",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
  ],
  [
    "baa1",
    "此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "bba1",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
  ],
  [
    "bca1",
    "次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "bda1",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
  ],
  [
    "bea1",
    "勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "bfa1",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
  ],
  [
    "c0a1",
    "澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "c1a1",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
  ],
  [
    "c2a1",
    "臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "c3a1",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
  ],
  [
    "c4a1",
    "帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "c5a1",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
  ],
  [
    "c6a1",
    "董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "c7a1",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
  ],
  [
    "c8a1",
    "函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "c9a1",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
  ],
  [
    "caa1",
    "福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "cba1",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
  ],
  [
    "cca1",
    "漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "cda1",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
  ],
  [
    "cea1",
    "痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "cfa1",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "d0a1",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "d1a1",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
  ],
  [
    "d2a1",
    "辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "d3a1",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
  ],
  [
    "d4a1",
    "圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "d5a1",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
  ],
  [
    "d6a1",
    "屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "d7a1",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
  ],
  [
    "d8a1",
    "悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "d9a1",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
  ],
  [
    "daa1",
    "據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "dba1",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
  ],
  [
    "dca1",
    "棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "dda1",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
  ],
  [
    "dea1",
    "沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "dfa1",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
  ],
  [
    "e0a1",
    "燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e1a1",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
  ],
  [
    "e2a1",
    "癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e3a1",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
  ],
  [
    "e4a1",
    "筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e5a1",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
  ],
  [
    "e6a1",
    "罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e7a1",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
  ],
  [
    "e8a1",
    "茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e9a1",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
  ],
  [
    "eaa1",
    "蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "eba1",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
  ],
  [
    "eca1",
    "譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "eda1",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
  ],
  [
    "eea1",
    "遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "efa1",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
  ],
  [
    "f0a1",
    "陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "f1a1",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
  ],
  [
    "f2a1",
    "髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "f3a1",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
  ],
  [
    "f4a1",
    "堯槇遙瑤凜熙"
  ],
  [
    "f9a1",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
  ],
  [
    "faa1",
    "忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "fba1",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
  ],
  [
    "fca1",
    "釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "fcf1",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "8fa2af",
    "˘ˇ¸˙˝¯˛˚～΄΅"
  ],
  [
    "8fa2c2",
    "¡¦¿"
  ],
  [
    "8fa2eb",
    "ºª©®™¤№"
  ],
  [
    "8fa6e1",
    "ΆΈΉΊΪ"
  ],
  [
    "8fa6e7",
    "Ό"
  ],
  [
    "8fa6e9",
    "ΎΫ"
  ],
  [
    "8fa6ec",
    "Ώ"
  ],
  [
    "8fa6f1",
    "άέήίϊΐόςύϋΰώ"
  ],
  [
    "8fa7c2",
    "Ђ",
    10,
    "ЎЏ"
  ],
  [
    "8fa7f2",
    "ђ",
    10,
    "ўџ"
  ],
  [
    "8fa9a1",
    "ÆĐ"
  ],
  [
    "8fa9a4",
    "Ħ"
  ],
  [
    "8fa9a6",
    "Ĳ"
  ],
  [
    "8fa9a8",
    "ŁĿ"
  ],
  [
    "8fa9ab",
    "ŊØŒ"
  ],
  [
    "8fa9af",
    "ŦÞ"
  ],
  [
    "8fa9c1",
    "æđðħıĳĸłŀŉŋøœßŧþ"
  ],
  [
    "8faaa1",
    "ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
  ],
  [
    "8faaba",
    "ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
  ],
  [
    "8faba1",
    "áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
  ],
  [
    "8fabbd",
    "ġĥíìïîǐ"
  ],
  [
    "8fabc5",
    "īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
  ],
  [
    "8fb0a1",
    "丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
  ],
  [
    "8fb1a1",
    "侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
  ],
  [
    "8fb2a1",
    "傒傓傔傖傛傜傞",
    4,
    "傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
  ],
  [
    "8fb3a1",
    "凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
  ],
  [
    "8fb4a1",
    "匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
  ],
  [
    "8fb5a1",
    "咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
  ],
  [
    "8fb6a1",
    "嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
    5,
    "嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
    4,
    "囱囫园"
  ],
  [
    "8fb7a1",
    "囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
    4,
    "坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
  ],
  [
    "8fb8a1",
    "堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
  ],
  [
    "8fb9a1",
    "奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
  ],
  [
    "8fbaa1",
    "嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
    4,
    "寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
  ],
  [
    "8fbba1",
    "屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
  ],
  [
    "8fbca1",
    "巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
    4,
    "幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
  ],
  [
    "8fbda1",
    "彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
    4,
    "忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
  ],
  [
    "8fbea1",
    "悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
    4,
    "愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
  ],
  [
    "8fbfa1",
    "懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
  ],
  [
    "8fc0a1",
    "捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
  ],
  [
    "8fc1a1",
    "擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
  ],
  [
    "8fc2a1",
    "昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
  ],
  [
    "8fc3a1",
    "杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
    4,
    "桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
  ],
  [
    "8fc4a1",
    "棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
  ],
  [
    "8fc5a1",
    "樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
  ],
  [
    "8fc6a1",
    "歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
  ],
  [
    "8fc7a1",
    "泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
  ],
  [
    "8fc8a1",
    "湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
  ],
  [
    "8fc9a1",
    "濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
    4,
    "炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
    4,
    "焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
  ],
  [
    "8fcaa1",
    "煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
  ],
  [
    "8fcba1",
    "狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
  ],
  [
    "8fcca1",
    "珿琀琁琄琇琊琑琚琛琤琦琨",
    9,
    "琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
  ],
  [
    "8fcda1",
    "甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
    5,
    "疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
  ],
  [
    "8fcea1",
    "瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
    6,
    "皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
  ],
  [
    "8fcfa1",
    "睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
  ],
  [
    "8fd0a1",
    "碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
  ],
  [
    "8fd1a1",
    "秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
  ],
  [
    "8fd2a1",
    "笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
    5
  ],
  [
    "8fd3a1",
    "籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
  ],
  [
    "8fd4a1",
    "綞綦綧綪綳綶綷綹緂",
    4,
    "緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
  ],
  [
    "8fd5a1",
    "罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
  ],
  [
    "8fd6a1",
    "胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
  ],
  [
    "8fd7a1",
    "艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
  ],
  [
    "8fd8a1",
    "荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
  ],
  [
    "8fd9a1",
    "蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
    4,
    "蕖蕙蕜",
    6,
    "蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
  ],
  [
    "8fdaa1",
    "藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
    4,
    "虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
  ],
  [
    "8fdba1",
    "蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
    6,
    "螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
  ],
  [
    "8fdca1",
    "蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
    4,
    "裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
  ],
  [
    "8fdda1",
    "襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
    4,
    "觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
  ],
  [
    "8fdea1",
    "誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
    4,
    "譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
  ],
  [
    "8fdfa1",
    "貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
  ],
  [
    "8fe0a1",
    "踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
  ],
  [
    "8fe1a1",
    "轃轇轏轑",
    4,
    "轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
  ],
  [
    "8fe2a1",
    "郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
  ],
  [
    "8fe3a1",
    "釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
    5,
    "釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
    4,
    "鉻鉼鉽鉿銈銉銊銍銎銒銗"
  ],
  [
    "8fe4a1",
    "銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
    4,
    "鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
  ],
  [
    "8fe5a1",
    "鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
    4,
    "鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
  ],
  [
    "8fe6a1",
    "镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
  ],
  [
    "8fe7a1",
    "霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
  ],
  [
    "8fe8a1",
    "頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
    4,
    "餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
  ],
  [
    "8fe9a1",
    "馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
    4
  ],
  [
    "8feaa1",
    "鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
    4,
    "魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
  ],
  [
    "8feba1",
    "鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
    4,
    "鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
  ],
  [
    "8feca1",
    "鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
  ],
  [
    "8feda1",
    "黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
    4,
    "齓齕齖齗齘齚齝齞齨齩齭",
    4,
    "齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
  ]
], Pn = [
  [
    "0",
    "\0",
    127,
    "€"
  ],
  [
    "8140",
    "丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
    5,
    "乲乴",
    9,
    "乿",
    6,
    "亇亊"
  ],
  [
    "8180",
    "亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
    6,
    "伋伌伒",
    4,
    "伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
    4,
    "佄佅佇",
    5,
    "佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
  ],
  [
    "8240",
    "侤侫侭侰",
    4,
    "侶",
    8,
    "俀俁係俆俇俈俉俋俌俍俒",
    4,
    "俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
    11
  ],
  [
    "8280",
    "個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
    10,
    "倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
    4,
    "偖偗偘偙偛偝",
    7,
    "偦",
    5,
    "偭",
    8,
    "偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
    20,
    "傤傦傪傫傭",
    4,
    "傳",
    6,
    "傼"
  ],
  [
    "8340",
    "傽",
    17,
    "僐",
    5,
    "僗僘僙僛",
    10,
    "僨僩僪僫僯僰僱僲僴僶",
    4,
    "僼",
    9,
    "儈"
  ],
  [
    "8380",
    "儉儊儌",
    5,
    "儓",
    13,
    "儢",
    28,
    "兂兇兊兌兎兏児兒兓兗兘兙兛兝",
    4,
    "兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
    4,
    "冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
    5
  ],
  [
    "8440",
    "凘凙凚凜凞凟凢凣凥",
    5,
    "凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
    5,
    "剋剎剏剒剓剕剗剘"
  ],
  [
    "8480",
    "剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
    9,
    "剾劀劃",
    4,
    "劉",
    6,
    "劑劒劔",
    6,
    "劜劤劥劦劧劮劯劰労",
    9,
    "勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
    5,
    "勠勡勢勣勥",
    10,
    "勱",
    7,
    "勻勼勽匁匂匃匄匇匉匊匋匌匎"
  ],
  [
    "8540",
    "匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
    9,
    "匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
  ],
  [
    "8580",
    "厐",
    4,
    "厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
    6,
    "厷厸厹厺厼厽厾叀參",
    4,
    "収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
    4,
    "呣呥呧呩",
    7,
    "呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
  ],
  [
    "8640",
    "咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
    4,
    "哫哬哯哰哱哴",
    5,
    "哻哾唀唂唃唄唅唈唊",
    4,
    "唒唓唕",
    5,
    "唜唝唞唟唡唥唦"
  ],
  [
    "8680",
    "唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
    4,
    "啑啒啓啔啗",
    4,
    "啝啞啟啠啢啣啨啩啫啯",
    5,
    "啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
    6,
    "喨",
    8,
    "喲喴営喸喺喼喿",
    4,
    "嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
    4,
    "嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
    4,
    "嗿嘂嘃嘄嘅"
  ],
  [
    "8740",
    "嘆嘇嘊嘋嘍嘐",
    7,
    "嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
    11,
    "噏",
    4,
    "噕噖噚噛噝",
    4
  ],
  [
    "8780",
    "噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
    7,
    "嚇",
    6,
    "嚐嚑嚒嚔",
    14,
    "嚤",
    10,
    "嚰",
    6,
    "嚸嚹嚺嚻嚽",
    12,
    "囋",
    8,
    "囕囖囘囙囜団囥",
    5,
    "囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
    6
  ],
  [
    "8840",
    "園",
    9,
    "圝圞圠圡圢圤圥圦圧圫圱圲圴",
    4,
    "圼圽圿坁坃坄坅坆坈坉坋坒",
    4,
    "坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
  ],
  [
    "8880",
    "垁垇垈垉垊垍",
    4,
    "垔",
    6,
    "垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
    8,
    "埄",
    6,
    "埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
    7,
    "埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
    4,
    "堫",
    4,
    "報堲堳場堶",
    7
  ],
  [
    "8940",
    "堾",
    5,
    "塅",
    6,
    "塎塏塐塒塓塕塖塗塙",
    4,
    "塟",
    5,
    "塦",
    4,
    "塭",
    16,
    "塿墂墄墆墇墈墊墋墌"
  ],
  [
    "8980",
    "墍",
    4,
    "墔",
    4,
    "墛墜墝墠",
    7,
    "墪",
    17,
    "墽墾墿壀壂壃壄壆",
    10,
    "壒壓壔壖",
    13,
    "壥",
    5,
    "壭壯壱売壴壵壷壸壺",
    7,
    "夃夅夆夈",
    4,
    "夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
  ],
  [
    "8a40",
    "夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
    4,
    "奡奣奤奦",
    12,
    "奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
  ],
  [
    "8a80",
    "妧妬妭妰妱妳",
    5,
    "妺妼妽妿",
    6,
    "姇姈姉姌姍姎姏姕姖姙姛姞",
    4,
    "姤姦姧姩姪姫姭",
    11,
    "姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
    6,
    "娳娵娷",
    4,
    "娽娾娿婁",
    4,
    "婇婈婋",
    9,
    "婖婗婘婙婛",
    5
  ],
  [
    "8b40",
    "婡婣婤婥婦婨婩婫",
    8,
    "婸婹婻婼婽婾媀",
    17,
    "媓",
    6,
    "媜",
    13,
    "媫媬"
  ],
  [
    "8b80",
    "媭",
    4,
    "媴媶媷媹",
    4,
    "媿嫀嫃",
    5,
    "嫊嫋嫍",
    4,
    "嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
    4,
    "嫲",
    22,
    "嬊",
    11,
    "嬘",
    25,
    "嬳嬵嬶嬸",
    7,
    "孁",
    6
  ],
  [
    "8c40",
    "孈",
    7,
    "孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
  ],
  [
    "8c80",
    "寑寔",
    8,
    "寠寢寣實寧審",
    4,
    "寯寱",
    6,
    "寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
    6,
    "屰屲",
    6,
    "屻屼屽屾岀岃",
    4,
    "岉岊岋岎岏岒岓岕岝",
    4,
    "岤",
    4
  ],
  [
    "8d40",
    "岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
    5,
    "峌",
    5,
    "峓",
    5,
    "峚",
    6,
    "峢峣峧峩峫峬峮峯峱",
    9,
    "峼",
    4
  ],
  [
    "8d80",
    "崁崄崅崈",
    5,
    "崏",
    4,
    "崕崗崘崙崚崜崝崟",
    4,
    "崥崨崪崫崬崯",
    4,
    "崵",
    7,
    "崿",
    7,
    "嵈嵉嵍",
    10,
    "嵙嵚嵜嵞",
    10,
    "嵪嵭嵮嵰嵱嵲嵳嵵",
    12,
    "嶃",
    21,
    "嶚嶛嶜嶞嶟嶠"
  ],
  [
    "8e40",
    "嶡",
    21,
    "嶸",
    12,
    "巆",
    6,
    "巎",
    12,
    "巜巟巠巣巤巪巬巭"
  ],
  [
    "8e80",
    "巰巵巶巸",
    4,
    "巿帀帄帇帉帊帋帍帎帒帓帗帞",
    7,
    "帨",
    4,
    "帯帰帲",
    4,
    "帹帺帾帿幀幁幃幆",
    5,
    "幍",
    6,
    "幖",
    4,
    "幜幝幟幠幣",
    14,
    "幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
    4,
    "庮",
    4,
    "庴庺庻庼庽庿",
    6
  ],
  [
    "8f40",
    "廆廇廈廋",
    5,
    "廔廕廗廘廙廚廜",
    11,
    "廩廫",
    8,
    "廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
  ],
  [
    "8f80",
    "弨弫弬弮弰弲",
    6,
    "弻弽弾弿彁",
    14,
    "彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
    5,
    "復徫徬徯",
    5,
    "徶徸徹徺徻徾",
    4,
    "忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
  ],
  [
    "9040",
    "怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
    4,
    "怶",
    4,
    "怽怾恀恄",
    6,
    "恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
  ],
  [
    "9080",
    "悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
    7,
    "惇惈惉惌",
    4,
    "惒惓惔惖惗惙惛惞惡",
    4,
    "惪惱惲惵惷惸惻",
    4,
    "愂愃愄愅愇愊愋愌愐",
    4,
    "愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
    18,
    "慀",
    6
  ],
  [
    "9140",
    "慇慉態慍慏慐慒慓慔慖",
    6,
    "慞慟慠慡慣慤慥慦慩",
    6,
    "慱慲慳慴慶慸",
    18,
    "憌憍憏",
    4,
    "憕"
  ],
  [
    "9180",
    "憖",
    6,
    "憞",
    8,
    "憪憫憭",
    9,
    "憸",
    5,
    "憿懀懁懃",
    4,
    "應懌",
    4,
    "懓懕",
    16,
    "懧",
    13,
    "懶",
    8,
    "戀",
    5,
    "戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
    4,
    "扂扄扅扆扊"
  ],
  [
    "9240",
    "扏扐払扖扗扙扚扜",
    6,
    "扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
    5,
    "抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
  ],
  [
    "9280",
    "拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
    5,
    "挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
    7,
    "捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
    6,
    "採掤掦掫掯掱掲掵掶掹掻掽掿揀"
  ],
  [
    "9340",
    "揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
    6,
    "揟揢揤",
    4,
    "揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
    4,
    "損搎搑搒搕",
    5,
    "搝搟搢搣搤"
  ],
  [
    "9380",
    "搥搧搨搩搫搮",
    5,
    "搵",
    4,
    "搻搼搾摀摂摃摉摋",
    6,
    "摓摕摖摗摙",
    4,
    "摟",
    7,
    "摨摪摫摬摮",
    9,
    "摻",
    6,
    "撃撆撈",
    8,
    "撓撔撗撘撚撛撜撝撟",
    4,
    "撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
    6,
    "擏擑擓擔擕擖擙據"
  ],
  [
    "9440",
    "擛擜擝擟擠擡擣擥擧",
    24,
    "攁",
    7,
    "攊",
    7,
    "攓",
    4,
    "攙",
    8
  ],
  [
    "9480",
    "攢攣攤攦",
    4,
    "攬攭攰攱攲攳攷攺攼攽敀",
    4,
    "敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
    14,
    "斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
    7,
    "斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
    7,
    "旡旣旤旪旫"
  ],
  [
    "9540",
    "旲旳旴旵旸旹旻",
    4,
    "昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
    4,
    "昽昿晀時晄",
    6,
    "晍晎晐晑晘"
  ],
  [
    "9580",
    "晙晛晜晝晞晠晢晣晥晧晩",
    4,
    "晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
    4,
    "暞",
    8,
    "暩",
    4,
    "暯",
    4,
    "暵暶暷暸暺暻暼暽暿",
    25,
    "曚曞",
    7,
    "曧曨曪",
    5,
    "曱曵曶書曺曻曽朁朂會"
  ],
  [
    "9640",
    "朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
    5,
    "朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
    4,
    "杝杢杣杤杦杧杫杬杮東杴杶"
  ],
  [
    "9680",
    "杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
    7,
    "柂柅",
    9,
    "柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
    7,
    "柾栁栂栃栄栆栍栐栒栔栕栘",
    4,
    "栞栟栠栢",
    6,
    "栫",
    6,
    "栴栵栶栺栻栿桇桋桍桏桒桖",
    5
  ],
  [
    "9740",
    "桜桝桞桟桪桬",
    7,
    "桵桸",
    8,
    "梂梄梇",
    7,
    "梐梑梒梔梕梖梘",
    9,
    "梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
  ],
  [
    "9780",
    "梹",
    6,
    "棁棃",
    5,
    "棊棌棎棏棐棑棓棔棖棗棙棛",
    4,
    "棡棢棤",
    9,
    "棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
    4,
    "椌椏椑椓",
    11,
    "椡椢椣椥",
    7,
    "椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
    16,
    "楕楖楘楙楛楜楟"
  ],
  [
    "9840",
    "楡楢楤楥楧楨楩楪楬業楯楰楲",
    4,
    "楺楻楽楾楿榁榃榅榊榋榌榎",
    5,
    "榖榗榙榚榝",
    9,
    "榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
  ],
  [
    "9880",
    "榾榿槀槂",
    7,
    "構槍槏槑槒槓槕",
    5,
    "槜槝槞槡",
    11,
    "槮槯槰槱槳",
    9,
    "槾樀",
    9,
    "樋",
    11,
    "標",
    5,
    "樠樢",
    5,
    "権樫樬樭樮樰樲樳樴樶",
    6,
    "樿",
    4,
    "橅橆橈",
    7,
    "橑",
    6,
    "橚"
  ],
  [
    "9940",
    "橜",
    4,
    "橢橣橤橦",
    10,
    "橲",
    6,
    "橺橻橽橾橿檁檂檃檅",
    8,
    "檏檒",
    4,
    "檘",
    7,
    "檡",
    5
  ],
  [
    "9980",
    "檧檨檪檭",
    114,
    "欥欦欨",
    6
  ],
  [
    "9a40",
    "欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
    11,
    "歚",
    7,
    "歨歩歫",
    13,
    "歺歽歾歿殀殅殈"
  ],
  [
    "9a80",
    "殌殎殏殐殑殔殕殗殘殙殜",
    4,
    "殢",
    7,
    "殫",
    7,
    "殶殸",
    6,
    "毀毃毄毆",
    4,
    "毌毎毐毑毘毚毜",
    4,
    "毢",
    7,
    "毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
    6,
    "氈",
    4,
    "氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
    4,
    "汑汒汓汖汘"
  ],
  [
    "9b40",
    "汙汚汢汣汥汦汧汫",
    4,
    "汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
  ],
  [
    "9b80",
    "泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
    5,
    "洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
    4,
    "涃涄涆涇涊涋涍涏涐涒涖",
    4,
    "涜涢涥涬涭涰涱涳涴涶涷涹",
    5,
    "淁淂淃淈淉淊"
  ],
  [
    "9c40",
    "淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
    7,
    "渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
  ],
  [
    "9c80",
    "渶渷渹渻",
    7,
    "湅",
    7,
    "湏湐湑湒湕湗湙湚湜湝湞湠",
    10,
    "湬湭湯",
    14,
    "満溁溂溄溇溈溊",
    4,
    "溑",
    6,
    "溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
    5
  ],
  [
    "9d40",
    "滰滱滲滳滵滶滷滸滺",
    7,
    "漃漄漅漇漈漊",
    4,
    "漐漑漒漖",
    9,
    "漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
    6,
    "漿潀潁潂"
  ],
  [
    "9d80",
    "潃潄潅潈潉潊潌潎",
    9,
    "潙潚潛潝潟潠潡潣潤潥潧",
    5,
    "潯潰潱潳潵潶潷潹潻潽",
    6,
    "澅澆澇澊澋澏",
    12,
    "澝澞澟澠澢",
    4,
    "澨",
    10,
    "澴澵澷澸澺",
    5,
    "濁濃",
    5,
    "濊",
    6,
    "濓",
    10,
    "濟濢濣濤濥"
  ],
  [
    "9e40",
    "濦",
    7,
    "濰",
    32,
    "瀒",
    7,
    "瀜",
    6,
    "瀤",
    6
  ],
  [
    "9e80",
    "瀫",
    9,
    "瀶瀷瀸瀺",
    17,
    "灍灎灐",
    13,
    "灟",
    11,
    "灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
    12,
    "炰炲炴炵炶為炾炿烄烅烆烇烉烋",
    12,
    "烚"
  ],
  [
    "9f40",
    "烜烝烞烠烡烢烣烥烪烮烰",
    6,
    "烸烺烻烼烾",
    10,
    "焋",
    4,
    "焑焒焔焗焛",
    10,
    "焧",
    7,
    "焲焳焴"
  ],
  [
    "9f80",
    "焵焷",
    13,
    "煆煇煈煉煋煍煏",
    12,
    "煝煟",
    4,
    "煥煩",
    4,
    "煯煰煱煴煵煶煷煹煻煼煾",
    5,
    "熅",
    4,
    "熋熌熍熎熐熑熒熓熕熖熗熚",
    4,
    "熡",
    6,
    "熩熪熫熭",
    5,
    "熴熶熷熸熺",
    8,
    "燄",
    9,
    "燏",
    4
  ],
  [
    "a040",
    "燖",
    9,
    "燡燢燣燤燦燨",
    5,
    "燯",
    9,
    "燺",
    11,
    "爇",
    19
  ],
  [
    "a080",
    "爛爜爞",
    9,
    "爩爫爭爮爯爲爳爴爺爼爾牀",
    6,
    "牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
    4,
    "犌犎犐犑犓",
    11,
    "犠",
    11,
    "犮犱犲犳犵犺",
    6,
    "狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
  ],
  [
    "a1a1",
    "　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
    7,
    "〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
  ],
  [
    "a2a1",
    "ⅰ",
    9
  ],
  [
    "a2b1",
    "⒈",
    19,
    "⑴",
    19,
    "①",
    9
  ],
  [
    "a2e5",
    "㈠",
    9
  ],
  [
    "a2f1",
    "Ⅰ",
    11
  ],
  [
    "a3a1",
    "！＂＃￥％",
    88,
    "￣"
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a6e0",
    "︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
  ],
  [
    "a6ee",
    "︻︼︷︸︱"
  ],
  [
    "a6f4",
    "︳︴"
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a840",
    "ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
    35,
    "▁",
    6
  ],
  [
    "a880",
    "█",
    7,
    "▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
  ],
  [
    "a8a1",
    "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
  ],
  [
    "a8bd",
    "ńň"
  ],
  [
    "a8c0",
    "ɡ"
  ],
  [
    "a8c5",
    "ㄅ",
    36
  ],
  [
    "a940",
    "〡",
    8,
    "㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
  ],
  [
    "a959",
    "℡㈱"
  ],
  [
    "a95c",
    "‐"
  ],
  [
    "a960",
    "ー゛゜ヽヾ〆ゝゞ﹉",
    9,
    "﹔﹕﹖﹗﹙",
    8
  ],
  [
    "a980",
    "﹢",
    4,
    "﹨﹩﹪﹫"
  ],
  [
    "a996",
    "〇"
  ],
  [
    "a9a4",
    "─",
    75
  ],
  [
    "aa40",
    "狜狝狟狢",
    5,
    "狪狫狵狶狹狽狾狿猀猂猄",
    5,
    "猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
    8
  ],
  [
    "aa80",
    "獉獊獋獌獎獏獑獓獔獕獖獘",
    7,
    "獡",
    10,
    "獮獰獱"
  ],
  [
    "ab40",
    "獲",
    11,
    "獿",
    4,
    "玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
    5,
    "玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
    4
  ],
  [
    "ab80",
    "珋珌珎珒",
    6,
    "珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
    4
  ],
  [
    "ac40",
    "珸",
    10,
    "琄琇琈琋琌琍琎琑",
    8,
    "琜",
    5,
    "琣琤琧琩琫琭琯琱琲琷",
    4,
    "琽琾琿瑀瑂",
    11
  ],
  [
    "ac80",
    "瑎",
    6,
    "瑖瑘瑝瑠",
    12,
    "瑮瑯瑱",
    4,
    "瑸瑹瑺"
  ],
  [
    "ad40",
    "瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
    10,
    "璝璟",
    7,
    "璪",
    15,
    "璻",
    12
  ],
  [
    "ad80",
    "瓈",
    9,
    "瓓",
    8,
    "瓝瓟瓡瓥瓧",
    6,
    "瓰瓱瓲"
  ],
  [
    "ae40",
    "瓳瓵瓸",
    6,
    "甀甁甂甃甅",
    7,
    "甎甐甒甔甕甖甗甛甝甞甠",
    4,
    "甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
  ],
  [
    "ae80",
    "畝",
    7,
    "畧畨畩畫",
    6,
    "畳畵當畷畺",
    4,
    "疀疁疂疄疅疇"
  ],
  [
    "af40",
    "疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
    4,
    "疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
  ],
  [
    "af80",
    "瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
  ],
  [
    "b040",
    "癅",
    6,
    "癎",
    5,
    "癕癗",
    4,
    "癝癟癠癡癢癤",
    6,
    "癬癭癮癰",
    7,
    "癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
  ],
  [
    "b080",
    "皜",
    7,
    "皥",
    8,
    "皯皰皳皵",
    9,
    "盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
  ],
  [
    "b140",
    "盄盇盉盋盌盓盕盙盚盜盝盞盠",
    4,
    "盦",
    7,
    "盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
    10,
    "眛眜眝眞眡眣眤眥眧眪眫"
  ],
  [
    "b180",
    "眬眮眰",
    4,
    "眹眻眽眾眿睂睄睅睆睈",
    7,
    "睒",
    7,
    "睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
  ],
  [
    "b240",
    "睝睞睟睠睤睧睩睪睭",
    11,
    "睺睻睼瞁瞂瞃瞆",
    5,
    "瞏瞐瞓",
    11,
    "瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
    4
  ],
  [
    "b280",
    "瞼瞾矀",
    12,
    "矎",
    8,
    "矘矙矚矝",
    4,
    "矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
  ],
  [
    "b340",
    "矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
    5,
    "砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
  ],
  [
    "b380",
    "硛硜硞",
    11,
    "硯",
    7,
    "硸硹硺硻硽",
    6,
    "场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
  ],
  [
    "b440",
    "碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
    7,
    "碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
    9
  ],
  [
    "b480",
    "磤磥磦磧磩磪磫磭",
    4,
    "磳磵磶磸磹磻",
    5,
    "礂礃礄礆",
    6,
    "础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
  ],
  [
    "b540",
    "礍",
    5,
    "礔",
    9,
    "礟",
    4,
    "礥",
    14,
    "礵",
    4,
    "礽礿祂祃祄祅祇祊",
    8,
    "祔祕祘祙祡祣"
  ],
  [
    "b580",
    "祤祦祩祪祫祬祮祰",
    6,
    "祹祻",
    4,
    "禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
  ],
  [
    "b640",
    "禓",
    6,
    "禛",
    11,
    "禨",
    10,
    "禴",
    4,
    "禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
    5,
    "秠秡秢秥秨秪"
  ],
  [
    "b680",
    "秬秮秱",
    6,
    "秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
    4,
    "稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
  ],
  [
    "b740",
    "稝稟稡稢稤",
    14,
    "稴稵稶稸稺稾穀",
    5,
    "穇",
    9,
    "穒",
    4,
    "穘",
    16
  ],
  [
    "b780",
    "穩",
    6,
    "穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
  ],
  [
    "b840",
    "窣窤窧窩窪窫窮",
    4,
    "窴",
    10,
    "竀",
    10,
    "竌",
    9,
    "竗竘竚竛竜竝竡竢竤竧",
    5,
    "竮竰竱竲竳"
  ],
  [
    "b880",
    "竴",
    4,
    "竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
  ],
  [
    "b940",
    "笯笰笲笴笵笶笷笹笻笽笿",
    5,
    "筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
    10,
    "筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
    6,
    "箎箏"
  ],
  [
    "b980",
    "箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
    7,
    "篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
  ],
  [
    "ba40",
    "篅篈築篊篋篍篎篏篐篒篔",
    4,
    "篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
    4,
    "篸篹篺篻篽篿",
    7,
    "簈簉簊簍簎簐",
    5,
    "簗簘簙"
  ],
  [
    "ba80",
    "簚",
    4,
    "簠",
    5,
    "簨簩簫",
    12,
    "簹",
    5,
    "籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
  ],
  [
    "bb40",
    "籃",
    9,
    "籎",
    36,
    "籵",
    5,
    "籾",
    9
  ],
  [
    "bb80",
    "粈粊",
    6,
    "粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
    4,
    "粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
  ],
  [
    "bc40",
    "粿糀糂糃糄糆糉糋糎",
    6,
    "糘糚糛糝糞糡",
    6,
    "糩",
    5,
    "糰",
    7,
    "糹糺糼",
    13,
    "紋",
    5
  ],
  [
    "bc80",
    "紑",
    14,
    "紡紣紤紥紦紨紩紪紬紭紮細",
    6,
    "肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
  ],
  [
    "bd40",
    "紷",
    54,
    "絯",
    7
  ],
  [
    "bd80",
    "絸",
    32,
    "健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
  ],
  [
    "be40",
    "継",
    12,
    "綧",
    6,
    "綯",
    42
  ],
  [
    "be80",
    "線",
    32,
    "尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
  ],
  [
    "bf40",
    "緻",
    62
  ],
  [
    "bf80",
    "縺縼",
    4,
    "繂",
    4,
    "繈",
    21,
    "俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
  ],
  [
    "c040",
    "繞",
    35,
    "纃",
    23,
    "纜纝纞"
  ],
  [
    "c080",
    "纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
    6,
    "罃罆",
    9,
    "罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
  ],
  [
    "c140",
    "罖罙罛罜罝罞罠罣",
    4,
    "罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
    7,
    "羋羍羏",
    4,
    "羕",
    4,
    "羛羜羠羢羣羥羦羨",
    6,
    "羱"
  ],
  [
    "c180",
    "羳",
    4,
    "羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
    4,
    "翖翗翙",
    5,
    "翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
  ],
  [
    "c240",
    "翤翧翨翪翫翬翭翯翲翴",
    6,
    "翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
    5,
    "耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
  ],
  [
    "c280",
    "聙聛",
    13,
    "聫",
    5,
    "聲",
    11,
    "隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
  ],
  [
    "c340",
    "聾肁肂肅肈肊肍",
    5,
    "肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
    4,
    "胏",
    6,
    "胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
  ],
  [
    "c380",
    "脌脕脗脙脛脜脝脟",
    12,
    "脭脮脰脳脴脵脷脹",
    4,
    "脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
  ],
  [
    "c440",
    "腀",
    5,
    "腇腉腍腎腏腒腖腗腘腛",
    4,
    "腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
    4,
    "膉膋膌膍膎膐膒",
    5,
    "膙膚膞",
    4,
    "膤膥"
  ],
  [
    "c480",
    "膧膩膫",
    7,
    "膴",
    5,
    "膼膽膾膿臄臅臇臈臉臋臍",
    6,
    "摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
  ],
  [
    "c540",
    "臔",
    14,
    "臤臥臦臨臩臫臮",
    4,
    "臵",
    5,
    "臽臿舃與",
    4,
    "舎舏舑舓舕",
    5,
    "舝舠舤舥舦舧舩舮舲舺舼舽舿"
  ],
  [
    "c580",
    "艀艁艂艃艅艆艈艊艌艍艎艐",
    7,
    "艙艛艜艝艞艠",
    7,
    "艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
  ],
  [
    "c640",
    "艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
  ],
  [
    "c680",
    "苺苼",
    4,
    "茊茋茍茐茒茓茖茘茙茝",
    9,
    "茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
  ],
  [
    "c740",
    "茾茿荁荂荄荅荈荊",
    4,
    "荓荕",
    4,
    "荝荢荰",
    6,
    "荹荺荾",
    6,
    "莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
    6,
    "莬莭莮"
  ],
  [
    "c780",
    "莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
  ],
  [
    "c840",
    "菮華菳",
    4,
    "菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
    5,
    "萙萚萛萞",
    5,
    "萩",
    7,
    "萲",
    5,
    "萹萺萻萾",
    7,
    "葇葈葉"
  ],
  [
    "c880",
    "葊",
    6,
    "葒",
    4,
    "葘葝葞葟葠葢葤",
    4,
    "葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
  ],
  [
    "c940",
    "葽",
    4,
    "蒃蒄蒅蒆蒊蒍蒏",
    7,
    "蒘蒚蒛蒝蒞蒟蒠蒢",
    12,
    "蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
  ],
  [
    "c980",
    "蓘",
    4,
    "蓞蓡蓢蓤蓧",
    4,
    "蓭蓮蓯蓱",
    10,
    "蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
  ],
  [
    "ca40",
    "蔃",
    8,
    "蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
    8,
    "蔭",
    9,
    "蔾",
    4,
    "蕄蕅蕆蕇蕋",
    10
  ],
  [
    "ca80",
    "蕗蕘蕚蕛蕜蕝蕟",
    4,
    "蕥蕦蕧蕩",
    8,
    "蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
  ],
  [
    "cb40",
    "薂薃薆薈",
    6,
    "薐",
    10,
    "薝",
    6,
    "薥薦薧薩薫薬薭薱",
    5,
    "薸薺",
    6,
    "藂",
    6,
    "藊",
    4,
    "藑藒"
  ],
  [
    "cb80",
    "藔藖",
    5,
    "藝",
    6,
    "藥藦藧藨藪",
    14,
    "恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
  ],
  [
    "cc40",
    "藹藺藼藽藾蘀",
    4,
    "蘆",
    10,
    "蘒蘓蘔蘕蘗",
    15,
    "蘨蘪",
    13,
    "蘹蘺蘻蘽蘾蘿虀"
  ],
  [
    "cc80",
    "虁",
    11,
    "虒虓處",
    4,
    "虛虜虝號虠虡虣",
    7,
    "獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
  ],
  [
    "cd40",
    "虭虯虰虲",
    6,
    "蚃",
    6,
    "蚎",
    4,
    "蚔蚖",
    5,
    "蚞",
    4,
    "蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
    4,
    "蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
  ],
  [
    "cd80",
    "蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
  ],
  [
    "ce40",
    "蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
    6,
    "蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
    5,
    "蝡蝢蝦",
    7,
    "蝯蝱蝲蝳蝵"
  ],
  [
    "ce80",
    "蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
    4,
    "螔螕螖螘",
    6,
    "螠",
    4,
    "巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
  ],
  [
    "cf40",
    "螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
    4,
    "蟇蟈蟉蟌",
    4,
    "蟔",
    6,
    "蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
    9
  ],
  [
    "cf80",
    "蟺蟻蟼蟽蟿蠀蠁蠂蠄",
    5,
    "蠋",
    7,
    "蠔蠗蠘蠙蠚蠜",
    4,
    "蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
  ],
  [
    "d040",
    "蠤",
    13,
    "蠳",
    5,
    "蠺蠻蠽蠾蠿衁衂衃衆",
    5,
    "衎",
    5,
    "衕衖衘衚",
    6,
    "衦衧衪衭衯衱衳衴衵衶衸衹衺"
  ],
  [
    "d080",
    "衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
    4,
    "袝",
    4,
    "袣袥",
    5,
    "小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
  ],
  [
    "d140",
    "袬袮袯袰袲",
    4,
    "袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
    4,
    "裠裡裦裧裩",
    6,
    "裲裵裶裷裺裻製裿褀褁褃",
    5
  ],
  [
    "d180",
    "褉褋",
    4,
    "褑褔",
    4,
    "褜",
    4,
    "褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
  ],
  [
    "d240",
    "褸",
    8,
    "襂襃襅",
    24,
    "襠",
    5,
    "襧",
    19,
    "襼"
  ],
  [
    "d280",
    "襽襾覀覂覄覅覇",
    26,
    "摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
  ],
  [
    "d340",
    "覢",
    30,
    "觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
    6
  ],
  [
    "d380",
    "觻",
    4,
    "訁",
    5,
    "計",
    21,
    "印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
  ],
  [
    "d440",
    "訞",
    31,
    "訿",
    8,
    "詉",
    21
  ],
  [
    "d480",
    "詟",
    25,
    "詺",
    6,
    "浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
  ],
  [
    "d540",
    "誁",
    7,
    "誋",
    7,
    "誔",
    46
  ],
  [
    "d580",
    "諃",
    32,
    "铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
  ],
  [
    "d640",
    "諤",
    34,
    "謈",
    27
  ],
  [
    "d680",
    "謤謥謧",
    30,
    "帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
  ],
  [
    "d740",
    "譆",
    31,
    "譧",
    4,
    "譭",
    25
  ],
  [
    "d780",
    "讇",
    24,
    "讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
  ],
  [
    "d840",
    "谸",
    8,
    "豂豃豄豅豈豊豋豍",
    7,
    "豖豗豘豙豛",
    5,
    "豣",
    6,
    "豬",
    6,
    "豴豵豶豷豻",
    6,
    "貃貄貆貇"
  ],
  [
    "d880",
    "貈貋貍",
    6,
    "貕貖貗貙",
    20,
    "亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
  ],
  [
    "d940",
    "貮",
    62
  ],
  [
    "d980",
    "賭",
    32,
    "佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
  ],
  [
    "da40",
    "贎",
    14,
    "贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
    8,
    "趂趃趆趇趈趉趌",
    4,
    "趒趓趕",
    9,
    "趠趡"
  ],
  [
    "da80",
    "趢趤",
    12,
    "趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
  ],
  [
    "db40",
    "跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
    6,
    "踆踇踈踋踍踎踐踑踒踓踕",
    7,
    "踠踡踤",
    4,
    "踫踭踰踲踳踴踶踷踸踻踼踾"
  ],
  [
    "db80",
    "踿蹃蹅蹆蹌",
    4,
    "蹓",
    5,
    "蹚",
    11,
    "蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
  ],
  [
    "dc40",
    "蹳蹵蹷",
    4,
    "蹽蹾躀躂躃躄躆躈",
    6,
    "躑躒躓躕",
    6,
    "躝躟",
    11,
    "躭躮躰躱躳",
    6,
    "躻",
    7
  ],
  [
    "dc80",
    "軃",
    10,
    "軏",
    21,
    "堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
  ],
  [
    "dd40",
    "軥",
    62
  ],
  [
    "dd80",
    "輤",
    32,
    "荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
  ],
  [
    "de40",
    "轅",
    32,
    "轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
  ],
  [
    "de80",
    "迉",
    4,
    "迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
  ],
  [
    "df40",
    "這逜連逤逥逧",
    5,
    "逰",
    4,
    "逷逹逺逽逿遀遃遅遆遈",
    4,
    "過達違遖遙遚遜",
    5,
    "遤遦遧適遪遫遬遯",
    4,
    "遶",
    6,
    "遾邁"
  ],
  [
    "df80",
    "還邅邆邇邉邊邌",
    4,
    "邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
  ],
  [
    "e040",
    "郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
    19,
    "鄚鄛鄜"
  ],
  [
    "e080",
    "鄝鄟鄠鄡鄤",
    10,
    "鄰鄲",
    6,
    "鄺",
    8,
    "酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
  ],
  [
    "e140",
    "酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
    4,
    "醆醈醊醎醏醓",
    6,
    "醜",
    5,
    "醤",
    5,
    "醫醬醰醱醲醳醶醷醸醹醻"
  ],
  [
    "e180",
    "醼",
    10,
    "釈釋釐釒",
    9,
    "針",
    8,
    "帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
  ],
  [
    "e240",
    "釦",
    62
  ],
  [
    "e280",
    "鈥",
    32,
    "狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
    5,
    "饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
  ],
  [
    "e340",
    "鉆",
    45,
    "鉵",
    16
  ],
  [
    "e380",
    "銆",
    7,
    "銏",
    24,
    "恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
  ],
  [
    "e440",
    "銨",
    5,
    "銯",
    24,
    "鋉",
    31
  ],
  [
    "e480",
    "鋩",
    32,
    "洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
  ],
  [
    "e540",
    "錊",
    51,
    "錿",
    10
  ],
  [
    "e580",
    "鍊",
    31,
    "鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
  ],
  [
    "e640",
    "鍬",
    34,
    "鎐",
    27
  ],
  [
    "e680",
    "鎬",
    29,
    "鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
  ],
  [
    "e740",
    "鏎",
    7,
    "鏗",
    54
  ],
  [
    "e780",
    "鐎",
    32,
    "纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
    6,
    "缪缫缬缭缯",
    4,
    "缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
  ],
  [
    "e840",
    "鐯",
    14,
    "鐿",
    43,
    "鑬鑭鑮鑯"
  ],
  [
    "e880",
    "鑰",
    20,
    "钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
  ],
  [
    "e940",
    "锧锳锽镃镈镋镕镚镠镮镴镵長",
    7,
    "門",
    42
  ],
  [
    "e980",
    "閫",
    32,
    "椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
  ],
  [
    "ea40",
    "闌",
    27,
    "闬闿阇阓阘阛阞阠阣",
    6,
    "阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
  ],
  [
    "ea80",
    "陘陙陚陜陝陞陠陣陥陦陫陭",
    4,
    "陳陸",
    12,
    "隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
  ],
  [
    "eb40",
    "隌階隑隒隓隕隖隚際隝",
    9,
    "隨",
    7,
    "隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
    9,
    "雡",
    6,
    "雫"
  ],
  [
    "eb80",
    "雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
    4,
    "霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
  ],
  [
    "ec40",
    "霡",
    8,
    "霫霬霮霯霱霳",
    4,
    "霺霻霼霽霿",
    18,
    "靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
    7
  ],
  [
    "ec80",
    "靲靵靷",
    4,
    "靽",
    7,
    "鞆",
    4,
    "鞌鞎鞏鞐鞓鞕鞖鞗鞙",
    4,
    "臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
  ],
  [
    "ed40",
    "鞞鞟鞡鞢鞤",
    6,
    "鞬鞮鞰鞱鞳鞵",
    46
  ],
  [
    "ed80",
    "韤韥韨韮",
    4,
    "韴韷",
    23,
    "怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
  ],
  [
    "ee40",
    "頏",
    62
  ],
  [
    "ee80",
    "顎",
    32,
    "睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
    4,
    "钼钽钿铄铈",
    6,
    "铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
  ],
  [
    "ef40",
    "顯",
    5,
    "颋颎颒颕颙颣風",
    37,
    "飏飐飔飖飗飛飜飝飠",
    4
  ],
  [
    "ef80",
    "飥飦飩",
    30,
    "铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
    4,
    "锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
    8,
    "镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
  ],
  [
    "f040",
    "餈",
    4,
    "餎餏餑",
    28,
    "餯",
    26
  ],
  [
    "f080",
    "饊",
    9,
    "饖",
    12,
    "饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
    4,
    "鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
    6,
    "鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
  ],
  [
    "f140",
    "馌馎馚",
    10,
    "馦馧馩",
    47
  ],
  [
    "f180",
    "駙",
    32,
    "瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
  ],
  [
    "f240",
    "駺",
    62
  ],
  [
    "f280",
    "騹",
    32,
    "颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
  ],
  [
    "f340",
    "驚",
    17,
    "驲骃骉骍骎骔骕骙骦骩",
    6,
    "骲骳骴骵骹骻骽骾骿髃髄髆",
    4,
    "髍髎髏髐髒體髕髖髗髙髚髛髜"
  ],
  [
    "f380",
    "髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
    8,
    "髺髼",
    6,
    "鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
  ],
  [
    "f440",
    "鬇鬉",
    5,
    "鬐鬑鬒鬔",
    10,
    "鬠鬡鬢鬤",
    10,
    "鬰鬱鬳",
    7,
    "鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
    5
  ],
  [
    "f480",
    "魛",
    32,
    "簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
  ],
  [
    "f540",
    "魼",
    62
  ],
  [
    "f580",
    "鮻",
    32,
    "酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
  ],
  [
    "f640",
    "鯜",
    62
  ],
  [
    "f680",
    "鰛",
    32,
    "觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
    5,
    "龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
    5,
    "鲥",
    4,
    "鲫鲭鲮鲰",
    7,
    "鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
  ],
  [
    "f740",
    "鰼",
    62
  ],
  [
    "f780",
    "鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
    4,
    "鳈鳉鳑鳒鳚鳛鳠鳡鳌",
    4,
    "鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
  ],
  [
    "f840",
    "鳣",
    62
  ],
  [
    "f880",
    "鴢",
    32
  ],
  [
    "f940",
    "鵃",
    62
  ],
  [
    "f980",
    "鶂",
    32
  ],
  [
    "fa40",
    "鶣",
    62
  ],
  [
    "fa80",
    "鷢",
    32
  ],
  [
    "fb40",
    "鸃",
    27,
    "鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
    9,
    "麀"
  ],
  [
    "fb80",
    "麁麃麄麅麆麉麊麌",
    5,
    "麔",
    8,
    "麞麠",
    5,
    "麧麨麩麪"
  ],
  [
    "fc40",
    "麫",
    8,
    "麵麶麷麹麺麼麿",
    4,
    "黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
    8,
    "黺黽黿",
    6
  ],
  [
    "fc80",
    "鼆",
    4,
    "鼌鼏鼑鼒鼔鼕鼖鼘鼚",
    5,
    "鼡鼣",
    8,
    "鼭鼮鼰鼱"
  ],
  [
    "fd40",
    "鼲",
    4,
    "鼸鼺鼼鼿",
    4,
    "齅",
    10,
    "齒",
    38
  ],
  [
    "fd80",
    "齹",
    5,
    "龁龂龍",
    11,
    "龜龝龞龡",
    4,
    "郎凉秊裏隣"
  ],
  [
    "fe40",
    "兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
  ]
], BA = [
  [
    "a140",
    "",
    62
  ],
  [
    "a180",
    "",
    32
  ],
  [
    "a240",
    "",
    62
  ],
  [
    "a280",
    "",
    32
  ],
  [
    "a2ab",
    "",
    5
  ],
  [
    "a2e3",
    "€"
  ],
  [
    "a2ef",
    ""
  ],
  [
    "a2fd",
    ""
  ],
  [
    "a340",
    "",
    62
  ],
  [
    "a380",
    "",
    31,
    "　"
  ],
  [
    "a440",
    "",
    62
  ],
  [
    "a480",
    "",
    32
  ],
  [
    "a4f4",
    "",
    10
  ],
  [
    "a540",
    "",
    62
  ],
  [
    "a580",
    "",
    32
  ],
  [
    "a5f7",
    "",
    7
  ],
  [
    "a640",
    "",
    62
  ],
  [
    "a680",
    "",
    32
  ],
  [
    "a6b9",
    "",
    7
  ],
  [
    "a6d9",
    "",
    6
  ],
  [
    "a6ec",
    ""
  ],
  [
    "a6f3",
    ""
  ],
  [
    "a6f6",
    "",
    8
  ],
  [
    "a740",
    "",
    62
  ],
  [
    "a780",
    "",
    32
  ],
  [
    "a7c2",
    "",
    14
  ],
  [
    "a7f2",
    "",
    12
  ],
  [
    "a896",
    "",
    10
  ],
  [
    "a8bc",
    "ḿ"
  ],
  [
    "a8bf",
    "ǹ"
  ],
  [
    "a8c1",
    ""
  ],
  [
    "a8ea",
    "",
    20
  ],
  [
    "a958",
    ""
  ],
  [
    "a95b",
    ""
  ],
  [
    "a95d",
    ""
  ],
  [
    "a989",
    "〾⿰",
    11
  ],
  [
    "a997",
    "",
    12
  ],
  [
    "a9f0",
    "",
    14
  ],
  [
    "aaa1",
    "",
    93
  ],
  [
    "aba1",
    "",
    93
  ],
  [
    "aca1",
    "",
    93
  ],
  [
    "ada1",
    "",
    93
  ],
  [
    "aea1",
    "",
    93
  ],
  [
    "afa1",
    "",
    93
  ],
  [
    "d7fa",
    "",
    4
  ],
  [
    "f8a1",
    "",
    93
  ],
  [
    "f9a1",
    "",
    93
  ],
  [
    "faa1",
    "",
    93
  ],
  [
    "fba1",
    "",
    93
  ],
  [
    "fca1",
    "",
    93
  ],
  [
    "fda1",
    "",
    93
  ],
  [
    "fe50",
    "⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
  ],
  [
    "fe80",
    "䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
    6,
    "䶮",
    93
  ],
  [
    "8135f437",
    ""
  ]
], zN = [
  128,
  165,
  169,
  178,
  184,
  216,
  226,
  235,
  238,
  244,
  248,
  251,
  253,
  258,
  276,
  284,
  300,
  325,
  329,
  334,
  364,
  463,
  465,
  467,
  469,
  471,
  473,
  475,
  477,
  506,
  594,
  610,
  712,
  716,
  730,
  930,
  938,
  962,
  970,
  1026,
  1104,
  1106,
  8209,
  8215,
  8218,
  8222,
  8231,
  8241,
  8244,
  8246,
  8252,
  8365,
  8452,
  8454,
  8458,
  8471,
  8482,
  8556,
  8570,
  8596,
  8602,
  8713,
  8720,
  8722,
  8726,
  8731,
  8737,
  8740,
  8742,
  8748,
  8751,
  8760,
  8766,
  8777,
  8781,
  8787,
  8802,
  8808,
  8816,
  8854,
  8858,
  8870,
  8896,
  8979,
  9322,
  9372,
  9548,
  9588,
  9616,
  9622,
  9634,
  9652,
  9662,
  9672,
  9676,
  9680,
  9702,
  9735,
  9738,
  9793,
  9795,
  11906,
  11909,
  11913,
  11917,
  11928,
  11944,
  11947,
  11951,
  11956,
  11960,
  11964,
  11979,
  12284,
  12292,
  12312,
  12319,
  12330,
  12351,
  12436,
  12447,
  12535,
  12543,
  12586,
  12842,
  12850,
  12964,
  13200,
  13215,
  13218,
  13253,
  13263,
  13267,
  13270,
  13384,
  13428,
  13727,
  13839,
  13851,
  14617,
  14703,
  14801,
  14816,
  14964,
  15183,
  15471,
  15585,
  16471,
  16736,
  17208,
  17325,
  17330,
  17374,
  17623,
  17997,
  18018,
  18212,
  18218,
  18301,
  18318,
  18760,
  18811,
  18814,
  18820,
  18823,
  18844,
  18848,
  18872,
  19576,
  19620,
  19738,
  19887,
  40870,
  59244,
  59336,
  59367,
  59413,
  59417,
  59423,
  59431,
  59437,
  59443,
  59452,
  59460,
  59478,
  59493,
  63789,
  63866,
  63894,
  63976,
  63986,
  64016,
  64018,
  64021,
  64025,
  64034,
  64037,
  64042,
  65074,
  65093,
  65107,
  65112,
  65127,
  65132,
  65375,
  65510,
  65536
], JN = [
  0,
  36,
  38,
  45,
  50,
  81,
  89,
  95,
  96,
  100,
  103,
  104,
  105,
  109,
  126,
  133,
  148,
  172,
  175,
  179,
  208,
  306,
  307,
  308,
  309,
  310,
  311,
  312,
  313,
  341,
  428,
  443,
  544,
  545,
  558,
  741,
  742,
  749,
  750,
  805,
  819,
  820,
  7922,
  7924,
  7925,
  7927,
  7934,
  7943,
  7944,
  7945,
  7950,
  8062,
  8148,
  8149,
  8152,
  8164,
  8174,
  8236,
  8240,
  8262,
  8264,
  8374,
  8380,
  8381,
  8384,
  8388,
  8390,
  8392,
  8393,
  8394,
  8396,
  8401,
  8406,
  8416,
  8419,
  8424,
  8437,
  8439,
  8445,
  8482,
  8485,
  8496,
  8521,
  8603,
  8936,
  8946,
  9046,
  9050,
  9063,
  9066,
  9076,
  9092,
  9100,
  9108,
  9111,
  9113,
  9131,
  9162,
  9164,
  9218,
  9219,
  11329,
  11331,
  11334,
  11336,
  11346,
  11361,
  11363,
  11366,
  11370,
  11372,
  11375,
  11389,
  11682,
  11686,
  11687,
  11692,
  11694,
  11714,
  11716,
  11723,
  11725,
  11730,
  11736,
  11982,
  11989,
  12102,
  12336,
  12348,
  12350,
  12384,
  12393,
  12395,
  12397,
  12510,
  12553,
  12851,
  12962,
  12973,
  13738,
  13823,
  13919,
  13933,
  14080,
  14298,
  14585,
  14698,
  15583,
  15847,
  16318,
  16434,
  16438,
  16481,
  16729,
  17102,
  17122,
  17315,
  17320,
  17402,
  17418,
  17859,
  17909,
  17911,
  17915,
  17916,
  17936,
  17939,
  17961,
  18664,
  18703,
  18814,
  18962,
  19043,
  33469,
  33470,
  33471,
  33484,
  33485,
  33490,
  33497,
  33501,
  33505,
  33513,
  33520,
  33536,
  33550,
  37845,
  37921,
  37948,
  38029,
  38038,
  38064,
  38065,
  38066,
  38069,
  38075,
  38076,
  38078,
  39108,
  39109,
  39113,
  39114,
  39115,
  39116,
  39265,
  39394,
  189e3
], ZN = {
  uChars: zN,
  gbChars: JN
}, qN = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8141",
    "갂갃갅갆갋",
    4,
    "갘갞갟갡갢갣갥",
    6,
    "갮갲갳갴"
  ],
  [
    "8161",
    "갵갶갷갺갻갽갾갿걁",
    9,
    "걌걎",
    5,
    "걕"
  ],
  [
    "8181",
    "걖걗걙걚걛걝",
    18,
    "걲걳걵걶걹걻",
    4,
    "겂겇겈겍겎겏겑겒겓겕",
    6,
    "겞겢",
    5,
    "겫겭겮겱",
    6,
    "겺겾겿곀곂곃곅곆곇곉곊곋곍",
    7,
    "곖곘",
    7,
    "곢곣곥곦곩곫곭곮곲곴곷",
    4,
    "곾곿괁괂괃괅괇",
    4,
    "괎괐괒괓"
  ],
  [
    "8241",
    "괔괕괖괗괙괚괛괝괞괟괡",
    7,
    "괪괫괮",
    5
  ],
  [
    "8261",
    "괶괷괹괺괻괽",
    6,
    "굆굈굊",
    5,
    "굑굒굓굕굖굗"
  ],
  [
    "8281",
    "굙",
    7,
    "굢굤",
    7,
    "굮굯굱굲굷굸굹굺굾궀궃",
    4,
    "궊궋궍궎궏궑",
    10,
    "궞",
    5,
    "궥",
    17,
    "궸",
    7,
    "귂귃귅귆귇귉",
    6,
    "귒귔",
    7,
    "귝귞귟귡귢귣귥",
    18
  ],
  [
    "8341",
    "귺귻귽귾긂",
    5,
    "긊긌긎",
    5,
    "긕",
    7
  ],
  [
    "8361",
    "긝",
    18,
    "긲긳긵긶긹긻긼"
  ],
  [
    "8381",
    "긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
    4,
    "깞깢깣깤깦깧깪깫깭깮깯깱",
    6,
    "깺깾",
    5,
    "꺆",
    5,
    "꺍",
    46,
    "꺿껁껂껃껅",
    6,
    "껎껒",
    5,
    "껚껛껝",
    8
  ],
  [
    "8441",
    "껦껧껩껪껬껮",
    5,
    "껵껶껷껹껺껻껽",
    8
  ],
  [
    "8461",
    "꼆꼉꼊꼋꼌꼎꼏꼑",
    18
  ],
  [
    "8481",
    "꼤",
    7,
    "꼮꼯꼱꼳꼵",
    6,
    "꼾꽀꽄꽅꽆꽇꽊",
    5,
    "꽑",
    10,
    "꽞",
    5,
    "꽦",
    18,
    "꽺",
    5,
    "꾁꾂꾃꾅꾆꾇꾉",
    6,
    "꾒꾓꾔꾖",
    5,
    "꾝",
    26,
    "꾺꾻꾽꾾"
  ],
  [
    "8541",
    "꾿꿁",
    5,
    "꿊꿌꿏",
    4,
    "꿕",
    6,
    "꿝",
    4
  ],
  [
    "8561",
    "꿢",
    5,
    "꿪",
    5,
    "꿲꿳꿵꿶꿷꿹",
    6,
    "뀂뀃"
  ],
  [
    "8581",
    "뀅",
    6,
    "뀍뀎뀏뀑뀒뀓뀕",
    6,
    "뀞",
    9,
    "뀩",
    26,
    "끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
    29,
    "끾끿낁낂낃낅",
    6,
    "낎낐낒",
    5,
    "낛낝낞낣낤"
  ],
  [
    "8641",
    "낥낦낧낪낰낲낶낷낹낺낻낽",
    6,
    "냆냊",
    5,
    "냒"
  ],
  [
    "8661",
    "냓냕냖냗냙",
    6,
    "냡냢냣냤냦",
    10
  ],
  [
    "8681",
    "냱",
    22,
    "넊넍넎넏넑넔넕넖넗넚넞",
    4,
    "넦넧넩넪넫넭",
    6,
    "넶넺",
    5,
    "녂녃녅녆녇녉",
    6,
    "녒녓녖녗녙녚녛녝녞녟녡",
    22,
    "녺녻녽녾녿놁놃",
    4,
    "놊놌놎놏놐놑놕놖놗놙놚놛놝"
  ],
  [
    "8741",
    "놞",
    9,
    "놩",
    15
  ],
  [
    "8761",
    "놹",
    18,
    "뇍뇎뇏뇑뇒뇓뇕"
  ],
  [
    "8781",
    "뇖",
    5,
    "뇞뇠",
    7,
    "뇪뇫뇭뇮뇯뇱",
    7,
    "뇺뇼뇾",
    5,
    "눆눇눉눊눍",
    6,
    "눖눘눚",
    5,
    "눡",
    18,
    "눵",
    6,
    "눽",
    26,
    "뉙뉚뉛뉝뉞뉟뉡",
    6,
    "뉪",
    4
  ],
  [
    "8841",
    "뉯",
    4,
    "뉶",
    5,
    "뉽",
    6,
    "늆늇늈늊",
    4
  ],
  [
    "8861",
    "늏늒늓늕늖늗늛",
    4,
    "늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
  ],
  [
    "8881",
    "늸",
    15,
    "닊닋닍닎닏닑닓",
    4,
    "닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
    6,
    "댒댖",
    5,
    "댝",
    54,
    "덗덙덚덝덠덡덢덣"
  ],
  [
    "8941",
    "덦덨덪덬덭덯덲덳덵덶덷덹",
    6,
    "뎂뎆",
    5,
    "뎍"
  ],
  [
    "8961",
    "뎎뎏뎑뎒뎓뎕",
    10,
    "뎢",
    5,
    "뎩뎪뎫뎭"
  ],
  [
    "8981",
    "뎮",
    21,
    "돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
    18,
    "돽",
    18,
    "됑",
    6,
    "됙됚됛됝됞됟됡",
    6,
    "됪됬",
    7,
    "됵",
    15
  ],
  [
    "8a41",
    "둅",
    10,
    "둒둓둕둖둗둙",
    6,
    "둢둤둦"
  ],
  [
    "8a61",
    "둧",
    4,
    "둭",
    18,
    "뒁뒂"
  ],
  [
    "8a81",
    "뒃",
    4,
    "뒉",
    19,
    "뒞",
    5,
    "뒥뒦뒧뒩뒪뒫뒭",
    7,
    "뒶뒸뒺",
    5,
    "듁듂듃듅듆듇듉",
    6,
    "듑듒듓듔듖",
    5,
    "듞듟듡듢듥듧",
    4,
    "듮듰듲",
    5,
    "듹",
    26,
    "딖딗딙딚딝"
  ],
  [
    "8b41",
    "딞",
    5,
    "딦딫",
    4,
    "딲딳딵딶딷딹",
    6,
    "땂땆"
  ],
  [
    "8b61",
    "땇땈땉땊땎땏땑땒땓땕",
    6,
    "땞땢",
    8
  ],
  [
    "8b81",
    "땫",
    52,
    "떢떣떥떦떧떩떬떭떮떯떲떶",
    4,
    "떾떿뗁뗂뗃뗅",
    6,
    "뗎뗒",
    5,
    "뗙",
    18,
    "뗭",
    18
  ],
  [
    "8c41",
    "똀",
    15,
    "똒똓똕똖똗똙",
    4
  ],
  [
    "8c61",
    "똞",
    6,
    "똦",
    5,
    "똭",
    6,
    "똵",
    5
  ],
  [
    "8c81",
    "똻",
    12,
    "뙉",
    26,
    "뙥뙦뙧뙩",
    50,
    "뚞뚟뚡뚢뚣뚥",
    5,
    "뚭뚮뚯뚰뚲",
    16
  ],
  [
    "8d41",
    "뛃",
    16,
    "뛕",
    8
  ],
  [
    "8d61",
    "뛞",
    17,
    "뛱뛲뛳뛵뛶뛷뛹뛺"
  ],
  [
    "8d81",
    "뛻",
    4,
    "뜂뜃뜄뜆",
    33,
    "뜪뜫뜭뜮뜱",
    6,
    "뜺뜼",
    7,
    "띅띆띇띉띊띋띍",
    6,
    "띖",
    9,
    "띡띢띣띥띦띧띩",
    6,
    "띲띴띶",
    5,
    "띾띿랁랂랃랅",
    6,
    "랎랓랔랕랚랛랝랞"
  ],
  [
    "8e41",
    "랟랡",
    6,
    "랪랮",
    5,
    "랶랷랹",
    8
  ],
  [
    "8e61",
    "럂",
    4,
    "럈럊",
    19
  ],
  [
    "8e81",
    "럞",
    13,
    "럮럯럱럲럳럵",
    6,
    "럾렂",
    4,
    "렊렋렍렎렏렑",
    6,
    "렚렜렞",
    5,
    "렦렧렩렪렫렭",
    6,
    "렶렺",
    5,
    "롁롂롃롅",
    11,
    "롒롔",
    7,
    "롞롟롡롢롣롥",
    6,
    "롮롰롲",
    5,
    "롹롺롻롽",
    7
  ],
  [
    "8f41",
    "뢅",
    7,
    "뢎",
    17
  ],
  [
    "8f61",
    "뢠",
    7,
    "뢩",
    6,
    "뢱뢲뢳뢵뢶뢷뢹",
    4
  ],
  [
    "8f81",
    "뢾뢿룂룄룆",
    5,
    "룍룎룏룑룒룓룕",
    7,
    "룞룠룢",
    5,
    "룪룫룭룮룯룱",
    6,
    "룺룼룾",
    5,
    "뤅",
    18,
    "뤙",
    6,
    "뤡",
    26,
    "뤾뤿륁륂륃륅",
    6,
    "륍륎륐륒",
    5
  ],
  [
    "9041",
    "륚륛륝륞륟륡",
    6,
    "륪륬륮",
    5,
    "륶륷륹륺륻륽"
  ],
  [
    "9061",
    "륾",
    5,
    "릆릈릋릌릏",
    15
  ],
  [
    "9081",
    "릟",
    12,
    "릮릯릱릲릳릵",
    6,
    "릾맀맂",
    5,
    "맊맋맍맓",
    4,
    "맚맜맟맠맢맦맧맩맪맫맭",
    6,
    "맶맻",
    4,
    "먂",
    5,
    "먉",
    11,
    "먖",
    33,
    "먺먻먽먾먿멁멃멄멅멆"
  ],
  [
    "9141",
    "멇멊멌멏멐멑멒멖멗멙멚멛멝",
    6,
    "멦멪",
    5
  ],
  [
    "9161",
    "멲멳멵멶멷멹",
    9,
    "몆몈몉몊몋몍",
    5
  ],
  [
    "9181",
    "몓",
    20,
    "몪몭몮몯몱몳",
    4,
    "몺몼몾",
    5,
    "뫅뫆뫇뫉",
    14,
    "뫚",
    33,
    "뫽뫾뫿묁묂묃묅",
    7,
    "묎묐묒",
    5,
    "묙묚묛묝묞묟묡",
    6
  ],
  [
    "9241",
    "묨묪묬",
    7,
    "묷묹묺묿",
    4,
    "뭆뭈뭊뭋뭌뭎뭑뭒"
  ],
  [
    "9261",
    "뭓뭕뭖뭗뭙",
    7,
    "뭢뭤",
    7,
    "뭭",
    4
  ],
  [
    "9281",
    "뭲",
    21,
    "뮉뮊뮋뮍뮎뮏뮑",
    18,
    "뮥뮦뮧뮩뮪뮫뮭",
    6,
    "뮵뮶뮸",
    7,
    "믁믂믃믅믆믇믉",
    6,
    "믑믒믔",
    35,
    "믺믻믽믾밁"
  ],
  [
    "9341",
    "밃",
    4,
    "밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
  ],
  [
    "9361",
    "밶밷밹",
    6,
    "뱂뱆뱇뱈뱊뱋뱎뱏뱑",
    8
  ],
  [
    "9381",
    "뱚뱛뱜뱞",
    37,
    "벆벇벉벊벍벏",
    4,
    "벖벘벛",
    4,
    "벢벣벥벦벩",
    6,
    "벲벶",
    5,
    "벾벿볁볂볃볅",
    7,
    "볎볒볓볔볖볗볙볚볛볝",
    22,
    "볷볹볺볻볽"
  ],
  [
    "9441",
    "볾",
    5,
    "봆봈봊",
    5,
    "봑봒봓봕",
    8
  ],
  [
    "9461",
    "봞",
    5,
    "봥",
    6,
    "봭",
    12
  ],
  [
    "9481",
    "봺",
    5,
    "뵁",
    6,
    "뵊뵋뵍뵎뵏뵑",
    6,
    "뵚",
    9,
    "뵥뵦뵧뵩",
    22,
    "붂붃붅붆붋",
    4,
    "붒붔붖붗붘붛붝",
    6,
    "붥",
    10,
    "붱",
    6,
    "붹",
    24
  ],
  [
    "9541",
    "뷒뷓뷖뷗뷙뷚뷛뷝",
    11,
    "뷪",
    5,
    "뷱"
  ],
  [
    "9561",
    "뷲뷳뷵뷶뷷뷹",
    6,
    "븁븂븄븆",
    5,
    "븎븏븑븒븓"
  ],
  [
    "9581",
    "븕",
    6,
    "븞븠",
    35,
    "빆빇빉빊빋빍빏",
    4,
    "빖빘빜빝빞빟빢빣빥빦빧빩빫",
    4,
    "빲빶",
    4,
    "빾빿뺁뺂뺃뺅",
    6,
    "뺎뺒",
    5,
    "뺚",
    13,
    "뺩",
    14
  ],
  [
    "9641",
    "뺸",
    23,
    "뻒뻓"
  ],
  [
    "9661",
    "뻕뻖뻙",
    6,
    "뻡뻢뻦",
    5,
    "뻭",
    8
  ],
  [
    "9681",
    "뻶",
    10,
    "뼂",
    5,
    "뼊",
    13,
    "뼚뼞",
    33,
    "뽂뽃뽅뽆뽇뽉",
    6,
    "뽒뽓뽔뽖",
    44
  ],
  [
    "9741",
    "뾃",
    16,
    "뾕",
    8
  ],
  [
    "9761",
    "뾞",
    17,
    "뾱",
    7
  ],
  [
    "9781",
    "뾹",
    11,
    "뿆",
    5,
    "뿎뿏뿑뿒뿓뿕",
    6,
    "뿝뿞뿠뿢",
    89,
    "쀽쀾쀿"
  ],
  [
    "9841",
    "쁀",
    16,
    "쁒",
    5,
    "쁙쁚쁛"
  ],
  [
    "9861",
    "쁝쁞쁟쁡",
    6,
    "쁪",
    15
  ],
  [
    "9881",
    "쁺",
    21,
    "삒삓삕삖삗삙",
    6,
    "삢삤삦",
    5,
    "삮삱삲삷",
    4,
    "삾샂샃샄샆샇샊샋샍샎샏샑",
    6,
    "샚샞",
    5,
    "샦샧샩샪샫샭",
    6,
    "샶샸샺",
    5,
    "섁섂섃섅섆섇섉",
    6,
    "섑섒섓섔섖",
    5,
    "섡섢섥섨섩섪섫섮"
  ],
  [
    "9941",
    "섲섳섴섵섷섺섻섽섾섿셁",
    6,
    "셊셎",
    5,
    "셖셗"
  ],
  [
    "9961",
    "셙셚셛셝",
    6,
    "셦셪",
    5,
    "셱셲셳셵셶셷셹셺셻"
  ],
  [
    "9981",
    "셼",
    8,
    "솆",
    5,
    "솏솑솒솓솕솗",
    4,
    "솞솠솢솣솤솦솧솪솫솭솮솯솱",
    11,
    "솾",
    5,
    "쇅쇆쇇쇉쇊쇋쇍",
    6,
    "쇕쇖쇙",
    6,
    "쇡쇢쇣쇥쇦쇧쇩",
    6,
    "쇲쇴",
    7,
    "쇾쇿숁숂숃숅",
    6,
    "숎숐숒",
    5,
    "숚숛숝숞숡숢숣"
  ],
  [
    "9a41",
    "숤숥숦숧숪숬숮숰숳숵",
    16
  ],
  [
    "9a61",
    "쉆쉇쉉",
    6,
    "쉒쉓쉕쉖쉗쉙",
    6,
    "쉡쉢쉣쉤쉦"
  ],
  [
    "9a81",
    "쉧",
    4,
    "쉮쉯쉱쉲쉳쉵",
    6,
    "쉾슀슂",
    5,
    "슊",
    5,
    "슑",
    6,
    "슙슚슜슞",
    5,
    "슦슧슩슪슫슮",
    5,
    "슶슸슺",
    33,
    "싞싟싡싢싥",
    5,
    "싮싰싲싳싴싵싷싺싽싾싿쌁",
    6,
    "쌊쌋쌎쌏"
  ],
  [
    "9b41",
    "쌐쌑쌒쌖쌗쌙쌚쌛쌝",
    6,
    "쌦쌧쌪",
    8
  ],
  [
    "9b61",
    "쌳",
    17,
    "썆",
    7
  ],
  [
    "9b81",
    "썎",
    25,
    "썪썫썭썮썯썱썳",
    4,
    "썺썻썾",
    5,
    "쎅쎆쎇쎉쎊쎋쎍",
    50,
    "쏁",
    22,
    "쏚"
  ],
  [
    "9c41",
    "쏛쏝쏞쏡쏣",
    4,
    "쏪쏫쏬쏮",
    5,
    "쏶쏷쏹",
    5
  ],
  [
    "9c61",
    "쏿",
    8,
    "쐉",
    6,
    "쐑",
    9
  ],
  [
    "9c81",
    "쐛",
    8,
    "쐥",
    6,
    "쐭쐮쐯쐱쐲쐳쐵",
    6,
    "쐾",
    9,
    "쑉",
    26,
    "쑦쑧쑩쑪쑫쑭",
    6,
    "쑶쑷쑸쑺",
    5,
    "쒁",
    18,
    "쒕",
    6,
    "쒝",
    12
  ],
  [
    "9d41",
    "쒪",
    13,
    "쒹쒺쒻쒽",
    8
  ],
  [
    "9d61",
    "쓆",
    25
  ],
  [
    "9d81",
    "쓠",
    8,
    "쓪",
    5,
    "쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
    9,
    "씍씎씏씑씒씓씕",
    6,
    "씝",
    10,
    "씪씫씭씮씯씱",
    6,
    "씺씼씾",
    5,
    "앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
    6,
    "앲앶",
    5,
    "앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
  ],
  [
    "9e41",
    "얖얙얚얛얝얞얟얡",
    7,
    "얪",
    9,
    "얶"
  ],
  [
    "9e61",
    "얷얺얿",
    4,
    "엋엍엏엒엓엕엖엗엙",
    6,
    "엢엤엦엧"
  ],
  [
    "9e81",
    "엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
    6,
    "옚옝",
    6,
    "옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
    6,
    "왒왖",
    5,
    "왞왟왡",
    10,
    "왭왮왰왲",
    5,
    "왺왻왽왾왿욁",
    6,
    "욊욌욎",
    5,
    "욖욗욙욚욛욝",
    6,
    "욦"
  ],
  [
    "9f41",
    "욨욪",
    5,
    "욲욳욵욶욷욻",
    4,
    "웂웄웆",
    5,
    "웎"
  ],
  [
    "9f61",
    "웏웑웒웓웕",
    6,
    "웞웟웢",
    5,
    "웪웫웭웮웯웱웲"
  ],
  [
    "9f81",
    "웳",
    4,
    "웺웻웼웾",
    5,
    "윆윇윉윊윋윍",
    6,
    "윖윘윚",
    5,
    "윢윣윥윦윧윩",
    6,
    "윲윴윶윸윹윺윻윾윿읁읂읃읅",
    4,
    "읋읎읐읙읚읛읝읞읟읡",
    6,
    "읩읪읬",
    7,
    "읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
    4,
    "잢잧",
    4,
    "잮잯잱잲잳잵잶잷"
  ],
  [
    "a041",
    "잸잹잺잻잾쟂",
    5,
    "쟊쟋쟍쟏쟑",
    6,
    "쟙쟚쟛쟜"
  ],
  [
    "a061",
    "쟞",
    5,
    "쟥쟦쟧쟩쟪쟫쟭",
    13
  ],
  [
    "a081",
    "쟻",
    4,
    "젂젃젅젆젇젉젋",
    4,
    "젒젔젗",
    4,
    "젞젟젡젢젣젥",
    6,
    "젮젰젲",
    5,
    "젹젺젻젽젾젿졁",
    6,
    "졊졋졎",
    5,
    "졕",
    26,
    "졲졳졵졶졷졹졻",
    4,
    "좂좄좈좉좊좎",
    5,
    "좕",
    7,
    "좞좠좢좣좤"
  ],
  [
    "a141",
    "좥좦좧좩",
    18,
    "좾좿죀죁"
  ],
  [
    "a161",
    "죂죃죅죆죇죉죊죋죍",
    6,
    "죖죘죚",
    5,
    "죢죣죥"
  ],
  [
    "a181",
    "죦",
    14,
    "죶",
    5,
    "죾죿줁줂줃줇",
    4,
    "줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
    9,
    "±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
  ],
  [
    "a241",
    "줐줒",
    5,
    "줙",
    18
  ],
  [
    "a261",
    "줭",
    6,
    "줵",
    18
  ],
  [
    "a281",
    "쥈",
    7,
    "쥒쥓쥕쥖쥗쥙",
    6,
    "쥢쥤",
    7,
    "쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
  ],
  [
    "a341",
    "쥱쥲쥳쥵",
    6,
    "쥽",
    10,
    "즊즋즍즎즏"
  ],
  [
    "a361",
    "즑",
    6,
    "즚즜즞",
    16
  ],
  [
    "a381",
    "즯",
    16,
    "짂짃짅짆짉짋",
    4,
    "짒짔짗짘짛！",
    58,
    "￦］",
    32,
    "￣"
  ],
  [
    "a441",
    "짞짟짡짣짥짦짨짩짪짫짮짲",
    5,
    "짺짻짽짾짿쨁쨂쨃쨄"
  ],
  [
    "a461",
    "쨅쨆쨇쨊쨎",
    5,
    "쨕쨖쨗쨙",
    12
  ],
  [
    "a481",
    "쨦쨧쨨쨪",
    28,
    "ㄱ",
    93
  ],
  [
    "a541",
    "쩇",
    4,
    "쩎쩏쩑쩒쩓쩕",
    6,
    "쩞쩢",
    5,
    "쩩쩪"
  ],
  [
    "a561",
    "쩫",
    17,
    "쩾",
    5,
    "쪅쪆"
  ],
  [
    "a581",
    "쪇",
    16,
    "쪙",
    14,
    "ⅰ",
    9
  ],
  [
    "a5b0",
    "Ⅰ",
    9
  ],
  [
    "a5c1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a5e1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a641",
    "쪨",
    19,
    "쪾쪿쫁쫂쫃쫅"
  ],
  [
    "a661",
    "쫆",
    5,
    "쫎쫐쫒쫔쫕쫖쫗쫚",
    5,
    "쫡",
    6
  ],
  [
    "a681",
    "쫨쫩쫪쫫쫭",
    6,
    "쫵",
    18,
    "쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
    7
  ],
  [
    "a741",
    "쬋",
    4,
    "쬑쬒쬓쬕쬖쬗쬙",
    6,
    "쬢",
    7
  ],
  [
    "a761",
    "쬪",
    22,
    "쭂쭃쭄"
  ],
  [
    "a781",
    "쭅쭆쭇쭊쭋쭍쭎쭏쭑",
    6,
    "쭚쭛쭜쭞",
    5,
    "쭥",
    7,
    "㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
    9,
    "㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
    9,
    "㎀",
    4,
    "㎺",
    5,
    "㎐",
    4,
    "Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
  ],
  [
    "a841",
    "쭭",
    10,
    "쭺",
    14
  ],
  [
    "a861",
    "쮉",
    18,
    "쮝",
    6
  ],
  [
    "a881",
    "쮤",
    19,
    "쮹",
    11,
    "ÆÐªĦ"
  ],
  [
    "a8a6",
    "Ĳ"
  ],
  [
    "a8a8",
    "ĿŁØŒºÞŦŊ"
  ],
  [
    "a8b1",
    "㉠",
    27,
    "ⓐ",
    25,
    "①",
    14,
    "½⅓⅔¼¾⅛⅜⅝⅞"
  ],
  [
    "a941",
    "쯅",
    14,
    "쯕",
    10
  ],
  [
    "a961",
    "쯠쯡쯢쯣쯥쯦쯨쯪",
    18
  ],
  [
    "a981",
    "쯽",
    14,
    "찎찏찑찒찓찕",
    6,
    "찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
    27,
    "⒜",
    25,
    "⑴",
    14,
    "¹²³⁴ⁿ₁₂₃₄"
  ],
  [
    "aa41",
    "찥찦찪찫찭찯찱",
    6,
    "찺찿",
    4,
    "챆챇챉챊챋챍챎"
  ],
  [
    "aa61",
    "챏",
    4,
    "챖챚",
    5,
    "챡챢챣챥챧챩",
    6,
    "챱챲"
  ],
  [
    "aa81",
    "챳챴챶",
    29,
    "ぁ",
    82
  ],
  [
    "ab41",
    "첔첕첖첗첚첛첝첞첟첡",
    6,
    "첪첮",
    5,
    "첶첷첹"
  ],
  [
    "ab61",
    "첺첻첽",
    6,
    "쳆쳈쳊",
    5,
    "쳑쳒쳓쳕",
    5
  ],
  [
    "ab81",
    "쳛",
    8,
    "쳥",
    6,
    "쳭쳮쳯쳱",
    12,
    "ァ",
    85
  ],
  [
    "ac41",
    "쳾쳿촀촂",
    5,
    "촊촋촍촎촏촑",
    6,
    "촚촜촞촟촠"
  ],
  [
    "ac61",
    "촡촢촣촥촦촧촩촪촫촭",
    11,
    "촺",
    4
  ],
  [
    "ac81",
    "촿",
    28,
    "쵝쵞쵟А",
    5,
    "ЁЖ",
    25
  ],
  [
    "acd1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "ad41",
    "쵡쵢쵣쵥",
    6,
    "쵮쵰쵲",
    5,
    "쵹",
    7
  ],
  [
    "ad61",
    "춁",
    6,
    "춉",
    10,
    "춖춗춙춚춛춝춞춟"
  ],
  [
    "ad81",
    "춠춡춢춣춦춨춪",
    5,
    "춱",
    18,
    "췅"
  ],
  [
    "ae41",
    "췆",
    5,
    "췍췎췏췑",
    16
  ],
  [
    "ae61",
    "췢",
    5,
    "췩췪췫췭췮췯췱",
    6,
    "췺췼췾",
    4
  ],
  [
    "ae81",
    "츃츅츆츇츉츊츋츍",
    6,
    "츕츖츗츘츚",
    5,
    "츢츣츥츦츧츩츪츫"
  ],
  [
    "af41",
    "츬츭츮츯츲츴츶",
    19
  ],
  [
    "af61",
    "칊",
    13,
    "칚칛칝칞칢",
    5,
    "칪칬"
  ],
  [
    "af81",
    "칮",
    5,
    "칶칷칹칺칻칽",
    6,
    "캆캈캊",
    5,
    "캒캓캕캖캗캙"
  ],
  [
    "b041",
    "캚",
    5,
    "캢캦",
    5,
    "캮",
    12
  ],
  [
    "b061",
    "캻",
    5,
    "컂",
    19
  ],
  [
    "b081",
    "컖",
    13,
    "컦컧컩컪컭",
    6,
    "컶컺",
    5,
    "가각간갇갈갉갊감",
    7,
    "같",
    4,
    "갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
  ],
  [
    "b141",
    "켂켃켅켆켇켉",
    6,
    "켒켔켖",
    5,
    "켝켞켟켡켢켣"
  ],
  [
    "b161",
    "켥",
    6,
    "켮켲",
    5,
    "켹",
    11
  ],
  [
    "b181",
    "콅",
    14,
    "콖콗콙콚콛콝",
    6,
    "콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
  ],
  [
    "b241",
    "콭콮콯콲콳콵콶콷콹",
    6,
    "쾁쾂쾃쾄쾆",
    5,
    "쾍"
  ],
  [
    "b261",
    "쾎",
    18,
    "쾢",
    5,
    "쾩"
  ],
  [
    "b281",
    "쾪",
    5,
    "쾱",
    18,
    "쿅",
    6,
    "깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
  ],
  [
    "b341",
    "쿌",
    19,
    "쿢쿣쿥쿦쿧쿩"
  ],
  [
    "b361",
    "쿪",
    5,
    "쿲쿴쿶",
    5,
    "쿽쿾쿿퀁퀂퀃퀅",
    5
  ],
  [
    "b381",
    "퀋",
    5,
    "퀒",
    5,
    "퀙",
    19,
    "끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
    4,
    "낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
  ],
  [
    "b441",
    "퀮",
    5,
    "퀶퀷퀹퀺퀻퀽",
    6,
    "큆큈큊",
    5
  ],
  [
    "b461",
    "큑큒큓큕큖큗큙",
    6,
    "큡",
    10,
    "큮큯"
  ],
  [
    "b481",
    "큱큲큳큵",
    6,
    "큾큿킀킂",
    18,
    "뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
    4,
    "닳담답닷",
    4,
    "닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
  ],
  [
    "b541",
    "킕",
    14,
    "킦킧킩킪킫킭",
    5
  ],
  [
    "b561",
    "킳킶킸킺",
    5,
    "탂탃탅탆탇탊",
    5,
    "탒탖",
    4
  ],
  [
    "b581",
    "탛탞탟탡탢탣탥",
    6,
    "탮탲",
    5,
    "탹",
    11,
    "덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
  ],
  [
    "b641",
    "턅",
    7,
    "턎",
    17
  ],
  [
    "b661",
    "턠",
    15,
    "턲턳턵턶턷턹턻턼턽턾"
  ],
  [
    "b681",
    "턿텂텆",
    5,
    "텎텏텑텒텓텕",
    6,
    "텞텠텢",
    5,
    "텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
  ],
  [
    "b741",
    "텮",
    13,
    "텽",
    6,
    "톅톆톇톉톊"
  ],
  [
    "b761",
    "톋",
    20,
    "톢톣톥톦톧"
  ],
  [
    "b781",
    "톩",
    6,
    "톲톴톶톷톸톹톻톽톾톿퇁",
    14,
    "래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
  ],
  [
    "b841",
    "퇐",
    7,
    "퇙",
    17
  ],
  [
    "b861",
    "퇫",
    8,
    "퇵퇶퇷퇹",
    13
  ],
  [
    "b881",
    "툈툊",
    5,
    "툑",
    24,
    "륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
    4,
    "맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
  ],
  [
    "b941",
    "툪툫툮툯툱툲툳툵",
    6,
    "툾퉀퉂",
    5,
    "퉉퉊퉋퉌"
  ],
  [
    "b961",
    "퉍",
    14,
    "퉝",
    6,
    "퉥퉦퉧퉨"
  ],
  [
    "b981",
    "퉩",
    22,
    "튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
    4,
    "받",
    4,
    "밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
  ],
  [
    "ba41",
    "튍튎튏튒튓튔튖",
    5,
    "튝튞튟튡튢튣튥",
    6,
    "튭"
  ],
  [
    "ba61",
    "튮튯튰튲",
    5,
    "튺튻튽튾틁틃",
    4,
    "틊틌",
    5
  ],
  [
    "ba81",
    "틒틓틕틖틗틙틚틛틝",
    6,
    "틦",
    9,
    "틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
  ],
  [
    "bb41",
    "틻",
    4,
    "팂팄팆",
    5,
    "팏팑팒팓팕팗",
    4,
    "팞팢팣"
  ],
  [
    "bb61",
    "팤팦팧팪팫팭팮팯팱",
    6,
    "팺팾",
    5,
    "퍆퍇퍈퍉"
  ],
  [
    "bb81",
    "퍊",
    31,
    "빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
  ],
  [
    "bc41",
    "퍪",
    17,
    "퍾퍿펁펂펃펅펆펇"
  ],
  [
    "bc61",
    "펈펉펊펋펎펒",
    5,
    "펚펛펝펞펟펡",
    6,
    "펪펬펮"
  ],
  [
    "bc81",
    "펯",
    4,
    "펵펶펷펹펺펻펽",
    6,
    "폆폇폊",
    5,
    "폑",
    5,
    "샥샨샬샴샵샷샹섀섄섈섐섕서",
    4,
    "섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
  ],
  [
    "bd41",
    "폗폙",
    7,
    "폢폤",
    7,
    "폮폯폱폲폳폵폶폷"
  ],
  [
    "bd61",
    "폸폹폺폻폾퐀퐂",
    5,
    "퐉",
    13
  ],
  [
    "bd81",
    "퐗",
    5,
    "퐞",
    25,
    "숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
  ],
  [
    "be41",
    "퐸",
    7,
    "푁푂푃푅",
    14
  ],
  [
    "be61",
    "푔",
    7,
    "푝푞푟푡푢푣푥",
    7,
    "푮푰푱푲"
  ],
  [
    "be81",
    "푳",
    4,
    "푺푻푽푾풁풃",
    4,
    "풊풌풎",
    5,
    "풕",
    8,
    "쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
    6,
    "엌엎"
  ],
  [
    "bf41",
    "풞",
    10,
    "풪",
    14
  ],
  [
    "bf61",
    "풹",
    18,
    "퓍퓎퓏퓑퓒퓓퓕"
  ],
  [
    "bf81",
    "퓖",
    5,
    "퓝퓞퓠",
    7,
    "퓩퓪퓫퓭퓮퓯퓱",
    6,
    "퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
    5,
    "옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
  ],
  [
    "c041",
    "퓾",
    5,
    "픅픆픇픉픊픋픍",
    6,
    "픖픘",
    5
  ],
  [
    "c061",
    "픞",
    25
  ],
  [
    "c081",
    "픸픹픺픻픾픿핁핂핃핅",
    6,
    "핎핐핒",
    5,
    "핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
    7,
    "읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
  ],
  [
    "c141",
    "핤핦핧핪핬핮",
    5,
    "핶핷핹핺핻핽",
    6,
    "햆햊햋"
  ],
  [
    "c161",
    "햌햍햎햏햑",
    19,
    "햦햧"
  ],
  [
    "c181",
    "햨",
    31,
    "점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
  ],
  [
    "c241",
    "헊헋헍헎헏헑헓",
    4,
    "헚헜헞",
    5,
    "헦헧헩헪헫헭헮"
  ],
  [
    "c261",
    "헯",
    4,
    "헶헸헺",
    5,
    "혂혃혅혆혇혉",
    6,
    "혒"
  ],
  [
    "c281",
    "혖",
    5,
    "혝혞혟혡혢혣혥",
    7,
    "혮",
    9,
    "혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
  ],
  [
    "c341",
    "혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
    4
  ],
  [
    "c361",
    "홢",
    4,
    "홨홪",
    5,
    "홲홳홵",
    11
  ],
  [
    "c381",
    "횁횂횄횆",
    5,
    "횎횏횑횒횓횕",
    7,
    "횞횠횢",
    5,
    "횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
  ],
  [
    "c441",
    "횫횭횮횯횱",
    7,
    "횺횼",
    7,
    "훆훇훉훊훋"
  ],
  [
    "c461",
    "훍훎훏훐훒훓훕훖훘훚",
    5,
    "훡훢훣훥훦훧훩",
    4
  ],
  [
    "c481",
    "훮훯훱훲훳훴훶",
    5,
    "훾훿휁휂휃휅",
    11,
    "휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
  ],
  [
    "c541",
    "휕휖휗휚휛휝휞휟휡",
    6,
    "휪휬휮",
    5,
    "휶휷휹"
  ],
  [
    "c561",
    "휺휻휽",
    6,
    "흅흆흈흊",
    5,
    "흒흓흕흚",
    4
  ],
  [
    "c581",
    "흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
    6,
    "흾흿힀힂",
    5,
    "힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
  ],
  [
    "c641",
    "힍힎힏힑",
    6,
    "힚힜힞",
    5
  ],
  [
    "c6a1",
    "퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
  ],
  [
    "c7a1",
    "퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
  ],
  [
    "c8a1",
    "혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
  ],
  [
    "caa1",
    "伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
  ],
  [
    "cba1",
    "匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
  ],
  [
    "cca1",
    "瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
  ],
  [
    "cda1",
    "棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
  ],
  [
    "cea1",
    "科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
  ],
  [
    "cfa1",
    "區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
  ],
  [
    "d0a1",
    "鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
  ],
  [
    "d1a1",
    "朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
    5,
    "那樂",
    4,
    "諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
  ],
  [
    "d2a1",
    "納臘蠟衲囊娘廊",
    4,
    "乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
    5,
    "駑魯",
    10,
    "濃籠聾膿農惱牢磊腦賂雷尿壘",
    7,
    "嫩訥杻紐勒",
    5,
    "能菱陵尼泥匿溺多茶"
  ],
  [
    "d3a1",
    "丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
  ],
  [
    "d4a1",
    "棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
  ],
  [
    "d5a1",
    "蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
  ],
  [
    "d6a1",
    "煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
  ],
  [
    "d7a1",
    "遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
  ],
  [
    "d8a1",
    "立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
  ],
  [
    "d9a1",
    "蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
  ],
  [
    "daa1",
    "汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
  ],
  [
    "dba1",
    "發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
  ],
  [
    "dca1",
    "碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
  ],
  [
    "dda1",
    "孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
  ],
  [
    "dea1",
    "脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
  ],
  [
    "dfa1",
    "傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
  ],
  [
    "e0a1",
    "胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
  ],
  [
    "e1a1",
    "聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
  ],
  [
    "e2a1",
    "戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
  ],
  [
    "e3a1",
    "嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
  ],
  [
    "e4a1",
    "沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
  ],
  [
    "e5a1",
    "櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
  ],
  [
    "e6a1",
    "旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
  ],
  [
    "e7a1",
    "簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
  ],
  [
    "e8a1",
    "烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
  ],
  [
    "e9a1",
    "窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
  ],
  [
    "eaa1",
    "運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
  ],
  [
    "eba1",
    "濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
  ],
  [
    "eca1",
    "議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
  ],
  [
    "eda1",
    "立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
  ],
  [
    "eea1",
    "障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
  ],
  [
    "efa1",
    "煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
  ],
  [
    "f0a1",
    "靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
  ],
  [
    "f1a1",
    "踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
  ],
  [
    "f2a1",
    "咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
  ],
  [
    "f3a1",
    "鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
  ],
  [
    "f4a1",
    "責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
  ],
  [
    "f5a1",
    "椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
  ],
  [
    "f6a1",
    "贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
  ],
  [
    "f7a1",
    "鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
  ],
  [
    "f8a1",
    "阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
  ],
  [
    "f9a1",
    "品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
  ],
  [
    "faa1",
    "行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
  ],
  [
    "fba1",
    "形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
  ],
  [
    "fca1",
    "禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
  ],
  [
    "fda1",
    "爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
  ]
], fA = [
  [
    "0",
    "\0",
    127
  ],
  [
    "a140",
    "　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
  ],
  [
    "a1a1",
    "﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
    4,
    "～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
  ],
  [
    "a240",
    "＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
    7,
    "▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
  ],
  [
    "a2a1",
    "╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
    9,
    "Ⅰ",
    9,
    "〡",
    8,
    "十卄卅Ａ",
    25,
    "ａ",
    21
  ],
  [
    "a340",
    "ｗｘｙｚΑ",
    16,
    "Σ",
    6,
    "α",
    16,
    "σ",
    6,
    "ㄅ",
    10
  ],
  [
    "a3a1",
    "ㄐ",
    25,
    "˙ˉˊˇˋ"
  ],
  [
    "a3e1",
    "€"
  ],
  [
    "a440",
    "一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
  ],
  [
    "a4a1",
    "丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
  ],
  [
    "a540",
    "世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
  ],
  [
    "a5a1",
    "央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
  ],
  [
    "a640",
    "共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
  ],
  [
    "a6a1",
    "式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
  ],
  [
    "a740",
    "作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
  ],
  [
    "a7a1",
    "均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
  ],
  [
    "a840",
    "杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
  ],
  [
    "a8a1",
    "芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
  ],
  [
    "a940",
    "咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
  ],
  [
    "a9a1",
    "屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
  ],
  [
    "aa40",
    "昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
  ],
  [
    "aaa1",
    "炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
  ],
  [
    "ab40",
    "陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
  ],
  [
    "aba1",
    "哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
  ],
  [
    "ac40",
    "拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
  ],
  [
    "aca1",
    "活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
  ],
  [
    "ad40",
    "耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
  ],
  [
    "ada1",
    "迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
  ],
  [
    "ae40",
    "哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
  ],
  [
    "aea1",
    "恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
  ],
  [
    "af40",
    "浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
  ],
  [
    "afa1",
    "砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
  ],
  [
    "b040",
    "虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
  ],
  [
    "b0a1",
    "陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
  ],
  [
    "b140",
    "娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
  ],
  [
    "b1a1",
    "情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
  ],
  [
    "b240",
    "毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
  ],
  [
    "b2a1",
    "瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
  ],
  [
    "b340",
    "莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
  ],
  [
    "b3a1",
    "部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
  ],
  [
    "b440",
    "婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
  ],
  [
    "b4a1",
    "插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
  ],
  [
    "b540",
    "溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
  ],
  [
    "b5a1",
    "窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
  ],
  [
    "b640",
    "詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
  ],
  [
    "b6a1",
    "間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
  ],
  [
    "b740",
    "媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
  ],
  [
    "b7a1",
    "楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
  ],
  [
    "b840",
    "睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
  ],
  [
    "b8a1",
    "腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
  ],
  [
    "b940",
    "辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
  ],
  [
    "b9a1",
    "飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
  ],
  [
    "ba40",
    "愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
  ],
  [
    "baa1",
    "滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
  ],
  [
    "bb40",
    "罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
  ],
  [
    "bba1",
    "說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
  ],
  [
    "bc40",
    "劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
  ],
  [
    "bca1",
    "慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
  ],
  [
    "bd40",
    "瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
  ],
  [
    "bda1",
    "翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
  ],
  [
    "be40",
    "輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
  ],
  [
    "bea1",
    "鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
  ],
  [
    "bf40",
    "濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
  ],
  [
    "bfa1",
    "縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
  ],
  [
    "c040",
    "錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
  ],
  [
    "c0a1",
    "嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
  ],
  [
    "c140",
    "瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
  ],
  [
    "c1a1",
    "薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
  ],
  [
    "c240",
    "駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
  ],
  [
    "c2a1",
    "癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
  ],
  [
    "c340",
    "鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
  ],
  [
    "c3a1",
    "獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
  ],
  [
    "c440",
    "願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
  ],
  [
    "c4a1",
    "纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
  ],
  [
    "c540",
    "護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
  ],
  [
    "c5a1",
    "禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
  ],
  [
    "c640",
    "讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
  ],
  [
    "c940",
    "乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
  ],
  [
    "c9a1",
    "氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
  ],
  [
    "ca40",
    "汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
  ],
  [
    "caa1",
    "吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
  ],
  [
    "cb40",
    "杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
  ],
  [
    "cba1",
    "芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
  ],
  [
    "cc40",
    "坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
  ],
  [
    "cca1",
    "怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
  ],
  [
    "cd40",
    "泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
  ],
  [
    "cda1",
    "矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
  ],
  [
    "ce40",
    "哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
  ],
  [
    "cea1",
    "峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
  ],
  [
    "cf40",
    "柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
  ],
  [
    "cfa1",
    "洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
  ],
  [
    "d040",
    "穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
  ],
  [
    "d0a1",
    "苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
  ],
  [
    "d140",
    "唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
  ],
  [
    "d1a1",
    "恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
  ],
  [
    "d240",
    "毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
  ],
  [
    "d2a1",
    "牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
  ],
  [
    "d340",
    "笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
  ],
  [
    "d3a1",
    "荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
  ],
  [
    "d440",
    "酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
  ],
  [
    "d4a1",
    "唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
  ],
  [
    "d540",
    "崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
  ],
  [
    "d5a1",
    "捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
  ],
  [
    "d640",
    "淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
  ],
  [
    "d6a1",
    "痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
  ],
  [
    "d740",
    "耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
  ],
  [
    "d7a1",
    "蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
  ],
  [
    "d840",
    "釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
  ],
  [
    "d8a1",
    "堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
  ],
  [
    "d940",
    "惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
  ],
  [
    "d9a1",
    "晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
  ],
  [
    "da40",
    "湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
  ],
  [
    "daa1",
    "琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
  ],
  [
    "db40",
    "罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
  ],
  [
    "dba1",
    "菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
  ],
  [
    "dc40",
    "軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
  ],
  [
    "dca1",
    "隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
  ],
  [
    "dd40",
    "媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
  ],
  [
    "dda1",
    "搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
  ],
  [
    "de40",
    "毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
  ],
  [
    "dea1",
    "煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
  ],
  [
    "df40",
    "稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
  ],
  [
    "dfa1",
    "腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
  ],
  [
    "e040",
    "觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
  ],
  [
    "e0a1",
    "遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
  ],
  [
    "e140",
    "凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
  ],
  [
    "e1a1",
    "寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
  ],
  [
    "e240",
    "榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
  ],
  [
    "e2a1",
    "漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
  ],
  [
    "e340",
    "禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
  ],
  [
    "e3a1",
    "耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
  ],
  [
    "e440",
    "裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
  ],
  [
    "e4a1",
    "銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
  ],
  [
    "e540",
    "噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
  ],
  [
    "e5a1",
    "憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
  ],
  [
    "e640",
    "澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
  ],
  [
    "e6a1",
    "獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
  ],
  [
    "e740",
    "膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
  ],
  [
    "e7a1",
    "蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
  ],
  [
    "e840",
    "踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
  ],
  [
    "e8a1",
    "銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
  ],
  [
    "e940",
    "噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
  ],
  [
    "e9a1",
    "憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
  ],
  [
    "ea40",
    "澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
  ],
  [
    "eaa1",
    "瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
  ],
  [
    "eb40",
    "蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
  ],
  [
    "eba1",
    "諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
  ],
  [
    "ec40",
    "錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
  ],
  [
    "eca1",
    "魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
  ],
  [
    "ed40",
    "檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
  ],
  [
    "eda1",
    "瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
  ],
  [
    "ee40",
    "蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
  ],
  [
    "eea1",
    "謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
  ],
  [
    "ef40",
    "鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
  ],
  [
    "efa1",
    "鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
  ],
  [
    "f040",
    "璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
  ],
  [
    "f0a1",
    "臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
  ],
  [
    "f140",
    "蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
  ],
  [
    "f1a1",
    "鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
  ],
  [
    "f240",
    "徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
  ],
  [
    "f2a1",
    "礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
  ],
  [
    "f340",
    "譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
  ],
  [
    "f3a1",
    "鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
  ],
  [
    "f440",
    "嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
  ],
  [
    "f4a1",
    "禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
  ],
  [
    "f540",
    "鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
  ],
  [
    "f5a1",
    "鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
  ],
  [
    "f640",
    "蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
  ],
  [
    "f6a1",
    "騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
  ],
  [
    "f740",
    "糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
  ],
  [
    "f7a1",
    "驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
  ],
  [
    "f840",
    "讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
  ],
  [
    "f8a1",
    "齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
  ],
  [
    "f940",
    "纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
  ],
  [
    "f9a1",
    "龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
  ]
], pN = [
  [
    "8740",
    "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
  ],
  [
    "8767",
    "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
  ],
  [
    "87a1",
    "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
  ],
  [
    "8840",
    "㇀",
    4,
    "𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
  ],
  [
    "88a1",
    "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
  ],
  [
    "8940",
    "𪎩𡅅"
  ],
  [
    "8943",
    "攊"
  ],
  [
    "8946",
    "丽滝鵎釟"
  ],
  [
    "894c",
    "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
  ],
  [
    "89a1",
    "琑糼緍楆竉刧"
  ],
  [
    "89ab",
    "醌碸酞肼"
  ],
  [
    "89b0",
    "贋胶𠧧"
  ],
  [
    "89b5",
    "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
  ],
  [
    "89c1",
    "溚舾甙"
  ],
  [
    "89c5",
    "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
  ],
  [
    "8a40",
    "𧶄唥"
  ],
  [
    "8a43",
    "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
  ],
  [
    "8a64",
    "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
  ],
  [
    "8a76",
    "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
  ],
  [
    "8aa1",
    "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
  ],
  [
    "8aac",
    "䠋𠆩㿺塳𢶍"
  ],
  [
    "8ab2",
    "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
  ],
  [
    "8abb",
    "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
  ],
  [
    "8ac9",
    "𪘁𠸉𢫏𢳉"
  ],
  [
    "8ace",
    "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
  ],
  [
    "8adf",
    "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
  ],
  [
    "8af6",
    "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
  ],
  [
    "8b40",
    "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
  ],
  [
    "8b55",
    "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
  ],
  [
    "8ba1",
    "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
  ],
  [
    "8bde",
    "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
  ],
  [
    "8c40",
    "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
  ],
  [
    "8ca1",
    "𣏹椙橃𣱣泿"
  ],
  [
    "8ca7",
    "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
  ],
  [
    "8cc9",
    "顨杫䉶圽"
  ],
  [
    "8cce",
    "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
  ],
  [
    "8ce6",
    "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
  ],
  [
    "8d40",
    "𠮟"
  ],
  [
    "8d42",
    "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
  ],
  [
    "8da1",
    "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
  ],
  [
    "8e40",
    "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
  ],
  [
    "8ea1",
    "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
  ],
  [
    "8f40",
    "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
  ],
  [
    "8fa1",
    "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
  ],
  [
    "9040",
    "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
  ],
  [
    "90a1",
    "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
  ],
  [
    "9140",
    "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
  ],
  [
    "91a1",
    "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
  ],
  [
    "9240",
    "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
  ],
  [
    "92a1",
    "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
  ],
  [
    "9340",
    "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
  ],
  [
    "93a1",
    "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
  ],
  [
    "9440",
    "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
  ],
  [
    "94a1",
    "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
  ],
  [
    "9540",
    "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
  ],
  [
    "95a1",
    "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
  ],
  [
    "9640",
    "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
  ],
  [
    "96a1",
    "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
  ],
  [
    "9740",
    "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
  ],
  [
    "97a1",
    "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
  ],
  [
    "9840",
    "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
  ],
  [
    "98a1",
    "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
  ],
  [
    "9940",
    "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
  ],
  [
    "99a1",
    "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
  ],
  [
    "9a40",
    "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
  ],
  [
    "9aa1",
    "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
  ],
  [
    "9b40",
    "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
  ],
  [
    "9b62",
    "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
  ],
  [
    "9ba1",
    "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
  ],
  [
    "9c40",
    "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
  ],
  [
    "9ca1",
    "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
  ],
  [
    "9d40",
    "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
  ],
  [
    "9da1",
    "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
  ],
  [
    "9e40",
    "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
  ],
  [
    "9ea1",
    "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
  ],
  [
    "9ead",
    "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
  ],
  [
    "9ec5",
    "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
  ],
  [
    "9ef5",
    "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
  ],
  [
    "9f40",
    "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
  ],
  [
    "9f4f",
    "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
  ],
  [
    "9fa1",
    "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
  ],
  [
    "9fae",
    "酙隁酜"
  ],
  [
    "9fb2",
    "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
  ],
  [
    "9fc1",
    "𤤙盖鮝个𠳔莾衂"
  ],
  [
    "9fc9",
    "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
  ],
  [
    "9fdb",
    "歒酼龥鮗頮颴骺麨麄煺笔"
  ],
  [
    "9fe7",
    "毺蠘罸"
  ],
  [
    "9feb",
    "嘠𪙊蹷齓"
  ],
  [
    "9ff0",
    "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
  ],
  [
    "a040",
    "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
  ],
  [
    "a055",
    "𡠻𦸅"
  ],
  [
    "a058",
    "詾𢔛"
  ],
  [
    "a05b",
    "惽癧髗鵄鍮鮏蟵"
  ],
  [
    "a063",
    "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
  ],
  [
    "a073",
    "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
  ],
  [
    "a0a1",
    "嵗𨯂迚𨸹"
  ],
  [
    "a0a6",
    "僙𡵆礆匲阸𠼻䁥"
  ],
  [
    "a0ae",
    "矾"
  ],
  [
    "a0b0",
    "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
  ],
  [
    "a0d4",
    "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
  ],
  [
    "a0e2",
    "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
  ],
  [
    "a3c0",
    "␀",
    31,
    "␡"
  ],
  [
    "c6a1",
    "①",
    9,
    "⑴",
    9,
    "ⅰ",
    9,
    "丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
    23
  ],
  [
    "c740",
    "す",
    58,
    "ァアィイ"
  ],
  [
    "c7a1",
    "ゥ",
    81,
    "А",
    5,
    "ЁЖ",
    4
  ],
  [
    "c840",
    "Л",
    26,
    "ёж",
    25,
    "⇧↸↹㇏𠃌乚𠂊刂䒑"
  ],
  [
    "c8a1",
    "龰冈龱𧘇"
  ],
  [
    "c8cd",
    "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
  ],
  [
    "c8f5",
    "ʃɐɛɔɵœøŋʊɪ"
  ],
  [
    "f9fe",
    "￭"
  ],
  [
    "fa40",
    "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
  ],
  [
    "faa1",
    "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
  ],
  [
    "fb40",
    "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
  ],
  [
    "fba1",
    "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
  ],
  [
    "fc40",
    "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
  ],
  [
    "fca1",
    "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
  ],
  [
    "fd40",
    "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
  ],
  [
    "fda1",
    "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
  ],
  [
    "fe40",
    "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
  ],
  [
    "fea1",
    "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
  ]
];
var Qn, MA;
function xN() {
  return MA || (MA = 1, Qn = {
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes.
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII,
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
    shiftjis: {
      type: "_dbcs",
      table: function() {
        return kN;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    csshiftjis: "shiftjis",
    mskanji: "shiftjis",
    sjis: "shiftjis",
    windows31j: "shiftjis",
    ms31j: "shiftjis",
    xsjis: "shiftjis",
    windows932: "shiftjis",
    ms932: "shiftjis",
    932: "shiftjis",
    cp932: "shiftjis",
    eucjp: {
      type: "_dbcs",
      table: function() {
        return jN;
      },
      encodeAdd: { "¥": 92, "‾": 126 }
    },
    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    gb2312: "cp936",
    gb231280: "cp936",
    gb23121980: "cp936",
    csgb2312: "cp936",
    csiso58gb231280: "cp936",
    euccn: "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    windows936: "cp936",
    ms936: "cp936",
    936: "cp936",
    cp936: {
      type: "_dbcs",
      table: function() {
        return Pn;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    gbk: {
      type: "_dbcs",
      table: function() {
        return Pn.concat(BA);
      }
    },
    xgbk: "gbk",
    isoir58: "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    gb18030: {
      type: "_dbcs",
      table: function() {
        return Pn.concat(BA);
      },
      gb18030: function() {
        return ZN;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    chinese: "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    windows949: "cp949",
    ms949: "cp949",
    949: "cp949",
    cp949: {
      type: "_dbcs",
      table: function() {
        return qN;
      }
    },
    cseuckr: "cp949",
    csksc56011987: "cp949",
    euckr: "cp949",
    isoir149: "cp949",
    korean: "cp949",
    ksc56011987: "cp949",
    ksc56011989: "cp949",
    ksc5601: "cp949",
    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard.
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    //
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
    windows950: "cp950",
    ms950: "cp950",
    950: "cp950",
    cp950: {
      type: "_dbcs",
      table: function() {
        return fA;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    big5: "big5hkscs",
    big5hkscs: {
      type: "_dbcs",
      table: function() {
        return fA.concat(pN);
      },
      encodeSkipVals: [
        // Although Encoding Standard says we should avoid encoding to HKSCS area (See Step 1 of
        // https://encoding.spec.whatwg.org/#index-big5-pointer), we still do it to increase compatibility with ICU.
        // But if a single unicode point can be encoded both as HKSCS and regular Big5, we prefer the latter.
        36457,
        36463,
        36478,
        36523,
        36532,
        36557,
        36560,
        36695,
        36713,
        36718,
        36811,
        36862,
        36973,
        36986,
        37060,
        37084,
        37105,
        37311,
        37551,
        37552,
        37553,
        37554,
        37585,
        37959,
        38090,
        38361,
        38652,
        39285,
        39798,
        39800,
        39803,
        39878,
        39902,
        39916,
        39926,
        40002,
        40019,
        40034,
        40040,
        40043,
        40055,
        40124,
        40125,
        40144,
        40279,
        40282,
        40388,
        40431,
        40443,
        40617,
        40687,
        40701,
        40800,
        40907,
        41079,
        41180,
        41183,
        36812,
        37576,
        38468,
        38637,
        // Step 2 of https://encoding.spec.whatwg.org/#index-big5-pointer: Use last pointer for U+2550, U+255E, U+2561, U+256A, U+5341, or U+5345
        41636,
        41637,
        41639,
        41638,
        41676,
        41678
      ]
    },
    cnbig5: "big5hkscs",
    csbig5: "big5hkscs",
    xxbig5: "big5hkscs"
  }), Qn;
}
var gA;
function $N() {
  return gA || (gA = 1, function(E) {
    for (var _ = UR, n = [
      mN(),
      YN(),
      yN(),
      WN(),
      HN(),
      vN(),
      XN(),
      KN(),
      xN()
    ], e = 0; e < n.length; e++) {
      var A = n[e];
      _(E, A);
    }
  }(dn)), dn;
}
var Vn, LA;
function ET() {
  if (LA) return Vn;
  LA = 1;
  var E = yE.Buffer;
  return Vn = function(_) {
    var n = _.Transform;
    function e(t, R) {
      this.conv = t, R = R || {}, R.decodeStrings = !1, n.call(this, R);
    }
    e.prototype = Object.create(n.prototype, {
      constructor: { value: e }
    }), e.prototype._transform = function(t, R, i) {
      if (typeof t != "string")
        return i(new Error("Iconv encoding stream needs strings as its input."));
      try {
        var I = this.conv.write(t);
        I && I.length && this.push(I), i();
      } catch (N) {
        i(N);
      }
    }, e.prototype._flush = function(t) {
      try {
        var R = this.conv.end();
        R && R.length && this.push(R), t();
      } catch (i) {
        t(i);
      }
    }, e.prototype.collect = function(t) {
      var R = [];
      return this.on("error", t), this.on("data", function(i) {
        R.push(i);
      }), this.on("end", function() {
        t(null, E.concat(R));
      }), this;
    };
    function A(t, R) {
      this.conv = t, R = R || {}, R.encoding = this.encoding = "utf8", n.call(this, R);
    }
    return A.prototype = Object.create(n.prototype, {
      constructor: { value: A }
    }), A.prototype._transform = function(t, R, i) {
      if (!E.isBuffer(t) && !(t instanceof Uint8Array))
        return i(new Error("Iconv decoding stream needs buffers as its input."));
      try {
        var I = this.conv.write(t);
        I && I.length && this.push(I, this.encoding), i();
      } catch (N) {
        i(N);
      }
    }, A.prototype._flush = function(t) {
      try {
        var R = this.conv.end();
        R && R.length && this.push(R, this.encoding), t();
      } catch (i) {
        t(i);
      }
    }, A.prototype.collect = function(t) {
      var R = "";
      return this.on("error", t), this.on("data", function(i) {
        R += i;
      }), this.on("end", function() {
        t(null, R);
      }), this;
    }, {
      IconvLiteEncoderStream: e,
      IconvLiteDecoderStream: A
    };
  }, Vn;
}
We.exports;
(function(E) {
  var _ = yE.Buffer, n = He, e = UR;
  E.exports.encodings = null, E.exports.defaultCharUnicode = "�", E.exports.defaultCharSingleByte = "?", E.exports.encode = function(R, i, I) {
    R = "" + (R || "");
    var N = E.exports.getEncoder(i, I), T = N.write(R), a = N.end();
    return a && a.length > 0 ? _.concat([T, a]) : T;
  }, E.exports.decode = function(R, i, I) {
    typeof R == "string" && (E.exports.skipDecodeWarning || (console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"), E.exports.skipDecodeWarning = !0), R = _.from("" + (R || ""), "binary"));
    var N = E.exports.getDecoder(i, I), T = N.write(R), a = N.end();
    return a ? T + a : T;
  }, E.exports.encodingExists = function(R) {
    try {
      return E.exports.getCodec(R), !0;
    } catch {
      return !1;
    }
  }, E.exports.toEncoding = E.exports.encode, E.exports.fromEncoding = E.exports.decode, E.exports._codecDataCache = { __proto__: null }, E.exports.getCodec = function(R) {
    if (!E.exports.encodings) {
      var i = $N();
      E.exports.encodings = { __proto__: null }, e(E.exports.encodings, i);
    }
    for (var I = E.exports._canonicalizeEncoding(R), N = {}; ; ) {
      var T = E.exports._codecDataCache[I];
      if (T)
        return T;
      var a = E.exports.encodings[I];
      switch (typeof a) {
        case "string":
          I = a;
          break;
        case "object":
          for (var u in a)
            N[u] = a[u];
          N.encodingName || (N.encodingName = I), I = a.type;
          break;
        case "function":
          return N.encodingName || (N.encodingName = I), T = new a(N, E.exports), E.exports._codecDataCache[N.encodingName] = T, T;
        default:
          throw new Error("Encoding not recognized: '" + R + "' (searched as: '" + I + "')");
      }
    }
  }, E.exports._canonicalizeEncoding = function(t) {
    return ("" + t).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
  }, E.exports.getEncoder = function(R, i) {
    var I = E.exports.getCodec(R), N = new I.encoder(i, I);
    return I.bomAware && i && i.addBOM && (N = new n.PrependBOM(N, i)), N;
  }, E.exports.getDecoder = function(R, i) {
    var I = E.exports.getCodec(R), N = new I.decoder(i, I);
    return I.bomAware && !(i && i.stripBOM === !1) && (N = new n.StripBOM(N, i)), N;
  }, E.exports.enableStreamingAPI = function(R) {
    if (!E.exports.supportsStreams) {
      var i = ET()(R);
      E.exports.IconvLiteEncoderStream = i.IconvLiteEncoderStream, E.exports.IconvLiteDecoderStream = i.IconvLiteDecoderStream, E.exports.encodeStream = function(N, T) {
        return new E.exports.IconvLiteEncoderStream(E.exports.getEncoder(N, T), T);
      }, E.exports.decodeStream = function(N, T) {
        return new E.exports.IconvLiteDecoderStream(E.exports.getDecoder(N, T), T);
      }, E.exports.supportsStreams = !0;
    }
  };
  var A;
  try {
    A = require("stream");
  } catch {
  }
  A && A.Transform ? E.exports.enableStreamingAPI(A) : E.exports.encodeStream = E.exports.decodeStream = function() {
    throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
  };
})(We);
var _T = We.exports;
const De = _T, { createLRU: nT } = ZE, H_ = nT({
  max: 500
});
O_.decode = function(E, _, n, e, A) {
  if (Buffer.isEncoding(_))
    return E.toString(_, n, e);
  let t;
  if (!A)
    t = H_.get(_), t || (t = De.getDecoder(_), H_.set(_, t));
  else {
    const I = { encoding: _, options: A }, N = JSON.stringify(I);
    t = H_.get(N), t || (t = De.getDecoder(I.encoding, I.options), H_.set(N, t));
  }
  const R = t.write(E.slice(n, e)), i = t.end();
  return i ? R + i : R;
};
O_.encode = function(E, _, n) {
  if (Buffer.isEncoding(_))
    return Buffer.from(E, _);
  const e = De.getEncoder(_, n || {}), A = e.write(E), t = e.end();
  return t && t.length > 0 ? Buffer.concat([A, t]) : A;
};
var Y = { exports: {} }, dA;
function dE() {
  return dA || (dA = 1, Y.exports = {
    0: "DECIMAL",
    // aka DECIMAL
    1: "TINY",
    // aka TINYINT, 1 byte
    2: "SHORT",
    // aka SMALLINT, 2 bytes
    3: "LONG",
    // aka INT, 4 bytes
    4: "FLOAT",
    // aka FLOAT, 4-8 bytes
    5: "DOUBLE",
    // aka DOUBLE, 8 bytes
    6: "NULL",
    // NULL (used for prepared statements, I think)
    7: "TIMESTAMP",
    // aka TIMESTAMP
    8: "LONGLONG",
    // aka BIGINT, 8 bytes
    9: "INT24",
    // aka MEDIUMINT, 3 bytes
    10: "DATE",
    // aka DATE
    11: "TIME",
    // aka TIME
    12: "DATETIME",
    // aka DATETIME
    13: "YEAR",
    // aka YEAR, 1 byte (don't ask)
    14: "NEWDATE",
    // aka ?
    15: "VARCHAR",
    // aka VARCHAR (?)
    16: "BIT",
    // aka BIT, 1-8 byte
    245: "JSON",
    246: "NEWDECIMAL",
    // aka DECIMAL
    247: "ENUM",
    // aka ENUM
    248: "SET",
    // aka SET
    249: "TINY_BLOB",
    // aka TINYBLOB, TINYTEXT
    250: "MEDIUM_BLOB",
    // aka MEDIUMBLOB, MEDIUMTEXT
    251: "LONG_BLOB",
    // aka LONGBLOG, LONGTEXT
    252: "BLOB",
    // aka BLOB, TEXT
    253: "VAR_STRING",
    // aka VARCHAR, VARBINARY
    254: "STRING",
    // aka CHAR, BINARY
    255: "GEOMETRY"
    // aka GEOMETRY
  }, Y.exports.DECIMAL = 0, Y.exports.TINY = 1, Y.exports.SHORT = 2, Y.exports.LONG = 3, Y.exports.FLOAT = 4, Y.exports.DOUBLE = 5, Y.exports.NULL = 6, Y.exports.TIMESTAMP = 7, Y.exports.LONGLONG = 8, Y.exports.INT24 = 9, Y.exports.DATE = 10, Y.exports.TIME = 11, Y.exports.DATETIME = 12, Y.exports.YEAR = 13, Y.exports.NEWDATE = 14, Y.exports.VARCHAR = 15, Y.exports.BIT = 16, Y.exports.VECTOR = 242, Y.exports.JSON = 245, Y.exports.NEWDECIMAL = 246, Y.exports.ENUM = 247, Y.exports.SET = 248, Y.exports.TINY_BLOB = 249, Y.exports.MEDIUM_BLOB = 250, Y.exports.LONG_BLOB = 251, Y.exports.BLOB = 252, Y.exports.VAR_STRING = 253, Y.exports.STRING = 254, Y.exports.GEOMETRY = 255), Y.exports;
}
const eT = Dn, AT = de.Buffer, WE = QN, HE = O_, tT = dE(), RT = /* @__PURE__ */ new Date(NaN), iT = "000000000000";
function NE(E, _) {
  const n = _.toString();
  return n.length >= E ? n : (iT + n).slice(-E);
}
const bn = 45, mn = 43, IT = 46, NT = 101, TT = 69;
let aT = class se {
  constructor(_, n, e, A) {
    this.sequenceId = _, this.numPackets = 1, this.buffer = n, this.start = e, this.offset = e + 4, this.end = A;
  }
  // ==============================
  // readers
  // ==============================
  reset() {
    this.offset = this.start + 4;
  }
  length() {
    return this.end - this.start;
  }
  slice() {
    return this.buffer.slice(this.start, this.end);
  }
  dump() {
    console.log(
      [this.buffer.asciiSlice(this.start, this.end)],
      this.buffer.slice(this.start, this.end),
      this.length(),
      this.sequenceId
    );
  }
  haveMoreData() {
    return this.end > this.offset;
  }
  skip(_) {
    this.offset += _;
  }
  readInt8() {
    return this.buffer[this.offset++];
  }
  readInt16() {
    return this.offset += 2, this.buffer.readUInt16LE(this.offset - 2);
  }
  readInt24() {
    return this.readInt16() + (this.readInt8() << 16);
  }
  readInt32() {
    return this.offset += 4, this.buffer.readUInt32LE(this.offset - 4);
  }
  readSInt8() {
    return this.buffer.readInt8(this.offset++);
  }
  readSInt16() {
    return this.offset += 2, this.buffer.readInt16LE(this.offset - 2);
  }
  readSInt32() {
    return this.offset += 4, this.buffer.readInt32LE(this.offset - 4);
  }
  readInt64JSNumber() {
    const _ = this.readInt32(), n = this.readInt32();
    return new WE(_, n, !0).toNumber();
  }
  readSInt64JSNumber() {
    const _ = this.readInt32(), n = this.readInt32();
    return n & 2147483648 ? new WE(_, n, !1).toNumber() : _ + 4294967296 * n;
  }
  readInt64String() {
    const _ = this.readInt32(), n = this.readInt32();
    return new WE(_, n, !0).toString();
  }
  readSInt64String() {
    const _ = this.readInt32(), n = this.readInt32();
    return new WE(_, n, !1).toString();
  }
  readInt64() {
    const _ = this.readInt32(), n = this.readInt32();
    let e = new WE(_, n, !0);
    const A = e.toNumber(), t = e.toString();
    return e = A.toString() === t ? A : t, e;
  }
  readSInt64() {
    const _ = this.readInt32(), n = this.readInt32();
    let e = new WE(_, n, !1);
    const A = e.toNumber(), t = e.toString();
    return e = A.toString() === t ? A : t, e;
  }
  isEOF() {
    return this.buffer[this.offset] === 254 && this.length() < 13;
  }
  eofStatusFlags() {
    return this.buffer.readInt16LE(this.offset + 3);
  }
  eofWarningCount() {
    return this.buffer.readInt16LE(this.offset + 1);
  }
  readLengthCodedNumber(_, n) {
    const e = this.buffer[this.offset++];
    return e < 251 ? e : this.readLengthCodedNumberExt(e, _, n);
  }
  readLengthCodedNumberSigned(_) {
    return this.readLengthCodedNumber(_, !0);
  }
  readLengthCodedNumberExt(_, n, e) {
    let A, t, R;
    if (_ === 251)
      return null;
    if (_ === 252)
      return this.readInt8() + (this.readInt8() << 8);
    if (_ === 253)
      return this.readInt8() + (this.readInt8() << 8) + (this.readInt8() << 16);
    if (_ === 254) {
      if (A = this.readInt32(), t = this.readInt32(), t === 0)
        return A;
      if (t < 2097152)
        return t * 4294967296 + A;
      R = new WE(A, t, !e);
      const i = R.toNumber(), I = R.toString();
      return R = i.toString() === I ? i : I, n ? I : R;
    }
    throw console.trace(), new Error(`Should not reach here: ${_}`);
  }
  readFloat() {
    const _ = this.buffer.readFloatLE(this.offset);
    return this.offset += 4, _;
  }
  readDouble() {
    const _ = this.buffer.readDoubleLE(this.offset);
    return this.offset += 8, _;
  }
  readBuffer(_) {
    return typeof _ > "u" && (_ = this.end - this.offset), this.offset += _, this.buffer.slice(this.offset - _, this.offset);
  }
  // DATE, DATETIME and TIMESTAMP
  readDateTime(_) {
    if (!_ || _ === "Z" || _ === "local") {
      const e = this.readInt8();
      if (e === 251)
        return null;
      let A = 0, t = 0, R = 0, i = 0, I = 0, N = 0, T = 0;
      return e > 3 && (A = this.readInt16(), t = this.readInt8(), R = this.readInt8()), e > 6 && (i = this.readInt8(), I = this.readInt8(), N = this.readInt8()), e > 10 && (T = this.readInt32() / 1e3), A + t + R + i + I + N + T === 0 ? RT : _ === "Z" ? new Date(Date.UTC(A, t - 1, R, i, I, N, T)) : new Date(A, t - 1, R, i, I, N, T);
    }
    let n = this.readDateTimeString(6, "T", null);
    return n.length === 10 && (n += "T00:00:00"), new Date(n + _);
  }
  readDateTimeString(_, n, e) {
    const A = this.readInt8();
    let t = 0, R = 0, i = 0, I = 0, N = 0, T = 0, a = 0, u;
    return A > 3 && (t = this.readInt16(), R = this.readInt8(), i = this.readInt8(), u = [NE(4, t), NE(2, R), NE(2, i)].join("-")), A > 6 ? (I = this.readInt8(), N = this.readInt8(), T = this.readInt8(), u += `${n || " "}${[
      NE(2, I),
      NE(2, N),
      NE(2, T)
    ].join(":")}`) : e === tT.DATETIME && (u += " 00:00:00"), A > 10 && (a = this.readInt32(), u += ".", _ && (a = NE(6, a), a.length > _ && (a = a.substring(0, _))), u += a), u;
  }
  // TIME - value as a string, Can be negative
  readTimeString(_) {
    const n = this.readInt8();
    if (n === 0)
      return "00:00:00";
    const e = this.readInt8() ? -1 : 1;
    let A = 0, t = 0, R = 0, i = 0, I = 0;
    return n > 6 && (A = this.readInt32(), t = this.readInt8(), R = this.readInt8(), i = this.readInt8()), n > 10 && (I = this.readInt32()), _ ? (t += A * 24, R += t * 60, i += R * 60, I += i * 1e3, I *= e, I) : (e === -1 ? "-" : "") + [NE(2, A * 24 + t), NE(2, R), NE(2, i)].join(":") + (I ? `.${I}`.replace(/0+$/, "") : "");
  }
  readLengthCodedString(_) {
    const n = this.readLengthCodedNumber();
    return n === null ? null : (this.offset += n, HE.decode(
      this.buffer,
      _,
      this.offset - n,
      this.offset
    ));
  }
  readLengthCodedBuffer() {
    const _ = this.readLengthCodedNumber();
    return _ === null ? null : this.readBuffer(_);
  }
  readNullTerminatedString(_) {
    const n = this.offset;
    let e = this.offset;
    for (; this.buffer[e]; )
      e = e + 1;
    return this.offset = e + 1, HE.decode(this.buffer, _, n, e);
  }
  // TODO reuse?
  readString(_, n) {
    return typeof _ == "string" && typeof n > "u" && (n = _, _ = void 0), typeof _ > "u" && (_ = this.end - this.offset), this.offset += _, HE.decode(
      this.buffer,
      n,
      this.offset - _,
      this.offset
    );
  }
  parseInt(_, n) {
    if (_ === null)
      return null;
    if (_ >= 14 && !n) {
      const T = this.buffer.toString("ascii", this.offset, this.offset + _);
      return this.offset += _, Number(T);
    }
    let e = 0;
    const A = this.offset, t = this.offset + _;
    let R = 1;
    if (_ === 0)
      return 0;
    this.buffer[this.offset] === bn && (this.offset++, R = -1);
    let i;
    const I = t - this.offset;
    if (n) {
      if (I >= 15)
        return i = this.readString(t - this.offset, "binary"), e = parseInt(i, 10), e.toString() === i ? R * e : R === -1 ? `-${i}` : i;
      if (I > 16)
        return i = this.readString(t - this.offset), R === -1 ? `-${i}` : i;
    }
    for (this.buffer[this.offset] === mn && this.offset++; this.offset < t; )
      e *= 10, e += this.buffer[this.offset] - 48, this.offset++;
    const N = e * R;
    return !n || (i = this.buffer.toString("ascii", A, t), N.toString() === i) ? N : i;
  }
  // note that if value of inputNumberAsString is bigger than MAX_SAFE_INTEGER
  // ( or smaller than MIN_SAFE_INTEGER ) the parseIntNoBigCheck result might be
  // different from what you would get from Number(inputNumberAsString)
  // String(parseIntNoBigCheck) <> String(Number(inputNumberAsString)) <> inputNumberAsString
  parseIntNoBigCheck(_) {
    if (_ === null)
      return null;
    let n = 0;
    const e = this.offset + _;
    let A = 1;
    if (_ === 0)
      return 0;
    for (this.buffer[this.offset] === bn && (this.offset++, A = -1), this.buffer[this.offset] === mn && this.offset++; this.offset < e; )
      n *= 10, n += this.buffer[this.offset] - 48, this.offset++;
    return n * A;
  }
  // copy-paste from https://github.com/mysqljs/mysql/blob/master/lib/protocol/Parser.js
  parseGeometryValue() {
    const _ = this.readLengthCodedBuffer();
    let n = 4;
    if (_ === null || !_.length)
      return null;
    function e() {
      let A, t, R, i, I, N, T = null;
      const a = _.readUInt8(n);
      n += 1;
      const u = a ? _.readUInt32LE(n) : _.readUInt32BE(n);
      switch (n += 4, u) {
        case 1:
          A = a ? _.readDoubleLE(n) : _.readDoubleBE(n), n += 8, t = a ? _.readDoubleLE(n) : _.readDoubleBE(n), n += 8, T = { x: A, y: t };
          break;
        case 2:
          for (I = a ? _.readUInt32LE(n) : _.readUInt32BE(n), n += 4, T = [], R = I; R > 0; R--)
            A = a ? _.readDoubleLE(n) : _.readDoubleBE(n), n += 8, t = a ? _.readDoubleLE(n) : _.readDoubleBE(n), n += 8, T.push({ x: A, y: t });
          break;
        case 3:
          const C = a ? _.readUInt32LE(n) : _.readUInt32BE(n);
          for (n += 4, T = [], R = C; R > 0; R--) {
            for (I = a ? _.readUInt32LE(n) : _.readUInt32BE(n), n += 4, N = [], i = I; i > 0; i--)
              A = a ? _.readDoubleLE(n) : _.readDoubleBE(n), n += 8, t = a ? _.readDoubleLE(n) : _.readDoubleBE(n), n += 8, N.push({ x: A, y: t });
            T.push(N);
          }
          break;
        case 4:
        case 5:
        case 6:
        case 7:
          const r = a ? _.readUInt32LE(n) : _.readUInt32BE(n);
          for (n += 4, T = [], R = r; R > 0; R--)
            T.push(e());
          break;
      }
      return T;
    }
    return e();
  }
  parseVector() {
    const _ = this.readLengthCodedNumber(), n = this.offset + _, e = [];
    for (; this.offset < n && this.offset < this.end; )
      e.push(this.readFloat());
    return e;
  }
  parseDate(_) {
    const n = this.readLengthCodedNumber();
    if (n === null)
      return null;
    if (n !== 10)
      return /* @__PURE__ */ new Date(NaN);
    const e = this.parseInt(4);
    this.offset++;
    const A = this.parseInt(2);
    this.offset++;
    const t = this.parseInt(2);
    return !_ || _ === "local" ? new Date(e, A - 1, t) : _ === "Z" ? new Date(Date.UTC(e, A - 1, t)) : /* @__PURE__ */ new Date(
      `${NE(4, e)}-${NE(2, A)}-${NE(2, t)}T00:00:00${_}`
    );
  }
  parseDateTime(_) {
    const n = this.readLengthCodedString("binary");
    return n === null ? null : !_ || _ === "local" ? new Date(n) : /* @__PURE__ */ new Date(`${n}${_}`);
  }
  parseFloat(_) {
    if (_ === null)
      return null;
    let n = 0;
    const e = this.offset + _;
    let A = 1, t = !1, R = 0;
    if (_ === 0)
      return 0;
    for (this.buffer[this.offset] === bn && (this.offset++, A = -1), this.buffer[this.offset] === mn && this.offset++; this.offset < e; )
      if (R = this.buffer[this.offset], R === IT)
        t = !0, this.offset++;
      else if (R === NT || R === TT) {
        this.offset++;
        const i = this.parseInt(e - this.offset);
        return n / A * Math.pow(10, i);
      } else
        n *= 10, n += this.buffer[this.offset] - 48, this.offset++, t && (A = A * 10);
    return n / A;
  }
  parseLengthCodedIntNoBigCheck() {
    return this.parseIntNoBigCheck(this.readLengthCodedNumber());
  }
  parseLengthCodedInt(_) {
    return this.parseInt(this.readLengthCodedNumber(), _);
  }
  parseLengthCodedIntString() {
    return this.readLengthCodedString("binary");
  }
  parseLengthCodedFloat() {
    return this.parseFloat(this.readLengthCodedNumber());
  }
  peekByte() {
    return this.buffer[this.offset];
  }
  // OxFE is often used as "Alt" flag - not ok, not error.
  // For example, it's first byte of AuthSwitchRequest
  isAlt() {
    return this.peekByte() === 254;
  }
  isError() {
    return this.peekByte() === 255;
  }
  asError(_) {
    this.reset(), this.readInt8();
    const n = this.readInt16();
    let e = "";
    this.buffer[this.offset] === 35 && (this.skip(1), e = this.readBuffer(5).toString());
    const A = this.readString(void 0, _), t = new Error(A);
    return t.code = eT[n], t.errno = n, t.sqlState = e, t.sqlMessage = A, t;
  }
  writeInt32(_) {
    this.buffer.writeUInt32LE(_, this.offset), this.offset += 4;
  }
  writeInt24(_) {
    this.writeInt8(_ & 255), this.writeInt16(_ >> 8);
  }
  writeInt16(_) {
    this.buffer.writeUInt16LE(_, this.offset), this.offset += 2;
  }
  writeInt8(_) {
    this.buffer.writeUInt8(_, this.offset), this.offset++;
  }
  writeDouble(_) {
    this.buffer.writeDoubleLE(_, this.offset), this.offset += 8;
  }
  writeBuffer(_) {
    _.copy(this.buffer, this.offset), this.offset += _.length;
  }
  writeNull() {
    this.buffer[this.offset] = 251, this.offset++;
  }
  // TODO: refactor following three?
  writeNullTerminatedString(_, n) {
    const e = HE.encode(_, n);
    this.buffer.length && e.copy(this.buffer, this.offset), this.offset += e.length, this.writeInt8(0);
  }
  writeString(_, n) {
    if (_ === null) {
      this.writeInt8(251);
      return;
    }
    if (_.length === 0)
      return;
    const e = HE.encode(_, n);
    this.buffer.length && e.copy(this.buffer, this.offset), this.offset += e.length;
  }
  writeLengthCodedString(_, n) {
    const e = HE.encode(_, n);
    this.writeLengthCodedNumber(e.length), this.buffer.length && e.copy(this.buffer, this.offset), this.offset += e.length;
  }
  writeLengthCodedBuffer(_) {
    this.writeLengthCodedNumber(_.length), _.copy(this.buffer, this.offset), this.offset += _.length;
  }
  writeLengthCodedNumber(_) {
    return _ < 251 ? this.writeInt8(_) : _ < 65535 ? (this.writeInt8(252), this.writeInt16(_)) : _ < 16777215 ? (this.writeInt8(253), this.writeInt24(_)) : _ === null ? this.writeInt8(251) : (this.writeInt8(254), this.buffer.writeUInt32LE(_, this.offset), this.offset += 4, this.buffer.writeUInt32LE(_ >> 32, this.offset), this.offset += 4, this.offset);
  }
  writeDate(_, n) {
    if (this.buffer.writeUInt8(11, this.offset), !n || n === "local")
      this.buffer.writeUInt16LE(_.getFullYear(), this.offset + 1), this.buffer.writeUInt8(_.getMonth() + 1, this.offset + 3), this.buffer.writeUInt8(_.getDate(), this.offset + 4), this.buffer.writeUInt8(_.getHours(), this.offset + 5), this.buffer.writeUInt8(_.getMinutes(), this.offset + 6), this.buffer.writeUInt8(_.getSeconds(), this.offset + 7), this.buffer.writeUInt32LE(_.getMilliseconds() * 1e3, this.offset + 8);
    else {
      if (n !== "Z") {
        const e = (n[0] === "-" ? -1 : 1) * (parseInt(n.substring(1, 3), 10) * 60 + parseInt(n.substring(4), 10));
        e !== 0 && (_ = new Date(_.getTime() + 6e4 * e));
      }
      this.buffer.writeUInt16LE(_.getUTCFullYear(), this.offset + 1), this.buffer.writeUInt8(_.getUTCMonth() + 1, this.offset + 3), this.buffer.writeUInt8(_.getUTCDate(), this.offset + 4), this.buffer.writeUInt8(_.getUTCHours(), this.offset + 5), this.buffer.writeUInt8(_.getUTCMinutes(), this.offset + 6), this.buffer.writeUInt8(_.getUTCSeconds(), this.offset + 7), this.buffer.writeUInt32LE(_.getUTCMilliseconds() * 1e3, this.offset + 8);
    }
    this.offset += 12;
  }
  writeHeader(_) {
    const n = this.offset;
    this.offset = 0, this.writeInt24(this.buffer.length - 4), this.writeInt8(_), this.offset = n;
  }
  clone() {
    return new se(this.sequenceId, this.buffer, this.start, this.end);
  }
  type() {
    return this.isEOF() ? "EOF" : this.isError() ? "Error" : this.buffer[this.offset] === 0 ? "maybeOK" : "";
  }
  static lengthCodedNumberLength(_) {
    return _ < 251 ? 1 : _ < 65535 ? 3 : _ < 16777215 ? 5 : 9;
  }
  static lengthCodedStringLength(_, n) {
    const A = HE.encode(_, n).length;
    return se.lengthCodedNumberLength(A) + A;
  }
  static MockBuffer() {
    const _ = function() {
    }, n = Buffer.alloc(0);
    for (const e in AT.prototype)
      typeof n[e] == "function" && (n[e] = _);
    return n;
  }
};
var Z = aT;
const v_ = Z, X_ = 16777215;
function OT(E, _) {
  const n = E[_], e = E[_ + 1], A = E[_ + 2];
  return e + A === 0 ? n : n + (e << 8) + (A << 16);
}
let uT = class ME {
  constructor(_, n) {
    typeof n > "u" && (n = 4), this.buffer = [], this.bufferLength = 0, this.packetHeaderLength = n, this.headerLen = 0, this.length = 0, this.largePacketParts = [], this.firstPacketSequenceId = 0, this.onPacket = _, this.execute = ME.prototype.executeStart, this._flushLargePacket = n === 7 ? this._flushLargePacket7 : this._flushLargePacket4;
  }
  _flushLargePacket4() {
    const _ = this.largePacketParts.length;
    this.largePacketParts.unshift(Buffer.from([0, 0, 0, 0]));
    const n = Buffer.concat(this.largePacketParts), e = new v_(this.firstPacketSequenceId, n, 0, n.length);
    this.largePacketParts.length = 0, e.numPackets = _, this.onPacket(e);
  }
  _flushLargePacket7() {
    const _ = this.largePacketParts.length;
    this.largePacketParts.unshift(Buffer.from([0, 0, 0, 0, 0, 0, 0]));
    const n = Buffer.concat(this.largePacketParts);
    this.largePacketParts.length = 0;
    const e = new v_(this.firstPacketSequenceId, n, 0, n.length);
    e.numPackets = _, this.onPacket(e);
  }
  executeStart(_) {
    let n = 0;
    const e = _.length;
    for (; e - n >= 3; )
      if (this.length = OT(_, n), e - n >= this.length + this.packetHeaderLength) {
        const A = _[n + 3];
        this.length < X_ && this.largePacketParts.length === 0 ? this.onPacket(
          new v_(
            A,
            _,
            n,
            n + this.packetHeaderLength + this.length
          )
        ) : (this.largePacketParts.length === 0 && (this.firstPacketSequenceId = A), this.largePacketParts.push(
          _.slice(
            n + this.packetHeaderLength,
            n + this.packetHeaderLength + this.length
          )
        ), this.length < X_ && this._flushLargePacket()), n += this.packetHeaderLength + this.length;
      } else {
        this.buffer = [_.slice(n + 3, e)], this.bufferLength = e - n - 3, this.execute = ME.prototype.executePayload;
        return;
      }
    e - n > 0 && (this.headerLen = e - n, this.length = _[n], this.headerLen === 2 ? (this.length = _[n] + (_[n + 1] << 8), this.execute = ME.prototype.executeHeader3) : this.execute = ME.prototype.executeHeader2);
  }
  executePayload(_) {
    let n = 0;
    const e = _.length, A = this.length - this.bufferLength + this.packetHeaderLength - 3;
    if (e - n >= A) {
      const t = Buffer.allocUnsafe(this.length + this.packetHeaderLength);
      let R = 3;
      for (let I = 0; I < this.buffer.length; ++I)
        this.buffer[I].copy(t, R), R += this.buffer[I].length;
      _.copy(t, R, n, n + A);
      const i = t[3];
      if (this.length < X_ && this.largePacketParts.length === 0 ? this.onPacket(
        new v_(
          i,
          t,
          0,
          this.length + this.packetHeaderLength
        )
      ) : (this.largePacketParts.length === 0 && (this.firstPacketSequenceId = i), this.largePacketParts.push(
        t.slice(
          this.packetHeaderLength,
          this.packetHeaderLength + this.length
        )
      ), this.length < X_ && this._flushLargePacket()), this.buffer = [], this.bufferLength = 0, this.execute = ME.prototype.executeStart, n += A, e - n > 0)
        return this.execute(_.slice(n, e));
    } else
      this.buffer.push(_), this.bufferLength += _.length;
    return null;
  }
  executeHeader2(_) {
    return this.length += _[0] << 8, _.length > 1 ? (this.length += _[1] << 16, this.execute = ME.prototype.executePayload, this.executePayload(_.slice(2))) : (this.execute = ME.prototype.executeHeader3, null);
  }
  executeHeader3(_) {
    return this.length += _[0] << 16, this.execute = ME.prototype.executePayload, this.executePayload(_.slice(1));
  }
};
var oR = uT, le = { exports: {} };
const cT = Z;
class Ke {
  constructor(_) {
    this.pluginName = _.pluginName, this.pluginData = _.pluginData;
  }
  toPacket(_) {
    const n = 6 + this.pluginName.length + this.pluginData.length, e = Buffer.allocUnsafe(n), A = new cT(0, e, 0, n);
    return A.offset = 4, A.writeInt8(2), A.writeNullTerminatedString(this.pluginName, _), A.writeBuffer(this.pluginData), A;
  }
  static fromPacket(_, n) {
    _.readInt8();
    const e = _.readNullTerminatedString(n), A = _.readBuffer();
    return new Ke({
      pluginName: e,
      pluginData: A
    });
  }
}
var CT = Ke;
const rT = Z;
class ke {
  constructor(_) {
    this.pluginName = _.pluginName, this.pluginData = _.pluginData;
  }
  toPacket() {
    const _ = 6 + this.pluginName.length + this.pluginData.length, n = Buffer.allocUnsafe(_), e = new rT(0, n, 0, _);
    return e.offset = 4, e.writeInt8(254), e.writeNullTerminatedString(this.pluginName, "cesu8"), e.writeBuffer(this.pluginData), e;
  }
  static fromPacket(_) {
    _.readInt8();
    const n = _.readNullTerminatedString("cesu8"), e = _.readBuffer();
    return new ke({
      pluginName: n,
      pluginData: e
    });
  }
}
var DT = ke;
const sT = Z;
class je {
  constructor(_) {
    this.data = _;
  }
  toPacket() {
    const _ = 5 + this.data.length, n = Buffer.allocUnsafe(_), e = new sT(0, n, 0, _);
    return e.offset = 4, e.writeInt8(1), e.writeBuffer(this.data), e;
  }
  static fromPacket(_) {
    _.readInt8();
    const n = _.readBuffer();
    return new je(n);
  }
  static verifyMarker(_) {
    return _.peekByte() === 1;
  }
}
var lT = je;
const hT = Z;
class ze {
  constructor(_) {
    Buffer.isBuffer(_) || (_ = Buffer.from(_)), this.data = _;
  }
  toPacket() {
    const _ = 4 + this.data.length, n = Buffer.allocUnsafe(_), e = new hT(0, n, 0, _);
    return e.offset = 4, e.writeBuffer(this.data), e;
  }
  static fromPacket(_) {
    const n = _.readBuffer();
    return new ze(n);
  }
}
var ST = ze;
const Je = dE(), AE = Z, RE = new Array(256);
class Ze {
  constructor(_) {
    this.columns = _ || [];
  }
  static toPacket(_, n) {
    let A = 0;
    _.forEach((N) => {
      if (N === null || typeof N > "u") {
        ++A;
        return;
      }
      A += AE.lengthCodedStringLength(N.toString(10), n);
    }), A = A + 2;
    const t = Buffer.allocUnsafe(A + 4), R = new AE(0, t, 0, A + 4);
    R.offset = 4, R.writeInt8(0);
    let i = 0, I = 1;
    return _.forEach((N) => {
      N.type === Je.NULL && (i += I), I *= 2, I === 256 && (R.writeInt8(i), i = 0, I = 1);
    }), I !== 1 && R.writeInt8(i), _.forEach((N) => {
      if (N === null) {
        R.writeNull();
        return;
      }
      if (typeof N > "u") {
        R.writeInt8(0);
        return;
      }
      R.writeLengthCodedString(N.toString(10), n);
    }), R;
  }
  // TODO: complete list of types...
  static fromPacket(_, n) {
    const e = new Array(_.length);
    n.readInt8();
    const A = Math.floor((_.length + 7 + 2) / 8);
    n.skip(A);
    for (let t = 0; t < e.length; ++t)
      e[t] = RE[_[t].columnType].apply(n);
    return new Ze(e);
  }
}
RE[Je.DECIMAL] = AE.prototype.readLengthCodedString;
RE[1] = AE.prototype.readInt8;
RE[2] = AE.prototype.readInt16;
RE[3] = AE.prototype.readInt32;
RE[4] = AE.prototype.readFloat;
RE[5] = AE.prototype.readDouble;
RE[6] = AE.prototype.assertInvalid;
RE[7] = AE.prototype.readTimestamp;
RE[8] = AE.prototype.readInt64;
RE[9] = AE.prototype.readInt32;
RE[10] = AE.prototype.readTimestamp;
RE[11] = AE.prototype.readTime;
RE[12] = AE.prototype.readDateTime;
RE[13] = AE.prototype.readInt16;
RE[Je.VAR_STRING] = AE.prototype.readLengthCodedString;
var BT = Ze, hE = {
  QUIT: 1,
  INIT_DB: 2,
  QUERY: 3,
  FIELD_LIST: 4,
  PING: 14,
  CHANGE_USER: 17,
  BINLOG_DUMP: 18,
  REGISTER_SLAVE: 21,
  STMT_PREPARE: 22,
  STMT_EXECUTE: 23,
  STMT_CLOSE: 25
};
const fT = Z, MT = hE;
let gT = class {
  constructor(_) {
    this.binlogPos = _.binlogPos || 0, this.serverId = _.serverId || 0, this.flags = _.flags || 0, this.filename = _.filename || "";
  }
  toPacket() {
    const _ = 15 + Buffer.byteLength(this.filename, "utf8"), n = Buffer.allocUnsafe(_), e = new fT(0, n, 0, _);
    return e.offset = 4, e.writeInt8(MT.BINLOG_DUMP), e.writeInt32(this.binlogPos), e.writeInt16(this.flags), e.writeInt32(this.serverId), e.writeString(this.filename), e;
  }
};
var LT = gT, V = {};
V.LONG_PASSWORD = 1;
V.FOUND_ROWS = 2;
V.LONG_FLAG = 4;
V.CONNECT_WITH_DB = 8;
V.NO_SCHEMA = 16;
V.COMPRESS = 32;
V.ODBC = 64;
V.LOCAL_FILES = 128;
V.IGNORE_SPACE = 256;
V.PROTOCOL_41 = 512;
V.INTERACTIVE = 1024;
V.SSL = 2048;
V.IGNORE_SIGPIPE = 4096;
V.TRANSACTIONS = 8192;
V.RESERVED = 16384;
V.SECURE_CONNECTION = 32768;
V.MULTI_STATEMENTS = 65536;
V.MULTI_RESULTS = 131072;
V.PS_MULTI_RESULTS = 262144;
V.PLUGIN_AUTH = 524288;
V.CONNECT_ATTRS = 1048576;
V.PLUGIN_AUTH_LENENC_CLIENT_DATA = 2097152;
V.CAN_HANDLE_EXPIRED_PASSWORDS = 4194304;
V.SESSION_TRACK = 8388608;
V.SSL_VERIFY_SERVER_CERT = 1073741824;
V.REMEMBER_OPTIONS = 2147483648;
V.MULTI_FACTOR_AUTHENTICATION = 268435456;
var qE = {};
(function(E) {
  const _ = U_;
  function n(R, i, I) {
    const N = _.createHash("sha1");
    return N.update(R), i && N.update(i), I && N.update(I), N.digest();
  }
  function e(R, i) {
    const I = Buffer.allocUnsafe(R.length);
    for (let N = 0; N < R.length; N++)
      I[N] = R[N] ^ i[N];
    return I;
  }
  E.xor = e;
  function A(R, i, I) {
    if (!R)
      return Buffer.alloc(0);
    const N = n(R);
    return E.calculateTokenFromPasswordSha(N, i, I);
  }
  E.calculateTokenFromPasswordSha = function(R, i, I) {
    const N = i.slice(0, 8), T = I.slice(0, 12), a = n(R), u = n(N, T, a);
    return e(u, R);
  }, E.calculateToken = A, E.verifyToken = function(R, i, I, N) {
    const T = e(I, n(R, i, N));
    return n(T).compare(N) === 0;
  }, E.doubleSha1 = function(R) {
    return n(n(R));
  };
  function t(R, i) {
    const I = Buffer.allocUnsafe(R.length), N = i.length;
    for (let T = 0; T < R.length; T++)
      I[T] = R[T] ^ i[T % N];
    return I;
  }
  E.xorRotating = t;
})(qE);
var Yn, UA;
function SE() {
  return UA || (UA = 1, Yn = [
    "utf8",
    "big5",
    "latin2",
    "dec8",
    "cp850",
    "latin1",
    "hp8",
    "koi8r",
    "latin1",
    "latin2",
    "swe7",
    "ascii",
    "eucjp",
    "sjis",
    "cp1251",
    "latin1",
    "hebrew",
    "utf8",
    "tis620",
    "euckr",
    "latin7",
    "latin2",
    "koi8u",
    "cp1251",
    "gb2312",
    "greek",
    "cp1250",
    "latin2",
    "gbk",
    "cp1257",
    "latin5",
    "latin1",
    "armscii8",
    "cesu8",
    "cp1250",
    "ucs2",
    "cp866",
    "keybcs2",
    "macintosh",
    "macroman",
    "cp852",
    "latin7",
    "latin7",
    "macintosh",
    "cp1250",
    "utf8",
    "utf8",
    "latin1",
    "latin1",
    "latin1",
    "cp1251",
    "cp1251",
    "cp1251",
    "macroman",
    "utf16",
    "utf16",
    "utf16-le",
    "cp1256",
    "cp1257",
    "cp1257",
    "utf32",
    "utf32",
    "utf16-le",
    "binary",
    "armscii8",
    "ascii",
    "cp1250",
    "cp1256",
    "cp866",
    "dec8",
    "greek",
    "hebrew",
    "hp8",
    "keybcs2",
    "koi8r",
    "koi8u",
    "cesu8",
    "latin2",
    "latin5",
    "latin7",
    "cp850",
    "cp852",
    "swe7",
    "cesu8",
    "big5",
    "euckr",
    "gb2312",
    "gbk",
    "sjis",
    "tis620",
    "ucs2",
    "eucjp",
    "geostd8",
    "geostd8",
    "latin1",
    "cp932",
    "cp932",
    "eucjpms",
    "eucjpms",
    "cp1250",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf16",
    "utf8",
    "utf8",
    "utf8",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "ucs2",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "ucs2",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf32",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "cesu8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "cesu8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "gb18030",
    "gb18030",
    "gb18030",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8",
    "utf8"
  ]), Yn;
}
const dT = hE, UT = V, K_ = Z, oA = qE, oT = SE();
let wT = class {
  constructor(_) {
    this.flags = _.flags, this.user = _.user || "", this.database = _.database || "", this.password = _.password || "", this.passwordSha1 = _.passwordSha1, this.authPluginData1 = _.authPluginData1, this.authPluginData2 = _.authPluginData2, this.connectAttributes = _.connectAttrinutes || {};
    let n;
    this.passwordSha1 ? n = oA.calculateTokenFromPasswordSha(
      this.passwordSha1,
      this.authPluginData1,
      this.authPluginData2
    ) : n = oA.calculateToken(
      this.password,
      this.authPluginData1,
      this.authPluginData2
    ), this.authToken = n, this.charsetNumber = _.charsetNumber;
  }
  // TODO
  // ChangeUser.fromPacket = function(packet)
  // };
  serializeToBuffer(_) {
    const n = (t) => this.flags & UT[t], e = new K_(0, _, 0, _.length);
    e.offset = 4;
    const A = oT[this.charsetNumber];
    if (e.writeInt8(dT.CHANGE_USER), e.writeNullTerminatedString(this.user, A), n("SECURE_CONNECTION") ? (e.writeInt8(this.authToken.length), e.writeBuffer(this.authToken)) : (e.writeBuffer(this.authToken), e.writeInt8(0)), e.writeNullTerminatedString(this.database, A), e.writeInt16(this.charsetNumber), n("PLUGIN_AUTH") && e.writeNullTerminatedString("mysql_native_password", "latin1"), n("CONNECT_ATTRS")) {
      const t = this.connectAttributes, R = Object.keys(t);
      let i = 0;
      for (let I = 0; I < R.length; ++I)
        i += K_.lengthCodedStringLength(R[I], A), i += K_.lengthCodedStringLength(
          t[R[I]],
          A
        );
      e.writeLengthCodedNumber(i);
      for (let I = 0; I < R.length; ++I)
        e.writeLengthCodedString(R[I], A), e.writeLengthCodedString(
          t[R[I]],
          A
        );
    }
    return e;
  }
  toPacket() {
    if (typeof this.user != "string")
      throw new Error('"user" connection config property must be a string');
    if (typeof this.database != "string")
      throw new Error('"database" connection config property must be a string');
    const _ = this.serializeToBuffer(K_.MockBuffer());
    return this.serializeToBuffer(Buffer.allocUnsafe(_.offset));
  }
};
var GT = wT;
const FT = Z, PT = hE;
let QT = class {
  constructor(_) {
    this.id = _;
  }
  // note: no response sent back
  toPacket() {
    const _ = new FT(0, Buffer.allocUnsafe(9), 0, 9);
    return _.offset = 4, _.writeInt8(PT.STMT_CLOSE), _.writeInt32(this.id), _;
  }
};
var VT = QT, eE = {};
eE.NOT_NULL = 1;
eE.PRI_KEY = 2;
eE.UNIQUE_KEY = 4;
eE.MULTIPLE_KEY = 8;
eE.BLOB = 16;
eE.UNSIGNED = 32;
eE.ZEROFILL = 64;
eE.BINARY = 128;
eE.ENUM = 256;
eE.AUTO_INCREMENT = 512;
eE.TIMESTAMP = 1024;
eE.SET = 2048;
eE.NO_DEFAULT_VALUE = 4096;
eE.ON_UPDATE_NOW = 8192;
eE.NUM = 32768;
const wA = Z, wR = O_, yn = SE(), GA = ["catalog", "schema", "table", "orgTable", "name", "orgName"];
class GR {
  constructor(_, n) {
    this._buf = _.buffer, this._clientEncoding = n, this._catalogLength = _.readLengthCodedNumber(), this._catalogStart = _.offset, _.offset += this._catalogLength, this._schemaLength = _.readLengthCodedNumber(), this._schemaStart = _.offset, _.offset += this._schemaLength, this._tableLength = _.readLengthCodedNumber(), this._tableStart = _.offset, _.offset += this._tableLength, this._orgTableLength = _.readLengthCodedNumber(), this._orgTableStart = _.offset, _.offset += this._orgTableLength;
    const e = _.readLengthCodedNumber(), A = _.offset;
    _.offset += e, this._orgNameLength = _.readLengthCodedNumber(), this._orgNameStart = _.offset, _.offset += this._orgNameLength, _.skip(1), this.characterSet = _.readInt16(), this.encoding = yn[this.characterSet], this.name = wR.decode(
      this._buf,
      this.encoding === "binary" ? this._clientEncoding : this.encoding,
      A,
      A + e
    ), this.columnLength = _.readInt32(), this.columnType = _.readInt8(), this.type = this.columnType, this.flags = _.readInt16(), this.decimals = _.readInt8();
  }
  inspect() {
    return {
      catalog: this.catalog,
      schema: this.schema,
      name: this.name,
      orgName: this.orgName,
      table: this.table,
      orgTable: this.orgTable,
      characterSet: this.characterSet,
      encoding: this.encoding,
      columnLength: this.columnLength,
      type: this.columnType,
      flags: this.flags,
      decimals: this.decimals
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")](_, n, e) {
    const A = dE(), t = [];
    for (const a in A)
      t[A[a]] = a;
    const R = eE, i = [], I = this.flags;
    for (const a in R)
      I & R[a] && (a === "PRI_KEY" ? i.push("PRIMARY KEY") : a === "NOT_NULL" ? i.push("NOT NULL") : a === "BINARY" || a === "MULTIPLE_KEY" || a === "NO_DEFAULT_VALUE" || a === "BLOB" || a === "UNSIGNED" || a === "TIMESTAMP" || (a === "ON_UPDATE_NOW" ? i.push("ON UPDATE CURRENT_TIMESTAMP") : i.push(a)));
    if (_ > 1)
      return e({
        ...this.inspect(),
        typeName: t[this.columnType],
        flags: i
      });
    const N = this.flags & R.UNSIGNED;
    let T = t[this.columnType];
    return T === "BLOB" ? this.columnLength === 4294967295 ? T = "LONGTEXT" : this.columnLength === 67108860 ? T = "MEDIUMTEXT" : this.columnLength === 262140 ? T = "TEXT" : this.columnLength === 1020 ? T = "TINYTEXT" : T = `BLOB(${this.columnLength})` : T === "VAR_STRING" ? T = `VARCHAR(${Math.ceil(this.columnLength / 4)})` : T === "TINY" ? this.columnLength === 3 && N || this.columnLength === 4 && !N ? T = "TINYINT" : T = `TINYINT(${this.columnLength})` : T === "LONGLONG" ? this.columnLength === 20 ? T = "BIGINT" : T = `BIGINT(${this.columnLength})` : T === "SHORT" ? N && this.columnLength === 5 || !N && this.columnLength === 6 ? T = "SMALLINT" : T = `SMALLINT(${this.columnLength})` : T === "LONG" ? N && this.columnLength === 10 || !N && this.columnLength === 11 ? T = "INT" : T = `INT(${this.columnLength})` : T === "INT24" ? N && this.columnLength === 8 || !N && this.columnLength === 9 ? T = "MEDIUMINT" : T = `MEDIUMINT(${this.columnLength})` : T === "DOUBLE" ? this.columnLength === 22 && this.decimals === 31 ? T = "DOUBLE" : T = `DOUBLE(${this.columnLength},${this.decimals})` : T === "FLOAT" ? this.columnLength === 12 && this.decimals === 31 ? T = "FLOAT" : T = `FLOAT(${this.columnLength},${this.decimals})` : T === "NEWDECIMAL" ? this.columnLength === 11 && this.decimals === 0 ? T = "DECIMAL" : this.decimals === 0 ? N ? T = `DECIMAL(${this.columnLength})` : T = `DECIMAL(${this.columnLength - 1})` : T = `DECIMAL(${this.columnLength - 2},${this.decimals})` : T = `${t[this.columnType]}(${this.columnLength})`, N && (T += " UNSIGNED"), `\`${this.name}\` ${[T, ...i].join(" ")}`;
  }
  static toPacket(_, n) {
    let e = 17;
    GA.forEach((i) => {
      e += wA.lengthCodedStringLength(
        _[i],
        yn[_.characterSet]
      );
    });
    const A = Buffer.allocUnsafe(e), t = new wA(n, A, 0, e);
    function R(i) {
      t.writeLengthCodedString(
        _[i],
        yn[_.characterSet]
      );
    }
    return t.offset = 4, GA.forEach(R), t.writeInt8(12), t.writeInt16(_.characterSet), t.writeInt32(_.columnLength), t.writeInt8(_.columnType), t.writeInt16(_.flags), t.writeInt8(_.decimals), t.writeInt16(0), t;
  }
  // node-mysql compatibility: alias "db" to "schema"
  get db() {
    return this.schema;
  }
}
const Q_ = function(E) {
  Object.defineProperty(GR.prototype, E, {
    get: function() {
      const _ = this[`_${E}Start`], n = _ + this[`_${E}Length`], e = wR.decode(
        this._buf,
        this.encoding === "binary" ? this._clientEncoding : this.encoding,
        _,
        n
      );
      return Object.defineProperty(this, E, {
        value: e,
        writable: !1,
        configurable: !1,
        enumerable: !1
      }), e;
    }
  });
};
Q_("catalog");
Q_("schema");
Q_("table");
Q_("orgTable");
Q_("orgName");
var bT = GR, mT = {
  NO_CURSOR: 0
};
const YT = mT, yT = hE, K = dE(), FE = Z, WT = SE();
function HT(E) {
  return Array.isArray(E) || E.constructor === Object || typeof E.toJSON == "function" && !Buffer.isBuffer(E);
}
function vT(E, _, n) {
  let e = K.VAR_STRING, A, t = function(R) {
    return FE.prototype.writeLengthCodedString.call(this, R, _);
  };
  if (E !== null)
    switch (typeof E) {
      case "undefined":
        throw new TypeError("Bind parameters must not contain undefined");
      case "number":
        e = K.DOUBLE, A = 8, t = FE.prototype.writeDouble;
        break;
      case "boolean":
        E = E | 0, e = K.TINY, A = 1, t = FE.prototype.writeInt8;
        break;
      case "object":
        Object.prototype.toString.call(E) === "[object Date]" ? (e = K.DATETIME, A = 12, t = function(R) {
          return FE.prototype.writeDate.call(this, R, n);
        }) : HT(E) ? (E = JSON.stringify(E), e = K.JSON) : Buffer.isBuffer(E) && (A = FE.lengthCodedNumberLength(E.length) + E.length, t = FE.prototype.writeLengthCodedBuffer);
        break;
      default:
        E = E.toString();
    }
  else
    E = "", e = K.NULL;
  return A || (A = FE.lengthCodedStringLength(E, _)), { value: E, type: e, length: A, writer: t };
}
let XT = class {
  constructor(_, n, e, A) {
    this.id = _, this.parameters = n, this.encoding = WT[e], this.timezone = A;
  }
  static fromPacket(_, n) {
    const e = _.readInt32(), A = _.readInt8(), t = _.readInt32();
    let R = _.offset;
    for (; R < _.end - 1 && !((_.buffer[R + 1] === K.VAR_STRING || _.buffer[R + 1] === K.NULL || _.buffer[R + 1] === K.DOUBLE || _.buffer[R + 1] === K.TINY || _.buffer[R + 1] === K.DATETIME || _.buffer[R + 1] === K.JSON) && _.buffer[R] === 1 && _.buffer[R + 2] === 0); )
      _.readInt8(), R++;
    const i = [];
    for (let N = _.offset + 1; N < _.end - 1; N++)
      (_.buffer[N] === K.VAR_STRING || _.buffer[N] === K.NULL || _.buffer[N] === K.DOUBLE || _.buffer[N] === K.TINY || _.buffer[N] === K.DATETIME || _.buffer[N] === K.JSON) && _.buffer[N + 1] === 0 && (i.push(_.buffer[N]), _.skip(2));
    _.skip(1);
    const I = [];
    for (let N = 0; N < i.length; N++)
      i[N] === K.VAR_STRING ? I.push(_.readLengthCodedString(n)) : i[N] === K.DOUBLE ? I.push(_.readDouble()) : i[N] === K.TINY ? I.push(_.readInt8()) : i[N] === K.DATETIME ? I.push(_.readDateTime()) : i[N] === K.JSON && I.push(JSON.parse(_.readLengthCodedString(n))), i[N] === K.NULL && I.push(null);
    return { stmtId: e, flags: A, iterationCount: t, values: I };
  }
  toPacket() {
    let _ = 14, n;
    this.parameters && this.parameters.length > 0 && (_ += Math.floor((this.parameters.length + 7) / 8), _ += 1, _ += 2 * this.parameters.length, n = this.parameters.map(
      (t) => vT(t, this.encoding, this.timezone)
    ), _ += n.reduce(
      (t, R) => t + R.length,
      0
    ));
    const e = Buffer.allocUnsafe(_), A = new FE(0, e, 0, _);
    if (A.offset = 4, A.writeInt8(yT.STMT_EXECUTE), A.writeInt32(this.id), A.writeInt8(YT.NO_CURSOR), A.writeInt32(1), n) {
      let t = 0, R = 1;
      n.forEach((i) => {
        i.type === K.NULL && (t += R), R *= 2, R === 256 && (A.writeInt8(t), t = 0, R = 1);
      }), R !== 1 && A.writeInt8(t), A.writeInt8(1), n.forEach((i) => {
        A.writeInt8(i.type), A.writeInt8(0);
      }), n.forEach((i) => {
        i.type !== K.NULL && i.writer.call(A, i.value);
      });
    }
    return A;
  }
};
var KT = XT;
const kT = Z, Wn = V;
class qe {
  constructor(_) {
    this.protocolVersion = _.protocolVersion, this.serverVersion = _.serverVersion, this.capabilityFlags = _.capabilityFlags, this.connectionId = _.connectionId, this.authPluginData1 = _.authPluginData1, this.authPluginData2 = _.authPluginData2, this.characterSet = _.characterSet, this.statusFlags = _.statusFlags, this.authPluginName = _.authPluginName;
  }
  setScrambleData(_) {
    U_.randomBytes(20, (n, e) => {
      if (n) {
        _(n);
        return;
      }
      this.authPluginData1 = e.slice(0, 8), this.authPluginData2 = e.slice(8, 20), _();
    });
  }
  toPacket(_) {
    const n = 68 + Buffer.byteLength(this.serverVersion, "utf8"), e = Buffer.alloc(n + 4, 0), A = new kT(_, e, 0, n + 4);
    A.offset = 4, A.writeInt8(this.protocolVersion), A.writeString(this.serverVersion, "cesu8"), A.writeInt8(0), A.writeInt32(this.connectionId), A.writeBuffer(this.authPluginData1), A.writeInt8(0);
    const t = Buffer.allocUnsafe(4);
    return t.writeUInt32LE(this.capabilityFlags, 0), A.writeBuffer(t.slice(0, 2)), A.writeInt8(this.characterSet), A.writeInt16(this.statusFlags), A.writeBuffer(t.slice(2, 4)), A.writeInt8(21), A.skip(10), A.writeBuffer(this.authPluginData2), A.writeInt8(0), A.writeString("mysql_native_password", "latin1"), A.writeInt8(0), A;
  }
  static fromPacket(_) {
    const n = {};
    n.protocolVersion = _.readInt8(), n.serverVersion = _.readNullTerminatedString("cesu8"), n.connectionId = _.readInt32(), n.authPluginData1 = _.readBuffer(8), _.skip(1);
    const e = Buffer.allocUnsafe(4);
    if (e[0] = _.readInt8(), e[1] = _.readInt8(), _.haveMoreData() ? (n.characterSet = _.readInt8(), n.statusFlags = _.readInt16(), e[2] = _.readInt8(), e[3] = _.readInt8(), n.capabilityFlags = e.readUInt32LE(0), n.capabilityFlags & Wn.PLUGIN_AUTH ? n.authPluginDataLength = _.readInt8() : (n.authPluginDataLength = 0, _.skip(1)), _.skip(10)) : n.capabilityFlags = e.readUInt16LE(0), n.capabilityFlags & Wn.SECURE_CONNECTION) {
      const t = n.authPluginDataLength;
      if (t === 0)
        n.authPluginDataLength = 20, n.authPluginData2 = _.readBuffer(12), _.skip(1);
      else {
        const R = Math.max(13, t - 8);
        n.authPluginData2 = _.readBuffer(R);
      }
    }
    return n.capabilityFlags & Wn.PLUGIN_AUTH && (n.authPluginName = _.readNullTerminatedString("ascii")), new qe(n);
  }
}
var jT = qe;
const FA = V, PA = SE(), k_ = Z, QA = qE;
class zT {
  constructor(_) {
    this.user = _.user || "", this.database = _.database || "", this.password = _.password || "", this.passwordSha1 = _.passwordSha1, this.authPluginData1 = _.authPluginData1, this.authPluginData2 = _.authPluginData2, this.compress = _.compress, this.clientFlags = _.flags;
    let n;
    this.passwordSha1 ? n = QA.calculateTokenFromPasswordSha(
      this.passwordSha1,
      this.authPluginData1,
      this.authPluginData2
    ) : n = QA.calculateToken(
      this.password,
      this.authPluginData1,
      this.authPluginData2
    ), this.authToken = n, this.charsetNumber = _.charsetNumber, this.encoding = PA[_.charsetNumber], this.connectAttributes = _.connectAttributes;
  }
  serializeResponse(_) {
    const n = (R) => this.clientFlags & FA[R], e = new k_(0, _, 0, _.length);
    e.offset = 4, e.writeInt32(this.clientFlags), e.writeInt32(0), e.writeInt8(this.charsetNumber), e.skip(23);
    const A = this.encoding;
    e.writeNullTerminatedString(this.user, A);
    let t;
    if (n("PLUGIN_AUTH_LENENC_CLIENT_DATA") ? (e.writeLengthCodedNumber(this.authToken.length), e.writeBuffer(this.authToken)) : n("SECURE_CONNECTION") ? (e.writeInt8(this.authToken.length), e.writeBuffer(this.authToken)) : (e.writeBuffer(this.authToken), e.writeInt8(0)), n("CONNECT_WITH_DB") && e.writeNullTerminatedString(this.database, A), n("PLUGIN_AUTH") && e.writeNullTerminatedString("mysql_native_password", "latin1"), n("CONNECT_ATTRS")) {
      const R = this.connectAttributes || {}, i = Object.keys(R);
      let I = 0;
      for (t = 0; t < i.length; ++t)
        I += k_.lengthCodedStringLength(i[t], A), I += k_.lengthCodedStringLength(
          R[i[t]],
          A
        );
      for (e.writeLengthCodedNumber(I), t = 0; t < i.length; ++t)
        e.writeLengthCodedString(i[t], A), e.writeLengthCodedString(
          R[i[t]],
          A
        );
    }
    return e;
  }
  toPacket() {
    if (typeof this.user != "string")
      throw new Error('"user" connection config property must be a string');
    if (typeof this.database != "string")
      throw new Error('"database" connection config property must be a string');
    const _ = this.serializeResponse(k_.MockBuffer());
    return this.serializeResponse(Buffer.alloc(_.offset));
  }
  static fromPacket(_) {
    const n = {};
    n.clientFlags = _.readInt32();
    function e(R) {
      return n.clientFlags & FA[R];
    }
    n.maxPacketSize = _.readInt32(), n.charsetNumber = _.readInt8();
    const A = PA[n.charsetNumber];
    n.encoding = A, _.skip(23), n.user = _.readNullTerminatedString(A);
    let t;
    if (e("PLUGIN_AUTH_LENENC_CLIENT_DATA") ? (t = _.readLengthCodedNumber(A), n.authToken = _.readBuffer(t)) : e("SECURE_CONNECTION") ? (t = _.readInt8(), n.authToken = _.readBuffer(t)) : n.authToken = _.readNullTerminatedString(A), e("CONNECT_WITH_DB") && (n.database = _.readNullTerminatedString(A)), e("PLUGIN_AUTH") && (n.authPluginName = _.readNullTerminatedString(A)), e("CONNECT_ATTRS")) {
      const R = _.readLengthCodedNumber(A), i = _.offset + R, I = {};
      for (; _.offset < i; )
        I[_.readLengthCodedString(A)] = _.readLengthCodedString(A);
      n.connectAttributes = I;
    }
    return n;
  }
}
var JT = zT;
const ZT = Z, qT = hE, pT = O_, xT = SE();
class $T {
  constructor(_, n) {
    this.query = _, this.charsetNumber = n, this.encoding = xT[n];
  }
  toPacket() {
    const _ = pT.encode(this.query, this.encoding), n = 5 + _.length, e = Buffer.allocUnsafe(n), A = new ZT(0, e, 0, n);
    return A.offset = 4, A.writeInt8(qT.STMT_PREPARE), A.writeBuffer(_), A;
  }
}
var Ea = $T;
class _a {
  constructor(_) {
    _.skip(1), this.id = _.readInt32(), this.fieldCount = _.readInt16(), this.parameterCount = _.readInt16(), _.skip(1), this.warningCount = _.readInt16();
  }
}
var na = _a;
const ea = Z, Aa = hE, ta = O_, Ra = SE();
let ia = class {
  constructor(_, n) {
    this.query = _, this.charsetNumber = n, this.encoding = Ra[n];
  }
  toPacket() {
    const _ = ta.encode(this.query, this.encoding), n = 5 + _.length, e = Buffer.allocUnsafe(n), A = new ea(0, e, 0, n);
    return A.offset = 4, A.writeInt8(Aa.QUERY), A.writeBuffer(_), A;
  }
};
var Ia = ia;
const Na = Z, Ta = hE;
let aa = class {
  constructor(_) {
    this.serverId = _.serverId || 0, this.slaveHostname = _.slaveHostname || "", this.slaveUser = _.slaveUser || "", this.slavePassword = _.slavePassword || "", this.slavePort = _.slavePort || 0, this.replicationRank = _.replicationRank || 0, this.masterId = _.masterId || 0;
  }
  toPacket() {
    const _ = 15 + // TODO: should be ascii?
    Buffer.byteLength(this.slaveHostname, "utf8") + Buffer.byteLength(this.slaveUser, "utf8") + Buffer.byteLength(this.slavePassword, "utf8") + 3 + 4, n = Buffer.allocUnsafe(_), e = new Na(0, n, 0, _);
    return e.offset = 4, e.writeInt8(Ta.REGISTER_SLAVE), e.writeInt32(this.serverId), e.writeInt8(Buffer.byteLength(this.slaveHostname, "utf8")), e.writeString(this.slaveHostname), e.writeInt8(Buffer.byteLength(this.slaveUser, "utf8")), e.writeString(this.slaveUser), e.writeInt8(Buffer.byteLength(this.slavePassword, "utf8")), e.writeString(this.slavePassword), e.writeInt16(this.slavePort), e.writeInt32(this.replicationRank), e.writeInt32(this.masterId), e;
  }
};
var Oa = aa, iE = {};
iE.SERVER_STATUS_IN_TRANS = 1;
iE.SERVER_STATUS_AUTOCOMMIT = 2;
iE.SERVER_MORE_RESULTS_EXISTS = 8;
iE.SERVER_QUERY_NO_GOOD_INDEX_USED = 16;
iE.SERVER_QUERY_NO_INDEX_USED = 32;
iE.SERVER_STATUS_CURSOR_EXISTS = 64;
iE.SERVER_STATUS_LAST_ROW_SENT = 128;
iE.SERVER_STATUS_DB_DROPPED = 256;
iE.SERVER_STATUS_NO_BACKSLASH_ESCAPES = 512;
iE.SERVER_STATUS_METADATA_CHANGED = 1024;
iE.SERVER_QUERY_WAS_SLOW = 2048;
iE.SERVER_PS_OUT_PARAMS = 4096;
iE.SERVER_STATUS_IN_TRANS_READONLY = 8192;
iE.SERVER_SESSION_STATE_CHANGED = 16384;
var ua = {
  big5: 1,
  latin2: 2,
  dec8: 3,
  cp850: 4,
  latin1: 5,
  hp8: 6,
  koi8r: 7,
  swe7: 10,
  ascii: 11,
  eucjp: 12,
  sjis: 13,
  cp1251: 14,
  hebrew: 16,
  tis620: 18,
  euckr: 19,
  latin7: 20,
  koi8u: 22,
  gb2312: 24,
  greek: 25,
  cp1250: 26,
  gbk: 28,
  cp1257: 29,
  latin5: 30,
  armscii8: 32,
  cesu8: 33,
  ucs2: 35,
  cp866: 36,
  keybcs2: 37,
  macintosh: 38,
  macroman: 39,
  cp852: 40,
  utf8: 45,
  utf8mb4: 45,
  utf16: 54,
  utf16le: 56,
  cp1256: 57,
  utf32: 60,
  binary: 63,
  geostd8: 92,
  cp932: 95,
  eucjpms: 97,
  gb18030: 248,
  utf8mb3: 192
}, FR = {};
(function(E) {
  E.SYSTEM_VARIABLES = 0, E.SCHEMA = 1, E.STATE_CHANGE = 2, E.STATE_GTIDS = 3, E.TRANSACTION_CHARACTERISTICS = 4, E.TRANSACTION_STATE = 5, E.FIRST_KEY = E.SYSTEM_VARIABLES, E.LAST_KEY = E.TRANSACTION_STATE;
})(FR);
const Hn = Z, ca = V, Ca = iE, ra = ua, j_ = FR;
class Da {
  constructor(_, n) {
    const e = n.config.bigNumberStrings, A = n.serverEncoding, t = n._handshakePacket.capabilityFlags, R = function(N) {
      return t & ca[N];
    };
    if (_.buffer[_.offset] !== 0) {
      this.fieldCount = _.readLengthCodedNumber(), this.fieldCount === null && (this.infileName = _.readString(void 0, A));
      return;
    }
    this.fieldCount = _.readInt8(), this.affectedRows = _.readLengthCodedNumber(e), this.insertId = _.readLengthCodedNumberSigned(e), this.info = "", R("PROTOCOL_41") ? (this.serverStatus = _.readInt16(), this.warningStatus = _.readInt16()) : R("TRANSACTIONS") && (this.serverStatus = _.readInt16());
    let i = null;
    if (R("SESSION_TRACK") && _.offset < _.end) {
      if (this.info = _.readLengthCodedString(A), this.serverStatus && Ca.SERVER_SESSION_STATE_CHANGED) {
        let N = _.offset < _.end ? _.readLengthCodedNumber() : 0;
        const T = _.offset + N;
        let a, u, C;
        for (N > 0 && (i = {
          systemVariables: {},
          schema: null,
          gtids: [],
          trackStateChange: null
        }); _.offset < T; ) {
          if (a = _.readInt8(), N = _.readLengthCodedNumber(), C = _.offset + N, a === j_.SYSTEM_VARIABLES) {
            u = _.readLengthCodedString(A);
            const r = _.readLengthCodedString(A);
            if (i.systemVariables[u] = r, u === "character_set_client") {
              const D = ra[r];
              typeof D < "u" && (n.config.charsetNumber = D);
            }
          } else if (a === j_.SCHEMA)
            u = _.readLengthCodedString(A), i.schema = u;
          else if (a === j_.STATE_CHANGE)
            i.trackStateChange = _.readLengthCodedString(A);
          else if (a === j_.STATE_GTIDS) {
            _.readLengthCodedString(A);
            const r = _.readLengthCodedString(A);
            i.gtids = r.split(",");
          }
          _.offset = C;
        }
      }
    } else
      this.info = _.readString(void 0, A);
    i && (this.stateChanges = i);
    const I = this.info.match(/\schanged:\s*(\d+)/i);
    I !== null ? this.changedRows = parseInt(I[1], 10) : this.changedRows = 0;
  }
  // TODO: should be consistent instance member, but it's just easier here to have just function
  static toPacket(_, n) {
    let e = 4 + Hn.lengthCodedNumberLength(_);
    typeof n < "u" && (e += Hn.lengthCodedNumberLength(n));
    const A = Buffer.allocUnsafe(e), t = new Hn(0, A, 0, e);
    return t.offset = 4, t.writeLengthCodedNumber(_), typeof n < "u" && t.writeLengthCodedNumber(n), t;
  }
}
var sa = Da;
const la = V, ha = Z;
class Sa {
  constructor(_, n) {
    this.clientFlags = _ | la.SSL, this.charset = n;
  }
  toPacket() {
    const n = Buffer.allocUnsafe(36), e = new ha(0, n, 0, 36);
    return n.fill(0), e.offset = 4, e.writeInt32(this.clientFlags), e.writeInt32(0), e.writeInt8(this.charset), e;
  }
}
var Ba = Sa;
const VA = Z;
class pe {
  constructor(_) {
    this.columns = _ || [];
  }
  static fromPacket(_) {
    const n = [];
    for (; _.haveMoreData(); )
      n.push(_.readLengthCodedString());
    return new pe(n);
  }
  static toPacket(_, n) {
    let A = 0;
    _.forEach((i) => {
      if (i === null || typeof i > "u") {
        ++A;
        return;
      }
      A += VA.lengthCodedStringLength(i.toString(10), n);
    });
    const t = Buffer.allocUnsafe(A + 4), R = new VA(0, t, 0, A + 4);
    return R.offset = 4, _.forEach((i) => {
      if (i === null) {
        R.writeNull();
        return;
      }
      if (typeof i > "u") {
        R.writeInt8(0);
        return;
      }
      R.writeLengthCodedString(i.toString(10), n);
    }), R;
  }
}
var fa = pe;
(function(E, _) {
  const n = Nn;
  Object.entries({
    AuthNextFactor: CT,
    AuthSwitchRequest: DT,
    AuthSwitchRequestMoreData: lT,
    AuthSwitchResponse: ST,
    BinaryRow: BT,
    BinlogDump: LT,
    ChangeUser: GT,
    CloseStatement: VT,
    ColumnDefinition: bT,
    Execute: KT,
    Handshake: jT,
    HandshakeResponse: JT,
    PrepareStatement: Ea,
    PreparedStatementHeader: na,
    Query: Ia,
    RegisterSlave: Oa,
    ResultSetHeader: sa,
    SSLRequest: Ba,
    TextRow: fa
  }).forEach(([k, G]) => {
    if (E.exports[k] = G, n.env.NODE_DEBUG && G.prototype.toPacket) {
      const s = G.prototype.toPacket;
      G.prototype.toPacket = function() {
        const f = s.call(this);
        return f._name = k, f;
      };
    }
  });
  const U = Z;
  _.Packet = U;
  class F {
    static toPacket(G, s) {
      G = G || {};
      const f = G.affectedRows || 0, O = G.insertId || 0, M = G.serverStatus || 0, d = G.warningCount || 0, w = G.message || "";
      let o = 9 + U.lengthCodedNumberLength(f);
      o += U.lengthCodedNumberLength(O);
      const m = Buffer.allocUnsafe(o), b = new U(0, m, 0, o);
      return b.offset = 4, b.writeInt8(0), b.writeLengthCodedNumber(f), b.writeLengthCodedNumber(O), b.writeInt16(M), b.writeInt16(d), b.writeString(w, s), b._name = "OK", b;
    }
  }
  _.OK = F;
  class Q {
    static toPacket(G, s) {
      typeof G > "u" && (G = 0), typeof s > "u" && (s = 0);
      const f = new U(0, Buffer.allocUnsafe(9), 0, 9);
      return f.offset = 4, f.writeInt8(254), f.writeInt16(G), f.writeInt16(s), f._name = "EOF", f;
    }
  }
  _.EOF = Q;
  class y {
    static toPacket(G, s) {
      const f = 13 + Buffer.byteLength(G.message, "utf8"), O = new U(0, Buffer.allocUnsafe(f), 0, f);
      return O.offset = 4, O.writeInt8(255), O.writeInt16(G.code), O.writeString("#_____", s), O.writeString(G.message, s), O._name = "Error", O;
    }
    static fromPacket(G) {
      G.readInt8();
      const s = G.readInt16();
      G.readString(1, "ascii"), G.readString(5, "ascii");
      const f = G.readNullTerminatedString("utf8"), O = new y();
      return O.message = f, O.code = s, O;
    }
  }
  _.Error = y;
})(le, le.exports);
var rE = le.exports;
const Ma = JE.EventEmitter, ga = Ue;
let La = class extends Ma {
  constructor() {
    super(), this.next = null;
  }
  // slow. debug only
  stateName() {
    const _ = this.next;
    for (const n in this)
      if (this[n] === _ && n !== "next")
        return n;
    return "unknown name";
  }
  execute(_, n) {
    if (this.next || (this.next = this.start, n._resetSequenceId()), _ && _.isError()) {
      const e = _.asError(n.clientEncoding);
      return e.sql = this.sql || this.query, this.queryTimeout && (ga.clearTimeout(this.queryTimeout), this.queryTimeout = null), this.onResult ? (this.onResult(e), this.emit("end")) : (this.emit("error", e), this.emit("end")), !0;
    }
    return this.next = this.next(_, n), this.next ? !1 : (this.emit("end"), !0);
  }
};
var DE = La, vn, bA;
function da() {
  if (bA) return vn;
  bA = 1;
  const E = "sha256_password", _ = U_, { xorRotating: n } = qE, e = Mt, A = Buffer.from([1]), t = 0, R = 1, i = -1;
  function I(N, T, a) {
    const u = n(Buffer.from(`${N}\0`, "utf8"), T);
    return _.publicEncrypt(a, u);
  }
  return vn = (N = {}) => ({ connection: T }) => {
    let a = 0, u = null;
    const C = T.config.password, r = (D) => {
      const c = I(C, u, D);
      return a = i, c;
    };
    return (D) => {
      switch (a) {
        case t:
          return T.stream instanceof e.TLSSocket && T.stream.encrypted === !0 ? Buffer.from(`${C}\0`, "utf8") : (u = D.slice(0, 20), N.serverPublicKey ? r(N.serverPublicKey) : (a = R, A));
        case R:
          return N.onServerPublicKey && N.onServerPublicKey(D), r(D);
        case i:
          throw new Error(
            `Unexpected data in AuthMoreData packet received by ${E} plugin in STATE_FINAL state.`
          );
      }
      throw new Error(
        `Unexpected data in AuthMoreData packet received by ${E} plugin in state ${a}`
      );
    };
  }, vn;
}
var Xn, mA;
function Ua() {
  if (mA) return Xn;
  mA = 1;
  const E = "caching_sha2_password", _ = U_, { xor: n, xorRotating: e } = qE, A = Buffer.from([2]), t = Buffer.from([3]), R = Buffer.from([4]), i = 0, I = 1, N = 2, T = -1;
  function a(r) {
    const D = _.createHash("sha256");
    return D.update(r), D.digest();
  }
  function u(r, D) {
    if (!r)
      return Buffer.alloc(0);
    const c = a(Buffer.from(r)), l = a(c), S = a(Buffer.concat([l, D]));
    return n(c, S);
  }
  function C(r, D, c) {
    const l = e(Buffer.from(`${r}\0`, "utf8"), D);
    return _.publicEncrypt(
      {
        key: c,
        padding: _.constants.RSA_PKCS1_OAEP_PADDING
      },
      l
    );
  }
  return Xn = (r = {}) => ({ connection: D }) => {
    let c = 0, l = null;
    const S = D.config.password, B = (h) => {
      const g = C(S, l, h);
      return c = T, g;
    };
    return (h) => {
      switch (c) {
        case i:
          return l = h.slice(0, 20), c = I, u(S, l);
        case I:
          if (t.equals(h))
            return c = T, null;
          if (R.equals(h))
            return (typeof r.overrideIsSecure > "u" ? D.config.ssl || D.config.socketPath : r.overrideIsSecure) ? (c = T, Buffer.from(`${S}\0`, "utf8")) : r.serverPublicKey ? B(r.serverPublicKey) : (c = N, A);
          throw new Error(
            `Invalid AuthMoreData packet received by ${E} plugin in STATE_TOKEN_SENT state.`
          );
        case N:
          return r.onServerPublicKey && r.onServerPublicKey(h), B(h);
        case T:
          throw new Error(
            `Unexpected data in AuthMoreData packet received by ${E} plugin in STATE_FINAL state.`
          );
      }
      throw new Error(
        `Unexpected data in AuthMoreData packet received by ${E} plugin in state ${c}`
      );
    };
  }, Xn;
}
var Kn, YA;
function oa() {
  if (YA) return Kn;
  YA = 1;
  const E = qE;
  return Kn = (_) => ({ connection: n, command: e }) => {
    const A = e.password || _.password || n.config.password, t = e.passwordSha1 || _.passwordSha1 || n.config.passwordSha1;
    return (R) => {
      const i = R.slice(0, 8), I = R.slice(8, 20);
      let N;
      return t ? N = E.calculateTokenFromPasswordSha(
        t,
        i,
        I
      ) : N = E.calculateToken(
        A,
        i,
        I
      ), N;
    };
  }, Kn;
}
var kn, yA;
function wa() {
  if (yA) return kn;
  yA = 1;
  function E(n) {
    return Buffer.from(`${n}\0`);
  }
  return kn = (n) => function({ connection: A, command: t }) {
    const R = t.password || n.password || A.config.password;
    return function() {
      return E(R);
    };
  }, kn;
}
var jn, WA;
function Ga() {
  if (WA) return jn;
  WA = 1;
  const E = rE, _ = da(), n = Ua(), e = oa(), A = wa(), t = {
    sha256_password: _({}),
    caching_sha2_password: n({}),
    mysql_native_password: e({}),
    mysql_clear_password: A({})
  };
  function R() {
    console.warn(
      "WARNING! authSwitchHandler api is deprecated, please use new authPlugins api"
    );
  }
  function i(T, a) {
    T.code = "AUTH_SWITCH_PLUGIN_ERROR", T.fatal = !0, a.emit("error", T);
  }
  function I(T, a, u) {
    const { pluginName: C, pluginData: r } = E.AuthSwitchRequest.fromPacket(T);
    let D = a.config.authPlugins && a.config.authPlugins[C];
    if (a.config.authSwitchHandler && C !== "mysql_native_password") {
      const c = a.config.authSwitchHandler;
      R(), c({ pluginName: C, pluginData: r }, (l, S) => {
        if (l)
          return i(l, u);
        a.writePacket(new E.AuthSwitchResponse(S).toPacket());
      });
      return;
    }
    if (D || (D = t[C]), !D)
      throw new Error(
        `Server requests authentication using unknown plugin ${C}. See TODO: add plugins doco here on how to configure or author authentication plugins.`
      );
    a._authPlugin = D({ connection: a, command: u }), Promise.resolve(a._authPlugin(r)).then((c) => {
      c && a.writePacket(new E.AuthSwitchResponse(c).toPacket());
    }).catch((c) => {
      i(c, u);
    });
  }
  function N(T, a, u) {
    const { data: C } = E.AuthSwitchRequestMoreData.fromPacket(T);
    if (a.config.authSwitchHandler) {
      const r = a.config.authSwitchHandler;
      R(), r({ pluginData: C }, (D, c) => {
        if (D)
          return i(D, u);
        a.writePacket(new E.AuthSwitchResponse(c).toPacket());
      });
      return;
    }
    if (!a._authPlugin)
      throw new Error(
        "AuthPluginMoreData received but no auth plugin instance found"
      );
    Promise.resolve(a._authPlugin(C)).then((r) => {
      r && a.writePacket(new E.AuthSwitchResponse(r).toPacket());
    }).catch((r) => {
      i(r, u);
    });
  }
  return jn = {
    authSwitchRequest: I,
    authSwitchRequestMoreData: N
  }, jn;
}
var zn, HA;
function Fa() {
  if (HA) return zn;
  HA = 1;
  const E = T_, _ = oR;
  class n {
    constructor() {
      this._queue = [], this._running = !1;
    }
    push(i) {
      this._queue.push(i), this._running || (this._running = !0, process.nextTick(() => this._next()));
    }
    _next() {
      const i = this._queue.shift();
      if (!i) {
        this._running = !1;
        return;
      }
      i({
        done: () => process.nextTick(() => this._next())
      });
    }
  }
  function e(R) {
    const i = this, I = R.readInt24(), N = R.readBuffer();
    I !== 0 ? i.inflateQueue.push((T) => {
      E.inflate(N, (a, u) => {
        if (a) {
          i._handleNetworkError(a);
          return;
        }
        i._bumpCompressedSequenceId(R.numPackets), i._inflatedPacketsParser.execute(u), T.done();
      });
    }) : i.inflateQueue.push((T) => {
      i._bumpCompressedSequenceId(R.numPackets), i._inflatedPacketsParser.execute(N), T.done();
    });
  }
  function A(R) {
    let I;
    if (R.length > 16777210) {
      for (I = 0; I < R.length; I += 16777210)
        A.call(
          // eslint-disable-next-line no-invalid-this
          this,
          R.slice(I, I + 16777210)
        );
      return;
    }
    const N = this;
    let T = R.length;
    const a = Buffer.allocUnsafe(7);
    (function(u) {
      N.deflateQueue.push((C) => {
        E.deflate(R, (r, D) => {
          if (r) {
            N._handleFatalError(r);
            return;
          }
          let c = D.length;
          c < T ? (a.writeUInt8(c & 255, 0), a.writeUInt16LE(c >> 8, 1), a.writeUInt8(u, 3), a.writeUInt8(T & 255, 4), a.writeUInt16LE(T >> 8, 5), N.writeUncompressed(a), N.writeUncompressed(D)) : (c = T, T = 0, a.writeUInt8(c & 255, 0), a.writeUInt16LE(c >> 8, 1), a.writeUInt8(u, 3), a.writeUInt8(T & 255, 4), a.writeUInt16LE(T >> 8, 5), N.writeUncompressed(a), N.writeUncompressed(R)), C.done();
        });
      });
    })(N.compressedSequenceId), N._bumpCompressedSequenceId(1);
  }
  function t(R) {
    R._lastWrittenPacketId = 0, R._lastReceivedPacketId = 0, R._handleCompressedPacket = e, R._inflatedPacketsParser = new _((i) => {
      R.handlePacket(i);
    }, 4), R._inflatedPacketsParser._lastPacket = 0, R.packetParser = new _((i) => {
      R._handleCompressedPacket(i);
    }, 7), R.writeUncompressed = R.write, R.write = A, R.inflateQueue = new n(), R.deflateQueue = new n();
  }
  return zn = {
    enableCompression: t,
    Queue: n
  }, zn;
}
const Pa = DE, Jn = rE, n_ = V, Qa = SE(), vA = qE;
function XA(E) {
  const _ = [];
  for (const n in n_)
    E & n_[n] && _.push(n.replace(/_/g, " ").toLowerCase());
  return _;
}
let Va = class En extends Pa {
  constructor(_) {
    super(), this.handshake = null, this.clientFlags = _, this.authenticationFactor = 0;
  }
  start() {
    return En.prototype.handshakeInit;
  }
  sendSSLRequest(_) {
    const n = new Jn.SSLRequest(
      this.clientFlags,
      _.config.charsetNumber
    );
    _.writePacket(n.toPacket());
  }
  sendCredentials(_) {
    _.config.debug && console.log(
      "Sending handshake packet: flags:%d=(%s)",
      this.clientFlags,
      XA(this.clientFlags).join(", ")
    ), this.user = _.config.user, this.password = _.config.password, this.password1 = _.config.password, this.password2 = _.config.password2, this.password3 = _.config.password3, this.passwordSha1 = _.config.passwordSha1, this.database = _.config.database, this.authPluginName = this.handshake.authPluginName;
    const n = new Jn.HandshakeResponse({
      flags: this.clientFlags,
      user: this.user,
      database: this.database,
      password: this.password,
      passwordSha1: this.passwordSha1,
      charsetNumber: _.config.charsetNumber,
      authPluginData1: this.handshake.authPluginData1,
      authPluginData2: this.handshake.authPluginData2,
      compress: _.config.compress,
      connectAttributes: _.config.connectAttributes
    });
    _.writePacket(n.toPacket());
  }
  calculateNativePasswordAuthToken(_) {
    const n = _.slice(0, 8), e = _.slice(8, 20);
    let A;
    return this.passwordSha1 ? A = vA.calculateTokenFromPasswordSha(
      this.passwordSha1,
      n,
      e
    ) : A = vA.calculateToken(
      this.password,
      n,
      e
    ), A;
  }
  handshakeInit(_, n) {
    this.on("error", (t) => {
      n._fatalError = t, n._protocolError = t;
    }), this.handshake = Jn.Handshake.fromPacket(_), n.config.debug && console.log(
      "Server hello packet: capability flags:%d=(%s)",
      this.handshake.capabilityFlags,
      XA(this.handshake.capabilityFlags).join(", ")
    ), n.serverCapabilityFlags = this.handshake.capabilityFlags, n.serverEncoding = Qa[this.handshake.characterSet], n.connectionId = this.handshake.connectionId;
    const e = this.handshake.capabilityFlags & n_.SSL, A = this.handshake.capabilityFlags & n_.MULTI_FACTOR_AUTHENTICATION;
    if (this.clientFlags = this.clientFlags | A, n.config.compress = n.config.compress && this.handshake.capabilityFlags & n_.COMPRESS, this.clientFlags = this.clientFlags | n.config.compress, n.config.ssl) {
      if (!e) {
        const t = new Error("Server does not support secure connection");
        return t.code = "HANDSHAKE_NO_SSL_SUPPORT", t.fatal = !0, this.emit("error", t), !1;
      }
      this.clientFlags |= n_.SSL, this.sendSSLRequest(n), n.startTLS((t) => {
        if (t) {
          t.code = "HANDSHAKE_SSL_ERROR", t.fatal = !0, this.emit("error", t);
          return;
        }
        this.sendCredentials(n);
      });
    } else
      this.sendCredentials(n);
    return A && (this.authenticationFactor = 1), En.prototype.handshakeResult;
  }
  handshakeResult(_, n) {
    const e = _.peekByte();
    if (e === 254 || e === 1 || e === 2) {
      const A = Ga();
      try {
        return e === 1 ? A.authSwitchRequestMoreData(_, n, this) : (this.authenticationFactor !== 0 && (n.config.password = this[`password${this.authenticationFactor}`], this.authenticationFactor += 1), A.authSwitchRequest(_, n, this)), En.prototype.handshakeResult;
      } catch (t) {
        return t.code = "AUTH_SWITCH_PLUGIN_ERROR", t.fatal = !0, this.onResult ? this.onResult(t) : this.emit("error", t), null;
      }
    }
    if (e !== 0) {
      const A = new Error("Unexpected packet during handshake phase");
      return A.code = "HANDSHAKE_UNKNOWN_ERROR", A.fatal = !0, this.onResult ? this.onResult(A) : this.emit("error", A), null;
    }
    if (!n.authorized && (n.authorized = !0, n.config.compress)) {
      const A = Fa().enableCompression;
      A(n);
    }
    return this.onResult && this.onResult(null), null;
  }
};
var PR = Va;
const vE = hE, z_ = Dn, ba = DE, Zn = rE;
let ma = class _n extends ba {
  constructor(_) {
    super(), this.args = _;
  }
  start(_, n) {
    const e = new Zn.Handshake(this.args);
    return this.serverHello = e, e.setScrambleData((A) => {
      if (A) {
        n.emit("error", new Error("Error generating random bytes"));
        return;
      }
      n.writePacket(e.toPacket(0));
    }), _n.prototype.readClientReply;
  }
  readClientReply(_, n) {
    const e = Zn.HandshakeResponse.fromPacket(_);
    return n.clientHelloReply = e, this.args.authCallback ? this.args.authCallback(
      {
        user: e.user,
        database: e.database,
        address: n.stream.remoteAddress,
        authPluginData1: this.serverHello.authPluginData1,
        authPluginData2: this.serverHello.authPluginData2,
        authToken: e.authToken
      },
      (A, t) => {
        t ? (n.writeError({
          message: t.message || "",
          code: t.code || 1045
        }), n.close()) : n.writeOk();
      }
    ) : n.writeOk(), _n.prototype.dispatchCommands;
  }
  _isStatement(_, n) {
    return _.split(" ")[0].toUpperCase() === n;
  }
  dispatchCommands(_, n) {
    let e = !0;
    const A = n.clientHelloReply.encoding, t = _.readInt8();
    switch (t) {
      case vE.STMT_PREPARE:
        if (n.listeners("stmt_prepare").length) {
          const R = _.readString(void 0, A);
          n.emit("stmt_prepare", R);
        } else
          n.writeError({
            code: z_.HA_ERR_INTERNAL_ERROR,
            message: "No query handler for prepared statements."
          });
        break;
      case vE.STMT_EXECUTE:
        if (n.listeners("stmt_execute").length) {
          const { stmtId: R, flags: i, iterationCount: I, values: N } = Zn.Execute.fromPacket(_, A);
          n.emit(
            "stmt_execute",
            R,
            i,
            I,
            N
          );
        } else
          n.writeError({
            code: z_.HA_ERR_INTERNAL_ERROR,
            message: "No query handler for execute statements."
          });
        break;
      case vE.QUIT:
        n.listeners("quit").length ? n.emit("quit") : n.stream.end();
        break;
      case vE.INIT_DB:
        if (n.listeners("init_db").length) {
          const R = _.readString(void 0, A);
          n.emit("init_db", R);
        } else
          n.writeOk();
        break;
      case vE.QUERY:
        if (n.listeners("query").length) {
          const R = _.readString(void 0, A);
          this._isStatement(R, "PREPARE") || this._isStatement(R, "SET") ? n.emit("stmt_prepare", R) : this._isStatement(R, "EXECUTE") ? n.emit("stmt_execute", null, null, null, null, R) : n.emit("query", R);
        } else
          n.writeError({
            code: z_.HA_ERR_INTERNAL_ERROR,
            message: "No query handler"
          });
        break;
      case vE.FIELD_LIST:
        if (n.listeners("field_list").length) {
          const R = _.readNullTerminatedString(A), i = _.readString(void 0, A);
          n.emit("field_list", R, i);
        } else
          n.writeError({
            code: z_.ER_WARN_DEPRECATED_SYNTAX,
            message: "As of MySQL 5.7.11, COM_FIELD_LIST is deprecated and will be removed in a future version of MySQL."
          });
        break;
      case vE.PING:
        n.listeners("ping").length ? n.emit("ping") : n.writeOk();
        break;
      default:
        e = !1;
    }
    return n.listeners("packet").length ? n.emit("packet", _.clone(), e, t) : e || console.log("Unknown command:", t), _n.prototype.dispatchCommands;
  }
};
var Ya = ma, qn = {}, KA;
function u_() {
  return KA || (KA = 1, function(E) {
    E.BIG5_CHINESE_CI = 1, E.LATIN2_CZECH_CS = 2, E.DEC8_SWEDISH_CI = 3, E.CP850_GENERAL_CI = 4, E.LATIN1_GERMAN1_CI = 5, E.HP8_ENGLISH_CI = 6, E.KOI8R_GENERAL_CI = 7, E.LATIN1_SWEDISH_CI = 8, E.LATIN2_GENERAL_CI = 9, E.SWE7_SWEDISH_CI = 10, E.ASCII_GENERAL_CI = 11, E.UJIS_JAPANESE_CI = 12, E.SJIS_JAPANESE_CI = 13, E.CP1251_BULGARIAN_CI = 14, E.LATIN1_DANISH_CI = 15, E.HEBREW_GENERAL_CI = 16, E.TIS620_THAI_CI = 18, E.EUCKR_KOREAN_CI = 19, E.LATIN7_ESTONIAN_CS = 20, E.LATIN2_HUNGARIAN_CI = 21, E.KOI8U_GENERAL_CI = 22, E.CP1251_UKRAINIAN_CI = 23, E.GB2312_CHINESE_CI = 24, E.GREEK_GENERAL_CI = 25, E.CP1250_GENERAL_CI = 26, E.LATIN2_CROATIAN_CI = 27, E.GBK_CHINESE_CI = 28, E.CP1257_LITHUANIAN_CI = 29, E.LATIN5_TURKISH_CI = 30, E.LATIN1_GERMAN2_CI = 31, E.ARMSCII8_GENERAL_CI = 32, E.UTF8_GENERAL_CI = 33, E.CP1250_CZECH_CS = 34, E.UCS2_GENERAL_CI = 35, E.CP866_GENERAL_CI = 36, E.KEYBCS2_GENERAL_CI = 37, E.MACCE_GENERAL_CI = 38, E.MACROMAN_GENERAL_CI = 39, E.CP852_GENERAL_CI = 40, E.LATIN7_GENERAL_CI = 41, E.LATIN7_GENERAL_CS = 42, E.MACCE_BIN = 43, E.CP1250_CROATIAN_CI = 44, E.UTF8MB4_GENERAL_CI = 45, E.UTF8MB4_BIN = 46, E.LATIN1_BIN = 47, E.LATIN1_GENERAL_CI = 48, E.LATIN1_GENERAL_CS = 49, E.CP1251_BIN = 50, E.CP1251_GENERAL_CI = 51, E.CP1251_GENERAL_CS = 52, E.MACROMAN_BIN = 53, E.UTF16_GENERAL_CI = 54, E.UTF16_BIN = 55, E.UTF16LE_GENERAL_CI = 56, E.CP1256_GENERAL_CI = 57, E.CP1257_BIN = 58, E.CP1257_GENERAL_CI = 59, E.UTF32_GENERAL_CI = 60, E.UTF32_BIN = 61, E.UTF16LE_BIN = 62, E.BINARY = 63, E.ARMSCII8_BIN = 64, E.ASCII_BIN = 65, E.CP1250_BIN = 66, E.CP1256_BIN = 67, E.CP866_BIN = 68, E.DEC8_BIN = 69, E.GREEK_BIN = 70, E.HEBREW_BIN = 71, E.HP8_BIN = 72, E.KEYBCS2_BIN = 73, E.KOI8R_BIN = 74, E.KOI8U_BIN = 75, E.UTF8_TOLOWER_CI = 76, E.LATIN2_BIN = 77, E.LATIN5_BIN = 78, E.LATIN7_BIN = 79, E.CP850_BIN = 80, E.CP852_BIN = 81, E.SWE7_BIN = 82, E.UTF8_BIN = 83, E.BIG5_BIN = 84, E.EUCKR_BIN = 85, E.GB2312_BIN = 86, E.GBK_BIN = 87, E.SJIS_BIN = 88, E.TIS620_BIN = 89, E.UCS2_BIN = 90, E.UJIS_BIN = 91, E.GEOSTD8_GENERAL_CI = 92, E.GEOSTD8_BIN = 93, E.LATIN1_SPANISH_CI = 94, E.CP932_JAPANESE_CI = 95, E.CP932_BIN = 96, E.EUCJPMS_JAPANESE_CI = 97, E.EUCJPMS_BIN = 98, E.CP1250_POLISH_CI = 99, E.UTF16_UNICODE_CI = 101, E.UTF16_ICELANDIC_CI = 102, E.UTF16_LATVIAN_CI = 103, E.UTF16_ROMANIAN_CI = 104, E.UTF16_SLOVENIAN_CI = 105, E.UTF16_POLISH_CI = 106, E.UTF16_ESTONIAN_CI = 107, E.UTF16_SPANISH_CI = 108, E.UTF16_SWEDISH_CI = 109, E.UTF16_TURKISH_CI = 110, E.UTF16_CZECH_CI = 111, E.UTF16_DANISH_CI = 112, E.UTF16_LITHUANIAN_CI = 113, E.UTF16_SLOVAK_CI = 114, E.UTF16_SPANISH2_CI = 115, E.UTF16_ROMAN_CI = 116, E.UTF16_PERSIAN_CI = 117, E.UTF16_ESPERANTO_CI = 118, E.UTF16_HUNGARIAN_CI = 119, E.UTF16_SINHALA_CI = 120, E.UTF16_GERMAN2_CI = 121, E.UTF16_CROATIAN_CI = 122, E.UTF16_UNICODE_520_CI = 123, E.UTF16_VIETNAMESE_CI = 124, E.UCS2_UNICODE_CI = 128, E.UCS2_ICELANDIC_CI = 129, E.UCS2_LATVIAN_CI = 130, E.UCS2_ROMANIAN_CI = 131, E.UCS2_SLOVENIAN_CI = 132, E.UCS2_POLISH_CI = 133, E.UCS2_ESTONIAN_CI = 134, E.UCS2_SPANISH_CI = 135, E.UCS2_SWEDISH_CI = 136, E.UCS2_TURKISH_CI = 137, E.UCS2_CZECH_CI = 138, E.UCS2_DANISH_CI = 139, E.UCS2_LITHUANIAN_CI = 140, E.UCS2_SLOVAK_CI = 141, E.UCS2_SPANISH2_CI = 142, E.UCS2_ROMAN_CI = 143, E.UCS2_PERSIAN_CI = 144, E.UCS2_ESPERANTO_CI = 145, E.UCS2_HUNGARIAN_CI = 146, E.UCS2_SINHALA_CI = 147, E.UCS2_GERMAN2_CI = 148, E.UCS2_CROATIAN_CI = 149, E.UCS2_UNICODE_520_CI = 150, E.UCS2_VIETNAMESE_CI = 151, E.UCS2_GENERAL_MYSQL500_CI = 159, E.UTF32_UNICODE_CI = 160, E.UTF32_ICELANDIC_CI = 161, E.UTF32_LATVIAN_CI = 162, E.UTF32_ROMANIAN_CI = 163, E.UTF32_SLOVENIAN_CI = 164, E.UTF32_POLISH_CI = 165, E.UTF32_ESTONIAN_CI = 166, E.UTF32_SPANISH_CI = 167, E.UTF32_SWEDISH_CI = 168, E.UTF32_TURKISH_CI = 169, E.UTF32_CZECH_CI = 170, E.UTF32_DANISH_CI = 171, E.UTF32_LITHUANIAN_CI = 172, E.UTF32_SLOVAK_CI = 173, E.UTF32_SPANISH2_CI = 174, E.UTF32_ROMAN_CI = 175, E.UTF32_PERSIAN_CI = 176, E.UTF32_ESPERANTO_CI = 177, E.UTF32_HUNGARIAN_CI = 178, E.UTF32_SINHALA_CI = 179, E.UTF32_GERMAN2_CI = 180, E.UTF32_CROATIAN_CI = 181, E.UTF32_UNICODE_520_CI = 182, E.UTF32_VIETNAMESE_CI = 183, E.UTF8_UNICODE_CI = 192, E.UTF8_ICELANDIC_CI = 193, E.UTF8_LATVIAN_CI = 194, E.UTF8_ROMANIAN_CI = 195, E.UTF8_SLOVENIAN_CI = 196, E.UTF8_POLISH_CI = 197, E.UTF8_ESTONIAN_CI = 198, E.UTF8_SPANISH_CI = 199, E.UTF8_SWEDISH_CI = 200, E.UTF8_TURKISH_CI = 201, E.UTF8_CZECH_CI = 202, E.UTF8_DANISH_CI = 203, E.UTF8_LITHUANIAN_CI = 204, E.UTF8_SLOVAK_CI = 205, E.UTF8_SPANISH2_CI = 206, E.UTF8_ROMAN_CI = 207, E.UTF8_PERSIAN_CI = 208, E.UTF8_ESPERANTO_CI = 209, E.UTF8_HUNGARIAN_CI = 210, E.UTF8_SINHALA_CI = 211, E.UTF8_GERMAN2_CI = 212, E.UTF8_CROATIAN_CI = 213, E.UTF8_UNICODE_520_CI = 214, E.UTF8_VIETNAMESE_CI = 215, E.UTF8_GENERAL_MYSQL500_CI = 223, E.UTF8MB4_UNICODE_CI = 224, E.UTF8MB4_ICELANDIC_CI = 225, E.UTF8MB4_LATVIAN_CI = 226, E.UTF8MB4_ROMANIAN_CI = 227, E.UTF8MB4_SLOVENIAN_CI = 228, E.UTF8MB4_POLISH_CI = 229, E.UTF8MB4_ESTONIAN_CI = 230, E.UTF8MB4_SPANISH_CI = 231, E.UTF8MB4_SWEDISH_CI = 232, E.UTF8MB4_TURKISH_CI = 233, E.UTF8MB4_CZECH_CI = 234, E.UTF8MB4_DANISH_CI = 235, E.UTF8MB4_LITHUANIAN_CI = 236, E.UTF8MB4_SLOVAK_CI = 237, E.UTF8MB4_SPANISH2_CI = 238, E.UTF8MB4_ROMAN_CI = 239, E.UTF8MB4_PERSIAN_CI = 240, E.UTF8MB4_ESPERANTO_CI = 241, E.UTF8MB4_HUNGARIAN_CI = 242, E.UTF8MB4_SINHALA_CI = 243, E.UTF8MB4_GERMAN2_CI = 244, E.UTF8MB4_CROATIAN_CI = 245, E.UTF8MB4_UNICODE_520_CI = 246, E.UTF8MB4_VIETNAMESE_CI = 247, E.GB18030_CHINESE_CI = 248, E.GB18030_BIN = 249, E.GB18030_UNICODE_520_CI = 250, E.UTF8_GENERAL50_CI = 253, E.UTF8MB4_0900_AI_CI = 255, E.UTF8MB4_DE_PB_0900_AI_CI = 256, E.UTF8MB4_IS_0900_AI_CI = 257, E.UTF8MB4_LV_0900_AI_CI = 258, E.UTF8MB4_RO_0900_AI_CI = 259, E.UTF8MB4_SL_0900_AI_CI = 260, E.UTF8MB4_PL_0900_AI_CI = 261, E.UTF8MB4_ET_0900_AI_CI = 262, E.UTF8MB4_ES_0900_AI_CI = 263, E.UTF8MB4_SV_0900_AI_CI = 264, E.UTF8MB4_TR_0900_AI_CI = 265, E.UTF8MB4_CS_0900_AI_CI = 266, E.UTF8MB4_DA_0900_AI_CI = 267, E.UTF8MB4_LT_0900_AI_CI = 268, E.UTF8MB4_SK_0900_AI_CI = 269, E.UTF8MB4_ES_TRAD_0900_AI_CI = 270, E.UTF8MB4_LA_0900_AI_CI = 271, E.UTF8MB4_EO_0900_AI_CI = 273, E.UTF8MB4_HU_0900_AI_CI = 274, E.UTF8MB4_HR_0900_AI_CI = 275, E.UTF8MB4_VI_0900_AI_CI = 277, E.UTF8MB4_0900_AS_CS = 278, E.UTF8MB4_DE_PB_0900_AS_CS = 279, E.UTF8MB4_IS_0900_AS_CS = 280, E.UTF8MB4_LV_0900_AS_CS = 281, E.UTF8MB4_RO_0900_AS_CS = 282, E.UTF8MB4_SL_0900_AS_CS = 283, E.UTF8MB4_PL_0900_AS_CS = 284, E.UTF8MB4_ET_0900_AS_CS = 285, E.UTF8MB4_ES_0900_AS_CS = 286, E.UTF8MB4_SV_0900_AS_CS = 287, E.UTF8MB4_TR_0900_AS_CS = 288, E.UTF8MB4_CS_0900_AS_CS = 289, E.UTF8MB4_DA_0900_AS_CS = 290, E.UTF8MB4_LT_0900_AS_CS = 291, E.UTF8MB4_SK_0900_AS_CS = 292, E.UTF8MB4_ES_TRAD_0900_AS_CS = 293, E.UTF8MB4_LA_0900_AS_CS = 294, E.UTF8MB4_EO_0900_AS_CS = 296, E.UTF8MB4_HU_0900_AS_CS = 297, E.UTF8MB4_HR_0900_AS_CS = 298, E.UTF8MB4_VI_0900_AS_CS = 300, E.UTF8MB4_JA_0900_AS_CS = 303, E.UTF8MB4_JA_0900_AS_CS_KS = 304, E.UTF8MB4_0900_AS_CI = 305, E.UTF8MB4_RU_0900_AI_CI = 306, E.UTF8MB4_RU_0900_AS_CS = 307, E.UTF8MB4_ZH_0900_AS_CS = 308, E.UTF8MB4_0900_BIN = 309, E.BIG5 = E.BIG5_CHINESE_CI, E.DEC8 = E.DEC8_SWEDISH_CI, E.CP850 = E.CP850_GENERAL_CI, E.HP8 = E.HP8_ENGLISH_CI, E.KOI8R = E.KOI8R_GENERAL_CI, E.LATIN1 = E.LATIN1_SWEDISH_CI, E.LATIN2 = E.LATIN2_GENERAL_CI, E.SWE7 = E.SWE7_SWEDISH_CI, E.ASCII = E.ASCII_GENERAL_CI, E.UJIS = E.UJIS_JAPANESE_CI, E.SJIS = E.SJIS_JAPANESE_CI, E.HEBREW = E.HEBREW_GENERAL_CI, E.TIS620 = E.TIS620_THAI_CI, E.EUCKR = E.EUCKR_KOREAN_CI, E.KOI8U = E.KOI8U_GENERAL_CI, E.GB2312 = E.GB2312_CHINESE_CI, E.GREEK = E.GREEK_GENERAL_CI, E.CP1250 = E.CP1250_GENERAL_CI, E.GBK = E.GBK_CHINESE_CI, E.LATIN5 = E.LATIN5_TURKISH_CI, E.ARMSCII8 = E.ARMSCII8_GENERAL_CI, E.UTF8 = E.UTF8_GENERAL_CI, E.UCS2 = E.UCS2_GENERAL_CI, E.CP866 = E.CP866_GENERAL_CI, E.KEYBCS2 = E.KEYBCS2_GENERAL_CI, E.MACCE = E.MACCE_GENERAL_CI, E.MACROMAN = E.MACROMAN_GENERAL_CI, E.CP852 = E.CP852_GENERAL_CI, E.LATIN7 = E.LATIN7_GENERAL_CI, E.UTF8MB4 = E.UTF8MB4_GENERAL_CI, E.CP1251 = E.CP1251_GENERAL_CI, E.UTF16 = E.UTF16_GENERAL_CI, E.UTF16LE = E.UTF16LE_GENERAL_CI, E.CP1256 = E.CP1256_GENERAL_CI, E.CP1257 = E.CP1257_GENERAL_CI, E.UTF32 = E.UTF32_GENERAL_CI, E.CP932 = E.CP932_JAPANESE_CI, E.EUCJPMS = E.EUCJPMS_JAPANESE_CI, E.GB18030 = E.GB18030_CHINESE_CI, E.GEOSTD8 = E.GEOSTD8_GENERAL_CI;
  }(qn)), qn;
}
function ya(E) {
  throw new Error('Could not dynamically require "' + E + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var UE = {};
function QR(E) {
  return JSON.stringify({
    [E]: 1
  }).slice(1, -3);
}
UE.srcEscape = QR;
let he, kA = !1;
try {
  he = ya("cardinal").highlight;
} catch {
  he = (E) => (kA || (console.log("For nicer debug output consider install cardinal@^2.0.0"), kA = !0), E);
}
function Wa(E, _) {
  console.log(`

${E}:
`), console.log(`${he(_)}
`);
}
UE.printDebugWithCode = Wa;
function Ha(E, _, n) {
  return Array.isArray(_) ? _.some((e) => E === n[e]) : !!_;
}
UE.typeMatch = Ha;
const VR = /* @__PURE__ */ new Set([
  "__defineGetter__",
  "__defineSetter__",
  "__lookupGetter__",
  "__lookupSetter__",
  "__proto__"
]);
UE.privateObjectProps = VR;
const va = (E, _ = !0) => {
  if (VR.has(E))
    throw new Error(
      `The field name (${E}) can't be the same as an object's private property.`
    );
  return _ ? QR(E) : E;
};
UE.fieldEscape = va;
function Xa(E) {
  return /^[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*$/.test(E);
}
var Ka = Xa, jA = zE, bR = Ka, zA = /[\{\[]/, JA = /[\}\]]/, ZA = [
  "do",
  "if",
  "in",
  "for",
  "let",
  "new",
  "try",
  "var",
  "case",
  "else",
  "enum",
  "eval",
  "null",
  "this",
  "true",
  "void",
  "with",
  "await",
  "break",
  "catch",
  "class",
  "const",
  "false",
  "super",
  "throw",
  "while",
  "yield",
  "delete",
  "export",
  "import",
  "public",
  "return",
  "static",
  "switch",
  "typeof",
  "default",
  "extends",
  "finally",
  "package",
  "private",
  "continue",
  "debugger",
  "function",
  "arguments",
  "interface",
  "protected",
  "implements",
  "instanceof",
  "NaN",
  "undefined"
], mR = {};
for (var pn = 0; pn < ZA.length; pn++)
  mR[ZA[pn]] = !0;
var ka = function(E) {
  return bR(E) && !mR.hasOwnProperty(E);
}, YR = {
  s: function(E) {
    return "" + E;
  },
  d: function(E) {
    return "" + Number(E);
  },
  o: function(E) {
    return JSON.stringify(E);
  }
}, yR = function() {
  var E = [], _ = 0, n = {}, e = function(R) {
    for (var i = ""; i.length < _ * 2; ) i += "  ";
    E.push(i + R);
  }, A = function(R) {
    if (JA.test(R.trim()[0]) && zA.test(R[R.length - 1])) {
      _--, e(R), _++;
      return;
    }
    if (zA.test(R[R.length - 1])) {
      e(R), _++;
      return;
    }
    if (JA.test(R.trim()[0])) {
      _--, e(R);
      return;
    }
    e(R);
  }, t = function(R) {
    if (!R) return t;
    if (arguments.length === 1 && R.indexOf(`
`) > -1)
      for (var i = R.trim().split(`
`), I = 0; I < i.length; I++)
        A(i[I].trim());
    else
      A(jA.format.apply(jA, arguments));
    return t;
  };
  return t.scope = {}, t.formats = YR, t.sym = function(R) {
    return (!R || !ka(R)) && (R = "tmp"), n[R] || (n[R] = 0), R + (n[R]++ || "");
  }, t.property = function(R, i) {
    return arguments.length === 1 && (i = R, R = ""), i = i + "", bR(i) ? R ? R + "." + i : i : R ? R + "[" + JSON.stringify(i) + "]" : JSON.stringify(i);
  }, t.toString = function() {
    return E.join(`
`);
  }, t.toFunction = function(R) {
    R || (R = {});
    var i = "return (" + t.toString() + ")";
    Object.keys(t.scope).forEach(function(T) {
      R[T] || (R[T] = t.scope[T]);
    });
    var I = Object.keys(R).map(function(T) {
      return T;
    }), N = I.map(function(T) {
      return R[T];
    });
    return Function.apply(null, I.concat(i)).apply(null, N);
  }, arguments.length && t.apply(null, arguments), t;
};
yR.formats = YR;
var WR = yR;
const j = dE(), ja = u_(), LE = UE, za = WR, Ja = ye, HR = [];
for (const E in j)
  HR[j[E]] = E;
function Za(E, _, n, e, A) {
  const t = !!(A.supportBigNumbers || e.supportBigNumbers), R = !!(A.bigNumberStrings || e.bigNumberStrings), i = A.timezone || e.timezone, I = A.dateStrings || e.dateStrings;
  switch (E) {
    case j.TINY:
    case j.SHORT:
    case j.LONG:
    case j.INT24:
    case j.YEAR:
      return "packet.parseLengthCodedIntNoBigCheck()";
    case j.LONGLONG:
      return t && R ? "packet.parseLengthCodedIntString()" : `packet.parseLengthCodedInt(${t})`;
    case j.FLOAT:
    case j.DOUBLE:
      return "packet.parseLengthCodedFloat()";
    case j.NULL:
      return "packet.readLengthCodedNumber()";
    case j.DECIMAL:
    case j.NEWDECIMAL:
      return e.decimalNumbers ? "packet.parseLengthCodedFloat()" : 'packet.readLengthCodedString("ascii")';
    case j.DATE:
      return LE.typeMatch(E, I, j) ? 'packet.readLengthCodedString("ascii")' : `packet.parseDate(${LE.srcEscape(i)})`;
    case j.DATETIME:
    case j.TIMESTAMP:
      return LE.typeMatch(E, I, j) ? 'packet.readLengthCodedString("ascii")' : `packet.parseDateTime(${LE.srcEscape(i)})`;
    case j.TIME:
      return 'packet.readLengthCodedString("ascii")';
    case j.GEOMETRY:
      return "packet.parseGeometryValue()";
    case j.VECTOR:
      return "packet.parseVector()";
    case j.JSON:
      return e.jsonStrings ? 'packet.readLengthCodedString("utf8")' : 'JSON.parse(packet.readLengthCodedString("utf8"))';
    default:
      return _ === ja.BINARY ? "packet.readLengthCodedBuffer()" : `packet.readLengthCodedString(${n})`;
  }
}
function qa(E, _, n) {
  typeof n.typeCast == "function" && typeof _.typeCast != "function" && (_.typeCast = n.typeCast);
  function e(T, a) {
    return {
      type: HR[T.columnType],
      length: T.columnLength,
      db: T.schema,
      table: T.table,
      name: T.name,
      string: function(u = T.encoding) {
        return T.columnType === j.JSON && u === T.encoding && console.warn(
          `typeCast: JSON column "${T.name}" is interpreted as BINARY by default, recommended to manually set utf8 encoding: \`field.string("utf8")\``
        ), a.packet.readLengthCodedString(u);
      },
      buffer: function() {
        return a.packet.readLengthCodedBuffer();
      },
      geometry: function() {
        return a.packet.parseGeometryValue();
      }
    };
  }
  const A = za();
  A("(function () {")("return class TextRow {"), A("constructor(fields) {"), typeof _.typeCast == "function" && (A("const _this = this;"), A("for(let i=0; i<fields.length; ++i) {"), A("this[`wrap${i}`] = wrap(fields[i], _this);"), A("}")), A("}"), A("next(packet, fields, options) {"), A("this.packet = packet;"), _.rowsAsArray ? A(`const result = new Array(${E.length});`) : A("const result = {};");
  const t = {};
  let R = [];
  if (_.nestTables === !0) {
    for (let T = 0; T < E.length; T++)
      t[E[T].table] = 1;
    R = Object.keys(t);
    for (let T = 0; T < R.length; T++)
      A(`result[${LE.fieldEscape(R[T])}] = {};`);
  }
  let i = "", I = "", N = "";
  for (let T = 0; T < E.length; T++)
    if (I = LE.fieldEscape(E[T].name), typeof _.nestTables == "string" ? i = `result[${LE.fieldEscape(E[T].table + _.nestTables + E[T].name)}]` : _.nestTables === !0 ? (N = LE.fieldEscape(E[T].table), A(`if (!result[${N}]) result[${N}] = {};`), i = `result[${N}][${I}]`) : _.rowsAsArray ? i = `result[${T.toString(10)}]` : i = `result[${I}]`, _.typeCast === !1)
      A(`${i} = packet.readLengthCodedBuffer();`);
    else {
      const a = `fields[${T}].encoding`, u = Za(
        E[T].columnType,
        E[T].characterSet,
        a,
        n,
        _
      );
      typeof _.typeCast == "function" ? A(
        `${i} = options.typeCast(this.wrap${T}, function() { return ${u} });`
      ) : A(`${i} = ${u};`);
    }
  return A("return result;"), A("}"), A("};")("})()"), n.debug && LE.printDebugWithCode(
    "Compiled text protocol row parser",
    A.toString()
  ), typeof _.typeCast == "function" ? A.toFunction({ wrap: e }) : A.toFunction();
}
function pa(E, _, n) {
  return Ja.getParser("text", E, _, n, qa);
}
var xa = pa;
const z = dE(), $a = u_(), kE = UE, vR = [];
for (const E in z)
  vR[z[E]] = E;
function EO({ packet: E, type: _, charset: n, encoding: e, config: A, options: t }) {
  const R = !!(t.supportBigNumbers || A.supportBigNumbers), i = !!(t.bigNumberStrings || A.bigNumberStrings), I = t.timezone || A.timezone, N = t.dateStrings || A.dateStrings;
  switch (_) {
    case z.TINY:
    case z.SHORT:
    case z.LONG:
    case z.INT24:
    case z.YEAR:
      return E.parseLengthCodedIntNoBigCheck();
    case z.LONGLONG:
      return R && i ? E.parseLengthCodedIntString() : E.parseLengthCodedInt(R);
    case z.FLOAT:
    case z.DOUBLE:
      return E.parseLengthCodedFloat();
    case z.NULL:
    case z.DECIMAL:
    case z.NEWDECIMAL:
      return A.decimalNumbers ? E.parseLengthCodedFloat() : E.readLengthCodedString("ascii");
    case z.DATE:
      return kE.typeMatch(_, N, z) ? E.readLengthCodedString("ascii") : E.parseDate(I);
    case z.DATETIME:
    case z.TIMESTAMP:
      return kE.typeMatch(_, N, z) ? E.readLengthCodedString("ascii") : E.parseDateTime(I);
    case z.TIME:
      return E.readLengthCodedString("ascii");
    case z.GEOMETRY:
      return E.parseGeometryValue();
    case z.VECTOR:
      return E.parseVector();
    case z.JSON:
      return A.jsonStrings ? E.readLengthCodedString("utf8") : JSON.parse(E.readLengthCodedString("utf8"));
    default:
      return n === $a.BINARY ? E.readLengthCodedBuffer() : E.readLengthCodedString(e);
  }
}
function _O(E, _) {
  return {
    type: vR[E.columnType],
    length: E.columnLength,
    db: E.schema,
    table: E.table,
    name: E.name,
    string: function(n = E.encoding) {
      return E.columnType === z.JSON && n === E.encoding && console.warn(
        `typeCast: JSON column "${E.name}" is interpreted as BINARY by default, recommended to manually set utf8 encoding: \`field.string("utf8")\``
      ), _.readLengthCodedString(n);
    },
    buffer: function() {
      return _.readLengthCodedBuffer();
    },
    geometry: function() {
      return _.parseGeometryValue();
    }
  };
}
function nO(E, _, n) {
  return {
    next(e, A, t) {
      const R = t.rowsAsArray ? [] : {};
      for (let i = 0; i < A.length; i++) {
        const I = A[i], N = t.typeCast ? t.typeCast : n.typeCast, T = () => EO({
          packet: e,
          type: I.columnType,
          encoding: I.encoding,
          charset: I.characterSet,
          config: n,
          options: t
        });
        let a;
        if (t.typeCast === !1 ? a = e.readLengthCodedBuffer() : typeof N == "function" ? a = N(_O(I, e), T) : a = T(), t.rowsAsArray)
          R.push(a);
        else if (typeof t.nestTables == "string")
          R[`${kE.fieldEscape(I.table, !1)}${t.nestTables}${kE.fieldEscape(I.name, !1)}`] = a;
        else if (t.nestTables) {
          const u = kE.fieldEscape(I.table, !1);
          R[u] || (R[u] = {}), R[u][kE.fieldEscape(I.name, !1)] = a;
        } else
          R[kE.fieldEscape(I.name, !1)] = a;
      }
      return R;
    }
  };
}
var eO = nO;
const qA = Nn, xn = Ue, AO = d_.Readable, tO = DE, $E = rE, RO = xa, iO = eO, pA = iE, $n = new $E.Packet(0, Buffer.allocUnsafe(4), 0, 4);
let Se = class E_ extends tO {
  constructor(_, n) {
    super(), this.sql = _.sql, this.values = _.values, this._queryOptions = _, this.namedPlaceholders = _.namedPlaceholders || !1, this.onResult = n, this.timeout = _.timeout, this.queryTimeout = null, this._fieldCount = 0, this._rowParser = null, this._fields = [], this._rows = [], this._receivedFieldsCount = 0, this._resultIndex = 0, this._localStream = null, this._unpipeStream = function() {
    }, this._streamFactory = _.infileStreamFactory, this._connection = null;
  }
  then() {
    const _ = "You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(), or require('mysql2/promise') instead of 'mysql2' for a promise-compatible version of the query interface. To learn how to use async/await or Promises check out documentation at https://sidorares.github.io/node-mysql2/docs#using-promise-wrapper, or the mysql2 documentation at https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper";
    throw console.log(_), new Error(_);
  }
  /* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
  start(_, n) {
    n.config.debug && console.log("        Sending query command: %s", this.sql), this._connection = n, this.options = Object.assign({}, n.config, this._queryOptions), this._setTimeout();
    const e = new $E.Query(
      this.sql,
      n.config.charsetNumber
    );
    return n.writePacket(e.toPacket(1)), E_.prototype.resultsetHeader;
  }
  done() {
    if (this._unpipeStream(), this.timeout && !this.queryTimeout)
      return null;
    if (this.queryTimeout && (xn.clearTimeout(this.queryTimeout), this.queryTimeout = null), this.onResult) {
      let _, n;
      this._resultIndex === 0 ? (_ = this._rows[0], n = this._fields[0]) : (_ = this._rows, n = this._fields), n ? qA.nextTick(() => {
        this.onResult(null, _, n);
      }) : qA.nextTick(() => {
        this.onResult(null, _);
      });
    }
    return null;
  }
  doneInsert(_) {
    return this._localStreamError ? (this.onResult ? this.onResult(this._localStreamError, _) : this.emit("error", this._localStreamError), null) : (this._rows.push(_), this._fields.push(void 0), this.emit("fields", void 0), this.emit("result", _), _.serverStatus & pA.SERVER_MORE_RESULTS_EXISTS ? (this._resultIndex++, this.resultsetHeader) : this.done());
  }
  resultsetHeader(_, n) {
    const e = new $E.ResultSetHeader(_, n);
    return this._fieldCount = e.fieldCount, n.config.debug && console.log(
      `        Resultset header received, expecting ${e.fieldCount} column definition packets`
    ), this._fieldCount === 0 ? this.doneInsert(e) : this._fieldCount === null ? this._streamLocalInfile(n, e.infileName) : (this._receivedFieldsCount = 0, this._rows.push([]), this._fields.push([]), this.readField);
  }
  _streamLocalInfile(_, n) {
    if (this._streamFactory)
      this._localStream = this._streamFactory(n);
    else
      return this._localStreamError = new Error(
        `As a result of LOCAL INFILE command server wants to read ${n} file, but as of v2.0 you must provide streamFactory option returning ReadStream.`
      ), _.writePacket($n), this.infileOk;
    const e = () => {
      this._unpipeStream();
    }, A = () => {
      this._localStream.resume();
    }, t = () => {
      this._localStream.pause();
    }, R = function(N) {
      const T = Buffer.allocUnsafe(N.length + 4);
      N.copy(T, 4), _.writePacket(
        new $E.Packet(0, T, 0, T.length)
      );
    }, i = () => {
      _.removeListener("error", e), _.writePacket($n);
    }, I = (N) => {
      this._localStreamError = N, _.removeListener("error", e), _.writePacket($n);
    };
    return this._unpipeStream = () => {
      _.stream.removeListener("pause", t), _.stream.removeListener("drain", A), this._localStream.removeListener("data", R), this._localStream.removeListener("end", i), this._localStream.removeListener("error", I);
    }, _.stream.on("pause", t), _.stream.on("drain", A), this._localStream.on("data", R), this._localStream.on("end", i), this._localStream.on("error", I), _.once("error", e), this.infileOk;
  }
  readField(_, n) {
    if (this._receivedFieldsCount++, this._fields[this._resultIndex].length !== this._fieldCount) {
      const e = new $E.ColumnDefinition(
        _,
        n.clientEncoding
      );
      this._fields[this._resultIndex].push(e), n.config.debug && (console.log("        Column definition:"), console.log(`          name: ${e.name}`), console.log(`          type: ${e.columnType}`), console.log(`         flags: ${e.flags}`));
    }
    if (this._receivedFieldsCount === this._fieldCount) {
      const e = this._fields[this._resultIndex];
      return this.emit("fields", e), this.options.disableEval ? this._rowParser = iO(e, this.options, n.config) : this._rowParser = new (RO(
        e,
        this.options,
        n.config
      ))(e), E_.prototype.fieldsEOF;
    }
    return E_.prototype.readField;
  }
  fieldsEOF(_, n) {
    return _.isEOF() ? this.row : n.protocolError("Expected EOF packet");
  }
  row(_, n) {
    if (_.isEOF())
      return _.eofStatusFlags() & pA.SERVER_MORE_RESULTS_EXISTS ? (this._resultIndex++, E_.prototype.resultsetHeader) : this.done();
    let e;
    try {
      e = this._rowParser.next(
        _,
        this._fields[this._resultIndex],
        this.options
      );
    } catch (A) {
      return this._localStreamError = A, this.doneInsert(null);
    }
    return this.onResult ? this._rows[this._resultIndex].push(e) : this.emit("result", e, this._resultIndex), E_.prototype.row;
  }
  infileOk(_, n) {
    const e = new $E.ResultSetHeader(_, n);
    return this.doneInsert(e);
  }
  stream(_) {
    _ = _ || /* @__PURE__ */ Object.create(null), _.objectMode = !0;
    const n = new AO({
      ..._,
      emitClose: !0,
      autoDestroy: !0,
      read: () => {
        this._connection && this._connection.resume();
      }
    });
    n.once("close", () => {
      n.readableEnded || n.emit("end");
    });
    const e = (i, I) => {
      n.destroyed || (n.push(i) || this._connection && this._connection.pause(), n.emit("result", i, I));
    }, A = (i) => {
      n.destroyed || n.emit("fields", i);
    }, t = () => {
      n.destroyed || n.push(null);
    }, R = (i) => {
      n.destroy(i);
    };
    return n._destroy = (i, I) => {
      this._connection && this._connection.resume(), this.removeListener("result", e), this.removeListener("fields", A), this.removeListener("end", t), this.removeListener("error", R), I(i);
    }, this.on("result", e), this.on("fields", A), this.on("end", t), this.on("error", R), n;
  }
  _setTimeout() {
    if (this.timeout) {
      const _ = this._handleTimeoutError.bind(this);
      this.queryTimeout = xn.setTimeout(_, this.timeout);
    }
  }
  _handleTimeoutError() {
    this.queryTimeout && (xn.clearTimeout(this.queryTimeout), this.queryTimeout = null);
    const _ = new Error("Query inactivity timeout");
    _.errorno = "PROTOCOL_SEQUENCE_TIMEOUT", _.code = "PROTOCOL_SEQUENCE_TIMEOUT", _.syscall = "query", this.onResult ? this.onResult(_) : this.emit("error", _);
  }
};
Se.prototype.catch = Se.prototype.then;
var XR = Se;
const IO = DE, NO = rE;
let TO = class extends IO {
  constructor(_) {
    super(), this.id = _;
  }
  start(_, n) {
    return n.writePacket(new NO.CloseStatement(this.id).toPacket(1)), null;
  }
};
var aO = TO;
const KR = eE, OO = u_(), H = dE(), e_ = UE, uO = WR, cO = ye, kR = [];
for (const E in H)
  kR[H[E]] = E;
function CO(E, _, n, e) {
  const A = !!(n.supportBigNumbers || _.supportBigNumbers), t = !!(n.bigNumberStrings || _.bigNumberStrings), R = n.timezone || _.timezone, i = n.dateStrings || _.dateStrings, I = E.flags & KR.UNSIGNED;
  switch (E.columnType) {
    case H.TINY:
      return I ? "packet.readInt8();" : "packet.readSInt8();";
    case H.SHORT:
      return I ? "packet.readInt16();" : "packet.readSInt16();";
    case H.LONG:
    case H.INT24:
      return I ? "packet.readInt32();" : "packet.readSInt32();";
    case H.YEAR:
      return "packet.readInt16()";
    case H.FLOAT:
      return "packet.readFloat();";
    case H.DOUBLE:
      return "packet.readDouble();";
    case H.NULL:
      return "null;";
    case H.DATE:
    case H.DATETIME:
    case H.TIMESTAMP:
    case H.NEWDATE:
      return e_.typeMatch(E.columnType, i, H) ? `packet.readDateTimeString(${parseInt(E.decimals, 10)}, null, ${E.columnType});` : `packet.readDateTime(${e_.srcEscape(R)});`;
    case H.TIME:
      return "packet.readTimeString()";
    case H.DECIMAL:
    case H.NEWDECIMAL:
      return _.decimalNumbers ? "packet.parseLengthCodedFloat();" : 'packet.readLengthCodedString("ascii");';
    case H.GEOMETRY:
      return "packet.parseGeometryValue();";
    case H.VECTOR:
      return "packet.parseVector()";
    case H.JSON:
      return _.jsonStrings ? 'packet.readLengthCodedString("utf8")' : 'JSON.parse(packet.readLengthCodedString("utf8"));';
    case H.LONGLONG:
      return A ? t ? I ? "packet.readInt64String();" : "packet.readSInt64String();" : I ? "packet.readInt64();" : "packet.readSInt64();" : I ? "packet.readInt64JSNumber();" : "packet.readSInt64JSNumber();";
    default:
      return E.characterSet === OO.BINARY ? "packet.readLengthCodedBuffer();" : `packet.readLengthCodedString(fields[${e}].encoding)`;
  }
}
function rO(E, _, n) {
  const e = uO(), A = Math.floor((E.length + 7 + 2) / 8);
  function t(a, u) {
    return {
      type: kR[a.columnType],
      length: a.columnLength,
      db: a.schema,
      table: a.table,
      name: a.name,
      string: function(C = a.encoding) {
        if (a.columnType === H.JSON && C === a.encoding && console.warn(
          `typeCast: JSON column "${a.name}" is interpreted as BINARY by default, recommended to manually set utf8 encoding: \`field.string("utf8")\``
        ), [H.DATETIME, H.NEWDATE, H.TIMESTAMP, H.DATE].includes(
          a.columnType
        ))
          return u.readDateTimeString(
            parseInt(a.decimals, 10),
            " ",
            a.columnType
          );
        if (a.columnType === H.TINY) {
          const r = a.flags & KR.UNSIGNED;
          return String(r ? u.readInt8() : u.readSInt8());
        }
        return a.columnType === H.TIME ? u.readTimeString() : u.readLengthCodedString(C);
      },
      buffer: function() {
        return u.readLengthCodedBuffer();
      },
      geometry: function() {
        return u.parseGeometryValue();
      }
    };
  }
  e("(function(){"), e("return class BinaryRow {"), e("constructor() {"), e("}"), e("next(packet, fields, options) {"), _.rowsAsArray ? e(`const result = new Array(${E.length});`) : e("const result = {};"), typeof n.typeCast == "function" && typeof _.typeCast != "function" && (_.typeCast = n.typeCast), e("packet.readInt8();");
  for (let a = 0; a < A; ++a)
    e(`const nullBitmaskByte${a} = packet.readInt8();`);
  let R = "", i = 4, I = 0, N = "", T = "";
  for (let a = 0; a < E.length; a++) {
    if (N = e_.fieldEscape(E[a].name), typeof _.nestTables == "string" ? R = `result[${e_.fieldEscape(E[a].table + _.nestTables + E[a].name)}]` : _.nestTables === !0 ? (T = e_.fieldEscape(E[a].table), e(`if (!result[${T}]) result[${T}] = {};`), R = `result[${T}][${N}]`) : _.rowsAsArray ? R = `result[${a.toString(10)}]` : R = `result[${N}]`, e(`if (nullBitmaskByte${I} & ${i}) `), e(`${R} = null;`), e("else {"), _.typeCast === !1)
      e(`${R} = packet.readLengthCodedBuffer();`);
    else {
      const u = `fieldWrapper${a}`;
      e(`const ${u} = wrap(fields[${a}], packet);`);
      const C = CO(E[a], n, _, a);
      typeof _.typeCast == "function" ? e(
        `${R} = options.typeCast(${u}, function() { return ${C} });`
      ) : e(`${R} = ${C};`);
    }
    e("}"), i *= 2, i === 256 && (i = 1, I++);
  }
  return e("return result;"), e("}"), e("};")("})()"), n.debug && e_.printDebugWithCode(
    "Compiled binary protocol row parser",
    e.toString()
  ), e.toFunction({ wrap: t });
}
function DO(E, _, n) {
  return cO.getParser("binary", E, _, n, rO);
}
var sO = DO;
const xA = eE, lO = u_(), W = dE(), C_ = UE, jR = [];
for (const E in W)
  jR[W[E]] = E;
function hO(E, _, n) {
  function e(A, t, R, i, I) {
    const N = !!(R.supportBigNumbers || t.supportBigNumbers), T = !!(R.bigNumberStrings || t.bigNumberStrings), a = R.timezone || t.timezone, u = R.dateStrings || t.dateStrings, C = A.flags & xA.UNSIGNED;
    switch (A.columnType) {
      case W.TINY:
        return C ? I.readInt8() : I.readSInt8();
      case W.SHORT:
        return C ? I.readInt16() : I.readSInt16();
      case W.LONG:
      case W.INT24:
        return C ? I.readInt32() : I.readSInt32();
      case W.YEAR:
        return I.readInt16();
      case W.FLOAT:
        return I.readFloat();
      case W.DOUBLE:
        return I.readDouble();
      case W.NULL:
        return null;
      case W.DATE:
      case W.DATETIME:
      case W.TIMESTAMP:
      case W.NEWDATE:
        return C_.typeMatch(A.columnType, u, W) ? I.readDateTimeString(
          parseInt(A.decimals, 10),
          null,
          A.columnType
        ) : I.readDateTime(a);
      case W.TIME:
        return I.readTimeString();
      case W.DECIMAL:
      case W.NEWDECIMAL:
        return t.decimalNumbers ? I.parseLengthCodedFloat() : I.readLengthCodedString("ascii");
      case W.GEOMETRY:
        return I.parseGeometryValue();
      case W.VECTOR:
        return I.parseVector();
      case W.JSON:
        return t.jsonStrings ? I.readLengthCodedString("utf8") : JSON.parse(I.readLengthCodedString("utf8"));
      case W.LONGLONG:
        return N ? T ? C ? I.readInt64String() : I.readSInt64String() : C ? I.readInt64() : I.readSInt64() : C ? I.readInt64JSNumber() : I.readSInt64JSNumber();
      default:
        return A.characterSet === lO.BINARY ? I.readLengthCodedBuffer() : I.readLengthCodedString(E[i].encoding);
    }
  }
  return class {
    constructor() {
    }
    next(t, R, i) {
      t.readInt8();
      const I = Math.floor((R.length + 7 + 2) / 8), N = new Array(I);
      for (let C = 0; C < I; C++)
        N[C] = t.readInt8();
      const T = i.rowsAsArray ? new Array(R.length) : {};
      let a = 4, u = 0;
      for (let C = 0; C < R.length; C++) {
        const r = R[C], D = i.typeCast !== void 0 ? i.typeCast : n.typeCast;
        let c;
        if (N[u] & a)
          c = null;
        else if (i.typeCast === !1)
          c = t.readLengthCodedBuffer();
        else {
          const l = () => e(r, n, i, C, t);
          c = typeof D == "function" ? D(
            {
              type: jR[r.columnType],
              length: r.columnLength,
              db: r.schema,
              table: r.table,
              name: r.name,
              string: function(S = r.encoding) {
                if (r.columnType === W.JSON && S === r.encoding && console.warn(
                  `typeCast: JSON column "${r.name}" is interpreted as BINARY by default, recommended to manually set utf8 encoding: \`field.string("utf8")\``
                ), [
                  W.DATETIME,
                  W.NEWDATE,
                  W.TIMESTAMP,
                  W.DATE
                ].includes(r.columnType))
                  return t.readDateTimeString(
                    parseInt(r.decimals, 10),
                    " ",
                    r.columnType
                  );
                if (r.columnType === W.TINY) {
                  const B = r.flags & xA.UNSIGNED;
                  return String(
                    B ? t.readInt8() : t.readSInt8()
                  );
                }
                return r.columnType === W.TIME ? t.readTimeString() : t.readLengthCodedString(S);
              },
              buffer: function() {
                return t.readLengthCodedBuffer();
              },
              geometry: function() {
                return t.parseGeometryValue();
              }
            },
            l
          ) : l();
        }
        if (i.rowsAsArray)
          T[C] = c;
        else if (typeof i.nestTables == "string") {
          const l = C_.fieldEscape(
            r.table + i.nestTables + r.name,
            !1
          );
          T[l] = c;
        } else if (i.nestTables === !0) {
          const l = C_.fieldEscape(r.table, !1);
          T[l] || (T[l] = {});
          const S = C_.fieldEscape(r.name, !1);
          T[l][S] = c;
        } else {
          const l = C_.fieldEscape(r.name, !1);
          T[l] = c;
        }
        a *= 2, a === 256 && (a = 1, u++);
      }
      return T;
    }
  };
}
var SO = hO;
const BO = DE, oE = XR, $A = rE, fO = sO, MO = SO;
let BE = class S_ extends BO {
  constructor(_, n) {
    super(), this.statement = _.statement, this.sql = _.sql, this.values = _.values, this.onResult = n, this.parameters = _.values, this.insertId = 0, this.timeout = _.timeout, this.queryTimeout = null, this._rows = [], this._fields = [], this._result = [], this._fieldCount = 0, this._rowParser = null, this._executeOptions = _, this._resultIndex = 0, this._localStream = null, this._unpipeStream = function() {
    }, this._streamFactory = _.infileStreamFactory, this._connection = null;
  }
  buildParserFromFields(_, n) {
    return this.options.disableEval ? MO(_, this.options, n.config) : fO(_, this.options, n.config);
  }
  start(_, n) {
    this._connection = n, this.options = Object.assign({}, n.config, this._executeOptions), this._setTimeout();
    const e = new $A.Execute(
      this.statement.id,
      this.parameters,
      n.config.charsetNumber,
      n.config.timezone
    );
    try {
      n.writePacket(e.toPacket(1));
    } catch (A) {
      this.onResult(A);
    }
    return S_.prototype.resultsetHeader;
  }
  readField(_, n) {
    let e;
    const A = new $A.ColumnDefinition(
      _,
      n.clientEncoding
    );
    return this._receivedFieldsCount++, this._fields[this._resultIndex].push(A), this._receivedFieldsCount === this._fieldCount ? (e = this._fields[this._resultIndex], this.emit("fields", e, this._resultIndex), S_.prototype.fieldsEOF) : S_.prototype.readField;
  }
  fieldsEOF(_, n) {
    return _.isEOF() ? (this._rowParser = new (this.buildParserFromFields(
      this._fields[this._resultIndex],
      n
    ))(), S_.prototype.row) : n.protocolError("Expected EOF packet");
  }
};
BE.prototype.done = oE.prototype.done;
BE.prototype.doneInsert = oE.prototype.doneInsert;
BE.prototype.resultsetHeader = oE.prototype.resultsetHeader;
BE.prototype._findOrCreateReadStream = oE.prototype._findOrCreateReadStream;
BE.prototype._streamLocalInfile = oE.prototype._streamLocalInfile;
BE.prototype._setTimeout = oE.prototype._setTimeout;
BE.prototype._handleTimeoutError = oE.prototype._handleTimeoutError;
BE.prototype.row = oE.prototype.row;
BE.prototype.stream = oE.prototype.stream;
var zR = BE;
const J_ = rE, gO = DE, LO = aO, dO = zR;
class UO {
  constructor(_, n, e, A, t) {
    this.query = _, this.id = n, this.columns = e, this.parameters = A, this.rowParser = null, this._connection = t;
  }
  close() {
    return this._connection.addCommand(new LO(this.id));
  }
  execute(_, n) {
    return typeof _ == "function" && (n = _, _ = []), this._connection.addCommand(
      new dO({ statement: this, values: _ }, n)
    );
  }
}
let oO = class gE extends gO {
  constructor(_, n) {
    super(), this.query = _.sql, this.onResult = n, this.id = 0, this.fieldCount = 0, this.parameterCount = 0, this.fields = [], this.parameterDefinitions = [], this.options = _;
  }
  start(_, n) {
    const e = n.constructor;
    this.key = e.statementKey(this.options);
    const A = n._statements.get(this.key);
    if (A)
      return this.onResult && this.onResult(null, A), null;
    const t = new J_.PrepareStatement(
      this.query,
      n.config.charsetNumber,
      this.options.values
    );
    return n.writePacket(t.toPacket(1)), gE.prototype.prepareHeader;
  }
  prepareHeader(_, n) {
    const e = new J_.PreparedStatementHeader(_);
    return this.id = e.id, this.fieldCount = e.fieldCount, this.parameterCount = e.parameterCount, this.parameterCount > 0 ? gE.prototype.readParameter : this.fieldCount > 0 ? gE.prototype.readField : this.prepareDone(n);
  }
  readParameter(_, n) {
    if (_.isEOF())
      return this.fieldCount > 0 ? gE.prototype.readField : this.prepareDone(n);
    const e = new J_.ColumnDefinition(_, n.clientEncoding);
    return this.parameterDefinitions.push(e), this.parameterDefinitions.length === this.parameterCount ? gE.prototype.parametersEOF : this.readParameter;
  }
  readField(_, n) {
    if (_.isEOF())
      return this.prepareDone(n);
    const e = new J_.ColumnDefinition(_, n.clientEncoding);
    return this.fields.push(e), this.fields.length === this.fieldCount ? gE.prototype.fieldsEOF : gE.prototype.readField;
  }
  parametersEOF(_, n) {
    return _.isEOF() ? this.fieldCount > 0 ? gE.prototype.readField : this.prepareDone(n) : n.protocolError("Expected EOF packet after parameters");
  }
  fieldsEOF(_, n) {
    return _.isEOF() ? this.prepareDone(n) : n.protocolError("Expected EOF packet after fields");
  }
  prepareDone(_) {
    const n = new UO(
      this.query,
      this.id,
      this.fields,
      this.parameterDefinitions,
      _
    );
    return _._statements.set(this.key, n), this.onResult && this.onResult(null, n), null;
  }
};
var wO = oO;
const GO = DE, FO = hE, PO = Z;
let QO = class JR extends GO {
  constructor(_) {
    super(), this.onResult = _;
  }
  start(_, n) {
    const e = new PO(
      0,
      Buffer.from([1, 0, 0, 0, FO.PING]),
      0,
      5
    );
    return n.writePacket(e), JR.prototype.pingResponse;
  }
  pingResponse() {
    return this.onResult && process.nextTick(this.onResult.bind(this)), null;
  }
};
var VO = QO;
const bO = DE, mO = rE;
let YO = class ZR extends bO {
  constructor(_, n) {
    super(), this.onResult = n, this.opts = _;
  }
  start(_, n) {
    const e = new mO.RegisterSlave(this.opts);
    return n.writePacket(e.toPacket(1)), ZR.prototype.registerResponse;
  }
  registerResponse() {
    return this.onResult && process.nextTick(this.onResult.bind(this)), null;
  }
};
var yO = YO, Ee, Et;
function WO() {
  if (Et) return Ee;
  Et = 1;
  const E = {
    FLAGS2: 0,
    SQL_MODE: 1,
    CATALOG: 2,
    CHARSET: 4,
    TIME_ZONE: 5,
    CATALOG_NZ: 6,
    LC_TIME_NAMES: 7,
    CHARSET_DATABASE: 8,
    TABLE_MAP_FOR_UPDATE: 9,
    MASTER_DATA_WRITTEN: 10,
    INVOKERS: 11,
    UPDATED_DB_NAMES: 12,
    MICROSECONDS: 3
  };
  return Ee = function(n) {
    const e = {};
    let A = 0, t, R, i;
    for (; A < n.length; )
      switch (t = n[A++], t) {
        case E.FLAGS2:
          e.flags = n.readUInt32LE(A), A += 4;
          break;
        case E.SQL_MODE:
          e.sqlMode = n.readUInt32LE(A), A += 8;
          break;
        case E.CATALOG:
          R = n[A++], e.catalog = n.toString("utf8", A, A + R), A += R + 1;
          break;
        case E.CHARSET:
          e.clientCharset = n.readUInt16LE(A), e.connectionCollation = n.readUInt16LE(A + 2), e.serverCharset = n.readUInt16LE(A + 4), A += 6;
          break;
        case E.TIME_ZONE:
          R = n[A++], e.timeZone = n.toString("utf8", A, A + R), A += R;
          break;
        case E.CATALOG_NZ:
          R = n[A++], e.catalogNz = n.toString("utf8", A, A + R), A += R;
          break;
        case E.LC_TIME_NAMES:
          e.lcTimeNames = n.readUInt16LE(A), A += 2;
          break;
        case E.CHARSET_DATABASE:
          e.schemaCharset = n.readUInt16LE(A), A += 2;
          break;
        case E.TABLE_MAP_FOR_UPDATE:
          e.mapForUpdate1 = n.readUInt32LE(A), e.mapForUpdate2 = n.readUInt32LE(A + 4), A += 8;
          break;
        case E.MASTER_DATA_WRITTEN:
          e.masterDataWritten = n.readUInt32LE(A), A += 4;
          break;
        case E.INVOKERS:
          R = n[A++], e.invokerUsername = n.toString(
            "utf8",
            A,
            A + R
          ), A += R, R = n[A++], e.invokerHostname = n.toString(
            "utf8",
            A,
            A + R
          ), A += R;
          break;
        case E.UPDATED_DB_NAMES:
          for (R = n[A++], e.updatedDBs = []; R; --R) {
            for (i = A; n[A++] && A < n.length; )
              ;
            e.updatedDBs.push(
              n.toString("utf8", i, A - 1)
            );
          }
          break;
        case E.MICROSECONDS:
          e.microseconds = // REVIEW: INVALID UNKNOWN VARIABLE!
          n.readInt16LE(A) + (n[A + 2] << 16), A += 3;
      }
    return e;
  }, Ee;
}
const HO = DE, vO = rE, V_ = [];
class XO {
  constructor(_) {
    this.timestamp = _.readInt32(), this.eventType = _.readInt8(), this.serverId = _.readInt32(), this.eventSize = _.readInt32(), this.logPos = _.readInt32(), this.flags = _.readInt16();
  }
}
let KO = class Be extends HO {
  constructor(_) {
    super(), this.opts = _;
  }
  start(_, n) {
    const e = new vO.BinlogDump(this.opts);
    return n.writePacket(e.toPacket(1)), Be.prototype.binlogData;
  }
  binlogData(_) {
    if (_.isEOF())
      return this.emit("eof"), null;
    _.readInt8();
    const n = new XO(_), e = V_[n.eventType];
    let A;
    return e ? A = new e(_) : A = {
      name: "UNKNOWN"
    }, A.header = n, this.emit("event", A), Be.prototype.binlogData;
  }
};
class kO {
  constructor(_) {
    this.pposition = _.readInt32(), _.readInt32(), this.nextBinlog = _.readString(), this.name = "RotateEvent";
  }
}
class jO {
  constructor(_) {
    this.binlogVersion = _.readInt16(), this.serverVersion = _.readString(50).replace(/\u0000.*/, ""), this.createTimestamp = _.readInt32(), this.eventHeaderLength = _.readInt8(), this.eventsLength = _.readBuffer(), this.name = "FormatDescriptionEvent";
  }
}
class zO {
  constructor(_) {
    const n = WO();
    this.slaveProxyId = _.readInt32(), this.executionTime = _.readInt32();
    const e = _.readInt8();
    this.errorCode = _.readInt16();
    const A = _.readInt16(), t = _.readBuffer(A);
    this.schema = _.readString(e), _.readInt8(), this.statusVars = n(t), this.query = _.readString(), this.name = "QueryEvent";
  }
}
class JO {
  constructor(_) {
    this.binlogVersion = _.readInt16(), this.xid = _.readInt64(), this.name = "XidEvent";
  }
}
V_[2] = zO;
V_[4] = kO;
V_[15] = jO;
V_[16] = JO;
var ZO = KO;
const qO = DE, pO = rE, xO = V, qR = PR, $O = SE();
let xe = class pR extends qO {
  constructor(_, n) {
    super(), this.onResult = n, this.user = _.user, this.password = _.password, this.password1 = _.password, this.password2 = _.password2, this.password3 = _.password3, this.database = _.database, this.passwordSha1 = _.passwordSha1, this.charsetNumber = _.charsetNumber, this.currentConfig = _.currentConfig, this.authenticationFactor = 0;
  }
  start(_, n) {
    const e = new pO.ChangeUser({
      flags: n.config.clientFlags,
      user: this.user,
      database: this.database,
      charsetNumber: this.charsetNumber,
      password: this.password,
      passwordSha1: this.passwordSha1,
      authPluginData1: n._handshakePacket.authPluginData1,
      authPluginData2: n._handshakePacket.authPluginData2
    });
    return this.currentConfig.user = this.user, this.currentConfig.password = this.password, this.currentConfig.database = this.database, this.currentConfig.charsetNumber = this.charsetNumber, n.clientEncoding = $O[this.charsetNumber], n._statements.clear(), n.writePacket(e.toPacket()), n.serverCapabilityFlags & xO.MULTI_FACTOR_AUTHENTICATION && (this.authenticationFactor = 1), pR.prototype.handshakeResult;
  }
};
xe.prototype.handshakeResult = qR.prototype.handshakeResult;
xe.prototype.calculateNativePasswordAuthToken = qR.prototype.calculateNativePasswordAuthToken;
var Eu = xe;
const _u = DE, nu = hE, eu = Z;
let Au = class extends _u {
  constructor(_) {
    super(), this.onResult = _;
  }
  start(_, n) {
    n._closing = !0;
    const e = new eu(
      0,
      Buffer.from([1, 0, 0, 0, nu.QUIT]),
      0,
      5
    );
    return this.onResult && this.onResult(), n.writePacket(e), null;
  }
};
var tu = Au;
const Ru = PR, iu = Ya, Iu = XR, Nu = wO, Tu = zR, au = VO, Ou = yO, uu = ZO, cu = Eu, Cu = tu;
var ru = {
  ClientHandshake: Ru,
  ServerHandshake: iu,
  Query: Iu,
  Prepare: Nu,
  Execute: Tu,
  Ping: au,
  RegisterSlave: Ou,
  BinlogDump: uu,
  ChangeUser: cu,
  Quit: Cu
};
const Du = "3.17.4", su = {
  version: Du
};
var _e = {}, __ = { exports: {} }, r_ = {}, _t;
function lu() {
  return _t || (_t = 1, Object.defineProperty(r_, "__esModule", { value: !0 }), r_.defaults = void 0, r_.defaults = [
    `-----BEGIN CERTIFICATE-----
MIIEEjCCAvqgAwIBAgIJAM2ZN/+nPi27MA0GCSqGSIb3DQEBCwUAMIGVMQswCQYD
VQQGEwJVUzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEi
MCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1h
em9uIFJEUzEmMCQGA1UEAwwdQW1hem9uIFJEUyBhZi1zb3V0aC0xIFJvb3QgQ0Ew
HhcNMTkxMDI4MTgwNTU4WhcNMjQxMDI2MTgwNTU4WjCBlTELMAkGA1UEBhMCVVMx
EDAOBgNVBAcMB1NlYXR0bGUxEzARBgNVBAgMCldhc2hpbmd0b24xIjAgBgNVBAoM
GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx
JjAkBgNVBAMMHUFtYXpvbiBSRFMgYWYtc291dGgtMSBSb290IENBMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwR2351uPMZaJk2gMGT+1sk8HE9MQh2rc
/sCnbxGn2p1c7Oi9aBbd/GiFijeJb2BXvHU+TOq3d3Jjqepq8tapXVt4ojbTJNyC
J5E7r7KjTktKdLxtBE1MK25aY+IRJjtdU6vG3KiPKUT1naO3xs3yt0F76WVuFivd
9OHv2a+KHvPkRUWIxpmAHuMY9SIIMmEZtVE7YZGx5ah0iO4JzItHcbVR0y0PBH55
arpFBddpIVHCacp1FUPxSEWkOpI7q0AaU4xfX0fe1BV5HZYRKpBOIp1TtZWvJD+X
jGUtL1BEsT5vN5g9MkqdtYrC+3SNpAk4VtpvJrdjraI/hhvfeXNnAwIDAQABo2Mw
YTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUEEi/
WWMcBJsoGXg+EZwkQ0MscZQwHwYDVR0jBBgwFoAUEEi/WWMcBJsoGXg+EZwkQ0Ms
cZQwDQYJKoZIhvcNAQELBQADggEBAGDZ5js5Pc/gC58LJrwMPXFhJDBS8QuDm23C
FFUdlqucskwOS3907ErK1ZkmVJCIqFLArHqskFXMAkRZ2PNR7RjWLqBs+0znG5yH
hRKb4DXzhUFQ18UBRcvT6V6zN97HTRsEEaNhM/7k8YLe7P8vfNZ28VIoJIGGgv9D
wQBBvkxQ71oOmAG0AwaGD0ORGUfbYry9Dz4a4IcUsZyRWRMADixgrFv6VuETp26s
/+z+iqNaGWlELBKh3iQCT6Y/1UnkPLO42bxrCSyOvshdkYN58Q2gMTE1SVTqyo8G
Lw8lLAz9bnvUSgHzB3jRrSx6ggF/WRMRYlR++y6LXP4SAsSAaC0=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEEjCCAvqgAwIBAgIJAJYM4LxvTZA6MA0GCSqGSIb3DQEBCwUAMIGVMQswCQYD
VQQGEwJVUzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEi
MCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1h
em9uIFJEUzEmMCQGA1UEAwwdQW1hem9uIFJEUyBldS1zb3V0aC0xIFJvb3QgQ0Ew
HhcNMTkxMDMwMjAyMDM2WhcNMjQxMDI4MjAyMDM2WjCBlTELMAkGA1UEBhMCVVMx
EDAOBgNVBAcMB1NlYXR0bGUxEzARBgNVBAgMCldhc2hpbmd0b24xIjAgBgNVBAoM
GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx
JjAkBgNVBAMMHUFtYXpvbiBSRFMgZXUtc291dGgtMSBSb290IENBMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqM921jXCXeqpRNCS9CBPOe5N7gMaEt+D
s5uR3riZbqzRlHGiF1jZihkXfHAIQewDwy+Yz+Oec1aEZCQMhUHxZJPusuX0cJfj
b+UluFqHIijL2TfXJ3D0PVLLoNTQJZ8+GAPECyojAaNuoHbdVqxhOcznMsXIXVFq
yVLKDGvyKkJjai/iSPDrQMXufg3kWt0ISjNLvsG5IFXgP4gttsM8i0yvRd4QcHoo
DjvH7V3cS+CQqW5SnDrGnHToB0RLskE1ET+oNOfeN9PWOxQprMOX/zmJhnJQlTqD
QP7jcf7SddxrKFjuziFiouskJJyNDsMjt1Lf60+oHZhed2ogTeifGwIDAQABo2Mw
YTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUFBAF
cgJe/BBuZiGeZ8STfpkgRYQwHwYDVR0jBBgwFoAUFBAFcgJe/BBuZiGeZ8STfpkg
RYQwDQYJKoZIhvcNAQELBQADggEBAKAYUtlvDuX2UpZW9i1QgsjFuy/ErbW0dLHU
e/IcFtju2z6RLZ+uF+5A8Kme7IKG1hgt8s+w9TRVQS/7ukQzoK3TaN6XKXRosjtc
o9Rm4gYWM8bmglzY1TPNaiI4HC7546hSwJhubjN0bXCuj/0sHD6w2DkiGuwKNAef
yTu5vZhPkeNyXLykxkzz7bNp2/PtMBnzIp+WpS7uUDmWyScGPohKMq5PqvL59z+L
ZI3CYeMZrJ5VpXUg3fNNIz/83N3G0sk7wr0ohs/kHTP7xPOYB0zD7Ku4HA0Q9Swf
WX0qr6UQgTPMjfYDLffI7aEId0gxKw1eGYc6Cq5JAZ3ipi/cBFc=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEEjCCAvqgAwIBAgIJANew34ehz5l8MA0GCSqGSIb3DQEBCwUAMIGVMQswCQYD
VQQGEwJVUzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEi
MCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1h
em9uIFJEUzEmMCQGA1UEAwwdQW1hem9uIFJEUyBtZS1zb3V0aC0xIFJvb3QgQ0Ew
HhcNMTkwNTEwMjE0ODI3WhcNMjQwNTA4MjE0ODI3WjCBlTELMAkGA1UEBhMCVVMx
EDAOBgNVBAcMB1NlYXR0bGUxEzARBgNVBAgMCldhc2hpbmd0b24xIjAgBgNVBAoM
GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx
JjAkBgNVBAMMHUFtYXpvbiBSRFMgbWUtc291dGgtMSBSb290IENBMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp7BYV88MukcY+rq0r79+C8UzkT30fEfT
aPXbx1d6M7uheGN4FMaoYmL+JE1NZPaMRIPTHhFtLSdPccInvenRDIatcXX+jgOk
UA6lnHQ98pwN0pfDUyz/Vph4jBR9LcVkBbe0zdoKKp+HGbMPRU0N2yNrog9gM5O8
gkU/3O2csJ/OFQNnj4c2NQloGMUpEmedwJMOyQQfcUyt9CvZDfIPNnheUS29jGSw
ERpJe/AENu8Pxyc72jaXQuD+FEi2Ck6lBkSlWYQFhTottAeGvVFNCzKszCntrtqd
rdYUwurYsLTXDHv9nW2hfDUQa0mhXf9gNDOBIVAZugR9NqNRNyYLHQIDAQABo2Mw
YTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU54cf
DjgwBx4ycBH8+/r8WXdaiqYwHwYDVR0jBBgwFoAU54cfDjgwBx4ycBH8+/r8WXda
iqYwDQYJKoZIhvcNAQELBQADggEBAIIMTSPx/dR7jlcxggr+O6OyY49Rlap2laKA
eC/XI4ySP3vQkIFlP822U9Kh8a9s46eR0uiwV4AGLabcu0iKYfXjPkIprVCqeXV7
ny9oDtrbflyj7NcGdZLvuzSwgl9SYTJp7PVCZtZutsPYlbJrBPHwFABvAkMvRtDB
hitIg4AESDGPoCl94sYHpfDfjpUDMSrAMDUyO6DyBdZH5ryRMAs3lGtsmkkNUrso
aTW6R05681Z0mvkRdb+cdXtKOSuDZPoe2wJJIaz3IlNQNSrB5TImMYgmt6iAsFhv
3vfTSTKrZDNTJn4ybG6pq1zWExoXsktZPylJly6R3RBwV6nwqBM=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBjCCAu6gAwIBAgIJAMc0ZzaSUK51MA0GCSqGSIb3DQEBCwUAMIGPMQswCQYD
VQQGEwJVUzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEi
MCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1h
em9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJEUyBSb290IDIwMTkgQ0EwHhcNMTkw
ODIyMTcwODUwWhcNMjQwODIyMTcwODUwWjCBjzELMAkGA1UEBhMCVVMxEDAOBgNV
BAcMB1NlYXR0bGUxEzARBgNVBAgMCldhc2hpbmd0b24xIjAgBgNVBAoMGUFtYXpv
biBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxIDAeBgNV
BAMMF0FtYXpvbiBSRFMgUm9vdCAyMDE5IENBMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEArXnF/E6/Qh+ku3hQTSKPMhQQlCpoWvnIthzX6MK3p5a0eXKZ
oWIjYcNNG6UwJjp4fUXl6glp53Jobn+tWNX88dNH2n8DVbppSwScVE2LpuL+94vY
0EYE/XxN7svKea8YvlrqkUBKyxLxTjh+U/KrGOaHxz9v0l6ZNlDbuaZw3qIWdD/I
6aNbGeRUVtpM6P+bWIoxVl/caQylQS6CEYUk+CpVyJSkopwJlzXT07tMoDL5WgX9
O08KVgDNz9qP/IGtAcRduRcNioH3E9v981QO1zt/Gpb2f8NqAjUUCUZzOnij6mx9
McZ+9cWX88CRzR0vQODWuZscgI08NvM69Fn2SQIDAQABo2MwYTAOBgNVHQ8BAf8E
BAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUc19g2LzLA5j0Kxc0LjZa
pmD/vB8wHwYDVR0jBBgwFoAUc19g2LzLA5j0Kxc0LjZapmD/vB8wDQYJKoZIhvcN
AQELBQADggEBAHAG7WTmyjzPRIM85rVj+fWHsLIvqpw6DObIjMWokpliCeMINZFV
ynfgBKsf1ExwbvJNzYFXW6dihnguDG9VMPpi2up/ctQTN8tm9nDKOy08uNZoofMc
NUZxKCEkVKZv+IL4oHoeayt8egtv3ujJM6V14AstMQ6SwvwvA93EP/Ug2e4WAXHu
cbI1NAbUgVDqp+DRdfvZkgYKryjTWd/0+1fS8X1bBZVWzl7eirNVnHbSH2ZDpNuY
0SBd8dj5F6ld3t58ydZbrTHze7JJOd8ijySAp4/kiu9UfZWuTPABzDa/DSdz9Dk/
zPW4CXXvhLmE02TA9/HeCw3KEHIwicNuEfw=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEEDCCAvigAwIBAgIJAKFMXyltvuRdMA0GCSqGSIb3DQEBCwUAMIGUMQswCQYD
VQQGEwJVUzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEi
MCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1h
em9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJEUyBCZXRhIFJvb3QgMjAxOSBDQTAe
Fw0xOTA4MTkxNzM4MjZaFw0yNDA4MTkxNzM4MjZaMIGUMQswCQYDVQQGEwJVUzEQ
MA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEiMCAGA1UECgwZ
QW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEl
MCMGA1UEAwwcQW1hem9uIFJEUyBCZXRhIFJvb3QgMjAxOSBDQTCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMkZdnIH9ndatGAcFo+DppGJ1HUt4x+zeO+0
ZZ29m0sfGetVulmTlv2d5b66e+QXZFWpcPQMouSxxYTW08TbrQiZngKr40JNXftA
atvzBqIImD4II0ZX5UEVj2h98qe/ypW5xaDN7fEa5e8FkYB1TEemPaWIbNXqchcL
tV7IJPr3Cd7Z5gZJlmujIVDPpMuSiNaal9/6nT9oqN+JSM1fx5SzrU5ssg1Vp1vv
5Xab64uOg7wCJRB9R2GC9XD04odX6VcxUAGrZo6LR64ZSifupo3l+R5sVOc5i8NH
skdboTzU9H7+oSdqoAyhIU717PcqeDum23DYlPE2nGBWckE+eT8CAwEAAaNjMGEw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFK2hDBWl
sbHzt/EHd0QYOooqcFPhMB8GA1UdIwQYMBaAFK2hDBWlsbHzt/EHd0QYOooqcFPh
MA0GCSqGSIb3DQEBCwUAA4IBAQAO/718k8EnOqJDx6wweUscGTGL/QdKXUzTVRAx
JUsjNUv49mH2HQVEW7oxszfH6cPCaupNAddMhQc4C/af6GHX8HnqfPDk27/yBQI+
yBBvIanGgxv9c9wBbmcIaCEWJcsLp3HzXSYHmjiqkViXwCpYfkoV3Ns2m8bp+KCO
y9XmcCKRaXkt237qmoxoh2sGmBHk2UlQtOsMC0aUQ4d7teAJG0q6pbyZEiPyKZY1
XR/UVxMJL0Q4iVpcRS1kaNCMfqS2smbLJeNdsan8pkw1dvPhcaVTb7CvjhJtjztF
YfDzAI5794qMlWxwilKMmUvDlPPOTen8NNHkLwWvyFCH7Doh
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEFjCCAv6gAwIBAgIJAMzYZJ+R9NBVMA0GCSqGSIb3DQEBCwUAMIGXMQswCQYD
VQQGEwJVUzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEi
MCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1h
em9uIFJEUzEoMCYGA1UEAwwfQW1hem9uIFJEUyBQcmV2aWV3IFJvb3QgMjAxOSBD
QTAeFw0xOTA4MjEyMjI5NDlaFw0yNDA4MjEyMjI5NDlaMIGXMQswCQYDVQQGEwJV
UzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEiMCAGA1UE
CgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJE
UzEoMCYGA1UEAwwfQW1hem9uIFJEUyBQcmV2aWV3IFJvb3QgMjAxOSBDQTCCASIw
DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM7kkS6vjgKKQTPynC2NjdN5aPPV
O71G0JJS/2ARVBVJd93JLiGovVJilfWYfwZCs4gTRSSjrUD4D4HyqCd6A+eEEtJq
M0DEC7i0dC+9WNTsPszuB206Jy2IUmxZMIKJAA1NHSbIMjB+b6/JhbSUi7nKdbR/
brj83bF+RoSA+ogrgX7mQbxhmFcoZN9OGaJgYKsKWUt5Wqv627KkGodUK8mDepgD
S3ZfoRQRx3iceETpcmHJvaIge6+vyDX3d9Z22jmvQ4AKv3py2CmU2UwuhOltFDwB
0ddtb39vgwrJxaGfiMRHpEP1DfNLWHAnA69/pgZPwIggidS+iBPUhgucMp8CAwEA
AaNjMGEwDgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYE
FGnTGpQuQ2H/DZlXMQijZEhjs7TdMB8GA1UdIwQYMBaAFGnTGpQuQ2H/DZlXMQij
ZEhjs7TdMA0GCSqGSIb3DQEBCwUAA4IBAQC3xz1vQvcXAfpcZlngiRWeqU8zQAMQ
LZPCFNv7PVk4pmqX+ZiIRo4f9Zy7TrOVcboCnqmP/b/mNq0gVF4O+88jwXJZD+f8
/RnABMZcnGU+vK0YmxsAtYU6TIb1uhRFmbF8K80HHbj9vSjBGIQdPCbvmR2zY6VJ
BYM+w9U9hp6H4DVMLKXPc1bFlKA5OBTgUtgkDibWJKFOEPW3UOYwp9uq6pFoN0AO
xMTldqWFsOF3bJIlvOY0c/1EFZXu3Ns6/oCP//Ap9vumldYMUZWmbK+gK33FPOXV
8BQ6jNC29icv7lLDpRPwjibJBXX+peDR5UK4FdYcswWEB1Tix5X8dYu6
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgZUxCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSYwJAYDVQQDDB1BbWF6b24gUkRTIGFmLXNvdXRoLTEgUm9vdCBDQTAeFw0xOTEw
MjgxODA2NTNaFw0yNDEwMjgxODA2NTNaMIGQMQswCQYDVQQGEwJVUzETMBEGA1UE
CAwKV2FzaGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9u
IFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEhMB8GA1UE
AwwYQW1hem9uIFJEUyBhZi1zb3V0aC0xIENBMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEAvtV1OqmFa8zCVQSKOvPUJERLVFtd4rZmDpImc5rIoeBk7w/P
9lcKUJjO8R/w1a2lJXx3oQ81tiY0Piw6TpT62YWVRMWrOw8+Vxq1dNaDSFp9I8d0
UHillSSbOk6FOrPDp+R6AwbGFqUDebbN5LFFoDKbhNmH1BVS0a6YNKpGigLRqhka
cClPslWtPqtjbaP3Jbxl26zWzLo7OtZl98dR225pq8aApNBwmtgA7Gh60HK/cX0t
32W94n8D+GKSg6R4MKredVFqRTi9hCCNUu0sxYPoELuM+mHiqB5NPjtm92EzCWs+
+vgWhMc6GxG+82QSWx1Vj8sgLqtE/vLrWddf5QIDAQABo2YwZDAOBgNVHQ8BAf8E
BAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUuLB4gYVJrSKJj/Gz
pqc6yeA+RcAwHwYDVR0jBBgwFoAUEEi/WWMcBJsoGXg+EZwkQ0MscZQwDQYJKoZI
hvcNAQELBQADggEBABauYOZxUhe9/RhzGJ8MsWCz8eKcyDVd4FCnY6Qh+9wcmYNT
LtnD88LACtJKb/b81qYzcB0Em6+zVJ3Z9jznfr6buItE6es9wAoja22Xgv44BTHL
rimbgMwpTt3uEMXDffaS0Ww6YWb3pSE0XYI2ISMWz+xRERRf+QqktSaL39zuiaW5
tfZMre+YhohRa/F0ZQl3RCd6yFcLx4UoSPqQsUl97WhYzwAxZZfwvLJXOc4ATt3u
VlCUylNDkaZztDJc/yN5XQoK9W5nOt2cLu513MGYKbuarQr8f+gYU8S+qOyuSRSP
NRITzwCRVnsJE+2JmcRInn/NcanB7uOGqTvJ9+c=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgZUxCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSYwJAYDVQQDDB1BbWF6b24gUkRTIGV1LXNvdXRoLTEgUm9vdCBDQTAeFw0xOTEw
MzAyMDIxMzBaFw0yNDEwMzAyMDIxMzBaMIGQMQswCQYDVQQGEwJVUzETMBEGA1UE
CAwKV2FzaGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9u
IFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEhMB8GA1UE
AwwYQW1hem9uIFJEUyBldS1zb3V0aC0xIENBMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEAtEyjYcajx6xImJn8Vz1zjdmL4ANPgQXwF7+tF7xccmNAZETb
bzb3I9i5fZlmrRaVznX+9biXVaGxYzIUIR3huQ3Q283KsDYnVuGa3mk690vhvJbB
QIPgKa5mVwJppnuJm78KqaSpi0vxyCPe3h8h6LLFawVyWrYNZ4okli1/U582eef8
RzJp/Ear3KgHOLIiCdPDF0rjOdCG1MOlDLixVnPn9IYOciqO+VivXBg+jtfc5J+L
AaPm0/Yx4uELt1tkbWkm4BvTU/gBOODnYziITZM0l6Fgwvbwgq5duAtKW+h031lC
37rEvrclqcp4wrsUYcLAWX79ZyKIlRxcAdvEhQIDAQABo2YwZDAOBgNVHQ8BAf8E
BAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQU7zPyc0azQxnBCe7D
b9KAadH1QSEwHwYDVR0jBBgwFoAUFBAFcgJe/BBuZiGeZ8STfpkgRYQwDQYJKoZI
hvcNAQELBQADggEBAFGaNiYxg7yC/xauXPlaqLCtwbm2dKyK9nIFbF/7be8mk7Q3
MOA0of1vGHPLVQLr6bJJpD9MAbUcm4cPAwWaxwcNpxOjYOFDaq10PCK4eRAxZWwF
NJRIRmGsl8NEsMNTMCy8X+Kyw5EzH4vWFl5Uf2bGKOeFg0zt43jWQVOX6C+aL3Cd
pRS5MhmYpxMG8irrNOxf4NVFE2zpJOCm3bn0STLhkDcV/ww4zMzObTJhiIb5wSWn
EXKKWhUXuRt7A2y1KJtXpTbSRHQxE++69Go1tWhXtRiULCJtf7wF2Ksm0RR/AdXT
1uR1vKyH5KBJPX3ppYkQDukoHTFR0CpB+G84NLo=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgZUxCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSYwJAYDVQQDDB1BbWF6b24gUkRTIG1lLXNvdXRoLTEgUm9vdCBDQTAeFw0xOTA1
MTAyMTU4NDNaFw0yNTA2MDExMjAwMDBaMIGQMQswCQYDVQQGEwJVUzETMBEGA1UE
CAwKV2FzaGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9u
IFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEhMB8GA1UE
AwwYQW1hem9uIFJEUyBtZS1zb3V0aC0xIENBMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEAudOYPZH+ihJAo6hNYMB5izPVBe3TYhnZm8+X3IoaaYiKtsp1
JJhkTT0CEejYIQ58Fh4QrMUyWvU8qsdK3diNyQRoYLbctsBPgxBR1u07eUJDv38/
C1JlqgHmMnMi4y68Iy7ymv50QgAMuaBqgEBRI1R6Lfbyrb2YvH5txjJyTVMwuCfd
YPAtZVouRz0JxmnfsHyxjE+So56uOKTDuw++Ho4HhZ7Qveej7XB8b+PIPuroknd3
FQB5RVbXRvt5ZcVD4F2fbEdBniF7FAF4dEiofVCQGQ2nynT7dZdEIPfPdH3n7ZmE
lAOmwHQ6G83OsiHRBLnbp+QZRgOsjkHJxT20bQIDAQABo2YwZDAOBgNVHQ8BAf8E
BAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUOEVDM7VomRH4HVdA
QvIMNq2tXOcwHwYDVR0jBBgwFoAU54cfDjgwBx4ycBH8+/r8WXdaiqYwDQYJKoZI
hvcNAQELBQADggEBAHhvMssj+Th8IpNePU6RH0BiL6o9c437R3Q4IEJeFdYL+nZz
PW/rELDPvLRUNMfKM+KzduLZ+l29HahxefejYPXtvXBlq/E/9czFDD4fWXg+zVou
uDXhyrV4kNmP4S0eqsAP/jQHPOZAMFA4yVwO9hlqmePhyDnszCh9c1PfJSBh49+b
4w7i/L3VBOMt8j3EKYvqz0gVfpeqhJwL4Hey8UbVfJRFJMJzfNHpePqtDRAY7yjV
PYquRaV2ab/E+/7VFkWMM4tazYz/qsYA2jSH+4xDHvYk8LnsbcrF9iuidQmEc5sb
FgcWaSKG4DJjcI5k7AJLWcXyTDt21Ci43LE+I9Q=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECDCCAvCgAwIBAgICVIYwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MDQxNzEz
MDRaFw0yNDA4MjIxNzA4NTBaMIGVMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEmMCQGA1UEAwwdQW1h
em9uIFJEUyBhcC1zb3V0aC0xIDIwMTkgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDUYOz1hGL42yUCrcsMSOoU8AeD/3KgZ4q7gP+vAz1WnY9K/kim
eWN/2Qqzlo3+mxSFQFyD4MyV3+CnCPnBl9Sh1G/F6kThNiJ7dEWSWBQGAB6HMDbC
BaAsmUc1UIz8sLTL3fO+S9wYhA63Wun0Fbm/Rn2yk/4WnJAaMZcEtYf6e0KNa0LM
p/kN/70/8cD3iz3dDR8zOZFpHoCtf0ek80QqTich0A9n3JLxR6g6tpwoYviVg89e
qCjQ4axxOkWWeusLeTJCcY6CkVyFvDAKvcUl1ytM5AiaUkXblE7zDFXRM4qMMRdt
lPm8d3pFxh0fRYk8bIKnpmtOpz3RIctDrZZxAgMBAAGjZjBkMA4GA1UdDwEB/wQE
AwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBT99wKJftD3jb4sHoHG
i3uGlH6W6TAfBgNVHSMEGDAWgBRzX2DYvMsDmPQrFzQuNlqmYP+8HzANBgkqhkiG
9w0BAQsFAAOCAQEAZ17hhr3dII3hUfuHQ1hPWGrpJOX/G9dLzkprEIcCidkmRYl+
hu1Pe3caRMh/17+qsoEErmnVq5jNY9X1GZL04IZH8YbHc7iRHw3HcWAdhN8633+K
jYEB2LbJ3vluCGnCejq9djDb6alOugdLMJzxOkHDhMZ6/gYbECOot+ph1tQuZXzD
tZ7prRsrcuPBChHlPjmGy8M9z8u+kF196iNSUGC4lM8vLkHM7ycc1/ZOwRq9aaTe
iOghbQQyAEe03MWCyDGtSmDfr0qEk+CHN+6hPiaL8qKt4s+V9P7DeK4iW08ny8Ox
AVS7u0OK/5+jKMAMrKwpYrBydOjTUTHScocyNw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBzCCAu+gAwIBAgICQ2QwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MDUxODQ2
MjlaFw0yNDA4MjIxNzA4NTBaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1h
em9uIFJEUyBzYS1lYXN0LTEgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAMMvR+ReRnOzqJzoaPipNTt1Z2VA968jlN1+SYKUrYM3No+Vpz0H
M6Tn0oYB66ByVsXiGc28ulsqX1HbHsxqDPwvQTKvO7SrmDokoAkjJgLocOLUAeld
5AwvUjxGRP6yY90NV7X786MpnYb2Il9DIIaV9HjCmPt+rjy2CZjS0UjPjCKNfB8J
bFjgW6GGscjeyGb/zFwcom5p4j0rLydbNaOr9wOyQrtt3ZQWLYGY9Zees/b8pmcc
Jt+7jstZ2UMV32OO/kIsJ4rMUn2r/uxccPwAc1IDeRSSxOrnFKhW3Cu69iB3bHp7
JbawY12g7zshE4I14sHjv3QoXASoXjx4xgMCAwEAAaNmMGQwDgYDVR0PAQH/BAQD
AgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFI1Fc/Ql2jx+oJPgBVYq
ccgP0pQ8MB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqGSIb3
DQEBCwUAA4IBAQB4VVVabVp70myuYuZ3vltQIWqSUMhkaTzehMgGcHjMf9iLoZ/I
93KiFUSGnek5cRePyS9wcpp0fcBT3FvkjpUdCjVtdttJgZFhBxgTd8y26ImdDDMR
4+BUuhI5msvjL08f+Vkkpu1GQcGmyFVPFOy/UY8iefu+QyUuiBUnUuEDd49Hw0Fn
/kIPII6Vj82a2mWV/Q8e+rgN8dIRksRjKI03DEoP8lhPlsOkhdwU6Uz9Vu6NOB2Q
Ls1kbcxAc7cFSyRVJEhh12Sz9d0q/CQSTFsVJKOjSNQBQfVnLz1GwO/IieUEAr4C
jkTntH0r1LX5b/GwN4R887LvjAEdTbg1his7
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECDCCAvCgAwIBAgIDAIkHMA0GCSqGSIb3DQEBCwUAMIGPMQswCQYDVQQGEwJV
UzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEiMCAGA1UE
CgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJE
UzEgMB4GA1UEAwwXQW1hem9uIFJEUyBSb290IDIwMTkgQ0EwHhcNMTkwOTA2MTc0
MDIxWhcNMjQwODIyMTcwODUwWjCBlDELMAkGA1UEBhMCVVMxEzARBgNVBAgMCldh
c2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoMGUFtYXpvbiBXZWIg
U2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxJTAjBgNVBAMMHEFt
YXpvbiBSRFMgdXMtd2VzdC0xIDIwMTkgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDD2yzbbAl77OofTghDMEf624OvU0eS9O+lsdO0QlbfUfWa1Kd6
0WkgjkLZGfSRxEHMCnrv4UPBSK/Qwn6FTjkDLgemhqBtAnplN4VsoDL+BkRX4Wwq
/dSQJE2b+0hm9w9UMVGFDEq1TMotGGTD2B71eh9HEKzKhGzqiNeGsiX4VV+LJzdH
uM23eGisNqmd4iJV0zcAZ+Gbh2zK6fqTOCvXtm7Idccv8vZZnyk1FiWl3NR4WAgK
AkvWTIoFU3Mt7dIXKKClVmvssG8WHCkd3Xcb4FHy/G756UZcq67gMMTX/9fOFM/v
l5C0+CHl33Yig1vIDZd+fXV1KZD84dEJfEvHAgMBAAGjZjBkMA4GA1UdDwEB/wQE
AwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBR+ap20kO/6A7pPxo3+
T3CfqZpQWjAfBgNVHSMEGDAWgBRzX2DYvMsDmPQrFzQuNlqmYP+8HzANBgkqhkiG
9w0BAQsFAAOCAQEAHCJky2tPjPttlDM/RIqExupBkNrnSYnOK4kr9xJ3sl8UF2DA
PAnYsjXp3rfcjN/k/FVOhxwzi3cXJF/2Tjj39Bm/OEfYTOJDNYtBwB0VVH4ffa/6
tZl87jaIkrxJcreeeHqYMnIxeN0b/kliyA+a5L2Yb0VPjt9INq34QDc1v74FNZ17
4z8nr1nzg4xsOWu0Dbjo966lm4nOYIGBRGOKEkHZRZ4mEiMgr3YLkv8gSmeitx57
Z6dVemNtUic/LVo5Iqw4n3TBS0iF2C1Q1xT/s3h+0SXZlfOWttzSluDvoMv5PvCd
pFjNn+aXLAALoihL1MJSsxydtsLjOBro5eK0Vw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEDDCCAvSgAwIBAgICOFAwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTAxNzQ2
MjFaFw0yNDA4MjIxNzA4NTBaMIGZMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEqMCgGA1UEAwwhQW1h
em9uIFJEUyBhcC1ub3J0aGVhc3QtMiAyMDE5IENBMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAzU72e6XbaJbi4HjJoRNjKxzUEuChKQIt7k3CWzNnmjc5
8I1MjCpa2W1iw1BYVysXSNSsLOtUsfvBZxi/1uyMn5ZCaf9aeoA9UsSkFSZBjOCN
DpKPCmfV1zcEOvJz26+1m8WDg+8Oa60QV0ou2AU1tYcw98fOQjcAES0JXXB80P2s
3UfkNcnDz+l4k7j4SllhFPhH6BQ4lD2NiFAP4HwoG6FeJUn45EPjzrydxjq6v5Fc
cQ8rGuHADVXotDbEhaYhNjIrsPL+puhjWfhJjheEw8c4whRZNp6gJ/b6WEes/ZhZ
h32DwsDsZw0BfRDUMgUn8TdecNexHUw8vQWeC181hwIDAQABo2YwZDAOBgNVHQ8B
Af8EBAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUwW9bWgkWkr0U
lrOsq2kvIdrECDgwHwYDVR0jBBgwFoAUc19g2LzLA5j0Kxc0LjZapmD/vB8wDQYJ
KoZIhvcNAQELBQADggEBAEugF0Gj7HVhX0ehPZoGRYRt3PBuI2YjfrrJRTZ9X5wc
9T8oHmw07mHmNy1qqWvooNJg09bDGfB0k5goC2emDiIiGfc/kvMLI7u+eQOoMKj6
mkfCncyRN3ty08Po45vTLBFZGUvtQmjM6yKewc4sXiASSBmQUpsMbiHRCL72M5qV
obcJOjGcIdDTmV1BHdWT+XcjynsGjUqOvQWWhhLPrn4jWe6Xuxll75qlrpn3IrIx
CRBv/5r7qbcQJPOgwQsyK4kv9Ly8g7YT1/vYBlR3cRsYQjccw5ceWUj2DrMVWhJ4
prf+E3Aa4vYmLLOUUvKnDQ1k3RGNu56V0tonsQbfsaM=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECjCCAvKgAwIBAgICEzUwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTAyMDUy
MjVaFw0yNDA4MjIxNzA4NTBaMIGXMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEoMCYGA1UEAwwfQW1h
em9uIFJEUyBjYS1jZW50cmFsLTEgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBAOxHqdcPSA2uBjsCP4DLSlqSoPuQ/X1kkJLusVRKiQE2zayB
viuCBt4VB9Qsh2rW3iYGM+usDjltGnI1iUWA5KHcvHszSMkWAOYWLiMNKTlg6LCp
XnE89tvj5dIH6U8WlDvXLdjB/h30gW9JEX7S8supsBSci2GxEzb5mRdKaDuuF/0O
qvz4YE04pua3iZ9QwmMFuTAOYzD1M72aOpj+7Ac+YLMM61qOtU+AU6MndnQkKoQi
qmUN2A9IFaqHFzRlSdXwKCKUA4otzmz+/N3vFwjb5F4DSsbsrMfjeHMo6o/nb6Nh
YDb0VJxxPee6TxSuN7CQJ2FxMlFUezcoXqwqXD0CAwEAAaNmMGQwDgYDVR0PAQH/
BAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFDGGpon9WfIpsggE
CxHq8hZ7E2ESMB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqG
SIb3DQEBCwUAA4IBAQAvpeQYEGZvoTVLgV9rd2+StPYykMsmFjWQcyn3dBTZRXC2
lKq7QhQczMAOhEaaN29ZprjQzsA2X/UauKzLR2Uyqc2qOeO9/YOl0H3qauo8C/W9
r8xqPbOCDLEXlOQ19fidXyyEPHEq5WFp8j+fTh+s8WOx2M7IuC0ANEetIZURYhSp
xl9XOPRCJxOhj7JdelhpweX0BJDNHeUFi0ClnFOws8oKQ7sQEv66d5ddxqqZ3NVv
RbCvCtEutQMOUMIuaygDlMn1anSM8N7Wndx8G6+Uy67AnhjGx7jw/0YPPxopEj6x
JXP8j0sJbcT9K/9/fPVLNT25RvQ/93T2+IQL4Ca2
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBzCCAu+gAwIBAgICYpgwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTExNzMx
NDhaFw0yNDA4MjIxNzA4NTBaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1h
em9uIFJEUyBldS13ZXN0LTEgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAMk3YdSZ64iAYp6MyyKtYJtNzv7zFSnnNf6vv0FB4VnfITTMmOyZ
LXqKAT2ahZ00hXi34ewqJElgU6eUZT/QlzdIu359TEZyLVPwURflL6SWgdG01Q5X
O++7fSGcBRyIeuQWs9FJNIIqK8daF6qw0Rl5TXfu7P9dBc3zkgDXZm2DHmxGDD69
7liQUiXzoE1q2Z9cA8+jirDioJxN9av8hQt12pskLQumhlArsMIhjhHRgF03HOh5
tvi+RCfihVOxELyIRTRpTNiIwAqfZxxTWFTgfn+gijTmd0/1DseAe82aYic8JbuS
EMbrDduAWsqrnJ4GPzxHKLXX0JasCUcWyMECAwEAAaNmMGQwDgYDVR0PAQH/BAQD
AgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFPLtsq1NrwJXO13C9eHt
sLY11AGwMB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqGSIb3
DQEBCwUAA4IBAQAnWBKj5xV1A1mYd0kIgDdkjCwQkiKF5bjIbGkT3YEFFbXoJlSP
0lZZ/hDaOHI8wbLT44SzOvPEEmWF9EE7SJzkvSdQrUAWR9FwDLaU427ALI3ngNHy
lGJ2hse1fvSRNbmg8Sc9GBv8oqNIBPVuw+AJzHTacZ1OkyLZrz1c1QvwvwN2a+Jd
vH0V0YIhv66llKcYDMUQJAQi4+8nbRxXWv6Gq3pvrFoorzsnkr42V3JpbhnYiK+9
nRKd4uWl62KRZjGkfMbmsqZpj2fdSWMY1UGyN1k+kDmCSWYdrTRDP0xjtIocwg+A
J116n4hV/5mbA0BaPiS2krtv17YAeHABZcvz
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECjCCAvKgAwIBAgICV2YwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTExOTM2
MjBaFw0yNDA4MjIxNzA4NTBaMIGXMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEoMCYGA1UEAwwfQW1h
em9uIFJEUyBldS1jZW50cmFsLTEgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBAMEx54X2pHVv86APA0RWqxxRNmdkhAyp2R1cFWumKQRofoFv
n+SPXdkpIINpMuEIGJANozdiEz7SPsrAf8WHyD93j/ZxrdQftRcIGH41xasetKGl
I67uans8d+pgJgBKGb/Z+B5m+UsIuEVekpvgpwKtmmaLFC/NCGuSsJoFsRqoa6Gh
m34W6yJoY87UatddCqLY4IIXaBFsgK9Q/wYzYLbnWM6ZZvhJ52VMtdhcdzeTHNW0
5LGuXJOF7Ahb4JkEhoo6TS2c0NxB4l4MBfBPgti+O7WjR3FfZHpt18A6Zkq6A2u6
D/oTSL6c9/3sAaFTFgMyL3wHb2YlW0BPiljZIqECAwEAAaNmMGQwDgYDVR0PAQH/
BAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFOcAToAc6skWffJa
TnreaswAfrbcMB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqG
SIb3DQEBCwUAA4IBAQA1d0Whc1QtspK496mFWfFEQNegLh0a9GWYlJm+Htcj5Nxt
DAIGXb+8xrtOZFHmYP7VLCT5Zd2C+XytqseK/+s07iAr0/EPF+O2qcyQWMN5KhgE
cXw2SwuP9FPV3i+YAm11PBVeenrmzuk9NrdHQ7TxU4v7VGhcsd2C++0EisrmquWH
mgIfmVDGxphwoES52cY6t3fbnXmTkvENvR+h3rj+fUiSz0aSo+XZUGHPgvuEKM/W
CBD9Smc9CBoBgvy7BgHRgRUmwtABZHFUIEjHI5rIr7ZvYn+6A0O6sogRfvVYtWFc
qpyrW1YX8mD0VlJ8fGKM3G+aCOsiiPKDV/Uafrm+
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECDCCAvCgAwIBAgICGAcwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTIxODE5
NDRaFw0yNDA4MjIxNzA4NTBaMIGVMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEmMCQGA1UEAwwdQW1h
em9uIFJEUyBldS1ub3J0aC0xIDIwMTkgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQCiIYnhe4UNBbdBb/nQxl5giM0XoVHWNrYV5nB0YukA98+TPn9v
Aoj1RGYmtryjhrf01Kuv8SWO+Eom95L3zquoTFcE2gmxCfk7bp6qJJ3eHOJB+QUO
XsNRh76fwDzEF1yTeZWH49oeL2xO13EAx4PbZuZpZBttBM5zAxgZkqu4uWQczFEs
JXfla7z2fvWmGcTagX10O5C18XaFroV0ubvSyIi75ue9ykg/nlFAeB7O0Wxae88e
uhiBEFAuLYdqWnsg3459NfV8Yi1GnaitTym6VI3tHKIFiUvkSiy0DAlAGV2iiyJE
q+DsVEO4/hSINJEtII4TMtysOsYPpINqeEzRAgMBAAGjZjBkMA4GA1UdDwEB/wQE
AwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBRR0UpnbQyjnHChgmOc
hnlc0PogzTAfBgNVHSMEGDAWgBRzX2DYvMsDmPQrFzQuNlqmYP+8HzANBgkqhkiG
9w0BAQsFAAOCAQEAKJD4xVzSf4zSGTBJrmamo86jl1NHQxXUApAZuBZEc8tqC6TI
T5CeoSr9CMuVC8grYyBjXblC4OsM5NMvmsrXl/u5C9dEwtBFjo8mm53rOOIm1fxl
I1oYB/9mtO9ANWjkykuLzWeBlqDT/i7ckaKwalhLODsRDO73vRhYNjsIUGloNsKe
pxw3dzHwAZx4upSdEVG4RGCZ1D0LJ4Gw40OfD69hfkDfRVVxKGrbEzqxXRvovmDc
tKLdYZO/6REoca36v4BlgIs1CbUXJGLSXUwtg7YXGLSVBJ/U0+22iGJmBSNcoyUN
cjPFD9JQEhDDIYYKSGzIYpvslvGc4T5ISXFiuQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBzCCAu+gAwIBAgICZIEwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTIyMTMy
MzJaFw0yNDA4MjIxNzA4NTBaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1h
em9uIFJEUyBldS13ZXN0LTIgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBALGiwqjiF7xIjT0Sx7zB3764K2T2a1DHnAxEOr+/EIftWKxWzT3u
PFwS2eEZcnKqSdRQ+vRzonLBeNLO4z8aLjQnNbkizZMBuXGm4BqRm1Kgq3nlLDQn
7YqdijOq54SpShvR/8zsO4sgMDMmHIYAJJOJqBdaus2smRt0NobIKc0liy7759KB
6kmQ47Gg+kfIwxrQA5zlvPLeQImxSoPi9LdbRoKvu7Iot7SOa+jGhVBh3VdqndJX
7tm/saj4NE375csmMETFLAOXjat7zViMRwVorX4V6AzEg1vkzxXpA9N7qywWIT5Y
fYaq5M8i6vvLg0CzrH9fHORtnkdjdu1y+0MCAwEAAaNmMGQwDgYDVR0PAQH/BAQD
AgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFFOhOx1yt3Z7mvGB9jBv
2ymdZwiOMB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqGSIb3
DQEBCwUAA4IBAQBehqY36UGDvPVU9+vtaYGr38dBbp+LzkjZzHwKT1XJSSUc2wqM
hnCIQKilonrTIvP1vmkQi8qHPvDRtBZKqvz/AErW/ZwQdZzqYNFd+BmOXaeZWV0Q
oHtDzXmcwtP8aUQpxN0e1xkWb1E80qoy+0uuRqb/50b/R4Q5qqSfJhkn6z8nwB10
7RjLtJPrK8igxdpr3tGUzfAOyiPrIDncY7UJaL84GFp7WWAkH0WG3H8Y8DRcRXOU
mqDxDLUP3rNuow3jnGxiUY+gGX5OqaZg4f4P6QzOSmeQYs6nLpH0PiN00+oS1BbD
bpWdZEttILPI+vAYkU4QuBKKDjJL6HbSd+cn
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECDCCAvCgAwIBAgIDAIVCMA0GCSqGSIb3DQEBCwUAMIGPMQswCQYDVQQGEwJV
UzEQMA4GA1UEBwwHU2VhdHRsZTETMBEGA1UECAwKV2FzaGluZ3RvbjEiMCAGA1UE
CgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJE
UzEgMB4GA1UEAwwXQW1hem9uIFJEUyBSb290IDIwMTkgQ0EwHhcNMTkwOTEzMTcw
NjQxWhcNMjQwODIyMTcwODUwWjCBlDELMAkGA1UEBhMCVVMxEzARBgNVBAgMCldh
c2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoMGUFtYXpvbiBXZWIg
U2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxJTAjBgNVBAMMHEFt
YXpvbiBSRFMgdXMtZWFzdC0yIDIwMTkgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDE+T2xYjUbxOp+pv+gRA3FO24+1zCWgXTDF1DHrh1lsPg5k7ht
2KPYzNc+Vg4E+jgPiW0BQnA6jStX5EqVh8BU60zELlxMNvpg4KumniMCZ3krtMUC
au1NF9rM7HBh+O+DYMBLK5eSIVt6lZosOb7bCi3V6wMLA8YqWSWqabkxwN4w0vXI
8lu5uXXFRemHnlNf+yA/4YtN4uaAyd0ami9+klwdkZfkrDOaiy59haOeBGL8EB/c
dbJJlguHH5CpCscs3RKtOOjEonXnKXldxarFdkMzi+aIIjQ8GyUOSAXHtQHb3gZ4
nS6Ey0CMlwkB8vUObZU9fnjKJcL5QCQqOfwvAgMBAAGjZjBkMA4GA1UdDwEB/wQE
AwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBQUPuRHohPxx4VjykmH
6usGrLL1ETAfBgNVHSMEGDAWgBRzX2DYvMsDmPQrFzQuNlqmYP+8HzANBgkqhkiG
9w0BAQsFAAOCAQEAUdR9Vb3y33Yj6X6KGtuthZ08SwjImVQPtknzpajNE5jOJAh8
quvQnU9nlnMO85fVDU1Dz3lLHGJ/YG1pt1Cqq2QQ200JcWCvBRgdvH6MjHoDQpqZ
HvQ3vLgOGqCLNQKFuet9BdpsHzsctKvCVaeBqbGpeCtt3Hh/26tgx0rorPLw90A2
V8QSkZJjlcKkLa58N5CMM8Xz8KLWg3MZeT4DmlUXVCukqK2RGuP2L+aME8dOxqNv
OnOz1zrL5mR2iJoDpk8+VE/eBDmJX40IJk6jBjWoxAO/RXq+vBozuF5YHN1ujE92
tO8HItgTp37XT8bJBAiAnt5mxw+NLSqtxk2QdQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEDDCCAvSgAwIBAgICY4kwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTMyMDEx
NDJaFw0yNDA4MjIxNzA4NTBaMIGZMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEqMCgGA1UEAwwhQW1h
em9uIFJEUyBhcC1zb3V0aGVhc3QtMSAyMDE5IENBMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAr5u9OuLL/OF/fBNUX2kINJLzFl4DnmrhnLuSeSnBPgbb
qddjf5EFFJBfv7IYiIWEFPDbDG5hoBwgMup5bZDbas+ZTJTotnnxVJTQ6wlhTmns
eHECcg2pqGIKGrxZfbQhlj08/4nNAPvyYCTS0bEcmQ1emuDPyvJBYDDLDU6AbCB5
6Z7YKFQPTiCBblvvNzchjLWF9IpkqiTsPHiEt21sAdABxj9ityStV3ja/W9BfgxH
wzABSTAQT6FbDwmQMo7dcFOPRX+hewQSic2Rn1XYjmNYzgEHisdUsH7eeXREAcTw
61TRvaLH8AiOWBnTEJXPAe6wYfrcSd1pD0MXpoB62wIDAQABo2YwZDAOBgNVHQ8B
Af8EBAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUytwMiomQOgX5
Ichd+2lDWRUhkikwHwYDVR0jBBgwFoAUc19g2LzLA5j0Kxc0LjZapmD/vB8wDQYJ
KoZIhvcNAQELBQADggEBACf6lRDpfCD7BFRqiWM45hqIzffIaysmVfr+Jr+fBTjP
uYe/ba1omSrNGG23bOcT9LJ8hkQJ9d+FxUwYyICQNWOy6ejicm4z0C3VhphbTPqj
yjpt9nG56IAcV8BcRJh4o/2IfLNzC/dVuYJV8wj7XzwlvjysenwdrJCoLadkTr1h
eIdG6Le07sB9IxrGJL9e04afk37h7c8ESGSE4E+oS4JQEi3ATq8ne1B9DQ9SasXi
IRmhNAaISDzOPdyLXi9N9V9Lwe/DHcja7hgLGYx3UqfjhLhOKwp8HtoZORixAmOI
HfILgNmwyugAbuZoCazSKKBhQ0wgO0WZ66ZKTMG8Oho=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBzCCAu+gAwIBAgICUYkwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTYxODIx
MTVaFw0yNDA4MjIxNzA4NTBaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1h
em9uIFJEUyB1cy13ZXN0LTIgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBANCEZBZyu6yJQFZBJmSUZfSZd3Ui2gitczMKC4FLr0QzkbxY+cLa
uVONIOrPt4Rwi+3h/UdnUg917xao3S53XDf1TDMFEYp4U8EFPXqCn/GXBIWlU86P
PvBN+gzw3nS+aco7WXb+woTouvFVkk8FGU7J532llW8o/9ydQyDIMtdIkKTuMfho
OiNHSaNc+QXQ32TgvM9A/6q7ksUoNXGCP8hDOkSZ/YOLiI5TcdLh/aWj00ziL5bj
pvytiMZkilnc9dLY9QhRNr0vGqL0xjmWdoEXz9/OwjmCihHqJq+20MJPsvFm7D6a
2NKybR9U+ddrjb8/iyLOjURUZnj5O+2+OPcCAwEAAaNmMGQwDgYDVR0PAQH/BAQD
AgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFEBxMBdv81xuzqcK5TVu
pHj+Aor8MB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqGSIb3
DQEBCwUAA4IBAQBZkfiVqGoJjBI37aTlLOSjLcjI75L5wBrwO39q+B4cwcmpj58P
3sivv+jhYfAGEbQnGRzjuFoyPzWnZ1DesRExX+wrmHsLLQbF2kVjLZhEJMHF9eB7
GZlTPdTzHErcnuXkwA/OqyXMpj9aghcQFuhCNguEfnROY9sAoK2PTfnTz9NJHL+Q
UpDLEJEUfc0GZMVWYhahc0x38ZnSY2SKacIPECQrTI0KpqZv/P+ijCEcMD9xmYEb
jL4en+XKS1uJpw5fIU5Sj0MxhdGstH6S84iAE5J3GM3XHklGSFwwqPYvuTXvANH6
uboynxRgSae59jIlAK6Jrr6GWMwQRbgcaAlW
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEDDCCAvSgAwIBAgICEkYwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTYxOTUz
NDdaFw0yNDA4MjIxNzA4NTBaMIGZMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEqMCgGA1UEAwwhQW1h
em9uIFJEUyBhcC1zb3V0aGVhc3QtMiAyMDE5IENBMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAufodI2Flker8q7PXZG0P0vmFSlhQDw907A6eJuF/WeMo
GHnll3b4S6nC3oRS3nGeRMHbyU2KKXDwXNb3Mheu+ox+n5eb/BJ17eoj9HbQR1cd
gEkIciiAltf8gpMMQH4anP7TD+HNFlZnP7ii3geEJB2GGXSxgSWvUzH4etL67Zmn
TpGDWQMB0T8lK2ziLCMF4XAC/8xDELN/buHCNuhDpxpPebhct0T+f6Arzsiswt2j
7OeNeLLZwIZvVwAKF7zUFjC6m7/VmTQC8nidVY559D6l0UhhU0Co/txgq3HVsMOH
PbxmQUwJEKAzQXoIi+4uZzHFZrvov/nDTNJUhC6DqwIDAQABo2YwZDAOBgNVHQ8B
Af8EBAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUwaZpaCme+EiV
M5gcjeHZSTgOn4owHwYDVR0jBBgwFoAUc19g2LzLA5j0Kxc0LjZapmD/vB8wDQYJ
KoZIhvcNAQELBQADggEBAAR6a2meCZuXO2TF9bGqKGtZmaah4pH2ETcEVUjkvXVz
sl+ZKbYjrun+VkcMGGKLUjS812e7eDF726ptoku9/PZZIxlJB0isC/0OyixI8N4M
NsEyvp52XN9QundTjkl362bomPnHAApeU0mRbMDRR2JdT70u6yAzGLGsUwMkoNnw
1VR4XKhXHYGWo7KMvFrZ1KcjWhubxLHxZWXRulPVtGmyWg/MvE6KF+2XMLhojhUL
+9jB3Fpn53s6KMx5tVq1x8PukHmowcZuAF8k+W4gk8Y68wIwynrdZrKRyRv6CVtR
FZ8DeJgoNZT3y/GT254VqMxxfuy2Ccb/RInd16tEvVk=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEDDCCAvSgAwIBAgICOYIwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTcyMDA1
MjlaFw0yNDA4MjIxNzA4NTBaMIGZMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEqMCgGA1UEAwwhQW1h
em9uIFJEUyBhcC1ub3J0aGVhc3QtMyAyMDE5IENBMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEA4dMak8W+XW8y/2F6nRiytFiA4XLwePadqWebGtlIgyCS
kbug8Jv5w7nlMkuxOxoUeD4WhI6A9EkAn3r0REM/2f0aYnd2KPxeqS2MrtdxxHw1
xoOxk2x0piNSlOz6yog1idsKR5Wurf94fvM9FdTrMYPPrDabbGqiBMsZZmoHLvA3
Z+57HEV2tU0Ei3vWeGIqnNjIekS+E06KhASxrkNU5vi611UsnYZlSi0VtJsH4UGV
LhnHl53aZL0YFO5mn/fzuNG/51qgk/6EFMMhaWInXX49Dia9FnnuWXwVwi6uX1Wn
7kjoHi5VtmC8ZlGEHroxX2DxEr6bhJTEpcLMnoQMqwIDAQABo2YwZDAOBgNVHQ8B
Af8EBAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUsUI5Cb3SWB8+
gv1YLN/ABPMdxSAwHwYDVR0jBBgwFoAUc19g2LzLA5j0Kxc0LjZapmD/vB8wDQYJ
KoZIhvcNAQELBQADggEBAJAF3E9PM1uzVL8YNdzb6fwJrxxqI2shvaMVmC1mXS+w
G0zh4v2hBZOf91l1EO0rwFD7+fxoI6hzQfMxIczh875T6vUXePKVOCOKI5wCrDad
zQbVqbFbdhsBjF4aUilOdtw2qjjs9JwPuB0VXN4/jY7m21oKEOcnpe36+7OiSPjN
xngYewCXKrSRqoj3mw+0w/+exYj3Wsush7uFssX18av78G+ehKPIVDXptOCP/N7W
8iKVNeQ2QGTnu2fzWsGUSvMGyM7yqT+h1ILaT//yQS8er511aHMLc142bD4D9VSy
DgactwPDTShK/PXqhvNey9v/sKXm4XatZvwcc8KYlW4=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEDDCCAvSgAwIBAgICcEUwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTgxNjU2
MjBaFw0yNDA4MjIxNzA4NTBaMIGZMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEqMCgGA1UEAwwhQW1h
em9uIFJEUyBhcC1ub3J0aGVhc3QtMSAyMDE5IENBMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAndtkldmHtk4TVQAyqhAvtEHSMb6pLhyKrIFved1WO3S7
+I+bWwv9b2W/ljJxLq9kdT43bhvzonNtI4a1LAohS6bqyirmk8sFfsWT3akb+4Sx
1sjc8Ovc9eqIWJCrUiSvv7+cS7ZTA9AgM1PxvHcsqrcUXiK3Jd/Dax9jdZE1e15s
BEhb2OEPE+tClFZ+soj8h8Pl2Clo5OAppEzYI4LmFKtp1X/BOf62k4jviXuCSst3
UnRJzE/CXtjmN6oZySVWSe0rQYuyqRl6//9nK40cfGKyxVnimB8XrrcxUN743Vud
QQVU0Esm8OVTX013mXWQXJHP2c0aKkog8LOga0vobQIDAQABo2YwZDAOBgNVHQ8B
Af8EBAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQULmoOS1mFSjj+
snUPx4DgS3SkLFYwHwYDVR0jBBgwFoAUc19g2LzLA5j0Kxc0LjZapmD/vB8wDQYJ
KoZIhvcNAQELBQADggEBAAkVL2P1M2/G9GM3DANVAqYOwmX0Xk58YBHQu6iiQg4j
b4Ky/qsZIsgT7YBsZA4AOcPKQFgGTWhe9pvhmXqoN3RYltN8Vn7TbUm/ZVDoMsrM
gwv0+TKxW1/u7s8cXYfHPiTzVSJuOogHx99kBW6b2f99GbP7O1Sv3sLq4j6lVvBX
Fiacf5LAWC925nvlTzLlBgIc3O9xDtFeAGtZcEtxZJ4fnGXiqEnN4539+nqzIyYq
nvlgCzyvcfRAxwltrJHuuRu6Maw5AGcd2Y0saMhqOVq9KYKFKuD/927BTrbd2JVf
2sGWyuPZPCk3gq+5pCjbD0c6DkhcMGI6WwxvM5V/zSM=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBzCCAu+gAwIBAgICJDQwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTgxNzAz
MTVaFw0yNDA4MjIxNzA4NTBaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1h
em9uIFJEUyBldS13ZXN0LTMgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAL9bL7KE0n02DLVtlZ2PL+g/BuHpMYFq2JnE2RgompGurDIZdjmh
1pxfL3nT+QIVMubuAOy8InRfkRxfpxyjKYdfLJTPJG+jDVL+wDcPpACFVqoV7Prg
pVYEV0lc5aoYw4bSeYFhdzgim6F8iyjoPnObjll9mo4XsHzSoqJLCd0QC+VG9Fw2
q+GDRZrLRmVM2oNGDRbGpGIFg77aRxRapFZa8SnUgs2AqzuzKiprVH5i0S0M6dWr
i+kk5epmTtkiDHceX+dP/0R1NcnkCPoQ9TglyXyPdUdTPPRfKCq12dftqll+u4mV
ARdN6WFjovxax8EAP2OAUTi1afY+1JFMj+sCAwEAAaNmMGQwDgYDVR0PAQH/BAQD
AgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFLfhrbrO5exkCVgxW0x3
Y2mAi8lNMB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqGSIb3
DQEBCwUAA4IBAQAigQ5VBNGyw+OZFXwxeJEAUYaXVoP/qrhTOJ6mCE2DXUVEoJeV
SxScy/TlFA9tJXqmit8JH8VQ/xDL4ubBfeMFAIAo4WzNWDVoeVMqphVEcDWBHsI1
AETWzfsapRS9yQekOMmxg63d/nV8xewIl8aNVTHdHYXMqhhik47VrmaVEok1UQb3
O971RadLXIEbVd9tjY5bMEHm89JsZDnDEw1hQXBb67Elu64OOxoKaHBgUH8AZn/2
zFsL1ynNUjOhCSAA15pgd1vjwc0YsBbAEBPcHBWYBEyME6NLNarjOzBl4FMtATSF
wWCKRGkvqN8oxYhwR2jf2rR5Mu4DWkK5Q8Ep
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBzCCAu+gAwIBAgICJVUwDQYJKoZIhvcNAQELBQAwgY8xCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSAwHgYDVQQDDBdBbWF6b24gUkRTIFJvb3QgMjAxOSBDQTAeFw0xOTA5MTkxODE2
NTNaFw0yNDA4MjIxNzA4NTBaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2Fz
aGluZ3RvbjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBT
ZXJ2aWNlcywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1h
em9uIFJEUyB1cy1lYXN0LTEgMjAxOSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAM3i/k2u6cqbMdcISGRvh+m+L0yaSIoOXjtpNEoIftAipTUYoMhL
InXGlQBVA4shkekxp1N7HXe1Y/iMaPEyb3n+16pf3vdjKl7kaSkIhjdUz3oVUEYt
i8Z/XeJJ9H2aEGuiZh3kHixQcZczn8cg3dA9aeeyLSEnTkl/npzLf//669Ammyhs
XcAo58yvT0D4E0D/EEHf2N7HRX7j/TlyWvw/39SW0usiCrHPKDLxByLojxLdHzso
QIp/S04m+eWn6rmD+uUiRteN1hI5ncQiA3wo4G37mHnUEKo6TtTUh+sd/ku6a8HK
glMBcgqudDI90s1OpuIAWmuWpY//8xEG2YECAwEAAaNmMGQwDgYDVR0PAQH/BAQD
AgEGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFPqhoWZcrVY9mU7tuemR
RBnQIj1jMB8GA1UdIwQYMBaAFHNfYNi8ywOY9CsXNC42WqZg/7wfMA0GCSqGSIb3
DQEBCwUAA4IBAQB6zOLZ+YINEs72heHIWlPZ8c6WY8MDU+Be5w1M+BK2kpcVhCUK
PJO4nMXpgamEX8DIiaO7emsunwJzMSvavSPRnxXXTKIc0i/g1EbiDjnYX9d85DkC
E1LaAUCmCZBVi9fIe0H2r9whIh4uLWZA41oMnJx/MOmo3XyMfQoWcqaSFlMqfZM4
0rNoB/tdHLNuV4eIdaw2mlHxdWDtF4oH+HFm+2cVBUVC1jXKrFv/euRVtsTT+A6i
h2XBHKxQ1Y4HgAn0jACP2QSPEmuoQEIa57bEKEcZsBR8SDY6ZdTd2HLRIApcCOSF
MRM8CKLeF658I0XgF8D5EsYoKPsA+74Z+jDH
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEETCCAvmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgZQxCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSUwIwYDVQQDDBxBbWF6b24gUkRTIEJldGEgUm9vdCAyMDE5IENBMB4XDTE5MDgy
MDE3MTAwN1oXDTI0MDgxOTE3MzgyNlowgZkxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
DApXYXNoaW5ndG9uMRAwDgYDVQQHDAdTZWF0dGxlMSIwIAYDVQQKDBlBbWF6b24g
V2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMSowKAYDVQQD
DCFBbWF6b24gUkRTIEJldGEgdXMtZWFzdC0xIDIwMTkgQ0EwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQDTNCOlotQcLP8TP82U2+nk0bExVuuMVOgFeVMx
vbUHZQeIj9ikjk+jm6eTDnnkhoZcmJiJgRy+5Jt69QcRbb3y3SAU7VoHgtraVbxF
QDh7JEHI9tqEEVOA5OvRrDRcyeEYBoTDgh76ROco2lR+/9uCvGtHVrMCtG7BP7ZB
sSVNAr1IIRZZqKLv2skKT/7mzZR2ivcw9UeBBTUf8xsfiYVBvMGoEsXEycjYdf6w
WV+7XS7teNOc9UgsFNN+9AhIBc1jvee5E//72/4F8pAttAg/+mmPUyIKtekNJ4gj
OAR2VAzGx1ybzWPwIgOudZFHXFduxvq4f1hIRPH0KbQ/gkRrAgMBAAGjZjBkMA4G
A1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBTkvpCD
6C43rar9TtJoXr7q8dkrrjAfBgNVHSMEGDAWgBStoQwVpbGx87fxB3dEGDqKKnBT
4TANBgkqhkiG9w0BAQsFAAOCAQEAJd9fOSkwB3uVdsS+puj6gCER8jqmhd3g/J5V
Zjk9cKS8H0e8pq/tMxeJ8kpurPAzUk5RkCspGt2l0BSwmf3ahr8aJRviMX6AuW3/
g8aKplTvq/WMNGKLXONa3Sq8591J+ce8gtOX/1rDKmFI4wQ/gUzOSYiT991m7QKS
Fr6HMgFuz7RNJbb3Fy5cnurh8eYWA7mMv7laiLwTNsaro5qsqErD5uXuot6o9beT
a+GiKinEur35tNxAr47ax4IRubuIzyfCrezjfKc5raVV2NURJDyKP0m0CCaffAxE
qn2dNfYc3v1D8ypg3XjHlOzRo32RB04o8ALHMD9LSwsYDLpMag==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEFzCCAv+gAwIBAgICFSUwDQYJKoZIhvcNAQELBQAwgZcxCzAJBgNVBAYTAlVT
MRAwDgYDVQQHDAdTZWF0dGxlMRMwEQYDVQQIDApXYXNoaW5ndG9uMSIwIAYDVQQK
DBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRT
MSgwJgYDVQQDDB9BbWF6b24gUkRTIFByZXZpZXcgUm9vdCAyMDE5IENBMB4XDTE5
MDgyMTIyMzk0N1oXDTI0MDgyMTIyMjk0OVowgZwxCzAJBgNVBAYTAlVTMRMwEQYD
VQQIDApXYXNoaW5ndG9uMRAwDgYDVQQHDAdTZWF0dGxlMSIwIAYDVQQKDBlBbWF6
b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMS0wKwYD
VQQDDCRBbWF6b24gUkRTIFByZXZpZXcgdXMtZWFzdC0yIDIwMTkgQ0EwggEiMA0G
CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD0dB/U7qRnSf05wOi7m10Pa2uPMTJv
r6U/3Y17a5prq5Zr4++CnSUYarG51YuIf355dKs+7Lpzs782PIwCmLpzAHKWzix6
pOaTQ+WZ0+vUMTxyqgqWbsBgSCyP7pVBiyqnmLC/L4az9XnscrbAX4pNaoJxsuQe
mzBo6yofjQaAzCX69DuqxFkVTRQnVy7LCFkVaZtjNAftnAHJjVgQw7lIhdGZp9q9
IafRt2gteihYfpn+EAQ/t/E4MnhrYs4CPLfS7BaYXBycEKC5Muj1l4GijNNQ0Efo
xG8LSZz7SNgUvfVwiNTaqfLP3AtEAWiqxyMyh3VO+1HpCjT7uNBFtmF3AgMBAAGj
ZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBQtinkdrj+0B2+qdXngV2tgHnPIujAfBgNVHSMEGDAWgBRp0xqULkNh/w2ZVzEI
o2RIY7O03TANBgkqhkiG9w0BAQsFAAOCAQEAtJdqbCxDeMc8VN1/RzCabw9BIL/z
73Auh8eFTww/sup26yn8NWUkfbckeDYr1BrXa+rPyLfHpg06kwR8rBKyrs5mHwJx
bvOzXD/5WTdgreB+2Fb7mXNvWhenYuji1MF+q1R2DXV3I05zWHteKX6Dajmx+Uuq
Yq78oaCBSV48hMxWlp8fm40ANCL1+gzQ122xweMFN09FmNYFhwuW+Ao+Vv90ZfQG
PYwTvN4n/gegw2TYcifGZC2PNX74q3DH03DXe5fvNgRW5plgz/7f+9mS+YHd5qa9
tYTPUvoRbi169ou6jicsMKUKPORHWhiTpSCWR1FMMIbsAcsyrvtIsuaGCQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/jCCAuagAwIBAgIQdOCSuA9psBpQd8EI368/0DANBgkqhkiG9w0BAQsFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIHNhLWVhc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTE5MTgwNjI2WhgPMjA2MTA1MTkxOTA2MjZaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgc2EtZWFzdC0xIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAN6ftL6w8v3dB2yW
LjCxSP1D7ZsOTeLZOSCz1Zv0Gkd0XLhil5MdHOHBvwH/DrXqFU2oGzCRuAy+aZis
DardJU6ChyIQIciXCO37f0K23edhtpXuruTLLwUwzeEPdcnLPCX+sWEn9Y5FPnVm
pCd6J8edH2IfSGoa9LdErkpuESXdidLym/w0tWG/O2By4TabkNSmpdrCL00cqI+c
prA8Bx1jX8/9sY0gpAovtuFaRN+Ivg3PAnWuhqiSYyQ5nC2qDparOWuDiOhpY56E
EgmTvjwqMMjNtExfYx6Rv2Ndu50TriiNKEZBzEtkekwXInTupmYTvc7U83P/959V
UiQ+WSMCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU4uYHdH0+
bUeh81Eq2l5/RJbW+vswDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBCwUAA4IB
AQBhxcExJ+w74bvDknrPZDRgTeMLYgbVJjx2ExH7/Ac5FZZWcpUpFwWMIJJxtewI
AnhryzM3tQYYd4CG9O+Iu0+h/VVfW7e4O3joWVkxNMb820kQSEwvZfA78aItGwOY
WSaFNVRyloVicZRNJSyb1UL9EiJ9ldhxm4LTT0ax+4ontI7zTx6n6h8Sr6r/UOvX
d9T5aUUENWeo6M9jGupHNn3BobtL7BZm2oS8wX8IVYj4tl0q5T89zDi2x0MxbsIV
5ZjwqBQ5JWKv7ASGPb+z286RjPA9R2knF4lJVZrYuNV90rHvI/ECyt/JrDqeljGL
BLl1W/UsvZo6ldLIpoMbbrb5
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBDCCAuygAwIBAgIQUfVbqapkLYpUqcLajpTJWzANBgkqhkiG9w0BAQsFADCB
mjELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTMwMQYDVQQDDCpB
bWF6b24gUkRTIG1lLWNlbnRyYWwtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNV
BAcMB1NlYXR0bGUwIBcNMjIwNTA2MjMyMDA5WhgPMjA2MjA1MDcwMDIwMDlaMIGa
MQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5j
LjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMzAxBgNVBAMMKkFt
YXpvbiBSRFMgbWUtY2VudHJhbC0xIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJIeovu3
ewI9FVitXMQzvkh34aQ6WyI4NO3YepfJaePiv3cnyFGYHN2S1cR3UQcLWgypP5va
j6bfroqwGbCbZZcb+6cyOB4ceKO9Ws1UkcaGHnNDcy5gXR7aCW2OGTUfinUuhd2d
5bOGgV7JsPbpw0bwJ156+MwfOK40OLCWVbzy8B1kITs4RUPNa/ZJnvIbiMu9rdj4
8y7GSFJLnKCjlOFUkNI5LcaYvI1+ybuNgphT3nuu5ZirvTswGakGUT/Q0J3dxP0J
pDfg5Sj/2G4gXiaM0LppVOoU5yEwVewhQ250l0eQAqSrwPqAkdTg9ng360zqCFPE
JPPcgI1tdGUgneECAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU
/2AJVxWdZxc8eJgdpbwpW7b0f7IwDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEB
CwUAA4IBAQBYm63jTu2qYKJ94gKnqc+oUgqmb1mTXmgmp/lXDbxonjszJDOXFbri
3CCO7xB2sg9bd5YWY8sGKHaWmENj3FZpCmoefbUx++8D7Mny95Cz8R32rNcwsPTl
ebpd9A/Oaw5ug6M0x/cNr0qzF8Wk9Dx+nFEimp8RYQdKvLDfNFZHjPa1itnTiD8M
TorAqj+VwnUGHOYBsT/0NY12tnwXdD+ATWfpEHdOXV+kTMqFFwDyhfgRVNpTc+os
ygr8SwhnSCpJPB/EYl2S7r+tgAbJOkuwUvGT4pTqrzDQEhwE7swgepnHC87zhf6l
qN6mVpSnQKQLm6Ob5TeCEFgcyElsF5bH
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjSgAwIBAgIRAOxu0I1QuMAhIeszB3fJIlkwCgYIKoZIzj0EAwMwgZYx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1h
em9uIFJEUyB1cy13ZXN0LTIgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTI0MjIwNjU5WhgPMjEyMTA1MjQyMzA2NTlaMIGWMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExLzAtBgNVBAMMJkFtYXpvbiBS
RFMgdXMtd2VzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdTZWF0dGxl
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEz4bylRcGqqDWdP7gQIIoTHdBK6FNtKH1
4SkEIXRXkYDmRvL9Bci1MuGrwuvrka5TDj4b7e+csY0llEzHpKfq6nJPFljoYYP9
uqHFkv77nOpJJ633KOr8IxmeHW5RXgrZo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBQQikVz8wmjd9eDFRXzBIU8OseiGzAOBgNVHQ8BAf8EBAMCAYYwCgYI
KoZIzj0EAwMDaAAwZQIwf06Mcrpw1O0EBLBBrp84m37NYtOkE/0Z0O+C7D41wnXi
EQdn6PXUVgdD23Gj82SrAjEAklhKs+liO1PtN15yeZR1Io98nFve+lLptaLakZcH
+hfFuUtCqMbaI8CdvJlKnPqT
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGCTCCA/GgAwIBAgIRALyWMTyCebLZOGcZZQmkmfcwDQYJKoZIhvcNAQEMBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1ub3J0aGVhc3QtMyBSb290IENBIFJTQTQwOTYgRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTI0MjAyODAzWhgPMjEyMTA1MjQyMTI4MDNa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtbm9ydGhlYXN0LTMgUm9vdCBDQSBSU0E0MDk2IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
wGFiyDyCrGqgdn4fXG12cxKAAfVvhMea1mw5h9CVRoavkPqhzQpAitSOuMB9DeiP
wQyqcsiGl/cTEau4L+AUBG8b9v26RlY48exUYBXj8CieYntOT9iNw5WtdYJa3kF/
JxgI+HDMzE9cmHDs5DOO3S0uwZVyra/xE1ymfSlpOeUIOTpHRJv97CBUEpaZMUW5
Sr6GruuOwFVpO5FX3A/jQlcS+UN4GjSRgDUJuqg6RRQldEZGCVCCmodbByvI2fGm
reGpsPJD54KkmAX08nOR8e5hkGoHxq0m2DLD4SrOFmt65vG47qnuwplWJjtk9B3Z
9wDoopwZLBOtlkPIkUllWm1P8EuHC1IKOA+wSP6XdT7cy8S77wgyHzR0ynxv7q/l
vlZtH30wnNqFI0y9FeogD0TGMCHcnGqfBSicJXPy9T4fU6f0r1HwqKwPp2GArwe7
dnqLTj2D7M9MyVtFjEs6gfGWXmu1y5uDrf+CszurE8Cycoma+OfjjuVQgWOCy7Nd
jJswPxAroTzVfpgoxXza4ShUY10woZu0/J+HmNmqK7lh4NS75q1tz75in8uTZDkV
be7GK+SEusTrRgcf3tlgPjSTWG3veNzFDF2Vn1GLJXmuZfhdlVQDBNXW4MNREExS
dG57kJjICpT+r8X+si+5j51gRzkSnMYs7VHulpxfcwECAwEAAaNCMEAwDwYDVR0T
AQH/BAUwAwEB/zAdBgNVHQ4EFgQU4JWOpDBmUBuWKvGPZelw87ezhL8wDgYDVR0P
AQH/BAQDAgGGMA0GCSqGSIb3DQEBDAUAA4ICAQBRNLMql7itvXSEFQRAnyOjivHz
l5IlWVQjAbOUr6ogZcwvK6YpxNAFW5zQr8F+fdkiypLz1kk5irx9TIpff0BWC9hQ
/odMPO8Gxn8+COlSvc+dLsF2Dax3Hvz0zLeKMo+cYisJOzpdR/eKd0/AmFdkvQoM
AOK9n0yYvVJU2IrSgeJBiiCarpKSeAktEVQ4rvyacQGr+QAPkkjRwm+5LHZKK43W
nNnggRli9N/27qYtc5bgr3AaQEhEXMI4RxPRXCLsod0ehMGWyRRK728a+6PMMJAJ
WHOU0x7LCEMPP/bvpLj3BdvSGqNor4ZtyXEbwREry1uzsgODeRRns5acPwTM6ff+
CmxO2NZ0OktIUSYRmf6H/ZFlZrIhV8uWaIwEJDz71qvj7buhQ+RFDZ9CNL64C0X6
mf0zJGEpddjANHaaVky+F4gYMtEy2K2Lcm4JGTdyIzUoIe+atzCnRp0QeIcuWtF+
s8AjDYCVFNypcMmqbRmNpITSnOoCHSRuVkY3gutVoYyMLbp8Jm9SJnCIlEWTA6Rm
wADOMGZJVn5/XRTRuetVOB3KlQDjs9OO01XN5NzGSZO2KT9ngAUfh9Eqhf1iRWSP
nZlRbQ2NRCuY/oJ5N59mLGxnNJSE7giEKEBRhTQ/XEPIUYAUPD5fca0arKRJwbol
l9Se1Hsq0ZU5f+OZKQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
5zT5+Bs=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
Hing
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRANxgyBbnxgTEOpDul2ZnC0UwDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1zb3V0aGVhc3QtMyBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNjEwMTgxOTA3WhgPMjA2MTA2MTAxOTE5MDda
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtc291dGhlYXN0LTMgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
xnwSDAChrMkfk5TA4Dk8hKzStDlSlONzmd3fTG0Wqr5+x3EmFT6Ksiu/WIwEl9J2
K98UI7vYyuZfCxUKb1iMPeBdVGqk0zb92GpURd+Iz/+K1ps9ZLeGBkzR8mBmAi1S
OfpwKiTBzIv6E8twhEn4IUpHsdcuX/2Y78uESpJyM8O5CpkG0JaV9FNEbDkJeBUQ
Ao2qqNcH4R0Qcr5pyeqA9Zto1RswgL06BQMI9dTpfwSP5VvkvcNUaLl7Zv5WzLQE
JzORWePvdPzzvWEkY/3FPjxBypuYwssKaERW0fkPDmPtykktP9W/oJolKUFI6pXp
y+Y6p6/AVdnQD2zZjW5FhQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBT+jEKs96LC+/X4BZkUYUkzPfXdqTAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBAIGQqgqcQ6XSGkmNebzR6DhadTbfDmbYeN5N0Vuzv+Tdmufb
tMGjdjnYMg4B+IVnTKQb+Ox3pL9gbX6KglGK8HupobmIRtwKVth+gYYz3m0SL/Nk
haWPYzOm0x3tJm8jSdufJcEob4/ATce9JwseLl76pSWdl5A4lLjnhPPKudUDfH+1
BLNUi3lxpp6GkC8aWUPtupnhZuXddolTLOuA3GwTZySI44NfaFRm+o83N1jp+EwD
6e94M4cTRzjUv6J3MZmSbdtQP/Tk1uz2K4bQZGP0PZC3bVpqiesdE/xr+wbu8uHr
cM1JXH0AmXf1yIkTgyWzmvt0k1/vgcw5ixAqvvE=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEATCCAumgAwIBAgIRAMhw98EQU18mIji+unM2YH8wDQYJKoZIhvcNAQELBQAw
gZgxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTExMC8GA1UEAwwo
QW1hem9uIFJEUyBhcC1zb3V0aC0yIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTAgFw0yMjA2MDYyMTQyMjJaGA8yMDYyMDYwNjIyNDIyMlowgZgx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTExMC8GA1UEAwwoQW1h
em9uIFJEUyBhcC1zb3V0aC0yIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UEBwwH
U2VhdHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIeeRoLfTm+7
vqm7ZlFSx+1/CGYHyYrOOryM4/Z3dqYVHFMgWTR7V3ziO8RZ6yUanrRcWVX3PZbF
AfX0KFE8OgLsXEZIX8odSrq86+/Th5eZOchB2fDBsUB7GuN2rvFBbM8lTI9ivVOU
lbuTnYyb55nOXN7TpmH2bK+z5c1y9RVC5iQsNAl6IJNvSN8VCqXh31eK5MlKB4DT
+Y3OivCrSGsjM+UR59uZmwuFB1h+icE+U0p9Ct3Mjq3MzSX5tQb6ElTNGlfmyGpW
Kh7GQ5XU1KaKNZXoJ37H53woNSlq56bpVrKI4uv7ATpdpFubOnSLtpsKlpLdR3sy
Ws245200pC8CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUp0ki
6+eWvsnBjQhMxwMW5pwn7DgwDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBCwUA
A4IBAQB2V8lv0aqbYQpj/bmVv/83QfE4vOxKCJAHv7DQ35cJsTyBdF+8pBczzi3t
3VNL5IUgW6WkyuUOWnE0eqAFOUVj0yTS1jSAtfl3vOOzGJZmWBbqm9BKEdu1D8O6
sB8bnomwiab2tNDHPmUslpdDqdabbkWwNWzLJ97oGFZ7KNODMEPXWKWNxg33iHfS
/nlmnrTVI3XgaNK9qLZiUrxu9Yz5gxi/1K+sG9/Dajd32ZxjRwDipOLiZbiXQrsd
qzIMY4GcWf3g1gHL5mCTfk7dG22h/rhPyGV0svaDnsb+hOt6sv1McMN6Y3Ou0mtM
/UaAXojREmJmTSCNvs2aBny3/2sy
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjSgAwIBAgIRAMnRxsKLYscJV8Qv5pWbL7swCgYIKoZIzj0EAwMwgZYx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1h
em9uIFJEUyBzYS1lYXN0LTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTE5MTgxNjAxWhgPMjEyMTA1MTkxOTE2MDFaMIGWMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExLzAtBgNVBAMMJkFtYXpvbiBS
RFMgc2EtZWFzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdTZWF0dGxl
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEjFOCZgTNVKxLKhUxffiDEvTLFhrmIqdO
dKqVdgDoELEzIHWDdC+19aDPitbCYtBVHl65ITu/9pn6mMUl5hhUNtfZuc6A+Iw1
sBe0v0qI3y9Q9HdQYrGgeHDh8M5P7E2ho0IwQDAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBS5L7/8M0TzoBZk39Ps7BkfTB4yJTAOBgNVHQ8BAf8EBAMCAYYwCgYI
KoZIzj0EAwMDaAAwZQIwI43O0NtWKTgnVv9z0LO5UMZYgSve7GvGTwqktZYCMObE
rUI4QerXM9D6JwLy09mqAjEAypfkdLyVWtaElVDUyHFkihAS1I1oUxaaDrynLNQK
Ou/Ay+ns+J+GyvyDUjBpVVW1
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIF/jCCA+agAwIBAgIQR71Z8lTO5Sj+as2jB7IWXzANBgkqhkiG9w0BAQwFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIHVzLXdlc3QtMiBSb290IENBIFJTQTQwOTYgRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTI0MjIwMzIwWhgPMjEyMTA1MjQyMzAzMjBaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgdXMtd2VzdC0yIFJvb3QgQ0EgUlNBNDA5NiBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAM977bHIs1WJijrS
XQMfUOhmlJjr2v0K0UjPl52sE1TJ76H8umo1yR4T7Whkd9IwBHNGKXCJtJmMr9zp
fB38eLTu+5ydUAXdFuZpRMKBWwPVe37AdJRKqn5beS8HQjd3JXAgGKUNNuE92iqF
qi2fIqFMpnJXWo0FIW6s2Dl2zkORd7tH0DygcRi7lgVxCsw1BJQhFJon3y+IV8/F
bnbUXSNSDUnDW2EhvWSD8L+t4eiXYsozhDAzhBvojpxhPH9OB7vqFYw5qxFx+G0t
lSLX5iWi1jzzc3XyGnB6WInZDVbvnvJ4BGZ+dTRpOCvsoMIn9bz4EQTvu243c7aU
HbS/kvnCASNt+zk7C6lbmaq0AGNztwNj85Opn2enFciWZVnnJ/4OeefUWQxD0EPp
SjEd9Cn2IHzkBZrHCg+lWZJQBKbUVS0lLIMSsLQQ6WvR38jY7D2nxM1A93xWxwpt
ZtQnYRCVXH6zt2OwDAFePInWwxUjR5t/wu3XxPgpSfrmTi3WYtr1wFypAJ811e/P
yBtswWUQ6BNJQvy+KnOEeGfOwmtdDFYR+GOCfvCihzrKJrxOtHIieehR5Iw3cbXG
sm4pDzfMUVvDDz6C2M6PRlJhhClbatHCjik9hxFYEsAlqtVVK9pxaz9i8hOqSFQq
kJSQsgWw+oM/B2CyjcSqkSQEu8RLAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8w
HQYDVR0OBBYEFPmrdxpRRgu3IcaB5BTqlprcKdTsMA4GA1UdDwEB/wQEAwIBhjAN
BgkqhkiG9w0BAQwFAAOCAgEAVdlxWjPvVKky3kn8ZizeM4D+EsLw9dWLau2UD/ls
zwDCFoT6euagVeCknrn+YEl7g20CRYT9iaonGoMUPuMR/cdtPL1W/Rf40PSrGf9q
QuxavWiHLEXOQTCtCaVZMokkvjuuLNDXyZnstgECuiZECTwhexUF4oiuhyGk9o01
QMaiz4HX4lgk0ozALUvEzaNd9gWEwD2qe+rq9cQMTVq3IArUkvTIftZUaVUMzr0O
ed1+zAsNa9nJhURJ/6anJPJjbQgb5qA1asFcp9UaMT1ku36U3gnR1T/BdgG2jX3X
Um0UcaGNVPrH1ukInWW743pxWQb7/2sumEEMVh+jWbB18SAyLI4WIh4lkurdifzS
IuTFp8TEx+MouISFhz/vJDWZ84tqoLVjkEcP6oDypq9lFoEzHDJv3V1CYcIgOusT
k1jm9P7BXdTG7TYzUaTb9USb6bkqkD9EwJAOSs7DI94aE6rsSws2yAHavjAMfuMZ
sDAZvkqS2Qg2Z2+CI6wUZn7mzkJXbZoqRjDvChDXEB1mIhzVXhiNW/CR5WKVDvlj
9v1sdGByh2pbxcLQtVaq/5coM4ANgphoNz3pOYUPWHS+JUrIivBZ+JobjXcxr3SN
9iDzcu5/FVVNbq7+KN/nvPMngT+gduEN5m+EBjm8GukJymFG0m6BENRA0QSDqZ7k
zDY=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRAK5EYG3iHserxMqgg+0EFjgwDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1ub3J0aGVhc3QtMyBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTI0MjAyMzE2WhgPMjA2MTA1MjQyMTIzMTZa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtbm9ydGhlYXN0LTMgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
s1L6TtB84LGraLHVC+rGPhLBW2P0oN/91Rq3AnYwqDOuTom7agANwEjvLq7dSRG/
sIfZsSV/ABTgArZ5sCmLjHFZAo8Kd45yA9byx20RcYtAG8IZl+q1Cri+s0XefzyO
U6mlfXZkVe6lzjlfXBkrlE/+5ifVbJK4dqOS1t9cWIpgKqv5fbE6Qbq4LVT+5/WM
Vd2BOljuBMGMzdZubqFKFq4mzTuIYfnBm7SmHlZfTdfBYPP1ScNuhpjuzw4n3NCR
EdU6dQv04Q6th4r7eiOCwbWI9LkmVbvBe3ylhH63lApC7MiiPYLlB13xBubVHVhV
q1NHoNTi+zA3MN9HWicRxQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBSuxoqm0/wjNiZLvqv+JlQwsDvTPDAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBAFfTK/j5kv90uIbM8VaFdVbr/6weKTwehafT0pAk1bfLVX+7
uf8oHgYiyKTTl0DFQicXejghXTeyzwoEkWSR8c6XkhD5vYG3oESqmt/RGvvoxz11
rHHy7yHYu7RIUc3VQG60c4qxXv/1mWySGwVwJrnuyNT9KZXPevu3jVaWOVHEILaK
HvzQ2YEcWBPmde/zEseO2QeeGF8FL45Q1d66wqIP4nNUd2pCjeTS5SpB0MMx7yi9
ki1OH1pv8tOuIdimtZ7wkdB8+JSZoaJ81b8sRrydRwJyvB88rftuI3YB4WwGuONT
ZezUPsmaoK69B0RChB0ofDpAaviF9V3xOWvVZfo=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGDzCCA/egAwIBAgIRAI0sMNG2XhaBMRN3zD7ZyoEwDQYJKoZIhvcNAQEMBQAw
gZ8xCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE4MDYGA1UEAwwv
QW1hem9uIFJEUyBQcmV2aWV3IHVzLWVhc3QtMiBSb290IENBIFJTQTQwOTYgRzEx
EDAOBgNVBAcMB1NlYXR0bGUwIBcNMjEwNTE4MjA1NzUwWhgPMjEyMTA1MTgyMTU3
NTBaMIGfMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl
cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExODA2BgNV
BAMML0FtYXpvbiBSRFMgUHJldmlldyB1cy1lYXN0LTIgUm9vdCBDQSBSU0E0MDk2
IEcxMRAwDgYDVQQHDAdTZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
CgKCAgEAh/otSiCu4Uw3hu7OJm0PKgLsLRqBmUS6jihcrkxfN2SHmp2zuRflkweU
BhMkebzL+xnNvC8okzbgPWtUxSmDnIRhE8J7bvSKFlqs/tmEdiI/LMqe/YIKcdsI
20UYmvyLIjtDaJIh598SHHlF9P8DB5jD8snJfhxWY+9AZRN+YVTltgQAAgayxkWp
M1BbvxpOnz4CC00rE0eqkguXIUSuobb1vKqdKIenlYBNxm2AmtgvQfpsBIQ0SB+8
8Zip8Ef5rtjSw5J3s2Rq0aYvZPfCVIsKYepIboVwXtD7E9J31UkB5onLBQlaHaA6
XlH4srsMmrew5d2XejQGy/lGZ1nVWNsKO0x/Az2QzY5Kjd6AlXZ8kq6H68hscA5i
OMbNlXzeEQsZH0YkId3+UsEns35AAjZv4qfFoLOu8vDotWhgVNT5DfdbIWZW3ZL8
qbmra3JnCHuaTwXMnc25QeKgVq7/rG00YB69tCIDwcf1P+tFJWxvaGtV0g2NthtB
a+Xo09eC0L53gfZZ3hZw1pa3SIF5dIZ6RFRUQ+lFOux3Q/I3u+rYstYw7Zxc4Zeo
Y8JiedpQXEAnbw2ECHix/L6mVWgiWCiDzBnNLLdbmXjJRnafNSndSfFtHCnY1SiP
aCrNpzwZIJejoV1zDlWAMO+gyS28EqzuIq3WJK/TFE7acHkdKIcCAwEAAaNCMEAw
DwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUrmV1YASnuudfmqAZP4sKGTvScaEw
DgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBDAUAA4ICAQBGpEKeQoPvE85tN/25
qHFkys9oHDl93DZ62EnOqAUKLd6v0JpCyEiop4nlrJe+4KrBYVBPyKOJDcIqE2Sp
3cvgJXLhY4i46VM3Qxe8yuYF1ElqBpg3jJVj/sCQnYz9dwoAMWIJFaDWOvmU2E7M
MRaKx+sPXFkIjiDA6Bv0m+VHef7aedSYIY7IDltEQHuXoqNacGrYo3I50R+fZs88
/mB3e/V7967e99D6565yf9Lcjw4oQf2Hy7kl/6P9AuMz0LODnGITwh2TKk/Zo3RU
Vgq25RDrT4xJK6nFHyjUF6+4cOBxVpimmFw/VP1zaXT8DN5r4HyJ9p4YuSK8ha5N
2pJc/exvU8Nv2+vS/efcDZWyuEdZ7eh1IJWQZlOZKIAONfRDRTpeQHJ3zzv3QVYy
t78pYp/eWBHyVIfEE8p2lFKD4279WYe+Uvdb8c4Jm4TJwqkSJV8ifID7Ub80Lsir
lPAU3OCVTBeVRFPXT2zpC4PB4W6KBSuj6OOcEu2y/HgWcoi7Cnjvp0vFTUhDFdus
Wz3ucmJjfVsrkEO6avDKu4SwdbVHsk30TVAwPd6srIdi9U6MOeOQSOSE4EsrrS7l
SVmu2QIDUVFpm8QAHYplkyWIyGkupyl3ashH9mokQhixIU/Pzir0byePxHLHrwLu
1axqeKpI0F5SBUPsaVNYY2uNFg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECDCCAvCgAwIBAgIQCREfzzVyDTMcNME+gWnTCTANBgkqhkiG9w0BAQsFADCB
nDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTUwMwYDVQQDDCxB
bWF6b24gUkRTIGFwLXNvdXRoZWFzdC0yIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4G
A1UEBwwHU2VhdHRsZTAgFw0yMTA1MjQyMDQyMzNaGA8yMDYxMDUyNDIxNDIzM1ow
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1zb3V0aGVhc3QtMiBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDL
1MT6br3L/4Pq87DPXtcjlXN3cnbNk2YqRAZHJayStTz8VtsFcGPJOpk14geRVeVk
e9uKFHRbcyr/RM4owrJTj5X4qcEuATYZbo6ou/rW2kYzuWFZpFp7lqm0vasV4Z9F
fChlhwkNks0UbM3G+psCSMNSoF19ERunj7w2c4E62LwujkeYLvKGNepjnaH10TJL
2krpERd+ZQ4jIpObtRcMH++bTrvklc+ei8W9lqrVOJL+89v2piN3Ecdd389uphst
qQdb1BBVXbhUrtuGHgVf7zKqN1SkCoktoWxVuOprVWhSvr7akaWeq0UmlvbEsujU
vADqxGMcJFyCzxx3CkJjAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0O
BBYEFFk8UJmlhoxFT3PP12PvhvazHjT4MA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG
9w0BAQsFAAOCAQEAfFtr2lGoWVXmWAsIo2NYre7kzL8Xb9Tx7desKxCCz5HOOvIr
8JMB1YK6A7IOvQsLJQ/f1UnKRh3X3mJZjKIywfrMSh0FiDf+rjcEzXxw2dGtUem4
A+WMvIA3jwxnJ90OQj5rQ8bg3iPtE6eojzo9vWQGw/Vu48Dtw1DJo9210Lq/6hze
hPhNkFh8fMXNT7Q1Wz/TJqJElyAQGNOXhyGpHKeb0jHMMhsy5UNoW5hLeMS5ffao
TBFWEJ1gVfxIU9QRxSh+62m46JIg+dwDlWv8Aww14KgepspRbMqDuaM2cinoejv6
t3dyOyHHrsOyv3ffZUKtQhQbQr+sUcL89lARsg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/zCCAuegAwIBAgIRAIJLTMpzGNxqHZ4t+c1MlCIwDQYJKoZIhvcNAQELBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyBhcC1lYXN0LTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyNTIxMzAzM1oYDzIwNjEwNTI1MjIzMDMzWjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGFwLWVhc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDtdHut0ZhJ9Nn2
MpVafFcwHdoEzx06okmmhjJsNy4l9QYVeh0UUoek0SufRNMRF4d5ibzpgZol0Y92
/qKWNe0jNxhEj6sXyHsHPeYtNBPuDMzThfbvsLK8z7pBP7vVyGPGuppqW/6m4ZBB
lcc9fsf7xpZ689iSgoyjiT6J5wlVgmCx8hFYc/uvcRtfd8jAHvheug7QJ3zZmIye
V4htOW+fRVWnBjf40Q+7uTv790UAqs0Zboj4Yil+hER0ibG62y1g71XcCyvcVpto
2/XW7Y9NCgMNqQ7fGN3wR1gjtSYPd7DO32LTzYhutyvfbpAZjsAHnoObmoljcgXI
QjfBcCFpAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFJI3aWLg
CS5xqU5WYVaeT5s8lpO0MA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQsFAAOC
AQEAUwATpJOcGVOs3hZAgJwznWOoTzOVJKfrqBum7lvkVH1vBwxBl9CahaKj3ZOt
YYp2qJzhDUWludL164DL4ZjS6eRedLRviyy5cRy0581l1MxPWTThs27z+lCC14RL
PJZNVYYdl7Jy9Q5NsQ0RBINUKYlRY6OqGDySWyuMPgno2GPbE8aynMdKP+f6G/uE
YHOf08gFDqTsbyfa70ztgVEJaRooVf5JJq4UQtpDvVswW2reT96qi6tXPKHN5qp3
3wI0I1Mp4ePmiBKku2dwYzPfrJK/pQlvu0Gu5lKOQ65QdotwLAAoaFqrf9za1yYs
INUkHLWIxDds+4OHNYcerGp5Dw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGCTCCA/GgAwIBAgIRAIO6ldra1KZvNWJ0TA1ihXEwDQYJKoZIhvcNAQEMBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1zb3V0aGVhc3QtMSBSb290IENBIFJTQTQwOTYgRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTIxMjE0NTA1WhgPMjEyMTA1MjEyMjQ1MDVa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtc291dGhlYXN0LTEgUm9vdCBDQSBSU0E0MDk2IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
sDN52Si9pFSyZ1ruh3xAN0nVqEs960o2IK5CPu/ZfshFmzAwnx/MM8EHt/jMeZtj
SM58LADAsNDL01ELpFZATjgZQ6xNAyXRXE7RiTRUvNkK7O3o2qAGbLnJq/UqF7Sw
LRnB8V6hYOv+2EjVnohtGCn9SUFGZtYDjWXsLd4ML4Zpxv0a5LK7oEC7AHzbUR7R
jsjkrXqSv7GE7bvhSOhMkmgxgj1F3J0b0jdQdtyyj109aO0ATUmIvf+Bzadg5AI2
A9UA+TUcGeebhpHu8AP1Hf56XIlzPpaQv3ZJ4vzoLaVNUC7XKzAl1dlvCl7Klg/C
84qmbD/tjZ6GHtzpLKgg7kQEV7mRoXq8X4wDX2AFPPQl2fv+Kbe+JODqm5ZjGegm
uskABBi8IFv1hYx9jEulZPxC6uD/09W2+niFm3pirnlWS83BwVDTUBzF+CooUIMT
jhWkIIZGDDgMJTzouBHfoSJtS1KpUZi99m2WyVs21MNKHeWAbs+zmI6TO5iiMC+T
uB8spaOiHFO1573Fmeer4sy3YA6qVoqVl6jjTQqOdy3frAMbCkwH22/crV8YA+08
hLeHXrMK+6XUvU+EtHAM3VzcrLbuYJUI2XJbzTj5g0Eb8I8JWsHvWHR5K7Z7gceR
78AzxQmoGEfV6KABNWKsgoCQnfb1BidDJIe3BsI0A6UCAwEAAaNCMEAwDwYDVR0T
AQH/BAUwAwEB/zAdBgNVHQ4EFgQUABp0MlB14MSHgAcuNSOhs3MOlUcwDgYDVR0P
AQH/BAQDAgGGMA0GCSqGSIb3DQEBDAUAA4ICAQCv4CIOBSQi/QR9NxdRgVAG/pAh
tFJhV7OWb/wqwsNKFDtg6tTxwaahdCfWpGWId15OUe7G9LoPiKiwM9C92n0ZeHRz
4ewbrQVo7Eu1JI1wf0rnZJISL72hVYKmlvaWaacHhWxvsbKLrB7vt6Cknxa+S993
Kf8i2Psw8j5886gaxhiUtzMTBwoDWak8ZaK7m3Y6C6hXQk08+3pnIornVSFJ9dlS
PAqt5UPwWmrEfF+0uIDORlT+cvrAwgSp7nUF1q8iasledycZ/BxFgQqzNwnkBDwQ
Z/aM52ArGsTzfMhkZRz9HIEhz1/0mJw8gZtDVQroD8778h8zsx2SrIz7eWQ6uWsD
QEeSWXpcheiUtEfzkDImjr2DLbwbA23c9LoexUD10nwohhoiQQg77LmvBVxeu7WU
E63JqaYUlOLOzEmNJp85zekIgR8UTkO7Gc+5BD7P4noYscI7pPOL5rP7YLg15ZFi
ega+G53NTckRXz4metsd8XFWloDjZJJq4FfD60VuxgXzoMNT9wpFTNSH42PR2s9L
I1vcl3w8yNccs9se2utM2nLsItZ3J0m/+QSRiw9hbrTYTcM9sXki0DtH2kyIOwYf
lOrGJDiYOIrXSQK36H0gQ+8omlrUTvUj4msvkXuQjlfgx6sgp2duOAfnGxE7uHnc
UhnJzzoe6M+LfGHkVQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICuDCCAj2gAwIBAgIQSAG6j2WHtWUUuLGJTPb1nTAKBggqhkjOPQQDAzCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLW5vcnRoZWFzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyMDE2MzgyNloYDzIxMjEwNTIwMTczODI2WjCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLW5vcnRoZWFzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE2eqwU4FOzW8RV1W381Bd
olhDOrqoMqzWli21oDUt7y8OnXM/lmAuOS6sr8Nt61BLVbONdbr+jgCYw75KabrK
ZGg3siqvMOgabIKkKuXO14wtrGyGDt7dnKXg5ERGYOZlo0IwQDAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBS1Acp2WYxOcblv5ikZ3ZIbRCCW+zAOBgNVHQ8BAf8E
BAMCAYYwCgYIKoZIzj0EAwMDaQAwZgIxAJL84J08PBprxmsAKPTotBuVI3MyW1r8
xQ0i8lgCQUf8GcmYjQ0jI4oZyv+TuYJAcwIxAP9Xpzq0Docxb+4N1qVhpiOfWt1O
FnemFiy9m1l+wv6p3riQMPV7mBVpklmijkIv3Q==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRALZLcqCVIJ25maDPE3sbPCIwDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1zb3V0aGVhc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTIxMjEzOTM5WhgPMjA2MTA1MjEyMjM5Mzla
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtc291dGhlYXN0LTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
ypKc+6FfGx6Gl6fQ78WYS29QoKgQiur58oxR3zltWeg5fqh9Z85K5S3UbRSTqWWu
Xcfnkz0/FS07qHX+nWAGU27JiQb4YYqhjZNOAq8q0+ptFHJ6V7lyOqXBq5xOzO8f
+0DlbJSsy7GEtJp7d7QCM3M5KVY9dENVZUKeJwa8PC5StvwPx4jcLeZRJC2rAVDG
SW7NAInbATvr9ssSh03JqjXb+HDyywiqoQ7EVLtmtXWimX+0b3/2vhqcH5jgcKC9
IGFydrjPbv4kwMrKnm6XlPZ9L0/3FMzanXPGd64LQVy51SI4d5Xymn0Mw2kMX8s6
Nf05OsWcDzJ1n6/Q1qHSxQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBRmaIc8eNwGP7i6P7AJrNQuK6OpFzAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBAIBeHfGwz3S2zwIUIpqEEI5/sMySDeS+3nJR+woWAHeO0C8i
BJdDh+kzzkP0JkWpr/4NWz84/IdYo1lqASd1Kopz9aT1+iROXaWr43CtbzjXb7/X
Zv7eZZFC8/lS5SROq42pPWl4ekbR0w8XGQElmHYcWS41LBfKeHCUwv83ATF0XQ6I
4t+9YSqZHzj4vvedrvcRInzmwWJaal9s7Z6GuwTGmnMsN3LkhZ+/GD6oW3pU/Pyh
EtWqffjsLhfcdCs3gG8x9BbkcJPH5aPAVkPn4wc8wuXg6xxb9YGsQuY930GWTYRf
schbgjsuqznW4HHakq4WNhs1UdTSTKkRdZz7FUQ=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEDzCCAvegAwIBAgIRAM2zAbhyckaqRim63b+Tib8wDQYJKoZIhvcNAQELBQAw
gZ8xCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE4MDYGA1UEAwwv
QW1hem9uIFJEUyBQcmV2aWV3IHVzLWVhc3QtMiBSb290IENBIFJTQTIwNDggRzEx
EDAOBgNVBAcMB1NlYXR0bGUwIBcNMjEwNTE4MjA0OTQ1WhgPMjA2MTA1MTgyMTQ5
NDVaMIGfMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl
cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExODA2BgNV
BAMML0FtYXpvbiBSRFMgUHJldmlldyB1cy1lYXN0LTIgUm9vdCBDQSBSU0EyMDQ4
IEcxMRAwDgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEA1ybjQMH1MkbvfKsWJaCTXeCSN1SG5UYid+Twe+TjuSqaXWonyp4WRR5z
tlkqq+L2MWUeQQAX3S17ivo/t84mpZ3Rla0cx39SJtP3BiA2BwfUKRjhPwOjmk7j
3zrcJjV5k1vSeLNOfFFSlwyDiVyLAE61lO6onBx+cRjelu0egMGq6WyFVidTdCmT
Q9Zw3W6LTrnPvPmEyjHy2yCHzH3E50KSd/5k4MliV4QTujnxYexI2eR8F8YQC4m3
DYjXt/MicbqA366SOoJA50JbgpuVv62+LSBu56FpzY12wubmDZsdn4lsfYKiWxUy
uc83a2fRXsJZ1d3whxrl20VFtLFHFQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/
MB0GA1UdDgQWBBRC0ytKmDYbfz0Bz0Psd4lRQV3aNTAOBgNVHQ8BAf8EBAMCAYYw
DQYJKoZIhvcNAQELBQADggEBAGv8qZu4uaeoF6zsbumauz6ea6tdcWt+hGFuwGrb
tRbI85ucAmVSX06x59DJClsb4MPhL1XmqO3RxVMIVVfRwRHWOsZQPnXm8OYQ2sny
rYuFln1COOz1U/KflZjgJmxbn8x4lYiTPZRLarG0V/OsCmnLkQLPtEl/spMu8Un7
r3K8SkbWN80gg17Q8EV5mnFwycUx9xsTAaFItuG0en9bGsMgMmy+ZsDmTRbL+lcX
Fq8r4LT4QjrFz0shrzCwuuM4GmcYtBSxlacl+HxYEtAs5k10tmzRf6OYlY33tGf6
1tkYvKryxDPF/EDgGp/LiBwx6ixYMBfISoYASt4V/ylAlHA=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtTCCAjqgAwIBAgIRAK9BSZU6nIe6jqfODmuVctYwCgYIKoZIzj0EAwMwgZkx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEyMDAGA1UEAwwpQW1h
em9uIFJEUyBjYS1jZW50cmFsLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTIxMjIxMzA5WhgPMjEyMTA1MjEyMzEzMDlaMIGZMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMjAwBgNVBAMMKUFtYXpv
biBSRFMgY2EtY2VudHJhbC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEUkEERcgxneT5H+P+fERcbGmf
bVx+M7rNWtgWUr6w+OBENebQA9ozTkeSg4c4M+qdYSObFqjxITdYxT1z/nHz1gyx
OKAhLjWu+nkbRefqy3RwXaWT680uUaAP6ccnkZOMo0IwQDAPBgNVHRMBAf8EBTAD
AQH/MB0GA1UdDgQWBBSN6fxlg0s5Wny08uRBYZcQ3TUoyzAOBgNVHQ8BAf8EBAMC
AYYwCgYIKoZIzj0EAwMDaQAwZgIxAORaz+MBVoFBTmZ93j2G2vYTwA6T5hWzBWrx
CrI54pKn5g6At56DBrkjrwZF5T1enAIxAJe/LZ9xpDkAdxDgGJFN8gZYLRWc0NRy
Rb4hihy5vj9L+w9uKc9VfEBIFuhT7Z3ljg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEADCCAuigAwIBAgIQB/57HSuaqUkLaasdjxUdPjANBgkqhkiG9w0BAQsFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIGFwLXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUxOTE3NDAzNFoYDzIwNjEwNTE5MTg0MDM0WjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIGFwLXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtbkaoVsUS76o
TgLFmcnaB8cswBk1M3Bf4IVRcwWT3a1HeJSnaJUqWHCJ+u3ip/zGVOYl0gN1MgBb
MuQRIJiB95zGVcIa6HZtx00VezDTr3jgGWRHmRjNVCCHGmxOZWvJjsIE1xavT/1j
QYV/ph4EZEIZ/qPq7e3rHohJaHDe23Z7QM9kbyqp2hANG2JtU/iUhCxqgqUHNozV
Zd0l5K6KnltZQoBhhekKgyiHqdTrH8fWajYl5seD71bs0Axowb+Oh0rwmrws3Db2
Dh+oc2PwREnjHeca9/1C6J2vhY+V0LGaJmnnIuOANrslx2+bgMlyhf9j0Bv8AwSi
dSWsobOhNQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQb7vJT
VciLN72yJGhaRKLn6Krn2TAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQAD
ggEBAAxEj8N9GslReAQnNOBpGl8SLgCMTejQ6AW/bapQvzxrZrfVOZOYwp/5oV0f
9S1jcGysDM+DrmfUJNzWxq2Y586R94WtpH4UpJDGqZp+FuOVJL313te4609kopzO
lDdmd+8z61+0Au93wB1rMiEfnIMkOEyt7D2eTFJfJRKNmnPrd8RjimRDlFgcLWJA
3E8wca67Lz/G0eAeLhRHIXv429y8RRXDtKNNz0wA2RwURWIxyPjn1fHjA9SPDkeW
E1Bq7gZj+tBnrqz+ra3yjZ2blss6Ds3/uRY6NYqseFTZWmQWT7FolZEnT9vMUitW
I0VynUbShVpGf6946e0vgaaKw20=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/jCCAuagAwIBAgIQGyUVTaVjYJvWhroVEiHPpDANBgkqhkiG9w0BAQsFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIHVzLXdlc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTE5MTkwNDA2WhgPMjA2MTA1MTkyMDA0MDZaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgdXMtd2VzdC0xIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANhyXpJ0t4nigRDZ
EwNtFOem1rM1k8k5XmziHKDvDk831p7QsX9ZOxl/BT59Pu/P+6W6SvasIyKls1sW
FJIjFF+6xRQcpoE5L5evMgN/JXahpKGeQJPOX9UEXVW5B8yi+/dyUitFT7YK5LZA
MqWBN/LtHVPa8UmE88RCDLiKkqiv229tmwZtWT7nlMTTCqiAHMFcryZHx0pf9VPh
x/iPV8p2gBJnuPwcz7z1kRKNmJ8/cWaY+9w4q7AYlAMaq/rzEqDaN2XXevdpsYAK
TMMj2kji4x1oZO50+VPNfBl5ZgJc92qz1ocF95SAwMfOUsP8AIRZkf0CILJYlgzk
/6u6qZECAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUm5jfcS9o
+LwL517HpB6hG+PmpBswDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBCwUAA4IB
AQAcQ6lsqxi63MtpGk9XK8mCxGRLCad51+MF6gcNz6i6PAqhPOoKCoFqdj4cEQTF
F8dCfa3pvfJhxV6RIh+t5FCk/y6bWT8Ls/fYKVo6FhHj57bcemWsw/Z0XnROdVfK
Yqbc7zvjCPmwPHEqYBhjU34NcY4UF9yPmlLOL8uO1JKXa3CAR0htIoW4Pbmo6sA4
6P0co/clW+3zzsQ92yUCjYmRNeSbdXbPfz3K/RtFfZ8jMtriRGuO7KNxp8MqrUho
HK8O0mlSUxGXBZMNicfo7qY8FD21GIPH9w5fp5oiAl7lqFzt3E3sCLD3IiVJmxbf
fUwpGd1XZBBSdIxysRLM6j48
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrTCCAjOgAwIBAgIQU+PAILXGkpoTcpF200VD/jAKBggqhkjOPQQDAzCBljEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMS8wLQYDVQQDDCZBbWF6
b24gUkRTIGFwLWVhc3QtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTAgFw0yMTA1MjUyMTQ1MTFaGA8yMTIxMDUyNTIyNDUxMVowgZYxCzAJBgNV
BAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYD
VQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1hem9uIFJE
UyBhcC1lYXN0LTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1NlYXR0bGUw
djAQBgcqhkjOPQIBBgUrgQQAIgNiAAT3tFKE8Kw1sGQAvNLlLhd8OcGhlc7MiW/s
NXm3pOiCT4vZpawKvHBzD76Kcv+ZZzHRxQEmG1/muDzZGlKR32h8AAj+NNO2Wy3d
CKTtYMiVF6Z2zjtuSkZQdjuQbe4eQ7qjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYD
VR0OBBYEFAiSQOp16Vv0Ohpvqcbd2j5RmhYNMA4GA1UdDwEB/wQEAwIBhjAKBggq
hkjOPQQDAwNoADBlAjBVsi+5Ape0kOhMt/WFkANkslD4qXA5uqhrfAtH29Xzz2NV
tR7akiA771OaIGB/6xsCMQCZt2egCtbX7J0WkuZ2KivTh66jecJr5DHvAP4X2xtS
F/5pS+AUhcKTEGjI9jDH3ew=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICuDCCAj2gAwIBAgIQT5mGlavQzFHsB7hV6Mmy6TAKBggqhkjOPQQDAzCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLXNvdXRoZWFzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyNDIwNTAxNVoYDzIxMjEwNTI0MjE1MDE1WjCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLXNvdXRoZWFzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEcm4BBBjYK7clwm0HJRWS
flt3iYwoJbIXiXn9c1y3E+Vb7bmuyKhS4eO8mwO4GefUcXObRfoHY2TZLhMJLVBQ
7MN2xDc0RtZNj07BbGD3VAIFRTDX0mH9UNYd0JQM3t/Oo0IwQDAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBRrd5ITedfAwrGo4FA9UaDaGFK3rjAOBgNVHQ8BAf8E
BAMCAYYwCgYIKoZIzj0EAwMDaQAwZgIxAPBNqmVv1IIA3EZyQ6XuVf4gj79/DMO8
bkicNS1EcBpUqbSuU4Zwt2BYc8c/t7KVOQIxAOHoWkoKZPiKyCxfMtJpCZySUG+n
sXgB/LOyWE5BJcXUfm+T1ckeNoWeUUMOLmnJjg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRAJcDeinvdNrDQBeJ8+t38WQwDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1zb3V0aGVhc3QtNCBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjIwNTI1MTY0OTE2WhgPMjA2MjA1MjUxNzQ5MTZa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtc291dGhlYXN0LTQgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
k8DBNkr9tMoIM0NHoFiO7cQfSX0cOMhEuk/CHt0fFx95IBytx7GHCnNzpM27O5z6
x6iRhfNnx+B6CrGyCzOjxvPizneY+h+9zfvNz9jj7L1I2uYMuiNyOKR6FkHR46CT
1CiArfVLLPaTqgD/rQjS0GL2sLHS/0dmYipzynnZcs613XT0rAWdYDYgxDq7r/Yi
Xge5AkWQFkMUq3nOYDLCyGGfQqWKkwv6lZUHLCDKf+Y0Uvsrj8YGCI1O8mF0qPCQ
lmlfaDvbuBu1AV+aabmkvyFj3b8KRIlNLEtQ4N8KGYR2Jdb82S4YUGIOAt4wuuFt
1B7AUDLk3V/u+HTWiwfoLQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBSNpcjz6ArWBtAA+Gz6kyyZxrrgdDAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBAGJEd7UgOzHYIcQRSF7nSYyjLROyalaIV9AX4WXW/Cqlul1c
MblP5etDZm7A/thliZIWAuyqv2bNicmS3xKvNy6/QYi1YgxZyy/qwJ3NdFl067W0
t8nGo29B+EVK94IPjzFHWShuoktIgp+dmpijB7wkTIk8SmIoe9yuY4+hzgqk+bo4
ms2SOXSN1DoQ75Xv+YmztbnZM8MuWhL1T7hA4AMorzTQLJ9Pof8SpSdMHeDsHp0R
01jogNFkwy25nw7cL62nufSuH2fPYGWXyNDg+y42wKsKWYXLRgUQuDVEJ2OmTFMB
T0Vf7VuNijfIA9hkN2d3K53m/9z5WjGPSdOjGhg=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/jCCAuagAwIBAgIQRiwspKyrO0xoxDgSkqLZczANBgkqhkiG9w0BAQsFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIHVzLXdlc3QtMiBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTI0MjE1OTAwWhgPMjA2MTA1MjQyMjU5MDBaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgdXMtd2VzdC0yIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL53Jk3GsKiu+4bx
jDfsevWbwPCNJ3H08Zp7GWhvI3Tgi39opfHYv2ku2BKFjK8N2L6RvNPSR8yplv5j
Y0tK0U+XVNl8o0ibhqRDhbTuh6KL8CFINWYzAajuxFS+CF0U6c1Q3tXLBdALxA7l
FlXJ71QrP06W31kRe7kvgrvO7qWU3/OzUf9qYw4LSiR1/VkvvRCTqcVNw09clw/M
Jbw6FSgweN65M9j7zPbjGAXSHkXyxH1Erin2fa+B9PE4ZDgX9cp2C1DHewYJQL/g
SepwwcudVNRN1ibKH7kpMrgPnaNIVNx5sXVsTjk6q2ZqYw3SVHegltJpLy/cZReP
mlivF2kCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUmTcQd6o1
CuS65MjBrMwQ9JJjmBwwDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBCwUAA4IB
AQAKSDSIzl956wVddPThf2VAzI8syw9ngSwsEHZvxVGHBvu5gg618rDyguVCYX9L
4Kw/xJrk6S3qxOS2ZDyBcOpsrBskgahDFIunzoRP3a18ARQVq55LVgfwSDQiunch
Bd05cnFGLoiLkR5rrkgYaP2ftn3gRBRaf0y0S3JXZ2XB3sMZxGxavYq9mfiEcwB0
LMTMQ1NYzahIeG6Jm3LqRqR8HkzP/Ztq4dT2AtSLvFebbNMiWqeqT7OcYp94HTYT
zqrtaVdUg9bwyAUCDgy0GV9RHDIdNAOInU/4LEETovrtuBU7Z1q4tcHXvN6Hd1H8
gMb0mCG5I393qW5hFsA/diFb
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRAPQAvihfjBg/JDbj6U64K98wDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1ub3J0aGVhc3QtMiBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTIwMTYyODQxWhgPMjA2MTA1MjAxNzI4NDFa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtbm9ydGhlYXN0LTIgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
vJ9lgyksCxkBlY40qOzI1TCj/Q0FVGuPL/Z1Mw2YN0l+41BDv0FHApjTUkIKOeIP
nwDwpXTa3NjYbk3cOZ/fpH2rYJ++Fte6PNDGPgKppVCUh6x3jiVZ1L7wOgnTdK1Q
Trw8440IDS5eLykRHvz8OmwvYDl0iIrt832V0QyOlHTGt6ZJ/aTQKl12Fy3QBLv7
stClPzvHTrgWqVU6uidSYoDtzHbU7Vda7YH0wD9IUoMBf7Tu0rqcE4uH47s2XYkc
SdLEoOg/Ngs7Y9B1y1GCyj3Ux7hnyvCoRTw014QyNB7dTatFMDvYlrRDGG14KeiU
UL7Vo/+EejWI31eXNLw84wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBQkgTWFsNg6wA3HbbihDQ4vpt1E2zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBAGz1Asiw7hn5WYUj8RpOCzpE0h/oBZcnxP8wulzZ5Xd0YxWO
0jYUcUk3tTQy1QvoY+Q5aCjg6vFv+oFBAxkib/SmZzp4xLisZIGlzpJQuAgRkwWA
6BVMgRS+AaOMQ6wKPgz1x4v6T0cIELZEPq3piGxvvqkcLZKdCaeC3wCS6sxuafzZ
4qA3zMwWuLOzRftgX2hQto7d/2YkRXga7jSvQl3id/EI+xrYoH6zIWgjdU1AUaNq
NGT7DIo47vVMfnd9HFZNhREsd4GJE83I+JhTqIxiKPNxrKgESzyADmNPt0gXDnHo
tbV1pMZz5HpJtjnP/qVZhEK5oB0tqlKPv9yx074=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICuTCCAj6gAwIBAgIRAKp1Rn3aL/g/6oiHVIXtCq8wCgYIKoZIzj0EAwMwgZsx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE0MDIGA1UEAwwrQW1h
em9uIFJEUyBhcC1ub3J0aGVhc3QtMyBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTAgFw0yMTA1MjQyMDMyMTdaGA8yMTIxMDUyNDIxMzIxN1owgZsx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE0MDIGA1UEAwwrQW1h
em9uIFJEUyBhcC1ub3J0aGVhc3QtMyBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABGTYWPILeBJXfcL3Dz4z
EWMUq78xB1HpjBwHoTURYfcMd5r96BTVG6yaUBWnAVCMeeD6yTG9a1eVGNhG14Hk
ZAEjgLiNB7RRbEG5JZ/XV7W/vODh09WCst2y9SLKsdgeAaNCMEAwDwYDVR0TAQH/
BAUwAwEB/zAdBgNVHQ4EFgQUoE0qZHmDCDB+Bnm8GUa/evpfPwgwDgYDVR0PAQH/
BAQDAgGGMAoGCCqGSM49BAMDA2kAMGYCMQCnil5MMwhY3qoXv0xvcKZGxGPaBV15
0CCssCKn0oVtdJQfJQ3Jrf3RSaEyijXIJsoCMQC35iJi4cWoNX3N/qfgnHohW52O
B5dg0DYMqy5cNZ40+UcAanRMyqNQ6P7fy3umGco=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtzCCAj2gAwIBAgIQPXnDTPegvJrI98qz8WxrMjAKBggqhkjOPQQDAzCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIEJldGEgdXMtZWFzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUxODIxNDAxMloYDzIxMjEwNTE4MjI0MDEyWjCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIEJldGEgdXMtZWFzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEI0sR7gwutK5AB46hM761
gcLTGBIYlURSEoM1jcBwy56CL+3CJKZwLLyJ7qoOKfWbu5GsVLUTWS8MV6Nw33cx
2KQD2svb694wi+Px2f4n9+XHkEFQw8BbiodDD7RZA70fo0IwQDAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBTQSioOvnVLEMXwNSDg+zgln/vAkjAOBgNVHQ8BAf8E
BAMCAYYwCgYIKoZIzj0EAwMDaAAwZQIxAMwu1hqm5Bc98uE/E0B5iMYbBQ4kpMxO
tP8FTfz5UR37HUn26nXE0puj6S/Ffj4oJgIwXI7s2c26tFQeqzq6u3lrNJHp5jC9
Uxlo/hEJOLoDj5jnpxo8dMAtCNoQPaHdfL0P
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjWgAwIBAgIQGKVv+5VuzEZEBzJ+bVfx2zAKBggqhkjOPQQDAzCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGFwLXNvdXRoLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTE5MTc1MDU5WhgPMjEyMTA1MTkxODUwNTlaMIGXMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpvbiBS
RFMgYXAtc291dGgtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2VhdHRs
ZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABMqdLJ0tZF/DGFZTKZDrGRJZID8ivC2I
JRCYTWweZKCKSCAzoiuGGHzJhr5RlLHQf/QgmFcgXsdmO2n3CggzhA4tOD9Ip7Lk
P05eHd2UPInyPCHRgmGjGb0Z+RdQ6zkitKNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUC1yhRgVqU5bR8cGzOUCIxRpl4EYwDgYDVR0PAQH/BAQDAgGGMAoG
CCqGSM49BAMDA2cAMGQCMG0c/zLGECRPzGKJvYCkpFTCUvdP4J74YP0v/dPvKojL
t/BrR1Tg4xlfhaib7hPc7wIwFvgqHes20CubQnZmswbTKLUrgSUW4/lcKFpouFd2
t2/ewfi/0VhkeUW+IiHhOMdU
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGCTCCA/GgAwIBAgIRAOXxJuyXVkbfhZCkS/dOpfEwDQYJKoZIhvcNAQEMBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1ub3J0aGVhc3QtMSBSb290IENBIFJTQTQwOTYgRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTI1MjE1OTEwWhgPMjEyMTA1MjUyMjU5MTBa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtbm9ydGhlYXN0LTEgUm9vdCBDQSBSU0E0MDk2IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
xiP4RDYm4tIS12hGgn1csfO8onQDmK5SZDswUpl0HIKXOUVVWkHNlINkVxbdqpqH
FhbyZmNN6F/EWopotMDKe1B+NLrjNQf4zefv2vyKvPHJXhxoKmfyuTd5Wk8k1F7I
lNwLQzznB+ElhrLIDJl9Ro8t31YBBNFRGAGEnxyACFGcdkjlsa52UwfYrwreEg2l
gW5AzqHgjFfj9QRLydeU/n4bHm0F1adMsV7P3rVwilcUlqsENDwXnWyPEyv3sw6F
wNemLEs1129mB77fwvySb+lLNGsnzr8w4wdioZ74co+T9z2ca+eUiP+EQccVw1Is
D4Fh57IjPa6Wuc4mwiUYKkKY63+38aCfEWb0Qoi+zW+mE9nek6MOQ914cN12u5LX
dBoYopphRO5YmubSN4xcBy405nIdSdbrAVWwxXnVVyjqjknmNeqQsPZaxAhdoKhV
AqxNr8AUAdOAO6Sz3MslmcLlDXFihrEEOeUbpg/m1mSUUHGbu966ajTG1FuEHHwS
7WB52yxoJo/tHvt9nAWnh3uH5BHmS8zn6s6CGweWKbX5yICnZ1QFR1e4pogxX39v
XD6YcNOO+Vn+HY4nXmjgSYVC7l+eeP8eduMg1xJujzjrbmrXU+d+cBObgdTOAlpa
JFHaGwYw1osAwPCo9cZ2f04yitBfj9aPFia8ASKldakCAwEAAaNCMEAwDwYDVR0T
AQH/BAUwAwEB/zAdBgNVHQ4EFgQUqKS+ltlior0SyZKYAkJ/efv55towDgYDVR0P
AQH/BAQDAgGGMA0GCSqGSIb3DQEBDAUAA4ICAQAdElvp8bW4B+Cv+1WSN87dg6TN
wGyIjJ14/QYURgyrZiYpUmZpj+/pJmprSWXu4KNyqHftmaidu7cdjL5nCAvAfnY5
/6eDDbX4j8Gt9fb/6H9y0O0dn3mUPSEKG0crR+JRFAtPhn/2FNvst2P82yguWLv0
pHjHVUVcq+HqDMtUIJsTPYjSh9Iy77Q6TOZKln9dyDOWJpCSkiUWQtMAKbCSlvzd
zTs/ahqpT+zLfGR1SR+T3snZHgQnbnemmz/XtlKl52NxccARwfcEEKaCRQyGq/pR
0PVZasyJS9JY4JfQs4YOdeOt4UMZ8BmW1+BQWGSkkb0QIRl8CszoKofucAlqdPcO
IT/ZaMVhI580LFGWiQIizWFskX6lqbCyHqJB3LDl8gJISB5vNTHOHpvpMOMs5PYt
cRl5Mrksx5MKMqG7y5R734nMlZxQIHjL5FOoOxTBp9KeWIL/Ib89T2QDaLw1SQ+w
ihqWBJ4ZdrIMWYpP3WqM+MXWk7WAem+xsFJdR+MDgOOuobVQTy5dGBlPks/6gpjm
rO9TjfQ36ppJ3b7LdKUPeRfnYmlR5RU4oyYJ//uLbClI443RZAgxaCXX/nyc12lr
eVLUMNF2abLX4/VF63m2/Z9ACgMRfqGshPssn1NN33OonrotQoj4S3N9ZrjvzKt8
iHcaqd60QKpfiH2A3A==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICuDCCAj2gAwIBAgIQPaVGRuu86nh/ylZVCLB0MzAKBggqhkjOPQQDAzCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLW5vcnRoZWFzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyNTIyMDMxNloYDzIxMjEwNTI1MjMwMzE2WjCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLW5vcnRoZWFzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEexNURoB9KE93MEtEAlJG
obz4LS/pD2hc8Gczix1WhVvpJ8bN5zCDXaKdnDMCebetyRQsmQ2LYlfmCwpZwSDu
0zowB11Pt3I5Avu2EEcuKTlKIDMBeZ1WWuOd3Tf7MEAMo0IwQDAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBSaYbZPBvFLikSAjpa8mRJvyArMxzAOBgNVHQ8BAf8E
BAMCAYYwCgYIKoZIzj0EAwMDaQAwZgIxAOEJkuh3Zjb7Ih/zuNRd1RBqmIYcnyw0
nwUZczKXry+9XebYj3VQxSRNadrarPWVqgIxAMg1dyGoDAYjY/L/9YElyMnvHltO
PwpJShmqHvCLc/mXMgjjYb/akK7yGthvW6j/uQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGCDCCA/CgAwIBAgIQChu3v5W1Doil3v6pgRIcVzANBgkqhkiG9w0BAQwFADCB
nDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTUwMwYDVQQDDCxB
bWF6b24gUkRTIEJldGEgdXMtZWFzdC0xIFJvb3QgQ0EgUlNBNDA5NiBHMTEQMA4G
A1UEBwwHU2VhdHRsZTAgFw0yMTA1MTgyMTM0MTVaGA8yMTIxMDUxODIyMzQxNVow
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBCZXRhIHVzLWVhc3QtMSBSb290IENBIFJTQTQwOTYgRzExEDAO
BgNVBAcMB1NlYXR0bGUwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQC1
FUGQ5tf3OwpDR6hGBxhUcrkwKZhaXP+1St1lSOQvjG8wXT3RkKzRGMvb7Ee0kzqI
mzKKe4ASIhtV3UUWdlNmP0EA3XKnif6N79MismTeGkDj75Yzp5A6tSvqByCgxIjK
JqpJrch3Dszoyn8+XhwDxMZtkUa5nQVdJgPzJ6ltsQ8E4SWLyLtTu0S63jJDkqYY
S7cQblk7y7fel+Vn+LS5dGTdRRhMvSzEnb6mkVBaVzRyVX90FNUED06e8q+gU8Ob
htvQlf9/kRzHwRAdls2YBhH40ZeyhpUC7vdtPwlmIyvW5CZ/QiG0yglixnL6xahL
pbmTuTSA/Oqz4UGQZv2WzHe1lD2gRHhtFX2poQZeNQX8wO9IcUhrH5XurW/G9Xwl
Sat9CMPERQn4KC3HSkat4ir2xaEUrjfg6c4XsGyh2Pk/LZ0gLKum0dyWYpWP4JmM
RQNjrInXPbMhzQObozCyFT7jYegS/3cppdyy+K1K7434wzQGLU1gYXDKFnXwkX8R
bRKgx2pHNbH5lUddjnNt75+e8m83ygSq/ZNBUz2Ur6W2s0pl6aBjwaDES4VfWYlI
jokcmrGvJNDfQWygb1k00eF2bzNeNCHwgWsuo3HSxVgc/WGsbcGrTlDKfz+g3ich
bXUeUidPhRiv5UQIVCLIHpHuin3bj9lQO/0t6p+tAQIDAQABo0IwQDAPBgNVHRMB
Af8EBTADAQH/MB0GA1UdDgQWBBSFmMBgm5IsRv3hLrvDPIhcPweXYTAOBgNVHQ8B
Af8EBAMCAYYwDQYJKoZIhvcNAQEMBQADggIBAAa2EuozymOsQDJlEi7TqnyA2OhT
GXPfYqCyMJVkfrqNgcnsNpCAiNEiZbb+8sIPXnT8Ay8hrwJYEObJ5b7MHXpLuyft
z0Pu1oFLKnQxKjNxrIsCvaB4CRRdYjm1q7EqGhMGv76se9stOxkOqO9it31w/LoU
ENDk7GLsSqsV1OzYLhaH8t+MaNP6rZTSNuPrHwbV3CtBFl2TAZ7iKgKOhdFz1Hh9
Pez0lG+oKi4mHZ7ajov6PD0W7njn5KqzCAkJR6OYmlNVPjir+c/vUtEs0j+owsMl
g7KE5g4ZpTRShyh5BjCFRK2tv0tkqafzNtxrKC5XNpEkqqVTCnLcKG+OplIEadtr
C7UWf4HyhCiR+xIyxFyR05p3uY/QQU/5uza7GlK0J+U1sBUytx7BZ+Fo8KQfPPqV
CqDCaYUksoJcnJE/KeoksyqNQys7sDGJhkd0NeUGDrFLKHSLhIwAMbEWnqGxvhli
E7sP2E5rI/I9Y9zTbLIiI8pfeZlFF8DBdoP/Hzg8pqsiE/yiXSFTKByDwKzGwNqz
F0VoFdIZcIbLdDbzlQitgGpJtvEL7HseB0WH7B2PMMD8KPJlYvPveO3/6OLzCsav
+CAkvk47NQViKMsUTKOA0JDCW+u981YRozxa3K081snhSiSe83zIPBz1ikldXxO9
6YYLNPRrj3mi9T/f
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjSgAwIBAgIRAMkvdFnVDb0mWWFiXqnKH68wCgYIKoZIzj0EAwMwgZYx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1h
em9uIFJEUyB1cy13ZXN0LTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTE5MTkxMzI0WhgPMjEyMTA1MTkyMDEzMjRaMIGWMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExLzAtBgNVBAMMJkFtYXpvbiBS
RFMgdXMtd2VzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdTZWF0dGxl
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEy86DB+9th/0A5VcWqMSWDxIUblWTt/R0
ao6Z2l3vf2YDF2wt1A2NIOGpfQ5+WAOJO/IQmnV9LhYo+kacB8sOnXdQa6biZZkR
IyouUfikVQAKWEJnh1Cuo5YMM4E2sUt5o0IwQDAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBQ8u3OnecANmG8OoT7KLWDuFzZwBTAOBgNVHQ8BAf8EBAMCAYYwCgYI
KoZIzj0EAwMDaAAwZQIwQ817qkb7mWJFnieRAN+m9W3E0FLVKaV3zC5aYJUk2fcZ
TaUx3oLp3jPLGvY5+wgeAjEA6wAicAki4ZiDfxvAIuYiIe1OS/7H5RA++R8BH6qG
iRzUBM/FItFpnkus7u/eTkvo
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrzCCAjWgAwIBAgIQS/+Ryfgb/IOVEa1pWoe8oTAKBggqhkjOPQQDAzCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGFwLXNvdXRoLTIgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjIwNjA2MjE1NDQyWhgPMjEyMjA2MDYyMjU0NDJaMIGXMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpvbiBS
RFMgYXAtc291dGgtMiBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2VhdHRs
ZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABDsX6fhdUWBQpYTdseBD/P3s96Dtw2Iw
OrXKNToCnmX5nMkUGdRn9qKNiz1pw3EPzaPxShbYwQ7LYP09ENK/JN4QQjxMihxC
jLFxS85nhBQQQGRCWikDAe38mD8fSvREQKNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUIh1xZiseQYFjPYKJmGbruAgRH+AwDgYDVR0PAQH/BAQDAgGGMAoG
CCqGSM49BAMDA2gAMGUCMFudS4zLy+UUGrtgNLtRMcu/DZ9BUzV4NdHxo0bkG44O
thnjl4+wTKI6VbyAbj2rkgIxAOHps8NMITU5DpyiMnKTxV8ubb/WGHrLl0BjB8Lw
ETVJk5DNuZvsIIcm7ykk6iL4Tw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGBDCCA+ygAwIBAgIQDcEmNIAVrDpUw5cH5ynutDANBgkqhkiG9w0BAQwFADCB
mjELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTMwMQYDVQQDDCpB
bWF6b24gUkRTIG1lLWNlbnRyYWwtMSBSb290IENBIFJTQTQwOTYgRzExEDAOBgNV
BAcMB1NlYXR0bGUwIBcNMjIwNTA3MDA0MDIzWhgPMjEyMjA1MDcwMTQwMjNaMIGa
MQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5j
LjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMzAxBgNVBAMMKkFt
YXpvbiBSRFMgbWUtY2VudHJhbC0xIFJvb3QgQ0EgUlNBNDA5NiBHMTEQMA4GA1UE
BwwHU2VhdHRsZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAKvADk8t
Fl9bFlU5sajLPPDSOUpPAkKs6iPlz+27o1GJC88THcOvf3x0nVAcu9WYe9Qaas+4
j4a0vv51agqyODRD/SNi2HnqW7DbtLPAm6KBHe4twl28ItB/JD5g7u1oPAHFoXMS
cH1CZEAs5RtlZGzJhcBXLFsHNv/7+SCLyZ7+2XFh9OrtgU4wMzkHoRNndhfwV5bu
17bPTwuH+VxH37zXf1mQ/KjhuJos0C9dL0FpjYBAuyZTAWhZKs8dpSe4DI544z4w
gkwUB4bC2nA1TBzsywEAHyNuZ/xRjNpWvx0ToWAA2iFJqC3VO3iKcnBplMvaUuMt
jwzVSNBnKcoabXCZL2XDLt4YTZR8FSwz05IvsmwcPB7uNTBXq3T9sjejW8QQK3vT
tzyfLq4jKmQE7PoS6cqYm+hEPm2hDaC/WP9bp3FdEJxZlPH26fq1b7BWYWhQ9pBA
Nv9zTnzdR1xohTyOJBUFQ81ybEzabqXqVXUIANqIOaNcTB09/sLJ7+zuMhp3mwBu
LtjfJv8PLuT1r63bU3seROhKA98b5KfzjvbvPSg3vws78JQyoYGbqNyDfyjVjg3U
v//AdVuPie6PNtdrW3upZY4Qti5IjP9e3kimaJ+KAtTgMRG56W0WxD3SP7+YGGbG
KhntDOkKsN39hLpn9UOafTIqFu7kIaueEy/NAgMBAAGjQjBAMA8GA1UdEwEB/wQF
MAMBAf8wHQYDVR0OBBYEFHAems86dTwdZbLe8AaPy3kfIUVoMA4GA1UdDwEB/wQE
AwIBhjANBgkqhkiG9w0BAQwFAAOCAgEAOBHpp0ICx81kmeoBcZTrMdJs2gnhcd85
FoSCjXx9H5XE5rmN/lQcxxOgj8hr3uPuLdLHu+i6THAyzjrl2NA1FWiqpfeECGmy
0jm7iZsYORgGQYp/VKnDrwnKNSqlZvOuRr0kfUexwFlr34Y4VmupvEOK/RdGsd3S
+3hiemcHse9ST/sJLHx962AWMkN86UHPscJEe4+eT3f2Wyzg6La8ARwdWZSNS+WH
ZfybrncMmuiXuUdHv9XspPsqhKgtHhcYeXOGUtrwQPLe3+VJZ0LVxhlTWr9951GZ
GfmWwTV/9VsyKVaCFIXeQ6L+gjcKyEzYF8wpMtQlSc7FFqwgC4bKxvMBSaRy88Nr
lV2+tJD/fr8zGUeBK44Emon0HKDBWGX+/Hq1ZIv0Da0S+j6LbA4fusWxtGfuGha+
luhHgVInCpALIOamiBEdGhILkoTtx7JrYppt3/Raqg9gUNCOOYlCvGhqX7DXeEfL
DGabooiY2FNWot6h04JE9nqGj5QqT8D6t/TL1nzxhRPzbcSDIHUd/b5R+a0bAA+7
YTU6JqzEVCWKEIEynYmqikgLMGB/OzWsgyEL6822QW6hJAQ78XpbNeCzrICF4+GC
7KShLnwuWoWpAb26268lvOEvCTFM47VC6jNQl97md+2SA9Ma81C9wflid2M83Wle
cuLMVcQZceE=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEADCCAuigAwIBAgIQAhAteLRCvizAElaWORFU2zANBgkqhkiG9w0BAQsFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIG1lLXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyMDE3MDkxNloYDzIwNjEwNTIwMTgwOTE2WjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIG1lLXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+qg7JAcOVKjh
N83SACnBFZPyB63EusfDr/0V9ZdL8lKcmZX9sv/CqoBo3N0EvBqHQqUUX6JvFb7F
XrMUZ740kr28gSRALfXTFgNODjXeDsCtEkKRTkac/UM8xXHn+hR7UFRPHS3e0GzI
iLiwQWDkr0Op74W8aM0CfaVKvh2bp4BI1jJbdDnQ9OKXpOxNHGUf0ZGb7TkNPkgI
b2CBAc8J5o3H9lfw4uiyvl6Fz5JoP+A+zPELAioYBXDrbE7wJeqQDJrETWqR9VEK
BXURCkVnHeaJy123MpAX2ozf4pqk0V0LOEOZRS29I+USF5DcWr7QIXR/w2I8ws1Q
7ys+qbE+kQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQFJ16n
1EcCMOIhoZs/F9sR+Jy++zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQAD
ggEBAOc5nXbT3XTDEZsxX2iD15YrQvmL5m13B3ImZWpx/pqmObsgx3/dg75rF2nQ
qS+Vl+f/HLh516pj2BPP/yWCq12TRYigGav8UH0qdT3CAClYy2o+zAzUJHm84oiB
ud+6pFVGkbqpsY+QMpJUbZWu52KViBpJMYsUEy+9cnPSFRVuRAHjYynSiLk2ZEjb
Wkdc4x0nOZR5tP0FgrX0Ve2KcjFwVQJVZLgOUqmFYQ/G0TIIGTNh9tcmR7yp+xJR
A2tbPV2Z6m9Yxx4E8lLEPNuoeouJ/GR4CkMEmF8cLwM310t174o3lKKUXJ4Vs2HO
Wj2uN6R9oI+jGLMSswTzCNV1vgc=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICuDCCAj6gAwIBAgIRAOocLeZWjYkG/EbHmscuy8gwCgYIKoZIzj0EAwMwgZsx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE0MDIGA1UEAwwrQW1h
em9uIFJEUyBhcC1zb3V0aGVhc3QtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTAgFw0yMTA1MjEyMTUwMDFaGA8yMTIxMDUyMTIyNTAwMVowgZsx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE0MDIGA1UEAwwrQW1h
em9uIFJEUyBhcC1zb3V0aGVhc3QtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABCEr3jq1KtRncnZfK5cq
btY0nW6ZG3FMbh7XwBIR6Ca0f8llGZ4vJEC1pXgiM/4Dh045B9ZIzNrR54rYOIfa
2NcYZ7mk06DjIQML64hbAxbQzOAuNzLPx268MrlL2uW2XaNCMEAwDwYDVR0TAQH/
BAUwAwEB/zAdBgNVHQ4EFgQUln75pChychwN4RfHl+tOinMrfVowDgYDVR0PAQH/
BAQDAgGGMAoGCCqGSM49BAMDA2gAMGUCMGiyPINRU1mwZ4Crw01vpuPvxZxb2IOr
yX3RNlOIu4We1H+5dQk5tIvH8KGYFbWEpAIxAO9NZ6/j9osMhLgZ0yj0WVjb+uZx
YlZR9fyFisY/jNfX7QhSk+nrc3SFLRUNtpXrng==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBTCCAu2gAwIBAgIRAKiaRZatN8eiz9p0s0lu0rQwDQYJKoZIhvcNAQELBQAw
gZoxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEzMDEGA1UEAwwq
QW1hem9uIFJEUyBjYS1jZW50cmFsLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYD
VQQHDAdTZWF0dGxlMCAXDTIxMDUyMTIyMDIzNVoYDzIwNjEwNTIxMjMwMjM1WjCB
mjELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTMwMQYDVQQDDCpB
bWF6b24gUkRTIGNhLWNlbnRyYWwtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNV
BAcMB1NlYXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCygVMf
qB865IR9qYRBRFHn4eAqGJOCFx+UbraQZmjr/mnRqSkY+nhbM7Pn/DWOrRnxoh+w
q5F9ZxdZ5D5T1v6kljVwxyfFgHItyyyIL0YS7e2h7cRRscCM+75kMedAP7icb4YN
LfWBqfKHbHIOqvvQK8T6+Emu/QlG2B5LvuErrop9K0KinhITekpVIO4HCN61cuOe
CADBKF/5uUJHwS9pWw3uUbpGUwsLBuhJzCY/OpJlDqC8Y9aToi2Ivl5u3/Q/sKjr
6AZb9lx4q3J2z7tJDrm5MHYwV74elGSXoeoG8nODUqjgklIWAPrt6lQ3WJpO2kug
8RhCdSbWkcXHfX95AgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYE
FOIxhqTPkKVqKBZvMWtKewKWDvDBMA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0B
AQsFAAOCAQEAqoItII89lOl4TKvg0I1EinxafZLXIheLcdGCxpjRxlZ9QMQUN3yb
y/8uFKBL0otbQgJEoGhxm4h0tp54g28M6TN1U0332dwkjYxUNwvzrMaV5Na55I2Z
1hq4GB3NMXW+PvdtsgVOZbEN+zOyOZ5MvJHEQVkT3YRnf6avsdntltcRzHJ16pJc
Y8rR7yWwPXh1lPaPkxddrCtwayyGxNbNmRybjR48uHRhwu7v2WuAMdChL8H8bp89
TQLMrMHgSbZfee9hKhO4Zebelf1/cslRSrhkG0ESq6G5MUINj6lMg2g6F0F7Xz2v
ncD/vuRN5P+vT8th/oZ0Q2Gc68Pun0cn/g==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/zCCAuegAwIBAgIRAJYlnmkGRj4ju/2jBQsnXJYwDQYJKoZIhvcNAQELBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyB1cy1lYXN0LTIgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyMTIzMDQ0NFoYDzIwNjEwNTIyMDAwNDQ0WjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIHVzLWVhc3QtMiBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC74V3eigv+pCj5
nqDBqplY0Jp16pTeNB06IKbzb4MOTvNde6QjsZxrE1xUmprT8LxQqN9tI3aDYEYk
b9v4F99WtQVgCv3Y34tYKX9NwWQgwS1vQwnIR8zOFBYqsAsHEkeJuSqAB12AYUSd
Zv2RVFjiFmYJho2X30IrSLQfS/IE3KV7fCyMMm154+/K1Z2IJlcissydEAwgsUHw
edrE6CxJVkkJ3EvIgG4ugK/suxd8eEMztaQYJwSdN8TdfT59LFuSPl7zmF3fIBdJ
//WexcQmGabaJ7Xnx+6o2HTfkP8Zzzzaq8fvjAcvA7gyFH5EP26G2ZqMG+0y4pTx
SPVTrQEXAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFIWWuNEF
sUMOC82XlfJeqazzrkPDMA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQsFAAOC
AQEAgClmxcJaQTGpEZmjElL8G2Zc8lGc+ylGjiNlSIw8X25/bcLRptbDA90nuP+q
zXAMhEf0ccbdpwxG/P5a8JipmHgqQLHfpkvaXx+0CuP++3k+chAJ3Gk5XtY587jX
+MJfrPgjFt7vmMaKmynndf+NaIJAYczjhJj6xjPWmGrjM3MlTa9XesmelMwP3jep
bApIWAvCYVjGndbK9byyMq1nyj0TUzB8oJZQooaR3MMjHTmADuVBylWzkRMxbKPl
4Nlsk4Ef1JvIWBCzsMt+X17nuKfEatRfp3c9tbpGlAE/DSP0W2/Lnayxr4RpE9ds
ICF35uSis/7ZlsftODUe8wtpkQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
Pqj2
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
KDPtFEk=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtzCCAj2gAwIBAgIQVZ5Y/KqjR4XLou8MCD5pOjAKBggqhkjOPQQDAzCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLXNvdXRoZWFzdC00IFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIyMDUyNTE2NTgzM1oYDzIxMjIwNTI1MTc1ODMzWjCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLXNvdXRoZWFzdC00IFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEbo473OmpD5vkckdJajXg
brhmNFyoSa0WCY1njuZC2zMFp3zP6rX4I1r3imrYnJd9pFH/aSiV/r6L5ACE5RPx
4qdg5SQ7JJUaZc3DWsTOiOed7BCZSzM+KTYK/2QzDMApo0IwQDAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBTmogc06+1knsej1ltKUOdWFvwgsjAOBgNVHQ8BAf8E
BAMCAYYwCgYIKoZIzj0EAwMDaAAwZQIxAIs7TlLMbGTWNXpGiKf9DxaM07d/iDHe
F/Vv/wyWSTGdobxBL6iArQNVXz0Gr4dvPAIwd0rsoa6R0x5mtvhdRPtM37FYrbHJ
pbV+OMusQqcSLseunLBoCHenvJW0QOCQ8EDY
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICvTCCAkOgAwIBAgIQCIY7E/bFvFN2lK9Kckb0dTAKBggqhkjOPQQDAzCBnjEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTcwNQYDVQQDDC5BbWF6
b24gUkRTIFByZXZpZXcgdXMtZWFzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYD
VQQHDAdTZWF0dGxlMCAXDTIxMDUxODIxMDUxMFoYDzIxMjEwNTE4MjIwNTEwWjCB
njELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTcwNQYDVQQDDC5B
bWF6b24gUkRTIFByZXZpZXcgdXMtZWFzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEMI0hzf1JCEOI
Eue4+DmcNnSs2i2UaJxHMrNGGfU7b42a7vwP53F7045ffHPBGP4jb9q02/bStZzd
VHqfcgqkSRI7beBKjD2mfz82hF/wJSITTgCLs+NRpS6zKMFOFHUNo0IwQDAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBS8uF/6hk5mPLH4qaWv9NVZaMmyTjAOBgNV
HQ8BAf8EBAMCAYYwCgYIKoZIzj0EAwMDaAAwZQIxAO7Pu9wzLyM0X7Q08uLIL+vL
qaxe3UFuzFTWjM16MLJHbzLf1i9IDFKz+Q4hXCSiJwIwClMBsqT49BPUxVsJnjGr
EbyEk6aOOVfY1p2yQL649zh3M4h8okLnwf+bYIb1YpeU
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEADCCAuigAwIBAgIQY+JhwFEQTe36qyRlUlF8ozANBgkqhkiG9w0BAQsFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIGFmLXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUxOTE5MjQxNloYDzIwNjEwNTE5MjAyNDE2WjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIGFmLXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnIye77j6ev40
8wRPyN2OdKFSUfI9jB20Or2RLO+RDoL43+USXdrze0Wv4HMRLqaen9BcmCfaKMp0
E4SFo47bXK/O17r6G8eyq1sqnHE+v288mWtYH9lAlSamNFRF6YwA7zncmE/iKL8J
0vePHMHP/B6svw8LULZCk+nZk3tgxQn2+r0B4FOz+RmpkoVddfqqUPMbKUxhM2wf
fO7F6bJaUXDNMBPhCn/3ayKCjYr49ErmnpYV2ZVs1i34S+LFq39J7kyv6zAgbHv9
+/MtRMoRB1CjpqW0jIOZkHBdYcd1o9p1zFn591Do1wPkmMsWdjIYj+6e7UXcHvOB
2+ScIRAcnwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQGtq2W
YSyMMxpdQ3IZvcGE+nyZqTAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQAD
ggEBAEgoP3ixJsKSD5FN8dQ01RNHERl/IFbA7TRXfwC+L1yFocKnQh4Mp/msPRSV
+OeHIvemPW/wtZDJzLTOFJ6eTolGekHK1GRTQ6ZqsWiU2fmiOP8ks4oSpI+tQ9Lw
VrfZqTiEcS5wEIqyfUAZZfKDo7W1xp+dQWzfczSBuZJZwI5iaha7+ILM0r8Ckden
TVTapc5pLSoO15v0ziRuQ2bT3V3nwu/U0MRK44z+VWOJdSiKxdnOYDs8hFNnKhfe
klbTZF7kW7WbiNYB43OaAQBJ6BALZsIskEaqfeZT8FD71uN928TcEQyBDXdZpRN+
iGQZDGhht0r0URGMDSs9waJtTfA=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIF/jCCA+agAwIBAgIQXY/dmS+72lZPranO2JM9jjANBgkqhkiG9w0BAQwFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIGFwLWVhc3QtMSBSb290IENBIFJTQTQwOTYgRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTI1MjEzNDUxWhgPMjEyMTA1MjUyMjM0NTFaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgYXAtZWFzdC0xIFJvb3QgQ0EgUlNBNDA5NiBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAMyW9kBJjD/hx8e8
b5E1sF42bp8TXsz1htSYE3Tl3T1Aq379DfEhB+xa/ASDZxt7/vwa81BkNo4M6HYq
okYIXeE7cu5SnSgjWXqcERhgPevtAwgmhdE3yREe8oz2DyOi2qKKZqah+1gpPaIQ
fK0uAqoeQlyHosye3KZZKkDHBatjBsQ5kf8lhuf7wVulEZVRHY2bP2X7N98PfbpL
QdH7mWXzDtJJ0LiwFwds47BrkgK1pkHx2p1mTo+HMkfX0P6Fq1atkVC2RHHtbB/X
iYyH7paaHBzviFrhr679zNqwXIOKlbf74w3mS11P76rFn9rS1BAH2Qm6eY5S/Fxe
HEKXm4kjPN63Zy0p3yE5EjPt54yPkvumOnT+RqDGJ2HCI9k8Ehcbve0ogfdRKNqQ
VHWYTy8V33ndQRHZlx/CuU1yN61TH4WSoMly1+q1ihTX9sApmlQ14B2pJi/9DnKW
cwECrPy1jAowC2UJ45RtC8UC05CbP9yrIy/7Noj8gQDiDOepm+6w1g6aNlWoiuQS
kyI6nzz1983GcnOHya73ga7otXo0Qfg9jPghlYiMomrgshlSLDHZG0Ib/3hb8cnR
1OcN9FpzNmVK2Ll1SmTMLrIhuCkyNYX9O/bOknbcf706XeESxGduSkHEjIw/k1+2
Atteoq5dT6cwjnJ9hyhiueVlVkiDAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8w
HQYDVR0OBBYEFLUI+DD7RJs+0nRnjcwIVWzzYSsFMA4GA1UdDwEB/wQEAwIBhjAN
BgkqhkiG9w0BAQwFAAOCAgEAb1mcCHv4qMQetLGTBH9IxsB2YUUhr5dda0D2BcHr
UtDbfd0VQs4tux6h/6iKwHPx0Ew8fuuYj99WknG0ffgJfNc5/fMspxR/pc1jpdyU
5zMQ+B9wi0lOZPO9uH7/pr+d2odcNEy8zAwqdv/ihsTwLmGP54is9fVbsgzNW1cm
HKAVL2t/Ope+3QnRiRilKCN1lzhav4HHdLlN401TcWRWKbEuxF/FgxSO2Hmx86pj
e726lweCTMmnq/cTsPOVY0WMjs0or3eHDVlyLgVeV5ldyN+ptg3Oit60T05SRa58
AJPTaVKIcGQ/gKkKZConpu7GDofT67P/ox0YNY57LRbhsx9r5UY4ROgz7WMQ1yoS
Y+19xizm+mBm2PyjMUbfwZUyCxsdKMwVdOq5/UmTmdms+TR8+m1uBHPOTQ2vKR0s
Pd/THSzPuu+d3dbzRyDSLQbHFFneG760CUlD/ZmzFlQjJ89/HmAmz8IyENq+Sjhx
Jgzy+FjVZb8aRUoYLlnffpUpej1n87Ynlr1GrvC4GsRpNpOHlwuf6WD4W0qUTsC/
C9JO+fBzUj/aWlJzNcLEW6pte1SB+EdkR2sZvWH+F88TxemeDrV0jKJw5R89CDf8
ZQNfkxJYjhns+YeV0moYjqQdc7tq4i04uggEQEtVzEhRLU5PE83nlh/K2NZZm8Kj
dIA=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/zCCAuegAwIBAgIRAPVSMfFitmM5PhmbaOFoGfUwDQYJKoZIhvcNAQELBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyB1cy1lYXN0LTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyNTIyMzQ1N1oYDzIwNjEwNTI1MjMzNDU3WjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIHVzLWVhc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDu9H7TBeGoDzMr
dxN6H8COntJX4IR6dbyhnj5qMD4xl/IWvp50lt0VpmMd+z2PNZzx8RazeGC5IniV
5nrLg0AKWRQ2A/lGGXbUrGXCSe09brMQCxWBSIYe1WZZ1iU1IJ/6Bp4D2YEHpXrW
bPkOq5x3YPcsoitgm1Xh8ygz6vb7PsvJvPbvRMnkDg5IqEThapPjmKb8ZJWyEFEE
QRrkCIRueB1EqQtJw0fvP4PKDlCJAKBEs/y049FoOqYpT3pRy0WKqPhWve+hScMd
6obq8kxTFy1IHACjHc51nrGII5Bt76/MpTWhnJIJrCnq1/Uc3Qs8IVeb+sLaFC8K
DI69Sw6bAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFE7PCopt
lyOgtXX0Y1lObBUxuKaCMA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQsFAAOC
AQEAFj+bX8gLmMNefr5jRJfHjrL3iuZCjf7YEZgn89pS4z8408mjj9z6Q5D1H7yS
jNETVV8QaJip1qyhh5gRzRaArgGAYvi2/r0zPsy+Tgf7v1KGL5Lh8NT8iCEGGXwF
g3Ir+Nl3e+9XUp0eyyzBIjHtjLBm6yy8rGk9p6OtFDQnKF5OxwbAgip42CD75r/q
p421maEDDvvRFR4D+99JZxgAYDBGqRRceUoe16qDzbMvlz0A9paCZFclxeftAxv6
QlR5rItMz/XdzpBJUpYhdzM0gCzAzdQuVO5tjJxmXhkSMcDP+8Q+Uv6FA9k2VpUV
E/O5jgpqUJJ2Hc/5rs9VkAPXeA==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrzCCAjWgAwIBAgIQW0yuFCle3uj4vWiGU0SaGzAKBggqhkjOPQQDAzCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGFmLXNvdXRoLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTE5MTkzNTE2WhgPMjEyMTA1MTkyMDM1MTZaMIGXMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpvbiBS
RFMgYWYtc291dGgtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2VhdHRs
ZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABDPiKNZSaXs3Un/J/v+LTsFDANHpi7en
oL2qh0u0DoqNzEBTbBjvO23bLN3k599zh6CY3HKW0r2k1yaIdbWqt4upMCRCcUFi
I4iedAmubgzh56wJdoMZztjXZRwDthTkJKNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUWbYkcrvVSnAWPR5PJhIzppcAnZIwDgYDVR0PAQH/BAQDAgGGMAoG
CCqGSM49BAMDA2gAMGUCMCESGqpat93CjrSEjE7z+Hbvz0psZTHwqaxuiH64GKUm
mYynIiwpKHyBrzjKBmeDoQIxANGrjIo6/b8Jl6sdIZQI18V0pAyLfLiZjlHVOnhM
MOTVgr82ZuPoEHTX78MxeMnYlw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRAIbsx8XOl0sgTNiCN4O+18QwDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1ub3J0aGVhc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTI1MjE1NDU4WhgPMjA2MTA1MjUyMjU0NTha
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtbm9ydGhlYXN0LTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
tROxwXWCgn5R9gI/2Ivjzaxc0g95ysBjoJsnhPdJEHQb7w3y2kWrVWU3Y9fOitgb
CEsnEC3PrhRnzNVW0fPsK6kbvOeCmjvY30rdbxbc8h+bjXfGmIOgAkmoULEr6Hc7
G1Q/+tvv4lEwIs7bEaf+abSZxRJbZ0MBxhbHn7UHHDiMZYvzK+SV1MGCxx7JVhrm
xWu3GC1zZCsGDhB9YqY9eR6PmjbqA5wy8vqbC57dZZa1QVtWIQn3JaRXn+faIzHx
nLMN5CEWihsdmHBXhnRboXprE/OS4MFv1UrQF/XM/h5RBeCywpHePpC+Oe1T3LNC
iP8KzRFrjC1MX/WXJnmOVQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBS33XbXAUMs1znyZo4B0+B3D68WFTAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBADuadd2EmlpueY2VlrIIPC30QkoA1EOSoCmZgN6124apkoY1
HiV4r+QNPljN4WP8gmcARnNkS7ZeR4fvWi8xPh5AxQCpiaBMw4gcbTMCuKDV68Pw
P2dZCTMspvR3CDfM35oXCufdtFnxyU6PAyINUqF/wyTHguO3owRFPz64+sk3r2pT
WHmJjG9E7V+KOh0s6REgD17Gqn6C5ijLchSrPUHB0wOIkeLJZndHxN/76h7+zhMt
fFeNxPWHY2MfpcaLjz4UREzZPSB2U9k+y3pW1omCIcl6MQU9itGx/LpQE+H3ZeX2
M2bdYd5L+ow+bdbGtsVKOuN+R9Dm17YpswF+vyQ=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
Em4Hy3A=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
jGKc3k6UNxpg
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
0Ws=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtDCCAjqgAwIBAgIRAMyaTlVLN0ndGp4ffwKAfoMwCgYIKoZIzj0EAwMwgZkx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEyMDAGA1UEAwwpQW1h
em9uIFJEUyBtZS1jZW50cmFsLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjIwNTA3MDA0NDM3WhgPMjEyMjA1MDcwMTQ0MzdaMIGZMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMjAwBgNVBAMMKUFtYXpv
biBSRFMgbWUtY2VudHJhbC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE19nCV1nsI6CohSor13+B25cr
zg+IHdi9Y3L7ziQnHWI6yjBazvnKD+oC71aRRlR8b5YXsYGUQxWzPLHN7EGPcSGv
bzA9SLG1KQYCJaQ0m9Eg/iGrwKWOgylbhVw0bCxoo0IwQDAPBgNVHRMBAf8EBTAD
AQH/MB0GA1UdDgQWBBS4KsknsJXM9+QPEkBdZxUPaLr11zAOBgNVHQ8BAf8EBAMC
AYYwCgYIKoZIzj0EAwMDaAAwZQIxAJaRgrYIEfXQMZQQDxMTYS0azpyWSseQooXo
L3nYq4OHGBgYyQ9gVjvRYWU85PXbfgIwdi82DtANQFkCu+j+BU0JBY/uRKPEeYzo
JG92igKIcXPqCoxIJ7lJbbzmuf73gQu5
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
Tspdjbg=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIECTCCAvGgAwIBAgIRAJZFh4s9aZGzKaTMLrSb4acwDQYJKoZIhvcNAQELBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBCZXRhIHVzLWVhc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTE4MjEyODQxWhgPMjA2MTA1MTgyMjI4NDFa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgQmV0YSB1cy1lYXN0LTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
17i2yoU6diep+WrqxIn2CrDEO2NdJVwWTSckx4WMZlLpkQDoymSmkNHjq9ADIApD
A31Cx+843apL7wub8QkFZD0Tk7/ThdHWJOzcAM3ov98QBPQfOC1W5zYIIRP2F+vQ
TRETHQnLcW3rLv0NMk5oQvIKpJoC9ett6aeVrzu+4cU4DZVWYlJUoC/ljWzCluau
8blfW0Vwin6OB7s0HCG5/wijQWJBU5SrP/KAIPeQi1GqG5efbqAXDr/ple0Ipwyo
Xjjl73LenGUgqpANlC9EAT4i7FkJcllLPeK3NcOHjuUG0AccLv1lGsHAxZLgjk/x
z9ZcnVV9UFWZiyJTKxeKPwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1Ud
DgQWBBRWyMuZUo4gxCR3Luf9/bd2AqZ7CjAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZI
hvcNAQELBQADggEBAIqN2DlIKlvDFPO0QUZQVFbsi/tLdYM98/vvzBpttlTGVMyD
gJuQeHVz+MnhGIwoCGOlGU3OOUoIlLAut0+WG74qYczn43oA2gbMd7HoD7oL/IGg
njorBwJVcuuLv2G//SqM3nxGcLRtkRnQ+lvqPxMz9+0fKFUn6QcIDuF0QSfthLs2
WSiGEPKO9c9RSXdRQ4pXA7c3hXng8P4A2ZmdciPne5Nu4I4qLDGZYRrRLRkNTrOi
TyS6r2HNGUfgF7eOSeKt3NWL+mNChcYj71/Vycf5edeczpUgfnWy9WbPrK1svKyl
aAs2xg+X6O8qB+Mnj2dNBzm+lZIS3sIlm+nO9sg=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjSgAwIBAgIRAPAlEk8VJPmEzVRRaWvTh2AwCgYIKoZIzj0EAwMwgZYx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1h
em9uIFJEUyB1cy1lYXN0LTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTI1MjI0MTU1WhgPMjEyMTA1MjUyMzQxNTVaMIGWMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExLzAtBgNVBAMMJkFtYXpvbiBS
RFMgdXMtZWFzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdTZWF0dGxl
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEx5xjrup8II4HOJw15NTnS3H5yMrQGlbj
EDA5MMGnE9DmHp5dACIxmPXPMe/99nO7wNdl7G71OYPCgEvWm0FhdvVUeTb3LVnV
BnaXt32Ek7/oxGk1T+Df03C+W0vmuJ+wo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBTGXmqBWN/1tkSea4pNw0oHrjk2UDAOBgNVHQ8BAf8EBAMCAYYwCgYI
KoZIzj0EAwMDaAAwZQIxAIqqZWCSrIkZ7zsv/FygtAusW6yvlL935YAWYPVXU30m
jkMFLM+/RJ9GMvnO8jHfCgIwB+whlkcItzE9CRQ6CsMo/d5cEHDUu/QW6jSIh9BR
OGh9pTYPVkUbBiKPA7lVVhre
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
nWS0
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGCTCCA/GgAwIBAgIRAOY7gfcBZgR2tqfBzMbFQCUwDQYJKoZIhvcNAQEMBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1zb3V0aGVhc3QtNCBSb290IENBIFJTQTQwOTYgRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjIwNTI1MTY1NDU5WhgPMjEyMjA1MjUxNzU0NTla
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtc291dGhlYXN0LTQgUm9vdCBDQSBSU0E0MDk2IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
lfxER43FuLRdL08bddF0YhbCP+XXKj1A/TFMXmd2My8XDei8rPXFYyyjMig9+xZw
uAsIxLwz8uiA26CKA8bCZKg5VG2kTeOJAfvBJaLv1CZefs3Z4Uf1Sjvm6MF2yqEj
GoORfyfL9HiZFTDuF/hcjWoKYCfMuG6M/wO8IbdICrX3n+BiYQJu/pFO660Mg3h/
8YBBWYDbHoCiH/vkqqJugQ5BM3OI5nsElW51P1icEEqti4AZ7JmtSv9t7fIFBVyR
oaEyOgpp0sm193F/cDJQdssvjoOnaubsSYm1ep3awZAUyGN/X8MBrPY95d0hLhfH
Ehc5Icyg+hsosBljlAyksmt4hFQ9iBnWIz/ZTfGMck+6p3HVL9RDgvluez+rWv59
8q7omUGsiPApy5PDdwI/Wt/KtC34/2sjslIJfvgifdAtkRPkhff1WEwER00ADrN9
eGGInaCpJfb1Rq8cV2n00jxg7DcEd65VR3dmIRb0bL+jWK62ni/WdEyomAOMfmGj
aWf78S/4rasHllWJ+QwnaUYY3u6N8Cgio0/ep4i34FxMXqMV3V0/qXdfhyabi/LM
wCxNo1Dwt+s6OtPJbwO92JL+829QAxydfmaMTeHBsgMPkG7RwAekeuatKGHNsc2Z
x2Q4C2wVvOGAhcHwxfM8JfZs3nDSZJndtVVnFlUY0UECAwEAAaNCMEAwDwYDVR0T
AQH/BAUwAwEB/zAdBgNVHQ4EFgQUpnG7mWazy6k97/tb5iduRB3RXgQwDgYDVR0P
AQH/BAQDAgGGMA0GCSqGSIb3DQEBDAUAA4ICAQCDLqq1Wwa9Tkuv7vxBnIeVvvFF
ecTn+P+wJxl9Qa2ortzqTHZsBDyJO62d04AgBwiDXkJ9a+bthgG0H1J7Xee8xqv1
xyX2yKj24ygHjspLotKP4eDMdDi5TYq+gdkbPmm9Q69B1+W6e049JVGXvWG8/7kU
igxeuCYwtCCdUPRLf6D8y+1XMGgVv3/DSOHWvTg3MJ1wJ3n3+eve3rjGdRYWZeJu
k21HLSZYzVrCtUsh2YAeLnUbSxVuT2Xr4JehYe9zW5HEQ8Je/OUfnCy9vzoN/ITw
osAH+EBJQey7RxEDqMwCaRefH0yeHFcnOll0OXg/urnQmwbEYzQ1uutJaBPsjU0J
Qf06sMxI7GiB5nPE+CnI2sM6A9AW9kvwexGXpNJiLxF8dvPQthpOKGcYu6BFvRmt
6ctfXd9b7JJoVqMWuf5cCY6ihpk1e9JTlAqu4Eb/7JNyGiGCR40iSLvV28un9wiE
plrdYxwcNYq851BEu3r3AyYWw/UW1AKJ5tM+/Gtok+AphMC9ywT66o/Kfu44mOWm
L3nSLSWEcgfUVgrikpnyGbUnGtgCmHiMlUtNVexcE7OtCIZoVAlCGKNu7tyuJf10
Qlk8oIIzfSIlcbHpOYoN79FkLoDNc2er4Gd+7w1oPQmdAB0jBJnA6t0OUBPKdDdE
Ufff2jrbfbzECn1ELg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
fejbXelUSJSzDIdY
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGCTCCA/GgAwIBAgIRAN7Y9G9i4I+ZaslPobE7VL4wDQYJKoZIhvcNAQEMBQAw
gZwxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTE1MDMGA1UEAwws
QW1hem9uIFJEUyBhcC1ub3J0aGVhc3QtMiBSb290IENBIFJTQTQwOTYgRzExEDAO
BgNVBAcMB1NlYXR0bGUwIBcNMjEwNTIwMTYzMzIzWhgPMjEyMTA1MjAxNzMzMjNa
MIGcMQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywg
SW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExNTAzBgNVBAMM
LEFtYXpvbiBSRFMgYXAtbm9ydGhlYXN0LTIgUm9vdCBDQSBSU0E0MDk2IEcxMRAw
DgYDVQQHDAdTZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
4BEPCiIfiK66Q/qa8k+eqf1Q3qsa6Xuu/fPkpuStXVBShhtXd3eqrM0iT4Xxs420
Va0vSB3oZ7l86P9zYfa60n6PzRxdYFckYX330aI7L/oFIdaodB/C9szvROI0oLG+
6RwmIF2zcprH0cTby8MiM7G3v9ykpq27g4WhDC1if2j8giOQL3oHpUaByekZNIHF
dIllsI3RkXmR3xmmxoOxJM1B9MZi7e1CvuVtTGOnSGpNCQiqofehTGwxCN2wFSK8
xysaWlw48G0VzZs7cbxoXMH9QbMpb4tpk0d+T8JfAPu6uWO9UwCLWWydf0CkmA/+
D50/xd1t33X9P4FEaPSg5lYbHXzSLWn7oLbrN2UqMLaQrkoEBg/VGvzmfN0mbflw
+T87bJ/VEOVNlG+gepyCTf89qIQVWOjuYMox4sK0PjzZGsYEuYiq1+OUT3vk/e5K
ag1fCcq2Isy4/iwB2xcXrsQ6ljwdk1fc+EmOnjGKrhuOHJY3S+RFv4ToQBsVyYhC
XGaC3EkqIX0xaCpDimxYhFjWhpDXAjG/zJ+hRLDAMCMhl/LPGRk/D1kzSbPmdjpl
lEMK5695PeBvEBTQdBQdOiYgOU3vWU6tzwwHfiM2/wgvess/q0FDAHfJhppbgbb9
3vgsIUcsvoC5o29JvMsUxsDRvsAfEmMSDGkJoA/X6GECAwEAAaNCMEAwDwYDVR0T
AQH/BAUwAwEB/zAdBgNVHQ4EFgQUgEWm1mZCbGD6ytbwk2UU1aLaOUUwDgYDVR0P
AQH/BAQDAgGGMA0GCSqGSIb3DQEBDAUAA4ICAQBb4+ABTGBGwxK1U/q4g8JDqTQM
1Wh8Oz8yAk4XtPJMAmCctxbd81cRnSnePWw/hxViLVtkZ/GsemvXfqAQyOn1coN7
QeYSw+ZOlu0j2jEJVynmgsR7nIRqE7QkCyZAU+d2FTJUfmee+IiBiGyFGgxz9n7A
JhBZ/eahBbiuoOik/APW2JWLh0xp0W0GznfJ8lAlaQTyDa8iDXmVtbJg9P9qzkvl
FgPXQttzEOyooF8Pb2LCZO4kUz+1sbU7tHdr2YE+SXxt6D3SBv+Yf0FlvyWLiqVk
GDEOlPPTDSjAWgKnqST8UJ0RDcZK/v1ixs7ayqQJU0GUQm1I7LGTErWXHMnCuHKe
UKYuiSZwmTcJ06NgdhcCnGZgPq13ryMDqxPeltQc3n5eO7f1cL9ERYLDLOzm6A9P
oQ3MfcVOsbHgGHZWaPSeNrQRN9xefqBXH0ZPasgcH9WJdsLlEjVUXoultaHOKx3b
UCCb+d3EfqF6pRT488ippOL6bk7zNubwhRa/+y4wjZtwe3kAX78ACJVcjPobH9jZ
ErySads5zdQeaoee5wRKdp3TOfvuCe4bwLRdhOLCHWzEcXzY3g/6+ppLvNom8o+h
Bh5X26G6KSfr9tqhQ3O9IcbARjnuPbvtJnoPY0gz3EHHGPhy0RNW8i2gl3nUp0ah
PtjwbKW0hYAhIttT0Q==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtzCCAj2gAwIBAgIQQRBQTs6Y3H1DDbpHGta3lzAKBggqhkjOPQQDAzCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLXNvdXRoZWFzdC0zIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDYxMTAwMTI0M1oYDzIxMjEwNjExMDExMjQzWjCBmzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTQwMgYDVQQDDCtBbWF6
b24gUkRTIGFwLXNvdXRoZWFzdC0zIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEs0942Xj4m/gKA+WA6F5h
AHYuek9eGpzTRoLJddM4rEV1T3eSueytMVKOSlS3Ub9IhyQrH2D8EHsLYk9ktnGR
pATk0kCYTqFbB7onNo070lmMJmGT/Q7NgwC8cySChFxbo0IwQDAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBQ20iKBKiNkcbIZRu0y1uoF1yJTEzAOBgNVHQ8BAf8E
BAMCAYYwCgYIKoZIzj0EAwMDaAAwZQIwYv0wTSrpQTaPaarfLN8Xcqrqu3hzl07n
FrESIoRw6Cx77ZscFi2/MV6AFyjCV/TlAjEAhpwJ3tpzPXpThRML8DMJYZ3YgMh3
CMuLqhPpla3cL0PhybrD27hJWl29C4el6aMO
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrDCCAjOgAwIBAgIQGcztRyV40pyMKbNeSN+vXTAKBggqhkjOPQQDAzCBljEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMS8wLQYDVQQDDCZBbWF6
b24gUkRTIHVzLWVhc3QtMiBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTAgFw0yMTA1MjEyMzE1NTZaGA8yMTIxMDUyMjAwMTU1NlowgZYxCzAJBgNV
BAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYD
VQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1hem9uIFJE
UyB1cy1lYXN0LTIgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1NlYXR0bGUw
djAQBgcqhkjOPQIBBgUrgQQAIgNiAAQfDcv+GGRESD9wT+I5YIPRsD3L+/jsiIis
Tr7t9RSbFl+gYpO7ZbDXvNbV5UGOC5lMJo/SnqFRTC6vL06NF7qOHfig3XO8QnQz
6T5uhhrhnX2RSY3/10d2kTyHq3ZZg3+jQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYD
VR0OBBYEFLDyD3PRyNXpvKHPYYxjHXWOgfPnMA4GA1UdDwEB/wQEAwIBhjAKBggq
hkjOPQQDAwNnADBkAjB20HQp6YL7CqYD82KaLGzgw305aUKw2aMrdkBR29J183jY
6Ocj9+Wcif9xnRMS+7oCMAvrt03rbh4SU9BohpRUcQ2Pjkh7RoY0jDR4Xq4qzjNr
5UFr3BXpFvACxXF51BksGQ==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjWgAwIBAgIQeKbS5zvtqDvRtwr5H48cAjAKBggqhkjOPQQDAzCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIG1lLXNvdXRoLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTIwMTcxOTU1WhgPMjEyMTA1MjAxODE5NTVaMIGXMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpvbiBS
RFMgbWUtc291dGgtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2VhdHRs
ZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABEKjgUaAPmUlRMEQdBC7BScAGosJ1zRV
LDd38qTBjzgmwBfQJ5ZfGIvyEK5unB09MB4e/3qqK5I/L6Qn5Px/n5g4dq0c7MQZ
u7G9GBYm90U3WRJBf7lQrPStXaRnS4A/O6NCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUNKcAbGEIn03/vkwd8g6jNyiRdD4wDgYDVR0PAQH/BAQDAgGGMAoG
CCqGSM49BAMDA2cAMGQCMHIeTrjenCSYuGC6txuBt/0ZwnM/ciO9kHGWVCoK8QLs
jGghb5/YSFGZbmQ6qpGlSAIwVOQgdFfTpEfe5i+Vs9frLJ4QKAfc27cTNYzRIM0I
E+AJgK4C4+DiyyMzOpiCfmvq
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
WT1QcNdw7ntUJP/w
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrzCCAjWgAwIBAgIQARky6+5PNFRkFVOp3Ob1CTAKBggqhkjOPQQDAzCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGV1LXNvdXRoLTIgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjIwNTIzMTg0MTI4WhgPMjEyMjA1MjMxOTQxMjdaMIGXMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpvbiBS
RFMgZXUtc291dGgtMiBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2VhdHRs
ZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABNVGL5oF7cfIBxKyWd2PVK/S5yQfaJY3
QFHWvEdt6951n9JhiiPrHzfVHsxZp1CBjILRMzjgRbYWmc8qRoLkgGE7htGdwudJ
Fa/WuKzO574Prv4iZXUnVGTboC7JdvKbh6NCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUgDeIIEKynwUbNXApdIPnmRWieZwwDgYDVR0PAQH/BAQDAgGGMAoG
CCqGSM49BAMDA2gAMGUCMEOOJfucrST+FxuqJkMZyCM3gWGZaB+/w6+XUAJC6hFM
uSTY0F44/bERkA4XhH+YGAIxAIpJQBakCA1/mXjsTnQ+0El9ty+LODp8ibkn031c
8DKDS7pR9UK7ZYdR6zFg3ZCjQw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjOgAwIBAgIQJvkWUcYLbnxtuwnyjMmntDAKBggqhkjOPQQDAzCBljEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMS8wLQYDVQQDDCZBbWF6
b24gUkRTIGV1LXdlc3QtMyBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTAgFw0yMTA1MjUyMjI2MTJaGA8yMTIxMDUyNTIzMjYxMlowgZYxCzAJBgNV
BAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMwEQYD
VQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1hem9uIFJE
UyBldS13ZXN0LTMgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1NlYXR0bGUw
djAQBgcqhkjOPQIBBgUrgQQAIgNiAARENn8uHCyjn1dFax4OeXxvbV861qsXFD9G
DshumTmFzWWHN/69WN/AOsxy9XN5S7Cgad4gQgeYYYgZ5taw+tFo/jQvCLY//uR5
uihcLuLJ78opvRPvD9kbWZ6oXfBtFkWjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYD
VR0OBBYEFKiK3LpoF+gDnqPldGSwChBPCYciMA4GA1UdDwEB/wQEAwIBhjAKBggq
hkjOPQQDAwNpADBmAjEA+7qfvRlnvF1Aosyp9HzxxCbN7VKu+QXXPhLEBWa5oeWW
UOcifunf/IVLC4/FGCsLAjEAte1AYp+iJyOHDB8UYkhBE/1sxnFaTiEPbvQBU0wZ
SuwWVLhu2wWDuSW+K7tTuL8p
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/zCCAuegAwIBAgIRAKeDpqX5WFCGNo94M4v69sUwDQYJKoZIhvcNAQELBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyBldS13ZXN0LTMgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyNTIyMTgzM1oYDzIwNjEwNTI1MjMxODMzWjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGV1LXdlc3QtMyBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCcKOTEMTfzvs4H
WtJR8gI7GXN6xesulWtZPv21oT+fLGwJ+9Bv8ADCGDDrDxfeH/HxJmzG9hgVAzVn
4g97Bn7q07tGZM5pVi96/aNp11velZT7spOJKfJDZTlGns6DPdHmx48whpdO+dOb
6+eR0VwCIv+Vl1fWXgoACXYCoKjhxJs+R+fwY//0JJ1YG8yjZ+ghLCJmvlkOJmE1
TCPUyIENaEONd6T+FHGLVYRRxC2cPO65Jc4yQjsXvvQypoGgx7FwD5voNJnFMdyY
754JGPOOe/SZdepN7Tz7UEq8kn7NQSbhmCsgA/Hkjkchz96qN/YJ+H/okiQUTNB0
eG9ogiVFAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFFjayw9Y
MjbxfF14XAhMM2VPl0PfMA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQsFAAOC
AQEAAtmx6d9+9CWlMoU0JCirtp4dSS41bBfb9Oor6GQ8WIr2LdfZLL6uES/ubJPE
1Sh5Vu/Zon5/MbqLMVrfniv3UpQIof37jKXsjZJFE1JVD/qQfRzG8AlBkYgHNEiS
VtD4lFxERmaCkY1tjKB4Dbd5hfhdrDy29618ZjbSP7NwAfnwb96jobCmMKgxVGiH
UqsLSiEBZ33b2hI7PJ6iTJnYBWGuiDnsWzKRmheA4nxwbmcQSfjbrNwa93w3caL2
v/4u54Kcasvcu3yFsUwJygt8z43jsGAemNZsS7GWESxVVlW93MJRn6M+MMakkl9L
tWaXdHZ+KUV7LhfYLb0ajvb40w==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBDCCAuygAwIBAgIQJ5oxPEjefCsaESSwrxk68DANBgkqhkiG9w0BAQsFADCB
mjELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTMwMQYDVQQDDCpB
bWF6b24gUkRTIGV1LWNlbnRyYWwtMiBSb290IENBIFJTQTIwNDggRzExEDAOBgNV
BAcMB1NlYXR0bGUwIBcNMjIwNjA2MjExNzA1WhgPMjA2MjA2MDYyMjE3MDVaMIGa
MQswCQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5j
LjETMBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMzAxBgNVBAMMKkFt
YXpvbiBSRFMgZXUtY2VudHJhbC0yIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UE
BwwHU2VhdHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALTQt5eX
g+VP3BjO9VBkWJhE0GfLrU/QIk32I6WvrnejayTrlup9H1z4QWlXF7GNJrqScRMY
KhJHlcP05aPsx1lYco6pdFOf42ybXyWHHJdShj4A5glU81GTT+VrXGzHSarLmtua
eozkQgPpDsSlPt0RefyTyel7r3Cq+5K/4vyjCTcIqbfgaGwTU36ffjM1LaPCuE4O
nINMeD6YuImt2hU/mFl20FZ+IZQUIFZZU7pxGLqTRz/PWcH8tDDxnkYg7tNuXOeN
JbTpXrw7St50/E9ZQ0llGS+MxJD8jGRAa/oL4G/cwnV8P2OEPVVkgN9xDDQeieo0
3xkzolkDkmeKOnUCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU
bwu8635iQGQMRanekesORM8Hkm4wDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEB
CwUAA4IBAQAgN6LE9mUgjsj6xGCX1afYE69fnmCjjb0rC6eEe1mb/QZNcyw4XBIW
6+zTXo4mjZ4ffoxb//R0/+vdTE7IvaLgfAZgFsLKJCtYDDstXZj8ujQnGR9Pig3R
W+LpNacvOOSJSawNQq0Xrlcu55AU4buyD5VjcICnfF1dqBMnGTnh27m/scd/ZMx/
kapHZ/fMoK2mAgSX/NvUKF3UkhT85vSSM2BTtET33DzCPDQTZQYxFBa4rFRmFi4c
BLlmIReiCGyh3eJhuUUuYAbK6wLaRyPsyEcIOLMQmZe1+gAFm1+1/q5Ke9ugBmjf
PbTWjsi/lfZ5CdVAhc5lmZj/l5aKqwaS
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjSgAwIBAgIRAKKPTYKln9L4NTx9dpZGUjowCgYIKoZIzj0EAwMwgZYx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1h
em9uIFJEUyBldS13ZXN0LTIgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTIxMjI1NTIxWhgPMjEyMTA1MjEyMzU1MjFaMIGWMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExLzAtBgNVBAMMJkFtYXpvbiBS
RFMgZXUtd2VzdC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdTZWF0dGxl
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE/owTReDvaRqdmbtTzXbyRmEpKCETNj6O
hZMKH0F8oU9Tmn8RU7kQQj6xUKEyjLPrFBN7c+26TvrVO1KmJAvbc8bVliiJZMbc
C0yV5PtJTalvlMZA1NnciZuhxaxrzlK1o0IwQDAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBT4i5HaoHtrs7Mi8auLhMbKM1XevDAOBgNVHQ8BAf8EBAMCAYYwCgYI
KoZIzj0EAwMDaAAwZQIxAK9A+8/lFdX4XJKgfP+ZLy5ySXC2E0Spoy12Gv2GdUEZ
p1G7c1KbWVlyb1d6subzkQIwKyH0Naf/3usWfftkmq8SzagicKz5cGcEUaULq4tO
GzA/AMpr63IDBAqkZbMDTCmH
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrzCCAjWgAwIBAgIQTgIvwTDuNWQo0Oe1sOPQEzAKBggqhkjOPQQDAzCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGV1LW5vcnRoLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTI0MjEwNjM4WhgPMjEyMTA1MjQyMjA2MzhaMIGXMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpvbiBS
RFMgZXUtbm9ydGgtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwHU2VhdHRs
ZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABJuzXLU8q6WwSKXBvx8BbdIi3mPhb7Xo
rNJBfuMW1XRj5BcKH1ZoGaDGw+BIIwyBJg8qNmCK8kqIb4cH8/Hbo3Y+xBJyoXq/
cuk8aPrxiNoRsKWwiDHCsVxaK9L7GhHHAqNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUYgcsdU4fm5xtuqLNppkfTHM2QMYwDgYDVR0PAQH/BAQDAgGGMAoG
CCqGSM49BAMDA2gAMGUCMQDz/Rm89+QJOWJecYAmYcBWCcETASyoK1kbr4vw7Hsg
7Ew3LpLeq4IRmTyuiTMl0gMCMAa0QSjfAnxBKGhAnYxcNJSntUyyMpaXzur43ec0
3D8npJghwC4DuICtKEkQiI5cSg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
u3UBpZI=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtDCCAjmgAwIBAgIQenQbcP/Zbj9JxvZ+jXbRnTAKBggqhkjOPQQDAzCBmTEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTIwMAYDVQQDDClBbWF6
b24gUkRTIGV1LWNlbnRyYWwtMSBSb290IENBIEVDQzM4NCBHMTEQMA4GA1UEBwwH
U2VhdHRsZTAgFw0yMTA1MjEyMjMzMjRaGA8yMTIxMDUyMTIzMzMyNFowgZkxCzAJ
BgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMuMRMw
EQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEyMDAGA1UEAwwpQW1hem9u
IFJEUyBldS1jZW50cmFsLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAATlBHiEM9LoEb1Hdnd5j2VpCDOU
5nGuFoBD8ROUCkFLFh5mHrHfPXwBc63heW9WrP3qnDEm+UZEUvW7ROvtWCTPZdLz
Z4XaqgAlSqeE2VfUyZOZzBSgUUJk7OlznXfkCMOjQjBAMA8GA1UdEwEB/wQFMAMB
Af8wHQYDVR0OBBYEFDT/ThjQZl42Nv/4Z/7JYaPNMly2MA4GA1UdDwEB/wQEAwIB
hjAKBggqhkjOPQQDAwNpADBmAjEAnZWmSgpEbmq+oiCa13l5aGmxSlfp9h12Orvw
Dq/W5cENJz891QD0ufOsic5oGq1JAjEAp5kSJj0MxJBTHQze1Aa9gG4sjHBxXn98
4MP1VGsQuhfndNHQb4V0Au7OWnOeiobq
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/zCCAuegAwIBAgIRAMgnyikWz46xY6yRgiYwZ3swDQYJKoZIhvcNAQELBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyBldS13ZXN0LTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyMDE2NDkxMloYDzIwNjEwNTIwMTc0OTEyWjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGV1LXdlc3QtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCi8JYOc9cYSgZH
gYPxLk6Xcc7HqzamvsnjYU98Dcb98y6iDqS46Ra2Ne02MITtU5MDL+qjxb8WGDZV
RUA9ZS69tkTO3gldW8QdiSh3J6hVNJQW81F0M7ZWgV0gB3n76WCmfT4IWos0AXHM
5v7M/M4tqVmCPViQnZb2kdVlM3/Xc9GInfSMCgNfwHPTXl+PXX+xCdNBePaP/A5C
5S0oK3HiXaKGQAy3K7VnaQaYdiv32XUatlM4K2WS4AMKt+2cw3hTCjlmqKRHvYFQ
veWCXAuc+U5PQDJ9SuxB1buFJZhT4VP3JagOuZbh5NWpIbOTxlAJOb5pGEDuJTKi
1gQQQVEFAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFNXm+N87
OFxK9Af/bjSxDCiulGUzMA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0BAQsFAAOC
AQEAkqIbkgZ45spvrgRQ6n9VKzDLvNg+WciLtmVrqyohwwJbj4pYvWwnKQCkVc7c
hUOSBmlSBa5REAPbH5o8bdt00FPRrD6BdXLXhaECKgjsHe1WW08nsequRKD8xVmc
8bEX6sw/utBeBV3mB+3Zv7ejYAbDFM4vnRsWtO+XqgReOgrl+cwdA6SNQT9oW3e5
rSQ+VaXgJtl9NhkiIysq9BeYigxqS/A13pHQp0COMwS8nz+kBPHhJTsajHCDc8F4
HfLi6cgs9G0gaRhT8FCH66OdGSqn196sE7Y3bPFFFs/3U+vxvmQgoZC6jegQXAg5
Prxd+VNXtNI/azitTysQPumH7A==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEBTCCAu2gAwIBAgIRAO8bekN7rUReuNPG8pSTKtEwDQYJKoZIhvcNAQELBQAw
gZoxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEzMDEGA1UEAwwq
QW1hem9uIFJEUyBldS1jZW50cmFsLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYD
VQQHDAdTZWF0dGxlMCAXDTIxMDUyMTIyMjM0N1oYDzIwNjEwNTIxMjMyMzQ3WjCB
mjELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTMwMQYDVQQDDCpB
bWF6b24gUkRTIGV1LWNlbnRyYWwtMSBSb290IENBIFJTQTIwNDggRzExEDAOBgNV
BAcMB1NlYXR0bGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCTTYds
Tray+Q9VA5j5jTh5TunHKFQzn68ZbOzdqaoi/Rq4ohfC0xdLrxCpfqn2TGDHN6Zi
2qGK1tWJZEd1H0trhzd9d1CtGK+3cjabUmz/TjSW/qBar7e9MA67/iJ74Gc+Ww43
A0xPNIWcL4aLrHaLm7sHgAO2UCKsrBUpxErOAACERScVYwPAfu79xeFcX7DmcX+e
lIqY16pQAvK2RIzrekSYfLFxwFq2hnlgKHaVgZ3keKP+nmXcXmRSHQYUUr72oYNZ
HcNYl2+gxCc9ccPEHM7xncVEKmb5cWEWvVoaysgQ+osi5f5aQdzgC2X2g2daKbyA
XL/z5FM9GHpS5BJjAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYE
FBDAiJ7Py9/A9etNa/ebOnx5l5MGMA4GA1UdDwEB/wQEAwIBhjANBgkqhkiG9w0B
AQsFAAOCAQEALMh/+81fFPdJV/RrJUeoUvFCGMp8iaANu97NpeJyKitNOv7RoeVP
WjivS0KcCqZaDBs+p6IZ0sLI5ZH098LDzzytcfZg0PsGqUAb8a0MiU/LfgDCI9Ee
jsOiwaFB8k0tfUJK32NPcIoQYApTMT2e26lPzYORSkfuntme2PTHUnuC7ikiQrZk
P+SZjWgRuMcp09JfRXyAYWIuix4Gy0eZ4rpRuaTK6mjAb1/LYoNK/iZ/gTeIqrNt
l70OWRsWW8jEmSyNTIubGK/gGGyfuZGSyqoRX6OKHESkP6SSulbIZHyJ5VZkgtXo
2XvyRyJ7w5pFyoofrL3Wv0UF8yt/GDszmg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIF/zCCA+egAwIBAgIRAMDk/F+rrhdn42SfE+ghPC8wDQYJKoZIhvcNAQEMBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyBldS13ZXN0LTIgUm9vdCBDQSBSU0E0MDk2IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyMTIyNTEyMloYDzIxMjEwNTIxMjM1MTIyWjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGV1LXdlc3QtMiBSb290IENBIFJTQTQwOTYgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQC2twMALVg9vRVu
VNqsr6N8thmp3Dy8jEGTsm3GCQ+C5P2YcGlD/T/5icfWW84uF7Sx3ezcGlvsqFMf
Ukj9sQyqtz7qfFFugyy7pa/eH9f48kWFHLbQYm9GEgbYBIrWMp1cy3vyxuMCwQN4
DCncqU+yNpy0CprQJEha3PzY+3yJOjDQtc3zr99lyECCFJTDUucxHzyQvX89eL74
uh8la0lKH3v9wPpnEoftbrwmm5jHNFdzj7uXUHUJ41N7af7z7QUfghIRhlBDiKtx
5lYZemPCXajTc3ryDKUZC/b+B6ViXZmAeMdmQoPE0jwyEp/uaUcdp+FlUQwCfsBk
ayPFEApTWgPiku2isjdeTVmEgL8bJTDUZ6FYFR7ZHcYAsDzcwHgIu3GGEMVRS3Uf
ILmioiyly9vcK4Sa01ondARmsi/I0s7pWpKflaekyv5boJKD/xqwz9lGejmJHelf
8Od2TyqJScMpB7Q8c2ROxBwqwB72jMCEvYigB+Wnbb8RipliqNflIGx938FRCzKL
UQUBmNAznR/yRRL0wHf9UAE/8v9a09uZABeiznzOFAl/frHpgdAbC00LkFlnwwgX
g8YfEFlkp4fLx5B7LtoO6uVNFVimLxtwirpyKoj3G4M/kvSTux8bTw0heBCmWmKR
57MS6k7ODzbv+Kpeht2hqVZCNFMxoQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/
MB0GA1UdDgQWBBRuMnDhJjoj7DcKALj+HbxEqj3r6jAOBgNVHQ8BAf8EBAMCAYYw
DQYJKoZIhvcNAQEMBQADggIBALSnXfx72C3ldhBP5kY4Mo2DDaGQ8FGpTOOiD95d
0rf7I9LrsBGVqu/Nir+kqqP80PB70+Jy9fHFFigXwcPBX3MpKGxK8Cel7kVf8t1B
4YD6A6bqlzP+OUL0uGWfZpdpDxwMDI2Flt4NEldHgXWPjvN1VblEKs0+kPnKowyg
jhRMgBbD/y+8yg0fIcjXUDTAw/+INcp21gWaMukKQr/8HswqC1yoqW9in2ijQkpK
2RB9vcQ0/gXR0oJUbZQx0jn0OH8Agt7yfMAnJAdnHO4M3gjvlJLzIC5/4aGrRXZl
JoZKfJ2fZRnrFMi0nhAYDeInoS+Rwx+QzaBk6fX5VPyCj8foZ0nmqvuYoydzD8W5
mMlycgxFqS+DUmO+liWllQC4/MnVBlHGB1Cu3wTj5kgOvNs/k+FW3GXGzD3+rpv0
QTLuwSbMr+MbEThxrSZRSXTCQzKfehyC+WZejgLb+8ylLJUA10e62o7H9PvCrwj+
ZDVmN7qj6amzvndCP98sZfX7CFZPLfcBd4wVIjHsFjSNEwWHOiFyLPPG7cdolGKA
lOFvonvo4A1uRc13/zFeP0Xi5n5OZ2go8aOOeGYdI2vB2sgH9R2IASH/jHmr0gvY
0dfBCcfXNgrS0toq0LX/y+5KkKOxh52vEYsJLdhqrveuZhQnsFEm/mFwjRXkyO7c
2jpC
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIGADCCA+igAwIBAgIQYe0HgSuFFP9ivYM2vONTrTANBgkqhkiG9w0BAQwFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIGV1LXNvdXRoLTEgUm9vdCBDQSBSU0E0MDk2IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUxOTE4MzMyMVoYDzIxMjEwNTE5MTkzMzIxWjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIGV1LXNvdXRoLTEgUm9vdCBDQSBSU0E0MDk2IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuO7QPKfPMTo2
POQWvzDLwi5f++X98hGjORI1zkN9kotCYH5pAzSBwBPoMNaIfedgmsIxGHj2fq5G
4oXagNhNuGP79Zl6uKW5H7S74W7aWM8C0s8zuxMOI4GZy5h2IfQk3m/3AzZEX5w8
UtNPkzo2feDVOkerHT+j+vjXgAxZ4wHnuMDcRT+K4r9EXlAH6X9b/RO0JlfEwmNz
xlqqGxocq9qRC66N6W0HF2fNEAKP84n8H80xcZBOBthQORRi8HSmKcPdmrvwCuPz
M+L+j18q6RAVaA0ABbD0jMWcTf0UvjUfBStn5mvu/wGlLjmmRkZsppUTRukfwqXK
yltUsTq0tOIgCIpne5zA4v+MebbR5JBnsvd4gdh5BI01QH470yB7BkUefZ9bobOm
OseAAVXcYFJKe4DAA6uLDrqOfFSxV+CzVvEp3IhLRaik4G5MwI/h2c/jEYDqkg2J
HMflxc2gcSMdk7E5ByLz5f6QrFfSDFk02ZJTs4ssbbUEYohht9znPMQEaWVqATWE
3n0VspqZyoBNkH/agE5GiGZ/k/QyeqzMNj+c9kr43Upu8DpLrz8v2uAp5xNj3YVg
ihaeD6GW8+PQoEjZ3mrCmH7uGLmHxh7Am59LfEyNrDn+8Rq95WvkmbyHSVxZnBmo
h/6O3Jk+0/QhIXZ2hryMflPcYWeRGH0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB
/zAdBgNVHQ4EFgQU2eFK7+R3x/me8roIBNxBrplkM6EwDgYDVR0PAQH/BAQDAgGG
MA0GCSqGSIb3DQEBDAUAA4ICAQB5gWFe5s7ObQFj1fTO9L6gYgtFhnwdmxU0q8Ke
HWCrdFmyXdC39qdAFOwM5/7fa9zKmiMrZvy9HNvCXEp4Z7z9mHhBmuqPZQx0qPgU
uLdP8wGRuWryzp3g2oqkX9t31Z0JnkbIdp7kfRT6ME4I4VQsaY5Y3mh+hIHOUvcy
p+98i3UuEIcwJnVAV9wTTzrWusZl9iaQ1nSYbmkX9bBssJ2GmtW+T+VS/1hJ/Q4f
AlE3dOQkLFoPPb3YRWBHr2n1LPIqMVwDNAuWavRA2dSfaLl+kzbn/dua7HTQU5D4
b2Fu2vLhGirwRJe+V7zdef+tI7sngXqjgObyOeG5O2BY3s+um6D4fS0Th3QchMO7
0+GwcIgSgcjIjlrt6/xJwJLE8cRkUUieYKq1C4McpZWTF30WnzOPUzRzLHkcNzNA
0A7sKMK6QoYWo5Rmo8zewUxUqzc9oQSrYADP7PEwGncLtFe+dlRFx+PA1a+lcIgo
1ZGfXigYtQ3VKkcknyYlJ+hN4eCMBHtD81xDy9iP2MLE41JhLnoB2rVEtewO5diF
7o95Mwl84VMkLhhHPeGKSKzEbBtYYBifHNct+Bst8dru8UumTltgfX6urH3DN+/8
JF+5h3U8oR2LL5y76cyeb+GWDXXy9zoQe2QvTyTy88LwZq1JzujYi2k8QiLLhFIf
FEv9Bg==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICsDCCAjagAwIBAgIRAMgApnfGYPpK/fD0dbN2U4YwCgYIKoZIzj0EAwMwgZcx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwnQW1h
em9uIFJEUyBldS1zb3V0aC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMCAXDTIxMDUxOTE4MzgxMVoYDzIxMjEwNTE5MTkzODExWjCBlzELMAkG
A1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzAR
BgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6b24g
UkRTIGV1LXNvdXRoLTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1NlYXR0
bGUwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAQfEWl6d4qSuIoECdZPp+39LaKsfsX7
THs3/RrtT0+h/jl3bjZ7Qc68k16x+HGcHbaayHfqD0LPdzH/kKtNSfQKqemdxDQh
Z4pwkixJu8T1VpXZ5zzCvBXCl75UqgEFS92jQjBAMA8GA1UdEwEB/wQFMAMBAf8w
HQYDVR0OBBYEFFPrSNtWS5JU+Tvi6ABV231XbjbEMA4GA1UdDwEB/wQEAwIBhjAK
BggqhkjOPQQDAwNoADBlAjEA+a7hF1IrNkBd2N/l7IQYAQw8chnRZDzh4wiGsZsC
6A83maaKFWUKIb3qZYXFSi02AjAbp3wxH3myAmF8WekDHhKcC2zDvyOiKLkg9Y6v
ZVmyMR043dscQbcsVoacOYv198c=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICtDCCAjqgAwIBAgIRAPhVkIsQ51JFhD2kjFK5uAkwCgYIKoZIzj0EAwMwgZkx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEyMDAGA1UEAwwpQW1h
em9uIFJEUyBldS1jZW50cmFsLTIgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjIwNjA2MjEyOTE3WhgPMjEyMjA2MDYyMjI5MTdaMIGZMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMjAwBgNVBAMMKUFtYXpv
biBSRFMgZXUtY2VudHJhbC0yIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEA5xnIEBtG5b2nmbj49UEwQza
yX0844fXjccYzZ8xCDUe9dS2XOUi0aZlGblgSe/3lwjg8fMcKXLObGGQfgIx1+5h
AIBjORis/dlyN5q/yH4U5sjS8tcR0GDGVHrsRUZCo0IwQDAPBgNVHRMBAf8EBTAD
AQH/MB0GA1UdDgQWBBRK+lSGutXf4DkTjR3WNfv4+KeNFTAOBgNVHQ8BAf8EBAMC
AYYwCgYIKoZIzj0EAwMDaAAwZQIxAJ4NxQ1Gerqr70ZrnUqc62Vl8NNqTzInamCG
Kce3FTsMWbS9qkgrjZkO9QqOcGIw/gIwSLrwUT+PKr9+H9eHyGvpq9/3AIYSnFkb
Cf3dyWPiLKoAtLFwjzB/CkJlsAS1c8dS
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIF/jCCA+agAwIBAgIQGZH12Q7x41qIh9vDu9ikTjANBgkqhkiG9w0BAQwFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIGV1LXdlc3QtMyBSb290IENBIFJTQTQwOTYgRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTI1MjIyMjMzWhgPMjEyMTA1MjUyMzIyMzNaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgZXUtd2VzdC0zIFJvb3QgQ0EgUlNBNDA5NiBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAMqE47sHXWzdpuqj
JHb+6jM9tDbQLDFnYjDWpq4VpLPZhb7xPNh9gnYYTPKG4avG421EblAHqzy9D2pN
1z90yKbIfUb/Sy2MhQbmZomsObhONEra06fJ0Dydyjswf1iYRp2kwpx5AgkVoNo7
3dlws73zFjD7ImKvUx2C7B75bhnw2pJWkFnGcswl8fZt9B5Yt95sFOKEz2MSJE91
kZlHtya19OUxZ/cSGci4MlOySzqzbGwUqGxEIDlY8I39VMwXaYQ8uXUN4G780VcL
u46FeyRGxZGz2n3hMc805WAA1V5uir87vuirTvoSVREET97HVRGVVNJJ/FM6GXr1
VKtptybbo81nefYJg9KBysxAa2Ao2x2ry/2ZxwhS6VZ6v1+90bpZA1BIYFEDXXn/
dW07HSCFnYSlgPtSc+Muh15mdr94LspYeDqNIierK9i4tB6ep7llJAnq0BU91fM2
JPeqyoTtc3m06QhLf68ccSxO4l8Hmq9kLSHO7UXgtdjfRVaffngopTNk8qK7bIb7
LrgkqhiQw/PRCZjUdyXL153/fUcsj9nFNe25gM4vcFYwH6c5trd2tUl31NTi1MfG
Mgp3d2dqxQBIYANkEjtBDMy3SqQLIo9EymqmVP8xx2A/gCBgaxvMAsI6FSWRoC7+
hqJ8XH4mFnXSHKtYMe6WPY+/XZgtAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8w
HQYDVR0OBBYEFIkXqTnllT/VJnI2NqipA4XV8rh1MA4GA1UdDwEB/wQEAwIBhjAN
BgkqhkiG9w0BAQwFAAOCAgEAKjSle8eenGeHgT8pltWCw/HzWyQruVKhfYIBfKJd
MhV4EnH5BK7LxBIvpXGsFUrb0ThzSw0fn0zoA9jBs3i/Sj6KyeZ9qUF6b8ycDXd+
wHonmJiQ7nk7UuMefaYAfs06vosgl1rI7eBHC0itexIQmKh0aX+821l4GEgEoSMf
loMFTLXv2w36fPHHCsZ67ODldgcZbKNnpCTX0YrCwEYO3Pz/L398btiRcWGrewrK
jdxAAyietra8DRno1Zl87685tfqc6HsL9v8rVw58clAo9XAQvT+fmSOFw/PogRZ7
OMHUat3gu/uQ1M5S64nkLLFsKu7jzudBuoNmcJysPlzIbqJ7vYc82OUGe9ucF3wi
3tbKQ983hdJiTExVRBLX/fYjPsGbG3JtPTv89eg2tjWHlPhCDMMxyRKl6isu2RTq
6VT489Z2zQrC33MYF8ZqO1NKjtyMAMIZwxVu4cGLkVsqFmEV2ScDHa5RadDyD3Ok
m+mqybhvEVm5tPgY6p0ILPMN3yvJsMSPSvuBXhO/X5ppNnpw9gnxpwbjQKNhkFaG
M5pkADZ14uRguOLM4VthSwUSEAr5VQYCFZhEwK+UOyJAGiB/nJz6IxL5XBNUXmRM
Hl8Xvz4riq48LMQbjcVQj0XvH941yPh+P8xOi00SGaQRaWp55Vyr4YKGbV0mEDz1
r1o=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIF/zCCA+egAwIBAgIRAKwYju1QWxUZpn6D1gOtwgQwDQYJKoZIhvcNAQEMBQAw
gZcxCzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJ
bmMuMRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEwMC4GA1UEAwwn
QW1hem9uIFJEUyBldS13ZXN0LTEgUm9vdCBDQSBSU0E0MDk2IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyMDE2NTM1NFoYDzIxMjEwNTIwMTc1MzU0WjCBlzEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdBbWF6
b24gUkRTIGV1LXdlc3QtMSBSb290IENBIFJTQTQwOTYgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCKdBP1U4lqWWkc
Cb25/BKRTsvNVnISiKocva8GAzJyKfcGRa85gmgu41U+Hz6+39K+XkRfM0YS4BvQ
F1XxWT0bNyypuvwCvmYShSTjN1TY0ltncDddahTajE/4MdSOZb/c98u0yt03cH+G
hVwRyT50h0v/UEol50VfwcVAEZEgcQQYhf1IFUFlIvKpmDOqLuFakOnc7c9akK+i
ivST+JO1tgowbnNkn2iLlSSgUWgb1gjaOsNfysagv1RXdlyPw3EyfwkFifAQvF2P
Q0ayYZfYS640cccv7efM1MSVyFHR9PrrDsF/zr2S2sGPbeHr7R/HwLl+S5J/l9N9
y0rk6IHAWV4dEkOvgpnuJKURwA48iu1Hhi9e4moNS6eqoK2KmY3VFpuiyWcA73nH
GSmyaH+YuMrF7Fnuu7GEHZL/o6+F5cL3mj2SJJhL7sz0ryf5Cs5R4yN9BIEj/f49
wh84pM6nexoI0Q4wiSFCxWiBpjSmOK6h7z6+2utaB5p20XDZHhxAlmlx4vMuWtjh
XckgRFxc+ZpVMU3cAHUpVEoO49e/+qKEpPzp8Xg4cToKw2+AfTk3cmyyXQfGwXMQ
ZUHNZ3w9ILMWihGCM2aGUsLcGDRennvNmnmin/SENsOQ8Ku0/a3teEzwV9cmmdYz
5iYs1YtgPvKFobY6+T2RXXh+A5kprwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/
MB0GA1UdDgQWBBSyUrsQVnKmA8z6/2Ech0rCvqpNmTAOBgNVHQ8BAf8EBAMCAYYw
DQYJKoZIhvcNAQEMBQADggIBAFlj3IFmgiFz5lvTzFTRizhVofhTJsGr14Yfkuc7
UrXPuXOwJomd4uot2d/VIeGJpfnuS84qGdmQyGewGTJ9inatHsGZgHl9NHNWRwKZ
lTKTbBiq7aqgtUSFa06v202wpzU+1kadxJJePrbABxiXVfOmIW/a1a4hPNcT3syH
FIEg1+CGsp71UNjBuwg3JTKWna0sLSKcxLOSOvX1fzxK5djzVpEsvQMB4PSAzXca
vENgg2ErTwgTA+4s6rRtiBF9pAusN1QVuBahYP3ftrY6f3ycS4K65GnqscyfvKt5
YgjtEKO3ZeeX8NpubMbzC+0Z6tVKfPFk/9TXuJtwvVeqow0YMrLLyRiYvK7EzJ97
rrkxoKnHYQSZ+rH2tZ5SE392/rfk1PJL0cdHnkpDkUDO+8cKsFjjYKAQSNC52sKX
74AVh6wMwxYwVZZJf2/2XxkjMWWhKNejsZhUkTISSmiLs+qPe3L67IM7GyKm9/m6
R3r8x6NGjhTsKH64iYJg7AeKeax4b2e4hBb6GXFftyOs7unpEOIVkJJgM6gh3mwn
R7v4gwFbLKADKt1vHuerSZMiTuNTGhSfCeDM53XI/mjZl2HeuCKP1mCDLlaO+gZR
Q/G+E0sBKgEX4xTkAc3kgkuQGfExdGtnN2U2ehF80lBHB8+2y2E+xWWXih/ZyIcW
wOx+
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
89cEIGdbjsA=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEADCCAuigAwIBAgIQYjbPSg4+RNRD3zNxO1fuKDANBgkqhkiG9w0BAQsFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIGV1LW5vcnRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUyNDIwNTkyMVoYDzIwNjEwNTI0MjE1OTIxWjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIGV1LW5vcnRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA179eQHxcV0YL
XMkqEmhSBazHhnRVd8yICbMq82PitE3BZcnv1Z5Zs/oOgNmMkOKae4tCXO/41JCX
wAgbs/eWWi+nnCfpQ/FqbLPg0h3dqzAgeszQyNl9IzTzX4Nd7JFRBVJXPIIKzlRf
+GmFsAhi3rYgDgO27pz3ciahVSN+CuACIRYnA0K0s9lhYdddmrW/SYeWyoB7jPa2
LmWpAs7bDOgS4LlP2H3eFepBPgNufRytSQUVA8f58lsE5w25vNiUSnrdlvDrIU5n
Qwzc7NIZCx4qJpRbSKWrUtbyJriWfAkGU7i0IoainHLn0eHp9bWkwb9D+C/tMk1X
ERZw2PDGkwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSFmR7s
dAblusFN+xhf1ae0KUqhWTAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQAD
ggEBAHsXOpjPMyH9lDhPM61zYdja1ebcMVgfUvsDvt+w0xKMKPhBzYDMs/cFOi1N
Q8LV79VNNfI2NuvFmGygcvTIR+4h0pqqZ+wjWl3Kk5jVxCrbHg3RBX02QLumKd/i
kwGcEtTUvTssn3SM8bgM0/1BDXgImZPC567ciLvWDo0s/Fe9dJJC3E0G7d/4s09n
OMdextcxFuWBZrBm/KK3QF0ByA8MG3//VXaGO9OIeeOJCpWn1G1PjT1UklYhkg61
EbsTiZVA2DLd1BGzfU4o4M5mo68l0msse/ndR1nEY6IywwpgIFue7+rEleDh6b9d
PYkG1rHVw2I0XDG4o17aOn5E94I=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEADCCAuigAwIBAgIQC6W4HFghUkkgyQw14a6JljANBgkqhkiG9w0BAQsFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIGV1LXNvdXRoLTIgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIyMDUyMzE4MTYzMloYDzIwNjIwNTIzMTkxNjMyWjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIGV1LXNvdXRoLTIgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiM/t4FV2R9Nx
UQG203UY83jInTa/6TMq0SPyg617FqYZxvz2kkx09x3dmxepUg9ttGMlPgjsRZM5
LCFEi1FWk+hxHzt7vAdhHES5tdjwds3aIkgNEillmRDVrUsbrDwufLaa+MMDO2E1
wQ/JYFXw16WBCCi2g1EtyQ2Xp+tZDX5IWOTnvhZpW8vVDptZ2AcJ5rMhfOYO3OsK
5EF0GGA5ldzuezP+BkrBYGJ4wVKGxeaq9+5AT8iVZrypjwRkD7Y5CurywK3+aBwm
s9Q5Nd8t45JCOUzYp92rFKsCriD86n/JnEvgDfdP6Hvtm0/DkwXK40Wz2q0Zrd0k
mjP054NRPwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRR7yqd
SfKcX2Q8GzhcVucReIpewTAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQAD
ggEBAEszBRDwXcZyNm07VcFwI1Im94oKwKccuKYeJEsizTBsVon8VpEiMwDs+yGu
3p8kBhvkLwWybkD/vv6McH7T5b9jDX2DoOudqYnnaYeypsPH/00Vh3LvKagqzQza
orWLx+0tLo8xW4BtU+Wrn3JId8LvAhxyYXTn9bm+EwPcStp8xGLwu53OPD1RXYuy
uu+3ps/2piP7GVfou7H6PRaqbFHNfiGg6Y+WA0HGHiJzn8uLmrRJ5YRdIOOG9/xi
qTmAZloUNM7VNuurcMM2hWF494tQpsQ6ysg2qPjbBqzlGoOt3GfBTOZmqmwmqtam
K7juWM/mdMQAJ3SMlE5wI8nVdx4=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIICrjCCAjSgAwIBAgIRAL9SdzVPcpq7GOpvdGoM80IwCgYIKoZIzj0EAwMwgZYx
CzAJBgNVBAYTAlVTMSIwIAYDVQQKDBlBbWF6b24gV2ViIFNlcnZpY2VzLCBJbmMu
MRMwEQYDVQQLDApBbWF6b24gUkRTMQswCQYDVQQIDAJXQTEvMC0GA1UEAwwmQW1h
em9uIFJEUyBldS13ZXN0LTEgUm9vdCBDQSBFQ0MzODQgRzExEDAOBgNVBAcMB1Nl
YXR0bGUwIBcNMjEwNTIwMTY1ODA3WhgPMjEyMTA1MjAxNzU4MDdaMIGWMQswCQYD
VQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjETMBEG
A1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExLzAtBgNVBAMMJkFtYXpvbiBS
RFMgZXUtd2VzdC0xIFJvb3QgQ0EgRUNDMzg0IEcxMRAwDgYDVQQHDAdTZWF0dGxl
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEJWDgXebvwjR+Ce+hxKOLbnsfN5W5dOlP
Zn8kwWnD+SLkU81Eac/BDJsXGrMk6jFD1vg16PEkoSevsuYWlC8xR6FmT6F6pmeh
fsMGOyJpfK4fyoEPhKeQoT23lFIc5Orjo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0G
A1UdDgQWBBSVNAN1CHAz0eZ77qz2adeqjm31TzAOBgNVHQ8BAf8EBAMCAYYwCgYI
KoZIzj0EAwMDaAAwZQIxAMlQeHbcjor49jqmcJ9gRLWdEWpXG8thIf6zfYQ/OEAg
d7GDh4fR/OUk0VfjsBUN/gIwZB0bGdXvK38s6AAE/9IT051cz/wMe9GIrX1MnL1T
1F5OqnXJdiwfZRRTHsRQ/L00
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
1YfpdH2jp30=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID/jCCAuagAwIBAgIQTDc+UgTRtYO7ZGTQ8UWKDDANBgkqhkiG9w0BAQsFADCB
lzELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTAwLgYDVQQDDCdB
bWF6b24gUkRTIGV1LXdlc3QtMiBSb290IENBIFJTQTIwNDggRzExEDAOBgNVBAcM
B1NlYXR0bGUwIBcNMjEwNTIxMjI0NjI0WhgPMjA2MTA1MjEyMzQ2MjRaMIGXMQsw
CQYDVQQGEwJVUzEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNlcywgSW5jLjET
MBEGA1UECwwKQW1hem9uIFJEUzELMAkGA1UECAwCV0ExMDAuBgNVBAMMJ0FtYXpv
biBSRFMgZXUtd2VzdC0yIFJvb3QgQ0EgUlNBMjA0OCBHMTEQMA4GA1UEBwwHU2Vh
dHRsZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM1oGtthQ1YiVIC2
i4u4swMAGxAjc/BZp0yq0eP5ZQFaxnxs7zFAPabEWsrjeDzrRhdVO0h7zskrertP
gblGhfD20JfjvCHdP1RUhy/nzG+T+hn6Takan/GIgs8grlBMRHMgBYHW7tklhjaH
3F7LujhceAHhhgp6IOrpb6YTaTTaJbF3GTmkqxSJ3l1LtEoWz8Al/nL/Ftzxrtez
Vs6ebpvd7sw37sxmXBWX2OlvUrPCTmladw9OrllGXtCFw4YyLe3zozBlZ3cHzQ0q
lINhpRcajTMfZrsiGCkQtoJT+AqVJPS2sHjqsEH8yiySW9Jbq4zyMbM1yqQ2vnnx
MJgoYMcCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUaQG88UnV
JPTI+Pcti1P+q3H7pGYwDgYDVR0PAQH/BAQDAgGGMA0GCSqGSIb3DQEBCwUAA4IB
AQBAkgr75V0sEJimC6QRiTVWEuj2Khy7unjSfudbM6zumhXEU2/sUaVLiYy6cA/x
3v0laDle6T07x9g64j5YastE/4jbzrGgIINFlY0JnaYmR3KZEjgi1s1fkRRf3llL
PJm9u4Q1mbwAMQK/ZjLuuRcL3uRIHJek18nRqT5h43GB26qXyvJqeYYpYfIjL9+/
YiZAbSRRZG+Li23cmPWrbA1CJY121SB+WybCbysbOXzhD3Sl2KSZRwSw4p2HrFtV
1Prk0dOBtZxCG9luf87ultuDZpfS0w6oNBAMXocgswk24ylcADkkFxBWW+7BETn1
EpK+t1Lm37mU4sxtuha00XAi
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIEADCCAuigAwIBAgIQcY44/8NUvBwr6LlHfRy7KjANBgkqhkiG9w0BAQsFADCB
mDELMAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIElu
Yy4xEzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChB
bWF6b24gUkRTIGV1LXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQH
DAdTZWF0dGxlMCAXDTIxMDUxOTE4MjcxOFoYDzIwNjEwNTE5MTkyNzE4WjCBmDEL
MAkGA1UEBhMCVVMxIjAgBgNVBAoMGUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4x
EzARBgNVBAsMCkFtYXpvbiBSRFMxCzAJBgNVBAgMAldBMTEwLwYDVQQDDChBbWF6
b24gUkRTIGV1LXNvdXRoLTEgUm9vdCBDQSBSU0EyMDQ4IEcxMRAwDgYDVQQHDAdT
ZWF0dGxlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0UaBeC+Usalu
EtXnV7+PnH+gi7/71tI/jkKVGKuhD2JDVvqLVoqbMHRh3+wGMvqKCjbHPcC2XMWv
566fpAj4UZ9CLB5fVzss+QVNTl+FH2XhEzigopp+872ajsNzcZxrMkifxGb4i0U+
t0Zi+UrbL5tsfP2JonKR1crOrbS6/DlzHBjIiJazGOQcMsJjNuTOItLbMohLpraA
/nApa3kOvI7Ufool1/34MG0+wL3UUA4YkZ6oBJVxjZvvs6tI7Lzz/SnhK2widGdc
snbLqBpHNIZQSorVoiwcFaRBGYX/uzYkiw44Yfa4cK2V/B5zgu1Fbr0gbI2am4eh
yVYyg4jPawIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBS9gM1m
IIjyh9O5H/7Vj0R/akI7UzAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQAD
ggEBAF0Sm9HC2AUyedBVnwgkVXMibnYChOzz7T+0Y+fOLXYAEXex2s8oqGeZdGYX
JHkjBn7JXu7LM+TpTbPbFFDoc1sgMguD/ls+8XsqAl1CssW+amryIL+jfcfbgQ+P
ICwEUD9hGdjBgJ5WcuS+qqxHsEIlFNci3HxcxfBa9VsWs5TjI7Vsl4meL5lf7ZyL
wDV7dHRuU+cImqG1MIvPRIlvPnT7EghrCYi2VCPhP2pM/UvShuwVnkz4MJ29ebIk
WR9kpblFxFdE92D5UUvMCjC2kmtgzNiErvTcwIvOO9YCbBHzRB1fFiWrXUHhJWq9
IkaxR5icb/IpAV0A1lYZEWMVsfQ=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
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
rM2p0kk=
-----END CERTIFICATE-----
`
  ]), r_;
}
var D_ = {}, nt;
function hu() {
  return nt || (nt = 1, Object.defineProperty(D_, "__esModule", { value: !0 }), D_.proxies = void 0, D_.proxies = [
    `-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIFQTCCAymgAwIBAgITBmyf0pY1hp8KD+WGePhbJruKNzANBgkqhkiG9w0BAQwF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAyMB4XDTE1MDUyNjAwMDAwMFoXDTQwMDUyNjAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMjCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK2Wny2cSkxK
gXlRmeyKy2tgURO8TW0G/LAIjd0ZEGrHJgw12MBvIITplLGbhQPDW9tK6Mj4kHbZ
W0/jTOgGNk3Mmqw9DJArktQGGWCsN0R5hYGCrVo34A3MnaZMUnbqQ523BNFQ9lXg
1dKmSYXpN+nKfq5clU1Imj+uIFptiJXZNLhSGkOQsL9sBbm2eLfq0OQ6PBJTYv9K
8nu+NQWpEjTj82R0Yiw9AElaKP4yRLuH3WUnAnE72kr3H9rN9yFVkE8P7K6C4Z9r
2UXTu/Bfh+08LDmG2j/e7HJV63mjrdvdfLC6HM783k81ds8P+HgfajZRRidhW+me
z/CiVX18JYpvL7TFz4QuK/0NURBs+18bvBt+xa47mAExkv8LV/SasrlX6avvDXbR
8O70zoan4G7ptGmh32n2M8ZpLpcTnqWHsFcQgTfJU7O7f/aS0ZzQGPSSbtqDT6Zj
mUyl+17vIWR6IF9sZIUVyzfpYgwLKhbcAS4y2j5L9Z469hdAlO+ekQiG+r5jqFoz
7Mt0Q5X5bGlSNscpb/xVA1wf+5+9R+vnSUeVC06JIglJ4PVhHvG/LopyboBZ/1c6
+XUyo05f7O0oYtlNc/LMgRdg7c3r3NunysV+Ar3yVAhU/bQtCSwXVEqY0VThUWcI
0u1ufm8/0i2BWSlmy5A5lREedCf+3euvAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMB
Af8wDgYDVR0PAQH/BAQDAgGGMB0GA1UdDgQWBBSwDPBMMPQFWAJI/TPlUq9LhONm
UjANBgkqhkiG9w0BAQwFAAOCAgEAqqiAjw54o+Ci1M3m9Zh6O+oAA7CXDpO8Wqj2
LIxyh6mx/H9z/WNxeKWHWc8w4Q0QshNabYL1auaAn6AFC2jkR2vHat+2/XcycuUY
+gn0oJMsXdKMdYV2ZZAMA3m3MSNjrXiDCYZohMr/+c8mmpJ5581LxedhpxfL86kS
k5Nrp+gvU5LEYFiwzAJRGFuFjWJZY7attN6a+yb3ACfAXVU3dJnJUH/jWS5E4ywl
7uxMMne0nxrpS10gxdr9HIcWxkPo1LsmmkVwXqkLN1PiRnsn/eBG8om3zEK2yygm
btmlyTrIQRNg91CMFa6ybRoVGld45pIq2WWQgj9sAq+uEjonljYE1x2igGOpm/Hl
urR8FLBOybEfdF849lHqm/osohHUqS0nGkWxr7JOcQ3AWEbWaQbLU8uz/mtBzUF+
fUwPfHJ5elnNXkoOrJupmHN5fLT0zLm4BwyydFy4x2+IoZCn9Kr5v2c69BoVYh63
n749sSmvZ6ES8lgQGVMDMBu4Gon2nL2XA46jCfMdiyHxtN/kHNGfZQIG6lzWE7OE
76KlXIx3KadowGuuQNKotOrN8I1LOJwZmhsoVLiJkO/KdYE+HvJkJMcYr07/R54H
9jVlpNMKVv/1F2Rs76giJUmTtt8AF9pYfl3uxRuw0dFfIRDH+fO6AgonB8Xx1sfT
4PsJYGw=
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIBtjCCAVugAwIBAgITBmyf1XSXNmY/Owua2eiedgPySjAKBggqhkjOPQQDAjA5
MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6b24g
Um9vdCBDQSAzMB4XDTE1MDUyNjAwMDAwMFoXDTQwMDUyNjAwMDAwMFowOTELMAkG
A1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJvb3Qg
Q0EgMzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABCmXp8ZBf8ANm+gBG1bG8lKl
ui2yEujSLtf6ycXYqm0fc4E7O5hrOXwzpcVOho6AF2hiRVd9RFgdszflZwjrZt6j
QjBAMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/BAQDAgGGMB0GA1UdDgQWBBSr
ttvXBp43rDCGB5Fwx5zEGbF4wDAKBggqhkjOPQQDAgNJADBGAiEA4IWSoxe3jfkr
BqWTrBqYaGFy+uGh0PsceGCmQ5nFuMQCIQCcAu/xlJyzlvnrxir4tiz+OpAUFteM
YyRIHN8wfdVoOw==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIIB8jCCAXigAwIBAgITBmyf18G7EEwpQ+Vxe3ssyBrBDjAKBggqhkjOPQQDAzA5
MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6b24g
Um9vdCBDQSA0MB4XDTE1MDUyNjAwMDAwMFoXDTQwMDUyNjAwMDAwMFowOTELMAkG
A1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJvb3Qg
Q0EgNDB2MBAGByqGSM49AgEGBSuBBAAiA2IABNKrijdPo1MN/sGKe0uoe0ZLY7Bi
9i0b2whxIdIA6GO9mif78DluXeo9pcmBqqNbIJhFXRbb/egQbeOc4OO9X4Ri83Bk
M6DLJC9wuoihKqB1+IGuYgbEgds5bimwHvouXKNCMEAwDwYDVR0TAQH/BAUwAwEB
/zAOBgNVHQ8BAf8EBAMCAYYwHQYDVR0OBBYEFNPsxzplbszh2naaVvuc84ZtV+WB
MAoGCCqGSM49BAMDA2gAMGUCMDqLIfG9fhGt0O9Yli/W651+kI0rz2ZVwyzjKKlw
CkcO8DdZEv8tmZQoTipPNU0zWgIxAOp1AE47xDqUEpHJWEadIRNyp4iciuRMStuW
1KyLa2tJElMzrdfkviT8tQp21KW8EA==
-----END CERTIFICATE-----
`,
    `-----BEGIN CERTIFICATE-----
MIID7zCCAtegAwIBAgIBADANBgkqhkiG9w0BAQsFADCBmDELMAkGA1UEBhMCVVMx
EDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxJTAjBgNVBAoT
HFN0YXJmaWVsZCBUZWNobm9sb2dpZXMsIEluYy4xOzA5BgNVBAMTMlN0YXJmaWVs
ZCBTZXJ2aWNlcyBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAtIEcyMB4XDTA5
MDkwMTAwMDAwMFoXDTM3MTIzMTIzNTk1OVowgZgxCzAJBgNVBAYTAlVTMRAwDgYD
VQQIEwdBcml6b25hMRMwEQYDVQQHEwpTY290dHNkYWxlMSUwIwYDVQQKExxTdGFy
ZmllbGQgVGVjaG5vbG9naWVzLCBJbmMuMTswOQYDVQQDEzJTdGFyZmllbGQgU2Vy
dmljZXMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkgLSBHMjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBANUMOsQq+U7i9b4Zl1+OiFOxHz/Lz58gE20p
OsgPfTz3a3Y4Y9k2YKibXlwAgLIvWX/2h/klQ4bnaRtSmpDhcePYLQ1Ob/bISdm2
8xpWriu2dBTrz/sm4xq6HZYuajtYlIlHVv8loJNwU4PahHQUw2eeBGg6345AWh1K
Ts9DkTvnVtYAcMtS7nt9rjrnvDH5RfbCYM8TWQIrgMw0R9+53pBlbQLPLJGmpufe
hRhJfGZOozptqbXuNC66DQO4M99H67FrjSXZm86B0UVGMpZwh94CDklDhbZsc7tk
6mFBrMnUVN+HL8cisibMn1lUaJ/8viovxFUcdUBgF4UCVTmLfwUCAwEAAaNCMEAw
DwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYwHQYDVR0OBBYEFJxfAN+q
AdcwKziIorhtSpzyEZGDMA0GCSqGSIb3DQEBCwUAA4IBAQBLNqaEd2ndOxmfZyMI
bw5hyf2E3F/YNoHN2BtBLZ9g3ccaaNnRbobhiCPPE95Dz+I0swSdHynVv/heyNXB
ve6SbzJ08pGCL72CQnqtKrcgfU28elUSwhXqvfdqlS5sdJ/PHLTyxQGjhdByPq1z
qwubdQxtRbeOlKyWN7Wg0I8VRw7j6IPdj/3vQQF3zCepYoUz8jcI73HPdwbeyBkd
iEDPfUYd/x7H4c7/I9vG+o1VTqkC50cRRj70/b17KSa7qWFiNyi2LSr2EIZkyXCn
0q23KXB56jzaYyWf/Wi3MOxw+3WKt21gZ7IeyLnp2KhvAotnDU0mV3HaIPzBSlCN
sSi6
-----END CERTIFICATE-----
`
  ]), D_;
}
var Su = __.exports, et;
function Bu() {
  if (et) return __.exports;
  et = 1, Object.defineProperty(Su, "__esModule", { value: !0 });
  const E = lu(), _ = hu(), n = {
    ca: _.proxies
  }, e = {
    ca: [...E.defaults, ..._.proxies]
  };
  return __.exports = e, __.exports.proxyBundle = n, __.exports.default = e, __.exports;
}
var At;
function fu() {
  return At || (At = 1, function(E) {
    const _ = Bu();
    E["Amazon RDS"] = {
      ca: _.ca
    };
  }(_e)), _e;
}
const { URL: Mu } = ai, tt = V, Rt = u_(), { version: gu } = su;
let ne = null;
const Lu = {
  authPlugins: 1,
  authSwitchHandler: 1,
  bigNumberStrings: 1,
  charset: 1,
  charsetNumber: 1,
  compress: 1,
  connectAttributes: 1,
  connectTimeout: 1,
  database: 1,
  dateStrings: 1,
  debug: 1,
  decimalNumbers: 1,
  enableKeepAlive: 1,
  flags: 1,
  host: 1,
  insecureAuth: 1,
  infileStreamFactory: 1,
  isServer: 1,
  keepAliveInitialDelay: 1,
  localAddress: 1,
  maxPreparedStatements: 1,
  multipleStatements: 1,
  namedPlaceholders: 1,
  nestTables: 1,
  password: 1,
  // with multi-factor authentication, the main password (used for the first
  // authentication factor) can be provided via password1
  password1: 1,
  password2: 1,
  password3: 1,
  passwordSha1: 1,
  pool: 1,
  port: 1,
  queryFormat: 1,
  rowsAsArray: 1,
  socketPath: 1,
  ssl: 1,
  stream: 1,
  stringifyObjects: 1,
  supportBigNumbers: 1,
  timezone: 1,
  trace: 1,
  typeCast: 1,
  uri: 1,
  user: 1,
  disableEval: 1,
  // These options are used for Pool
  connectionLimit: 1,
  maxIdle: 1,
  idleTimeout: 1,
  Promise: 1,
  queueLimit: 1,
  waitForConnections: 1,
  jsonStrings: 1,
  gracefulEnd: 1
};
let du = class XE {
  constructor(_) {
    if (typeof _ == "string")
      _ = XE.parseUrl(_);
    else if (_ && _.uri) {
      const e = XE.parseUrl(_.uri);
      for (const A in e)
        Object.prototype.hasOwnProperty.call(e, A) && (_[A] || (_[A] = e[A]));
    }
    for (const e in _)
      Object.prototype.hasOwnProperty.call(_, e) && Lu[e] !== 1 && console.error(
        `Ignoring invalid configuration option passed to Connection: ${e}. This is currently a warning, but in future versions of MySQL2, an error will be thrown if you pass an invalid configuration option to a Connection`
      );
    if (this.isServer = _.isServer, this.stream = _.stream, this.host = _.host || "localhost", this.port = (typeof _.port == "string" ? parseInt(_.port, 10) : _.port) || 3306, this.localAddress = _.localAddress, this.socketPath = _.socketPath, this.user = _.user || void 0, this.password = _.password || _.password1 || void 0, this.password2 = _.password2 || void 0, this.password3 = _.password3 || void 0, this.passwordSha1 = _.passwordSha1 || void 0, this.database = _.database, this.connectTimeout = isNaN(_.connectTimeout) ? 10 * 1e3 : _.connectTimeout, this.insecureAuth = _.insecureAuth || !1, this.infileStreamFactory = _.infileStreamFactory || void 0, this.supportBigNumbers = _.supportBigNumbers || !1, this.bigNumberStrings = _.bigNumberStrings || !1, this.decimalNumbers = _.decimalNumbers || !1, this.dateStrings = _.dateStrings || !1, this.debug = _.debug, this.trace = _.trace !== !1, this.stringifyObjects = _.stringifyObjects || !1, this.enableKeepAlive = _.enableKeepAlive !== !1, this.keepAliveInitialDelay = _.keepAliveInitialDelay, _.timezone && !/^(?:local|Z|[ +-]\d\d:\d\d)$/.test(_.timezone) ? (console.error(
      `Ignoring invalid timezone passed to Connection: ${_.timezone}. This is currently a warning, but in future versions of MySQL2, an error will be thrown if you pass an invalid configuration option to a Connection`
    ), this.timezone = "Z") : this.timezone = _.timezone || "local", this.queryFormat = _.queryFormat, this.pool = _.pool || void 0, this.ssl = typeof _.ssl == "string" ? XE.getSSLProfile(_.ssl) : _.ssl || !1, this.multipleStatements = _.multipleStatements || !1, this.rowsAsArray = _.rowsAsArray || !1, this.namedPlaceholders = _.namedPlaceholders || !1, this.nestTables = _.nestTables === void 0 ? void 0 : _.nestTables, this.typeCast = _.typeCast === void 0 ? !0 : _.typeCast, this.disableEval = !!_.disableEval, this.timezone[0] === " " && (this.timezone = `+${this.timezone.slice(1)}`), this.ssl) {
      if (typeof this.ssl != "object")
        throw new TypeError(
          `SSL profile must be an object, instead it's a ${typeof this.ssl}`
        );
      this.ssl.rejectUnauthorized = this.ssl.rejectUnauthorized !== !1;
    }
    this.maxPacketSize = 0, this.charsetNumber = _.charset ? XE.getCharsetNumber(_.charset) : _.charsetNumber || Rt.UTF8MB4_UNICODE_CI, this.compress = _.compress || !1, this.authPlugins = _.authPlugins, this.authSwitchHandler = _.authSwitchHandler, this.clientFlags = XE.mergeFlags(
      XE.getDefaultFlags(_),
      _.flags || ""
    );
    const n = {
      _client_name: "Node-MySQL-2",
      _client_version: gu
    };
    this.connectAttributes = {
      ...n,
      ..._.connectAttributes || {}
    }, this.maxPreparedStatements = _.maxPreparedStatements || 16e3, this.jsonStrings = _.jsonStrings || !1, this.gracefulEnd = _.gracefulEnd || !1;
  }
  static mergeFlags(_, n) {
    let e = 0, A;
    Array.isArray(n) || (n = String(n || "").toUpperCase().split(/\s*,+\s*/));
    for (A in _)
      n.indexOf(`-${_[A]}`) >= 0 || (e |= tt[_[A]] || 0);
    for (A in n)
      n[A][0] !== "-" && (_.indexOf(n[A]) >= 0 || (e |= tt[n[A]] || 0));
    return e;
  }
  static getDefaultFlags(_) {
    const n = [
      "LONG_PASSWORD",
      "FOUND_ROWS",
      "LONG_FLAG",
      "CONNECT_WITH_DB",
      "ODBC",
      "LOCAL_FILES",
      "IGNORE_SPACE",
      "PROTOCOL_41",
      "IGNORE_SIGPIPE",
      "TRANSACTIONS",
      "RESERVED",
      "SECURE_CONNECTION",
      "MULTI_RESULTS",
      "TRANSACTIONS",
      "SESSION_TRACK",
      "CONNECT_ATTRS"
    ];
    return _ && _.multipleStatements && n.push("MULTI_STATEMENTS"), n.push("PLUGIN_AUTH"), n.push("PLUGIN_AUTH_LENENC_CLIENT_DATA"), n;
  }
  static getCharsetNumber(_) {
    const n = Rt[_.toUpperCase()];
    if (n === void 0)
      throw new TypeError(`Unknown charset '${_}'`);
    return n;
  }
  static getSSLProfile(_) {
    ne || (ne = fu());
    const n = ne[_];
    if (n === void 0)
      throw new TypeError(`Unknown SSL profile '${_}'`);
    return n;
  }
  static parseUrl(_) {
    const n = new Mu(_), e = {
      host: decodeURIComponent(n.hostname),
      port: parseInt(n.port, 10),
      database: decodeURIComponent(n.pathname.slice(1)),
      user: decodeURIComponent(n.username),
      password: decodeURIComponent(n.password)
    };
    return n.searchParams.forEach((A, t) => {
      try {
        e[t] = JSON.parse(A);
      } catch {
        e[t] = A;
      }
    }), e;
  }
};
var $e = du, Z_ = { exports: {} }, it;
function Uu() {
  if (it) return Z_.exports;
  it = 1;
  const E = /(?:\?)|(?::(\d+|(?:[a-zA-Z][a-zA-Z0-9_]*)))/g, _ = 34, n = 39, e = 92;
  function A(i) {
    let I = E.exec(i), N = 0, T = 0, a;
    const u = [];
    let C = !1, r = !1, D;
    const c = [];
    let l = 0, S = 0, B;
    if (I) {
      do {
        for (B = N, a = I.index; B < a; ++B) {
          const h = i.charCodeAt(B);
          if (h === e) r = !r;
          else {
            if (r) {
              r = !1;
              continue;
            }
            if (C && h === D) {
              if (i.charCodeAt(B + 1) === D) {
                ++B;
                continue;
              }
              C = !1;
            } else !C && (h === _ || h === n) && (C = !0, D = h);
          }
        }
        C || (u.push(i.substring(T, a)), c.push(I[0].length === 1 ? l++ : I[1]), T = a + I[0].length, S = T), N = a + I[0].length;
      } while (I = E.exec(i));
      if (c.length)
        return N < i.length && u.push(i.substring(S)), [u, c];
    }
    return [i];
  }
  function t(i) {
    i || (i = {}), i.placeholder || (i.placeholder = "?");
    let I = 100, N;
    typeof i.cache == "number" && (I = i.cache), typeof i.cache == "object" && (N = i.cache), i.cache !== !1 && !N && (N = ZE.createLRU({ max: I }));
    function T(r, D) {
      const c = [];
      if (r.length === 1)
        return [r[0], []];
      if (typeof D > "u")
        throw new Error(
          "Named query contains placeholders, but parameters object is undefined"
        );
      const l = r[1];
      for (let S = 0; S < l.length; ++S)
        c.push(D[l[S]]);
      return [r[0], c];
    }
    function a(r) {
      return r.slice(-1) === ":" ? r.slice(0, -1) : r;
    }
    function u(r) {
      if (r.length === 1)
        return r;
      let D = a(r[0][0]);
      for (let l = 1; l < r[0].length; ++l)
        r[0][l - 1].slice(-1) === ":" && (D += i.placeholder), D += i.placeholder, D += a(r[0][l]);
      const c = r[0][r[0].length - 1];
      return r[0].length === r[1].length && (c.slice(-1) === ":" && (D += i.placeholder), D += i.placeholder), [D, r[1]];
    }
    function C(r, D) {
      let c;
      return N && (c = N.get(r)) || (c = u(A(r)), N && N.set(r, c)), T(c, D);
    }
    return C.parse = A, C;
  }
  function R(i, I) {
    const N = A(i), T = [];
    if (N.length === 1)
      return [N[0], T];
    const a = {};
    let u = 0, C = "", r;
    const D = [];
    for (let c = 0; c < N[0].length; ++c)
      r = a[N[1][c]], r || (r = ++u, a[N[1][c]] = r), N[1][c] ? (D[r - 1] = N[1][c], C += `${N[0][c]}$${r}`) : C += N[0][c];
    return [C, D.map((c) => I[c])];
  }
  return Z_.exports = t, Z_.exports.toNumbered = R, Z_.exports;
}
const ee = ri, q_ = Mt, xE = Ue, It = JE.EventEmitter, ou = d_.Readable, Nt = LR, p_ = rn, { createLRU: wu } = ZE, Gu = oR, GE = rE, TE = ru, Fu = $e, Tt = SE();
let Pu = 0, Ae = null, Qu = class fe extends It {
  constructor(_) {
    super(), this.config = _.config, _.config.stream ? typeof _.config.stream == "function" ? this.stream = _.config.stream(_) : this.stream = _.config.stream : _.config.socketPath ? this.stream = ee.connect(_.config.socketPath) : (this.stream = ee.connect(_.config.port, _.config.host), this.config.enableKeepAlive && this.stream.on("connect", () => {
      this.stream.setKeepAlive(!0, this.config.keepAliveInitialDelay);
    }), this.stream.setNoDelay(!0)), this._internalId = Pu++, this._commands = new Nt(), this._command = null, this._paused = !1, this._paused_packets = new Nt(), this._statements = wu({
      max: this.config.maxPreparedStatements,
      onEviction: function(e, A) {
        A.close();
      }
    }), this.serverCapabilityFlags = 0, this.authorized = !1, this.sequenceId = 0, this.compressedSequenceId = 0, this.threadId = null, this._handshakePacket = null, this._fatalError = null, this._protocolError = null, this._outOfOrderPackets = [], this.clientEncoding = Tt[this.config.charsetNumber], this.stream.on("error", this._handleNetworkError.bind(this)), this.packetParser = new Gu((e) => {
      this.handlePacket(e);
    }), this.stream.on("data", (e) => {
      this.connectTimeout && (xE.clearTimeout(this.connectTimeout), this.connectTimeout = null), this.packetParser.execute(e);
    }), this.stream.on("end", () => {
      this.emit("end");
    }), this.stream.on("close", () => {
      this._closing || (this._protocolError || (this._protocolError = new Error(
        "Connection lost: The server closed the connection."
      ), this._protocolError.fatal = !0, this._protocolError.code = "PROTOCOL_CONNECTION_LOST"), this._notifyError(this._protocolError));
    });
    let n;
    if (this.config.isServer || (n = new TE.ClientHandshake(this.config.clientFlags), n.on("end", () => {
      !n.handshake || this._fatalError || this._protocolError || (this._handshakePacket = n.handshake, this.threadId = n.handshake.connectionId, this.emit("connect", n.handshake));
    }), n.on("error", (e) => {
      this._closing = !0, this._notifyError(e);
    }), this.addCommand(n)), this.serverEncoding = "utf8", this.config.connectTimeout) {
      const e = this._handleTimeoutError.bind(this);
      this.connectTimeout = xE.setTimeout(
        e,
        this.config.connectTimeout
      );
    }
  }
  _addCommandClosedState(_) {
    const n = new Error(
      "Can't add new command when connection is in closed state"
    );
    n.fatal = !0, _.onResult ? _.onResult(n) : this.emit("error", n);
  }
  _handleFatalError(_) {
    _.fatal = !0, this.stream.removeAllListeners("data"), this.addCommand = this._addCommandClosedState, this.write = () => {
      this.emit("error", new Error("Can't write in closed state"));
    }, this._notifyError(_), this._fatalError = _;
  }
  _handleNetworkError(_) {
    this.connectTimeout && (xE.clearTimeout(this.connectTimeout), this.connectTimeout = null), !(_.code === "ECONNRESET" && this._closing) && this._handleFatalError(_);
  }
  _handleTimeoutError() {
    this.connectTimeout && (xE.clearTimeout(this.connectTimeout), this.connectTimeout = null), this.stream.destroy && this.stream.destroy();
    const _ = new Error("connect ETIMEDOUT");
    _.errorno = "ETIMEDOUT", _.code = "ETIMEDOUT", _.syscall = "connect", this._handleNetworkError(_);
  }
  // notify all commands in the queue and bubble error as connection "error"
  // called on stream error or unexpected termination
  _notifyError(_) {
    if (this.connectTimeout && (xE.clearTimeout(this.connectTimeout), this.connectTimeout = null), this._fatalError)
      return;
    let n, e = !this._command;
    for (this._command && this._command.onResult ? (this._command.onResult(_), this._command = null) : this._command && this._command.constructor === TE.ClientHandshake && this._commands.length > 0 || (e = !0); n = this._commands.shift(); )
      n.onResult ? n.onResult(_) : e = !0;
    (e || this._pool) && this.emit("error", _), _.fatal && this.close();
  }
  write(_) {
    this.stream.write(_, (e) => {
      e && this._handleNetworkError(e);
    }) || this.stream.emit("pause");
  }
  // http://dev.mysql.com/doc/internals/en/sequence-id.html
  //
  // The sequence-id is incremented with each packet and may wrap around.
  // It starts at 0 and is reset to 0 when a new command
  // begins in the Command Phase.
  // http://dev.mysql.com/doc/internals/en/example-several-mysql-packets.html
  _resetSequenceId() {
    this.sequenceId = 0, this.compressedSequenceId = 0;
  }
  _bumpCompressedSequenceId(_) {
    this.compressedSequenceId += _, this.compressedSequenceId %= 256;
  }
  _bumpSequenceId(_) {
    this.sequenceId += _, this.sequenceId %= 256;
  }
  writePacket(_) {
    const e = _.length();
    let A, t, R;
    if (e < 16777215)
      _.writeHeader(this.sequenceId), this.config.debug && (console.log(
        `${this._internalId} ${this.connectionId} <== ${this._command._commandName}#${this._command.stateName()}(${[this.sequenceId, _._name, _.length()].join(",")})`
      ), console.log(
        `${this._internalId} ${this.connectionId} <== ${_.buffer.toString("hex")}`
      )), this._bumpSequenceId(1), this.write(_.buffer);
    else
      for (this.config.debug && (console.log(
        `${this._internalId} ${this.connectionId} <== Writing large packet, raw content not written:`
      ), console.log(
        `${this._internalId} ${this.connectionId} <== ${this._command._commandName}#${this._command.stateName()}(${[this.sequenceId, _._name, _.length()].join(",")})`
      )), t = 4; t < 4 + e; t += 16777215)
        A = _.buffer.slice(t, t + 16777215), A.length === 16777215 ? R = Buffer.from([255, 255, 255, this.sequenceId]) : R = Buffer.from([
          A.length & 255,
          A.length >> 8 & 255,
          A.length >> 16 & 255,
          this.sequenceId
        ]), this._bumpSequenceId(1), this.write(R), this.write(A);
  }
  // 0.11+ environment
  startTLS(_) {
    this.config.debug && console.log("Upgrading connection to TLS");
    const n = q_.createSecureContext({
      ca: this.config.ssl.ca,
      cert: this.config.ssl.cert,
      ciphers: this.config.ssl.ciphers,
      key: this.config.ssl.key,
      passphrase: this.config.ssl.passphrase,
      minVersion: this.config.ssl.minVersion,
      maxVersion: this.config.ssl.maxVersion
    }), e = this.config.ssl.rejectUnauthorized, A = this.config.ssl.verifyIdentity, t = ee.isIP(this.config.host) ? void 0 : this.config.host;
    let R = !1;
    this.stream.removeAllListeners("data");
    const i = q_.connect(
      {
        rejectUnauthorized: e,
        requestCert: e,
        checkServerIdentity: A ? q_.checkServerIdentity : function() {
        },
        secureContext: n,
        isServer: !1,
        socket: this.stream,
        servername: t
      },
      () => {
        if (R = !0, e && typeof t == "string" && A) {
          const I = i.getPeerCertificate(!0), N = q_.checkServerIdentity(
            t,
            I
          );
          if (N) {
            _(N);
            return;
          }
        }
        _();
      }
    );
    i.on("error", (I) => {
      R ? this._handleNetworkError(I) : _(I);
    }), i.on("data", (I) => {
      this.packetParser.execute(I);
    }), this.stream = i;
  }
  protocolError(_, n) {
    if (this._closing)
      return;
    const e = new Error(_);
    e.fatal = !0, e.code = n || "PROTOCOL_ERROR", this.emit("error", e);
  }
  get state() {
    return this._fatalError || this._protocolError ? "error" : this._closing || this.stream && this.stream.destroyed ? "disconnected" : this.authorized ? "authenticated" : this._handshakePacket ? "connected" : this.stream && !this.stream.destroyed ? "protocol_handshake" : "disconnected";
  }
  get fatalError() {
    return this._fatalError;
  }
  handlePacket(_) {
    if (this._paused) {
      this._paused_packets.push(_);
      return;
    }
    if (this.config.debug && _) {
      console.log(
        ` raw: ${_.buffer.slice(_.offset, _.offset + _.length()).toString("hex")}`
      ), console.trace();
      const n = this._command ? this._command._commandName : "(no command)", e = this._command ? this._command.stateName() : "(no command)";
      console.log(
        `${this._internalId} ${this.connectionId} ==> ${n}#${e}(${[_.sequenceId, _.type(), _.length()].join(",")})`
      );
    }
    if (!this._command) {
      if (_.peekByte() === 255) {
        const e = GE.Error.fromPacket(_);
        this.protocolError(e.message, e.code);
      } else
        this.protocolError(
          "Unexpected packet while no commands in the queue",
          "PROTOCOL_UNEXPECTED_PACKET"
        );
      this.close();
      return;
    }
    if (_) {
      if (this.sequenceId !== _.sequenceId) {
        const n = new Error(
          `Warning: got packets out of order. Expected ${this.sequenceId} but received ${_.sequenceId}`
        );
        n.expected = this.sequenceId, n.received = _.sequenceId, this.emit("warn", n), console.error(n.message);
      }
      this._bumpSequenceId(_.numPackets);
    }
    try {
      if (this._fatalError)
        return;
      this._command.execute(_, this) && (this._command = this._commands.shift(), this._command && (this.sequenceId = 0, this.compressedSequenceId = 0, this.handlePacket()));
    } catch (n) {
      this._handleFatalError(n), this.stream.destroy();
    }
  }
  addCommand(_) {
    if (this.config.debug) {
      const n = _.constructor.name;
      console.log(`Add command: ${n}`), _._commandName = n;
    }
    return this._command ? this._commands.push(_) : (this._command = _, this.handlePacket()), _;
  }
  format(_, n) {
    if (typeof this.config.queryFormat == "function")
      return this.config.queryFormat.call(
        this,
        _,
        n,
        this.config.timezone
      );
    const e = {
      sql: _,
      values: n
    };
    return this._resolveNamedPlaceholders(e), p_.format(
      e.sql,
      e.values,
      this.config.stringifyObjects,
      this.config.timezone
    );
  }
  escape(_) {
    return p_.escape(_, !1, this.config.timezone);
  }
  escapeId(_) {
    return p_.escapeId(_, !1);
  }
  raw(_) {
    return p_.raw(_);
  }
  _resolveNamedPlaceholders(_) {
    let n;
    if (this.config.namedPlaceholders || _.namedPlaceholders) {
      if (Array.isArray(_.values))
        return;
      Ae === null && (Ae = Uu()()), n = Ae(_.sql, _.values), _.sql = n[0], _.values = n[1];
    }
  }
  query(_, n, e) {
    let A;
    _.constructor === TE.Query ? A = _ : A = fe.createQuery(_, n, e, this.config), this._resolveNamedPlaceholders(A);
    const t = this.format(
      A.sql,
      A.values !== void 0 ? A.values : []
    );
    return A.sql = t, this.addCommand(A);
  }
  pause() {
    this._paused = !0, this.stream.pause();
  }
  resume() {
    let _;
    for (this._paused = !1; _ = this._paused_packets.shift(); )
      if (this.handlePacket(_), this._paused)
        return;
    this.stream.resume();
  }
  // TODO: named placeholders support
  prepare(_, n) {
    return typeof _ == "string" && (_ = { sql: _ }), this.addCommand(new TE.Prepare(_, n));
  }
  unprepare(_) {
    let n = {};
    typeof _ == "object" ? n = _ : n.sql = _;
    const e = fe.statementKey(n), A = this._statements.get(e);
    return A && (this._statements.delete(e), A.close()), A;
  }
  execute(_, n, e) {
    let A = {
      infileStreamFactory: this.config.infileStreamFactory
    };
    if (typeof _ == "object" ? (A = {
      ...A,
      ..._,
      sql: _.sql,
      values: _.values
    }, typeof n == "function" ? e = n : A.values = A.values || n) : typeof n == "function" ? (e = n, A.sql = _, A.values = void 0) : (A.sql = _, A.values = n), this._resolveNamedPlaceholders(A), A.values) {
      if (!Array.isArray(A.values))
        throw new TypeError(
          "Bind parameters must be array if namedPlaceholders parameter is not enabled"
        );
      A.values.forEach((i) => {
        if (!Array.isArray(A.values))
          throw new TypeError(
            "Bind parameters must be array if namedPlaceholders parameter is not enabled"
          );
        if (i === void 0)
          throw new TypeError(
            "Bind parameters must not contain undefined. To pass SQL NULL specify JS null"
          );
        if (typeof i == "function")
          throw new TypeError(
            "Bind parameters must not contain function(s). To pass the body of a function as a string call .toString() first"
          );
      });
    }
    const t = new TE.Execute(A, e), R = new TE.Prepare(A, (i, I) => {
      if (i) {
        t.start = function() {
          return null;
        }, e ? e(i) : t.emit("error", i), t.emit("end");
        return;
      }
      t.statement = I;
    });
    return this.addCommand(R), this.addCommand(t), t;
  }
  changeUser(_, n) {
    !n && typeof _ == "function" && (n = _, _ = {});
    const e = _.charset ? Fu.getCharsetNumber(_.charset) : this.config.charsetNumber;
    return this.addCommand(
      new TE.ChangeUser(
        {
          user: _.user || this.config.user,
          // for the purpose of multi-factor authentication, or not, the main
          // password (used for the 1st authentication factor) can also be
          // provided via the "password1" option
          password: _.password || _.password1 || this.config.password || this.config.password1,
          password2: _.password2 || this.config.password2,
          password3: _.password3 || this.config.password3,
          passwordSha1: _.passwordSha1 || this.config.passwordSha1,
          database: _.database || this.config.database,
          timeout: _.timeout,
          charsetNumber: e,
          currentConfig: this.config
        },
        (A) => {
          A && (A.fatal = !0), n && n(A);
        }
      )
    );
  }
  // transaction helpers
  beginTransaction(_) {
    return this.query("START TRANSACTION", _);
  }
  commit(_) {
    return this.query("COMMIT", _);
  }
  rollback(_) {
    return this.query("ROLLBACK", _);
  }
  ping(_) {
    return this.addCommand(new TE.Ping(_));
  }
  _registerSlave(_, n) {
    return this.addCommand(new TE.RegisterSlave(_, n));
  }
  _binlogDump(_, n) {
    return this.addCommand(new TE.BinlogDump(_, n));
  }
  // currently just alias to close
  destroy() {
    this.close();
  }
  close() {
    this.connectTimeout && (xE.clearTimeout(this.connectTimeout), this.connectTimeout = null), this._closing = !0, this.stream.end(), this.addCommand = this._addCommandClosedState;
  }
  createBinlogStream(_) {
    let n = 1;
    const e = new ou({ objectMode: !0 });
    return e._read = function() {
      return {
        data: n++
      };
    }, this._registerSlave(_, () => {
      const A = this._binlogDump(_);
      A.on("event", (t) => {
        e.push(t);
      }), A.on("eof", () => {
        e.push(null), _.flags && _.flags & 1 && this.close();
      });
    }), e;
  }
  connect(_) {
    if (!_)
      return;
    if (this._fatalError || this._protocolError)
      return _(this._fatalError || this._protocolError);
    if (this._handshakePacket)
      return _(null, this);
    let n = 0;
    function e(A) {
      return function(t) {
        n || (A ? _(t) : _(null, t)), n = 1;
      };
    }
    this.once("error", e(!0)), this.once("connect", e(!1));
  }
  // ===================================
  // outgoing server connection methods
  // ===================================
  writeColumns(_) {
    this.writePacket(GE.ResultSetHeader.toPacket(_.length)), _.forEach((n) => {
      this.writePacket(
        GE.ColumnDefinition.toPacket(n, this.serverConfig.encoding)
      );
    }), this.writeEof();
  }
  // row is array of columns, not hash
  writeTextRow(_) {
    this.writePacket(
      GE.TextRow.toPacket(_, this.serverConfig.encoding)
    );
  }
  writeBinaryRow(_) {
    this.writePacket(
      GE.BinaryRow.toPacket(_, this.serverConfig.encoding)
    );
  }
  writeTextResult(_, n, e = !1) {
    this.writeColumns(n), _.forEach((A) => {
      const t = new Array(n.length);
      n.forEach((R) => {
        t.push(A[R.name]);
      }), e ? this.writeBinaryRow(t) : this.writeTextRow(t);
    }), this.writeEof();
  }
  writeEof(_, n) {
    this.writePacket(GE.EOF.toPacket(_, n));
  }
  writeOk(_) {
    _ || (_ = { affectedRows: 0 }), this.writePacket(GE.OK.toPacket(_, this.serverConfig.encoding));
  }
  writeError(_) {
    const n = this.serverConfig ? this.serverConfig.encoding : "cesu8";
    this.writePacket(GE.Error.toPacket(_, n));
  }
  serverHandshake(_) {
    return this.serverConfig = _, this.serverConfig.encoding = Tt[this.serverConfig.characterSet], this.addCommand(new TE.ServerHandshake(_));
  }
  // ===============================================================
  end(_) {
    if (this.config.isServer) {
      this._closing = !0;
      const e = new It();
      return setImmediate(() => {
        this.stream.end(), e.emit("end");
      }), e;
    }
    const n = this.addCommand(new TE.Quit(_));
    return this.addCommand = this._addCommandClosedState, n;
  }
  static createQuery(_, n, e, A) {
    let t = {
      rowsAsArray: A.rowsAsArray,
      infileStreamFactory: A.infileStreamFactory
    };
    return typeof _ == "object" ? (t = {
      ...t,
      ..._,
      sql: _.sql,
      values: _.values
    }, typeof n == "function" ? e = n : n !== void 0 && (t.values = n)) : typeof n == "function" ? (e = n, t.sql = _, t.values = void 0) : (t.sql = _, t.values = n), new TE.Query(t, e);
  }
  static statementKey(_) {
    return `${typeof _.nestTables}/${_.nestTables}/${_.rowsAsArray}${_.sql}`;
  }
};
var sn = Qu;
const EA = sn;
let _A = class extends EA {
  constructor(_, n) {
    super(n), this._pool = _, this.lastActiveTime = Date.now(), this.once("end", () => {
      this._removeFromPool();
    }), this.once("error", () => {
      this._removeFromPool();
    });
  }
  release() {
    !this._pool || this._pool._closed || (this.lastActiveTime = Date.now(), this._pool.releaseConnection(this));
  }
  end(_) {
    if (this.config.gracefulEnd) {
      this._removeFromPool(), super.end(_);
      return;
    }
    const n = new Error(
      "Calling conn.end() to release a pooled connection is deprecated. In next version calling conn.end() will be restored to default conn.end() behavior. Use conn.release() instead."
    );
    this.emit("warn", n), console.warn(n.message), this.release(), typeof _ == "function" && _();
  }
  destroy() {
    this._removeFromPool(), super.destroy();
  }
  _removeFromPool() {
    if (!this._pool || this._pool._closed)
      return;
    const _ = this._pool;
    this._pool = null, _._removeConnection(this);
  }
};
_A.statementKey = EA.statementKey;
var xR = _A;
_A.prototype._realEnd = EA.prototype.end;
function Vu(E, _, n) {
  return function(e, A, t) {
    e ? (n.message = e.message, n.code = e.code, n.errno = e.errno, n.sql = e.sql, n.sqlState = e.sqlState, n.sqlMessage = e.sqlMessage, _(n)) : E([A, t]);
  };
}
var b_ = Vu;
const bu = b_;
let mu = class {
  constructor(_, n) {
    this.statement = _, this.Promise = n;
  }
  execute(_) {
    const n = this.statement, e = new Error();
    return new this.Promise((A, t) => {
      const R = bu(A, t, e);
      _ ? n.execute(_, R) : n.execute(R);
    });
  }
  close() {
    return new this.Promise((_) => {
      this.statement.close(), _();
    });
  }
};
var Yu = mu;
function yu(E, _, n) {
  const e = {};
  _.on("newListener", (A) => {
    n.indexOf(A) >= 0 && !_.listenerCount(A) && E.on(
      A,
      e[A] = function() {
        const t = [].slice.call(arguments);
        t.unshift(A), _.emit.apply(_, t);
      }
    );
  }).on("removeListener", (A) => {
    n.indexOf(A) >= 0 && !_.listenerCount(A) && (E.removeListener(A, e[A]), delete e[A]);
  });
}
var nA = yu;
const Wu = JE.EventEmitter, Hu = Yu, s_ = b_, vu = nA, at = sn;
let Me = class extends Wu {
  constructor(_, n) {
    super(), this.connection = _, this.Promise = n || Promise, vu(_, this, [
      "error",
      "drain",
      "connect",
      "end",
      "enqueue"
    ]);
  }
  release() {
    this.connection.release();
  }
  query(_, n) {
    const e = this.connection, A = new Error();
    if (typeof n == "function")
      throw new Error(
        "Callback function is not available with promise clients."
      );
    return new this.Promise((t, R) => {
      const i = s_(t, R, A);
      n !== void 0 ? e.query(_, n, i) : e.query(_, i);
    });
  }
  execute(_, n) {
    const e = this.connection, A = new Error();
    if (typeof n == "function")
      throw new Error(
        "Callback function is not available with promise clients."
      );
    return new this.Promise((t, R) => {
      const i = s_(t, R, A);
      n !== void 0 ? e.execute(_, n, i) : e.execute(_, i);
    });
  }
  end() {
    return new this.Promise((_) => {
      this.connection.end(_);
    });
  }
  beginTransaction() {
    const _ = this.connection, n = new Error();
    return new this.Promise((e, A) => {
      const t = s_(e, A, n);
      _.beginTransaction(t);
    });
  }
  commit() {
    const _ = this.connection, n = new Error();
    return new this.Promise((e, A) => {
      const t = s_(e, A, n);
      _.commit(t);
    });
  }
  rollback() {
    const _ = this.connection, n = new Error();
    return new this.Promise((e, A) => {
      const t = s_(e, A, n);
      _.rollback(t);
    });
  }
  ping() {
    const _ = this.connection, n = new Error();
    return new this.Promise((e, A) => {
      _.ping((t) => {
        t ? (n.message = t.message, n.code = t.code, n.errno = t.errno, n.sqlState = t.sqlState, n.sqlMessage = t.sqlMessage, A(n)) : e(!0);
      });
    });
  }
  connect() {
    const _ = this.connection, n = new Error();
    return new this.Promise((e, A) => {
      _.connect((t, R) => {
        t ? (n.message = t.message, n.code = t.code, n.errno = t.errno, n.sqlState = t.sqlState, n.sqlMessage = t.sqlMessage, A(n)) : e(R);
      });
    });
  }
  prepare(_) {
    const n = this.connection, e = this.Promise, A = new Error();
    return new this.Promise((t, R) => {
      n.prepare(_, (i, I) => {
        if (i)
          A.message = i.message, A.code = i.code, A.errno = i.errno, A.sqlState = i.sqlState, A.sqlMessage = i.sqlMessage, R(A);
        else {
          const N = new Hu(
            I,
            e
          );
          t(N);
        }
      });
    });
  }
  changeUser(_) {
    const n = this.connection, e = new Error();
    return new this.Promise((A, t) => {
      n.changeUser(_, (R) => {
        R ? (e.message = R.message, e.code = R.code, e.errno = R.errno, e.sqlState = R.sqlState, e.sqlMessage = R.sqlMessage, t(e)) : A();
      });
    });
  }
  get config() {
    return this.connection.config;
  }
  get threadId() {
    return this.connection.threadId;
  }
};
(function(E) {
  for (let _ = 0; E && _ < E.length; _++) {
    const n = E[_];
    typeof at.prototype[n] == "function" && Me.prototype[n] === void 0 && (Me.prototype[n] = /* @__PURE__ */ function(A) {
      return function() {
        return at.prototype[A].apply(
          this.connection,
          arguments
        );
      };
    }(n));
  }
})([
  // synchronous functions
  "close",
  "createBinlogStream",
  "destroy",
  "escape",
  "escapeId",
  "format",
  "pause",
  "pipe",
  "resume",
  "unprepare"
]);
var eA = Me;
const Xu = eA, Ku = xR;
let ku = class extends Xu {
  constructor(_, n) {
    super(_, n);
  }
  destroy() {
    return Ku.prototype.destroy.apply(
      this.connection,
      arguments
    );
  }
};
var ln = ku;
const ju = xR;
let zu = class extends ju {
  promise(_) {
    const n = ln;
    return new n(this, _);
  }
};
var Ju = zu;
const l_ = Nn, te = rn, Zu = JE.EventEmitter, qu = Ju, Re = LR, pu = sn, ie = Dn;
function Ot(E) {
  return !E || !E.errno ? !1 : E.errno === ie.ER_OPTION_PREVENTS_STATEMENT || E.errno === ie.ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION || E.errno === ie.ER_READ_ONLY_MODE;
}
function ut(E, _) {
  const n = E.length;
  for (let e = 0; e < n; e++)
    if (E.get(e) === _) {
      E.removeOne(e);
      break;
    }
}
let xu = class extends Zu {
  constructor(_) {
    super(), this.config = _.config, this.config.connectionConfig.pool = this, this._allConnections = new Re(), this._freeConnections = new Re(), this._connectionQueue = new Re(), this._closed = !1, this.config.maxIdle < this.config.connectionLimit && this._removeIdleTimeoutConnections();
  }
  getConnection(_) {
    if (this._closed)
      return l_.nextTick(() => _(new Error("Pool is closed.")));
    let n;
    return this._freeConnections.length > 0 ? (n = this._freeConnections.pop(), this.emit("acquire", n), l_.nextTick(() => _(null, n))) : this.config.connectionLimit === 0 || this._allConnections.length < this.config.connectionLimit ? (n = new qu(this, {
      config: this.config.connectionConfig
    }), this._allConnections.push(n), n.connect((e) => this._closed ? _(new Error("Pool is closed.")) : e ? _(e) : (this.emit("connection", n), this.emit("acquire", n), _(null, n)))) : this.config.waitForConnections ? this.config.queueLimit && this._connectionQueue.length >= this.config.queueLimit ? _(new Error("Queue limit reached.")) : (this.emit("enqueue"), this._connectionQueue.push(_)) : l_.nextTick(() => _(new Error("No connections available.")));
  }
  releaseConnection(_) {
    let n;
    _._pool ? this._connectionQueue.length ? (n = this._connectionQueue.shift(), l_.nextTick(n.bind(null, null, _))) : (this._freeConnections.push(_), this.emit("release", _)) : this._connectionQueue.length && (n = this._connectionQueue.shift(), l_.nextTick(this.getConnection.bind(this, n)));
  }
  end(_) {
    this._closed = !0, clearTimeout(this._removeIdleTimeoutConnectionsTimer), typeof _ != "function" && (_ = function(R) {
      if (R)
        throw R;
    });
    let n = !1, e = 0, A;
    const t = (function(R) {
      if (!n && (R || ++e >= this._allConnections.length)) {
        n = !0, _(R);
        return;
      }
    }).bind(this);
    if (this._allConnections.length === 0) {
      t();
      return;
    }
    for (let R = 0; R < this._allConnections.length; R++)
      A = this._allConnections.get(R), A._realEnd(t);
  }
  query(_, n, e) {
    const A = pu.createQuery(
      _,
      n,
      e,
      this.config.connectionConfig
    );
    return typeof A.namedPlaceholders > "u" && (A.namedPlaceholders = this.config.connectionConfig.namedPlaceholders), this.getConnection((t, R) => {
      if (t) {
        typeof A.onResult == "function" ? A.onResult(t) : A.emit("error", t);
        return;
      }
      try {
        let i = null;
        const I = A.onResult;
        I ? A.onResult = function(N, T, a) {
          i = N || null, I(N, T, a);
        } : A.once("error", (N) => {
          i = N;
        }), R.query(A).once("end", () => {
          Ot(i) ? R.destroy() : R.release();
        });
      } catch (i) {
        throw R.release(), i;
      }
    }), A;
  }
  execute(_, n, e) {
    typeof n == "function" && (e = n, n = []), this.getConnection((A, t) => {
      if (A)
        return e(A);
      try {
        t.execute(_, n, (R, i, I) => {
          Ot(R) && t.destroy(), e(R, i, I);
        }).once("end", () => {
          t.release();
        });
      } catch (R) {
        return t.release(), e(R);
      }
    });
  }
  _removeConnection(_) {
    ut(this._allConnections, _), ut(this._freeConnections, _), this.releaseConnection(_);
  }
  _removeIdleTimeoutConnections() {
    this._removeIdleTimeoutConnectionsTimer && clearTimeout(this._removeIdleTimeoutConnectionsTimer), this._removeIdleTimeoutConnectionsTimer = setTimeout(() => {
      try {
        for (; this._freeConnections.length > this.config.maxIdle || this._freeConnections.length > 0 && Date.now() - this._freeConnections.get(0).lastActiveTime > this.config.idleTimeout; )
          this.config.connectionConfig.gracefulEnd ? this._freeConnections.get(0).end() : this._freeConnections.get(0).destroy();
      } finally {
        this._removeIdleTimeoutConnections();
      }
    }, 1e3);
  }
  format(_, n) {
    return te.format(
      _,
      n,
      this.config.connectionConfig.stringifyObjects,
      this.config.connectionConfig.timezone
    );
  }
  escape(_) {
    return te.escape(
      _,
      this.config.connectionConfig.stringifyObjects,
      this.config.connectionConfig.timezone
    );
  }
  escapeId(_) {
    return te.escapeId(_, !1);
  }
};
var $R = xu;
const $u = JE.EventEmitter, ct = b_, Ct = ln, Ec = nA, rt = $R;
class ge extends $u {
  constructor(_, n) {
    super(), this.pool = _, this.Promise = n || Promise, Ec(_, this, ["acquire", "connection", "enqueue", "release"]);
  }
  getConnection() {
    const _ = this.pool;
    return new this.Promise((n, e) => {
      _.getConnection((A, t) => {
        A ? e(A) : n(new Ct(t, this.Promise));
      });
    });
  }
  releaseConnection(_) {
    _ instanceof Ct && _.release();
  }
  query(_, n) {
    const e = this.pool, A = new Error();
    if (typeof n == "function")
      throw new Error(
        "Callback function is not available with promise clients."
      );
    return new this.Promise((t, R) => {
      const i = ct(t, R, A);
      n !== void 0 ? e.query(_, n, i) : e.query(_, i);
    });
  }
  execute(_, n) {
    const e = this.pool, A = new Error();
    if (typeof n == "function")
      throw new Error(
        "Callback function is not available with promise clients."
      );
    return new this.Promise((t, R) => {
      const i = ct(t, R, A);
      n ? e.execute(_, n, i) : e.execute(_, i);
    });
  }
  end() {
    const _ = this.pool, n = new Error();
    return new this.Promise((e, A) => {
      _.end((t) => {
        t ? (n.message = t.message, n.code = t.code, n.errno = t.errno, n.sqlState = t.sqlState, n.sqlMessage = t.sqlMessage, A(n)) : e();
      });
    });
  }
}
(function(E) {
  for (let _ = 0; E && _ < E.length; _++) {
    const n = E[_];
    typeof rt.prototype[n] == "function" && ge.prototype[n] === void 0 && (ge.prototype[n] = /* @__PURE__ */ function(A) {
      return function() {
        return rt.prototype[A].apply(this.pool, arguments);
      };
    }(n));
  }
})([
  // synchronous functions
  "escape",
  "escapeId",
  "format"
]);
var Ei = ge;
const _c = $R;
let nc = class extends _c {
  promise(_) {
    const n = Ei;
    return new n(this, _);
  }
};
var _i = nc;
const Dt = $e;
let ec = class {
  constructor(_) {
    typeof _ == "string" && (_ = Dt.parseUrl(_)), this.connectionConfig = new Dt(_), this.waitForConnections = _.waitForConnections === void 0 ? !0 : !!_.waitForConnections, this.connectionLimit = isNaN(_.connectionLimit) ? 10 : Number(_.connectionLimit), this.maxIdle = isNaN(_.maxIdle) ? this.connectionLimit : Number(_.maxIdle), this.idleTimeout = isNaN(_.idleTimeout) ? 6e4 : Number(_.idleTimeout), this.queueLimit = isNaN(_.queueLimit) ? 0 : Number(_.queueLimit);
  }
};
var ni = ec;
const Ac = sn;
let tc = class extends Ac {
  promise(_) {
    const n = eA;
    return new n(this, _);
  }
};
var ei = tc;
const f_ = Nn, Rc = _i, ic = ni, Ic = ei, Nc = JE.EventEmitter, Ai = {
  RR() {
    let E = 0;
    return (_) => _[E++ % _.length];
  },
  RANDOM() {
    return (E) => E[Math.floor(Math.random() * E.length)];
  },
  ORDER() {
    return (E) => E[0];
  }
}, st = function() {
  let E;
  return typeof f_.hrtime == "function" ? (E = f_.hrtime(), E = E[0] * 1e3 + E[1] * 1e-6) : E = f_.uptime() * 1e3, Math.floor(E);
}, Tc = function(E) {
  if (E instanceof RegExp)
    return E;
  const _ = E.replace(/([.+?^=!:${}()|[\]/\\])/g, "\\$1").replace(/\*/g, ".*");
  return new RegExp(`^${_}$`);
};
class ac {
  constructor(_, n, e) {
    this._cluster = _, this._pattern = n, this._selector = Ai[e]();
  }
  getConnection(_) {
    const n = this._getClusterNode();
    if (n === null) {
      let e = new Error("Pool does Not exist.");
      return e.code = "POOL_NOEXIST", this._cluster._findNodeIds(this._pattern, !0).length !== 0 && (e = new Error("Pool does Not have online node."), e.code = "POOL_NONEONLINE"), _(e);
    }
    return this._cluster._getConnection(n, (e, A) => e ? this._cluster._canRetry && this._cluster._findNodeIds(this._pattern).length !== 0 ? (this._cluster.emit("warn", e), this.getConnection(_)) : _(e) : _(null, A));
  }
  /**
   * pool cluster query
   * @param {*} sql
   * @param {*} values
   * @param {*} cb
   * @returns query
   */
  query(_, n, e) {
    const A = Ic.createQuery(_, n, e, {});
    return this.getConnection((t, R) => {
      if (t) {
        typeof A.onResult == "function" ? A.onResult(t) : A.emit("error", t);
        return;
      }
      try {
        R.query(A).once("end", () => {
          R.release();
        });
      } catch (i) {
        throw R.release(), i;
      }
    }), A;
  }
  /**
   * pool cluster execute
   * @param {*} sql
   * @param {*} values
   * @param {*} cb
   */
  execute(_, n, e) {
    typeof n == "function" && (e = n, n = []), this.getConnection((A, t) => {
      if (A)
        return e(A);
      try {
        t.execute(_, n, e).once("end", () => {
          t.release();
        });
      } catch (R) {
        throw t.release(), R;
      }
    });
  }
  _getClusterNode() {
    const _ = this._cluster._findNodeIds(this._pattern);
    if (_.length === 0)
      return null;
    const n = _.length === 1 ? _[0] : this._selector(_);
    return this._cluster._getNode(n);
  }
}
let Oc = class extends Nc {
  constructor(_) {
    super(), _ = _ || {}, this._canRetry = typeof _.canRetry > "u" ? !0 : _.canRetry, this._removeNodeErrorCount = _.removeNodeErrorCount || 5, this._restoreNodeTimeout = _.restoreNodeTimeout || 0, this._defaultSelector = _.defaultSelector || "RR", this._closed = !1, this._lastId = 0, this._nodes = {}, this._serviceableNodeIds = [], this._namespaces = {}, this._findCaches = {};
  }
  of(_, n) {
    _ = _ || "*", n = n || this._defaultSelector, n = n.toUpperCase(), !Ai[n] === "undefined" && (n = this._defaultSelector);
    const e = _ + n;
    return typeof this._namespaces[e] > "u" && (this._namespaces[e] = new ac(this, _, n)), this._namespaces[e];
  }
  add(_, n) {
    typeof _ == "object" && (n = _, _ = `CLUSTER::${++this._lastId}`), typeof this._nodes[_] > "u" && (this._nodes[_] = {
      id: _,
      errorCount: 0,
      pool: new Rc({ config: new ic(n) }),
      _offlineUntil: 0
    }, this._serviceableNodeIds.push(_), this._clearFindCaches());
  }
  remove(_) {
    const n = this._findNodeIds(_, !0);
    for (let e = 0; e < n.length; e++) {
      const A = this._getNode(n[e]);
      A && this._removeNode(A);
    }
  }
  getConnection(_, n, e) {
    let A;
    typeof _ == "function" ? (e = _, A = this.of()) : (typeof n == "function" && (e = n, n = this._defaultSelector), A = this.of(_, n)), A.getConnection(e);
  }
  end(_) {
    const n = _ !== void 0 ? _ : (R) => {
      if (R)
        throw R;
    };
    if (this._closed) {
      f_.nextTick(n);
      return;
    }
    this._closed = !0;
    let e = !1, A = 0;
    const t = (R) => {
      if (!e && (R || --A <= 0))
        return e = !0, n(R);
    };
    for (const R in this._nodes)
      A++, this._nodes[R].pool.end(t);
    A === 0 && f_.nextTick(t);
  }
  _findNodeIds(_, n) {
    let e = 0, A = this._findCaches[_];
    if (A === void 0) {
      const t = Tc(_);
      A = this._serviceableNodeIds.filter(
        (R) => R.match(t)
      );
    }
    return this._findCaches[_] = A, n ? A : A.filter((t) => {
      const R = this._getNode(t);
      return R._offlineUntil ? (e || (e = st()), R._offlineUntil <= e) : !0;
    });
  }
  _getNode(_) {
    return this._nodes[_] || null;
  }
  _increaseErrorCount(_) {
    const n = ++_.errorCount;
    if (!(this._removeNodeErrorCount > n)) {
      if (this._restoreNodeTimeout > 0) {
        _._offlineUntil = st() + this._restoreNodeTimeout, this.emit("offline", _.id);
        return;
      }
      this._removeNode(_), this.emit("remove", _.id);
    }
  }
  _decreaseErrorCount(_) {
    let n = _.errorCount;
    n > this._removeNodeErrorCount && (n = this._removeNodeErrorCount), n < 1 && (n = 1), _.errorCount = n - 1, _._offlineUntil && (_._offlineUntil = 0, this.emit("online", _.id));
  }
  _getConnection(_, n) {
    _.pool.getConnection((e, A) => e ? (this._increaseErrorCount(_), n(e)) : (this._decreaseErrorCount(_), A._clusterId = _.id, n(null, A)));
  }
  _removeNode(_) {
    const n = this._serviceableNodeIds.indexOf(_.id);
    n !== -1 && (this._serviceableNodeIds.splice(n, 1), delete this._nodes[_.id], this._clearFindCaches(), _.pool.end());
  }
  _clearFindCaches() {
    this._findCaches = {};
  }
};
var ti = Oc;
const uc = ei, cc = $e;
function Cc(E) {
  return new uc({ config: new cc(E) });
}
var rc = Cc;
const Dc = _i, sc = ni;
function lc(E) {
  return new Dc({ config: new sc(E) });
}
var hc = lc;
const Sc = ti;
function Bc(E) {
  return new Sc(E);
}
var fc = Bc;
const Mc = ln, lt = b_;
class gc {
  constructor(_, n) {
    this.poolNamespace = _, this.Promise = n || Promise;
  }
  getConnection() {
    const _ = this.poolNamespace;
    return new this.Promise((n, e) => {
      _.getConnection((A, t) => {
        A ? e(A) : n(new Mc(t, this.Promise));
      });
    });
  }
  query(_, n) {
    const e = this.poolNamespace, A = new Error();
    if (typeof n == "function")
      throw new Error(
        "Callback function is not available with promise clients."
      );
    return new this.Promise((t, R) => {
      const i = lt(t, R, A);
      e.query(_, n, i);
    });
  }
  execute(_, n) {
    const e = this.poolNamespace, A = new Error();
    if (typeof n == "function")
      throw new Error(
        "Callback function is not available with promise clients."
      );
    return new this.Promise((t, R) => {
      const i = lt(t, R, A);
      e.execute(_, n, i);
    });
  }
}
var Lc = gc;
(function(E) {
  const _ = rn, n = JE.EventEmitter, e = ye, A = ti, t = rc, R = hc, i = fc, I = eA, N = Ei, T = b_, a = ln, u = nA, C = Lc;
  function r(S) {
    const B = t(S), h = new Error(), g = S.Promise || Promise;
    if (!g)
      throw new Error(
        "no Promise implementation available.Use promise-enabled node version or pass userland Promise implementation as parameter, for example: { Promise: require('bluebird') }"
      );
    return new g((L, U) => {
      B.once("connect", () => {
        L(new I(B, g));
      }), B.once("error", (F) => {
        h.message = F.message, h.code = F.code, h.errno = F.errno, h.sqlState = F.sqlState, U(h);
      });
    });
  }
  function D(S) {
    const B = R(S), h = S.Promise || Promise;
    if (!h)
      throw new Error(
        "no Promise implementation available.Use promise-enabled node version or pass userland Promise implementation as parameter, for example: { Promise: require('bluebird') }"
      );
    return new N(B, h);
  }
  class c extends n {
    constructor(B, h) {
      super(), this.poolCluster = B, this.Promise = h || Promise, u(B, this, ["warn", "remove", "online", "offline"]);
    }
    getConnection(B, h) {
      const g = this.poolCluster;
      return new this.Promise((L, U) => {
        g.getConnection(
          B,
          h,
          (F, Q) => {
            F ? U(F) : L(new a(Q, this.Promise));
          }
        );
      });
    }
    query(B, h) {
      const g = this.poolCluster, L = new Error();
      if (typeof h == "function")
        throw new Error(
          "Callback function is not available with promise clients."
        );
      return new this.Promise((U, F) => {
        const Q = T(U, F, L);
        g.query(B, h, Q);
      });
    }
    execute(B, h) {
      const g = this.poolCluster, L = new Error();
      if (typeof h == "function")
        throw new Error(
          "Callback function is not available with promise clients."
        );
      return new this.Promise((U, F) => {
        const Q = T(U, F, L);
        g.execute(B, h, Q);
      });
    }
    of(B, h) {
      return new C(
        this.poolCluster.of(B, h),
        this.Promise
      );
    }
    end() {
      const B = this.poolCluster, h = new Error();
      return new this.Promise((g, L) => {
        B.end((U) => {
          U ? (h.message = U.message, h.code = U.code, h.errno = U.errno, h.sqlState = U.sqlState, h.sqlMessage = U.sqlMessage, L(h)) : g();
        });
      });
    }
  }
  (function(S) {
    for (let B = 0; S && B < S.length; B++) {
      const h = S[B];
      typeof A.prototype[h] == "function" && c.prototype[h] === void 0 && (c.prototype[h] = /* @__PURE__ */ function(L) {
        return function() {
          return A.prototype[L].apply(
            this.poolCluster,
            arguments
          );
        };
      }(h));
    }
  })(["add", "remove"]);
  function l(S) {
    const B = i(S), h = S && S.Promise || Promise;
    if (!h)
      throw new Error(
        "no Promise implementation available.Use promise-enabled node version or pass userland Promise implementation as parameter, for example: { Promise: require('bluebird') }"
      );
    return new c(B, h);
  }
  E.createConnection = r, E.createPool = D, E.createPoolCluster = l, E.escape = _.escape, E.escapeId = _.escapeId, E.format = _.format, E.raw = _.raw, E.PromisePool = N, E.PromiseConnection = I, E.PromisePoolConnection = a, E.__defineGetter__("Types", () => dE()), E.__defineGetter__(
    "Charsets",
    () => u_()
  ), E.__defineGetter__(
    "CharsetToEncoding",
    () => SE()
  ), E.setMaxParserCache = function(S) {
    e.setMaxCache(S);
  }, E.clearParserCache = function() {
    e.clearCache();
  };
})(MR);
const dc = /* @__PURE__ */ oe(MR);
var wE = { exports: {} };
const Uc = "16.6.1", oc = {
  version: Uc
}, Le = L_, In = en, wc = si, Gc = U_, Fc = oc, AA = Fc.version, Pc = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function Qc(E) {
  const _ = {};
  let n = E.toString();
  n = n.replace(/\r\n?/mg, `
`);
  let e;
  for (; (e = Pc.exec(n)) != null; ) {
    const A = e[1];
    let t = e[2] || "";
    t = t.trim();
    const R = t[0];
    t = t.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), R === '"' && (t = t.replace(/\\n/g, `
`), t = t.replace(/\\r/g, "\r")), _[A] = t;
  }
  return _;
}
function Vc(E) {
  E = E || {};
  const _ = Ii(E);
  E.path = _;
  const n = EE.configDotenv(E);
  if (!n.parsed) {
    const R = new Error(`MISSING_DATA: Cannot parse ${_} for an unknown reason`);
    throw R.code = "MISSING_DATA", R;
  }
  const e = ii(E).split(","), A = e.length;
  let t;
  for (let R = 0; R < A; R++)
    try {
      const i = e[R].trim(), I = mc(n, i);
      t = EE.decrypt(I.ciphertext, I.key);
      break;
    } catch (i) {
      if (R + 1 >= A)
        throw i;
    }
  return EE.parse(t);
}
function bc(E) {
  console.log(`[dotenv@${AA}][WARN] ${E}`);
}
function M_(E) {
  console.log(`[dotenv@${AA}][DEBUG] ${E}`);
}
function Ri(E) {
  console.log(`[dotenv@${AA}] ${E}`);
}
function ii(E) {
  return E && E.DOTENV_KEY && E.DOTENV_KEY.length > 0 ? E.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
}
function mc(E, _) {
  let n;
  try {
    n = new URL(_);
  } catch (i) {
    if (i.code === "ERR_INVALID_URL") {
      const I = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
      throw I.code = "INVALID_DOTENV_KEY", I;
    }
    throw i;
  }
  const e = n.password;
  if (!e) {
    const i = new Error("INVALID_DOTENV_KEY: Missing key part");
    throw i.code = "INVALID_DOTENV_KEY", i;
  }
  const A = n.searchParams.get("environment");
  if (!A) {
    const i = new Error("INVALID_DOTENV_KEY: Missing environment part");
    throw i.code = "INVALID_DOTENV_KEY", i;
  }
  const t = `DOTENV_VAULT_${A.toUpperCase()}`, R = E.parsed[t];
  if (!R) {
    const i = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${t} in your .env.vault file.`);
    throw i.code = "NOT_FOUND_DOTENV_ENVIRONMENT", i;
  }
  return { ciphertext: R, key: e };
}
function Ii(E) {
  let _ = null;
  if (E && E.path && E.path.length > 0)
    if (Array.isArray(E.path))
      for (const n of E.path)
        Le.existsSync(n) && (_ = n.endsWith(".vault") ? n : `${n}.vault`);
    else
      _ = E.path.endsWith(".vault") ? E.path : `${E.path}.vault`;
  else
    _ = In.resolve(process.cwd(), ".env.vault");
  return Le.existsSync(_) ? _ : null;
}
function ht(E) {
  return E[0] === "~" ? In.join(wc.homedir(), E.slice(1)) : E;
}
function Yc(E) {
  const _ = !!(E && E.debug), n = E && "quiet" in E ? E.quiet : !0;
  (_ || !n) && Ri("Loading env from encrypted .env.vault");
  const e = EE._parseVault(E);
  let A = process.env;
  return E && E.processEnv != null && (A = E.processEnv), EE.populate(A, e, E), { parsed: e };
}
function yc(E) {
  const _ = In.resolve(process.cwd(), ".env");
  let n = "utf8";
  const e = !!(E && E.debug), A = E && "quiet" in E ? E.quiet : !0;
  E && E.encoding ? n = E.encoding : e && M_("No encoding is specified. UTF-8 is used by default");
  let t = [_];
  if (E && E.path)
    if (!Array.isArray(E.path))
      t = [ht(E.path)];
    else {
      t = [];
      for (const N of E.path)
        t.push(ht(N));
    }
  let R;
  const i = {};
  for (const N of t)
    try {
      const T = EE.parse(Le.readFileSync(N, { encoding: n }));
      EE.populate(i, T, E);
    } catch (T) {
      e && M_(`Failed to load ${N} ${T.message}`), R = T;
    }
  let I = process.env;
  if (E && E.processEnv != null && (I = E.processEnv), EE.populate(I, i, E), e || !A) {
    const N = Object.keys(i).length, T = [];
    for (const a of t)
      try {
        const u = In.relative(process.cwd(), a);
        T.push(u);
      } catch (u) {
        e && M_(`Failed to load ${a} ${u.message}`), R = u;
      }
    Ri(`injecting env (${N}) from ${T.join(",")}`);
  }
  return R ? { parsed: i, error: R } : { parsed: i };
}
function Wc(E) {
  if (ii(E).length === 0)
    return EE.configDotenv(E);
  const _ = Ii(E);
  return _ ? EE._configVault(E) : (bc(`You set DOTENV_KEY but you are missing a .env.vault file at ${_}. Did you forget to build it?`), EE.configDotenv(E));
}
function Hc(E, _) {
  const n = Buffer.from(_.slice(-64), "hex");
  let e = Buffer.from(E, "base64");
  const A = e.subarray(0, 12), t = e.subarray(-16);
  e = e.subarray(12, -16);
  try {
    const R = Gc.createDecipheriv("aes-256-gcm", n, A);
    return R.setAuthTag(t), `${R.update(e)}${R.final()}`;
  } catch (R) {
    const i = R instanceof RangeError, I = R.message === "Invalid key length", N = R.message === "Unsupported state or unable to authenticate data";
    if (i || I) {
      const T = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
      throw T.code = "INVALID_DOTENV_KEY", T;
    } else if (N) {
      const T = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
      throw T.code = "DECRYPTION_FAILED", T;
    } else
      throw R;
  }
}
function vc(E, _, n = {}) {
  const e = !!(n && n.debug), A = !!(n && n.override);
  if (typeof _ != "object") {
    const t = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
    throw t.code = "OBJECT_REQUIRED", t;
  }
  for (const t of Object.keys(_))
    Object.prototype.hasOwnProperty.call(E, t) ? (A === !0 && (E[t] = _[t]), e && M_(A === !0 ? `"${t}" is already defined and WAS overwritten` : `"${t}" is already defined and was NOT overwritten`)) : E[t] = _[t];
}
const EE = {
  configDotenv: yc,
  _configVault: Yc,
  _parseVault: Vc,
  config: Wc,
  decrypt: Hc,
  parse: Qc,
  populate: vc
};
wE.exports.configDotenv = EE.configDotenv;
wE.exports._configVault = EE._configVault;
wE.exports._parseVault = EE._parseVault;
wE.exports.config = EE.config;
wE.exports.decrypt = EE.decrypt;
wE.exports.parse = EE.parse;
wE.exports.populate = EE.populate;
wE.exports = EE;
var Xc = wE.exports;
const Kc = /* @__PURE__ */ oe(Xc);
Kc.config();
const St = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "excel_ai_platform",
  port: process.env.DB_PORT || 3306
};
let _E, VE = !1;
const kc = process.env.USE_DATABASE !== "false";
async function jc() {
  if (!kc)
    return console.log("Database disabled"), VE = !1, null;
  try {
    return _E = await dc.createConnection(St), await _E.ping(), console.log("Connected to MySQL database:", St.database), VE = !0, _E;
  } catch (E) {
    return console.error("Database connection failed:", E.message), VE = !1, null;
  }
}
async function zc(E, _) {
  if (!VE || !_E)
    return console.log("Database not connected"), null;
  try {
    const [n] = await _E.execute(
      "SELECT * FROM users WHERE (username = ? OR email = ?) AND is_active = 1",
      [E, E]
    );
    if (n.length === 0) return null;
    const e = n[0];
    return _ === e.password_hash ? {
      id: e.id,
      username: e.username,
      full_name: e.full_name,
      email: e.email,
      role: e.role,
      avatar: e.avatar,
      badge: e.badge
    } : null;
  } catch (n) {
    return console.error("Auth error:", n), null;
  }
}
async function Jc(E, _, n, e) {
  if (!VE || !_E)
    throw new Error("Database not connected");
  try {
    const [A] = await _E.execute(
      "SELECT id FROM users WHERE username = ?",
      [E]
    );
    if (A.length > 0)
      throw new Error("Tên đăng nhập đã được sử dụng");
    if (_) {
      const [R] = await _E.execute(
        "SELECT id FROM users WHERE email = ?",
        [_]
      );
      if (R.length > 0)
        throw new Error("Email đã được sử dụng");
    }
    const [t] = await _E.execute(
      "INSERT INTO users (username, password_hash, full_name, email, role) VALUES (?, ?, ?, ?, ?)",
      [E, n, e, _ || null, "user"]
    );
    return t;
  } catch (A) {
    throw console.error("Create user error:", A), A;
  }
}
async function Zc() {
  if (!VE || !_E)
    return [];
  try {
    const [E] = await _E.execute("SELECT * FROM tasks");
    return E;
  } catch (E) {
    return console.error("Get exercises error:", E), [];
  }
}
async function qc(E) {
  if (!VE || !_E)
    return null;
  try {
    const [_] = await _E.execute(
      "SELECT * FROM users WHERE google_id = ? OR email = ?",
      [E.id, E.email]
    );
    if (_.length > 0)
      return _[0];
    const n = E.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    let e = n, A = 1;
    for (; ; ) {
      const [i] = await _E.execute(
        "SELECT id FROM users WHERE username = ?",
        [e]
      );
      if (i.length === 0) break;
      e = n + A, A++;
    }
    const [t] = await _E.execute(
      "INSERT INTO users (username, email, full_name, google_id, avatar_url) VALUES (?, ?, ?, ?, ?)",
      [e, E.email, E.name, E.id, E.picture]
    ), [R] = await _E.execute(
      "SELECT * FROM users WHERE id = ?",
      [t.insertId]
    );
    return R[0];
  } catch (_) {
    return console.error("Google auth error:", _), null;
  }
}
async function pc(E, _, n, e) {
  if (!VE || !_E)
    return { insertId: 1 };
  try {
    const [A] = await _E.execute(
      "INSERT INTO user_progress (user_id, program_id, completion_percent) VALUES (?, ?, ?)",
      [E, _, n]
    );
    return A;
  } catch (A) {
    throw console.error("Save progress error:", A), A;
  }
}
let h_;
const Ie = /* @__PURE__ */ new Map();
function xc(E = 8080) {
  return h_ = new li({ port: E }), h_.on("error", (_) => {
    console.error(`WebSocket Server Error on port ${E}:`, _.message);
  }), h_.on("connection", (_) => {
    console.log("Client connected"), _.on("message", (n) => {
      try {
        const e = JSON.parse(n.toString());
        if (e.type === "qr-scan" && (Ie.set(e.sessionId, { ws: _, status: "scanned", userData: e.userData }), h_.clients.forEach((A) => {
          A.readyState === 1 && A !== _ && A.send(JSON.stringify({ type: "qr-auth-success", sessionId: e.sessionId, user: e.userData }));
        })), e.type === "qr-check") {
          const A = Ie.get(e.sessionId);
          A && A.status === "scanned" && (_.send(JSON.stringify({ type: "qr-auth-success", user: A.userData })), Ie.delete(e.sessionId));
        }
      } catch (e) {
        console.error("WebSocket message error:", e);
      }
    }), _.on("close", () => {
      console.log("Client disconnected");
    });
  }), console.log(`WebSocket server running on port ${E}`), h_;
}
const $c = Oi(import.meta.url), Bt = en.dirname($c);
let x_;
async function Ni() {
  try {
    await jc();
  } catch {
    console.log("App will continue without database");
  }
  try {
    const _ = process.env.WS_PORT || 8081;
    xc(_);
  } catch (_) {
    console.error("Failed to start WebSocket server:", _.message);
  }
  const E = en.join(Bt, "preload.js");
  console.log("Preload path:", E), console.log("Preload exists:", L_.existsSync(E)), x_ = new ft({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: E,
      contextIsolation: !0,
      nodeIntegration: !1,
      sandbox: !1
    }
  }), process.env.VITE_DEV_SERVER_URL ? (x_.loadURL(process.env.VITE_DEV_SERVER_URL), x_.webContents.openDevTools()) : x_.loadFile(en.join(Bt, "../dist/index.html"));
}
jE.handle("login", async (E, _) => {
  try {
    const n = await zc(_.loginKey, _.password);
    return { success: !!n, user: n };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
jE.handle("register", async (E, _) => {
  try {
    return { success: !0, result: await Jc(_.username, _.email, _.password, _.fullName) };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
jE.handle("get-exercises", async () => {
  try {
    return await Zc();
  } catch {
    return [];
  }
});
jE.handle("save-progress", async (E, _) => {
  try {
    return { success: !0, result: await pc(
      _.userId,
      _.exerciseId,
      _.score,
      _.completed
    ) };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
jE.handle("google-login", async (E, _) => {
  try {
    const n = await qc(_);
    return { success: !!n, user: n };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
jE.handle("generate-qr-session", async () => {
  try {
    const E = "qr_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9), _ = JSON.stringify({ sessionId: E, type: "qr-login" }), n = await UN.toDataURL(_, { width: 250, margin: 2 });
    return { success: !0, sessionId: E, qrCodeUrl: n };
  } catch (E) {
    return { success: !1, error: E.message };
  }
});
jE.handle("google-login-desktop", async (E, _) => new Promise((n) => {
  const t = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${_}&redirect_uri=http://localhost:8765/callback&response_type=code&scope=email profile openid&access_type=offline`;
  Ti.openExternal(t);
  const R = ci.createServer((i, I) => {
    const N = new URL(i.url, "http://localhost:8765");
    if (N.pathname === "/callback") {
      const T = N.searchParams.get("code");
      I.writeHead(200, { "Content-Type": "text/html" }), I.end("<html><body><script>window.close()<\/script><h1>Login successful! You can close this window.</h1></body></html>"), R.close(), n(T ? { success: !0, code: T } : { success: !1, error: "No code received" });
    }
  }).listen(8765);
  setTimeout(() => {
    R.close(), n({ success: !1, error: "Timeout" });
  }, 12e4);
}));
nn.whenReady().then(Ni);
nn.on("window-all-closed", () => {
  process.platform !== "darwin" && nn.quit();
});
nn.on("activate", () => {
  ft.getAllWindows().length === 0 && Ni();
});
