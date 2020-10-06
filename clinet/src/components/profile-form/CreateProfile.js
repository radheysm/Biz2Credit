import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const { name, email, phone, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create New User</h1>
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
          <small className='form-text'>Your Full Name</small>
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
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Please Enter Password</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
