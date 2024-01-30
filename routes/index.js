const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk')
})

const pool = require('../db')

router.get('/dbtest/:id', async (req, res) =>{
  try {
    const id = req.params.id
    const [parts] = await pool.promise().query(`SELECT * FROM alvin_part WHERE id = ${id}`)
    const [options] =  await pool.promise().query(`SELECT * FROM alvin_option WHERE part_id = ${id}`)
    //res.json({parts, options})
    const part = {... parts[0], options}
    res.render('part_db.njk', {
      title: part.name,
      part
    })

  } catch(error){
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
