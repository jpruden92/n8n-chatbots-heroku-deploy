### Intro

This repository contains a customized version of [N8N](https://n8n.io/), an extendable tool for workflow automation.

This customized version is focused on chatbots development, integrating nodes that allow to connect chatbot development platforms like Dialogflow.

Also, this version is auto deployable on Heroku PaaS. You only need to click on the next button to deploy in less than one minute:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

![](./resources/deploy.gif)

### Configuration

When you click on ``Deploy to Heroku`` some configuration variables will be required to you. Here you have a description of each variable:

| Config Var | Description |
| - | - |
| APP_NAME | Your app name. Must be equal to the name that you introduced in ``App name`` field. |
| N8N_BASIC_AUTH_USER | This username will be required to you each time you access to the tool. |
| N8N_BASIC_AUTH_PASSWORD | This password will be required to you each time you access to the tool. |

### Custom nodes for chatbots

Here is a list of custom nodes that we have added to N8N to make it useful for chatbots:

| Name | Description |
| - | - |
| Dialogflow Trigger | Allows to accept a Dialogflow Fulfillment Request. |
| Dialogflow Response | Allows to return a Dialogflow text response. |

### License

You can read about N8N license [here](https://faircode.io/).
