var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_MEcUA/WCGSlcVfJ5M4z1wJeCYBM=",
  privateKey: "private_mgkTxgvEGTcXriI1vDaZIC7iOcY=",
  urlEndpoint: "https://ik.imagekit.io/rumahsandar"
});

// var imageURL = imageKit.url({
//   src: "https://ik.imagekit.io/rumahsandar/default-image.jpg",
//   transformation: [{
//     "height": "300",
//     "width": "400"
//   }]
// });

module.exports = imagekit;