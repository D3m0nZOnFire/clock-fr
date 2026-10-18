# d3m0nz.clock-fr

A French version of the [Omarchy](https://omarchy.org) bar clock. Same widget, same calendar popup, but weekday and month names come out in French ("Mercredi 14:30", "2 Septembre") instead of English.

![The bar clock showing "Dimanche 15:10"](screenshots/clock.png)

Stock `omarchy.clock` ignores `$LANG` / `$LC_TIME` and always renders English names, because it calls the QML-global `Qt.formatDateTime()`. This fork formats through `Qt.locale("fr_CH")` instead. That uses Qt's bundled CLDR data, so no system locale needs to be generated.

## Install

```bash
omarchy plugin add https://github.com/D3m0nZOnFire/clock-fr.git --enable
```

Then, if you want to replace the stock clock, remove `omarchy.clock` from the bar (Omarchy menu, or delete its entry from `bar.layout.center` in `~/.config/omarchy/shell.json`).

## Uninstall

```bash
omarchy plugin remove d3m0nz.clock-fr
omarchy plugin enable omarchy.clock   # optional: bring back the stock clock
```

Removing disables the widget and deletes its folder from `~/.config/omarchy/plugins/`. The plugin stores nothing outside `shell.json` (its own entry, plus `centerAnchor` if you pointed it at this widget) and does not modify any other file.

## What differs from `omarchy.clock`

- Bar label and calendar use French names, capitalized ("Mercredi", "Septembre").
- Right-click format ring is 24-hour only, day-month-year order (no AM/PM, no month-first dates). It includes a live-seconds format (`dddd HH:mm:ss`); the clock only ticks every second while a format with seconds is shown.
- The ring also has `dddd d MMM HH:mm` ("Dimanche 18 Oct. 14:58"), right after the default.
- Default formats: `dddd HH:mm` and `dd-MM-yyyy`.
- Calendar weeks start on Monday by default.
- Popup strings are translated with the same wording as Omarchy's official French translation (tooltips, "NAISSANCE", "JUSQU'À", "VIE", "S" for week number).

Behavior is otherwise unchanged: left click opens the calendar, right click cycles the label format, middle click opens the timezone picker.

## Settings

Set in this widget's entry in `~/.config/omarchy/shell.json`:

| key | default | meaning |
|---|---|---|
| `format` | `dddd HH:mm` | bar label format |
| `formatAlt` | `dd-MM-yyyy` | alternate format |
| `verticalFormat` / `verticalFormatAlt` | `HH\n—\nmm` / `dd\nMM\n''yy` | formats for a vertical bar |
| `weekStartDay` | Monday | first day of the calendar week |
| `birthYear`, `lifeExpectancy` | unset | drive the "life" progress bar in the calendar |

To target a different French locale, change `Qt.locale("fr_CH")` (e.g. to `"fr_FR"`) in `BarWidget.qml` and `Panel.qml`.

## IPC

Target `d3m0nz.clock-fr`: `open`, `close`, `toggle`, `show`, `hide`, `refresh`, `cycleFormat`, `toggleWeekStart`.

Note the stock keybinding for the calendar targets `omarchy.clock`, so it does nothing once that widget is removed. Bind your own to this target if you want one.

## Tests

```bash
node test/fr-test.js
```

## Dependencies

None beyond Omarchy itself (Quickshell and the shell's `qs.Ui` / `qs.Commons` modules). No extra packages and no system locale needed.

## Compatibility

`Panel.qml` imports Omarchy's internal `qs.Ui` / `qs.Commons` components, which are not a stable plugin API. It was last checked against Omarchy 4.0.4, and also carries the self-contained clock fixes from Omarchy's development branch (calendar grid walked in UTC so DST-at-midnight zones don't repeat a day, live-seconds format, bar tooltip). If an update breaks the widget, diff against `/usr/share/omarchy/shell/plugins/panels/clock/` and re-apply the French changes.

Omarchy's development branch also translates the stock clock itself ("Omarchy in 50 languages"). Once that ships in a release, setting Omarchy's language to French gives you most of this plugin with `omarchy.clock`; this fork stays useful if you want the 24-hour-only ring, capitalized names, or French dates with the rest of the desktop in another language.

## License

MIT. Derived from the Omarchy clock plugin (© David Heinemeier Hansson), used under its MIT license. See `LICENSE`.
