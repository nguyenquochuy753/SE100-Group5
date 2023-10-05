const tableModel = require("../models/table.model")

const tableController = {
    addTable : async(req,res) => {
        const newTable = new tableModel(req.body)
        try {
            await newTable.save();
            res.status(200).json(newTable);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllTables : async(req,res)=>{
        try {
            const allTables = await tableModel.find({});
            res.status(200).json(allTables);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteTable : async(req,res)=>{
        const id = req.params.id;
        try {
            await tableModel.findByIdAndDelete(id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateTable: async (req, res) => {
        const id = req.params.id;
        try {
            await tableModel.findByIdAndUpdate(id , req.body);
            res.status(200).json("updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = tableController