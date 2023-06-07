const router = require("express").Router();
const Message = require("../models/messages");

router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;

  const newMessage = new Message({ sender, receiver, content });
  const savedMessage = await newMessage.save();
  io.emit("message", savedMessage);
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
