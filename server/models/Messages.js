const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    },
    message: {
        type: String
    }
});

const Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;