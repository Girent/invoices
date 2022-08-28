const User = require('../models/User')
const axios = require('axios')
const errorHandler = require('../utils/errorHandler')

const Currency = { EUR: 'EUR', CHF: 'CHF', GBP: 'GBP' }

module.exports.getById = async (req, res) => {
    try {
        const {currency} = req.query
        
        const user = await User.findById(req.body.id)

        if(user){
            currency?
            currencyConvert(currency, user.wallet).then(data => {
                user.wallet = data
                res.status(200).json(user)
            })
            :
            res.status(200).json(user)
        } else {
            res.status(404).json('user with this id does not exist')
        }
    } catch (error) {
       errorHandler(res, error)
    }
}

async function currencyConvert (currency, wallet) {
    const { data } = await axios.get(`https://api.fastforex.io/fetch-one?from=USD&to=${currency}&api_key=b73d6887d3-6177831a3b-rhbmob`)

    switch(currency){
        case Currency.CHF:
            return wallet * data.result.CHF

        case Currency.EUR:
            return wallet * data.result.EUR

        case Currency.GBP:
            return wallet * data.result.GBP
    }
    
}