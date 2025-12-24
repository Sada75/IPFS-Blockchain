// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BlockStore {
    struct FileRecord {
        address owner;
        string manifestCID;
        uint256 timestamp;
    }

    FileRecord[] public files;

    event FileRegistered(
        uint256 indexed fileId,
        address indexed owner,
        string manifestCID,
        uint256 timestamp
    );

    function registerFile(string memory _manifestCID) external {
        files.push(
            FileRecord({
                owner: msg.sender,
                manifestCID: _manifestCID,
                timestamp: block.timestamp
            })
        );

        emit FileRegistered(
            files.length - 1,
            msg.sender,
            _manifestCID,
            block.timestamp
        );
    }

    function getFile(uint256 _fileId)
        external
        view
        returns (address, string memory, uint256)
    {
        FileRecord memory file = files[_fileId];
        return (file.owner, file.manifestCID, file.timestamp);
    }

    function totalFiles() external view returns (uint256) {
        return files.length;
    }
}
