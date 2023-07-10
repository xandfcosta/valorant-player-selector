export interface Role {
  key?: string
  uuid: string
  displayName: string
  description: string
  displayIcon: string
  assetPath: string
}

export interface Ability {
  key?: string
  slot: string
  displayName: string
  description: string
  displayIcon: string
}

export interface Agent {
  uuid: string
  displayName: string
  description: string
  developerName: string
  characterTags: string[]
  displayIcon: string
  displayIconSmall: string
  bustPortrait: string
  fullPortrait: string
  fullPortraitV2: string
  killfeedPortrait: string
  background: string
  backgroundGradientColors: string[]
  assetPath: string
  isFullPortraitRightFacing: boolean
  isPlayableCharacter: boolean
  isAvailableForTest: boolean
  isBaseContent: boolean
  role: {
    uuid: string
    displayName: string
    description: string
    displayIcon: string
    assetPath: string
  }
  abilities: Ability[]
  voiceLine: {
    minDuration: number
    maxDuration: number
    mediaList: [
      {
        id: number
        wwise: string
        wave: string
      },
    ]
  }
}
