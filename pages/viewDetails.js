import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [car, setCar] = useState(null);

    useEffect(() => {
        if (id) {
            fetch('/data.json')
                .then((res) => res.json())
                .then((data) => {
                    const found = data.blogs.find((c) => c.id === parseInt(id));
                    setCar(found);
                });
        }
    }, [id]);

    if (!car) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container my-5">
            <div className='row'>
                <div className='col'>
                    <h2>{car.title}</h2>
                    <div style={{ width: 500 }}>
                    <img src={car.image} alt={car.title} style={{ width: 500, height:300 }} className="img-fluid" />
                    </div>
                </div>
                <div className='col'>
                    <p>{car.content}</p>
                    <p><strong>Price:</strong> {car.price}</p>
                    <p><strong>Mileage:</strong> {car.mileage}</p>
                </div>
            </div>

            <button className="btn btn-secondary mt-3" onClick={() => router.back()}>Back</button>
        </div>
    );
}
