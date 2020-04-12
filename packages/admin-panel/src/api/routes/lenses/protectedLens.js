//@flow
import * as R from 'ramda'

export const Path = ['protected']

export const protectedLens = R.lensPath(Path)
