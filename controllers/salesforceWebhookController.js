const User = require('../models/User'); // Adjust the path as needed

const handleSalesforceWebhook = async (req, res) => {
  const { email, ...salesData } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    req.app.get('io').emit('salesEvent', {
      ...salesData,
      youtubeVideoId: user.youtubeVideoId
    });

    res.status(200).send({ success: true, message: 'Webhook received successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  handleSalesforceWebhook
};
