const { Invoice } = require(`../models`)

async function createInvoice(payload) {
  try {
    console.log(`masuk helper`);
    console.log(payload)
    // {
    //   id: '636412beae529bf6136a373d',
    //   amount: 10000,
    //   status: 'PAID',
    //   created: '2022-11-03T19:13:03.531Z',
    //   is_high: false,
    //   paid_at: '2022-11-03T19:13:10.603Z',
    //   updated: '2022-11-03T19:13:10.846Z',
    //   user_id: '63637944f1a1a1a981eade75',
    //   currency: 'IDR',
    //   bank_code: 'MANDIRI',
    //   description: 'Donasi untuk Kebutuhan Sekolah Adik',
    //   external_id: 'rumah-sandar-donasi-001-1667502782340',
    //   paid_amount: 10000,
    //   payer_email: 'ya@gmail.com',
    //   merchant_name: 'Rumah Sandar',
    //   initial_amount: 10000,
    //   on_demand_link: 'donasi-001-adik',
    //   payment_method: 'BANK_TRANSFER',
    //   payment_channel: 'MANDIRI',
    //   on_demand_payload: {
    //     email: 'ya@gmail.com',
    //     last_name: 'Anonymous',
    //     first_name: 'Anonymous'
    //   },
    //   payment_destination: '8860810751976'
    // }

    let { amount, status, paid_at, external_id, payment_method, on_demand_payload } = payload
    let { email, first_name } = on_demand_payload

    let data = await Invoice.create({
      DonationId: 1, //! masih di hardcode, cari tau biar bisa dinamis gmn
      amount,
      transactionStatus: status,
      VolunteerId: 1, //! masih di hardcode, nanti pake authentication req.user.id
      email,
      name: first_name,
      external_id,
      paid_at,
      payment_method
    })
  } catch (err) {
    next(err)
  }


}


module.exports = {
  createInvoice
}