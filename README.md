# DHE Connect Card

Eine saubere Lovelace Custom Card fuer
[`memphi2/ha-dhe-connect`](https://github.com/memphi2/ha-dhe-connect).

Die Card ist auf die aktuelle Integration `stiebel_dhe_connect` auf `main`
ausgelegt. Stand beim Neuaufbau: Manifest-Version `1.1.0`.

## Installation mit HACS

Dieses Repository in HACS als Custom Repository vom Typ **Dashboard** hinzufuegen
und installieren.

HACS legt die Datei physisch hier ab:

```text
/config/www/community/dhe-connect-card/dhe-connect-card.js
```

Die Dashboard-Ressource muss so lauten:

```yaml
url: /hacsfiles/dhe-connect-card/dhe-connect-card.js
type: module
```

Wenn du manuell genau in `www/community` kopierst, geht alternativ:

```yaml
url: /local/community/dhe-connect-card/dhe-connect-card.js?v=1
type: module
```

Wichtig: `/hacsfiles/...` ist eine Home-Assistant/HACS-URL, kein echter Ordner
im Dateisystem.

## GUI-Konfiguration

Nach dem Laden der Ressource im Dashboard eine neue Karte vom Typ
`DHE Connect Card` hinzufuegen.

Die Karte bringt beide Editor-Wege mit:

- `getConfigForm()` fuer den nativen Home-Assistant-Formular-Editor
- `getConfigElement()` mit eigenem Editor-Wrapper fuer HA-Versionen, die noch ein
  Editor-Element mit `setConfig()` erwarten

## YAML-Minimum

```yaml
type: custom:dhe-connect-card
entity_prefix: dhe_connect
```

Der Prefix entspricht dem Entity-Object-ID-Prefix der Integration. Bei
`sensor.dhe_connect_water_flow` ist der Prefix also `dhe_connect`.

Wenn einzelne Entities anders heissen, kannst du sie in der GUI direkt
auswaehlen. Die Card nutzt fuer automatische Zuordnung nur exakte Keys aus der
Integration und keine lockere Namenssuche.

## Erwartete Entity-Keys

Die Integration erzeugt Entity-IDs nach dem Muster:

```text
<domain>.<entity_prefix>_<key>
```

Beispiele:

```text
climate.dhe_connect_setpoint
sensor.dhe_connect_water_flow
sensor.dhe_connect_power
switch.dhe_connect_eco_mode
switch.dhe_connect_bath_fill_active
number.dhe_connect_bath_fill_target_volume
media_player.dhe_connect_radio
weather.dhe_connect_weather
```

## Entwicklung

```bash
npm run build
npm run validate
```

Das HACS-Bundle liegt danach unter:

```text
dist/dhe-connect-card.js
```
