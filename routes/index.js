const express = require('express')
const router = express.Router()

router.get('/', async function (req, res) {
  try {
 // res.render('index.njk')
  const [weapon] = await pool.promise().query(`
  SELECT alvin_type.id, alvin_type.name  FROM alvin_type
  `)
  console.log(weapon)
  return res.render('index.njk', {
    title: 'Weapons',
    weapons: weapon
  })
} catch(error){
  console.log(error)
  res.sendStatus(500)
}

})


router.get('/test', function (req, res) {
  res.render('test.njk')
})

const pool = require('../db')

router.get('/dbtest/:id', async (req, res) =>{
  try {
    const id = req.params.id
    const [weapon] = await pool.promise().query(`   
      SELECT alvin_type.name, alvin_type.description, alvin_attacks.input, alvin_attacks.description AS attack_description, alvin_attacks.mv
      FROM alvin_weapon
      JOIN alvin_type ON alvin_weapon.type = alvin_type.id
      JOIN alvin_attacks on alvin_weapon.moveset = alvin_attacks.moveset
     WHERE alvin_weapon.id = ${id}
    `)
    // const [options] =  await pool.promise().query(`SELECT * FROM alvin_option WHERE part_id = ${id}`)
    const temp = weapon[0];
    console.log(weapon)
    res.render('weapon.njk', {
      title: temp.name,
      image_id: id,
      weapon,
      description: temp.description
    })  
    //console.log(parts)
  } catch(error){
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/new_attack', async function (req, res) {
  try {
    const [weapon] = await pool.promise().query(`
      SELECT alvin_type.name, alvin_weapon.moveset
      FROM alvin_weapon
      JOIN alvin_type ON alvin_weapon.type = alvin_type.id
    `)
    console.log(weapon)
    return res.render('new_attack.njk', {
      title: 'new attack',
      weapons: weapon
    })
    
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/new_weapon', async function (req, res) {
  try {
    const [breed] = await pool.promise().query('SELECT * FROM jens_cat_breed')
    return res.render('new_weapon.njk', {
      title: 'Ny katt',
      breeds: breed
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/new_attack', async function (req, res) {
 // res.json(req.body) //för att kolla och kika den data vi får från front-end
  try {
    const [result] = await pool.promise().query(
      `INSERT INTO alvin_attacks (input, mv, description, moveset)
      VALUES (?, ?, ?, ?)`,
      [req.body.input, req.body.mv, req.body.description, req.body.weapon]
    )
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }


})

router.get('/remove_attack', async function (req, res) {
  try {
 // res.render('index.njk')
  const [attack] = await pool.promise().query(`
  SELECT alvin_attacks.id, alvin_attacks.description FROM alvin_attacks
  `)
  console.log(attack)
  return res.render('remove.njk', {
    title: 'Remove attack',
    attacks: attack
  })
} catch(error){
  console.log(error)
  res.sendStatus(500)
}

// DELETE FROM alvin_attacks WHERE id = ?

})

router.post('/remove_attack', async function (req, res) {
  // res.json(req.body) //för att kolla och kika den data vi får från front-end
   try {
     const [result] = await pool.promise().query(
       `DELETE FROM alvin_attacks WHERE id = ?`,
       [req.body.id]
     )
     res.redirect('/')
   } catch (error) {
     console.log(error)
     res.sendStatus(500)
   }
 
 
 })

router.post('/cats', async function (req, res) {
  res.json(req.body) //för att kolla och kika den data vi får från front-end


})


module.exports = router
