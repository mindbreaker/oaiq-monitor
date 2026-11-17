# Changelog oaiq.min.js

Was sich in den einzelnen Versionen von `oaiq.min.js` geändert hat. Die Einträge
werden nicht automatisch geschrieben, sondern bei Bedarf aus dem Code-Vergleich
nachgetragen. Die rohen Daten (neue und entfernte Strings) stehen in jeder
Commit-Message der Action.

## 0.1.105 (14.11.2026)

117.944 auf 118.496 Bytes, Commit `34e410a`

- **Neues Standard-Event `page_viewed`**, in der Gruppe "contents" (wie
  `contents_viewed` oder `order_created`).
- **Keine Doppelzählung bei Android.** Kommt die Seite direkt aus der ChatGPT-App
  (Referrer `android-app://com.openai.chatgpt/`) und steht die Verbindung zur App
  in den ersten 4 Sekunden noch nicht, wird ein `page_viewed` ohne Klick-ID nicht
  sofort per Netzwerk gesendet. Offenbar soll die App das Event übernehmen,
  sobald die Verbindung steht.
- Läuft die App-Verbindung, werden reine Diagnose-Events beim Senden herausgefiltert.

## 0.1.104 (12.11.2026)

117.778 auf 117.944 Bytes, Commit `bcd107f`

Keine neuen Strings, aber die Logik für die Klick-ID (`oppref`) ist neu sortiert:

- Neues Feld `nativeClickId`: Klick-ID, die die App direkt liefert. Sie wird
  getrennt von der Klick-ID aus URL und Cookie geführt.
- Neue Rangfolge: explizit gesetzte ID, dann URL-Parameter, dann ID aus der App,
  zuletzt Cookie.
- Steht schon eine Klick-ID in der URL, fragt das Skript die App gar nicht erst.
- Ein im Code fest gesetzter Wert überschreibt den Cookie nicht mehr.

## 0.1.103 (11.11.2026)

114.758 auf 117.778 Bytes, Commit `db7e03c`

**Neue Verbindung zur ChatGPT-Android-App.** Auf iOS gab es das schon
(`webkit.messageHandlers.openaiConversionEvent`), jetzt kann auch der
Android-WebView Conversions direkt annehmen:

- Das Skript wartet auf eine Nachricht vom Absender `android-app://chatgpt.com`.
- Seite und App stimmen sich in mehreren Schritten ab (`hello`, `hello_ack`,
  `bound`). Die Seite schickt dabei User-Agent, Ladezeitpunkt und URL ohne
  Query-Parameter mit.
- Conversions gehen mit Pixel-ID, SDK-Version und Event-Daten an die App
  (`conversion`). Die App bestätigt mit `accepted` und der Zahl angenommener
  Events. Ohne Antwort nach 2 Sekunden gilt das als Fehlschlag. Höchstens 4
  Anfragen sind gleichzeitig offen.
- Zieht der Nutzer seine Einwilligung zurück, bekommt die App `consent_revoked`
  und die Verbindung wird geschlossen.

Reihenfolge beim Senden: zuerst iOS-Verbindung, dann Android-Verbindung, sonst
der normale Weg per Netzwerk.

## 0.1.100 (03.11.2026)

114.758 Bytes, Commit `bc41be6`

Erster erfasster Stand, Ausgangspunkt für alle Vergleiche.
