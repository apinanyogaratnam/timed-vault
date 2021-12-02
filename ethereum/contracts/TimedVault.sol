pragma solidity ^0.8.0;

contract TimedVault {
    struct Value {
        uint timestamp;
        uint value;
    }

    // key: address value: wei
    mapping(address => Value) public vault;

    function checkBalance() public view returns (uint) {
        return vault[msg.sender].value;
    }

    function lock(uint _time) external payable {
        require(_time >= 0, "Time must be greater than 0");

        // create new Value type
        Value memory value = Value({
            timestamp: block.timestamp + _time,
            value: msg.value + checkBalance()
        });

        // store value in vault
        vault[msg.sender] = value;
    }

    function unlock() external {
        require(vault[msg.sender].timestamp <= block.timestamp, "Lockup time has not ended yet");

        payable(msg.sender).transfer(checkBalance());
        vault[msg.sender] = Value({timestamp: 0, value: 0});
    }
}
