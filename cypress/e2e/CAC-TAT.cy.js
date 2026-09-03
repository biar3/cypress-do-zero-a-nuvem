describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatorios e envia o formulario', () => {
    const longText = Cypress._.repeat('A vida com mais emoção!', 10)

    cy.get('[name="firstName"]').type('Bia')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get('input[type="email"]').type('biasc@gmail.com')
    cy.get('[name="open-text-area"]').type(longText, { delay: 5 })
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[name="firstName"]').type('Bia')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get('input[type="email"]').type('biasc@gmailcom')
    cy.get('[name="open-text-area"]').type('Campo ok!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo Telefone continua vazio quando adicionado letras', () => {
    cy.get('input[type="number"]')
      .type('abc')
      .should('not.have.value', 'abc')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[name="firstName"]').type('Bia')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get('input[type="email"]').type('biasc@gmail.com')
    cy.get('[for="phone-checkbox"]').click()
    cy.get('[name="open-text-area"]').type('Campo ok!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[name="firstName"]')
      .type('Bia')
      .should('have.value', 'Bia')
      .clear()
      .should('have.value', '')

    cy.get('[name="lastName"]')
      .type('Rodrigues')
      .should('have.value', 'Rodrigues')
      .clear()
      .should('have.value', '')

    cy.get('input[type="email"]')
      .type('biasc@gmail.com')
      .should('have.value', 'biasc@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('input[type="number"]')
      .type('47999656565')
      .should('have.value', '47999656565')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto YouTube por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .check()
      .should('be.checked')

    // Aqui ele usou uma outra funcao. Quis deixar a forma que eu pensei
    // para ficar mais clro pra mim.
    //.each(typeOfService => {
    // cy.wrap(typeOfService)
    // .check()
    // .should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .uncheck("phone")
      .should('not.be.checked')

    // Aqui ele usou a funcao .last, no codigo dele ficou
    // .last
    // .uncheck
    // .should
  })


  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[name="firstName"]').type('Bia')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get('input[type="email"]').type('biasc@gmail.com')
    cy.get('input[type="checkbox"]').check("phone")
    cy.get('[name="open-text-area"]').type('Campo ok!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('samplefile') //aqui seria o uso do alias
    cy.get('#file-upload')
      .selectFile('@samplefile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')    
      .click()

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')  
  })  

  it('testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')    
      .click()

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')  
  })   

})