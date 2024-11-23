import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  const { username, password, action } = await request.json();

  if (action === 'register') {
    // Hash password sebelum menyimpannya ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role: 'admin' },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } else if (action === 'login') {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return new Response(JSON.stringify({ token }), { status: 200 });
    }
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }
}
