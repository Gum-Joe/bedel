// API Entry
import { render } from 'react-dom';

global.bedel = {};

global.bedel.apps = [];
global.bedel.runApp = (name) => {
  render(global.bedel.apps[name], document.getElementById("app-container"));
};
global.bedel.installApp = (name, contents) => {
  global.bedel.apps[name] = contents;
  global.bedel.runApp(name);
};
