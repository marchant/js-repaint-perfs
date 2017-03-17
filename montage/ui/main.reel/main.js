/**
 * @module ui/main.reel
 */
var Component = require("montage/ui/component").Component,
    ENV = window.ENV;
    // ENV = {
    //     rows: 100,
    //     timeout: 0
    // };

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {

    constructor: {
        value: function () {
            this.super();
            if (!String.prototype.lpad) {
                String.prototype.lpad = function (padding, toLength) {
                    return padding.repeat((toLength - this.length) / padding.length).concat(this);
                };
            }
            this.databases = {};
        }
    },

    getData: {
        value: function () {

            var data = {
                    start_at: new Date().getTime() / 1000,
                    databases: {}
                },
                info,
                r,
                q,
                i;

            for (i = 1; i <= ENV.rows; i++) {
                data.databases["cluster" + i] = {
                    queries: []
                };
                data.databases["cluster" + i + "slave"] = {
                    queries: []
                };
            }
            Object.keys(data.databases).forEach(function (dbname) {
                info = data.databases[dbname];
                r = Math.floor((Math.random() * 10) + 1);
                for (i = 0; i < r; i++) {
                    q = {
                        canvas_action: null,
                        canvas_context_id: null,
                        canvas_controller: null,
                        canvas_hostname: null,
                        canvas_job_tag: null,
                        canvas_pid: null,
                        elapsed: Math.random() * 15,
                        query: "SELECT blah FROM something",
                        waiting: Math.random() < 0.5
                    };
                    if (Math.random() < 0.2) {
                        q.query = "<IDLE> in transaction";
                    }
                    if (Math.random() < 0.1) {
                        q.query = "vacuum";
                    }
                    info.queries.push(q);
                }
                info.queries = info.queries.sort(function (a, b) {
                    return b.elapsed - a.elapsed;
                });
            });
            return data;
        }
    },

    enterDocument: {
        value: function (firstTime) {
            var data,
                databases,
                self = this;

            if (firstTime) {
                setInterval(function () {
                    // var envData = ENV.generateData().toArray();
                    // console.log("ENV.generateData().toArray()", envData);

                    // data = self.getData();
                    // databases = [];
                    // Object.keys(data.databases).forEach(function (dbname, index) {
                    //     var queries = data.databases[dbname].queries,
                    //         topFiveQueries = queries.slice(0, 5);

                    //     while (topFiveQueries.length < 5) {
                    //         topFiveQueries.push({
                    //             query: "",
                    //             elapsed: null
                    //         });
                    //     }
                    //     if (!databases[index]) {
                    //         databases[index] = {};
                    //     }
                    //     databases[index].dbname = dbname;
                    //     databases[index].queries = queries;
                    //     databases[index].topFiveQueries = topFiveQueries;
                    // });

                    self.databases.children = ENV.generateData().toArray();

                }, ENV.timeout);
            }
        }
    }

});
