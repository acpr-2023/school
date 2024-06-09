import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/noticeRelated/noticeHandle";
import { Paper } from "@mui/material";
import TableViewTemplate from "./TableViewTemplate";
import styled from "styled-components";

const SeeNotice = () => {
  const dispatch = useDispatch();

  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );

  useEffect(() => {
    if (currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } else {
      dispatch(getAllNotices(currentUser.school._id, "Notice"));
    }
  }, [dispatch]);

  if (error) {
    console.log(error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString =
      date.toString() !== "Invalid Date"
        ? date.toISOString().substring(0, 10)
        : "Invalid Date";
    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });

  return (
    <div style={{ marginTop: "5px", marginRight: "10px" }}>
      {loading ? (
        <div style={{ fontSize: "20px" }}>Loading...</div>
      ) : response ? (
        <div style={{ fontSize: "20px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <StyledHeading>Notices</StyledHeading>
          <StyledPaper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            )}
          </StyledPaper>
        </>
      )}
    </div>
  );
};

const StyledHeading = styled.h3`
  font-size: 30px;
  margin-bottom: 10px;
  border-bottom: 3px solid #ff8c0f;
  padding-bottom: 5px;
  // background-color: #ded2c6;
`;

const StyledPaper = styled(Paper)`
  background-color: #ded2c6;
`;

export default SeeNotice;
