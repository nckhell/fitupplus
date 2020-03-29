//@flow
import * as R from 'ramda'

export const Path = ['name']

export const nameLens = R.lensPath(Path)
