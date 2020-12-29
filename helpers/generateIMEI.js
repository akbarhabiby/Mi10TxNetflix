module.exports = (imei = '86622805193') => {
  while(imei.length  < 15)
    imei += Math.floor(Math.random() * 9)
  return imei
}