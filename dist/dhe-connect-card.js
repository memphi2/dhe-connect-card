// src/dhe-connect-card.js
var CARD_VERSION = "0.4.3";
var CARD_TYPE = "dhe-connect-card";
var CARD_TEST_TYPE = "dhe-connect-card-v042";
var INTEGRATION_DOMAIN = "stiebel_dhe_connect";
var DEFAULT_CONFIG = {
  title: "DHE Connect",
  entity_prefix: "dhe_connect",
  accent: "aqua",
  compact: false,
  enable_actions: true,
  auto_discover: true,
  show_unavailable: false,
  show_controls: true,
  show_consumption: true,
  show_media: true,
  show_diagnostics: true,
  temperature_step: 0.5,
  memory_slots: 2
};
var ACCENTS = {
  aqua: { label: "Aqua", color: "#0098a6", contrast: "#063d45" },
  blue: { label: "Blau", color: "#2f6fed", contrast: "#0d2d63" },
  green: { label: "Gruen", color: "#2f8d55", contrast: "#143b25" },
  amber: { label: "Amber", color: "#c77700", contrast: "#593200" },
  graphite: { label: "Graphit", color: "#657381", contrast: "#27313a" }
};
var ENTITY_DEFINITIONS = {
  climate: {
    domain: "climate",
    icon: "mdi:water-thermometer",
    label: "Wasser",
    configKeys: ["climate_entity"],
    objectIds: ["{p}_setpoint", "{p}_water_heating", "{p}_wasser_heating", "{p}_wassererwarmung"],
    terms: ["setpoint", "water heating", "durchlauferhitzer", "warmwasser"]
  },
  water_flow: {
    domain: "sensor",
    icon: "mdi:waves-arrow-right",
    label: "Durchfluss",
    configKeys: ["water_flow_entity"],
    objectIds: ["{p}_current_water_flow", "{p}_water_flow", "{p}_durchfluss"],
    terms: ["current water flow", "water flow", "durchfluss"],
    deviceClasses: ["volume_flow_rate"],
    units: ["L/min", "l/min"]
  },
  power: {
    domain: "sensor",
    icon: "mdi:flash",
    label: "Leistung",
    configKeys: ["power_entity"],
    objectIds: ["{p}_current_power_consumption", "{p}_power", "{p}_leistung"],
    terms: ["current power", "power consumption", "leistung"],
    deviceClasses: ["power"],
    units: ["kW", "W"]
  },
  inlet_temperature: {
    domain: "sensor",
    icon: "mdi:thermometer-chevron-down",
    label: "Zulauf",
    configKeys: ["inlet_temperature_entity"],
    objectIds: ["{p}_inlet_temperature", "{p}_internal_temperature_1", "{p}_zulauf_temperatur"],
    terms: ["inlet temperature", "internal temperature 1", "zulauf"],
    deviceClasses: ["temperature"],
    units: ["C", "\xB0C"]
  },
  outlet_temperature: {
    domain: "sensor",
    icon: "mdi:thermometer-chevron-up",
    label: "Auslauf",
    configKeys: ["outlet_temperature_entity"],
    objectIds: ["{p}_outlet_temperature", "{p}_internal_temperature_2", "{p}_auslauf_temperatur"],
    terms: ["outlet temperature", "internal temperature 2", "auslauf"],
    deviceClasses: ["temperature"],
    units: ["C", "\xB0C"]
  },
  connection_state: {
    domain: "sensor",
    icon: "mdi:lan-connect",
    label: "Verbindung",
    configKeys: ["connection_state_entity"],
    objectIds: ["{p}_connection_state", "{p}_verbindung"],
    terms: ["connection state", "verbindung"]
  },
  temperature_error_status: {
    domain: "sensor",
    icon: "mdi:alert-octagon-outline",
    label: "Status",
    configKeys: ["status_entity", "temperature_error_status_entity"],
    objectIds: ["{p}_error_status", "{p}_temperature_error_status", "{p}_device_status", "{p}_status"],
    terms: ["error status", "temperature error", "device status", "status"]
  },
  reconnect_count: {
    domain: "sensor",
    icon: "mdi:restart",
    label: "Reconnects",
    objectIds: ["{p}_reconnect_count", "{p}_reconnects"],
    terms: ["reconnects", "reconnect count"]
  },
  last_reconnect_reason: {
    domain: "sensor",
    icon: "mdi:alert-circle-outline",
    label: "Reconnect-Grund",
    objectIds: ["{p}_last_reconnect_reason"],
    terms: ["last reconnect reason", "reconnect grund"]
  },
  device_info: {
    domain: "sensor",
    icon: "mdi:information-outline",
    label: "Geraet",
    objectIds: ["{p}_device_info", "{p}_gerateinfo"],
    terms: ["device info", "geraet", "gerateinfo"]
  },
  eco_mode: {
    domain: "switch",
    icon: "mdi:leaf",
    label: "Eco",
    configKeys: ["eco_mode_entity"],
    objectIds: ["{p}_eco_mode", "{p}_eco"],
    terms: ["eco mode", "eco"]
  },
  bath_fill: {
    domain: "switch",
    icon: "mdi:bathtub",
    label: "Wanne",
    configKeys: ["bath_fill_entity"],
    objectIds: ["{p}_bath_fill_active", "{p}_bath_fill", "{p}_wanne"],
    terms: ["bath fill", "wanne"]
  },
  maximum_active: {
    domain: "switch",
    icon: "mdi:thermometer-check",
    label: "Kindersich.",
    configKeys: ["maximum_active_entity"],
    objectIds: ["{p}_child_safety_active", "{p}_maximum_temperature_limit", "{p}_maximum_active", "{p}_maximaltemperatur_limit"],
    terms: ["child safety active", "kindersicherung", "maximum temperature limit", "limit"]
  },
  brush_timer_activation: {
    domain: "switch",
    icon: "mdi:toothbrush",
    label: "Zahnputzen",
    objectIds: ["{p}_brush_timer_active", "{p}_brush_timer", "{p}_brush_timer_activation", "{p}_zahnputz_timer"],
    terms: ["brush timer", "zahnputz"]
  },
  shower_timer_activation: {
    domain: "switch",
    icon: "mdi:shower-head",
    label: "Dusche",
    objectIds: ["{p}_shower_timer_active", "{p}_shower_timer", "{p}_shower_timer_activation", "{p}_duschtimer"],
    terms: ["shower timer", "dusche"]
  },
  wellness_cold_prevention: {
    domain: "switch",
    icon: "mdi:shower",
    label: "Erkaeltung",
    objectIds: ["{p}_cold_prevention", "{p}_wellness_cold_prevention"],
    terms: ["cold prevention", "erkaeltung"]
  },
  winter_refresh: {
    domain: "switch",
    icon: "mdi:snowflake-thermometer",
    label: "Winter",
    objectIds: ["{p}_wellness_winter_refresh", "{p}_winter_refresh"],
    terms: ["winter refresh"]
  },
  summer_fitness: {
    domain: "switch",
    icon: "mdi:weather-sunny",
    label: "Sommer",
    objectIds: ["{p}_wellness_summer_fitness", "{p}_summer_fitness"],
    terms: ["summer fitness"]
  },
  circulation_support: {
    domain: "switch",
    icon: "mdi:heart-pulse",
    label: "Kreislauf",
    objectIds: ["{p}_wellness_circulation_support", "{p}_circulation_support"],
    terms: ["circulation support", "kreislauf"]
  },
  bath_fill_target_volume: {
    domain: "number",
    icon: "mdi:bathtub-outline",
    label: "Wannenmenge",
    configKeys: ["bath_fill_target_volume_entity"],
    objectIds: ["{p}_bath_fill_target_volume", "{p}_wannenmenge"],
    terms: ["bath fill target volume", "wannenmenge"],
    deviceClasses: ["volume"],
    units: ["L", "l"]
  },
  bath_fill_remaining_volume: {
    domain: "sensor",
    icon: "mdi:bathtub",
    label: "Wanne Rest",
    configKeys: ["bath_fill_remaining_entity"],
    objectIds: ["{p}_bath_fill_remaining_volume", "{p}_bath_fill_remaining"],
    terms: ["bath fill remaining", "wanne verbleibend"],
    deviceClasses: ["water"],
    units: ["L", "l"]
  },
  maximum_temperature: {
    domain: "number",
    icon: "mdi:thermometer-high",
    label: "Kindersich. Temp.",
    objectIds: ["{p}_child_safety_temperature_limit", "{p}_maximum_temperature"],
    terms: ["child safety temperature limit", "kindersicherung temperatur", "maximum temperature", "maximaltemp"],
    deviceClasses: ["temperature"],
    units: ["C", "\xB0C"]
  },
  eco_flow_limit: {
    domain: "number",
    icon: "mdi:water-pump",
    label: "Eco-Limit",
    objectIds: ["{p}_eco_flow_limit"],
    terms: ["eco flow limit"],
    deviceClasses: ["volume_flow_rate"],
    units: ["L/min", "l/min"]
  },
  brush_timer_duration: {
    domain: "number",
    icon: "mdi:toothbrush",
    label: "Zahnputzen Dauer",
    objectIds: ["{p}_brush_timer_duration"],
    terms: ["brush timer duration"],
    units: ["s", "sec", "seconds"]
  },
  shower_timer_duration: {
    domain: "number",
    icon: "mdi:timer-edit",
    label: "Dusche Dauer",
    objectIds: ["{p}_shower_timer_duration"],
    terms: ["shower timer duration"],
    units: ["s", "sec", "seconds"]
  },
  brush_timer_remaining: {
    domain: "sensor",
    icon: "mdi:toothbrush",
    label: "Zahnputz-Rest",
    objectIds: ["{p}_brush_timer_remaining"],
    terms: ["brush timer remaining"],
    units: ["s", "sec", "seconds"]
  },
  shower_timer_remaining: {
    domain: "sensor",
    icon: "mdi:timer-sand",
    label: "Dusch-Rest",
    objectIds: ["{p}_shower_timer_remaining"],
    terms: ["shower timer remaining"],
    units: ["s", "sec", "seconds"]
  },
  reset_brush_timer: {
    domain: "button",
    icon: "mdi:toothbrush",
    label: "Reset Zahnputzen",
    objectIds: ["{p}_reset_brush_timer"],
    terms: ["reset brush timer"]
  },
  reset_shower_timer: {
    domain: "button",
    icon: "mdi:shower-head",
    label: "Reset Dusche",
    objectIds: ["{p}_reset_shower_timer"],
    terms: ["reset shower timer"]
  },
  last_usage_water: {
    domain: "sensor",
    icon: "mdi:water-check",
    label: "Wasser",
    objectIds: ["{p}_last_usage_water"],
    terms: ["last usage water"]
  },
  last_usage_energy: {
    domain: "sensor",
    icon: "mdi:lightning-bolt",
    label: "Energie",
    objectIds: ["{p}_last_usage_energy"],
    terms: ["last usage energy"]
  },
  last_usage_time: {
    domain: "sensor",
    icon: "mdi:timer-outline",
    label: "Dauer",
    objectIds: ["{p}_last_usage_duration", "{p}_last_usage_time"],
    terms: ["last usage duration", "last usage time"]
  },
  last_usage_cost: {
    domain: "sensor",
    icon: "mdi:cash",
    label: "Kosten",
    objectIds: ["{p}_last_usage_cost"],
    terms: ["last usage cost"]
  },
  water_consumption_week: {
    domain: "sensor",
    icon: "mdi:water",
    label: "Wasser Woche",
    objectIds: ["{p}_water_consumption_week"],
    terms: ["water consumption week"],
    deviceClasses: ["water"]
  },
  energy_consumption_week: {
    domain: "sensor",
    icon: "mdi:lightning-bolt",
    label: "Energie Woche",
    objectIds: ["{p}_energy_consumption_week"],
    terms: ["energy consumption week"],
    deviceClasses: ["energy"]
  },
  saving_monitor_possible_value: {
    domain: "sensor",
    icon: "mdi:cash-plus",
    label: "Moegl. Sparen",
    objectIds: ["{p}_saving_monitor_possible_cost", "{p}_saving_monitor_possible_cost_saving", "{p}_saving_monitor_possible_value"],
    terms: ["saving monitor possible cost", "possible cost saving"]
  },
  saving_monitor_real_value: {
    domain: "sensor",
    icon: "mdi:cash-check",
    label: "Real gespart",
    objectIds: ["{p}_saving_monitor_real_cost", "{p}_saving_monitor_real_cost_saving", "{p}_saving_monitor_real_value"],
    terms: ["saving monitor real cost", "real cost saving"]
  },
  radio: {
    domain: "media_player",
    icon: "mdi:radio",
    label: "Radio",
    configKeys: ["radio_entity"],
    objectIds: ["{p}_radio"],
    terms: ["radio"]
  },
  weather: {
    domain: "weather",
    icon: "mdi:weather-partly-cloudy",
    label: "Wetter",
    configKeys: ["weather_entity"],
    objectIds: ["{p}_weather", "{p}_wetter"],
    terms: ["weather", "wetter"]
  }
};
for (let slot = 1; slot <= 12; slot += 1) {
  ENTITY_DEFINITIONS[`temperature_memory_${slot}`] = {
    domain: "button",
    icon: slot < 10 ? `mdi:numeric-${slot}-box-outline` : "mdi:counter",
    label: `Speicher ${slot}`,
    objectIds: [`{p}_memory_${slot}`, `{p}_temperature_memory_${slot}`],
    terms: [`memory ${slot}`, `temperature memory ${slot}`, `speicher ${slot}`]
  };
  ENTITY_DEFINITIONS[`temperature_memory_${slot}_temperature`] = {
    domain: "number",
    icon: slot < 10 ? `mdi:numeric-${slot}-box-outline` : "mdi:counter",
    label: `${slot}`,
    objectIds: [`{p}_memory_${slot}_temperature`, `{p}_temperature_memory_${slot}_temperature`],
    terms: [`memory ${slot} temperature`, `temperature memory ${slot}`]
  };
}
var FIELD_LABELS = {
  title: "Titel",
  entity_prefix: "Entity-Prefix",
  accent: "Akzent",
  compact: "Kompaktes Layout",
  enable_actions: "Aktionen erlauben",
  auto_discover: "Entities automatisch finden",
  show_unavailable: "Fehlende Entities anzeigen",
  show_controls: "Steuerung anzeigen",
  show_consumption: "Verbrauch anzeigen",
  show_media: "Wetter und Radio anzeigen",
  show_diagnostics: "Diagnose anzeigen",
  temperature_step: "Temperaturschritt",
  memory_slots: "Temperaturspeicher",
  climate_entity: "Climate",
  water_flow_entity: "Durchfluss",
  power_entity: "Leistung",
  inlet_temperature_entity: "Zulauf",
  outlet_temperature_entity: "Auslauf",
  connection_state_entity: "Verbindungsstatus",
  status_entity: "Fehlerstatus",
  eco_mode_entity: "Eco-Schalter",
  bath_fill_entity: "Wannenfuellung",
  maximum_active_entity: "Kindersicherung",
  bath_fill_target_volume_entity: "Wannen-Zielmenge",
  bath_fill_remaining_entity: "Wanne verbleibend",
  radio_entity: "Radio",
  weather_entity: "Wetter"
};
var FIELD_HELPERS = {
  entity_prefix: "Beispiel: dhe_connect fuer climate.dhe_connect_water_heating. Direkte Entity-Auswahl unten hat Vorrang.",
  auto_discover: "Findet passende stiebel_dhe_connect Entities anhand Entity-ID und Name.",
  enable_actions: "Wenn aus, zeigt die Karte nur Statuswerte und oeffnet Details."
};
var html = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
var numberValue = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
var isUnavailableState = (stateObj) => !stateObj || ["unknown", "unavailable", ""].includes(String(stateObj.state));
var normalizeText = (value) => String(value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll("\xE4", "ae").replaceAll("\xF6", "oe").replaceAll("\xFC", "ue").replaceAll("\xDF", "ss");
var slug = (value) => normalizeText(value).replace(/^[a-z0-9_]+\./, "").replace(/[^a-z0-9]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
var entitySelector = (name, domain) => ({
  name,
  selector: {
    entity: {
      filter: [
        {
          integration: INTEGRATION_DOMAIN,
          domain
        }
      ]
    }
  }
});
var migrateConfig = (config) => {
  const next = { ...config || {} };
  if (!next.entity_prefix && next.device_prefix) {
    next.entity_prefix = slug(next.device_prefix);
  }
  delete next.device_prefix;
  return next;
};
var DheConnectCard = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  setConfig(config) {
    this._config = this._normalizeConfig(config || {});
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    this._render();
  }
  getCardSize() {
    if (this._config?.compact) return 4;
    return 7;
  }
  getGridOptions() {
    return {
      columns: this._config?.compact ? 6 : 9,
      min_columns: 3,
      rows: this._config?.compact ? 4 : 7,
      min_rows: 3
    };
  }
  static getStubConfig(hass) {
    return {
      title: "DHE Connect",
      entity_prefix: findPrefixFromHass(hass) || DEFAULT_CONFIG.entity_prefix,
      accent: "aqua",
      compact: false,
      enable_actions: true,
      auto_discover: true,
      show_controls: true,
      show_consumption: true,
      show_media: true,
      show_diagnostics: true,
      temperature_step: 0.5,
      memory_slots: 2
    };
  }
  static getConfigElement() {
    return document.createElement("dhe-connect-card-form-editor");
  }
  static getConfigForm() {
    return {
      schema: [
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "180px",
          schema: [
            { name: "title", selector: { text: {} } },
            { name: "entity_prefix", selector: { text: {} } },
            {
              name: "accent",
              selector: {
                select: {
                  options: Object.entries(ACCENTS).map(([value, item]) => ({
                    value,
                    label: item.label
                  }))
                }
              }
            },
            {
              name: "temperature_step",
              selector: {
                number: {
                  min: 0.5,
                  max: 5,
                  step: 0.5,
                  mode: "box",
                  unit_of_measurement: "C"
                }
              }
            },
            {
              name: "memory_slots",
              selector: {
                number: {
                  min: 0,
                  max: 12,
                  step: 1,
                  mode: "box"
                }
              }
            }
          ]
        },
        {
          type: "expandable",
          name: "display",
          title: "Anzeige",
          flatten: true,
          schema: [
            { name: "compact", selector: { boolean: {} } },
            { name: "enable_actions", selector: { boolean: {} } },
            { name: "auto_discover", selector: { boolean: {} } },
            { name: "show_unavailable", selector: { boolean: {} } },
            { name: "show_controls", selector: { boolean: {} } },
            { name: "show_consumption", selector: { boolean: {} } },
            { name: "show_media", selector: { boolean: {} } },
            { name: "show_diagnostics", selector: { boolean: {} } }
          ]
        },
        {
          type: "expandable",
          name: "entities_main",
          title: "Haupt-Entities",
          flatten: true,
          schema: [
            entitySelector("climate_entity", "climate"),
            entitySelector("water_flow_entity", "sensor"),
            entitySelector("power_entity", "sensor"),
            entitySelector("inlet_temperature_entity", "sensor"),
            entitySelector("outlet_temperature_entity", "sensor"),
            entitySelector("connection_state_entity", "sensor"),
            entitySelector("status_entity", "sensor")
          ]
        },
        {
          type: "expandable",
          name: "entities_controls",
          title: "Steuerung",
          flatten: true,
          schema: [
            entitySelector("eco_mode_entity", "switch"),
            entitySelector("bath_fill_entity", "switch"),
            entitySelector("maximum_active_entity", "switch"),
            entitySelector("bath_fill_target_volume_entity", "number"),
            entitySelector("bath_fill_remaining_entity", "sensor")
          ]
        },
        {
          type: "expandable",
          name: "entities_media",
          title: "Wetter und Radio",
          flatten: true,
          schema: [
            entitySelector("radio_entity", "media_player"),
            entitySelector("weather_entity", "weather")
          ]
        }
      ],
      computeLabel: (schema) => FIELD_LABELS[schema.name] || void 0,
      computeHelper: (schema) => FIELD_HELPERS[schema.name] || void 0,
      assertConfig: (config) => {
        for (const [key, value] of Object.entries(config || {})) {
          if (key.endsWith("_entity") && value && !String(value).includes(".")) {
            throw new Error(`${key} muss eine Entity-ID sein.`);
          }
        }
      }
    };
  }
  _normalizeConfig(config) {
    const legacyPrefix = config.entity_prefix || config.device_prefix || DEFAULT_CONFIG.entity_prefix;
    return {
      ...DEFAULT_CONFIG,
      ...config,
      entity_prefix: slug(legacyPrefix) || DEFAULT_CONFIG.entity_prefix,
      accent: ACCENTS[config.accent] ? config.accent : DEFAULT_CONFIG.accent,
      temperature_step: clamp(numberValue(config.temperature_step) || DEFAULT_CONFIG.temperature_step, 0.5, 5),
      memory_slots: clamp(Math.round(numberValue(config.memory_slots) ?? DEFAULT_CONFIG.memory_slots), 0, 12)
    };
  }
  _render() {
    if (!this.shadowRoot || !this._config) return;
    const accent = ACCENTS[this._config.accent] || ACCENTS.aqua;
    this.shadowRoot.innerHTML = `
      ${this._style(accent)}
      <ha-card class="${this._config.compact ? "compact" : ""}">
        ${this._renderHero()}
        <div class="body">
          ${this._config.show_controls ? this._renderControls() : ""}
          ${this._config.show_consumption ? this._renderConsumption() : ""}
          ${this._config.show_media ? this._renderMedia() : ""}
          ${this._config.show_diagnostics ? this._renderDiagnostics() : ""}
        </div>
      </ha-card>
    `;
    this._bindEvents();
  }
  _renderHero() {
    const climate = this._entity("climate");
    const outlet = this._entity("outlet_temperature");
    const status = this._status();
    const target = numberValue(climate.stateObj?.attributes?.temperature);
    const current = numberValue(climate.stateObj?.attributes?.current_temperature) ?? numberValue(outlet.stateObj?.state);
    const targetText = target === null ? "--" : `${target.toFixed(target % 1 ? 1 : 0)} C`;
    const currentText = current === null ? "--" : `${current.toFixed(current % 1 ? 1 : 0)} C`;
    const mode = climate.stateObj?.state === "off" ? "Aus" : "Bereit";
    const hasClimate = Boolean(climate.stateObj);
    return `
      <section class="hero ${html(status.tone)}">
        <div class="hero-head">
          <button class="title-button" data-more-info="${html(climate.id || "")}" ${hasClimate ? "" : "disabled"}>
            <span>STIEBEL ELTRON</span>
            <strong>${html(this._config.title)}</strong>
          </button>
          <button class="status" data-more-info="${html(status.entityId || climate.id || "")}" ${status.entityId || climate.id ? "" : "disabled"}>
            <span class="dot"></span>
            ${html(status.label)}
          </button>
        </div>
        <div class="temperature-row">
          <button class="temperature-main" data-more-info="${html(climate.id || "")}" ${hasClimate ? "" : "disabled"}>
            <ha-icon icon="mdi:water-thermometer"></ha-icon>
            <span>
              <strong>${html(targetText)}</strong>
              <small>Solltemperatur - ${html(mode)}</small>
            </span>
          </button>
          <div class="temperature-now">
            <span>Aktuell</span>
            <strong>${html(currentText)}</strong>
          </div>
        </div>
        ${this._config.enable_actions ? this._renderTemperatureActions(climate) : ""}
        <div class="metrics">
          ${this._metric("water_flow")}
          ${this._metric("power")}
          ${this._metric("inlet_temperature")}
          ${this._metric("outlet_temperature")}
        </div>
      </section>
    `;
  }
  _renderTemperatureActions(climate) {
    if (!climate.id) return "";
    const disabled = climate.available ? "" : "disabled";
    const hvacIcon = climate.stateObj?.state === "off" ? "mdi:power" : "mdi:power-standby";
    return `
      <div class="temperature-actions">
        <button ${disabled} data-temp-delta="${-Math.abs(this._config.temperature_step)}" data-entity="${html(climate.id)}" title="Temperatur senken">
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <button ${disabled} data-temp-delta="${Math.abs(this._config.temperature_step)}" data-entity="${html(climate.id)}" title="Temperatur erhoehen">
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button ${disabled} data-hvac-toggle="${html(climate.id)}" title="Heizung umschalten">
          <ha-icon icon="${html(hvacIcon)}"></ha-icon>
        </button>
        <button ${disabled} data-more-info="${html(climate.id)}" title="Details">
          <ha-icon icon="mdi:dots-horizontal"></ha-icon>
        </button>
      </div>
    `;
  }
  _renderControls() {
    const primary = [
      "eco_mode",
      "bath_fill",
      "maximum_active",
      "brush_timer_activation",
      "shower_timer_activation"
    ].map((key) => this._toggleTile(key)).join("");
    const wellness = [
      "wellness_cold_prevention",
      "winter_refresh",
      "summer_fitness",
      "circulation_support"
    ].map((key) => this._toggleTile(key, true)).join("");
    const settings = [
      "bath_fill_target_volume",
      "bath_fill_remaining_volume",
      "maximum_temperature",
      "eco_flow_limit",
      "brush_timer_duration",
      "shower_timer_duration",
      "brush_timer_remaining",
      "shower_timer_remaining"
    ].map((key) => this._infoTile(key)).join("");
    const memories = Array.from({ length: this._config.memory_slots }, (_, index) => this._memoryTile(index + 1)).join("");
    const content = [primary, wellness, settings, memories].some(Boolean);
    if (!content) return "";
    return `
      <section class="section">
        ${this._sectionTitle("mdi:tune-variant", "Steuerung")}
        ${primary ? `<div class="action-grid">${primary}</div>` : ""}
        ${settings ? `<div class="info-grid">${settings}</div>` : ""}
        ${wellness ? `<div class="wellness-grid">${wellness}</div>` : ""}
        ${memories ? `<div class="memory-grid">${memories}</div>` : ""}
      </section>
    `;
  }
  _renderConsumption() {
    const lastUsage = [
      "last_usage_water",
      "last_usage_energy",
      "last_usage_time",
      "last_usage_cost"
    ].map((key) => this._infoTile(key)).join("");
    const totals = [
      "water_consumption_week",
      "energy_consumption_week",
      "saving_monitor_possible_value",
      "saving_monitor_real_value"
    ].map((key) => this._infoTile(key)).join("");
    if (!lastUsage && !totals) return "";
    return `
      <section class="section">
        ${this._sectionTitle("mdi:chart-line", "Verbrauch")}
        ${lastUsage ? `<div class="info-grid">${lastUsage}</div>` : ""}
        ${totals ? `<div class="info-grid">${totals}</div>` : ""}
      </section>
    `;
  }
  _renderMedia() {
    const radio = this._entity("radio");
    const weather = this._entity("weather");
    const radioHtml = this._visible(radio) ? this._renderRadio(radio) : "";
    const weatherHtml = this._visible(weather) ? this._renderWeather(weather) : "";
    if (!radioHtml && !weatherHtml) return "";
    return `
      <section class="section">
        ${this._sectionTitle("mdi:radio-tower", "Wetter und Radio")}
        <div class="media-grid">${weatherHtml}${radioHtml}</div>
      </section>
    `;
  }
  _renderDiagnostics() {
    const rows = [
      "temperature_error_status",
      "connection_state",
      "reconnect_count",
      "last_reconnect_reason",
      "device_info"
    ].map((key) => this._diagnosticRow(key)).join("");
    if (!rows) return "";
    return `
      <section class="section">
        ${this._sectionTitle("mdi:heart-pulse", "Diagnose")}
        <div class="diagnostics">${rows}</div>
      </section>
    `;
  }
  _renderRadio(entity) {
    const state = entity.stateObj?.state || "--";
    const station = entity.stateObj?.attributes?.media_title || entity.stateObj?.attributes?.source || entity.stateObj?.attributes?.media_artist || "Radio";
    const isPlaying = state === "playing";
    const disabled = entity.available ? "" : "disabled";
    return `
      <article class="large-tile">
        <button class="large-main" data-more-info="${html(entity.id || "")}" ${entity.id ? "" : "disabled"}>
          <ha-icon icon="mdi:radio"></ha-icon>
          <span>
            <strong>${html(station)}</strong>
            <small>${html(state)}</small>
          </span>
        </button>
        ${this._config.enable_actions ? `
          <div class="inline-actions">
            <button ${disabled} data-media-action="previous" data-entity="${html(entity.id || "")}" title="Vorheriger Sender"><ha-icon icon="mdi:skip-previous"></ha-icon></button>
            <button ${disabled} data-media-action="${isPlaying ? "pause" : "play"}" data-entity="${html(entity.id || "")}" title="Play/Pause"><ha-icon icon="${isPlaying ? "mdi:pause" : "mdi:play"}"></ha-icon></button>
            <button ${disabled} data-media-action="next" data-entity="${html(entity.id || "")}" title="Naechster Sender"><ha-icon icon="mdi:skip-next"></ha-icon></button>
          </div>
        ` : ""}
      </article>
    `;
  }
  _renderWeather(entity) {
    const condition = entity.stateObj?.state || "--";
    const temperature = this._weatherTemperature(entity.stateObj);
    const location = entity.stateObj?.attributes?.location || entity.stateObj?.attributes?.location_name || entity.stateObj?.attributes?.friendly_name || "Wetter";
    return `
      <article class="large-tile">
        <button class="large-main" data-more-info="${html(entity.id || "")}" ${entity.id ? "" : "disabled"}>
          <ha-icon icon="${html(this._weatherIcon(condition))}"></ha-icon>
          <span>
            <strong>${html(temperature || condition)}</strong>
            <small>${html(location)}</small>
          </span>
        </button>
      </article>
    `;
  }
  _memoryTile(slot) {
    const button = this._entity(`temperature_memory_${slot}`);
    const temperature = this._entity(`temperature_memory_${slot}_temperature`);
    if (!this._visible(button) && !this._visible(temperature)) return "";
    const value = this._stateText(temperature, "--");
    const disabled = button.available ? "" : "disabled";
    return `
      <button class="memory-tile" ${disabled} data-press="${html(button.id || "")}" title="Speicher ${slot}">
        <ha-icon icon="${html(ENTITY_DEFINITIONS[`temperature_memory_${slot}`].icon)}"></ha-icon>
        <span>Speicher ${slot}</span>
        <strong>${html(value)}</strong>
      </button>
    `;
  }
  _toggleTile(key, small = false) {
    const entity = this._entity(key);
    if (!this._visible(entity)) return "";
    const def = ENTITY_DEFINITIONS[key];
    const active = ["on", "heat", "playing"].includes(String(entity.stateObj?.state));
    const disabled = entity.available ? "" : "disabled";
    const action = this._config.enable_actions ? `data-toggle="${html(entity.id || "")}"` : `data-more-info="${html(entity.id || "")}"`;
    return `
      <button class="action-tile ${small ? "small" : ""} ${active ? "active" : ""}" ${disabled} ${action}>
        <ha-icon icon="${html(def.icon)}"></ha-icon>
        <span>${html(def.label)}</span>
        <strong>${html(active ? "An" : this._stateText(entity, "--"))}</strong>
      </button>
    `;
  }
  _infoTile(key) {
    const entity = this._entity(key);
    if (!this._visible(entity)) return "";
    const def = ENTITY_DEFINITIONS[key];
    return `
      <button class="info-tile" data-more-info="${html(entity.id || "")}">
        <ha-icon icon="${html(def.icon)}"></ha-icon>
        <span>${html(def.label)}</span>
        <strong>${html(this._stateText(entity, "--"))}</strong>
      </button>
    `;
  }
  _metric(key) {
    const entity = this._entity(key);
    if (!this._visible(entity)) return "";
    const def = ENTITY_DEFINITIONS[key];
    return `
      <button class="metric" data-more-info="${html(entity.id || "")}">
        <ha-icon icon="${html(def.icon)}"></ha-icon>
        <span>${html(def.label)}</span>
        <strong>${html(this._stateText(entity, "--"))}</strong>
      </button>
    `;
  }
  _diagnosticRow(key) {
    const entity = this._entity(key);
    if (!this._visible(entity)) return "";
    const def = ENTITY_DEFINITIONS[key];
    return `
      <button class="diagnostic-row" data-more-info="${html(entity.id || "")}">
        <ha-icon icon="${html(def.icon)}"></ha-icon>
        <span>${html(def.label)}</span>
        <strong>${html(this._stateText(entity, "--"))}</strong>
      </button>
    `;
  }
  _sectionTitle(icon, label) {
    return `
      <div class="section-title">
        <ha-icon icon="${html(icon)}"></ha-icon>
        <span>${html(label)}</span>
      </div>
    `;
  }
  _entity(key) {
    const def = ENTITY_DEFINITIONS[key];
    if (!def) return { id: "", stateObj: void 0, available: false, definition: void 0 };
    const override = this._configuredEntity(def);
    if (override) {
      const stateObj = this._hass?.states?.[override];
      return {
        id: override,
        stateObj,
        available: !isUnavailableState(stateObj),
        definition: def
      };
    }
    const candidates = this._candidateIds(def);
    const exact = candidates.find((entityId) => this._hass?.states?.[entityId]);
    if (exact) {
      const stateObj = this._hass.states[exact];
      return {
        id: exact,
        stateObj,
        available: !isUnavailableState(stateObj),
        definition: def
      };
    }
    if (this._config.auto_discover && this._hass?.states) {
      const discovered = this._discoverEntity(def);
      if (discovered) return discovered;
    }
    const fallback = candidates[0] || "";
    return {
      id: fallback,
      stateObj: void 0,
      available: false,
      definition: def
    };
  }
  _configuredEntity(def) {
    for (const key of def.configKeys || []) {
      const value = this._config[key];
      if (typeof value === "string" && value.includes(".")) return value.trim();
    }
    return null;
  }
  _candidateIds(def) {
    return this._candidateObjectIds(def).map((objectId) => `${def.domain}.${objectId}`);
  }
  _candidateObjectIds(def) {
    const prefix = this._prefix();
    return (def.objectIds || []).map((objectId) => objectId.replaceAll("{p}", prefix));
  }
  _discoverEntity(def) {
    const prefix = this._prefix();
    const expectedObjectIds = this._candidateObjectIds(def);
    const expectedObjectIdSet = new Set(expectedObjectIds);
    const expectedSuffixes = new Set(expectedObjectIds.map((objectId) => objectId.startsWith(`${prefix}_`) ? objectId.slice(prefix.length + 1) : objectId));
    const entries = Object.entries(this._hass.states).filter(([entityId]) => entityId.startsWith(`${def.domain}.`));
    const scored = entries.map(([entityId, stateObj]) => {
      const objectId = entityId.slice(def.domain.length + 1);
      const name = stateObj?.attributes?.friendly_name || "";
      const haystack = normalizeText(`${objectId} ${name}`);
      const objectIdNormalized = normalizeText(objectId);
      let score = 0;
      let strongMatch = false;
      if (expectedObjectIdSet.has(objectId)) {
        strongMatch = true;
        score += 100;
      }
      for (const suffix of expectedSuffixes) {
        const normalizedSuffix = normalizeText(suffix);
        if (objectIdNormalized === normalizedSuffix || objectIdNormalized.endsWith(`_${normalizedSuffix}`)) {
          strongMatch = true;
          score += 70;
          break;
        }
      }
      if ((def.terms || []).some((term) => termMatches(haystack, term))) {
        strongMatch = true;
        score += 45;
      }
      if (!strongMatch) return { entityId, stateObj, score: 0 };
      score += entityHintScore(def, stateObj);
      if (objectId.startsWith(`${prefix}_`)) score += 8;
      if (objectId.includes(prefix)) score += 3;
      if (haystack.includes("dhe")) score += 2;
      if (!isUnavailableState(stateObj)) score += 1;
      return { entityId, stateObj, score };
    }).filter((item) => item.score >= 45).sort((a, b) => b.score - a.score);
    const best = scored[0];
    if (!best) return null;
    return {
      id: best.entityId,
      stateObj: best.stateObj,
      available: !isUnavailableState(best.stateObj),
      definition: def
    };
  }
  _prefix() {
    return slug(this._config.entity_prefix || DEFAULT_CONFIG.entity_prefix) || DEFAULT_CONFIG.entity_prefix;
  }
  _visible(entity) {
    if (!entity?.id) return false;
    if (entity.stateObj && entity.available) return true;
    return Boolean(this._config.show_unavailable && entity.id);
  }
  _stateText(entity, fallback = "n/a") {
    if (!entity?.stateObj) return fallback;
    if (isUnavailableState(entity.stateObj)) return "nicht verfuegbar";
    const unit = entity.stateObj.attributes?.unit_of_measurement;
    return `${entity.stateObj.state}${unit ? ` ${unit}` : ""}`;
  }
  _status() {
    const connection = this._entity("connection_state");
    if (connection.stateObj) {
      const state = String(connection.stateObj.state || "");
      return {
        label: state || "unbekannt",
        entityId: connection.id,
        tone: /connected|online|ok|verbunden/i.test(state) ? "ok" : /reconnect|start|pair/i.test(state) ? "warn" : "bad"
      };
    }
    const climate = this._entity("climate");
    if (climate.available) {
      return { label: "verbunden", entityId: climate.id, tone: "ok" };
    }
    if (climate.stateObj) {
      return { label: "nicht verfuegbar", entityId: climate.id, tone: "bad" };
    }
    return { label: "nicht gefunden", entityId: "", tone: "bad" };
  }
  _weatherTemperature(stateObj) {
    const value = numberValue(
      stateObj?.attributes?.temperature ?? stateObj?.attributes?.native_temperature ?? stateObj?.attributes?.apparent_temperature
    );
    return value === null ? "" : `${value.toFixed(value % 1 ? 1 : 0)} C`;
  }
  _weatherIcon(condition) {
    switch (condition) {
      case "sunny":
        return "mdi:weather-sunny";
      case "cloudy":
        return "mdi:weather-cloudy";
      case "rainy":
      case "pouring":
        return "mdi:weather-pouring";
      case "partlycloudy":
        return "mdi:weather-partly-cloudy";
      default:
        return "mdi:weather-partly-cloudy";
    }
  }
  _bindEvents() {
    this.shadowRoot.querySelectorAll("[data-more-info]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const entityId = event.currentTarget.dataset.moreInfo;
        if (entityId) this._moreInfo(entityId);
      });
    });
    this.shadowRoot.querySelectorAll("[data-toggle]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const entityId = event.currentTarget.dataset.toggle;
        if (entityId) this._call("homeassistant", "toggle", { entity_id: entityId });
      });
    });
    this.shadowRoot.querySelectorAll("[data-press]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const entityId = event.currentTarget.dataset.press;
        if (entityId) this._call("button", "press", { entity_id: entityId });
      });
    });
    this.shadowRoot.querySelectorAll("[data-temp-delta]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const target = event.currentTarget;
        this._changeTemperature(target.dataset.entity, Number(target.dataset.tempDelta));
      });
    });
    this.shadowRoot.querySelectorAll("[data-hvac-toggle]").forEach((element) => {
      element.addEventListener("click", (event) => {
        this._toggleHvac(event.currentTarget.dataset.hvacToggle);
      });
    });
    this.shadowRoot.querySelectorAll("[data-media-action]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const target = event.currentTarget;
        this._mediaAction(target.dataset.entity, target.dataset.mediaAction);
      });
    });
  }
  _changeTemperature(entityId, delta) {
    const stateObj = this._hass?.states?.[entityId];
    const current = numberValue(stateObj?.attributes?.temperature);
    if (!entityId || current === null || !Number.isFinite(delta)) return;
    const min = numberValue(stateObj?.attributes?.min_temp) ?? 20;
    const max = numberValue(stateObj?.attributes?.max_temp) ?? 60;
    const next = clamp(current + delta, min, max);
    this._call("climate", "set_temperature", { entity_id: entityId, temperature: next });
  }
  _toggleHvac(entityId) {
    const stateObj = this._hass?.states?.[entityId];
    if (!entityId || !stateObj) return;
    const hvacMode = stateObj.state === "off" ? "heat" : "off";
    this._call("climate", "set_hvac_mode", { entity_id: entityId, hvac_mode: hvacMode });
  }
  _mediaAction(entityId, action) {
    if (!entityId) return;
    const serviceMap = {
      play: "media_play",
      pause: "media_pause",
      next: "media_next_track",
      previous: "media_previous_track"
    };
    const service = serviceMap[action];
    if (service) this._call("media_player", service, { entity_id: entityId });
  }
  _call(domain, service, data) {
    if (!this._hass) return;
    const result = this._hass.callService(domain, service, data);
    if (result && typeof result.catch === "function") {
      result.catch((err) => {
        console.error("DHE Connect Card action failed", domain, service, err);
      });
    }
  }
  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId }
    }));
  }
  _style(accent) {
    return `
      <style>
        :host {
          display: block;
          --dhe-accent: ${accent.color};
          --dhe-accent-contrast: ${accent.contrast};
          --dhe-soft: color-mix(in srgb, var(--dhe-accent) 12%, var(--card-background-color, #fff));
          --dhe-border: color-mix(in srgb, var(--divider-color) 82%, var(--dhe-accent));
        }

        * {
          box-sizing: border-box;
          letter-spacing: 0;
        }

        ha-card {
          overflow: hidden;
          color: var(--primary-text-color);
        }

        button {
          min-width: 0;
          border: 0;
          color: inherit;
          font: inherit;
          cursor: pointer;
        }

        button[disabled] {
          cursor: default;
          opacity: 0.55;
          pointer-events: none;
        }

        .hero {
          display: grid;
          gap: 14px;
          padding: 16px;
          border-bottom: 1px solid var(--divider-color);
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--dhe-accent) 14%, transparent), transparent 46%),
            var(--card-background-color, #fff);
        }

        .hero-head,
        .temperature-row,
        .metrics,
        .temperature-actions,
        .inline-actions,
        .section-title,
        .diagnostic-row,
        .large-main {
          display: flex;
          align-items: center;
        }

        .hero-head {
          justify-content: space-between;
          gap: 12px;
        }

        .title-button {
          display: grid;
          gap: 3px;
          background: transparent;
          padding: 0;
          text-align: left;
        }

        .title-button span {
          color: var(--secondary-text-color);
          font-size: 11px;
          font-weight: 700;
        }

        .title-button strong {
          font-size: 20px;
          line-height: 1.15;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          max-width: 48%;
          border: 1px solid var(--dhe-border);
          border-radius: 999px;
          padding: 7px 10px;
          background: color-mix(in srgb, var(--card-background-color, #fff) 86%, var(--dhe-accent));
          font-size: 12px;
          white-space: nowrap;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--dhe-accent);
        }

        .hero.bad .dot {
          background: var(--error-color, #db4437);
        }

        .hero.warn .dot {
          background: var(--warning-color, #f4b400);
        }

        .temperature-row {
          justify-content: space-between;
          gap: 12px;
        }

        .temperature-main {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0;
          background: transparent;
          text-align: left;
        }

        .temperature-main ha-icon {
          width: 42px;
          height: 42px;
          color: var(--dhe-accent);
        }

        .temperature-main span,
        .large-main span {
          display: grid;
          min-width: 0;
        }

        .temperature-main strong {
          font-size: 40px;
          line-height: 1;
        }

        .temperature-main small,
        .temperature-now span,
        .metric span,
        .info-tile span,
        .action-tile span,
        .large-main small,
        .diagnostic-row span,
        .section-title {
          color: var(--secondary-text-color);
        }

        .temperature-now {
          display: grid;
          gap: 3px;
          justify-items: end;
          min-width: 80px;
          border: 1px solid var(--dhe-border);
          border-radius: 8px;
          padding: 10px 12px;
          background: color-mix(in srgb, var(--card-background-color, #fff) 88%, var(--dhe-soft));
        }

        .temperature-now strong {
          font-size: 18px;
        }

        .temperature-actions {
          gap: 8px;
        }

        .temperature-actions button,
        .inline-actions button {
          display: inline-grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border: 1px solid var(--dhe-border);
          border-radius: 8px;
          background: var(--card-background-color, #fff);
        }

        .temperature-actions button:first-child,
        .temperature-actions button:nth-child(2),
        .inline-actions button:nth-child(2) {
          background: var(--dhe-accent);
          border-color: var(--dhe-accent);
          color: white;
        }

        .metrics {
          flex-wrap: wrap;
          gap: 8px;
        }

        .metric {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 34px;
          max-width: 100%;
          border: 1px solid var(--dhe-border);
          border-radius: 999px;
          padding: 6px 10px;
          background: color-mix(in srgb, var(--card-background-color, #fff) 90%, var(--dhe-soft));
        }

        .metric ha-icon,
        .section-title ha-icon,
        .diagnostic-row ha-icon,
        .info-tile ha-icon,
        .large-main ha-icon {
          width: 19px;
          height: 19px;
          color: var(--dhe-accent);
        }

        .metric span,
        .metric strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
        }

        .body {
          display: grid;
          gap: 17px;
          padding: 16px;
        }

        .section {
          display: grid;
          gap: 10px;
        }

        .section-title {
          gap: 8px;
          font-size: 13px;
          font-weight: 750;
          text-transform: uppercase;
        }

        .action-grid,
        .info-grid,
        .wellness-grid,
        .memory-grid,
        .media-grid {
          display: grid;
          gap: 8px;
        }

        .action-grid {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .info-grid,
        .media-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .wellness-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .memory-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .action-tile,
        .info-tile,
        .memory-tile,
        .large-tile,
        .diagnostic-row {
          min-width: 0;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--dhe-soft));
        }

        .action-tile,
        .info-tile,
        .memory-tile {
          display: grid;
          gap: 6px;
          min-height: 78px;
          padding: 10px;
          text-align: left;
        }

        .action-tile {
          justify-items: center;
          text-align: center;
        }

        .action-tile.active {
          border-color: color-mix(in srgb, var(--dhe-accent) 72%, var(--divider-color));
          background: color-mix(in srgb, var(--dhe-accent) 14%, var(--card-background-color, #fff));
        }

        .action-tile.small,
        .memory-tile {
          min-height: 66px;
        }

        .action-tile ha-icon,
        .memory-tile ha-icon {
          color: var(--dhe-accent);
        }

        .action-tile span,
        .action-tile strong,
        .info-tile span,
        .info-tile strong,
        .memory-tile span,
        .memory-tile strong,
        .diagnostic-row strong,
        .large-main strong,
        .large-main small {
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .action-tile span,
        .action-tile strong,
        .info-tile span,
        .memory-tile span {
          font-size: 12px;
        }

        .info-tile strong,
        .memory-tile strong {
          font-size: 16px;
        }

        .large-tile {
          display: grid;
          gap: 10px;
          padding: 12px;
        }

        .large-main {
          gap: 10px;
          padding: 0;
          background: transparent;
          text-align: left;
        }

        .large-main ha-icon {
          width: 32px;
          height: 32px;
        }

        .large-main strong {
          font-size: 16px;
        }

        .inline-actions {
          gap: 6px;
        }

        .diagnostics {
          display: grid;
          gap: 6px;
        }

        .diagnostic-row {
          gap: 9px;
          width: 100%;
          padding: 10px 11px;
          text-align: left;
        }

        .diagnostic-row span {
          flex: 1;
        }

        .compact .hero {
          gap: 10px;
          padding: 13px;
        }

        .compact .body {
          gap: 12px;
          padding: 12px;
        }

        .compact .temperature-main strong {
          font-size: 34px;
        }

        @media (max-width: 540px) {
          .hero-head,
          .temperature-row {
            align-items: stretch;
          }

          .status {
            max-width: none;
          }

          .temperature-main strong {
            font-size: 34px;
          }

          .action-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .info-grid,
          .wellness-grid,
          .memory-grid,
          .media-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
  }
};
var DheConnectCardEditor = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._handleValueChanged = this._handleValueChanged.bind(this);
  }
  set hass(hass) {
    this._hass = hass;
    if (this._form) {
      this._form.hass = hass;
      return;
    }
    this._render();
  }
  setConfig(config) {
    this._config = migrateConfig(config);
    this._render();
  }
  _render() {
    if (!this.shadowRoot || !this._config) return;
    const formConfig = DheConnectCard.getConfigForm();
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        ha-form {
          display: block;
        }

        .error {
          color: var(--error-color);
          font-size: 12px;
          margin-top: 8px;
        }
      </style>
      <ha-form></ha-form>
      ${this._error ? `<div class="error">${html(this._error)}</div>` : ""}
    `;
    const form = this.shadowRoot.querySelector("ha-form");
    this._form = form;
    form.hass = this._hass;
    form.data = this._config;
    form.schema = formConfig.schema;
    form.computeLabel = formConfig.computeLabel;
    form.computeHelper = formConfig.computeHelper;
    form.addEventListener("value-changed", this._handleValueChanged);
  }
  _handleValueChanged(event) {
    event.stopPropagation();
    const formConfig = DheConnectCard.getConfigForm();
    const config = migrateConfig({ ...this._config, ...event.detail?.value || {} });
    try {
      formConfig.assertConfig?.(config);
      this._error = "";
      this._config = config;
      this.dispatchEvent(new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config }
      }));
    } catch (err) {
      this._error = err?.message || String(err);
      this._render();
    }
  }
};
function entityHintScore(def, stateObj) {
  if (!stateObj?.attributes) return 0;
  let score = 0;
  const deviceClass = normalizeText(stateObj.attributes.device_class);
  const unit = normalizeUnit(stateObj.attributes.unit_of_measurement);
  if (def.deviceClasses?.length && deviceClass) {
    if (def.deviceClasses.some((expected) => normalizeText(expected) === deviceClass)) {
      score += 14;
    } else {
      score -= 35;
    }
  }
  if (def.units?.length && unit) {
    if (def.units.some((expected) => normalizeUnit(expected) === unit)) {
      score += 10;
    } else {
      score -= 30;
    }
  }
  return score;
}
function normalizeUnit(value) {
  return normalizeText(value).replaceAll(" ", "").replaceAll("\xB0", "").replace("liters", "l").replace("liter", "l").replace("seconds", "s").replace("second", "s").replace("sec", "s");
}
function termMatches(haystack, term) {
  return normalizeText(term).split(/\s+/).filter(Boolean).every((part) => haystack.includes(part));
}
function findPrefixFromHass(hass) {
  const states = hass?.states || {};
  const climateId = Object.keys(states).find((entityId) => entityId.startsWith("climate.") && (entityId.endsWith("_water_heating") || normalizeText(states[entityId]?.attributes?.friendly_name).includes("water heating") || normalizeText(states[entityId]?.attributes?.friendly_name).includes("wasser")));
  if (!climateId) return DEFAULT_CONFIG.entity_prefix;
  return climateId.replace(/^climate\./, "").replace(/_water_heating$/, "").replace(/_wassererwarmung$/, "");
}
if (!customElements.get("dhe-connect-card-form-editor")) {
  customElements.define("dhe-connect-card-form-editor", DheConnectCardEditor);
}
if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, DheConnectCard);
} else {
  console.warn(
    `DHE Connect Card: custom element is already registered. If Home Assistant still shows the old editor, use custom:${CARD_TEST_TYPE} to verify the new bundle.`
  );
}
if (!customElements.get(CARD_TEST_TYPE)) {
  customElements.define(CARD_TEST_TYPE, DheConnectCard);
}
window.customCards = window.customCards || [];
var cardInfo = {
  type: CARD_TYPE,
  name: "DHE Connect Card",
  preview: true,
  description: `Dashboard-Karte fuer Stiebel DHE Connect mit GUI-Konfiguration (${CARD_VERSION}).`,
  documentationURL: "https://github.com/memphi2/dhe-connect-card"
};
var existingCardInfo = window.customCards.findIndex((card) => card.type === CARD_TYPE);
if (existingCardInfo >= 0) {
  window.customCards[existingCardInfo] = cardInfo;
} else {
  window.customCards.push(cardInfo);
}
if (!window.customCards.some((card) => card.type === CARD_TEST_TYPE)) {
  window.customCards.push({
    ...cardInfo,
    type: CARD_TEST_TYPE,
    name: "DHE Connect Card 0.4.2 Test",
    description: "Test-Alias fuer den neuen Editor, falls der alte Browser-Registry-Eintrag noch aktiv ist."
  });
}
console.info(
  `%c DHE Connect Card %c ${CARD_VERSION} `,
  "color: white; background: #0098a6; font-weight: 700;",
  "color: #0098a6; background: transparent; font-weight: 700;"
);
