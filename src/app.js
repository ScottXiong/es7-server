import express from 'express';
import ejs from 'ejs';
import upload from './upload'


const app=express();



//set view engine
app.set('view engine', 'ejs');
//receive incoming body
app.use(express.json());
//set public folder
app.use(express.static('./public'));


app.get('/',(req,res,next)=>{
	res.render('index')
})

app.post('/upload', upload.single('myFile'),(req,res,next)=>{
	res.send("upload done")

})
app.listen(4321, () => {
    console.log('server running http://localhost:4321');
});