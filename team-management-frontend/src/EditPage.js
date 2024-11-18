import React, { useState, useEffect } from 'react';
import api from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular',
  });

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await api.get(`/team_members/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching team member:', error);
      }
    };

    fetchTeamMember();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/team_members/${id}/`, formData);
      navigate('/');  // redir -> ListPage after an update
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/team_members/${id}/`);
      navigate('/');  
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Team Member</h1>
      <h3>Edit contact info, location, and role.</h3>
      
      <form onSubmit={handleSubmit}>
        <h4>Info</h4>
        <p>All fields are required.</p>
        <div>
          <label>First Name: </label>
          <input name="first_name" placeholder="Charlene" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name: </label>
          <input name="last_name" placeholder="Pham" value={formData.last_name} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number: </label>
          <input name="phone_number" placeholder="(415) 310-1619" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" placeholder="charlene@instawork.com" value={formData.email} onChange={handleChange} />
        </div>

        <h4>Role</h4>
        <div className="radio-group">
          <label>
            <input type="radio" name="role" value="regular" checked={formData.role === 'regular'} onChange={handleChange} />
            Regular - Can't delete members
          </label>
          <label>
            <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} />
            Admin - Can delete members
          </label>
        </div>

        <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}>Delete</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPage;
