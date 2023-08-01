import { FilterContentProps } from "./types";

export const filtersWithInitialState: FilterContentProps = {
    availableItems: {
      title: 'Disponibilidade para venda',
      items: [
        {
          id: 1,
          checked: false,
        },
        {
          id: 2,
          checked: false,
        },
      ],
    },
    availableFormats: {
      title: 'Formatos disponíveis',
      items: [
        {
          id: 1,
          checked: false,
        },
        {
          id: 2,
          checked: false,
        },
      ],
    },
  };