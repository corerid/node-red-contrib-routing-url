module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        const { pathToRegexp } = require('path-to-regexp');
        var node = this;
        node.on('input', function(msg) {
            var conditions = config.conditions || [];
            var results = new Array(conditions.length).fill(undefined);

            for (var index = 0; index < conditions.length; index++) {
                var condition = conditions[index];
                if (condition.path.trim() === "") {
                    node.error("Condition text cannot be empty", msg);
                    return;
                }

                var regex = pathToRegexp(condition.path);
                if (regex.test(msg.req.url) && msg.req.method.toUpperCase() === condition.method) {
                    results[index] = msg;
                    break;
                }
            }

            node.send(results);
        });
    }
    RED.nodes.registerType("routing",LowerCaseNode);
}