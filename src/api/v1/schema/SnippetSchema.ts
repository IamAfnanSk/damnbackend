import mongoose from "mongoose";

const FilesAndFoldersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["file", "directory"] },
  content: { type: String, required: false },
  inside: { type: Array, required: false },
});

const SnippetSchema = new mongoose.Schema({
  filesAndFolders: { type: [FilesAndFoldersSchema], require: true },
});

const model = mongoose.model("SnippetSchema", SnippetSchema, "snippets");

export default model;
