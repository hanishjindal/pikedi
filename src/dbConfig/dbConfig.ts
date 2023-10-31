import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const conection = mongoose.connection;

        conection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        conection.on('error', (err) => {
            console.log('Connection error', err);
            process.exit()
        })
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}