import multer from 'multer';

var storage = multer.diskStorage({
     //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
       }, 
     //给上传文件重命名，获取添加后缀名
      filename: function (req, file, cb) {
          var fileFormat = (file.originalname).split(".");

          cb(null, file.fieldname + '-'+new Date().getTime()+'-'+fileFormat[0]+"." + fileFormat[fileFormat.length - 1]);
      }
 });  
     //添加配置文件到muler对象。
     var upload = multer({
          storage: storage
    });

 export default upload; 