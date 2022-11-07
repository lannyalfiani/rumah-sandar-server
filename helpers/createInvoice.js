const { Invoice, Donation } = require(`../models`)

async function createInvoice(payload) {
  try {
    //! Data balikan dari xendit, bikin format buat masuk ke DB kita
    let { amount, status, paid_at, external_id, payment_method, on_demand_payload, on_demand_link } = payload
    let { email, first_name } = on_demand_payload

    //! FIND DULU donation id keberapa
    let theDonation = await Donation.findOne({
      where: {
        on_demand_link
      }
    })

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