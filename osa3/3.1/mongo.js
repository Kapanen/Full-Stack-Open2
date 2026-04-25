const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')
const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]


const url = `mongodb://fullstack:${password}@ac-n7ltqua-shard-00-00.613dem3.mongodb.net:27017,ac-n7ltqua-shard-00-01.613dem3.mongodb.net:27017,ac-n7ltqua-shard-00-02.613dem3.mongodb.net:27017/?ssl=true&replicaSet=atlas-iskjsg-shard-0&authSource=admin&appName=Cluster0`
console.log('connecting to', url)



mongoose.set('strictQuery', false)
mongoose.connect(url, {
  retryWrites: true,
  w: 'majority'
})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
  Phonebook.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Phonebook({
    name,
    number,
  })



  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}