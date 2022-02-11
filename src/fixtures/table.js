const fs = require("fs")
const obj = {
    data: Array.from({length: 50000}).map((_, i) => {
        return {
            id: i + 1,
            text: `Some big text for string  ${i + 1}`
        }
    })
}


fs.writeFile("big.json", JSON.stringify(obj), () => {
    console.log('KEK')
})
