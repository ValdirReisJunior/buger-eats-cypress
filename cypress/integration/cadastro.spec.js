import signup from '../pages/SignupPage' //importa da pasta cypress para pages, referencia arquivo SignupPage.js
import signupFactory from '../factories/SignupFactory.js' //importa da pasta cypress para pages, referencia arquivo SignupFactory.js
import SignupPage from '../pages/SignupPage'

describe('Cadastro', () => {

    //beforeEach(function () {
    //    cy.fixture('deliver').then((d) => {
    //        this.deliver = d
    //    })
    //})

    it('Usuário deve se tornar um entregador', function () { //implementação camino feliz

        var deliver = signupFactory.deliver()// criando vaiavel deliver, vindo da massa SinupFactory.js

        SignupPage.go()
        SignupPage.fillForm(deliver)// utilizando variavel deliver
        SignupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)
    })

    it('CPF Incorreto', function () { // implementação CPF inválido

        var deliver = signupFactory.deliver()// criando vaiavel deliver, vindo da massa SinupFactory.js

        deliver.cpf = '000000141aa'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Email incorreto', function () { // implementação email inválido

        var deliver = signupFactory.deliver()// criando vaiavel deliver, vindo da massa SinupFactory.js

        deliver.email = 'valdirjr.etec'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    it('Campos obrigatórios', function(){ //constant com arrey de dados
        SignupPage.go()
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('É necessário informar o nome')
        SignupPage.alertMessageShouldBe('É necessário informar o CPF')
        SignupPage.alertMessageShouldBe('É necessário informar o email')
        SignupPage.alertMessageShouldBe('É necessário informar o CEP')
        SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        SignupPage.alertMessageShouldBe('Selecione o método de entrega')
        SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    })
})