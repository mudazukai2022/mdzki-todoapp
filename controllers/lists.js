const List = require('../models/List');

const getAllLists = async (req, res) => {
   try {
      const allList = await List.find({});
      res.status(200).json(allList);
   } catch(err) {
      res.status(500).json(err);
   }
};
const createList = async (req, res) => {
   try {
      const createList = await List.create(req.body);
      res.status(200).json(createList);
   } catch(err) {
      res.status(500).json(err);
   }
};
const getSingleList = async (req, res) => {
   try {
      const getSingleList = await List.findOne({ _id: req.params.id });
      if(!getSingleList) {
         return res.status(404).json(`_id:${req.params.id}は存在しません`);
      }
      res.status(200).json(getSingleList);
   } catch(err) {
      res.status(500).json(err);
   }
};
const updateList = async (req, res) => {
   try {
      const updateList = await List.findOneAndUpdate(
         { _id: req.params.id },
         req.body,
         {
            new: true,
         }
         );
      if(!updateList) {
         return res.status(404).json(`_id:${req.params.id}は存在しません`);
      }
      res.status(200).json(updateList);
   } catch(err) {
      res.status(500).json(err);
   }
};
const deleteList = async (req, res) => {
   try {
      const deleteList = await List.findOneAndDelete({ _id: req.params.id });
      if(!deleteList) {
         return res.status(404).json(`_id:${req.params.id}は存在しません`);
      }
      res.status(200).json(deleteList);
   } catch(err) {
      res.status(500).json(err);
   }
};

module.exports = {
   getAllLists,
   createList,
   getSingleList,
   updateList,
   deleteList,
};