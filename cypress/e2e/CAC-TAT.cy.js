describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuwxyz', 15)

    cy.get('input#firstName').type('Howard')
    cy.get('input#lastName').type('Wolowitz')
    cy.get('input#email').type('howard.wolowitz@email.com')
    cy.get('textarea#open-text-area').type(longText, {delay:0})
    cy.contains('button','Enviar').click()
    
    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário com o campo e-mail incorreto', () => {
    cy.get('input#firstName').type('Howard')
    cy.get('input#lastName').type('Wolowitz')
    cy.get('input#email').type('howard.wolowitz@dfgkcom')
    cy.get('textarea#open-text-area').type('texto teste')
    cy.contains('button','Enviar').click()
    
    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
    cy.get('input#phone').type('Jumbo').should('have.value','')    
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input#firstName').type('Howard')
    cy.get('input#lastName').type('Wolowitz')
    cy.get('input#email').type('howard.wolowitz@dfgkcom')

    cy.get('#phone-checkbox').click()

    cy.get('textarea#open-text-area').type('texto teste')
    cy.contains('button','Enviar').click()

    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Howard').should('have.value','Howard').clear().should('have.value','')
    cy.get('#lastName').type('Wolowitz').should('have.value','Wolowitz').clear().should('have.value','')
    cy.get('#email').type('howard.wolowitz@email.com').should('have.value','howard.wolowitz@email.com').clear().should('have.value','')
    cy.get('#phone').type('8399448833').should('have.value','8399448833').clear().should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Andros',
      lastName: 'Red',
      email: 'androspower@gmail.com',
      text: 'texto teste'
    }
    
    cy.fillMandatoryFieldAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado 2.o', () => {
    cy.fillMandatoryFieldAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu valor Índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atentimento 2.0', () => {
    cy.get('input[type="radio"]')
      .each(tiposDeServiço => {
        cy.wrap(tiposDeServiço)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('2.0 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input#firstName').type('Howard')
    cy.get('input#lastName').type('Wolowitz')
    cy.get('input#email').type('howard.wolowitz@dfgkcom')

    cy.get('#phone-checkbox').check().should('be.checked')

    cy.get('textarea#open-text-area').type('texto teste')
    cy.contains('button','Enviar').click()

    cy.get('.error').contains('Valide os campos obrigatórios!')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a','Política de Privacidade')
      .should('have.attr','href','privacy.html')
      .should('have.attr','target','_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link',() => {
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr','target')
      .click()

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })
})