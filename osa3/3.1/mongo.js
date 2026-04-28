const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')
require('dotenv').config({debug: false})
const Person = require('./models/person')




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

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    process.exit(0)
  })
}