import SORRaw from './data/sets/SOR/SOR.json'
export type {Card, Aspect} from './src/cards'
import { mapCards } from './src/cards'

export const SOR = mapCards(SORRaw)