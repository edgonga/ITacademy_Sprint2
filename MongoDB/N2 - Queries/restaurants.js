use ('Restaurants')
// db.Restaurants.find()
// db.Restaurants.find({}, {restaurant_id: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({}, {restaurant_id: 1, borough: 1, cuisine: 1, _id: 0})
// db.Restaurants.find({}, {restaurant_id: 1, borough: 1, cuisine: 1, zip_code: 1, _id: 0})
// db.Restaurants.find({borough: "Bronx"})
// db.Restaurants.find({borough: "Bronx"}).sort({_id: 1}).limit(5)
// db.Restaurants.find({borough: "Bronx"}).sort({_id: 1}).skip(5).limit(5)
// db.Restaurants.find({"grades.score": {$gt: 90}})
// db.Restaurants.find({grades: {$elemMatch: {score: {$gt: 80, $lt: 100}}}})  //db.Restaurants.find({"grades.score": {$gt: 80, $lt: 100}})
// db.Restaurants.find({"address.coord.0": {$lt: -95.754168}})
// db.Restaurants.find({$and:[{cuisine: {$nin: ["American", "American "]}}, {grades: {$elemMatch: {score: {$gt: 70}}}}, {"address.coord.0": {$lt: -65.754168}}]})
// db.Restaurants.find({ cuisine: {$nin: ["American", "American "]}, grades: {$elemMatch: {score: {$gt: 70}}}, "address.coord.0": {$lt: -65.754168}})
// db.Restaurants.find({ cuisine: {$nin: ["American", "American "]}, grades: {$elemMatch: {grade: {$eq: "A"}}}, borough: {$ne: "Brooklyn"}}).sort({cuisine: -1})
// db.Restaurants.find({name: {$regex: /^Wil/}},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({name: {$regex: /ces$/}}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({name: {$regex: /.*Reg.*/}}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({borough: "Bronx", cuisine: {$regex: /.*American.*|.*Chinese.*/}})
// db.Restaurants.find({borough: {$in: ["Staten Island", "Queens", "Brooklyn"]}}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({borough: {$nin: ["Staten Island", "Queens", "Brooklyn"]}}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({grades: {$elemMatch: {score: {$lt: 10}}}}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({ name: {$regex: /.*Seafood.*/}, cuisine: {$nin: ["American", "American ", "Chinese"]}, name: {$not: {$regex: /^Wil/}} }, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
// db.Restaurants.find({grades: {$elemMatch: {grade: "A"}}, grades: {$elemMatch: {score: {$gt: 11}}}, grades: {$elemMatch: {date: {$eq: new Date("2014-08-11T00:00:00Z")}}}}, {restaurant_id: 1, name: 1, grades: 1})
// db.Restaurants.find({$and: [{"grades.1.grade": {$eq: "A"}}, {"grades.1.score": {$eq: 9}}, {"grades.1.date": {$eq: new Date("2014-08-11T00:00:00Z")}}]}, {restaurant_id: 1, name: 1, grades: 1})
// db.Restaurants.find({"address.coord.1": {$gt: 42, $lt: 52}}, {restaurant_id: 1, name: 1, adress: 1, borough: 1})
// db.Restaurants.find().sort({name: 1})
// db.Restaurants.find().sort({name: -1})
// db.Restaurants.find().sort({cuisine: 1, borough: -1})
// db.Restaurants.find({"address.street": {$exists: true}})
// db.Restaurants.find({"address.coord": {$type: "double"}})
// db.Restaurants.find({grades: {$elemMatch: {{score: {$exists: true}}}}, $exp: {$eq: [{$mod: ["$grades.1.score", 7]}, 0]}}, {restaurant_id: 1, name: 1, grade: 1});
// db.Restaurants.find({
//   "grades.1.score.0": {$exists: true},
//   $expr: {$eq: [{$mod: [{$toDouble: "$grades.1.score.0"}, 7]}, 0]}
// }, {restaurant_id: 1, name: 1});


