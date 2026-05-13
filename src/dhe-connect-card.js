const CARD_VERSION = "1.0.0";
const CARD_TYPE = "dhe-connect-card";
const EDITOR_TYPE = "dhe-connect-card-config-editor";
const INTEGRATION_DOMAIN = "stiebel_dhe_connect";

const DEFAULT_CONFIG = {
  title: "DHE Connect",
  entity_prefix: "dhe_connect",
  accent: "aqua",
  compact: false,
  enable_actions: true,
  show_controls: true,
  show_consumption: true,
  show_media: true,
  show_diagnostics: false,
  temperature_step: 0.5,
};

const CLIMATE_SUFFIXES = ["setpoint", "water_heating", "wasser_heating", "wassererwarmung"];

const ACCENTS = {
  aqua: { label: "Aqua", color: "#00a6b4", soft: "rgba(0, 166, 180, 0.15)" },
  blue: { label: "Blau", color: "#3f7ee8", soft: "rgba(63, 126, 232, 0.14)" },
  green: { label: "Gruen", color: "#2f9d61", soft: "rgba(47, 157, 97, 0.14)" },
  amber: { label: "Amber", color: "#d18400", soft: "rgba(209, 132, 0, 0.16)" },
  graphite: { label: "Graphit", color: "#74808c", soft: "rgba(116, 128, 140, 0.16)" },
};

const ENTITY_DEFS = {
  climate: {
    domain: "climate",
    keys: CLIMATE_SUFFIXES,
    config: "climate_entity",
    label: "Temperatur",
    icon: "mdi:water-thermometer",
  },
  water_flow: {
    domain: "sensor",
    keys: ["water_flow"],
    config: "water_flow_entity",
    label: "Durchfluss",
    icon: "mdi:waves-arrow-right",
  },
  power: {
    domain: "sensor",
    keys: ["power"],
    config: "power_entity",
    label: "Leistung",
    icon: "mdi:flash",
  },
  inlet_temperature: {
    domain: "sensor",
    keys: ["inlet_temperature"],
    config: "inlet_temperature_entity",
    label: "Zulauf",
    icon: "mdi:thermometer-chevron-down",
  },
  outlet_temperature: {
    domain: "sensor",
    keys: ["outlet_temperature"],
    config: "outlet_temperature_entity",
    label: "Auslauf",
    icon: "mdi:thermometer-chevron-up",
  },
  connection_state: {
    domain: "sensor",
    keys: ["connection_state"],
    config: "connection_state_entity",
    label: "Verbindung",
    icon: "mdi:lan-connect",
  },
  error_status: {
    domain: "sensor",
    keys: ["error_status"],
    config: "error_status_entity",
    label: "Fehler",
    icon: "mdi:alert-octagon-outline",
  },
  device_status: {
    domain: "sensor",
    keys: ["device_status"],
    config: "device_status_entity",
    label: "Status",
    icon: "mdi:wrench",
  },
  eco_mode: {
    domain: "switch",
    keys: ["eco_mode"],
    config: "eco_mode_entity",
    label: "Eco",
    icon: "mdi:leaf",
    action: "toggle",
  },
  bath_fill_active: {
    domain: "switch",
    keys: ["bath_fill_active"],
    config: "bath_fill_entity",
    label: "Wanne",
    icon: "mdi:bathtub",
    action: "toggle",
  },
  child_safety_active: {
    domain: "switch",
    keys: ["child_safety_active"],
    config: "child_safety_entity",
    label: "Kindersich.",
    icon: "mdi:thermometer-check",
    action: "toggle",
  },
  scald_protection_active: {
    domain: "binary_sensor",
    keys: ["scald_protection_active"],
    config: "scald_protection_entity",
    label: "Verbruehschutz",
    icon: "mdi:shield-thermometer",
  },
  bath_fill_target_volume: {
    domain: "number",
    keys: ["bath_fill_target_volume"],
    config: "bath_fill_target_volume_entity",
    label: "Wannenfuellmenge",
    icon: "mdi:bathtub-outline",
  },
  bath_fill_remaining_volume: {
    domain: "sensor",
    keys: ["bath_fill_remaining_volume"],
    config: "bath_fill_remaining_entity",
    label: "Wanne Rest",
    icon: "mdi:bathtub",
  },
  bath_fill_current_volume: {
    domain: "sensor",
    keys: ["bath_fill_current_volume"],
    config: "bath_fill_current_entity",
    label: "Wanne aktuell",
    icon: "mdi:bathtub",
  },
  child_safety_temperature_limit: {
    domain: "number",
    keys: ["child_safety_temperature_limit"],
    config: "child_safety_temperature_entity",
    label: "Kindersich. Temp.",
    icon: "mdi:thermometer-high",
  },
  eco_flow_limit: {
    domain: "number",
    keys: ["eco_flow_limit"],
    config: "eco_flow_limit_entity",
    label: "Eco-Limit",
    icon: "mdi:water-pump",
  },
  brush_timer_active: {
    domain: "switch",
    keys: ["brush_timer_active"],
    config: "brush_timer_entity",
    label: "Zahnputzen",
    icon: "mdi:toothbrush",
    action: "toggle",
  },
  shower_timer_active: {
    domain: "switch",
    keys: ["shower_timer_active"],
    config: "shower_timer_entity",
    label: "Dusche",
    icon: "mdi:shower-head",
    action: "toggle",
  },
  brush_timer_duration: {
    domain: "number",
    keys: ["brush_timer_duration"],
    config: "brush_timer_duration_entity",
    label: "Zahnputz-Dauer",
    icon: "mdi:timer-edit",
  },
  shower_timer_duration: {
    domain: "number",
    keys: ["shower_timer_duration"],
    config: "shower_timer_duration_entity",
    label: "Dusch-Dauer",
    icon: "mdi:timer-edit",
  },
  brush_timer_remaining: {
    domain: "sensor",
    keys: ["brush_timer_remaining"],
    config: "brush_timer_remaining_entity",
    label: "Zahnputz-Rest",
    icon: "mdi:timer-sand",
  },
  shower_timer_remaining: {
    domain: "sensor",
    keys: ["shower_timer_remaining"],
    config: "shower_timer_remaining_entity",
    label: "Dusch-Rest",
    icon: "mdi:timer-sand",
  },
  wellness_cold_prevention: {
    domain: "switch",
    keys: ["wellness_cold_prevention"],
    config: "wellness_cold_entity",
    label: "Erkaeltung",
    icon: "mdi:shower",
    action: "toggle",
  },
  wellness_winter_refresh: {
    domain: "switch",
    keys: ["wellness_winter_refresh"],
    config: "wellness_winter_entity",
    label: "Winter",
    icon: "mdi:snowflake-thermometer",
    action: "toggle",
  },
  wellness_summer_fitness: {
    domain: "switch",
    keys: ["wellness_summer_fitness"],
    config: "wellness_summer_entity",
    label: "Sommer",
    icon: "mdi:weather-sunny",
    action: "toggle",
  },
  wellness_circulation_support: {
    domain: "switch",
    keys: ["wellness_circulation_support"],
    config: "wellness_circulation_entity",
    label: "Kreislauf",
    icon: "mdi:heart-pulse",
    action: "toggle",
  },
  water_consumption_week: {
    domain: "sensor",
    keys: ["water_consumption_week"],
    config: "water_consumption_week_entity",
    label: "Wasser Woche",
    icon: "mdi:water",
  },
  water_consumption_year: {
    domain: "sensor",
    keys: ["water_consumption_year"],
    config: "water_consumption_year_entity",
    label: "Wasser Jahr",
    icon: "mdi:water",
  },
  water_consumption_total: {
    domain: "sensor",
    keys: ["water_consumption_total"],
    config: "water_consumption_total_entity",
    label: "Wasser gesamt",
    icon: "mdi:water",
  },
  energy_consumption_week: {
    domain: "sensor",
    keys: ["energy_consumption_week"],
    config: "energy_consumption_week_entity",
    label: "Energie Woche",
    icon: "mdi:lightning-bolt",
  },
  energy_consumption_year: {
    domain: "sensor",
    keys: ["energy_consumption_year"],
    config: "energy_consumption_year_entity",
    label: "Energie Jahr",
    icon: "mdi:lightning-bolt",
  },
  energy_consumption_total: {
    domain: "sensor",
    keys: ["energy_consumption_total"],
    config: "energy_consumption_total_entity",
    label: "Energie gesamt",
    icon: "mdi:lightning-bolt",
  },
  last_usage_water: {
    domain: "sensor",
    keys: ["last_usage_water"],
    config: "last_usage_water_entity",
    label: "Letztes Wasser",
    icon: "mdi:water-check",
  },
  last_usage_energy: {
    domain: "sensor",
    keys: ["last_usage_energy"],
    config: "last_usage_energy_entity",
    label: "Letzte Energie",
    icon: "mdi:lightning-bolt",
  },
  last_usage_time: {
    domain: "sensor",
    keys: ["last_usage_time"],
    config: "last_usage_time_entity",
    label: "Letzte Dauer",
    icon: "mdi:timer-outline",
  },
  last_usage_cost: {
    domain: "sensor",
    keys: ["last_usage_cost"],
    config: "last_usage_cost_entity",
    label: "Letzte Kosten",
    icon: "mdi:cash",
  },
  reconnect_count: {
    domain: "sensor",
    keys: ["reconnect_count"],
    config: "reconnect_count_entity",
    label: "Reconnects",
    icon: "mdi:restart",
  },
  last_reconnect_reason: {
    domain: "sensor",
    keys: ["last_reconnect_reason"],
    config: "last_reconnect_reason_entity",
    label: "Reconnect-Grund",
    icon: "mdi:alert-circle-outline",
  },
  device_info: {
    domain: "sensor",
    keys: ["device_info"],
    config: "device_info_entity",
    label: "Geraeteinfo",
    icon: "mdi:information-outline",
  },
  radio: {
    domain: "media_player",
    keys: ["radio"],
    config: "radio_entity",
    label: "Radio",
    icon: "mdi:radio",
  },
  weather: {
    domain: "weather",
    keys: ["weather"],
    config: "weather_entity",
    label: "Wetter",
    icon: "mdi:weather-partly-cloudy",
  },
};

const MAIN_ENTITIES = [
  "water_flow",
  "power",
  "inlet_temperature",
  "outlet_temperature",
];

const CONTROL_ENTITIES = [
  "eco_mode",
  "bath_fill_active",
  "child_safety_active",
  "scald_protection_active",
  "bath_fill_target_volume",
  "bath_fill_remaining_volume",
  "bath_fill_current_volume",
  "child_safety_temperature_limit",
  "eco_flow_limit",
  "brush_timer_active",
  "shower_timer_active",
  "brush_timer_duration",
  "shower_timer_duration",
  "brush_timer_remaining",
  "shower_timer_remaining",
  "wellness_cold_prevention",
  "wellness_winter_refresh",
  "wellness_summer_fitness",
  "wellness_circulation_support",
];

const CONSUMPTION_ENTITIES = [
  "water_consumption_week",
  "water_consumption_year",
  "water_consumption_total",
  "energy_consumption_week",
  "energy_consumption_year",
  "energy_consumption_total",
  "last_usage_water",
  "last_usage_energy",
  "last_usage_time",
  "last_usage_cost",
];

const DIAGNOSTIC_ENTITIES = [
  "connection_state",
  "error_status",
  "device_status",
  "reconnect_count",
  "last_reconnect_reason",
  "device_info",
];

const FIELD_LABELS = {
  title: "Titel",
  entity_prefix: "Entity-Prefix",
  accent: "Akzent",
  compact: "Kompakt",
  enable_actions: "Aktionen erlauben",
  show_controls: "Steuerung anzeigen",
  show_consumption: "Verbrauch anzeigen",
  show_media: "Radio/Wetter anzeigen",
  show_diagnostics: "Diagnose anzeigen",
  temperature_step: "Temperaturschritt",
};

for (const def of Object.values(ENTITY_DEFS)) {
  FIELD_LABELS[def.config] = def.label;
}

const FIELD_HELPERS = {
  entity_prefix: "Beispiel: dhe_connect fuer sensor.dhe_connect_water_flow.",
  enable_actions: "Aktiviert Temperatur +/- und Switch-Toggles in der Karte.",
};

const html = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const numberValue = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalize = (value) => String(value ?? "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9_]+/g, "_")
  .replace(/_+/g, "_")
  .replace(/^_|_$/g, "");

const stripDomain = (value) => String(value ?? "").replace(/^[a-z_]+\./, "");

const normalizePrefix = (value) => {
  let prefix = normalize(stripDomain(value || DEFAULT_CONFIG.entity_prefix));
  for (const suffix of CLIMATE_SUFFIXES) {
    const token = `_${suffix}`;
    if (prefix.endsWith(token)) prefix = prefix.slice(0, -token.length);
  }
  return prefix || DEFAULT_CONFIG.entity_prefix;
};

const isUnavailable = (stateObj) => !stateObj || ["unavailable", "unknown", ""].includes(String(stateObj.state ?? ""));

const entitySelector = (name, domain) => ({
  name,
  selector: {
    entity: {
      filter: [{ integration: INTEGRATION_DOMAIN, domain }],
    },
  },
});

const toggleSchema = (name) => ({ name, selector: { boolean: {} } });

const textSchema = (name) => ({ name, selector: { text: {} } });

const configForm = () => ({
  schema: [
    textSchema("title"),
    textSchema("entity_prefix"),
    {
      name: "accent",
      selector: {
        select: {
          mode: "dropdown",
          options: Object.entries(ACCENTS).map(([value, item]) => ({ value, label: item.label })),
        },
      },
    },
    {
      name: "temperature_step",
      selector: { number: { min: 0.5, max: 5, step: 0.5, mode: "box", unit_of_measurement: "C" } },
    },
    toggleSchema("compact"),
    toggleSchema("enable_actions"),
    toggleSchema("show_controls"),
    toggleSchema("show_consumption"),
    toggleSchema("show_media"),
    toggleSchema("show_diagnostics"),
    entitySelector("climate_entity", "climate"),
    entitySelector("water_flow_entity", "sensor"),
    entitySelector("power_entity", "sensor"),
    entitySelector("inlet_temperature_entity", "sensor"),
    entitySelector("outlet_temperature_entity", "sensor"),
    entitySelector("connection_state_entity", "sensor"),
    entitySelector("error_status_entity", "sensor"),
    entitySelector("device_status_entity", "sensor"),
    entitySelector("eco_mode_entity", "switch"),
    entitySelector("bath_fill_entity", "switch"),
    entitySelector("child_safety_entity", "switch"),
    entitySelector("scald_protection_entity", "binary_sensor"),
    entitySelector("bath_fill_target_volume_entity", "number"),
    entitySelector("bath_fill_remaining_entity", "sensor"),
    entitySelector("child_safety_temperature_entity", "number"),
    entitySelector("eco_flow_limit_entity", "number"),
    entitySelector("radio_entity", "media_player"),
    entitySelector("weather_entity", "weather"),
  ],
  computeLabel: (schema) => FIELD_LABELS[schema.name] || schema.name,
  computeHelper: (schema) => FIELD_HELPERS[schema.name],
});

const migrateConfig = (config) => {
  const next = { ...(config || {}) };
  if (!next.entity_prefix && next.device_prefix) next.entity_prefix = next.device_prefix;
  delete next.device_prefix;
  next.entity_prefix = normalizePrefix(next.entity_prefix);
  return next;
};

class DheConnectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    this._config = {
      ...DEFAULT_CONFIG,
      ...migrateConfig(config),
    };
    if (!ACCENTS[this._config.accent]) this._config.accent = DEFAULT_CONFIG.accent;
    this._config.temperature_step = numberValue(this._config.temperature_step) || DEFAULT_CONFIG.temperature_step;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return this._config?.compact ? 4 : 7;
  }

  getGridOptions() {
    return {
      columns: this._config?.compact ? 6 : 9,
      rows: this._config?.compact ? 4 : 7,
      min_columns: 3,
      min_rows: 3,
    };
  }

  static getStubConfig(hass) {
    return {
      title: DEFAULT_CONFIG.title,
      entity_prefix: findPrefixFromHass(hass),
      accent: DEFAULT_CONFIG.accent,
      enable_actions: true,
      show_controls: true,
      show_consumption: true,
      show_media: true,
      show_diagnostics: false,
      temperature_step: 0.5,
    };
  }

  static getConfigForm() {
    return configForm();
  }

  static getConfigElement() {
    return document.createElement(EDITOR_TYPE);
  }

  _render() {
    if (!this.shadowRoot || !this._config) return;
    const accent = ACCENTS[this._config.accent] || ACCENTS.aqua;
    const className = this._config.compact ? "compact" : "";

    this.shadowRoot.innerHTML = `
      ${this._styles(accent)}
      <ha-card class="${className}">
        ${this._renderHero()}
        <div class="body">
          ${this._config.show_controls ? this._renderControls() : ""}
          ${this._config.show_consumption ? this._renderSection("Verbrauch", "mdi:chart-line", CONSUMPTION_ENTITIES) : ""}
          ${this._config.show_media ? this._renderMedia() : ""}
          ${this._config.show_diagnostics ? this._renderSection("Diagnose", "mdi:stethoscope", DIAGNOSTIC_ENTITIES) : ""}
        </div>
      </ha-card>
    `;
    this._bindEvents();
  }

  _renderHero() {
    const climate = this._entity("climate");
    const outlet = this._entity("outlet_temperature");
    const connection = this._entity("connection_state");
    const target = numberValue(climate.stateObj?.attributes?.temperature);
    const current = numberValue(climate.stateObj?.attributes?.current_temperature) ?? numberValue(outlet.stateObj?.state);
    const status = connection.stateObj?.state || (climate.stateObj ? "bereit" : "nicht verbunden");

    return `
      <section class="hero">
        <div class="hero-top">
          <button class="title" data-more-info="${html(climate.id)}" ${climate.id ? "" : "disabled"}>
            <span>STIEBEL ELTRON</span>
            <strong>${html(this._config.title)}</strong>
          </button>
          <button class="status" data-more-info="${html(connection.id || climate.id)}" ${connection.id || climate.id ? "" : "disabled"}>
            <span></span>${html(status)}
          </button>
        </div>
        <div class="temperature">
          <div class="target">
            <ha-icon icon="mdi:water-thermometer"></ha-icon>
            <strong>${target === null ? "--" : `${formatNumber(target)} C`}</strong>
            <small>Solltemperatur</small>
          </div>
          <button class="current" data-more-info="${html(outlet.id || climate.id)}" ${outlet.id || climate.id ? "" : "disabled"}>
            <span>Aktuell</span>
            <strong>${current === null ? "--" : `${formatNumber(current)} C`}</strong>
          </button>
        </div>
        ${this._renderTemperatureActions(climate)}
        <div class="chips">
          ${MAIN_ENTITIES.map((key) => this._renderChip(key)).join("")}
        </div>
      </section>
    `;
  }

  _renderTemperatureActions(climate) {
    if (!this._config.enable_actions || !climate.id || !climate.stateObj) return "";
    return `
      <div class="actions">
        <button class="icon action" data-temp-delta="${-this._config.temperature_step}" data-entity="${html(climate.id)}">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <button class="icon action" data-temp-delta="${this._config.temperature_step}" data-entity="${html(climate.id)}">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button class="icon" data-more-info="${html(climate.id)}">
          <ha-icon icon="mdi:dots-horizontal"></ha-icon>
        </button>
      </div>
    `;
  }

  _renderControls() {
    return this._renderSection("Steuerung", "mdi:tune-variant", CONTROL_ENTITIES);
  }

  _renderMedia() {
    return this._renderSection("Radio und Wetter", "mdi:radio-tower", ["radio", "weather"]);
  }

  _renderSection(title, icon, keys) {
    const cards = keys.map((key) => this._renderTile(key)).filter(Boolean).join("");
    if (!cards) return "";
    return `
      <section class="section">
        <div class="section-title"><ha-icon icon="${html(icon)}"></ha-icon><span>${html(title)}</span></div>
        <div class="tiles">${cards}</div>
      </section>
    `;
  }

  _renderChip(key) {
    const entity = this._entity(key);
    if (!this._visible(entity)) return "";
    const def = ENTITY_DEFS[key];
    return `
      <button class="chip" data-more-info="${html(entity.id)}">
        <ha-icon icon="${html(def.icon)}"></ha-icon>
        <span>${html(def.label)}</span>
        <strong>${html(this._stateText(entity))}</strong>
      </button>
    `;
  }

  _renderTile(key) {
    const entity = this._entity(key);
    if (!this._visible(entity)) return "";
    const def = ENTITY_DEFS[key];
    const on = ["on", "heat", "connected"].includes(String(entity.stateObj?.state).toLowerCase());
    const actionAttr = this._config.enable_actions && def.action === "toggle"
      ? `data-toggle="${html(entity.id)}"`
      : `data-more-info="${html(entity.id)}"`;
    return `
      <button class="tile ${on ? "on" : ""}" ${actionAttr}>
        <ha-icon icon="${html(def.icon)}"></ha-icon>
        <span>${html(def.label)}</span>
        <strong>${html(this._stateText(entity))}</strong>
      </button>
    `;
  }

  _bindEvents() {
    this.shadowRoot.querySelectorAll("[data-more-info]").forEach((button) => {
      button.addEventListener("click", () => {
        const entityId = button.dataset.moreInfo;
        if (entityId) this._moreInfo(entityId);
      });
    });

    this.shadowRoot.querySelectorAll("[data-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const entityId = button.dataset.toggle;
        if (entityId) this._call("homeassistant", "toggle", { entity_id: entityId });
      });
    });

    this.shadowRoot.querySelectorAll("[data-temp-delta]").forEach((button) => {
      button.addEventListener("click", () => {
        this._changeTemperature(button.dataset.entity, numberValue(button.dataset.tempDelta));
      });
    });
  }

  _entity(key) {
    const def = ENTITY_DEFS[key];
    if (!def) return emptyEntity();

    const override = this._config[def.config];
    if (typeof override === "string" && override.includes(".")) {
      return this._makeEntity(override, def);
    }

    for (const candidate of this._candidateIds(def)) {
      if (this._hass?.states?.[candidate]) return this._makeEntity(candidate, def);
    }

    const fallback = this._safeSuffixMatch(def);
    if (fallback) return this._makeEntity(fallback, def);
    return emptyEntity(def);
  }

  _candidateIds(def) {
    const prefix = this._prefix();
    return def.keys.map((key) => `${def.domain}.${prefix}_${key}`);
  }

  _safeSuffixMatch(def) {
    if (!this._hass?.states) return null;
    const prefix = this._prefix();
    const wanted = new Set(def.keys.map((key) => `${prefix}_${key}`));
    const matches = Object.keys(this._hass.states).filter((entityId) => {
      if (!entityId.startsWith(`${def.domain}.`)) return false;
      const objectId = entityId.slice(def.domain.length + 1);
      if (!wanted.has(objectId)) return false;
      const registry = this._hass.entities?.[entityId];
      return !registry || registry.platform === INTEGRATION_DOMAIN;
    });
    return matches.length === 1 ? matches[0] : null;
  }

  _makeEntity(entityId, def) {
    const stateObj = this._hass?.states?.[entityId];
    return {
      id: entityId,
      stateObj,
      available: !isUnavailable(stateObj),
      definition: def,
    };
  }

  _prefix() {
    return normalizePrefix(this._config.entity_prefix);
  }

  _visible(entity) {
    return Boolean(entity?.id && entity.stateObj && entity.available);
  }

  _stateText(entity) {
    if (!entity?.stateObj) return "--";
    if (isUnavailable(entity.stateObj)) return "n/a";
    const state = String(entity.stateObj.state ?? "");
    const unit = entity.stateObj.attributes?.unit_of_measurement;
    if (state === "on") return "An";
    if (state === "off") return "Aus";
    return `${state}${unit ? ` ${unit}` : ""}`;
  }

  _changeTemperature(entityId, delta) {
    const stateObj = this._hass?.states?.[entityId];
    const current = numberValue(stateObj?.attributes?.temperature);
    if (!entityId || current === null || delta === null) return;
    const min = numberValue(stateObj.attributes?.min_temp) ?? 20;
    const max = numberValue(stateObj.attributes?.max_temp) ?? 60;
    const next = Math.max(min, Math.min(max, current + delta));
    this._call("climate", "set_temperature", { entity_id: entityId, temperature: next });
  }

  _call(domain, service, data) {
    const result = this._hass?.callService?.(domain, service, data);
    if (result && typeof result.catch === "function") {
      result.catch((err) => console.error("DHE Connect Card service call failed", err));
    }
  }

  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  _styles(accent) {
    return `
      <style>
        :host {
          display: block;
          --dhe-accent: ${accent.color};
          --dhe-soft: ${accent.soft};
        }

        * {
          box-sizing: border-box;
          letter-spacing: 0;
        }

        ha-card {
          overflow: hidden;
          color: var(--primary-text-color);
          background: var(--ha-card-background, var(--card-background-color));
        }

        button {
          border: 0;
          color: inherit;
          font: inherit;
          cursor: pointer;
          min-width: 0;
        }

        button:disabled {
          cursor: default;
        }

        .hero {
          padding: 18px;
          background:
            linear-gradient(135deg, var(--dhe-soft), transparent 58%),
            var(--ha-card-background, var(--card-background-color));
          border-bottom: 1px solid var(--divider-color);
        }

        .hero-top,
        .temperature,
        .actions,
        .chips,
        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hero-top {
          justify-content: space-between;
        }

        .title {
          display: grid;
          gap: 3px;
          padding: 0;
          text-align: left;
          background: transparent;
        }

        .title span,
        .section-title {
          color: var(--secondary-text-color);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .title strong {
          font-size: 22px;
          line-height: 1.15;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          max-width: 45%;
          padding: 8px 12px;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--dhe-accent) 65%, var(--divider-color));
          border-radius: 18px;
          background: var(--dhe-soft);
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .status span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dhe-accent);
          flex: 0 0 auto;
        }

        .temperature {
          justify-content: space-between;
          margin-top: 18px;
        }

        .target {
          display: grid;
          grid-template-columns: auto auto;
          gap: 2px 10px;
          align-items: center;
        }

        .target ha-icon {
          color: var(--dhe-accent);
          grid-row: span 2;
        }

        .target strong {
          font-size: 40px;
          line-height: 1;
        }

        .target small {
          color: var(--secondary-text-color);
        }

        .current {
          display: grid;
          gap: 4px;
          min-width: 78px;
          padding: 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: transparent;
          text-align: center;
        }

        .current span {
          color: var(--secondary-text-color);
        }

        .current strong {
          font-size: 20px;
        }

        .actions {
          margin-top: 14px;
        }

        .icon {
          width: 42px;
          height: 42px;
          display: inline-grid;
          place-items: center;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
        }

        .icon.action {
          background: var(--dhe-accent);
          color: white;
          border-color: var(--dhe-accent);
        }

        .chips {
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          max-width: 100%;
          padding: 7px 10px;
          border: 1px solid color-mix(in srgb, var(--dhe-accent) 55%, var(--divider-color));
          border-radius: 18px;
          background: transparent;
        }

        .chip ha-icon,
        .tile ha-icon,
        .section-title ha-icon {
          color: var(--dhe-accent);
        }

        .chip strong {
          font-weight: 700;
        }

        .body {
          padding: 0 16px 16px;
        }

        .section {
          padding-top: 16px;
        }

        .section-title {
          margin-bottom: 10px;
        }

        .tiles {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
          gap: 8px;
        }

        .tile {
          display: grid;
          gap: 8px;
          min-height: 94px;
          padding: 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: transparent;
          text-align: left;
        }

        .tile.on {
          border-color: color-mix(in srgb, var(--dhe-accent) 72%, var(--divider-color));
          background: var(--dhe-soft);
        }

        .tile span {
          color: var(--secondary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tile strong {
          align-self: end;
          overflow-wrap: anywhere;
        }

        .compact .body {
          padding-bottom: 12px;
        }

        .compact .target strong {
          font-size: 32px;
        }

        .compact .tiles {
          grid-template-columns: repeat(auto-fit, minmax(104px, 1fr));
        }
      </style>
    `;
  }
}

class DheConnectCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._onValueChanged = this._onValueChanged.bind(this);
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...migrateConfig(config) };
    this._render();
  }

  _render() {
    if (!this.shadowRoot || !this._config) return;
    const form = configForm();
    this.shadowRoot.innerHTML = `
      <style>:host { display: block; }</style>
      <ha-form></ha-form>
    `;
    this._form = this.shadowRoot.querySelector("ha-form");
    this._form.hass = this._hass;
    this._form.data = this._config;
    this._form.schema = form.schema;
    this._form.computeLabel = form.computeLabel;
    this._form.computeHelper = form.computeHelper;
    this._form.addEventListener("value-changed", this._onValueChanged);
  }

  _onValueChanged(event) {
    event.stopPropagation();
    const config = migrateConfig({ ...this._config, ...(event.detail?.value || {}) });
    this._config = { ...DEFAULT_CONFIG, ...config };
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config },
    }));
  }
}

function emptyEntity(def) {
  return { id: "", stateObj: undefined, available: false, definition: def };
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return String(value);
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function findPrefixFromHass(hass) {
  const states = hass?.states || {};
  const climateId = Object.keys(states).find((entityId) => {
    if (!entityId.startsWith("climate.")) return false;
    const objectId = entityId.slice("climate.".length);
    return CLIMATE_SUFFIXES.some((suffix) => objectId.endsWith(`_${suffix}`));
  });
  if (!climateId) return DEFAULT_CONFIG.entity_prefix;
  return normalizePrefix(climateId.slice("climate.".length));
}

if (!customElements.get(EDITOR_TYPE)) {
  customElements.define(EDITOR_TYPE, DheConnectCardEditor);
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, DheConnectCard);
}

window.customCards = window.customCards || [];
const cardInfo = {
  type: CARD_TYPE,
  name: "DHE Connect Card",
  preview: true,
  description: `GUI-konfigurierbare Karte fuer Stiebel DHE Connect (${CARD_VERSION}).`,
  documentationURL: "https://github.com/memphi2/dhe-connect-card",
};
const existing = window.customCards.findIndex((card) => card.type === CARD_TYPE);
if (existing >= 0) window.customCards[existing] = cardInfo;
else window.customCards.push(cardInfo);

console.info(
  `%c DHE Connect Card %c ${CARD_VERSION} `,
  "color: white; background: #00a6b4; font-weight: 700;",
  "color: #00a6b4; background: transparent; font-weight: 700;",
);
