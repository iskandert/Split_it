function calculate() {

    let actors = new Map(), actions = [];

    let isEnterFinished = false;
    function Member(name, sum) {
        this.name = name;
        this.balance = sum;
    }
    let actorIndex = 1;
    // console.log("Enter name of one and set of his costs\nor press Enter if that's all: ");
    while (!isEnterFinished) {
        let action = prompt(`Enter name of ${actorIndex++} actor and his cost\nor press Enter if that's all: `, '');
        if (action) {
            action = action.split(' ');
            let a;
            if (action.slice(2)) a = action.slice(2);
            else a = [];
            actions.push([action[0], +action[1], a]);
        }
        else isEnterFinished = true;
    }

    // if (!actions.length) actions = [
    //     ['A', 25, []],
    //     ['B', 15, ['A', 'C']],
    //     ['B', 20, []],
    //     ['C', 34, []],
    //     ['D', 40, []],
    //     ['E', 20, ['A', 'B', 'D', 'F', 'G', 'H', 'I', 'J']],
    //     ['F', 15, []],
    //     ['G', 25, []],
    //     ['H', 31, []],
    //     ['I', 35, []],
    //     ['J', 10, []],
    // ];

    let a = new Date().getMilliseconds();
    actions.forEach(e => { e[2] = e[2].sort().join('&') });

    let costGroups = new Map(); //списки множеств вкладчиков, сгруппированных по общим вкладам
    let names = Array.from(new Set(actions.map(e => e[0]))); //список вкладчиков

    actions.forEach(e => {
        !actors.has(e[0]) ?
            actors.set(e[0], new Member(e[0], e[1]))
            : actors.get(e[0]).balance += e[1];
        if (!costGroups.size || !costGroups.has(e[2])) costGroups.set(e[2], undefined); //перечисление групп вкладчиков
    });
    // console.log(actions);

    for (let group of costGroups.keys()) {
        costGroups.set(group, actions.filter(e => e[2] === group).map(e => e.slice(0, 2)));

        let a;
        group.split('&').join('').length ? a = group.split('&').length : a = 0;

        if (new Set(costGroups.get(group).map(c => c[0])).size < names.length - a) {
            const list = costGroups.get(group);
            costGroups.set(group, [
                ...list,
                ...names.filter(n => !list.map(l => l[0]).includes(n) && !group.includes(n)).map(n => [n, 0]),
            ]);
        }
    }

    for (let acts of costGroups.values()) {
        const meanCost = acts.reduce((sum, curr) => sum + curr[1], 0) / acts.length;
        acts.forEach(act => {
            let actor = actors.get(act[0]);
            actor.balance = Math.trunc((actor.balance - meanCost) * 1000) / 1000;
        })
    }

    let debtors = [], creditors = [], transactions = [];
    Array.from(actors.values()).sort((a, b) => b.balance - a.balance).forEach(m => {
        if (m.balance < 0) debtors.push(m);
        if (m.balance > 0) creditors.push(m);
    });

    let round = n => Math.round(n * 10) / 10;
    // console.log('deb:', debtors, 'cred:', creditors);
    debtors.forEach(d => {
        creditors.find(c => {
            if (d.balance + c.balance !== 0) return false;
            transactions.push([d.name, c.name, round(c.balance)]);
            d.balance = 0;
            c.balance = 0;
            return true
            // debtors.delete(d);
            // creditors.delete(c);
        });
    });

    debtors.forEach(d => {
        if (!d.balance) return;
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
    // console.log((new Date().getMilliseconds() - a) / 1000);
    console.table(transactions);
}
export default calculate;