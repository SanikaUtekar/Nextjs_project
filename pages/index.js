import Head from 'next/head'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, Button, Form, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';

const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  // Modal visibility states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
      setShowLoginModal(false); // Close modal
      
      // Clear form
      setUsername('');
      setPassword('');
      
      router.push('/blogs');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/SignUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signupUsername, password: signupPassword }),
    });

    const data = await res.json();

    if (data.success) {
      alert('Sign up successful!');
      setShowSignupModal(false); // Close modal
      
      // Reset form
      setSignupUsername('');
      setSignupPassword('');
    } else {
      alert(data.message || 'User already exists or error occurred');
    }
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
    setUsername('');
    setPassword('');
  };

  const handleCloseSignup = () => {
    setShowSignupModal(false);
    setSignupUsername('');
    setSignupPassword('');
  };

  return (
    <>
      <Head>
        <title>My next App</title>
      </Head>
      
      <div className={styles.banner}>
        <Navbar variant="dark" bg="transparent" expand="lg" className="px-4">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button 
                  variant="outline-light" 
                  className="me-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
                <Button 
                  variant="outline-light"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign Up
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={handleCloseSignup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default index