import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user, isLoading: isLoadingUser } = useQuery(
    ["user", email],
    () => fetchUserByEmail(email)
  );

  const channelId = user?.data?.channelId;

  const { data: courses, isLoading: isLoadingCourses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId, //or Boolean(channelId)
    }
  );

  if (isLoadingUser) return <div>Loading user...</div>;
  console.log("courses",  courses)
  return (
    <>
      <div>DependentQueries.page</div>
      <div>{isLoadingCourses && "Loading Courses..."}</div>
      <h2>Courses</h2>
      {courses?.data?.courses.map((course) => {
        return <div key={course}>{course}</div>;
      })}
    </>
  );
};
