import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  EDIT_PROFILE_ID,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  editProfileId: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profiles: [payload, ...state.profiles],
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case EDIT_PROFILE_ID:
      return {
        ...state,
        editProfileId: payload,
        loading: false,
      };
    default:
      return state;
  }
}
