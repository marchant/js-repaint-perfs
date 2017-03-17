/**
 * @module ui/query.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Query
 * @extends Component
 */
exports.Query = Component.specialize(/** @lends Query# */ {

    _elapsed: {
        value: null
    },

    _query: {
        value: null
    },

    _needsUpdateElapsed: {
        value: false
    },

    _needsUpdateQuery: {
        value: false
    },

    query: {
        set: function (value) {
            if (value) {
                if (this._elapsed !== value.formatElapsed) {
                    this._elapsed = value.formatElapsed;
                    this._needsUpdateElapsed = true;
                }
                if (this._className !== value.elapsedClassName) {
                    this._className = value.elapsedClassName;
                    this._needsUpdateClassName = true;
                }
                if (this._query !== value.query) {
                    this._query = value.query;
                    this._needsUpdateQuery = true;
                }
                if (this._needsUpdateElapsed || this._needsUpdateQuery  || this._needsUpdateClassName) {
                    this.needsDraw = true;
                }
            }
        }
    },

    // formatElapsed: {
    //     value: function (value) {
    //         if(value) {
    //             //var str = parseFloat(value).toFixed(2);
    //             var str = value.toFixed(2);

    //             if (value > 60) {
    //                 var minutes = Math.floor(value / 60),
    //                     comps = (value % 60).toFixed(2).split('.'),
    //                     seconds = comps[0].lpad('0', 2),
    //                     ms = comps[1];
    //                 str = minutes + ":" + seconds + "." + ms;
    //             }
    //             return str;
    //         }
    //         return "";
    //     }
    // },

    _warn_long: {
        value: "Query elapsed warn_long"
    },

    _warn: {
        value: "Query elapsed warn"
    },

    _short: {
        value: "Query elapsed short"
    },

    _className: {
        value: null
    },

    draw: {
        value: function () {
            if (this._needsUpdateQuery) {
                this.queryElement.firstChild.data = this._query;
                this._needsUpdateQuery = false;
            }
            if (this._needsUpdateElapsed) {
                this.elapsedElement.firstChild.data = this._elapsed || " ";
                this._needsUpdateElapsed = false;
            }
            if (this._needsUpdateClassName) {
                this._element.className = this._className;
                this._needsUpdateClassName = false;
            }
        }
    }

});
