import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile: { name, email, phone, password } }) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {name} {email && <span>at {email}</span>}
      </p>
      <p>{phone && <span>{phone}</span>}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
