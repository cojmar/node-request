const express = require('express')
const fs = require('fs')
const bodyParser = require("body-parser")
const path = require("path")

new class {
    constructor() {
        this.port = 3000
        this.data_file = path.resolve('./data.json')
        this.start_server()
    }
    start_server() {
        this.app = express()
        this.app.use(bodyParser.json());
        this.app.get('/', (req, res) => {
            let index = fs.readFileSync('index.html', { encoding: 'utf-8', flag: 'r' })
            res.send(index)
        })

        this.app.post('/', (req, res) => {
            let ret = {}
            if (!req.body.cmd) {
                res.send(JSON.stringify({ "error": "no cmd pls send cmd param" }))
                return
            }
            if (this[`cmd_${req.body.cmd}`]) ret = this[`cmd_${req.body.cmd}`](req.body.data)
            res.send(JSON.stringify(ret))
        })

        this.app.listen(this.port, () => {

            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
    log(data) {
        console.log(JSON.stringify(data, null, 2))
    }

    //==CMD
    cmd_get_data(data) {
        return fs.readFileSync(this.data_file, { encoding: 'ascii', flag: 'r' })

    }
    cmd_set_data(data) {
        fs.writeFileSync(this.data_file, JSON.stringify(data, null, 2))
        return true
    }


}