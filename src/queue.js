const { NotImplementedError, ListNode } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor () {
    this.startList = null
  }

  getUnderlyingList() {
    return this.startList
  }

  enqueue(value) {
    if (this.startList === null) {
      this.startList = new ListNode(value)
    } else {
      let temp = this.startList
      while (temp.next !== null) temp = temp.next
      temp.next = new ListNode(value)
    }
  }

  dequeue() {
    let value = this.startList.value
    this.startList = this.startList.next
    return value
  }
}

module.exports = {
  Queue
};
