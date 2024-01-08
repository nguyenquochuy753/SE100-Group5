// const { log } = require("console");
// const fs = require("fs");
// const path = require("path");

// const mealDataPath = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "meals.json"
// ); // path.dirname(require.main.filename) is root directory

// const getMealsFromFile = (callback) => {
//   fs.readFile(mealDataPath, (err, fileContent) => {
//     if (err) {
//       return callback([]);
//     }
//     callback(JSON.parse(fileContent));
//   });
// };

// module.exports = class Meal {
//   constructor(id, name, imageURL, price) {
//     this.id = id;
//     this.name = name;
//     this.imageURL = imageURL;
//     this.price = price;
//   }

//   save() {
//     getMealsFromFile((meals) => {
//       meals.push(this);
//       fs.writeFile(mealDataPath, JSON.stringify(meals), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(callback) {
//     getMealsFromFile(callback);
//   }

//   static deleteById(id) {
//     getMealsFromFile((meals) => {
//       const updatedMeals = meals.filter((meal) => meal.id !== id);
//       fs.writeFile(mealDataPath, JSON.stringify(updatedMeals), (err) => {
//         if (!err) {
//         }
//       });
//     });
//   }
// };

const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    ten_mon_an: {
      type: String,
      required: true,
    },
    gia: {
      type: Number,
      required: true,
    },
    trang_thai: {
      type: String,
      default: "Còn",
    },
    hinh_anh_mon_an: {
      type: String,
      required: true,
    },
    ma_danh_muc: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    so_lan_dat_mon: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const meal = mongoose.model("Meal", mealSchema);
module.exports = meal;
