const { NotImplementedError } = require('../extensions/index.js');
const { ListNode } = require('../extensions/list-node')

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
  #queue = null

  getUnderlyingList() {
   return this.#queue
  }

  enqueue(value) {
    if (this.#queue === null){
      this.#queue = new ListNode(value)
      return
    }

    const _ = convertListNodeToArray(this.#queue)
    _.push(value)

    this.#queue = convertArrayToListNode(_)
  }

  dequeue() {
    const _ = convertListNodeToArray(this.#queue).reverse()
    const result = _.pop()

    this.#queue = convertArrayToListNode(_.reverse())

    return result
  }
}

/**
 * @param {ListNode} l
 * @returns {Array}
 */
function convertListNodeToArray(l) {
  let _ = []

  _.push(l.value)

  if (l.next !== null)
    _ = _.concat(convertListNodeToArray(l.next))

  return _
}

/**
 * @param {Array} arr
 * @returns {ListNode}
 */
function convertArrayToListNode(arr) {
  return arr.reverse().reduce((acc, cur) => {
    if (acc) {
      const node = new ListNode(cur);
      node.next = acc;
      return node;
    }

    return new ListNode(cur);
  }, null);
}



module.exports = {
  Queue
};
