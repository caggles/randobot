module.exports.practices =
    {
        compelling: {
            level: "initiate",
            definition: "nudge a preferred but possible outcome into reality.",
            uses: [
                "Increase the effect of existing [physical, effects] into Conditions."
            ]
        },
        knowing: {
            level: "initiate",
            definition: "Knowing spells deliver knowledge about [short] directly to the mage (or another target).",
            uses: []
        },
        unveiling: {
            level: "initiate",
            definition: "expose things relating to [short] which might otherwise be hidden to the mage's senses.",
            uses: []
        },
        ruling: {
            level: "apprentice",
            definition: "grant control over [short], without altering or transforming them in any way.",
            uses: [
                "Create or remove non-persistent, mundane Conditions relating to [short].",
                "Grant relevant 9-agains (or 8-agains with Reach)"
            ]
        },
        shielding: {
            level: "apprentice",
            definition: "protect against [short].",
            uses:[
                "Grant immunity to natural instances of [physical]",
                "Protect against attacks using [physical], requiring a Clash of Wills to negate the protection."
            ]
        },
        veiling: {
            level: "apprentice",
            definition: "conceal [short] from detection, or conceal a target from [short].",
            uses:[
                "Render the target invisible, requiring a Clash of Wills for supernatural attempts at detection."
            ]
        },
        fraying: {
            level: "disciple",
            definition: "degrade, weaken or enhance the flaws in [short].",
            uses:[
              "Deal bashing damage to or using [physical].",
              "Create a related mundane Tilt."
            ]
        },
        perfecting: {
            level: "disciple",
            definition: "bolster, strengthen and improve [short].",
            uses:[
                "Grant rote quality on rolls relating to [short]"
            ]
        },
        weaving: {
            level: "disciple",
            definition: "alter the properties of [physical] without transforming it completely.",
            uses:[
                "Create or remove a non-persistent, clearly supernatural Condition relating to [short]"
            ]
        },
        patterning: {
            level: "adept",
            definition: "completely transform [physical] into something else that also fall's under [arcana]'s purview.",
            uses:[
                "Create or remove persistent conditions relating to [short]",
                "Create an obviously magical Tilt relating to [short]"
            ]
        },
        unraveling: {
            level: "adept",
            definition: "significantly impair or damage [physical].",
            uses:[
                "Deal lethal damage to or using [physical] (spend Reach and a Mana to make it aggravated)",
                "Create or remove persistent Conditions relating to [short]"
            ]
        },
        making: {
            level: "master",
            definition: "create [physical] whole-cloth, from nothing.",
            uses: []
        },
        unmaking: {
            level: "master",
            definition: "annihilate [physical].",
            uses: []
        }
    }

module.exports.arcana =
    {
      death: {
        short: "decay and ghosts",
        physical: ["ghosts", "ectoplasm", "souls", "shadows"],
        concepts: ["absence", "enervation"],
        effects: ["decay"],
        worlds: ["the Underworld"]
      },
      fate: {
        short: "luck, oaths and destiny",
        physical: ["blessings", "curses", "oaths", "promises"],
        concepts: ["fortune", "probability", "destiny"],
        effects: [],
        worlds: []
      },
      forces: {
        short: "all forms of energy",
        physical: ["electricity", "gravity", "fire", "weather", "radiation", "sound", "light", "heat"],
        concepts: [],
        effects: ["motion"],
        worlds: []
      },
      life: {
        short: "any living things",
        physical: ["animals", "plants", "diseases"],
        concepts: ["evolution", "metamorphosis", "vigor"],
        effects: ["healing"],
        worlds: []
      },
      matter: {
        short: "any inert physical matter",
        physical: ["solids", "liquids", "gases"],
        concepts: ["crafting", "alchemy", "transmutation", "stasis"],
        effects: [],
        worlds: []
      },
      mind: {
        short: "any sentient intelligence",
        physical: ["minds", "memories"],
        concepts: ["communication", "hallucination", "projection"],
        effects: [],
        worlds: ["Goetia", "the Astral Realms"]
      },
      prime: {
        short: "magic itself",
        physical: ["tass", "spells", "yantras", "nimbus", "mana", "hallows"],
        concepts: ["truth", "resonance", "revelation"],
        effects: [],
        worlds: ["the Supernal Realms"]
      }
    }