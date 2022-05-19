export type Project = PersonalProject | CollaborativeProject

export interface ProjectBase {
  owner: string
  name: string
  remarks?: string
  description?: string
  topics?: string[]
  url: string
  createdAt: string
  updatedAt: string
}

export interface PersonalProject extends ProjectBase {
  owner: 'andrewkolos' // My GitHub username.
}

export interface CollaborativeProject extends ProjectBase {
  numberOfPrsOpenedByMe: number
}
