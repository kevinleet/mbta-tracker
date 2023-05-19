// Retrieve API key
let apiKey = '';
(async function () {
    const response = await fetch('./api.key')
    const text = await response.text()
    apiKey = text
})()

setTimeout(() => {
console.log(apiKey)
}, 50)