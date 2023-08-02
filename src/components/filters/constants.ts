import { FilterContentProps } from "./types";

export const filtersWithInitialState: FilterContentProps = {
    availableItems: {
      title: 'Disponibilidade para venda',
      group: 'filter',
      items: [
        {
          id: 'free-ebooks',
          label: 'Grátis',
          checked: false,
        },
        {
          id: 'paid-ebooks',
          label: 'Pagos',
          checked: false,
        },
      ],
    },
    availableFormats: {
      title: 'Formatos disponíveis',
      group: 'printType',
      items: [
        {
          id: 'books',
          label: 'Livros',
          checked: false,
        },
        {
          id: 'magazines',
          label: 'Revistas',
          checked: false,
        },
      ],
    },
  };