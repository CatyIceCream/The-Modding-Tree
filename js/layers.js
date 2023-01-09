addLayer("in", {
    name: "ingredients", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "In", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#C68958",
    requires: new Decimal(2000000), // Can be a function that takes requirement increases into account
    resource: "ingredients", // Name of prestige currency
    baseResource: "funds", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.43, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N", description: "N: Reset for ingredients", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            description: "<h3>Investment</h3><br> +2% funds/s",
            fullDisplay () {
                let desc = this.description
                if (!hasUpgrade(this.layer, this.id)) {
                    desc +=`<br><br> Costs: ${this.costInPoints()} funds<br>(215 + 10% of funds)`
                }
                return desc
            },
            costInPoints () {
                return player.points.div(10).add(215).ceil()
            },
            canAfford () {
                return player.points.gte(this.costInPoints())
            },
            pay () {
                player.points = player.points.sub(this.costInPoints())
            },
            //cost: new Decimal(1),
            //unlocked () { return new Decimal(1) },
        },
    },
    branches: ["i"]
})
addLayer("i", {
    name: "ice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFAFA",
    requires: new Decimal(30), // Can be a function that takes requirement increases into account
    resource: "ice", // Name of prestige currency
    baseResource: "ingredients", // Name of resource prestige is based on
    baseAmount() {return player.in.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "I", description: "I: Reset for ice", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
    11: {
        description: "Add one to the base heat loss -- not functional",
        //cost: new Decimal(1),
        canAfford () {
            return player.points.gte(100)
        }, 
        pay () {
            player.points = player.points.sub(100)
        },
        //unlocked () { return new Decimal(1) }
    }
}
})

