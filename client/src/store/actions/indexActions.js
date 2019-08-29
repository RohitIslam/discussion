export { setAlert } from "./alertAction";

export { register, userLoaded, login, logout } from "./authAction";

export {
  getCurrentProfile,
  createProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteAccountAndProfile,
  getAllProfiles,
  getProfileByUserId,
  getGithubRepos
} from "./profileAction";

export {
  getAllPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getSinglePost
} from "./postAction";
