const filmModel = require('../models/filmModel')

class filmController {
   async addFilm(req, res) {
      try {
         const hamburger = new filmsModel({
            title: req.body.filmsTitle,
            img: req.body.filmImg
         })
         await film.save()
         res.redirect('/')
      } catch (e) {
         console.log(e)
      }
   }
}

module.exports = new filmController()