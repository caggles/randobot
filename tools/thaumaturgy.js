module.exports.practices =
    {
        "compelling": {
            "level": "initiate",
            "definition": "nudge a preferred but possible outcome into reality.",
            "uses": [
                "Increase the effect of existing [phenomena] into Conditions."
            ]
        },
        "knowing": {
            "level": "initiate",
            "definition": "Knowing spells deliver knowledge about [phenomena] directly to the mage (or another target)."
        },
        "unveiling": {
            "level": "initiate",
            "definition": "expose things relating to [arcanum] which might otherwise be hidden to the mage's senses."
        },
        "ruling": {
            "level": "apprentice",
            "definition": "grant control over [phenomena], without altering or transforming them in any way.",
            "uses": [
                "Create or remove non-persistent, mundane Conditions relating to [phenomena].",
                "Grant relevant 9-agains (or 8-agains with Reach)"
            ]
        },
        "shielding": {
            "level": "apprentice",
            "definition": "protect against [phenomena].",
            "uses":[
                "Grant immunity to natural instances of [phenomena]",
                "Protect against [phenomena] in the form of attacks, requiring a Clash of Wills to negate the protection."
            ]
        },
        "veiling": {
            "level": "apprentice",
            "definition": "conceal [phenomena] from detection, or conceal a target from [phenomena].",
            "uses":[
                "Render the target invisible, requiring a Clash of Wills for supernatural attempts at detection."
            ]
        },
        "fraying": {
            "level": "disciple",
            "definition": "degrade, weaken or enhance the flaws in [phenomena].",
            "uses":[
              "Deal bashing damage to or using [phenomena].",
              "Create a related mundane Tilt."
            ]
        },
        "perfecting": {
            "level": "disciple",
            "definition": "bolster, strengthen and improve [phenomena].",
            "uses":[
                "Grant rote quality on rolls relating to [phenomena]"
            ]
        },
        "weaving": {
            "level": "disciple",
            "definition": "alter the properties of [phenomena] without transforming it completely.",
            "uses":[
                "Create or remove a non-persistent, clearly supernatural Condition relating to [phenomena]"
            ]
        },
        "patterning": {
            "level": "adept",
            "definition": "completely transform [phenomena] into something else that also fall's under [arcana]'s purview.",
            "uses":[
                "Create or remove persistent conditions relating to [phenomena]",
                "Create an obviously magical Tilt relating to [phenomena]"
            ]
        },
        "unraveling": {
            "level": "adept",
            "definition": "significantly impair or damage [phenomena].",
            "uses":[
                "Deal lethal damage to or using [phenomena] (spend Reach and a Mana to make it aggravated)",
                "Create or remove persistent Conditions relating to [phenomena]"
            ]
        },
        "making": {
            "level": "master",
            "definition": "create [phenomena] whole-cloth, from nothing."
        },
        "unmaking": {
            "level": "master",
            "definition": "annihilate [phenomena]."
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
        physical: [],
        concepts: [],
        effects: [],
        worlds: []
      },
      mind: {
        short: "any sentient intelligence",
        physical: [],
        concepts: [],
        effects: [],
        worlds: []
      },
      prime: {
        short: "magic itself",
        physical: [],
        concepts: [],
        effects: [],
        worlds: []
      }
    }