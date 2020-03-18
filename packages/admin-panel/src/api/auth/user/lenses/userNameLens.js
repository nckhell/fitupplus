//@flow
import R from 'ramda'

export const Path = ['data', 'name']

export const userNameLens = R.lensPath(Path)
