import { getAuth, signInWithEmailAndPassword, type Auth, type UserCredential } from 'firebase/auth'

export class AuthService {
  private static instance: AuthService
  private auth: Auth

  private constructor() {
    this.auth = getAuth()
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      console.log('Creating AuthService instance')
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public static async loginUser({ email, password }: { email: string; password: string }): Promise<UserCredential> {
    const auth = AuthService.getInstance().auth
    try {
      const response: UserCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('FILTERED RESPONSE', response)
      console.log('User logged in successfully')
    } catch (error) {
      console.error('Error logging in user:', error)
      throw error
    }
  }
}
