export default {

  // the size of the bars grid 
  gridsize: 60, //60

  // length / width of a bar 
  barSize: 0.15, //0.15

  // gap between bars
  gap: 0.00,

  // this function will be programmatically set 
  updateGrid: () => { console.log("should be set to update the grid") },

  // size and gap of the points 
  points: {
    size: 2, 
    gap: 80,
    invert: true,
    invertAll: true,
    greyscale: 1.0,
    contrast: 1.5
  },

  // the strength of the displacement
  stretch: 0.7,
  distanceMin: 0.02,
  distanceRange: 0.06,

  // the rgb shift
  shiftStrength: 0.02

};