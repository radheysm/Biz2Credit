import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import {
  getProfiles,
  deleteProfile,
  editProfileID,
} from '../../actions/profile';

const Dashboard = ({
  getProfiles,
  auth: { user },
  profile: { profile, profiles, loading },
  deleteProfile,
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  const handleEditProfile = async (id) => {
    await editProfileID(id);
  };
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <div style={{ display: 'flex' }}>
        <p
          className='lead'
          style={{
            width: '700px',
            border: '1px solid #17a2b8',
            marginRight: '10px',
            height: '39px',
            marginTop: '16px',
          }}
        >
          List Of Users
        </p>
        <div>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create New User
          </Link>
        </div>
      </div>
      {profiles.map((item) =>
        item.user === user._id ? (
          <div
            style={{
              display: 'block',
              border: '1px solid black',
              width: '240px',
            }}
          >
            <span>Name:</span>
            <br></br>
            <h3>{item.name}</h3>

            <span>Email:</span>
            <br></br>
            <h3>{item.email}</h3>

            <span>Phone:</span>
            <br></br>
            <h3>{item.phone}</h3>
            <div style={{ display: 'flex' }}>
              <div>
                <Link
                  to='/edit-profile'
                  className='btn btn-primary my-1'
                  style={{ margin: '5px' }}
                  onClick={() => handleEditProfile(item._id)}
                >
                  Edit
                </Link>
              </div>
              <div style={{ marginTop: '6px' }}>
                <Button
                  onClick={() => deleteProfile(item._id)}
                  className='bg-danger'
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  editProfileID: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfiles,
  deleteProfile,
  editProfileID,
})(Dashboard);
