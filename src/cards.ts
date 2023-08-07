
export type JSONCard = {
  "Set": string | null,
  "#": string | null,
  "Card Name": string | null,
  "Title": string | null,
  "Type": string | null,
  "Arena": string | null,
  "Unique": boolean | null,
  "Cost": number | null,
  "Aspect1": string | null,
  "Aspect2": string | null,
  "Power": number | null,
  "HP": number | null,
  "Trait1": string | null,
  "Trait2": string | null,
  "Trait3": string | null,
  "Trait4": string | null,
  "Front Text": string | null,
  "DoubleSided": boolean | null,
  "Back Text": string | null,
  "Artist": string | null,
  "Epic Action Text": string | null,
  "Image Url Front": string | null,
  "Image Url back": string | null,
  "Front Landscape": boolean | null,
  "Back Landscape": boolean | null,
  "Rarity": string | null,
  "Spoiler Source Url": string | null,
}

export type Aspect = "Heroism" | "Villainy" | "Agression" | "Cunning" | "Command" | "Vigilance"

export type Card = {
  id: string,
  set: string,
  number: string,
  name: string,
  title: string | null,
  cardType: string,
  rarity: string,
  arena: string | null,
  unique: boolean,
  cost: number | null,
  aspects: Aspect[],
  power: number | null,
  hp: number | null,
  traits: string[],
  frontText: string | null,
  doubleSided: boolean,
  backText: string | null,
  artist: string | null,
  image: {
    url: string | null,
    horizontal: boolean,
  },
  imageBackside?: {
    url: string | null,
    horizontal: boolean,
  },
  epicActionText: string | null,
  publishedAt: Date | null,
  spoilerSourceUrl: string | null,
}


export function mapCardJsonToCard(card: JSONCard): Card {
  const cardNumber = String(card["#"]).padStart(3, '0')
  const cardId = card["Set"]! + "-" + cardNumber
  return {
    id: cardId,
    set: card["Set"]!,
    number: cardNumber,
    name: card["Card Name"]!,
    title: card["Title"] || null,
    cardType: card["Type"]!,
    rarity: card["Rarity"]!,
    arena: card["Arena"] || null,
    unique: card["Unique"] || false,
    cost: card["Cost"] && parseInt(String(card["Cost"])) || null,
    aspects: [card["Aspect1"]!, card["Aspect2"]!].filter(aspect => aspect) as Aspect[],
    power: card["Power"] && parseInt(String(card["Power"])) || null,
    hp: card["HP"] && parseInt(String(card["HP"])) || null,
    traits: [card["Trait1"]!, card["Trait2"]!, card["Trait3"]!, card["Trait4"]!].filter(trait => trait) as string[],
    frontText: card["Front Text"] || null,
    doubleSided: card["DoubleSided"] || false,
    backText: card["Back Text"] || null,
    artist: card["Artist"] || null,
    image: {
      url: card["Image Url Front"] || null,
      horizontal: card["Front Landscape"] || false,
    },
    imageBackside: card["DoubleSided"] ? {
      url: card["Image Url back"] || null,
      horizontal: card["Back Landscape"] || false,
    } : undefined,
    epicActionText: card["Epic Action Text"] || null,
    publishedAt: card["Card Name"] ? new Date() : null,
    spoilerSourceUrl: card["Spoiler Source Url"] || null,
  }
}

export function mapCards(cards: JSONCard[]): Card[] {
  return cards.filter(c => c["Card Name"]!!).map(mapCardJsonToCard)
}