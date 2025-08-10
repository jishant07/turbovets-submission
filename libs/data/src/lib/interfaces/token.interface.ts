import { Request } from 'express'

export interface TokenUserData {

    userId: string
    userEmail: string
    name: string
    role: string
    permissions: TokenPermissions[]

}

export interface TokenPermissions{

    action: string
    resource: string
}

// Extend Express Request to include currentUser
export interface RequestWithCurrentUser extends Request {
  currentUser?: TokenUserData;
}