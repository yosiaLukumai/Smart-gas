const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;


const connectDb = async () => {
    console.log("trying connecting to the database...");
    mongoose.set('strictQuery', false);
    var connected = await mongoose.connect(process.env.DB_CONNECTION)
    if (connected) {
        console.log("sucessfully connected to db")
    } else {
        console.log("Failed to connect to database")
    }
}



const reconnect = async () => {
    try {
        let connected = await mongoose.connect("");
        console.log(connected);
        return connected;
    } catch (error) {
        console.log("Error in reconnecting");
        return error
    }

}


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // make the process fail
        process.exit(1);
    }
}

const Aggregator = (owner) => {
    return [
        {
            '$match': {
                'owner': new ObjectId(owner)
            }
        }, {
            '$lookup': {
                'from': 'logs',
                'localField': 'serialNumber',
                'foreignField': 'serialNumber',
                'as': 'logs'
            }
        }, {
            '$unwind': {
                'path': '$logs'
            }
        }, {
            '$sort': {
                'logs.createdAt': 1
            }
        }, {
            '$group': {
                '_id': '$_id',
                'device': {
                    '$first': '$$ROOT'
                },
                'lastLog': {
                    '$first': '$logs'
                }
            }
        }, {
            '$project': {
                'name': '$device.name',
                'serialNumber': '$device.serialNumber',
                'levelPercentage': '$lastLog.levelPercentage',
                 "lastseen": "$lastLog.createdAt"
            }
        }
    ]
}

module.exports = {
    connectDb,
    reconnect,
    connectDB,
    Aggregator
}
