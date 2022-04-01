const Express = require('express')
const router = Express.Router()
const Url = require('../models/Url')
const path = require('path')


router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../views/index.html'))
})

router.get('/api/shorturl/:urlId', async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId})

        if (url){
            url.clicks++
            url.save()
            return res.redirect(url.origUrl)
        } else {
            res.status(404).json('Not found')
        }
    }catch(err){
        console.log(err)
        res.status(500).json('Server error')
    }
})

module.exports = router