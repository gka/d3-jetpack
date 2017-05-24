import {selection} from "d3-selection";
import {transition} from "d3-transition";

import translateSelection from "./src/translate-selection";
import append from "./src/append";
import insert from "./src/insert";
import parent from "./src/parent";
import selectAppend from "./src/selectAppend";
import tspans from "./src/tspans";
import appendMany from "./src/appendMany";
import at from "./src/at";
import st from "./src/st";

selection.prototype.translate = translateSelection;
transition.prototype.translate = translateSelection;
selection.prototype.append = append;
selection.prototype.insert = insert;
selection.prototype.parent = parent;
selection.prototype.selectAppend = selectAppend;
selection.prototype.tspans = tspans;
selection.prototype.appendMany = appendMany;
selection.prototype.at = at;
selection.prototype.st = st;
transition.prototype.at = at;
transition.prototype.st = st;
selection.prototype.prop = selection.prototype.property;

export {default as wordwrap} from "./src/wordwrap";
export {default as parseAttributes} from "./src/parseAttributes";
export {default as f} from "./src/f";
export {default as ascendingKey} from "./src/ascendingKey";
export {default as descendingKey} from "./src/descendingKey";
export {default as conventions} from "./src/conventions";
export {default as attachTooltip} from "./src/attachTooltip";
export {default as loadData} from "./src/loadData";
export {default as nestBy} from "./src/nestBy";
export {default as round} from "./src/round";
export {default as clamp} from "./src/clamp";
export {default as polygonClip} from "./src/polygonClip";