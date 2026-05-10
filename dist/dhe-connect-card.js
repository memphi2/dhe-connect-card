const DEFAULT_MAP = {
  climate: ["climate", "target_temperature", "current_temperature", "heating_active"],
  weather: ["weather_current", "weather_icon", "weather_favorite", "weather_location"],
  radio: ["radio_station", "radio_source", "radio_favorite", "radio_playing"],
  energy: ["energy_consumption", "water_consumption", "co2_emission", "electricity_price"],
  status: ["status", "error", "last_update"],
};

class DheConnectCard extends HTMLElement {
  setConfig(config) {
    if (!config?.device_prefix) {
      throw new Error("Bitte `device_prefix` in der Karten-Konfiguration setzen, z.B. `sensor.dhe_connect_wohnzimmer`.");
    }
    this._config = {
      title: "DHE Connect",
      show_unavailable: false,
      sections: Object.keys(DEFAULT_MAP),
      entity_map: DEFAULT_MAP,
      ...config,
    };
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    return 6;
  }

  _normalizeEntityId(prefix, suffix) {
    const [domain] = prefix.split(".");
    const entityPart = prefix.slice(prefix.indexOf(".") + 1);
    return `${domain}.${entityPart}_${suffix}`;
  }

  _entityRow(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return "";

    const name = stateObj?.attributes?.friendly_name ?? entityId;
    const state = stateObj?.state ?? "nicht verfügbar";
    const unit = stateObj?.attributes?.unit_of_measurement ?? "";

    return `
      <div class="row">
        <div class="name">${name}</div>
        <div class="value">${state}${unit ? ` ${unit}` : ""}</div>
      </div>
    `;
  }

  render() {
    if (!this._config || !this._hass) return;

    const card = document.createElement("ha-card");
    card.header = this._config.title;

    const content = document.createElement("div");
    content.className = "content";

    for (const section of this._config.sections) {
      const suffixes = this._config.entity_map[section] || [];
      const rows = suffixes
        .map((suffix) => this._normalizeEntityId(this._config.device_prefix, suffix))
        .map((entityId) => this._entityRow(entityId))
        .filter(Boolean)
        .join("");

      if (!rows) continue;

      content.innerHTML += `
        <div class="section">
          <div class="section-title">${section}</div>
          ${rows}
        </div>
      `;
    }

    content.innerHTML += `
      <style>
        .content { padding: 12px; }
        .section { margin-bottom: 14px; border-bottom: 1px solid var(--divider-color); padding-bottom: 8px; }
        .section:last-child { border-bottom: 0; }
        .section-title { text-transform: uppercase; font-size: 12px; opacity: 0.75; margin-bottom: 8px; }
        .row { display: flex; justify-content: space-between; gap: 10px; margin: 4px 0; }
        .name { font-weight: 500; }
        .value { opacity: 0.9; }
      </style>
    `;

    card.innerHTML = "";
    card.appendChild(content);

    this.innerHTML = "";
    this.appendChild(card);
  }

  static getConfigElement() {
    return document.createElement("dhe-connect-card-editor");
  }

  static getStubConfig() {
    return { device_prefix: "sensor.dhe_connect" };
  }
}

customElements.define("dhe-connect-card", DheConnectCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
  description: "HACS-kompatible Lovelace Karte für ha-dhe-connect.",
});
