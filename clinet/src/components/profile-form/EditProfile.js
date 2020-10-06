import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      name: loading || !profile.name ? '' : profile.name,
      email: loading || !profile.email ? '' : profile.email,
      phone: loading || !profile.phone ? '' : profile.phone,
      password: loading || !profile.password ? '' : profile.password,
    });
  }, [loading, getCurrentProfile]);
  const { name, email, phone, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Full Name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Could be your own or a name email</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='phone'
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Phone Number</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Password</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
