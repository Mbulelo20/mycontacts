const express = require('express'); // 1.
const connectDB = require('./config/db')
const path = require('path');
const app = express(); //2. initialise express


connectDB(); // connect to db

app.use(express.json({extended: false})) // receives and parses body data

app.get('/', (req, res) => res.send('Hello world')) // 5. add endpoint/route(s)

// 5.2 define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// serve static assets in production

if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
const PORT = process.env.PORT || 5000; // 3.

app.listen(PORT, () => console.log(`Server started on ${PORT}`)) // 4.