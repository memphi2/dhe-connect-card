class DheConnectCard extends HTMLElement {
  setConfig(config) {
    this._config = {
      title: "DHE Connect",
      device_prefix: "sensor.dhe_connect",
      show_unavailable: false,
      ...config,
    };
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this._config) return;
    this.innerHTML = "";
    const card = document.createElement("ha-card");
    card.header = this._config.title;
    const content = document.createElement("div");
    content.style.padding = "12px";
    const p = document.createElement("p");
    p.textContent = `Device Prefix: ${this._config.device_prefix}`;
    content.appendChild(p);
    card.appendChild(content);
    this.appendChild(card);
  }

  static getConfigElement() {
    return document.createElement("dhe-connect-card-editor");
  }

  static getStubConfig() {
    return { type: "custom:dhe-connect-card", device_prefix: "sensor.dhe_connect" };
  }
}

class DheConnectCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = {
      title: "DHE Connect",
      device_prefix: "sensor.dhe_connect",
      show_unavailable: false,
      ...config,
    };
    this.render();
  }

  _updateValue(key, value) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }

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
  }
}

customElements.define("dhe-connect-card", DheConnectCard);
customElements.define("dhe-connect-card-editor", DheConnectCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
  description: "Initiale GUI-Konfiguration für die DHE Connect Karte",
});
