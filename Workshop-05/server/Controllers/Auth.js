const User = require('../models/user');
const bcrypt = require('bcrypt');


/*
* Middleware para autenticar el token de un usuario en las solicitudes protegidas. 
*/
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error authenticating token' });
  }
};

/*
* Genera un token de autenticación para un usuario dado su email y contraseña.
*/
const generateToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await bcrypt.hash(email + password, 10);
    user.token = token;
    await user.save();

    return res.status(201).json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating token' });
  }
};

/*
* Registra un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud (req.body).
*/
const register = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword
    });

    await user.save();

    return res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

module.exports = {
  authenticateToken,
  generateToken,
  register
};