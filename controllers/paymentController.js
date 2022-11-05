const { createInvoice } = require("../helpers/createInvoice.js");
const { Donation } = require("../models")
class paymentController {

  static async acceptCallback(req, res, next) {
    try {
      let ourCallbackToken = process.env.XENDITCALLBACKTOKEN
      if (ourCallbackToken === req.headers['x-callback-token']) {

        res.status(200).json({ message: `Callback received!` })

        let callback = req.body
        let invoiceStatus = callback.status

        if (invoiceStatus === `PAID`) {
          createInvoice(req.body)
        } else {
          throw { name: `INVOICE_NOT_PAID` }
        }
      } else {
        throw { name: `NOT_FROM_XENDIT` }
      }
    } catch (err) {
      next(err)
    }
  }

  static async getDonations(req, res, next) {
    try {
      let data = await Donation.findAll({
        attributes: {
          exclude: [`createdAt`, `updatedAt`]
        }
      })
      res.status(200).json(data)
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

}

module.exports = paymentController;