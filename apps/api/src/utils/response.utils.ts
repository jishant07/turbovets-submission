import { Response } from 'express'
import { HttpStatus } from '@nestjs/common'

export const respond_ok = (res: Response, result: Record<string, unknown>) => {
	return res.status(HttpStatus.OK).json({success: true, ...result})
}

export const respond_failure = (res: Response, result: Record<string, unknown>, statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) => {
	return res.status(statusCode).json({success: false, ...result})
}