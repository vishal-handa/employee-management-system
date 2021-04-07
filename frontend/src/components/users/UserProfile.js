import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Menu from "./Menu";
import { receiveUserDetails } from "../../actions";
import moment from "moment";
import UpdateDetailsModal from "./UpdateDetailsModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import UpdateEmailModal from "./UpdateEmailModal";

const UserProfile = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [changePasswordModa, setChangePasswordModal] = useState(false);
  const [changeEmailModal, setChangeEmailModal] = useState(false);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.user.id);
  const profile = useSelector((state) => state.userDetails.profile);

  const openDetailsModal = () => {
    setShowDetailsModal((prev) => !prev);
  };

  const openPasswordModal = () => {
    setChangePasswordModal((prev) => !prev);
  };

  const openEmailModal = () => {
    setChangeEmailModal((prev) => !prev);
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
      <Container>
        <Banner>Your Profile</Banner>
        <ButtonContainer>
          <Button onClick={openDetailsModal}>Change phone number</Button>
          <Button onClick={openEmailModal}>Change email</Button>
          <Button onClick={openPasswordModal}>Change password</Button>
        </ButtonContainer>
        <TableContainer>
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
        </TableContainer>
      </Container>
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
      <UpdateEmailModal
        showModal={changeEmailModal}
        setShowModal={setChangeEmailModal}
        profile={profile}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
`;

const Button = styled.button`
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  background: transparent;
  padding: 15px;
  &:hover {
    background-color: gray;
  }
`;

const Banner = styled.p`
  width: 100%;
  color: black;
  padding: 50px 0px 50px 10px;
  font-size: 3em;
  font-weight: 900;
`;

const ButtonContainer = styled.div`
  width: inherit;
  align-content: right;
  background-color: black;
  text-align: right;
`;

const TableContainer = styled.div`
  display: flex;
  margin: auto;
  table {
    border: none;
    td,
    tr {
      border: none;
      padding: 20px;
    }
    td:nth-child(1) {
      font-weight: 900;
    }
  }
`;

export default UserProfile;
