export interface Project {
  id: number;
  title: string;
  category: string; // The Year
  role: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  // 1. Center Base (Entrance)
  {
    id: 1,
    title: "Roots & Blossoms",
    category: "2014",
    role: "Arrangement & Flutes",
    description: "An extraordinary mixture of folk and classical music. A Sarabande of J.S. Bach meets ancient Serbian-Macedonian folk songs, enhancing time and space through unique arrangements.",
    image: "/works/fruit1.webp",
  },
  
  // 2. Mid Left
  {
    id: 2,
    title: "Songs Of Joy",
    category: "2005",
    role: "Flute & Band",
    description: "Modern jazz with sophisticated arrangements. Born from a chance meeting at the Gasteig in 1999, this project brings together classical discipline and jazz improvisation.",
    image: "/works/fruit2.webp",
  },

  // 3. Mid Right
  {
    id: 3,
    title: "Mouse & Monsters",
    category: "2010",
    role: "Musical Direction",
    description: "A mini opera for children exploring mythology. What can a mouse do against a Sphinx or Minotaur? A whimsical yet powerful musical narrative by Rudolf Herfurtner.",
    image: "/works/fruit3.webp",
  },

  // 4. Top Left
  {
    id: 4,
    title: "Inanna",
    category: "2003",
    role: "Flutes",
    description: "Listening cinema of the Sumerian census 'Inanna's Gang to the Underworld'. A haunting atmospheric piece featuring voices and avant-garde flute textures.",
    image: "/works/fruit4.webp",
  },

  // 5. Top Right
  {
    id: 5,
    title: "Encounters",
    category: "2013",
    role: "Artistic Director",
    description: "As artistic director of the Versus Vox Ensemble, Dijana presents works that defy convention. Classical and unusual instrumentations showcase a broad spectrum of sound combinations.",
    image: "/works/fruit5.webp",
  },
];