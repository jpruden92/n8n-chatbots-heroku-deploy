"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicAuth = require("basic-auth");
function authorizationError(resp, realm, responseCode, message) {
    if (message === undefined) {
        message = 'Authorization problem!';
        if (responseCode === 401) {
            message = 'Authorization is required!';
        }
        else if (responseCode === 403) {
            message = 'Authorization data is wrong!';
        }
    }
    resp.writeHead(responseCode, { 'WWW-Authenticate': `Basic realm="${realm}"` });
    resp.end(message);
    return {
        noWebhookResponse: true,
    };
}
class DialogFlow {
    constructor() {
        this.description = {
            displayName: 'Dialog Flow',
            name: 'dialogFlow',
            group: ['trigger'],
            version: 1,
            description: 'DialogFlow',
            defaults: {
                name: 'Dialog Flow',
                color: '#885577',
            },
            inputs: [],
            outputs: ['main'],
            credentials: [
                {
                    name: 'httpBasicAuth',
                    required: true,
                    displayOptions: {
                        show: {
                            authentication: [
                                'basicAuth',
                            ],
                        },
                    },
                },
            ],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    isFullPath: true,
                    responseCode: '200',
                    responseMode: 'lastNode',
                    responseData: 'firstEntryJson',
                    path: '={{$parameter["path"]}}',
                },
            ],
            properties: [
                {
                    displayName: 'Authentication',
                    name: 'authentication',
                    type: 'options',
                    options: [
                        {
                            name: 'Basic Auth',
                            value: 'basicAuth'
                        },
                        {
                            name: 'None',
                            value: 'none'
                        },
                    ],
                    default: 'none',
                    description: 'The way to authenticate.',
                },
                {
                    displayName: 'Path',
                    name: 'path',
                    type: 'string',
                    default: '',
                    placeholder: 'webhook',
                    required: true,
                    description: 'The path to listen to.',
                },
            ],
        };
    }
    async webhook() {
        const authentication = this.getNodeParameter('authentication');
        const req = this.getRequestObject();
        const resp = this.getResponseObject();
        const headers = this.getHeaderData();
        const realm = 'Dialog Flow';
        if (authentication === 'basicAuth') {
            // Basic authorization is needed to call webhook
            const httpBasicAuth = this.getCredentials('httpBasicAuth');
            if (httpBasicAuth === undefined || !httpBasicAuth.user || !httpBasicAuth.password) {
                // Data is not defined on node so can not authenticate
                return authorizationError(resp, realm, 500, 'No authentication data defined on node!');
            }
            const basicAuthData = basicAuth(req);
            if (basicAuthData === undefined) {
                // Authorization data is missing
                return authorizationError(resp, realm, 401);
            }
            if (basicAuthData.name !== httpBasicAuth.user || basicAuthData.pass !== httpBasicAuth.password) {
                // Provided authentication data is wrong
                return authorizationError(resp, realm, 403);
            }
        }
        const response = {
            json: {
                body: {
                    fulfillmentMessages: [
                        this.getBodyData()
                    ]
                },
                headers,
                query: this.getQueryData(),
            },
        };
        console.info(response);
        return {
            workflowData: [
                [
                    response,
                ],
            ],
        };
    }
}
exports.DialogFlow = DialogFlow;
//# sourceMappingURL=DialogFlow.node.js.map