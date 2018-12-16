import Creenv from "@creenv/core";

// ui elements
import HUD from "@creenv/hud";
import GUI from "@creenv/gui";
import Stats from "@creenv/stats";

// config + user controls 
import config from "./config";
import controls from "./controls";
import Visualizer from "./visualizer";

import Capture from "@creenv/capture";
import AudioManager from "@creenv/audio/manager";



class MyProject extends Creenv {
  constructor () {
    super();
    this.audio = new AudioManager(AudioManager.SOURCE_TYPE.FILE, {
      filepath: "assets/martin-books-flitzepulver-original-mix-carti-records-cut.wav",
      //feedback: false,
      analyser: {
        peakDetection: {
          options: {
            threshold: 1.45
          }
        }
      }
    }, true);
  }

  init() {
    super.init();
    super.framerate(60);

    //this.stats = new Stats();
    this.guiControls = new GUI(controls);
    this.hud = new HUD();
    //this.hud.add(this.stats);
    this.hud.add(this.guiControls);

    // we initialize our renderer
    this.visualizer = new Visualizer();

    return new Promise(resolve => {
      this.visualizer.init().then(() => {
        this.audio.init().then(resolve);
      });
    });
  }

  /**
   * will be called at each frame 
   */
  render() {
    //this.stats.begin();
    this.visualizer.render(this.deltaT, this.elapsedTime, this.audio.getAnalysedAudioData(this.deltaT, this.elapsedTime));
    //this.stats.end();
  }
}

let project = new MyProject();
//project.bootstrap(); 

new Capture(project, {
  framerate: 30,
  export: {
    type: "jpeg-sequence",
    framerate: 30,
    filename: "render.zip"
  },
  audio: {
    manager: project.audio
  }
});