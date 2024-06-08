module.exports = function(RED) {
    function URLRoutingNode(config) {
        RED.nodes.createNode(this,config);
        const createMatcher = require('feather-route-matcher');
                    
        var node = this;
        node.on('input', function(msg) {
            var conditions = config.conditions || [];
            var results = new Array(conditions.length).fill(undefined);

            const methodConditions = conditions.filter(item => item.method === msg.req.method.toUpperCase());
            if (methodConditions.length === 0 ) {
                node.error("No matched route condition for method: " + msg.req.method)
                return
            }
            const paths = methodConditions.flatMap(item => item.paths);

            let isMatch = false;
            for (const path of paths) {
                let routeMatcher = {};
                routeMatcher[path.value.trim()] = true;
                const matcher = createMatcher(routeMatcher)

                if (matcher(msg.req.url)) {
                    isMatch = true;
                    results[path.index] = msg;
                    node.send(results);
                    return
                }
            }

            node.error("No matched route condition", msg);
            return
        });
    }
    RED.nodes.registerType("routing", URLRoutingNode);
}
