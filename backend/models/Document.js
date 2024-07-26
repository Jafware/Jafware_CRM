// backend/models/Document.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  case: {
    type: Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);
