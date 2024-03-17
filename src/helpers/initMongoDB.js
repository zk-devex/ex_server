import mongoose from 'mongoose'



const initMongoDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        // MongoDB connection options
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    })

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    })

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
    })

    process.on("SIGINT", async () => {
       await mongoose.connection.close(() => {
            console.log("MongoDB disconnected through app termination");
            process.exit(0);
        })
    })

};


export default initMongoDB;
