const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("contesthub");
        const userCollection = database.collection("users");
        const contestCollection = database.collection("contests");
        const paymentCollection = database.collection("payments");
        const submissionCollection = database.collection("submissions");

        // Auth related api
        app.post('/auth/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
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
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        };

        const verifyCreator = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isCreator = user?.role === 'creator';
            if (!isCreator) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        };

        // User related apis
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });

        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) admin = user?.role === 'admin';
            res.send({ admin });
        });

        app.get('/users/creator/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let creator = false;
            if (user) creator = user?.role === 'creator';
            res.send({ creator });
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            // check if user already exists
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.patch('/users/role/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: req.body.role
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        app.patch('/users/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const { name, photo, address } = req.body;
            const updatedDoc = {
                $set: {
                    name, photo, address
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });


        // Contest related apis
        app.get('/contests', async (req, res) => {
            const search = req.query.search || "";
            const type = req.query.type;
            let query = { status: 'approved' };
            if (type) query.type = type;
            if (search) {
                query.$or = [
                    { type: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }
                ]
            }
            const result = await contestCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/contests/popular', async (req, res) => {
            const result = await contestCollection.find({ status: 'approved' }).sort({ participantsCount: -1 }).limit(6).toArray();
            res.send(result);
        })

        app.get('/contests/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await contestCollection.findOne(query);
            res.send(result);
        });

        app.post('/contests', verifyToken, verifyCreator, async (req, res) => {
            const contest = req.body;
            const result = await contestCollection.insertOne(contest);
            res.send(result);
        });

        app.get('/contests/my-contests/:email', verifyToken, verifyCreator, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) return res.status(403).send({ message: 'forbidden access' });
            const query = { "creator.email": email }
            const result = await contestCollection.find(query).toArray();
            res.send(result);
        });

        app.delete('/contests/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contestCollection.deleteOne(query);
            res.send(result);
        });

        app.patch('/contests/status/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: req.body.status
                }
            }
            const result = await contestCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        app.patch('/contests/:id', verifyToken, verifyCreator, async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: body
            }
            const result = await contestCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        app.get('/contests/admin/all', verifyToken, verifyAdmin, async (req, res) => {
            const result = await contestCollection.find().toArray();
            res.send(result);
        });


        // Payment and submission apis
        app.post('/payments/create-payment-intent', verifyToken, async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });
            res.send({ clientSecret: paymentIntent.client_secret })
        });

        app.post('/payments', verifyToken, async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentCollection.insertOne(payment);

            // Carefully update participant count
            const query = { _id: new ObjectId(payment.contestId) };
            const updatedDoc = {
                $inc: { participantsCount: 1 }
            }
            const updateResult = await contestCollection.updateOne(query, updatedDoc);

            res.send({ paymentResult, updateResult });
        });

        app.get('/payments/:email', verifyToken, async (req, res) => {
            const query = { userEmail: req.params.email }
            if (req.params.email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const result = await paymentCollection.find(query).sort({ date: -1 }).toArray();
            res.send(result);
        });

        app.post('/submissions', verifyToken, async (req, res) => {
            const submission = req.body;
            const result = await submissionCollection.insertOne(submission);
            res.send(result);
        })

        app.get('/submissions/:contestId', verifyToken, verifyCreator, async (req, res) => {
            const contestId = req.params.contestId;
            const query = { contestId: contestId };
            const result = await submissionCollection.find(query).toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('ContestHub Server is Running');
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
