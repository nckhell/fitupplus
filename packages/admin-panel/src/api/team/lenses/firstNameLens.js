//@flow
import * as R from 'ramda'

export const Path = ['first_name']

export const firstNameLens = R.lensPath(Path)
