let database = require("../database");

let remindersController = {
  list: (req, res) => {
    // if (!req.user) {res.red}
    if (!req.user) {
      res.render("../views/login");
    } else {
    res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  new: (req, res) => {
    if (!req.user) {
      res.render("../views/login");
    } else {
      res.render("reminder/create");
    }
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    if (!req.user) {
      res.render("../views/login");
    } else {
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
    }
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let remindertoUpdate = req.params.id;
    req.user.reminders.find(function (reminder) {
      if(reminder.id == remindertoUpdate) {
        reminder.description = req.body.description;
        reminder.title = req.body.title;
        if (req.body.completed == "true") {
          reminder.completed = true
        }
        else {
          reminder.completed = false
        }
        res.render("reminder/single-reminder", { reminderItem: reminder });
      }
    });
  },

  delete: (req, res) => {
    let remindertoDelete = req.params.id;
    let searchResult = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == remindertoDelete;
    });
    if (searchResult != undefined) {
      req.user.reminders.splice(searchResult, 1);
      res.render("reminder/index", { reminders: req.user.reminders });
    } else {
      res.status(404).send("Unable to find reminder. ")
    }
  },
};

module.exports = remindersController;
