/*
 * the essential jetpack build. mainly to keep es6 imports small.
 * contains what's good about jetpack, except:
 *  - transition hacks
 *  - wordwrap
 *  - conventions
 *  - drawAxis
 *  - attachTooltip
 *  - loadData
 *  - polygonClip
 *  - timer, interval, timeout
 *
 * use at your own risk!
 */

import {selection} from "d3-selection";

import translateSelection from "./src/translate-selection.js";
import append from "./src/append.js";
import insert from "./src/insert.js";
import parent from "./src/parent.js";
import selectAppend from "./src/selectAppend.js";
import tspans from "./src/tspans.js";
import appendMany from "./src/appendMany.js";
import at from "./src/at.js";
import st from "./src/st.js";

selection.prototype.translate = translateSelection;
selection.prototype.append = append;
selection.prototype.insert = insert;
selection.prototype.parent = parent;
selection.prototype.selectAppend = selectAppend;
selection.prototype.tspans = tspans;
selection.prototype.appendMany = appendMany;
selection.prototype.at = at;
selection.prototype.st = st;
selection.prototype.prop = selection.prototype.property;

export {default as parseAttributes} from "./src/parseAttributes.js";
export {default as f} from "./src/f.js";
export {default as ascendingKey} from "./src/ascendingKey.js";
export {default as descendingKey} from "./src/descendingKey.js";
export {default as nestBy} from "./src/nestBy.js";
export {default as round} from "./src/round.js";
export {default as clamp} from "./src/clamp.js";
