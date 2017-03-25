const objection = require('objection')
const User = require('./models/User')
const Itinerary = require('./models/Itinerary')
const Entry = require('./models/Entry')
const Comment = require('./models/Comments')
const Friend = require('./models/Friend')
const Cloudinary = require('cloudinary')
const Pictures = require('./models/Pictures')

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
              email: 'http://www.lincscareassociation.org.uk/data/files/NoImageSelected.png'
            })
            .then((user) => {
              res.send(user)
            })
            .catch((err) => {
              next(err)
            })
        } else {
          res.send(users)
        }
      })
      .catch(next)
  })

  app.post('/users', (req, res, next) => {
    User
      .query()
      .insertAndFetch(req.body)
      .then((user) => { res.send(user) })
      .catch(next)
  })

  app.get('/entries', (req, res, next) => {
    Entry
      // we can add 'where' logic to filter and query results
      .query()
      .skipUndefined()
      // console.log(req.query.itinID, "THIS IS ITINIDDDDD")
      .where('itinID', req.query.itinID)
      .where('contributorID', req.query.contributorID)
      .then((entries) => { res.send(entries) })
      .catch(next)
  })

  app.post('/entries', (req, res, next) => {
    let fitinID = parseInt(req.body.itinID)
    let fcontributorID = parseInt(req.body.contributorID)
    let flat = parseFloat(req.body.lat)
    let flng = parseFloat(req.body.lng)
    let formattedEntry = {
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
      name: req.body.name,
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
      .catch((err) => {
        next(err)
      })
  })

  app.delete('/entries', (req, res, next) => {
    Entry
      .query()
      .where('itinID', req.query.itinID)
      .where('id', req.query.id)
      .deleteById(req.query.id)
      .then((deleted) => { res.send(202, deleted) })
      .catch(next)
  })

  app.delete('/itineraries', function (req, res, next) {
    Itinerary
      .query()
      .where('ownerID', req.query.ownerID)
      .where('id', req.query.id)
      .deleteById(req.query.id)
      .then((deleted) => { res.send(200, deleted) })
      .catch(next)
  })

  app.get('/itineraries', (req, res, next) => {
    Itinerary
      // we can add 'where' logic to filter and query results
      .query()
      .allowEager('[entries]')
      .eager(req.query.eager)
      .skipUndefined()
      .where('id', req.query.id)
      .where('ownerID', req.query.ownerID)
      .then((itineraries) => { res.send(itineraries) })
      .catch(next)
  })

  app.get('/itinsByUser', (req, res, next) => {
    Itinerary
      .query()
      .select('itineraries.*', 'users.firstname', 'users.lastName', 'users.email')
      .join('users', 'itineraries.ownerID', 'users.id')
      .then((result) => {
        res.send(result)
      })
  })
  app.post('/itineraries', (req, res, next) => {
    Itinerary
      .query()
      .insertAndFetch(req.body)
      .then((itinerary) => { res.send(itinerary) })
      .catch(next)
  })

  app.post('/comments', (req, res, next) => {
    let entryID = parseInt(req.body.entryID)
    let comment = req.body.comment
    let contributorID = req.body.contributorID
    let comments = {
      entryID: entryID,
      comment: comment,
      contributorID: contributorID
    }
    Comment
      .query()
      .allowEager('[comments]')
      .eager(req.query.eager)
      .skipUndefined()
      .insertAndFetch(comments)
      .then((entry) => { res.send(entry) })
      .catch((err) => {
        next(err)
      })
  })

  app.get('/comments', (req, res, next) => {
    Comment
      .query()
      .then((comments) => { res.send(comments) })
      .catch(next)
  })

    app.delete('/comments', (req, res, next) => {
    console.log('req.query++++++++++++++++++++++++++++++++++++++++++++++++', req.query);
    Comment
      .query()
      .skipUndefined()
      //.where('id', req.query.id)
      .deleteById(req.query.id)
      .then((deleted) => { res.send(200, deleted); })
      .catch(next);
  })

  app.get('/usernames', (req, res, next) => {
    User
     .query()
     .allowEager('[users]')
     .eager(req.query.eager)
     .skipUndefined()
     .where('id', req.query.contributorID)
     .then((user) => { res.send(user) })
     .catch(next)
  })

  app.get('/friends', (req, res, next) => {
    User
      .query()
      .select('users.*', 'friends.friendA as fA', 'friends.friendB as fB', 'friendlist.firstName as ffn', 'friendlist.lastName as fln')
      .join('friends', 'friends.friendA', 'users.id')
      .join('users as friendlist', 'friends.friendB', 'friendlist.id')
      .where('users.id', req.query.userid)
      .then((list) => {
        res.send(list)
      }
  )
  })

  app.post('/friends', (req, res, next) => {
    User
    .query()
    .where('fbID', req.body.friendA)
    .then(users => {
    let friend1 = users[0].id
    let friend2 = parseInt(req.body.friendB)
    let whatIWant = {
      friendA: friend1,
      friendB: friend2
    }
    Friend
      .query()
      .insertAndFetch(whatIWant)
      .then((friend) => { res.send(friend) })
      .catch((err) => {
        next(err)
      })
    })
  })

  app.get('/friendSearch', (req, res, next) => {
    var firstName, lastName
    req.query.firstName !== undefined ? firstName = '%' + req.query.firstName + '%' : firstName = undefined
    req.query.lastName !== undefined ? lastName = '%' + req.query.lastName + '%' : lastName = undefined
    User
      .query()
      .skipUndefined()
      .where('firstName', 'like', firstName)
      .where('lastName', 'like', lastName)
      .then((users) => { res.send(users) })
      .catch(next)
  })

  Cloudinary.config({
    cloud_name: 'ddcrxxkge',
    api_key: '135915495998577',
    api_secret: 'yd8nXf1oai0DgVr8I4RgDVBpxl8'
  })

  app.get('/pictures', (req, res, next) => {
    var parseID = JSON.parse(req.query.picdata).itinID
    Pictures
      .query()
      .where('picItinID', parseID)
      // console.log(parseID, "this is ITINREQ")
      .then((pictures) => {
        console.log(pictures, 'show me pictures')
        res.send(pictures)
      })
  })

  app.post('/pictures', (req, res, next) => {
    User
      .query()
      .where('fbID', req.body.picUserID)
      .then((users) => {
        // console.log(users, "this is users")
        // console.log(users[0].id, "this is users id")
        let asdf1 = parseInt(req.body.picItinID)
        let asdf2 = users[0].id
        let whatIWant = {
          picItinID: asdf1,
          picUserID: asdf2,
          url: req.body.url
        }
  // console.log('what is this? ', whatIWant)
        Pictures
      .query()
      .insertAndFetch(whatIWant)
      .then((pictures) => { res.send(pictures) })
      .catch((err) => {
        console.log(err)
      })
      })
  })
}
