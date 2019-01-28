import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/users.router';
//import { pokemonRouter } from './routers/pokemon.router';
import session from 'express-session';
import { authRouter } from './routers/auth.router';

const app = express();

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());

// create logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`);
  next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
  secret: 'potato',
  cookie: { secure: false },
  resave: false,
  saveUnitialized: false
};
// prior to this req.sesssion is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pokemon', pokemonRouter);

// app.get('/users', (req, res) => {
//   res.send('here are your users');
// })

// app.post('/users', (req, res) => {
//   const user = req.body;
//   console.log(user)
//   res.sendStatus(201);
// })

// app.get('/pokemon', (req, res) => {
//   res.send('here are your pokemon');
// })

app.get('/pokemon-moves', (req, res) => {
  res.send('here are all the available pokemon moves');
});

app.listen(3000);
console.log('application started on port: 3000');