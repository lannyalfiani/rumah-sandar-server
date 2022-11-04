const { createInvoice } = require("../helpers/createInvoice.js");
const { Donation } = require("../models")
class paymentController {

  static async acceptCallback(req, res, next) {
    try {
      //! VALIDASI callbacknya beneran dari Xendit,  samain x-callback-token
      // TODO nanti masukin .env
      let ourCallbackToken = "41ko7EXrtTiqrud6eV9QuXMped6a8CXuqfH1C5gQkWjqW2AJ"
      if (ourCallbackToken === req.headers['x-callback-token']) {

        //! respon dulu ke Xendit kalo kita udh terima callbacknya
        res.status(200).json({ message: `Callback received!` })

        //! VALIDASI statusnya harus paid buat create invoice ke DB
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
      next(err)
    }
  }

}

module.exports = paymentController;