// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var ACData = require("adaptivecards-templating");
const requestCard = require('./resources/cards/requestCard.json');
const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');


class RemedyBot extends ActivityHandler {
    constructor(conversationState, requestDialog) {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.conversationState = conversationState;
        // this.conversationDataAccessor = this.conversationState.createProperty("conversationData3")

        this.requestDialog = requestDialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

        this.onMessage(async (context, next) => {

            // // 1. ConversationState
            // const conversationData = await this.conversationDataAccessor.get(context, {"aa": 111});  // The final brackets {}, left as it is, means:
            // // if you do find such property, use the one you found. If you do not find it... assign it the value {}. The same if oyu have other proeprties
            // console.log("conversationData is:" + conversationData)
            // console.log(JSON.stringify(conversationData))
            // conversationData.stateA = context.activity.text; // set new key-value in conversationState


            // ------------------------------------------------------------------------
            // const replyText = `Echo: ${ context.activity.text }`;
            // 2. Using Cards with JSON templating
            // let myCard = getAdaptiveCard(replyText);
            // await context.sendActivity({ 
            //     attachments: [CardFactory.adaptiveCard(myCard)] 
            // });

            await this.requestDialog.run(context, this.dialogState);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }


    async run(context) {
        await super.run(context);
        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
    }
}






const getAdaptiveCard = (customizedTitle) => {
    let template = new ACData.Template(requestCard); 
    let data = {  
        "title": customizedTitle,  
        "status": "How are  \n you \t \" ?? \r \\ \\ \\\ \\\\ doing"
    };  
    
    let card = template.expand({ $root: data }); 
    return card;
}



module.exports.RemedyBot = RemedyBot;
