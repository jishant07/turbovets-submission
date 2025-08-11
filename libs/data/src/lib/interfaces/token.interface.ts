import { Request } from 'express'

export interface TokenUserData {

    userId: string
    userEmail: string
    name: string
    role: string
    organisationId: string | null
    permissions: string[]

}

// Extend Express Request to include currentUser
export interface RequestWithCurrentUser extends Request {
  currentUser?: TokenUserData;
}