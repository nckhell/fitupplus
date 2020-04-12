//@flow
import * as R from 'ramda'

export const Path = ['page']

export const pageLens = R.lensPath(Path)
