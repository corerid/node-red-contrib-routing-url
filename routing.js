module.exports = function(RED) {
    function URLRoutingNode(config) {
        RED.nodes.createNode(this,config);
        const createMatcher = require('feather-route-matcher');
                    
        var node = this;
        node.on('input', function(msg) {
            var conditions = config.conditions || [];
            var results = new Array(conditions.length).fill(undefined);
            let isMatched = false;

            for (var index = 0; index < conditions.length; index++) {
                var condition = conditions[index];
                let routeMatcher = {};
                routeMatcher[condition.path] = condition.method;
                const matcher = createMatcher(routeMatcher)

                if (condition.path.trim() === "") {
                    node.error("Condition text cannot be empty", msg);
                    return;
                }

                if (matcher(msg.req.url) && msg.req.method.toUpperCase() === condition.method) {
                    isMatched = true;
                    results[index] = msg;
                    break;
                }
            }

            if (!isMatched) {
                node.error("No matched route condition", msg);
                return;
            }

            node.send(results);
        });
    }
    RED.nodes.registerType("routing", URLRoutingNode);
}
