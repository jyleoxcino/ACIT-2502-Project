let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let remindertoUpdate = req.params.id;
    database.cindy.reminders.find(function (reminder) {
      if(reminder.id == remindertoUpdate) {
        reminder.description = req.body.description;
        reminder.title = req.body.title;
        if (req.body.completed == "true") {
          reminder.completed = true
        }
        else {
          reminder.completed = false
        }
        console.log(req.body.completed)
        res.render("reminder/single-reminder", { reminderItem: reminder });
      }
    });
  },

  delete: (req, res) => {
    let remindertoDelete = req.params.id;
    let searchResult = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == remindertoDelete;
    });
    if (searchResult != undefined) {
      database.cindy.reminders.splice(searchResult, 1);
      res.render("reminder/index", { reminders: database.cindy.reminders });
    } else {
      res.status(404).send("Unable to find reminder. ")
    }
  },
};

module.exports = remindersController;
