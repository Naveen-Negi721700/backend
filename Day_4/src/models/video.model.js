import mongoose, { model, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({

    videoFiles: {
        type: Strig,        //cloudineary
        required: true,
    },
    thumbnail: {
        type: Strig,        //cloudineary
        required: true,
    },
    title: {
        type: Strig,
        required: true,
    },
    description: {
        type: Strig,
        required: true,
    },
    duration: {
        type: Number,    //cloudineary       
        required: true,
    },
    views: {
        type: Number,    //cloudineary       
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true });

videoSchema.Plugin(mongooseAggregatePaginate)


export const video = model.Schema("Video", videoSchema);