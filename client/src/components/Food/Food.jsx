import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Food.css';
import Addfood from './AddFood';
const DataTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFoodData, setNewFoodData] = useState({
    FoodName: '',
    FoodCalorie: '',
    FoodProtien: '',
    FoodFat: '',
    FoodCarbo: '',
    FoodFiber: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/foods`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setNewFoodData(selectedItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/foods/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!newFoodData.id (newFoodData.id)) {
        console.error('Invalid or missing ID for update.');
        return;
      }
      await axios.put(`http://localhost:8080/api/foods/${newFoodData.id}`, newFoodData);
      fetchData();
      setIsModalOpen(false);
      setNewFoodData({
        FoodName: '',
        FoodCalorie: '',
        FoodProtien: '',
        FoodFat: '',
        FoodCarbo: '',
        FoodFiber: '',
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  
  return ( 
    <div className="">
      <h2 className="TextTitle">ข้อมูลอาหารและปริมาณที่แนะนำ</h2>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{newFoodData.id ? 'แก้ไขรายการอาหาร' : 'เพิ่มรายการอาหาร'}</h3>
            <form>
              <div>
                <label>เมนู:</label>
                <input type="text" name="FoodName" value={newFoodData.FoodName} onChange={handleInputChange} />
              </div>
              <div>
                <label>แคลอรี่:</label>
                <input type="text" name="FoodCalorie" value={newFoodData.FoodCalorie} onChange={handleInputChange} />
              </div>
              <div>
                <label>โปรตีน:</label>
                <input type="text" name="FoodProtien" value={newFoodData.FoodProtien} onChange={handleInputChange} />
              </div>
              <div>
                <label>ไขมัน:</label>
                <input type="text" name="FoodFat" value={newFoodData.FoodFat} onChange={handleInputChange} />
              </div>
              <div>
                <label>คาร์โบไฮเดรต:</label>
                <input type="text" name="FoodCarbo" value={newFoodData.FoodCarbo} onChange={handleInputChange} />
              </div>
              <div>
                <label>ไฟเบอร์:</label>
                <input type="text" name="FoodFiber" value={newFoodData.FoodFiber} onChange={handleInputChange} />
              </div>
            </form>
            <button onClick={handleSave}>บันทึก</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>เมนู</th>
            <th>แคลอรี่</th>
            <th>โปรตีน</th>
            <th>ไขมัน</th>
            <th>คาร์โบไฮเดรต</th>
            <th>ไฟเบอร์</th>
            <th>แก้ไขหรือลบ</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.FoodName}</td>
              <td>{item.FoodCalorie}</td>
              <td>{item.FoodProtien}</td>
              <td>{item.FoodFat}</td>
              <td>{item.FoodCarbo}</td>
              <td>{item.FoodFiber}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>แก้ไข</button>
                <button onClick={() => handleDelete(item.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
};

export default DataTable;
