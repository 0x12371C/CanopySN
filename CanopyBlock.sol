// CanopyBlock.sol
pragma solidity ^0.8.0;

contract CanopyBlock {
    struct Block {
        uint256 blockNumber;
        bytes32 blockHash;
        bytes32 parentHash;
        uint256 timestamp;
        bytes32[] transactionHashes;
    }

    struct Transaction {
        bytes32 transactionHash;
        address from;
        address to;
        uint256 value;
        uint256 gasLimit;
        uint256 gasPrice;
        uint256 nonce;
        bytes data;
    }

    mapping(uint256 => Block) public blocks;
    mapping(bytes32 => Transaction) public transactions;
    uint256 public latestBlockNumber;

    event BlockMined(uint256 blockNumber, bytes32 blockHash);
    event TransactionAdded(bytes32 transactionHash);

    function addTransaction(
        bytes32 _transactionHash,
        address _from,
        address _to,
        uint256 _value,
        uint256 _gasLimit,
        uint256 _gasPrice,
        uint256 _nonce,
        bytes memory _data
    ) public {
        require(transactions[_transactionHash].transactionHash == bytes32(0), "Transaction already exists");

        transactions[_transactionHash] = Transaction(
            _transactionHash,
            _from,
            _to,
            _value,
            _gasLimit,
            _gasPrice,
            _nonce,
            _data
        );
        emit TransactionAdded(_transactionHash);
    }

    function mineBlock(bytes32[] memory _transactionHashes) public {
        latestBlockNumber++;
        uint256 blockNumber = latestBlockNumber;
        bytes32 parentHash = blockNumber > 1 ? blocks[blockNumber - 1].blockHash : bytes32(0);
        bytes32 blockHash = keccak256(abi.encodePacked(blockNumber, parentHash, _transactionHashes, block.timestamp));

        blocks[blockNumber] = Block(
            blockNumber,
            blockHash,
            parentHash,
            block.timestamp,
            _transactionHashes
        );

        emit BlockMined(blockNumber, blockHash);
    }

    function getBlockTransactionCount(uint256 _blockNumber) public view returns (uint256) {
        return blocks[_blockNumber].transactionHashes.length;
    }
}
