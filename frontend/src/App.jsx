import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [cartProductCount, setCartProductCount] = useState(0);
  

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: 'include',
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
 
        dispatch(setUserDetails(dataApi.data));
      } else {
        setError(dataApi.message); // Capture API error messages
      }
    } catch (err) {
      setError('Failed to fetch user details.'); // Handle fetch errors
    }
  };

  // Function to fetch cart product count
  const fetchCartProductsCount = async () => {
    try {
        const dataResponse = await fetch(summaryApi.cartProductCounter.url, {
            method: summaryApi.cartProductCounter.method,
            credentials: 'include',
        });
        
        // Check if response is ok (status in the range 200-299)
        if (!dataResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const countData = await dataResponse.json();

        if (countData.success) {
            setCartProductCount(countData.data.count);
        } else {
            setError(countData.message);
        }
    } catch (err) {
        setError('Failed to fetch cart product count.');
    }
};


  useEffect(() => {
    fetchUserDetails();
    fetchCartProductsCount(); 
  }, []);

  return (
    <>
      <Context.Provider value={{ 
        fetchUserDetails,
        cartProductCount, //current user cart product count
        fetchCartProductsCount

      }}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ marginTop: '60px' }}
        />

        <Header cartProductCount={cartProductCount} /> {/* Pass count to Header */}
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
