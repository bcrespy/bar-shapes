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
    ],

    [
      "points",
      
      {
        object: config.points,
        property: "size",
        min: 0, max: 50, step: 1
      },

      {
        object: config.points,
        property: "gap",
        min: 0, max: 100, step: 1,
      },

      {
        object: config.points,
        property: "invert"
      },

      {
        object: config.points,
        property: "invertAll"
      },

      {
        object: config.points,
        property: "greyscale",
        min: 0, max: 1.0, step: 0.001,
      },

      {
        object: config.points,
        property: "contrast",
        min: 0, max: 5.0, step: 0.001,
      },
    ],

    [
      "distorsion",

      {
        property: "stretch",
        min: 0, max: 1.0, step: 0.001
      },

      {
        property: "distanceMin",
        min: 0, max: 0.2, step: 0.001
      },

      {
        property: "distanceRange",
        min: 0, max: 0.2, step: 0.001
      }
    ],

    {
      property: "shiftStrength",
      min: 0, max: 0.1, step: 0.000001
    }
  ]
}