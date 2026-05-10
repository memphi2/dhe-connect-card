<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
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
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
class DheConnectCard extends HTMLElement {
  setConfig(config) {
    this._config = {
      title: "DHE Connect",
      device_prefix: "sensor.dhe_connect",
      show_unavailable: false,
      ...config,
    };
    this.render();
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  getCardSize() {
    return 6;
  }

  _normalizeEntityId(prefix, suffix) {
    const [domain] = prefix.split(".");
    const entityPart = prefix.slice(prefix.indexOf(".") + 1);
    return `${domain}.${entityPart}_${suffix}`;
  }

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  _entityRow(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return "";
=======
  _entityData(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return null;
>>>>>>> theirs
=======
  _entityData(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return null;
>>>>>>> theirs
=======
  _entityData(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return null;
>>>>>>> theirs
=======
  _entityData(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return null;
>>>>>>> theirs
=======
  _entityData(entityId) {
    const stateObj = this._hass.states[entityId];
    if (!stateObj && !this._config.show_unavailable) return null;
>>>>>>> theirs

    const name = stateObj?.attributes?.friendly_name ?? entityId;
    const state = stateObj?.state ?? "nicht verfügbar";
    const unit = stateObj?.attributes?.unit_of_measurement ?? "";

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    return `
      <div class="row">
        <div class="name">${name}</div>
        <div class="value">${state}${unit ? ` ${unit}` : ""}</div>
      </div>
    `;
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
    return { name, state, unit };
  }

  _createStyleElement() {
    const style = document.createElement("style");
    style.textContent = `
      .content { padding: 12px; }
      .section { margin-bottom: 14px; border-bottom: 1px solid var(--divider-color); padding-bottom: 8px; }
      .section:last-child { border-bottom: 0; }
      .section-title { text-transform: uppercase; font-size: 12px; opacity: 0.75; margin-bottom: 8px; }
      .row { display: flex; justify-content: space-between; gap: 10px; margin: 4px 0; }
      .name { font-weight: 500; }
      .value { opacity: 0.9; }
    `;
    return style;
  }

  _createRowElement(entityData) {
    const row = document.createElement("div");
    row.className = "row";

    const nameEl = document.createElement("div");
    nameEl.className = "name";
    nameEl.textContent = entityData.name;

    const valueEl = document.createElement("div");
    valueEl.className = "value";
    valueEl.textContent = `${entityData.state}${entityData.unit ? ` ${entityData.unit}` : ""}`;

    row.append(nameEl, valueEl);
    return row;
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  }

  render() {
    if (!this._config || !this._hass) return;

    const card = document.createElement("ha-card");
    card.header = this._config.title;

    const content = document.createElement("div");
    content.className = "content";

    for (const section of this._config.sections) {
      const suffixes = this._config.entity_map[section] || [];
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
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
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
      const entityIds = suffixes.map((suffix) => this._normalizeEntityId(this._config.device_prefix, suffix));
      const entityDataList = entityIds.map((entityId) => this._entityData(entityId)).filter(Boolean);

      if (!entityDataList.length) continue;

      const sectionEl = document.createElement("div");
      sectionEl.className = "section";

      const sectionTitle = document.createElement("div");
      sectionTitle.className = "section-title";
      sectionTitle.textContent = section;

      sectionEl.appendChild(sectionTitle);
      entityDataList.forEach((entityData) => sectionEl.appendChild(this._createRowElement(entityData)));

      content.appendChild(sectionEl);
    }

    content.appendChild(this._createStyleElement());
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
    card.appendChild(content);

    this.innerHTML = "";
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  render() {
    if (!this._config) return;
    this.innerHTML = "";
    const card = document.createElement("ha-card");
    card.header = this._config.title;
<<<<<<< ours
    const content = document.createElement("div");
    content.style.padding = "12px";
    const p = document.createElement("p");
    p.textContent = `Device Prefix: ${this._config.device_prefix}`;
    content.appendChild(p);
    card.appendChild(content);
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======

    const content = document.createElement("div");
    content.style.padding = "12px";

    const info = document.createElement("div");
    info.textContent = `Device Prefix: ${this._config.device_prefix}`;
    content.appendChild(info);

    card.appendChild(content);
>>>>>>> theirs
    this.appendChild(card);
  }

  static getConfigElement() {
    return document.createElement("dhe-connect-card-editor");
  }
<<<<<<< ours

  static getStubConfig() {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    return { device_prefix: "sensor.dhe_connect" };
  }
}

customElements.define("dhe-connect-card", DheConnectCard);

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
=======
>>>>>>> theirs

class DheConnectCardEditor extends HTMLElement {}
customElements.define("dhe-connect-card-editor", DheConnectCardEditor);

<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs

=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
    return { type: "custom:dhe-connect-card", device_prefix: "sensor.dhe_connect" };
  }
}

<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
}

>>>>>>> theirs
class DheConnectCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = {
      title: "DHE Connect",
      device_prefix: "sensor.dhe_connect",
      show_unavailable: false,
      ...config,
    };
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  _onInputChange(ev) {
    const target = ev.target;
    const key = target?.dataset?.key;
    if (!key) return;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const newConfig = { ...this._config, [key]: value };
    this._config = newConfig;

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: newConfig },
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
    this.render();
  }

  _updateValue(key, value) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
    this._render();
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
>>>>>>> theirs
      bubbles: true,
      composed: true,
    }));
  }

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  _render() {
    if (!this._config) return;

    this.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "editor";

    const title = document.createElement("h3");
    title.textContent = "DHE Connect Karte";

    const subtitle = document.createElement("p");
    subtitle.textContent = "Passe Titel, Geräte-Präfix und Sichtbarkeit nicht verfügbarer Entities an.";

    const createField = (labelText, key, value, type = "text") => {
      const field = document.createElement("label");
      field.className = "field";

      const label = document.createElement("span");
      label.textContent = labelText;

      const input = document.createElement("input");
      input.type = type;
      input.dataset.key = key;
      if (type === "checkbox") {
        input.checked = Boolean(value);
      } else {
        input.value = value ?? "";
      }
      input.addEventListener("change", (ev) => this._onInputChange(ev));

      field.append(label, input);
      return field;
    };

    wrapper.append(
      title,
      subtitle,
      createField("Titel", "title", this._config.title),
      createField("Device Prefix", "device_prefix", this._config.device_prefix),
      createField("Nicht verfügbare Entities anzeigen", "show_unavailable", this._config.show_unavailable, "checkbox"),
    );

    const style = document.createElement("style");
    style.textContent = `
      .editor {
        display: grid;
        gap: 12px;
        padding: 12px 0;
      }
      h3 {
        margin: 0;
        font-size: 18px;
      }
      p {
        margin: 0;
        opacity: 0.8;
      }
      .field {
        display: grid;
        gap: 6px;
      }
      .field span {
        font-size: 13px;
        opacity: 0.9;
      }
      input[type="text"] {
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }
      input[type="checkbox"] {
        width: 18px;
        height: 18px;
      }
    `;

    this.append(wrapper, style);
  }
}

<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  render() {
    if (!this._config) return;
    this.innerHTML = "";
    const root = document.createElement("div");
    root.innerHTML = `
      <style>
        .editor{display:grid;gap:12px;padding:8px 0}
        .field{display:grid;gap:6px}
        .field input[type=text]{padding:10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}
      </style>
      <div class="editor">
        <div class="field"><label>Titel</label><input id="title" type="text"></div>
        <div class="field"><label>Device Prefix</label><input id="device_prefix" type="text"></div>
        <div class="field"><label><input id="show_unavailable" type="checkbox"> Nicht verfügbare Entitäten anzeigen</label></div>
      </div>
    `;

    const title = root.querySelector("#title");
    const prefix = root.querySelector("#device_prefix");
    const show = root.querySelector("#show_unavailable");

    title.value = this._config.title || "";
    prefix.value = this._config.device_prefix || "";
    show.checked = Boolean(this._config.show_unavailable);

    title.addEventListener("change", (e) => this._updateValue("title", e.target.value));
    prefix.addEventListener("change", (e) => this._updateValue("device_prefix", e.target.value));
    show.addEventListener("change", (e) => this._updateValue("show_unavailable", e.target.checked));

    this.appendChild(root);
=======
  _render() {
    this.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <style>
        .editor{display:grid;gap:12px;padding:8px 0}
        .field{display:grid;gap:6px}
      </style>
      <div class="editor">
        <div class="field"><label>Titel</label><input id="title" type="text"></div>
        <div class="field"><label>Device Prefix</label><input id="prefix" type="text"></div>
        <div class="field"><label><input id="show" type="checkbox"> Nicht verfügbare Entities anzeigen</label></div>
      </div>
    `;

    const title = wrapper.querySelector('#title');
    const prefix = wrapper.querySelector('#prefix');
    const show = wrapper.querySelector('#show');

    title.value = this._config.title || '';
    prefix.value = this._config.device_prefix || '';
    show.checked = Boolean(this._config.show_unavailable);

    title.addEventListener('change', (e) => { this._config.title = e.target.value; this._emit(); });
    prefix.addEventListener('change', (e) => { this._config.device_prefix = e.target.value; this._emit(); });
    show.addEventListener('change', (e) => { this._config.show_unavailable = e.target.checked; this._emit(); });

    this.appendChild(wrapper);
>>>>>>> theirs
  }
}

customElements.define("dhe-connect-card", DheConnectCard);
customElements.define("dhe-connect-card-editor", DheConnectCardEditor);

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
window.customCards = window.customCards || [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  description: "HACS-kompatible Lovelace Karte für ha-dhe-connect.",
=======
  description: "Initiale GUI-Konfiguration für die DHE Connect Karte",
>>>>>>> theirs
=======
  description: "Initiale GUI-Konfiguration für die DHE Connect Karte",
>>>>>>> theirs
=======
  description: "Initiale GUI-Konfiguration für die DHE Connect Karte",
>>>>>>> theirs
=======
  description: "DHE Connect Karte mit visueller Konfiguration",
>>>>>>> theirs
});
