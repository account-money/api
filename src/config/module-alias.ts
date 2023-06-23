import { addAlias } from 'module-alias'
import { env } from './env'

import { resolve } from 'path'
addAlias('@', resolve(env.main))