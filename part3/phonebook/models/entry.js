import mongoose from 'mongoose'

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose
  .connect(url, { family: 4 })
  .then((res) => {
    console.log('Connected')
  })
  .catch((error) => {
    console.log('And error has occured:', error)
  })

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => {
        return /\d{2,3}-\d+/.test(value)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
})

entrySchema.set('toJSON', {
  transform: (document, requestedObject) => {
    requestedObject.id = requestedObject._id.toString()
    delete requestedObject._id
    delete requestedObject.__v
  },
})

const Entry = mongoose.model('Entry', entrySchema)

export default Entry
