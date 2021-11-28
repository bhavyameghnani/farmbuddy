pragma solidity ^0.5.0;

contract FarmBuddy {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content; //product name
    string statement; //status of the product
    string status; //status of the product
    uint price; //product price
    address owner; //farmer
    address stakeholder; //stakeholder who creates the block
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    string statement,
    string status,
    uint price,
    address owner,
    address stakeholder
    
  );

  constructor() public {
  }

  function createTask(string memory _content, string memory _statement, string memory _status,  uint _price, address _stakeholder) public {
    address _owner = msg.sender;
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, _statement, _status, _price, _owner, _stakeholder);
    emit TaskCreated(taskCount, _content, _statement, _status, _price, _owner, _stakeholder);
  }

}
