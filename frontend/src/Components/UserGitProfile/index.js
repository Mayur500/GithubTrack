import { useEffect, useState } from "react";
import Tables from "../Table/index";
import Spinner from "../Loading/loading";
import axios from "axios";
import Input from "../Input/index";
import "./style.css";

function UserGitProfile() {
  const [userData, setuserData] = useState([]);
  const [userDataCommits, setUserDataCommits] = useState([]);

  const [isCommits, setCommits] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    !isCommits && setUserDataCommits([]);
  }, [isCommits]);

  const checkCommits = async (index) => {
    if (!userDataCommits.length) {
      setCommits(true);
      setFetching(true);
      const userCommits = await axios.get(
        `http://localhost:8080/users/userinfo/repos/${userData[index].owner.login}/${userData[index].name}`
      );

      setFetching(false);
      setUserDataCommits(userCommits.data);
    } else {
      setCommits(false);
      setUserDataCommits([]);
    }
  };

  console.log("hhh", userDataCommits);

  const getUserRepos = () => {
    console.log("repos", userData);
    return (
      <table className="userData">
        <thead>
          <tr>
            <th>Repo Id</th>
            <th>Repo Full Name</th>
            <th>Repo Owner Url</th>
            <th>Repo Name</th>
            <th>Commits</th>
          </tr>
        </thead>
        <tbody>
          {userData ? (
            userData.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.full_name}</td>

                <td>{item.owner.url}</td>

                <td> {item.name}</td>
                <td
                  className="commits"
                  onClick={() => {
                    checkCommits(i);
                  }}
                >
                  Show Commits
                </td>
              </tr>
            ))
          ) : (
            <Spinner />
          )}
        </tbody>
      </table>
    );
  };

  const getUserCommits = () => {
    return (
      <table className="userData">
        <thead>
          <tr>
            <th>Sha</th>
            <th>Author Name</th>
            <th>Commiter Name</th>
            <th>Commiter email</th>
            <th>Commit Message</th>
          </tr>
        </thead>
        <tbody>
          {userDataCommits.length > 0 ? (
            userDataCommits.map((item, i) => (
              <tr key={i}>
                <td>{item.sha}</td>
                <td>{item.commit.author.name}</td>
                <td> {item.commit.committer.name}</td>
                <td> {item.commit.committer.email}</td>
                <td> {item.commit.message}</td>
              </tr>
            ))
          ) : (
            <Spinner />
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      <div className="input">
        <Input
          id={1}
          label="Github User"
          predicted="California"
          locked={false}
          active={false}
          setuserData={setuserData}
          setFetching={setFetching}
          setCommits={setCommits}
        />
      </div>
      <div className="inner-container">
        <div>
          <Tables userData={userData} isCommits={isCommits} fetching={fetching}>
            {getUserRepos()}
          </Tables>
        </div>
        <div className="commits-data">
          {userDataCommits.length > 0 && (
            <div>
              <Tables
                userData={userDataCommits}
                isCommits={false}
                fetching={false}
              >
                {getUserCommits()}
              </Tables>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserGitProfile;
