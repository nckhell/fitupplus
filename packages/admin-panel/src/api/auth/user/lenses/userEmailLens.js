//@flow
import * as R from 'ramda'

export const Path = ['email']

export const userEmailLens = R.lensPath(Path)
