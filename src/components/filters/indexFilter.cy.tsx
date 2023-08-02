import Filter from './index'

describe('<Filter />', () => {
  beforeEach(() => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Filter mainTitle='Filter'onChange={onChange}/>)
  });
  
  it('Render filters with title', () => {    
    cy.contains('Filter').should('exist')
  })

  it('No filters added to the URL', () => {
    cy.url().should('not.include', 'filter=');
  })

  it('Add a filter to the URL', () => {
    cy.get('#free-ebooks').click();
    cy.get('@onChange').should('have.been.calledWith', {filter: 'free-ebooks'});
  });  
})