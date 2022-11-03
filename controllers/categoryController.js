const {ClassCategory} = require('../models')


class categoryController {

    static async getCategories(req, res, next){
        try {
            let categories = await ClassCategory.findAll()
            if(!categories) throw { name : "Not Found"}
            res.staus(200).json(categories)
            
            
        } catch (error) {
            next(error)
            
        }
    }



}


module.exports = categoryController