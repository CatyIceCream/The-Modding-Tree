addLayer("α₁", {
    name: "Segment α₁", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "α₁", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#808080 ",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Segment α₁", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return 0.5 },
            
    },

},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    branches: ["β₁"],
    hotkeys: [
        {key: "", description: "", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
}),
addLayer("β₁", {
    name: "Segment β₁", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "β₁", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
    }},
    color: "#606060 ",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Segment β₁", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return 0.5 },
            
    },

},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
}),
addLayer("א", {
    name: "א", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "א", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
    }},
    color: "#9de3c2",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "א", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return 0.5 },
            
    },

},
    buyables: {
        11: {
            title: 'Expand',
            cost(x) {
                const amount = getBuyableAmount(this.layer, this.id)
                return (new Decimal(3).pow(((getBuyableAmount(this.layer, this.id)).mul(new Decimal(1.75))))).ceil()
            },
            display () {
                const amount = getBuyableAmount(this.layer, this.id)
                const cost = this.cost()

                return (
                    `<br><br>${amount} expansions<br><br>You need ${cost} א to expand your א gain` +
                    `<br><br><br><br> +${amount.add(new Decimal(1))} א/s (${(amount.mul(amount.add(new Decimal(1))).div(new Decimal(2)))} א/s current total)`
                )

            },
            canAfford() {
                return player.א.points.gte(this.cost()) 
            },
            buy () {
                player.א.points = player.א.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})

