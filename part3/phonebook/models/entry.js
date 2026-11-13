import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then((res) => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("And error has occured:", error);
  });

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

entrySchema.set("toJSON", {
  transform: (document, requestedObject) => {
    requestedObject.id = requestedObject._id.toString();
    delete requestedObject._id;
    delete requestedObject.__v;
  },
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
