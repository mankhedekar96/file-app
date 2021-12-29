import mongoose from 'mongoose';

const propertySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [{ 
            name: String, 
            img:{
                data: Buffer,
                contentType: String
            }
        }],
    },
    carpetArea: {
        type: { area: String, units: String },
        required: true,
    },
    locality: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    created_on: {
        type: Date,
        default: new Date(),
    },
});

const Property = mongoose.model('Property', propertySchema);
export default Property;