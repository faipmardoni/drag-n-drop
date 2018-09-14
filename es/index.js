import Diagram, { store } from './diagram/component';
import { setEntities, setCustom, addEntity, setError, setNotError, removeID } from './entity/reducer';
import { setConfig } from './config/reducer';
import diagramOn from './diagramOn/';

export { Diagram, diagramOn, store, setEntities, setConfig, setCustom, addEntity, setError, setNotError, removeID };