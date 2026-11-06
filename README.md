# oaiq-monitor

Prüft stündlich per GitHub Action das Skript
[`https://bzrcdn.openai.com/sdk/oaiq.min.js`](https://bzrcdn.openai.com/sdk/oaiq.min.js)
und committet jede Änderung. So lässt sich die Entwicklung über die Git-Historie verfolgen.

## Dateien in `data/`

| Datei | Inhalt |
|---|---|
| `strings.txt` | Alle Strings aus dem Skript, sortiert (Endpunkte, Event-Namen, Parameter, Fehlermeldungen, Versionsnummer). **Die beste Datei für den Vergleich**, weil sich hier nur echte Änderungen zeigen. |
| `oaiq.pretty.js` | Das Skript lesbar formatiert. Variablennamen ändern sich bei jedem Build, der Diff ist daher größer als die eigentliche Änderung. |
| `oaiq.min.js` | Das Original, unverändert. |
| `meta.json` | Größe, SHA256, Last-Modified und ETag vom Server. |

## Änderungen ansehen

- Verlauf von `strings.txt`: Datei öffnen, oben auf "History" klicken.
- Jeder Commit listet in der Beschreibung die neuen und entfernten Strings.
- Lokal: `git log -p data/strings.txt`

## Manuell starten

Actions, "oaiq.min.js prüfen", "Run workflow".
