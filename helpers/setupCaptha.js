const prompt = require('prompt-sync')()

module.exports = (setups, uuid) => {
  setups.forEach((setup) => {
    setup.url += uuid
    console.log(`[${setup.countryName}] Challenge the captha`)
    console.log(`=> ${setup.url}`)
    const newCaptha = prompt('Input captha: ')
    setup.captha = newCaptha
    console.log(`Captha saved.\n`)
  })
}
