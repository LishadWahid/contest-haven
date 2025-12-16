const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(process.env.NODE_ENV === 'production'
    ? cors({
        origin: [
            "https://neon-starship-6daa08.netlify.app",
            "https://neon-starship-6daa08.netlify.app/"
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    })
    : cors() // Allow all in dev
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const uri = process.env.DB_URI;
let client;
let database;
let userCollection;
let contestCollection;
let paymentCollection;
let submissionCollection;

if (!uri) {
    console.error("CRITICAL ERROR: DB_URI is missing!");
} else {
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
}

async function connectDB() {
    if (database) return;
    try {
        if (!client) throw new Error("Client not initialized");
        await client.connect();
        database = client.db("contesthub");
        userCollection = database.collection("users");
        contestCollection = database.collection("contests");
        paymentCollection = database.collection("payments");
        submissionCollection = database.collection("submissions");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error; // Propagate error so request fails gracefully
    }
}

// Ensure DB is connected for every request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).send({ message: "Database connection failed", error: error.message });
    }
});

// Routes
app.get('/', (req, res) => {
    res.send({
        status: 'ContestHub Server Running',
        timestamp: new Date(),
        db_status: database ? 'Connected' : 'Disconnected'
    });
});

// Auth API
app.post('/auth/jwt', (req, res) => {
    const { email, role } = req.body;
    const token = jwt.sign({ email: email.toLowerCase(), role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

// Middlewares
const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' });
        }
        req.decoded = decoded;
        next();
    });
};

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email.toLowerCase();
    const user = await userCollection.findOne({ email });
    if (!user || user.role !== 'admin') {
        return res.status(403).send({ message: 'forbidden access' });
    }
    next();
};

const verifyCreator = async (req, res, next) => {
    const email = req.decoded.email.toLowerCase();
    const user = await userCollection.findOne({ email });
    if (!user || user.role !== 'creator') {
        return res.status(403).send({ message: 'forbidden access' });
    }
    next();
};

// --- DATA ROUTES ---

// Helper to normalize email
const normalizeEmail = (email) => email ? email.toLowerCase() : '';

// Users
app.get('/users/leaderboard', async (req, res) => {
    try {
        const result = await contestCollection.aggregate([
            { $match: { winner: { $exists: true, $ne: null } } },
            {
                $group: {
                    _id: "$winner.email",
                    name: { $first: "$winner.name" },
                    photo: { $first: "$winner.photo" },
                    wins: { $sum: 1 }
                }
            },
            { $sort: { wins: -1 } },
            { $limit: 10 }
        ]).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    const result = await userCollection.find().toArray();
    res.send(result);
});

app.get('/users/:email', verifyToken, async (req, res) => {
    const email = normalizeEmail(req.params.email);
    if (email !== normalizeEmail(req.decoded.email)) return res.status(403).send({ message: 'forbidden access' });
    const user = await userCollection.findOne({ email });
    res.send(user);
});

app.get('/users/admin/:email', verifyToken, async (req, res) => {
    const email = normalizeEmail(req.params.email);
    if (email !== normalizeEmail(req.decoded.email)) return res.status(403).send({ message: 'forbidden access' });
    const user = await userCollection.findOne({ email });
    res.send({ admin: user?.role === 'admin' });
});

app.get('/users/creator/:email', verifyToken, async (req, res) => {
    const email = normalizeEmail(req.params.email);
    if (email !== normalizeEmail(req.decoded.email)) return res.status(403).send({ message: 'forbidden access' });
    const user = await userCollection.findOne({ email });
    res.send({ creator: user?.role === 'creator' });
});

app.post('/users', async (req, res) => {
    const user = req.body;
    user.email = normalizeEmail(user.email);
    const existingUser = await userCollection.findOne({ email: user.email });
    if (existingUser) return res.send({ message: 'user already exists', insertedId: null });
    const result = await userCollection.insertOne(user);
    res.send(result);
});

app.patch('/users/role/:id', verifyToken, verifyAdmin, async (req, res) => {
    const result = await userCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { role: req.body.role } }
    );
    res.send(result);
});

app.patch('/users/:id', verifyToken, async (req, res) => {
    const { name, photo, address } = req.body;
    const result = await userCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { name, photo, address } }
    );
    res.send(result);
});

// Contests
app.get('/contests', async (req, res) => {
    const search = req.query.search || "";
    const type = req.query.type;
    let query = { status: 'approved' };
    if (type) query.type = type;
    if (search) query.$or = [
        { type: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
    ];
    const result = await contestCollection.find(query).toArray();
    res.send(result);
});

app.get('/contests/popular', async (req, res) => {
    // Return top 8 approved contests sorted by participants
    const result = await contestCollection.find({ status: 'approved' })
        .sort({ participantsCount: -1 })
        .limit(8)
        .toArray();
    res.send(result);
});

app.get('/contests/:id', verifyToken, async (req, res) => {
    const result = await contestCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

app.post('/contests', verifyToken, verifyCreator, async (req, res) => {
    const result = await contestCollection.insertOne(req.body);
    res.send(result);
});

app.get('/contests/my-contests/:email', verifyToken, verifyCreator, async (req, res) => {
    const email = normalizeEmail(req.params.email);
    if (normalizeEmail(req.decoded.email) !== email) return res.status(403).send({ message: 'forbidden access' });
    const result = await contestCollection.find({ "creator.email": email }).toArray();
    res.send(result);
});

app.delete('/contests/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const email = normalizeEmail(req.decoded.email);
    const user = await userCollection.findOne({ email });

    if (user.role === 'admin') {
        const result = await contestCollection.deleteOne({ _id: new ObjectId(id) });
        return res.send(result);
    }

    if (user.role === 'creator') {
        const contest = await contestCollection.findOne({ _id: new ObjectId(id) });
        if (!contest) return res.status(404).send({ message: 'Contest not found' });
        // Normalize checking
        if (normalizeEmail(contest.creator.email) !== email) return res.status(403).send({ message: 'Forbidden' });
        if (contest.status !== 'pending') return res.status(403).send({ message: 'Can only delete pending' });

        const result = await contestCollection.deleteOne({ _id: new ObjectId(id) });
        return res.send(result);
    }
    return res.status(403).send({ message: 'Forbidden' });
});

app.patch('/contests/status/:id', verifyToken, verifyAdmin, async (req, res) => {
    const result = await contestCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status: req.body.status } }
    );
    res.send(result);
});

app.patch('/contests/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const email = normalizeEmail(req.decoded.email);
    const user = await userCollection.findOne({ email });
    const body = req.body;

    if (user.role === 'admin') {
        const result = await contestCollection.updateOne({ _id: new ObjectId(id) }, { $set: body });
        return res.send(result);
    }

    if (user.role === 'creator') {
        const contest = await contestCollection.findOne({ _id: new ObjectId(id) });
        if (!contest) return res.status(404).send({ message: 'Not found' });
        if (normalizeEmail(contest.creator.email) !== email) return res.status(403).send({ message: 'Forbidden' });

        const result = await contestCollection.updateOne({ _id: new ObjectId(id) }, { $set: body });
        return res.send(result);
    }
    return res.status(403).send({ message: 'Forbidden' });
});

app.get('/contests/admin/all', verifyToken, verifyAdmin, async (req, res) => {
    const result = await contestCollection.find().toArray();
    res.send(result);
});

// Payments
app.post('/payments/create-payment-intent', verifyToken, async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100) || 0;
    if (amount < 1) return res.status(400).send({ message: "Invalid amount" });

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
    });
    res.send({ clientSecret: paymentIntent.client_secret });
});

app.post('/payments', verifyToken, async (req, res) => {
    const payment = req.body;
    const paymentResult = await paymentCollection.insertOne(payment);
    const updateResult = await contestCollection.updateOne(
        { _id: new ObjectId(payment.contestId) },
        { $inc: { participantsCount: 1 } }
    );
    res.send({ paymentResult, updateResult });
});

app.get('/payments/all', verifyToken, verifyAdmin, async (req, res) => {
    const result = await paymentCollection.find().toArray();
    res.send(result);
});

app.get('/payments/:email', verifyToken, async (req, res) => {
    if (normalizeEmail(req.params.email) !== normalizeEmail(req.decoded.email)) {
        return res.status(403).send({ message: 'forbidden' });
    }
    const result = await paymentCollection.aggregate([
        { $match: { userEmail: req.params.email } },
        {
            $lookup: {
                from: 'contests',
                let: { contestObjId: { $toObjectId: '$contestId' } },
                pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$contestObjId'] } } }],
                as: 'contest'
            }
        },
        { $unwind: '$contest' },
        {
            $project: {
                _id: 1, userEmail: 1, transactionId: 1, date: 1, price: 1, contestId: 1,
                contestName: '$contest.name', deadline: '$contest.deadline',
                image: '$contest.image', prize: '$contest.prize', status: '$contest.status'
            }
        },
        { $sort: { deadline: 1 } }
    ]).toArray();
    res.send(result);
});

app.get('/contests/won/:email', verifyToken, async (req, res) => {
    const email = normalizeEmail(req.params.email);
    if (email !== normalizeEmail(req.decoded.email)) return res.status(403).send({ message: 'forbidden' });
    const result = await contestCollection.find({ "winner.email": email }).toArray();
    res.send(result);
});

// Submissions
app.post('/submissions', verifyToken, async (req, res) => {
    const result = await submissionCollection.insertOne(req.body);
    res.send(result);
});

app.get('/submissions/:contestId', verifyToken, async (req, res) => {
    const contestId = req.params.contestId;
    const email = normalizeEmail(req.decoded.email);
    const user = await userCollection.findOne({ email });

    if (user.role === 'admin') {
        const result = await submissionCollection.find({ contestId }).toArray();
        return res.send(result);
    }
    if (user.role === 'creator') {
        const contest = await contestCollection.findOne({ _id: new ObjectId(contestId) });
        if (!contest) return res.status(404).send({ message: 'Not found' });
        // NOTE: Allow creator to view submissions even if email casing matches logic handled
        const result = await submissionCollection.find({ contestId }).toArray();
        return res.send(result);
    }
    return res.status(403).send({ message: 'Forbidden' });
});

// Winner
app.patch('/contests/winner/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const email = normalizeEmail(req.decoded.email);
    const user = await userCollection.findOne({ email });
    const { winner } = req.body;

    if (user.role === 'admin') {
        const result = await contestCollection.updateOne({ _id: new ObjectId(id) }, { $set: { winner } });
        return res.send(result);
    }
    if (user.role === 'creator') {
        const contest = await contestCollection.findOne({ _id: new ObjectId(id) });
        if (!contest) return res.status(404).send({ message: 'Not found' });
        if (normalizeEmail(contest.creator.email) !== email) return res.status(403).send({ message: 'Forbidden' });

        const result = await contestCollection.updateOne({ _id: new ObjectId(id) }, { $set: { winner } });
        return res.send(result);
    }
    return res.status(403).send({ message: 'Forbidden' });
});

// Export
module.exports = app;

// Start if local
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
