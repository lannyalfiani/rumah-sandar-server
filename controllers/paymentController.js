const { createInvoice } = require("../helpers/createInvoicejs");


class paymentController {

  static async acceptCallback(req, res, next) {
    try {
      //TODO validasi kalo callback verif token harus 41ko7EXrtTiqrud6eV9QuXMped6a8CXuqfH1C5gQkWjqW2AJ - blm bisa aksesnya
      // console.log(req.headers);
      // {
      //   host: '94d4-202-165-46-22.ap.ngrok.io',
      //   'user-agent': 'axios/0.27.2',
      //   'content-length': '568',
      //   accept: 'application/json, text/plain, */*',
      //   'content-type': 'application/json',
      //   'webhook-id': 'fcc6fd11-7fe0-4e47-959b-19e60e01ceb3',
      //   'x-callback-token': '41ko7EXrtTiqrud6eV9QuXMped6a8CXuqfH1C5gQkWjqW2AJ',
      //   'x-datadog-origin': 'rum',
      //   'x-datadog-parent-id': '5847930503962509039',
      //   'x-datadog-sampling-priority': '1',
      //   'x-datadog-trace-id': '4742242560551927687',
      //   'x-forwarded-for': '18.142.84.176',
      //   'x-forwarded-proto': 'https',
      //   'accept-encoding': 'gzip'
      // }



      //! respon dulu ke Xendit kalo kita udh terima callbacknya
      res.status(200).json({ message: `terima callback` })

      //! validasi statusnya harus paid buat create invoice ke DB
      let callback = req.body
      let invoiceStatus = callback.status

      if (invoiceStatus === `PAID`) {
        console.log(`masuk paid`);
        createInvoice(req.body)
      } else {
        throw { name: `INVOICE_NOT_PAID` }
      }


    } catch (err) {
      next(err)
    }
  }

}

module.exports = paymentController;