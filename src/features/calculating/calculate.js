let members = [], actions = [];

let isEnterFinished = false;
function Member(name, sum) {
    this.name = name;
    // this.sum = sum;
    this.balance = sum;
}

console.log("Enter name of one and set of his costs\nor press Enter if that's all: ");
while (!isEnterFinished) {
    const action = prompt("Enter name of one and set of his costs\nor press Enter if that's all: ", '');
    if (action) {
        action = action.split(' ');
        actions.push([action[0], +action[1], action.slice(2) || []]);
    }
    else isEnterFinished = true;
}

if (!actions.length) actions = [
    ['A', 25, []],
    ['B', 15, ['A', 'C']],
    ['B', 20, []],
    ['C', 34, []],
    ['D', 40, []],
    ['E', 20, ['A', 'B', 'D', 'F', 'G', 'H', 'I', 'J']],
    ['F', 15, []],
    ['G', 25, []],
    ['H', 31, []],
    ['I', 35, []],
    ['J', 10, []],
];

let a = new Date().getMilliseconds();
actions.forEach(e => { e[2] = e[2].sort().join('&') });
let costGroups = new Map(), names = Array.from(new Set(actions.map(e => e[0])));

actions.forEach(e => {
    !members.map(m => m.name).includes(e[0]) ?
        members.push(new Member(e[0], e[1]))
        : members.find(m => {
            if (m.name !== e[0]) return false;
            m.sum += e[1];
            m.balance += e[1];
            return true;
        });
    if (!costGroups.size || !Array.from(costGroups.keys()).includes(e[2])) costGroups.set(e[2], undefined);
});

Array.from(costGroups.keys()).forEach(g => {
    costGroups.set(g, actions.filter(e => e[2] === g).map(e => e.slice(0, 2)));
    if (new Set(costGroups.get(g).map(c => c[0])).size < names.length - (g.split('&').join('').length ? g.split('&').length : 0)) {
        const list = costGroups.get(g);
        costGroups.set(g, [
            ...list,
            ...names.filter(n => !list.map(l => l[0]).includes(n) && !g.includes(n)).map(n => [n, 0]),
        ]);
    }
});

Array.from(costGroups.values()).forEach(g => {
    const meanCost = g.reduce((sum, curr) => sum + curr[1], 0) / g.length;
    g.forEach(i => members.forEach(m => {
        if (i[0] === m.name) m.balance = Math.trunc((m.balance - meanCost) * 1000) / 1000;
    }));
});

let debtors = new Set(), creditors = new Set(), transactions = [];
members.sort((a, b) => b.balance - a.balance).forEach(m => {
    if (m.balance < 0) debtors.add(m);
    if (m.balance > 0) creditors.add(m);
});

let round = n => Math.round(n * 10) / 10;

debtors.forEach(d => {
    creditors.forEach(c => {
        if (d.balance + c.balance !== 0) return;
        transactions.push([d.name, c.name, round(c.balance)]);
        d.balance = 0, c.balance = 0;
        debtors.delete(d), creditors.delete(c);
    });
});

debtors.forEach(d => {
    if (d.balance === 0) return;
    creditors.forEach(c => {
        if (!d.balance || !c.balance) return;
        if (d.balance + c.balance <= 0) {
            transactions.push([d.name, c.name, round(c.balance)]);
            if (d.balance + c.balance === 0) d.balance = 0;
            else d.balance += c.balance;
            c.balance = 0;
        } else {
            transactions.push([d.name, c.name, Math.abs(round(d.balance))]);
            c.balance += d.balance;
            d.balance = 0;
        }
    });
});
console.log((new Date().getMilliseconds() - a) / 1000);
console.log(transactions);
