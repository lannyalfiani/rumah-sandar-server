"use strict";
const { Model } = require("sequelize");
const { createHashPassword } = require("../helpers/helpers");
module.exports = (sequelize, DataTypes) => {
  class Volunteer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Volunteer.hasOne(models.Match);
      // Volunteer.hasMany(models.Invoice)
    }
  }
  Volunteer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email required",
          },
          notEmpty: {
            msg: "Email required",
          },
          isEmail: {
            msg: "Wrong format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password required",
          },
          notEmpty: {
            msg: "Password required",
          },
          len: {
            args: [5, 20],
            msg: "Password must be at least 5 character",
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Full Name required",
          },
          notEmpty: {
            msg: "Full Name required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Url required",
          },
          notEmpty: {
            msg: "Image Url required",
          },
        },
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Linkedin Url required",
          },
          notEmpty: {
            msg: "Linkedin Url required",
          },
        },
      },
      curriculumVitae: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Curriculum Vitae required",
          },
          notEmpty: {
            msg: "Curriculum Vitae required",
          },
        },
      },
      lastEducation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last Education required",
          },
          notEmpty: {
            msg: "Last Education required",
          },
        },
      },
      role: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      matchStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Volunteer",
    }
  );

  Volunteer.beforeCreate((instance) => {
    instance.password = createHashPassword(instance.password);
    instance.verified = false;
  });

  return Volunteer;
};
