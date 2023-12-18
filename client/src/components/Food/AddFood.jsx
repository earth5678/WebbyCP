import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Food.css';

const AddFoodForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newFoodData, setNewFoodData] = useState({
    FoodName: '',
    FoodCalorie: '',
    FoodProtien: '',
    FoodFat: '',
    FoodCarbo: '',
    FoodFiber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/foods`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addFood = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/foods`, newFoodData);
      console.log('Food created successfully. Response:', response.data);
      setNewFoodData({
        FoodName: '',
        FoodCalorie: '',
        FoodProtien: '',
        FoodFat: '',
        FoodCarbo: '',
        FoodFiber: '',
      });
      fetchData(); // Refresh the data after adding a new entry

    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div>
      <button className="Button" onClick={toggleFormVisibility}>
        เพิ่มรายการอาหาร
      </button>
      {isFormVisible && (
        <div className="AddFoodForm">
          <form>
            <label>เมนู:</label>
            <input type="text" name="FoodName" value={newFoodData.FoodName} onChange={handleInputChange} />

            <label>แคลอรี่:</label>
            <input type="text" name="FoodCalorie" value={newFoodData.FoodCalorie} onChange={handleInputChange} />

            <label>โปรตีน:</label>
            <input type="text" name="FoodProtien" value={newFoodData.FoodProtien} onChange={handleInputChange} />

            <label>ไขมัน:</label>
            <input type="text" name="FoodFat" value={newFoodData.FoodFat} onChange={handleInputChange} />

            <label>คาร์โบไฮเดรต:</label>
            <input type="text" name="FoodCarbo" value={newFoodData.FoodCarbo} onChange={handleInputChange} />

            <label>ไฟเบอร์:</label>
            <input type="text" name="FoodFiber" value={newFoodData.FoodFiber} onChange={handleInputChange} />

            <button type="button" onClick={addFood}>
              เพิ่มรายการ
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddFoodForm;
