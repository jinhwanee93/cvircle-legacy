const objection = require('objection');
const User = require('./models/User');
const Itinerary = require('./models/Itinerary');
const Entry = require('./models/Entry');
const Comment = require('./models/Comments');
const Friend = require('./models/Friend');


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
    console.log("this is userdata", req.query.userdata);
    var data = JSON.parse(req.query.userdata)
    User
      .query()
      .allowEager('[itineraries, entries, friends1, friends2]') // wanting to get friends table here during get
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
              email: 'thisistheseedingemail@seedislife.com', // to do: remove email from schema - not available in FB profile
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
      id: req.body.id,
      title: req.body.title,
      body:  req.body.body,
      name:  req.body.name,
      address: req.body.address,
      contributorID: fcontributorID,
      itinID: fitinID,
      lat: flat,
      lng: flng
    }
    console.log(formattedEntry);
    Entry
      .query()
      .insertAndFetch(formattedEntry)
      .then((entry) => { res.send(entry) })
      .catch((err) => {
        console.log(err)
        next(err);
      });
  })

  app.delete('/entries', (req, res, next) => {
    console.log('itinID', req.query.itinID);
    console.log('id', req.query);
    Entry
      .query()
      .where('itinID', req.query.itinID)
      .where('id', req.query.id)
      .deleteById(req.query.id)
      .then((deleted) => { res.send(202, deleted); })
      .catch(next);
  })

  app.delete('/itineraries', function (req, res, next) {
    console.log('ownerID', req.query.ownderID);
    console.log('id', req.query.id);
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


    app.post('/comments', (req, res, next) => {
      console.log('in POST')
      console.log('req.body', req.body);
      console.log('req.query', req.query);
    let entryID = parseInt(req.body.entryID);
    let comment = req.body.comment;
    let contributorID = parseInt(req.body.contributorID);
    //console.log('+++++++++++++++++++++++++++', typeof entryId, typeof contributorId)
    let comments = {
      entryID : entryID, 
      comment: comment, 
      contributorID : contributorID, 
    }
    console.log(comments);
    Comment
      .query()
      .insertAndFetch(comments)
      .then((entry) => { res.send(entry) })
      .catch((err) => {
        console.log(err)
        next(err);
     });
   })
}

   app.get('/friends', (req, res, next) => {
    console.log("this is what i need", req.query);
    Friend
      .query()
      .allowEager('[friends1, friends2]') // wanting to get friends table here during get
      .eager(req.query.eager)
      .skipUndefined()
      .where('id', req.query.id)
      .then((friends) => { res.send(friends)})
      .catch(next)
  })

  app.post('/friends', (req, res, next) => {

  })

};

