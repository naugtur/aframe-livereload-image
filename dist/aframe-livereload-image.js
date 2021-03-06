/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/* global AFRAME */
	/* global fetch */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	!(function () {
	  function debounce (func, time) {
	    var pointer;
	    return function () {
	      clearTimeout(pointer);
	      pointer = setTimeout(func, time);
	    };
	  }

	  /**
	   * Livereload component for A-Frame.
	   */
	  AFRAME.registerComponent('livereload', {
	    schema: {
	      src: {
	        type: 'string'
	      }
	    },

	    /**
	     * Set if component needs multiple instancing.
	     */
	    multiple: false,

	    /**
	     * Called once when component is attached. Generally for initial setup.
	     */
	    init: function () {
	      var filename = this.data.src;
	      console.log(this, filename);
	      this.el.setAttribute('src', filename);
	      var previousBuffer = {};
	      var replace = debounce(function () {
	        delete THREE.Cache.files[filename];
	        filename = this.data.src + '?a=' + Math.random().toFixed(8);
	        this.el.setAttribute('src', filename);
	      }.bind(this), 1000);
	      this.data.intervalHandle = setInterval(function () {
	        fetch(this.data.src + '?a=' + Math.random().toFixed(8))
	          .then(function (response) { return response.blob(); })
	          .then(function (buffer) {
	            if (buffer.size > 1000 && (buffer.size !== previousBuffer.size)) {
	              console.log('different', buffer.size);
	              replace();
	            }
	            previousBuffer = buffer;
	          })
	          .catch(console.warn);
	      }.bind(this), ~~(this.data.freq) || 500);
	    },

	    /**
	     * Called when component is attached and when component data changes.
	     * Generally modifies the entity based on the data.
	     */
	    update: function (oldData) {},

	    /**
	     * Called when a component is removed (e.g., via removeAttribute).
	     * Generally undoes all modifications to the entity.
	     */
	    remove: function () {
	      clearInterval(this.data.intervalHandle);
	    },

	    /**
	     * Called on each scene tick.
	     */
	    // tick: function (t) { },

	    /**
	     * Called when entity pauses.
	     * Use to stop or remove any dynamic or background behavior such as events.
	     */
	    pause: function () {},

	    /**
	     * Called when entity resumes.
	     * Use to continue or add any dynamic or background behavior such as events.
	     */
	    play: function () {}
	  });
	})();


/***/ })
/******/ ]);