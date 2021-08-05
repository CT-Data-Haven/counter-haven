/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ \"./node_modules/d3/src/index.js\");\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _modules_renderIntro_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/renderIntro.js */ \"./src/modules/renderIntro.js\");\n/* eslint-disable no-var */\n\n/* previously this was a giant file containing code for every map and coming in at some 900 lines\r\nthat technically worked but global scope was so polluted. So I split each map into functions exported by their own modules,\r\nwith each module receiving one input (the map) and having access to no other global variables.\r\n\r\nThis forces me to elimninate all but the strictly, strictly necessary global variables. It involves some minor violation of the DRY principle\r\nbut for overall increased readability.\r\n*/\n\n\n\n // import renderProperties from './modules/renderProperties.js'\n\nmapbox_gl__WEBPACK_IMPORTED_MODULE_1__.accessToken = \"pk.eyJ1IjoibmF0aGFuY2tpbTE4IiwiYSI6ImNrcXg0cjlueTBwdGYydm56M2puemFybWEifQ.xzGAUbt_oLKoYmoHnz75WA\";\nvar map = new mapbox_gl__WEBPACK_IMPORTED_MODULE_1__.Map({\n  container: 'map',\n  style: 'mapbox://styles/nathanckim18/ckmvgk5g10i8017mv4fmwme8j',\n  minZoom: 11.5,\n  maxZoom: 16.5,\n  zoom: 12,\n  center: [-72.959704, 41.31099],\n  maxBounds: [[-73.21036, 41.22615], [-72.74838, 41.39701]]\n});\nmap.on('load', function () {\n  console.log(map);\n  map.addSource('gridVideoSource', {\n    'type': 'video',\n    'urls': ['assets/grid.mp4'],\n    'coordinates': [[-73.130985, 41.392116], [-72.706979, 41.393416], [-72.705430, 41.212327], [-73.130295, 41.213888]]\n  }).addLayer({\n    'id': 'gridVideoLayer',\n    'type': 'raster',\n    'source': 'gridVideoSource',\n    'paint': {\n      'raster-opacity': 0\n    }\n  }, 'settlement-subdivision-label'); // moving mapbox attribution to the bottom left\n\n  var attr = d3__WEBPACK_IMPORTED_MODULE_0__.selectAll('.mapboxgl-ctrl-attrib,.mapboxgl-ctrl-logo').nodes();\n  var attrDiv = d3__WEBPACK_IMPORTED_MODULE_0__.selectAll('#attribution').node();\n  attrDiv.appendChild(attr[0]);\n  attrDiv.appendChild(attr[1]); // there must be a better way to do this?\n\n  d3__WEBPACK_IMPORTED_MODULE_0__.selectAll('.mapboxgl-ctrl.mapboxgl-ctrl-attrib,.mapboxgl-ctrl-logo').transition().duration(1500).style('opacity', 1);\n});\n(0,_modules_renderIntro_js__WEBPACK_IMPORTED_MODULE_3__.default)(map);\n/*\r\nconst filenames = ['static/data/native_land.geojson',\r\n  'static/data/holc.geojson', 'static/data/nhv_neighborhoods.geojson',\r\n  'static/data/world_map.geojson']\r\n*/\n\n//# sourceURL=webpack://new_haven_map/./src/index.js?");

/***/ }),

/***/ "./src/modules/renderIntro.js":
/*!************************************!*\
  !*** ./src/modules/renderIntro.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ \"./node_modules/d3/src/index.js\");\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\n\n\n\nvar renderIntro = function renderIntro(map) {\n  // Section 1: Animation functions that will be called in d3.timer() to update the canvas\n  // Given a snake (defined as a two element array, the first being geometries and the second being block IDs)\n  // with index i in the snakesArray (the entire collection of snakes),\n  // this function either picks a random place and color or pushes a new block onto the snake to \"extend\" it\n  var updateSnake = function updateSnake(snake, i, snakesArray) {\n    var tDiscrete = tDiscreteArray[i];\n    var snakeShapes;\n    var snakeIDs;\n\n    if (tDiscrete == 0 || oldTDiscrete[0] == -1) {\n      // if iDiscrete is 0 or oldTDiscrete is -1, that means a new snake should be started instead of an old snake appended to\n      snakeColors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16); // generate a random color. idk where that number came from lmao\n\n      snakeIDs = [Math.floor(Math.random() * 1494)]; // pick a random block and put its ID into this array of IDs of the blocks in the snake so that we can make sure not to add a block that's already in the snake later on\n\n      snakeShapes = [dta.features[snakeIDs]]; // the corresponding geometry as a one-element array\n    } else {\n      snakeShapes = snake[0];\n      snakeIDs = snake[1]; // neighbors array of last census block in the snake: some choices for what to add to the snake next\n\n      var nbors = snakeShapes.slice(-1)[0].properties.neighbors;\n      nbors = nbors.filter(function (x) {\n        return snakeIDs.indexOf(x - 1) < 0;\n      })[0]; // get the first item in that neighbors array that doesn't overlap with what's already in the snake\n\n      snakeIDs.push(nbors - 1); // add the corresponding geometry to the snake\n\n      snakeShapes.push(dta.features[nbors - 1]);\n    }\n\n    if (snakeShapes.length > 15) {\n      // make sure there's only 15 elements in the snake at a time; just remove the first one to keep the snake moving\n      snakeIDs.shift();\n    }\n\n    snakesArray[i] = [snakeShapes, snakeIDs];\n  }; // Given a dash array offset, an array describing the length of a dash and gap, alpha, and time,\n  // this function 1) draws the blocks, 2) makes a blue \"wave\" spreading out from the center of New Haven, and\n  // 3) renders \"snakes\" as updated by the updateSnake function above.\n\n\n  var drawFrame = function drawFrame() {\n    var dashOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var lineDash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];\n    var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;\n    var t = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n    // the main area, aka the blocks\n    ctx.save();\n    ctx.clearRect(0, 0, width, height);\n    ctx.beginPath();\n    ctx.lineWidth = 0.5;\n    ctx.globalAlpha = alpha;\n    ctx.lineDashOffset = dashOffset;\n    ctx.fillStyle = '#F7F7F7';\n    ctx.setLineDash(lineDash);\n    path(dta);\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath(); // the \"wave\": make an eight-layer fill\n\n    ctx.beginPath();\n    ctx.fillStyle = '#038cfc';\n    Array(8).fill(0).forEach(function (_, i) {\n      // filter for the properties between given distances away from the new haven green\n      var subset = dta.features.filter(function (d) {\n        return d.properties.dist < t - .05 * i && d.properties.dist > t - 0.05 * (i + 1);\n      });\n      ctx.globalAlpha = .5 - i * .1;\n      console.log(subset);\n      path({\n        type: 'FeatureCollection',\n        crs: {\n          type: 'name',\n          properties: {\n            name: 'urn:ogc:def:crs:OGC:1.3:CRS84'\n          }\n        },\n        features: subset\n      });\n      ctx.fill();\n    });\n    ctx.closePath(); // draw the snakes too\n    // feel a little bit bad about this below chunk because it's so many calls to the canvas\n    // but because alphas, colors, geometries are different there does need to be many calls i think? how cna i batch them?\n\n    snakes.forEach(function (snake, snakeIndex) {\n      snake[0].forEach(function (d, i) {\n        ctx.beginPath();\n        ctx.fillStyle = snakeColors[snakeIndex];\n        ctx.globalAlpha = .07 * i;\n        path({\n          type: 'FeatureCollection',\n          crs: {\n            type: 'name',\n            properties: {\n              name: 'urn:ogc:def:crs:OGC:1.3:CRS84'\n            }\n          },\n          features: [d]\n        });\n        ctx.fill();\n        ctx.restore();\n      });\n    });\n  }; // This function combines drawFrame() and updateSnake() to actually run the intro animation\n\n\n  var animate = function animate() {\n    timer = d3__WEBPACK_IMPORTED_MODULE_0__.timer(function (elapsed) {\n      // I want the fade-in animation to take 6 seconds and the starting gap to be 200 units ->\n      var t = elapsed / 6000; // t = 1 at 6 seconds. The length of a single \"cycle\" of animation\n      // version of t from 1 to 64 on a slightly offset cycle\n\n      tDiscreteArray = Array(4).fill(0).map(function (_, i) {\n        return Math.floor(64 * (1.1 * t * (i + 1) - Math.floor(1.1 * t * (i + 1))));\n      }); // is the new set of timekeepers the same as the old set of timekeepers?\n\n      var timeUnchanged = oldTDiscrete.every(function (d, i) {\n        return d === tDiscreteArray[i];\n      }); // if not (if more than one unit of time has passed), or if this is the first run\n\n      if (!timeUnchanged || oldTDiscrete[0] === -1) snakes.forEach(updateSnake);\n\n      if (t < 1) {\n        // fade-in: draw the dash array and increase opacity\n        drawFrame(0, [25 * t, 25 - 15 * t], t, 1.5 * t - Math.floor(1.5 * t));\n      } else {\n        // just move the shapes after that by incrementing the dash offset\n        // keep moving opacity and dash array as they were at the end of the fade-in\n        dashOffset = -(t - 1) * 50; // only updating it here so that it can be referred to by other functions here\n\n        drawFrame(dashOffset, [25, 10], 1, 1.5 * t - Math.floor(1.5 * t));\n      }\n\n      oldTDiscrete = Object.assign([], tDiscreteArray); // update the \"old t\" with a deep copy\n    });\n  }; // And this function does the opposite by running drawFrame \"backwards\" and erasing the canvas\n\n\n  var animateOut = function animateOut() {\n    timer.stop();\n    map.easeTo({\n      duration: 250,\n      zoom: 13,\n      center: [-72.931, 41.31099]\n    }); // preloads the grid video animation, which comes after the following map (e.g. load in advance)\n\n    map.getSource('gridVideoSource').getVideo().loop = false; // as before, but animate out\n\n    timer = d3__WEBPACK_IMPORTED_MODULE_0__.timer(function (elapsed) {\n      var t = d3__WEBPACK_IMPORTED_MODULE_0__.easeLinear(elapsed / 750); // represents time, sort of\n\n      if (t < 1) {\n        drawFrame(dashOffset, [200 - 100 * t, 50 + 75 * t]); // 200, 50,1 -> 0, 200, 0 over 2 seconds; alpha starts decreasing at 1 second in\n      } else if (t > 1 && t < 2) {\n        drawFrame(dashOffset, [200 - 100 * t, 50 + 75 * t], 2 - t);\n        d3__WEBPACK_IMPORTED_MODULE_0__.selectAll('.mapboxgl-canvas').style('opacity', t - 1);\n      } else {\n        // canvas was covering up mapbox click events before\n        // we're not going to take it off of the DOM though because we'll still use it for the world map\n        canvas.style('display', 'none');\n        timer.stop();\n      }\n    });\n  }; // __________________________________________________________________________________________________\n  // Section 2: Variables needed as setup, like initializing the canvas, getting a map projection, etc.\n\n\n  var canvas = d3__WEBPACK_IMPORTED_MODULE_0__.select('#map').select('canvas#container');\n  var ctx = canvas.node().getContext('2d');\n  var width = window.innerWidth;\n  var height = window.innerHeight;\n  canvas.attr('width', width * window.devicePixelRatio).attr('height', height * window.devicePixelRatio).style('width', width + 'px').style('height', height + 'px');\n  ctx.scale(window.devicePixelRatio, window.devicePixelRatio); // projection function that only works within a geotransform stream (otherwise the \"this\" reference breaks)\n  // also don't change the function(){} to arrow syntax here, that also breaks the \"this\" keyword\n\n  var projectStream = function projectStream(lon, lat) {\n    // the \"rosetta stone\" between mapbox gl and d3\n    var point = map.project(new mapbox_gl__WEBPACK_IMPORTED_MODULE_1__.LngLat(lon, lat)); // eslint-disable-next-line no-invalid-this\n\n    return this.stream.point(point.x, point.y);\n  }; // see https://franksh.com/posts/d3-mapboxgl/ and https://bl.ocks.org/shimizu/5f4cee0fddc7a64b55a9\n\n\n  var transform = d3__WEBPACK_IMPORTED_MODULE_0__.geoTransform({\n    point: projectStream\n  });\n  var path = d3__WEBPACK_IMPORTED_MODULE_0__.geoPath().projection(transform).context(ctx);\n  d3__WEBPACK_IMPORTED_MODULE_0__.selectAll('.map-overlay#story').append('text').text('Map 0: Intro animation. Explanatory text will eventually go here.');\n  d3__WEBPACK_IMPORTED_MODULE_0__.selectAll('.map-overlay#nextBox').append('button').on('click', animateOut).text('Click me to move on.');\n  var snakes = Array(4).fill(Array(2).fill(0));\n  var snakeColors = Array(4); // a discrete time variable and a placeholder version to compare it against to see if enough time has passed\n\n  var oldTDiscrete = Array(4).fill(-1);\n  var tDiscreteArray = Array(4).fill(0);\n  var dta;\n  var timer;\n  var dashOffset; // Section 3: Beginning the animation in a d3.timer()\n\n  d3__WEBPACK_IMPORTED_MODULE_0__.json('../assets/data/intro_nhv.json').then(function (processed) {\n    dta = processed;\n    console.log(dta);\n    animate();\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderIntro);\n\n//# sourceURL=webpack://new_haven_map/./src/modules/renderIntro.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"html, body {\\r\\n   margin: 0;\\r\\n   padding: 0;\\r\\n   height: 100%;\\r\\n   overflow-y: hidden;\\r\\n}\\r\\n\\r\\nsvg {\\r\\n  z-index: 4;\\r\\n  position: fixed;\\r\\n}\\r\\n\\r\\ntext {\\r\\n  font-family: \\\"Lato\\\", sans-serif;\\r\\n}\\r\\n\\r\\n\\r\\n#container {\\r\\n  pointer-events: none;\\r\\n}\\r\\n\\r\\n#map {\\r\\n  position: absolute;\\r\\n  top: 0;\\r\\n  bottom: 0;\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n}\\r\\n\\r\\n#static {\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    grid-column: 1;\\r\\n    grid-row: 1;\\r\\n}\\r\\n\\r\\n\\r\\n/* EVERYTHING IN THE SIDEBAR SHOULD BE HASHED OUT HERE\\r\\n*/\\r\\n#story {\\r\\n  top: 0;\\r\\n  left: 1%;\\r\\n  height: 99.5%;\\r\\n  margin-top: 0.5%;\\r\\n  width: max(30%, 360px); /* 360px is the length of the mapbox logo attribution plus the mapbox text attribution */\\r\\n  z-index: 5;\\r\\n  display: grid;\\r\\n  grid-template-rows: [title] 10% [story-body] auto [nextButton] 5% [attribution] 5%;\\r\\n  justify-content: left;\\r\\n}\\r\\n\\r\\n#projectTitle{\\r\\n  grid-row-start: title;\\r\\n  grid-row-end: story-body;\\r\\n}\\r\\n\\r\\n#nextBox {\\r\\n  grid-row-start: nextButton;\\r\\n  grid-row-end: attribution;\\r\\n  z-index: 4;\\r\\n}\\r\\n\\r\\n#attribution {\\r\\n  width: 100%;\\r\\n  grid-row-start: attribution;\\r\\n  z-index: 5;\\r\\n  display: grid;\\r\\n  grid-template-columns: [logoattr] auto [textattr] auto;\\r\\n  justify-content: left;\\r\\n  align-items: center;\\r\\n  font-size: 11px;\\r\\n  overflow-y: hidden;\\r\\n  margin-bottom: 5px;\\r\\n}\\r\\n\\r\\nbutton {\\r\\n  background:none;\\r\\n  border:none;\\r\\n  font-family: 'Lato', sans-serif;\\r\\n  font-size: 14px;\\r\\n  text-decoration: underline;\\r\\n  cursor:pointer;\\r\\n  justify-content: left;\\r\\n}\\r\\n\\r\\n/* start off the attribution as opacity 0 so that it can be faded in, instead of abruptly teleporting */\\r\\n.mapboxgl-ctrl.mapboxgl-ctrl-attrib {\\r\\n  opacity: 0;\\r\\n}\\r\\n.mapboxgl-ctrl-logo {\\r\\n  opacity: 0\\r\\n}\\r\\n\\r\\n.map-overlay {\\r\\n  position: absolute;\\r\\n  bottom: 0;\\r\\n  right: 0;\\r\\n  background: rgba(255, 255, 255, 0.9);\\r\\n  font-family: \\\"Lato\\\", sans-serif;\\r\\n  overflow: auto;\\r\\n  border-radius: 3px;\\r\\n  z-index: 5;\\r\\n}\\r\\n\\r\\n.nation:hover{\\r\\n  stroke: #fff;\\r\\n  stroke-width: 1px;\\r\\n}\\r\\n.mapboxgl-popup {\\r\\n  z-index: 4;\\r\\n}\\r\\n.mapboxgl-canvas {\\r\\n  opacity: 0;\\r\\n  position: absolute;\\r\\n}\\r\\n\\r\\n\\r\\ndiv.tooltip {\\r\\n  z-index: 20;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n\\r\\n  text-align: left;\\r\\n\\r\\n  position: absolute;\\r\\n  width: 300px;\\r\\n  height: fit-content;\\r\\n  padding: 2px;\\r\\n  font-family: 'Lato';\\r\\n  font: 12px;\\r\\n  background: #F7F7F7;\\r\\n  border: 3px solid lightsteelblue;\\r\\n  border-radius: 8px;\\r\\n}\\r\\n\\r\\n/* legend */\\r\\n\\r\\n#legend {\\r\\n  padding: 10px;\\r\\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\\r\\n  line-height: 18px;\\r\\n  margin-bottom: 40px;\\r\\n  z-index: 4;\\r\\n}\\r\\n\\r\\n.legend-key {\\r\\n  display: inline-block;\\r\\n  border-radius: 20%;\\r\\n  width: 10px;\\r\\n  height: 10px;\\r\\n  margin-right: 5px;\\r\\n  z-index: 4;\\r\\n}\\r\\n.mapboxgl-popup-content {\\r\\n  font-family: \\\"Lato\\\", sans-serif;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://new_haven_map/./src/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://new_haven_map/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/d3-array/src/fsum.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-array/src/fsum.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Adder\": () => (/* binding */ Adder)\n/* harmony export */ });\n/* unused harmony exports fsum, fcumsum */\n// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423\nclass Adder {\n  constructor() {\n    this._partials = new Float64Array(32);\n    this._n = 0;\n  }\n  add(x) {\n    const p = this._partials;\n    let i = 0;\n    for (let j = 0; j < this._n && j < 32; j++) {\n      const y = p[j],\n        hi = x + y,\n        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);\n      if (lo) p[i++] = lo;\n      x = hi;\n    }\n    p[i] = x;\n    this._n = i + 1;\n    return this;\n  }\n  valueOf() {\n    const p = this._partials;\n    let n = this._n, x, y, lo, hi = 0;\n    if (n > 0) {\n      hi = p[--n];\n      while (n > 0) {\n        x = hi;\n        y = p[--n];\n        hi = x + y;\n        lo = y - (hi - x);\n        if (lo) break;\n      }\n      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {\n        y = lo * 2;\n        x = hi + y;\n        if (y == x - hi) hi = x;\n      }\n    }\n    return hi;\n  }\n}\n\nfunction fsum(values, valueof) {\n  const adder = new Adder();\n  if (valueof === undefined) {\n    for (let value of values) {\n      if (value = +value) {\n        adder.add(value);\n      }\n    }\n  } else {\n    let index = -1;\n    for (let value of values) {\n      if (value = +valueof(value, ++index, values)) {\n        adder.add(value);\n      }\n    }\n  }\n  return +adder;\n}\n\nfunction fcumsum(values, valueof) {\n  const adder = new Adder();\n  let index = -1;\n  return Float64Array.from(values, valueof === undefined\n      ? v => adder.add(+v || 0)\n      : v => adder.add(+valueof(v, ++index, values) || 0)\n  );\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-array/src/fsum.js?");

/***/ }),

/***/ "./node_modules/d3-brush/src/brush.js":
/*!********************************************!*\
  !*** ./node_modules/d3-brush/src/brush.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* unused harmony exports brushSelection, brushX, brushY */\n/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-dispatch */ \"./node_modules/d3-dispatch/src/dispatch.js\");\n/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! d3-drag */ \"./node_modules/d3-drag/src/nodrag.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/value.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/select.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/pointer.js\");\n/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-transition */ \"./node_modules/d3-transition/src/index.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-brush/src/constant.js\");\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event.js */ \"./node_modules/d3-brush/src/event.js\");\n/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./noevent.js */ \"./node_modules/d3-brush/src/noevent.js\");\n\n\n\n\n\n\n\n\n\nvar MODE_DRAG = {name: \"drag\"},\n    MODE_SPACE = {name: \"space\"},\n    MODE_HANDLE = {name: \"handle\"},\n    MODE_CENTER = {name: \"center\"};\n\nconst {abs, max, min} = Math;\n\nfunction number1(e) {\n  return [+e[0], +e[1]];\n}\n\nfunction number2(e) {\n  return [number1(e[0]), number1(e[1])];\n}\n\nvar X = {\n  name: \"x\",\n  handles: [\"w\", \"e\"].map(type),\n  input: function(x, e) { return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]]; },\n  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }\n};\n\nvar Y = {\n  name: \"y\",\n  handles: [\"n\", \"s\"].map(type),\n  input: function(y, e) { return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]]; },\n  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }\n};\n\nvar XY = {\n  name: \"xy\",\n  handles: [\"n\", \"w\", \"e\", \"s\", \"nw\", \"ne\", \"sw\", \"se\"].map(type),\n  input: function(xy) { return xy == null ? null : number2(xy); },\n  output: function(xy) { return xy; }\n};\n\nvar cursors = {\n  overlay: \"crosshair\",\n  selection: \"move\",\n  n: \"ns-resize\",\n  e: \"ew-resize\",\n  s: \"ns-resize\",\n  w: \"ew-resize\",\n  nw: \"nwse-resize\",\n  ne: \"nesw-resize\",\n  se: \"nwse-resize\",\n  sw: \"nesw-resize\"\n};\n\nvar flipX = {\n  e: \"w\",\n  w: \"e\",\n  nw: \"ne\",\n  ne: \"nw\",\n  se: \"sw\",\n  sw: \"se\"\n};\n\nvar flipY = {\n  n: \"s\",\n  s: \"n\",\n  nw: \"sw\",\n  ne: \"se\",\n  se: \"ne\",\n  sw: \"nw\"\n};\n\nvar signsX = {\n  overlay: +1,\n  selection: +1,\n  n: null,\n  e: +1,\n  s: null,\n  w: -1,\n  nw: -1,\n  ne: +1,\n  se: +1,\n  sw: -1\n};\n\nvar signsY = {\n  overlay: +1,\n  selection: +1,\n  n: -1,\n  e: null,\n  s: +1,\n  w: null,\n  nw: -1,\n  ne: -1,\n  se: +1,\n  sw: +1\n};\n\nfunction type(t) {\n  return {type: t};\n}\n\n// Ignore right-click, since that should open the context menu.\nfunction defaultFilter(event) {\n  return !event.ctrlKey && !event.button;\n}\n\nfunction defaultExtent() {\n  var svg = this.ownerSVGElement || this;\n  if (svg.hasAttribute(\"viewBox\")) {\n    svg = svg.viewBox.baseVal;\n    return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];\n  }\n  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];\n}\n\nfunction defaultTouchable() {\n  return navigator.maxTouchPoints || (\"ontouchstart\" in this);\n}\n\n// Like d3.local, but with the name “__brush” rather than auto-generated.\nfunction local(node) {\n  while (!node.__brush) if (!(node = node.parentNode)) return;\n  return node.__brush;\n}\n\nfunction empty(extent) {\n  return extent[0][0] === extent[1][0]\n      || extent[0][1] === extent[1][1];\n}\n\nfunction brushSelection(node) {\n  var state = node.__brush;\n  return state ? state.dim.output(state.selection) : null;\n}\n\nfunction brushX() {\n  return brush(X);\n}\n\nfunction brushY() {\n  return brush(Y);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return brush(XY);\n}\n\nfunction brush(dim) {\n  var extent = defaultExtent,\n      filter = defaultFilter,\n      touchable = defaultTouchable,\n      keys = true,\n      listeners = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_4__.default)(\"start\", \"brush\", \"end\"),\n      handleSize = 6,\n      touchending;\n\n  function brush(group) {\n    var overlay = group\n        .property(\"__brush\", initialize)\n      .selectAll(\".overlay\")\n      .data([type(\"overlay\")]);\n\n    overlay.enter().append(\"rect\")\n        .attr(\"class\", \"overlay\")\n        .attr(\"pointer-events\", \"all\")\n        .attr(\"cursor\", cursors.overlay)\n      .merge(overlay)\n        .each(function() {\n          var extent = local(this).extent;\n          (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__.default)(this)\n              .attr(\"x\", extent[0][0])\n              .attr(\"y\", extent[0][1])\n              .attr(\"width\", extent[1][0] - extent[0][0])\n              .attr(\"height\", extent[1][1] - extent[0][1]);\n        });\n\n    group.selectAll(\".selection\")\n      .data([type(\"selection\")])\n      .enter().append(\"rect\")\n        .attr(\"class\", \"selection\")\n        .attr(\"cursor\", cursors.selection)\n        .attr(\"fill\", \"#777\")\n        .attr(\"fill-opacity\", 0.3)\n        .attr(\"stroke\", \"#fff\")\n        .attr(\"shape-rendering\", \"crispEdges\");\n\n    var handle = group.selectAll(\".handle\")\n      .data(dim.handles, function(d) { return d.type; });\n\n    handle.exit().remove();\n\n    handle.enter().append(\"rect\")\n        .attr(\"class\", function(d) { return \"handle handle--\" + d.type; })\n        .attr(\"cursor\", function(d) { return cursors[d.type]; });\n\n    group\n        .each(redraw)\n        .attr(\"fill\", \"none\")\n        .attr(\"pointer-events\", \"all\")\n        .on(\"mousedown.brush\", started)\n      .filter(touchable)\n        .on(\"touchstart.brush\", started)\n        .on(\"touchmove.brush\", touchmoved)\n        .on(\"touchend.brush touchcancel.brush\", touchended)\n        .style(\"touch-action\", \"none\")\n        .style(\"-webkit-tap-highlight-color\", \"rgba(0,0,0,0)\");\n  }\n\n  brush.move = function(group, selection, event) {\n    if (group.tween) {\n      group\n          .on(\"start.brush\", function(event) { emitter(this, arguments).beforestart().start(event); })\n          .on(\"interrupt.brush end.brush\", function(event) { emitter(this, arguments).end(event); })\n          .tween(\"brush\", function() {\n            var that = this,\n                state = that.__brush,\n                emit = emitter(that, arguments),\n                selection0 = state.selection,\n                selection1 = dim.input(typeof selection === \"function\" ? selection.apply(this, arguments) : selection, state.extent),\n                i = (0,d3_interpolate__WEBPACK_IMPORTED_MODULE_6__.default)(selection0, selection1);\n\n            function tween(t) {\n              state.selection = t === 1 && selection1 === null ? null : i(t);\n              redraw.call(that);\n              emit.brush();\n            }\n\n            return selection0 !== null && selection1 !== null ? tween : tween(1);\n          });\n    } else {\n      group\n          .each(function() {\n            var that = this,\n                args = arguments,\n                state = that.__brush,\n                selection1 = dim.input(typeof selection === \"function\" ? selection.apply(that, args) : selection, state.extent),\n                emit = emitter(that, args).beforestart();\n\n            (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(that);\n            state.selection = selection1 === null ? null : selection1;\n            redraw.call(that);\n            emit.start(event).brush(event).end(event);\n          });\n    }\n  };\n\n  brush.clear = function(group, event) {\n    brush.move(group, null, event);\n  };\n\n  function redraw() {\n    var group = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__.default)(this),\n        selection = local(this).selection;\n\n    if (selection) {\n      group.selectAll(\".selection\")\n          .style(\"display\", null)\n          .attr(\"x\", selection[0][0])\n          .attr(\"y\", selection[0][1])\n          .attr(\"width\", selection[1][0] - selection[0][0])\n          .attr(\"height\", selection[1][1] - selection[0][1]);\n\n      group.selectAll(\".handle\")\n          .style(\"display\", null)\n          .attr(\"x\", function(d) { return d.type[d.type.length - 1] === \"e\" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })\n          .attr(\"y\", function(d) { return d.type[0] === \"s\" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })\n          .attr(\"width\", function(d) { return d.type === \"n\" || d.type === \"s\" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })\n          .attr(\"height\", function(d) { return d.type === \"e\" || d.type === \"w\" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });\n    }\n\n    else {\n      group.selectAll(\".selection,.handle\")\n          .style(\"display\", \"none\")\n          .attr(\"x\", null)\n          .attr(\"y\", null)\n          .attr(\"width\", null)\n          .attr(\"height\", null);\n    }\n  }\n\n  function emitter(that, args, clean) {\n    var emit = that.__brush.emitter;\n    return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);\n  }\n\n  function Emitter(that, args, clean) {\n    this.that = that;\n    this.args = args;\n    this.state = that.__brush;\n    this.active = 0;\n    this.clean = clean;\n  }\n\n  Emitter.prototype = {\n    beforestart: function() {\n      if (++this.active === 1) this.state.emitter = this, this.starting = true;\n      return this;\n    },\n    start: function(event, mode) {\n      if (this.starting) this.starting = false, this.emit(\"start\", event, mode);\n      else this.emit(\"brush\", event);\n      return this;\n    },\n    brush: function(event, mode) {\n      this.emit(\"brush\", event, mode);\n      return this;\n    },\n    end: function(event, mode) {\n      if (--this.active === 0) delete this.state.emitter, this.emit(\"end\", event, mode);\n      return this;\n    },\n    emit: function(type, event, mode) {\n      var d = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__.default)(this.that).datum();\n      listeners.call(\n        type,\n        this.that,\n        new _event_js__WEBPACK_IMPORTED_MODULE_2__.default(type, {\n          sourceEvent: event,\n          target: brush,\n          selection: dim.output(this.state.selection),\n          mode,\n          dispatch: listeners\n        }),\n        d\n      );\n    }\n  };\n\n  function started(event) {\n    if (touchending && !event.touches) return;\n    if (!filter.apply(this, arguments)) return;\n\n    var that = this,\n        type = event.target.__data__.type,\n        mode = (keys && event.metaKey ? type = \"overlay\" : type) === \"selection\" ? MODE_DRAG : (keys && event.altKey ? MODE_CENTER : MODE_HANDLE),\n        signX = dim === Y ? null : signsX[type],\n        signY = dim === X ? null : signsY[type],\n        state = local(that),\n        extent = state.extent,\n        selection = state.selection,\n        W = extent[0][0], w0, w1,\n        N = extent[0][1], n0, n1,\n        E = extent[1][0], e0, e1,\n        S = extent[1][1], s0, s1,\n        dx = 0,\n        dy = 0,\n        moving,\n        shifting = signX && signY && keys && event.shiftKey,\n        lockX,\n        lockY,\n        points = Array.from(event.touches || [event], t => {\n          const i = t.identifier;\n          t = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(t, that);\n          t.point0 = t.slice();\n          t.identifier = i;\n          return t;\n        });\n\n    (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(that);\n    var emit = emitter(that, arguments, true).beforestart();\n\n    if (type === \"overlay\") {\n      if (selection) moving = true;\n      const pts = [points[0], points[1] || points[0]];\n      state.selection = selection = [[\n          w0 = dim === Y ? W : min(pts[0][0], pts[1][0]),\n          n0 = dim === X ? N : min(pts[0][1], pts[1][1])\n        ], [\n          e0 = dim === Y ? E : max(pts[0][0], pts[1][0]),\n          s0 = dim === X ? S : max(pts[0][1], pts[1][1])\n        ]];\n      if (points.length > 1) move(event);\n    } else {\n      w0 = selection[0][0];\n      n0 = selection[0][1];\n      e0 = selection[1][0];\n      s0 = selection[1][1];\n    }\n\n    w1 = w0;\n    n1 = n0;\n    e1 = e0;\n    s1 = s0;\n\n    var group = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__.default)(that)\n        .attr(\"pointer-events\", \"none\");\n\n    var overlay = group.selectAll(\".overlay\")\n        .attr(\"cursor\", cursors[type]);\n\n    if (event.touches) {\n      emit.moved = moved;\n      emit.ended = ended;\n    } else {\n      var view = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__.default)(event.view)\n          .on(\"mousemove.brush\", moved, true)\n          .on(\"mouseup.brush\", ended, true);\n      if (keys) view\n          .on(\"keydown.brush\", keydowned, true)\n          .on(\"keyup.brush\", keyupped, true)\n\n      ;(0,d3_drag__WEBPACK_IMPORTED_MODULE_8__.default)(event.view);\n    }\n\n    redraw.call(that);\n    emit.start(event, mode.name);\n\n    function moved(event) {\n      for (const p of event.changedTouches || [event]) {\n        for (const d of points)\n          if (d.identifier === p.identifier) d.cur = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(p, that);\n      }\n      if (shifting && !lockX && !lockY && points.length === 1) {\n        const point = points[0];\n        if (abs(point.cur[0] - point[0]) > abs(point.cur[1] - point[1]))\n          lockY = true;\n        else\n          lockX = true;\n      }\n      for (const point of points)\n        if (point.cur) point[0] = point.cur[0], point[1] = point.cur[1];\n      moving = true;\n      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_3__.default)(event);\n      move(event);\n    }\n\n    function move(event) {\n      const point = points[0], point0 = point.point0;\n      var t;\n\n      dx = point[0] - point0[0];\n      dy = point[1] - point0[1];\n\n      switch (mode) {\n        case MODE_SPACE:\n        case MODE_DRAG: {\n          if (signX) dx = max(W - w0, min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;\n          if (signY) dy = max(N - n0, min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;\n          break;\n        }\n        case MODE_HANDLE: {\n          if (points[1]) {\n            if (signX) w1 = max(W, min(E, points[0][0])), e1 = max(W, min(E, points[1][0])), signX = 1;\n            if (signY) n1 = max(N, min(S, points[0][1])), s1 = max(N, min(S, points[1][1])), signY = 1;\n          } else {\n            if (signX < 0) dx = max(W - w0, min(E - w0, dx)), w1 = w0 + dx, e1 = e0;\n            else if (signX > 0) dx = max(W - e0, min(E - e0, dx)), w1 = w0, e1 = e0 + dx;\n            if (signY < 0) dy = max(N - n0, min(S - n0, dy)), n1 = n0 + dy, s1 = s0;\n            else if (signY > 0) dy = max(N - s0, min(S - s0, dy)), n1 = n0, s1 = s0 + dy;\n          }\n          break;\n        }\n        case MODE_CENTER: {\n          if (signX) w1 = max(W, min(E, w0 - dx * signX)), e1 = max(W, min(E, e0 + dx * signX));\n          if (signY) n1 = max(N, min(S, n0 - dy * signY)), s1 = max(N, min(S, s0 + dy * signY));\n          break;\n        }\n      }\n\n      if (e1 < w1) {\n        signX *= -1;\n        t = w0, w0 = e0, e0 = t;\n        t = w1, w1 = e1, e1 = t;\n        if (type in flipX) overlay.attr(\"cursor\", cursors[type = flipX[type]]);\n      }\n\n      if (s1 < n1) {\n        signY *= -1;\n        t = n0, n0 = s0, s0 = t;\n        t = n1, n1 = s1, s1 = t;\n        if (type in flipY) overlay.attr(\"cursor\", cursors[type = flipY[type]]);\n      }\n\n      if (state.selection) selection = state.selection; // May be set by brush.move!\n      if (lockX) w1 = selection[0][0], e1 = selection[1][0];\n      if (lockY) n1 = selection[0][1], s1 = selection[1][1];\n\n      if (selection[0][0] !== w1\n          || selection[0][1] !== n1\n          || selection[1][0] !== e1\n          || selection[1][1] !== s1) {\n        state.selection = [[w1, n1], [e1, s1]];\n        redraw.call(that);\n        emit.brush(event, mode.name);\n      }\n    }\n\n    function ended(event) {\n      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_3__.nopropagation)(event);\n      if (event.touches) {\n        if (event.touches.length) return;\n        if (touchending) clearTimeout(touchending);\n        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!\n      } else {\n        (0,d3_drag__WEBPACK_IMPORTED_MODULE_8__.yesdrag)(event.view, moving);\n        view.on(\"keydown.brush keyup.brush mousemove.brush mouseup.brush\", null);\n      }\n      group.attr(\"pointer-events\", \"all\");\n      overlay.attr(\"cursor\", cursors.overlay);\n      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!\n      if (empty(selection)) state.selection = null, redraw.call(that);\n      emit.end(event, mode.name);\n    }\n\n    function keydowned(event) {\n      switch (event.keyCode) {\n        case 16: { // SHIFT\n          shifting = signX && signY;\n          break;\n        }\n        case 18: { // ALT\n          if (mode === MODE_HANDLE) {\n            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;\n            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;\n            mode = MODE_CENTER;\n            move(event);\n          }\n          break;\n        }\n        case 32: { // SPACE; takes priority over ALT\n          if (mode === MODE_HANDLE || mode === MODE_CENTER) {\n            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;\n            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;\n            mode = MODE_SPACE;\n            overlay.attr(\"cursor\", cursors.selection);\n            move(event);\n          }\n          break;\n        }\n        default: return;\n      }\n      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_3__.default)(event);\n    }\n\n    function keyupped(event) {\n      switch (event.keyCode) {\n        case 16: { // SHIFT\n          if (shifting) {\n            lockX = lockY = shifting = false;\n            move(event);\n          }\n          break;\n        }\n        case 18: { // ALT\n          if (mode === MODE_CENTER) {\n            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;\n            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;\n            mode = MODE_HANDLE;\n            move(event);\n          }\n          break;\n        }\n        case 32: { // SPACE\n          if (mode === MODE_SPACE) {\n            if (event.altKey) {\n              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;\n              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;\n              mode = MODE_CENTER;\n            } else {\n              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;\n              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;\n              mode = MODE_HANDLE;\n            }\n            overlay.attr(\"cursor\", cursors[type]);\n            move(event);\n          }\n          break;\n        }\n        default: return;\n      }\n      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_3__.default)(event);\n    }\n  }\n\n  function touchmoved(event) {\n    emitter(this, arguments).moved(event);\n  }\n\n  function touchended(event) {\n    emitter(this, arguments).ended(event);\n  }\n\n  function initialize() {\n    var state = this.__brush || {selection: null};\n    state.extent = number2(extent.apply(this, arguments));\n    state.dim = dim;\n    return state;\n  }\n\n  brush.extent = function(_) {\n    return arguments.length ? (extent = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(number2(_)), brush) : extent;\n  };\n\n  brush.filter = function(_) {\n    return arguments.length ? (filter = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(!!_), brush) : filter;\n  };\n\n  brush.touchable = function(_) {\n    return arguments.length ? (touchable = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(!!_), brush) : touchable;\n  };\n\n  brush.handleSize = function(_) {\n    return arguments.length ? (handleSize = +_, brush) : handleSize;\n  };\n\n  brush.keyModifiers = function(_) {\n    return arguments.length ? (keys = !!_, brush) : keys;\n  };\n\n  brush.on = function() {\n    var value = listeners.on.apply(listeners, arguments);\n    return value === listeners ? brush : value;\n  };\n\n  return brush;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-brush/src/brush.js?");

/***/ }),

/***/ "./node_modules/d3-brush/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-brush/src/constant.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => () => x);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-brush/src/constant.js?");

/***/ }),

/***/ "./node_modules/d3-brush/src/event.js":
/*!********************************************!*\
  !*** ./node_modules/d3-brush/src/event.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BrushEvent)\n/* harmony export */ });\nfunction BrushEvent(type, {\n  sourceEvent,\n  target,\n  selection,\n  mode,\n  dispatch\n}) {\n  Object.defineProperties(this, {\n    type: {value: type, enumerable: true, configurable: true},\n    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},\n    target: {value: target, enumerable: true, configurable: true},\n    selection: {value: selection, enumerable: true, configurable: true},\n    mode: {value: mode, enumerable: true, configurable: true},\n    _: {value: dispatch}\n  });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-brush/src/event.js?");

/***/ }),

/***/ "./node_modules/d3-brush/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-brush/src/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _brush_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brush.js */ \"./node_modules/d3-brush/src/brush.js\");\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-brush/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-brush/src/noevent.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-brush/src/noevent.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nopropagation\": () => (/* binding */ nopropagation),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction nopropagation(event) {\n  event.stopImmediatePropagation();\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {\n  event.preventDefault();\n  event.stopImmediatePropagation();\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-brush/src/noevent.js?");

/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ color),\n/* harmony export */   \"rgb\": () => (/* binding */ rgb)\n/* harmony export */ });\n/* unused harmony exports Color, darker, brighter, rgbConvert, Rgb, hslConvert, hsl */\n/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ \"./node_modules/d3-color/src/define.js\");\n\n\nfunction Color() {}\n\nvar darker = 0.7;\nvar brighter = 1 / darker;\n\nvar reI = \"\\\\s*([+-]?\\\\d+)\\\\s*\",\n    reN = \"\\\\s*([+-]?\\\\d*\\\\.?\\\\d+(?:[eE][+-]?\\\\d+)?)\\\\s*\",\n    reP = \"\\\\s*([+-]?\\\\d*\\\\.?\\\\d+(?:[eE][+-]?\\\\d+)?)%\\\\s*\",\n    reHex = /^#([0-9a-f]{3,8})$/,\n    reRgbInteger = new RegExp(\"^rgb\\\\(\" + [reI, reI, reI] + \"\\\\)$\"),\n    reRgbPercent = new RegExp(\"^rgb\\\\(\" + [reP, reP, reP] + \"\\\\)$\"),\n    reRgbaInteger = new RegExp(\"^rgba\\\\(\" + [reI, reI, reI, reN] + \"\\\\)$\"),\n    reRgbaPercent = new RegExp(\"^rgba\\\\(\" + [reP, reP, reP, reN] + \"\\\\)$\"),\n    reHslPercent = new RegExp(\"^hsl\\\\(\" + [reN, reP, reP] + \"\\\\)$\"),\n    reHslaPercent = new RegExp(\"^hsla\\\\(\" + [reN, reP, reP, reN] + \"\\\\)$\");\n\nvar named = {\n  aliceblue: 0xf0f8ff,\n  antiquewhite: 0xfaebd7,\n  aqua: 0x00ffff,\n  aquamarine: 0x7fffd4,\n  azure: 0xf0ffff,\n  beige: 0xf5f5dc,\n  bisque: 0xffe4c4,\n  black: 0x000000,\n  blanchedalmond: 0xffebcd,\n  blue: 0x0000ff,\n  blueviolet: 0x8a2be2,\n  brown: 0xa52a2a,\n  burlywood: 0xdeb887,\n  cadetblue: 0x5f9ea0,\n  chartreuse: 0x7fff00,\n  chocolate: 0xd2691e,\n  coral: 0xff7f50,\n  cornflowerblue: 0x6495ed,\n  cornsilk: 0xfff8dc,\n  crimson: 0xdc143c,\n  cyan: 0x00ffff,\n  darkblue: 0x00008b,\n  darkcyan: 0x008b8b,\n  darkgoldenrod: 0xb8860b,\n  darkgray: 0xa9a9a9,\n  darkgreen: 0x006400,\n  darkgrey: 0xa9a9a9,\n  darkkhaki: 0xbdb76b,\n  darkmagenta: 0x8b008b,\n  darkolivegreen: 0x556b2f,\n  darkorange: 0xff8c00,\n  darkorchid: 0x9932cc,\n  darkred: 0x8b0000,\n  darksalmon: 0xe9967a,\n  darkseagreen: 0x8fbc8f,\n  darkslateblue: 0x483d8b,\n  darkslategray: 0x2f4f4f,\n  darkslategrey: 0x2f4f4f,\n  darkturquoise: 0x00ced1,\n  darkviolet: 0x9400d3,\n  deeppink: 0xff1493,\n  deepskyblue: 0x00bfff,\n  dimgray: 0x696969,\n  dimgrey: 0x696969,\n  dodgerblue: 0x1e90ff,\n  firebrick: 0xb22222,\n  floralwhite: 0xfffaf0,\n  forestgreen: 0x228b22,\n  fuchsia: 0xff00ff,\n  gainsboro: 0xdcdcdc,\n  ghostwhite: 0xf8f8ff,\n  gold: 0xffd700,\n  goldenrod: 0xdaa520,\n  gray: 0x808080,\n  green: 0x008000,\n  greenyellow: 0xadff2f,\n  grey: 0x808080,\n  honeydew: 0xf0fff0,\n  hotpink: 0xff69b4,\n  indianred: 0xcd5c5c,\n  indigo: 0x4b0082,\n  ivory: 0xfffff0,\n  khaki: 0xf0e68c,\n  lavender: 0xe6e6fa,\n  lavenderblush: 0xfff0f5,\n  lawngreen: 0x7cfc00,\n  lemonchiffon: 0xfffacd,\n  lightblue: 0xadd8e6,\n  lightcoral: 0xf08080,\n  lightcyan: 0xe0ffff,\n  lightgoldenrodyellow: 0xfafad2,\n  lightgray: 0xd3d3d3,\n  lightgreen: 0x90ee90,\n  lightgrey: 0xd3d3d3,\n  lightpink: 0xffb6c1,\n  lightsalmon: 0xffa07a,\n  lightseagreen: 0x20b2aa,\n  lightskyblue: 0x87cefa,\n  lightslategray: 0x778899,\n  lightslategrey: 0x778899,\n  lightsteelblue: 0xb0c4de,\n  lightyellow: 0xffffe0,\n  lime: 0x00ff00,\n  limegreen: 0x32cd32,\n  linen: 0xfaf0e6,\n  magenta: 0xff00ff,\n  maroon: 0x800000,\n  mediumaquamarine: 0x66cdaa,\n  mediumblue: 0x0000cd,\n  mediumorchid: 0xba55d3,\n  mediumpurple: 0x9370db,\n  mediumseagreen: 0x3cb371,\n  mediumslateblue: 0x7b68ee,\n  mediumspringgreen: 0x00fa9a,\n  mediumturquoise: 0x48d1cc,\n  mediumvioletred: 0xc71585,\n  midnightblue: 0x191970,\n  mintcream: 0xf5fffa,\n  mistyrose: 0xffe4e1,\n  moccasin: 0xffe4b5,\n  navajowhite: 0xffdead,\n  navy: 0x000080,\n  oldlace: 0xfdf5e6,\n  olive: 0x808000,\n  olivedrab: 0x6b8e23,\n  orange: 0xffa500,\n  orangered: 0xff4500,\n  orchid: 0xda70d6,\n  palegoldenrod: 0xeee8aa,\n  palegreen: 0x98fb98,\n  paleturquoise: 0xafeeee,\n  palevioletred: 0xdb7093,\n  papayawhip: 0xffefd5,\n  peachpuff: 0xffdab9,\n  peru: 0xcd853f,\n  pink: 0xffc0cb,\n  plum: 0xdda0dd,\n  powderblue: 0xb0e0e6,\n  purple: 0x800080,\n  rebeccapurple: 0x663399,\n  red: 0xff0000,\n  rosybrown: 0xbc8f8f,\n  royalblue: 0x4169e1,\n  saddlebrown: 0x8b4513,\n  salmon: 0xfa8072,\n  sandybrown: 0xf4a460,\n  seagreen: 0x2e8b57,\n  seashell: 0xfff5ee,\n  sienna: 0xa0522d,\n  silver: 0xc0c0c0,\n  skyblue: 0x87ceeb,\n  slateblue: 0x6a5acd,\n  slategray: 0x708090,\n  slategrey: 0x708090,\n  snow: 0xfffafa,\n  springgreen: 0x00ff7f,\n  steelblue: 0x4682b4,\n  tan: 0xd2b48c,\n  teal: 0x008080,\n  thistle: 0xd8bfd8,\n  tomato: 0xff6347,\n  turquoise: 0x40e0d0,\n  violet: 0xee82ee,\n  wheat: 0xf5deb3,\n  white: 0xffffff,\n  whitesmoke: 0xf5f5f5,\n  yellow: 0xffff00,\n  yellowgreen: 0x9acd32\n};\n\n(0,_define_js__WEBPACK_IMPORTED_MODULE_0__.default)(Color, color, {\n  copy: function(channels) {\n    return Object.assign(new this.constructor, this, channels);\n  },\n  displayable: function() {\n    return this.rgb().displayable();\n  },\n  hex: color_formatHex, // Deprecated! Use color.formatHex.\n  formatHex: color_formatHex,\n  formatHsl: color_formatHsl,\n  formatRgb: color_formatRgb,\n  toString: color_formatRgb\n});\n\nfunction color_formatHex() {\n  return this.rgb().formatHex();\n}\n\nfunction color_formatHsl() {\n  return hslConvert(this).formatHsl();\n}\n\nfunction color_formatRgb() {\n  return this.rgb().formatRgb();\n}\n\nfunction color(format) {\n  var m, l;\n  format = (format + \"\").trim().toLowerCase();\n  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000\n      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00\n      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000\n      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000\n      : null) // invalid hex\n      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)\n      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)\n      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)\n      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)\n      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)\n      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)\n      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins\n      : format === \"transparent\" ? new Rgb(NaN, NaN, NaN, 0)\n      : null;\n}\n\nfunction rgbn(n) {\n  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);\n}\n\nfunction rgba(r, g, b, a) {\n  if (a <= 0) r = g = b = NaN;\n  return new Rgb(r, g, b, a);\n}\n\nfunction rgbConvert(o) {\n  if (!(o instanceof Color)) o = color(o);\n  if (!o) return new Rgb;\n  o = o.rgb();\n  return new Rgb(o.r, o.g, o.b, o.opacity);\n}\n\nfunction rgb(r, g, b, opacity) {\n  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);\n}\n\nfunction Rgb(r, g, b, opacity) {\n  this.r = +r;\n  this.g = +g;\n  this.b = +b;\n  this.opacity = +opacity;\n}\n\n(0,_define_js__WEBPACK_IMPORTED_MODULE_0__.default)(Rgb, rgb, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {\n  brighter: function(k) {\n    k = k == null ? brighter : Math.pow(brighter, k);\n    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);\n  },\n  darker: function(k) {\n    k = k == null ? darker : Math.pow(darker, k);\n    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);\n  },\n  rgb: function() {\n    return this;\n  },\n  displayable: function() {\n    return (-0.5 <= this.r && this.r < 255.5)\n        && (-0.5 <= this.g && this.g < 255.5)\n        && (-0.5 <= this.b && this.b < 255.5)\n        && (0 <= this.opacity && this.opacity <= 1);\n  },\n  hex: rgb_formatHex, // Deprecated! Use color.formatHex.\n  formatHex: rgb_formatHex,\n  formatRgb: rgb_formatRgb,\n  toString: rgb_formatRgb\n}));\n\nfunction rgb_formatHex() {\n  return \"#\" + hex(this.r) + hex(this.g) + hex(this.b);\n}\n\nfunction rgb_formatRgb() {\n  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));\n  return (a === 1 ? \"rgb(\" : \"rgba(\")\n      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + \", \"\n      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + \", \"\n      + Math.max(0, Math.min(255, Math.round(this.b) || 0))\n      + (a === 1 ? \")\" : \", \" + a + \")\");\n}\n\nfunction hex(value) {\n  value = Math.max(0, Math.min(255, Math.round(value) || 0));\n  return (value < 16 ? \"0\" : \"\") + value.toString(16);\n}\n\nfunction hsla(h, s, l, a) {\n  if (a <= 0) h = s = l = NaN;\n  else if (l <= 0 || l >= 1) h = s = NaN;\n  else if (s <= 0) h = NaN;\n  return new Hsl(h, s, l, a);\n}\n\nfunction hslConvert(o) {\n  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);\n  if (!(o instanceof Color)) o = color(o);\n  if (!o) return new Hsl;\n  if (o instanceof Hsl) return o;\n  o = o.rgb();\n  var r = o.r / 255,\n      g = o.g / 255,\n      b = o.b / 255,\n      min = Math.min(r, g, b),\n      max = Math.max(r, g, b),\n      h = NaN,\n      s = max - min,\n      l = (max + min) / 2;\n  if (s) {\n    if (r === max) h = (g - b) / s + (g < b) * 6;\n    else if (g === max) h = (b - r) / s + 2;\n    else h = (r - g) / s + 4;\n    s /= l < 0.5 ? max + min : 2 - max - min;\n    h *= 60;\n  } else {\n    s = l > 0 && l < 1 ? 0 : h;\n  }\n  return new Hsl(h, s, l, o.opacity);\n}\n\nfunction hsl(h, s, l, opacity) {\n  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);\n}\n\nfunction Hsl(h, s, l, opacity) {\n  this.h = +h;\n  this.s = +s;\n  this.l = +l;\n  this.opacity = +opacity;\n}\n\n(0,_define_js__WEBPACK_IMPORTED_MODULE_0__.default)(Hsl, hsl, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {\n  brighter: function(k) {\n    k = k == null ? brighter : Math.pow(brighter, k);\n    return new Hsl(this.h, this.s, this.l * k, this.opacity);\n  },\n  darker: function(k) {\n    k = k == null ? darker : Math.pow(darker, k);\n    return new Hsl(this.h, this.s, this.l * k, this.opacity);\n  },\n  rgb: function() {\n    var h = this.h % 360 + (this.h < 0) * 360,\n        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,\n        l = this.l,\n        m2 = l + (l < 0.5 ? l : 1 - l) * s,\n        m1 = 2 * l - m2;\n    return new Rgb(\n      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),\n      hsl2rgb(h, m1, m2),\n      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),\n      this.opacity\n    );\n  },\n  displayable: function() {\n    return (0 <= this.s && this.s <= 1 || isNaN(this.s))\n        && (0 <= this.l && this.l <= 1)\n        && (0 <= this.opacity && this.opacity <= 1);\n  },\n  formatHsl: function() {\n    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));\n    return (a === 1 ? \"hsl(\" : \"hsla(\")\n        + (this.h || 0) + \", \"\n        + (this.s || 0) * 100 + \"%, \"\n        + (this.l || 0) * 100 + \"%\"\n        + (a === 1 ? \")\" : \", \" + a + \")\");\n  }\n}));\n\n/* From FvD 13.37, CSS Color Module Level 3 */\nfunction hsl2rgb(h, m1, m2) {\n  return (h < 60 ? m1 + (m2 - m1) * h / 60\n      : h < 180 ? m2\n      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60\n      : m1) * 255;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-color/src/color.js?");

/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"extend\": () => (/* binding */ extend)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(constructor, factory, prototype) {\n  constructor.prototype = factory.prototype = prototype;\n  prototype.constructor = constructor;\n}\n\nfunction extend(parent, definition) {\n  var prototype = Object.create(parent.prototype);\n  for (var key in definition) prototype[key] = definition[key];\n  return prototype;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-color/src/define.js?");

/***/ }),

/***/ "./node_modules/d3-dispatch/src/dispatch.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-dispatch/src/dispatch.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar noop = {value: () => {}};\n\nfunction dispatch() {\n  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {\n    if (!(t = arguments[i] + \"\") || (t in _) || /[\\s.]/.test(t)) throw new Error(\"illegal type: \" + t);\n    _[t] = [];\n  }\n  return new Dispatch(_);\n}\n\nfunction Dispatch(_) {\n  this._ = _;\n}\n\nfunction parseTypenames(typenames, types) {\n  return typenames.trim().split(/^|\\s+/).map(function(t) {\n    var name = \"\", i = t.indexOf(\".\");\n    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);\n    if (t && !types.hasOwnProperty(t)) throw new Error(\"unknown type: \" + t);\n    return {type: t, name: name};\n  });\n}\n\nDispatch.prototype = dispatch.prototype = {\n  constructor: Dispatch,\n  on: function(typename, callback) {\n    var _ = this._,\n        T = parseTypenames(typename + \"\", _),\n        t,\n        i = -1,\n        n = T.length;\n\n    // If no callback was specified, return the callback of the given type and name.\n    if (arguments.length < 2) {\n      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;\n      return;\n    }\n\n    // If a type was specified, set the callback for the given type and name.\n    // Otherwise, if a null callback was specified, remove callbacks of the given name.\n    if (callback != null && typeof callback !== \"function\") throw new Error(\"invalid callback: \" + callback);\n    while (++i < n) {\n      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);\n      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);\n    }\n\n    return this;\n  },\n  copy: function() {\n    var copy = {}, _ = this._;\n    for (var t in _) copy[t] = _[t].slice();\n    return new Dispatch(copy);\n  },\n  call: function(type, that) {\n    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];\n    if (!this._.hasOwnProperty(type)) throw new Error(\"unknown type: \" + type);\n    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);\n  },\n  apply: function(type, that, args) {\n    if (!this._.hasOwnProperty(type)) throw new Error(\"unknown type: \" + type);\n    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);\n  }\n};\n\nfunction get(type, name) {\n  for (var i = 0, n = type.length, c; i < n; ++i) {\n    if ((c = type[i]).name === name) {\n      return c.value;\n    }\n  }\n}\n\nfunction set(type, name, callback) {\n  for (var i = 0, n = type.length; i < n; ++i) {\n    if (type[i].name === name) {\n      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));\n      break;\n    }\n  }\n  if (callback != null) type.push({name: name, value: callback});\n  return type;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-dispatch/src/dispatch.js?");

/***/ }),

/***/ "./node_modules/d3-drag/src/nodrag.js":
/*!********************************************!*\
  !*** ./node_modules/d3-drag/src/nodrag.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"yesdrag\": () => (/* binding */ yesdrag)\n/* harmony export */ });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/select.js\");\n/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noevent.js */ \"./node_modules/d3-drag/src/noevent.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(view) {\n  var root = view.document.documentElement,\n      selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(view).on(\"dragstart.drag\", _noevent_js__WEBPACK_IMPORTED_MODULE_1__.default, _noevent_js__WEBPACK_IMPORTED_MODULE_1__.nonpassivecapture);\n  if (\"onselectstart\" in root) {\n    selection.on(\"selectstart.drag\", _noevent_js__WEBPACK_IMPORTED_MODULE_1__.default, _noevent_js__WEBPACK_IMPORTED_MODULE_1__.nonpassivecapture);\n  } else {\n    root.__noselect = root.style.MozUserSelect;\n    root.style.MozUserSelect = \"none\";\n  }\n}\n\nfunction yesdrag(view, noclick) {\n  var root = view.document.documentElement,\n      selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(view).on(\"dragstart.drag\", null);\n  if (noclick) {\n    selection.on(\"click.drag\", _noevent_js__WEBPACK_IMPORTED_MODULE_1__.default, _noevent_js__WEBPACK_IMPORTED_MODULE_1__.nonpassivecapture);\n    setTimeout(function() { selection.on(\"click.drag\", null); }, 0);\n  }\n  if (\"onselectstart\" in root) {\n    selection.on(\"selectstart.drag\", null);\n  } else {\n    root.style.MozUserSelect = root.__noselect;\n    delete root.__noselect;\n  }\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-drag/src/nodrag.js?");

/***/ }),

/***/ "./node_modules/d3-drag/src/noevent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-drag/src/noevent.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nonpassivecapture\": () => (/* binding */ nonpassivecapture),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* unused harmony exports nonpassive, nopropagation */\n// These are typically used in conjunction with noevent to ensure that we can\n// preventDefault on the event.\nconst nonpassive = {passive: false};\nconst nonpassivecapture = {capture: true, passive: false};\n\nfunction nopropagation(event) {\n  event.stopImmediatePropagation();\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {\n  event.preventDefault();\n  event.stopImmediatePropagation();\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-drag/src/noevent.js?");

/***/ }),

/***/ "./node_modules/d3-ease/src/cubic.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-ease/src/cubic.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cubicInOut\": () => (/* binding */ cubicInOut)\n/* harmony export */ });\n/* unused harmony exports cubicIn, cubicOut */\nfunction cubicIn(t) {\n  return t * t * t;\n}\n\nfunction cubicOut(t) {\n  return --t * t * t + 1;\n}\n\nfunction cubicInOut(t) {\n  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-ease/src/cubic.js?");

/***/ }),

/***/ "./node_modules/d3-ease/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-ease/src/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"easeLinear\": () => (/* reexport safe */ _linear_js__WEBPACK_IMPORTED_MODULE_0__.linear)\n/* harmony export */ });\n/* harmony import */ var _linear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linear.js */ \"./node_modules/d3-ease/src/linear.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-ease/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-ease/src/linear.js":
/*!********************************************!*\
  !*** ./node_modules/d3-ease/src/linear.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"linear\": () => (/* binding */ linear)\n/* harmony export */ });\nconst linear = t => +t;\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-ease/src/linear.js?");

/***/ }),

/***/ "./node_modules/d3-fetch/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-fetch/src/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"json\": () => (/* reexport safe */ _json_js__WEBPACK_IMPORTED_MODULE_0__.default)\n/* harmony export */ });\n/* harmony import */ var _json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json.js */ \"./node_modules/d3-fetch/src/json.js\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-fetch/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-fetch/src/json.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-fetch/src/json.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction responseJson(response) {\n  if (!response.ok) throw new Error(response.status + \" \" + response.statusText);\n  if (response.status === 204 || response.status === 205) return;\n  return response.json();\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(input, init) {\n  return fetch(input, init).then(responseJson);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-fetch/src/json.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/identity.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/identity.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => x);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/identity.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/d3-geo/src/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"geoPath\": () => (/* reexport safe */ _path_index_js__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"geoTransform\": () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _path_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path/index.js */ \"./node_modules/d3-geo/src/path/index.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"./node_modules/d3-geo/src/transform.js\");\n\n\n\n\n\n\n // DEPRECATED! Use d3.geoIdentity().clipExtent(…).\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/math.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/math.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tau\": () => (/* binding */ tau),\n/* harmony export */   \"abs\": () => (/* binding */ abs),\n/* harmony export */   \"sqrt\": () => (/* binding */ sqrt)\n/* harmony export */ });\n/* unused harmony exports epsilon, epsilon2, pi, halfPi, quarterPi, degrees, radians, atan, atan2, cos, ceil, exp, floor, hypot, log, pow, sin, sign, tan, acos, asin, haversin */\nvar epsilon = 1e-6;\nvar epsilon2 = 1e-12;\nvar pi = Math.PI;\nvar halfPi = pi / 2;\nvar quarterPi = pi / 4;\nvar tau = pi * 2;\n\nvar degrees = 180 / pi;\nvar radians = pi / 180;\n\nvar abs = Math.abs;\nvar atan = Math.atan;\nvar atan2 = Math.atan2;\nvar cos = Math.cos;\nvar ceil = Math.ceil;\nvar exp = Math.exp;\nvar floor = Math.floor;\nvar hypot = Math.hypot;\nvar log = Math.log;\nvar pow = Math.pow;\nvar sin = Math.sin;\nvar sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };\nvar sqrt = Math.sqrt;\nvar tan = Math.tan;\n\nfunction acos(x) {\n  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);\n}\n\nfunction asin(x) {\n  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);\n}\n\nfunction haversin(x) {\n  return (x = sin(x / 2)) * x;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/math.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/noop.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/noop.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ noop)\n/* harmony export */ });\nfunction noop() {}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/noop.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/area.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/path/area.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ \"./node_modules/d3-array/src/fsum.js\");\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ \"./node_modules/d3-geo/src/math.js\");\n/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ \"./node_modules/d3-geo/src/noop.js\");\n\n\n\n\nvar areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),\n    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),\n    x00,\n    y00,\n    x0,\n    y0;\n\nvar areaStream = {\n  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  polygonStart: function() {\n    areaStream.lineStart = areaRingStart;\n    areaStream.lineEnd = areaRingEnd;\n  },\n  polygonEnd: function() {\n    areaStream.lineStart = areaStream.lineEnd = areaStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__.default;\n    areaSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.abs)(areaRingSum));\n    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();\n  },\n  result: function() {\n    var area = areaSum / 2;\n    areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();\n    return area;\n  }\n};\n\nfunction areaRingStart() {\n  areaStream.point = areaPointFirst;\n}\n\nfunction areaPointFirst(x, y) {\n  areaStream.point = areaPoint;\n  x00 = x0 = x, y00 = y0 = y;\n}\n\nfunction areaPoint(x, y) {\n  areaRingSum.add(y0 * x - x0 * y);\n  x0 = x, y0 = y;\n}\n\nfunction areaRingEnd() {\n  areaPoint(x00, y00);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (areaStream);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/area.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/bounds.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/bounds.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ \"./node_modules/d3-geo/src/noop.js\");\n\n\nvar x0 = Infinity,\n    y0 = x0,\n    x1 = -x0,\n    y1 = x1;\n\nvar boundsStream = {\n  point: boundsPoint,\n  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__.default,\n  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__.default,\n  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__.default,\n  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__.default,\n  result: function() {\n    var bounds = [[x0, y0], [x1, y1]];\n    x1 = y1 = -(y0 = x0 = Infinity);\n    return bounds;\n  }\n};\n\nfunction boundsPoint(x, y) {\n  if (x < x0) x0 = x;\n  if (x > x1) x1 = x;\n  if (y < y0) y0 = y;\n  if (y > y1) y1 = y;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boundsStream);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/bounds.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/centroid.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-geo/src/path/centroid.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ \"./node_modules/d3-geo/src/math.js\");\n\n\n// TODO Enforce positive area for exterior, negative area for interior?\n\nvar X0 = 0,\n    Y0 = 0,\n    Z0 = 0,\n    X1 = 0,\n    Y1 = 0,\n    Z1 = 0,\n    X2 = 0,\n    Y2 = 0,\n    Z2 = 0,\n    x00,\n    y00,\n    x0,\n    y0;\n\nvar centroidStream = {\n  point: centroidPoint,\n  lineStart: centroidLineStart,\n  lineEnd: centroidLineEnd,\n  polygonStart: function() {\n    centroidStream.lineStart = centroidRingStart;\n    centroidStream.lineEnd = centroidRingEnd;\n  },\n  polygonEnd: function() {\n    centroidStream.point = centroidPoint;\n    centroidStream.lineStart = centroidLineStart;\n    centroidStream.lineEnd = centroidLineEnd;\n  },\n  result: function() {\n    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]\n        : Z1 ? [X1 / Z1, Y1 / Z1]\n        : Z0 ? [X0 / Z0, Y0 / Z0]\n        : [NaN, NaN];\n    X0 = Y0 = Z0 =\n    X1 = Y1 = Z1 =\n    X2 = Y2 = Z2 = 0;\n    return centroid;\n  }\n};\n\nfunction centroidPoint(x, y) {\n  X0 += x;\n  Y0 += y;\n  ++Z0;\n}\n\nfunction centroidLineStart() {\n  centroidStream.point = centroidPointFirstLine;\n}\n\nfunction centroidPointFirstLine(x, y) {\n  centroidStream.point = centroidPointLine;\n  centroidPoint(x0 = x, y0 = y);\n}\n\nfunction centroidPointLine(x, y) {\n  var dx = x - x0, dy = y - y0, z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(dx * dx + dy * dy);\n  X1 += z * (x0 + x) / 2;\n  Y1 += z * (y0 + y) / 2;\n  Z1 += z;\n  centroidPoint(x0 = x, y0 = y);\n}\n\nfunction centroidLineEnd() {\n  centroidStream.point = centroidPoint;\n}\n\nfunction centroidRingStart() {\n  centroidStream.point = centroidPointFirstRing;\n}\n\nfunction centroidRingEnd() {\n  centroidPointRing(x00, y00);\n}\n\nfunction centroidPointFirstRing(x, y) {\n  centroidStream.point = centroidPointRing;\n  centroidPoint(x00 = x0 = x, y00 = y0 = y);\n}\n\nfunction centroidPointRing(x, y) {\n  var dx = x - x0,\n      dy = y - y0,\n      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(dx * dx + dy * dy);\n\n  X1 += z * (x0 + x) / 2;\n  Y1 += z * (y0 + y) / 2;\n  Z1 += z;\n\n  z = y0 * x - x0 * y;\n  X2 += z * (x0 + x);\n  Y2 += z * (y0 + y);\n  Z2 += z * 3;\n  centroidPoint(x0 = x, y0 = y);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (centroidStream);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/centroid.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/context.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/context.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PathContext)\n/* harmony export */ });\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ \"./node_modules/d3-geo/src/math.js\");\n/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ \"./node_modules/d3-geo/src/noop.js\");\n\n\n\nfunction PathContext(context) {\n  this._context = context;\n}\n\nPathContext.prototype = {\n  _radius: 4.5,\n  pointRadius: function(_) {\n    return this._radius = _, this;\n  },\n  polygonStart: function() {\n    this._line = 0;\n  },\n  polygonEnd: function() {\n    this._line = NaN;\n  },\n  lineStart: function() {\n    this._point = 0;\n  },\n  lineEnd: function() {\n    if (this._line === 0) this._context.closePath();\n    this._point = NaN;\n  },\n  point: function(x, y) {\n    switch (this._point) {\n      case 0: {\n        this._context.moveTo(x, y);\n        this._point = 1;\n        break;\n      }\n      case 1: {\n        this._context.lineTo(x, y);\n        break;\n      }\n      default: {\n        this._context.moveTo(x + this._radius, y);\n        this._context.arc(x, y, this._radius, 0, _math_js__WEBPACK_IMPORTED_MODULE_0__.tau);\n        break;\n      }\n    }\n  },\n  result: _noop_js__WEBPACK_IMPORTED_MODULE_1__.default\n};\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/context.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/path/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../identity.js */ \"./node_modules/d3-geo/src/identity.js\");\n/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream.js */ \"./node_modules/d3-geo/src/stream.js\");\n/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./area.js */ \"./node_modules/d3-geo/src/path/area.js\");\n/* harmony import */ var _bounds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bounds.js */ \"./node_modules/d3-geo/src/path/bounds.js\");\n/* harmony import */ var _centroid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./centroid.js */ \"./node_modules/d3-geo/src/path/centroid.js\");\n/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context.js */ \"./node_modules/d3-geo/src/path/context.js\");\n/* harmony import */ var _measure_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./measure.js */ \"./node_modules/d3-geo/src/path/measure.js\");\n/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string.js */ \"./node_modules/d3-geo/src/path/string.js\");\n\n\n\n\n\n\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(projection, context) {\n  var pointRadius = 4.5,\n      projectionStream,\n      contextStream;\n\n  function path(object) {\n    if (object) {\n      if (typeof pointRadius === \"function\") contextStream.pointRadius(+pointRadius.apply(this, arguments));\n      (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__.default)(object, projectionStream(contextStream));\n    }\n    return contextStream.result();\n  }\n\n  path.area = function(object) {\n    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__.default)(object, projectionStream(_area_js__WEBPACK_IMPORTED_MODULE_1__.default));\n    return _area_js__WEBPACK_IMPORTED_MODULE_1__.default.result();\n  };\n\n  path.measure = function(object) {\n    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__.default)(object, projectionStream(_measure_js__WEBPACK_IMPORTED_MODULE_2__.default));\n    return _measure_js__WEBPACK_IMPORTED_MODULE_2__.default.result();\n  };\n\n  path.bounds = function(object) {\n    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__.default)(object, projectionStream(_bounds_js__WEBPACK_IMPORTED_MODULE_3__.default));\n    return _bounds_js__WEBPACK_IMPORTED_MODULE_3__.default.result();\n  };\n\n  path.centroid = function(object) {\n    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__.default)(object, projectionStream(_centroid_js__WEBPACK_IMPORTED_MODULE_4__.default));\n    return _centroid_js__WEBPACK_IMPORTED_MODULE_4__.default.result();\n  };\n\n  path.projection = function(_) {\n    return arguments.length ? (projectionStream = _ == null ? (projection = null, _identity_js__WEBPACK_IMPORTED_MODULE_5__.default) : (projection = _).stream, path) : projection;\n  };\n\n  path.context = function(_) {\n    if (!arguments.length) return context;\n    contextStream = _ == null ? (context = null, new _string_js__WEBPACK_IMPORTED_MODULE_6__.default) : new _context_js__WEBPACK_IMPORTED_MODULE_7__.default(context = _);\n    if (typeof pointRadius !== \"function\") contextStream.pointRadius(pointRadius);\n    return path;\n  };\n\n  path.pointRadius = function(_) {\n    if (!arguments.length) return pointRadius;\n    pointRadius = typeof _ === \"function\" ? _ : (contextStream.pointRadius(+_), +_);\n    return path;\n  };\n\n  return path.projection(projection).context(context);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/index.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/measure.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/measure.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ \"./node_modules/d3-array/src/fsum.js\");\n/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ \"./node_modules/d3-geo/src/math.js\");\n/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ \"./node_modules/d3-geo/src/noop.js\");\n\n\n\n\nvar lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),\n    lengthRing,\n    x00,\n    y00,\n    x0,\n    y0;\n\nvar lengthStream = {\n  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  lineStart: function() {\n    lengthStream.point = lengthPointFirst;\n  },\n  lineEnd: function() {\n    if (lengthRing) lengthPoint(x00, y00);\n    lengthStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__.default;\n  },\n  polygonStart: function() {\n    lengthRing = true;\n  },\n  polygonEnd: function() {\n    lengthRing = null;\n  },\n  result: function() {\n    var length = +lengthSum;\n    lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();\n    return length;\n  }\n};\n\nfunction lengthPointFirst(x, y) {\n  lengthStream.point = lengthPoint;\n  x00 = x0 = x, y00 = y0 = y;\n}\n\nfunction lengthPoint(x, y) {\n  x0 -= x, y0 -= y;\n  lengthSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sqrt)(x0 * x0 + y0 * y0));\n  x0 = x, y0 = y;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthStream);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/measure.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/path/string.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/string.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PathString)\n/* harmony export */ });\nfunction PathString() {\n  this._string = [];\n}\n\nPathString.prototype = {\n  _radius: 4.5,\n  _circle: circle(4.5),\n  pointRadius: function(_) {\n    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;\n    return this;\n  },\n  polygonStart: function() {\n    this._line = 0;\n  },\n  polygonEnd: function() {\n    this._line = NaN;\n  },\n  lineStart: function() {\n    this._point = 0;\n  },\n  lineEnd: function() {\n    if (this._line === 0) this._string.push(\"Z\");\n    this._point = NaN;\n  },\n  point: function(x, y) {\n    switch (this._point) {\n      case 0: {\n        this._string.push(\"M\", x, \",\", y);\n        this._point = 1;\n        break;\n      }\n      case 1: {\n        this._string.push(\"L\", x, \",\", y);\n        break;\n      }\n      default: {\n        if (this._circle == null) this._circle = circle(this._radius);\n        this._string.push(\"M\", x, \",\", y, this._circle);\n        break;\n      }\n    }\n  },\n  result: function() {\n    if (this._string.length) {\n      var result = this._string.join(\"\");\n      this._string = [];\n      return result;\n    } else {\n      return null;\n    }\n  }\n};\n\nfunction circle(radius) {\n  return \"m0,\" + radius\n      + \"a\" + radius + \",\" + radius + \" 0 1,1 0,\" + -2 * radius\n      + \"a\" + radius + \",\" + radius + \" 0 1,1 0,\" + 2 * radius\n      + \"z\";\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/path/string.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/stream.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/stream.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction streamGeometry(geometry, stream) {\n  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {\n    streamGeometryType[geometry.type](geometry, stream);\n  }\n}\n\nvar streamObjectType = {\n  Feature: function(object, stream) {\n    streamGeometry(object.geometry, stream);\n  },\n  FeatureCollection: function(object, stream) {\n    var features = object.features, i = -1, n = features.length;\n    while (++i < n) streamGeometry(features[i].geometry, stream);\n  }\n};\n\nvar streamGeometryType = {\n  Sphere: function(object, stream) {\n    stream.sphere();\n  },\n  Point: function(object, stream) {\n    object = object.coordinates;\n    stream.point(object[0], object[1], object[2]);\n  },\n  MultiPoint: function(object, stream) {\n    var coordinates = object.coordinates, i = -1, n = coordinates.length;\n    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);\n  },\n  LineString: function(object, stream) {\n    streamLine(object.coordinates, stream, 0);\n  },\n  MultiLineString: function(object, stream) {\n    var coordinates = object.coordinates, i = -1, n = coordinates.length;\n    while (++i < n) streamLine(coordinates[i], stream, 0);\n  },\n  Polygon: function(object, stream) {\n    streamPolygon(object.coordinates, stream);\n  },\n  MultiPolygon: function(object, stream) {\n    var coordinates = object.coordinates, i = -1, n = coordinates.length;\n    while (++i < n) streamPolygon(coordinates[i], stream);\n  },\n  GeometryCollection: function(object, stream) {\n    var geometries = object.geometries, i = -1, n = geometries.length;\n    while (++i < n) streamGeometry(geometries[i], stream);\n  }\n};\n\nfunction streamLine(coordinates, stream, closed) {\n  var i = -1, n = coordinates.length - closed, coordinate;\n  stream.lineStart();\n  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);\n  stream.lineEnd();\n}\n\nfunction streamPolygon(coordinates, stream) {\n  var i = -1, n = coordinates.length;\n  stream.polygonStart();\n  while (++i < n) streamLine(coordinates[i], stream, 1);\n  stream.polygonEnd();\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object, stream) {\n  if (object && streamObjectType.hasOwnProperty(object.type)) {\n    streamObjectType[object.type](object, stream);\n  } else {\n    streamGeometry(object, stream);\n  }\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/stream.js?");

/***/ }),

/***/ "./node_modules/d3-geo/src/transform.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/transform.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* unused harmony export transformer */\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(methods) {\n  return {\n    stream: transformer(methods)\n  };\n}\n\nfunction transformer(methods) {\n  return function(stream) {\n    var s = new TransformStream;\n    for (var key in methods) s[key] = methods[key];\n    s.stream = stream;\n    return s;\n  };\n}\n\nfunction TransformStream() {}\n\nTransformStream.prototype = {\n  constructor: TransformStream,\n  point: function(x, y) { this.stream.point(x, y); },\n  sphere: function() { this.stream.sphere(); },\n  lineStart: function() { this.stream.lineStart(); },\n  lineEnd: function() { this.stream.lineEnd(); },\n  polygonStart: function() { this.stream.polygonStart(); },\n  polygonEnd: function() { this.stream.polygonEnd(); }\n};\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-geo/src/transform.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/array.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/array.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"genericArray\": () => (/* binding */ genericArray)\n/* harmony export */ });\n/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.js */ \"./node_modules/d3-interpolate/src/value.js\");\n/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./numberArray.js */ \"./node_modules/d3-interpolate/src/numberArray.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  return ((0,_numberArray_js__WEBPACK_IMPORTED_MODULE_0__.isNumberArray)(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_0__.default : genericArray)(a, b);\n}\n\nfunction genericArray(a, b) {\n  var nb = b ? b.length : 0,\n      na = a ? Math.min(nb, a.length) : 0,\n      x = new Array(na),\n      c = new Array(nb),\n      i;\n\n  for (i = 0; i < na; ++i) x[i] = (0,_value_js__WEBPACK_IMPORTED_MODULE_1__.default)(a[i], b[i]);\n  for (; i < nb; ++i) c[i] = b[i];\n\n  return function(t) {\n    for (i = 0; i < na; ++i) c[i] = x[i](t);\n    return c;\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/array.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/basis.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basis.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"basis\": () => (/* binding */ basis),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction basis(t1, v0, v1, v2, v3) {\n  var t2 = t1 * t1, t3 = t2 * t1;\n  return ((1 - 3 * t1 + 3 * t2 - t3) * v0\n      + (4 - 6 * t2 + 3 * t3) * v1\n      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2\n      + t3 * v3) / 6;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {\n  var n = values.length - 1;\n  return function(t) {\n    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),\n        v1 = values[i],\n        v2 = values[i + 1],\n        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,\n        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;\n    return basis((t - i / n) * n, v0, v1, v2, v3);\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/basis.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/basisClosed.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basisClosed.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ \"./node_modules/d3-interpolate/src/basis.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {\n  var n = values.length;\n  return function(t) {\n    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),\n        v0 = values[(i + n - 1) % n],\n        v1 = values[i % n],\n        v2 = values[(i + 1) % n],\n        v3 = values[(i + 2) % n];\n    return (0,_basis_js__WEBPACK_IMPORTED_MODULE_0__.basis)((t - i / n) * n, v0, v1, v2, v3);\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/basisClosed.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/color.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/color.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gamma\": () => (/* binding */ gamma),\n/* harmony export */   \"default\": () => (/* binding */ nogamma)\n/* harmony export */ });\n/* unused harmony export hue */\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-interpolate/src/constant.js\");\n\n\nfunction linear(a, d) {\n  return function(t) {\n    return a + t * d;\n  };\n}\n\nfunction exponential(a, b, y) {\n  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {\n    return Math.pow(a + t * b, y);\n  };\n}\n\nfunction hue(a, b) {\n  var d = b - a;\n  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(isNaN(a) ? b : a);\n}\n\nfunction gamma(y) {\n  return (y = +y) === 1 ? nogamma : function(a, b) {\n    return b - a ? exponential(a, b, y) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(isNaN(a) ? b : a);\n  };\n}\n\nfunction nogamma(a, b) {\n  var d = b - a;\n  return d ? linear(a, d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(isNaN(a) ? b : a);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/color.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/constant.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/constant.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => () => x);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/constant.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/date.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/date.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  var d = new Date;\n  return a = +a, b = +b, function(t) {\n    return d.setTime(a * (1 - t) + b * t), d;\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/date.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/number.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/number.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  return a = +a, b = +b, function(t) {\n    return a * (1 - t) + b * t;\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/number.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/numberArray.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/numberArray.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"isNumberArray\": () => (/* binding */ isNumberArray)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  if (!b) b = [];\n  var n = a ? Math.min(b.length, a.length) : 0,\n      c = b.slice(),\n      i;\n  return function(t) {\n    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;\n    return c;\n  };\n}\n\nfunction isNumberArray(x) {\n  return ArrayBuffer.isView(x) && !(x instanceof DataView);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/numberArray.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/object.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/object.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ \"./node_modules/d3-interpolate/src/value.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  var i = {},\n      c = {},\n      k;\n\n  if (a === null || typeof a !== \"object\") a = {};\n  if (b === null || typeof b !== \"object\") b = {};\n\n  for (k in b) {\n    if (k in a) {\n      i[k] = (0,_value_js__WEBPACK_IMPORTED_MODULE_0__.default)(a[k], b[k]);\n    } else {\n      c[k] = b[k];\n    }\n  }\n\n  return function(t) {\n    for (k in i) c[k] = i[k](t);\n    return c;\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/object.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/rgb.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/rgb.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* unused harmony exports rgbBasis, rgbBasisClosed */\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ \"./node_modules/d3-color/src/color.js\");\n/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ \"./node_modules/d3-interpolate/src/basis.js\");\n/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ \"./node_modules/d3-interpolate/src/basisClosed.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ \"./node_modules/d3-interpolate/src/color.js\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function rgbGamma(y) {\n  var color = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.gamma)(y);\n\n  function rgb(start, end) {\n    var r = color((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(start)).r, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(end)).r),\n        g = color(start.g, end.g),\n        b = color(start.b, end.b),\n        opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.default)(start.opacity, end.opacity);\n    return function(t) {\n      start.r = r(t);\n      start.g = g(t);\n      start.b = b(t);\n      start.opacity = opacity(t);\n      return start + \"\";\n    };\n  }\n\n  rgb.gamma = rgbGamma;\n\n  return rgb;\n})(1));\n\nfunction rgbSpline(spline) {\n  return function(colors) {\n    var n = colors.length,\n        r = new Array(n),\n        g = new Array(n),\n        b = new Array(n),\n        i, color;\n    for (i = 0; i < n; ++i) {\n      color = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(colors[i]);\n      r[i] = color.r || 0;\n      g[i] = color.g || 0;\n      b[i] = color.b || 0;\n    }\n    r = spline(r);\n    g = spline(g);\n    b = spline(b);\n    color.opacity = 1;\n    return function(t) {\n      color.r = r(t);\n      color.g = g(t);\n      color.b = b(t);\n      return color + \"\";\n    };\n  };\n}\n\nvar rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_2__.default);\nvar rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_3__.default);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/rgb.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/string.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/string.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ \"./node_modules/d3-interpolate/src/number.js\");\n\n\nvar reA = /[-+]?(?:\\d+\\.?\\d*|\\.?\\d+)(?:[eE][-+]?\\d+)?/g,\n    reB = new RegExp(reA.source, \"g\");\n\nfunction zero(b) {\n  return function() {\n    return b;\n  };\n}\n\nfunction one(b) {\n  return function(t) {\n    return b(t) + \"\";\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b\n      am, // current match in a\n      bm, // current match in b\n      bs, // string preceding current number in b, if any\n      i = -1, // index in s\n      s = [], // string constants and placeholders\n      q = []; // number interpolators\n\n  // Coerce inputs to strings.\n  a = a + \"\", b = b + \"\";\n\n  // Interpolate pairs of numbers in a & b.\n  while ((am = reA.exec(a))\n      && (bm = reB.exec(b))) {\n    if ((bs = bm.index) > bi) { // a string precedes the next number in b\n      bs = b.slice(bi, bs);\n      if (s[i]) s[i] += bs; // coalesce with previous string\n      else s[++i] = bs;\n    }\n    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match\n      if (s[i]) s[i] += bm; // coalesce with previous string\n      else s[++i] = bm;\n    } else { // interpolate non-matching numbers\n      s[++i] = null;\n      q.push({i: i, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(am, bm)});\n    }\n    bi = reB.lastIndex;\n  }\n\n  // Add remains of b.\n  if (bi < b.length) {\n    bs = b.slice(bi);\n    if (s[i]) s[i] += bs; // coalesce with previous string\n    else s[++i] = bs;\n  }\n\n  // Special optimization for only a single match.\n  // Otherwise, interpolate each of the numbers and rejoin the string.\n  return s.length < 2 ? (q[0]\n      ? one(q[0].x)\n      : zero(b))\n      : (b = q.length, function(t) {\n          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);\n          return s.join(\"\");\n        });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/string.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/decompose.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/decompose.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"identity\": () => (/* binding */ identity),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar degrees = 180 / Math.PI;\n\nvar identity = {\n  translateX: 0,\n  translateY: 0,\n  rotate: 0,\n  skewX: 0,\n  scaleX: 1,\n  scaleY: 1\n};\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, c, d, e, f) {\n  var scaleX, scaleY, skewX;\n  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;\n  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;\n  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;\n  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;\n  return {\n    translateX: e,\n    translateY: f,\n    rotate: Math.atan2(b, a) * degrees,\n    skewX: Math.atan(skewX) * degrees,\n    scaleX: scaleX,\n    scaleY: scaleY\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/transform/decompose.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"interpolateTransformCss\": () => (/* binding */ interpolateTransformCss),\n/* harmony export */   \"interpolateTransformSvg\": () => (/* binding */ interpolateTransformSvg)\n/* harmony export */ });\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ \"./node_modules/d3-interpolate/src/number.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/d3-interpolate/src/transform/parse.js\");\n\n\n\nfunction interpolateTransform(parse, pxComma, pxParen, degParen) {\n\n  function pop(s) {\n    return s.length ? s.pop() + \" \" : \"\";\n  }\n\n  function translate(xa, ya, xb, yb, s, q) {\n    if (xa !== xb || ya !== yb) {\n      var i = s.push(\"translate(\", null, pxComma, null, pxParen);\n      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(ya, yb)});\n    } else if (xb || yb) {\n      s.push(\"translate(\" + xb + pxComma + yb + pxParen);\n    }\n  }\n\n  function rotate(a, b, s, q) {\n    if (a !== b) {\n      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path\n      q.push({i: s.push(pop(s) + \"rotate(\", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(a, b)});\n    } else if (b) {\n      s.push(pop(s) + \"rotate(\" + b + degParen);\n    }\n  }\n\n  function skewX(a, b, s, q) {\n    if (a !== b) {\n      q.push({i: s.push(pop(s) + \"skewX(\", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(a, b)});\n    } else if (b) {\n      s.push(pop(s) + \"skewX(\" + b + degParen);\n    }\n  }\n\n  function scale(xa, ya, xb, yb, s, q) {\n    if (xa !== xb || ya !== yb) {\n      var i = s.push(pop(s) + \"scale(\", null, \",\", null, \")\");\n      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__.default)(ya, yb)});\n    } else if (xb !== 1 || yb !== 1) {\n      s.push(pop(s) + \"scale(\" + xb + \",\" + yb + \")\");\n    }\n  }\n\n  return function(a, b) {\n    var s = [], // string constants and placeholders\n        q = []; // number interpolators\n    a = parse(a), b = parse(b);\n    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);\n    rotate(a.rotate, b.rotate, s, q);\n    skewX(a.skewX, b.skewX, s, q);\n    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);\n    a = b = null; // gc\n    return function(t) {\n      var i = -1, n = q.length, o;\n      while (++i < n) s[(o = q[i]).i] = o.x(t);\n      return s.join(\"\");\n    };\n  };\n}\n\nvar interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseCss, \"px, \", \"px)\", \"deg)\");\nvar interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseSvg, \", \", \")\", \")\");\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/transform/index.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/parse.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/parse.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parseCss\": () => (/* binding */ parseCss),\n/* harmony export */   \"parseSvg\": () => (/* binding */ parseSvg)\n/* harmony export */ });\n/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ \"./node_modules/d3-interpolate/src/transform/decompose.js\");\n\n\nvar svgNode;\n\n/* eslint-disable no-undef */\nfunction parseCss(value) {\n  const m = new (typeof DOMMatrix === \"function\" ? DOMMatrix : WebKitCSSMatrix)(value + \"\");\n  return m.isIdentity ? _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity : (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__.default)(m.a, m.b, m.c, m.d, m.e, m.f);\n}\n\nfunction parseSvg(value) {\n  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;\n  if (!svgNode) svgNode = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\");\n  svgNode.setAttribute(\"transform\", value);\n  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;\n  value = value.matrix;\n  return (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__.default)(value.a, value.b, value.c, value.d, value.e, value.f);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/transform/parse.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/value.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/value.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-color */ \"./node_modules/d3-color/src/color.js\");\n/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rgb.js */ \"./node_modules/d3-interpolate/src/rgb.js\");\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./array.js */ \"./node_modules/d3-interpolate/src/array.js\");\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date.js */ \"./node_modules/d3-interpolate/src/date.js\");\n/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number.js */ \"./node_modules/d3-interpolate/src/number.js\");\n/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./object.js */ \"./node_modules/d3-interpolate/src/object.js\");\n/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string.js */ \"./node_modules/d3-interpolate/src/string.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-interpolate/src/constant.js\");\n/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./numberArray.js */ \"./node_modules/d3-interpolate/src/numberArray.js\");\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  var t = typeof b, c;\n  return b == null || t === \"boolean\" ? (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__.default)(b)\n      : (t === \"number\" ? _number_js__WEBPACK_IMPORTED_MODULE_1__.default\n      : t === \"string\" ? ((c = (0,d3_color__WEBPACK_IMPORTED_MODULE_2__.default)(b)) ? (b = c, _rgb_js__WEBPACK_IMPORTED_MODULE_3__.default) : _string_js__WEBPACK_IMPORTED_MODULE_4__.default)\n      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_2__.default ? _rgb_js__WEBPACK_IMPORTED_MODULE_3__.default\n      : b instanceof Date ? _date_js__WEBPACK_IMPORTED_MODULE_5__.default\n      : (0,_numberArray_js__WEBPACK_IMPORTED_MODULE_6__.isNumberArray)(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_6__.default\n      : Array.isArray(b) ? _array_js__WEBPACK_IMPORTED_MODULE_7__.genericArray\n      : typeof b.valueOf !== \"function\" && typeof b.toString !== \"function\" || isNaN(b) ? _object_js__WEBPACK_IMPORTED_MODULE_8__.default\n      : _number_js__WEBPACK_IMPORTED_MODULE_1__.default)(a, b);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/value.js?");

/***/ }),

/***/ "./node_modules/d3-interpolate/src/zoom.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/zoom.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar epsilon2 = 1e-12;\n\nfunction cosh(x) {\n  return ((x = Math.exp(x)) + 1 / x) / 2;\n}\n\nfunction sinh(x) {\n  return ((x = Math.exp(x)) - 1 / x) / 2;\n}\n\nfunction tanh(x) {\n  return ((x = Math.exp(2 * x)) - 1) / (x + 1);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function zoomRho(rho, rho2, rho4) {\n\n  // p0 = [ux0, uy0, w0]\n  // p1 = [ux1, uy1, w1]\n  function zoom(p0, p1) {\n    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],\n        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],\n        dx = ux1 - ux0,\n        dy = uy1 - uy0,\n        d2 = dx * dx + dy * dy,\n        i,\n        S;\n\n    // Special case for u0 ≅ u1.\n    if (d2 < epsilon2) {\n      S = Math.log(w1 / w0) / rho;\n      i = function(t) {\n        return [\n          ux0 + t * dx,\n          uy0 + t * dy,\n          w0 * Math.exp(rho * t * S)\n        ];\n      }\n    }\n\n    // General case.\n    else {\n      var d1 = Math.sqrt(d2),\n          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),\n          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),\n          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),\n          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);\n      S = (r1 - r0) / rho;\n      i = function(t) {\n        var s = t * S,\n            coshr0 = cosh(r0),\n            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));\n        return [\n          ux0 + u * dx,\n          uy0 + u * dy,\n          w0 * coshr0 / cosh(rho * s + r0)\n        ];\n      }\n    }\n\n    i.duration = S * 1000 * rho / Math.SQRT2;\n\n    return i;\n  }\n\n  zoom.rho = function(_) {\n    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;\n    return zoomRho(_1, _2, _4);\n  };\n\n  return zoom;\n})(Math.SQRT2, 2, 4));\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-interpolate/src/zoom.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/array.js":
/*!************************************************!*\
  !*** ./node_modules/d3-selection/src/array.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ array)\n/* harmony export */ });\n// Given something array like (or null), returns something that is strictly an\n// array. This is used to ensure that array-like objects passed to d3.selectAll\n// or selection.selectAll are converted into proper arrays when creating a\n// selection; we don’t ever want to create a selection backed by a live\n// HTMLCollection or NodeList. However, note that selection.selectAll will use a\n// static NodeList as a group, since it safely derived from querySelectorAll.\nfunction array(x) {\n  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/array.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/constant.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/constant.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {\n  return function() {\n    return x;\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/constant.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/creator.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/creator.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namespace.js */ \"./node_modules/d3-selection/src/namespace.js\");\n/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ \"./node_modules/d3-selection/src/namespaces.js\");\n\n\n\nfunction creatorInherit(name) {\n  return function() {\n    var document = this.ownerDocument,\n        uri = this.namespaceURI;\n    return uri === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml && document.documentElement.namespaceURI === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml\n        ? document.createElement(name)\n        : document.createElementNS(uri, name);\n  };\n}\n\nfunction creatorFixed(fullname) {\n  return function() {\n    return this.ownerDocument.createElementNS(fullname.space, fullname.local);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_1__.default)(name);\n  return (fullname.local\n      ? creatorFixed\n      : creatorInherit)(fullname);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/creator.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/d3-selection/src/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"select\": () => (/* reexport safe */ _select_js__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"selectAll\": () => (/* reexport safe */ _selectAll_js__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ \"./node_modules/d3-selection/src/select.js\");\n/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll.js */ \"./node_modules/d3-selection/src/selectAll.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/matcher.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/matcher.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"childMatcher\": () => (/* binding */ childMatcher)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return function() {\n    return this.matches(selector);\n  };\n}\n\nfunction childMatcher(selector) {\n  return function(node) {\n    return node.matches(selector);\n  };\n}\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/matcher.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/namespace.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespace.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ \"./node_modules/d3-selection/src/namespaces.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var prefix = name += \"\", i = prefix.indexOf(\":\");\n  if (i >= 0 && (prefix = name.slice(0, i)) !== \"xmlns\") name = name.slice(i + 1);\n  return _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.default.hasOwnProperty(prefix) ? {space: _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.default[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/namespace.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/namespaces.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespaces.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"xhtml\": () => (/* binding */ xhtml),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar xhtml = \"http://www.w3.org/1999/xhtml\";\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  svg: \"http://www.w3.org/2000/svg\",\n  xhtml: xhtml,\n  xlink: \"http://www.w3.org/1999/xlink\",\n  xml: \"http://www.w3.org/XML/1998/namespace\",\n  xmlns: \"http://www.w3.org/2000/xmlns/\"\n});\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/namespaces.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/pointer.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/pointer.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent.js */ \"./node_modules/d3-selection/src/sourceEvent.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event, node) {\n  event = (0,_sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__.default)(event);\n  if (node === undefined) node = event.currentTarget;\n  if (node) {\n    var svg = node.ownerSVGElement || node;\n    if (svg.createSVGPoint) {\n      var point = svg.createSVGPoint();\n      point.x = event.clientX, point.y = event.clientY;\n      point = point.matrixTransform(node.getScreenCTM().inverse());\n      return [point.x, point.y];\n    }\n    if (node.getBoundingClientRect) {\n      var rect = node.getBoundingClientRect();\n      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];\n    }\n  }\n  return [event.pageX, event.pageY];\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/pointer.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/select.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/select.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return typeof selector === \"string\"\n      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[document.querySelector(selector)]], [document.documentElement])\n      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[selector]], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.root);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/select.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selectAll.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-selection/src/selectAll.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array.js */ \"./node_modules/d3-selection/src/array.js\");\n/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return typeof selector === \"string\"\n      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([document.querySelectorAll(selector)], [document.documentElement])\n      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([(0,_array_js__WEBPACK_IMPORTED_MODULE_1__.default)(selector)], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.root);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selectAll.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/append.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/append.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ \"./node_modules/d3-selection/src/creator.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var create = typeof name === \"function\" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__.default)(name);\n  return this.select(function() {\n    return this.appendChild(create.apply(this, arguments));\n  });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/append.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/attr.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/attr.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../namespace.js */ \"./node_modules/d3-selection/src/namespace.js\");\n\n\nfunction attrRemove(name) {\n  return function() {\n    this.removeAttribute(name);\n  };\n}\n\nfunction attrRemoveNS(fullname) {\n  return function() {\n    this.removeAttributeNS(fullname.space, fullname.local);\n  };\n}\n\nfunction attrConstant(name, value) {\n  return function() {\n    this.setAttribute(name, value);\n  };\n}\n\nfunction attrConstantNS(fullname, value) {\n  return function() {\n    this.setAttributeNS(fullname.space, fullname.local, value);\n  };\n}\n\nfunction attrFunction(name, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.removeAttribute(name);\n    else this.setAttribute(name, v);\n  };\n}\n\nfunction attrFunctionNS(fullname, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);\n    else this.setAttributeNS(fullname.space, fullname.local, v);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_0__.default)(name);\n\n  if (arguments.length < 2) {\n    var node = this.node();\n    return fullname.local\n        ? node.getAttributeNS(fullname.space, fullname.local)\n        : node.getAttribute(fullname);\n  }\n\n  return this.each((value == null\n      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === \"function\"\n      ? (fullname.local ? attrFunctionNS : attrFunction)\n      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/attr.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/call.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/call.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var callback = arguments[0];\n  arguments[0] = this;\n  callback.apply(null, arguments);\n  return this;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/call.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/classed.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/classed.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction classArray(string) {\n  return string.trim().split(/^|\\s+/);\n}\n\nfunction classList(node) {\n  return node.classList || new ClassList(node);\n}\n\nfunction ClassList(node) {\n  this._node = node;\n  this._names = classArray(node.getAttribute(\"class\") || \"\");\n}\n\nClassList.prototype = {\n  add: function(name) {\n    var i = this._names.indexOf(name);\n    if (i < 0) {\n      this._names.push(name);\n      this._node.setAttribute(\"class\", this._names.join(\" \"));\n    }\n  },\n  remove: function(name) {\n    var i = this._names.indexOf(name);\n    if (i >= 0) {\n      this._names.splice(i, 1);\n      this._node.setAttribute(\"class\", this._names.join(\" \"));\n    }\n  },\n  contains: function(name) {\n    return this._names.indexOf(name) >= 0;\n  }\n};\n\nfunction classedAdd(node, names) {\n  var list = classList(node), i = -1, n = names.length;\n  while (++i < n) list.add(names[i]);\n}\n\nfunction classedRemove(node, names) {\n  var list = classList(node), i = -1, n = names.length;\n  while (++i < n) list.remove(names[i]);\n}\n\nfunction classedTrue(names) {\n  return function() {\n    classedAdd(this, names);\n  };\n}\n\nfunction classedFalse(names) {\n  return function() {\n    classedRemove(this, names);\n  };\n}\n\nfunction classedFunction(names, value) {\n  return function() {\n    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var names = classArray(name + \"\");\n\n  if (arguments.length < 2) {\n    var list = classList(this.node()), i = -1, n = names.length;\n    while (++i < n) if (!list.contains(names[i])) return false;\n    return true;\n  }\n\n  return this.each((typeof value === \"function\"\n      ? classedFunction : value\n      ? classedTrue\n      : classedFalse)(names, value));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/classed.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/clone.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/clone.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction selection_cloneShallow() {\n  var clone = this.cloneNode(false), parent = this.parentNode;\n  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;\n}\n\nfunction selection_cloneDeep() {\n  var clone = this.cloneNode(true), parent = this.parentNode;\n  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(deep) {\n  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/clone.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/data.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/data.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enter.js */ \"./node_modules/d3-selection/src/selection/enter.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constant.js */ \"./node_modules/d3-selection/src/constant.js\");\n\n\n\n\nfunction bindIndex(parent, group, enter, update, exit, data) {\n  var i = 0,\n      node,\n      groupLength = group.length,\n      dataLength = data.length;\n\n  // Put any non-null nodes that fit into update.\n  // Put any null nodes into enter.\n  // Put any remaining data into enter.\n  for (; i < dataLength; ++i) {\n    if (node = group[i]) {\n      node.__data__ = data[i];\n      update[i] = node;\n    } else {\n      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);\n    }\n  }\n\n  // Put any non-null nodes that don’t fit into exit.\n  for (; i < groupLength; ++i) {\n    if (node = group[i]) {\n      exit[i] = node;\n    }\n  }\n}\n\nfunction bindKey(parent, group, enter, update, exit, data, key) {\n  var i,\n      node,\n      nodeByKeyValue = new Map,\n      groupLength = group.length,\n      dataLength = data.length,\n      keyValues = new Array(groupLength),\n      keyValue;\n\n  // Compute the key for each node.\n  // If multiple nodes have the same key, the duplicates are added to exit.\n  for (i = 0; i < groupLength; ++i) {\n    if (node = group[i]) {\n      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + \"\";\n      if (nodeByKeyValue.has(keyValue)) {\n        exit[i] = node;\n      } else {\n        nodeByKeyValue.set(keyValue, node);\n      }\n    }\n  }\n\n  // Compute the key for each datum.\n  // If there a node associated with this key, join and add it to update.\n  // If there is not (or the key is a duplicate), add it to enter.\n  for (i = 0; i < dataLength; ++i) {\n    keyValue = key.call(parent, data[i], i, data) + \"\";\n    if (node = nodeByKeyValue.get(keyValue)) {\n      update[i] = node;\n      node.__data__ = data[i];\n      nodeByKeyValue.delete(keyValue);\n    } else {\n      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);\n    }\n  }\n\n  // Add any remaining nodes that were not bound to data to exit.\n  for (i = 0; i < groupLength; ++i) {\n    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {\n      exit[i] = node;\n    }\n  }\n}\n\nfunction datum(node) {\n  return node.__data__;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value, key) {\n  if (!arguments.length) return Array.from(this, datum);\n\n  var bind = key ? bindKey : bindIndex,\n      parents = this._parents,\n      groups = this._groups;\n\n  if (typeof value !== \"function\") value = (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(value);\n\n  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {\n    var parent = parents[j],\n        group = groups[j],\n        groupLength = group.length,\n        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),\n        dataLength = data.length,\n        enterGroup = enter[j] = new Array(dataLength),\n        updateGroup = update[j] = new Array(dataLength),\n        exitGroup = exit[j] = new Array(groupLength);\n\n    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);\n\n    // Now connect the enter nodes to their following update node, such that\n    // appendChild can insert the materialized enter node before this node,\n    // rather than at the end of the parent node.\n    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {\n      if (previous = enterGroup[i0]) {\n        if (i0 >= i1) i1 = i0 + 1;\n        while (!(next = updateGroup[i1]) && ++i1 < dataLength);\n        previous._next = next || null;\n      }\n    }\n  }\n\n  update = new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(update, parents);\n  update._enter = enter;\n  update._exit = exit;\n  return update;\n}\n\n// Given some data, this returns an array-like view of it: an object that\n// exposes a length property and allows numeric indexing. Note that unlike\n// selectAll, this isn’t worried about “live” collections because the resulting\n// array will only be used briefly while data is being bound. (It is possible to\n// cause the data to change while iterating by using a key function, but please\n// don’t; we’d rather avoid a gratuitous copy.)\nfunction arraylike(data) {\n  return typeof data === \"object\" && \"length\" in data\n    ? data // Array, TypedArray, NodeList, array-like\n    : Array.from(data); // Map, Set, iterable, string, or anything else\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/data.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/datum.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/datum.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return arguments.length\n      ? this.property(\"__data__\", value)\n      : this.node().__data__;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/datum.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/dispatch.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/dispatch.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ \"./node_modules/d3-selection/src/window.js\");\n\n\nfunction dispatchEvent(node, type, params) {\n  var window = (0,_window_js__WEBPACK_IMPORTED_MODULE_0__.default)(node),\n      event = window.CustomEvent;\n\n  if (typeof event === \"function\") {\n    event = new event(type, params);\n  } else {\n    event = window.document.createEvent(\"Event\");\n    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;\n    else event.initEvent(type, false, false);\n  }\n\n  node.dispatchEvent(event);\n}\n\nfunction dispatchConstant(type, params) {\n  return function() {\n    return dispatchEvent(this, type, params);\n  };\n}\n\nfunction dispatchFunction(type, params) {\n  return function() {\n    return dispatchEvent(this, type, params.apply(this, arguments));\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(type, params) {\n  return this.each((typeof params === \"function\"\n      ? dispatchFunction\n      : dispatchConstant)(type, params));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/dispatch.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/each.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/each.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {\n\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {\n      if (node = group[i]) callback.call(node, node.__data__, i, group);\n    }\n  }\n\n  return this;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/each.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/empty.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/empty.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return !this.node();\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/empty.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/enter.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/enter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"EnterNode\": () => (/* binding */ EnterNode)\n/* harmony export */ });\n/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ \"./node_modules/d3-selection/src/selection/sparse.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._enter || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__.default), this._parents);\n}\n\nfunction EnterNode(parent, datum) {\n  this.ownerDocument = parent.ownerDocument;\n  this.namespaceURI = parent.namespaceURI;\n  this._next = null;\n  this._parent = parent;\n  this.__data__ = datum;\n}\n\nEnterNode.prototype = {\n  constructor: EnterNode,\n  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },\n  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },\n  querySelector: function(selector) { return this._parent.querySelector(selector); },\n  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }\n};\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/enter.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/exit.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/exit.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ \"./node_modules/d3-selection/src/selection/sparse.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._exit || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__.default), this._parents);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/exit.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/filter.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ \"./node_modules/d3-selection/src/matcher.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  if (typeof match !== \"function\") match = (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.default)(match);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {\n      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {\n        subgroup.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/filter.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/html.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/html.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction htmlRemove() {\n  this.innerHTML = \"\";\n}\n\nfunction htmlConstant(value) {\n  return function() {\n    this.innerHTML = value;\n  };\n}\n\nfunction htmlFunction(value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    this.innerHTML = v == null ? \"\" : v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return arguments.length\n      ? this.each(value == null\n          ? htmlRemove : (typeof value === \"function\"\n          ? htmlFunction\n          : htmlConstant)(value))\n      : this.node().innerHTML;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/html.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"root\": () => (/* binding */ root),\n/* harmony export */   \"Selection\": () => (/* binding */ Selection),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ \"./node_modules/d3-selection/src/selection/select.js\");\n/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll.js */ \"./node_modules/d3-selection/src/selection/selectAll.js\");\n/* harmony import */ var _selectChild_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectChild.js */ \"./node_modules/d3-selection/src/selection/selectChild.js\");\n/* harmony import */ var _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectChildren.js */ \"./node_modules/d3-selection/src/selection/selectChildren.js\");\n/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter.js */ \"./node_modules/d3-selection/src/selection/filter.js\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.js */ \"./node_modules/d3-selection/src/selection/data.js\");\n/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enter.js */ \"./node_modules/d3-selection/src/selection/enter.js\");\n/* harmony import */ var _exit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exit.js */ \"./node_modules/d3-selection/src/selection/exit.js\");\n/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./join.js */ \"./node_modules/d3-selection/src/selection/join.js\");\n/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./merge.js */ \"./node_modules/d3-selection/src/selection/merge.js\");\n/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order.js */ \"./node_modules/d3-selection/src/selection/order.js\");\n/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sort.js */ \"./node_modules/d3-selection/src/selection/sort.js\");\n/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./call.js */ \"./node_modules/d3-selection/src/selection/call.js\");\n/* harmony import */ var _nodes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes.js */ \"./node_modules/d3-selection/src/selection/nodes.js\");\n/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node.js */ \"./node_modules/d3-selection/src/selection/node.js\");\n/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./size.js */ \"./node_modules/d3-selection/src/selection/size.js\");\n/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./empty.js */ \"./node_modules/d3-selection/src/selection/empty.js\");\n/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./each.js */ \"./node_modules/d3-selection/src/selection/each.js\");\n/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./attr.js */ \"./node_modules/d3-selection/src/selection/attr.js\");\n/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./style.js */ \"./node_modules/d3-selection/src/selection/style.js\");\n/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./property.js */ \"./node_modules/d3-selection/src/selection/property.js\");\n/* harmony import */ var _classed_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./classed.js */ \"./node_modules/d3-selection/src/selection/classed.js\");\n/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./text.js */ \"./node_modules/d3-selection/src/selection/text.js\");\n/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./html.js */ \"./node_modules/d3-selection/src/selection/html.js\");\n/* harmony import */ var _raise_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./raise.js */ \"./node_modules/d3-selection/src/selection/raise.js\");\n/* harmony import */ var _lower_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lower.js */ \"./node_modules/d3-selection/src/selection/lower.js\");\n/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./append.js */ \"./node_modules/d3-selection/src/selection/append.js\");\n/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./insert.js */ \"./node_modules/d3-selection/src/selection/insert.js\");\n/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./remove.js */ \"./node_modules/d3-selection/src/selection/remove.js\");\n/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./clone.js */ \"./node_modules/d3-selection/src/selection/clone.js\");\n/* harmony import */ var _datum_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./datum.js */ \"./node_modules/d3-selection/src/selection/datum.js\");\n/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./on.js */ \"./node_modules/d3-selection/src/selection/on.js\");\n/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./dispatch.js */ \"./node_modules/d3-selection/src/selection/dispatch.js\");\n/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./iterator.js */ \"./node_modules/d3-selection/src/selection/iterator.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar root = [null];\n\nfunction Selection(groups, parents) {\n  this._groups = groups;\n  this._parents = parents;\n}\n\nfunction selection() {\n  return new Selection([[document.documentElement]], root);\n}\n\nfunction selection_selection() {\n  return this;\n}\n\nSelection.prototype = selection.prototype = {\n  constructor: Selection,\n  select: _select_js__WEBPACK_IMPORTED_MODULE_0__.default,\n  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  selectChild: _selectChild_js__WEBPACK_IMPORTED_MODULE_2__.default,\n  selectChildren: _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__.default,\n  filter: _filter_js__WEBPACK_IMPORTED_MODULE_4__.default,\n  data: _data_js__WEBPACK_IMPORTED_MODULE_5__.default,\n  enter: _enter_js__WEBPACK_IMPORTED_MODULE_6__.default,\n  exit: _exit_js__WEBPACK_IMPORTED_MODULE_7__.default,\n  join: _join_js__WEBPACK_IMPORTED_MODULE_8__.default,\n  merge: _merge_js__WEBPACK_IMPORTED_MODULE_9__.default,\n  selection: selection_selection,\n  order: _order_js__WEBPACK_IMPORTED_MODULE_10__.default,\n  sort: _sort_js__WEBPACK_IMPORTED_MODULE_11__.default,\n  call: _call_js__WEBPACK_IMPORTED_MODULE_12__.default,\n  nodes: _nodes_js__WEBPACK_IMPORTED_MODULE_13__.default,\n  node: _node_js__WEBPACK_IMPORTED_MODULE_14__.default,\n  size: _size_js__WEBPACK_IMPORTED_MODULE_15__.default,\n  empty: _empty_js__WEBPACK_IMPORTED_MODULE_16__.default,\n  each: _each_js__WEBPACK_IMPORTED_MODULE_17__.default,\n  attr: _attr_js__WEBPACK_IMPORTED_MODULE_18__.default,\n  style: _style_js__WEBPACK_IMPORTED_MODULE_19__.default,\n  property: _property_js__WEBPACK_IMPORTED_MODULE_20__.default,\n  classed: _classed_js__WEBPACK_IMPORTED_MODULE_21__.default,\n  text: _text_js__WEBPACK_IMPORTED_MODULE_22__.default,\n  html: _html_js__WEBPACK_IMPORTED_MODULE_23__.default,\n  raise: _raise_js__WEBPACK_IMPORTED_MODULE_24__.default,\n  lower: _lower_js__WEBPACK_IMPORTED_MODULE_25__.default,\n  append: _append_js__WEBPACK_IMPORTED_MODULE_26__.default,\n  insert: _insert_js__WEBPACK_IMPORTED_MODULE_27__.default,\n  remove: _remove_js__WEBPACK_IMPORTED_MODULE_28__.default,\n  clone: _clone_js__WEBPACK_IMPORTED_MODULE_29__.default,\n  datum: _datum_js__WEBPACK_IMPORTED_MODULE_30__.default,\n  on: _on_js__WEBPACK_IMPORTED_MODULE_31__.default,\n  dispatch: _dispatch_js__WEBPACK_IMPORTED_MODULE_32__.default,\n  [Symbol.iterator]: _iterator_js__WEBPACK_IMPORTED_MODULE_33__.default\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selection);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/index.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/insert.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/insert.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ \"./node_modules/d3-selection/src/creator.js\");\n/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector.js */ \"./node_modules/d3-selection/src/selector.js\");\n\n\n\nfunction constantNull() {\n  return null;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, before) {\n  var create = typeof name === \"function\" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__.default)(name),\n      select = before == null ? constantNull : typeof before === \"function\" ? before : (0,_selector_js__WEBPACK_IMPORTED_MODULE_1__.default)(before);\n  return this.select(function() {\n    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);\n  });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/insert.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/iterator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function* __WEBPACK_DEFAULT_EXPORT__() {\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {\n      if (node = group[i]) yield node;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/iterator.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/join.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/join.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(onenter, onupdate, onexit) {\n  var enter = this.enter(), update = this, exit = this.exit();\n  if (typeof onenter === \"function\") {\n    enter = onenter(enter);\n    if (enter) enter = enter.selection();\n  } else {\n    enter = enter.append(onenter + \"\");\n  }\n  if (onupdate != null) {\n    update = onupdate(update);\n    if (update) update = update.selection();\n  }\n  if (onexit == null) exit.remove(); else onexit(exit);\n  return enter && update ? enter.merge(update).order() : update;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/join.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/lower.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/lower.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction lower() {\n  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.each(lower);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/lower.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/merge.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/merge.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {\n  var selection = context.selection ? context.selection() : context;\n\n  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {\n    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group0[i] || group1[i]) {\n        merge[i] = node;\n      }\n    }\n  }\n\n  for (; j < m0; ++j) {\n    merges[j] = groups0[j];\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(merges, this._parents);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/merge.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/node.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/node.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {\n      var node = group[i];\n      if (node) return node;\n    }\n  }\n\n  return null;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/node.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/nodes.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/nodes.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return Array.from(this);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/nodes.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction contextListener(listener) {\n  return function(event) {\n    listener.call(this, event, this.__data__);\n  };\n}\n\nfunction parseTypenames(typenames) {\n  return typenames.trim().split(/^|\\s+/).map(function(t) {\n    var name = \"\", i = t.indexOf(\".\");\n    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);\n    return {type: t, name: name};\n  });\n}\n\nfunction onRemove(typename) {\n  return function() {\n    var on = this.__on;\n    if (!on) return;\n    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {\n      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {\n        this.removeEventListener(o.type, o.listener, o.options);\n      } else {\n        on[++i] = o;\n      }\n    }\n    if (++i) on.length = i;\n    else delete this.__on;\n  };\n}\n\nfunction onAdd(typename, value, options) {\n  return function() {\n    var on = this.__on, o, listener = contextListener(value);\n    if (on) for (var j = 0, m = on.length; j < m; ++j) {\n      if ((o = on[j]).type === typename.type && o.name === typename.name) {\n        this.removeEventListener(o.type, o.listener, o.options);\n        this.addEventListener(o.type, o.listener = listener, o.options = options);\n        o.value = value;\n        return;\n      }\n    }\n    this.addEventListener(typename.type, listener, options);\n    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};\n    if (!on) this.__on = [o];\n    else on.push(o);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(typename, value, options) {\n  var typenames = parseTypenames(typename + \"\"), i, n = typenames.length, t;\n\n  if (arguments.length < 2) {\n    var on = this.node().__on;\n    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {\n      for (i = 0, o = on[j]; i < n; ++i) {\n        if ((t = typenames[i]).type === o.type && t.name === o.name) {\n          return o.value;\n        }\n      }\n    }\n    return;\n  }\n\n  on = value ? onAdd : onRemove;\n  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));\n  return this;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/on.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/order.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/order.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n\n  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {\n    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {\n      if (node = group[i]) {\n        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);\n        next = node;\n      }\n    }\n  }\n\n  return this;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/order.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/property.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/property.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction propertyRemove(name) {\n  return function() {\n    delete this[name];\n  };\n}\n\nfunction propertyConstant(name, value) {\n  return function() {\n    this[name] = value;\n  };\n}\n\nfunction propertyFunction(name, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) delete this[name];\n    else this[name] = v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  return arguments.length > 1\n      ? this.each((value == null\n          ? propertyRemove : typeof value === \"function\"\n          ? propertyFunction\n          : propertyConstant)(name, value))\n      : this.node()[name];\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/property.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/raise.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/raise.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction raise() {\n  if (this.nextSibling) this.parentNode.appendChild(this);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.each(raise);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/raise.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/remove.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/remove.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction remove() {\n  var parent = this.parentNode;\n  if (parent) parent.removeChild(this);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.each(remove);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/remove.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/select.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/select.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selector.js */ \"./node_modules/d3-selection/src/selector.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {\n  if (typeof select !== \"function\") select = (0,_selector_js__WEBPACK_IMPORTED_MODULE_0__.default)(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {\n      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {\n        if (\"__data__\" in node) subnode.__data__ = node.__data__;\n        subgroup[i] = subnode;\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/select.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectAll.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectAll.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array.js */ \"./node_modules/d3-selection/src/array.js\");\n/* harmony import */ var _selectorAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectorAll.js */ \"./node_modules/d3-selection/src/selectorAll.js\");\n\n\n\n\nfunction arrayAll(select) {\n  return function() {\n    return (0,_array_js__WEBPACK_IMPORTED_MODULE_0__.default)(select.apply(this, arguments));\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {\n  if (typeof select === \"function\") select = arrayAll(select);\n  else select = (0,_selectorAll_js__WEBPACK_IMPORTED_MODULE_1__.default)(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        subgroups.push(select.call(node, node.__data__, i, group));\n        parents.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(subgroups, parents);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/selectAll.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChild.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChild.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ \"./node_modules/d3-selection/src/matcher.js\");\n\n\nvar find = Array.prototype.find;\n\nfunction childFind(match) {\n  return function() {\n    return find.call(this.children, match);\n  };\n}\n\nfunction childFirst() {\n  return this.firstElementChild;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  return this.select(match == null ? childFirst\n      : childFind(typeof match === \"function\" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/selectChild.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChildren.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChildren.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ \"./node_modules/d3-selection/src/matcher.js\");\n\n\nvar filter = Array.prototype.filter;\n\nfunction children() {\n  return Array.from(this.children);\n}\n\nfunction childrenFilter(match) {\n  return function() {\n    return filter.call(this.children, match);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  return this.selectAll(match == null ? children\n      : childrenFilter(typeof match === \"function\" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/selectChildren.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/size.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/size.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  let size = 0;\n  for (const node of this) ++size; // eslint-disable-line no-unused-vars\n  return size;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/size.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sort.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {\n  if (!compare) compare = ascending;\n\n  function compareNode(a, b) {\n    return a && b ? compare(a.__data__, b.__data__) : !a - !b;\n  }\n\n  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        sortgroup[i] = node;\n      }\n    }\n    sortgroup.sort(compareNode);\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(sortgroups, this._parents).order();\n}\n\nfunction ascending(a, b) {\n  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/sort.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sparse.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sparse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(update) {\n  return new Array(update.length);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/sparse.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/style.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/style.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"styleValue\": () => (/* binding */ styleValue)\n/* harmony export */ });\n/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ \"./node_modules/d3-selection/src/window.js\");\n\n\nfunction styleRemove(name) {\n  return function() {\n    this.style.removeProperty(name);\n  };\n}\n\nfunction styleConstant(name, value, priority) {\n  return function() {\n    this.style.setProperty(name, value, priority);\n  };\n}\n\nfunction styleFunction(name, value, priority) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.style.removeProperty(name);\n    else this.style.setProperty(name, v, priority);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {\n  return arguments.length > 1\n      ? this.each((value == null\n            ? styleRemove : typeof value === \"function\"\n            ? styleFunction\n            : styleConstant)(name, value, priority == null ? \"\" : priority))\n      : styleValue(this.node(), name);\n}\n\nfunction styleValue(node, name) {\n  return node.style.getPropertyValue(name)\n      || (0,_window_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).getComputedStyle(node, null).getPropertyValue(name);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/style.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/text.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/text.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction textRemove() {\n  this.textContent = \"\";\n}\n\nfunction textConstant(value) {\n  return function() {\n    this.textContent = value;\n  };\n}\n\nfunction textFunction(value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    this.textContent = v == null ? \"\" : v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return arguments.length\n      ? this.each(value == null\n          ? textRemove : (typeof value === \"function\"\n          ? textFunction\n          : textConstant)(value))\n      : this.node().textContent;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selection/text.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selector.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/selector.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction none() {}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return selector == null ? none : function() {\n    return this.querySelector(selector);\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selector.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selectorAll.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/selectorAll.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction empty() {\n  return [];\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return selector == null ? empty : function() {\n    return this.querySelectorAll(selector);\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/selectorAll.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/sourceEvent.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/sourceEvent.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {\n  let sourceEvent;\n  while (sourceEvent = event.sourceEvent) event = sourceEvent;\n  return event;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/sourceEvent.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/window.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/window.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {\n  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node\n      || (node.document && node) // node is a Window\n      || node.defaultView; // node is a Document\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-selection/src/window.js?");

/***/ }),

/***/ "./node_modules/d3-timer/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"timer\": () => (/* reexport safe */ _timer_js__WEBPACK_IMPORTED_MODULE_0__.timer)\n/* harmony export */ });\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"./node_modules/d3-timer/src/timer.js\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-timer/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-timer/src/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-timer/src/timeout.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"./node_modules/d3-timer/src/timer.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, delay, time) {\n  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__.Timer;\n  delay = delay == null ? 0 : +delay;\n  t.restart(elapsed => {\n    t.stop();\n    callback(elapsed + delay);\n  }, delay, time);\n  return t;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-timer/src/timeout.js?");

/***/ }),

/***/ "./node_modules/d3-timer/src/timer.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/timer.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"now\": () => (/* binding */ now),\n/* harmony export */   \"Timer\": () => (/* binding */ Timer),\n/* harmony export */   \"timer\": () => (/* binding */ timer)\n/* harmony export */ });\n/* unused harmony export timerFlush */\nvar frame = 0, // is an animation frame pending?\n    timeout = 0, // is a timeout pending?\n    interval = 0, // are any timers active?\n    pokeDelay = 1000, // how frequently we check for clock skew\n    taskHead,\n    taskTail,\n    clockLast = 0,\n    clockNow = 0,\n    clockSkew = 0,\n    clock = typeof performance === \"object\" && performance.now ? performance : Date,\n    setFrame = typeof window === \"object\" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };\n\nfunction now() {\n  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);\n}\n\nfunction clearNow() {\n  clockNow = 0;\n}\n\nfunction Timer() {\n  this._call =\n  this._time =\n  this._next = null;\n}\n\nTimer.prototype = timer.prototype = {\n  constructor: Timer,\n  restart: function(callback, delay, time) {\n    if (typeof callback !== \"function\") throw new TypeError(\"callback is not a function\");\n    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);\n    if (!this._next && taskTail !== this) {\n      if (taskTail) taskTail._next = this;\n      else taskHead = this;\n      taskTail = this;\n    }\n    this._call = callback;\n    this._time = time;\n    sleep();\n  },\n  stop: function() {\n    if (this._call) {\n      this._call = null;\n      this._time = Infinity;\n      sleep();\n    }\n  }\n};\n\nfunction timer(callback, delay, time) {\n  var t = new Timer;\n  t.restart(callback, delay, time);\n  return t;\n}\n\nfunction timerFlush() {\n  now(); // Get the current time, if not already set.\n  ++frame; // Pretend we’ve set an alarm, if we haven’t already.\n  var t = taskHead, e;\n  while (t) {\n    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);\n    t = t._next;\n  }\n  --frame;\n}\n\nfunction wake() {\n  clockNow = (clockLast = clock.now()) + clockSkew;\n  frame = timeout = 0;\n  try {\n    timerFlush();\n  } finally {\n    frame = 0;\n    nap();\n    clockNow = 0;\n  }\n}\n\nfunction poke() {\n  var now = clock.now(), delay = now - clockLast;\n  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;\n}\n\nfunction nap() {\n  var t0, t1 = taskHead, t2, time = Infinity;\n  while (t1) {\n    if (t1._call) {\n      if (time > t1._time) time = t1._time;\n      t0 = t1, t1 = t1._next;\n    } else {\n      t2 = t1._next, t1._next = null;\n      t1 = t0 ? t0._next = t2 : taskHead = t2;\n    }\n  }\n  taskTail = t0;\n  sleep(time);\n}\n\nfunction sleep(time) {\n  if (frame) return; // Soonest alarm already set, or will be.\n  if (timeout) timeout = clearTimeout(timeout);\n  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.\n  if (delay > 24) {\n    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);\n    if (interval) interval = clearInterval(interval);\n  } else {\n    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);\n    frame = 1, setFrame(wake);\n  }\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-timer/src/timer.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-transition/src/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"interrupt\": () => (/* reexport safe */ _interrupt_js__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ \"./node_modules/d3-transition/src/selection/index.js\");\n/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interrupt.js */ \"./node_modules/d3-transition/src/interrupt.js\");\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/interrupt.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-transition/src/interrupt.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name) {\n  var schedules = node.__transition,\n      schedule,\n      active,\n      empty = true,\n      i;\n\n  if (!schedules) return;\n\n  name = name == null ? null : name + \"\";\n\n  for (i in schedules) {\n    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }\n    active = schedule.state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.STARTING && schedule.state < _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.ENDING;\n    schedule.state = _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.ENDED;\n    schedule.timer.stop();\n    schedule.on.call(active ? \"interrupt\" : \"cancel\", node, node.__data__, schedule.index, schedule.group);\n    delete schedules[i];\n  }\n\n  if (empty) delete node.__transition;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/interrupt.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/selection/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interrupt.js */ \"./node_modules/d3-transition/src/selection/interrupt.js\");\n/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transition.js */ \"./node_modules/d3-transition/src/selection/transition.js\");\n\n\n\n\nd3_selection__WEBPACK_IMPORTED_MODULE_0__.default.prototype.interrupt = _interrupt_js__WEBPACK_IMPORTED_MODULE_1__.default;\nd3_selection__WEBPACK_IMPORTED_MODULE_0__.default.prototype.transition = _transition_js__WEBPACK_IMPORTED_MODULE_2__.default;\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/selection/index.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/selection/interrupt.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/interrupt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interrupt.js */ \"./node_modules/d3-transition/src/interrupt.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  return this.each(function() {\n    (0,_interrupt_js__WEBPACK_IMPORTED_MODULE_0__.default)(this, name);\n  });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/selection/interrupt.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/selection/transition.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/transition.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transition/index.js */ \"./node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transition/schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-ease */ \"./node_modules/d3-ease/src/cubic.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-timer */ \"./node_modules/d3-timer/src/timer.js\");\n\n\n\n\n\nvar defaultTiming = {\n  time: null, // Set on use.\n  delay: 0,\n  duration: 250,\n  ease: d3_ease__WEBPACK_IMPORTED_MODULE_0__.cubicInOut\n};\n\nfunction inherit(node, id) {\n  var timing;\n  while (!(timing = node.__transition) || !(timing = timing[id])) {\n    if (!(node = node.parentNode)) {\n      throw new Error(`transition ${id} not found`);\n    }\n  }\n  return timing;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var id,\n      timing;\n\n  if (name instanceof _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition) {\n    id = name._id, name = name._name;\n  } else {\n    id = (0,_transition_index_js__WEBPACK_IMPORTED_MODULE_1__.newId)(), (timing = defaultTiming).time = (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__.now)(), name = name == null ? null : name + \"\";\n  }\n\n  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        (0,_transition_schedule_js__WEBPACK_IMPORTED_MODULE_3__.default)(node, name, id, i, group, timing || inherit(node, id));\n      }\n    }\n  }\n\n  return new _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition(groups, this._parents, name, id);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/selection/transition.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/attr.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/attr.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/transform/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/namespace.js\");\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tween.js */ \"./node_modules/d3-transition/src/transition/tween.js\");\n/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interpolate.js */ \"./node_modules/d3-transition/src/transition/interpolate.js\");\n\n\n\n\n\nfunction attrRemove(name) {\n  return function() {\n    this.removeAttribute(name);\n  };\n}\n\nfunction attrRemoveNS(fullname) {\n  return function() {\n    this.removeAttributeNS(fullname.space, fullname.local);\n  };\n}\n\nfunction attrConstant(name, interpolate, value1) {\n  var string00,\n      string1 = value1 + \"\",\n      interpolate0;\n  return function() {\n    var string0 = this.getAttribute(name);\n    return string0 === string1 ? null\n        : string0 === string00 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, value1);\n  };\n}\n\nfunction attrConstantNS(fullname, interpolate, value1) {\n  var string00,\n      string1 = value1 + \"\",\n      interpolate0;\n  return function() {\n    var string0 = this.getAttributeNS(fullname.space, fullname.local);\n    return string0 === string1 ? null\n        : string0 === string00 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, value1);\n  };\n}\n\nfunction attrFunction(name, interpolate, value) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0, value1 = value(this), string1;\n    if (value1 == null) return void this.removeAttribute(name);\n    string0 = this.getAttribute(name);\n    string1 = value1 + \"\";\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));\n  };\n}\n\nfunction attrFunctionNS(fullname, interpolate, value) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0, value1 = value(this), string1;\n    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);\n    string0 = this.getAttributeNS(fullname.space, fullname.local);\n    string1 = value1 + \"\";\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var fullname = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(name), i = fullname === \"transform\" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__.interpolateTransformSvg : _interpolate_js__WEBPACK_IMPORTED_MODULE_2__.default;\n  return this.attrTween(name, typeof value === \"function\"\n      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0,_tween_js__WEBPACK_IMPORTED_MODULE_3__.tweenValue)(this, \"attr.\" + name, value))\n      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)\n      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/attr.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/attrTween.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/attrTween.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/namespace.js\");\n\n\nfunction attrInterpolate(name, i) {\n  return function(t) {\n    this.setAttribute(name, i.call(this, t));\n  };\n}\n\nfunction attrInterpolateNS(fullname, i) {\n  return function(t) {\n    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));\n  };\n}\n\nfunction attrTweenNS(fullname, value) {\n  var t0, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);\n    return t0;\n  }\n  tween._value = value;\n  return tween;\n}\n\nfunction attrTween(name, value) {\n  var t0, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);\n    return t0;\n  }\n  tween._value = value;\n  return tween;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var key = \"attr.\" + name;\n  if (arguments.length < 2) return (key = this.tween(key)) && key._value;\n  if (value == null) return this.tween(key, null);\n  if (typeof value !== \"function\") throw new Error;\n  var fullname = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(name);\n  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/attrTween.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/delay.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/delay.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction delayFunction(id, value) {\n  return function() {\n    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.init)(this, id).delay = +value.apply(this, arguments);\n  };\n}\n\nfunction delayConstant(id, value) {\n  return value = +value, function() {\n    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.init)(this, id).delay = value;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  var id = this._id;\n\n  return arguments.length\n      ? this.each((typeof value === \"function\"\n          ? delayFunction\n          : delayConstant)(id, value))\n      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).delay;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/delay.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/duration.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/duration.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction durationFunction(id, value) {\n  return function() {\n    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).duration = +value.apply(this, arguments);\n  };\n}\n\nfunction durationConstant(id, value) {\n  return value = +value, function() {\n    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).duration = value;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  var id = this._id;\n\n  return arguments.length\n      ? this.each((typeof value === \"function\"\n          ? durationFunction\n          : durationConstant)(id, value))\n      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).duration;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/duration.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/ease.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/ease.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction easeConstant(id, value) {\n  if (typeof value !== \"function\") throw new Error;\n  return function() {\n    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).ease = value;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  var id = this._id;\n\n  return arguments.length\n      ? this.each(easeConstant(id, value))\n      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).ease;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/ease.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/easeVarying.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/easeVarying.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction easeVarying(id, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (typeof v !== \"function\") throw new Error;\n    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).ease = v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  if (typeof value !== \"function\") throw new Error;\n  return this.each(easeVarying(this._id, value));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/easeVarying.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/end.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/end.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var on0, on1, that = this, id = that._id, size = that.size();\n  return new Promise(function(resolve, reject) {\n    var cancel = {value: reject},\n        end = {value: function() { if (--size === 0) resolve(); }};\n\n    that.each(function() {\n      var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),\n          on = schedule.on;\n\n      // If this node shared a dispatch with the previous node,\n      // just assign the updated shared dispatch and we’re done!\n      // Otherwise, copy-on-write.\n      if (on !== on0) {\n        on1 = (on0 = on).copy();\n        on1._.cancel.push(cancel);\n        on1._.interrupt.push(cancel);\n        on1._.end.push(end);\n      }\n\n      schedule.on = on1;\n    });\n\n    // The selection was empty, resolve end immediately\n    if (size === 0) resolve();\n  });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/end.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/filter.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/filter.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/matcher.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-transition/src/transition/index.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  if (typeof match !== \"function\") match = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(match);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {\n      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {\n        subgroup.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Transition(subgroups, this._parents, this._name, this._id);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/filter.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transition\": () => (/* binding */ Transition),\n/* harmony export */   \"newId\": () => (/* binding */ newId)\n/* harmony export */ });\n/* unused harmony export default */\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./attr.js */ \"./node_modules/d3-transition/src/transition/attr.js\");\n/* harmony import */ var _attrTween_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./attrTween.js */ \"./node_modules/d3-transition/src/transition/attrTween.js\");\n/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./delay.js */ \"./node_modules/d3-transition/src/transition/delay.js\");\n/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./duration.js */ \"./node_modules/d3-transition/src/transition/duration.js\");\n/* harmony import */ var _ease_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ease.js */ \"./node_modules/d3-transition/src/transition/ease.js\");\n/* harmony import */ var _easeVarying_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./easeVarying.js */ \"./node_modules/d3-transition/src/transition/easeVarying.js\");\n/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter.js */ \"./node_modules/d3-transition/src/transition/filter.js\");\n/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./merge.js */ \"./node_modules/d3-transition/src/transition/merge.js\");\n/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./on.js */ \"./node_modules/d3-transition/src/transition/on.js\");\n/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./remove.js */ \"./node_modules/d3-transition/src/transition/remove.js\");\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select.js */ \"./node_modules/d3-transition/src/transition/select.js\");\n/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectAll.js */ \"./node_modules/d3-transition/src/transition/selectAll.js\");\n/* harmony import */ var _selection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selection.js */ \"./node_modules/d3-transition/src/transition/selection.js\");\n/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.js */ \"./node_modules/d3-transition/src/transition/style.js\");\n/* harmony import */ var _styleTween_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styleTween.js */ \"./node_modules/d3-transition/src/transition/styleTween.js\");\n/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text.js */ \"./node_modules/d3-transition/src/transition/text.js\");\n/* harmony import */ var _textTween_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./textTween.js */ \"./node_modules/d3-transition/src/transition/textTween.js\");\n/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transition.js */ \"./node_modules/d3-transition/src/transition/transition.js\");\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tween.js */ \"./node_modules/d3-transition/src/transition/tween.js\");\n/* harmony import */ var _end_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./end.js */ \"./node_modules/d3-transition/src/transition/end.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar id = 0;\n\nfunction Transition(groups, parents, name, id) {\n  this._groups = groups;\n  this._parents = parents;\n  this._name = name;\n  this._id = id;\n}\n\nfunction transition(name) {\n  return (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)().transition(name);\n}\n\nfunction newId() {\n  return ++id;\n}\n\nvar selection_prototype = d3_selection__WEBPACK_IMPORTED_MODULE_0__.default.prototype;\n\nTransition.prototype = transition.prototype = {\n  constructor: Transition,\n  select: _select_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_2__.default,\n  selectChild: selection_prototype.selectChild,\n  selectChildren: selection_prototype.selectChildren,\n  filter: _filter_js__WEBPACK_IMPORTED_MODULE_3__.default,\n  merge: _merge_js__WEBPACK_IMPORTED_MODULE_4__.default,\n  selection: _selection_js__WEBPACK_IMPORTED_MODULE_5__.default,\n  transition: _transition_js__WEBPACK_IMPORTED_MODULE_6__.default,\n  call: selection_prototype.call,\n  nodes: selection_prototype.nodes,\n  node: selection_prototype.node,\n  size: selection_prototype.size,\n  empty: selection_prototype.empty,\n  each: selection_prototype.each,\n  on: _on_js__WEBPACK_IMPORTED_MODULE_7__.default,\n  attr: _attr_js__WEBPACK_IMPORTED_MODULE_8__.default,\n  attrTween: _attrTween_js__WEBPACK_IMPORTED_MODULE_9__.default,\n  style: _style_js__WEBPACK_IMPORTED_MODULE_10__.default,\n  styleTween: _styleTween_js__WEBPACK_IMPORTED_MODULE_11__.default,\n  text: _text_js__WEBPACK_IMPORTED_MODULE_12__.default,\n  textTween: _textTween_js__WEBPACK_IMPORTED_MODULE_13__.default,\n  remove: _remove_js__WEBPACK_IMPORTED_MODULE_14__.default,\n  tween: _tween_js__WEBPACK_IMPORTED_MODULE_15__.default,\n  delay: _delay_js__WEBPACK_IMPORTED_MODULE_16__.default,\n  duration: _duration_js__WEBPACK_IMPORTED_MODULE_17__.default,\n  ease: _ease_js__WEBPACK_IMPORTED_MODULE_18__.default,\n  easeVarying: _easeVarying_js__WEBPACK_IMPORTED_MODULE_19__.default,\n  end: _end_js__WEBPACK_IMPORTED_MODULE_20__.default,\n  [Symbol.iterator]: selection_prototype[Symbol.iterator]\n};\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/index.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/interpolate.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/interpolate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ \"./node_modules/d3-color/src/color.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/number.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/rgb.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/string.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {\n  var c;\n  return (typeof b === \"number\" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__.default\n      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_1__.default ? d3_interpolate__WEBPACK_IMPORTED_MODULE_2__.default\n      : (c = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.default)(b)) ? (b = c, d3_interpolate__WEBPACK_IMPORTED_MODULE_2__.default)\n      : d3_interpolate__WEBPACK_IMPORTED_MODULE_3__.default)(a, b);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/interpolate.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/merge.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/merge.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-transition/src/transition/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transition) {\n  if (transition._id !== this._id) throw new Error;\n\n  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {\n    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group0[i] || group1[i]) {\n        merge[i] = node;\n      }\n    }\n  }\n\n  for (; j < m0; ++j) {\n    merges[j] = groups0[j];\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Transition(merges, this._parents, this._name, this._id);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/merge.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/on.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/on.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction start(name) {\n  return (name + \"\").trim().split(/^|\\s+/).every(function(t) {\n    var i = t.indexOf(\".\");\n    if (i >= 0) t = t.slice(0, i);\n    return !t || t === \"start\";\n  });\n}\n\nfunction onFunction(id, name, listener) {\n  var on0, on1, sit = start(name) ? _schedule_js__WEBPACK_IMPORTED_MODULE_0__.init : _schedule_js__WEBPACK_IMPORTED_MODULE_0__.set;\n  return function() {\n    var schedule = sit(this, id),\n        on = schedule.on;\n\n    // If this node shared a dispatch with the previous node,\n    // just assign the updated shared dispatch and we’re done!\n    // Otherwise, copy-on-write.\n    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);\n\n    schedule.on = on1;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, listener) {\n  var id = this._id;\n\n  return arguments.length < 2\n      ? (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).on.on(name)\n      : this.each(onFunction(id, name, listener));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/on.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/remove.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/remove.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction removeFunction(id) {\n  return function() {\n    var parent = this.parentNode;\n    for (var i in this.__transition) if (+i !== id) return;\n    if (parent) parent.removeChild(this);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.on(\"end.remove\", removeFunction(this._id));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/remove.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/schedule.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/schedule.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"STARTING\": () => (/* binding */ STARTING),\n/* harmony export */   \"ENDING\": () => (/* binding */ ENDING),\n/* harmony export */   \"ENDED\": () => (/* binding */ ENDED),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"init\": () => (/* binding */ init),\n/* harmony export */   \"set\": () => (/* binding */ set),\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n/* unused harmony exports CREATED, SCHEDULED, STARTED, RUNNING */\n/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ \"./node_modules/d3-dispatch/src/dispatch.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-timer */ \"./node_modules/d3-timer/src/timer.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-timer */ \"./node_modules/d3-timer/src/timeout.js\");\n\n\n\nvar emptyOn = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_0__.default)(\"start\", \"end\", \"cancel\", \"interrupt\");\nvar emptyTween = [];\n\nvar CREATED = 0;\nvar SCHEDULED = 1;\nvar STARTING = 2;\nvar STARTED = 3;\nvar RUNNING = 4;\nvar ENDING = 5;\nvar ENDED = 6;\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name, id, index, group, timing) {\n  var schedules = node.__transition;\n  if (!schedules) node.__transition = {};\n  else if (id in schedules) return;\n  create(node, id, {\n    name: name,\n    index: index, // For context during callback.\n    group: group, // For context during callback.\n    on: emptyOn,\n    tween: emptyTween,\n    time: timing.time,\n    delay: timing.delay,\n    duration: timing.duration,\n    ease: timing.ease,\n    timer: null,\n    state: CREATED\n  });\n}\n\nfunction init(node, id) {\n  var schedule = get(node, id);\n  if (schedule.state > CREATED) throw new Error(\"too late; already scheduled\");\n  return schedule;\n}\n\nfunction set(node, id) {\n  var schedule = get(node, id);\n  if (schedule.state > STARTED) throw new Error(\"too late; already running\");\n  return schedule;\n}\n\nfunction get(node, id) {\n  var schedule = node.__transition;\n  if (!schedule || !(schedule = schedule[id])) throw new Error(\"transition not found\");\n  return schedule;\n}\n\nfunction create(node, id, self) {\n  var schedules = node.__transition,\n      tween;\n\n  // Initialize the self timer when the transition is created.\n  // Note the actual delay is not known until the first callback!\n  schedules[id] = self;\n  self.timer = (0,d3_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(schedule, 0, self.time);\n\n  function schedule(elapsed) {\n    self.state = SCHEDULED;\n    self.timer.restart(start, self.delay, self.time);\n\n    // If the elapsed delay is less than our first sleep, start immediately.\n    if (self.delay <= elapsed) start(elapsed - self.delay);\n  }\n\n  function start(elapsed) {\n    var i, j, n, o;\n\n    // If the state is not SCHEDULED, then we previously errored on start.\n    if (self.state !== SCHEDULED) return stop();\n\n    for (i in schedules) {\n      o = schedules[i];\n      if (o.name !== self.name) continue;\n\n      // While this element already has a starting transition during this frame,\n      // defer starting an interrupting transition until that transition has a\n      // chance to tick (and possibly end); see d3/d3-transition#54!\n      if (o.state === STARTED) return (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__.default)(start);\n\n      // Interrupt the active transition, if any.\n      if (o.state === RUNNING) {\n        o.state = ENDED;\n        o.timer.stop();\n        o.on.call(\"interrupt\", node, node.__data__, o.index, o.group);\n        delete schedules[i];\n      }\n\n      // Cancel any pre-empted transitions.\n      else if (+i < id) {\n        o.state = ENDED;\n        o.timer.stop();\n        o.on.call(\"cancel\", node, node.__data__, o.index, o.group);\n        delete schedules[i];\n      }\n    }\n\n    // Defer the first tick to end of the current frame; see d3/d3#1576.\n    // Note the transition may be canceled after start and before the first tick!\n    // Note this must be scheduled before the start event; see d3/d3-transition#16!\n    // Assuming this is successful, subsequent callbacks go straight to tick.\n    (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__.default)(function() {\n      if (self.state === STARTED) {\n        self.state = RUNNING;\n        self.timer.restart(tick, self.delay, self.time);\n        tick(elapsed);\n      }\n    });\n\n    // Dispatch the start event.\n    // Note this must be done before the tween are initialized.\n    self.state = STARTING;\n    self.on.call(\"start\", node, node.__data__, self.index, self.group);\n    if (self.state !== STARTING) return; // interrupted\n    self.state = STARTED;\n\n    // Initialize the tween, deleting null tween.\n    tween = new Array(n = self.tween.length);\n    for (i = 0, j = -1; i < n; ++i) {\n      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {\n        tween[++j] = o;\n      }\n    }\n    tween.length = j + 1;\n  }\n\n  function tick(elapsed) {\n    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),\n        i = -1,\n        n = tween.length;\n\n    while (++i < n) {\n      tween[i].call(node, t);\n    }\n\n    // Dispatch the end event.\n    if (self.state === ENDING) {\n      self.on.call(\"end\", node, node.__data__, self.index, self.group);\n      stop();\n    }\n  }\n\n  function stop() {\n    self.state = ENDED;\n    self.timer.stop();\n    delete schedules[id];\n    for (var i in schedules) return; // eslint-disable-line no-unused-vars\n    delete node.__transition;\n  }\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/schedule.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/select.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/select.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/selector.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {\n  var name = this._name,\n      id = this._id;\n\n  if (typeof select !== \"function\") select = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {\n      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {\n        if (\"__data__\" in node) subnode.__data__ = node.__data__;\n        subgroup[i] = subnode;\n        (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.default)(subgroup[i], name, id, i, subgroup, (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id));\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Transition(subgroups, this._parents, name, id);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/select.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/selectAll.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/selectAll.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/selectorAll.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {\n  var name = this._name,\n      id = this._id;\n\n  if (typeof select !== \"function\") select = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.default)(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        for (var children = select.call(node, node.__data__, i, group), child, inherit = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id), k = 0, l = children.length; k < l; ++k) {\n          if (child = children[k]) {\n            (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.default)(child, name, id, k, children, inherit);\n          }\n        }\n        subgroups.push(children);\n        parents.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Transition(subgroups, parents, name, id);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/selectAll.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/selection.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/selection.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\nvar Selection = d3_selection__WEBPACK_IMPORTED_MODULE_0__.default.prototype.constructor;\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return new Selection(this._groups, this._parents);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/selection.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/style.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/style.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/transform/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/selection/style.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tween.js */ \"./node_modules/d3-transition/src/transition/tween.js\");\n/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolate.js */ \"./node_modules/d3-transition/src/transition/interpolate.js\");\n\n\n\n\n\n\nfunction styleNull(name, interpolate) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name),\n        string1 = (this.style.removeProperty(name), (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name));\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, string10 = string1);\n  };\n}\n\nfunction styleRemove(name) {\n  return function() {\n    this.style.removeProperty(name);\n  };\n}\n\nfunction styleConstant(name, interpolate, value1) {\n  var string00,\n      string1 = value1 + \"\",\n      interpolate0;\n  return function() {\n    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name);\n    return string0 === string1 ? null\n        : string0 === string00 ? interpolate0\n        : interpolate0 = interpolate(string00 = string0, value1);\n  };\n}\n\nfunction styleFunction(name, interpolate, value) {\n  var string00,\n      string10,\n      interpolate0;\n  return function() {\n    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name),\n        value1 = value(this),\n        string1 = value1 + \"\";\n    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name));\n    return string0 === string1 ? null\n        : string0 === string00 && string1 === string10 ? interpolate0\n        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));\n  };\n}\n\nfunction styleMaybeRemove(id, name) {\n  var on0, on1, listener0, key = \"style.\" + name, event = \"end.\" + key, remove;\n  return function() {\n    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.set)(this, id),\n        on = schedule.on,\n        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;\n\n    // If this node shared a dispatch with the previous node,\n    // just assign the updated shared dispatch and we’re done!\n    // Otherwise, copy-on-write.\n    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);\n\n    schedule.on = on1;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {\n  var i = (name += \"\") === \"transform\" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_2__.interpolateTransformCss : _interpolate_js__WEBPACK_IMPORTED_MODULE_3__.default;\n  return value == null ? this\n      .styleTween(name, styleNull(name, i))\n      .on(\"end.style.\" + name, styleRemove(name))\n    : typeof value === \"function\" ? this\n      .styleTween(name, styleFunction(name, i, (0,_tween_js__WEBPACK_IMPORTED_MODULE_4__.tweenValue)(this, \"style.\" + name, value)))\n      .each(styleMaybeRemove(this._id, name))\n    : this\n      .styleTween(name, styleConstant(name, i, value), priority)\n      .on(\"end.style.\" + name, null);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/style.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/styleTween.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/styleTween.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction styleInterpolate(name, i, priority) {\n  return function(t) {\n    this.style.setProperty(name, i.call(this, t), priority);\n  };\n}\n\nfunction styleTween(name, value, priority) {\n  var t, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);\n    return t;\n  }\n  tween._value = value;\n  return tween;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {\n  var key = \"style.\" + (name += \"\");\n  if (arguments.length < 2) return (key = this.tween(key)) && key._value;\n  if (value == null) return this.tween(key, null);\n  if (typeof value !== \"function\") throw new Error;\n  return this.tween(key, styleTween(name, value, priority == null ? \"\" : priority));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/styleTween.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/text.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/text.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tween.js */ \"./node_modules/d3-transition/src/transition/tween.js\");\n\n\nfunction textConstant(value) {\n  return function() {\n    this.textContent = value;\n  };\n}\n\nfunction textFunction(value) {\n  return function() {\n    var value1 = value(this);\n    this.textContent = value1 == null ? \"\" : value1;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return this.tween(\"text\", typeof value === \"function\"\n      ? textFunction((0,_tween_js__WEBPACK_IMPORTED_MODULE_0__.tweenValue)(this, \"text\", value))\n      : textConstant(value == null ? \"\" : value + \"\"));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/text.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/textTween.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/textTween.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction textInterpolate(i) {\n  return function(t) {\n    this.textContent = i.call(this, t);\n  };\n}\n\nfunction textTween(value) {\n  var t0, i0;\n  function tween() {\n    var i = value.apply(this, arguments);\n    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);\n    return t0;\n  }\n  tween._value = value;\n  return tween;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  var key = \"text\";\n  if (arguments.length < 1) return (key = this.tween(key)) && key._value;\n  if (value == null) return this.tween(key, null);\n  if (typeof value !== \"function\") throw new Error;\n  return this.tween(key, textTween(value));\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/textTween.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/transition.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/transition.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-transition/src/transition/index.js\");\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var name = this._name,\n      id0 = this._id,\n      id1 = (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.newId)();\n\n  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        var inherit = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id0);\n        (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.default)(node, name, id1, i, group, {\n          time: inherit.time + inherit.delay + inherit.duration,\n          delay: 0,\n          duration: inherit.duration,\n          ease: inherit.ease\n        });\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Transition(groups, this._parents, name, id1);\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/transition.js?");

/***/ }),

/***/ "./node_modules/d3-transition/src/transition/tween.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/tween.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"tweenValue\": () => (/* binding */ tweenValue)\n/* harmony export */ });\n/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ \"./node_modules/d3-transition/src/transition/schedule.js\");\n\n\nfunction tweenRemove(id, name) {\n  var tween0, tween1;\n  return function() {\n    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),\n        tween = schedule.tween;\n\n    // If this node shared tween with the previous node,\n    // just assign the updated shared tween and we’re done!\n    // Otherwise, copy-on-write.\n    if (tween !== tween0) {\n      tween1 = tween0 = tween;\n      for (var i = 0, n = tween1.length; i < n; ++i) {\n        if (tween1[i].name === name) {\n          tween1 = tween1.slice();\n          tween1.splice(i, 1);\n          break;\n        }\n      }\n    }\n\n    schedule.tween = tween1;\n  };\n}\n\nfunction tweenFunction(id, name, value) {\n  var tween0, tween1;\n  if (typeof value !== \"function\") throw new Error;\n  return function() {\n    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),\n        tween = schedule.tween;\n\n    // If this node shared tween with the previous node,\n    // just assign the updated shared tween and we’re done!\n    // Otherwise, copy-on-write.\n    if (tween !== tween0) {\n      tween1 = (tween0 = tween).slice();\n      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {\n        if (tween1[i].name === name) {\n          tween1[i] = t;\n          break;\n        }\n      }\n      if (i === n) tween1.push(t);\n    }\n\n    schedule.tween = tween1;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var id = this._id;\n\n  name += \"\";\n\n  if (arguments.length < 2) {\n    var tween = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).tween;\n    for (var i = 0, n = tween.length, t; i < n; ++i) {\n      if ((t = tween[i]).name === name) {\n        return t.value;\n      }\n    }\n    return null;\n  }\n\n  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));\n}\n\nfunction tweenValue(transition, name, value) {\n  var id = transition._id;\n\n  transition.each(function() {\n    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id);\n    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);\n  });\n\n  return function(node) {\n    return (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(node, id).value[name];\n  };\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-transition/src/transition/tween.js?");

/***/ }),

/***/ "./node_modules/d3-zoom/src/constant.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-zoom/src/constant.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => () => x);\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-zoom/src/constant.js?");

/***/ }),

/***/ "./node_modules/d3-zoom/src/event.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-zoom/src/event.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ZoomEvent)\n/* harmony export */ });\nfunction ZoomEvent(type, {\n  sourceEvent,\n  target,\n  transform,\n  dispatch\n}) {\n  Object.defineProperties(this, {\n    type: {value: type, enumerable: true, configurable: true},\n    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},\n    target: {value: target, enumerable: true, configurable: true},\n    transform: {value: transform, enumerable: true, configurable: true},\n    _: {value: dispatch}\n  });\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-zoom/src/event.js?");

/***/ }),

/***/ "./node_modules/d3-zoom/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-zoom/src/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ \"./node_modules/d3-zoom/src/zoom.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"./node_modules/d3-zoom/src/transform.js\");\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-zoom/src/index.js?");

/***/ }),

/***/ "./node_modules/d3-zoom/src/noevent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-zoom/src/noevent.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nopropagation\": () => (/* binding */ nopropagation),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction nopropagation(event) {\n  event.stopImmediatePropagation();\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {\n  event.preventDefault();\n  event.stopImmediatePropagation();\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-zoom/src/noevent.js?");

/***/ }),

/***/ "./node_modules/d3-zoom/src/transform.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-zoom/src/transform.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transform\": () => (/* binding */ Transform),\n/* harmony export */   \"identity\": () => (/* binding */ identity)\n/* harmony export */ });\n/* unused harmony export default */\nfunction Transform(k, x, y) {\n  this.k = k;\n  this.x = x;\n  this.y = y;\n}\n\nTransform.prototype = {\n  constructor: Transform,\n  scale: function(k) {\n    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);\n  },\n  translate: function(x, y) {\n    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);\n  },\n  apply: function(point) {\n    return [point[0] * this.k + this.x, point[1] * this.k + this.y];\n  },\n  applyX: function(x) {\n    return x * this.k + this.x;\n  },\n  applyY: function(y) {\n    return y * this.k + this.y;\n  },\n  invert: function(location) {\n    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];\n  },\n  invertX: function(x) {\n    return (x - this.x) / this.k;\n  },\n  invertY: function(y) {\n    return (y - this.y) / this.k;\n  },\n  rescaleX: function(x) {\n    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));\n  },\n  rescaleY: function(y) {\n    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));\n  },\n  toString: function() {\n    return \"translate(\" + this.x + \",\" + this.y + \") scale(\" + this.k + \")\";\n  }\n};\n\nvar identity = new Transform(1, 0, 0);\n\ntransform.prototype = Transform.prototype;\n\nfunction transform(node) {\n  while (!node.__zoom) if (!(node = node.parentNode)) return identity;\n  return node.__zoom;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-zoom/src/transform.js?");

/***/ }),

/***/ "./node_modules/d3-zoom/src/zoom.js":
/*!******************************************!*\
  !*** ./node_modules/d3-zoom/src/zoom.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-dispatch */ \"./node_modules/d3-dispatch/src/dispatch.js\");\n/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! d3-drag */ \"./node_modules/d3-drag/src/nodrag.js\");\n/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-interpolate */ \"./node_modules/d3-interpolate/src/zoom.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/select.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/pointer.js\");\n/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-transition */ \"./node_modules/d3-transition/src/index.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-zoom/src/constant.js\");\n/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event.js */ \"./node_modules/d3-zoom/src/event.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transform.js */ \"./node_modules/d3-zoom/src/transform.js\");\n/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./noevent.js */ \"./node_modules/d3-zoom/src/noevent.js\");\n\n\n\n\n\n\n\n\n\n\n// Ignore right-click, since that should open the context menu.\n// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event\nfunction defaultFilter(event) {\n  return (!event.ctrlKey || event.type === 'wheel') && !event.button;\n}\n\nfunction defaultExtent() {\n  var e = this;\n  if (e instanceof SVGElement) {\n    e = e.ownerSVGElement || e;\n    if (e.hasAttribute(\"viewBox\")) {\n      e = e.viewBox.baseVal;\n      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];\n    }\n    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];\n  }\n  return [[0, 0], [e.clientWidth, e.clientHeight]];\n}\n\nfunction defaultTransform() {\n  return this.__zoom || _transform_js__WEBPACK_IMPORTED_MODULE_3__.identity;\n}\n\nfunction defaultWheelDelta(event) {\n  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);\n}\n\nfunction defaultTouchable() {\n  return navigator.maxTouchPoints || (\"ontouchstart\" in this);\n}\n\nfunction defaultConstrain(transform, extent, translateExtent) {\n  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],\n      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],\n      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],\n      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];\n  return transform.translate(\n    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),\n    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)\n  );\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var filter = defaultFilter,\n      extent = defaultExtent,\n      constrain = defaultConstrain,\n      wheelDelta = defaultWheelDelta,\n      touchable = defaultTouchable,\n      scaleExtent = [0, Infinity],\n      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],\n      duration = 250,\n      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_5__.default,\n      listeners = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_6__.default)(\"start\", \"zoom\", \"end\"),\n      touchstarting,\n      touchfirst,\n      touchending,\n      touchDelay = 500,\n      wheelDelay = 150,\n      clickDistance2 = 0,\n      tapDistance = 10;\n\n  function zoom(selection) {\n    selection\n        .property(\"__zoom\", defaultTransform)\n        .on(\"wheel.zoom\", wheeled, {passive: false})\n        .on(\"mousedown.zoom\", mousedowned)\n        .on(\"dblclick.zoom\", dblclicked)\n      .filter(touchable)\n        .on(\"touchstart.zoom\", touchstarted)\n        .on(\"touchmove.zoom\", touchmoved)\n        .on(\"touchend.zoom touchcancel.zoom\", touchended)\n        .style(\"-webkit-tap-highlight-color\", \"rgba(0,0,0,0)\");\n  }\n\n  zoom.transform = function(collection, transform, point, event) {\n    var selection = collection.selection ? collection.selection() : collection;\n    selection.property(\"__zoom\", defaultTransform);\n    if (collection !== selection) {\n      schedule(collection, transform, point, event);\n    } else {\n      selection.interrupt().each(function() {\n        gesture(this, arguments)\n          .event(event)\n          .start()\n          .zoom(null, typeof transform === \"function\" ? transform.apply(this, arguments) : transform)\n          .end();\n      });\n    }\n  };\n\n  zoom.scaleBy = function(selection, k, p, event) {\n    zoom.scaleTo(selection, function() {\n      var k0 = this.__zoom.k,\n          k1 = typeof k === \"function\" ? k.apply(this, arguments) : k;\n      return k0 * k1;\n    }, p, event);\n  };\n\n  zoom.scaleTo = function(selection, k, p, event) {\n    zoom.transform(selection, function() {\n      var e = extent.apply(this, arguments),\n          t0 = this.__zoom,\n          p0 = p == null ? centroid(e) : typeof p === \"function\" ? p.apply(this, arguments) : p,\n          p1 = t0.invert(p0),\n          k1 = typeof k === \"function\" ? k.apply(this, arguments) : k;\n      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);\n    }, p, event);\n  };\n\n  zoom.translateBy = function(selection, x, y, event) {\n    zoom.transform(selection, function() {\n      return constrain(this.__zoom.translate(\n        typeof x === \"function\" ? x.apply(this, arguments) : x,\n        typeof y === \"function\" ? y.apply(this, arguments) : y\n      ), extent.apply(this, arguments), translateExtent);\n    }, null, event);\n  };\n\n  zoom.translateTo = function(selection, x, y, p, event) {\n    zoom.transform(selection, function() {\n      var e = extent.apply(this, arguments),\n          t = this.__zoom,\n          p0 = p == null ? centroid(e) : typeof p === \"function\" ? p.apply(this, arguments) : p;\n      return constrain(_transform_js__WEBPACK_IMPORTED_MODULE_3__.identity.translate(p0[0], p0[1]).scale(t.k).translate(\n        typeof x === \"function\" ? -x.apply(this, arguments) : -x,\n        typeof y === \"function\" ? -y.apply(this, arguments) : -y\n      ), e, translateExtent);\n    }, p, event);\n  };\n\n  function scale(transform, k) {\n    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));\n    return k === transform.k ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform(k, transform.x, transform.y);\n  }\n\n  function translate(transform, p0, p1) {\n    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;\n    return x === transform.x && y === transform.y ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform(transform.k, x, y);\n  }\n\n  function centroid(extent) {\n    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];\n  }\n\n  function schedule(transition, transform, point, event) {\n    transition\n        .on(\"start.zoom\", function() { gesture(this, arguments).event(event).start(); })\n        .on(\"interrupt.zoom end.zoom\", function() { gesture(this, arguments).event(event).end(); })\n        .tween(\"zoom\", function() {\n          var that = this,\n              args = arguments,\n              g = gesture(that, args).event(event),\n              e = extent.apply(that, args),\n              p = point == null ? centroid(e) : typeof point === \"function\" ? point.apply(that, args) : point,\n              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),\n              a = that.__zoom,\n              b = typeof transform === \"function\" ? transform.apply(that, args) : transform,\n              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));\n          return function(t) {\n            if (t === 1) t = b; // Avoid rounding error on end.\n            else { var l = i(t), k = w / l[2]; t = new _transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }\n            g.zoom(null, t);\n          };\n        });\n  }\n\n  function gesture(that, args, clean) {\n    return (!clean && that.__zooming) || new Gesture(that, args);\n  }\n\n  function Gesture(that, args) {\n    this.that = that;\n    this.args = args;\n    this.active = 0;\n    this.sourceEvent = null;\n    this.extent = extent.apply(that, args);\n    this.taps = 0;\n  }\n\n  Gesture.prototype = {\n    event: function(event) {\n      if (event) this.sourceEvent = event;\n      return this;\n    },\n    start: function() {\n      if (++this.active === 1) {\n        this.that.__zooming = this;\n        this.emit(\"start\");\n      }\n      return this;\n    },\n    zoom: function(key, transform) {\n      if (this.mouse && key !== \"mouse\") this.mouse[1] = transform.invert(this.mouse[0]);\n      if (this.touch0 && key !== \"touch\") this.touch0[1] = transform.invert(this.touch0[0]);\n      if (this.touch1 && key !== \"touch\") this.touch1[1] = transform.invert(this.touch1[0]);\n      this.that.__zoom = transform;\n      this.emit(\"zoom\");\n      return this;\n    },\n    end: function() {\n      if (--this.active === 0) {\n        delete this.that.__zooming;\n        this.emit(\"end\");\n      }\n      return this;\n    },\n    emit: function(type) {\n      var d = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(this.that).datum();\n      listeners.call(\n        type,\n        this.that,\n        new _event_js__WEBPACK_IMPORTED_MODULE_2__.default(type, {\n          sourceEvent: this.sourceEvent,\n          target: zoom,\n          type,\n          transform: this.that.__zoom,\n          dispatch: listeners\n        }),\n        d\n      );\n    }\n  };\n\n  function wheeled(event, ...args) {\n    if (!filter.apply(this, arguments)) return;\n    var g = gesture(this, args).event(event),\n        t = this.__zoom,\n        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),\n        p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(event);\n\n    // If the mouse is in the same location as before, reuse it.\n    // If there were recent wheel events, reset the wheel idle timeout.\n    if (g.wheel) {\n      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {\n        g.mouse[1] = t.invert(g.mouse[0] = p);\n      }\n      clearTimeout(g.wheel);\n    }\n\n    // If this wheel event won’t trigger a transform change, ignore it.\n    else if (t.k === k) return;\n\n    // Otherwise, capture the mouse point and location at the start.\n    else {\n      g.mouse = [p, t.invert(p)];\n      (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(this);\n      g.start();\n    }\n\n    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.default)(event);\n    g.wheel = setTimeout(wheelidled, wheelDelay);\n    g.zoom(\"mouse\", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));\n\n    function wheelidled() {\n      g.wheel = null;\n      g.end();\n    }\n  }\n\n  function mousedowned(event, ...args) {\n    if (touchending || !filter.apply(this, arguments)) return;\n    var currentTarget = event.currentTarget,\n        g = gesture(this, args, true).event(event),\n        v = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(event.view).on(\"mousemove.zoom\", mousemoved, true).on(\"mouseup.zoom\", mouseupped, true),\n        p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(event, currentTarget),\n        x0 = event.clientX,\n        y0 = event.clientY;\n\n    (0,d3_drag__WEBPACK_IMPORTED_MODULE_9__.default)(event.view);\n    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.nopropagation)(event);\n    g.mouse = [p, this.__zoom.invert(p)];\n    (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(this);\n    g.start();\n\n    function mousemoved(event) {\n      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.default)(event);\n      if (!g.moved) {\n        var dx = event.clientX - x0, dy = event.clientY - y0;\n        g.moved = dx * dx + dy * dy > clickDistance2;\n      }\n      g.event(event)\n       .zoom(\"mouse\", constrain(translate(g.that.__zoom, g.mouse[0] = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(event, currentTarget), g.mouse[1]), g.extent, translateExtent));\n    }\n\n    function mouseupped(event) {\n      v.on(\"mousemove.zoom mouseup.zoom\", null);\n      (0,d3_drag__WEBPACK_IMPORTED_MODULE_9__.yesdrag)(event.view, g.moved);\n      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.default)(event);\n      g.event(event).end();\n    }\n  }\n\n  function dblclicked(event, ...args) {\n    if (!filter.apply(this, arguments)) return;\n    var t0 = this.__zoom,\n        p0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(event.changedTouches ? event.changedTouches[0] : event, this),\n        p1 = t0.invert(p0),\n        k1 = t0.k * (event.shiftKey ? 0.5 : 2),\n        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);\n\n    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.default)(event);\n    if (duration > 0) (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(this).transition().duration(duration).call(schedule, t1, p0, event);\n    else (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(this).call(zoom.transform, t1, p0, event);\n  }\n\n  function touchstarted(event, ...args) {\n    if (!filter.apply(this, arguments)) return;\n    var touches = event.touches,\n        n = touches.length,\n        g = gesture(this, args, event.changedTouches.length === n).event(event),\n        started, i, t, p;\n\n    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.nopropagation)(event);\n    for (i = 0; i < n; ++i) {\n      t = touches[i], p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(t, this);\n      p = [p, this.__zoom.invert(p), t.identifier];\n      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;\n      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;\n    }\n\n    if (touchstarting) touchstarting = clearTimeout(touchstarting);\n\n    if (started) {\n      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);\n      (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(this);\n      g.start();\n    }\n  }\n\n  function touchmoved(event, ...args) {\n    if (!this.__zooming) return;\n    var g = gesture(this, args).event(event),\n        touches = event.changedTouches,\n        n = touches.length, i, t, p, l;\n\n    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.default)(event);\n    for (i = 0; i < n; ++i) {\n      t = touches[i], p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(t, this);\n      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;\n      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;\n    }\n    t = g.that.__zoom;\n    if (g.touch1) {\n      var p0 = g.touch0[0], l0 = g.touch0[1],\n          p1 = g.touch1[0], l1 = g.touch1[1],\n          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,\n          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;\n      t = scale(t, Math.sqrt(dp / dl));\n      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];\n      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];\n    }\n    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];\n    else return;\n\n    g.zoom(\"touch\", constrain(translate(t, p, l), g.extent, translateExtent));\n  }\n\n  function touchended(event, ...args) {\n    if (!this.__zooming) return;\n    var g = gesture(this, args).event(event),\n        touches = event.changedTouches,\n        n = touches.length, i, t;\n\n    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.nopropagation)(event);\n    if (touchending) clearTimeout(touchending);\n    touchending = setTimeout(function() { touchending = null; }, touchDelay);\n    for (i = 0; i < n; ++i) {\n      t = touches[i];\n      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;\n      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;\n    }\n    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;\n    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);\n    else {\n      g.end();\n      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.\n      if (g.taps === 2) {\n        t = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__.default)(t, this);\n        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {\n          var p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__.default)(this).on(\"dblclick.zoom\");\n          if (p) p.apply(this, arguments);\n        }\n      }\n    }\n  }\n\n  zoom.wheelDelta = function(_) {\n    return arguments.length ? (wheelDelta = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(+_), zoom) : wheelDelta;\n  };\n\n  zoom.filter = function(_) {\n    return arguments.length ? (filter = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(!!_), zoom) : filter;\n  };\n\n  zoom.touchable = function(_) {\n    return arguments.length ? (touchable = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)(!!_), zoom) : touchable;\n  };\n\n  zoom.extent = function(_) {\n    return arguments.length ? (extent = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__.default)([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;\n  };\n\n  zoom.scaleExtent = function(_) {\n    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];\n  };\n\n  zoom.translateExtent = function(_) {\n    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];\n  };\n\n  zoom.constrain = function(_) {\n    return arguments.length ? (constrain = _, zoom) : constrain;\n  };\n\n  zoom.duration = function(_) {\n    return arguments.length ? (duration = +_, zoom) : duration;\n  };\n\n  zoom.interpolate = function(_) {\n    return arguments.length ? (interpolate = _, zoom) : interpolate;\n  };\n\n  zoom.on = function() {\n    var value = listeners.on.apply(listeners, arguments);\n    return value === listeners ? zoom : value;\n  };\n\n  zoom.clickDistance = function(_) {\n    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);\n  };\n\n  zoom.tapDistance = function(_) {\n    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;\n  };\n\n  return zoom;\n}\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3-zoom/src/zoom.js?");

/***/ }),

/***/ "./node_modules/d3/src/index.js":
/*!**************************************!*\
  !*** ./node_modules/d3/src/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"easeLinear\": () => (/* reexport safe */ d3_ease__WEBPACK_IMPORTED_MODULE_1__.easeLinear),\n/* harmony export */   \"json\": () => (/* reexport safe */ d3_fetch__WEBPACK_IMPORTED_MODULE_2__.json),\n/* harmony export */   \"geoPath\": () => (/* reexport safe */ d3_geo__WEBPACK_IMPORTED_MODULE_3__.geoPath),\n/* harmony export */   \"geoTransform\": () => (/* reexport safe */ d3_geo__WEBPACK_IMPORTED_MODULE_3__.geoTransform),\n/* harmony export */   \"select\": () => (/* reexport safe */ d3_selection__WEBPACK_IMPORTED_MODULE_4__.select),\n/* harmony export */   \"selectAll\": () => (/* reexport safe */ d3_selection__WEBPACK_IMPORTED_MODULE_4__.selectAll),\n/* harmony export */   \"timer\": () => (/* reexport safe */ d3_timer__WEBPACK_IMPORTED_MODULE_5__.timer)\n/* harmony export */ });\n/* harmony import */ var d3_brush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-brush */ \"./node_modules/d3-brush/src/index.js\");\n/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-ease */ \"./node_modules/d3-ease/src/index.js\");\n/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-fetch */ \"./node_modules/d3-fetch/src/index.js\");\n/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-geo */ \"./node_modules/d3-geo/src/index.js\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/index.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-timer */ \"./node_modules/d3-timer/src/index.js\");\n/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-transition */ \"./node_modules/d3-transition/src/index.js\");\n/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-zoom */ \"./node_modules/d3-zoom/src/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://new_haven_map/./node_modules/d3/src/index.js?");

/***/ }),

/***/ "./node_modules/mapbox-gl/dist/mapbox-gl.js":
/*!**************************************************!*\
  !*** ./node_modules/mapbox-gl/dist/mapbox-gl.js ***!
  \**************************************************/
/***/ (function(module) {


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_getTarget_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/getTarget.js */ \"./node_modules/style-loader/dist/runtime/getTarget.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_getTarget_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_getTarget_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = function(css, style){\n      if (style.styleSheet) {\n        style.styleSheet.cssText = css;\n      } else {\n      while (style.firstChild) {\n        style.removeChild(style.firstChild);\n      }\n\n      style.appendChild(document.createTextNode(css));\n    }\n  };\noptions.setAttributes = function(style) {\n        var nonce =\n           true ? __webpack_require__.nc : 0;\n\n        if (nonce) {\n          style.setAttribute(\"nonce\", nonce);\n        }\n      };\noptions.insert = function(style){\n    var target = _node_modules_style_loader_dist_runtime_getTarget_js__WEBPACK_IMPORTED_MODULE_2___default()(\"head\");\n\n    if (!target) {\n      throw new Error(\n        \"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\"\n      );\n    }\n\n    target.appendChild(style);\n  };\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_3___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_4__.default, options);\n\n\n\n\n       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_4__.default && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_4__.default.locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_4__.default.locals : undefined);\n\n\n//# sourceURL=webpack://new_haven_map/./src/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/getTarget.js":
/*!*************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/getTarget.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n\nmodule.exports = getTarget;\n\n//# sourceURL=webpack://new_haven_map/./node_modules/style-loader/dist/runtime/getTarget.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://new_haven_map/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var style = document.createElement(\"style\");\n  options.setAttributes(style, options.attributes);\n  options.insert(style);\n  return style;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://new_haven_map/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute(\"media\", media);\n  } else {\n    style.removeAttribute(\"media\");\n  }\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, style);\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var style = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(style, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(style);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://new_haven_map/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;