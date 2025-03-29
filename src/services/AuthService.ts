import type { LoginDTO } from '@/data/dto/Login/LoginDTO'
import { setAxiosAuthorizationToken } from '@/lib/axios'
import { getAuth, signInWithEmailAndPassword, type Auth, type User, type UserCredential } from 'firebase/auth'

export class AuthService {
  private static instance: AuthService
  private auth: Auth

  private constructor() {
    this.auth = getAuth()
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public static async loginUser({ email, password }: LoginDTO): Promise<UserCredential> {
    const auth = AuthService.getInstance().auth

    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: UserCredential) => {
          resolve(userCredential)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  public static getAuth(): Auth {
    return AuthService.getInstance().auth
  }

  public static getCurrentUser(): User | null {
    const auth = AuthService.getInstance().auth
    return auth.currentUser
  }

  public static async logoutUser(): Promise<void> {
    const auth = AuthService.getInstance().auth
    try {
      await auth.signOut()
    } catch (error) {
      throw error
    }
  }
}
