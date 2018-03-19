import '../css/header.scss'
import '../css/sections.scss'
import FocalPoint from './FocalPoint'
import emitter from './Emitter';

class Index {
  constructor() {
    // console.log('yay')
  }
}

new Index();

const focalPoint = new FocalPoint(80, 122);
focalPoint.applyFocalPoint();
emitter.bind(['resize', 'orientationChange'], focalPoint.applyFocalPoint.bind(focalPoint));

if (focalPoint.IPE !== null) {
  focalPoint.addFocalSelector();
}


