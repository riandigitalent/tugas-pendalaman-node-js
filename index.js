import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyPraser from 'body-parser' // inport bodyparser biar bisa post

// impor database ke index
import { InitDatabase, initTable, insertmember } from './database.js'

const __dirname = path.resolve()

const app = express()
const dbmember = InitDatabase()
initTable(dbmember)

app.set('views', __dirname + '/pages/')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// buat baca log incoming request
app.use(morgan('combined'))

// method parse buat post 
app.use(bodyPraser.urlencoded())

// ambil file dengan path static
app.use('/assets', express.static(__dirname + '/assets/'))

app.get('/', (req, res, next) => {
    res.send({ success: true })
})

// ambil halaman anggota
app.get('/member', (req, res, next) => {
    res.render('member')
})

//code buat handle  Get Method
app.get('/add-member', (req, res, next) => {
    res.send({ success: true })
})

//code buat handle  post Method
app.post('/add-member', (req, res, next) => {
    console.log('Request', req.body)
        //res.send(req.body)

    //pangil function add member
    insertmember(dbmember, req.body.name, parseInt(req.body.age), '-')

    // redirect atau refressh halaman abis di tambahin
    res.redirect('/member')


})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(9999, () => {
    console.log('app jalan di port 9999')
})