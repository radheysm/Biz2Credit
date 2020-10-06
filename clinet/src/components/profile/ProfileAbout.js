import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { name, email, phone } }) => (
  <div className='profile-about bg-light p-2'>
    {name && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}</h2>
        <p>{name}</p>
        <div className='line'></div>
      </Fragment>
    )}

    <h2 className='text-primary'>{email}</h2>
    <h2 className='text-primary'>{phone}</h2>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
