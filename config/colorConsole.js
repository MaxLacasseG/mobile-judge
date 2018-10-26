var colors = require("colors");
var logger = require("tracer").colorConsole({
    filters: [
        {
            log: colors.cyan,
            trace: colors.grey,
            debug: colors.blue,
            info: colors.green,
            warn: colors.yellow,
            error: colors.red
        }
    ]
});

module.exports = logger;
