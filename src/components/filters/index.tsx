import React, { useEffect } from "react";
import {
  Content,
  ContentTitle,
  Button,
  FilterTitle,
  FilterContent,
} from "./styles";
import { FilterProps } from "./types";
import { filtersWithInitialState } from "./constants";

const Filter: React.FC<FilterProps> = ({
  mainTitle,
}) => {

  const [filters, setFilters] = React.useState<any>({});
  const [hasSelectedFilters, setHasSelectedFilters] = React.useState(false);

  // this effect will load state from url
  // because the dependency array is empty, this effect will run only once
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const currentFilters:any = {};

    if(urlSearchParams.size > 1) setHasSelectedFilters(true);
    
    urlSearchParams.forEach((value, name) => {
      currentFilters[name] = value;
    });

    setFilters(currentFilters);
  }, []);

  // this effect will update the url when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams(filters);
    if(!searchParams.size) return;

    const urlSearchParams = new URLSearchParams(window.location.search);
    
    searchParams.forEach((value, name) => {
      urlSearchParams.set(name, value);
    });

    window.location.search = urlSearchParams.toString();
  }, [filters]);

  const handleToggleCheckbox = (e: any) => {
    console.log(filters)
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);
    window.location.search = `q=${searchParams.get('q')}`;
  };

  return (
    <Content>
      <ContentTitle>{mainTitle}</ContentTitle>
      {hasSelectedFilters && (
        <Button onClick={clearFilters}>Limpar Filtro</Button>
      )}
      {Object.entries(filtersWithInitialState).map(([filterType, category]) => (
        <div key={filterType}>
          <FilterTitle>{category.title}</FilterTitle>
          <FilterContent>
            <ul>
              {category?.items?.map((item: any) => (
                <li key={item.id}>
                  <input
                    id={item.id}
                    name={category.group}
                    type="radio"
                    value={item.id}
                    checked={filters[category.group] === item.id}
                    onChange={handleToggleCheckbox}
                  />
                  <label htmlFor={item.id}>{item.label}</label>
                </li>
              ))}
            </ul>
          </FilterContent>
        </div>
      ))}
    </Content>
  );
};

export default Filter;
