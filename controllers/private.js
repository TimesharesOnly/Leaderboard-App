const getPrivateData = (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: "Successfully logged in to the private data in this route",
  });
};

module.exports = { getPrivateData };
