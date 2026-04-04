import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'News Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Database Name',
      type: 'string',
      initialValue: 'My News Articles',
      readOnly: true,
    }),
    defineField({
      name: 'articles',
      title: 'News Articles',
      description: 'Click "Add item" at the bottom to add a new article. You can drag to reorder them.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'category', title: 'Category (English)', type: 'string' },
          { name: 'category_de', title: 'Category (German)', type: 'string' },
          { name: 'title', title: 'Headline (English)', type: 'string' },
          { name: 'title_de', title: 'Headline (German)', type: 'string' },
          { name: 'source', title: 'Source / Subtitle', type: 'string' },
          { name: 'content', title: 'Article Content (English)', type: 'array', of: [{ type: 'block' }] },
          { name: 'content_de', title: 'Article Content (German)', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'category' } }
      }],
      initialValue: [
        {
          category: "Review of a Premiere", 
          category_de: "Rezension",
          title: "\"Rejected Love\": Munich Philharmonic Performs Works by Dijana Bošković",
          title_de: "Uraufführung „Verschmähte Liebe“: Münchner Philharmoniker spielen Werke von Dijana Bošković",
          source: "Today Magazine, European Edition 2024",
          content: [
            { 
              _type: "block", 
              children: [
                { _type: "span", text: "As part of a matinée at the Munich Artists' House (Münchner Künstlerhaus), works by Richard Strauss were presented alongside compositions by German-Serbian composer Dijana Bošković. The program included Strauss's Variations on " },
                { _type: "span", marks: ["em"], text: "The Girl Is Angry with Me, She Quarrels with Me" },
                { _type: "span", text: " for String Trio No. 109 and the String Quartet in A major, Op. 2, complemented by Bošković's recent works from 2024: " },
                { _type: "span", marks: ["em"], text: "For My Mother" },
                { _type: "span", text: " and " },
                { _type: "span", marks: ["em"], text: "Bez Kontura" },
                { _type: "span", text: " for string quartet, as well as " },
                { _type: "span", marks: ["em"], text: "Con Fretta" },
                { _type: "span", text: " for string trio." }
              ] 
            },
            { 
              _type: "block", 
              children: [{ _type: "span", text: "Born in Belgrade in 1968, Dijana Bošković studied flute and composition in her hometown before continuing her education in Munich and Hamburg. Her music unfolds within an expanded tonal framework and engages deeply with both spiritual and socio-political themes. A defining characteristic of her work is the synthesis of diverse musical influences—traditional folk music, jazz, and contemporary avant-garde—into a highly personal and distinctive compositional voice." }] 
            },
            { 
              _type: "block", 
              children: [
                { _type: "span", text: "The point of departure for her string quartet is the centuries-old Kosovo lament " },
                { _type: "span", marks: ["em"], text: "Zaspo Janko" },
                { _type: "span", text: ", traditionally sung at funerals. While the source material carries an archaic intensity, the first movement is driven by powerful, rhythmically charged Balkan influences. In the second movement, these traditional references are deliberately loosened. \"Fixed stylistic conventions are dissolved,\" Bošković explains, \"and replaced by a freer, more open approach to rhythm and harmony.\" A continuous 3/4 ostinato pulse is constantly disrupted and transformed." }
              ] 
            },
            { 
              _type: "block", 
              children: [
                { _type: "span", text: "With " },
                { _type: "span", marks: ["em"], text: "Con Fretta" },
                { _type: "span", text: ", Bošković turns toward existential questions of our time. She describes the piece as a musical reflection on the disintegration of social and artistic structures, on disorientation and unrest in the early 21st century. The response, she suggests, lies in turning inward—returning to one's own origins. This perspective also connects " },
                { _type: "span", marks: ["em"], text: "Con Fretta" },
                { _type: "span", text: " with her new string quartet." }
              ] 
            },
            { 
              _type: "block", 
              children: [{ _type: "span", text: "The audience at the Munich Artists' House responded with great enthusiasm. The Munich Philharmonic Quartet and the composer were greeted with standing ovations, and Dijana Bošković's works were met with sustained and passionate applause in the historic venue of the Allotria Art Association, founded in 1873." }] 
            }
          ],
          content_de: [
            { 
              _type: "block", 
              children: [{ _type: "span", text: "Im Rahmen einer Matinée im Münchner Künstlerhaus präsentierten die Münchner Philharmoniker Werke von Richard Strauss neben aktuellen Kompositionen der deutsch- serbischen Komponistin Dijana Bošković. Die programmatische Gegenüberstellung spannte einen weiten Bogen zwischen spätromantischer Ausdruckskunst und zeitgenössischer Klangsprache." }] 
            },
            { 
              _type: "block", 
              children: [
                { _type: "span", text: "Neben Strauss’ Variationen über " },
                { _type: "span", marks: ["em"], text: "„Das Dirndl is harb auf mi“" },
                { _type: "span", text: " für Streichtrio Nr. 109 sowie dem Streichquartett A-Dur op. 2 erklangen Boškovićs neueste Werke aus dem Jahr 2024: " },
                { _type: "span", marks: ["em"], text: "Für meine Mutter" },
                { _type: "span", text: " und " },
                { _type: "span", marks: ["em"], text: "Konturlos" },
                { _type: "span", text: " für Streichquartett sowie das Streichtrio " },
                { _type: "span", marks: ["em"], text: "Con Fretta" },
                { _type: "span", text: "." }
              ] 
            },
            { 
              _type: "block", 
              children: [{ _type: "span", text: "Bošković, 1968 in Belgrad geboren, studierte zunächst Flöte und Komposition in ihrer Heimatstadt, bevor sie ihre Ausbildung in München und Hamburg fortsetzte. Ihr kompositorisches Denken bewegt sich innerhalb eines erweiterten Tonsystems und ist geprägt von intensiver Auseinandersetzung mit spirituellen sowie sozial-politischen Fragestellungen. Charakteristisch für ihr Werk ist die organische Verschmelzung unterschiedlicher musikalischer Einflüsse – von zeitgenössischer Avantgarde über Jazz bis hin zur ursprünglichen Volksmusik – zu einer eigenständigen, unverkennbaren Klangsprache." }] 
            },
            { 
              _type: "block", 
              children: [
                { _type: "span", text: "Ausgangspunkt ihres Streichquartetts bildet die jahrhundertealte kosovarische Totenklage " },
                { _type: "span", marks: ["em"], text: "Zaspo Janko" },
                { _type: "span", text: ", die traditionell bei Begräbnissen gesungen wird. Während das thematische Material eine archaische Wucht entfaltet, ist der erste Satz von energiegeladenen, rhythmisch markanten Balkan-Einflüssen durchzogen. Im zweiten Satz werden diese Referenzen bewusst geöffnet und transformiert. „Feste stilistische Konventionen lösen sich auf und werden durch einen freieren, offeneren Umgang mit Rhythmus und Harmonie ersetzt.“ — Dijana Bošković" }
              ] 
            },
            { 
              _type: "block", 
              children: [
                { _type: "span", text: "Ein durchgehender 3/4-Ostinato-Puls wird kontinuierlich gebrochen, verschoben und neu kontextualisiert. Mit " },
                { _type: "span", marks: ["em"], text: "Con Fretta" },
                { _type: "span", text: " richtet Bošković den Blick auf existenzielle Fragen der Gegenwart. Das Werk versteht sich als musikalische Reflexion über den Zerfall sozialer und künstlerischer Strukturen, über Unruhe, Beschleunigung und Orientierungslosigkeit im frühen 21. Jahrhundert. Die Antwort, so Bošković, liege im Innehalten – in der Rückbesinnung auf die eigene Lebenskraft, auf die Quelle des Lebens." }
              ] 
            },
            { 
              _type: "block", 
              children: [{ _type: "span", text: "Das Publikum im Münchner Künstlerhaus reagierte mit großer Begeisterung. Das Streichquartett der Münchner Philharmoniker sowie die anwesende Komponistin wurden mit Standing Ovations gefeiert. Anhaltender Applaus erfüllte die historische Spielstätte des 1873 gegründeten Kunstvereins Allotria." }] 
            }
          ]
        },
        {
          category: "New Work 2025", 
          category_de: "Neues Werk 2025",
          title: "Media Vita – Ātman Aeternus", 
          title_de: "Media Vita – Ātman Aeternus",
          source: "A contemplation inspired by \"Media Vita in Morte sumus\" and Vedic wisdom",
          content: [{ _type: "block", children: [{ _type: "span", text: "For 8-part vocal ensemble (SSATTTBB) and 2 horns, or 2 natural horns in B basso & B alto (French instruments, c. 1820)" }] }],
          content_de: [{ _type: "block", children: [{ _type: "span", text: "Für 8-stimmiges Vokalensemble (SSATTTBB) und 2 Hörner oder 2 Naturhörner in B basso & B alto (französische Instrumente, ca. 1820)" }] }]
        }
      ]
    })
  ]
})