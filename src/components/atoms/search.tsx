import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/variables";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 5px;
  padding: 5px;
  width: 300px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid #0074d9;
  }
`;

const SearchButton = styled.button`
  background: ${colors.main};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 20px;
  &:hover {
    background: #0056b3;
  }
`;

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default SearchBox;
