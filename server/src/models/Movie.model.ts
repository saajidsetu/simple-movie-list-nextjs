import { Document, model, Schema } from 'mongoose';

interface iMovieDocument extends Document {
    title: string;
    year: string;
    shortDescription: string;
    description: string;
    image: string;
    genre: string;
    rating?: number;
}

const MovieSchema = new Schema(
    {
        title: { type: String, required: true },
        year: { type: String, required: true },
        shortDescription: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        genre: { type: String, required: true },
        rating: { type: Number, default: 1 },
    },
    { timestamps: true }
);

const Movie = model<iMovieDocument>('movie', MovieSchema);
export default Movie;
