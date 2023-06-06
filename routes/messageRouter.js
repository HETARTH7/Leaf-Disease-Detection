const router = require("express").Router();
const Message = require("../models/messages");

router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const newMessage = await Message.create({ sender, receiver, content });
    req.app.get("io").emit("message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:senderId/:receiverId", async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
