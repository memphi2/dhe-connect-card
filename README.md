# DHE Connect Card

Eine Lovelace Custom Card fuer die Home-Assistant-Integration
[`memphi2/ha-dhe-connect`](https://github.com/memphi2/ha-dhe-connect).

Die Karte ist fuer die aktuelle Integration `stiebel_dhe_connect` gebaut. Sie
nutzt den nativen Home-Assistant-Formular-Editor ueber `getConfigForm()` und
bringt zusaetzlich einen kompatiblen `getConfigElement()`-Wrapper fuer
Home-Assistant-Versionen mit altem Editor-Pfad mit.

## Stand der Integration

Geprueft gegen `memphi2/ha-dhe-connect` auf `main`:

- Domain: `stiebel_dhe_connect`
- Aktuelle Manifest-Version: `1.0.5`
- Wichtige Plattformen: `climate`, `sensor`, `switch`, `number`, `button`,
  `media_player`, `weather`
- Wichtige Standard-Entities: Water heating, current water flow, current power
  consumption, Eco mode, bath fill, radio und weather

## Installation zum Testen

Kopiere nur das gebaute Bundle nach Home Assistant:

```text
dist/dhe-connect-card.js
```

nach:

```text
/config/www/dhe-connect-card/dhe-connect-card.js
```

Ressource in Home Assistant:

```yaml
url: /local/dhe-connect-card/dhe-connect-card.js?v=5
type: module
```

Bei jeder neuen Kopie die Version hochzaehlen, z.B. `?v=2`.

Wenn Home Assistant trotz Cache-Buster noch den alten Editor fuer
`custom:dhe-connect-card` nutzt, ist sehr wahrscheinlich noch eine alte
Ressource frueher geladen. Zum Gegencheck gibt es den Alias:

```yaml
type: custom:dhe-connect-card-v042
```

Dieser Alias wird nur vom neuen Bundle registriert und umgeht einen bereits
alten Browser-Registry-Eintrag fuer `dhe-connect-card`.

## GUI-Konfiguration

Im Dashboard eine neue Karte vom Typ `DHE Connect Card` hinzufuegen. Die Karte
wird im visuellen Editor konfiguriert.

Die Autodiscovery sucht nach Entities der Integration `stiebel_dhe_connect`.
Wenn deine Entity-IDs anders heissen, kannst du die wichtigsten Entities direkt
in der GUI auswaehlen.

## YAML Beispiel

```yaml
type: custom:dhe-connect-card
title: DHE Connect
entity_prefix: dhe_connect
accent: aqua
enable_actions: true
auto_discover: true
show_controls: true
show_consumption: true
show_media: true
show_diagnostics: true
temperature_step: 0.5
memory_slots: 2
```

Optionale direkte Entity-Auswahl:

```yaml
type: custom:dhe-connect-card
climate_entity: climate.dhe_connect_water_heating
water_flow_entity: sensor.dhe_connect_current_water_flow
power_entity: sensor.dhe_connect_current_power_consumption
eco_mode_entity: switch.dhe_connect_eco_mode
bath_fill_entity: switch.dhe_connect_bath_fill
radio_entity: media_player.dhe_connect_radio
weather_entity: weather.dhe_connect_weather
```

## Entwicklung

```bash
npm install
npm run build
npm run validate:ha-hacs
```

Danach wieder nur `dist/dhe-connect-card.js` nach Home Assistant kopieren.
