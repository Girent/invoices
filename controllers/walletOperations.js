const User = require('../models/User')
const Transaction = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.accrueFunds = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        
        if(user !== null){
            let newTransaction = {
                transactionType: 'increase',
                amount: req.body.amount
            }

            user.transactions.push(newTransaction)

            const newAmount = {
                wallet: user.wallet + req.body.amount,
                transactions: user.transactions
            }
            const wallet = user.overwrite(newAmount)

            await wallet.save()

            res.status(200).json(wallet)
        } else {
            
            const user = new User({
                _id: req.body.id,
                wallet: req.body.amount,
                transactions: {
                    transactionType: 'increase',
                    amount: req.body.amount
                }
            })
            await user.save()

            res.status(200).json(user);
        }
    } catch (error) {
       errorHandler(res, error)
    }
}

module.exports.takeFunds = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)

        if(user){
            let newTransaction = {
                transactionType: 'decrease',
                amount: req.body.amount
            }

            user.transactions.push(newTransaction)

            const walletAmount = user.wallet - req.body.amount

            if(walletAmount > 0){
                const newAmount = {
                    wallet: walletAmount,
                    transactions: user.transactions
                }
                const wallet = user.overwrite(newAmount)

                await wallet.save()

                res.status(200).json(wallet)
            } else{
                res.status(403).json("no such amount")
            }
        } else {
            res.status(404).json('user with this id does not exist')
        }
    } catch (error) {
       errorHandler(res, error)
    }
}

module.exports.transferFunds = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)

        if(user){
            const recipient = await User.findById(req.body.recipientId)

            if(recipient && req.body.id !== req.body.recipientId){

                let newTransaction = {
                    transactionType: 'transfer decrease',
                    amount: req.body.amount
                }
                user.transactions.push(newTransaction)

                const walletAmount = user.wallet - req.body.amount

                if(walletAmount > 0){
                    let newTransaction = {
                        transactionType: 'transfer increase',
                        amount: req.body.amount
                    }
                    recipient.transactions.push(newTransaction)

                    const recipientAmount = recipient.wallet + req.body.amount
                   
                    const currentWallet = user.overwrite({
                        wallet: walletAmount,
                        transactions: user.transactions
                    })
                 
                    const recipientWallet = recipient.overwrite({
                        wallet: recipientAmount,
                        transactions: recipient.transactions
                    })

                    await currentWallet.save()
                    await recipientWallet.save()

                    res.status(200).json(currentWallet)
                } else{
                    res.status(403).json("no such amount")
                }
            }else{
                res.status(404).json('attempt to transfer money to yourself')
            }
        } else {
            res.status(404).json('user with this id does not exist')
        }
    } catch (error) {
       errorHandler(res, error)
    }
}