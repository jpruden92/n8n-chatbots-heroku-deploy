import { IWebhookFunctions } from 'n8n-core';
import { INodeTypeDescription, INodeType, IWebhookResponseData } from 'n8n-workflow';
export declare class DialogFlow implements INodeType {
    description: INodeTypeDescription;
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
}
