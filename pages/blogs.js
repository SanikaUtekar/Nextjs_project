import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';


const blogs = () => {
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCars, setSelectedCars] = useState([]);
  const itemsPerPage = 12; // 3 rows × 4 columns = 12 items per page

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/');
  };


  useEffect(() => {
    // Fetch data from your JSON file
    const fetchCarsData = async () => {
      try {
        // Replace with your actual JSON file path
        const response = await fetch('/data.json');
        const data = await response.json();
        setCarsData(data.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars data:', error);
        setLoading(false);
      }
    };

    fetchCarsData();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(carsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = carsData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <li key="prev" className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <li key="next" className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Cars Collection - Blog</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </Head>

      <div className='container my-5 blogs_div'>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center flex-grow-1">Cars Collection</h1>
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm ms-3"
          >
            Logout
          </button>
        </div>


        {/* Cars Grid */}
        <div className="row">
          {currentCars.map((car) => (
            <div key={car.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={car.image}
                  className="card-img-top"
                  alt={car.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{car.title}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {car.content}
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-success">{car.price}</span>
                      <span className="badge bg-info">{car.mileage}</span>
                    </div>
                    <button className="btn btn-primary btn-sm w-100"
                    onClick={() =>
                      router.push({
                        pathname: '/viewDetails',
                        query: { id: car.id },
                      })
                    }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="row mt-5">
            <div className="col-12">
              <nav aria-label="Cars pagination">
                <ul className="pagination justify-content-center">
                  {generatePaginationButtons()}
                </ul>
              </nav>
              <div className="text-center mt-3">
                <small className="text-muted">
                  Showing {startIndex + 1} to {Math.min(endIndex, carsData.length)} of {carsData.length} cars
                </small>
              </div>
            </div>
          </div>
        )}

        {/* No data message */}
        {carsData.length === 0 && !loading && (
          <div className="row">
            <div className="col-12 text-center">
              <div className="alert alert-info">
                <h4>No cars found</h4>
                <p>Please check if your data.json file is properly configured.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default blogs