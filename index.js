import express from 'express'
import hbs from 'hbs'
import path from 'path'

const __dirname = path.resolve()

const app = express()

app.set('views', __dirname + '/pages')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

app.get('/', (req, res, next) => {
    res.send({ success: true })
})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(8181, () => {
    console.log('app jalan di port 8181')
})