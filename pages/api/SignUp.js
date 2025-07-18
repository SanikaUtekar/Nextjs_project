import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      const filePath = path.join(process.cwd(),'public', 'data.json');

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(500).json({ success: false, message: 'data.json not found' });
      }

      const fileData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);

      // Check if user already exists
      const existingUser = data.users.find(user => user.username === username);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // Add new user
      data.users.push({ username, password });

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

      return res.status(201).json({ success: true, message: 'User created' });

    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
