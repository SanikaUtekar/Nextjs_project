// pages/api/Login.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Get the absolute path to data.json
    const filePath = path.join(process.cwd(),'public', 'data.json');

    // Read the data.json file
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);

    const user = data.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
