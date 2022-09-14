// Import redis
let Redis = require("redis");
// Setup redis
const redisClient = Redis.createClient({
  legacyMode: true,
});
(async () => {
  await redisClient.connect();
})();
redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("error", (err) =>
  console.log("Redis Client Connection Error", err)
);

// Import photo model
const Photo = require("./photoModel");

exports.get = async function (req, res) {
  redisClient.get("photos", (error, photos) => {
    if (error) {
      res.status(500).send(err);
      return;
    }
    if (photos) {
      console.log("Get from cache");
      res.status(200).send(JSON.parse(photos));
      return;
    } else {
      Photo.get(function (err, photosDb) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        redisClient.setEx("photos", 3600, JSON.stringify(photosDb));
        console.log("Set cache");
        res.status(200).send(photosDb);
      });
    }
  });
};
