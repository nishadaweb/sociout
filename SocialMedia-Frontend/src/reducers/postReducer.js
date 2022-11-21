const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_STARTED":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_COMPLETED":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAILED":
      return { ...state, uploading: false, error: true };
    case "RETREIVING_START":
      return { ...state, uploading: true, error: false };
    case "RETREIVING_SUCCESSFULL":
      return { ...state, posts: action.data, uploading: false, error: false };
    case "RETRIEVING_FAILED":
      return { ...state, uploading: false, error: true };

    default:
      return state;
  }
};
export default postReducer;
