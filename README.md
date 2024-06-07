# Node-RED Routing Node

[![GitHub](https://img.shields.io/github/v/tag/corerid/node-red-contrib-url-routing)](https://github.com/corerid/node-red-contrib-url-routing)

## Overview

The Node-RED Routing URL Node allows you to define multiple conditions for routing messages based on HTTP request methods and URL paths. This node helps you manage complex routing logic with ease by supporting dynamic reordering of conditions and validation of inputs.

## Features

- Supports HTTP methods: GET, POST, PUT, DELETE, PATCH
- Allows multiple conditions to be added and configured
- Conditions can be reordered via drag-and-drop
- Validates condition paths to ensure no empty conditions are saved

## Installation

To install the node, navigate to your Node-RED user directory (typically `~/.node-red`) and run:

```sh
npm install node-red-contrib-url-routing
```

## Example Flow

This example demonstrates how to use the Routing Node to handle different HTTP GET requests and route them to different outputs based on the request path.

### Flow JSON

```json
[
    {
        "id": "1",
        "type": "http in",
        "z": "3e6acde817e88f81",
        "name": "",
        "url": "/api/*",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 500,
        "y": 700,
        "wires": [
            [
                "2"
            ]
        ]
    },
    {
        "id": "2",
        "type": "routing",
        "z": "3e6acde817e88f81",
        "name": "Route API Requests",
        "outputs": 4,
        "conditions": [
            {
                "path": "/api/",
                "method": "GET"
            },
            {
                "path": "/api/courses",
                "method": "GET"
            },
            {
                "path": "/api/courses/:id",
                "method": "GET"
            },
            {
                "path": "/api/*",
                "method": "GET"
            }
        ],
        "x": 720,
        "y": 700,
        "wires": [
            [
                "8f9f24f73b7cbf35"
            ],
            [
                "9e62412792545305"
            ],
            [
                "dcfee9a547f90414"
            ],
            [
                "da197d5e7999fb0f"
            ]
        ]
    },
    {
        "id": "8f9f24f73b7cbf35",
        "type": "template",
        "z": "3e6acde817e88f81",
        "name": "root response",
        "field": "payload",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "{\n    \"path\": \"root\"\n}",
        "output": "str",
        "x": 980,
        "y": 600,
        "wires": [
            [
                "4ed8662d40737792"
            ]
        ]
    },
    {
        "id": "9e62412792545305",
        "type": "template",
        "z": "3e6acde817e88f81",
        "name": "courses response",
        "field": "payload",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "{\n    \"path\": \"/api/courses\"\n}",
        "output": "str",
        "x": 990,
        "y": 660,
        "wires": [
            [
                "4ed8662d40737792"
            ]
        ]
    },
    {
        "id": "dcfee9a547f90414",
        "type": "template",
        "z": "3e6acde817e88f81",
        "name": "courses id response",
        "field": "payload",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "{\n    \"path\": \"/courses/:id\"\n}",
        "output": "str",
        "x": 1000,
        "y": 720,
        "wires": [
            [
                "4ed8662d40737792"
            ]
        ]
    },
    {
        "id": "4ed8662d40737792",
        "type": "http response",
        "z": "3e6acde817e88f81",
        "name": "response",
        "statusCode": "200",
        "headers": {
            "Content-Type": "applications/json"
        },
        "x": 1260,
        "y": 680,
        "wires": []
    },
    {
        "id": "da197d5e7999fb0f",
        "type": "template",
        "z": "3e6acde817e88f81",
        "name": "wildcard response",
        "field": "payload",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "{\n    \"path\": \"/*\"\n}",
        "output": "str",
        "x": 990,
        "y": 780,
        "wires": [
            [
                "4ed8662d40737792"
            ]
        ]
    }
]
```

## Github

![](https://img.shields.io/github/stars/corerid/node-red-contrib-url-routing) ![](https://img.shields.io/github/forks/corerid/node-red-contrib-url-routing) ![](https://img.shields.io/github/tag/corerid/node-red-contrib-url-routing) ![](https://img.shields.io/github/release/corerid/node-red-contrib-url-routing) ![](https://img.shields.io/github/issues/corerid/node-red-contrib-url-routing)

You can find the source code and contribute to the project on GitHub:
[GitHub Repository](https://github.com/corerid/node-red-contrib-url-routingg)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
