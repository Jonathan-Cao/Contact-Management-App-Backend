var mongoose = require("mongoose");
// Setup schema
var photoSchema = mongoose.Schema({
  albumId: Number,
  id: Number,
  title: String,
  url: String,
  thumbnailUrl: String,
});
// Export Photo model
var Photo = (module.exports = mongoose.model("photo", photoSchema));
module.exports.get = function (callback, limit) {
  Photo.find(callback).limit(limit);
};
