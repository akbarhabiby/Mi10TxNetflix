const prompt = require('prompt-sync')()
const uuid = require('uuid').v4()
const setups = require('./setups.json')
const fs = require('fs')
const {
  generateIMEI,
  fetchNetflixURL
} = require('./helpers')

console.log('======== Mi 10T x Netflix ========')
console.log('Supported Country: MY TH PH')
console.log('Github Repository => https://github.com/akbarhabiby/Mi10TxNetflix')
console.log('==================================')

setups.forEach(async (setup) => {
  setup.url += uuid
  console.log(`[${setup.countryName}] Challenge the captha`)
  console.log(`=> ${setup.url}`)
  const newCaptha = prompt('Input captha: ')
  setup.captha = newCaptha
  console.log(`Captha saved.`)
})

console.log('[READY]')

async function start() {
  while(true) {
    const imei = generateIMEI()
    for(const i in setups) {
      try {
        const setup = setups[i]
        const { data } = await fetchNetflixURL(setup, uuid, imei)
        if(data.msg && data.msg == 'Success') {
          const result = `${data.data.redirect_url}|${imei}|${setup.countryName}`
          fs.appendFileSync('result.txt', `${result}\n`)
          console.log(`VALID => ${result}`)
        } else if (data.code && data.code == 800706) {
          console.log(`[${setup.countryName}] Challenge the captha again`)
          console.log(`=> ${setup.url}`)
          const renewCaptha = prompt('Input new captha: ')
          setup.captha = renewCaptha
          console.log(`New captha saved.`)
        } else if(data.code && data.code == 800707) {
          console.log(`INVALID => ${imei}|${setup.countryName}`)
        } else {
          console.log(`ERROR => Please wait for the next try.`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

start()
