var classHistory = function(power)
{
  var ch = {"Barbarian":
  [
    "My devotion to my people lifted me in battle, making me powerful and dangerous.",
    "The spirits of my ancestors called on me to carry out a great task.",
    "I lost control in battle one day, and it was as if something else was manipulating my body, " +
    "forcing it to kill every foe I could reach.",
    "I went on a spiritual journey to find myself and instead found a spirit animal to guide, protect, " +
    "and inspire me.",
    "I was struck by lightning and lived. Afterward, I found a new strength within me that let me "+
    "push beyond my limitations.",
    "My anger needed to be channeled into battle, or I risked becoming an indiscriminate killer. ",
  ],
  "Bard":
  [
    "I awakened my latent bardic abilities through trial and error.",
    "I was a gifted performer and attracted the attention of a master bard who schooled me in the "+
    "old techniques.",
    "I joined a loose society of scholars and orators to learn new techniques of performance and "+
    "magic.",
    "I felt a calling to recount the deeds of champions and heroes, to bring them alive in song and "+
    "story.",
    "I joined one of the great colleges to learn old lore, the secrets of magic, and the art of "+
    "performance.",
    "I picked up a musical instrument one day and instantly discovered that I could play it. ",
  ],
  "Cleric":
  [
    "A supernatural being in service to the gods called me to become a divine agent in the world.",
    "I saw the injustice and horror in the world and felt moved to take a stand against them.",
    "My god gave me an unmistakable sign. I dropped everything to serve the divine.",
    "Although I was always devout, it wasn’t until I completed a pilgrimage that I knew my true " +
    "calling.",
    "I used to serve in my religion’s bureaucracy but found I needed to work in the world, to bring "+
    "the message of my faith to the darkest corners of the land.",
    "I realize that my god works through me, and I do as commanded, even though I don’t know "+
    "why I was chosen to serve. ",
  ],

  "Druid":
  [
    "I saw too much devastation in the wild places, too much of nature’s splendor ruined by the",
    "despoilers. I joined a circle of druids to fight back against the enemies of nature.",
    "I found a place among a group of druids after I fled a catastrophe.",
    "I have always had an affinity for animals, so I explored my talent to see how I could best use "+
    "it.",
    "I befriended a druid and was moved by druidic teachings. I decided to follow my friend’s "+
    "guidance and give something back to the world.",
    "While I was growing up, I saw spirits all around me — entities no one else could perceive. I "+
    "sought out the druids to help me understand the visions and communicate with these beings.",
    "I have always felt disgust for creatures of unnatural origin. For this reason, I immersed "+
    "myself in the study of the druidic mysteries and became a champion of the natural order. ",
  ],
  "Fighter":
  [
    "I wanted to hone my combat skills, and so I joined a war college.",
    "I squired for a knight who taught me how to fight, care for a steed, and conduct myself with "+
    "honor. I decided to take up that path for myself.",
    "Horrible monsters descended on my community, killing someone I loved. I took up arms to "+
    "destroy those creatures and others of a similar nature.",
    "I joined the army and learned how to fight as part of a group.",
    "I grew up fighting, and I refined my talents by defending myself against people who crossed "+
    "me.",
    "I could always pick up just about any weapon and know how to use it effectively.",
  ],
  "Monk":
  [
    "I was chosen to study at a secluded monastery. There, I was taught the fundamental "+
    "techniques required to eventually master a tradition.",
    "I sought instruction to gain a deeper understanding of existence and my place in the world.",
    "I stumbled into a portal to the Shadowfell and took refuge in a strange monastery, where I "+
    "learned how to defend myself against the forces of darkness.",
    "I was overwhelmed with grief after losing someone close to me, and I sought the advice of "+
    "philosophers to help me cope with my loss.",
    "I could feel that a special sort of power lay within me, so I sought out those who could help "+
    "me call it forth and master it.",
    "I was wild and undisciplined as a youngster, but then I realized the error of my ways. I "+
    "applied to a monastery and became a monk as a way to live a life of discipline. ",
  ],
  "Paladin":
  [
    "A fantastical being appeared before me and called on me to undertake a holy quest.",
    "One of my ancestors left a holy quest unfulfilled, so I intend to finish that work.",
    "The world is a dark and terrible place. I decided to serve as a beacon of light shining out "+
    "against the gathering shadows.",
    "I served as a paladin’s squire, learning all I needed to swear my own sacred oath.",
    "Evil must be opposed on all fronts. I feel compelled to seek out wickedness and purge it from "+
    "the world.",
    "Becoming a paladin was a natural consequence of my unwavering faith. In taking my vows, I "+
    "became the holy sword of my religion. ",
  ],
  "Ranger":
  [
    "I found purpose while I honed my hunting skills by bringing down dangerous animals at the "+
    "edge of civilization.",
    "I always had a way with animals, able to calm them with a soothing word and a touch.",
    "I suffer from terrible wanderlust, so being a ranger gave me a reason not to remain in one "+
    "place for too long.",
    "I have seen what happens when the monsters come out from the dark. I took it upon myself",
    "to become the first line of defense against the evils that lie beyond civilization’s borders.",
    "I met a grizzled ranger who taught me woodcraft and the secrets of the wild lands.",
    "I served in an army, learning the precepts of my profession while blazing trails and scouting "+
    "enemy encampments. ",
  ],
  "Rogue":[
    "I’ve always been nimble and quick of wit, so I decided to use those talents to help me make "+
    "my way in the world.",
    "An assassin or a thief wronged me, so I focused my training on mastering the skills of my "+
    "enemy to better combat foes of that sort.",
    "An experienced rogue saw something in me and taught me several useful tricks.",
    "I decided to turn my natural lucky streak into the basis of a career, though I still realize that "+
    "improving my skills is essential.",
    "I took up with a group of ruffians who showed me how to get what I want through sneakiness "+
    "rather than direct confrontation.",
    "I’m a sucker for a shiny bauble or a sack of coins, as long as I can get my hands on it without "+
    "risking life and limb. ",
  ],
  "Sorcerer":
  [
    "When I was born, all the water in the house froze solid, the milk spoiled, or all the iron turned " +
    "to copper. My family is convinced that this event was a harbinger of stranger things to come "+
    "for me.",
    "I suffered a terrible emotional or physical strain, which brought forth my latent magical "+
    "power. I have fought to control it ever since.",
    "My immediate family never spoke of my ancestors, and when I asked, they would change "+
    "the subject. It wasn’t until I started displaying strange talents that the full truth of my heritage "+
    "came out.",
    "When a monster threatened one of my friends, I became filled with anxiety. I lashed out "+
    "instinctively and blasted the wretched thing with a force that came from within me.",
    "Sensing something special in me, a stranger taught me how to control my gift.",
    "After I escaped from a magical conflagration, I realized that though I was unharmed, I was "+
    "not unchanged. I began to exhibit unusual abilities that I am just beginning to understand. ",
  ],
  "Warlock":
  [
    "While wandering around in a forbidden place, I encountered an otherworldly being that "+
    "offered to enter into a pact with me.",
    "I was examining a strange tome I found in an abandoned library when the entity that would "+
    "become my patron suddenly appeared before me.",
    "I stumbled into the clutches of my patron after I accidentally stepped through a magical "+
    "doorway.",
    "When I was faced with a terrible crisis, I prayed to any being who would listen, and the "+
    "creature that answered became my patron.",
    "My future patron visited me in my dreams and offered great power in exchange for my "+
    "service.",
    "One of my ancestors had a pact with my patron, so that entity was determined to bind me to "+
    "the same agreement. ",
  ],
  "Wizard":
  [
    "An old wizard chose me from among several candidates to serve an apprenticeship. ",
    "When I became lost in a forest, a hedge wizard found me, took me in, and taught me the "+
    "rudiments of magic.",
    "I grew up listening to tales of great wizards and knew I wanted to follow their path. I strove to "+
    "be accepted at an academy of magic and succeeded.",
    "One of my relatives was an accomplished wizard who decided I was smart enough to learn "+
    "the craft.",
    "While exploring an old tomb, library, or temple, I found a spellbook. I was immediately driven "+
    "to learn all I could about becoming a wizard.",
    "I was a prodigy who demonstrated mastery of the arcane arts at an early age. When I "+
    "became old enough to set out on my own, I did so to learn more magic and expand my "+
    "power. ",
  ],
};
  return(ch[power][Math.floor(Math.random()*ch[power].length)]);
}

var classQuirks = function (power)
{
  var classSets =
  {"Barbarian" :[
      {"title": "Personal Totem", "choices":[
      "A tuft of fur from a solitary wolfthat you befriended "+
      "during a hunt",
      "Three eagle feathers given to you by a wise shaman,"+
      "who told you they would play a role in determining "+
      "your fate",
      "A necklace made from the claws of a young cave "+
      "bear that you slew singlehandedly as a child",
      "A small leather pouch holding three stones that "+
      "represent your ancestors",
      "A few small bones from the first beast you killed,"+
      "tied together with colored wool",
      "An egg-sized stone in the shape ofyour spirit animal "+
      "that appeared one day in your belt pouch",
    ]},
    {"title":"Tattoo", "choices":[
      "The wings of an eagle are spread wide across your "+
      "upper back.",
      "Etched on the backs ofyour hands are the paws of "+
      "a cave bear.",
      "The symbols of your clan are displayed in viny patterns "+
      "along your arms.",
      "The antlers of an elk are inked across your back.",
      "Images ofyour spirit animal are tattooed along "+
      "your weapon arm and hand.",
      "The eyes of a wolfare marked on your back to help "+
      "you see and ward off evil spirits.",
    ]},
    {"title":"Superstition", "choices":[
      "lf you disturb the bones ofthe dead, you inherit all "+
      "the troubles that plagued them in life.",
      "Never trust a wizard. They’re all devils in disguise,"+
      "especially the friendly ones.",
      "Dwarves have lost their spirits, and are almost like "+
      "the undead. That's why they live underground.",
      "Magical things bring trouble. Never sleep with a "+
      "magic object within ten feet of you.",
      "When you walk through a graveyard, be sure to "+
      "wear silver, or a ghost might jump into your body.",
      "lf an elf looks you in the eyes, she’s trying to read "+
      "your thoughts.",
    ]},
  ],
  "Bard": [
    {"title":"Defining Work" , "choices":[
      "“The Three Flambinis,” a ribald song concerning "+
      "mistaken identities and unfettered desire.",
      "“Waltz: of the Myconids,” an upbeat tune that children "+
      "in particular enjoy.",
      "“Asmodeus's Golden Arse,” a dramatic poem " +
      "you claim was inspired by your personal visit to "+
      "Avernus.",
      "“The Pirates of Luskan,” your firsthand account of "+
      "being kidnapped by sea reavers as a child.",
      "“A Hoop, Two Pigeons,” and a Hell Hound,” a subtle "+
      "parody of an incompetent noble",
      "6 “A Fool in the Abyss,” a comedic poem about a "+
      "jester's travels among demons",
    ]},
    {"title":"Instrument" , "choices":[
      "A masterfully crafted halfling fiddle",
      "A mithral horn made by elves",
      "A zither made with drow spider silk",
      "An orcish drum",
      "A wooden bullywug croak box",
      "A tinker’s harp ofgnomish design",
    ]},
    {"title": "Embarrassment", "choices":[
      "The time when your comedic song, “Big Tom's "+
      "Hijinks”—which, by the way, you thought was brilliant—"+
      "did not go over well with Big Tom",
      "The matinee performance when a circus's owlbear "+
      "got loose and terrorized the crowd",
      "When your opening song was your enthusiastic "+
      "but universally hated rendition of “Song of the "+
      "Froghemoth”",
      "The first and last public performance of “Mirt, Man "+
      "about Town”",
      "The time on stage when your wig caught fire and "+
      "you threw it down——which set fire to the stage",
      "When you sat on your lute by mistake during the "+
      "final stanza of “Starlight Serenade”",
    ]},
  ],
  "Cleric": [
    {"title": "Temple", "choices":[
      "Your temple is said to be the oldest surviving structure "+
      "built to honor your god.",
      "Acolytes of several like—minded deities all received "+
      "instruction together in your temple.",
      "You come from a temple famed for the brewery it "+
      "operates. Some say you smell like one of its ales.",
      "Your temple is a fortress and a proving ground that "+
      "trains warrior-priests.",
      "Yourtemple is a peaceful, humble place, filled with "+
      "vegetable gardens and simple priests.",
      "You served in a temple in the Outer Planes.",
    ]},
    {"title": "Keepsake", "choices":[
      "The finger bone of a saint",
      "A metal-bound book that tells how to hunt and destroy " +
      "infernal creatures",
      "A pig’s whistle that reminds you ofyour humble "+
      "and beloved mentor",
      "A braid of hair woven from the tail of a unicorn",
      "A scroll that describes how best to rid the world of "+
      "necromancers",
      "A runestone said to be blessed by your god",
    ]},
    {"title": "Secret", "choices":[
      "An imp offers you counsel. You try to ignore the "+
      "creature, but sometimes its advice is helpful.",
      "You believe that, in the final analysis, the gods are "+
      "nothing more than ultrapowerful mortal creatures.",
      "You acknowledge the power of the gods, but you "+
      "think that most events are dictated by pure chance.",
      "Even though you can work divine magic, you have "+
      "never truly felt the presence of a divine essence "+
      "within yourself.",
      "You are plagued by nightmares that you believe are "+
      "sent by your god as punishment for some unknown "+
      "transgression.",
      "In times of despair, you feel that you are but a plaything "+
      "of the gods, and you resent their remoteness.",
    ]},
  ],
  "Druid": [
    {"title": "Treasured Item", "choices":[
      "A twig from the meeting tree that stands in the "+
      "center of your village",
      "A vial of water from the source of a sacred river",
      "Special herbs tied together in a bundle",
      "A small bronze bowl engraved with animal images",
      "A rattle made from a dried gourd and holly berries",
      "A miniature golden sickle handed down to you by "+
      "your mentor",
    ]},
    {"title":"Guiding Aspect" , "choices":[
      "Yew trees remind you of renewing your mind and "+
      "spirit, letting the old die and the new spring forth.",
      "Oak trees represent strength and vitality. Meditating "+
      "under an oak fills your body and mind with "+
      "resolve and fortitude.",
      "The river’s endless flow reminds you ofthe great "+
      "span ofthe world. You seek to act with the longterm "+
      "interests of nature in mind.",
      "The sea is a constant, churning cauldron of power "+
      "and chaos. It reminds you that accepting change is "+
      "necessary to sustain yourselfin the world.",
      "The birds in the sky are evidence that even the "+
      "smallest creatures can survive if they remain above "+
      "the fray.",
      "As demonstrated by the actions of the wolf, an "+
      "individual’s strength is nothing compared to the "+
      "power ofthe pack.",
    ]},
    {"title": "Mentor" , "choices":[
      "Your mentor was a wise treant who taught you to "+
      "think in terms of years and decades rather than "+
      "days or months.",
      "You were tutored by a dryad who watched over "+
      "a slumbering portal to the Abyss. During your "+
      "training, you were tasked with watching for hidden "+
      "threats to the world.",
      "Your tutor always interacted with you in the form of "+
      "a falcon. You never saw the tutor’s humanoid form.",
      "You were one of several youngsters who were "+
      "mentored by an old druid, until one of your fellow "+
      "pupils betrayed your group and killed your master.",
      "Your mentor has appeared to you only in visions."+
      "You have yet to meet this person, and you are not "+
      "sure such a person exists in mortal form.",
      "Your mentor was a werebear who taught you to "+
      "treat all living things with equal regard.",
    ]},
  ],
  "Fighter": [
    {"title": "Heraldic Sign", "choices":[
      "A rampant golden dragon on a green field, representing "+
      "valor and a quest for wealth",
      "The fist of a storm giant clutching lightning before "+
      "a storm cloud, symbolizing wrath and power",
      "Crossed greatswords in front of a castle gate, signifying "+
      "the defense of a city or kingdom",
      "A skull with a dagger through it, representing the "+
      "doom you bring to your enemies",
      "A phoenix in a ring offire, an expression of an indomitable "+
      "spirit",
      "Three drops ofblood beneath a horizontal sword "+
      "blade on a black background, symbolizing three "+
      "foes you have sworn to kill",
    ]},
    {"title":"Instructor" , "choices":[
      "Gladiator. Your instructor was a slave who fought "+
      "for freedom in the arena, or one who willingly "+
      "chose the gladiator’s life to earn money and fame.",
      "Military. Your trainer served with a group of soldiers "+
      "and knows much about working as a team.",
      "City Watch. Crowd control and peacekeeping are "+
      "your instructor’s specialties.",
      "Tribal Warrior. Your instructor grew up in a tribe,"+
      "where fighting for one's life was practically an "+
      "everyday occurrence.",
      "Street Fighter. Your trainer excels at urban combat,"+
      "combining close-quarters work with silence and "+
      "efficiency.",
      "Weapon Master. Your mentor helped you to become "+
      "one with your chosen weapon, by imparting "+
      "highly specialized knowledge of how to wield it "+
      "most effectively.",
    ]},
    {"title": "Signature Style", "choices":[
      "Elegant. You move with precise grace and total "+
      "control, never using more energy than you need.",
      "Brutal. Your attacks rain down like hammer blows,"+
      "meant to splinter bone or send blood flying.",
      "Cunning. You dart in to attack at just the right moment "+
      "and use small-scale tactics to tilt the odds in "+
      "your favor.",
      "Effortless. You rarely perspire or display anything "+
      "other than a stoic expression in battle.",
      "Energetic. You sing and laugh during combat as "+
      "your spirit soars. You are happiest when you have a "+
      "foe in front of you and a weapon in hand.",
      "Sinister. You scowl and sneer while fighting, and "+
      "you enjoy mocking your foes as you defeat them.",
    ]},
  ],
  "Monk": [
     {"title": "Monastry", "choices":[
      "Your monastery is carved out of a mountainside,"+
      "where it looms over a treacherous pass.",
      "Your monastery is high in the branches of an immense "+
      "tree in the Feywild.",
      "Your monastery was founded long ago by a cloud "+
      "giant and is inside a cloud castle that can be "+
      "reached only by flying.",
      "Your monastery is built beside a volcanic system "+
      "of hot springs, geysers, and sulfur pools. You regularly "+
      "received visits from azer traders.",
      "Your monastery was founded by gnomes and is an "+
      "underground labyrinth oftunnels and rooms.",
      "Your monastery was carved from an iceberg in the "+
      "frozen reaches of the world.",
    ]},
    {"title":"Monastic Icon" , "choices":[
      "Monkey. Quick reflexes and the ability to travel "+
      "through the treetops are two ofthe reasons why "+
      "your order admires the monkey.",
      "Dragon Turtle. The monks of your seaside monastery "+
      "venerate the dragon turtle, reciting ancient "+
      "prayers and offering garlands offlowers to honor "+
      "this living spirit of the sea.",
      "Ki-rin. Your monastery sees its main purpose as "+
      "watching over and protecting the land in the manner "+
      "of the ki-rin.",
      "Owlbear. The monks ofyour monastery revere a "+
      "family of owlbears and have coexisted with them "+
      "for generations.",
      "Hydra. Your order singles out the hydra for its ability "+
      "to unleash several attacks simultaneously.",
      "Dragon. A dragon once laired within your monastery."+
      "Its influence remains long after its departure.",
    ]},
    {"title": "Master" , "choices":[
      "Your master was a tyrant whom you had to defeat "+
      "in single combat to complete your instruction.",
      "Your master was kindly and taught you to pursue "+
      "the cause of peace.",
      "Your master was merciless in pushing you to your "+
      "limits. You nearly lost an eye during one especially "+
      "brutal practice session.",
      "Your master seemed goodhearted while tutoring " +
      "you, but betrayed your monastery in the end.",
      "Your master was cold and distant. You suspect that "+
      "the two of you might be related.",
      "Your master was kind and generous, never critical "+
      "of your progress. Nevertheless, you feel you never "+
      "fully lived up to the expectations placed on you.",
    ]},
  ],
  "Paladin": [
    {"title": "Personal Goal", "choices":[
      "Peace. You fight so that future generations will not "+
      "have to.",
      "Revenge. Your oath is the vehicle through which "+
      "you will right an ancient wrong.",
      "Duty. You will live up to what you have sworn to do, "+
      "or die trying.",
      "Leadership. You will win a great battle that bards "+
      "will sing about, and in so doing, you will become "+
      "an example to inspire others.",
      "Faith. You know your path is righteous, or else the "+
      "gods would not have set you upon it.",
      "Glory. You will lead the world into a grand new era, "+
      "one that will be branded with your name.",
    ]},
    {"title": "Symbol", "choices":[
      "A dragon, emblematic ofyour nobility in peace and "+
      "your ferocity in combat",
      "A clenched fist, because you are always ready to "+
      "fight for your beliefs",
      "An upraised open hand, indicating your preference "+
      "for diplomacy over combat",
      "A red heart, showing the world your commitment "+
      "to justice",
      "A black heart, signifying that emotions such as pity "+
      "do not sway your dedication to your oath",
      "An unblinking eye, meaning that you are ever alert "+
      "to all threats against your cause",
    ]},
    {"title": "Nemesis", "choices":[
      "A mighty orc war chief who threatens to overrun "+
      "and destroy everything you hold sacred",
      "A fiend or a celestial, the agent of a power of the "+
      "Outer Planes, who has been charged with corrupting "+
      "or redeeming you, as appropriate",
      "A dragon whose servants dog your steps",
      "A high priest who sees you as a misguided fool and "+
      "wants you to abandon your religion",
      "A rival paladin who trained with you but became an "+
      "oath—breaker and holds you responsible",
      "A vampire who has sworn revenge against all paladins "+
      "after being defeated by one",
    ]},
    {"title": "Temptation", "choices":[
      "Fury. When your anger is roused, you have trouble "+
      "thinking straight, and you fear you might do something "+
      "you’ll regret.",
      "Pride. Your deeds are noteworthy, and no one takes "+
      "note of them more often than you.",
      "Lust. You can't resist an attractive face and a pleasant "+
      "smile.",
      "Envy. You are mindful ofwhat some famous folk "+
      "have accomplished, and you feel inadequate when "+
      "your deeds don't compare to theirs.",
      "Despair. You consider the great strength of the "+
      "enemies you must defeat, and at times you see no "+
      "way to achieve final victory.",
      "Greed. Regardless ofhow much glory and treasure "+
      "you amass, it’s never enough for you.",
    ]},
  ],
  "Ranger": [
    {"title": "View of the World" , "choices":[
      "Towns and cities are the best places for those who "+
      "can't survive on their own.",
      "The advancement of civilization is the best way to "+
      "thwart chaos, but its reach must be monitored.",
      "Towns and cities are a necessary evil, but once the "+
      "wilderness is purged of supernatural threats, we "+
      "will need them no more.",
      "Walls are for cowards, who huddle behind them "+
      "while others do the work of making the world safe.",
      "Visiting a town is not unpleasant, but after a few "+
      "days I feel the irresistible call to return to the wild.",
      "Cities breed weakness by isolating folk from the "+
      "harsh lessons ofthe wild.",
    ]},
    {"title":"Homeland", "choices":[
      "You patrolled an ancient forest, darkened and corrupted "+
      "by several crossings to the Shadowfell.",
      "As part of a group of nomads, you acquired the "+
      "skills for surviving in the desert.",
      "Your early life in the Underdark prepared you for "+
      "the challenges of combating its denizens.",
      "You dwelled on the edge of a swamp, in an area imperiled "+
      "by land creatures as well as aquatic ones.",
      "Because you grew up among the peaks, finding the "+
      "best path through the mountains is second nature "+
      "to you.",
      "You wandered the far north, learning how to protect "+
      "yourself and prosper in a realm overrun by ice.",
    ]},
    {"title":"Sworn Enemy" , "choices":[
      "You seek revenge on nature’s behalf for the great "+
      "transgressions your foe has committed.",
      "Your forebears or predecessors fought these creatures,"+
      "and so shall you.",
      "You hear no enmity toward your foe. You stalk such "+
      "creatures as a hunter tracks down a wild animal.",
      "You find your foe fascinating, and you collect books "+
      "of tales and history concerning it.",
      "You collect tokens of your fallen enemies to remind "+
      "you of each kill.",
      "You respect your chosen enemy, and you see your "+
      "battles as a test of respective skills.",
    ]},
  ],
  "Rogue": [
    {"title": "Guilty Pleasure", "choices":[
      "Large gems",
      "A smile from a pretty face",
      "A new ring for your finger",
      "The chance to deflate someone’s ego",
      "The finest food and drink",
      "Adding to your collection of exotic coins",
    ]},
    {"title": "Adversary", "choices":[
      "The pirate captain on whose ship you once served;"+
      "what you call moving on, the captain calls mutiny",
      "A master spy to whom you unwittingly fed bad "+
      "information, which led to the assassination of the "+
      "wrong target",
      "The master ofthe local thieves' guild, who wants "+
      "you to join the organization or leave town",
      "An art collector who uses illegal means to acquire "+
      "masterpieces",
      "A fence who uses you as a messenger to set up "+
      "illicit meetings",
      "The proprietor of an illegal pit fighting arena where "+
      "you once took bets",
    ]},
    {"title": "Benefactor", "choices":[
      "A smuggler kept you from getting caught but lost a "+
      "valuable shipment in doing so. Now you owe that "+
      "person an equally valuable favor.",
      "The Beggar King has hidden you from your pursuers "+
      "many times, in return for future considerations.",
      "A magistrate once kept you out of jail in return for "+
      "information on a powerful crime lord.",
      "Your parents used their savings to bail you out of "+
      "trouble in your younger days and are now destitute.",
      "A dragon didn't eat you when it had a chance, and "+
      "in return you promised to set aside choice pieces "+
      "of treasure for it.",
      "A druid once helped you out of a tight spot; now "+
      "any random animal you see could be that benefactor, "+
      "perhaps come to claim a return favor.",
    ]},
  ],
  "Sorcerer": [
    {"title": "Arcane Origin", "choices":[
      "Your power arises from your family's bloodline."+
      "You are related to some powerful creature, or you "+
      "inherited a blessing or a curse.",
      "You are the reincarnation of a being from another "+
      "plane of existence."+
      "A powerful entity entered the world. Its magic "+
      "changed you.",
      "Your birth was prophesied in an ancient text, and "+
      "you are foretold to use your power for terrible ends.",
      "You are the product of generations ofcareful, "+
      "selective breeding.",
      "You were made in a vat by an alchemist.",
    ]},
    {"title":"Reaction" , "choices":[
      "Your powers are seen as a great blessing by those "+
      "around you, and you are expected to use them in "+
      "service to your community.",
      "Your powers caused destruction and even a death "+
      "when they became evident, and you were treated "+
      "as a criminal.",
      "Your neighbors hate and fear your power, causing "+
      "them to shun you.",
      "You came to the attention of a sinister cult that "+
      "plans on exploiting your abilities.",
      "Peeple around you believe that your powers are a "+
      "curse levied on your family for a past transgression.",
      "Your powers are believed to be tied to an ancient "+
      "line of mad kings that supposedly ended in a "+
      "bloody revolt over a century ago.",
    ]},
    {"title": "Supernatural Mark", "choices":[
      "Your eyes are an unusual color, such as red.",
      "You have an extra toe on one foot.",
      "One of your ears is noticeably larger than the other.",
      "Your hair grows at a prodigious rate.",
      "You wrinkle your nose repeatedly while you are "+
      "chewing.",
      "A red splotch appears on your neck once a day,"+
      "then vanishes after an hour.",
    ]},
    {"title":"Sign of Sorcery" , "choices":[
      "You deliver the verbal components ofyour spells in "+
      "the booming voice of a titan.",
      "For a moment after you cast a spell, the area "+
      "around you grows dark and gloomy.",
      "You sweat profusely while casting a spell and for a "+
      "few seconds thereafter.",
      "Your hair and garments are briefly buffeted about,"+
      "as if by a breeze, whenever you call forth a spell.",
      "If you are standing when you cast a spell, you rise "+
      "six inches into the air and gently float back down.",
      "Illusory blue flames wreathe your head as you begin "+
      "your casting, then abruptly disappear.",
    ]},
    {"title": "*Shadow Sorcerer Quirk*", "choices":[
      "You are always icy cold to the touch.",
      "When you are asleep, you don’t appear to breathe"+
      "(though you must still breathe to survive).",
      "You barely bleed, even when badly injured.",
      "Your heart beats once per minute. This event "+
      "sometimes surprises you.",
      "You have trouble remembering that living creatures "+
      "and corpses should be treated differently.",
      "You blinked. Once. Last week.",
    ]},
  ],
  "Warlock": [
    {"title": "Patron Attitude", "choices":[
      "Your patron has guided and helped your family for "+
      "generations and is kindly toward you.",
      "Each interaction with your capricious patron is a "+
      "surprise, whether pleasant or painful.",
      "Your patron is the spirit of a long-dead hero who "+
      "sees your pact as a way for it to continue to influence "+
      "the world.",
      "Your patron is a strict disciplinarian but treats you "+
      "with a measure of respect.",
      "Your patron tricked you into a pact and treats you "+
      "as a slave.",
      "You are mostly left to your own devices with no interference "+
      "from your patron. Sometimes you dread "+
      "the demands it will make when it does appear.",
    ]},
    {"title": "Special Terms" , "choices":[
      "When directed, you must take immediate action "+
      "against a specific enemy of your patron.",
      "Your pact tests your willpower; you are required to "+
      "abstain from alcohol and other intoxicants.",
      "At least once a day, you must inscribe or carve your "+
      "patron’s name or symbol on the wall of a building.",
      "You must occasionally conduct bizarre rituals to "+
      "maintain your pact.",
      "You can never wear the same outfit twice, since "+
      "your patron finds such predictability to be boring.",
      "When you use an eldritch invocation, you must "+
      "speak your patron’s name aloud or risk incurring "+
      "its displeasure.",
    ]},
    {"title": "Binding Mark", "choices":[
      "One ofyour eyes looks the same as one of your "+
      "patron's eyes.",
      "Each time you wake up, the small blemish on your"+
      "face appears in a different place.",
      "You display outward symptoms of a disease but "+
      "suffer no ill effects from it.",
      "Your tongue is an unnatural color.",
      "You have a vestigial tail.",
      "Your nose glows in the dark.",
    ]},
  ],
  "Wizard": [
    {"title": "Spellbook", "choices":[
      "A tome with pages that are thin sheets ofmetal, "+
      "spells etched into them with acid ",
      "Long straps ofleather on which spells are written, "+
      "wrapped around a stafffor ease of transport ",
      "A battered tome filled with pictographs that only "+
      "you can understand ",
      "Small stones inscribed with spells and kept in a "+
      "cloth bag ",
      "A scorched book, ravaged by dragon fire, with the "+
      "script of your spells barely visible on its pages ",
      "A tome full ofblack pages whose writing is visible "+
      "only in dim light or darkness ",
    ]},
    {"title": "Ambition", "choices":[
      "You will prove that the gods aren't as powerful as "+
      "folk believe.",
      "Immortality is the end goal of your studies.",
      "lf you can fully understand magic, you can unlock "+
      "its use for all and usher in an era of equality.",
      "Magic is a dangerous tool. You use it to protect"+
      "what you treasure.",
      "Arcane power must be taken away from those who "+
      "would abuse it.",
      "You will become the greatest wizard the world has "+
      "seen in generations.",
    ]},
    {"title": "Eccentricity", "choices":[
      "You have the habit of tapping your foot incessantly,"+
      "which often annoys those around you.",
      "Your memory is quite good, but you have no trouble "+
      "pretending to be absent minded when it suits"+
      "your purposes.",
      "You never enter a room without looking to see "+
      "what’s hanging from the ceiling.",
      "Your most prized possession is a dead worm that "+
      "you keep inside a potion vial.",
      "When you want people to leave you alone, you start "+
      "talking to yourself. That usually does the trick.",
      "Your fashion sense and grooming, or more accurately "+
      "lack thereof, sometimes cause others to "+
      "assume you are a beggar.",
    ]},
  ],
  }

  var specifics = classSets[power];
  var ret = [];
  for (var i = 0; i <specifics.length; i++)
  {
    var choice = specifics[i].choices[Math.floor(Math.random()*specifics[i].choices.length)];
    ret.push({"title":specifics[i].title,
      "text":choice});
  }

  console.log(ret);
  return ret;
}
module.exports.quirks = classQuirks;
module.exports.history = classHistory;