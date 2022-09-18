// Import contact model
Contact = require("./contactModel");

// Handle index actions
exports.index = function (req, res) {
  Contact.get(function (err, contacts) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send({
      status: "success",
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  });
};

// Handle create contact actions
exports.new = function (req, res) {
  var contact = new Contact();
  contact.name = req.body.name;
  contact.gender = req.body.gender ? req.body.gender : "";
  contact.email = req.body.email;
  contact.phone = req.body.phone ? req.body.phone : "";
  if (!req.body.name) {
    res.status(400).send("Name required!");
    return;
  }
  if (!req.body.email) {
    res.status(400).send("Email required!");
    return;
  }
  // save the contact and check for errors
  contact.save(function (err) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send({
      message: "New contact created!",
      data: contact,
    });
  });
};

// Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (!contact) {
      res.status(404).send("Contact not found!");
      return;
    }
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send({
      message: "Contact details loading..",
      data: contact,
    });
  });
};

// Handle update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (!contact) {
      res.status(404).send("Contact not found!");
      return;
    }
    if (err) {
      res.status(500).send(err);
      return;
    }
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender ? req.body.gender : contact.gender;
    contact.email = req.body.email ? req.body.email : contact.email;
    contact.phone = req.body.phone ? req.body.phone : contact.phone;
    // save the contact and check for errors
    contact.save(function (err) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send({
        message: "Contact Info updated",
        data: contact,
      });
    });
  });
};

// Handle delete contact
exports.delete = function (req, res) {
  Contact.findByIdAndRemove(req.params.contact_id, function (err, contact) {
    if (!contact) {
      res.status(404).send("Contact not found!");
      return;
    }
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send({
      status: "success",
      message: "Contact deleted",
    });
  });
};
