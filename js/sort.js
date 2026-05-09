// Iterative merge-sort with user-provided comparisons, tie support, and undo.
// Adapted from K-Factory's original migiwa sort engine; same algorithm, modern shape.

export class SongSort {
  constructor(items) {
    this.items = items;
    this.equalData = new Array(items.length).fill(-1);
    this.recordData = new Array(items.length).fill(0);
    this.recordId = 0;
    this.completed = 0;
    this.battle = 1;
    this.history = [];

    this.sortLists = [items.map((_, i) => i)];
    this.parentList = [0];
    this.total = 0;

    let p = 1;
    for (let i = 0; i < this.sortLists.length; i++) {
      if (this.sortLists[i].length >= 2) {
        const mid = Math.ceil(this.sortLists[i].length / 2);
        this.sortLists[p] = this.sortLists[i].slice(0, mid);
        this.parentList[p] = i;
        this.total += this.sortLists[p].length;
        p++;
        this.sortLists[p] = this.sortLists[i].slice(mid);
        this.parentList[p] = i;
        this.total += this.sortLists[p].length;
        p++;
      }
    }

    this.leftList = this.sortLists.length - 2;
    this.rightList = this.sortLists.length - 1;
    this.leftId = 0;
    this.rightId = 0;
  }

  isDone() {
    return this.leftList < 0;
  }

  currentLeft() {
    return this.items[this.sortLists[this.leftList][this.leftId]];
  }

  currentRight() {
    return this.items[this.sortLists[this.rightList][this.rightId]];
  }

  progress() {
    return this.total === 0 ? 100 : Math.floor((this.completed * 100) / this.total);
  }

  // side: -1 = left wins, 0 = tie, 1 = right wins
  choose(side) {
    if (this.isDone()) return;
    this.history.push(this._snapshot());

    const consumeLeft = () => {
      this.recordData[this.recordId] = this.sortLists[this.leftList][this.leftId];
      this.leftId++;
      this.recordId++;
      this.completed++;
    };
    const consumeRight = () => {
      this.recordData[this.recordId] = this.sortLists[this.rightList][this.rightId];
      this.rightId++;
      this.recordId++;
      this.completed++;
    };

    if (side !== 1) {
      consumeLeft();
      while (
        this.leftId < this.sortLists[this.leftList].length &&
        this.equalData[this.recordData[this.recordId - 1]] !== -1
      ) {
        consumeLeft();
      }
    }

    if (side === 0) {
      this.equalData[this.recordData[this.recordId - 1]] =
        this.sortLists[this.rightList][this.rightId];
    }

    if (side !== -1) {
      consumeRight();
      while (
        this.rightId < this.sortLists[this.rightList].length &&
        this.equalData[this.recordData[this.recordId - 1]] !== -1
      ) {
        consumeRight();
      }
    }

    // Drain whichever list still has items if the other is exhausted.
    if (
      this.leftId < this.sortLists[this.leftList].length &&
      this.rightId === this.sortLists[this.rightList].length
    ) {
      while (this.leftId < this.sortLists[this.leftList].length) consumeLeft();
    } else if (
      this.leftId === this.sortLists[this.leftList].length &&
      this.rightId < this.sortLists[this.rightList].length
    ) {
      while (this.rightId < this.sortLists[this.rightList].length) consumeRight();
    }

    // Both sub-lists fully merged: write into the parent and pop.
    if (
      this.leftId === this.sortLists[this.leftList].length &&
      this.rightId === this.sortLists[this.rightList].length
    ) {
      const parentIdx = this.parentList[this.leftList];
      const merged =
        this.sortLists[this.leftList].length + this.sortLists[this.rightList].length;
      for (let i = 0; i < merged; i++) {
        this.sortLists[parentIdx][i] = this.recordData[i];
      }
      this.sortLists.pop();
      this.sortLists.pop();
      this.leftList -= 2;
      this.rightList -= 2;
      this.leftId = 0;
      this.rightId = 0;
      this.recordData = new Array(this.items.length).fill(0);
      this.recordId = 0;
    }

    this.battle++;
  }

  undo() {
    const prev = this.history.pop();
    if (!prev) return false;
    this._restore(prev);
    return true;
  }

  results() {
    if (!this.isDone()) return null;
    const order = this.sortLists[0];
    const ranked = [];
    let rank = 1;
    let same = 1;
    for (let i = 0; i < order.length; i++) {
      ranked.push({ rank, item: this.items[order[i]] });
      if (i < order.length - 1) {
        if (this.equalData[order[i]] === order[i + 1]) {
          same++;
        } else {
          rank += same;
          same = 1;
        }
      }
    }
    return ranked;
  }

  _snapshot() {
    return {
      sortLists: this.sortLists.map((a) => [...a]),
      parentList: [...this.parentList],
      equalData: [...this.equalData],
      recordData: [...this.recordData],
      recordId: this.recordId,
      completed: this.completed,
      battle: this.battle,
      leftList: this.leftList,
      leftId: this.leftId,
      rightList: this.rightList,
      rightId: this.rightId,
    };
  }

  _restore(s) {
    this.sortLists = s.sortLists.map((a) => [...a]);
    this.parentList = [...s.parentList];
    this.equalData = [...s.equalData];
    this.recordData = [...s.recordData];
    this.recordId = s.recordId;
    this.completed = s.completed;
    this.battle = s.battle;
    this.leftList = s.leftList;
    this.leftId = s.leftId;
    this.rightList = s.rightList;
    this.rightId = s.rightId;
  }
}
