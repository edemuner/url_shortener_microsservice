const express = require('express')
const router = express.Router()
const shortid = require('shortid')
const Url = require('../models/Url')
const utils = require('../utils/utils')
require('dotenv').config()

function resFilter(url){
    return {original_url:url.origUrl, short_url:url.shortUrl}
}

router.post('/shorturl', async (req, res) => {
    const { origUrl } = req.body
    const base = process.env.BASE

    const urlId = shortid.generate()

    if (utils.validateUrl(origUrl)){
        try {
            let url = await Url.findOne({origUrl})
            if (url){
                res.json(resFilter(url))
            } else {
                const shortUrl = `${base}/${urlId}`

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date()
                })

                await url.save()
                res.json(resFilter(url))
            }
        } catch(err){
            console.log(err)
            res.status(500).json('Server error')
        }
    } else{
        res.status(400).json('Invalid Original Url')
    }
})

module.exports = router