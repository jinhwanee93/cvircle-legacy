const objection = require('objection');
const User = require('./models/User');
const Itinerary = require('./models/Itinerary');
const Entry = require('./models/Entry');

// we should refactor this to DRY out the code and instead use
// express.router and controllers modularly

// since the models come with their own validation schematic
// we can create ONE "postOne" method for all routes
// and then trust that the model defined in the ORM will 
// prevent an insertOne of any given Model type object
// that is incomplete/malformed/invalid
// The insertOne function can look like this:
// controller.insertOne(payload, ModelType) 

module.exports = (app) => {
  app.get('/users', (req, res, next) => {
    var data = JSON.parse(req.query.userdata)
    User
      .query()
      .allowEager('[itineraries, entries]')
      .eager(req.query.eager)
      // .skipUndefined()
      .where('fbID', data.fbID)
      .then((users) => { 
        if (users.length === 0) {
            User
            .query()
            .insertAndFetch({
              fbID: data.fbID,
              firstName: data.firstName,
              lastName: data.lastName,
              email: 'fakeemail@something.com',
            })
            .then((user) => { 
              console.log("success", user);
              res.send(user) })
            .catch((err) => {
              console.log("err", err)
            })
        } else {
        res.send(users);
      }})
      .catch(next)
  })

  app.post('/users', (req, res, next) => {
    User
      .query()
      .insertAndFetch(req.body)
      .then((user) => { res.send(user) })
      .catch(next);
  })

  app.get('/entries', (req, res, next) => {
    Entry
      // we can add 'where' logic to filter and query results
      .query()
      .skipUndefined()
      .where('itinID', req.query.itinID)
      .where('contributorID', req.query.contributorID)
      .then((entries) => { res.send(entries); })
      .catch(next);
  })

  app.post('/entries', (req, res, next) => {
    let fitinID = parseInt(req.body.itinID);
    let fcontributorID = parseInt(req.body.contributorID);
    let flat = parseFloat(req.body.lat);
    let flng = parseFloat(req.body.lng);
    let formattedEntry = {
      title: req.body.title,
      body:  req.body.body,
      name:  req.body.name,
      address: req.body.address,
      contributorID: fcontributorID,
      itinID: fitinID,
      lat: flat,
      lng: flng
    }
    Entry
      .query()
      .insertAndFetch(formattedEntry)
      .then((entry) => { res.send(entry) })
      .catch(next);
  })

  app.delete('/entries', (req, res, next) => {
    Entry
      .query()
      .where('itinID', req.query.itinID)
      .where('id', req.query.id)
      .deleteById(req.query.id)
      .then((deleted) => { res.send(202, deleted); })
      .catch(next);
  })

  app.delete('/itineraries', function (req, res, next) {
    Itinerary
      .query()
      .where('ownerID', req.query.ownerID)
      .where('id', req.query.id)
      .deleteById(req.query.id)
      .then((deleted) => { res.send(200, deleted); })
      .catch(next);
  });

  app.get('/itineraries', (req, res, next) => {
    Itinerary
      // we can add 'where' logic to filter and query results
      .query()
      .allowEager('[entries]')
      .eager(req.query.eager)
      .skipUndefined()
      .where('id', req.query.id)
      .where('ownerID', req.query.ownerID)
      .then((itineraries) => { res.send(itineraries); })
      .catch(next);
  })

  app.post('/itineraries', (req, res, next) => {
    Itinerary
      .query()
      .insertAndFetch(req.body)
      .then((itinerary) => { res.send(itinerary)})
      .catch(next);
  })

};
