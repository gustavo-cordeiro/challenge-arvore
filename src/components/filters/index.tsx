import React, { useMemo } from "react";
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
  onChange,
  filters = {},
}) => {

  const hasSelectedFilters = useMemo(() => {
    return Object.values(filters).length > 1;
  }, [filters]);

  const handleToggleCheckbox = (e: any) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    onChange?.(newFilters);
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
