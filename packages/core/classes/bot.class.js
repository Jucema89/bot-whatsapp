/**
 * Clase principal del BOT
 */
class BotClass {
    flowClass
    databaseClass
    providerClass
    constructor(_flow, _database, _provider) {
        this.flowClass = _flow
        this.databaseClass = _database
        this.providerClass = _provider

        this.providerClass.on('message', (ctxMessage) =>
            this.handleOnMessage(ctxMessage)
        )
    }

    handleOnMessage = (ctxMessage) => {
        this.databaseClass.saveLog(ctxMessage)
        this.continue(ctxMessage.body)
    }

    continue = (message, ref = false) => {
        const responde = this.flowClass.find(message, ref)
        if (responde) {
            this.providerClass.sendMessage(responde.answer)
            this.continue(null, responde.ref)
        }
    }
}
module.exports = BotClass
