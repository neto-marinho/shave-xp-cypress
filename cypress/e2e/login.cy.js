

import loginPage from '../support/pages/login'
// import header from '../support/components/header'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submeto o formulário', () => {        

        it('deve logar com sucesso', ()=> {
            const user = {
                name: 'Marinho',
                email: 'marinho_s@gmail.com',
                password: 'Teste123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', ()=> {
            const user = {
                name: 'Marinho',
                email: 'marinho_s@gmail.com',
                password: '123Teste'
            }
    
            loginPage.submit(user.email, user.password)    
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'    
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', ()=> {
            const user = {
                name: 'Marinho',
                email: 'marinho_s@globo.com',
                password: 'Teste123'
            }
    
            loginPage.submit(user.email, user.password)    
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'    
            loginPage.noticeShouldBe(message)

        })   

        it('campos obrigatórios', ()=> {
            loginPage.submit()
            loginPage.requiredField('E-mail é obrigatório', 'Senha é obrigatória')
        })
    })

    context('senha muito curta', ()=> {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p)=> {
            it(`não deve logar com a senha: ${p}`, ()=> {
                loginPage.submit('marinho_s@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', ()=> {

        const emails = [
            'marinho$gmail.com',
            'marinho.com.br',
            '@hotmail.com',
            '@',
            'marinho@',
            '123456',
            '!@#$%',
            'xpto123'
        ]

        emails.forEach((e)=> {
            it(`não deve logar com o email: ${e}`, ()=> {
                loginPage.submit(e, "Teste123")
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })
})