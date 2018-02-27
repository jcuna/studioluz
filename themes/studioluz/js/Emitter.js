import EventEmitter from 'events';

class Emitter extends EventEmitter {

  bind(events, fnc, el) {
    if (!Array.isArray(events)) {
      events = [events];
    }

    if (el === undefined) {
      el = window;
    }
    events.forEach(e => {
      el.addEventListener(e, event => {
        fnc(event);
      });
    });
  }
}

export default new Emitter();

