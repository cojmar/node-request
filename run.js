const fs = require('fs');
const path = require("path");
let data = {
    "aa": 'b'
}
let file = "pula.json"
fs.writeFileSync(file, JSON.stringify(data, null, 2))