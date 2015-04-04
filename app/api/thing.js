'use strict';

module.exports.get = function (req, res) {
  var Thing = req.db.models.Thing;
  new Thing().fetchAll({user_id: req.user.id})
      .then(function (collection) {
        res.send(collection.toJSON());
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};

module.exports.create = function (req, res) {
  var Thing = req.db.models.Thing;
  Thing.forge({
    name: req.body.name,
    user_id: req.user.id
  }).save()
      .then(function (thing) {
        res.json({error: false, data: {id: thing.get('id')}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};

module.exports.del = function (req, res) {
  var Thing = req.db.models.Thing;
  Thing.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (thing) {
        thing.destroy().then(function () {
          res.json({error: false, data: {message: 'Thing deleted'}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};

module.exports.update = function (req, res) {
  var Thing = req.db.models.Thing;
  new Thing().fetchOne({id: req.params.id})
      .then(function (collection) {
        res.send(collection.toJSON());
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
};
