const mongoose=require('mongoose')
const Review=require('./reviews')
const User=require('./users')
const {Schema}=mongoose;

const campgroundSchema= new Schema({
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String,
    owner:{
        type:Schema.Types.ObjectId,
            ref:'User'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

campgroundSchema.post('findOneAndDelete',async (doc)=>{
    if(doc){
        await Review.deleteMany({_id:{$in: doc.reviews}})
    }
})

module.exports=mongoose.model('Campground',campgroundSchema)