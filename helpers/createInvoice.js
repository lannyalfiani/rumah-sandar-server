const { Invoice, Donation } = require(`../models`)

async function createInvoice(payload) {
  try {
    // console.log(payload) //? isian payload
    // {
    //   id: '6364b356ae529b6f0e6a4787',
    //   amount: 10000,
    //   status: 'PAID',
    //   created: '2022-11-04T06:38:15.444Z',
    //   is_high: false,
    //   paid_at: '2022-11-04T06:38:20.292Z',
    //   updated: '2022-11-04T06:38:20.476Z',
    //   user_id: '63637944f1a1a1a981eade75',
    //   currency: 'IDR',
    //   bank_code: 'MANDIRI',
    //   description: 'Donasi Alat Sekolah Adik',
    //   external_id: 'd-00001-1667543894107',
    //   paid_amount: 10000,
    //   payer_email: 'lannyalfiani13@gmail.com',
    //   merchant_name: 'Rumah Sandar',
    //   initial_amount: 10000,
    //   on_demand_link: 'donation-00001',
    //   payment_method: 'BANK_TRANSFER',
    //   payment_channel: 'MANDIRI',
    //   on_demand_payload: {
    //     email: 'lannyalfiani13@gmail.com',
    //     last_name: 'Anonymous',
    //     first_name: 'Anonymous'
    //   },
    //   payment_destination: '8860881924761'
    // }

    //? Column di DB untuk Invoice: 
    //? DonationId, amount, transactionStatus,email,name,external_id,paid_at,paymeent_method

    //! Data balikan dari xendit, bikin format buat masuk ke DB kita
    let { amount, status, paid_at, external_id, payment_method, on_demand_payload, on_demand_link } = payload
    let { email, first_name } = on_demand_payload

    //! FIND DULU donation id keberapa
    let theDonation = await Donation.findOne({
      where: {
        on_demand_link
      }
    })

    // console.log(theDonation);
    //? baru masukin ke tabel invoice
    await Invoice.create({
      DonationId: theDonation.id,
      amount,
      transactionStatus: status,
      // VolunteerId: 1 //! Nyusul kalo sempet pake authen
      email,
      name: first_name,
      external_id,
      paid_at,
      payment_method
    })

    await Donation.update({
      totalAmount: theDonation.totalAmount + amount
    }, {
      where: {
        id: theDonation.id
      }
    })
  } catch (err) {
    console.log(err)
    // next(err) //! next ga kebaca krn ga require errorhandler
  }


}


module.exports = {
  createInvoice
}