import React, { useEffect, useMemo, useState } from "react";
import { Container, Content, ContentUser, Nav } from "./styles";
import Autocomplete from "../autocomplete";
import { Suggestion } from "../autocomplete/types";
import { useDebounceCachedFetch } from "../../hooks/useCachedFetch";



const Header: React.FC = () => {
  const [term, setTerm] = useState("");
  const [value, setValue] = useState('');
  const {data, load, loading} = useDebounceCachedFetch<any>();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if(query.has('q')) {
      const q = query.get('q');
      if(q) setTerm(decodeURI(q));
    }
  }, []);

  useEffect(() => {
    if(term) load(`https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=0&maxResults=10`);
    else setValue('');
  }, [term]);
  
  const suggestions: Suggestion<any>[] = useMemo(() => {
    setTyping(false);
    return data?.items.map(
      (item: any) => ({
        label: item.volumeInfo.title,
        value: item,
      })
    );
  }, [data]);

  return (
    <Container>
      <Content>
        <Nav>
          <a href="/">
            <img
              src="https://s3-sa-east-1.amazonaws.com/files.arvoredelivros.com.br/arvore-library-assets/images/logos/logo-livros-horizontal-white.svg"
              alt="Arvore Livros"
              width="168"
              height="25"
            />
          </a>
          <div>
            <a href="/">Home</a> | <a href="#search">Search</a>
          </div>
        </Nav>
        <Autocomplete
          searchProps={{
            value: term,
            onChange: (e: any,) => {
              setTyping(true);
              setTerm(e.currentTarget.value);
            }
          }}
          loading={loading || typing}
          suggestions={(term && !value) ? suggestions : undefined}
          value={value}
          onChange={
            (_, s) => {
              if(s?.label) {
                const query = new URLSearchParams({q: s.label});
                window.location.href = `./?${query.toString()}#search`;
              }
            }
          }
        />
        <ContentUser>
          <p>login</p>
        </ContentUser>
      </Content>
    </Container>
  );
};

export default Header;
