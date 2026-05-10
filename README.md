# DHE Connect Card

HACS-kompatible Lovelace-Karte für die Integration [`memphi2/ha-dhe-connect`](https://github.com/memphi2/ha-dhe-connect).

## Features

- Optimiert für die in `ha-dhe-connect` sichtbaren Bereiche (Climate, Weather, Radio, Energy, Status).
- Konfigurierbare `sections` und `entity_map`.
- Blendet fehlende Entities standardmäßig aus (`show_unavailable: false`).

## Installation (HACS)

1. Dieses Repository als **Custom Repository** in HACS hinzufügen (Typ: `Dashboard`).
2. Karte installieren.
3. Ressource prüfen (`/hacsfiles/dhe-connect-card/dhe-connect-card.js`).
4. Home Assistant neu laden.

## Lovelace Beispiel

```yaml
type: custom:dhe-connect-card
title: DHE Connect
device_prefix: sensor.dhe_connect_wohnzimmer
sections:
  - climate
  - weather
  - radio
  - energy
  - status
show_unavailable: false
```

## Erweiterte Konfiguration

```yaml
type: custom:dhe-connect-card
device_prefix: sensor.dhe_connect_wohnzimmer
entity_map:
  climate: ["climate", "target_temperature", "current_temperature", "heating_active"]
  weather: ["weather_current", "weather_favorite", "weather_location"]
  radio: ["radio_station", "radio_playing", "radio_source"]
  energy: ["energy_consumption", "water_consumption", "co2_emission", "electricity_price"]
  status: ["status", "error", "last_update"]
```

## Build

```bash
npm install
npm run build
```
