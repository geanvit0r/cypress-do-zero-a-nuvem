describe('Pratica de testes', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('Sarinha gostosinha e putinha',10)

        cy.get('#firstName').type('Gean')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('gean@email.com')
        cy.get('#open-text-area').type(longText)
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
      })

      it('preenche os campos obrigatórios e envia o formulário com o campo e-mail incorreto', () => {
        const longText = Cypress._.repeat('Sarinha gostosinha e putinha ',10)

        cy.get('#firstName').type('Gean')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('gean@.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
      })

      it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
        cy.get('input[type="number"]').type('abc').should('have.value','')
      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const longText = Cypress._.repeat('Sarinha gostosinha e putinha',10)

        cy.get('#firstName').type('Gean')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('gean@email.com')

        cy.get('#phone-checkbox').check()

        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.error').contains('Valide os campos obrigatórios')
      })

      it('envia o formuário com sucesso usando um comando customizado', () => {
        const data = {
            firstName: 'Sheldon',
            lastName: 'Coorper',
            email: 'sheldon@email.com',
            text: 'testetesteteste'
        }

        cy.fillMandatoryFieldAndSubmit(data)
        cy.get('.success').should('be.visible')
      })

      it('seleciona um produto (YouTube) por seu texto',()=>{
        cy.get('#product').select('YouTube').should('have.value','youtube')
      })

      it.only('marca cada tipo de atendimento',()=>{
        cy.get('input[type="radio"]')
            .each(argumento => {
                cy.wrap(argumento)
                .check()
                .should('be.checked')
            })
      })
})