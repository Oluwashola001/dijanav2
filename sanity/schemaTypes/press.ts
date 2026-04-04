import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'press',
  title: 'Press Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Database Name',
      type: 'string',
      initialValue: 'My Press Clippings',
      readOnly: true,
    }),
    defineField({
      name: 'composerArticles',
      title: 'Highlights as Composer',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Headline (English)', type: 'string' },
          { name: 'title_de', title: 'Headline (German)', type: 'string' },
          { name: 'source', title: 'Source (English)', type: 'string' },
          { name: 'source_de', title: 'Source (German)', type: 'string' },
          { name: 'content', title: 'Article Content (English)', type: 'array', of: [{ type: 'block' }] },
          { name: 'content_de', title: 'Article Content (German)', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'source' } }
      }],
      initialValue: [
        {
          title: "Munich Philharmonic performs works by Dijana Bošković",
          title_de: "Münchner Philharmoniker spielen Werke von Dijana Bošković",
          source: "Today Magazine, European Edition, 2024",
          source_de: "Today Magazine – Europäische Ausgabe, 2024",
          content: [{ _type: "block", children: [{ _type: "span", text: "Bošković's music combines expanded tonality with Balkan rhythmic energy and spiritual depth. Her works " }, { _type: "span", marks: ["em"], text: "For My Mother" }, { _type: "span", text: ", " }, { _type: "span", marks: ["em"], text: "Blurred Edges" }, { _type: "span", text: " and " }, { _type: "span", marks: ["em"], text: "Con Fretta" }, { _type: "span", text: " were met with standing ovations at the Munich Artists' House." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Boškovićs Musik verbindet erweiterte Tonalität mit rhythmischer Energie des Balkans und spiritueller Tiefe. Ihre Werke " }, { _type: "span", marks: ["em"], text: "For My Mother" }, { _type: "span", text: ", " }, { _type: "span", marks: ["em"], text: "Blurred Edges" }, { _type: "span", text: " und " }, { _type: "span", marks: ["em"], text: "Con Fretta" }, { _type: "span", text: " wurden im Münchner Künstlerhaus mit Standing Ovations gefeiert." }] }]
        },
        {
          title: "First Prize – International Composition Competition",
          title_de: "Erster Preis – Internationaler Kompositionswettbewerb",
          source: "Neue Musik Zeitung, 2017",
          source_de: "Neue Musik Zeitung, 2017",
          content: [{ _type: "block", children: [{ _type: "span", text: "Dijana Bošković received First Prize at the chor.com composition competition for her contemporary choral work, praised for clarity, expressiveness, and stylistic relevance." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Dijana Bošković erhielt den Ersten Preis beim chor.com-Kompositionswettbewerb. Die Jury würdigte insbesondere die Klarheit, Ausdruckskraft und stilistische Relevanz ihres zeitgenössischen Chorwerks." }] }]
        },
        {
          title: "Concerto for Strings – World Premiere (BEMUS Festival)",
          title_de: "Concerto for Strings – Uraufführung (BEMUS Festival)",
          source: "Dnevnik / Danas, Belgrade, 2009",
          source_de: "Dnevnik / Danas, Belgrad, 2009",
          content: [{ _type: "block", children: [{ _type: "span", text: "A work of powerful contrasts and vivid orchestral colors, inspired by folkloric techniques and the Russian string tradition, described as a \"musical firework\" with lasting artistic impact." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Ein Werk voller kraftvoller Kontraste und leuchtender orchestraler Farben, inspiriert von folkloristischen Spieltechniken und der russischen Streichtradition – beschrieben als „musikalisches Feuerwerk“ mit nachhaltiger künstlerischer Wirkung." }] }]
        },
        {
          title: "Contemporary Music Without Dogma",
          title_de: "Zeitgenössische Musik ohne Dogma",
          source: "Vorarlberger Nachrichten, 2014",
          source_de: "Vorarlberger Nachrichten, 2014",
          content: [{ _type: "block", children: [{ _type: "span", text: "Bošković's music demonstrates that contemporary composition can remain expressive, modern and accessible without resorting to strict atonality." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Boškovićs Musik zeigt, dass zeitgenössisches Komponieren expressiv, modern und zugleich zugänglich sein kann – ohne den Rückgriff auf strenge Atonalität." }] }]
        }
      ]
    }),
    defineField({
      name: 'flutistArticles',
      title: 'Highlights as Flutist',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Headline (English)', type: 'string' },
          { name: 'title_de', title: 'Headline (German)', type: 'string' },
          { name: 'source', title: 'Source (English)', type: 'string' },
          { name: 'source_de', title: 'Source (German)', type: 'string' },
          { name: 'content', title: 'Article Content (English)', type: 'array', of: [{ type: 'block' }] },
          { name: 'content_de', title: 'Article Content (German)', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'source' } }
      }],
      initialValue: [
        {
          title: "\"Technically flawless and deeply expressive\"",
          title_de: "„Technisch makellos und von tiefer Ausdruckskraft“",
          source: "Allgäuer Zeitung",
          source_de: "Allgäuer Zeitung",
          content: [{ _type: "block", children: [{ _type: "span", text: "Dijana Bošković impressed with a full, warm flute tone and absolute technical mastery, shaping even the most demanding passages with ease and musical intelligence." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Dijana Bošković überzeugt mit einem vollen, warmen Flötenton und absoluter technischer Souveränität. Selbst anspruchsvollste Passagen gestaltet sie mit Leichtigkeit und hoher musikalischer Intelligenz." }] }]
        },
        {
          title: "Debussy's Syrinx – A Moment of Pure Poetry",
          title_de: "Debussys Syrinx – ein Moment reiner Poesie",
          source: "AZ – Amnesty International Benefit Concert",
          source_de: "AZ – Benefizkonzert Amnesty International",
          content: [{ _type: "block", children: [{ _type: "span", text: "With seemingly endless breath control, Bošković shaped Debussy's melodic arches in the finest pianissimo, captivating the audience with subtle nuance and intensity." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Mit scheinbar grenzenloser Atemführung formt Bošković Debussys melodische Bögen bis ins feinste Pianissimo und fesselt das Publikum durch subtile Nuancierung und innere Spannung." }] }]
        },
        {
          title: "An Interpreter Who Thinks Like a Composer",
          title_de: "Eine Interpretin, die wie eine Komponistin denkt",
          source: "Süddeutsche Zeitung",
          source_de: "Süddeutsche Zeitung",
          content: [{ _type: "block", children: [{ _type: "span", text: "Already in classical repertoire, Bošković reveals a rare musical intelligence, shaping transitions and phrasing with compositional awareness and refined tonal control." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Bereits im klassischen Repertoire offenbart Bošković eine seltene musikalische Intelligenz. Übergänge und Phrasierungen gestaltet sie mit kompositorischem Bewusstsein und feiner klanglicher Kontrolle." }] }]
        },
        {
          title: "Powerful Duo Performances",
          title_de: "Kraftvolle Duo-Auftritte",
          source: "Allgäuer Zeitung",
          source_de: "Allgäuer Zeitung",
          content: [{ _type: "block", children: [{ _type: "span", text: "Whether in chamber music or solo repertoire, Bošković combines virtuosity with expressive depth, navigating stylistic contrasts effortlessly from Bach to Jolivet and Casella." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Ob in der Kammermusik oder im Solorepertoire – Bošković verbindet Virtuosität mit expressiver Tiefe und bewegt sich mühelos zwischen stilistischen Kontrasten von Bach bis Jolivet und Casella." }] }]
        },
        {
          title: "\"She can do everything on the flute\"",
          title_de: "„Sie kann auf der Flöte einfach alles“",
          source: "Allgäuer Zeitung",
          source_de: "Allgäuer Zeitung",
          content: [{ _type: "block", children: [{ _type: "span", text: "Fearless octave runs, precision articulation, and a distinctive, slightly roughened tone mark Bošković as a flutist of exceptional technical and musical authority." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Furchtlose Oktavläufe, präzise Artikulation und ein unverwechselbarer, leicht angerauter Ton zeichnen Bošković als Flötistin von außergewöhnlicher technischer und musikalischer Autorität aus." }] }]
        }
      ]
    }),
    defineField({
      name: 'presenceArticles',
      title: 'Performance & Artistic Presence',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Headline (English)', type: 'string' },
          { name: 'title_de', title: 'Headline (German)', type: 'string' },
          { name: 'source', title: 'Source (English)', type: 'string' },
          { name: 'source_de', title: 'Source (German)', type: 'string' },
          { name: 'content', title: 'Article Content (English)', type: 'array', of: [{ type: 'block' }] },
          { name: 'content_de', title: 'Article Content (German)', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'source' } }
      }],
      initialValue: [
        {
          title: "Ensemble Versus Vox – Contemporary Chamber Music at the Highest Level",
          title_de: "Ensemble Versus Vox – Zeitgenössische Kammermusik auf höchstem Niveau",
          source: "Neue Musikzeitung",
          source_de: "Neue Musikzeitung",
          content: [{ _type: "block", children: [{ _type: "span", text: "As founder and artistic force behind " }, { _type: "span", marks: ["em"], text: "Ensemble Versus Vox" }, { _type: "span", text: ", Bošković is praised equally as composer, flutist, and advocate for contemporary music." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Als Gründerin und künstlerische Impulsgeberin des " }, { _type: "span", marks: ["em"], text: "Ensemble Versus Vox" }, { _type: "span", text: " wird Bošković gleichermaßen als Komponistin, Flötistin und engagierte Vermittlerin zeitgenössischer Musik geschätzt." }] }]
        },
        {
          title: "Music That Bridges Cultures",
          title_de: "Musik, die Kulturen verbindet",
          source: "Danas, Belgrade",
          source_de: "Danas, Belgrad",
          content: [{ _type: "block", children: [{ _type: "span", text: "Bošković's performances connect musical traditions across borders, combining intensity, vitality, and lyrical openness into a uniquely communicative artistic language." }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Boškovićs Auftritte schlagen Brücken zwischen musikalischen Traditionen. Intensität, Vitalität und lyrische Offenheit verschmelzen zu einer einzigartig kommunikativen künstlerischen Sprache." }] }]
        }
      ]
    })
  ]
})