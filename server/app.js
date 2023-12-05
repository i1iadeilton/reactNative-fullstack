const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();
const mongoose = require('mongoose');
require('./Employee');
const mongoose = require('mongoose');
require('./Visitante');
app.use(express.json({ limit: '10kb' }));

const Employee = mongoose.model('employee');
const Visitante = mongoose.model('visitante');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeahhh');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  Employee.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});



router.delete('/:id', async (req, res) =>{

    const id = req.params.id;

    const employee = await Employee.findOne({id: id});

    if(!employee){
        res.status(422).json({message: 'A employee não foi encontrada!'});
        return;
    };

    try {
        await Employee.deleteOne({id: id});
        
        res.status(200).json({message: 'Employee deletada com sucesso!'});
    } 
    catch (error) {
        res.status(500).json({error: error});
    }
}) 


//Update - atualização de dados(PUT , PATCH)
router.patch('/:id', async (req, res) =>{

    const id = req.params.id;

    const {name, username, email, phone, picture, salary, position } = req.body;

    const employee = {
              name,
          
        email,
        
        phone,
        
        picture,
        salary,

        position
    };

    try {
        
        const updateUser = await Employee.updateOne({id: id}, employee);

        //verificar se o usuário existe
        if(updateUser.matchedCount === 0){
            res.status(422).json({ message: 'Employee não encontrada'});
            return;
        };

        res.status(200).json(employee);
    } 
    catch (error) {
        res.status(500).json({error: error});        
    }
}) 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server running');
});


//Create - criação dos dados
router.post('/', async (req, res) => {

  //req.body
  const {id, Name, Username, Email,  Role} = req.body;

  if(!Name){
      res.status(422).json({error: 'O nome é obrigatório'});
      return;
  }

  const visitante = {
      id,
      Name, 
      Username, 
      Email, 
       
      Role
  };

  try{
      // checando pra ver se a visitante já existe no banco de dados
      const userExiste = await Visitante.findOne({id: id});
      // se a visitante não existir, insere os dados no banco de dados
      if(!userExiste) {
          //criando dados(passando o objeto)
          await Visitante.create(visitante);
          //dado criado com sucesso
          res.status(201).json({message: 'Visitante inserida no sistema com sucesso!'});
      }
  }
  catch(error){
      res.status(500).json({error: error});
  }

})

//Read - leitura de dados
router.get('/', async (req, res) => {

  try {
      
      const visitante = await Visitante.find();

      res.status(200).json(visitante);
  } 
  catch (error) {
      res.status(5000).json({error: error});
  }
})

// GET by ID
router.get('/:id', async (req, res) => {
  
  //extrair o dado da requisição, pelo req.params
  const id = req.params.id;

  try {
      
      const visitante = await Visitante.findOne({id: id});

      if(!visitante){
          res.status(422).json({message: 'A visitante não foi encontrada!'});
          return;
      };

      res.status(200).json(visitante);

  } catch (error) {
      res.status(500).json({error: error});
  }
})

//Update - atualização de dados(PUT , PATCH)
router.patch('/:id', async (req, res) =>{

  const id = req.params.id;

  const {Name, Username, Email,  Role } = req.body;

  const visitante = {
      id,
      Name, 
      Username, 
      Email, 
       
      Role
  };

  try {
      
      const updateUser = await Visitante.updateOne({id: id}, visitante);

      //verificar se o usuário existe
      if(updateUser.matchedCount === 0){
          res.status(422).json({ message: 'Visitante não encontrada'});
          return;
      };

      res.status(200).json(visitante);
  } 
  catch (error) {
      res.status(500).json({error: error});        
  }
})

router.delete('/:id', async (req, res) =>{

  const id = req.params.id;

  const visitante = await Visitante.findOne({id: id});

  if(!visitante){
      res.status(422).json({message: 'A visitante não foi encontrada!'});
      return;
  };

  try {
      await Visitante.deleteOne({id: id});
      
      res.status(200).json({message: 'Visitante deletada com sucesso!'});
  } 
  catch (error) {
      res.status(500).json({error: error});
  }
})