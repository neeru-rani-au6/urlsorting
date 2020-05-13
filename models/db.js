var mongoose = require("mongoose")
 async function init(){
    try {
        await mongoose.connect('mongodb+srv://neeru:neeru@cluster0-6qdoa.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true });
        console.log("connected mongodb")
      } catch (error) {
        console.log(error);
      }
}
init()