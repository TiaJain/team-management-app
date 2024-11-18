import React, { useEffect, useState } from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ListPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await api.get('/team_members/');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('There was an error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="container">
      <h1>Team Members</h1>
      <Link to="/add" className="add-button">
        <i className="fas fa-plus"></i> {/*  using fontawesome's + icon! */}
      </Link>
      <p>You have {teamMembers.length} team members.</p>
      <ul className="team-members-list">
        {teamMembers.map((member) => (
          <li key={member.id} className="team-member-item">
            <div className="team-member-info">
              <span className="name">
                {member.first_name} {member.last_name}
                {member.role === 'admin' && ` (Admin)`} {/* only display role if admin */}
              </span>
              <br />
              <span className="phone">{member.phone_number}</span>
              <br />
              <span className="email">{member.email}</span>
            </div>
            <Link to={`/edit/${member.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
