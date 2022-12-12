import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  padding: 20px 0px 20px 16px;
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom: 6px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;
`;

const ProductsList = styled.ul`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 16px;
`;

function UserProducts() {
  return (
    <Container>
      <Title>판매 중인 상품</Title>
      <ProductsList></ProductsList>
    </Container>
  );
}
export default UserProducts;