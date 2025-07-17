import Head from 'next/head'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
  
    const res = await fetch('/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
  
    if (data.success) {
      alert('Login successful');
      router.push('/blogs');
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <>
      <Head>
        <title>My next App</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </Head>
      <div className={styles.banner}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-4">
          <div className="container-fluid">
            {/* <a className="navbar-brand text-white" href="#">MyApp</a> */}

            <div className="ms-auto">
              <button className="btn btn-outline-light me-2"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >Login</button>
              <button className="btn btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >Sign Up</button>
            </div>
          </div>
        </nav>
      </div>
      {/* Signup Modal */}
      <div className="modal fade" id="signupModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form id="signupForm">
                <input type="text" className="form-control mb-2" placeholder="Username" name="username" required />
                <input type="email" className="form-control mb-2" placeholder="Email" name="email" required />
                <input type="password" className="form-control mb-2" placeholder="Password" name="password" required />
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <div className="modal fade" id="loginModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form id="loginForm" onSubmit={handleLogin}>
                <input type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required />
                <input type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
                <button type="submit" className="btn btn-success w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default index