import Express from 'express';
import mongoose from 'mongoose'


import  {uri,options} from './db-config/index.js'
import  {schema1} from './schema-config/index.js'
import moment from 'moment'

mongoose.connect(uri, options);

const MyModel1= mongoose.model('Test', schema1);

let app = Express();

app.get('/', (req, res,next) => {
	res.send(`hello world!`);
	next()
});

app.get('/admin/add/user', (req, res,next) => {
	let time=new Date().getTime()
	let _time=moment(time).format('YYYY-MM-DD HH:mm:ss')
	console.log(time,_time)
	MyModel1.create({name:'scott',age:28,motto:"温故而知新",createTime:time},(err,doc)=>{
		if (err) return  new Error('something is wrong');
		res.json({msg:"存储成功",data:doc})
		next()
	})
    
});

app.get('/admin/find', (req, res,next) => {
    MyModel1.find((error, result)=> { 
		console.log('正在查询数据库所有数据'+result)
		console.log('数据库所有查寻完毕！')
		res.json({code:200,data:result})
		next()
   });	
});

app.get('/admin/remove/:id', (req, res,next) => {
	let document={
		id:req.params.id
	 }
	 MyModel1.findByIdAndRemove(document.id,(err)=>{
	   if (err) {
		console.error('删除数据失败')
	   }
	   console.log('删除数据成功')
	   res.json({code:200,msg:"删除数据成功"})
		 next()
	 })
});

app.get('/admin/update/:id', (req, res,next) => {
    console.log('正在更新数据库..')
	console.log('更新的id为'+req.params.id)
	 var document={
		name:"judy",
		age:29,
		motto:'if i could love you',
		createTime:Date.now()
	 }
	 var id=req.params.id
	  MyModel1.findByIdAndUpdate(id,document,function(err,doc){
	  if (err) {
		console.error('error, it seems something  was wrong in data updating')
	  }
	  res.json({code:200,msg:"更新数据成功"})
	  next()
	 })
});

app.get('/admin/find/:id',(req,res,next)=>{
	let id=req.params.id
   MyModel1.findById(id,(err,doc)=>{
	if(err) console.error('查询失败')
	console.log('查询成功,查询的id为',doc)
	res.json({code:200,data:doc})
	next()
   })
})


app.listen(4321, () => {
    console.log('server running http://localhost:4321');
});