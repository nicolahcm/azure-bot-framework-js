

## Prerequisites

- [Node.js](https://nodejs.org) version 16.16.0 or higher

    ```bash
    # determine node version
    node --version
    ```


- Install modules

    ```bash
    npm install
    ```

- Start the bot

    ```bash
    npm start
    ```

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the latest Bot Framework Emulator from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)
----------------------


## Note: create a .env file

with the following parameters:

MicrosoftAppType=MultiTenant
MicrosoftAppId=   // empty
MicrosoftAppPassword=   // empty
MicrosoftAppTenantId=   // empty

BlobConnectionString={your-connection-string-to-blob}
BlobContainerName=bot-state-js