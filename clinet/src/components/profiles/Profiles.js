import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id },
    name,
    email,
    phone,
    password,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <div>
        <h2>{name}</h2>
        <p>
          {name} {email && <span>at {email}</span>}
        </p>
        <p className='my-1'>{phone && <span>{phone}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {password.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
