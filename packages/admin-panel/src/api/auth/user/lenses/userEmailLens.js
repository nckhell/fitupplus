//@flow
import R from 'ramda'

export const Path = ['data', 'email']

export const userEmailLens = R.lensPath(Path)
