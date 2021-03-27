import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Menu from "./Menu";
import { receiveUserDetails } from "../../actions";
import moment from "moment";
import UpdateDetailsModal from "./UpdateDetailsModal";
import UpdatePasswordModal from "./UpdatePasswordModal";

const UserProfile = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [changePasswordModa, setChangePasswordModal] = useState(false);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.user.id);
  const profile = useSelector((state) => state.userDetails.profile);

  const openDetailsModal = () => {
    setShowDetailsModal((prev) => !prev);
  };

  const openPasswordModal = () => {
    setChangePasswordModal((prev) => !prev);
  };

  useEffect(() => {
    fetch(`/get-user-details/${userID}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(receiveUserDetails(res.data));
        }
      });
  }, []);
  return (
    <Wrapper>
      <Menu />
      <div>
        <Button onClick={openDetailsModal}>Update contact information</Button>
        <Button onClick={openPasswordModal}>Change password</Button>
        <h1>Your profile</h1>
        <hr />
        {profile && (
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  {profile.fname} {profile.lname}
                </td>
              </tr>
              <tr>
                <td>Employee ID</td>
                <td>{profile._id}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{profile.phoneNumber}</td>
              </tr>
              <tr>
                <td>Joining Date</td>
                <td>{moment(parseInt(profile.joinDate)).format("ll")}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <UpdateDetailsModal
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
        profile={profile}
      />
      <UpdatePasswordModal
        showModal={changePasswordModa}
        setShowModal={setChangePasswordModal}
        profile={profile}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  & > div > table {
    border: none;

    td,
    tr {
      border: none;
      padding: 20px;
    }
  }
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export default UserProfile;
