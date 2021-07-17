const express = require('express'); // 1.

const app = express(); //2. initialise express

app.get('/', (req, res) => res.send('Hello world')) // 5. add endpoint/route(s)

// 5.2 define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000; // 3.

app.listen(PORT, () => console.log(`Server started on ${PORT}`)) // 4.