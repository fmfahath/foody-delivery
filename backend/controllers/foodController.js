import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add new food-----------------------------------------------------------
export const addFood = async (req, res) => {
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename
    })

    try {
        await food.save()
        res.json({ success: true, message: 'Food added successfully' })
    } catch (error) {
        console.log('Error adding food: ', error);
        res.json({ success: false, message: error.message })

    }
}


//get all foods-----------------------------------------------------------
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//remove food item-----------------------------------------------------------
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(food._id)

        res.json({ success: true, message: "food item deleted success" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//---------------------------------------------------------------------------
