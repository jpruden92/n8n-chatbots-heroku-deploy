"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DialogFlowResponse {
    constructor() {
        this.description = {
            displayName: 'Dialog Flow Response',
            name: 'dialogFlowResponse',
            group: ['transform'],
            version: 1,
            description: 'DialogFlowResponse',
            defaults: {
                name: 'Dialog Flow Response',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                // Node properties which the user gets displayed and
                // can change on the node.
                {
                    displayName: 'My String',
                    name: 'myString',
                    type: 'string',
                    default: '',
                    placeholder: 'Placeholder value',
                    description: 'The description text',
                }
            ]
        };
    }
    async execute() {
        const items = this.getInputData();
        let item;
        let myString;
        // Itterates over all input items and add the key "myString" with the
        // value the parameter "myString" resolves to.
        // (This could be a different value for each item in case it contains an expression)
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            myString = this.getNodeParameter('myString', itemIndex, '');
            item = items[itemIndex];
            item.json = {
                fulfillmentMessages: [
                    {
                        text: {
                            text: [
                                myString
                            ]
                        }
                    }
                ]
            };
        }
        return this.prepareOutputData(items);
    }
}
exports.DialogFlowResponse = DialogFlowResponse;
//# sourceMappingURL=DialogFlowResponse.node.js.map