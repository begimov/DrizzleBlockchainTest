import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class BasicVoter extends Component {
    constructor(props, context) {
        super(props)

        this.state = {
            proposalName: ''
        }

        this.contracts = context.drizzle.contracts

        this.web3Utils = context.drizzle.web3.utils

        this.dataKey = this.contracts.BasicVoter.methods.countProposals.cacheCall()
        console.log(this.web3Utils.hexToUtf8('0x6466677364666773646700000000000000000000000000000000000000000000'))
    }

    handleChange = (event) => {
        this.setState({ proposalName: event.target.value });
    }

    render() {
        if (!(this.dataKey in this.props.contracts.BasicVoter.countProposals) 
        // || !(this.proposalNameKey in this.props.contracts.BasicVoter.getProposalName)    
        ) {
            return (
                <span>Fetching...</span>
            )
        }

        var displayData = this.props.contracts.BasicVoter.countProposals[this.dataKey].value
        // var proposalNameData = this.web3Utils.hexToUtf8(this.props.contracts.BasicVoter.getProposalName[this.proposalNameKey].value)

        return (
            <span>
                <span>{displayData}</span><br /><br />

                <input type="text" value={this.state.proposalName} onChange={this.handleChange} />
                <span><button onClick={() => this.vote()}>Add proposal</button></span><br /><br />

                {/* <span>{proposalNameData}</span><br /><br /> */}
                <span><button onClick={() => this.getProposalName()}>Get name</button></span><br /><br />

                <span><button onClick={() => console.log(this.props)}>LOG</button></span>
            </span>
        )
    }

    vote() {
        this.stackId = this.contracts.BasicVoter.methods.addProposal.cacheSend(this.web3Utils.asciiToHex(this.state.proposalName), { from: this.props.accounts[0] })
    }

    getProposalName() {
        this.proposalNameKey = this.contracts.BasicVoter.methods.getProposalName.cacheCall(1)
    }
}



BasicVoter.contextTypes = {
    drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
    return {
        contracts: state.contracts
    }
}

export default drizzleConnect(BasicVoter, mapStateToProps)