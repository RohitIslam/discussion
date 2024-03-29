import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions/indexActions";
import Spinner from "../UI/Spinner/Spinner";

const ProfileGithub = ({ username, onGetRepos, repos }) => {
  useEffect(() => {
    onGetRepos(username);
  }, [onGetRepos]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => {
          return (
            <div key={repo.id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  onGetRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    repos: state.profile.repos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRepos: username => dispatch(actions.getGithubRepos(username))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileGithub);
