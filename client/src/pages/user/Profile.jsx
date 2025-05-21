import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          No user data found. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">My Profile</h3>
            </div>
            <div className="card-body">
              <div className="mb-3 text-center">
                <i className="fas fa-user-circle fa-5x text-secondary"></i>
              </div>
              <h5 className="card-title text-center mb-4">{user.name || 'User'}</h5>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> {user.role || 'User'}
                </li>
                {/* Add more fields as needed */}
              </ul>
              {/* You can add an Edit Profile button here if you want */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;