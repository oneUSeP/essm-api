'use strict'
const { HttpException } = use('node-exceptions')
const AuthOperation = use('App/Operations/AuthOperation')

const HrEmployee = use('App/Models/HrEmployee')

class AuthController {
  /**
   * POST /auth/access-token
   * @param request
   * @param response
   */
  async accessToken ({auth, request, response}) {
    let op = new AuthOperation()
    op.accountID = request.input('accountId')
    op.accountPassword = request.input('accountPass')

    let user = await op.authenticate()

    if (!user) {
      let error = op.getFirstError()

      throw new HttpException(error.message, error.code)
    }

    let { token } = await auth.generate(user)

    response.send({ data: { user, token: token} })
  }
}

module.exports = AuthController
