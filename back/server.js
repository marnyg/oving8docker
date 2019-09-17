import express from 'express';
import reload from 'reload';
import fs from 'fs';
import path from 'path';
import * as CryptoJS from 'crypto-js';

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/share');

let app = express();
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json


if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

var users={
	"ola" : { salt:"123123123123123123123123123", hash: '2b48d9685ee7e1486792ac603b70f8b91da12fb8b68cad61252c336c4888e792489322721104ca264b96c4c0c430d51253da5427675a07f97e56e94c71986821'}//password: aaa	
}

function myEncrypt(text){
	var salt = CryptoJS.lib.WordArray.random(128/8);
	var key512Bits1000Iterations = CryptoJS.PBKDF2(text, users["ola"].salt, { keySize: 512/32, iterations: 1000 });	
	console.log("encrypted to ",String(key512Bits1000Iterations ));
	console.log(users);
	return users["ola"].hash===String(key512Bits1000Iterations)
}

app.put('/pass', (req: Request, res: Response) => {
	let message=req.body.enc
	console.log("got message ",message);
	if(myEncrypt(message)){
		return res.send({token:12312312313});
	}else{
		return res.send({status:"no, u suc"});
	}
});
