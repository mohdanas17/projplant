import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://mohamedanasm21it:24062004@cluster0.qo9tjqu.mongodb.net/?retryWrites=true&w=majority');
        console.log(`Connected`);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;