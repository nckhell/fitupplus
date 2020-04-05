//@flow
import * as R from 'ramda'

export const Path = ['order']

export const orderLens = R.lensPath(Path)
