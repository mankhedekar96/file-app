import mongoose from 'mongoose';
export const ImageSchema = mongoose.Schema({ 
    name: String, 
    img:{
        data: Buffer,
        contentType: String
    }
});