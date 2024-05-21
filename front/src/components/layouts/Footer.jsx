import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #817f82;
  color: white;
  padding: 20px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  text-align: left;
`;


const FooterContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterContent = styled.span`
  margin: 5px 0;
  flex: 0 0 calc(50% - 10px);
`;

const Footer = () => {
  return (
    <>
      
      <FooterContainer>
        <FooterContentWrapper>
          <FooterContent>(주) 워키토키</FooterContent>
          <FooterContent>주소: 경기 성남시 분당구 판교동 345, 12층(서초동, BNK디지털타워)</FooterContent>
          <FooterContent>대표: 홍길동</FooterContent>
          <FooterContent>사업자 등록번호: 123-45-67890</FooterContent>
          <FooterContent>통신판매업 신고번호: 2024-서울강남-1234호</FooterContent>
          <FooterContent>대표번호: 02-1234-5678</FooterContent>
          <FooterContent>메일주소: support_walkittalkit@wakitaki.kr</FooterContent>
          <FooterContent>&copy; 2024 WalkitTalkit Inc.</FooterContent>
        </FooterContentWrapper>
      </FooterContainer>
    </>
  );
};

export default Footer;
