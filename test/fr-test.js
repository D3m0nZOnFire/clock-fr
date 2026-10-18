// Unit tests for Fr.js. Run with: node test/fr-test.js
// Fr.js is a QML JS library, so its ".pragma library" line is stripped
// before it is evaluated under node.

var fs = require("fs")
var path = require("path")
var assert = require("assert")
var vm = require("vm")

var source = fs.readFileSync(path.join(__dirname, "..", "Fr.js"), "utf8")
  .replace(/^\.pragma library\s*$/m, "")
var Fr = {}
vm.runInNewContext(source, Fr)

var failures = 0
function test(name, fn) {
  try { fn(); console.log("ok   " + name) }
  catch (e) { failures++; console.log("FAIL " + name + "\n     " + e.message) }
}

test("ring offers the weekday, day, short month and time format", function () {
  assert.ok(Fr.formats(false).indexOf("dddd d MMM HH:mm") !== -1)
})

test("new format comes right after the default one", function () {
  var ring = Fr.formats(false)
  assert.strictEqual(ring[ring.indexOf("dddd HH:mm") + 1], "dddd d MMM HH:mm")
})

test("vertical ring is unchanged", function () {
  assert.strictEqual(Fr.formats(true).indexOf("dddd d MMM HH:mm"), -1)
})

test("dot-stripping helper is gone: French abbreviations keep their dot", function () {
  assert.strictEqual(typeof Fr.dropAbbreviationDots, "undefined")
})

test("capitalization keeps the abbreviation dot", function () {
  assert.strictEqual(Fr.capitalizeWords("dimanche 18 oct. 14:58"), "Dimanche 18 Oct. 14:58")
})

if (failures > 0) { console.log(failures + " failing"); process.exit(1) }
console.log("all passing")
