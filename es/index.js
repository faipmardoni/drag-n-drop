import Diagram, { store } from './diagram/component';
import { setEntities, setCustom, addEntity,setError, setNotError, removeID, addScroll } from './entity/reducer';
import { setConfig } from './config/reducer';
import { minHeightCanvas, zoom } from './canvas/reducer';
import { undo, redo } from './history/reducer';
import diagramOn from './diagramOn/';

export { Diagram, diagramOn, store, setEntities, setConfig, setCustom, addEntity, setError, setNotError, removeID, addScroll, minHeightCanvas, zoom, undo, redo };