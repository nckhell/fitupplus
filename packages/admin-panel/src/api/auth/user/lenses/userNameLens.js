//@flow
import * as R from 'ramda'

export const Path = ['name']

export const userNameLens = R.lensPath(Path)
