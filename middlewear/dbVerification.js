import connectToDatabase from "./connectDb";

const verifyDbConnection = async (req, res) => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error: "Couldn't find DB!" })
    }
}

export default verifyDbConnection;