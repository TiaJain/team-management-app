import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const AddPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular', // default
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // client side validation provides instant feedback to the user before data is sent to the server
  const validate = () => {
    let validationErrors = {};
  
    if (!formData.first_name.trim()) {
      validationErrors.first_name = "First name is required.";
    }
    if (!formData.last_name.trim()) {
      validationErrors.last_name = "Last name is required.";
    }
    if (!/^\d{10,15}$/.test(formData.phone_number)) {
      validationErrors.phone_number = "Phone number must be 10-15 digits.";
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      validationErrors.email = "Enter a valid email address.";
    }
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // true if no errors
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // stop form submission if any of our validations fail
    try {
      await api.post('/team_members/', formData);
      navigate('/'); // redirect -> ListPage after successful submission
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add a team member</h1>
      <h3>Set email, location, and role.</h3>
      
      <form onSubmit={handleSubmit}>
        <h4>Info</h4>
        <p>All fields are required!</p>
        <div>
          <label>First Name: </label>
          <input name="first_name" placeholder="Charlene" value={formData.first_name} onChange={handleChange} style={{ width: '60%' }}/>
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>
        <div>
          <label>Last Name: </label>
          <input name="last_name" placeholder="Pham" value={formData.last_name} onChange={handleChange} style={{ width: '60%' }}/>
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>
        <div>
          <label>Phone Number: </label>
          <input name="phone_number" placeholder="(415) 310-1619" value={formData.phone_number} onChange={handleChange} style={{ width: '60%' }}/>
          {errors.phone_number && <p className="error">{errors.phone_number}</p>}
        </div>
        <div>
          <label>Email: </label>
          <input name="email" placeholder="charlene@instawork.com" value={formData.email} onChange={handleChange} style={{ width: '60%' }}/>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <h4>Role</h4>
        <div className="radio-group">
          <label>
            <input type="radio" name="role" value="regular" checked={formData.role === 'regular'} onChange={handleChange}/>
            Regular - Can't delete members
          </label>
          <label>
            <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} />
            Admin - Can delete members
          </label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddPage;
