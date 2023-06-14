const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'リスト名を入力してください'],
      trim: true,
      maxlength: [20, 'リスト名は20文字以内で入力してください'],
   },
   completed: {
      type: Boolean,
      default: false,
   }
});

module.exports = mongoose.model('List', ListSchema);