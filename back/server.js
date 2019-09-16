import express from 'express';
import reload from 'reload';
import fs from 'fs';
import path from 'path';

//type Request = express$Request;
//type Response = express$Response;

const public_path = path.join(__dirname, '/share');

let app = express();

app.use(express.static(public_path));

app.get('/', (req, res) => {
    return res.send('Hello worlaaaad');
});

if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
