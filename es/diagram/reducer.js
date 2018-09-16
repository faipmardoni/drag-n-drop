import entityReducer, { metaEntityReducer, entityRemovedReducer, scrollCanvasReducer } from '../entity/reducer';
import canvasReducer from '../canvas/reducer';
import configReducer from '../config/reducer';
import history from '../history/reducer';

var defaultCoords = { x: 0, y: 0 };
var initialState = {
  entity: [],
  metaEntity: [],
  entityRemoved: '',
  scroll: 0,
  canvas: {
    cursor: defaultCoords,
    canvasViewport: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    },
    canvasArtboard: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      minHeight: 100
    },
    connecting: {
      currently: false,
      from: ''
    },
    anchoredEntity: {
      isAnchored: false,
      id: ''
    },
    canvasAnchor: {
      isMoving: false,
      coords: defaultCoords
    },
    zoom: 1
  },
  config: {
    entityTypes: {}
  },
  history: {
    past: [],
    future: [],
    lastAction: '@@INIT'
  },
  lastAction: '@@INIT'
};

var appReducer = function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  return {
    canvas: canvasReducer(state.canvas, action, state.scroll),
    entityRemoved: entityRemovedReducer(state.entityRemoved, action),
    scroll: scrollCanvasReducer(state.scroll, action),
    entity: entityReducer(state.entity, action, state.metaEntity, state.canvas, state.scroll),
    metaEntity: metaEntityReducer(state.metaEntity, action, state.entity, state.canvas, state.scroll),
    config: configReducer(state.config, action),
    history: state.history,
    lastAction: action.type
  };
};

export default history(appReducer);