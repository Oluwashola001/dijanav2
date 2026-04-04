import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'premiere',
  title: 'Selected Premieres (Table)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Database Name',
      type: 'string',
      initialValue: 'Premieres Table Data',
      readOnly: true,
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      description: 'Click "Add item" at the very bottom to add a new line to your table. You can drag rows to reorder them.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', title: 'Year', type: 'string' },
          { name: 'event', title: 'Event / Venue (English)', type: 'string' },
          { name: 'event_de', title: 'Event / Venue (German)', type: 'string' },
          { 
            name: 'work', 
            title: 'Work Performed (English)', 
            type: 'array', 
            of: [{ 
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              lists: [], // Disabled lists to keep table cells clean
              marks: { decorators: [{title: 'Italic', value: 'em'}, {title: 'Strong', value: 'strong'}] }
            }] 
          },
          { 
            name: 'work_de', 
            title: 'Work Performed (German)', 
            type: 'array', 
            of: [{ 
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              lists: [],
              marks: { decorators: [{title: 'Italic', value: 'em'}, {title: 'Strong', value: 'strong'}] }
            }] 
          },
        ],
        preview: { select: { title: 'event', subtitle: 'year' } }
      }],
      initialValue: [
         { 
           year: "2024", 
           event: "Munich Philharmonic, Künstlerhaus Munich", 
           event_de: "Münchner Philharmoniker · Künstlerhaus München", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Con Fretta"}, {_type:"span", text:" (string trio), "}, {_type:"span", marks:["em"], text:"Memories"}, {_type:"span", text:" (string quartet)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Memories"}, {_type:"span", text:" – Streichquartett"}]}]
         },
         { 
           year: "2024", 
           event: "Theater Erfurt, Large House", 
           event_de: "Licht und Schatten am Karsamstag · Theater Erfurt, Großes Haus", 
           work: [{_type:"block", children: [{_type:"span", text:"Light and Shadow for Holy Saturday"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Black and White"}, {_type:"span", text:" – Klavierduo"}]}]
         },
         { 
           year: "2024", 
           event: "Munich Philharmonic, German Embassy Beijing", 
           event_de: "Münchner Philharmoniker · Deutsche Botschaft Peking", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Con Fretta"}, {_type:"span", text:" (string trio)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Con Fretta"}, {_type:"span", text:" – Streichtrio"}]}]
         },
         { 
           year: "2019", 
           event: "BR-Klassik – Musik der Welt", 
           event_de: "Musik der Welt · BR Klassik", 
           work: [{_type:"block", children: [{_type:"span", text:"Music from Belgrade with composer Dijana Bošković"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", text:"Musik aus Belgrad mit Dijana Bošković"}]}]
         },
         { 
           year: "2018", 
           event: "Forum, University of Music and Theatre Hamburg", 
           event_de: "Hamburger Symphoniker · Forum Hochschule für Musik und Theater Hamburg", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"ONE"}, {_type:"span", text:" (large orchestra)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"ONE"}, {_type:"span", text:" – für großes Orchester"}]}]
         },
         { 
           year: "2017", 
           event: "Laeiszhalle, Small Hall, Hamburg", 
           event_de: "Laeiszhalle Hamburg · Kleiner Saal", 
           work: [{_type:"block", children: [{_type:"span", text:"Concert piece from "}, {_type:"span", marks:["em"], text:"TRANSIT"}, {_type:"span", text:" (mezzo-soprano and piano)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", text:"Konzertstück aus "}, {_type:"span", marks:["em"], text:"TRANSIT"}, {_type:"span", text:" – Mezzosopran & Klavier"}]}]
         },
         { 
           year: "2017", 
           event: "Benefit Concert Sternstunden, Munich Residence", 
           event_de: "Benefizkonzert Sternstunden · Allerheiligen-Hofkirche, München", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Between East and West"}, {_type:"span", text:" (flute and tape)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Between East and West"}, {_type:"span", text:" – Flöte & Tonband"}]}]
         },
         { 
           year: "2017", 
           event: "St. Reinoldi Church, Dortmund", 
           event_de: "St. Reinoldi-Kirche Dortmund · Liveübertragung Deutschlandfunk Kultur", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Dona Nobis Pacem Shanti"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Dona Nobis Pacem Shanti"}, {_type:"span", text:" – Gewinnerkomposition für gemischten Chor"}]}]
         },
         { 
           year: "2016", 
           event: "International Chamber Music Course, Austria", 
           event_de: "Internationaler Kammermusikkurs · Österreich", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Sundance"}, {_type:"span", text:" (piano trio)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Sonnentanz"}, {_type:"span", text:" – Klaviertrio"}]}]
         },
         { 
           year: "2016", 
           event: "Resonanzraum Hamburg", 
           event_de: "Resonanzraum Hamburg", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Lichtspiele"}, {_type:"span", text:" / "}, {_type:"span", marks:["em"], text:"Light Plays"}, {_type:"span", text:" (violin, cello, piano)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Lichtspiele"}, {_type:"span", text:" – Violine, Violoncello, Klavier"}]}]
         },
         { 
           year: "2016", 
           event: "ORF Funkhaus Vorarlberg – CD Release", 
           event_de: "ORF Funkhaus Vorarlberg – CD Release", 
           work: [{_type:"block", children: [{_type:"span", text:"Works by Dijana Bošković"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", text:"Werke von Dijana Bošković"}]}]
         },
         { 
           year: "2015", 
           event: "ORF Landesfunkhaus", 
           event_de: "Neue Musik im Gespräch · Ensemble plus · ORF Landesfunkhaus", 
           work: [{_type:"block", children: [{_type:"span", text:"Suite based on folk melodies"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", text:"Suite für Violine und Cello"}]}]
         },
         { 
           year: "2014", 
           event: "Altach Organ Soirée", 
           event_de: "Altacher Orgelsoirée", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Conversations with Death"}, {_type:"span", text:" (flute and organ)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Gespräche mit dem Tod"}, {_type:"span", text:" – Flöte und Orgel"}]}]
         },
         { 
           year: "2013", 
           event: "CD Release – Begegnungen / Encounters", 
           event_de: "CD-Veröffentlichung Cavalli Records · Bamberg", 
           work: [{_type:"block", children: [{_type:"span", text:"Chamber Music, Cavalli Records"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Begegnungen"}, {_type:"span", text:" / "}, {_type:"span", marks:["em"], text:"Encounters"}]}]
         },
         { 
           year: "2009", 
           event: "BEMUS International Music Festival, Belgrade", 
           event_de: "BEMUS International Music Festival · Belgrad", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Concerto for Strings"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Concerto for Strings"}, {_type:"span", text:", Konzert mit den St. Petersburger Solisten"}]}]
         },
         { 
           year: "2008", 
           event: "Carl Orff Hall, Gasteig, Munich", 
           event_de: "Carl-Orff-Saal · Gasteig München", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Divertimento"}, {_type:"span", text:" for strings"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Divertimento"}, {_type:"span", text:" für Streicher"}]}]
         },
         { 
           year: "2007", 
           event: "BEMUS International Music Festival, Belgrade", 
           event_de: "BEMUS International Music Festival · Belgrad", 
           work: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Versus Vox Integra"}, {_type:"span", text:" (sextet)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", marks:["em"], text:"Versus Vox Integra"}, {_type:"span", text:" - Sextett"}]}]
         },
         { 
           year: "2004", 
           event: "Max-Joseph Hall, Munich Residence", 
           event_de: "Max-Joseph-Saal · Münchner Residenz", 
           work: [{_type:"block", children: [{_type:"span", text:"2 Songs (mezzo-soprano and piano)"}]}], 
           work_de: [{_type:"block", children: [{_type:"span", text:"2 Songs – Mezzosopran & Klavier"}]}]
         }
      ]
    })
  ]
})