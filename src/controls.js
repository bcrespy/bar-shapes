import config from "./config";

export default {
  object: config,
  controls: [
    [
      "grid",

      {
        property: "gridsize",
        min: 0, max: 300, step: 1,
        callback: () => { config.updateGrid(); }
      },

      {
        property: "barSize",
        min: 0, max: 0.5, step: 0.01,
        callback: () => { config.updateGrid(); }
      },

      {
        property: "gap",
        min: 0, max: 5, step: 0.01,
        callback: () => { config.updateGrid(); }
      }
    ]
  ]
}