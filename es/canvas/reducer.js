var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import elemLayout from './elemLayout';

var addEntityHelper = function addEntityHelper(id) {
  return {
    anchoredEntity: { isAnchored: true, id: id }
  };
};

var canvasArtboardDimensions = function canvasArtboardDimensions(canvasViewportDimensions, canvasArtboardPosition, zoomLevel) {
  return {
    width: (canvasViewportDimensions.width - canvasArtboardPosition.x) * (1 / zoomLevel),
    height: (canvasViewportDimensions.height - canvasArtboardPosition.y) * (1 / zoomLevel)
  };
};

var configViewportHelper = function configViewportHelper(state) {
  var layoutData = elemLayout.get();
  return _extends({}, state, {
    canvasViewport: layoutData,
    canvasArtboard: _extends({}, state.canvasArtboard, canvasArtboardDimensions(layoutData, state.canvasArtboard, state.zoom))
  });
};

var canvasReducer = function canvasReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var scroll = arguments[2];
  switch (action.type) {
    case 'rd/canvas/CONFIG_VIEWPORT':
      return configViewportHelper(state);

    case 'rd/config/SET':
      return _extends({}, state, {
        gridSize: action.payload.gridSize
      });

    case 'rd/canvas/TRACK':
      return state.canvasAnchor.isMoving ? _extends({}, state, {
        canvasArtboard: _extends({}, canvasArtboardDimensions(state.canvasViewport, {
          x: action.payload.x - state.canvasViewport.x - state.canvasAnchor.coords.x * state.zoom,
          y: action.payload.y - state.canvasViewport.y - state.canvasAnchor.coords.y * state.zoom
        }, state.zoom), {
          x: action.payload.x - state.canvasViewport.x - state.canvasAnchor.coords.x * state.zoom,
          y: action.payload.y - state.canvasViewport.y - state.canvasAnchor.coords.y * state.zoom
        })
      }) : _extends({}, state, {
        cursor: {
          x: (action.payload.x - state.canvasViewport.x - state.canvasArtboard.x) * (1 / state.zoom),
          y: (action.payload.y - state.canvasViewport.y - state.canvasArtboard.y - scroll) * (1 / state.zoom)
        }
      });

    case 'rd/canvas/ZOOM':
      return _extends({}, state, {
        zoom: action.payload,
        canvasArtboard: _extends({}, state.canvasArtboard, canvasArtboardDimensions(state.canvasViewport, state.canvasArtboard, action.payload))
      });

    case 'rd/canvas/CONNECT':
      return _extends({}, state, {
        connecting: action.payload
      });

    case 'rd/canvas/ANCHOR_CANVAS':
      return _extends({}, state, {
        canvasAnchor: {
          isMoving: action.payload,
          coords: state.cursor
        }
      });

    case 'rd/canvas/ANCHOR_ENTITY':
      return _extends({}, state, {
        anchoredEntity: action.payload
      });

    case 'rd/entity/ADD':
      return _extends({}, configViewportHelper(state), addEntityHelper(action.payload.id));

    case 'rd/entity/ADD_LINKED':
      return _extends({}, configViewportHelper(state), addEntityHelper(action.payload.entity.id));

    case 'rd/entity/LINK_TO':
      return _extends({}, state, {
        connecting: {
          currently: false,
          from: ''
        }
      });

    case 'rd/canvas/MIN_HEIGHT':
      return _extends({}, state, {
        canvasArtboard: _extends({}, state.canvasArtboard, { minHeight: action.payload })
      });
    
    default:
      return state;
  }
};

export var configViewport = function configViewport(payload) {
  return {
    type: 'rd/canvas/CONFIG_VIEWPORT',
    payload: payload
  };
};

export var trackMovement = function trackMovement(payload) {
  return {
    type: 'rd/canvas/TRACK',
    payload: payload
  };
};

export var zoom = function zoom(payload) {
  return {
    type: 'rd/canvas/ZOOM',
    payload: payload
  };
};

export var connecting = function connecting(payload) {
  return {
    type: 'rd/canvas/CONNECT',
    payload: payload
  };
};

export var anchorEntity = function anchorEntity(_ref) {
  var _ref$isAnchored = _ref.isAnchored,
      isAnchored = _ref$isAnchored === undefined ? true : _ref$isAnchored,
      _ref$id = _ref.id,
      id = _ref$id === undefined ? '' : _ref$id;
  return {
    type: 'rd/canvas/ANCHOR_ENTITY',
    payload: { isAnchored: isAnchored, id: id }
  };
};

export var anchorCanvas = function anchorCanvas(payload) {
  return {
    type: 'rd/canvas/ANCHOR_CANVAS',
    payload: payload
  };
};

export var minHeightCanvas = function minHeightCanvas(payload) {
  return {
    type: 'rd/canvas/MIN_HEIGHT',
    payload: payload
  };
};

export default canvasReducer;