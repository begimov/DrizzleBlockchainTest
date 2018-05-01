pragma solidity ^0.4.18;

contract Voter {
    struct Proposal {
        bytes32 name;
        bool state;
        uint totalVotes;
        mapping (address => uint) votes;
    }

    Proposal[] public proposals;

    function countProposals() public returns (uint) {
        return proposals.length;
    }

    function addProposal(bytes32 name) public {
        proposals.push(Proposal({
            name: name,
            state: true,
            totalVotes: 0
        }));
    }

    function getProposalState(uint id) public returns (bool) {
        return proposals[id].state;
    }

    function getProposalName(uint id) public returns (bytes32) {
        return proposals[id].name;
    }

    function getProposalTotalVotes(uint id) public returns (uint) {
        return proposals[id].totalVotes;
    }

    function getProposal(uint id) public returns (bytes32, bool) {
        return (proposals[id].name, proposals[id].state);
    }

    function vote(uint id) public returns (bool) {
        if (proposals[id].votes[msg.sender] != 1) {
            proposals[id].votes[msg.sender] = 1;
            proposals[id].totalVotes++;
            return true;
        }
        return false;
    }
}