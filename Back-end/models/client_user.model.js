const mongoose = require("mongoose");

const clientUserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const ClientUser = mongoose.model("client-user", clientUserSchema);

module.exports = ClientUser;
