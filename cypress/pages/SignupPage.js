// class PascalCase { //classe com padrão PascalCase cada inicio de palavra com caixa alta
//    camelCase() { //função com padrão camelCase cada inicio caixa baixa, demais caixa alta

class SignupPage {

    go() {
        cy.visit('/')//acessa pagina principal do testes utilizando '/' pagina inicial, URL definada no cypress.json

        cy.get('a[href="/deliver"]').click() //localizador do botão com subfunção click->
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //checkpoint para garantir
    }
s
    fillForm(deliver) {
        //inserindo valores nos campos
        cy.get('input[name="fullName"]').type(deliver.name) 
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)
        
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click() //evento de clicar para buscar
        
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)
        
        //should para comparar os valores preenchidos automaticamente com valor da massa 
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)
        
        cy.contains('.delivery-method li', deliver.delivery_method).click() //localizador linha 26 metodo entega
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh) //anexa imagem linha 27
    }

    submit() {
        //constante criada para recber a frase, validando a msg de confimação do cadastro
        cy.get('form button[type="submit"]').click() // clica no botão cadastro
    } 

    modalContentShouldBe(expectedMessage) {
        cy.get('div[class="swal2-html-container"]') //chama a msg para validar
        .should('have.text', expectedMessage) //.should('have.text' para validar texto
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage) //verfica msg de CPF invalido
        cy.contains('.alert-error', expectedMessage).should('be.visible')//pq contem varios alert-erro no buscador os 7
    }

}

export default new SignupPage; // referencia a linha 01 de cadastro.spec.js
