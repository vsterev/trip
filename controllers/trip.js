const { tripModel, userModel } = require('../models')

module.exports = {
    get: {
        home: (req, res, next) => {
            const user = req.user;
            res.render('home', { title: 'Trip Home Page', user })
        },
        trips: (req, res, next) => {
            const user = req.user;
            tripModel.find()
                .then(trips => {
                    res.render('homeAuth', { title: 'Trip home page', user, trips })
                })
                .catch(err => console.log(err))
        },
        offer: (req, res, next) => {
            const user = req.user;
            res.render('trip-offer', { title: 'Make new Offer', user })
        },
        details: (req, res, next) => {
            const id = req.params.id;
            const user = req.user || 'undefined';
            Promise.all([
                tripModel.findById(id).populate('creatorId'),
                tripModel.findById(id).populate('buddies')
            ])
                .then(([trip, tripBuddies]) => {
                    trip.isCreator = trip.creatorId.id === user.id;
                    trip.isBuddies = trip.buddies.includes(user.id)
                    trip.isSeats = trip.seats > trip.buddies.length
                    trip.availableSeats = trip.seats - trip.buddies.length;
                    res.render('details.hbs', { title: 'Trip details', trip, tripBuddies, user })
                })
                .catch(err => res.render('404.hbs', { msg: err }))
        },
        delete: (req, res, next) => {
            const user = req.user;
            Promise.all([
                tripModel.findByIdAndDelete(req.params.id),
                userModel.findByIdAndUpdate(user.id, { $pull: { trips: req.params.id } })
            ])
                .then(([deletedTrip, deletedUser]) => {
                    res.redirect('/trips')
                })
                .catch(err => next(err))
        },
        join: (req, res, next) => {
            const user = req.user;
            tripModel.findByIdAndUpdate(req.params.id, { $push: { buddies: user.id } })
                .then(() => res.redirect(`/trips/details/${req.params.id}`))
                .catch(err => console.log(err))
        },
        notFound: (req, res, next) => {
            const user = req.user;
            res.render('404.hbs', { title: 'course | Not found page', user })
        }
    },
    post: {
        offer: (req, res, next) => {
            const user = req.user;
            const creatorId = req.user.id
            const { direction, timeStr, imageUrl, seats, description } = req.body;
            const dirReg = /^[A-Za-z ]+-[a-zA-Z ]+$/
            const timeReg = /^[0-9 a-zA-Z-:]+-[0-9 :]+$/
            if (!dirReg.test(direction) || !timeReg.test(timeStr)) {
                // Promise.reject(new Error('Please enter correct format for direction or time separete by "-" !'))
                //     .catch(err =>  next(err))
                const trip = 
                res.render('trip-offer', { title: 'Trip Create', direction, timeStr, imageUrl, seats, description, user, errors: { parse: 'Please enter correct format for direction or time separete by "-" !' } })
                return;
            }

            let [startPoint, endPoint] = direction.split('-');
            startPoint = startPoint.trim();
            endPoint = endPoint.trim();
            let [date, time] = timeStr.split('-')
            date = date.trim();
            time = time.trim();
            tripModel.create({ startPoint, endPoint, date, time, seats, description, imageUrl, creatorId: req.user.id, buddies: [] })
                .then((trip) => Promise.all([trip, userModel.findByIdAndUpdate(creatorId, { $push: { trips: trip.id } })]))
                .then(([trip, pushed]) => {
                    res.redirect('/trips')
                })
                .catch(err => {
                    if (err.name == 'ValidationError') {
                        res.render('trip-offer', { title: 'Trip Create', direction, timeStr, imageUrl, seats, description, user, errors: err.errors })
                        return;
                    }
                    next(err);
                    console.log(err)
                })
        }
    }
}

