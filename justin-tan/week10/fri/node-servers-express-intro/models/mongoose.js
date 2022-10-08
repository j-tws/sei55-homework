const { default: mongoose } = require("mongoose")

const schema = new mongoose.Schema({ name: 'string', size: 'string'})
const Tank = mongoose.model('Tank', schema)

// const small = new Tank({size: 'small'})
// small.save(function (err) {
//   if (err) return handleError(err);

// })

// or 

Tank.create({size: 'small' }, function(err,small){
  if (err) return handleError(err)
})

// or, for inserting large batches of documents
// Tank.insertMany([{ size: 'small' }], function(err){

// })

mongoose.connect('mongodb://localhost/gettingstarted')