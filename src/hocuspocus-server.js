import { Server } from '@hocuspocus/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '9ea980d94b63e3931fc5badbb42e71ff66243297263dae8bc6dc4c4598c14733';
 // Same as in the auth server
//9ea980d94b63e3931fc5badbb42e71ff66243297263dae8bc6dc4c4598c14733

const server = Server.configure({
  port: 1234,
  allowCors: true,

  async onAuthenticate({ token }) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(`Authenticated user: ${decoded.username}`);
      return { username: decoded.username };
    } catch (error) {
      console.error('Invalid token');
      throw new Error('Authentication failed: Invalid token');
    }
  },

  async onConnect({ documentName, context }) {
    console.log(`User ${context.username} connected to document: ${documentName}`);
  },

  async onDisconnect({ documentName, context }) {
    console.log(`User ${context.username} disconnected from document: ${documentName}`);
  },
});

server.listen(() => {
  console.log('Hocuspocus Server is running on port 1234');
});
