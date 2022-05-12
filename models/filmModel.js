const {
   Schema,
   model
} = require('mongoose')

const films = new Schema({
   title: {
      type: String,
      required: true
   },
   img: {
      type: String,
      required: true
   }
})

module.exports = model('Films', films)