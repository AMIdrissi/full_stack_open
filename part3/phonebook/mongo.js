import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.error('password should be added as an argument')
  console.log('node mongo.js [password] {name} {phone-number}')
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'

const url = `mongodb+srv://amidrissi2002_db_user:${password}@cluster0.5wcs7cf.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 3) {
  Entry.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const phonebookEntry = new Entry({ name: name, number: number })

  phonebookEntry.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.error('Invalid args')
  console.log('node mongo.js [password] {name} {phone-number}')
  process.exit(1)
}
