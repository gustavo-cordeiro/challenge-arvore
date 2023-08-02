import React, { useEffect } from "react";
import Header from "../../components/header";
import Filters from "../../components/filters";
import {
    Container,
  Content,
  ContentResults,
  ContentResultsCategory,
  ContentResultsCover,
  ContentResultsTitle,
  ContentResultsWrapper,
} from "./styles";
import Footer from "../../components/footer";
import {
  footerAllrightsReserved,
  helpLink,
  privacyAndPolicy,
  termsAndUsage,
} from "../../constants";
import { useCachedfetch } from "../../hooks/useCachedFetch";


const Search: React.FC = () => {
  const {data, load} = useCachedfetch<any>();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if(!query.size) return;
    
    const apiUrl = new URL(`https://www.googleapis.com/books/v1/volumes?&startIndex=0&maxResults=40`)
    apiUrl.search = `${apiUrl.search}&${query.toString()}`;
    
    load(apiUrl.href);
  }, []);


  return (
    <>
      <Header />
      <Container>
        <Content>
        <Filters mainTitle="Filter"/>
        <ContentResults>
          
          <>
            {data?.items.map((book: any) => (
              <ContentResultsWrapper key={book.id}>
                <ContentResultsCover>
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || `https://placehold.co/85x124?text=${book.volumeInfo.title}`}
                    alt={book.volumeInfo.title} />
                </ContentResultsCover>
                <ContentResultsTitle>
                  <label>{book.volumeInfo.title} </label>
                </ContentResultsTitle>
                <ContentResultsCategory>
                  <span>{book.volumeInfo.authors}</span>
                </ContentResultsCategory>
              </ContentResultsWrapper>
            ))}
          </>
          
        </ContentResults>
        </Content>
      </Container>
      <Footer
        text={footerAllrightsReserved}
        privacyText={privacyAndPolicy}
        termsAndUsageText={termsAndUsage}
        helpText={helpLink}
      />
    </>
  );
};

export default Search;
