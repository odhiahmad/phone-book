import React, { useState, useEffect, CSSProperties } from "react";
import TopBar from "@/components/atoms/topbar";
import FloatingButton from "@/components/atoms/floatbutton";
import ContactList from "@/components/contact/ContactList";
import SearchBox from "@/components/atoms/search";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT_QUERY } from "@/queries";
import { Pagination, ContactListContainer } from "./styles";
import ClipLoader from "react-spinners/ClipLoader";
import { DELETE_CONTACT } from "@/context/contact/types";
import { useAppContext } from "@/context/AppProvider";
import { useRouter } from "next/router";

export default function Home() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const router = useRouter();
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [mutation] = useMutation(DELETE_CONTACT_QUERY);
  const { dispatch } = useAppContext();

  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage, limit]);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setCurrentPage(1);
    setOffset(0);
  };

  const handleDelete = async (id: number) => {
    setLoadingDelete(true);
    try {
      const { data } = await mutation({
        variables: {
          id: id,
        },
      });
      dispatch({ type: DELETE_CONTACT, payload: data.delete_contact_by_pk.id });
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  const handleClick = async (id: number) => {
    router.push({
      pathname: "edit-contact",
      query: {
        id: id,
      },
    });
  };

  return (
    <>
      <ContactListContainer>
        <TopBar title="List Contact" />
        <SearchBox onSearch={handleSearch} />
        <FloatingButton url="create-contact" />
        <ContactList
          limit={limit}
          offset={offset}
          search={search}
          handleDelete={handleDelete}
          handleClick={handleClick}
        />

        <Pagination>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
            Next Page
          </button>
        </Pagination>
        <ClipLoader
          color={"#ffffff"}
          loading={loadingDelete}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </ContactListContainer>
    </>
  );
}
