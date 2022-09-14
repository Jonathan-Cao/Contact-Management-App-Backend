// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Contact Management API ready to serve!",
  });
});

// Import contact controller
var contactController = require("./contactController");
// Contact routes
router
  .route("/contacts")
  .get(contactController.index)
  .post(contactController.new);
router
  .route("/contacts/:contact_id")
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

// Import cache controller
var cacheController = require("./cacheController");
// Contact routes
router.route("/cache").get(cacheController.get);

// Export API routes
module.exports = router;
