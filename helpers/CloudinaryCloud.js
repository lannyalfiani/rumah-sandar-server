const cloudinary = require("cloudinary")

class CloudinaryCloud {

  static async uploadImageVolunteer(imageUrl) {
    console.log(`masuk`);
    try {
      const { url } = await cloudinary.v2.uploader.upload(imageUrl.path, { folder: "RumahSandar/Volunteer/Images" })
      return url

    } catch (err) {
      throw { name: `Upload file failed` }
    }

  }

  static async uploadCV(curriculumVitae) {
    try {
      const { url } = await cloudinary.v2.uploader.upload(curriculumVitae.path, { folder: "RumahSandar/Volunteer/CVs" })
      return url

    } catch (err) {
      throw { name: `Upload file failed` }
    }
  }

  static async uploadImageOrphan(imageUrl) {
    try {
      const { url } = await cloudinary.v2.uploader.upload(imageUrl.path, { folder: "RumahSandar/Orphans" })
      return url
    } catch (error) {
      throw { name: `Upload file failed` }
    }
  }
}

module.exports = CloudinaryCloud;