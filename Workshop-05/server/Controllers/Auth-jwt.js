const jwt = require('jsonwebtoken');
const User = require('.models/user');

require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const JWT_SECRET = process.env.JWT_SECRET; 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del encabezado

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' }); // Forbidden
        }

        const user = await User.findById(payload.id);
        req.user = payload;
        next();
    });
};

const generateToken = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        // main difference with token based auth is that we are using a secret key to sign the token
        // and the a payload is stored with the token
        const payload = { userId: user._id, email: user.email };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error generating token' });
    }
};

exports.authenticateToken = authenticateToken;
exports.generateToken = generateToken;