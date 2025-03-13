const express = require("express")
const app = express()

const port = 5000

app.use(express.json())

const users = [
    {id:1, name:'Bilal ibn Rabah', email:'bh@example.fr'},
    {id:2, name:'Hind bint Outba', email:'hb@example.fr'},
    {id:3, name:'Aly ibn abitaleb', email:'At@example.fr'}
]
//route pour afficher les donnes de users
app.get('/api/users',(req,res)=>{
    res.status(200).json(users)
})
app.get('/api/users/:id',(req,res)=> {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if(!user) return res.status(404).send('User not found')
        res.json(user)
})
//ajout d'un nouveau user
app.post('/api/users', (req,res)=> {
    const {name, email} = req.body
    const newUser = {
        id: users.length + 1,
        name,
        email
    }
    users.push(newUser)
    res.status(201).json(newUser)
})
// supprimer un user 
app.delete('/api/users/:id',(req,res)=> {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))
    if(!userIndex === -1) return res.status(404).send('User not found')
        users.splice(userIndex, 1)
        res.status(204).send()
})
// executer le serveur
app.listen(port,()=> {
    console.log("Serveur is running Youpi !");
    
})
