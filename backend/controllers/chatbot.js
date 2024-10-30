import Chatbot from '../models/chatbot.js';

export function createChatbot(req, res) {
    const chatbot = new Chatbot(req.body);
    chatbot.save()
        .then(newChatbot => {
            res.status(200).json(newChatbot);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function getAllChatbots(req, res) {
    let sortQuery = {};
    let filterQuery = {};

    const sortParam = req.query.sort;
    if (sortParam) {
        const [field, direction] = sortParam.split('_');
        sortQuery[field] = direction === 'desc' ? -1 : 1;
    }

    const searchTerm = req.query.q;
    if (searchTerm) {
        filterQuery["name"] = { $regex: new RegExp(searchTerm, 'i') };
    }

    Chatbot.find(filterQuery)
        .sort(sortQuery)
        .then(chatbots => {
            res.status(200).json(chatbots);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function getChatbotById(req, res) {
    const chatbotId = req.params.id;

    Chatbot.findById(chatbotId)
        .then(chatbot => {
            if (!chatbot) {
                return res.status(404).json({ message: 'Chatbot not found' });
            }
            res.status(200).json(chatbot);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function updateChatbot(req, res) {
    const chatbotId = req.params.id;

    Chatbot.findByIdAndUpdate(chatbotId, req.body, { new: true })
        .then(updatedChatbot => {
            if (!updatedChatbot) {
                return res.status(404).json({ message: 'Chatbot not found' });
            }
            res.status(200).json(updatedChatbot);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function deleteChatbot(req, res) {
    const chatbotId = req.params.id;

    Chatbot.findByIdAndDelete(chatbotId)
        .then(deletedChatbot => {
            if (!deletedChatbot) {
                return res.status(404).json({ message: 'Chatbot not found' });
            }
            res.status(200).json(deletedChatbot);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}
