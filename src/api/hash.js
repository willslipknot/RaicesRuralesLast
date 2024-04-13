import bcrypt from 'bcryptjs'


async function hashPassword() {
    const password = '12345678'; // Tu contraseña original
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        console.log('Contraseña hasheada:', passwordHash);
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
    }
}

hashPassword();