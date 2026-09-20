# D3m0nZ.clock-fr

A French version of the [Omarchy](https://omarchy.org) bar clock. Same widget, same calendar popup, but weekday and month names come out in French ("Mercredi 14:30", "2 Septembre") instead of English.

Stock `omarchy.clock` ignores `$LANG` / `$LC_TIME` and always renders English names, because it calls the QML-global `Qt.formatDateTime()`. This fork formats through `Qt.locale("fr_CH")` instead. That uses Qt's bundled CLDR data, so no system locale needs to be generated.

## Install

```bash
omarchy plugin add https://github.com/D3m0nZOnFire/clock-fr.git --enable
```

Then, if you want to replace the stock clock, remove `omarchy.clock` from the bar (Omarchy menu, or delete its entry from `bar.layout.center` in `~/.config/omarchy/shell.json`).

## Uninstall

```bash
omarchy plugin remove D3m0nZ.clock-fr
omarchy plugin enable omarchy.clock   # optional: bring back the stock clock
```

Removing disables the widget and deletes its folder from `~/.config/omarchy/plugins/`. The plugin stores nothing outside `shell.json` (its own entry, plus `centerAnchor` if you pointed it at this widget) and does not modify any other file.

## What differs from `omarchy.clock`

- Bar label and calendar use French names, capitalized ("Mercredi", "Septembre").
- Right-click format ring is 24-hour only, day-month-year order (no AM/PM, no month-first dates).
- Default formats: `dddd HH:mm` and `dd-MM-yyyy`.
- Calendar weeks start on Monday by default.
- Popup strings are translated (tooltips, "NÉ EN", "JUSQU'À", "VIE", "S" for week number).

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

Target `D3m0nZ.clock-fr`: `open`, `close`, `toggle`, `show`, `hide`, `refresh`, `cycleFormat`, `toggleWeekStart`.

Note the stock keybinding for the calendar targets `omarchy.clock`, so it does nothing once that widget is removed. Bind your own to this target if you want one.

## Dependencies

None beyond Omarchy itself (Quickshell and the shell's `qs.Ui` / `qs.Commons` modules). No extra packages and no system locale needed.

## Compatibility

`Panel.qml` imports Omarchy's internal `qs.Ui` / `qs.Commons` components, which are not a stable plugin API. It was last checked against Omarchy 4.0.4. If an update breaks the widget, diff against `/usr/share/omarchy/shell/plugins/panels/clock/` and re-apply the French changes.

## License

MIT. Derived from the Omarchy clock plugin (© David Heinemeier Hansson), used under its MIT license. See `LICENSE`.
