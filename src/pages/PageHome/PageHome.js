import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageHome = () => {
  const [itemList, setItemList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [targetYear, setTargetYear] = useState("all");

  const moment = require("moment");
  const today = moment();
  console.log(today.format("YYYY-MM-DD HH:mm"));

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://fe-coding-test-search-order.herokuapp.com/orders?year=${targetYear}`
      );
      const data = await res.json();
      const { orders } = data;
      console.log(orders);
      setItemList(orders);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeSearch = (e) => {
    const reg = "/^-?[1-9]*$/";
    const { value } = e.target;
    let regValue = value.replace(reg);
    setInputVal(regValue);
    setTargetYear(regValue);
    console.log(regValue);
  };

  const handleClickSearch = () => {
    console.log("clicked");
    setInputVal("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomeContainer>
      <SearchContainer>
        <SearchWrapper>
          <SearchTitle>연도</SearchTitle>
          <input value={inputVal} onChange={handleChangeSearch} />
        </SearchWrapper>
        <SearchButton onClick={handleClickSearch}>검색</SearchButton>
      </SearchContainer>

      <ListContainer>
        <thead>
          <tr>
            <th>번호</th>
            <th>생성일시</th>
            <th>상태</th>
            <th>신청인</th>
            <th>신청지</th>
            <th>신청인 연락처</th>
            <th>수령인</th>
            <th>수령지</th>
            <th>수령인 연락처</th>
          </tr>
        </thead>
        <tbody>
          {itemList && itemList.length > 0 ? (
            itemList.map((item) => {
              return (
                <tr>
                  <td>{item.applicant.phone}</td>
                  <td>{moment(item.created_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td>{item.status}</td>
                  <td>{item.applicant.name}</td>
                  <td>{item.applicant.address}</td>
                  <td>{item.applicant.phone}</td>
                  <td>{item.dest.name}</td>
                  <td>{item.dest.address}</td>
                  <td>{item.dest.phone}</td>
                </tr>
              );
            })
          ) : (
            <NoRender>아무것도 찾지 못했어요 :(</NoRender>
          )}
        </tbody>
      </ListContainer>
    </HomeContainer>
  );
};

export default PageHome;

const HomeContainer = styled.div`
  width: 100vh;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 36px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    border-radius: 8px;
  }
`;

const SearchTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 51px;
  color: #676d7e;
`;

const SearchButton = styled.button`
  background-color: #4882e3;
  color: #ffffff;
  border-radius: 22px;
`;

const ListContainer = styled.table`
  width: calc(100vw - 36px);
  padding: 36px;
  thead {
    background-color: #676d7e;
    color: #ffffff;
  }
`;

const NoRender = styled.tr`
  display: flex;
  justify-content: center;
`;
