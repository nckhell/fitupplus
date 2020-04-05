//@flow
import * as R from 'ramda'

export const Path = ['last_name']

export const lastNameLens = R.lensPath(Path)
