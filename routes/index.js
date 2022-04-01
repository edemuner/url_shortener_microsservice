const Express = require('express')
const req = require('express/lib/request')
const router = Express.Router()
const Url = require('../models/Url')

router.get('/shorturl/:urlId', async (rec, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.url})

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