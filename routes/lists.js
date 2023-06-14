const express = require('express');
const router = express.Router();
const {
   getAllLists,
   createList,
   getSingleList,
   updateList,
   deleteList,
} = require('../controllers/lists');

router.get('/', getAllLists);
router.post('/', createList);
router.get('/:id', getSingleList);
router.patch('/:id', updateList);
router.delete('/:id', deleteList);

module.exports = router;