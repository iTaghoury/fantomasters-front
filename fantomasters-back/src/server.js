import path from "path";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import {db, connectToDb} from "./db.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/fantomasters-front/')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/fantomasters-front/index.html'))
})

// Renvoie l'utilisateur avec l'id "id" s'il est trouvé dans la base de données

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  const user = await db.collection('users').findOne({ id });
  if(user) {
    res.status(200).json(user);
  } else {
    res.status(404).send(`L'utilisateur ${id} n'existe pas`)
  }
})

// Crée un nouvel utilisateur et l'ajoute à la base de données s'il n'y figure pas déjà

app.post('/api/signup/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await db.collection('users').findOne({ id });
  if(user) {
    res.status(403).send("Ce nom d'utilisateur est déjà pris !")
  } else {
    await db.collection('users').insertOne({
      id,
      isConnected: true,
      role: 'Chômeur',
      friends: [],
    });
    await db.collection('credentials').insertOne({
      id,
      password,
    })
    res.status(201).json({id, isConnected: true, role: 'Chômeur', friends: []})
  }
})

// Modifie le rôle d'un utilisateur s'il figure dans la base de données

app.put('/api/users/:id/modify-role/:role', async (req, res) => {
  const { id, role } = req.params;
  const user = await db.collection('users').findOne({ id });
  if(user && user.isConnected) {
    await db.collection('users').updateOne({ id }, {
      $set: {
        role,
      },
    });
    res.status(200).json(user);
  } else {
    res.status(404).send(`L'utilisateur ${id} n'existe pas ou n'est pas connecté`);
  }
})

// Ajoute l'id de l'utilisateur "friendId" au tableau d'amis de l'utilisateur "id" et vice-versa

app.put('/api/users/:id/addFriend/:friendId', async (req, res) => {
  const { id, friendId } = req.params;

  const user = await db.collection('users').findOne({ id });
  const friend = await db.collection('users').findOne({id: friendId});
  
  if(user && friend) {
    const alreadyFriend = await db.collection('users').findOne({ id, friends: friendId});
    if(alreadyFriend) {
      res.status(403).send(`Le fantôme ${friendId} est déjà ton PhantoMate !`);
    } else {
      await db.collection('users').updateOne({ id }, {
        $push: {
          friends: friendId,
        }
      })
      await db.collection('users').updateOne({ id: friendId }, {
        $push: {
          friends: user.id,
        },
      })
      const updatedUser = await db.collection('users').findOne({ id });
      res.status(200).json(updatedUser);
    }
  } else {
    res.status(404).send(`Le fantôme ${friendId} n'existe pas.`)
  }
})

// Retire l'id de l'utilisateur "friendId" au tableau d'amis de l'utilisateur "id" et vice-versa

app.delete('/api/users/:id/deleteFriend/:friendId', async (req, res) => {
  const { id, friendId} = req.params;

  const user = await db.collection('users').findOne({ id });
  const friend = await db.collection('users').findOne({id: friendId});

  if(user && friend) {
    
    await db.collection('users').updateOne({ id }, {
      $pull: {
        friends: {
          $in: [friendId]
        }
      },
    });
    await db.collection('users').updateOne({ id: friendId }, {
      $pull: {
        friends: {
          $in: [user.id]
        }
      },
    });
    const updatedUser = await db.collection('users').findOne({ id });
    res.status(200).json(updatedUser);
  } else {
    res.status(404).send("User(s) Not Found");
  }
})

// Modifie l'état de connexion de l'utilisateur "id"

app.put('/api/users/:id/login', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await db.collection('users').findOne({ id });
  const auth = await db.collection('credentials').findOne({ id, password })
  if(user && auth) {
    await db.collection('users').updateOne({ id }, {
      $set: {isConnected: true}
    })
    
    const updatedUser = await db.collection('users').findOne({ id });
    res.status(200).json(updatedUser);
  } else {
    res.status(401).send(`Nom d'utilisateur ou mot de passe incorrect(s)`)
  }
})

app.put('/api/users/:id/logout', async (req, res) => {
  const { id } = req.params;
  const user = await db.collection('users').findOne({ id });
  if(user) {
    await db.collection('users').updateOne({ id }, {
      $set: {isConnected: false}
    })
    const updatedUser = await db.collection('users').findOne({ id });
    res.status(200).json(updatedUser);
  } else {
    res.status(404).send(`L'utilisateur ${id} n'existe pas`)
  }
})

/* ==================== */

const PORT = process.env.PORT || 8000;
connectToDb(() => {
  console.log('Successfully connected to database')
  app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
  });
})