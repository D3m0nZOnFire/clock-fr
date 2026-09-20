.pragma library

// Small formatting helpers for the D3m0nZ.clock-fr fork. Not from upstream —
// nothing to re-sync here.

// Capitalize the first letter of every word. French CLDR hands back lowercase
// weekday and month names ("mercredi", "septembre"); we want "Mercredi",
// "Septembre". Tokens that begin with a digit or an already-capital letter
// (times, "02-09-2026", an "S37" week tag) are left untouched.
function capitalizeWords(text) {
  return String(text).replace(/(^|\s)([a-zà-ÿ])/g,
    function (_, lead, ch) { return lead + ch.toUpperCase() })
}

// Bar label presets the right-click ring walks through. All 24-hour, all
// day-month-year order. Replaces the upstream CLOCK_FORMATS (which carries
// 12-hour AM/PM twins and month-first dates).
var HORIZONTAL_FORMATS = [
  "dddd HH:mm",
  "HH:mm",
  "dddd dd-MM-yyyy HH:mm",
  "dd-MM-yyyy HH:mm",
  "dd-MM-yyyy",
  "dddd d MMMM"
]

var VERTICAL_FORMATS = [
  "HH\n—\nmm",
  "HH\nmm",
  "dd\nMM\n''yy"
]

function formats(vertical) {
  return (vertical ? VERTICAL_FORMATS : HORIZONTAL_FORMATS).slice()
}
