/**
 * @module ui/count.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Count
 * @extends Component
 */
exports.Count = Component.specialize(/** @lends Count# */ {

    _queriesLength: {
        value: null
    },

    queries: {
        set: function (value) {
            if (value && (this._queriesLength !== value.length)) {
                this._queriesLength = value.length;
                this.needsDraw = true;
            }
        }
    },

    _lastSample: {
        value: null
    },
  lastSample: {
        set: function (value) {
            if(value) {
                this._lastSample = value;
                if (value && (this._queriesLength !== value.queries.length)) {
                    this.needsDraw = true;
                }
                if(this._className !== this._lastSample.countClassName) {
                    this.needsDraw = true;
                }
            }
            
        }
    },


    _important: {
        value: "label label-important"
    },

    _warning: {
        value: "label label-warning"
    },

    _success: {
        value: "label label-success"
    },

    _className: {
        value: null
    },

    draw: {
        value: function () {

            if(this._lastSample) {
                if (this._queriesLength !== this._lastSample.nbQueries) {
                    this._queriesLength = this._lastSample.nbQueries;
                     this._element.firstChild.data = this._queriesLength
                    // this._className = this._lastSample.countClassName
                    // if (length >= 20) {
                    //     className = this._important;
                    // } else {
                    //     if (length >= 10) {
                    //         className = this._warning;
                    //     } else {
                    //         className = this._success;
                    //     }
                    // }
                }
                if (this._className !== this._lastSample.countClassName) {
                    this._className = this._lastSample.countClassName;
                    this._element.className = this._className;
                }
            }
        }
    }

});
