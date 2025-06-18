const makeid = (length: number): string => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
let userIdForTest = makeid(10);

describe('Home Page', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Main Characters');
  });

  it('Navigates to the World page', () => {
    cy.visit('/');
    cy.get('a[href="/world"]').click();
    cy.url().should('include', '/world');
    cy.contains('Books');
    cy.contains('Characters');
    cy.contains('Houses');
  });

  it('Navigates to the Login page', () => {
    cy.visit('/');
    cy.get('a[href="/auth"]').click();
    cy.url().should('include', '/auth');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });
});

describe('Reister Page', () => {
  it('Visits the Register page', () => {
    cy.visit('/register');
    cy.url().should('include', '/register');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Email');
  });

  it('Registers a new user', () => {
    cy.visit('/register');
    cy.get('input[formControlName="username"]').type(makeid(10));
    cy.get('input[formControlName="email"]').type(`${makeid(10)}@example.com`);
    cy.get('input[formControlName="password"]').type('123456');
    cy.contains('Register').click();
    cy.url().should('include', '/auth');
  });
});

describe('Login Page', () => {
  it('Visits the Login page', () => {
    cy.visit('/auth');
    cy.url().should('include', '/auth');
    cy.contains('Username');
    cy.contains('Password');
  });

  it('Register & Login a user', () => {
    cy.visit('/register');
    cy.get('input[formControlName="username"]').type(userIdForTest);
    cy.get('input[formControlName="email"]').type(`${makeid(10)}@example.com`);
    cy.get('input[formControlName="password"]').type('123456');
    cy.contains('Register').click();
    cy.url().should('include', '/auth');

    cy.get('input[formControlName="username"]').type(userIdForTest);
    cy.get('input[formControlName="password"]').type('123456');
    cy.contains('Login').click();
    cy.url().should('include', '/favorite');
  });
});

describe('Adding new favorite', () => {
  it('Add new favorite', () => {
    cy.visit('/auth');
    cy.get('input[formControlName="username"]').type(userIdForTest);
    cy.get('input[formControlName="password"]').type('123456');
    cy.contains('Login').click();
    cy.wait(3000)
    cy.visit('/world');
    cy.contains('A Game of Thrones').click();
    cy.get('button').contains('Save Favorite').click();
    cy.wait(3000)
    cy.contains('Favorite Saved');
  });

  it('View favorite details', () => {
    cy.visit('/auth');
    cy.get('input[formControlName="username"]').type(userIdForTest);
    cy.get('input[formControlName="password"]').type('123456');
    cy.contains('Login').click();
    cy.url().should('include', '/favorite');
    cy.wait(3000)
    cy.contains('A Game of Thrones').click();
    cy.contains('ISBN: 978-0553103540');
    cy.contains('Authors: George R. R. Martin');
  });
});