import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { fireDB } from '../firebase/FirebaseConfig'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import toast from 'react-hot-toast'

const MyState = ({children}) => {
    const [loading, setLoading] = useState(false)

    const [getAllProduct, setGetAllProduct] = useState([])

    
    /**========================================================================
     *                         get all products
     *========================================================================**/
    

    const getAllProductFunction = async () => {
      setLoading(true);
      try {
          const q = query(
              collection(fireDB, "products"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let productArray = [];
              QuerySnapshot.forEach((doc) => {
                  productArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllProduct(productArray);
              setLoading(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  }

  // Order State 
  const [getAllOrder, setGetAllOrder] = useState([]);


  /**========================================================================
   *                         GET ALL ORDER FUNCTION
   *========================================================================**/

  const getAllOrderFunction = async () => {
      setLoading(true);
      try {
          const q = query(
              collection(fireDB, "order"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let orderArray = [];
              QuerySnapshot.forEach((doc) => {
                  orderArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllOrder(orderArray);
              setLoading(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  }

   // Delete oder Function
   const deleteOrder = async (id) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'order', id))
        toast.success('Order Deleted successfully')
        getAllOrderFunction();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

 
    /**========================================================================
     *                      GET ALL USERS ON ADMIN DASHBOARD
     *========================================================================**/

    // user State 
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);

  return (
    <MyContext.Provider value = {{
      // to use in othe components
      loading,
      setLoading,
      //here i have all the products from firebase
      getAllProduct,
      getAllProductFunction,
      getAllOrderFunction,
      getAllOrder,
      deleteOrder,
      getAllUser,
    }}>
        {children}
    </MyContext.Provider>
  )
}

export default MyState