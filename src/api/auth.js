import supabase from '../db1.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  const { nombre, apellido, telefono, correo, username, password, tipoUser } = req.body;

  try {
    // Verificar si ya existe un usuario con el mismo username o correo electrónico
    const { data: existingUser, error } = await supabase
      .from('usuarios')
      .select('*')
      .or(`username.eq.${username}`, `correo.eq.${correo}`);

    if (error) {
      throw new Error(error.message);
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json(["Ya existe un usuario con el mismo username o correo electrónico."]);
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const { data: newUser, error: createUserError } = await supabase
      .from('usuarios')
      .insert([{ 
        nombre,
        apellido,
        telefono,
        correo,
        username,
        password: passwordHash,
        tipoUser,
      }]);
    
    if (createUserError) {
      throw new Error(createUserError.message);
    }

    console.log("Usuario creado");

    // Generar token de acceso
    const token = jwt.sign({ id: newUser.id }, TOKEN_SECRET);
    
    res.json({ message: "Usuario creado correctamente", token });
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al registrar usuario."]);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por el username
    const { data: existingUser, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!existingUser) {
      return res.status(404).json(["Usuario no encontrado."]);
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      console.log("Contraseña incorrecta.");
      return res.status(401).json(["Contraseña incorrecta."]);
    }

    // Generar token de acceso
    const token = jwt.sign({ id: existingUser.id }, TOKEN_SECRET);

    res.cookie('token', token);
    res.json({
      nombre: existingUser.nombre,
      apellido: existingUser.apellido,
      correo: existingUser.correo,
      telefono: existingUser.telefono,
      username: existingUser.username,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al iniciar sesión."]);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Sin autorizacion" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Sin autorizacion" });
    }

    try {
      // Obtener información del usuario desde Supabase
      const { data: user, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (!user) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      // Enviar información del usuario al cliente
      res.json({
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        telefono: user.telefono,
        tipoUser: user.tipoUser,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
};

export const putUser = async (req, res) => {
  try {
      const { error } = await supabase
          .from('usuarios')
          .update(req.body)
          .eq('id', req.params.id);

      if (error) {
          throw new Error(error.message);
      }

      res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
      console.error(error);
      res.status(500).json(["Error interno del servidor"]);
  }
}

export const verifyToken = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Sin autorizacion" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Sin autorizacion" });
    }

    try {
      // Buscar al usuario en Supabase
      const { data: userFound, error } = await supabase
        .from('usuarios')
        .select('id, username, correo, telefono, nombre, apellido, tipoUser')
        .eq('id', user.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (!userFound) {
        return res.status(401).json({ message: "Sin autorizacion" });
      }

      return res.json(userFound);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
};
