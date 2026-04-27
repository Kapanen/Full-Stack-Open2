const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')
require('dotenv').config({debug: false})
const Person = require('./models/person')

//MONGODB_URI=mongodb://@ac-n7ltqua-shard-00-00.613dem3.mongodb.net:27017,ac-n7ltqua-shard-00-01.613dem3.mongodb.net:27017,ac-n7ltqua-shard-00-02.613dem3.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-iskjsg-shard-0&authSource=admin&appName=Cluster0



if (process.argv.length === 2) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    process.exit(0)
  })
}

if (process.argv.length === 4) {
  const name = process.argv[2]
  const number = process.argv[3]

  const person = new Person({
    name,
    number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    process.exit(0)
  })
}