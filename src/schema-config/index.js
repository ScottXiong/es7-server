import mongoose from 'mongoose'
let schema1 = new mongoose.Schema({ 
	name: 'string',
	age:'number',
	motto:'string',
	createTime:'date'
});
export {schema1}