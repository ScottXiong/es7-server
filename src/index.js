import Express from 'express';
import mongoose from 'mongoose'


import  {uri,options} from './db-config/index.js'
import  {schema1} from './schema-config/index.js'


mongoose.connect(uri, options);

const MyModel1= mongoose.model('Test', schema1);

let app = Express();

app.get('/', (req, res) => {
    res.send(`hello world!`);
});

app.get('/admin/user', (req, res) => {
	MyModel1.create({name:'scott',age:28,motto:"温故而知新",createTime:new Date()},(err,doc)=>{
		if (err) return  new Error('something is wrong');
		res.json({msg:"存储成功",data:doc})
	})
    
});

app.listen(4321, () => {
    console.log('server running http://localhost:4321');
});