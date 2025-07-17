import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const fileData = fs.readFileSync(filePath);
  const json = JSON.parse(fileData);

  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = json.users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
