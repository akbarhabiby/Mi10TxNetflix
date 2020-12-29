const axios = require('axios').default

module.exports = (setup, uuid, imei) => {
  const { countryCode, captha } = setup
  return axios({
    method: 'GET',
    url: `https://hd.c.mi.com/${countryCode}/eventapi/api/netflix/gettoken?uid=${uuid}&vcode=${captha}&imei=${imei}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    }
  })
}
