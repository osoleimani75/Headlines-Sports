const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  shortSammary: {
    type: String,
    required: true
  },
  Athour: {
    type: String,
    required: true
  },
  linkImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

// join to other collection 
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

